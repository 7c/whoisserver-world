import * as fs from 'fs'
import { parseDomain } from '../../index'
import { TldData } from '../../inc/tlds'

const punycode = require('punycode/')

describe('Function: parseDomain', () => {
    test('invalid inputs', () => {
        expect((parseDomain as any)()).toBeNull()
        expect((parseDomain as any)([])).toBeNull()
        expect((parseDomain as any)({})).toBeNull()
        expect((parseDomain as any)(1)).toBeNull()
        expect(parseDomain(``)).toBeNull()
    })

    test('basics', () => {
        expect(parseDomain('sub.test.com')!.domain).toBe('test.com')
        expect(parseDomain('test.com')!.domain).toBe('test.com')
        expect(parseDomain('sub.sub.sub.test.com')!.domain).toBe('test.com')
        expect(parseDomain('sub.sub.subtest.com')!.domain).toBe('subtest.com')
    })

    test.each([
        { expectedTld: 'tr', seed: 'nic.tr' },
        { expectedTld: 'uk', seed: 'test.uk' },
        { expectedTld: 'in', seed: 'test.in' },
        { expectedTld: 'cc', seed: 'test.cc' },
    ])('.$expectedTld domains', ({ expectedTld, seed }) => {
        const sampleDomains = (parseDomain(seed)!.tldData as TldData).sampleDomains
        for (const sltld of Object.keys(sampleDomains)) {
            for (const domain of sampleDomains[sltld]) {
                const hostname = `sub.` + domain.toUpperCase()
                const t = parseDomain(hostname)!
                expect((t.tldData as TldData).tld).toBe(expectedTld)
                expect(t.hostname).toBe(hostname.toLowerCase())
                expect(t.domain).toBe(domain.toLowerCase())
            }
        }
    })

    test('single cases', () => {
        expect(parseDomain('test.uk')!.domain).toBe('test.uk')
        expect(parseDomain('test2.test.uk')!.domain).toBe('test.uk')
        expect(parseDomain('test3.test2.test.uk')!.domain).toBe('test.uk')
        expect(parseDomain('test.co.uk')!.domain).toBe('test.co.uk')
        expect(parseDomain('test.net.uk')!.domain).toBe('test.net.uk')
        expect(parseDomain('sub.test.net.uk')!.domain).toBe('test.net.uk')
    })

    test('single cases with whitespaces', () => {
        expect(parseDomain(' test.uk')!.domain).toBe('test.uk')
        expect(parseDomain('  test2.test.uk')!.domain).toBe('test.uk')
        expect(parseDomain('   test3.test2.test.uk')!.domain).toBe('test.uk')
        expect(parseDomain('    test.co.uk')!.domain).toBe('test.co.uk')
        expect(parseDomain('     test.net.uk')!.domain).toBe('test.net.uk')
        expect(parseDomain('      sub.test.net.uk')!.domain).toBe('test.net.uk')

        expect(parseDomain('test.uk ')!.domain).toBe('test.uk')
        expect(parseDomain('test2.test.uk  ')!.domain).toBe('test.uk')
        expect(parseDomain('test3.test2.test.uk   ')!.domain).toBe('test.uk')
        expect(parseDomain('test.co.uk    ')!.domain).toBe('test.co.uk')
        expect(parseDomain('test.net.uk     ')!.domain).toBe('test.net.uk')
        expect(parseDomain('sub.test.net.uk      ')!.domain).toBe('test.net.uk')
    })

    test('sub tlds cannot be domains', () => {
        expect(parseDomain('co.uk')).toBeNull()
        expect(parseDomain('net.tr')).toBeNull()
        expect(parseDomain('gov.tr')).toBeNull()
        const tld = parseDomain('test.uk')!
        const sampleDomains = (tld.tldData as TldData).sampleDomains
        for (const sltld of Object.keys(sampleDomains)) {
            expect(parseDomain(sltld)).toBeNull()
            const hostname = `domain1.` + sltld.toUpperCase()
            const t = parseDomain(hostname)!
            expect(t.domain).toBe(hostname.toLowerCase())
            const hostname2 = `sub1.domain1.` + sltld.toUpperCase()
            const t2 = parseDomain(hostname2)!
            expect(t2.domain).toBe(hostname.toLowerCase())
        }
    })

    test('valid tld part but invalid domain part', () => {
        expect(parseDomain('$test.in')).toBeNull()
        expect(parseDomain('"test.in')).toBeNull()
        expect(parseDomain("'test.in")).toBeNull()
        expect(parseDomain("\'test.in")).toBeNull()
        expect(parseDomain('\"test.in')).toBeNull()
        expect(parseDomain('static..gr"')).toBeNull()
        expect(parseDomain('\\\\\\\\"test.in')).toBeNull()
        expect(parseDomain('\\test.in')).toBeNull()
        expect(parseDomain('test. in')).toBeNull()
        expect(parseDomain('test . in')).toBeNull()
        expect(parseDomain('test .gov.uk')).toBeNull()
        expect(parseDomain('test.gov .uk')).toBeNull()
        expect(parseDomain('test. gov .uk')).toBeNull()
    })

    test('tests with huge invalid hostname set', () => {
        const lines = fs.readFileSync('tests/invalidHostnames.txt', 'utf8').split('\n')
        for (const line of lines) {
            expect(parseDomain(line)).toBeNull()
        }
    })

    test('we should support idn/ascii domains', () => {
        const domains: string[] = JSON.parse(fs.readFileSync('tests/validIDNDomains.json', 'utf8'))
        for (const domain of domains) {
            expect(parseDomain(domain)!.domain).toBe(domain)
        }

        expect(parseDomain('xn-p1ai.com')!.domain).toBe('xn-p1ai.com')
        expect(parseDomain('abc.xn-p1ai.com')!.domain).toBe('xn-p1ai.com')
        expect(parseDomain('xn-80aa2ca.xn--p1ai.com')!.domain).toBe('xn--p1ai.com')
    })

    test('we should support unicode domains as input (at least lowercase ones)', () => {
        const domains: string[] = JSON.parse(fs.readFileSync('tests/validIDNDomains.json', 'utf8'))
        for (const domain of domains) {
            const unicodeDomain = punycode.toUnicode(domain)
            expect(parseDomain(unicodeDomain)!.domain).toBeDefined()
        }
    })

    test('we should detect invalid idn domains', () => {
        const domains: string[] = JSON.parse(fs.readFileSync('tests/invalidIDNDomains.json', 'utf8'))
        for (const domain of domains) {
            expect(parseDomain(domain)).toBeNull()
        }
        expect(parseDomain('xn---p1ai.com')).toBeNull()
        expect(parseDomain('sub.xn---p1ai.com')).toBeNull()
        expect(parseDomain('sub.sub.xn---p1ai.com')).toBeNull()
        expect(parseDomain('xn---p1ai.sub.xn---p1ai.com')).toBeNull()
        expect(parseDomain('xn--p1ai.sub.xn---p1ai.com')).toBeNull()
        expect(parseDomain('xn-p1ai.sub.xn---p1ai.com')).toBeNull()
    })
})

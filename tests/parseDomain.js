const chalk = require('chalk')
const fs = require('fs')
const expect = require('chai').expect
const { parseDomain } = require('../index')

describe('Function: parseDomain', function () {
    this.timeout(0)
    before(async function () {

    })

    it('invalid inputs', async function () {
        expect(parseDomain()).eq(null)
        expect(parseDomain([])).eq(null)
        expect(parseDomain({})).eq(null)
        expect(parseDomain(1)).eq(null)
        expect(parseDomain(``)).eq(null)
    })

    it('basics', async function () {
        expect(parseDomain("sub.test.com")).property('domain').eq('test.com')
        expect(parseDomain("test.com")).property('domain').eq('test.com')
        expect(parseDomain("sub.sub.sub.test.com")).property('domain').eq('test.com')
        expect(parseDomain("sub.sub.subtest.com")).property('domain').eq('subtest.com')
    })

    it('.tr domains', async function () {
        const tld = parseDomain('nic.tr')
        // console.log(tld)
        for (let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for (let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname = `sub.` + domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('tr')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('.uk domains', async function () {
        const tld = parseDomain('test.uk')
        for (let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for (let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname = `sub.` + domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('uk')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('.in domains', async function () {
        const tld = parseDomain('test.in')
        for (let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for (let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname = `sub.` + domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('in')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('.cc domains', async function () {
        const tld = parseDomain('test.cc')
        for (let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for (let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname = `sub.` + domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('cc')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('single cases', async function () {
        expect(parseDomain('test.uk')).property('domain').eq('test.uk')
        expect(parseDomain('test2.test.uk')).property('domain').eq('test.uk')
        expect(parseDomain('test3.test2.test.uk')).property('domain').eq('test.uk')
        expect(parseDomain('test.co.uk')).property('domain').eq('test.co.uk')
        expect(parseDomain('test.net.uk')).property('domain').eq('test.net.uk')
        expect(parseDomain('sub.test.net.uk')).property('domain').eq('test.net.uk')
    })

    it('single cases with whitespaces', async function () {
        expect(parseDomain(' test.uk')).property('domain').eq('test.uk')
        expect(parseDomain('  test2.test.uk')).property('domain').eq('test.uk')
        expect(parseDomain('   test3.test2.test.uk')).property('domain').eq('test.uk')
        expect(parseDomain('    test.co.uk')).property('domain').eq('test.co.uk')
        expect(parseDomain('     test.net.uk')).property('domain').eq('test.net.uk')
        expect(parseDomain('      sub.test.net.uk')).property('domain').eq('test.net.uk')

        expect(parseDomain('test.uk ')).property('domain').eq('test.uk')
        expect(parseDomain('test2.test.uk  ')).property('domain').eq('test.uk')
        expect(parseDomain('test3.test2.test.uk   ')).property('domain').eq('test.uk')
        expect(parseDomain('test.co.uk    ')).property('domain').eq('test.co.uk')
        expect(parseDomain('test.net.uk     ')).property('domain').eq('test.net.uk')
        expect(parseDomain('sub.test.net.uk      ')).property('domain').eq('test.net.uk')
    })


    it('sub tlds cannot be domains', async function () {
        expect(parseDomain('co.uk')).to.be.null
        expect(parseDomain('net.tr')).to.be.null
        expect(parseDomain('net.tr')).to.be.null
        expect(parseDomain('gov.tr')).to.be.null
        const tld = parseDomain('test.uk')
        for (let sltld of Object.keys(tld.tldData.sampleDomains)) {
            expect(parseDomain(sltld)).to.be.null
            const hostname = `domain1.` + sltld.toUpperCase()
            const t = parseDomain(hostname)
            expect(t).property('domain').eq(hostname.toLowerCase())
            const hostname2 = `sub1.domain1.` + sltld.toUpperCase()
            const t2 = parseDomain(hostname2)
            expect(t2).property('domain').eq(hostname.toLowerCase())
        }
    })



    it('valid tld part but invalid domain part', async function () {
        expect(parseDomain('$test.in')).eq(null)
        expect(parseDomain('test. in')).eq(null)
        expect(parseDomain('test. in')).eq(null)
        expect(parseDomain('test . in')).eq(null)
        expect(parseDomain('test .gov.uk')).eq(null)
        expect(parseDomain('test.gov .uk')).eq(null)
        expect(parseDomain('test. gov .uk')).eq(null)
    })

    it('tests with huge invalid hostname set', async function () {
        let lines = fs.readFileSync('tests/invalidHostnames.txt','utf8').split('\n')
        for(let line of lines) {
            let parsed = parseDomain(line)
            expect(parsed).to.be.null
        }
    })

})
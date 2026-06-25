import { tldDetails } from '../../index'
import { TldData } from '../../inc/tlds'
import whoisservers from '../../whoisservers.json'

describe('tldDetails function', () => {
    test('basic checks', () => {
        expect(tldDetails('notexisting')).toBe(false)
    })

    test('check structure of all TLDs', () => {
        for (const tld of Object.keys(whoisservers)) {
            const tldObj = tldDetails(' ' + tld.toUpperCase()) as TldData
            expect(tldObj).toEqual(expect.any(Object))
            expect(tldObj.tld).toBe(tld)
            expect(tldObj.tldUpdated).toBeGreaterThan(150000000000)
            expect(tldObj.tldCreated).toBeGreaterThan(1)
            expect(Array.isArray(tldObj.whoisServer)).toBe(true)
            expect(tldObj).toHaveProperty('registry')
            expect(tldObj.ianaUrl).toEqual(expect.any(String))
            expect(tldObj.ianaUrl).toContain(tld)
            expect(tldObj.t).toBeGreaterThan(1500000000000)
            expect(tldObj.version).toBeGreaterThan(0)
            expect(tldObj.sampleDomains).toEqual(expect.any(Object))
            expect(tldObj).toHaveProperty('type')
        }
    })
})

import { tldDetails } from './tldDetails'


describe('tldDetails', () => {
    it('should return the TLD details', () => {
        const tld = tldDetails('com')
        expect(tld).toBeDefined()
        if (tld) {
            expect(tld).toEqual(expect.any(Object))
            expect(tld.tld).toEqual('com')
            expect(tld.tldUpdated).toBeGreaterThan(173385600000)
            expect(tld.tldUpdated).toBeLessThan(Date.now())
            expect(tld.tldCreated).toBeGreaterThan(173385600000)
            expect(tld.tldCreated).toBeLessThan(Date.now())
            expect(Array.isArray(tld.whoisServer)).toBe(true)
            expect(tld.registry===false || typeof tld.registry==='string').toBe(true)
            expect(tld.version).toBeGreaterThan(0)
            expect(tld.sampleDomains).toEqual(expect.any(Object))
            expect(tld.type).toEqual(expect.any(String))
            expect(tld.isIDN).toEqual(expect.any(Boolean))
            expect(Array.isArray(tld.rdapServers)).toBe(true)
            expect(tld.rdapUpdated).toBeGreaterThan(173385600000)
            expect(tld.rdapUpdated).toBeLessThan(Date.now())
            expect(tld.ianaUrl).toEqual(expect.any(String))
            expect(tld.ianaUrl).toContain(tld.tld)
            expect(tld.sampleDomains).toEqual(expect.any(Object))
            expect(Object.keys(tld.sampleDomains).length).toBeGreaterThan(0)
            for(let domain of Object.keys(tld.sampleDomains)) {
                expect(tld.sampleDomains[domain]).toEqual(expect.any(Array))
                expect(tld.sampleDomains[domain].length).toBeGreaterThan(0)
                for(let sample of tld.sampleDomains[domain]) {
                    expect(sample).toEqual(expect.any(String))
                }
            }
        }
    })

    it('should return false if the TLD is not found', () => {
        const tld = tldDetails('notexisting')
        expect(tld).toBe(false)
    })
})
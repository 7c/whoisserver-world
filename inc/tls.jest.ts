import { tlds } from './tlds'

describe('tlds', () => {
    it('should return all TLDs', () => {
        const TLDS = tlds()
        expect(TLDS).toBeDefined()
        if (!TLDS) throw new Error('TLDS is false')
        expect(TLDS).toEqual(expect.any(Object))
        expect(Object.keys(TLDS).length).toBeGreaterThan(0)
        for(let tld of Object.keys(TLDS)) {
            const tldObj = TLDS[tld]
            expect(tldObj).toEqual(expect.any(Object))
            expect(tldObj.tld).toEqual(tld)
        }
    })


    it('should have popular TLDs as properties', () => {
        const t = tlds()
        if (!t) throw new Error('t is false')
        expect(t['com']).toBeDefined()
        expect(t['net']).toBeDefined()
        expect(t['org']).toBeDefined()
        expect(t['io']).toBeDefined()
        expect(t['ai']).toBeDefined()
        expect(t['tv']).toBeDefined()
        
        
    })

    it('should cache the TLDs', () => {
        const TLDS = tlds(true)
        expect(TLDS).toBeDefined()
        if (!TLDS) throw new Error('TLDS is false')
        expect(TLDS).toEqual(expect.any(Object))
        expect(Object.keys(TLDS).length).toBeGreaterThan(0)
        for(let tld of Object.keys(TLDS)) {
            const tldObj = TLDS[tld]
            expect(tldObj).toEqual(expect.any(Object))
            expect(tldObj.tld).toEqual(tld)
        }
        const TLDS2 = tlds(false)
        expect(TLDS2).toEqual(TLDS)
    })

    it('.com TLD', () => {
        const t = tlds()
        if (!t) throw new Error('t is false')
        const tld = t['com']
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
    })
})
import { tlds } from '../../index'

describe("tlds", () => {
    const TLDS = tlds()

    beforeAll(() => {
        expect(TLDS).toEqual(expect.any(Object))
    })

    test('should be defined', () => {
        expect(tlds).toBeDefined()
    })

    test('should return an object and not empty and validate content', () => {
        if (TLDS) {
            expect(Object.keys(TLDS).length).toBeGreaterThan(0)
            for(let tld of Object.keys(TLDS)) {
                const tldObj = TLDS[tld]
                // console.log(tld,tldObj)
                expect(tld).toEqual(expect.any(String))
                expect(tldObj).toEqual(expect.any(Object))
                expect(tldObj.tld).toEqual(tld)
                expect(tldObj.tldUpdated).toBeGreaterThan(173385600000)
                expect(tldObj.tldUpdated).toBeLessThan(Date.now())
                expect(tldObj.tldCreated).toBeGreaterThan(173385600000)
                expect(tldObj.tldCreated).toBeLessThan(Date.now())
                expect(Array.isArray(tldObj.whoisServer)).toBe(true)
                expect(tldObj.registry===false || typeof tldObj.registry==='string').toBe(true)
                expect(tldObj.version).toBeGreaterThan(0)
                expect(tldObj.sampleDomains).toEqual(expect.any(Object))
                expect(tldObj.type).toEqual(expect.any(String))
                expect(tldObj.isIDN).toEqual(expect.any(Boolean))
                expect(Array.isArray(tldObj.rdapServers)).toBe(true)
                expect(tldObj.rdapUpdated).toBeGreaterThan(173385600000)
                expect(tldObj.rdapUpdated).toBeLessThan(Date.now())
                expect(tldObj.ianaUrl).toEqual(expect.any(String))
            }
        }
        
    })
})



const expect= require('chai').expect
const { parseDomain } = require('../index')

describe('Function: parseDomain',function() {
    this.timeout(0)
    before(async function() {

    })

    it('invalid inputs',async function() {
        expect(parseDomain()).eq(null)
        expect(parseDomain([])).eq(null)
        expect(parseDomain({})).eq(null)
        expect(parseDomain(1)).eq(null)
        expect(parseDomain(``)).eq(null)
    })

    it('basics',async function() {
        console.log(parseDomain("sub.test.com"))
        expect(parseDomain("sub.test.com")).property('domain').eq('test.com')
        expect(parseDomain("test.com")).property('domain').eq('test.com')
        expect(parseDomain("sub.sub.sub.test.com")).property('domain').eq('test.com')
        expect(parseDomain("sub.sub.subtest.com")).property('domain').eq('subtest.com')
    })

    it('.tr domains',async function() {
        const tld = parseDomain('nic.tr')
        // console.log(tld)
        for(let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for(let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname=`sub.`+domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('tr')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('.uk domains',async function() {
        const tld = parseDomain('test.uk')
        for(let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for(let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname=`sub.`+domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('uk')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('.in domains',async function() {
        const tld = parseDomain('test.in')
        for(let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for(let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname=`sub.`+domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('in')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })

    it('.cc domains',async function() {
        const tld = parseDomain('test.cc')
        for(let sltld of Object.keys(tld.tldData.sampleDomains)) {
            for(let domain of tld.tldData.sampleDomains[sltld]) {
                const hostname=`sub.`+domain.toUpperCase()
                const t = parseDomain(hostname)
                // console.log(t)
                expect(t.tldData.tld).eq('cc')
                expect(t).property('hostname').eq(hostname.toLowerCase())
                expect(t).property('domain').eq(domain.toLowerCase())
            }
        }
    })
})
var expect= require('chai').expect
var { tldDetails } = require('./../index.js')
var whoisservers = require('./../whoisservers.json')

describe('tldDetails function',function() {
    this.timeout(0)

    it('basic checks',function() {
        expect(tldDetails('notexisting')).to.be.false
    })

    it('check structure of all TLDs',function() {
        // iterate over all tlds
        for(var tld in whoisservers) {
            // var tld = 'com'
            var tld_com = tldDetails(' '+tld.toUpperCase())
            // console.log(tld_com)
            expect(tld_com).to.be.a('object')
            expect(tld_com).property('tld').eq(tld)
            expect(tld_com).property('tldUpdated').greaterThan(150000000000)
            expect(tld_com).property('tldCreated').greaterThan(1)
            expect(tld_com).property('whoisServer').to.be.a('array')
            expect(tld_com).property('registry')
            expect(tld_com).property('ianaUrl').to.be.a('string')
            expect(tld_com).property('ianaUrl').contain(tld)
            expect(tld_com).property('t').greaterThan(1500000000000)
            expect(tld_com).property('version').greaterThan(0)
            expect(tld_com).property('sampleDomains').to.be.a('object')
            expect(tld_com).property('type')
            // break
        }
        
    })
})


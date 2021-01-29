var expect= require('chai').expect
var { tlds,tldDetails } = require('./../index.js')
var whoisservers = require('./../whoisservers.json')

describe('tlds function',function() {
    this.timeout(0)

    it('basic checks',function() {
        var all_tlds  = tlds()
        expect(all_tlds).to.be.a('object').property('com')
        expect(all_tlds).property('net')
        expect(all_tlds).property('org')

        // cross test file based loose tld against whoisservers.json file which is
        // contatinated form of them
        for(var tld in all_tlds) {
            expect(tldDetails(tld)).property('tld').eq(tld)
        }
    })
})


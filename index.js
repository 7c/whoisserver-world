const punycode = require('punycode/')
const path = require('path')
const fs = require('fs')
const { validHostname } = require('mybase')

const tlds_folder = path.join(__dirname, 'tlds')
const json_path = path.join(__dirname, 'whoisservers.json')
const TLDS = tlds()
/**
 * returns object of TLD or false if tld is not known
 * @param  {string} tld
 * @returns {} tld object|false
 */
function tldDetails(tld) {
    if (typeof tld === 'string') {
        tld = tld.toLowerCase().trim().replace(/[^a-z0-9-]/, '')
        var fn = path.join(tlds_folder, tld + '.json')
        if (fs.existsSync(fn)) {
            try {
                var data = fs.readFileSync(fn, 'ascii')
                return JSON.parse(data)
            }
            catch (err) { }
        }
    }

    return false
}
/**
 * returns all TLDs as iteration JSON object or false in case of error
 */
function tlds() {
    // reading as file will make sure that we read new file upon package renewal
    try {
        return JSON.parse(fs.readFileSync(json_path, 'utf8'))
    } catch (err) { }
    return false
}



function parseDomain(hostname) { // test exists // this requires whoisserver-world
    function hasUnicodePart(domain) {
        try {
            return punycode.toASCII(domain)!==domain
        }catch(err) {
            // console.log(err)
        }
        return false
    }
    function sanitizedReturn(ret) {
        // do we have a unicode domain ?
        if (hasUnicodePart(ret.domain)) 
            ret.domain = punycode.toASCII(ret.domain)
        else {
            ret.domain = ret.domain.toLowerCase()
            ret.hostname = ret.hostname.toLowerCase()
        }

        if (!validHostname(ret.domain)) 
            return null
        
        if (ret.domain.search(/^xn--/) === 0) {
            try {
                punycode.toUnicode(ret.domain)
            } catch (err) {
                // invalid idn domain
                return null
            }
        }
        return ret
    }
    if (typeof hostname === 'string') {
        hostname = hostname.trim()
        let ret = {
            hostname: hostname,
            tldData: false,
            domain: '',
            tld: ''
        }
        let parts = hostname.split('.')
        if (parts.length < 2) return null // we need at least 2 parts with a '.' seperation


        let last1 = parts[parts.length - 1].toLowerCase()
        // we toLowerCase possible unicode TLD (which is last1 part) in order to check against TLDS
        // let last1IsUnicode = hasUnicodePart(last1)
        // for now we do not support IDN tlds to be parsed as unicode inputs
        let last2 = (parts[parts.length - 2] + '.' + last1).toLowerCase()
        // do we have last2 ?
        if (TLDS.hasOwnProperty(last1)) {
            let tldData = TLDS[last1]
            let sampleDomains = tldData?.sampleDomains ? tldData.sampleDomains : false
            ret.tldData = tldData
            ret.tld = tldData.tld
            if (sampleDomains) {
                ret.domain = last2
                // domains like cm.gov.nc.tr (north-cypern)
                if (parts.length > 3) {
                    let last3 = (parts[parts.length - 3] + '.' + last2).toLowerCase()
                    if (sampleDomains.hasOwnProperty(last3)) {
                        ret.domain = (parts[parts.length - 4] + '.' + parts[parts.length - 3] + '.' + last2)
                        return sanitizedReturn(ret)
                    }
                }

                if (parts.length > 2 && sampleDomains.hasOwnProperty(last2)) {
                    ret.domain = (parts[parts.length - 3] + '.' + last2)
                    return sanitizedReturn(ret)
                }

                // domains should not be a sub-tld
                if (sampleDomains.hasOwnProperty(ret.domain)) return null

                return sanitizedReturn(ret)
            }
        }
    }
    return null
}

module.exports = {
    tldDetails,
    tlds,
    parseDomain
}
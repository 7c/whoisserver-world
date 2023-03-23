const path = require('path')
const fs = require('fs')

const tlds_folder = path.join(__dirname,'tlds')
const json_path = path.join(__dirname,'whoisservers.json')
const TLDS = tlds()
/**
 * returns object of TLD or false if tld is not known
 * @param  {string} tld
 * @returns {} tld object|false
 */
function tldDetails(tld) {
    if (typeof tld==='string') {
        tld=tld.toLowerCase().trim().replace(/[^a-z0-9-]/,'')
        var fn = path.join(tlds_folder,tld+'.json')
        if (fs.existsSync(fn)) {
            try {
                var data = fs.readFileSync(fn,'ascii')
                return JSON.parse(data)
            }
            catch(err) { }
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
        return JSON.parse(fs.readFileSync(json_path,'utf8'))
    }catch(err) {}
    return false
}

function parseDomain(hostname) { // test exists // this requires whoisserver-world
    if (typeof hostname === 'string') {
        let ret = {
            hostname: hostname.toLowerCase(),
            tldData: false,
            domain: '',
            tld:''
        }
        let parts = hostname.split('.')
        if (parts.length < 2) return null
        let last2 = (parts[parts.length - 2] + '.' + parts[parts.length - 1]).toLowerCase()
        // do we have last2 ?
        let last1 = parts[parts.length - 1].toLowerCase()
        if (TLDS.hasOwnProperty(last1)) {
            let tldData = TLDS[last1]
            ret.tldData = tldData
            ret.tld = tldData.tld
            if (tldData.hasOwnProperty('sampleDomains')) {
                ret.domain = last2

                // domains like cm.gov.nc.tr (north-cypern)
                if (parts.length > 3) {
                    let last3 = (parts[parts.length - 3] + '.' + parts[parts.length - 2] + '.' + parts[parts.length - 1]).toLowerCase()
                    if (tldData.sampleDomains.hasOwnProperty(last3)) {
                        ret.domain = (parts[parts.length - 4] + '.' + parts[parts.length - 3] + '.' + parts[parts.length - 2] + '.' + parts[parts.length - 1]).toLowerCase()
                        return ret
                    }
                }

                if (parts.length > 2 && tldData.sampleDomains.hasOwnProperty(last2)) {
                    ret.domain = (parts[parts.length - 3] + '.' + parts[parts.length - 2] + '.' + parts[parts.length - 1]).toLowerCase()
                    return ret
                }
                return ret
            }
        }
    }
    return null
}

module.exports={
    tldDetails,
    tlds,
    parseDomain
}
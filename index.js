const path = require('path')
const fs = require('fs')

const tlds_folder = path.join(__dirname,'tlds')
const json_path = path.join(__dirname,'whoisservers.json')
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

module.exports={
    tldDetails,
    tlds
}
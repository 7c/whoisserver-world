const path = require('path')
const fs = require('fs')

const tlds_folder = path.join(__dirname,'tlds')

function tldDetails(tld) {
    var fn = path.join(tlds_folder,tld+'.json')
    if (fs.existsSync(fn)) {
        try {
            var data = fs.readFileSync(fn,'ascii')
            return JSON.parse(data)
        }
        catch(err) { }
    }
    return false
}

module.exports={
    tldDetails
}
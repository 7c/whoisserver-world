import { hasUnicodePart } from "./hasUnicodePart"
import punycode from 'punycode/'
const { validHostname } = require('mybase')

export function sanitizedReturn(ret: { domain: string, hostname: string }): { domain: string, hostname: string } | null {
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
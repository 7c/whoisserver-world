import punycode from 'punycode/'


/**
 * Checks if a domain has a unicode part
 * @param domain - The domain to check
 * @returns True if the domain has a unicode part, false otherwise
 */
export function hasUnicodePart(domain: string): boolean {
    try {
        return punycode.toASCII(domain)!==domain
    }catch(err) {
        // console.log(err)
    }
    return false
}
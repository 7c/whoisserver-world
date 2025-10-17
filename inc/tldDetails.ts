import { tlds, TldData } from './tlds'


const tlds_cache = tlds(true)

export function tldDetails(tld: string): TldData | false {
    if (tlds_cache && tlds_cache.hasOwnProperty(tld.trim().toLowerCase())) {
        return tlds_cache[tld.trim().toLowerCase()]
    }
    return false
}
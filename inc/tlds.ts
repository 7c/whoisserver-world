import path from 'path'
import fs from 'fs'

export interface Tlds {
    [key: string]: TldData
}
export interface TldData {
    tld: string;
    tldUpdated: number;
    tldCreated: number;
    whoisServer: string[];
    registry: string | false;
    version: number;
    sampleDomains: any;
    type: string;
    isIDN: boolean;
    rdapServers: string[];
    rdapUpdated: number;
    ianaUrl: string;
    [key: string]: any
}

let tldsCache: Tlds | false = false

/**
 * returns all TLDs as Tlds object
 * @throws {Error} if the file is not found or if the file is not valid JSON
 */
export function tlds(cache: boolean = true): Tlds | false {
    const json_path = path.join(__dirname, '../whoisservers.json')
    if (cache) {
        if (tldsCache) {
            return tldsCache
        }
        tldsCache = JSON.parse(fs.readFileSync(json_path, 'utf8')) as Tlds
        return tldsCache
    }

    return JSON.parse(fs.readFileSync(json_path, 'utf8')) as Tlds

}
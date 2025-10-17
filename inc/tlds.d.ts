export interface Tlds {
    [key: string]: TldData;
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
    [key: string]: any;
}
/**
 * returns all TLDs as Tlds object
 * @throws {Error} if the file is not found or if the file is not valid JSON
 */
export declare function tlds(cache?: boolean): Tlds | false;
//# sourceMappingURL=tlds.d.ts.map
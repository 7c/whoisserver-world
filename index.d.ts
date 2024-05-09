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

export interface DomainParseResult {
    hostname: string;
    tldData: TldData | false;
    domain: string;
    tld: string;
}

/**
 * Returns object of TLD or false if TLD is not known.
 * @param tld The TLD to get details for.
 */
export function tldDetails(tld: string): TldData | false;

/**
 * Returns all TLDs as iteration JSON object or false in case of error.
 */
export function tlds(): { [key: string]: TldData } | false;

/**
 * Parses the given hostname and returns details about it.
 * @param hostname The hostname to parse.
 */
export function parseDomain(hostname: string): DomainParseResult | null;
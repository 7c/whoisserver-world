import { TldData } from "../inc/tlds";
import { parseDomain } from "../inc/parseDomain"

export interface DomainParseResult {
    hostname: string;
    tldData: TldData | false;
    domain: string;
    tld: string;
}

export class Domainname {
    public data: DomainParseResult
    constructor(hostname: string | URL) {
        if (hostname instanceof URL) {
            hostname = hostname.hostname
        }
        const res = parseDomain(hostname)
        if (res === null) {
            throw new Error(`Invalid domain name: ${hostname}`)
        }
        this.data = res
    }

    static isValid(hostname: string): boolean {
        return parseDomain(hostname) !== null
    }

    get hostname(): string {
        return this.data.hostname
    }

    get domain(): string {
        return this.data.domain
    }

    get tld(): string {
        return this.data.tld
    }

}
import { TldData } from "../inc/tlds";
export interface DomainParseResult {
    hostname: string;
    tldData: TldData | false;
    domain: string;
    tld: string;
}
export declare class Domainname {
    data: DomainParseResult;
    constructor(hostname: string);
    static isValid(hostname: string): boolean;
    get hostname(): string;
    get domain(): string;
    get tld(): string;
}
//# sourceMappingURL=Domainname.d.ts.map
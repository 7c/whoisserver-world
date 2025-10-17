import { TldData } from './tlds';
export interface DomainParseResult {
    hostname: string;
    tldData: TldData | false;
    domain: string;
    tld: string;
}
export declare function parseDomain(hostname: string): DomainParseResult | null;
//# sourceMappingURL=parseDomain.d.ts.map
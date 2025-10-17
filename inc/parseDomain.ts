import { sanitizedReturn } from './sanitizedReturn'
import { tlds, TldData, Tlds } from './tlds'

export interface DomainParseResult {
    hostname: string,
    tldData: TldData | false,
    domain: string,
    tld: string
}

const tldsCache = tlds()

function hasOwnProperty(target: Record<string, unknown>, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(target, key)
}

function finalizeResult(result: DomainParseResult): DomainParseResult | null {
    const sanitized = sanitizedReturn(result)
    return sanitized ? result : null
}

export function parseDomain(hostname: string): DomainParseResult | null {
    if (typeof hostname !== 'string') {
        return null
    }

    const trimmedHostname = hostname.trim()
    const parts = trimmedHostname.split('.')

    if (parts.length < 2) {
        return null
    }

    const cache = tldsCache

    if (!cache) {
        return null
    }

    const tldMap: Tlds = cache

    const ret: DomainParseResult = {
        hostname: trimmedHostname,
        tldData: false,
        domain: '',
        tld: ''
    }

    const last1 = parts[parts.length - 1].toLowerCase()
    const last2 = `${parts[parts.length - 2]}.${last1}`.toLowerCase()

    if (!hasOwnProperty(tldMap, last1)) {
        return null
    }

    const tldData = tldMap[last1]
    const sampleDomains = (tldData?.sampleDomains ?? false) as Record<string, string[]> | false

    ret.tldData = tldData
    ret.tld = tldData.tld

    if (!sampleDomains) {
        return null
    }

    ret.domain = last2

    if (parts.length > 3) {
        const last3 = `${parts[parts.length - 3]}.${last2}`.toLowerCase()
        if (hasOwnProperty(sampleDomains, last3)) {
            ret.domain = `${parts[parts.length - 4]}.${parts[parts.length - 3]}.${last2}`
            return finalizeResult(ret)
        }
    }

    if (parts.length > 2) {
        if (hasOwnProperty(sampleDomains, last2)) {
            ret.domain = `${parts[parts.length - 3]}.${last2}`
            return finalizeResult(ret)
        }
    }

    if (hasOwnProperty(sampleDomains, ret.domain)) {
        return null
    }

    return finalizeResult(ret)
}

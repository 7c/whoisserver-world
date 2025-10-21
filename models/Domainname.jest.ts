import { Domainname } from "./Domainname"

describe("Domainname class", () => {
    it("isValid should return false for invalid domain names", () => {
        expect(Domainname.isValid("invalid")).toBe(false)
    })

    it("isValid should return true for valid domain names", () => {
        expect(Domainname.isValid("example.com")).toBe(true)
    })

    it("normalizes ASCII hostnames while preserving structure", () => {
        const instance = new Domainname("Sub.TEST.Co.UK")
        expect(instance.hostname).toBe("sub.test.co.uk")
        expect(instance.domain).toBe("test.co.uk")
        expect(instance.tld).toBe("uk")
    })

    it("converts unicode domains to punycode but keeps original hostname", () => {
        const idn = new Domainname("mañana.com")
        expect(idn.hostname).toBe("mañana.com")
        expect(idn.domain).toBe("xn--maana-pta.com")
        expect(idn.tld).toBe("com")
    })

    it("handles deeply nested sample domains registered under multi-level TLDs", () => {
        const complex = new Domainname("Foo.CM.GOV.NC.TR")
        expect(complex.hostname).toBe("foo.cm.gov.nc.tr")
        expect(complex.domain).toBe("cm.gov.nc.tr")
        expect(complex.tld).toBe("tr")
    })

    it("rejects hostnames that are only sub-TLD labels even with whitespace", () => {
        expect(Domainname.isValid(" co.uk ")).toBe(false)
        expect(Domainname.isValid("   ")).toBe(false)
    })

    it("throws for malformed punycode inputs", () => {
        expect(() => new Domainname("xn---p1ai.com")).toThrow("Invalid domain name: xn---p1ai.com")
    })

    it("accepts URL objects", () => {
        const url = new URL("https://sub.example.com:1234/path?query=value")
        const domain = new Domainname(url)
        expect(domain.hostname).toBe("sub.example.com")
        expect(domain.domain).toBe("example.com")
        expect(domain.tld).toBe("com")
    })
})

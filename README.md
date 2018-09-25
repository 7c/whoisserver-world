# whoisserver-world
This repo is (for now) designed to be data layer for other repos. I plan to keep this list up2date. Most of the properties per tld is public record. 


## sampleDomains Property 
sampleDomains property contains examples of domains they are active and registered under that particular tld. These domains are taken from internet randomly. I do not have any relationship with these domains. These domains are there to verify whois servers at the end. Imagine you have a tld `abbott`, how do you want to test the whoisServer with a valid .abbott domain? That is the usage of sampleDomains property. These domains are taken randomly and might change on every commit. Do not stick to them. Final goal is to have at least 10 samples per tld

This repo is planned to be language independent (for now)

## Example Structure
```
"abbott": {
    "tld": "abbott",
    "tldUpdated": 1493856000000,
    "tldCreated": 1416441600000,
    "whoisServer": [
      "whois.afilias-srs.net"
    ],
    "registry": "http://www.abbott.com",
    "ianaUrl": "https://www.iana.org/domains/root/db/abbott.html",
    "t": 1537889120657,
    "version": 1,
    "sampleDomains": {
      "abbott": [
        "metrics.abbott",
        "smetrics.abbott",
        "nic.abbott"
      ]
    },
    "type": "generic"
  },
  "abbvie": {
    "tld": "abbvie",
    "tldUpdated": 1493769600000,
    "tldCreated": 1456444800000,
    "whoisServer": [
      "whois.afilias-srs.net"
    ],
    "registry": "http://www.abbvie.com",
    "ianaUrl": "https://www.iana.org/domains/root/db/abbvie.html",
    "t": 1537889121806,
    "version": 1,
    "sampleDomains": {
      "abbvie": [
        "nic.abbvie"
      ]
    },
    "type": "generic"
  },
  "abc": {
    "tld": "abc",
    "tldUpdated": 1469664000000,
    "tldCreated": 1469059200000,
    "whoisServer": [
      "whois.nic.abc"
    ],
    "registry": "http://abc.com",
    "ianaUrl": "https://www.iana.org/domains/root/db/abc.html",
    "t": 1537889122013,
    "version": 1,
    "sampleDomains": {},
    "type": "generic"
  },
...
```
# whoisserver-world
This repo is (for now) designed to be data layer for other repos. I plan to keep this list up2date. Most of the properties per tld is public record. 

## rdap support
added rdap support to tlds, tlds they do have rdap will have `rdapServers` array property

## idn support
if the tld is [IDN](https://en.wikipedia.org/wiki/Internationalized_domain_name), then the property `isIDN` will be set to `true`

## sampleDomains Property 
sampleDomains property contains examples of domains they are active and registered under that particular tld. These domains are taken from internet randomly. I do not have any relationship with these domains. These domains are there to verify whois servers at the end. Imagine you have a tld `abbott`, how do you want to test the whoisServer with a valid .abbott domain? That is the usage of sampleDomains property. These domains are taken randomly and might change on every commit. Do not stick to them. Final goal is to have at least 10 samples per tld

This repo is planned to be language independent (for now)

## Example Structure
```
{
  "aaa": {
    "tld": "aaa",
    "tldUpdated": 1602460800000,
    "tldCreated": 1439424000000,
    "whoisServer": [],
    "registry": "http://www.aaa.com",
    "ianaUrl": "https://www.iana.org/domains/root/db/aaa.html",
    "t": 1611784170878,
    "version": 1,
    "sampleDomains": {
      "aaa": [
        "nic.aaa"
      ]
    },
    "type": "generic",
    "isIDN": false,
    "rdapServers": [
      "https://rdap.nic.aaa/domain/"
    ],
    "rdapUpdated": 1611696940295
  },
  "aarp": {
    "tld": "aarp",
    "tldUpdated": 1565913600000,
    "tldCreated": 1445472000000,
  
  ...............

   "africa": {
    "tld": "africa",
    "tldUpdated": 1569542400000,
    "tldCreated": 1486771200000,
    "whoisServer": [
      "africa-whois.registry.net.za"
    ],
    "registry": "http://nic.africa",
    "ianaUrl": "https://www.iana.org/domains/root/db/africa.html",
    "t": 1611784190626,
    "version": 1,
    "sampleDomains": {
      "africa": [
        "connexme.africa",
        "justslidemedia.africa",
        "gazettes.africa",
        "africoninfragroup.africa",
        "locanto.africa",
        "singo.africa",
        "cari.africa",
        "nation.africa",
        "afrik21.africa",
        "techbuild.africa",
        "umoja.africa",
        "b-ok.africa",
        "techpoint.africa",
        "mybet.africa",
        "zindi.africa",
        "absa.africa",
        "gehealthcare.africa",
        "1lib.africa",
        "truehost.africa",
        "smehub.africa"
      ]
    },
    "type": "generic",
    "isIDN": false,
    "rdapServers": [
      "https://rdap.registry.net.za/rdap/domain/"
    ],
    "rdapUpdated": 1611697020120
  },
  ....
```
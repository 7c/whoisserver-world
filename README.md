# whoisserver-world
library with parsed data to support whois operations. Library contains information about every TLD available


# install
```
npm i --save whoisserver-world
```

# Usage
```
const { tldDetails,tlds,parseDomain } = require('whoisserver-world')

console.log(tlds())
## returns json object with tlds as key

console.log(tldDetails('com'))

## returns
{ tld: 'com',
  tldUpdated: 1507161600000,
  tldCreated: 473385600000,
  whoisServer: [ 'whois.verisign-grs.com' ],
  registry: 'http://www.verisigninc.com',
  ianaUrl: 'https://www.iana.org/domains/root/db/com.html',
  t: 1611784353122,
  version: 1,
  sampleDomains:
   { com:
      [ 'spotify.com',
        'google.com',
        'googleapis.com',
        'microsoft.com',
        'mcafee.com',
        'esportsflag.com',
        'esportsguide.com',
        'dotesports.com',
        'msn.com',
        'youtube.com',
        'gamepedia.com',
        'amazonaws.com',
        'googlevideo.com',
        'thegamer.com',
        'twitter.com',
        'ip-api.com',
        'keywordseverywhere.com',
        'gvt2.com',
        'gstatic.com',
        'appspot.com' ] },
  type: 'generic',
  isIDN: false,
  rdapServers: [ 'https://rdap.verisign.com/com/v1/domain/' ],
  rdapUpdated: 1611697132397 }
```

# Features

## parseDomain
this function parses given hostnames to domains and tlds, very useful tool if you do not want to deal with PSL parsers. Supports ascii/punycode hostnames/domains as input. If you pass unicode domain, you must make sure it is lowercased, because .toLowerCase() does not work with unicode characters and you should know the locale and use .toLocaleLowerCase with proper region in order to make this function. This function uses .toLowerCase and this fails with unicode input domains. Generally not good idea to use unicode domains, but if you do, you must make sure it is lowercased before passing to this function.

```
## console.log(parseDomain("sub.test.com")) returns
{
  hostname: 'sub.test.com',
  tldData: {
    tld: 'com',
    tldUpdated: 1565740800000,
    tldCreated: 473385600000,
    whoisServer: [ 'whois.verisign-grs.com' ],
    registry: 'http://www.verisigninc.com',
    ianaUrl: 'https://www.iana.org/domains/root/db/com.html',
    t: 1672688512597,
    version: 1,
    sampleDomains: { com: [Array] },
    type: 'generic',
    isIDN: false,
    rdapServers: [ 'https://rdap.verisign.com/com/v1/domain/' ],
    rdapUpdated: 1658865599106
  },
  domain: 'test.com',
  tld: 'com'
}
```

## rdap support
added rdap support to tlds, tlds they do have rdap will have `rdapServers` array property

## idn support
if the tld is [IDN](https://en.wikipedia.org/wiki/Internationalized_domain_name), then the property `isIDN` will be set to `true`

## single file support
Added `tlds/` folder for dynamically loading files instead of loading and keeping single .json file in memory

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
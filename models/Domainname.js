"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domainname = void 0;
const parseDomain_1 = require("../inc/parseDomain");
class Domainname {
    constructor(hostname) {
        if (hostname instanceof URL) {
            hostname = hostname.hostname;
        }
        const res = (0, parseDomain_1.parseDomain)(hostname);
        if (res === null) {
            throw new Error(`Invalid domain name: ${hostname}`);
        }
        this.data = res;
    }
    static isValid(hostname) {
        return (0, parseDomain_1.parseDomain)(hostname) !== null;
    }
    get hostname() {
        return this.data.hostname;
    }
    get domain() {
        return this.data.domain;
    }
    get tld() {
        return this.data.tld;
    }
}
exports.Domainname = Domainname;
//# sourceMappingURL=Domainname.js.map
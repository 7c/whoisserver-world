"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDomain = parseDomain;
const sanitizedReturn_1 = require("./sanitizedReturn");
const tlds_1 = require("./tlds");
const tldsCache = (0, tlds_1.tlds)();
function hasOwnProperty(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
}
function finalizeResult(result) {
    const sanitized = (0, sanitizedReturn_1.sanitizedReturn)(result);
    return sanitized ? result : null;
}
function parseDomain(hostname) {
    var _a;
    if (typeof hostname !== 'string') {
        return null;
    }
    const trimmedHostname = hostname.trim();
    const parts = trimmedHostname.split('.');
    if (parts.length < 2) {
        return null;
    }
    const cache = tldsCache;
    if (!cache) {
        return null;
    }
    const tldMap = cache;
    const ret = {
        hostname: trimmedHostname,
        tldData: false,
        domain: '',
        tld: ''
    };
    const last1 = parts[parts.length - 1].toLowerCase();
    const last2 = `${parts[parts.length - 2]}.${last1}`.toLowerCase();
    if (!hasOwnProperty(tldMap, last1)) {
        return null;
    }
    const tldData = tldMap[last1];
    const sampleDomains = ((_a = tldData === null || tldData === void 0 ? void 0 : tldData.sampleDomains) !== null && _a !== void 0 ? _a : false);
    ret.tldData = tldData;
    ret.tld = tldData.tld;
    if (!sampleDomains) {
        return null;
    }
    ret.domain = last2;
    if (parts.length > 3) {
        const last3 = `${parts[parts.length - 3]}.${last2}`.toLowerCase();
        if (hasOwnProperty(sampleDomains, last3)) {
            ret.domain = `${parts[parts.length - 4]}.${parts[parts.length - 3]}.${last2}`;
            return finalizeResult(ret);
        }
    }
    if (parts.length > 2) {
        if (hasOwnProperty(sampleDomains, last2)) {
            ret.domain = `${parts[parts.length - 3]}.${last2}`;
            return finalizeResult(ret);
        }
    }
    if (hasOwnProperty(sampleDomains, ret.domain)) {
        return null;
    }
    return finalizeResult(ret);
}
//# sourceMappingURL=parseDomain.js.map
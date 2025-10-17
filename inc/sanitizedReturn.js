"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizedReturn = sanitizedReturn;
const hasUnicodePart_1 = require("./hasUnicodePart");
const punycode_1 = __importDefault(require("punycode/"));
const { validHostname } = require('mybase');
function sanitizedReturn(ret) {
    // do we have a unicode domain ?
    if ((0, hasUnicodePart_1.hasUnicodePart)(ret.domain))
        ret.domain = punycode_1.default.toASCII(ret.domain);
    else {
        ret.domain = ret.domain.toLowerCase();
        ret.hostname = ret.hostname.toLowerCase();
    }
    if (!validHostname(ret.domain))
        return null;
    if (ret.domain.search(/^xn--/) === 0) {
        try {
            punycode_1.default.toUnicode(ret.domain);
        }
        catch (err) {
            // invalid idn domain
            return null;
        }
    }
    return ret;
}
//# sourceMappingURL=sanitizedReturn.js.map
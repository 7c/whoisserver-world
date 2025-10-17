"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUnicodePart = hasUnicodePart;
const punycode_1 = __importDefault(require("punycode/"));
/**
 * Checks if a domain has a unicode part
 * @param domain - The domain to check
 * @returns True if the domain has a unicode part, false otherwise
 */
function hasUnicodePart(domain) {
    try {
        return punycode_1.default.toASCII(domain) !== domain;
    }
    catch (err) {
        // console.log(err)
    }
    return false;
}
//# sourceMappingURL=hasUnicodePart.js.map
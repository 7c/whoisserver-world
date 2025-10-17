"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tldDetails = tldDetails;
const tlds_1 = require("./tlds");
const tlds_cache = (0, tlds_1.tlds)(true);
function tldDetails(tld) {
    if (tlds_cache && tlds_cache.hasOwnProperty(tld.trim().toLowerCase())) {
        return tlds_cache[tld.trim().toLowerCase()];
    }
    return false;
}
//# sourceMappingURL=tldDetails.js.map
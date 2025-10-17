"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domainname = exports.parseDomain = exports.tldDetails = exports.tlds = void 0;
var tlds_1 = require("./inc/tlds");
Object.defineProperty(exports, "tlds", { enumerable: true, get: function () { return tlds_1.tlds; } });
var tldDetails_1 = require("./inc/tldDetails");
Object.defineProperty(exports, "tldDetails", { enumerable: true, get: function () { return tldDetails_1.tldDetails; } });
var parseDomain_1 = require("./inc/parseDomain");
Object.defineProperty(exports, "parseDomain", { enumerable: true, get: function () { return parseDomain_1.parseDomain; } });
var Domainname_1 = require("./models/Domainname");
Object.defineProperty(exports, "Domainname", { enumerable: true, get: function () { return Domainname_1.Domainname; } });
//# sourceMappingURL=index.js.map
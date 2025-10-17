"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tlds = tlds;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let tldsCache = false;
/**
 * returns all TLDs as Tlds object
 * @throws {Error} if the file is not found or if the file is not valid JSON
 */
function tlds(cache = true) {
    const json_path = path_1.default.join(__dirname, '../whoisservers.json');
    if (cache) {
        if (tldsCache) {
            return tldsCache;
        }
        tldsCache = JSON.parse(fs_1.default.readFileSync(json_path, 'utf8'));
        return tldsCache;
    }
    return JSON.parse(fs_1.default.readFileSync(json_path, 'utf8'));
}
//# sourceMappingURL=tlds.js.map
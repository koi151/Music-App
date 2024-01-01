"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSlug = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const convertToSlug = (inputString) => {
    const unidecodeString = (0, unidecode_1.default)(inputString).trim();
    return unidecodeString.replace(/\s+/g, '-');
};
exports.convertToSlug = convertToSlug;

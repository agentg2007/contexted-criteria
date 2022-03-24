"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = (value, condition) => {
    if (typeof value !== "string")
        return false;
    const { CaseSensitive = false, Value: v } = condition;
    const Operator = condition.Operator;
    let Value = v;
    if (Operator === "empty")
        return Value.length === 0;
    else if (Operator === "notEmpty")
        return Value.length > 0;
    if (CaseSensitive === false) {
        value = lodash_1.default.toLower(value);
        Value = lodash_1.default.toLower(Value);
    }
    switch (Operator) {
        case "eq": return value === Value;
        case "ne": return value !== Value;
        case "contains": return lodash_1.default.includes(value, Value);
        case "endsWith": return lodash_1.default.endsWith(value, Value);
        case "startsWith": return lodash_1.default.startsWith(value, Value);
        default:
            return false;
    }
};

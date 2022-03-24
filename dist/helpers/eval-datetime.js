"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = (value, condition) => {
    const { Operator: o, Value: v } = condition;
    const Operator = o;
    const Value = lodash_1.default.isString(v) ? new Date(Date.parse(v)) : v;
    value = lodash_1.default.isString(value) ? new Date(Date.parse(value)) : value;
    if (!lodash_1.default.isDate(value) || !lodash_1.default.isDate(Value))
        return false;
    switch (Operator) {
        case "eq": return value === Value;
        case "ge": return value >= Value;
        case "gt": return value > Value;
        case "le": return value <= Value;
        case "lt": return value < Value;
        case "ne": return value !== Value;
        default:
            return false;
    }
};

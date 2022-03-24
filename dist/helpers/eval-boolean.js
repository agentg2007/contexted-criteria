"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = (value, condition) => {
    const { Value: v } = condition;
    let Value = v;
    var areTrue = [
        'yes',
        'true',
        true,
        'y',
        1,
        '1'
    ];
    if (lodash_1.default.isString(value)) {
        value = lodash_1.default.indexOf(areTrue, value.toLowerCase()) >= 0;
    }
    if (lodash_1.default.isString(v)) {
        Value = lodash_1.default.indexOf(areTrue, v.toLowerCase()) >= 0;
    }
    switch (condition.Operator) {
        case "eq": return value === Value;
        case "ne": return value !== Value;
        default: return false;
    }
};

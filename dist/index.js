"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eval = exports.RegisterFunction = void 0;
const lodash_1 = __importDefault(require("lodash"));
const helpers_1 = require("./helpers");
const FunctionStore = {};
const EmptyFunction = (context, e) => false;
const RegisterFunction = (...funcs) => {
    funcs.forEach(i => FunctionStore[i.Name] = i.Action);
};
exports.RegisterFunction = RegisterFunction;
const Eval = (context, condition) => {
    var _a;
    if (isGroupCondition(condition)) {
        if (condition.Conditions.length === 0) {
            return false;
        }
        else if (condition.AndOr === "and") {
            return FinalizeEval(condition.Conditions.every(i => (0, exports.Eval)(context, i)), condition);
        }
        else if (condition.AndOr === "or") {
            return FinalizeEval(condition.Conditions.some(i => (0, exports.Eval)(context, i)), condition);
        }
    }
    else if (isFieldCondition(condition)) {
        const values = lodash_1.default.at(context, [condition.Property]);
        if (values.length === 0)
            return false;
        const value = values[0];
        if (condition.Operator === "isnull") {
            return FinalizeEval(value === null || value === undefined, condition);
        }
        else if (condition.Operator === "notnull") {
            return FinalizeEval(value !== null || value !== undefined, condition);
        }
        else if (condition.DataType === "boolean") {
            return FinalizeEval((0, helpers_1.EvalBoolean)(value, condition), condition);
        }
        else if (condition.DataType === "string") {
            return FinalizeEval((0, helpers_1.EvalString)(value, condition), condition);
        }
        else if (condition.DataType === "number") {
            return FinalizeEval((0, helpers_1.EvalNumber)(value, condition), condition);
        }
        else if (condition.DataType === "datetime") {
            return FinalizeEval((0, helpers_1.EvalDateTime)(value, condition), condition);
        }
        console.warn("UnhandledFieldCondition", {
            PropertyValue: lodash_1.default.at(context, [condition.Property]),
            Condition: condition,
        });
    }
    else if (isFunctionCondition(condition)) {
        const { Function, Parameter } = condition;
        return FinalizeEval(((_a = FunctionStore[Function]) !== null && _a !== void 0 ? _a : EmptyFunction)(context, Parameter), condition);
    }
    return false;
};
exports.Eval = Eval;
const FinalizeEval = (result, condition) => condition.Negate === true ? !result : result;
const hasProp = (item, ...props) => {
    return props.length > 0 && props.every(i => lodash_1.default.has(item, i));
};
const isFieldCondition = (item) => {
    return hasProp(item, "Property", "DataType", "Operator", "Value");
};
const isFunctionCondition = (item) => {
    return hasProp(item, "Function");
};
const isGroupCondition = (item) => {
    return hasProp(item, "AndOr", "Conditions");
};

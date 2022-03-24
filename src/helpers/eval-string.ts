import _ from "lodash";
import { FieldCondition, StringOperators } from "../models";

export default (value: any, condition: FieldCondition) => {
    if (typeof value !== "string") return false;
    const { CaseSensitive = false, Value: v } = condition;
    const Operator = condition.Operator as StringOperators;
    let Value = v;

    if (Operator === "empty") return Value.length === 0;
    else if (Operator === "notEmpty") return Value.length > 0;

    if (CaseSensitive === false) {
        value = _.toLower(value);
        Value = _.toLower(Value);
    }
    switch (Operator) {
        case "eq": return value === Value;
        case "ne": return value !== Value;
        case "contains": return _.includes(value, Value);
        case "endsWith": return _.endsWith(value, Value);
        case "startsWith": return _.startsWith(value, Value);
        default:
            return false;
    }
}
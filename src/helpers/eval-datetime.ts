import _ from "lodash";
import { DateTimeOperators, FieldCondition } from "../models"

export default (value: any, condition: FieldCondition) => {
    const { Operator: o, Value: v } = condition;
    const Operator = o as DateTimeOperators;
    const Value = _.isString(v) ? new Date(Date.parse(v)) : v;
    value = _.isString(value) ? new Date(Date.parse(value)) : value;

    if (!_.isDate(value) || !_.isDate(Value)) return false;

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
}
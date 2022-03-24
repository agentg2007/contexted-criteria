import _ from "lodash";
import { BooleanOperators, FieldCondition } from "../models";

export default (value: any, condition: FieldCondition) => {
    const { Value: v } = condition;
    let Value: boolean = v;
    var areTrue = [
        'yes',
        'true',
        true,
        'y',
        1,
        '1'
    ];

    if (_.isString(value)) {
        value = _.indexOf(areTrue, value.toLowerCase()) >= 0;
    }
    if (_.isString(v)) {
        Value = _.indexOf(areTrue, v.toLowerCase()) >= 0;
    }
    switch (condition.Operator as BooleanOperators) {
        case "eq": return value === Value;
        case "ne": return value !== Value;
        default: return false
    }
};
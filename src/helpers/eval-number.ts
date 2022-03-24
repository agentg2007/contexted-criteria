import { FieldCondition, NumberOperators } from "../models";

export default (value: any, condition: FieldCondition) => {
    const { Value } = condition;
    const nv = Number(Value);
    value = Number(value);

    switch (condition.Operator as NumberOperators) {
        case "be": {
            if (!Array.isArray(Value) || Value.length !== 2) return false;
            else {
                const n1 = Number(Value[0]), n2 = Number(Value[1]);
                return value > n1 && value < n2;
            }
        };
        case "bt": {
            if (!Array.isArray(Value) || Value.length !== 2) return false;
            else {
                const n1 = Number(Value[0]), n2 = Number(Value[1]);
                return value >= n1 && value <= n2;
            }
        };
        case "eq": return value === nv;
        case "ne": return value !== nv;
        case "ge": return value >= nv;
        case "gt": return value > nv;
        case "le": return value <= nv;
        case "lt": return value < nv;
        default:
            return false;
    }
}
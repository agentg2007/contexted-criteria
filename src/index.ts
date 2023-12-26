import _, { Dictionary } from "lodash";
import {
    EvalBoolean,
    EvalDateTime,
    EvalNumber,
    EvalString
} from "./helpers";
import {
    BooleanOperators,
    ConditionBase,
    FieldCondition,
    FunctionCondition,
    GroupCondition,
    NumberOperators,
    StringOperators
} from "./models";

export {
    BooleanOperators,
    FieldCondition,
    FunctionCondition,
    GroupCondition,
    NumberOperators,
    StringOperators
};

type FunctionType = {
    Name: string;
    Action(context: any, e: any): boolean;
}
const FunctionStore: Dictionary<(context: any, e: any) => boolean> = {};
const EmptyFunction = (context: any, e: any) => false;
export function RegisterFunction(...funcs: FunctionType[]) {
    funcs.forEach(i => FunctionStore[i.Name] = i.Action);
}

export function Eval(context: any, condition: GroupCondition | FieldCondition | FunctionCondition): boolean {
    if (isGroupCondition(condition)) {
        if (condition.Conditions.length === 0) {
            return false;
        } else if (condition.AndOr === "and") {
            return FinalizeEval(condition.Conditions.every(i => Eval(context, i)), condition);
        } else if (condition.AndOr === "or") {
            return FinalizeEval(condition.Conditions.some(i => Eval(context, i)), condition);
        }
    } else if (isFieldCondition(condition)) {
        const values = _.at(context, [condition.Property]);
        if (values.length === 0) return false;

        const value = values[0];
        if (condition.Operator === "isnull") {
            return FinalizeEval(_.isNil(value), condition);
        } else if (condition.Operator === "notnull") {
            return FinalizeEval(!_.isNil(value), condition);
        } else if (condition.DataType === "boolean") {
            return FinalizeEval(EvalBoolean(value, condition), condition);
        } else if (condition.DataType === "string") {
            return FinalizeEval(EvalString(value, condition), condition);
        } else if (condition.DataType === "number") {
            return FinalizeEval(EvalNumber(value, condition), condition);
        } else if (condition.DataType === "datetime") {
            return FinalizeEval(EvalDateTime(value, condition), condition);
        }

        console.warn("UnhandledFieldCondition", {
            PropertyValue: _.at(context, [condition.Property]),
            Condition: condition,
        })
    } else if (isFunctionCondition(condition)) {
        const { Function, Parameter } = condition;
        return FinalizeEval((FunctionStore[Function] ?? EmptyFunction)(context, Parameter), condition);
    }
    return false;
};
function FinalizeEval(result: boolean, condition: ConditionBase) {
    return condition.Negate === true ? !result : result;
}
function hasProp(item: any, ...props: string[]) {
    return props.length > 0 && props.every(i => _.has(item, i));
}
function isFieldCondition(item: any): item is FieldCondition {
    return hasProp(item, "Property", "DataType", "Operator");
}
function isFunctionCondition(item: any): item is FunctionCondition {
    return hasProp(item, "Function");
}
function isGroupCondition(item: any): item is GroupCondition {
    return hasProp(item, "AndOr", "Conditions");
}
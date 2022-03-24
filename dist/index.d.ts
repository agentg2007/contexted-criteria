import { BooleanOperators, FieldCondition, FunctionCondition, GroupCondition, NumberOperators, StringOperators } from "./models";
export { BooleanOperators, FieldCondition, FunctionCondition, GroupCondition, NumberOperators, StringOperators };
declare type FunctionType = {
    Name: string;
    Action(context: any, e: any): boolean;
};
export declare const RegisterFunction: (...funcs: FunctionType[]) => void;
export declare const Eval: (context: any, condition: GroupCondition | FieldCondition | FunctionCondition) => boolean;

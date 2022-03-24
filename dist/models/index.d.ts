export declare type ConditionBase = {
    /**
     * If set to true, the condition result will be reversed.
     */
    Negate?: boolean;
};
export declare type GroupCondition = ConditionBase & {
    AndOr: "and" | "or";
    Conditions: (GroupCondition | FieldCondition | FunctionCondition)[];
};
export declare type FieldCondition = ConditionBase & {
    /**
     * Property to check. This supports object hierarchy (e.g. "PropertyName.SubProperty.AnotherProperty").
     */
    Property: string;
    /**
     * Data type of the property to check.
     */
    DataType: "boolean" | "datetime" | "number" | "string";
    Operator: BooleanOperators | DateTimeOperators | NumberOperators | StringOperators;
    Value: any;
    /**
     * (for string data type only) Evaluate using case sensitive value.
     * @default false
     */
    CaseSensitive?: boolean;
};
declare type BaseOperators = "eq" | "ne" | "isnull" | "notnull";
export declare type BooleanOperators = BaseOperators;
export declare type DateTimeOperators = BaseOperators | "lt" | "le" | "gt" | "ge";
/**
 * bt = Between inclusive.
 * be = Between exclusive.
 */
export declare type NumberOperators = BaseOperators | "lt" | "le" | "gt" | "ge" | "bt" | "be";
export declare type StringOperators = BaseOperators | "empty" | "notEmpty" | "startsWith" | "endsWith" | "contains";
export declare type FunctionCondition = ConditionBase & {
    /**
     * Function name to call.
     */
    Function: string;
    /**
     * Parameter object that will be passed to the function.
     */
    Parameter?: any;
};
export {};

# object-criteria

Usage:

```typescript
import { Eval, RegisterFunction } from "object-criteria";

const Data = {
  View: {
    Name: "DefaultView",
    Version: "1.0.0",
  },
  CurrentUser: {
    UserId: "User#007",
    DisplayName: "John Doe",
    DateOfBirth: "2000-04-30T00:00:00.000Z",
  },
  Permissions: ["create-person", "update-person"],
};

RegisterFunction({
  Name: "CheckPermission",
  Action: (context: any, parameter: any) => {
    return context.Permissions.includes(parameter);
  },
});

//This returns true.
console.log(
  "Checks if it has create permission AND userid is User#007",
  Eval(Data, {
    AndOr: "and",
    Conditions: [
      {
        Function: "CheckPermission",
        Parameter: "create-permission",
      },
      {
        DataType: "string",
        Property: "CurrentUser.UserId",
        Operator: "eq",
        Value: "User#007",
      },
    ],
  })
);

//This return false.
console.log(
  "Checks if it has delete permission AND userid is User#007",
  Eval(Data, {
    AndOr: "and",
    Conditions: [
      {
        Function: "CheckPermission",
        Parameter: "delete-permission",
      },
      {
        DataType: "string",
        Property: "CurrentUser.UserId",
        Operator: "eq",
        Value: "User#007",
      },
    ],
  })
);
```

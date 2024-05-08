# findBestActions


▸ **findBestActions**(`targets`, `actionable`, `fixed?`, `constraints?`, `data?`, `targetImportance?`): `Promise`\<`any`\>

Find the optimal actions for specified targets within the model.
This function identifies the actions that are most likely to achieve desired targets.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targets` | `any` | A dictionary of target outcomes to achieve. |
| `actionable` | `string`[] | A list of actionable node names. |
| `fixed` | `Object` | A dictionary of fixed nodes, if any. |
| `constraints` | `Object` | Constraints on the actions, if any. |
| `data?` | `any` | The data to use for the simulation, if any. |
| `targetImportance` | `Object` | Importance weights for the targets. |

## Returns

`Promise`\<`any`\>

A Promise resolving to the optimal actions.

**`Throws`**

If the server request fails or returns an unexpected status code.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const bestActions = await model.findBestActions(
    { 'y': 0.5 }, // Targets
    ['x'], // Actionable nodes
    { 'z': 0.5 }, // Fixed nodes
    { 'x': [0, 1] } // Constraints
);
console.log(bestActions);
```

___

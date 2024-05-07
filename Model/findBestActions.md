# findBestActions


▸ **findBestActions**(`targets`, `actionable`, `fixed?`, `constraints?`, `data?`, `targetImportance?`): `Promise`\<`any`\>

Find the optimal actions for specified targets within the model.

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

## Defined in

[model.ts:291](https://github.com/causalabs/causadb-node/blob/f466638/src/model.ts#L291)

___

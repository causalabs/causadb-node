# simulateActions


▸ **simulateActions**(`actions`, `fixed?`, `interval?`, `observationNoise?`): `Promise`\<`any`\>

Simulate actions on the model.

## Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `actions` | `any` | `undefined` | A dictionary representing the actions to simulate. |
| `fixed?` | `Object` | `{}` | A dictionary representing the fixed nodes. |
| `interval?` | `number` | `0.9` | The interval at which to simulate the actions. |
| `observationNoise?` | `boolean` | `false` | Whether to include observation noise. |

## Returns

`Promise`\<`any`\>

A dictionary representing the result of the actions, including median, lower, and upper outcome estimates.

## Defined in

[model.ts:209](https://github.com/causalabs/causadb-node/blob/f466638/src/model.ts#L209)

___

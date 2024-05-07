# causalEffects


▸ **causalEffects**(`actions`, `fixed?`, `interval?`, `observationNoise?`): `Promise`\<`any`\>

Get the causal effects of actions on the model.

## Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `actions` | `any` | `undefined` | A dictionary representing the actions to simulate. |
| `fixed` | `Object` | `{}` | A dictionary representing fixed nodes if any. |
| `interval` | `number` | `0.9` | The interval at which to simulate the action. |
| `observationNoise` | `boolean` | `false` | Whether to include observation noise. |

## Returns

`Promise`\<`any`\>

A Promise resolving to the causal effects of the actions.

___

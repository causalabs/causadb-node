# simulateActions


▸ **simulateActions**(`actions`, `fixed?`, `interval?`, `observationNoise?`): `Promise`\<`any`\>

Simulate actions on the model.
Simulates the effects of specified actions on model outcomes, providing an estimation of the resulting changes.

## Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `actions` | `any` | `undefined` | A dictionary representing the actions to simulate. |
| `fixed?` | `Object` | `{}` | A dictionary representing the fixed nodes. |
| `interval?` | `number` | `0.9` | The interval at which to simulate the actions. |
| `observationNoise?` | `boolean` | `false` | Whether to include observation noise. |

## Returns

`Promise`\<`any`\>

Promise that resolves to the outcome of the simulated actions, including median, lower, and upper estimates.

**`Throws`**

If the server request fails or returns an unexpected status code.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const outcome = await model.simulateActions({ 'x': [0, 1] });
console.log(outcome);
```

___

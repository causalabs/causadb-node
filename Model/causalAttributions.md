# causalAttributions


▸ **causalAttributions**(`outcome`, `normalise?`): `Promise`\<`any`\>

Get the causal attributions for an outcome within the model.
Causal attributions represent the contribution of each node to an outcome.

## Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `outcome` | `string` | `undefined` | The name of the outcome node. |
| `normalise` | `boolean` | `false` | Whether to normalize the causal attributions. |

## Returns

`Promise`\<`any`\>

A Promise resolving to the causal attributions for the specified outcome.

**`Throws`**

If the server request fails or returns an unexpected status code.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const attributions = await model.causalAttributions('x');
console.log(attributions);
```

___

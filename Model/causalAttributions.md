# causalAttributions


▸ **causalAttributions**(`outcome`, `normalise?`): `Promise`\<`any`\>

Get the causal attributions for an outcome within the model.

## Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `outcome` | `string` | `undefined` | The name of the outcome node. |
| `normalise` | `boolean` | `false` | Whether to normalize the causal attributions. |

## Returns

`Promise`\<`any`\>

A Promise resolving to the causal attributions for the specified outcome.

## Defined in

[model.ts:319](https://github.com/causalabs/causadb-node/blob/f466638/src/model.ts#L319)

___

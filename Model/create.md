# create


▸ **create**(`modelName`, `client`): `Promise`\<``Model``\>

Creates a new model and adds it to the CausaDB system.

## Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `client` | ``CausaDB`` |

## Returns

`Promise`\<``Model``\>

The current state of the model.

**`Throws`**

Error if the request fails.

**`Throws`**

Error if the model does not exist.

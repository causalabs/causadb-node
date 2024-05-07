# create


▸ **create**(`modelName`, `client`): `Promise`\<[`Model`](Model.md)\>

Creates a new model and adds it to the CausaDB system.

## Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `client` | [`CausaDB`](CausaDB.md) |

## Returns

`Promise`\<[`Model`](Model.md)\>

The current state of the model.

**`Throws`**

Error if the request fails.

**`Throws`**

Error if the model does not exist.

## Defined in

[model.ts:29](https://github.com/causalabs/causadb-node/blob/f466638/src/model.ts#L29)
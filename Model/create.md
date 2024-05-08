# create


▸ **create**(`modelName`, `client`): `Promise`\<``Model``\>

Creates a new model and adds it to the CausaDB system.
Retrieves any existing configuration from the server and then updates the server with any new configurations.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelName` | `string` | The name of the model to create. |
| `client` | ``CausaDB`` | A CausaDB client. |

## Returns

`Promise`\<``Model``\>

The current state of the model.

**`Throws`**

If the request fails or the model does not exist.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-id', 'test-token-secret');
const model = await Model.create('test-model', client);
```

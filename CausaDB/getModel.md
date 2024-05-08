# getModel


▸ **getModel**(`modelName`): `Promise`\<``Model``\>

Get a model by name. This will return a model object that can be used to interact with the model on the CausaDB cloud.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelName` | `string` | The name of the model. |

## Returns

`Promise`\<``Model``\>

The model object.

**`Throws`**

If the model is not found.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-id', 'test-token-secret');
const model = await client.getModel('test-model');
```

___

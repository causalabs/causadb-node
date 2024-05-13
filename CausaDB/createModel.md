# createModel


▸ **createModel**(`modelName`): `Promise`\<``Model``\>

Create a model and add it to the CausaDB system. This will return a model object that can be used to interact with the model on the CausaDB cloud.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelName` | `string` | The name of the model. |

## Returns

`Promise`\<``Model``\>

The model object.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-secret');
const model = await client.createModel('test-model');
```

___

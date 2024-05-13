# listModels


▸ **listModels**(): `Promise`\<``Model``[]\>

List all models. This will return a list of model objects that can be used to interact with the models on the CausaDB cloud.

## Returns

`Promise`\<``Model``[]\>

A list of model objects.

**`Throws`**

If there is a server error.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-secret');
const models = await client.listModels();
```

___

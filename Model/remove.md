# remove


▸ **remove**(): `Promise`\<`void`\>

Remove the model from the CausaDB system.
Deletes the model's configuration and data from the server.

## Returns

`Promise`\<`void`\>

Promise that resolves when the model has been removed.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.remove();
```

___
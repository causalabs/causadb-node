# getNodes


▸ **getNodes**(): `Promise`\<`string`[]\>

Get the nodes of the model.
Nodes represent individual variables or features in the model.

## Returns

`Promise`\<`string`[]\>

A list of node names.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const nodes = await model.getNodes();
```

___

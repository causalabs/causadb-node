# getNodeTypes


▸ **getNodeTypes**(): `Promise`\<`any`\>

Get the node types of the model.
Node types define the type of data each node represents.

## Returns

`Promise`\<`any`\>

A dictionary of node types.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const nodeTypes = await model.getNodeTypes();
```

___

# getEdges


▸ **getEdges**(): `Promise`\<[`string`, `string`][]\>

Get the edges of the model.
Edges represent relationships between nodes.

## Returns

`Promise`\<[`string`, `string`][]\>

A list of tuples representing edges between nodes.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const edges = await model.getEdges();
```

___

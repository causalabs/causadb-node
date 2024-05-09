# setEdges


▸ **setEdges**(`edges`): `Promise`\<`void`\>

Set the edges of the model.
Edges represent relationships between nodes.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `edges` | [`string`, `string`][] | A list of tuples representing edges between nodes. |

## Returns

`Promise`\<`void`\>

Promise that resolves when the edges have been set.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.setEdges([['x', 'y'], ['y', 'z']]);
```

___

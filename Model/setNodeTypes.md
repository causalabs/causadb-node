# setNodeTypes


▸ **setNodeTypes**(`nodeTypes`): `Promise`\<`void`\>

Set the node types of the model.
Node types define the type of data each node represents.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeTypes` | `any` | A dictionary of node types. |

## Returns

`Promise`\<`void`\>

Promise that resolves when the node types have been set.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.setNodeTypes({ 'x': 'continuous', 'y': 'categorical' });
```

___

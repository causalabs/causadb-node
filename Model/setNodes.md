# setNodes


▸ **setNodes**(`nodes`): `Promise`\<`void`\>

Set the nodes of the model.
Nodes represent individual variables or features in the model.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodes` | `string`[] | A list of node names. |

## Returns

`Promise`\<`void`\>

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.setNodes(['x', 'y', 'z']);
```

___

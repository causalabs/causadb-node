# detach


▸ **detach**(`dataName`): `Promise`\<`void`\>

Detach data from the model.
Detaching removes the association of the data with the model.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data to detach. |

## Returns

`Promise`\<`void`\>

Promise that resolves when the data has been detached.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.detach('test-data');
```

___

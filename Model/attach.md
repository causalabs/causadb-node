# attach


▸ **attach**(`dataName`): `Promise`\<`void`\>

Attach data to the model.
The data will be used during model training and inference.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data to attach. |

## Returns

`Promise`\<`void`\>

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.attach('test-data');
```

___

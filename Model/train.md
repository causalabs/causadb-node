# train


▸ **train**(`wait?`, `pollInterval?`): `Promise`\<`void`\>

Train the model.
Training updates the model parameters based on the attached data.

## Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wait` | `boolean` | `true` | Whether to wait for the model to finish training. |
| `pollInterval` | `number` | `0.2` | The interval at which to poll the server for the model status. |

## Returns

`Promise`\<`void`\>

Promise that resolves when the model has been trained.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
await model.train();
```

___

# status


▸ **status**(): `Promise`\<`string`\>

Get the status of the model.
The status indicates the current state of the model (e.g., 'trained', 'untrained').

## Returns

`Promise`\<`string`\>

The status of the model.

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const model = await client.getModel('test-model');
const status = await model.status();
```

___

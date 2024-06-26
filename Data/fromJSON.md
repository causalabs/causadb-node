# fromJSON


▸ **fromJSON**(`data`): `Promise`\<`void`\>

Add data from a JSON object.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The JSON object representing the data. |

## Returns

`Promise`\<`void`\>

Promise that resolves when the data has been added.

**`Throws`**

If pushing data to the server fails.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-secret');
const data = new Data('test-data', client);
await data.fromJSON({
    "column1": [1, 2, 3],
    "column2": [4, 5, 6]
});
```

___
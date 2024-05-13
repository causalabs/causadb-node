# fromCSV


▸ **fromCSV**(`filepath`): `Promise`\<`void`\>

Add data from a CSV file.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the CSV file. |

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
await data.fromCSV('path/to/data.csv');
```

___

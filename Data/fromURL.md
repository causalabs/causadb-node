# fromURL


▸ **fromURL**(`url`): `Promise`\<`void`\>

Add data from a URL.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL to the CSV file. |

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
await data.fromURL('https://example.com/data.csv');
```

___

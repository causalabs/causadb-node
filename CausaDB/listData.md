# listData


▸ **listData**(): `Promise`\<``Data``[]\>

List all data. This will return a list of data objects that can be used to interact with the data on the CausaDB cloud.

## Returns

`Promise`\<``Data``[]\>

A list of data objects.

**`Throws`**

If there is a server error.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-id', 'test-token-secret');
const dataList = await client.listData();
```

___

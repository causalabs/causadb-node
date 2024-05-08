# addData


▸ **addData**(`dataName`): ``Data``

Add data to the CausaDB system. This can be either data stored directly on the CausaDB cloud or data stored externally and accessed via credentials.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data. |

## Returns

``Data``

The data object.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-id', 'test-token-secret');
const data = client.addData('test-data');
await data.fromCSV('path/to/data.csv');
```

___

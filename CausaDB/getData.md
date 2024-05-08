# getData


▸ **getData**(`dataName`): `Promise`\<``Data``\>

Get a data object by name. This will return a data object that can be used to interact with the data on the CausaDB cloud.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data. |

## Returns

`Promise`\<``Data``\>

The data object.

**`Throws`**

If the data is not found.

**`Example`**

```typescript
const client = new CausaDB();
await client.setToken('test-token-id', 'test-token-secret');
const data = await client.getData('test-data');
```

___

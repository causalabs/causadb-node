# setToken


▸ **setToken**(`tokenId`, `tokenSecret`): `Promise`\<`boolean`\>

Set the token for the CausaDB client. This is required to authenticate with the CausaDB API.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenId` | `string` | Token ID provided by CausaDB. |
| `tokenSecret` | `string` | Token secret provided by CausaDB. |

## Returns

`Promise`\<`boolean`\>

True if the token is valid, False otherwise.

**`Throws`**

If the token is invalid.

**`Example`**

```typescript
const client = new CausaDB();
const valid = await client.setToken('test-token-id', 'test-token-secret');
```

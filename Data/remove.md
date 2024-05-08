# remove


▸ **remove**(): `Promise`\<`void`\>

Remove the data from the CausaDB system.

## Returns

`Promise`\<`void`\>

Promise<void>

**`Throws`**

If the server request fails.

**`Example`**

```typescript
const data = client.getData('test-data');
await data.remove();
```

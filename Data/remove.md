# remove


▸ **remove**(): `Promise`\<`void`\>

Remove the data from the CausaDB system.

## Returns

`Promise`\<`void`\>

**`Example`**

```typescript
const data = client.getData('test-data');
await data.remove();
```

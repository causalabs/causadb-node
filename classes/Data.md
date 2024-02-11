[causadb](../README.md) / [Exports](../modules.md) / Data

# Class: Data

## Table of contents

### Constructors

- [constructor](Data.md#constructor)

### Properties

- [client](Data.md#client)
- [dataName](Data.md#dataname)

### Methods

- [fromCSV](Data.md#fromcsv)
- [push](Data.md#push)
- [remove](Data.md#remove)

## Constructors

### constructor

• **new Data**(`dataName`, `client`): [`Data`](Data.md)

Initializes the Data class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data. |
| `client` | [`CausaDB`](CausaDB.md) | A CausaDB client. |

#### Returns

[`Data`](Data.md)

#### Defined in

[data.ts:18](https://github.com/causalabs/causadb-node/blob/49fa231/src/data.ts#L18)

## Properties

### client

• **client**: [`CausaDB`](CausaDB.md)

#### Defined in

[data.ts:10](https://github.com/causalabs/causadb-node/blob/49fa231/src/data.ts#L10)

___

### dataName

• **dataName**: `string`

#### Defined in

[data.ts:11](https://github.com/causalabs/causadb-node/blob/49fa231/src/data.ts#L11)

## Methods

### fromCSV

▸ **fromCSV**(`filepath`): `Promise`\<`void`\>

Add data from a CSV file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filepath` | `string` | The path to the CSV file. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[data.ts:39](https://github.com/causalabs/causadb-node/blob/49fa231/src/data.ts#L39)

___

### push

▸ **push**(`data`): `Promise`\<`void`\>

Pushes the data to the CausaDB server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The new data. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[data.ts:60](https://github.com/causalabs/causadb-node/blob/49fa231/src/data.ts#L60)

___

### remove

▸ **remove**(): `Promise`\<`void`\>

Remove the data from the CausaDB system.

#### Returns

`Promise`\<`void`\>

#### Defined in

[data.ts:26](https://github.com/causalabs/causadb-node/blob/49fa231/src/data.ts#L26)

[causadb](../README.md) / [Exports](../modules.md) / CausaDB

# Class: CausaDB

## Table of contents

### Constructors

- [constructor](CausaDB.md#constructor)

### Properties

- [tokenId](CausaDB.md#tokenid)
- [tokenSecret](CausaDB.md#tokensecret)

### Methods

- [addData](CausaDB.md#adddata)
- [createModel](CausaDB.md#createmodel)
- [getData](CausaDB.md#getdata)
- [getModel](CausaDB.md#getmodel)
- [listData](CausaDB.md#listdata)
- [listModels](CausaDB.md#listmodels)
- [setToken](CausaDB.md#settoken)

## Constructors

### constructor

• **new CausaDB**(): [`CausaDB`](CausaDB.md)

Initializes the CausaDB client.

#### Returns

[`CausaDB`](CausaDB.md)

#### Defined in

[causadb.ts:15](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L15)

## Properties

### tokenId

• **tokenId**: ``null`` \| `string`

#### Defined in

[causadb.ts:9](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L9)

___

### tokenSecret

• **tokenSecret**: ``null`` \| `string`

#### Defined in

[causadb.ts:10](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L10)

## Methods

### addData

▸ **addData**(`dataName`): [`Data`](Data.md)

Add data to the CausaDB system.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data. |

#### Returns

[`Data`](Data.md)

The data object.

#### Defined in

[causadb.ts:52](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L52)

___

### createModel

▸ **createModel**(`modelName`): `Promise`\<[`Model`](Model.md)\>

Create a model and add it to the CausaDB system.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelName` | `string` | The name of the model. |

#### Returns

`Promise`\<[`Model`](Model.md)\>

The model object.

#### Defined in

[causadb.ts:43](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L43)

___

### getData

▸ **getData**(`dataName`): `Promise`\<[`Data`](Data.md)\>

Get a data by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data. |

#### Returns

`Promise`\<[`Data`](Data.md)\>

The data object.

#### Defined in

[causadb.ts:91](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L91)

___

### getModel

▸ **getModel**(`modelName`): `Promise`\<[`Model`](Model.md)\>

Get a model by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelName` | `string` | The name of the model. |

#### Returns

`Promise`\<[`Model`](Model.md)\>

The model object.

#### Defined in

[causadb.ts:61](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L61)

___

### listData

▸ **listData**(): `Promise`\<[`Data`](Data.md)[]\>

List all data.

#### Returns

`Promise`\<[`Data`](Data.md)[]\>

A list of data objects.

#### Defined in

[causadb.ts:111](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L111)

___

### listModels

▸ **listModels**(): `Promise`\<[`Model`](Model.md)[]\>

List all models.

#### Returns

`Promise`\<[`Model`](Model.md)[]\>

A list of model objects.

#### Defined in

[causadb.ts:75](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L75)

___

### setToken

▸ **setToken**(`tokenId`, `tokenSecret`): `Promise`\<`boolean`\>

Set the token for the CausaDB client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenId` | `string` | Token ID provided by CausaDB. |
| `tokenSecret` | `string` | Token secret provided by CausaDB. |

#### Returns

`Promise`\<`boolean`\>

True if the token is valid, False otherwise.

#### Defined in

[causadb.ts:26](https://github.com/causalabs/causadb-node/blob/fa6c692/src/causadb.ts#L26)

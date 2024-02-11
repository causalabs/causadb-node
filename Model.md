[causadb](../README.md) / [Exports](../modules.md) / Model

# Class: Model

## Table of contents

### Constructors

- [constructor](Model.md#constructor)

### Properties

- [client](Model.md#client)
- [config](Model.md#config)
- [modelName](Model.md#modelname)

### Methods

- [attach](Model.md#attach)
- [detach](Model.md#detach)
- [getEdges](Model.md#getedges)
- [getNodeTypes](Model.md#getnodetypes)
- [getNodes](Model.md#getnodes)
- [pull](Model.md#pull)
- [push](Model.md#push)
- [remove](Model.md#remove)
- [setEdges](Model.md#setedges)
- [setNodeTypes](Model.md#setnodetypes)
- [setNodes](Model.md#setnodes)
- [simulateAction](Model.md#simulateaction)
- [status](Model.md#status)
- [train](Model.md#train)
- [create](Model.md#create)

## Constructors

### constructor

• **new Model**(`modelName`, `client`): [`Model`](Model.md)

Initializes the Model class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelName` | `string` | The name of the model. |
| `client` | [`CausaDB`](CausaDB.md) | A CausaDB client. |

#### Returns

[`Model`](Model.md)

#### Defined in

[model.ts:17](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L17)

## Properties

### client

• **client**: [`CausaDB`](CausaDB.md)

#### Defined in

[model.ts:8](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L8)

___

### config

• **config**: `any`

#### Defined in

[model.ts:10](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L10)

___

### modelName

• **modelName**: `string`

#### Defined in

[model.ts:9](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L9)

## Methods

### attach

▸ **attach**(`dataName`): `Promise`\<`void`\>

Attach data to the model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data to attach. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:142](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L142)

___

### detach

▸ **detach**(`dataName`): `Promise`\<`void`\>

Detach data from the model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataName` | `string` | The name of the data to detach. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:155](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L155)

___

### getEdges

▸ **getEdges**(): `Promise`\<[`string`, `string`][]\>

Get the edges of the model.

#### Returns

`Promise`\<[`string`, `string`][]\>

A list of tuples representing edges.

#### Defined in

[model.ts:98](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L98)

___

### getNodeTypes

▸ **getNodeTypes**(): `Promise`\<`any`\>

Get the node types of the model.

#### Returns

`Promise`\<`any`\>

A dictionary of node types.

#### Defined in

[model.ts:128](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L128)

___

### getNodes

▸ **getNodes**(): `Promise`\<`string`[]\>

Get the nodes of the model.

#### Returns

`Promise`\<`string`[]\>

A list of node names.

#### Defined in

[model.ts:69](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L69)

___

### pull

▸ **pull**(): `Promise`\<`void`\>

Pulls configuration from the CausaDB server. Do nothing if the model does not exist.

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:234](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L234)

___

### push

▸ **push**(): `Promise`\<`void`\>

Pushes the current configuration of the model to the CausaDB server.

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:222](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L222)

___

### remove

▸ **remove**(): `Promise`\<`void`\>

Remove the model from the CausaDB system.

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:41](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L41)

___

### setEdges

▸ **setEdges**(`edges`): `Promise`\<`void`\>

Set the edges of the model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `edges` | [`string`, `string`][] | A list of tuples representing edges. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:83](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L83)

___

### setNodeTypes

▸ **setNodeTypes**(`nodeTypes`): `Promise`\<`void`\>

Set the node types of the model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeTypes` | `any` | A dictionary of node types. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:113](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L113)

___

### setNodes

▸ **setNodes**(`nodes`): `Promise`\<`void`\>

Set the nodes of the model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodes` | `string`[] | A list of node names. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:54](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L54)

___

### simulateAction

▸ **simulateAction**(`action`): `Promise`\<`any`\>

Simulate an action on the model.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | `any` | A dictionary representing the action. |

#### Returns

`Promise`\<`any`\>

A dictionary representing the result of the action.

#### Defined in

[model.ts:206](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L206)

___

### status

▸ **status**(): `Promise`\<`string`\>

Get the status of the model.

#### Returns

`Promise`\<`string`\>

The status of the model.

#### Defined in

[model.ts:191](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L191)

___

### train

▸ **train**(`wait?`, `pollInterval?`): `Promise`\<`void`\>

Train the model.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `wait` | `boolean` | `true` | Whether to wait for the model to finish training. |
| `pollInterval` | `number` | `0.2` | The interval at which to poll the server for the model status. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[model.ts:169](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L169)

___

### create

▸ **create**(`modelName`, `client`): `Promise`\<[`Model`](Model.md)\>

Creates a new model and adds it to the CausaDB system.

#### Parameters

| Name | Type |
| :------ | :------ |
| `modelName` | `string` |
| `client` | [`CausaDB`](CausaDB.md) |

#### Returns

`Promise`\<[`Model`](Model.md)\>

The current state of the model.

**`Throws`**

Error if the request fails.

**`Throws`**

Error if the model does not exist.

#### Defined in

[model.ts:29](https://github.com/causalabs/causadb-node/blob/68bf704/src/model.ts#L29)

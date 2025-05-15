[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / MemItOperationBase

# Type Alias: MemItOperationBase

> **MemItOperationBase** = `object`

Defined in: [types.ts:147](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L147)

Base type for operations returned by the "Mem It" endpoint.
Each operation in the response will have a `type` field indicating its nature.

## Properties

### type

> **type**: `string`

Defined in: [types.ts:149](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L149)

The type of operation performed (e.g., 'created-note', 'added-note-to-collection').

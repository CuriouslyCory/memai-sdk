# Type Alias: MemItOperationBase

> **MemItOperationBase** = `object`

Defined in: [types.ts:147](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L147)

Base type for operations returned by the "Mem It" endpoint.
Each operation in the response will have a `type` field indicating its nature.

## Properties

### type

> **type**: `string`

Defined in: [types.ts:149](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L149)

The type of operation performed (e.g., 'created-note', 'added-note-to-collection').

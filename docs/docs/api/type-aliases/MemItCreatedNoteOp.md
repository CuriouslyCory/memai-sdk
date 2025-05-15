[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / MemItCreatedNoteOp

# Type Alias: MemItCreatedNoteOp

> **MemItCreatedNoteOp** = [`MemItOperationBase`](MemItOperationBase.md) & `object`

Defined in: [types.ts:155](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L155)

Represents an operation where a new note was created via "Mem It".

## Type declaration

### note\_id

> **note\_id**: `string`

The ID of the newly created note.

### title

> **title**: `string`

The title of the newly created note.

### type

> **type**: `"created-note"`

### url

> **url**: `string`

The URL to access the newly created note in the Mem application.

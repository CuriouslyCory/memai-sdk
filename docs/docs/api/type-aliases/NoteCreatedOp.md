[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / NoteCreatedOp

# Type Alias: NoteCreatedOp

> **NoteCreatedOp** = [`NoteOperationBase`](NoteOperationBase.md) & `object`

Defined in: [types.ts:251](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L251)

Represents a 'created-note' operation within the [CreateNoteResponse](CreateNoteResponse.md).
This might be redundant if all details are at the top level of [CreateNoteResponse](CreateNoteResponse.md),
or it could provide specific context within the `operations` array.

## Type declaration

### note\_id?

> `optional` **note\_id**: `string`

The ID of the note, if distinct from the top-level `id` in [CreateNoteResponse](CreateNoteResponse.md).

### title?

> `optional` **title**: `string`

The title of the note, if distinct from the top-level `title`.

### type

> **type**: `"created-note"`

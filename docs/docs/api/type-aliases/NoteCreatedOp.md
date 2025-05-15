# Type Alias: NoteCreatedOp

> **NoteCreatedOp** = [`NoteOperationBase`](NoteOperationBase.md) & `object`

Defined in: [types.ts:251](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L251)

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

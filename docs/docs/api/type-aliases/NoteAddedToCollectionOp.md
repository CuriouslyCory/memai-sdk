# Type Alias: NoteAddedToCollectionOp

> **NoteAddedToCollectionOp** = [`NoteOperationBase`](NoteOperationBase.md) & `object`

Defined in: [types.ts:265](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L265)

Represents an operation where a note was added to a collection, as part of a Create Note response.

## Type declaration

### collection\_id

> **collection\_id**: `string`

The ID of the collection to which the note was added.

### collection\_title

> **collection\_title**: `string`

The title of the collection.

### type

> **type**: `"added-note-to-collection"`

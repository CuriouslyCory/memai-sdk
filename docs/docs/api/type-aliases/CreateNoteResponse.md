# Type Alias: CreateNoteResponse

> **CreateNoteResponse** = `object`

Defined in: [types.ts:284](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L284)

Response from the Create Note endpoint ([MemClient.createNote](../classes/MemClient.md#createnote)).

## See

[Create Note API Documentation](https://docs.mem.ai/api-reference/notes/create-note)

## Properties

### content

> **content**: `string`

Defined in: [types.ts:292](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L292)

The final content of the note after processing (e.g., after applying a template or auto-formatting).

***

### created\_at

> **created\_at**: `string`

Defined in: [types.ts:296](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L296)

Timestamp (ISO 8601 format) indicating when the note was created.

***

### id

> **id**: `string`

Defined in: [types.ts:286](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L286)

The unique identifier of the newly created note.

***

### operations

> **operations**: [`NoteOperation`](NoteOperation.md)[]

Defined in: [types.ts:294](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L294)

An array of operations performed during the creation of the note.

***

### title

> **title**: `string`

Defined in: [types.ts:288](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L288)

The title of the newly created note.

***

### updated\_at

> **updated\_at**: `string`

Defined in: [types.ts:298](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L298)

Timestamp (ISO 8601 format) indicating when the note was last updated.

***

### url

> **url**: `string`

Defined in: [types.ts:290](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L290)

The URL to access the newly created note in the Mem application.

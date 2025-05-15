# Type Alias: CreateNotePayload

> **CreateNotePayload** = `object`

Defined in: [types.ts:215](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L215)

Payload for creating a new note directly ([MemClient.createNote](../classes/MemClient.md#createnote)).

## See

[Create Note API Documentation](https://docs.mem.ai/api-reference/notes/create-note)

## Example

```typescript
const payload: CreateNotePayload = {
  content: "# Project Ideas\n- Idea 1\n- Idea 2",
  add_to_collections: ["Brainstorming"],
  auto_organize: "File under 'Projects' and tag with #idea",
  created_at: new Date().toISOString(),
};
```

## Properties

### add\_to\_collections?

> `optional` **add\_to\_collections**: `string`[]

Defined in: [types.ts:219](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L219)

An array of collection titles or IDs to which the new note should be added.

***

### apply\_template?

> `optional` **apply\_template**: `string`

Defined in: [types.ts:224](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L224)

The title or ID of a template to apply to the new note.

***

### auto\_format?

> `optional` **auto\_format**: `boolean` \| `string`

Defined in: [types.ts:227](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L227)

If `true`, Mem attempts to automatically format the note.
If a string, provides natural language instructions for formatting.

***

### auto\_organize?

> `optional` **auto\_organize**: `boolean` \| `string`

Defined in: [types.ts:222](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L222)

If `true`, Mem attempts to automatically organize the note.
If a string, provides natural language instructions for organization.

***

### content

> **content**: `string`

Defined in: [types.ts:217](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L217)

The content of the note, typically in Markdown format.

***

### created\_at?

> `optional` **created\_at**: `string`

Defined in: [types.ts:229](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L229)

Optional timestamp (ISO 8601 format) for when the note was created, if different from the processing time.

***

### updated\_at?

> `optional` **updated\_at**: `string`

Defined in: [types.ts:231](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L231)

Optional timestamp (ISO 8601 format) for when the note was last updated, if different from the processing time.

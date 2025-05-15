# Type Alias: MemItPayload

> **MemItPayload** = `object`

Defined in: [types.ts:131](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L131)

Payload for the "Mem It" endpoint ([MemClient.memIt](../classes/MemClient.md#memit)).
This endpoint is versatile for sending various types of content to Mem.

## See

[Mem It API Documentation](https://docs.mem.ai/api-reference/mem-it/mem-it)

## Example

```typescript
const payload: MemItPayload = {
  input: "<h1>Project Alpha Notes</h1><p>Meeting on 2024-01-15...</p>",
  instructions: "Create a new note titled 'Project Alpha Meeting' and add to 'Projects' collection.",
  context: "This content is related to Project Alpha.",
  timestamp: new Date().toISOString(),
};
```

## Properties

### context?

> `optional` **context**: `string`

Defined in: [types.ts:138](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L138)

Optional additional context to help Mem understand or categorize the input.

***

### input

> **input**: `string`

Defined in: [types.ts:133](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L133)

The primary content to be processed by Mem (e.g., raw text, HTML, a URL).

***

### instructions?

> `optional` **instructions**: `string`

Defined in: [types.ts:136](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L136)

Optional natural language instructions for Mem on how to process the input
(e.g., "Summarize this article", "Add to my reading list").

***

### timestamp?

> `optional` **timestamp**: `string`

Defined in: [types.ts:140](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L140)

Optional timestamp (ISO 8601 format) to associate with the mem, if different from the processing time.

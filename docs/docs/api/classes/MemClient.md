# Class: MemClient

Defined in: [client.ts:50](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/client.ts#L50)

Main client class for the mem.ai API SDK.

This client provides methods to interact with the various endpoints of the Mem API,
handling authentication, request retries, and error responses.

## Example

```typescript
import { MemClient } from '@mem-labs/mem-sdk'; // Assuming package name

const client = new MemClient('YOUR_API_KEY');

async function main() {
  try {
    const newNote = await client.createNote({ content: "Hello from the SDK!" });
    console.log('Created note:', newNote.title, newNote.url);
  } catch (error) {
    console.error('Error interacting with Mem API:', error);
  }
}

main();
```

## Constructors

### Constructor

> **new MemClient**(`apiKey`, `options`): `MemClient`

Defined in: [client.ts:87](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/client.ts#L87)

Creates a new instance of the MemClient.

#### Parameters

##### apiKey

`string`

Your mem.ai API key. This is required to authenticate requests.
              You can find your API key in your Mem account settings.

##### options

[`MemOptions`](../interfaces/MemOptions.md) = `{}`

Optional configuration for the client.

#### Returns

`MemClient`

#### Throws

if the API key is not provided.

#### Examples

```typescript
// Basic initialization
const client = new MemClient('YOUR_SECRET_API_KEY');
```

```typescript
// Initialization with custom options
const clientWithOptions = new MemClient('YOUR_SECRET_API_KEY', {
  baseUrl: 'https://custom-api.mem.ai/v1',
  maxRetries: 5,
  timeout: 60000, // 60 seconds
});
```

## Methods

### ~~createMem()~~

> **createMem**(`_options`): `Promise`\<`unknown`\>

Defined in: [client.ts:348](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/client.ts#L348)

Creates a mem.

#### Parameters

##### \_options

`unknown`

Options for creating the mem. (Ignored due to deprecation)

#### Returns

`Promise`\<`unknown`\>

A Promise that resolves to the created mem. (Will throw an error)

#### Deprecated

This method is deprecated. Use [memIt](#memit) for general inputs or
            [createNote](#createnote) for creating structured notes directly.
            The `memIt` endpoint provides more flexibility, and `createNote` is more specific.

#### Throws

Always throws an error indicating deprecation.

***

### createNote()

> **createNote**(`options`): `Promise`\<[`CreateNoteResponse`](../type-aliases/CreateNoteResponse.md)\>

Defined in: [client.ts:296](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/client.ts#L296)

Creates a new note in Mem.

#### Parameters

##### options

[`CreateNotePayload`](../type-aliases/CreateNotePayload.md)

The [CreateNotePayload](../type-aliases/CreateNotePayload.md) containing the content of the note
               and optional instructions for auto-organization or formatting.

#### Returns

`Promise`\<[`CreateNoteResponse`](../type-aliases/CreateNoteResponse.md)\>

A Promise that resolves to a [CreateNoteResponse](../type-aliases/CreateNoteResponse.md) object,
         which includes the created note's ID, content, title, URL, and operations performed.

#### Throws

and its subclasses if the API request fails.

#### Throws

if the request payload is malformed (e.g., invalid content).

#### Throws

if the API key is invalid or missing.

#### Throws

if the API key does not have permission for the operation.

#### Throws

if the request is rate limited.

#### Throws

if the Mem API encounters an internal server error.

#### See

[Create Note API Documentation](https://docs.mem.ai/api-reference/notes/create-note)

#### Example

```typescript
const note = await client.createNote({
  content: "# Meeting Notes\n- Discussed project X\n- Action item: Follow up with team.",
  auto_organize: "Add to 'Project X' collection"
});
console.log("Created note:", note.title, note.url);
```

***

### deleteNote()

> **deleteNote**(`id`): `Promise`\<`void`\>

Defined in: [client.ts:331](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/client.ts#L331)

Deletes a note by its ID.

#### Parameters

##### id

`string`

The unique identifier of the note to be deleted. Must be a non-empty string.

#### Returns

`Promise`\<`void`\>

A Promise that resolves when the note is successfully deleted.
         The Mem API returns a 200 OK with operation details upon successful deletion,
         which this client maps to a void Promise for simplicity in this specific method.

#### Throws

if the provided `id` is not a non-empty string.

#### Throws

and its subclasses if the API request fails.

#### Throws

if a note with the given `id` does not exist.

#### Throws

if the API key is invalid or missing.

#### Throws

if the API key does not have permission for the operation.

#### Throws

if the request is rate limited.

#### Throws

if the Mem API encounters an internal server error.

#### See

[Delete Note API Documentation](https://docs.mem.ai/api-reference/notes/delete-note)

#### Example

```typescript
const noteIdToDelete = "01234567-89ab-cdef-0123-456789abcdef";
try {
  await client.deleteNote(noteIdToDelete);
  console.log(`Note ${noteIdToDelete} deleted successfully.`);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error("Note not found:", error.message);
  } else {
    console.error("Error deleting note:", error);
  }
}
```

***

### memIt()

> **memIt**(`payload`): `Promise`\<[`MemItResponse`](../type-aliases/MemItResponse.md)\>

Defined in: [client.ts:268](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/client.ts#L268)

Creates a mem using the "mem-it" endpoint.
This endpoint is versatile and can accept various types of input (HTML, text, URLs)
and instructions for how Mem should process it.

#### Parameters

##### payload

[`MemItPayload`](../type-aliases/MemItPayload.md)

The [MemItPayload](../type-aliases/MemItPayload.md) containing the input and instructions.

#### Returns

`Promise`\<[`MemItResponse`](../type-aliases/MemItResponse.md)\>

A Promise that resolves to a [ClientMemItResponse](../type-aliases/MemItResponse.md) object,
         detailing the operations performed by Mem (e.g., note created, existing note updated).

#### Throws

and its subclasses if the API request fails.

#### Throws

if the request payload is malformed.

#### Throws

if the API key is invalid or missing.

#### Throws

if the API key does not have permission for the operation.

#### Throws

if the request is rate limited.

#### Throws

if the Mem API encounters an internal server error.

#### See

[Mem It API Documentation](https://docs.mem.ai/api-reference/mem-it/mem-it)

#### Example

```typescript
const response = await client.memIt({
  input: "Remember to buy milk tomorrow.",
  instructions: "Add this to my reminders."
});
console.log(response.operations[0].title);
```

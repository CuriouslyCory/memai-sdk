---
sidebar_position: 3
---

# Your First Note

This guide will show you how to create your first note in mem.ai using the TypeScript SDK's `memIt` functionality.

Before you begin, make sure you have your mem.ai API key. You can find this in your mem.ai settings.

```typescript
import { MemClient } from '@curiouslycory/memai-sdk';

// Replace with your actual API key
const apiKey = 'YOUR_MEM_API_KEY';

const client = new MemClient(apiKey);

async function createFirstNote() {
  try {
    const payload = {
      input: 'Hello, mem.ai! This is my first note created with the TypeScript SDK.',
      instructions: 'Create a new note with this content.',
    };

    const response = await client.memIt(payload);

    console.log('Note created successfully:', response);
    // You can access the created note's ID and URL from the response
    if (response.operations && response.operations.length > 0) {
      const createdNoteOperation = response.operations.find(op => op.type === 'created-note');
      if (createdNoteOperation && createdNoteOperation.type === 'created-note') {
        console.log('Note ID:', createdNoteOperation.note_id);
        console.log('Note URL:', createdNoteOperation.url);
      }
    }

  } catch (error) {
    console.error('Error creating note:', error);
  }
}

createFirstNote();
```

**Explanation:**

1.  **Import `MemClient`:** We import the necessary `MemClient` class from the SDK.
2.  **Initialize `MemClient`:** We create a new instance of `MemClient`, passing your API key. **Remember to replace `'YOUR_MEM_API_KEY'` with your actual API key.**
3.  **Prepare `MemItPayload`:** We create a `payload` object containing the `input` content for your note and optional `instructions` for Mem.
4.  **Call `memIt`:** We use the `client.memIt()` method to send the payload to the Mem API. This method is asynchronous, so we `await` the response.
5.  **Handle Response:** We log the response from the API. The response includes details about the operation(s) performed, such as the ID and URL of the newly created note if the `created-note` operation was successful.
6.  **Error Handling:** A basic `try...catch` block is included to catch and log any errors that occur during the API call.

Save this code as a `.ts` file in your project, replace the placeholder API key, and run it using `ts-node` or by compiling it to JavaScript and running with Node.js.

Congratulations! You've successfully created your first note using the mem.ai TypeScript SDK. 
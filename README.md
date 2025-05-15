# @curiouslycory/memai-sdk

[![npm version](https://badge.fury.io/js/%40curiouslycory%2Fmemai-sdk.svg)](https://badge.fury.io/js/%40curiouslycory%2Fmemai-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/CuriouslyCory/memai-sdk/actions/workflows/main.yml/badge.svg)](https://github.com/CuriouslyCory/memai-sdk/actions/workflows/main.yml)

A TypeScript SDK for interacting with the [Mem.ai REST API](https://mem.ai), providing an easy-to-use, type-safe interface for programmatically managing your mems. Find the [full documentation here](https://memai-sdk.curiouslycory.com)

## Features

- **Type-Safe**: Fully written in TypeScript for a better developer experience.
- **Modern JavaScript**: Uses ES modules and modern JavaScript features.
- **API Coverage**: Designed to cover core Mem.ai API functionality like `memIt`, `createNote`, and `deleteNote`.
- **Error Handling**: Includes custom error types for robust error management.
- **Retry Logic**: Built-in retry mechanism for transient network errors and rate limits.

## Installation

Install the package using your preferred package manager:

```bash
# PNPM
pnpm add @curiouslycory/memai-sdk

# NPM
npm install @curiouslycory/memai-sdk

# Yarn
yarn add @curiouslycory/memai-sdk
```

## API Key

To use this SDK, you need a Mem.ai API key. You can obtain your API key from your Mem account settings page on the Mem.ai website. Keep your API key secure and do not expose it in client-side code.

## Quick Start

Here\'s a quick example to get you started:

```typescript
import { MemClient, MemApiError } from '@curiouslycory/memai-sdk';

// Initialize the client with your API key
// Replace 'YOUR_MEM_API_KEY' with your actual key
const client = new MemClient('YOUR_MEM_API_KEY');

async function createMyNote() {
  try {
    const newNote = await client.createNote({
      content: '# My First Note\nHello from the @curiouslycory/memai-sdk!',
      auto_organize: "Add to my 'SDK Tests' collection",
    });
    console.log('Note Created Successfully!');
    console.log('ID:', newNote.id);
    console.log('Title:', newNote.title);
    console.log('URL:', newNote.url);
    console.log('Content:', newNote.content);
  } catch (error) {
    if (error instanceof MemApiError) {
      console.error(`Mem API Error (${error.statusCode}): ${error.message}`);
      // You can check for specific error types
      // if (error instanceof RateLimitError) { ... }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

createMyNote();
```

## Core Features

This SDK provides convenient methods to interact with the Mem.ai API:

- **`memIt(payload)`**: A versatile endpoint to send various types of content (text, HTML, URLs) to Mem with optional processing instructions.
- **`createNote(options)`**: Directly creates a new note with specified content and organization options.
- **`deleteNote(id)`**: Deletes a note by its ID.

For detailed information on parameters, return types, and specific error handling for each method, please refer to the TSDoc comments within the SDK code. Full API documentation generated from TSDoc will be available at [TODO: Link to documentation site from Task 11].

## Error Handling

The SDK throws custom errors that extend `MemApiError`. You can catch these errors and use `instanceof` to check for specific error types:

```typescript
import { MemClient, MemApiError, RateLimitError, NotFoundError } from \'@curiouslycory/memai-sdk\';

const client = new MemClient(\'YOUR_MEM_API_KEY\');

async function exampleOperation(noteId: string) {
  try {
    await client.deleteNote(noteId);
    console.log(\`Note ${noteId} deleted.\`);
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.warn(\`Note ${noteId} not found: ${error.message}\`);
    } else if (error instanceof RateLimitError) {
      console.warn(\`Rate limit exceeded. Try again in ${error.retryAfter} seconds.\`);
      // Implement retry logic here if desired
    } else if (error instanceof MemApiError) {
      console.error(\`Mem API Error (${error.statusCode}): ${error.message}\`);
    } else {
      console.error(\'An unexpected error occurred:\', error);
    }
  }
}

// exampleOperation(\'some-note-id-to-delete\');
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. (A more detailed `CONTRIBUTING.md` will be added later).

## License

This SDK is licensed under the [MIT License](LICENSE).

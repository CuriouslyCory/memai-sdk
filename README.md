# memai-sdk

Unofficial TypeScript SDK for the [mem.ai](https://mem.ai) REST API. This SDK provides a robust, type-safe, and ergonomic interface for interacting with the mem.ai API.

## Features

- ✅ Full TypeScript support with type-safe API client
- ✅ Support for all documented mem.ai API endpoints
- ✅ Automatic rate limit handling
- ✅ Detailed documentation and examples
- ✅ Interactive documentation with search and chat functionality

## Installation

```bash
# Using npm
npm install memai-sdk

# Using yarn
yarn add memai-sdk

# Using pnpm
pnpm add memai-sdk
```

## Quick Start

```typescript
import { MemClient } from 'memai-sdk';

// Initialize the client with your API key
const client = new MemClient('your-api-key');

// Create a new mem
async function createMem() {
  const mem = await client.createMem({
    content: 'This is a test mem created with memai-sdk',
  });
  
  console.log('Created mem:', mem);
}

createMem().catch(console.error);
```

## Documentation

For detailed documentation, examples, and API reference, visit our [documentation site](https://memai-sdk-docs.vercel.app).

## License

MIT 
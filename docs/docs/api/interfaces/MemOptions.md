# Interface: MemOptions

Defined in: [types.ts:14](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L14)

Configuration options for initializing the [MemClient](../classes/MemClient.md).
These options allow customization of the client's behavior, such as retry logic and timeouts.

## Properties

### baseUrl?

> `optional` **baseUrl**: `string`

Defined in: [types.ts:20](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L20)

The base URL for the Mem API.

#### Default

```ts
'https://api.mem.ai/v1'
You generally don't need to change this unless instructed by Mem support or for testing purposes.
```

***

### maxRetries?

> `optional` **maxRetries**: `number`

Defined in: [types.ts:27](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L27)

The maximum number of times to retry a request if it fails due to transient issues
(like network errors or rate limits).

#### Default

```ts
3
```

***

### retryDelay?

> `optional` **retryDelay**: `number`

Defined in: [types.ts:40](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L40)

The base delay in milliseconds for retrying requests.
This delay will be increased exponentially for subsequent retries.

#### Default

```ts
1000 (1 second)
```

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [types.ts:33](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L33)

The request timeout in milliseconds.

#### Default

```ts
30000 (30 seconds)
```

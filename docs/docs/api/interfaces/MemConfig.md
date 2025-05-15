# Interface: MemConfig

Defined in: [types.ts:47](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L47)

Internal configuration structure used by the [MemClient](../classes/MemClient.md).
This is derived from [MemOptions](MemOptions.md) and holds the resolved configuration values.

## Properties

### maxRetries

> **maxRetries**: `number`

Defined in: [types.ts:49](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L49)

Maximum number of retry attempts.

***

### retryDelay

> **retryDelay**: `number`

Defined in: [types.ts:53](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L53)

Base delay between retry attempts in milliseconds.

***

### timeout

> **timeout**: `number`

Defined in: [types.ts:51](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L51)

Request timeout in milliseconds.

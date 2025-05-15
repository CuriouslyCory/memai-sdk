[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / MemConfig

# Interface: MemConfig

Defined in: [types.ts:47](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L47)

Internal configuration structure used by the [MemClient](../classes/MemClient.md).
This is derived from [MemOptions](MemOptions.md) and holds the resolved configuration values.

## Properties

### maxRetries

> **maxRetries**: `number`

Defined in: [types.ts:49](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L49)

Maximum number of retry attempts.

***

### retryDelay

> **retryDelay**: `number`

Defined in: [types.ts:53](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L53)

Base delay between retry attempts in milliseconds.

***

### timeout

> **timeout**: `number`

Defined in: [types.ts:51](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L51)

Request timeout in milliseconds.

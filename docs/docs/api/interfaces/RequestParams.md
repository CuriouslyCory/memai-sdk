# Interface: RequestParams

Defined in: [types.ts:60](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L60)

Internal representation of request parameters for making API calls.
This type is primarily for internal SDK use.

## Properties

### body?

> `optional` **body**: `string`

Defined in: [types.ts:66](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L66)

The request body, typically a JSON string.

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [types.ts:64](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L64)

A record of HTTP headers to include in the request.

***

### method

> **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: [types.ts:62](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L62)

The HTTP method to use for the request.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [types.ts:68](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L68)

Request-specific timeout in milliseconds, overriding client default if provided.

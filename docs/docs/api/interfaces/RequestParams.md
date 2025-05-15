[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / RequestParams

# Interface: RequestParams

Defined in: [types.ts:60](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L60)

Internal representation of request parameters for making API calls.
This type is primarily for internal SDK use.

## Properties

### body?

> `optional` **body**: `string`

Defined in: [types.ts:66](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L66)

The request body, typically a JSON string.

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [types.ts:64](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L64)

A record of HTTP headers to include in the request.

***

### method

> **method**: [`HttpMethod`](../type-aliases/HttpMethod.md)

Defined in: [types.ts:62](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L62)

The HTTP method to use for the request.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [types.ts:68](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L68)

Request-specific timeout in milliseconds, overriding client default if provided.

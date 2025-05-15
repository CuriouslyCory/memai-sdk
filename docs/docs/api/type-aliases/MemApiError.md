[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / MemApiError

# Type Alias: MemApiError

> **MemApiError** = `object`

Defined in: [types.ts:75](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L75)

Represents an error response from the Mem API.

## See

MemApiError for the error class thrown by the SDK.

## Properties

### code?

> `optional` **code**: `string`

Defined in: [types.ts:83](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L83)

A Mem-specific error code, if available, providing more granular error information.

***

### error

> **error**: `string`

Defined in: [types.ts:77](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L77)

A short string indicating the error type (e.g., 'invalid_request_error').

***

### message

> **message**: `string`

Defined in: [types.ts:79](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L79)

A human-readable message providing more details about the error.

***

### status?

> `optional` **status**: `number`

Defined in: [types.ts:81](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L81)

The HTTP status code associated with the error, if available.

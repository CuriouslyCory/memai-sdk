[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / MemItResponse

# Type Alias: MemItResponse

> **MemItResponse** = `object`

Defined in: [types.ts:190](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L190)

Response from the "Mem It" endpoint ([MemClient.memIt](../classes/MemClient.md#memit)).

## See

[Mem It API Documentation](https://docs.mem.ai/api-reference/mem-it/mem-it)

## Properties

### operations

> **operations**: [`MemItOperation`](MemItOperation.md)[]

Defined in: [types.ts:196](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L196)

An array of operations performed by Mem as a result of the request.

***

### request\_id

> **request\_id**: `string`

Defined in: [types.ts:192](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L192)

A unique identifier for the API request.

***

### status

> **status**: `string`

Defined in: [types.ts:194](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L194)

The overall status of the request (e.g., 'completed').

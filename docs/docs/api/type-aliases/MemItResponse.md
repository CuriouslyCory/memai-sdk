# Type Alias: MemItResponse

> **MemItResponse** = `object`

Defined in: [types.ts:190](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L190)

Response from the "Mem It" endpoint ([MemClient.memIt](../classes/MemClient.md#memit)).

## See

[Mem It API Documentation](https://docs.mem.ai/api-reference/mem-it/mem-it)

## Properties

### operations

> **operations**: [`MemItOperation`](MemItOperation.md)[]

Defined in: [types.ts:196](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L196)

An array of operations performed by Mem as a result of the request.

***

### request\_id

> **request\_id**: `string`

Defined in: [types.ts:192](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L192)

A unique identifier for the API request.

***

### status

> **status**: `string`

Defined in: [types.ts:194](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L194)

The overall status of the request (e.g., 'completed').

# Type Alias: MemItOperation

> **MemItOperation** = [`MemItCreatedNoteOp`](MemItCreatedNoteOp.md) \| [`MemItAddedToCollectionOp`](MemItAddedToCollectionOp.md)

Defined in: [types.ts:184](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L184)

A discriminated union of all possible operation types returned by the "Mem It" endpoint ([MemClient.memIt](../classes/MemClient.md#memit)).
Check the `type` property to determine the specific operation.

[**@curiouslycory/memai-sdk**](../README.md)

***

[@curiouslycory/memai-sdk](../globals.md) / UserProfile

# Interface: UserProfile

Defined in: [types.ts:92](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L92)

Represents user profile information as returned by the Mem API.
Note: Currently, there isn't a dedicated public SDK method to fetch this directly,
but it might be part of other API responses or future features.

## Properties

### created\_at

> **created\_at**: `string`

Defined in: [types.ts:111](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L111)

The timestamp (ISO 8601 format) indicating when the user account was created.

***

### email

> **email**: `string`

Defined in: [types.ts:101](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L101)

The user's email address.

***

### id

> **id**: `string`

Defined in: [types.ts:96](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L96)

The unique identifier for the user.

***

### name?

> `optional` **name**: `string`

Defined in: [types.ts:106](https://github.com/CuriouslyCory/memai-sdk/blob/2dc092db422a3b9a254f20bc4198878b95379825/src/types.ts#L106)

The user's full name, if available.

# Interface: UserProfile

Defined in: [types.ts:92](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L92)

Represents user profile information as returned by the Mem API.
Note: Currently, there isn't a dedicated public SDK method to fetch this directly,
but it might be part of other API responses or future features.

## Properties

### created\_at

> **created\_at**: `string`

Defined in: [types.ts:111](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L111)

The timestamp (ISO 8601 format) indicating when the user account was created.

***

### email

> **email**: `string`

Defined in: [types.ts:101](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L101)

The user's email address.

***

### id

> **id**: `string`

Defined in: [types.ts:96](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L96)

The unique identifier for the user.

***

### name?

> `optional` **name**: `string`

Defined in: [types.ts:106](https://github.com/CuriouslyCory/memai-sdk/blob/901eea5e37c1f7d41b2990f0fff59ade65993843/src/types.ts#L106)

The user's full name, if available.

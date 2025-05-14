/**
 * Custom error classes for the memai-sdk
 */

/**
 * Base error class for all errors originating from the Mem API or the SDK's interaction with it.
 * All specific API errors thrown by the SDK (e.g., {@link BadRequestError}, {@link RateLimitError})
 * will be an instance of this class.
 *
 * @example
 * ```typescript
 * try {
 *   await client.createNote({ content: "..." });
 * } catch (error) {
 *   if (error instanceof MemApiError) {
 *     console.error(`API Error: ${error.message}, Status Code: ${error.statusCode}`);
 *   } else {
 *     console.error("An unexpected error occurred:", error);
 *   }
 * }
 * ```
 */
export class MemApiError extends Error {
  /**
   * The HTTP status code returned by the API, if applicable.
   * Defaults to 500 if not specified during error construction.
   */
  statusCode: number;

  /**
   * Constructs a MemApiError.
   * @param message - The error message.
   * @param statusCode - The HTTP status code associated with this error. Defaults to 500.
   */
  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'MemApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Error representing an HTTP 400 Bad Request response from the Mem API.
 * This typically indicates that the request was malformed (e.g., missing required parameters,
 * invalid data format).
 *
 * @example
 * ```typescript
 * try {
 *   await client.deleteNote(""); // Invalid ID
 * } catch (error) {
 *   if (error instanceof BadRequestError) {
 *     console.error("Bad Request:", error.message);
 *   }
 * }
 * ```
 */
export class BadRequestError extends MemApiError {
  /**
   * Constructs a BadRequestError.
   * @param message - The error message. Defaults to 'Bad Request'.
   */
  constructor(message = 'Bad Request') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

/**
 * Error representing an HTTP 401 Unauthorized response from the Mem API.
 * This usually means the API key is missing, invalid, or has been revoked.
 *
 * @example
 * ```typescript
 * const badClient = new MemClient('INVALID_API_KEY');
 * try {
 *   await badClient.createNote({ content: "test" });
 * } catch (error) {
 *   if (error instanceof UnauthorizedError) {
 *     console.error("Unauthorized:", error.message);
 *   }
 * }
 * ```
 */
export class UnauthorizedError extends MemApiError {
  /**
   * Constructs an UnauthorizedError.
   * @param message - The error message. Defaults to 'Unauthorized - API key may be invalid'.
   */
  constructor(message = 'Unauthorized - API key may be invalid') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Error representing an HTTP 403 Forbidden response from the Mem API.
 * This indicates that the authenticated user (via API key) does not have
 * permission to perform the requested operation on the target resource.
 *
 * @example
 * ```typescript
 * try {
 *   // Assuming an operation that the current API key is not allowed to perform
 *   await client.someRestrictedOperation();
 * } catch (error) {
 *   if (error instanceof ForbiddenError) {
 *     console.error("Forbidden:", error.message);
 *   }
 * }
 * ```
 */
export class ForbiddenError extends MemApiError {
  /**
   * Constructs a ForbiddenError.
   * @param message - The error message. Defaults to 'Forbidden - You do not have permission to access this resource'.
   */
  constructor(message = 'Forbidden - You do not have permission to access this resource') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * Error representing an HTTP 404 Not Found response from the Mem API.
 * This means the requested resource (e.g., a specific note) could not be found.
 *
 * @example
 * ```typescript
 * try {
 *   await client.deleteNote('non-existent-note-id');
 * } catch (error) {
 *   if (error instanceof NotFoundError) {
 *     console.error("Not Found:", error.message);
 *   }
 * }
 * ```
 */
export class NotFoundError extends MemApiError {
  /**
   * Constructs a NotFoundError.
   * @param message - The error message. Defaults to 'Resource not found'.
   */
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Error representing an HTTP 429 Too Many Requests response from the Mem API.
 * This indicates that the application has exceeded its allocated rate limits.
 *
 * @example
 * ```typescript
 * try {
 *   // Imagine making many requests in a short period
 *   for (let i = 0; i < 100; i++) await client.createNote({ content: `note ${i}` });
 * } catch (error) {
 *   if (error instanceof RateLimitError) {
 *     console.error(`Rate Limited: ${error.message}. Retry after ${error.retryAfter} seconds.`);
 *     if (error.retryAfter) {
 *       // Implement retry logic using error.retryAfter
 *     }
 *   }
 * }
 * ```
 */
export class RateLimitError extends MemApiError {
  /**
   * The number of seconds to wait before retrying the request, if provided by the API
   * in the 'Retry-After' header.
   */
  retryAfter?: number;

  /**
   * Constructs a RateLimitError.
   * @param message - The error message. Defaults to 'Rate limit exceeded'.
   * @param retryAfter - Optional. The number of seconds to wait before retrying.
   */
  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Error representing an HTTP 5xx Server Error response from the Mem API.
 * This indicates an unexpected error on Mem's servers.
 *
 * @example
 * ```typescript
 * try {
 *   await client.createNote({ content: "trigger server issue" }); // Hypothetical
 * } catch (error) {
 *   if (error instanceof ServerError) {
 *     console.error(`Server Error (${error.statusCode}): ${error.message}`);
 *   }
 * }
 * ```
 */
export class ServerError extends MemApiError {
  /**
   * Constructs a ServerError.
   * @param message - The error message. Defaults to 'Internal server error'.
   * @param statusCode - The specific 5xx status code. Defaults to 500.
   */
  constructor(message = 'Internal server error', statusCode = 500) {
    super(message, statusCode);
    this.name = 'ServerError';
  }
}

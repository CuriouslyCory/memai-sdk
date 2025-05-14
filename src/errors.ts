/**
 * Custom error classes for the memai-sdk
 */

/**
 * Base error class for all API errors
 */
export class MemApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'MemApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Error thrown when the API returns a 400 Bad Request response
 */
export class BadRequestError extends MemApiError {
  constructor(message = 'Bad Request') {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

/**
 * Error thrown when the API returns a 401 Unauthorized response
 */
export class UnauthorizedError extends MemApiError {
  constructor(message = 'Unauthorized - API key may be invalid') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Error thrown when the API returns a 403 Forbidden response
 */
export class ForbiddenError extends MemApiError {
  constructor(message = 'Forbidden - You do not have permission to access this resource') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

/**
 * Error thrown when the API returns a 404 Not Found response
 */
export class NotFoundError extends MemApiError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Error thrown when the API returns a 429 Too Many Requests response
 * This will be implemented in Task 6
 */
export class RateLimitError extends MemApiError {
  retryAfter?: number;

  constructor(message = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

/**
 * Error thrown when the API returns a 5xx Server Error response
 */
export class ServerError extends MemApiError {
  constructor(message = 'Internal server error', statusCode = 500) {
    super(message, statusCode);
    this.name = 'ServerError';
  }
}

/**
 * MemClient - Core client class for interacting with the mem.ai API
 */

import fetch, { Response } from 'cross-fetch';
import {
  type MemOptions,
  type MemConfig,
  type MemItPayload,
  type MemItResponse as ClientMemItResponse,
  type CreateNotePayload,
  type CreateNoteResponse,
  type HttpMethod,
  type MemApiError,
} from './types.js';
import {
  MemApiError as MemApiErrorClass,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ServerError,
} from './errors.js';

/**
 * Main client class for the mem.ai API SDK.
 *
 * This client provides methods to interact with the various endpoints of the Mem API,
 * handling authentication, request retries, and error responses.
 *
 * @example
 * ```typescript
 * import { MemClient } from '@mem-labs/mem-sdk'; // Assuming package name
 *
 * const client = new MemClient('YOUR_API_KEY');
 *
 * async function main() {
 *   try {
 *     const newNote = await client.createNote({ content: "Hello from the SDK!" });
 *     console.log('Created note:', newNote.title, newNote.url);
 *   } catch (error) {
 *     console.error('Error interacting with Mem API:', error);
 *   }
 * }
 *
 * main();
 * ```
 */
export class MemClient {
  private apiKey: string;
  private baseUrl: string;
  private config: MemConfig;

  /**
   * Creates a new instance of the MemClient.
   *
   * @param apiKey Your mem.ai API key. This is required to authenticate requests.
   *               You can find your API key in your Mem account settings.
   * @param options Optional configuration for the client.
   * @param options.baseUrl The base URL for the Mem API. Defaults to 'https://api.mem.ai/v1'.
   *                        You generally don't need to change this unless instructed by Mem support
   *                        or for testing purposes.
   * @param options.maxRetries The maximum number of times to retry a request if it fails due to
   *                           transient issues (like network errors or rate limits). Defaults to 3.
   * @param options.timeout The request timeout in milliseconds. Defaults to 30000 (30 seconds).
   * @param options.retryDelay The base delay in milliseconds for retrying requests. This delay will
   *                           be increased exponentially for subsequent retries. Defaults to 1000ms.
   * @throws {Error} if the API key is not provided.
   *
   * @example
   * ```typescript
   * // Basic initialization
   * const client = new MemClient('YOUR_SECRET_API_KEY');
   * ```
   *
   * @example
   * ```typescript
   * // Initialization with custom options
   * const clientWithOptions = new MemClient('YOUR_SECRET_API_KEY', {
   *   baseUrl: 'https://custom-api.mem.ai/v1',
   *   maxRetries: 5,
   *   timeout: 60000, // 60 seconds
   * });
   * ```
   */
  constructor(apiKey: string, options: MemOptions = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://api.mem.ai/v1';
    this.config = {
      maxRetries: options.maxRetries ?? 3,
      timeout: options.timeout ?? 30000,
      retryDelay: options.retryDelay ?? 1000,
    };
  }

  /**
   * Generates the headers for API requests, including the Bearer token
   *
   * @returns Record of headers with Authorization Bearer token
   */
  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  /**
   * Handles error responses from the API
   *
   * @param response - Fetch Response object
   * @param errorData - Optional error data from the response
   * @returns A rejected promise with the appropriate error
   */
  private handleErrorResponse(response: Response, errorData?: MemApiError): never {
    const status = response.status;
    const message =
      errorData?.message || errorData?.error || response.statusText || 'Unknown error';

    switch (status) {
      case 400:
        throw new BadRequestError(message);
      case 401:
        throw new UnauthorizedError(message);
      case 403:
        throw new ForbiddenError(message);
      case 404:
        throw new NotFoundError(message);
      case 429: {
        // We'll implement a more sophisticated rate limit handler in Task 6
        // For now, just throw a basic RateLimitError
        // throw new RateLimitError(message);
        // Implementation for Task 6.1: Parse Retry-After header
        let retryAfterSeconds: number | undefined = undefined;
        const retryAfterHeader = response.headers.get('Retry-After');

        if (retryAfterHeader) {
          const parsedRetryAfter = parseInt(retryAfterHeader, 10);
          if (!isNaN(parsedRetryAfter)) {
            // It's a number of seconds
            retryAfterSeconds = parsedRetryAfter;
          } else {
            // It might be an HTTP-date
            const date = new Date(retryAfterHeader);
            if (!isNaN(date.getTime())) {
              retryAfterSeconds = Math.max(0, Math.ceil((date.getTime() - Date.now()) / 1000));
            }
          }
        }
        throw new RateLimitError(message, retryAfterSeconds);
      }
      default:
        if (status >= 500) {
          throw new ServerError(message, status);
        }
        throw new MemApiErrorClass(message, status);
    }
  }

  /**
   * Internal method to make API requests
   *
   * @param method - HTTP method (GET, POST, etc.)
   * @param endpoint - API endpoint (without base URL)
   * @param data - Optional request body data
   * @returns Promise resolving to the API response
   */
  private async request<T>(method: HttpMethod, endpoint: string, data?: unknown): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers = this.getHeaders();

    const options: Exclude<Parameters<typeof fetch>[1], undefined> = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    let lastError: Error | MemApiErrorClass = new MemApiErrorClass(
      'Request failed after multiple retries'
    );

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const response = await fetch(url, options);

        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        let responseData;
        if (isJson) {
          responseData = await response.json();
        } else if (response.status !== 204) {
          responseData = await response.text();
        }

        if (!response.ok) {
          this.handleErrorResponse(response, responseData as MemApiError);
        }

        return responseData as T;
      } catch (error) {
        lastError = error as MemApiErrorClass | Error;

        if (error instanceof RateLimitError && attempt < this.config.maxRetries) {
          let delayMs = this.config.retryDelay * Math.pow(2, attempt);
          delayMs = delayMs * (0.5 + Math.random() * 0.5);

          if (error.retryAfter && error.retryAfter > 0) {
            delayMs = error.retryAfter * 1000;
          }

          // Ensure delay is not excessively long if retryAfter is huge
          // or exponential backoff grows too large. Max delay 1 minute for now.
          delayMs = Math.min(delayMs, 60000);

          await new Promise((resolve) => globalThis.setTimeout(resolve, delayMs));
          // Continue to next attempt
        } else {
          if (error instanceof MemApiErrorClass) {
            throw error;
          }
          if (error instanceof Error) {
            throw new MemApiErrorClass(
              `Network error during attempt ${attempt + 1}: ${error.message}`
            );
          }
          throw new MemApiErrorClass('An unexpected error occurred');
        }
      }
    }
    throw lastError;
  }

  /**
   * Creates a mem using the "mem-it" endpoint.
   * This endpoint is versatile and can accept various types of input (HTML, text, URLs)
   * and instructions for how Mem should process it.
   *
   * @param payload The {@link MemItPayload} containing the input and instructions.
   * @returns A Promise that resolves to a {@link ClientMemItResponse} object,
   *          detailing the operations performed by Mem (e.g., note created, existing note updated).
   * @throws {MemApiErrorClass} and its subclasses if the API request fails.
   * @throws {BadRequestError} if the request payload is malformed.
   * @throws {UnauthorizedError} if the API key is invalid or missing.
   * @throws {ForbiddenError} if the API key does not have permission for the operation.
   * @throws {RateLimitError} if the request is rate limited.
   * @throws {ServerError} if the Mem API encounters an internal server error.
   * @see {@link https://docs.mem.ai/api-reference/mem-it/mem-it | Mem It API Documentation}
   *
   * @example
   * ```typescript
   * const response = await client.memIt({
   *   input: "Remember to buy milk tomorrow.",
   *   instructions: "Add this to my reminders."
   * });
   * console.log(response.operations[0].title);
   * ```
   */
  async memIt(payload: MemItPayload): Promise<ClientMemItResponse> {
    return this.request<ClientMemItResponse>('POST', '/mem-it', payload);
  }

  /**
   * Creates a new note in Mem.
   *
   * @param options The {@link CreateNotePayload} containing the content of the note
   *                and optional instructions for auto-organization or formatting.
   * @returns A Promise that resolves to a {@link CreateNoteResponse} object,
   *          which includes the created note's ID, content, title, URL, and operations performed.
   * @throws {MemApiErrorClass} and its subclasses if the API request fails.
   * @throws {BadRequestError} if the request payload is malformed (e.g., invalid content).
   * @throws {UnauthorizedError} if the API key is invalid or missing.
   * @throws {ForbiddenError} if the API key does not have permission for the operation.
   * @throws {RateLimitError} if the request is rate limited.
   * @throws {ServerError} if the Mem API encounters an internal server error.
   * @see {@link https://docs.mem.ai/api-reference/notes/create-note | Create Note API Documentation}
   *
   * @example
   * ```typescript
   * const note = await client.createNote({
   *   content: "# Meeting Notes\n- Discussed project X\n- Action item: Follow up with team.",
   *   auto_organize: "Add to 'Project X' collection"
   * });
   * console.log("Created note:", note.title, note.url);
   * ```
   */
  async createNote(options: CreateNotePayload): Promise<CreateNoteResponse> {
    return this.request<CreateNoteResponse>('POST', '/notes', options);
  }

  /**
   * Deletes a note by its ID.
   *
   * @param id The unique identifier of the note to be deleted. Must be a non-empty string.
   * @returns A Promise that resolves when the note is successfully deleted.
   *          The Mem API returns a 200 OK with operation details upon successful deletion,
   *          which this client maps to a void Promise for simplicity in this specific method.
   * @throws {BadRequestError} if the provided `id` is not a non-empty string.
   * @throws {MemApiErrorClass} and its subclasses if the API request fails.
   * @throws {NotFoundError} if a note with the given `id` does not exist.
   * @throws {UnauthorizedError} if the API key is invalid or missing.
   * @throws {ForbiddenError} if the API key does not have permission for the operation.
   * @throws {RateLimitError} if the request is rate limited.
   * @throws {ServerError} if the Mem API encounters an internal server error.
   * @see {@link https://docs.mem.ai/api-reference/notes/delete-note | Delete Note API Documentation}
   *
   * @example
   * ```typescript
   * const noteIdToDelete = "01234567-89ab-cdef-0123-456789abcdef";
   * try {
   *   await client.deleteNote(noteIdToDelete);
   *   console.log(`Note ${noteIdToDelete} deleted successfully.`);
   * } catch (error) {
   *   if (error instanceof NotFoundError) {
   *     console.error("Note not found:", error.message);
   *   } else {
   *     console.error("Error deleting note:", error);
   *   }
   * }
   * ```
   */
  async deleteNote(id: string): Promise<void> {
    if (!id || typeof id !== 'string') {
      throw new BadRequestError('Note ID must be a non-empty string');
    }
    return this.request<void>('DELETE', `/notes/${id}`);
  }

  /**
   * Creates a mem.
   * @deprecated This method is deprecated. Use {@link memIt} for general inputs or
   *             {@link createNote} for creating structured notes directly.
   *             The `memIt` endpoint provides more flexibility, and `createNote` is more specific.
   *
   * @param _options - Options for creating the mem. (Ignored due to deprecation)
   * @returns A Promise that resolves to the created mem. (Will throw an error)
   * @throws {Error} Always throws an error indicating deprecation.
   */
  async createMem(_options: unknown): Promise<unknown> {
    throw new Error('Deprecated: Use memIt or createNote instead');
  }
}

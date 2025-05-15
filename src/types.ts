/**
 * Type definitions for the memai-sdk
 */

/**
 * Represents the HTTP methods supported by the Mem API client.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Configuration options for initializing the {@link MemClient}.
 * These options allow customization of the client's behavior, such as retry logic and timeouts.
 */
export interface MemOptions {
  /**
   * The base URL for the Mem API.
   * @default 'https://api.mem.ai/v1'
   * You generally don't need to change this unless instructed by Mem support or for testing purposes.
   */
  baseUrl?: string;

  /**
   * The maximum number of times to retry a request if it fails due to transient issues
   * (like network errors or rate limits).
   * @default 3
   */
  maxRetries?: number;

  /**
   * The request timeout in milliseconds.
   * @default 30000 (30 seconds)
   */
  timeout?: number;

  /**
   * The base delay in milliseconds for retrying requests.
   * This delay will be increased exponentially for subsequent retries.
   * @default 1000 (1 second)
   */
  retryDelay?: number;
}

/**
 * Internal configuration structure used by the {@link MemClient}.
 * This is derived from {@link MemOptions} and holds the resolved configuration values.
 */
export interface MemConfig {
  /** Maximum number of retry attempts. */
  maxRetries: number;
  /** Request timeout in milliseconds. */
  timeout: number;
  /** Base delay between retry attempts in milliseconds. */
  retryDelay: number;
}

/**
 * Internal representation of request parameters for making API calls.
 * This type is primarily for internal SDK use.
 */
export interface RequestParams {
  /** The HTTP method to use for the request. */
  method: HttpMethod;
  /** A record of HTTP headers to include in the request. */
  headers: Record<string, string>;
  /** The request body, typically a JSON string. */
  body?: string;
  /** Request-specific timeout in milliseconds, overriding client default if provided. */
  timeout?: number;
}

/**
 * Represents an error response from the Mem API.
 * @see {@link MemApiError} for the error class thrown by the SDK.
 */
export type MemApiError = {
  /** A short string indicating the error type (e.g., 'invalid_request_error'). */
  error: string;
  /** A human-readable message providing more details about the error. */
  message: string;
  /** The HTTP status code associated with the error, if available. */
  status?: number; // Optional: status code if available in error
  /** A Mem-specific error code, if available, providing more granular error information. */
  code?: string; // Optional: specific error code if available
  // Potentially other fields like 'details'
};

/**
 * Represents user profile information as returned by the Mem API.
 * Note: Currently, there isn't a dedicated public SDK method to fetch this directly,
 * but it might be part of other API responses or future features.
 */
export interface UserProfile {
  /**
   * The unique identifier for the user.
   */
  id: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * The user's full name, if available.
   */
  name?: string;

  /**
   * The timestamp (ISO 8601 format) indicating when the user account was created.
   */
  created_at: string;
}

// === Mem It API (/v1/mem-it) ===

/**
 * Payload for the "Mem It" endpoint ({@link MemClient.memIt}).
 * This endpoint is versatile for sending various types of content to Mem.
 * @see {@link https://docs.mem.ai/api-reference/mem-it/mem-it | Mem It API Documentation}
 *
 * @example
 * ```typescript
 * const payload: MemItPayload = {
 *   input: "<h1>Project Alpha Notes</h1><p>Meeting on 2024-01-15...</p>",
 *   instructions: "Create a new note titled 'Project Alpha Meeting' and add to 'Projects' collection.",
 *   context: "This content is related to Project Alpha.",
 *   timestamp: new Date().toISOString(),
 * };
 * ```
 */
export type MemItPayload = {
  /** The primary content to be processed by Mem (e.g., raw text, HTML, a URL). */
  input: string;
  /** Optional natural language instructions for Mem on how to process the input
   * (e.g., "Summarize this article", "Add to my reading list"). */
  instructions?: string;
  /** Optional additional context to help Mem understand or categorize the input. */
  context?: string;
  /** Optional timestamp (ISO 8601 format) to associate with the mem, if different from the processing time. */
  timestamp?: string; // ISO 8601 datetime string
};

/**
 * Base type for operations returned by the "Mem It" endpoint.
 * Each operation in the response will have a `type` field indicating its nature.
 */
export type MemItOperationBase = {
  /** The type of operation performed (e.g., 'created-note', 'added-note-to-collection'). */
  type: string;
};

/**
 * Represents an operation where a new note was created via "Mem It".
 */
export type MemItCreatedNoteOp = MemItOperationBase & {
  type: 'created-note';
  /** The ID of the newly created note. */
  note_id: string;
  /** The title of the newly created note. */
  title: string;
  /** The URL to access the newly created note in the Mem application. */
  url: string;
};

/**
 * Represents an operation where a note was added to a collection via "Mem It".
 */
export type MemItAddedToCollectionOp = MemItOperationBase & {
  type: 'added-note-to-collection';
  /** The ID of the collection to which the note was added. */
  collection_id: string;
  /** The title of the collection. */
  collection_title: string;
  // Potentially other fields specific to this operation
};

// Add other potential MemIt operation types here as they are discovered
// export type SomeOtherMemItOp = MemItOperationBase & { type: 'some-other-type'; ... };

/**
 * A discriminated union of all possible operation types returned by the "Mem It" endpoint ({@link MemClient.memIt}).
 * Check the `type` property to determine the specific operation.
 */
export type MemItOperation = MemItCreatedNoteOp | MemItAddedToCollectionOp; // | SomeOtherMemItOp;

/**
 * Response from the "Mem It" endpoint ({@link MemClient.memIt}).
 * @see {@link https://docs.mem.ai/api-reference/mem-it/mem-it | Mem It API Documentation}
 */
export type MemItResponse = {
  /** A unique identifier for the API request. */
  request_id: string;
  /** The overall status of the request (e.g., 'completed'). */
  status: string;
  /** An array of operations performed by Mem as a result of the request. */
  operations: MemItOperation[];
};

// === Create Note API (/v1/notes) ===

/**
 * Payload for creating a new note directly ({@link MemClient.createNote}).
 * @see {@link https://docs.mem.ai/api-reference/notes/create-note | Create Note API Documentation}
 *
 * @example
 * ```typescript
 * const payload: CreateNotePayload = {
 *   content: "# Project Ideas\n- Idea 1\n- Idea 2",
 *   add_to_collections: ["Brainstorming"],
 *   auto_organize: "File under 'Projects' and tag with #idea",
 *   created_at: new Date().toISOString(),
 * };
 * ```
 */
export type CreateNotePayload = {
  /** The content of the note, typically in Markdown format. */
  content: string; // Markdown formatted
  /** An array of collection titles or IDs to which the new note should be added. */
  add_to_collections?: string[]; // Array of collection titles or IDs
  /** If `true`, Mem attempts to automatically organize the note.
   * If a string, provides natural language instructions for organization. */
  auto_organize?: boolean | string;
  /** The title or ID of a template to apply to the new note. */
  apply_template?: string; // Template title or ID
  /** If `true`, Mem attempts to automatically format the note.
   * If a string, provides natural language instructions for formatting. */
  auto_format?: boolean | string;
  /** Optional timestamp (ISO 8601 format) for when the note was created, if different from the processing time. */
  created_at?: string; // ISO 8601 datetime string
  /** Optional timestamp (ISO 8601 format) for when the note was last updated, if different from the processing time. */
  updated_at?: string; // ISO 8601 datetime string
};

/**
 * Base type for operations returned by the Create Note endpoint.
 */
export type NoteOperationBase = {
  /** The type of operation performed. */
  type: string;
  // Common fields for note operations, if any
};

// The 'created-note' operation within CreateNoteResponse.operations might be redundant
// or provide specific details not present at the top level of CreateNoteResponse.
// For now, defining it but it may need refinement if a more detailed schema emerges.
/**
 * Represents a 'created-note' operation within the {@link CreateNoteResponse}.
 * This might be redundant if all details are at the top level of {@link CreateNoteResponse},
 * or it could provide specific context within the `operations` array.
 */
export type NoteCreatedOp = NoteOperationBase & {
  type: 'created-note';
  // If fields are identical to MemItCreatedNoteOp, consider a shared type.
  // For example, does it also use 'note_id' or 'id'? The parent CreateNoteResponse has 'id'.
  // Let's assume for now it might be just an indicator, or could carry specific IDs.
  /** The ID of the note, if distinct from the top-level `id` in {@link CreateNoteResponse}. */
  note_id?: string; // Example if it carries an ID
  /** The title of the note, if distinct from the top-level `title`. */
  title?: string; // Example
};

/**
 * Represents an operation where a note was added to a collection, as part of a Create Note response.
 */
export type NoteAddedToCollectionOp = NoteOperationBase & {
  type: 'added-note-to-collection';
  /** The ID of the collection to which the note was added. */
  collection_id: string;
  /** The title of the collection. */
  collection_title: string;
  // Potentially other fields
};

// Add other potential Note operation types here
/**
 * A discriminated union of all possible operation types returned by the Create Note endpoint ({@link MemClient.createNote}).
 */
export type NoteOperation = NoteCreatedOp | NoteAddedToCollectionOp; // | SomeOtherNoteOp;

/**
 * Response from the Create Note endpoint ({@link MemClient.createNote}).
 * @see {@link https://docs.mem.ai/api-reference/notes/create-note | Create Note API Documentation}
 */
export type CreateNoteResponse = {
  /** The unique identifier of the newly created note. */
  id: string; // ID of the created note
  /** The title of the newly created note. */
  title: string;
  /** The URL to access the newly created note in the Mem application. */
  url: string;
  /** The final content of the note after processing (e.g., after applying a template or auto-formatting). */
  content: string; // The Markdown content submitted
  /** An array of operations performed during the creation of the note. */
  operations: NoteOperation[];
  /** Timestamp (ISO 8601 format) indicating when the note was created. */
  created_at: string; // ISO 8601 datetime string
  /** Timestamp (ISO 8601 format) indicating when the note was last updated. */
  updated_at: string; // ISO 8601 datetime string
};

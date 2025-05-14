/**
 * Type definitions for the memai-sdk
 */

/**
 * HTTP methods supported by the API
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Configuration options for the MemClient
 */
export interface MemOptions {
  /**
   * Base URL for the mem.ai API (default: 'https://api.mem.ai/v1')
   */
  baseUrl?: string;

  /**
   * Maximum number of retry attempts for rate-limited requests (default: 3)
   */
  maxRetries?: number;

  /**
   * Request timeout in milliseconds (default: 30000)
   */
  timeout?: number;

  /**
   * Delay between retry attempts in milliseconds (default: 1000)
   */
  retryDelay?: number;
}

/**
 * Internal configuration for the MemClient
 */
export interface MemConfig {
  maxRetries: number;
  timeout: number;
  retryDelay: number;
}

/**
 * Request parameters for API calls
 */
export interface RequestParams {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
  timeout?: number;
}

/**
 * Standard API Error Response from the mem.ai API
 */
export type MemApiError = {
  error: string;
  message: string;
  status?: number; // Optional: status code if available in error
  code?: string; // Optional: specific error code if available
  // Potentially other fields like 'details'
};

/**
 * User profile information
 */
export interface UserProfile {
  /**
   * User ID
   */
  id: string;

  /**
   * User's email address
   */
  email: string;

  /**
   * User's name
   */
  name?: string;

  /**
   * When the user was created
   */
  created_at: string;
}

// === Mem It API (/v1/mem-it) ===

export type MemItPayload = {
  input: string;
  instructions?: string;
  context?: string;
  timestamp?: string; // ISO 8601 datetime string
};

export type MemItOperationBase = {
  type: string;
};

export type MemItCreatedNoteOp = MemItOperationBase & {
  type: 'created-note';
  note_id: string;
  title: string;
  url: string;
};

export type MemItAddedToCollectionOp = MemItOperationBase & {
  type: 'added-note-to-collection';
  collection_id: string;
  collection_title: string;
  // Potentially other fields specific to this operation
};

// Add other potential MemIt operation types here as they are discovered
// export type SomeOtherMemItOp = MemItOperationBase & { type: 'some-other-type'; ... };

export type MemItOperation = MemItCreatedNoteOp | MemItAddedToCollectionOp; // | SomeOtherMemItOp;

export type MemItResponse = {
  request_id: string;
  status: string;
  operations: MemItOperation[];
};

// === Create Note API (/v1/notes) ===

export type CreateNotePayload = {
  content: string; // Markdown formatted
  add_to_collections?: string[]; // Array of collection titles or IDs
  auto_organize?: boolean | string;
  apply_template?: string; // Template title or ID
  auto_format?: boolean | string;
  created_at?: string; // ISO 8601 datetime string
  updated_at?: string; // ISO 8601 datetime string
};

export type NoteOperationBase = {
  type: string;
  // Common fields for note operations, if any
};

// The 'created-note' operation within CreateNoteResponse.operations might be redundant
// or provide specific details not present at the top level of CreateNoteResponse.
// For now, defining it but it may need refinement if a more detailed schema emerges.
export type NoteCreatedOp = NoteOperationBase & {
  type: 'created-note';
  // If fields are identical to MemItCreatedNoteOp, consider a shared type.
  // For example, does it also use 'note_id' or 'id'? The parent CreateNoteResponse has 'id'.
  // Let's assume for now it might be just an indicator, or could carry specific IDs.
  note_id?: string; // Example if it carries an ID
  title?: string; // Example
};

export type NoteAddedToCollectionOp = NoteOperationBase & {
  type: 'added-note-to-collection';
  collection_id: string;
  collection_title: string;
  // Potentially other fields
};

// Add other potential Note operation types here
export type NoteOperation = NoteCreatedOp | NoteAddedToCollectionOp; // | SomeOtherNoteOp;

export type CreateNoteResponse = {
  id: string; // ID of the created note
  title: string;
  url: string;
  content: string; // The Markdown content submitted
  operations: NoteOperation[];
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
};

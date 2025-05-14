/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemClient } from './client.js';
import { BadRequestError, UnauthorizedError, NotFoundError, ServerError } from './errors.js';
import fetch, { Response } from 'cross-fetch';
// Import new types for memIt tests
import type {
  MemItPayload,
  MemItResponse,
  MemItCreatedNoteOp,
  MemItAddedToCollectionOp,
} from './types.js';

// Import new types for createNote tests
import type {
  CreateNotePayload,
  CreateNoteResponse,
  NoteAddedToCollectionOp, // Example operation type
} from './types.js';

// Mock cross-fetch
jest.mock('cross-fetch', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('MemClient', () => {
  let client: MemClient;

  beforeEach(() => {
    client = new MemClient('test-api-key');
    jest.clearAllMocks();
  });

  it('should create an instance with default options', () => {
    const client = new MemClient('test-api-key');
    expect(client).toBeInstanceOf(MemClient);
  });

  it('should create an instance with custom options', () => {
    const client = new MemClient('test-api-key', {
      baseUrl: 'https://api.mem.ai/v1',
      maxRetries: 5,
      timeout: 60000,
      retryDelay: 2000,
    });
    expect(client).toBeInstanceOf(MemClient);
  });

  it('should throw an error if API key is not provided', () => {
    expect(() => new MemClient('')).toThrow('API key is required');
    expect(() => new MemClient(undefined as unknown as string)).toThrow('API key is required');
  });

  describe('request handling', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    describe('memIt method (refactored)', () => {
      it('should make a successful POST request with minimal payload and parse created-note operation', async () => {
        const payload: MemItPayload = { input: 'Minimal test content' };
        const mockOperation: MemItCreatedNoteOp = {
          type: 'created-note',
          note_id: 'note_abc123',
          title: 'Minimal test content',
          url: 'https://app.mem.ai/m/note_abc123',
        };
        const mockMemItResponse: MemItResponse = {
          request_id: 'req_xyz789',
          status: 'completed',
          operations: [mockOperation],
        };

        mockFetch.mockResolvedValue({
          ok: true,
          status: 200,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockMemItResponse),
        } as unknown as Response);

        const result = await client.memIt(payload);

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.mem.ai/v1/mem-it',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(payload),
            headers: expect.objectContaining({ Authorization: 'Bearer test-api-key' }),
          })
        );
        expect(result).toEqual(mockMemItResponse);
      });

      it('should make a successful POST request with full payload and parse multiple operations', async () => {
        const fullPayload: MemItPayload = {
          input: 'Full test content with all fields',
          instructions: 'Process these instructions carefully',
          context: 'Project Alpha context',
          timestamp: '2023-10-26T10:30:00Z',
        };
        const mockCreatedNoteOp: MemItCreatedNoteOp = {
          type: 'created-note',
          note_id: 'note_def456',
          title: 'Full test content with all fields',
          url: 'https://app.mem.ai/m/note_def456',
        };
        const mockAddedToCollectionOp: MemItAddedToCollectionOp = {
          type: 'added-note-to-collection',
          collection_id: 'col_uvw123',
          collection_title: 'Project Alpha Collection',
        };
        const mockFullMemItResponse: MemItResponse = {
          request_id: 'req_abc123',
          status: 'completed',
          operations: [mockCreatedNoteOp, mockAddedToCollectionOp],
        };

        mockFetch.mockResolvedValue({
          ok: true,
          status: 200,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockFullMemItResponse),
        } as unknown as Response);

        const result = await client.memIt(fullPayload);

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.mem.ai/v1/mem-it',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(fullPayload),
          })
        );
        expect(result).toEqual(mockFullMemItResponse);
      });

      // Error handling tests for memIt
      it('should handle 400 Bad Request for memIt', async () => {
        const payload: MemItPayload = { input: '' }; // Example: API might consider empty input as bad
        const mockErrorResponse = {
          error: 'Invalid Input',
          message: 'Input cannot be empty.',
        };
        mockFetch.mockResolvedValue({
          ok: false,
          status: 400,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.memIt(payload)).rejects.toThrow(BadRequestError);
        await expect(client.memIt(payload)).rejects.toThrow(mockErrorResponse.message);
      });

      it('should handle 401 Unauthorized for memIt', async () => {
        const payload: MemItPayload = { input: 'test' };
        const mockErrorResponse = { error: 'Unauthorized', message: 'Invalid API key for /mem-it' };
        mockFetch.mockResolvedValue({
          ok: false,
          status: 401,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.memIt(payload)).rejects.toThrow(UnauthorizedError);
        await expect(client.memIt(payload)).rejects.toThrow(mockErrorResponse.message);
      });

      it('should handle 500 Internal Server Error for memIt', async () => {
        const payload: MemItPayload = { input: 'test' };
        const mockErrorResponse = {
          error: 'Server Error',
          message: 'Internal server error on /mem-it',
        };
        mockFetch.mockResolvedValue({
          ok: false,
          status: 500,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.memIt(payload)).rejects.toThrow(ServerError);
        await expect(client.memIt(payload)).rejects.toThrow(mockErrorResponse.message);
      });
    });

    it('should handle 400 Bad Request errors', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: {
          get: jest.fn().mockImplementation((header) => {
            if (header === 'content-type') return 'application/json';
            return null;
          }),
        },
        json: jest
          .fn()
          .mockResolvedValue({ error: 'Invalid input', message: 'The input field is required' }),
      };

      mockFetch.mockResolvedValue(mockResponse as unknown as Response);

      await expect(client.memIt({ input: '' })).rejects.toThrow(BadRequestError);
      await expect(client.memIt({ input: '' })).rejects.toThrow('The input field is required');
    });

    it('should handle 204 No Content responses', async () => {
      const mockResponse = {
        ok: true,
        status: 204,
        statusText: 'No Content',
        headers: {
          get: jest.fn().mockReturnValue(null), // No content-type header
        },
        json: jest.fn(), // Should not be called
        text: jest.fn(), // Should not be called
      };

      mockFetch.mockResolvedValue(mockResponse as unknown as Response);

      const result = await (client as any).request('DELETE', '/some-resource/123');
      expect(result).toBeUndefined();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.text).not.toHaveBeenCalled();
    });

    it('should handle successful non-JSON (text/plain) responses', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
          get: jest.fn().mockImplementation((header) => {
            if (header === 'content-type') return 'text/plain';
            return null;
          }),
        },
        text: jest.fn().mockResolvedValue('Simple text response'),
        json: jest.fn(), // Should not be called
      };

      mockFetch.mockResolvedValue(mockResponse as unknown as Response);

      const result = await (client as any).request('GET', '/text-endpoint');

      expect(result).toBe('Simple text response');
      expect(mockResponse.text).toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    describe('createNote method', () => {
      it('should make a successful POST request to /notes with minimal payload', async () => {
        const payload: CreateNotePayload = { content: '# My New Note\nMinimal content.' };
        const mockResponse: CreateNoteResponse = {
          id: 'note_zyx987',
          title: 'My New Note',
          url: 'https://app.mem.ai/m/note_zyx987',
          content: payload.content,
          operations: [],
          created_at: '2023-10-27T10:00:00Z',
          updated_at: '2023-10-27T10:00:00Z',
        };

        mockFetch.mockResolvedValue({
          ok: true,
          status: 200,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockResponse),
        } as unknown as Response);

        const result = await client.createNote(payload);

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.mem.ai/v1/notes',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(payload),
            headers: expect.objectContaining({ Authorization: 'Bearer test-api-key' }),
          })
        );
        expect(result).toEqual(mockResponse);
      });

      it('should make a successful POST request to /notes with full payload and operations', async () => {
        const fullPayload: CreateNotePayload = {
          content: '# Advanced Note\nWith all the bells and whistles.',
          add_to_collections: ['Work', 'Projects'],
          auto_organize: true,
          auto_format: 'Format as meeting notes',
          created_at: '2023-10-27T11:00:00Z',
          updated_at: '2023-10-27T11:05:00Z',
        };
        const mockOperation: NoteAddedToCollectionOp = {
          type: 'added-note-to-collection',
          collection_id: 'col_work123',
          collection_title: 'Work',
        };
        const mockFullResponse: CreateNoteResponse = {
          id: 'note_uvw654',
          title: 'Advanced Note',
          url: 'https://app.mem.ai/m/note_uvw654',
          content: fullPayload.content,
          operations: [mockOperation],
          created_at: fullPayload.created_at as string,
          updated_at: fullPayload.updated_at as string,
        };

        mockFetch.mockResolvedValue({
          ok: true,
          status: 200,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockFullResponse),
        } as unknown as Response);

        const result = await client.createNote(fullPayload);

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.mem.ai/v1/notes',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(fullPayload),
          })
        );
        expect(result).toEqual(mockFullResponse);
      });

      // Error handling tests for createNote
      it('should handle 400 Bad Request for createNote', async () => {
        const payload: CreateNotePayload = { content: '' }; // API might consider empty content as bad
        const mockErrorResponse = {
          error: 'Invalid Input',
          message: 'Content cannot be empty for /notes.',
        };

        mockFetch.mockResolvedValue({
          ok: false,
          status: 400,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.createNote(payload)).rejects.toThrow(BadRequestError);
        await expect(client.createNote(payload)).rejects.toThrow(mockErrorResponse.message);
      });

      it('should handle 401 Unauthorized for createNote', async () => {
        const payload: CreateNotePayload = { content: 'test note' };
        const mockErrorResponse = { error: 'Unauthorized', message: 'Invalid API key for /notes' };

        mockFetch.mockResolvedValue({
          ok: false,
          status: 401,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.createNote(payload)).rejects.toThrow(UnauthorizedError);
        await expect(client.createNote(payload)).rejects.toThrow(mockErrorResponse.message);
      });

      it('should handle 500 Internal Server Error for createNote', async () => {
        const payload: CreateNotePayload = { content: 'test note' };
        const mockErrorResponse = {
          error: 'Server Error',
          message: 'Internal server error on /notes',
        };

        mockFetch.mockResolvedValue({
          ok: false,
          status: 500,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.createNote(payload)).rejects.toThrow(ServerError);
        await expect(client.createNote(payload)).rejects.toThrow(mockErrorResponse.message);
      });
    });

    describe('deleteNote method', () => {
      it('should make a successful DELETE request to /notes/:id', async () => {
        const noteId = 'note_del123';
        mockFetch.mockResolvedValue({
          ok: true,
          status: 204, // No Content is typical for successful DELETE
          headers: { get: jest.fn().mockReturnValue(null) }, // No content-type
          json: jest.fn(), // Should not be called
          text: jest.fn(), // Should not be called
        } as unknown as Response);

        await expect(client.deleteNote(noteId)).resolves.toBeUndefined();

        expect(mockFetch).toHaveBeenCalledWith(
          `https://api.mem.ai/v1/notes/${noteId}`,
          expect.objectContaining({
            method: 'DELETE',
            headers: expect.objectContaining({ Authorization: 'Bearer test-api-key' }),
          })
        );
        expect((mockFetch.mock.calls[0][1] as any).body).toBeUndefined(); // DELETE requests usually have no body
      });

      it('should throw BadRequestError for invalid note ID (empty string)', async () => {
        await expect(client.deleteNote('')).rejects.toThrow(BadRequestError);
        await expect(client.deleteNote('')).rejects.toThrow('Note ID must be a non-empty string');
        expect(mockFetch).not.toHaveBeenCalled();
      });

      it('should throw BadRequestError for invalid note ID (not a string)', async () => {
        await expect(client.deleteNote(123 as any)).rejects.toThrow(BadRequestError);
        await expect(client.deleteNote(123 as any)).rejects.toThrow(
          'Note ID must be a non-empty string'
        );
        expect(mockFetch).not.toHaveBeenCalled();
      });

      it('should handle 404 Not Found for deleteNote', async () => {
        const noteId = 'non_existent_note';
        const mockErrorResponse = { error: 'Not Found', message: 'Note not found to delete' };
        mockFetch.mockResolvedValue({
          ok: false,
          status: 404,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.deleteNote(noteId)).rejects.toThrow(NotFoundError);
        await expect(client.deleteNote(noteId)).rejects.toThrow(mockErrorResponse.message);
      });

      it('should handle 401 Unauthorized for deleteNote', async () => {
        const noteId = 'note_auth_fail';
        const mockErrorResponse = {
          error: 'Unauthorized',
          message: 'Invalid API key for DELETE /notes',
        };
        mockFetch.mockResolvedValue({
          ok: false,
          status: 401,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.deleteNote(noteId)).rejects.toThrow(UnauthorizedError);
        await expect(client.deleteNote(noteId)).rejects.toThrow(mockErrorResponse.message);
      });

      it('should handle 500 Internal Server Error for deleteNote', async () => {
        const noteId = 'note_server_err';
        const mockErrorResponse = {
          error: 'Server Error',
          message: 'Internal server error on DELETE /notes',
        };
        mockFetch.mockResolvedValue({
          ok: false,
          status: 500,
          headers: {
            get: jest
              .fn()
              .mockImplementation((h) => (h === 'content-type' ? 'application/json' : null)),
          },
          json: jest.fn().mockResolvedValue(mockErrorResponse),
        } as unknown as Response);

        await expect(client.deleteNote(noteId)).rejects.toThrow(ServerError);
        await expect(client.deleteNote(noteId)).rejects.toThrow(mockErrorResponse.message);
      });
    });
  });
});

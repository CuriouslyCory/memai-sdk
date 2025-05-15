/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import { MemClient } from './client.js';
import { BadRequestError } from './errors.js';
import type { MemItPayload } from './types.js';

describe('MemClient', () => {
  let client: MemClient;

  beforeEach(() => {
    client = new MemClient('test-api-key');
    jest.clearAllMocks();
  });

  it('should create an instance with default options', () => {
    expect(client).toBeInstanceOf(MemClient);
  });

  it('should throw an error if API key is not provided', () => {
    expect(() => new MemClient('')).toThrow('API key is required');
  });

  it('should call request method with correct parameters for memIt', async () => {
    // Create a spy on the private request method
    const requestSpy = jest.spyOn(client as any, 'request').mockResolvedValue({
      request_id: 'req123',
      status: 'completed',
      operations: [
        {
          type: 'created-note',
          note_id: 'note123',
          title: 'Test content',
          url: 'https://app.mem.ai/m/note123',
        },
      ],
    });

    const payload: MemItPayload = { input: 'Test content' };
    const result = await client.memIt(payload);

    // Verify request was called with correct parameters
    expect(requestSpy).toHaveBeenCalledWith('POST', '/mem-it', payload);

    // Verify returned data
    expect(result).toEqual({
      request_id: 'req123',
      status: 'completed',
      operations: [
        {
          type: 'created-note',
          note_id: 'note123',
          title: 'Test content',
          url: 'https://app.mem.ai/m/note123',
        },
      ],
    });

    // Clean up spy
    requestSpy.mockRestore();
  });

  it('should throw BadRequestError when request method throws it', async () => {
    // Setup the spy to throw a BadRequestError
    const errorMessage = 'Input cannot be empty';
    const requestSpy = jest.spyOn(client as any, 'request').mockImplementation(() => {
      throw new BadRequestError(errorMessage);
    });

    // Verify the error is propagated correctly
    const payload: MemItPayload = { input: '' };
    await expect(client.memIt(payload)).rejects.toThrow(BadRequestError);
    await expect(client.memIt(payload)).rejects.toThrow(errorMessage);

    // Verify request was called with correct parameters
    expect(requestSpy).toHaveBeenCalledWith('POST', '/mem-it', payload);

    // Clean up spy
    requestSpy.mockRestore();
  });
});

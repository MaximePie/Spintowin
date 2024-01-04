import { renderHook, act } from '@testing-library/react-hooks';
import { useChatGPT } from './ChatGPT';

const API_KEY = '123123';
const mockAPIResponse = {
  choices: [
    {
      message: {
        content: 'Response from ChatGPT',
      },
    },
  ],
};

const mockFetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(mockAPIResponse),
});

global.fetch = mockFetch;

describe('useChatGPT', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetch with the correct parameters', async () => {
    const { result } = renderHook(() => useChatGPT());

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(mockFetch).toHaveBeenCalledWith('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "I'm a Student using ChatGPT for learning" },
          { role: 'user', content: 'Hello' },
        ],
      }),
    });
  });

  it('should set the response when API call is successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChatGPT());

    await act(async () => {
      await result.current.sendMessage('Hello');
      await waitForNextUpdate();
    });

    expect(result.current.response).toBe('Response from ChatGPT');
  });

  it('should set isTyping to false after API call', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useChatGPT());

    await act(async () => {
      await result.current.sendMessage('Hello');
      await waitForNextUpdate();
    });

    expect(result.current.isTyping).toBe(false);
  });

  it('should handle errors during API call', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const mockError = new Error('API Error');
    mockFetch.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useChatGPT());

    await act(async () => {
      await result.current.sendMessage('Hello');
      await waitForNextUpdate();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error processing message:', mockError);
  });
});

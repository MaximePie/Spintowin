import { useState } from 'react';

const API_KEY = import.meta.env.VITE_CHAT_API_KEY;

type MessageType = {
  message: string;
  sentTime: string;
  sender: string;
};

type ChatGPTHook = {
  sendMessage: (_message: string) => void;
  isTyping: boolean;
  response: string;
};

// eslint-disable-next-line import/prefer-default-export
export function useChatGPT(): ChatGPTHook {
  if (!API_KEY) {
    throw new Error('API_KEY is not defined');
  }
  const [response, setResponse] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (message: string) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
      sentTime: 'just now',
    };
    setIsTyping(true);

    try {
      const apiResponse = await processMessageToChatGPT([newMessage]);
      const content = apiResponse.choices[0]?.message?.content;
      if (content) {
        setResponse(content);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages: MessageType[]) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    console.log('apiRequestBody', apiRequestBody);

    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    return apiResponse.json();
  }

  return {
    sendMessage,
    isTyping,
    response,
  };
}

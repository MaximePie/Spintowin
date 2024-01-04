import { useCompletion } from './useCompletion';
import { useChatGPT } from '../../../hooks/ChatGPT'; // Replace 'path/to/useChatGPT' with the actual path

jest.mock('../../../hooks/ChatGPT'); // Replace 'path/to/useChatGPT' with the actual path

describe('useCompletion', () => {
  let mockSendMessage: jest.Mock;
  let mockUseChatGPT: jest.Mock;

  beforeEach(() => {
    mockSendMessage = jest.fn();
    mockUseChatGPT = jest.fn().mockReturnValue({ sendMessage: mockSendMessage });
    (useChatGPT as jest.Mock).mockReturnValue({ sendMessage: mockSendMessage });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call sendMessage with the correct ChatGPTPrompt', () => {
    const { askForCompletion } = useCompletion();
    const question = 'question';
    const category = 'category';
    const expectedChatGPTPrompt = `Je suis étudiant en ${category}. 
  Ecris 3 phrases en en ${category} courtes contenant le mot "${question}" et leur traduction en français.
  Les phrases ne doivent pas dépasser 4 ou 5 mots. Ecris les phrases sous la forme "phrase en ${category} : traduction en français -"
  "`;

    askForCompletion(question, category);

    expect(mockSendMessage).toHaveBeenCalledWith(expectedChatGPTPrompt);
  });
});

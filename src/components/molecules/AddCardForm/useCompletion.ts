import { useChatGPT } from '../../../hooks/ChatGPT';

// eslint-disable-next-line import/prefer-default-export
export const useCompletion = () => {
  const { sendMessage } = useChatGPT();
  const askForCompletion = (question: string, category: string) => {
    const ChatGPTPrompt = `Je suis étudiant en ${category}. 
  Ecris 3 phrases en en ${category} courtes contenant le mot "${question}" et leur traduction en français.
  Les phrases ne doivent pas dépasser 4 ou 5 mots. Ecris les phrases sous la forme "phrase en ${category} : traduction en français -"
  "`;
    sendMessage(ChatGPTPrompt);
  };

  return {
    askForCompletion,
  };
};

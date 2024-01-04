import { config } from 'dotenv';

config();
test('import.meta.env.VITE_CHAT_API_KEY is defined', () => {
  expect(process.env.VITE_CHAT_API_KEY).toBeDefined();
});

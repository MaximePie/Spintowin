require('dotenv').config();

console.log('Setting up tests from jest.setup.js');
global.import = {
  ...process.env,
  VITE_CHAT_API_KEY: process.env.VITE_CHAT_API_KEY,
};

require('dotenv').config();

global.import = {
  ...process.env,
  meta: {
    env: process.env,
  },
};

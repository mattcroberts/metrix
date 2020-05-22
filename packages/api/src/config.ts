import * as dotenv from 'dotenv';
dotenv.config();
export const config = {
  uiHost: process.env.UI_HOST || 'http://localhost:3000/metrix',
  apiPath: process.env.API_PATH || '',
  tokenCookieName: process.env.TOKEN_COOKIE_NAME || 'x-auth-token',
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 4000,
  googleAuth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  redisHost: process.env.REDIS_HOST,
};

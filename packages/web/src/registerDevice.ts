import { app } from './firebase-config';
const messaging = app.messaging();

export const registerDevice = async () => {
  const token = await messaging.getToken();
  await fetch(process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_PATH}/push-reg`: `/push-reg`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ token }),
  });
};

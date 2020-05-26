import { app } from './firebase-config';
const messaging = app.messaging();

export const registerDevice = async () => {
  const token = await messaging.getToken();
  await fetch(`${process.env.PUBLIC_URL}/push-reg`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ token }),
  });
};

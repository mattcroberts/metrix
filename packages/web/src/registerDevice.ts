import { messaging } from './firebase-config';

export const registerDevice = async () => {
  if (messaging) {
    const token = await messaging.getToken();
    await fetch(process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_PATH}/push-reg` : `/push-reg`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
};

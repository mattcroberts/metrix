import { messaging } from 'firebase';

export const registerDevice = async () => {
  const token = await messaging().getToken();
  await fetch('/push-reg', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ token }),
  });
};

import { messaging } from 'firebase';
import Cookie from 'js-cookie';

export const registerDevice = async () => {
  let permission: NotificationPermission = 'default';

  try {
    permission = await Notification.requestPermission();
  } catch (e) {
    console.error(e);
  }

  if (permission === 'granted') {
    const authToken = Cookie.get('x-auth-token');
    const token = await messaging().getToken();
    const resp = await fetch('/push-reg', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  return permission;
};

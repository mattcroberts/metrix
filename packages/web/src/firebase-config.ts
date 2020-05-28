import * as firebase from 'firebase';
import { useRegisterDeviceMutation } from './generated/graphql';

export const firebaseConfig = {
  apiKey: 'AIzaSyBZ8pCndLluwK7xe0IaWvOVcFXIAOFvtTM',
  authDomain: 'metrix-1587646391040.firebaseapp.com',
  databaseURL: 'https://metrix-1587646391040.firebaseio.com',
  projectId: 'metrix-1587646391040',
  storageBucket: 'metrix-1587646391040.appspot.com',
  messagingSenderId: '165626569566',
  appId: '1:165626569566:web:9b3d406f5c473647c9a5cf',
  measurementId: 'G-YB88WZMZQJ',
};

export const app = firebase.initializeApp(firebaseConfig);
export let messaging: firebase.messaging.Messaging | null = null;

if (firebase.messaging.isSupported()) {
  const m = app.messaging();
  messaging = m;
  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`).then((serviceWorker) => {
    m.useServiceWorker(serviceWorker);
  });

  m.usePublicVapidKey('BPze25H4zpB3LDfvMPZ9gxzJJLSnRlccauNuTaSsW6HB21qgGZdsaN4OEXEzuSS2S-nlapodPDVRzBoWYBJ-8LI');

  m.onTokenRefresh(async (token) => {
    // not sure this'll work... hook outside a component...
    const [registerDevice] = useRegisterDeviceMutation();
    try {
      await registerDevice({
        variables: {
          token,
        },
      });
    } catch (e) {
      console.error(e);
    }
  });
}

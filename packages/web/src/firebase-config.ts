import * as firebase from 'firebase';
import { registerDevice } from './registerDevice';

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
const messaging = app.messaging();
navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`).then((serviceWorker) => {
  messaging.useServiceWorker(serviceWorker);
});

messaging.usePublicVapidKey('BPze25H4zpB3LDfvMPZ9gxzJJLSnRlccauNuTaSsW6HB21qgGZdsaN4OEXEzuSS2S-nlapodPDVRzBoWYBJ-8LI');

messaging.onTokenRefresh(async (...args) => {
  console.log('onTokenRefresh', args);
  try {
    await registerDevice();
  } catch (e) {
    console.error(e);
  }
});

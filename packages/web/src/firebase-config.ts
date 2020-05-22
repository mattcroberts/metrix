import * as firebase from 'firebase';

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

const app = firebase.initializeApp(firebaseConfig);
const messaging = app.messaging();

messaging.onTokenRefresh((...args) => {
  console.log('onTokenRefresh', args);
});

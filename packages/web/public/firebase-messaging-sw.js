importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js');

const firebaseConfig = {
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

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

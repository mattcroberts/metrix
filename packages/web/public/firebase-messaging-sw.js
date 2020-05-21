importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.1/js.cookie.min.js');

const registerDevice = async (token) => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const authToken = Cookie.get('x-auth-token');

    const resp = await fetch('/push-reg', {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
};

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

messaging.setBackgroundMessageHandler((payload) => {
  new Notification({ title: 'background' });
});

(async () => {
  let currentToken;
  try {
    currentToken = await messaging.getToken();
  } catch (e) {
    console.error(e);
    return;
  }

  console.log({ currentToken });
  if (currentToken) {
    await registerDevice();
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
  }
})();

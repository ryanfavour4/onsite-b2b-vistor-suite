importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');
import { success } from 'toastr';

const firebaseConfig = {
    apiKey: "AIzaSyAfKD03UBz7RoXWqLSrGWwWwPVh9zpXXGE",
    authDomain: "carrotsuite-space-1.firebaseapp.com",
    projectId: "carrotsuite-space-1",
    storageBucket: "carrotsuite-space-1.appspot.com",
    messagingSenderId: "541756198227",
    appId: "1:541756198227:web:2d64fd145dc0b91dac65a6",
    measurementId: "G-LM4709TRQ3"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
self.addEventListener('push', (event) => {
    console.log('Push received', event);
    const data = event.data.json();
    const { title, body, url } = data;

    event.waitUntil(
        self.registration.showNotification(title, {
            body,
            //icon: '/path/to/notification-icon.png',
            data: {
                url
            }
        })
    );
});
messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message:', payload);
    // Customize notification here
    success(payload.notification.body);

    // Display the notification to the user
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});



self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const url = event.notification.data.url;

    if (url) {
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});

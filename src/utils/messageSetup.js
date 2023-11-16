import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAfKD03UBz7RoXWqLSrGWwWwPVh9zpXXGE",
    authDomain: "carrotsuite-space-1.firebaseapp.com",
    projectId: "carrotsuite-space-1",
    storageBucket: "carrotsuite-space-1.appspot.com",
    messagingSenderId: "541756198227",
    appId: "1:541756198227:web:2d64fd145dc0b91dac65a6",
    measurementId: "G-LM4709TRQ3"
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export async function getFCMToken() {
    try {
        const token = await getToken(messaging, { vapidKey: "BCMDBA2kDI0dbA1EkYVKcLODWLyHk7xwxzhBjM8kXEAz_BY1ObhTskVEznTp30YPy82mlBV6TscPWHcvqJxTPPI" }
        );
        console.log('token:', token);
        return token;

    } catch (error) {
        console.error("get frm token error", error);
        return null;
    }
}

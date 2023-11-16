import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { setAxiosToken } from "./axios";
import { authenticate } from "./features/authSlice";
import Loading from "./components/Loading";
import { getAdminDetails, getUserDetails } from "./services/auth";
import { subscribeUser } from "./subscription";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import toastr from "toastr";

const firebaseConfig = {
  apiKey: "AIzaSyAfKD03UBz7RoXWqLSrGWwWwPVh9zpXXGE",
  authDomain: "carrotsuite-space-1.firebaseapp.com",
  projectId: "carrotsuite-space-1",
  storageBucket: "carrotsuite-space-1.appspot.com",
  messagingSenderId: "541756198227",
  appId: "1:541756198227:web:2d64fd145dc0b91dac65a6",
  measurementId: "G-LM4709TRQ3",
};
const VapidKey =
  "BCMDBA2kDI0dbA1EkYVKcLODWLyHk7xwxzhBjM8kXEAz_BY1ObhTskVEznTp30YPy82mlBV6TscPWHcvqJxTPPI";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

async function getFCMToken() {
  try {
    const token = await getToken(messaging, { vapidKey: VapidKey });
    // console.log('Token:', token);
    return token;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

function App() {
  const { userData } = useSelector((state) => state.auth);

  // console.log(userData);
  const [loading, setLoading] = useState(true);
  const handleNotification = (event) => {
    // Handle the notification event
    const notification = event.notification;
    // console.log('Received a newwww notification:', notification);

    // Display the notification to the user using a UI component or custom logic
    // Example: Show a browser notification
    toastr.success(notification.title, notification.body);
  };

  const dispatch = useDispatch();
  navigator.serviceWorker
    .register("firebase-messaging-sw.js", { scope: "/dashboard" })
    .then((registration) => {
      // Registration was successful
      // console.log('ServiceWorker registration successful:', registration);
    })
    .then(() => {
      navigator.serviceWorker.addEventListener("message", handleNotification);
      // console.log('Added listener for messages');
    })
    .catch((err) => {
      // Registration failed
      console.log("ServiceWorker registration failed:", err);
    });
  navigator.serviceWorker.addEventListener("message", (message) => {
    // console.log(message));
  });
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // console.log('Notification permission granted.');
    } else {
      // console.log('Unable to get permission to notify.');
    }
  });

  // Register the notification event listener
  navigator.serviceWorker.addEventListener("push", (event) => {
    // console.log("Received a push message", event);
    if (Notification.permission === "granted") {
      const notification = event.notification;
      const options = {
        body: notification.body,
        icon: notification.icon,
      };
      new Notification(notification.title, options);
    }
  });

  // Call the getFCMToken function here if needed
  getFCMToken();

  useLayoutEffect(() => {
    (async () => {
      // if (!("Notification" in window)) {
      //   console.log("This browser does not support desktop notification");
      // } else {
      //   Notification.requestPermission().then(result => {
      //     console.log("Notification registeration token: ", result);
      //   });
      //   console.log("Notifications are supported");
      // }

      try {
        if (localStorage.getItem("auth") != null) {
          const otherRes = await getUserDetails(
            JSON.parse(localStorage.getItem("auth")).userData?.token
          );
          dispatch(
            authenticate({
              userData: JSON.parse(localStorage.getItem("auth")).userData,
              staffInviteOnlyMode: Boolean(
                otherRes?.data?.user?.appointment_only
              ),
              companyInviteOnlyMode: Boolean(
                Number(otherRes?.data?.user?.company_invite_mode)
              ),
            })
          );
        }
        setLoading(true);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      {/* <button onClick={subscribeUser} className="bg-blue text-white rounded-md p-4 absolute top-40 left-20 z-[1000]">Click Here</button> */}
      <ToastContainer />
      {userData != null ? <PrivateRoutes /> : <PublicRoutes />}
    </Router>
  );
}

export default App;

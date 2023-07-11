








import { useEffect, useState } from "react";
import { messaging, db } from "./firebase";
import { getToken } from "firebase/messaging";
import logo from "./assets/logo.jpg";
import bitcareLogo from "./assets/bitcare-logo.jpg";
import notificationIcon from "./assets/notnotification-icon.jpg";
import { formatDistanceToNow } from "date-fns";
import "./App.css";

function NotificationList() {
  const [notificationData, setNotificationData] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestPermission();
    fetchNotifications();
  }, []);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BNoz4dATKdJ83YLmywYO_gaX4QGtwxOlsrfr35Dlgz8JLIU_I6WYwr2I0Qb7rWVM9g9Tzw6VthxTq88AxtX9HDk",
      });
      console.log("Token Gen", token);
      // Send this token to server (db)
    } else if (permission === "denied") {
      alert("You denied notification permission");
    }
  }

  useEffect(() => {
    // Calculate the count of unread notifications
    const unreadNotificationCount = notifications.filter(
      (notification) => !notification.read
    ).length;

    // Update the document title with the unread notification count
    document.title =
      unreadNotificationCount > 0
        ? `(${unreadNotificationCount}) Notifications`
        : "Notifications";
  }, [notifications]);

  const unreadNotificationCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const fetchNotifications = async () => {
    try {
      const collectionRef = db.collection("Notification");
      const querySnapshot = await collectionRef.orderBy("receivedAt", "desc").get();
  
      const fetchedNotifications = querySnapshot.docs.map((doc) => {
        const notification = doc.data();
        const receivedAt = notification.receivedAt ? notification.receivedAt.toDate() : null; // Convert Firestore timestamp to JavaScript Date object if available
        return { ...notification, receivedAt };
      });
  
      setNotifications(fetchedNotifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to fetch notifications");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    requestPermission();

    navigator.serviceWorker.addEventListener("message", async (event) => {
      setNotificationData(event.data); // Update state with received data

      console.log("Message received in App.js:", event.data);

      try {
        const timestamp = new Date(); // Get the current timestamp
        const docRef = await db.collection("Notification").add({
          ...event.data,
          receivedAt: timestamp,
        });
        console.log("Message saved to Firestore with ID:", docRef.id);
      } catch (error) {
        console.error("Error saving message to Firestore:", error);
      }

      const { title, body } = event.data;
      const notificationOptions = {
        body: body,
        icon: "/path/to/notification-icon.png",
      };

      new Notification(title, notificationOptions);
    });
  }, []);

  const handleNotificationClick = (id) => {
    const timestamp = new Date(); // Get the current timestamp
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id && !notification.read) {
        return { ...notification, read: true, receivedAt: timestamp };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
    setShowNotificationModal(true);
  };
  

  return (
    <div className="notification-page">
      <img src={logo} alt="Logo" className="logo" />
      <div>
        <div
          className="notification-icon"
          onClick={() => setShowNotificationModal(true)}
        >
          <img src={notificationIcon} alt="Notification Icon" />
          {unreadNotificationCount > 0 && (
            <span className="notification-count">
              {unreadNotificationCount}
            </span>
          )}
        </div>
        {showNotificationModal && (
          <div className="notification-modal">
            <div className="side-menu">
              <div className="header">
                <h2>Notifications</h2>
                <button
                  className="close-icon"
                  onClick={() => setShowNotificationModal(false)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              {loading ? (
                <p>Loading notifications...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                notifications.map((notification) => {
                  const receivedAt = new Date(notification.receivedAt);
                  const timeDifference = formatDistanceToNow(receivedAt, {
                    addSuffix: true,
                  });

                  return (
                    <div
                      key={notification.fcmMessageId}
                      className={`notification-item ${
                        notification.read ? "read" : "unread"
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="notification-container">
                        <div className="notification-logo">
                          <img src={bitcareLogo} alt="Logo" />
                        </div>
                        <div className="notification-content">
                          <h3 className="notification-title">
                            <p>{notification.notification.title}</p>
                          </h3>
                          <h3 className="notification-text">
                            <p>{notification.notification.body}</p>
                          </h3>
                          {notification.receivedAt && (
                            <p className="notification-received-at">
                              {timeDifference}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationList;





// import { useEffect, useState } from "react";
// import { messaging, db } from "./firebase";
// import { getToken } from "firebase/messaging";
// import logo from "./assets/logo.jpg";
// import bitcareLogo from "./assets/bitcare-logo.jpg";
// import notificationIcon from "./assets/notnotification-icon.jpg";
// import "./App.css";

// function App() {
//   const [notificationData, setNotificationData] = useState(null);
//   const [showNotificationModal, setShowNotificationModal] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     requestPermission();
//     fetchNotifications();
//   }, []);

//   async function requestPermission() {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       const token = await getToken(messaging, {
//         vapidKey: "BNoz4dATKdJ83YLmywYO_gaX4QGtwxOlsrfr35Dlgz8JLIU_I6WYwr2I0Qb7rWVM9g9Tzw6VthxTq88AxtX9HDk",
//       });
//       console.log("Token Gen", token);
//       // Send this token to server (db)
//     } else if (permission === "denied") {
//       alert("You denied notification permission");
//     }
//   }

//   useEffect(() => {
//     // Calculate the count of unread notifications
//     const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

//     // Update the document title with the unread notification count
//     document.title = unreadNotificationCount > 0 ? `(${unreadNotificationCount}) Notifications` : "Notifications";
//   }, [notifications]);

//   const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

//   const fetchNotifications = async () => {
//     try {
//       const collectionRef = db.collection("Notification");
//       const querySnapshot = await collectionRef.get();

//       const fetchedNotifications = [];
//       querySnapshot.forEach((doc) => {
//         const notification = doc.data();
//         fetchedNotifications.push(notification);
//       });

//       setNotifications(fetchedNotifications);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       setError("Failed to fetch notifications");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestPermission();

//     navigator.serviceWorker.addEventListener("message", async (event) => {
//       setNotificationData(event.data); // Update state with received data

//       console.log("Message received in App.js:", event.data);

//       try {
//         const docRef = await db.collection("Notification").add(event.data);
//         console.log("Message saved to Firestore with ID:", docRef.id);
//       } catch (error) {
//         console.error("Error saving message to Firestore:", error);
//       }

//       const { title, body } = event.data;
//       const notificationOptions = {
//         body: body,
//         icon: "/path/to/notification-icon.png",
//       };

//       new Notification(title, notificationOptions);
//     });
//   }, []);

//   const handleNotificationClick = (id) => {
//     const updatedNotifications = notifications.map((notification) => {
//       if (notification.id === id) {
//         return { ...notification, read: true };
//       }
//       return notification;
//     });
//     setNotifications(updatedNotifications);
//     setShowNotificationModal(true);
//   };
  

//   return (
//     <div className="notification-page">
//       <img src={logo} alt="Logo" className="logo" />
//       <div>
//         <div className="notification-icon" onClick={handleNotificationClick}>
//           <img src={notificationIcon} alt="Notification Icon" />
//           {unreadNotificationCount > 0 && (
//             <span className="notification-count">
//               {unreadNotificationCount}
//             </span>
//           )}
//         </div>
//         {showNotificationModal && (
//           <div className="notification-modal">
//             <div className="side-menu">
             
//               <div className="header">
//                 <h2>Notifications</h2>
//                 <button
//                   className="close-icon"
//                   onClick={() => setShowNotificationModal(false)}
//                 >
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//               {loading ? (
//                 <p>Loading notifications...</p>
//               ) : error ? (
//                 <p>Error: {error}</p>
//               ) : (
//                 notifications.map((notification) => (
//                   <div
//                     key={notification.fcmMessageId}
//                     className={`notification-item ${
//                       notification.read ? "read" : "unread"
//                     }`}
//                     onClick={() =>
//                       handleNotificationClick(notification.id)
//                     }
//                   >
//                     <div className="notification-container">
//                       <div className="notification-logo">
//                         <img src={bitcareLogo} alt="Logo" />
//                       </div>
//                       <div className="notification-content">
//                         <h3 className="notification-title">
//                          <p>{notification.notification.title}</p>
//                         </h3>

//                         <h3 className="notification-text">
//                             <p>{notification.notification.body}</p>
//                         </h3>

                        
//                         <p className="notification-time">
//                           {notification.timestamp}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

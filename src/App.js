// import { useEffect } from "react";
// import { messaging, db } from "./firebase";
// import { getToken } from "firebase/messaging";
// import logo from "./assets/logo.jpg";
// import "./App.css";

// function App() {
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
//     requestPermission();

//     navigator.serviceWorker.addEventListener("message", async (event) => {
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

//   return (
//     <div className="notification-page">
//       <h1>Notifications</h1>
//     </div>
//   );
// }

// export default App;




// import { useEffect } from "react";
// import { messaging } from "./firebase";
// import { getToken } from "firebase/messaging";
// import logo from "./assets/logo.jpg"
// import "./App.css";

// function App() {
//   async function requestPermission() {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       // Generate Token
//       const token = await getToken(messaging, {
//         vapidKey:
//           "BNoz4dATKdJ83YLmywYO_gaX4QGtwxOlsrfr35Dlgz8JLIU_I6WYwr2I0Qb7rWVM9g9Tzw6VthxTq88AxtX9HDk",
//       });
//       console.log("Token Gen", token);
//       // Send this token to server (db)
//     } else if (permission === "denied") {
//       alert("You denied notification permission");
//     }
//   }

//   useEffect(() => {
//     requestPermission();

//     // Listen for messages from service worker
//     navigator.serviceWorker.addEventListener("message", (event) => {
//       console.log("Message received in App.js:", event.data);

//       // Send message as notification
//       const { title, body } = event.data;
//       const notificationOptions = {
//         body: body,
//         icon: "/path/to/notification-icon.png",
//       };

//       new Notification(title, notificationOptions);
//     });
//   }, []);

  // const notifications = [
  //   { id: 1, title: 'Your Appointment has been booked successfully.', text: '1 minute ago' },
  //   { id: 2, title: 'Your Appointment is on 10/06/2024, 10:00 AM.', text: '5 minutes ago' },
  //   { id: 3, title: 'Appointment Reaminder, Please visit the clinic before 15mins', text: '10 minutes ago' },
  //   // Add more notifications here
  // ];

//   return (
//     <div className="notification-page">
//      <img src={logo} alt="Logo" className="logo" />
//       <div className="notification-container">
//       <h1>Notifications</h1>
        // {notifications.map(notification => (
        //   <div key={notification.id} className="notification-item">
        //     <h3 className="notification-title">{notification.title}</h3>
        //     <p className="notification-text">{notification.text}</p>
        //     <p className="notification-time">{notification.time}</p>
        //   </div>
        // ))}
//       </div>
//     </div>
//   );
// }

// export default App;



// import { useEffect, useState } from "react";
// import { messaging } from "./firebase";
// import { getToken } from "firebase/messaging";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [appointment, setAppointment] = useState(null);

//   async function requestPermission() {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       // Generate Token
//       const token = await getToken(messaging, {
//         vapidKey:
//           "BNoz4dATKdJ83YLmywYO_gaX4QGtwxOlsrfr35Dlgz8JLIU_I6WYwr2I0Qb7rWVM9g9Tzw6VthxTq88AxtX9HDk",
//       });
//       console.log("Token Gen", token);
//       // Send this token to server (db)

//       // Get random appointment details
//       const appointmentDetails = [
//         {
//           date: "2023-06-01",
//           time: "10:00 AM",
//           location: "Main Street Clinic",
//         },
//         {
//           date: "2023-06-02",
//           time: "2:30 PM",
//           location: "City Hospital",
//         },
//         {
//           date: "2023-06-03",
//           time: "9:15 AM",
//           location: "Healthcare Center",
//         },
//       ];

//       const randomIndex = Math.floor(Math.random() * appointmentDetails.length);
//       const randomAppointment = appointmentDetails[randomIndex];
//       setAppointment(randomAppointment);
//     } else if (permission === "denied") {
//       alert("You denied notification permission");
//     }
//   }

//   useEffect(() => {
//     requestPermission();

//     // Listen for messages from service worker
//     navigator.serviceWorker.addEventListener("message", (event) => {
//       console.log("Message received in App.js:", event.data);

//       // Send message as notification
//       const { title, body } = event.data;
//       const notificationOptions = {
//         body: body,
//         icon: "/path/to/notification-icon.png",
//       };

//       new Notification(title, notificationOptions);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1 className="App-title">Appointment App</h1>
//       </header>
//       <main className="App-content">
//         {appointment ? (
//           <div className="Appointment-details">
//             <h2>Appointment Details</h2>
//             <p>
//               <strong>Date:</strong> {appointment.date}
//             </p>
//             <p>
//               <strong>Time:</strong> {appointment.time}
//             </p>
//             <p>
//               <strong>Location:</strong> {appointment.location}
//             </p>
//           </div>
//         ) : (
//           <p>No appointment details available</p>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;



// import { useEffect, useState } from "react";
// import { messaging, db } from "./firebase";
// import { getToken } from "firebase/messaging";
// import logo from "./assets/logo.jpg";
// import notificationIcon from "./assets/notnotification-icon.jpeg";
// import "./App.css";

// function App() {
//   const [notificationData, setNotificationData] = useState(null);
//   const [showNotificationModal, setShowNotificationModal] = useState(false);

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

//   const handleNotificationClick = () => {
//     setShowNotificationModal(true);
//   };

//   const notifications = [
//     { id: 1, title: 'Your Appointment has been booked successfully.', text: '1 minute ago' },
//     { id: 2, title: 'Your Appointment is on 10/06/2024, 10:00 AM.', text: '5 minutes ago' },
//     { id: 3, title: 'Appointment Reaminder, Please visit the clinic before 15mins', text: '10 minutes ago' },
//     // Add more notifications here
//   ];

//   return (
//     <div className="notification-page">
//       {/* <img src={logo} alt="Logo" className="logo" /> */}
//       <div className="notification-container">
//         <div className="notification-icon" onClick={handleNotificationClick}>
//           <img src={notificationIcon} alt="Notification Icon" />
//         </div>
//         {showNotificationModal && (
//           <div className="notification-modal">
//             <div className="side-menu">
//             <img src={logo} alt="Logo" className="logo" />
//   <div className="header">
  
//     <h2>Notifications</h2>
//     <button className="close-icon" onClick={() => setShowNotificationModal(false)}>
//       <i className="fas fa-times"></i>
//     </button>
//   </div>
//   {/* {notificationData && (
//     <div className="notification-details">
//       <h3>Received Notification:</h3>
//       <p>Title: {notificationData.title}</p>
//       <p>Body: {notificationData.body}</p>
//     </div>
//   )} */}
//    {notifications.map(notification => (
//                   <div key={notification.id} className="notification-item">
//                     <h3 className="notification-title">{notification.title}</h3>
//                     <p className="notification-text">{notification.text}</p>
//                     <p className="notification-time">{notification.time}</p>
//                   </div>
//                 ))}

// </div>
           
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import NotificationList from "./NotificationPage";
import UserNotification from './userNotification';


const App = () => {
  return (
    <div>
      
      <NotificationList />
    </div>
  );
};

export default App;



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
//   const [notifications, setNotifications] = useState([
//     { id: 1, title: 'Your Appointment has been booked successfully.', text: '1 minute ago', read: false },
//     { id: 2, title: 'Your Appointment is on 10/06/2024, 10:00 AM.', text: '5 minutes ago', read: false },
//     { id: 3, title: 'Appointment Reminder, Please visit the clinic before 15 minutes', text: '10 minutes ago', read: false },
//     // Add more notifications here
//   ]);

//   useEffect(() => {
//     // Calculate the count of unread notifications
//     const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

//     // Update the document title with the unread notification count
//     document.title = unreadNotificationCount > 0 ? `(${unreadNotificationCount}) Notifications` : "Notifications";
//   }, [notifications]);

//   const unreadNotificationCount = notifications.filter(notification => !notification.read).length;

  

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
//     const updatedNotifications = notifications.map((notification) =>
//       notification.id === id ? { ...notification, read: true } : notification
//     );
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
//               {/* <img src={logo} alt="Logo" className="logo" /> */}
//               <div className="header">
//                 <h2>Notifications</h2>
//                 <button className="close-icon" onClick={() => setShowNotificationModal(false)}>
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//                   {notifications.map(notification => (
//                     <div
//                       key={notification.id}
//                       className={`notification-item ${notification.read ? 'read' : 'unread'}`}
//                       onClick={() => handleNotificationClick(notification.id)}
//                     >
//                       <div className="notification-container">
//                           <div className="notification-logo">
//                             <img src={bitcareLogo} alt="Logo" />
//                           </div>
//                           <div className="notification-content">
//                             <h3 className="notification-title">{notification.title}</h3>
//                             <p className="notification-text">{notification.text}</p>
//                             <p className="notification-time">{notification.time}</p>
//                           </div>
//                       </div>
//                     </div>
//                   ))}

//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


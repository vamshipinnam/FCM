importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBuR-LPND9F9J3ee6-0oh1oBMO-A2OsC-I",
  authDomain: "f-c-m-5e0c0.firebaseapp.com",
  projectId: "f-c-m-5e0c0",
  storageBucket: "f-c-m-5e0c0.appspot.com",
  messagingSenderId: "992376867117",
  appId: "1:992376867117:web:6838f3d41595723fda6ba4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage(async (payload) => {
//     console.log("Background message received:", payload);
  
//     // Generate Token
  
//     // Dispatch an event to the client with the payload data
//     // self.clients.matchAll().then((clients) => {
//     //   clients.forEach((client) => {
//     //     // Post the payload data to the client
//     //     client.postMessage(payload);
  
//     //     // Trigger a custom event in the client's window context to handle UI updates
//     //     client.postMessage({
//     //       type: 'DISPLAY_PAYLOAD',
//     //       payload: payload,
//     //     });
//     //   });
//     // });
//   });
  


  
 
import React from 'react';

function RequestNotificationPermission() {
  const handlePermissionRequest = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    }
  };

  return (
    <button onClick={handlePermissionRequest}>
      Request Notification Permission
    </button>
  );
}

export default RequestNotificationPermission;


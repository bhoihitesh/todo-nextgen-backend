const admin = require('firebase-admin');

function sendNotification(fcmToken, title, body) {
    const message = {
      notification: {
        title: title,
        body: body
      },
      token: fcmToken
    };
  
    // Send the notification
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }

  module.exports = sendNotification;
  
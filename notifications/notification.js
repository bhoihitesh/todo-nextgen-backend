const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

// Decode and parse the Base64-encoded credentials
const serviceAccount = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64, "base64").toString("utf-8")
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
  
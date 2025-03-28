const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

// Decode and parse the Base64-encoded credentials
const serviceAccount = JSON.parse(
  Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS_BASE64, "base64").toString(
    "utf-8"
  )
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendNotification(fcmToken, title, body) {
  if (fcmToken) {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      data: {
        click_action: "https://todo-nextgen.vercel.app/",
        priority: "high",
      },
      android: {
        priority: "high",
        ttl: 0,
        notification: {
          click_action: "https://todo-nextgen.vercel.app/",
          priority: "max",
        },
      },
      token: fcmToken,
    };

    // Send the notification
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }
}

module.exports = sendNotification;

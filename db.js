const notifyMessage = require('./notifications/cron');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ConnectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://bhoihitesh1492:$*Hitesh%40123*$@todo-nextgen.ew82p.mongodb.net/todo-app?retryWrites=true&w=majority");
    notifyMessage()
    console.warn("MongoDB Database Connected Successfully");
  } catch (error) {
    console.warn("Error while connecting to MongoDB", error);
  }
};

module.exports = { ConnectMongoDB };

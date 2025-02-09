const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ConnectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Ensure this is set
    if (!mongoURI) {
      console.error(
        "Error: MONGO_URI is not defined in environment variables."
      );
      process.exit(1); // Exit if no URI is provided
    }
    await mongoose.connect(mongoURI);
    console.warn("MongoDB Database Connected Successfully");
  } catch (error) {
    console.warn("Error while connecting to MongoDB", error);
  }
};

module.exports = { ConnectMongoDB };

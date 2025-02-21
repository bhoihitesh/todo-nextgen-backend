const mongoose = require("mongoose");

const users = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fcm_token: {
    type: String,
    required: false,
    default: null,
  }
});

module.exports = mongoose.model("User", users);
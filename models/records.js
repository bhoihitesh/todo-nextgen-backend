const mongoose = require("mongoose");

const records = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  record_date: {
    type: String,
    required: true,
  },
  record_start_date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Record', records);
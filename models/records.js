const mongoose = require("mongoose");

const records = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  record_start_date: { type: String, required: true, },
  record_start_time: { type: String, required: true, },
  created_by: {
    date: { type: String, requird: true },
    user: { type: String, required: true },
    email: { type: String, required: true },
  }
});

module.exports = mongoose.model('Record', records);
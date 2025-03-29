const { default: axios } = require("axios");
const users = require("../models/users");
const records = require("../models/records");
const sendNotification = require("./notification");
const moment = require("moment-timezone");
const dotenv = require("dotenv");
dotenv.config();

const notifyMe = () => {
  return setInterval(async () => {
    const userData = await users.find();
    const recordData = await records.find();
    const currentDateTime = moment().tz("Asia/Kolkata");
    console.log("currentDateTime", currentDateTime)

    userData.forEach((user, i) => {
      recordData.forEach((record, i) => {
        const recordDateTime = record?.record_start_date + " " + record?.record_start_time;
        const recordStartDateTime = moment(recordDateTime, "DD-MM-YYYY hh:mm A");
        const recordEndDateTime = moment(recordDateTime, "DD-MM-YYYY hh:mm A").add(1, "hours");
        console.log("condition1", recordStartDateTime, recordEndDateTime);
        console.log(
          "condition2",
          currentDateTime.isSameOrAfter(recordStartDateTime),
          currentDateTime.isSameOrBefore(recordEndDateTime)
        );
        if (
          currentDateTime.isSameOrAfter(recordStartDateTime) &&
          currentDateTime.isSameOrBefore(recordEndDateTime)
        ) {
          return sendNotification(
            user?.fcm_token,
            record?.title,
            record?.description
          );
        }
      });
    });
  }, 300000);
};

module.exports = notifyMe;

// const { default: axios } = require("axios");
// const users = require("../models/users");
// const records = require("../models/records");
// const sendNotification = require("./notification");
// const moment = require("moment");
// const dotenv = require('dotenv');
// dotenv.config();

// const notifyMe =()=> {
//     // return setInterval(async() => {
//     //     const userData = await users.findOne();
//     //     const recordData = await records.find()

//     //     recordData.forEach((record,index)=>{
//     //         const recordDateTime = record?.record_start_date + ' ' + record?.record_start_time;
//     //         const givenDateTime = moment(recordDateTime ,"DD-MM-YYYY hh:mm A");
//     //         const currentDateTime = moment();
//     //         if(currentDateTime.isSameOrAfter(givenDateTime)) sendNotification(process.env.FCM_TOKEN,record?.title, record?.description);
//     //     });
//     // }, 30000);
// }

// module.exports = notifyMe;
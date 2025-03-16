const { default: axios } = require("axios");
const users = require("../models/users");
const records = require("../models/records");
const sendNotification = require("./notification");
const moment = require("moment");

const notifyMe =()=> {
    return setInterval(async() => {
        const userData = await users.findOne();
        const recordData = await records.find()
        const token = 'cpSuQdzwfeP8F6ikltluSf:APA91bHK7mPx-0MHog91YL4M1HX0HK6kNxKdpg6C2VtmVdEFCEXW2Xy8cUsZSIRn2_cm7QbFGClZnkXNFyZmudIwYHrcjmjYQcUYBcL6qpBcjYOzUOu4Am8'

        recordData.forEach((record,index)=>{
            const recordDateTime = record?.record_start_date + ' ' + record?.record_start_time;
            const givenDateTime = moment(recordDateTime ,"DD-MM-YYYY hh:mm A");
            const currentDateTime = moment();
            if(currentDateTime.isSameOrAfter(givenDateTime)) sendNotification(token,record?.title, record?.description);
        });
    }, 30000);
}

module.exports = notifyMe;
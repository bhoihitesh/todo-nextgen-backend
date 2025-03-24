const { default: axios } = require("axios");
const users = require("../models/users");
const records = require("../models/records");
const sendNotification = require("./notification");
const moment = require("moment");
const dotenv = require('dotenv');
dotenv.config();

const notifyMe =()=> {
    return setInterval(async() => {
        const userData = await users.find();
        const recordData = await records.find()
        
        userData.forEach((user,i)=>{
            recordData.forEach((record,i)=>{
                const recordDateTime = record?.record_start_date + ' ' + record?.record_start_time;
                const givenDateTime = moment(recordDateTime ,"DD-MM-YYYY hh:mm A");
                const currentDateTime = moment();
                if(currentDateTime.isSameOrAfter(givenDateTime) && user?.fcm_token) sendNotification(user?.fcm_token,record?.title, record?.description);
            })
        });
    }, 10000);
}

module.exports = notifyMe;
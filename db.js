const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const ConnectMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.warn('MongoDB Database Connected Successfully');
    } catch (error) {
        console.warn('Error while connecting to MongoDB',error);
    }
}

module.exports  = { ConnectMongoDB };
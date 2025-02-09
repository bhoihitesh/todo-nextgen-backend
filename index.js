const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { ConnectMongoDB } = require('./db');
const routes = require('./routes/routes');
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

ConnectMongoDB();

app.use('/v1/api/',routes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})




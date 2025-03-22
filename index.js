const express = require('express');
const dotenv = require('dotenv');
const { ConnectMongoDB } = require('./db');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
dotenv.config();
const cors = require('cors');
const app = express();

// ✅ Fix: Normalize `allowedOrigins`
const allowedOrigins = process.env.CORS_ORIGIN_DEV.split(',').map(origin => origin.trim());

app.use(cors({
    origin: function (origin, callback) {
        console.log('Incoming request origin:', origin); // Debugging

        if (!origin || allowedOrigins.includes(origin.trim())) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`); // Debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.options('*', cors()); // ✅ Support Preflight Requests


// make this two app.use after the cors setting always
app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
ConnectMongoDB();

// ✅ Use Routes
app.use('/v1/api/', routes);

// ✅ Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

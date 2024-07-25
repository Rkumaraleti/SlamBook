//Express Config:
const express = require('express');
const app = express();
app.use(express.json()); // <- Express Json to handle json

const CLIENT_URL = process.env.CLIENT_URL

//Body-Parser:
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })); 

//Env File Configuration:
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

// cors policy:
const cors = require('cors');
app.use(cors({
    origin: "http://localhost:5173", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));

// Mongoose & Mongo:
const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;

// Mongoose Connect:
mongoose.connect(mongo_url);
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

//Routes: 
const homeRoutes = require('./routes/homeRoutes')
const slamRoutes = require('./routes/slamRoutes')

const PORT = process.env.PORT;

app.use('/', homeRoutes);
app.use('/slam', slamRoutes);

app.listen(PORT, () => {
    console.log("Backend is Active")
})

//Express Config:
const express = require('express');
const app = express();
app.use(express.json()); // <- Express Json to handle json

// cors policy:
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));

//Body-Parser:
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })); 

//Env File Configuration:
const dotenv = require('dotenv');
dotenv.config({path: __dirname+'/../.env'});

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
const homeRoutes = require('./routes/homeRoutes.js')

const PORT = process.env.PORT;

app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log("Backend is Active")
})

//Express Config:
const express = require('express');
const app = express();

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
const homeRoutes = require('./routes/homeRoutes')

const PORT = process.env.PORT;

app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log("Backend is Active")
})
//Express Config:
const express = require('express');
const app = express();
app.use(express.json()); // <- Express Json to handle json

//Body-Parser:
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));

//Env File Configuration:
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../.env' });

// cors policy:
const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL, 
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

// Models:
const UserModel = require('./models/userModel');

//Passport:
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Requiring Routes: 
const homeRoutes = require('./routes/homeRoutes')
const slamRoutes = require('./routes/slamRoutes')
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT;

// Routes:
app.use('/', homeRoutes);

app.use('*', (err, req, res, next) => {
    if (err) { res.json({ err: err }) };
    next();
})

app.listen(PORT, () => {
    console.log("Backend is Active")
})
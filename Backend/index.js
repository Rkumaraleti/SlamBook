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

// Session:
const session = require('express-session');

// Mongo Store:
const MongoStore = require('connect-mongo');

app.use(session({
    secret: process.env.REACT_APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL, collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, //One Day
    }
}));

// Models:
const UserModel = require('./models/userModel');

//Passport:
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

app.use(passport.initialize());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (username, password, done) {
    const user = await UserModel.findOne({ email: username });
    if (!user) { return done(null, false) };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return done(null, false) };
    return done(null, user);
}
))


passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//Routes: 
const homeRoutes = require('./routes/homeRoutes')
const slamRoutes = require('./routes/slamRoutes')
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT;

app.use('/', homeRoutes);
app.use('/slam', slamRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log("Backend is Active")
})
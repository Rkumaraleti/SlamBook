// Express Config:
const express = require('express');
const app = express();
app.use(express.json()); // Express JSON to handle JSON requests

// JWT Middleware:
const jwt = require('jsonwebtoken');

// Body-Parser:
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Env File Configuration:
const dotenv = require('dotenv').config();

// CORS Policy:
const cors = require('cors');
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true, // Allow credentials
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Allow these headers
}));
app.options('*', cors());

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
const User = require('./models/userModel');

//Passport:
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If the user does not exist, create a new user
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            // avatar: profile.photos[0].value,
            premium: false, // Default value for premium status
            slamcards: [], // Initialize with an empty array
          });

          // Save the new user to the database
          await user.save();
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
          { id: user._id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // Pass the user and token to the callback
        return done(null, { user, token });
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

// Initialize Passport
app.use(passport.initialize());

// Google Login Route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Send the JWT token to the frontend
    const { token } = req.user;
    res.redirect(`${process.env.CLIENT_URL}/login/callback?token=${token}`);
  }
);



// Requiring Routes:
const authRoutes = require('./routes/authRoutes');
const slamRoutes = require('./routes/slamRoutes');
const homeRoutes = require('./routes/homeRoutes');
const errorMiddleware = require('./middlewares/middlware');
const authenticateJWT = require('./middlewares/jwtAuthenticate');

const PORT = process.env.PORT || 3000;

// Routes:
// Public routes (no authentication required)
app.use('/auth', authRoutes); // Authentication routes
app.use('/',homeRoutes); // Home routes

// Protected routes (JWT authentication required)
app.use('/slam', authenticateJWT, slamRoutes); // Protect slam routes with JWT

app.use(errorMiddleware); // Error handling middleware

// Start the server:
app.listen(PORT, () => {
    console.log(`Backend is Active on Port ${PORT}`);
});
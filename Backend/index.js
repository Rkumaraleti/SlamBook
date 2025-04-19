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
const UserModel = require('./models/userModel');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

// Requiring Routes:
const authRoutes = require('./routes/authRoutes');
const slamRoutes = require('./routes/slamRoutes');
const homeRoutes = require('./routes/homeRoutes');
const errorMiddleware = require('./middlewares/middlware');

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
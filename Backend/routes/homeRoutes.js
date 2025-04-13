const express = require('express');
const router = express.Router();

const UserModel = require('../models/userModel');

// Controller:
const initialRouteController = require('../controllers/initialRouteController');

// JWT Middleware:
const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findOne({ email: decoded.email });
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};


router.get('/', (req, res) => {
    res.json("Backend is Working!!!");
})

router.route('/createslam')
    .post(authenticateJWT, initialRouteController.createSlam)

router.route('/slambrary')
    .get(authenticateJWT, initialRouteController.slambrary)
    

module.exports = router;
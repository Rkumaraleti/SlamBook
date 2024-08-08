// All Authentication Routes:
const authRouteController = require('../controllers/authRouteController')

const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/login/failure', (req, res, next) => {
    res.json({ message: 'Error!'})
})

router.post("/login", passport.authenticate('local', { failureRedirect: '/auth/login/failure' }), (req, res) => {
    res.json(req.user);
});

router.post("/register", authRouteController.register);


module.exports = router;
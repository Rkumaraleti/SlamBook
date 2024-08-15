// All Authentication Routes:
const authRouteController = require('../controllers/authRouteController')

const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/login/failure', (req, res, next) => {
    res.json({ message: 'Error!'})
})

router.post("/login", passport.authenticate('local', {
    failureRedirect: '/auth/login/failure'
}), (req, res) => {
    res.json("User Succesfully Logged in!!!");
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: "Logged out Successfully!" });
})

router.post("/register", authRouteController.register);


module.exports = router;
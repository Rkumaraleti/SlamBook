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
}), (req, res, err) => {
  return res.status(200).json({user: req.user, message: "Logged in Successfully!"});
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { 
      console.error(err); 
      return res.status(500).json({ error: 'User Can\'t be Logged Out!' });
    }
    return res.status(200).json({ message: "Logged Out Successfully!" }); 
  });
});

router.post("/register", authRouteController.register);


module.exports = router;
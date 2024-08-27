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

  res.json(req.user);
});

router.get('/user', (req, res, next) => {
  if (req.user) {
    res.json(req.user)
  } else {
    next("User Not Logged in!");
  }
  
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { 
      console.error(err); 
      return res.status(500).send('Error logging out');
    }

    res.json("Logged Out Successfully!"); 
  });
});

router.post("/register", authRouteController.register);


module.exports = router;
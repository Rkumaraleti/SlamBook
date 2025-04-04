// All Authentication Routes:
const authRouteController = require('../controllers/authRouteController')

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const passport = require('passport');

router.get('/login/failure', (req, res, next) => {
    return res.status(400).json({ message: 'Invalid Credentials!'})
})

router.post("/login", passport.authenticate('local', {
    failureRedirect: '/auth/login/failure'
}), body('email').trim().isEmail(), (req, res, err) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.status(200).json({user: req.user, message: "Logged in Successfully!"});
  }
  return res.status(400).json({ message: result.array()[0].msg });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { 
      console.error(err); 
      return res.status(500).json({ error: 'Failed to LogOut user. Try Again!' });
    }
    return res.status(200).json({ message: "Logged Out Successfully!" }); 
  });
});

router.post("/register", authRouteController.register);


module.exports = router;
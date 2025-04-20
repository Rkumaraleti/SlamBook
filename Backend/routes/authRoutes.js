// All Authentication Routes:
const authRouteController = require('../controllers/authRouteController')

const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middlewares/jwtAuthenticate');
const User = require('../models/userModel');

const { check, validationResult } = require("express-validator");

router.post("/login",[
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, authRouteController.login);

router.post("/register", authRouteController.register);

// Fetch User Details Route (Protected)
router.get("/user", authenticateJWT, async (req, res) => {
  try {
    // Fetch user details from the database using the user ID from the token
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
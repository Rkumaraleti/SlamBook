const express = require('express');
const SlamCard = require('../models/slamcardModel')
const Slam = require('../models/slamModel');

//Middleware:
const { isLoggedIn } = require('../middlewares/middlware');

//Controllers:
const slamRouteController = require('../controllers/slamRouteController');


const router = express.Router();

// To Load Questions of slam from slamcard:
router.route('/:id')
    .get(slamRouteController.findSlamCard);

// To catch Responses of slam:
router.route('/:id')
    .post(isLoggedIn, slamRouteController.slamResponse);

module.exports = router;
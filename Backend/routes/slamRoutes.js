const express = require('express');;
const { body } = require('express-validator');

//Middleware:
const { isLoggedIn } = require('../middlewares/middlware');

//Controllers:
const slamRouteController = require('../controllers/slamRouteController');


const router = express.Router();

// To Edit Slam:
router.route('/:id/editslam')
    .post(isLoggedIn, slamRouteController.editSlam);

// To See Responses of Slam:
router.route('/:id/slamresponses')
    .get(isLoggedIn, slamRouteController.slamResponseShow);

// To Load Questions of slam from slamcard:
router.route('/:id')
    .get(slamRouteController.findSlamCard);

// To catch Responses of slam:
router.route('/:id')
    .post(isLoggedIn, slamRouteController.slamResponseGet);

router.route('/:id/showslam')
    .get(isLoggedIn, slamRouteController.slamResponse);

module.exports = router;
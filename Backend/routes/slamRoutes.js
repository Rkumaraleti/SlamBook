const express = require('express');;

//Middleware:
const { isLoggedIn } = require('../middlewares/middlware');

//Controllers:
const slamRouteController = require('../controllers/slamRouteController');


const router = express.Router();

// To Edit Slam
router.route('/:id/editslam')
    .post(isLoggedIn, slamRouteController.editSlam);

// To Load Questions of slam from slamcard:
router.route('/:id')
    .get(slamRouteController.findSlamCard);

// To catch Responses of slam:
router.route('/:id')
    .post(isLoggedIn, slamRouteController.slamResponse);

module.exports = router;
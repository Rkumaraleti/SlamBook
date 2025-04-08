const express = require('express');;
const { body } = require('express-validator');

//Controllers:
const slamRouteController = require('../controllers/slamRouteController');


const router = express.Router();

// To Edit Slam:
router.route('/:id/editslam')
    .post(slamRouteController.editSlam);

// To See Responses of Slam:
router.route('/:id/slamresponses')
    .get(slamRouteController.slamResponseShow);

// To Load Questions of slam from slamcard:
router.route('/:id')
    .get(slamRouteController.findSlamCard);

// To catch Responses of slam:
router.route('/:id')
    .post(slamRouteController.slamResponseGet);

router.route('/:id/showslam')
    .get(slamRouteController.slamResponse);

module.exports = router;
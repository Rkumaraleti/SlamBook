const express = require('express');
const router = express.Router();

// Controller:
const initialRouteController = require('../controllers/initialRouteController')


router.get('/', (req, res) => {
    res.send("Backend is Working!!!");
})


router.route('/createslam')
    .post(initialRouteController.createSlam)

router.route('/slambrary')
    .get(initialRouteController.slambrary)
    

module.exports = router;
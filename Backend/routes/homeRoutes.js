const express = require('express');
const router = express.Router();

//Middlware:
const { isLoggedIn } = require('../middlewares/middlware');

// Controller:
const initialRouteController = require('../controllers/initialRouteController')


router.get('/', (req, res) => {
    console.log(req.user);
    res.json("Backend is Working!!!");
})

router.route('/createslam')
    .post(isLoggedIn, initialRouteController.createSlam)

router.route('/slambrary')
    .get(isLoggedIn, initialRouteController.slambrary)
    

module.exports = router;
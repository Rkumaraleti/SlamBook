const express = require('express');

//SlamCard Model
const SlamCard = require('../models/slamcardModel')

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Backend is Working!!!");
})


router.route('/createslam')
    .post(async(req, res) => {
    try {
            const slamcard = new SlamCard({ questions: req.body[0], slamname: req.body[1], createddate: Date.now()});
            const createdSlam = await slamcard.save();
            res.status(200).json("Slam Created Successfully");
        } catch (error) {
            res.json(error.message);
        }
})

module.exports = router;
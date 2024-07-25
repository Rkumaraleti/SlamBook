const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Backend is Working!!!");
})


router.route('/createslam')
    .post((req, res) => {
    const params = req.body[0];
    console.log(req.body);
})

module.exports = router;
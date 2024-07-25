const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Backend is Working!!!");
})


router.post('/createslam', (req, res) => {
    const params = req.body;
    console.log(params);
})

module.exports = router;
const express = require('express')
const dotenv = require('dotenv');

const app = express();
dotenv.config({path: __dirname+'/../.env'});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Home")
})

app.listen(PORT, () => {
    console.log("Backend is Active")
})
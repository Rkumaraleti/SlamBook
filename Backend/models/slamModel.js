const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slamsSchema = new Schema({
    questions: [{
        type: String
    }],
    answers: [{
        type: String,
        required: true
    }]
})

module.exports = mongoose.model('Slams', slamsSchema);
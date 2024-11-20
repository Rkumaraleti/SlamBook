const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slamCardSchema = new Schema({
    slamname: {
        type: String,
        required: true
    },
    questions: [{
        type: String,
        required: true
    }],
    slams: [{
        type: Schema.Types.ObjectId,
        ref: 'Slams'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createddate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('SlamCard', slamCardSchema);
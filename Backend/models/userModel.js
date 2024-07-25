const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {
        type: String
    },
    password: {
        type: String,
    },
    slamcards: [{
        type: Schema.Types.ObjectId
    }]
})


module.exports = mongoose.model('User', userSchema);
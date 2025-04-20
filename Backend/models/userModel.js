const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
      type: String,
  },
  premium: {
    type: Number,
    default: 1
  },
  slamcards: [{
      type: Schema.Types.ObjectId,
      ref: 'SlamCard'
    }]
})

userSchema.pre('save', function (next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
})

module.exports = mongoose.model('User', userSchema);
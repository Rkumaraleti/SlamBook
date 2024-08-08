const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { email, username, password } = req.body; 
    const user = new User({ email, username, password });
    const savedUser = await user.save();
    res.status(200).json('User Successfully Created!');
}
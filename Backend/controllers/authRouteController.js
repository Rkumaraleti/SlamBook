const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { email, username, password } = req.body; 
    const isUserFound = await User.findOne({ email: req.body.email });
    if (isUserFound) {
        return res.status(400).json({ message: 'User Already Exist!'});
    }
    const user = new User({ email, username, password });
    const savedUser = await user.save();
    return res.status(200).json({message: 'Registered Successfully!'});
}
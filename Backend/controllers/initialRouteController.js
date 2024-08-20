//SlamCard Model
const SlamCard = require('../models/slamcardModel')
const User = require('../models/userModel');

exports.createSlam = async (req, res) => { // <- Needs User Authentication First!!! (Middleware for User Authentication!)
    try {
        const slamcard = new SlamCard({ questions: req.body[0], slamname: req.body[1], createddate: Date.now()});
        const createdSlam = await slamcard.save();
        const pushSlam = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { slamcards: createdSlam._id } });
        res.status(200).json("Slam Created Successfully");
    } catch (error) {
        res.json(error.message);
    }
}
    
exports.slambrary = async (req, res) => {
    const slamcards = await User.findOne({ _id: req.user.id }).populate('slamcards');
    res.json(slamcards.slamcards);
}
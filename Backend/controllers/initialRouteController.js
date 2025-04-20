//SlamCard Model
const SlamCard = require('../models/slamcardModel')
const User = require('../models/userModel');

exports.createSlam = async (req, res) => { // <- Needs User Authentication First!!! (Middleware for User Authentication!)
    try {
        if (req.user.premium >= req.user.slamcards.length) {
            const slamcard = new SlamCard({ questions: req.body[0], slamname: req.body[1], createddate: Date.now(), owner: req.user.id});
            const createdSlam = await slamcard.save();
            const pushSlam = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { slamcards: createdSlam._id } });
            return res.status(200).json({message: "Slam Created Successfully"});
        } 
        else {
            return res.status(400).json({ message: "Get Premium for new Slam!" });
        }
        
    } catch (error) {
        return res.json({error: error.message});
    }
}
    
exports.slambrary = async (req, res) => {
    const slamcards = await User.findOne({ _id: req.user.id }).populate('slamcards');
    res.json(slamcards.slamcards);
}
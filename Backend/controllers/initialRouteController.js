//SlamCard Model
const SlamCard = require('../models/slamcardModel')

exports.createSlam = async (req, res) => {
    try {
            const slamcard = new SlamCard({ questions: req.body[0], slamname: req.body[1], createddate: Date.now()});
            const createdSlam = await slamcard.save();
            res.status(200).json("Slam Created Successfully");
        } catch (error) {
            res.json(error.message);
        }
}
    
exports.slambrary = async(req, res) => {
        const slamcards = await SlamCard.find({});
        res.json(slamcards);
}
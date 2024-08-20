const Slam = require('../models/slamModel');
const SlamCard = require('../models/slamcardModel');

exports.findSlamCard = async (req, res) => {
    const response = await SlamCard.find(
        { _id: `${req.params.id}` });
    res.json(response);
}
    
exports.slamResponse = async (req, res) => {
        const { id } = req.params;
        // Here slam is created and also the slamcard gets updated by slam response
        try {
            const slam = await new Slam({ answers: req.body[1], questions: req.body[0] }).save();
            const slamSaved = await SlamCard.findOneAndUpdate({ _id: id }, { $push: { slams: slam._id } });
            res.json({ "status": 200 });
        }
        catch (error) {
            res.json({ "status": 500 });
        }
}
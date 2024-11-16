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

exports.editSlam = async (req, res) => {
        const { id } = req.params;
    // Here slam is created and also the slamcard gets updated by slam response
        try {
            const updatedSlam = await SlamCard.findOneAndUpdate({ _id: id }, { questions: req.body[0], slamname: req.body[1] });
            return res.status(200).json({message: "Slam Updated Successfully"});
        } catch (error) {
            return res.json({error: error.message});
        }
}

exports.slamResponseShow = async (req, res) => {
        const { id } = req.params;
        // Here slam is created and also the slamcard gets updated by slam response
        try {
        if (req.user.premium || (!req.user.premium && req.user.slamcards.length < 1)) {
            const slamcard = new SlamCard({ questions: req.body[0], slamname: req.body[1], createddate: Date.now()});
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
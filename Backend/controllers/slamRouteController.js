const Slam = require('../models/slamModel');
const SlamCard = require('../models/slamcardModel');

exports.findSlamCard = async (req, res) => {
    const response = await SlamCard.find(
        { _id: `${req.params.id}` });
    res.json(response);
}
    
exports.slamResponseGet = async (req, res) => {
    const { id } = req.params;

    const slam = await SlamCard.find({ _id: id });
    
        // Here slam is created and also the slamcard gets updated by slam response
        try {
            const slam = await new Slam({ answers: req.body[1], questions: req.body[0], answersOwnedBy: req.body[2] }).save();
            const slamSaved = await SlamCard.findOneAndUpdate({ _id: id }, { $push: { slams: slam._id } });
            res.json({ "status": 200 });
        }
        catch (error) {
            res.json({ "status": 500 });
        }
}

exports.editSlam = async (req, res) => {
    const { id } = req.params;
    const slam = await SlamCard.find({ _id: id });
    if (slam[0].owner == req.user.id) {
        // Here slam will be updated
        try {
            const updatedSlam = await SlamCard.findOneAndUpdate({ _id: id }, { questions: req.body[0], slamname: req.body[1] });
            return res.status(200).json({message: "Slam Updated Successfully"});
        } catch (error) {
            return res.json({message: error.message});
        }
    }
    else {
        return res.json({ message: 'Access Denied!' });
    }
}

exports.slamResponseShow = async (req, res) => {
    const { id } = req.params;
    const slam = await SlamCard.find({ _id: id }).populate({ path: 'slams', populate: [{ path: 'answersOwnedBy' }] });
    res.json({slams: slam[0].slams });
}

exports.slamResponse = async (req, res) => {
    const { id } = req.params;
    const slamresponse = await Slam.find({ _id: id }).populate('answersOwnedBy');
    res.json({ slams: slamresponse });
}
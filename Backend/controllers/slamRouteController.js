const Slam = require('../models/slamModel');
const SlamCard = require('../models/slamcardModel');

const UserModel = require('../models/userModel');

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

exports.deleteSlam = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the slam by ID
        const slam = await SlamCard.findById(id);
        if (!slam) {
            return res.status(404).json({ message: "Slam not found" });
        }

        // Check if the logged-in user is the owner of the slam
        if (slam.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access Denied!" });
        }

        // Remove the slam reference from the user's array
        await UserModel.findByIdAndUpdate(req.user.id, {
            $pull: { slamcards: id }, // Remove the slam ID from the user's slamcards array
        });

        // Delete the slam itself
        await SlamCard.findByIdAndDelete(id);

        return res.status(200).json({ message: "Slam Deleted Successfully" });
    } catch (error) {
        console.error("Error deleting slam:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

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
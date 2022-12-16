const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

//insert a photo, with an user related to
const insertPhoto = async(req,res) => {
    const {title} = req.body;
    const image = req.file.filename;
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    //create photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user.id,
        userName: user.name,
    });

    //if photo was created succesfully
    if(!newPhoto) {
        res.status(422).json({
            errs: ["Houve um problema, por favor tente novamente mais tarde."],
        });
    };

    res.status(201).json(newPhoto);
};

//remove photo
const deletePhoto = async(req,res) => {
    const {id} = req.params;
    const reqUser = req.user;
    const photo = Photo.findById(mongoose.Types.ObjectId(id));

    //check if photo exists
    if(!photo) {
        res.status(404).json({errs: ["Foto não encontrada."]});
        return;
    }

    //check if photo belongs to user
    
};

module.exports = {
    insertPhoto,
};
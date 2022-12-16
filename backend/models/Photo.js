const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema ({
    image: String,
    userId: mongoose.ObjectId,
    userName: String,
},
{
        timestamps: true
}
);

const Photo = mongoose.model("User", photoSchema);

module.exports = Photo;
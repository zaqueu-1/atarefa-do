const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    profileImage: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model("User", userSchema)

module.exports = User

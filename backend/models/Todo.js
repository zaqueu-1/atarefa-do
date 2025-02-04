const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Todo", todoSchema)

const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  progress: { type: Number, required: true }, // Progress percentage
}, { timestamps: true });

const Goal = mongoose.model("Goal", goalSchema);
module.exports = Goal;

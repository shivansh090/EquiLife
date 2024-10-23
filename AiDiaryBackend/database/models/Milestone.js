const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Milestone = mongoose.model("Milestone", milestoneSchema);
module.exports = Milestone;

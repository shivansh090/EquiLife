const mongoose = require("mongoose");

const productivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
}, { timestamps: true });

const Productivity = mongoose.model("Productivity", productivitySchema);
module.exports = Productivity;

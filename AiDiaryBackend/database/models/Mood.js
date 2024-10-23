const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true },
  mood: { type: Number, required: true }, // Mood score, e.g., from 0 to 100
}, { timestamps: true });

const Mood = mongoose.model("Mood", moodSchema);
module.exports = Mood;

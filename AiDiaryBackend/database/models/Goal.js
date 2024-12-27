const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  progress: Number,
  achieved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
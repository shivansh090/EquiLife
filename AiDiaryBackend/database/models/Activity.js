const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
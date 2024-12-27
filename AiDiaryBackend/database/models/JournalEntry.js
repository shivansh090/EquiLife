const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  mood: Number,
  overallMood: String,
  activitySuggestion: String,
  stressReason: String
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
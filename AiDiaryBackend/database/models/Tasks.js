const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    is_completed: { type: Boolean, default: false },
    due_date: { type: Date },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  const Tasks = mongoose.model('Tasks', taskSchema);
  module.exports = Tasks;
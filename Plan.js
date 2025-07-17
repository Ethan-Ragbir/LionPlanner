const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  semesters: {
    type: Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: {
      'Fall 2025': [],
      'Spring 2026': [],
      'Fall 2026': [],
      'Spring 2027': [],
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plan', planSchema);

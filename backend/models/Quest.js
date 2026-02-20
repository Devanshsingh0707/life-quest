const mongoose = require('mongoose');

const questSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    {
    type: String,
    enum: ['Fitness', 'Mindfulness', 'Learning', 'Social', 'Creativity', 'Nutrition', 'Productivity'],
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  xp:    { type: Number, required: true },  // 50 / 100 / 200
  image: { type: String, required: true },  // URL or emoji string
  icon:  { type: String, default: '⚔️' },   // emoji icon for category
  active:{ type: Boolean, default: true },
});

module.exports = mongoose.model('Quest', questSchema);

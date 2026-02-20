const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // Stats
    xp:     { type: Number, default: 0 },
    level:  { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: null }, // 'YYYY-MM-DD'

    // Today's quests
    dailyQuests: [
      {
        questId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
        completed:   { type: Boolean, default: false },
        completedAt: { type: Date, default: null },
        assignedDate:{ type: String }, // 'YYYY-MM-DD'
      },
    ],

    // History: array of { date, quests: [{questId, completed}] }
    history: [
      {
        date: { type: String }, // 'YYYY-MM-DD'
        quests: [
          {
            questId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
            completed:   { type: Boolean, default: false },
            completedAt: { type: Date, default: null },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Auto-level based on XP (every 500 XP = 1 level)
userSchema.methods.recalcLevel = function () {
  this.level = Math.floor(this.xp / 500) + 1;
};

module.exports = mongoose.model('User', userSchema);

const Quest = require('../models/Quest');
const User = require('../models/User');

// Pick 3 random quests (one Easy, one Medium, one Hard)
exports.pickRandomQuests = async () => {
  const pick = async (difficulty) => {
    const quests = await Quest.find({ difficulty, active: true });
    if (!quests.length) return null;
    return quests[Math.floor(Math.random() * quests.length)];
  };

  const [easy, medium, hard] = await Promise.all([
    pick('Easy'),
    pick('Medium'),
    pick('Hard'),
  ]);

  return [easy, medium, hard].filter(Boolean);
};

// GET /api/quests/today
exports.getTodayQuests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('dailyQuests.questId');
    const today = new Date().toISOString().split('T')[0];

    // Check if quests are stale (from a previous day)
    const isStale = user.dailyQuests.some((dq) => dq.assignedDate !== today);

    if (isStale || user.dailyQuests.length === 0) {
      // Archive old quests to history
      if (user.dailyQuests.length > 0) {
        const oldDate = user.dailyQuests[0].assignedDate;
        user.history.push({
          date: oldDate,
          quests: user.dailyQuests.map((dq) => ({
            questId: dq.questId,
            completed: dq.completed,
            completedAt: dq.completedAt,
          })),
        });
      }

      // Streak logic — break streak if missed a day
      if (user.lastActiveDate) {
        const last = new Date(user.lastActiveDate);
        const diff = Math.floor((new Date() - last) / (1000 * 60 * 60 * 24));
        if (diff > 1) user.streak = 0;
      }

      const randomQuests = await exports.pickRandomQuests();
      user.dailyQuests = randomQuests.map((q) => ({
        questId: q._id,
        assignedDate: today,
        completed: false,
        completedAt: null,
      }));

      await user.save();
      await user.populate('dailyQuests.questId');
    }

    res.json({ dailyQuests: user.dailyQuests, streak: user.streak, xp: user.xp, level: user.level });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/quests/complete/:questId
exports.completeQuest = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const today = new Date().toISOString().split('T')[0];

    const dq = user.dailyQuests.find(
      (q) => q.questId.toString() === req.params.questId && q.assignedDate === today
    );

    if (!dq) return res.status(404).json({ message: 'Quest not found for today' });
    if (dq.completed) return res.status(400).json({ message: 'Already completed' });

    const quest = await Quest.findById(req.params.questId);
    dq.completed = true;
    dq.completedAt = new Date();

    // Grant XP
    user.xp += quest.xp;
    user.recalcLevel();

    // Streak logic
    const lastDate = user.lastActiveDate;
    if (lastDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split('T')[0];

      if (lastDate === yStr) {
        user.streak += 1;
      } else if (lastDate !== today) {
        user.streak = 1;
      }
      user.lastActiveDate = today;
    }

    await user.save();
    res.json({
      message: '🎉 Quest completed!',
      xpEarned: quest.xp,
      totalXp: user.xp,
      level: user.level,
      streak: user.streak,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/quests/history
exports.getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('history.quests.questId');
    const sorted = [...user.history].sort((a, b) => (a.date > b.date ? -1 : 1));
    res.json({ history: sorted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: assign quests to all users (cron job)
exports.assignDailyQuests = async () => {
  const users = await User.find();
  const today = new Date().toISOString().split('T')[0];

  for (const user of users) {
    // Archive today
    if (user.dailyQuests.length > 0) {
      const oldDate = user.dailyQuests[0].assignedDate;
      user.history.push({
        date: oldDate,
        quests: user.dailyQuests.map((dq) => ({
          questId: dq.questId,
          completed: dq.completed,
          completedAt: dq.completedAt,
        })),
      });
    }

    const randomQuests = await exports.pickRandomQuests();
    user.dailyQuests = randomQuests.map((q) => ({
      questId: q._id,
      assignedDate: today,
      completed: false,
    }));

    await user.save();
  }
  console.log(`✅ Daily quests assigned to ${users.length} users`);
};

// GET /api/quests/all (admin/seeding)
exports.getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find({ active: true });
    res.json({ quests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

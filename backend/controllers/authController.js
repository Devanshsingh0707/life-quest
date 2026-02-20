const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { pickRandomQuests } = require('./questController');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const today = new Date().toISOString().split('T')[0];
    const randomQuests = await pickRandomQuests();

    const user = await User.create({
      username,
      email,
      password,
      dailyQuests: randomQuests.map((q) => ({
        questId: q._id,
        assignedDate: today,
      })),
    });

    const token = signToken(user._id);
    res.status(201).json({ token, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id);
    res.json({ token, user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({ user: sanitize(req.user) });
};

function sanitize(user) {
  const { _id, username, email, xp, level, streak, dailyQuests, history, lastActiveDate } = user;
  return { _id, username, email, xp, level, streak, dailyQuests, history, lastActiveDate };
}

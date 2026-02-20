const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const questRoutes = require('./routes/quests');
const userRoutes = require('./routes/user');
const { assignDailyQuests } = require('./controllers/questController');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://life-quest-eta.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.json({ message: '⚔️ Life Quest API is running!' }));

// Daily quest reset at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('🌅 Assigning new daily quests to all users...');
  await assignDailyQuests();
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

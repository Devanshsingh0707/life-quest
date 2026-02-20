const router = require('express').Router();
const protect = require('../middleware/auth');
const {
  getTodayQuests,
  completeQuest,
  getHistory,
  getAllQuests,
} = require('../controllers/questController');

router.get('/today', protect, getTodayQuests);
router.post('/complete/:questId', protect, completeQuest);
router.get('/history', protect, getHistory);
router.get('/all', protect, getAllQuests);

module.exports = router;

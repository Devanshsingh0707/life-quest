// Run: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Quest = require('./models/Quest');

const quests = [

  // ══════════════════════════════
  // FITNESS
  // ══════════════════════════════
  // Easy
  { title: 'Morning Stretch', description: 'Spend 10 minutes stretching your body after waking up.', category: 'Fitness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400', icon: '🧘' },
  { title: 'Take a Walk Outside', description: 'Step outside and walk for at least 20 minutes. Fresh air counts!', category: 'Fitness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400', icon: '🚶' },
  { title: '20 Push-Ups', description: 'Drop and do 20 push-ups. Break them into sets if needed.', category: 'Fitness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', icon: '💪' },
  { title: 'Take the Stairs', description: 'Avoid elevators all day — use the stairs every single time.', category: 'Fitness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1604480132736-44f5d0db0b12?w=400', icon: '🪜' },
  { title: '5-Minute Plank', description: 'Hold a plank for 1 minute. Rest and repeat 5 times.', category: 'Fitness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1566241134883-13eb2393a3a4?w=400', icon: '🏋️' },
  { title: 'Dance It Out', description: 'Put on your favorite playlist and dance freely for 15 minutes.', category: 'Fitness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400', icon: '💃' },

  // Medium
  { title: '30-Minute Run', description: 'Lace up and go for a 30-minute jog outdoors or on a treadmill.', category: 'Fitness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', icon: '🏃' },
  { title: 'Swim 20 Laps', description: 'Hit the pool and swim at least 20 laps without stopping.', category: 'Fitness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400', icon: '🏊' },
  { title: '45-Min Gym Session', description: 'Go to the gym and complete a full 45-minute workout session.', category: 'Fitness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', icon: '🏋️' },
  { title: 'Yoga Flow', description: 'Follow a 30-minute yoga routine. Breathe deep, move slow.', category: 'Fitness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', icon: '🧘' },
  { title: 'Cycle 10km', description: 'Hop on a bike and ride at least 10 kilometres today.', category: 'Fitness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400', icon: '🚴' },
  { title: 'Jump Rope 500 Times', description: 'Grab a jump rope and complete 500 jumps — breaks allowed.', category: 'Fitness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400', icon: '🪢' },

  // Hard
  { title: '10K Steps Challenge', description: 'Walk or run at least 10,000 steps before the day ends.', category: 'Fitness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400', icon: '👟' },
  { title: 'Run 5K', description: 'Complete a full 5 kilometre run without stopping.', category: 'Fitness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400', icon: '🏅' },
  { title: '100 Burpees', description: 'Complete 100 burpees throughout the day. No excuses.', category: 'Fitness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400', icon: '🔥' },
  { title: 'Hour-Long Hike', description: 'Find a trail and hike for at least 60 minutes in nature.', category: 'Fitness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400', icon: '⛰️' },
  { title: 'Full Body HIIT', description: 'Complete a 45-minute high-intensity interval training workout.', category: 'Fitness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400', icon: '⚡' },

  // ══════════════════════════════
  // NUTRITION
  // ══════════════════════════════
  // Easy
  { title: 'Drink 8 Glasses', description: 'Stay hydrated! Drink at least 8 glasses of water today.', category: 'Nutrition', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', icon: '💧' },
  { title: 'Eat a Rainbow', description: 'Eat at least 5 different coloured fruits or vegetables today.', category: 'Nutrition', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', icon: '🌈' },
  { title: 'No Fizzy Drinks', description: 'Avoid all sodas and carbonated drinks for the entire day.', category: 'Nutrition', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', icon: '🚫🥤' },
  { title: 'Healthy Breakfast', description: 'Start your day with a nutritious breakfast — no skipping!', category: 'Nutrition', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400', icon: '🍳' },
  { title: 'Snack on Fruits', description: 'Replace all snacks today with fresh fruits only.', category: 'Nutrition', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400', icon: '🍎' },
  { title: 'No Late-Night Eating', description: 'Stop eating 3 hours before your bedtime tonight.', category: 'Nutrition', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400', icon: '🌙' },

  // Medium
  { title: 'Cook a Healthy Meal', description: 'Prepare a nutritious meal from scratch — no takeout!', category: 'Nutrition', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400', icon: '🥗' },
  { title: 'Meal Prep Sunday', description: 'Prepare and portion meals for the next 3 days in advance.', category: 'Nutrition', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', icon: '🍱' },
  { title: 'Try a New Healthy Recipe', description: 'Find and cook a recipe you have never tried before.', category: 'Nutrition', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400', icon: '👨‍🍳' },
  { title: 'Intermittent Fast', description: 'Complete a 16-hour intermittent fast. Water and black coffee allowed.', category: 'Nutrition', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1470072768013-bf9532014347?w=400', icon: '⏱️' },
  { title: 'No Processed Food', description: 'Eat only whole, unprocessed foods for the entire day.', category: 'Nutrition', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400', icon: '🥦' },
  { title: 'Track Every Meal', description: 'Log every single thing you eat and drink today in a food diary.', category: 'Nutrition', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', icon: '📋' },

  // Hard
  { title: 'Full Day No Sugar', description: 'Avoid all added sugar for the entire day. Read labels!', category: 'Nutrition', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', icon: '🚫🍬' },
  { title: 'Full Plant-Based Day', description: 'Eat completely vegan for an entire day — no meat, dairy, or eggs.', category: 'Nutrition', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', icon: '🌱' },
  { title: 'Cook 3 Meals From Scratch', description: 'Cook breakfast, lunch, and dinner all from whole ingredients today.', category: 'Nutrition', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400', icon: '🍽️' },
  { title: 'No Caffeine Day', description: 'Go the full day without coffee, tea, or any caffeinated drink.', category: 'Nutrition', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', icon: '☕🚫' },
  { title: '3L Water Challenge', description: 'Drink 3 full litres of water before midnight tonight.', category: 'Nutrition', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', icon: '🫗' },

  // ══════════════════════════════
  // LEARNING
  // ══════════════════════════════
  // Easy
  { title: 'Read 10 Pages', description: 'Pick up a book and read at least 10 pages.', category: 'Learning', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', icon: '📖' },
  { title: 'Watch a Documentary', description: 'Watch an educational documentary on any topic that interests you.', category: 'Learning', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400', icon: '🎥' },
  { title: 'Learn One Fun Fact', description: 'Research and learn 5 surprising facts about any topic today.', category: 'Learning', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', icon: '🤓' },
  { title: 'Listen to a Podcast', description: 'Listen to a full educational or inspiring podcast episode.', category: 'Learning', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400', icon: '🎙️' },
  { title: 'Flashcard Review', description: 'Create and review at least 10 flashcards on any subject.', category: 'Learning', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', icon: '🃏' },
  { title: 'Learn Keyboard Shortcuts', description: 'Learn 10 new keyboard shortcuts for an app you use daily.', category: 'Learning', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', icon: '⌨️' },

  // Medium
  { title: 'Learn Words in Another Language', description: 'Pick any language and learn 10 new vocabulary words.', category: 'Learning', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400', icon: '🌍' },
  { title: 'Read for 1 Hour', description: 'Read a book or long-form article for a full uninterrupted hour.', category: 'Learning', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', icon: '📚' },
  { title: 'Take Notes on a Topic', description: 'Pick any topic and write detailed notes as if studying for an exam.', category: 'Learning', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400', icon: '📝' },
  { title: 'Watch a Tutorial & Practice', description: 'Watch any skill tutorial and immediately practice what you learned.', category: 'Learning', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=400', icon: '🎓' },
  { title: 'Teach Something to Someone', description: 'Explain a concept you know well to another person from scratch.', category: 'Learning', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400', icon: '🏫' },
  { title: 'Solve 10 Puzzles', description: 'Complete 10 logic puzzles, math problems, or brain teasers today.', category: 'Learning', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400', icon: '🧩' },

  // Hard
  { title: 'Finish an Online Course Module', description: 'Complete at least one full module of an online course.', category: 'Learning', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400', icon: '🎓' },
  { title: 'Write a Summary Essay', description: 'Read an article or chapter and write a 500-word summary essay.', category: 'Learning', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', icon: '✍️' },
  { title: 'Learn a New Skill for 2 Hours', description: 'Spend 2 focused hours learning any brand new skill from scratch.', category: 'Learning', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', icon: '🧠' },
  { title: 'Memorise a Speech or Poem', description: 'Memorise a full speech, poem, or monologue and recite it aloud.', category: 'Learning', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', icon: '🎤' },
  { title: 'Build Something New', description: 'Apply what you have been learning — build a small project from scratch.', category: 'Learning', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400', icon: '🔨' },

  // ══════════════════════════════
  // MINDFULNESS
  // ══════════════════════════════
  // Easy
  { title: '5-Minute Meditation', description: 'Sit quietly for 5 minutes and focus on your breath.', category: 'Mindfulness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', icon: '🧠' },
  { title: 'Gratitude List', description: 'Write down 10 things you are genuinely grateful for right now.', category: 'Mindfulness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', icon: '🙏' },
  { title: 'Mindful Eating', description: 'Eat one meal today with no phone, TV, or distractions. Just food.', category: 'Mindfulness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400', icon: '🍽️' },
  { title: 'Box Breathing', description: 'Practice box breathing for 5 minutes: 4 counts in, hold, out, hold.', category: 'Mindfulness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', icon: '💨' },
  { title: 'No Phone for 1 Hour', description: 'Put your phone face-down and away for a full hour. Be present.', category: 'Mindfulness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400', icon: '📵' },
  { title: 'Sit in Silence', description: 'Find a quiet spot and sit in complete silence for 10 minutes.', category: 'Mindfulness', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400', icon: '🌅' },

  // Medium
  { title: '20-Min Journaling', description: 'Write freely about your thoughts, goals, or feelings for 20 minutes.', category: 'Mindfulness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', icon: '📓' },
  { title: '15-Min Guided Meditation', description: 'Follow a guided meditation session of at least 15 minutes.', category: 'Mindfulness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', icon: '🎧' },
  { title: 'Evening Reflection', description: 'Spend 20 minutes reviewing your day — wins, lessons, and feelings.', category: 'Mindfulness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400', icon: '🌇' },
  { title: 'Spend Time in Nature', description: 'Go outside and spend 30 minutes just observing and being in nature.', category: 'Mindfulness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', icon: '🌿' },
  { title: 'Visualisation Exercise', description: 'Close your eyes and vividly visualise your ideal future for 15 minutes.', category: 'Mindfulness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=400', icon: '✨' },
  { title: 'Anger-Free Day', description: 'Go the entire day without reacting in anger. Pause before responding.', category: 'Mindfulness', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400', icon: '☮️' },

  // Hard
  { title: 'Digital Detox — 4 Hours', description: 'Put down all screens for 4 consecutive hours. Be present.', category: 'Mindfulness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400', icon: '📵' },
  { title: '1-Hour Deep Meditation', description: 'Complete a full one-hour unguided meditation session.', category: 'Mindfulness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', icon: '🕯️' },
  { title: 'Write a Letter to Your Future Self', description: 'Write a heartfelt, detailed letter to yourself 5 years from now.', category: 'Mindfulness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', icon: '💌' },
  { title: 'Social Media Detox', description: 'Stay off ALL social media platforms for the entire day.', category: 'Mindfulness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400', icon: '🚫📱' },
  { title: 'Random Act of Kindness', description: 'Do 3 unexpected kind things for strangers or loved ones today.', category: 'Mindfulness', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', icon: '💛' },

  // ══════════════════════════════
  // SOCIAL
  // ══════════════════════════════
  // Easy
  { title: 'Text a Friend', description: "Reach out to someone you haven't talked to in a while.", category: 'Social', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', icon: '📱' },
  { title: 'Give 3 Compliments', description: 'Sincerely compliment 3 different people today — and mean it.', category: 'Social', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400', icon: '😊' },
  { title: 'Call a Family Member', description: 'Call a parent, sibling, or relative just to chat and catch up.', category: 'Social', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400', icon: '📞' },
  { title: 'Smile at a Stranger', description: 'Make eye contact and smile at 5 strangers throughout your day.', category: 'Social', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', icon: '😄' },
  { title: 'Write a Thank-You Note', description: 'Handwrite or send a heartfelt thank-you message to someone.', category: 'Social', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=400', icon: '💌' },
  { title: 'Join an Online Community', description: 'Participate actively in a forum, Discord, or group related to your interest.', category: 'Social', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', icon: '👥' },

  // Medium
  { title: 'Have a Real Conversation', description: 'Have a meaningful in-person conversation with someone — no phones.', category: 'Social', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400', icon: '🤝' },
  { title: 'Meet Someone New', description: 'Introduce yourself and have a real conversation with someone new today.', category: 'Social', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', icon: '👋' },
  { title: 'Help Someone Out', description: 'Offer genuine help to a friend, colleague, or neighbour with something they need.', category: 'Social', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', icon: '🤲' },
  { title: 'Attend a Social Event', description: 'Show up to any social gathering — a meetup, class, or community event.', category: 'Social', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400', icon: '🎟️' },
  { title: 'Resolve a Conflict', description: 'Address and resolve a tension or misunderstanding with someone today.', category: 'Social', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400', icon: '🕊️' },
  { title: 'Cook for Someone', description: 'Prepare and share a home-cooked meal with a friend or family member.', category: 'Social', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400', icon: '🍲' },

  // Hard
  { title: 'Host a Gathering', description: 'Invite at least 2 people over for a meal, game night, or hangout.', category: 'Social', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=400', icon: '🎉' },
  { title: 'Volunteer for a Cause', description: 'Spend at least 2 hours volunteering for a charity or community cause.', category: 'Social', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400', icon: '🌍' },
  { title: 'Give a Public Speech', description: 'Speak publicly — at a meeting, open mic, or even a small group.', category: 'Social', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', icon: '🎤' },
  { title: 'Reconnect with an Old Friend', description: 'Track down and meaningfully reconnect with someone from your past.', category: 'Social', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400', icon: '🔄' },
  { title: 'Plan a Group Outing', description: 'Organise and plan a full outing or trip for a group of at least 3 people.', category: 'Social', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400', icon: '🗺️' },

  // ══════════════════════════════
  // CREATIVITY
  // ══════════════════════════════
  // Easy
  { title: 'Doodle for 10 Min', description: 'Draw anything — no pressure, just let creativity flow.', category: 'Creativity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', icon: '✏️' },
  { title: 'Take 10 Creative Photos', description: 'Go outside and take 10 intentionally composed, creative photographs.', category: 'Creativity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', icon: '📸' },
  { title: 'Hum or Sing a Song', description: 'Make up or perform a short melody — even if no one is listening.', category: 'Creativity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400', icon: '🎵' },
  { title: 'Rearrange Your Space', description: 'Rearrange furniture or decor in one room to create a fresh vibe.', category: 'Creativity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', icon: '🛋️' },
  { title: 'Make a Mood Board', description: 'Create a digital or physical mood board around a theme or dream.', category: 'Creativity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', icon: '🖼️' },
  { title: 'Free-Write for 10 Min', description: 'Set a timer and write continuously without stopping or editing.', category: 'Creativity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400', icon: '📝' },

  // Medium
  { title: 'Write a Short Poem', description: 'Write an original poem about anything that inspires you today.', category: 'Creativity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400', icon: '🖊️' },
  { title: 'Start a Short Story', description: 'Write at least 500 words of an original short story today.', category: 'Creativity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', icon: '📗' },
  { title: 'Learn a Magic Trick', description: 'Find and practise one card or coin magic trick until you can do it smoothly.', category: 'Creativity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', icon: '🪄' },
  { title: 'Cook an Experimental Dish', description: 'Invent a recipe using only whatever ingredients you have at home.', category: 'Creativity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400', icon: '🧪' },
  { title: 'Redesign Your Journal Cover', description: 'Decorate the cover of a notebook with your own original artwork.', category: 'Creativity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', icon: '🎨' },
  { title: 'Record a Short Video', description: 'Film and edit a 1-minute video about anything creative.', category: 'Creativity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400', icon: '🎬' },

  // Hard
  { title: 'Create Something to Share', description: 'Make art, music, writing, or code — and share it online.', category: 'Creativity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400', icon: '🚀' },
  { title: 'Complete a Painting', description: 'Start and finish a full painting or detailed illustration today.', category: 'Creativity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', icon: '🖌️' },
  { title: 'Compose an Original Song', description: 'Write original lyrics and a melody — record even a rough version.', category: 'Creativity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400', icon: '🎼' },
  { title: 'Build a Creative Side Project', description: 'Spend 3+ hours building something — a game, app, craft, or prototype.', category: 'Creativity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400', icon: '🛠️' },
  { title: 'Write and Perform a Monologue', description: 'Write a 2-minute monologue from scratch and perform it out loud.', category: 'Creativity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400', icon: '🎭' },

  // ══════════════════════════════
  // PRODUCTIVITY
  // ══════════════════════════════
  // Easy
  { title: 'Declutter Your Desk', description: 'Organize your workspace for a productive day.', category: 'Productivity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', icon: '🗂️' },
  { title: 'Write a To-Do List', description: 'Write down everything you need to do today and prioritise the top 3.', category: 'Productivity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', icon: '✅' },
  { title: 'Clear Your Email Inbox', description: 'Read, respond to, or archive every email in your inbox today.', category: 'Productivity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400', icon: '📧' },
  { title: 'Make Your Bed', description: 'Make your bed first thing in the morning — start the day with a win.', category: 'Productivity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400', icon: '🛏️' },
  { title: 'Delete 50 Old Files', description: 'Go through your phone or computer and delete at least 50 unnecessary files.', category: 'Productivity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', icon: '🗑️' },
  { title: 'Wake Up 1 Hour Earlier', description: 'Set your alarm 1 hour earlier and use that time intentionally.', category: 'Productivity', difficulty: 'Easy', xp: 50, image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400', icon: '⏰' },

  // Medium
  { title: 'Deep Work Session', description: 'Do 90 minutes of focused, distraction-free work on a key task.', category: 'Productivity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400', icon: '⚡' },
  { title: 'Complete 3 Overdue Tasks', description: 'Pick 3 tasks you have been putting off and finish all 3 today.', category: 'Productivity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', icon: '⚔️' },
  { title: 'Build a Morning Routine', description: 'Design and execute a structured morning routine from the moment you wake up.', category: 'Productivity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400', icon: '🌅' },
  { title: 'Batch Your Tasks', description: 'Group similar tasks together and complete them in focused batches today.', category: 'Productivity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400', icon: '📦' },
  { title: 'Learn a Productivity Technique', description: 'Research and apply a new technique (Pomodoro, GTD, time-blocking) today.', category: 'Productivity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400', icon: '🧭' },
  { title: 'Track Your Time All Day', description: 'Log every activity in 30-minute blocks for the entire day.', category: 'Productivity', difficulty: 'Medium', xp: 100, image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400', icon: '⏱️' },

  // Hard
  { title: 'Plan Your Entire Week', description: 'Write out your goals, tasks, and schedule for the entire upcoming week.', category: 'Productivity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400', icon: '📅' },
  { title: 'Zero Procrastination Day', description: 'Do every task as soon as it comes up — no delaying anything all day.', category: 'Productivity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400', icon: '🎯' },
  { title: 'Full System Audit', description: 'Review and reorganise your entire task system, files, and goals.', category: 'Productivity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400', icon: '🔍' },
  { title: 'Finish a Big Project Milestone', description: 'Push hard and complete a major milestone on a long-running project.', category: 'Productivity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400', icon: '🏆' },
  { title: '4-Hour Deep Work Block', description: 'Block off 4 full hours with zero interruptions and go deep on one task.', category: 'Productivity', difficulty: 'Hard', xp: 200, image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400', icon: '🔒' },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Quest.deleteMany({});
    await Quest.insertMany(quests);
    console.log(`✅ Seeded ${quests.length} quests!`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
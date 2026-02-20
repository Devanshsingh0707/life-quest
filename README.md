# ⚔️ Life Quest — MERN App

A daily gamified life challenge app. Get 3 random quests every day, earn XP, build streaks, and level up!

---

## 🚀 Quick Setup

### Prerequisites
- Node.js v18+
- MongoDB running locally (or a MongoDB Atlas URI)

---

### 1. Clone & Install

```bash
# Install root dependencies
npm install

# Install backend + frontend
npm run install-all
```

---

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env and set your MONGO_URI and JWT_SECRET
```

---

### 3. Seed the Database

This adds 21 quests (7 categories × 3 difficulties) to MongoDB:

```bash
npm run seed
```

---

### 4. Run the App

```bash
# From root — runs backend (port 5000) + frontend (port 3000)
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```
life-quest/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema (xp, streak, dailyQuests, history)
│   │   └── Quest.js         # Quest schema (title, category, difficulty, xp, image)
│   ├── controllers/
│   │   ├── authController.js
│   │   └── questController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── quests.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── seed.js              # Seed 21 quests into DB
│   └── server.js            # Express app + cron job
│
└── frontend/
    └── src/
        ├── context/
        │   └── AuthContext.jsx   # Global auth state
        ├── components/
        │   ├── Navbar.jsx        # Stats display + nav
        │   ├── QuestCard.jsx     # Card with image, category, xp, complete btn
        │   └── XPBar.jsx         # Level progress bar
        ├── pages/
        │   ├── Dashboard.jsx     # Today's 3 quests
        │   ├── History.jsx       # Past quests grouped by date
        │   ├── Login.jsx
        │   └── Register.jsx
        └── App.jsx               # Routes + Auth guard
```

---

## ⚙️ API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | /api/auth/register          | Register new user        |
| POST   | /api/auth/login             | Login                    |
| GET    | /api/auth/me                | Get current user         |
| GET    | /api/quests/today           | Get today's 3 quests     |
| POST   | /api/quests/complete/:id    | Mark quest as complete   |
| GET    | /api/quests/history         | Get past quest history   |

---

## 🎮 Features

- 🎲 **3 Random Daily Quests** — 1 Easy (50 XP), 1 Medium (100 XP), 1 Hard (200 XP)
- 🃏 **Quest Cards** — image, category tag, difficulty badge, XP reward
- 🔥 **Streaks** — maintained if you complete at least one quest per day
- ⭐ **XP & Levels** — 500 XP per level, shown in navbar + progress bar
- 📜 **History Page** — view all past quests grouped by date
- 🔄 **Auto Reset** — new quests assigned at midnight via cron job
- 🔐 **Auth** — JWT-based login/register

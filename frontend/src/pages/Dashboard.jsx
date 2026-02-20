import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import QuestCard from '../components/QuestCard';
import XPBar from '../components/XPBar';

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [quests, setQuests]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats]     = useState({ xp: user?.xp || 0, level: user?.level || 1, streak: user?.streak || 0 });

  useEffect(() => {
    api.get('/quests/today')
      .then(({ data }) => {
        setQuests(data.dailyQuests);
        setStats({ xp: data.xp, level: data.level, streak: data.streak });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleComplete = (data) => {
    setQuests((prev) =>
      prev.map((dq) =>
        dq.questId?._id?.toString() === data.questId ||
        dq.questId?._id === data.questId
          ? { ...dq, completed: true }
          : dq
      )
    );
    setStats({ xp: data.totalXp, level: data.level, streak: data.streak });
    updateUser({ xp: data.totalXp, level: data.level, streak: data.streak });
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const allDone = quests.length > 0 && quests.every((q) => q.completed);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Today's Quests</h2>
        <p>{today} · {quests.filter(q => q.completed).length}/{quests.length} completed</p>
      </div>

      {allDone && (
        <div style={{
          background: 'rgba(74,222,128,0.1)',
          border: '1px solid rgba(74,222,128,0.3)',
          borderRadius: 14,
          padding: '1rem 1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          color: '#4ade80',
          fontSize: '1.1rem',
        }}>
          🏆 All quests completed! Come back tomorrow for new challenges.
        </div>
      )}

      {quests.length === 0 ? (
        <div className="empty-state">
          <h3>No quests today</h3>
          <p>Something went wrong fetching your quests. Try refreshing.</p>
        </div>
      ) : (
        <div className="quests-grid">
          {quests.map((dq, i) => (
            <QuestCard key={i} dq={dq} onComplete={handleComplete} />
          ))}
        </div>
      )}

      <XPBar xp={stats.xp} level={stats.level} />
    </div>
  );
}

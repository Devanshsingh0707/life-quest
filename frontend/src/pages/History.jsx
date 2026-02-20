import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/quests/history')
      .then(({ data }) => setHistory(data.history))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="history-page">
      <h2>Quest History</h2>
      <p className="history-subtitle">Past missions &amp; outcomes</p>

      {history.length === 0 ? (
        <div className="empty-state">
          <h3>No records yet</h3>
          <p>Complete quests to build your history.</p>
        </div>
      ) : (
        history.map(day => (
          <div key={day.date} className="history-day">
            <div className="history-date">{formatDate(day.date)}</div>
            <div className="history-quests">
              {day.quests.map((q, i) => {
                const quest = q.questId;
                if (!quest) return null;
                return (
                  <div key={i} className={`history-quest-row ${q.completed ? 'done' : 'miss'}`}>
                    <span className="hist-icon">{quest.icon || '⚔️'}</span>
                    <div className="hist-info">
                      <div className="hist-title">{quest.title}</div>
                      <div className="hist-cat">{quest.category} · {quest.difficulty} · {quest.xp} xp</div>
                    </div>
                    <span className={`hist-status ${q.completed ? 'done' : 'miss'}`}>
                      {q.completed ? 'Completed' : 'Missed'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
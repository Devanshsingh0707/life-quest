import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400';

export default function QuestCard({ dq, onComplete }) {
  const [loading, setLoading] = useState(false);
  const quest = dq.questId;
  if (!quest) return null;

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/quests/complete/${quest._id}`);
      toast.success(`+${data.xpEarned} XP earned! 🎉`);
      onComplete(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`quest-card ${dq.completed ? 'completed' : ''}`}>
      <img
        className="quest-img"
        src={quest.image || FALLBACK_IMG}
        alt={quest.title}
        onError={(e) => { e.target.src = FALLBACK_IMG; }}
      />
      <div className="quest-body">
        <div className="quest-meta">
          <span className="category-tag">{quest.icon} {quest.category}</span>
          <span className={`difficulty-badge diff-${quest.difficulty}`}>{quest.difficulty}</span>
        </div>
        <h3 className="quest-title">{quest.title}</h3>
        <p className="quest-desc">{quest.description}</p>
        <div className="quest-footer">
          <span className="xp-pill">⭐ {quest.xp} XP</span>
          {!dq.completed && (
            <button className="btn-complete" onClick={handleComplete} disabled={loading}>
              {loading ? '...' : 'Complete ✓'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

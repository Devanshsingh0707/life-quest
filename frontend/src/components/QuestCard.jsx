import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400';

// Japanese character per category for watermark
const JP_CHAR = {
  Fitness:     '力',
  Nutrition:   '食',
  Learning:    '智',
  Mindfulness: '禅',
  Social:      '絆',
  Creativity:  '創',
  Productivity:'道',
};

export default function QuestCard({ dq, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [xpPop, setXpPop]     = useState(false);
  const sceneRef = useRef(null);
  const cardRef  = useRef(null);
  const quest = dq.questId;
  if (!quest) return null;

  const handleMouseMove = (e) => {
    if (dq.completed) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) *  10;
    cardRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/quests/complete/${quest._id}`);
      toast.success(`+${data.xpEarned} XP`, { icon: '⚔️' });
      setXpPop(true);
      setTimeout(() => setXpPop(false), 1800);
      onComplete(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const jpChar = JP_CHAR[quest.category] || '気';

  return (
    <div
      className="quest-card-scene"
      ref={sceneRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`quest-card diff-${quest.difficulty} ${dq.completed ? 'completed' : ''}`} ref={cardRef}>
        <div className={`card-inner diff-${quest.difficulty}`}>

          {/* Header */}
          <div className="card-header">
            <div className="card-icon-wrap">
              <span>{quest.icon}</span>
            </div>
            <span className="card-title-top">{quest.title}</span>
            <span className="card-xp-top">{quest.xp} xp</span>
          </div>

          {/* Image */}
          <div className="card-img-wrap">
            <img
              className="quest-img"
              src={quest.image || FALLBACK_IMG}
              alt={quest.title}
              onError={e => { e.target.src = FALLBACK_IMG; }}
            />
            <div className="card-jp-watermark">{jpChar}</div>
          </div>

          {/* Body */}
          <div className="quest-body">
            <div className="quest-meta">
              <span className="category-tag">{quest.category}</span>
              <span className={`difficulty-badge diff-${quest.difficulty}`}>{quest.difficulty}</span>
            </div>
            <p className="quest-desc">{quest.description}</p>

            <div className="card-divider" />

            <div className="quest-footer">
              <span className="xp-pill">◈ {quest.xp} xp</span>
              {!dq.completed ? (
                <button className="btn-complete" onClick={handleComplete} disabled={loading}>
                  {loading ? '—' : 'Complete'}
                </button>
              ) : (
                <span style={{ fontSize: '0.68rem', color: 'var(--easy)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Done</span>
              )}
            </div>
          </div>
        </div>

        {dq.completed && <div className="completed-stamp">Completed</div>}
        {xpPop && <div className="xp-pop">+{quest.xp} xp</div>}
      </div>
    </div>
  );
}
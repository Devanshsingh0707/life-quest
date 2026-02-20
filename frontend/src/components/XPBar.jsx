export default function XPBar({ xp, level }) {
  const xpInLevel = xp % 500;
  const pct       = Math.min((xpInLevel / 500) * 100, 100);

  return (
    <div className="xp-bar-wrap">
      <div className="xp-bar-label">
        <span>Level {level} → Level {level + 1}</span>
        <span>{xpInLevel} / 500 xp</span>
      </div>
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
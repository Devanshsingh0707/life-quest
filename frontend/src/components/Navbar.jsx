import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const xpInLevel = user?.xp % 500;
  const nextLevel  = 500;

  return (
    <nav className="navbar">
      <span className="navbar-brand">⚔️ Life Quest</span>

      <div className="navbar-stats">
        <div className="stat-badge">
          <span className="emoji">🔥</span>
          <span className="streak-val">{user?.streak ?? 0}</span>
        </div>
        <div className="stat-badge">
          <span className="emoji">⭐</span>
          <span className="xp-val">{user?.xp ?? 0} XP</span>
        </div>
        <div className="stat-badge">
          <span className="emoji">🏆</span>
          <span className="lvl-val">Lv {user?.level ?? 1}</span>
        </div>
      </div>

      <div className="navbar-links">
        <NavLink to="/"        className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>🗡️ Quests</NavLink>
        <NavLink to="/history" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>📜 History</NavLink>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

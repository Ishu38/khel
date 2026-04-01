import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { sessionsAPI } from '../services/api.js';
import StatCard from '../components/ui/StatCard.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [childData, setChildData] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    if (user?.children?.length && !selectedChild) setSelectedChild(user.children[0]._id);
  }, [user, selectedChild]);

  useEffect(() => {
    if (!selectedChild) return;
    sessionsAPI.childHistory(selectedChild)
      .then(({ data }) => setChildData(data))
      .catch(() => setChildData(null));
  }, [selectedChild]);

  if (!user) return (
    <div className="container text-center" style={{ padding: 'var(--space-16)' }}>
      <p style={{ color: 'var(--text-tertiary)' }}>Please log in to view your dashboard.</p>
    </div>
  );

  const formatTime = (ms) => {
    if (!ms) return '0m';
    const mins = Math.floor(ms / 60000);
    return mins < 60 ? `${mins}m` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-4xl)' }}>
            👋 Hey, <span className="gradient-text">{user.name.split(' ')[0]}</span>
          </h1>
          <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>Track your child's learning journey</p>
        </div>
      </div>

      {/* Child selector */}
      {user.children?.length > 0 ? (
        <div style={s.childRow}>
          {user.children.map(child => (
            <button
              key={child._id}
              onClick={() => setSelectedChild(child._id)}
              style={{ ...s.childCard, ...(selectedChild === child._id ? s.childActive : {}) }}
            >
              <div className="avatar">{child.name[0]}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{child.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Age {child.age}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
          <p style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>No children added yet.</p>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>Add a child profile to start tracking progress.</p>
        </div>
      )}

      {/* Stats */}
      {childData?.stats && (
        <div className="grid grid-4" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <StatCard icon="🎮" label="Games Played" value={childData.stats.totalSessions} color="var(--accent-indigo-hover)" />
          <StatCard icon="🎯" label="Avg Accuracy" value={`${Math.round(childData.stats.avgAccuracy * 100)}%`} color="var(--accent-emerald)" />
          <StatCard icon="⏱" label="Total Time" value={formatTime(childData.stats.totalTimeMs)} color="var(--accent-cyan)" />
          <StatCard icon="📚" label="Topics Covered" value={childData.stats.topicsPlayed.length} color="var(--accent-amber)" />
        </div>
      )}

      {/* Quick Actions */}
      {selectedChild && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
          <Link to={`/progress/${selectedChild}`} className="btn btn-secondary btn-sm">📈 Detailed Progress</Link>
          <Link to={`/learning-gaps/${selectedChild}`} className="btn btn-secondary btn-sm">🔍 Learning Gaps</Link>
          <Link to="/explore" className="btn btn-outline btn-sm">🎮 Find Games</Link>
        </div>
      )}

      {/* Recent Sessions Table */}
      {childData?.sessions?.length > 0 && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Recent Sessions</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Type</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {childData.sessions.map(s => (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{s.game?.title || 'Unknown'}</td>
                    <td><span className="badge badge-indigo">{s.game?.gameType?.replace(/_/g, ' ')}</span></td>
                    <td style={{ fontWeight: 600 }}>{s.score}</td>
                    <td>
                      <span style={{ color: s.accuracy >= 0.8 ? 'var(--accent-emerald)' : s.accuracy >= 0.6 ? 'var(--accent-amber)' : 'var(--accent-rose)', fontWeight: 600 }}>
                        {Math.round(s.accuracy * 100)}%
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{new Date(s.startedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  childRow: {
    display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-2)',
  },
  childCard: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
    padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-card)', border: '1.5px solid var(--border-primary)',
    borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
  },
  childActive: {
    borderColor: 'var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.08)',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
  },
};

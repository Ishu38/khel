import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { analyticsAPI } from '../services/api.js';
import StatCard from '../components/ui/StatCard.jsx';

export default function Progress() {
  const { childId: paramChildId } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [selectedChild, setSelectedChild] = useState(paramChildId || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedChild && user?.children?.length) setSelectedChild(user.children[0]._id);
  }, [user, selectedChild]);

  useEffect(() => {
    if (!selectedChild) return;
    setLoading(true);
    analyticsAPI.progress(selectedChild)
      .then(({ data }) => setData(data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [selectedChild]);

  const formatTime = (ms) => {
    if (!ms) return '0m';
    const mins = Math.floor(ms / 60000);
    return mins < 60 ? `${mins}m` : `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  if (!user) return <div className="container text-center" style={{ padding: 'var(--space-16)' }}><p style={{ color: 'var(--text-tertiary)' }}>Please log in.</p></div>;

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--fs-4xl)' }}>📈 <span className="gradient-text">Progress</span></h1>
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>Detailed learning journey analysis</p>
      </div>

      {/* Child selector */}
      {!paramChildId && user.children?.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          {user.children.map(child => (
            <button key={child._id} onClick={() => setSelectedChild(child._id)}
              className={`chip ${selectedChild === child._id ? 'chip-active' : ''}`}
              style={{ padding: 'var(--space-2) var(--space-4)' }}>
              {child.name} (age {child.age})
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}><div className="spinner spinner-lg" /></div>
      ) : !data ? (
        <div className="card text-center" style={{ padding: 'var(--space-12)' }}>
          <p style={{ color: 'var(--text-tertiary)' }}>No data available yet. Play some games first!</p>
          <Link to="/explore" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>🎮 Find Games</Link>
        </div>
      ) : (
        <>
          {/* Overall Stats */}
          <div className="grid grid-4" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <StatCard icon="🎮" label="Sessions" value={data.overall.totalSessions} />
            <StatCard icon="🎯" label="Accuracy" value={`${Math.round(data.overall.avgAccuracy * 100)}%`} color="var(--accent-emerald)" />
            <StatCard icon="⏱" label="Play Time" value={formatTime(data.overall.totalPlayTime)} color="var(--accent-cyan)" />
            <StatCard icon="💪" label="Strong Topics" value={data.overall.strongTopics.length} color="var(--accent-amber)" />
          </div>

          {/* Strong/Weak summary */}
          <div className="grid grid-2" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--accent-emerald)' }}>✅ Strong Topics</h4>
              {data.overall.strongTopics.length > 0 ? (
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {data.overall.strongTopics.map((t, i) => <span key={i} className="badge badge-emerald">{t}</span>)}
                </div>
              ) : <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>Keep playing to identify strengths</p>}
            </div>
            <div className="card">
              <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--accent-rose)' }}>⚠️ Needs Practice</h4>
              {data.overall.weakTopics.length > 0 ? (
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {data.overall.weakTopics.map((t, i) => <span key={i} className="badge badge-rose">{t}</span>)}
                </div>
              ) : <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>Great — no weak topics detected!</p>}
            </div>
          </div>

          {/* Subject Breakdown */}
          {Object.entries(data.subjectBreakdown || {}).map(([subject, info]) => (
            <div key={subject} className="card" style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 style={{ fontSize: 'var(--fs-lg)' }}>📚 {subject}</h3>
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: info.avgAccuracy >= 0.7 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                  {Math.round(info.avgAccuracy * 100)}% avg
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {info.topics.map((t, i) => (
                  <div key={i} style={topicRow}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 'var(--fs-sm)' }}>{t.topic}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.sessions} sessions</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      {/* Accuracy bar */}
                      <div style={barTrack}>
                        <div style={{ ...barFill, width: `${t.avgAccuracy * 100}%`, background: t.avgAccuracy >= 0.8 ? 'var(--accent-emerald)' : t.avgAccuracy >= 0.6 ? 'var(--accent-amber)' : 'var(--accent-rose)' }} />
                      </div>
                      <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, width: '40px', textAlign: 'right', color: t.avgAccuracy >= 0.8 ? 'var(--accent-emerald)' : t.avgAccuracy >= 0.6 ? 'var(--accent-amber)' : 'var(--accent-rose)' }}>
                        {Math.round(t.avgAccuracy * 100)}%
                      </span>
                      <span style={{ fontSize: 'var(--fs-sm)', width: '20px' }}>
                        {t.trend === 'improving' ? '📈' : t.trend === 'declining' ? '📉' : '➡️'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Actions */}
          {selectedChild && (
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <Link to={`/learning-gaps/${selectedChild}`} className="btn btn-primary">🔍 View Learning Gaps</Link>
              <Link to="/explore" className="btn btn-secondary">🎮 Find More Games</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const topicRow = {
  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
  padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)',
  background: 'var(--bg-glass-light)',
};
const barTrack = { width: '80px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' };
const barFill = { height: '100%', borderRadius: 'var(--radius-full)', transition: 'width 0.8s ease' };

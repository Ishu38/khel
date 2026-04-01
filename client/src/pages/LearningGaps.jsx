import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { analyticsAPI } from '../services/api.js';
import EmptyState from '../components/ui/EmptyState.jsx';

const SEVERITY_CONFIG = {
  critical: { color: 'var(--accent-rose)', bg: 'rgba(244, 63, 94, 0.08)', border: 'rgba(244, 63, 94, 0.2)', icon: '🔴' },
  moderate: { color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)', icon: '🟡' },
  mild: { color: 'var(--accent-cyan)', bg: 'rgba(6, 182, 212, 0.08)', border: 'rgba(6, 182, 212, 0.2)', icon: '🔵' },
};

function getSeverity(accuracy) {
  if (accuracy < 0.4) return 'critical';
  if (accuracy < 0.6) return 'moderate';
  return 'mild';
}

export default function LearningGaps() {
  const { childId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!childId) return;
    analyticsAPI.learningGaps(childId)
      .then(({ data }) => setData(data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [childId]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}><div className="spinner spinner-lg" /></div>
  );

  if (!data) return (
    <div className="container text-center" style={{ padding: 'var(--space-16)' }}>
      <p style={{ color: 'var(--accent-rose)' }}>Could not load learning gaps data.</p>
    </div>
  );

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--fs-4xl)' }}>🔍 <span className="gradient-text">Learning Gaps</span></h1>
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
          Identified areas that need more practice, with game recommendations.
        </p>
      </div>

      {/* Gaps */}
      {data.gaps?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
          <h3 style={{ marginBottom: 'var(--space-2)' }}>⚠️ Areas Needing Attention</h3>
          {data.gaps.map((gap, i) => {
            const sev = getSeverity(gap.accuracy);
            const cfg = SEVERITY_CONFIG[sev];
            return (
              <div key={i} className="card animate-fade-in-up" style={{
                borderLeft: `3px solid ${cfg.color}`, background: cfg.bg,
                borderColor: cfg.border, animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <span>{cfg.icon}</span>
                      <h4 style={{ margin: 0 }}>{gap.topic}</h4>
                    </div>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>{gap.recommendation}</p>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                      <span>{gap.sessionsPlayed} sessions played</span>
                      {gap.declining && <span className="badge badge-rose" style={{ fontSize: 'var(--fs-xs)' }}>📉 Declining</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-2xl)', fontWeight: 700, color: cfg.color }}>
                      {Math.round(gap.accuracy * 100)}%
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>accuracy</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
          <span style={{ fontSize: '2rem' }}>🎉</span>
          <h3 style={{ marginTop: 'var(--space-3)' }}>No Learning Gaps Detected!</h3>
          <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>Great performance across all topics.</p>
        </div>
      )}

      {/* Unplayed Topics */}
      {data.unplayedTopics?.length > 0 && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>🔓 Topics to Explore</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {data.unplayedTopics.slice(0, 12).map((t, i) => (
              <span key={i} className="badge badge-violet">{t}</span>
            ))}
            {data.unplayedTopics.length > 12 && (
              <span className="badge" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                +{data.unplayedTopics.length - 12} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Suggested Games */}
      {data.suggestedGames?.length > 0 && (
        <div>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>🎮 Recommended Games</h3>
          <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-4)' }}>
            {data.suggestedGames.map((game, i) => (
              <Link
                key={i}
                to={`/play/${game._id}`}
                className="card card-interactive"
                style={{ minWidth: '240px', maxWidth: '280px', textDecoration: 'none', color: 'inherit', flexShrink: 0 }}
              >
                <h4 style={{ fontSize: 'var(--fs-base)', marginBottom: 'var(--space-2)' }}>{game.title}</h4>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <span className="badge badge-indigo">{game.gameType?.replace(/_/g, ' ')}</span>
                  {game.curriculum?.topic && <span className="badge badge-cyan">{game.curriculum.topic}</span>}
                  <span className="badge badge-amber">Age {game.minAge}–{game.maxAge}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!data.gaps?.length && !data.suggestedGames?.length && !data.unplayedTopics?.length && (
        <EmptyState icon="📊" title="Not enough data" message="Play more games to get personalized learning gap analysis.">
          <Link to="/explore" className="btn btn-primary">🎮 Explore Games</Link>
        </EmptyState>
      )}
    </div>
  );
}

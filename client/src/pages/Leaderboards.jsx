import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { leaderboardsAPI } from '../services/api.js';
import EmptyState from '../components/ui/EmptyState.jsx';

const MEDAL = ['🥇', '🥈', '🥉'];

export default function Leaderboards() {
  const { gameId } = useParams();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('allTime');
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (gameId) {
      leaderboardsAPI.get(gameId)
        .then(({ data }) => setData(data))
        .catch(() => setData(null))
        .finally(() => setLoading(false));
    } else {
      leaderboardsAPI.global()
        .then(({ data }) => setGlobalData(data))
        .catch(() => setGlobalData(null))
        .finally(() => setLoading(false));
    }
  }, [gameId]);

  const entries = tab === 'allTime' ? (data?.entries || []) : (data?.weeklyEntries || []);

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <span style={{ fontSize: '2.5rem' }}>🏆</span>
        <h1 style={{ fontSize: 'var(--fs-4xl)', marginTop: 'var(--space-2)' }}>
          <span className="gradient-text">Leaderboards</span>
        </h1>
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
          {gameId ? 'Top players for this game' : 'Global rankings across all games'}
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}>
          <div className="spinner spinner-lg" />
        </div>
      ) : gameId ? (
        /* Per-Game Leaderboard */
        <>
          <div className="tabs" style={{ justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
            <button className={`tab ${tab === 'allTime' ? 'tab-active' : ''}`} onClick={() => setTab('allTime')}>All Time</button>
            <button className={`tab ${tab === 'weekly' ? 'tab-active' : ''}`} onClick={() => setTab('weekly')}>This Week</button>
          </div>

          {/* Podium */}
          {entries.length >= 3 && (
            <div style={s.podium}>
              {[1, 0, 2].map(rank => {
                const e = entries[rank];
                if (!e) return null;
                return (
                  <div key={rank} style={{ ...s.podiumItem, ...(rank === 0 ? s.podiumFirst : {}) }} className="animate-fade-in-up">
                    <span style={{ fontSize: rank === 0 ? '2.5rem' : '1.8rem' }}>{MEDAL[rank]}</span>
                    <div className={`avatar ${rank === 0 ? 'avatar-lg' : ''}`}>
                      {(e.childName || e.user?.name || '?')[0]}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{e.childName || e.user?.name || 'Player'}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: rank === 0 ? 'var(--fs-2xl)' : 'var(--fs-xl)', color: 'var(--accent-indigo-hover)' }}>
                      {e.score}
                    </div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                      {e.accuracy != null ? `${Math.round(e.accuracy * 100)}% acc` : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Full list */}
          {entries.length > 0 ? (
            <div className="table-container" style={{ marginTop: 'var(--space-6)' }}>
              <table className="table">
                <thead>
                  <tr><th>#</th><th>Player</th><th>Score</th><th>Accuracy</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr key={e._id || i}>
                      <td style={{ fontWeight: 700, color: i < 3 ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                        {i < 3 ? MEDAL[i] : i + 1}
                      </td>
                      <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{e.childName || e.user?.name || 'Player'}</td>
                      <td style={{ fontWeight: 600, color: 'var(--accent-indigo-hover)' }}>{e.score}</td>
                      <td>{e.accuracy != null ? `${Math.round(e.accuracy * 100)}%` : '–'}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{e.completedAt ? new Date(e.completedAt).toLocaleDateString() : '–'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState icon="🏆" title="No scores yet" message="Be the first to set a high score!" />
          )}
        </>
      ) : (
        /* Global Leaderboard */
        <>
          {globalData?.rankings?.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr><th>#</th><th>Player</th><th>Total Score</th><th>Games</th><th>Avg Accuracy</th></tr>
                </thead>
                <tbody>
                  {globalData.rankings.map((r, i) => (
                    <tr key={r.playerId}>
                      <td style={{ fontWeight: 700, color: i < 3 ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                        {i < 3 ? MEDAL[i] : i + 1}
                      </td>
                      <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{r.name || 'Player'}</td>
                      <td style={{ fontWeight: 600, color: 'var(--accent-indigo-hover)' }}>{r.totalScore}</td>
                      <td>{r.gamesPlayed}</td>
                      <td>{Math.round(r.avgAccuracy * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState icon="🌍" title="No global rankings" message="Start playing games to appear on the global leaderboard!" />
          )}
        </>
      )}
    </div>
  );
}

const s = {
  podium: {
    display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'var(--space-4)',
    marginBottom: 'var(--space-4)', padding: 'var(--space-6) 0',
  },
  podiumItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)',
    padding: 'var(--space-5)', background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
    borderRadius: 'var(--radius-xl)', minWidth: '120px', transition: 'all 0.3s',
  },
  podiumFirst: {
    padding: 'var(--space-6)', borderColor: 'rgba(245, 158, 11, 0.3)',
    boxShadow: '0 0 30px rgba(245, 158, 11, 0.1)',
    transform: 'scale(1.05)',
  },
};

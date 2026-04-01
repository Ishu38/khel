import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { gamesAPI, sessionsAPI } from '../services/api.js';
import PhaserGame from '../game/PhaserGame.jsx';
import { getScenesForGameType } from '../game/sceneMap.js';
import AudioControls from '../components/AudioControls.jsx';

export default function Play() {
  const { id } = useParams();
  const location = useLocation();
  const [game, setGame] = useState(location.state?.gameData || null);
  const [loading, setLoading] = useState(!game);
  const [error, setError] = useState('');

  useEffect(() => {
    if (game) return;
    if (id === 'preview') return;
    gamesAPI.get(id)
      .then(({ data }) => setGame(data))
      .catch(() => setError('Game not found'))
      .finally(() => setLoading(false));
  }, [id, game]);

  useEffect(() => {
    if (game?._id) sessionsAPI.start({ gameId: game._id }).catch(() => {});
  }, [game]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="spinner spinner-lg" />
    </div>
  );
  if (error) return (
    <div className="container text-center" style={{ padding: 'var(--space-16)' }}>
      <p style={{ color: 'var(--accent-rose)', fontSize: 'var(--fs-lg)' }}>⚠️ {error}</p>
      <Link to="/explore" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }}>← Back to Explore</Link>
    </div>
  );
  if (!game) return null;

  const gameType = game.gameType || game.game_type;
  const scenes = getScenesForGameType(gameType);

  return (
    <div style={{ padding: 'var(--space-6) 0' }}>
      {/* Game Canvas */}
      <div style={s.canvasWrap}>
        <div style={s.canvasGlow} />
        <div style={s.canvasInner}>
          <PhaserGame width={800} height={600} scenes={scenes} gameData={game} />
        </div>
      </div>

      {/* Audio Controls */}
      <AudioControls />

      {/* Game Info */}
      <div className="container-sm text-center" style={{ marginTop: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-2)' }}>{game.title}</h2>
        {game.description && <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>{game.description}</p>}

        <div style={s.metaRow}>
          {game.curriculum?.subject && <span className="badge badge-emerald">{game.curriculum.subject}</span>}
          {game.curriculum?.topic && <span className="badge badge-cyan">{game.curriculum.topic}</span>}
          <span className="badge badge-indigo">{gameType?.replace(/_/g, ' ')}</span>
          <span className="badge badge-amber">Age {game.minAge}–{game.maxAge}</span>
        </div>

        {game._id && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Link to={`/leaderboards/${game._id}`} className="btn btn-secondary btn-sm">🏆 Leaderboard</Link>
            <Link to={`/multiplayer/${game._id}`} className="btn btn-outline btn-sm">👥 Multiplayer</Link>
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  canvasWrap: {
    position: 'relative',
    maxWidth: '840px',
    margin: '0 auto',
    padding: '0 var(--space-4)',
  },
  canvasGlow: {
    position: 'absolute',
    inset: '-20px',
    borderRadius: 'var(--radius-2xl)',
    background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
    filter: 'blur(30px)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  canvasInner: {
    position: 'relative',
    zIndex: 1,
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    border: '1px solid var(--border-secondary)',
    boxShadow: 'var(--shadow-xl)',
    background: 'var(--bg-secondary)',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    flexWrap: 'wrap',
    marginTop: 'var(--space-4)',
  },
};

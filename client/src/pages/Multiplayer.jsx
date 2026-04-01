import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gamesAPI } from '../services/api.js';
import { useAuth } from '../hooks/useAuth.jsx';
import PhaserGame from '../game/PhaserGame.jsx';
import { getScenesForGameType } from '../game/sceneMap.js';
import { io } from 'socket.io-client';

export default function Multiplayer() {
  const { id } = useParams();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | lobby | playing | finished
  const [playerCount, setPlayerCount] = useState(0);
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    gamesAPI.get(id)
      .then(({ data }) => { setGame(data); setStatus('lobby'); })
      .catch(() => setStatus('error'));
  }, [id]);

  useEffect(() => {
    if (!game || !user) return;
    const token = localStorage.getItem('khel_token');
    const s = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001', {
      auth: { token },
    });

    s.emit('multiplayer:join', { gameId: id });
    s.on('multiplayer:playerCount', (data) => setPlayerCount(data.count));
    s.on('multiplayer:start', (data) => { setPlayers(data.players); setStatus('playing'); });
    s.on('multiplayer:playerFinished', (data) => setResults(prev => [...prev, data]));
    setSocket(s);

    return () => { s.emit('multiplayer:leave', { gameId: id }); s.disconnect(); };
  }, [game, user, id]);

  if (status === 'loading') return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}>
      <div className="spinner spinner-lg" />
    </div>
  );

  if (status === 'error') return (
    <div className="container text-center" style={{ padding: 'var(--space-16)' }}>
      <p style={{ color: 'var(--accent-rose)' }}>Game not found</p>
    </div>
  );

  if (status === 'lobby') return (
    <div className="container text-center" style={{ padding: 'var(--space-16) var(--space-6)' }}>
      <div className="card-glass animate-scale-in" style={{ maxWidth: '480px', margin: '0 auto', padding: 'var(--space-10)' }}>
        <span style={{ fontSize: '3rem' }}>👥</span>
        <h2 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>Multiplayer Lobby</h2>
        <p style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>{game?.title}</p>

        <div style={s.waitBox}>
          <div className="animate-pulse" style={{ fontSize: '1.5rem' }}>🎮</div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Waiting for players...</div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>
              {playerCount} / 2 players connected
            </div>
          </div>
        </div>

        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, width: `${(playerCount / 2) * 100}%` }} />
        </div>

        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>
          The game starts automatically when 2 players join
        </p>
      </div>
    </div>
  );

  if (status === 'playing') {
    const gameType = game?.gameType || game?.game_type;
    const scenes = getScenesForGameType(gameType);

    return (
      <div style={{ padding: 'var(--space-6)' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={s.vsBar}>
            <div style={s.vsPlayer}>
              <div className="avatar avatar-sm">{user?.name?.[0] || '?'}</div>
              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>You</span>
            </div>
            <span className="badge badge-amber" style={{ fontSize: 'var(--fs-sm)' }}>⚡ VS</span>
            <div style={s.vsPlayer}>
              {players.filter(p => p.userId !== user?._id).map((p, i) => (
                <span key={i} style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{p.userId?.slice(-4) || 'Opponent'}</span>
              ))}
              <div className="avatar avatar-sm" style={{ background: 'var(--gradient-warm)' }}>?</div>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-secondary)', boxShadow: 'var(--shadow-xl)' }}>
            <PhaserGame width={800} height={600} scenes={scenes} gameData={game} />
          </div>
        </div>

        {results.length > 0 && (
          <div className="container-sm animate-fade-in-up" style={{ marginTop: 'var(--space-6)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>🏁 Results</h3>
            {results.map((r, i) => (
              <div key={i} className="card" style={{ marginBottom: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>{r.userId === user?._id ? '🎮 You' : '👤 Opponent'}</span>
                <span style={{ fontWeight: 700, color: 'var(--accent-indigo-hover)' }}>{r.score} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

const s = {
  waitBox: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
    padding: 'var(--space-4)', background: 'var(--bg-tertiary)',
    borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)',
  },
  progressTrack: {
    width: '100%', height: '6px', background: 'var(--bg-tertiary)',
    borderRadius: 'var(--radius-full)', overflow: 'hidden',
  },
  progressFill: {
    height: '100%', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)',
    transition: 'width 0.5s ease',
  },
  vsBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: 'var(--space-4) var(--space-6)', background: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', border: '1px solid var(--border-primary)',
    borderBottom: 'none',
  },
  vsPlayer: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
  },
};

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gamesAPI } from '../services/api.js';
import EmptyState from '../components/ui/EmptyState.jsx';

const GAME_TYPE_FILTERS = [
  { id: '', label: 'All Games' },
  { id: 'tap_match', label: '👆 Tap & Match' },
  { id: 'drag_sort', label: '🔀 Drag & Sort' },
  { id: 'maze_runner', label: '🏃 Maze Runner' },
  { id: 'word_builder', label: '🔤 Word Builder' },
  { id: 'quiz_adventure', label: '❓ Quiz' },
  { id: 'strategy_sim', label: '♟️ Strategy' },
];

const STAGE_FILTERS = [
  { id: '', label: 'All Ages' },
  { id: 'sensorimotor_preoperational', label: '3–4 yrs' },
  { id: 'preoperational', label: '4–6 yrs' },
  { id: 'concrete_operational', label: '6–9 yrs' },
  { id: 'formal_operational', label: '9–12 yrs' },
];

const TYPE_COLORS = {
  tap_match: { from: '#06b6d4', to: '#38bdf8' },
  drag_sort: { from: '#10b981', to: '#34d399' },
  maze_runner: { from: '#f59e0b', to: '#fbbf24' },
  word_builder: { from: '#8b5cf6', to: '#a78bfa' },
  quiz_adventure: { from: '#6366f1', to: '#818cf8' },
  strategy_sim: { from: '#f43f5e', to: '#fb7185' },
  code_and_play: { from: '#38bdf8', to: '#60a5fa' },
  multiplayer_race: { from: '#f59e0b', to: '#fbbf24' },
};

const GAME_ICONS = {
  tap_match: '👆',
  drag_sort: '🔀',
  maze_runner: '🏃',
  word_builder: '🔤',
  quiz_adventure: '❓',
  strategy_sim: '♟️',
  code_and_play: '💻',
  multiplayer_race: '🏎️',
};

export default function Explore() {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({ gameType: '', stage: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.gameType) params.gameType = filters.gameType;
    if (filters.stage) params.stage = filters.stage;

    gamesAPI.list(params)
      .then(({ data }) => setGames(data.games || []))
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div style={s.page}>
      {/* Hero Background */}
      <div style={s.heroBg} />
      
      <div className="container" style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.title}>
              Explore <span className="gradient-text">Games</span>
            </h1>
            <p style={s.subtitle}>
              Discover curriculum-aligned games for every age and subject.
            </p>
          </div>
          <Link to="/create" className="btn btn-primary hide-mobile">
            ✨ Create Game
          </Link>
        </div>

        {/* Filter Chips */}
        <div style={s.filterSection}>
          <div style={s.filterLabel}>Filter by Type:</div>
          <div style={s.filterRow}>
            {GAME_TYPE_FILTERS.map(f => (
              <button
                key={f.id}
                className={`chip ${filters.gameType === f.id ? 'chip-active' : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, gameType: f.id }))}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ ...s.filterLabel, marginTop: 'var(--space-4)' }}>Filter by Age:</div>
          <div style={s.filterRow}>
            {STAGE_FILTERS.map(f => (
              <button
                key={f.id}
                className={`chip ${filters.stage === f.id ? 'chip-active' : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, stage: f.id }))}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-auto" style={{ gap: 'var(--space-4)' }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : games.length === 0 ? (
          <EmptyState
            icon="🎮"
            title="No games found"
            message="Try changing your filters, or create the first game!"
          >
            <Link to="/create" className="btn btn-primary">✨ Create a Game</Link>
          </EmptyState>
        ) : (
          <div className="grid grid-auto" style={s.gameGrid}>
            {games.map((game, idx) => {
              const colors = TYPE_COLORS[game.gameType] || TYPE_COLORS.quiz_adventure;
              const icon = GAME_ICONS[game.gameType] || '🎮';
              
              return (
                <Link
                  key={game._id}
                  to={`/play/${game._id}`}
                  className="card card-interactive card-glow"
                  style={{
                    ...s.gameCard,
                    '--card-gradient-from': colors.from,
                    '--card-gradient-to': colors.to,
                    animationDelay: `${idx * 0.05}s`,
                  }}
                >
                  {/* Gradient Top Border */}
                  <div style={{
                    ...s.cardGradientTop,
                    background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                  }} />

                  {/* Game Icon Badge */}
                  <div style={s.iconBadge}>{icon}</div>

                  {/* Game Type Badge */}
                  <span style={{
                    ...s.typeBadge,
                    background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}20)`,
                    color: colors.from,
                  }}>
                    {game.gameType?.replace(/_/g, ' ')}
                  </span>

                  {/* Title */}
                  <h3 style={s.gameTitle}>{game.title}</h3>

                  {/* Description */}
                  {game.description && (
                    <p style={s.gameDesc}>
                      {game.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div style={s.tagRow}>
                    <span className="badge badge-cyan">Age {game.minAge}–{game.maxAge}</span>
                    {game.curriculum?.subject && (
                      <span className="badge badge-emerald">{game.curriculum.subject}</span>
                    )}
                  </div>

                  {/* Meta */}
                  <div style={s.meta}>
                    <span style={s.metaItem}>▶ {game.playCount || 0} plays</span>
                    {game.rating > 0 && <span style={s.metaItem}>⭐ {game.rating.toFixed(1)}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    position: 'relative',
    minHeight: 'calc(100vh - var(--nav-height))',
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '300px',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
    pointerEvents: 'none',
  },
  container: {
    padding: 'var(--space-8) var(--space-6)',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'var(--space-8)',
    flexWrap: 'wrap',
    gap: 'var(--space-4)',
  },
  title: {
    fontSize: 'var(--fs-4xl)',
    marginBottom: 'var(--space-2)',
  },
  subtitle: {
    color: 'var(--text-tertiary)',
    fontSize: 'var(--fs-lg)',
    maxWidth: '500px',
  },
  filterSection: {
    marginBottom: 'var(--space-8)',
  },
  filterLabel: {
    fontSize: 'var(--fs-sm)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 'var(--space-2)',
  },
  filterRow: {
    display: 'flex',
    gap: 'var(--space-2)',
    flexWrap: 'wrap',
  },
  gameGrid: {
    gap: 'var(--space-4)',
  },
  gameCard: {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.5s ease both',
  },
  cardGradientTop: {
    height: '4px',
    borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
  },
  iconBadge: {
    fontSize: '2.5rem',
    marginBottom: 'var(--space-3)',
    alignSelf: 'flex-start',
  },
  typeBadge: {
    display: 'inline-flex',
    padding: 'var(--space-1) var(--space-3)',
    fontSize: 'var(--fs-xs)',
    fontWeight: 600,
    borderRadius: 'var(--radius-full)',
    marginBottom: 'var(--space-3)',
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
  gameTitle: {
    fontSize: 'var(--fs-lg)',
    fontWeight: 600,
    marginBottom: 'var(--space-2)',
    lineHeight: 1.3,
  },
  gameDesc: {
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-tertiary)',
    marginBottom: 'var(--space-4)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: 1.5,
  },
  tagRow: {
    display: 'flex',
    gap: 'var(--space-2)',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  meta: {
    display: 'flex',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-4)',
    paddingTop: 'var(--space-3)',
    borderTop: '1px solid var(--border-primary)',
  },
  metaItem: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-muted)',
  },
};

import { useAudio } from '../hooks/useAudio.js';

export default function AudioControls() {
  const { muted, toggleMute } = useAudio();

  return (
    <button
      onClick={toggleMute}
      className="btn btn-ghost btn-icon"
      aria-label={muted ? 'Unmute' : 'Mute'}
      title={muted ? 'Unmute' : 'Mute'}
      style={s.fab}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}

const s = {
  fab: {
    position: 'fixed',
    bottom: 'var(--space-6)',
    right: 'var(--space-6)',
    width: '44px',
    height: '44px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(16px)',
    border: '1px solid var(--border-secondary)',
    boxShadow: 'var(--shadow-lg)',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 50,
    transition: 'all var(--transition-base)',
  },
};

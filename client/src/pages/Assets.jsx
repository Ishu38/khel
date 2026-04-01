import { useAuth } from '../hooks/useAuth.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { Link } from 'react-router-dom';

export default function Assets() {
  const { user } = useAuth();

  if (!user) return (
    <div className="container text-center" style={{ padding: 'var(--space-16)' }}>
      <p style={{ color: 'var(--text-tertiary)' }}>Please log in to manage assets.</p>
    </div>
  );

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--fs-4xl)' }}>🎨 <span className="gradient-text">Assets</span></h1>
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
          Manage sprites, backgrounds, and audio for your games.
        </p>
      </div>

      {/* Upload Zone */}
      <div style={s.dropZone}>
        <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>📁</div>
        <h3 style={{ marginBottom: 'var(--space-2)' }}>Drop files here to upload</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
          Support for PNG, JPG, SVG, MP3, WAV
        </p>
        <button className="btn btn-outline" style={{ marginTop: 'var(--space-4)' }}>Browse Files</button>
      </div>

      {/* Filter Tabs */}
      <div className="tabs" style={{ marginTop: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
        <button className="tab tab-active">🖼️ All</button>
        <button className="tab">🎭 Sprites</button>
        <button className="tab">🌄 Backgrounds</button>
        <button className="tab">🔊 Audio</button>
      </div>

      {/* Empty State */}
      <EmptyState
        icon="🎨"
        title="No assets yet"
        message="Upload sprites, backgrounds, and sounds to use in your games."
      >
        <Link to="/create" className="btn btn-primary">✨ Create Game Instead</Link>
      </EmptyState>
    </div>
  );
}

const s = {
  dropZone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-12)',
    borderRadius: 'var(--radius-xl)',
    border: '2px dashed var(--border-secondary)',
    background: 'var(--bg-glass-light)',
    textAlign: 'center',
    transition: 'all 0.3s',
    cursor: 'pointer',
  },
};

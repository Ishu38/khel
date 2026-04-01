import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { generateAPI, gamesAPI } from '../services/api.js';
import { useAuth } from '../hooks/useAuth.jsx';

export default function Create() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tier = user?.subscription?.tier || 'free';

  if (tier === 'free') {
    return (
      <div className="container-sm" style={{ padding: 'var(--space-8) var(--space-6)', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem' }}>💎</span>
        <h2 style={{ fontSize: 'var(--fs-3xl)', marginTop: 'var(--space-4)' }}>Premium Feature</h2>
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-3)', maxWidth: '480px', margin: 'var(--space-3) auto 0' }}>
          Game creation requires a paid subscription. Upgrade to Parent or Classroom plan to start creating AI-powered educational games.
        </p>
        <Link to="/subscription" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-6)' }}>
          View Plans & Upgrade
        </Link>
      </div>
    );
  }
  const [prompt, setPrompt] = useState('');
  const [targetAge, setTargetAge] = useState(8);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await generateAPI.create({ prompt, target_age: targetAge, language });
      setPreview(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      const { data } = await gamesAPI.create({ ...preview, published: true });
      navigate(`/play/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to publish game.');
    }
  };

  return (
    <div className="container-sm" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <span style={{ fontSize: '2.5rem' }}>✨</span>
        <h1 style={{ fontSize: 'var(--fs-4xl)', marginTop: 'var(--space-3)' }}>
          Create with <span className="gradient-text">AI</span>
        </h1>
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)', maxWidth: '480px', margin: 'var(--space-2) auto 0' }}>
          Describe the game you want, and Khel will build it for you — complete with levels, questions, and scoring.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleGenerate} className="card-glass" style={{ padding: 'var(--space-8)' }}>
        <div className="input-group" style={{ marginBottom: 'var(--space-6)' }}>
          <label className="input-label">What should the game teach?</label>
          <textarea
            className="textarea"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder='e.g. "Create a maze game that teaches multiplication tables for Class III"'
            rows={4}
            style={{ fontSize: 'var(--fs-md)' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div className="input-group" style={{ flex: 1, minWidth: '120px' }}>
            <label className="input-label">Target Age</label>
            <input
              type="number"
              className="input"
              min={3}
              max={14}
              value={targetAge}
              onChange={e => setTargetAge(+e.target.value)}
            />
          </div>
          <div className="input-group" style={{ flex: 1, minWidth: '120px' }}>
            <label className="input-label">Language</label>
            <select className="select" value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="bn">Bengali</option>
              <option value="bho">Bhojpuri</option>
              <option value="mr">Marathi</option>
              <option value="te">Telugu</option>
              <option value="kn">Kannada</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loading || !prompt.trim()}
          style={{ width: '100%' }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span className="spinner spinner-sm" />
              Generating Game...
            </span>
          ) : '⚡ Generate Game'}
        </button>

        {error && (
          <div className="animate-shake" style={s.error}>
            <span>⚠️</span> {error}
          </div>
        )}
      </form>

      {/* Preview */}
      {preview && (
        <div className="card animate-fade-in-up" style={{ marginTop: 'var(--space-8)' }}>
          <div style={s.previewHeader}>
            <span style={{ fontSize: '1.5rem' }}>🎮</span>
            <div>
              <h3 style={{ margin: 0 }}>{preview.title}</h3>
              <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)', margin: 0 }}>{preview.description}</p>
            </div>
          </div>

          <div style={s.previewMeta}>
            <div style={s.previewItem}>
              <span style={s.previewLabel}>Type</span>
              <span className="badge badge-indigo">{preview.game_type || preview.gameType}</span>
            </div>
            <div style={s.previewItem}>
              <span style={s.previewLabel}>Age</span>
              <span className="badge badge-cyan">{preview.min_age || preview.minAge}–{preview.max_age || preview.maxAge}</span>
            </div>
            <div style={s.previewItem}>
              <span style={s.previewLabel}>Levels</span>
              <span className="badge badge-emerald">{preview.levels?.length || 0}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <button onClick={handlePublish} className="btn btn-primary" style={{ flex: 1 }}>
              🚀 Publish & Play
            </button>
            <button
              onClick={() => navigate('/play/preview', { state: { gameData: preview } })}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              👁️ Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  error: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)',
    padding: 'var(--space-3) var(--space-4)', background: 'rgba(244, 63, 94, 0.1)',
    border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 'var(--radius-md)',
    color: 'var(--accent-rose)', fontSize: 'var(--fs-sm)',
  },
  previewHeader: {
    display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-6)',
  },
  previewMeta: {
    display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap',
    padding: 'var(--space-4) 0', borderTop: '1px solid var(--border-primary)',
  },
  previewItem: { display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' },
  previewLabel: { fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' },
};

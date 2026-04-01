import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const ROLES = [
  { id: 'parent', icon: '👪', label: 'Parent', desc: "Track your child's learning" },
  { id: 'teacher', icon: '🏫', label: 'Teacher', desc: 'Manage classrooms & assign games' },
  { id: 'student', icon: '🎮', label: 'Student', desc: 'Play and learn with games' },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'parent' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const up = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const pwStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const pwColor = ['var(--accent-rose)', 'var(--accent-amber)', 'var(--accent-amber)', 'var(--accent-emerald)'][pwStrength - 1] || 'var(--border-primary)';
  const pwLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][pwStrength] || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || (err.code === 'ERR_NETWORK' ? 'Cannot reach server. Please try again later.' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.bgOrb1} />
      <div style={s.bgOrb2} />

      <div className="animate-scale-in" style={s.card}>
        <div style={s.header}>
          <span style={{ fontSize: '2rem' }}>⚡</span>
          <h2 style={s.title}>Join Khel</h2>
          <p style={s.subtitle}>Start creating educational games today</p>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          {error && (
            <div className="animate-shake" style={s.error}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Role selector */}
          <div className="input-group">
            <label className="input-label">I am a...</label>
            <div style={s.roleGrid}>
              {ROLES.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, role: r.id }))}
                  style={{
                    ...s.roleCard,
                    ...(form.role === r.id ? s.roleActive : {}),
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{r.label}</span>
                  <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)' }}>{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input className="input" placeholder="Your full name" value={form.name} onChange={up('name')} required />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" className="input" placeholder="you@example.com" value={form.email} onChange={up('email')} required />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                className="input"
                placeholder="Min 8 characters"
                value={form.password}
                onChange={up('password')}
                required
                minLength={8}
                style={{ paddingRight: '3rem' }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} style={s.eyeBtn} tabIndex={-1}>
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Strength bar */}
            {form.password && (
              <div style={s.strengthWrap}>
                <div style={s.strengthTrack}>
                  <div style={{ ...s.strengthFill, width: `${pwStrength * 25}%`, background: pwColor }} />
                </div>
                <span style={{ fontSize: 'var(--fs-xs)', color: pwColor, fontWeight: 600 }}>{pwLabel}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: '100%', marginTop: 'var(--space-2)' }}
          >
            {loading ? <span className="dot-loader"><span /><span /><span /></span> : 'Create Account'}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-indigo-hover)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: 'calc(100vh - var(--nav-height))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-8) var(--space-4)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgOrb1: {
    position: 'absolute', top: '5%', right: '10%', width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'absolute', bottom: '10%', left: '10%', width: '350px', height: '350px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none',
  },
  card: {
    width: '100%', maxWidth: '480px',
    background: 'var(--bg-glass)', backdropFilter: 'blur(24px)', border: '1px solid var(--border-secondary)',
    borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', position: 'relative', zIndex: 1,
  },
  header: { textAlign: 'center', marginBottom: 'var(--space-6)' },
  title: { fontSize: 'var(--fs-2xl)', marginTop: 'var(--space-3)', marginBottom: 'var(--space-1)' },
  subtitle: { fontSize: 'var(--fs-sm)', color: 'var(--text-tertiary)' },
  form: { display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' },
  error: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
    padding: 'var(--space-3) var(--space-4)', background: 'rgba(244, 63, 94, 0.1)',
    border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 'var(--radius-md)',
    color: 'var(--accent-rose)', fontSize: 'var(--fs-sm)',
  },
  roleGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' },
  roleCard: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-1)',
    padding: 'var(--space-4) var(--space-2)', background: 'var(--bg-input)', border: '1.5px solid var(--border-primary)',
    borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s',
    textAlign: 'center', color: 'var(--text-primary)', fontFamily: 'var(--font-body)',
  },
  roleActive: {
    borderColor: 'var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.08)',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
  },
  eyeBtn: {
    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '4px',
  },
  strengthWrap: { display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-1)' },
  strengthTrack: {
    flex: 1, height: '3px', background: 'var(--border-primary)', borderRadius: 'var(--radius-full)', overflow: 'hidden',
  },
  strengthFill: {
    height: '100%', borderRadius: 'var(--radius-full)', transition: 'all 0.3s',
  },
  footer: { textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--fs-sm)', color: 'var(--text-tertiary)' },
};

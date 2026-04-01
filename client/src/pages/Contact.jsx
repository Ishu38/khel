import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={s.header}>
          <h1 style={s.title}>GET IN TOUCH.</h1>
          <p style={s.subtitle}>We'd love to hear from you — feedback, partnerships, or just to say hi.</p>
        </div>

        <div style={s.grid}>
          {/* Info side */}
          <div style={s.infoCol}>
            {/* Creator */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div style={{ ...s.iconBadge, background: '#ddd6fe' }}>👤</div>
                <div>
                  <div style={s.cardLabel}>Creator</div>
                  <div style={s.cardValue}>Neil Shankar Ray</div>
                </div>
              </div>
            </div>

            {/* Institution */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div style={{ ...s.iconBadge, background: '#a7f3d0' }}>🎓</div>
                <div>
                  <div style={s.cardLabel}>Institution</div>
                  <div style={s.cardValue}>IIT Patna</div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div style={{ ...s.iconBadge, background: '#bae6fd' }}>📧</div>
                <div>
                  <div style={s.cardLabel}>Email</div>
                  <a href="mailto:roychinu45@gmail.com" style={s.cardLink}>roychinu45@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div style={{ ...s.iconBadge, background: '#fde68a' }}>📱</div>
                <div>
                  <div style={s.cardLabel}>Phone</div>
                  <a href="tel:+917001406831" style={s.cardLink}>+91 7001406831</a>
                </div>
              </div>
            </div>

          </div>

          {/* Form side */}
          <div style={s.formCard}>
            <h2 style={s.formTitle}>SEND A MESSAGE</h2>
            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.formGroup}>
                <label style={s.label}>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Your name"
                  required
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div style={s.formGroup}>
                <label style={s.label}>Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="textarea"
                  rows="5"
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              <button type="submit" style={s.submitBtn}>
                {submitted ? 'MESSAGE SENT!' : 'SEND MESSAGE →'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div style={s.mapSection}>
          <h2 style={s.mapTitle}>FIND US</h2>
          <div style={s.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.812086498498!2d84.85196!3d25.5359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d57!2sIIT%20Patna!5e0!3m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IIT Patna"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    background: '#0a0a0a',
    minHeight: 'calc(100vh - var(--nav-height))',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: 'clamp(40px, 6vw, 80px) 20px',
  },
  header: {
    marginBottom: 'clamp(40px, 6vw, 60px)',
  },
  title: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 'var(--space-3)',
  },
  subtitle: {
    fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
    color: 'rgba(255,255,255,0.4)',
    maxWidth: '460px',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 'var(--space-8)',
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--space-5) var(--space-6)',
    background: '#161616',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
  },
  iconBadge: {
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    flexShrink: 0,
  },
  cardLabel: {
    fontSize: 'var(--fs-xs)',
    color: 'rgba(255,255,255,0.35)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600,
    marginBottom: '2px',
  },
  cardValue: {
    fontSize: 'var(--fs-base)',
    fontWeight: 700,
    color: '#fff',
  },
  cardLink: {
    fontSize: 'var(--fs-base)',
    fontWeight: 600,
    color: '#818cf8',
    textDecoration: 'none',
  },
  mapSection: {
    marginTop: 'clamp(40px, 6vw, 60px)',
  },
  mapTitle: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'var(--fs-2xl)',
    fontWeight: 900,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    marginBottom: 'var(--space-4)',
  },
  mapWrap: {
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  formCard: {
    background: '#161616',
    borderRadius: '24px',
    padding: 'var(--space-8)',
    border: '1px solid rgba(255,255,255,0.06)',
  },
  formTitle: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'var(--fs-lg)',
    fontWeight: 800,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 'var(--space-6)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-5)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  label: {
    fontSize: 'var(--fs-sm)',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
  },
  submitBtn: {
    padding: '16px 36px',
    fontSize: '0.9rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#0a0a0a',
    background: '#fff',
    borderRadius: '60px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    marginTop: 'var(--space-2)',
  },
};

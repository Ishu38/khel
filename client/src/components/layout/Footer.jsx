import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.border} />
      <div style={s.inner}>
        <div style={s.grid}>
          {/* Brand */}
          <div>
            <div style={s.brand}>
              <span style={{ fontSize: '1.2rem' }}>⚡</span>
              <span style={s.brandText}>KHEL</span>
            </div>
            <p style={s.tagline}>
              AI-powered educational games,<br />
              aligned to Indian curricula.
            </p>
            <div style={s.madeIn}>Made in India 🇮🇳</div>
          </div>

          {/* Platform */}
          <div>
            <h4 style={s.heading}>Platform</h4>
            <div style={s.links}>
              <Link to="/explore" style={s.link}>Explore Games</Link>
              <Link to="/create" style={s.link}>Create with AI</Link>
              <Link to="/editor" style={s.link}>Game Editor</Link>
              <Link to="/leaderboards" style={s.link}>Leaderboards</Link>
            </div>
          </div>

          {/* Boards */}
          <div>
            <h4 style={s.heading}>Curriculums</h4>
            <div style={s.links}>
              <span style={s.link}>NCERT / CBSE</span>
              <span style={s.link}>ICSE</span>
              <span style={s.link}>State Boards</span>
              <span style={s.link}>Montessori</span>
              <span style={s.link}>IB PYP</span>
            </div>
          </div>

          {/* Age Groups */}
          <div>
            <h4 style={s.heading}>Age Groups</h4>
            <div style={s.links}>
              <span style={s.link}>Pre-Nursery (3–4)</span>
              <span style={s.link}>Nursery – KG (4–6)</span>
              <span style={s.link}>Class I – III (6–9)</span>
              <span style={s.link}>Class IV – VII (9–12)</span>
            </div>
          </div>
        </div>

        <div style={s.bottom}>
          <span style={s.copy}>© {new Date().getFullYear()} Khel. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <span style={s.bottomLink}>Privacy</span>
            <span style={s.bottomLink}>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const s = {
  footer: {
    marginTop: 'auto',
    background: 'var(--bg-secondary)',
    position: 'relative',
  },
  border: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--accent-indigo), var(--accent-cyan), var(--accent-emerald), transparent)',
    opacity: 0.3,
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: 'var(--space-12) var(--space-6) var(--space-6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 'var(--space-8)',
    marginBottom: 'var(--space-8)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-3)',
  },
  brandText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 800,
    letterSpacing: '0.1em',
    color: 'var(--text-primary)',
  },
  tagline: {
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-tertiary)',
    lineHeight: 1.6,
    marginBottom: 'var(--space-3)',
  },
  madeIn: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-muted)',
    fontWeight: 500,
  },
  heading: {
    fontSize: 'var(--fs-sm)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-4)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontFamily: 'var(--font-heading)',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  },
  link: {
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-tertiary)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 'var(--space-6)',
    borderTop: '1px solid var(--border-primary)',
    flexWrap: 'wrap',
    gap: 'var(--space-4)',
  },
  copy: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-muted)',
  },
  bottomLink: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
};

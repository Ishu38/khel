import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useEffect, useState, useRef } from 'react';

/* ─── Data ──────────────────────────────────────────────────────────────── */

const FEATURES = [
  { icon: '🧒', label: 'Age-Appropriate', desc: 'Piaget-based guardrails', bg: '#ddd6fe' },
  { icon: '📚', label: 'Curriculum Aligned', desc: 'NCERT, CBSE, ICSE & more', bg: '#a7f3d0' },
  { icon: '🎯', label: 'Adaptive Difficulty', desc: 'Zone of Proximal Development', bg: '#fde68a' },
  { icon: '⚡', label: 'AI Generation', desc: 'Prompt to game in seconds', bg: '#c7d2fe' },
  { icon: '🌐', label: '8 Indian Languages', desc: 'Hindi, Tamil, Bengali & more', bg: '#fbcfe8' },
  { icon: '📊', label: 'Learning Analytics', desc: 'Track progress & gaps', bg: '#bae6fd' },
];

const GAME_TYPES = [
  { emoji: '👆', name: 'Tap & Match', age: '3–6' },
  { emoji: '🔀', name: 'Drag & Sort', age: '6–9' },
  { emoji: '🏃', name: 'Maze Runner', age: '6–9' },
  { emoji: '🔤', name: 'Word Builder', age: '8–11' },
  { emoji: '❓', name: 'Quiz Adventure', age: '9–12' },
  { emoji: '♟️', name: 'Strategy Sim', age: '10–12' },
  { emoji: '💻', name: 'Code & Play', age: '8–12' },
  { emoji: '🏎️', name: 'Multiplayer', age: '8–12' },
];

const STEPS = [
  { num: '01', title: 'Describe', desc: 'Tell us what to teach, the age, and language.', icon: '💬' },
  { num: '02', title: 'Generate', desc: 'AI builds a complete playable game in seconds.', icon: '⚡' },
  { num: '03', title: 'Play & Track', desc: 'Kids play. You monitor progress and learning gaps.', icon: '📊' },
];

const MARQUEE_ITEMS = ['NCERT', 'CBSE', 'ICSE', 'State Boards', 'Montessori', 'IB PYP', 'Hindi', 'Tamil', 'Bengali', 'Bhojpuri', 'Marathi', 'Telugu', 'Kannada', 'English'];

/* ─── Playful bouncing mascot ───────────────────────────────────────────── */

function Mascot() {
  return (
    <span style={{
      fontSize: 'clamp(3rem, 8vw, 5rem)',
      display: 'inline-block',
      animation: 'heroFloat 3s ease-in-out infinite',
      cursor: 'default',
      userSelect: 'none',
      filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))',
    }}>
      🎮
    </span>
  );
}

/* ─── Rotating word cycle ───────────────────────────────────────────────── */

const CYCLE_WORDS = ['LEARN.', 'PLAY.', 'GROW.', 'CREATE.'];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % CYCLE_WORDS.length);
        setShow(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      ...styles.heroRotWord,
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {CYCLE_WORDS[idx]}
    </span>
  );
}

/* ─── Marquee ───────────────────────────────────────────────────────────── */

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={styles.marqueeWrap}>
      <div style={styles.marqueeTrack}>
        {doubled.map((item, i) => (
          <span key={i} style={styles.marqueeItem}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ background: '#0a0a0a' }}>

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />

        <div style={styles.heroInner}>
          <Mascot />

          <h1 style={styles.heroTitle}>
            MAKE KIDS<br />
            <RotatingWord />
          </h1>

          <p style={styles.heroSub}>
            The AI-powered platform that turns any curriculum topic into
            a playable game. Pre-nursery to Class VII. No code needed.
          </p>

          <div style={styles.heroBtns}>
            <Link to={user ? '/create' : '/register'} style={styles.btnPrimary}>
              GET STARTED →
            </Link>
            <Link to="/explore" style={styles.btnSecondary}>
              EXPLORE GAMES
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Marquee ─────────────────────────────────────────────────── */}
      <Marquee />

      {/* ─── Features (pill cards) ───────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>BUILT FOR HOW<br />CHILDREN LEARN.</h2>
          <p style={styles.sectionSub}>
            Every feature grounded in developmental psychology and Indian curriculum standards.
          </p>

          <div style={styles.featGrid}>
            {FEATURES.map((f, i) => (
              <div key={i} style={styles.featCard}>
                <div style={{ ...styles.featIcon, background: f.bg }}>
                  <span style={{ fontSize: '1.6rem' }}>{f.icon}</span>
                </div>
                <div>
                  <div style={styles.featLabel}>{f.label}</div>
                  <div style={styles.featDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ────────────────────────────────────────────── */}
      <section style={{ ...styles.section, background: '#111' }}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>THREE STEPS.<br />THAT'S IT.</h2>

          <div style={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNum}>{step.num}</div>
                <span style={{ fontSize: '2.5rem' }}>{step.icon}</span>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Game Types ──────────────────────────────────────────────── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>8 GAME TYPES.</h2>
          <p style={styles.sectionSub}>Each one targets specific cognitive skills for the right developmental stage.</p>

          <div style={styles.gameGrid}>
            {GAME_TYPES.map((g, i) => (
              <div key={i} style={styles.gameCard}>
                <span style={{ fontSize: '2rem' }}>{g.emoji}</span>
                <div style={styles.gameName}>{g.name}</div>
                <div style={styles.gameAge}>{g.age} yrs</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>READY TO BUILD<br />YOUR FIRST GAME?</h2>
          <p style={styles.ctaSub}>
            Join thousands of teachers and parents transforming education.
          </p>
          <Link to={user ? '/create' : '/register'} style={styles.btnPrimary}>
            {user ? 'START CREATING →' : "GET STARTED — IT'S FREE →"}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Styles ────────────────────────────────────────────────────────────── */

const styles = {
  /* Hero */
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 'var(--space-16) var(--space-6)',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  heroInner: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '900px',
    zIndex: 1,
  },
  heroTitle: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'clamp(3rem, 12vw, 7rem)',
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: '-0.04em',
    color: '#fff',
    margin: 'var(--space-6) 0 var(--space-6)',
    textTransform: 'uppercase',
  },
  heroRotWord: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #818cf8, #06b6d4, #34d399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 4s ease infinite',
  },
  heroSub: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: 'rgba(255,255,255,0.5)',
    maxWidth: '540px',
    margin: '0 auto var(--space-8)',
    lineHeight: 1.7,
  },
  heroBtns: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    flexWrap: 'wrap',
  },

  /* Buttons — Creem style */
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: '16px 36px',
    fontSize: '0.9rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#0a0a0a',
    background: '#fff',
    borderRadius: '60px',
    textDecoration: 'none',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 4px 20px rgba(255,255,255,0.1)',
    border: 'none',
    cursor: 'pointer',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: '16px 36px',
    fontSize: '0.9rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#fff',
    background: 'transparent',
    borderRadius: '60px',
    border: '2px solid rgba(255,255,255,0.2)',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  },

  /* Marquee */
  marqueeWrap: {
    overflow: 'hidden',
    padding: 'var(--space-4) 0',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: '#0f0f0f',
  },
  marqueeTrack: {
    display: 'flex',
    gap: 'var(--space-8)',
    animation: 'marquee 25s linear infinite',
    width: 'max-content',
  },
  marqueeItem: {
    fontSize: 'var(--fs-sm)',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.25)',
    whiteSpace: 'nowrap',
  },

  /* Sections */
  section: {
    padding: 'clamp(60px, 10vw, 120px) 0',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 var(--space-6)',
  },
  sectionTitle: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'clamp(2rem, 6vw, 4rem)',
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 'var(--space-4)',
  },
  sectionSub: {
    fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
    color: 'rgba(255,255,255,0.4)',
    maxWidth: '500px',
    lineHeight: 1.6,
    marginBottom: 'var(--space-10)',
  },

  /* Feature cards — Creem pill style */
  featGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 'var(--space-4)',
  },
  featCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    padding: 'var(--space-5) var(--space-6)',
    background: '#161616',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.06)',
    transition: 'all 0.3s ease',
  },
  featIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featLabel: {
    fontSize: 'var(--fs-base)',
    fontWeight: 700,
    color: '#fff',
    marginBottom: '2px',
  },
  featDesc: {
    fontSize: 'var(--fs-sm)',
    color: 'rgba(255,255,255,0.4)',
  },

  /* Steps */
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 'var(--space-6)',
  },
  stepCard: {
    background: '#1a1a1a',
    borderRadius: '24px',
    padding: 'var(--space-8)',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
    overflow: 'hidden',
  },
  stepNum: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'clamp(4rem, 8vw, 6rem)',
    fontWeight: 900,
    color: 'rgba(255,255,255,0.03)',
    position: 'absolute',
    top: '-10px',
    right: '16px',
    lineHeight: 1,
    pointerEvents: 'none',
  },
  stepTitle: {
    fontSize: 'var(--fs-xl)',
    fontWeight: 800,
    color: '#fff',
    marginTop: 'var(--space-3)',
    marginBottom: 'var(--space-2)',
    textTransform: 'uppercase',
    letterSpacing: '-0.01em',
  },
  stepDesc: {
    fontSize: 'var(--fs-sm)',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 1.6,
  },

  /* Game Types */
  gameGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 'var(--space-4)',
  },
  gameCard: {
    background: '#161616',
    borderRadius: '20px',
    padding: 'var(--space-6) var(--space-4)',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.06)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
  },
  gameName: {
    fontSize: 'var(--fs-sm)',
    fontWeight: 700,
    color: '#fff',
  },
  gameAge: {
    fontSize: 'var(--fs-xs)',
    color: 'rgba(255,255,255,0.3)',
    fontWeight: 600,
  },

  /* CTA */
  ctaSection: {
    padding: 'clamp(80px, 12vw, 140px) 0',
    textAlign: 'center',
    background: 'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)',
  },
  ctaTitle: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    fontSize: 'clamp(2rem, 6vw, 4rem)',
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: '-0.03em',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 'var(--space-4)',
  },
  ctaSub: {
    fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
    color: 'rgba(255,255,255,0.4)',
    maxWidth: '440px',
    margin: '0 auto var(--space-8)',
    lineHeight: 1.6,
  },
};

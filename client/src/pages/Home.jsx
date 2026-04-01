import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useEffect, useState } from 'react';

const FEATURES = [
  { icon: '✨', title: 'AI Game Generator', desc: 'Describe your game in plain language — our AI builds it with sprites, levels, and scoring.', color: 'var(--accent-violet)' },
  { icon: '🧒', title: 'Age-Appropriate', desc: "Developmental guardrails ensure games match your child's cognitive stage (Piaget-based).", color: 'var(--accent-cyan)' },
  { icon: '📚', title: 'Curriculum Aligned', desc: 'Mapped to NCERT, CBSE, ICSE, and State Board learning outcomes.', color: 'var(--accent-emerald)' },
  { icon: '🎯', title: 'Adaptive Difficulty', desc: "Games auto-adjust to keep your child in the Zone of Proximal Development.", color: 'var(--accent-amber)' },
];

const STEPS = [
  { num: '01', title: 'Describe', desc: 'Tell Khel what you want to teach, the age group, and language.', icon: '💬' },
  { num: '02', title: 'Generate', desc: 'Our AI engine creates a complete, playable game in seconds.', icon: '⚡' },
  { num: '03', title: 'Play & Track', desc: 'Students play the game while parents and teachers monitor progress.', icon: '📊' },
];

const STATS = [
  { value: '8+', label: 'Game Types', color: 'var(--accent-indigo-hover)' },
  { value: '6', label: 'Curriculum Boards', color: 'var(--accent-cyan)' },
  { value: '8', label: 'Indian Languages', color: 'var(--accent-emerald)' },
  { value: '3–12', label: 'Age Range', color: 'var(--accent-amber)' },
];

const ROTATING_WORDS = ['Play', 'Learn', 'Grow', 'Create', 'Explore'];

function AnimatedText() {
  const [phase, setPhase] = useState(0); // 0=hidden, 1=letters, 2=full
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const letters = 'खेल'.split('');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase < 2) return;
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % ROTATING_WORDS.length);
        setWordVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div style={heroIntro}>
      {/* Animated Devanagari letters with stagger */}
      <div style={heroLettersRow}>
        {letters.map((char, i) => (
          <span
            key={i}
            style={{
              ...heroLetter,
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(60px) scale(0.3) rotate(-15deg)',
              transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
              animationDelay: phase >= 2 ? `${i * 0.5}s` : undefined,
              animation: phase >= 2 ? `heroGlow 3s ease-in-out ${i * 0.5}s infinite` : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Decorative line */}
      <div style={{
        ...heroLine,
        width: phase >= 2 ? '120px' : '0px',
        opacity: phase >= 2 ? 1 : 0,
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
      }} />

      {/* Rotating word + tagline */}
      <div style={{
        ...heroTagline,
        opacity: phase >= 2 ? 1 : 0,
        transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out 1s',
      }}>
        <span style={heroTagStatic}>Every child deserves to </span>
        <span style={{
          ...heroTagRotating,
          opacity: wordVisible ? 1 : 0,
          transform: wordVisible ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {ROTATING_WORDS[wordIdx]}
        </span>
      </div>

      {/* Subtle particles */}
      {phase >= 2 && (
        <div style={heroParticles}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{
              ...heroParticle,
              left: `${15 + i * 18}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2.5 + i * 0.5}s`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section style={s.hero}>
        {/* Background decorations */}
        <div style={s.heroBgOrb1} />
        <div style={s.heroBgOrb2} />
        <div style={s.heroBgOrb3} />

        {/* Animated Khel Intro */}
        <AnimatedText />

        <div className="container" style={s.heroContent}>
          <div style={s.heroBadge}>
            <span style={{ fontSize: '0.75rem' }}>⚡</span>
            AI-Powered Educational Games
          </div>

          <h1 style={s.heroTitle}>
            Create Curriculum-Aligned<br />
            Games <span className="gradient-text">Without Code</span>
          </h1>

          <p style={s.heroSubtitle}>
            From pre-nursery to Class VII — tell Khel what you want to teach,
            and get a playable game in minutes. Aligned to NCERT, CBSE, ICSE, and more.
          </p>

          <div style={s.heroCta}>
            {user ? (
              <>
                <Link to="/create" className="btn btn-primary btn-lg">
                  ✨ Create a Game
                </Link>
                <Link to="/explore" className="btn btn-secondary btn-lg">
                  Explore Games →
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started Free →
                </Link>
                <Link to="/explore" className="btn btn-secondary btn-lg">
                  Browse Games
                </Link>
              </>
            )}
          </div>

          {/* Stats row */}
          <div style={s.statsRow}>
            {STATS.map((st, i) => (
              <div key={i} style={s.statItem} className="animate-fade-in-up">
                <div style={{ ...s.statVal, color: st.color }}>{st.value}</div>
                <div style={s.statLbl}>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ──────────────────────────────────────────────────── */}
      <section style={s.section}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={s.sectionTitle}>Built for How Children Learn</h2>
            <p style={s.sectionSub}>Every feature is grounded in developmental psychology and Indian curriculum standards.</p>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="card card-glow" style={{ '--delay': `${i * 0.1}s`, animationDelay: `${i * 0.1}s` }}>
                <div style={{ ...s.featureIcon, background: `${f.color}15`, color: f.color }}>{f.icon}</div>
                <h3 style={s.featureTitle}>{f.title}</h3>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works ──────────────────────────────────────────────── */}
      <section style={{ ...s.section, background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={s.sectionTitle}>How It Works</h2>
            <p style={s.sectionSub}>From idea to playable game in three simple steps.</p>
          </div>

          <div style={s.stepsGrid}>
            {STEPS.map((step, i) => (
              <div key={i} style={s.step}>
                <div style={s.stepIcon}>{step.icon}</div>
                <div style={s.stepNum}>{step.num}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.featureDesc}>{step.desc}</p>
                {i < STEPS.length - 1 && <div style={s.stepConnector} className="hide-mobile" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Game Types ────────────────────────────────────────────────── */}
      <section style={s.section}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <h2 style={s.sectionTitle}>8 Game Types, Endless Possibilities</h2>
            <p style={s.sectionSub}>Each game type targets specific cognitive skills appropriate for the developmental stage.</p>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--space-4)' }}>
            {[
              { emoji: '👆', name: 'Tap & Match', age: '3–6', color: 'linear-gradient(135deg, #06b6d4, #38bdf8)' },
              { emoji: '🔀', name: 'Drag & Sort', age: '6–9', color: 'linear-gradient(135deg, #10b981, #34d399)' },
              { emoji: '🏃', name: 'Maze Runner', age: '6–9', color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
              { emoji: '🔤', name: 'Word Builder', age: '8–11', color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
              { emoji: '❓', name: 'Quiz Adventure', age: '9–12', color: 'linear-gradient(135deg, #6366f1, #818cf8)' },
              { emoji: '♟️', name: 'Strategy Sim', age: '10–12', color: 'linear-gradient(135deg, #f43f5e, #fb7185)' },
              { emoji: '💻', name: 'Code & Play', age: '8–12', color: 'linear-gradient(135deg, #38bdf8, #60a5fa)' },
              { emoji: '🏎️', name: 'Multiplayer Race', age: '8–12', color: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
            ].map((g, i) => (
              <div key={i} style={{...s.gameTypeCard, background: g.color}}>
                <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>{g.emoji}</span>
                <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{g.name}</div>
                <div className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: 'white', border: 'none' }}>{g.age} yrs</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section style={s.ctaSection}>
        <div className="container text-center">
          <h2 style={{ fontSize: 'var(--fs-4xl)', marginBottom: 'var(--space-4)' }}>
            Ready to Create Your First Game?
          </h2>
          <p style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-8)', fontSize: 'var(--fs-lg)' }}>
            Join teachers and parents who are transforming education with AI-powered games.
          </p>
          <Link to={user ? '/create' : '/register'} className="btn btn-primary btn-lg">
            {user ? '✨ Start Creating' : "Get Started — It's Free"}
          </Link>
        </div>
      </section>
    </div>
  );
}

const s = {
  hero: {
    position: 'relative',
    overflow: 'hidden',
    padding: 'var(--space-20) 0 var(--space-16)',
    background: 'var(--gradient-hero)',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroBgOrb1: {
    position: 'absolute',
    top: '-20%',
    left: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroBgOrb2: {
    position: 'absolute',
    bottom: '-10%',
    right: '-5%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroBgOrb3: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    textAlign: 'center',
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--fs-sm)',
    fontWeight: 500,
    color: 'var(--accent-indigo-hover)',
    background: 'rgba(99, 102, 241, 0.1)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: 'var(--radius-full)',
    marginBottom: 'var(--space-6)',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.75rem)',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 'var(--space-6)',
    letterSpacing: '-0.03em',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: 'var(--text-tertiary)',
    maxWidth: '640px',
    margin: '0 auto var(--space-8)',
    lineHeight: 1.7,
  },
  heroCta: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-4)',
    flexWrap: 'wrap',
    marginBottom: 'var(--space-12)',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-8)',
    flexWrap: 'wrap',
    padding: 'var(--space-6) var(--space-8)',
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(20px)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-primary)',
    maxWidth: '640px',
    margin: '0 auto',
  },
  statItem: { textAlign: 'center' },
  statVal: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--fs-3xl)',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 'var(--space-1)',
  },
  statLbl: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  section: {
    padding: 'var(--space-20) 0',
  },
  sectionTitle: {
    fontSize: 'var(--fs-4xl)',
    marginBottom: 'var(--space-3)',
  },
  sectionSub: {
    fontSize: 'var(--fs-lg)',
    color: 'var(--text-tertiary)',
    maxWidth: '560px',
    margin: '0 auto',
  },
  featureIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    marginBottom: 'var(--space-4)',
  },
  featureTitle: {
    fontSize: 'var(--fs-lg)',
    fontWeight: 600,
    marginBottom: 'var(--space-2)',
  },
  featureDesc: {
    fontSize: 'var(--fs-sm)',
    color: 'var(--text-tertiary)',
    lineHeight: 1.6,
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 'var(--space-8)',
    position: 'relative',
  },
  step: {
    textAlign: 'center',
    position: 'relative',
    padding: 'var(--space-6)',
  },
  stepIcon: {
    fontSize: '2.5rem',
    marginBottom: 'var(--space-3)',
  },
  stepNum: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--fs-xs)',
    fontWeight: 700,
    color: 'var(--accent-indigo)',
    letterSpacing: '0.1em',
    marginBottom: 'var(--space-2)',
  },
  stepTitle: {
    fontSize: 'var(--fs-xl)',
    fontWeight: 700,
    marginBottom: 'var(--space-2)',
  },
  stepConnector: {
    position: 'absolute',
    top: '45%',
    right: '-20%',
    width: '40%',
    height: '2px',
    background: 'linear-gradient(90deg, var(--accent-indigo), transparent)',
    opacity: 0.3,
  },
  gameTypeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-6)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-base)',
    cursor: 'default',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  ctaSection: {
    padding: 'var(--space-20) 0',
    background: 'var(--bg-secondary)',
  },
};

const heroIntro = {
  position: 'relative',
  textAlign: 'center',
  padding: 'var(--space-6) var(--space-4)',
  marginBottom: 'var(--space-6)',
};

const heroLettersRow = {
  display: 'inline-flex',
  gap: 'clamp(0.2rem, 2vw, 0.8rem)',
  justifyContent: 'center',
  perspective: '600px',
};

const heroLetter = {
  fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
  fontSize: 'clamp(4rem, 14vw, 9rem)',
  fontWeight: 900,
  background: 'linear-gradient(160deg, #818cf8 0%, #6366f1 30%, #06b6d4 60%, #34d399 100%)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
  willChange: 'transform, opacity',
  filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.3))',
};

const heroLine = {
  height: '2px',
  background: 'linear-gradient(90deg, transparent, #6366f1, #06b6d4, transparent)',
  margin: 'var(--space-4) auto',
  borderRadius: '2px',
};

const heroTagline = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  gap: 'var(--space-2)',
  flexWrap: 'wrap',
};

const heroTagStatic = {
  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
  color: 'rgba(255,255,255,0.7)',
  fontWeight: 400,
  letterSpacing: '0.02em',
};

const heroTagRotating = {
  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #818cf8, #06b6d4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
  minWidth: '90px',
};

const heroParticles = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
};

const heroParticle = {
  position: 'absolute',
  bottom: '0',
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  background: 'rgba(99, 102, 241, 0.5)',
  animation: 'heroParticleFloat 3s ease-in-out infinite',
};

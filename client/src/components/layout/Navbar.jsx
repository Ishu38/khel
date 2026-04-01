import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

const NAV_LINKS = [
  { to: '/explore', label: 'Explore', icon: '🎮', auth: false },
  { to: '/create', label: 'Create', icon: '✨', auth: true },
  { to: '/editor', label: 'Editor', icon: '🛠', auth: true },
  { to: '/leaderboards', label: 'Boards', icon: '🏆', auth: false },
  { to: '/subscription', label: 'Plans', icon: '💎', auth: false },
  { to: '/contact', label: 'Contact', icon: '📞', auth: false },
];

const ROLE_DASHBOARD = {
  teacher: { to: '/teacher', label: 'Classroom' },
  parent: { to: '/dashboard', label: 'Dashboard' },
  student: { to: '/dashboard', label: 'Dashboard' },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const links = NAV_LINKS.filter(l => !l.auth || user);
  const dashLink = user && ROLE_DASHBOARD[user.role];
  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
        <div style={s.inner}>
          {/* Logo */}
          <Link to="/" style={s.logo}>
            <span style={s.logoIcon}>⚡</span>
            <span style={s.logoText}>KHEL</span>
          </Link>

          {/* Desktop Links */}
          <div className="hide-mobile" style={s.links}>
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  ...s.link,
                  ...(location.pathname.startsWith(l.to) ? s.linkActive : {}),
                }}
              >
                {l.label}
              </Link>
            ))}
            {dashLink && (
              <Link
                to={dashLink.to}
                style={{
                  ...s.link,
                  ...(location.pathname.startsWith(dashLink.to) ? s.linkActive : {}),
                }}
              >
                {dashLink.label}
              </Link>
            )}
            {user && user.role !== 'teacher' && user.children?.length > 0 && (
              <Link
                to="/progress"
                style={{
                  ...s.link,
                  ...(location.pathname.startsWith('/progress') ? s.linkActive : {}),
                }}
              >
                Progress
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hide-mobile" style={s.authArea}>
            {user ? (
              <>
                <div style={s.userChip}>
                  <div className="avatar avatar-sm">{initials}</div>
                  <span style={s.userName}>{user.name.split(' ')[0]}</span>
                </div>
                <button onClick={logout} className="btn btn-ghost btn-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMenuOpen(!menuOpen)}
            style={s.hamburger}
            aria-label="Toggle menu"
          >
            <span style={{ ...s.hLine, ...(menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}) }} />
            <span style={{ ...s.hLine, ...(menuOpen ? { opacity: 0 } : {}) }} />
            <span style={{ ...s.hLine, ...(menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}) }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={s.mobileMenu} className="animate-fade-in-down">
            {links.map(l => (
              <Link key={l.to} to={l.to} style={s.mobileLink}>
                <span style={{ fontSize: '1.1rem' }}>{l.icon}</span> {l.label}
              </Link>
            ))}
            {dashLink && (
              <Link to={dashLink.to} style={s.mobileLink}>📊 {dashLink.label}</Link>
            )}
            {user && user.role !== 'teacher' && user.children?.length > 0 && (
              <Link to="/progress" style={s.mobileLink}>📈 Progress</Link>
            )}
            <div style={s.mobileDivider} />
            {user ? (
              <>
                <div style={{ ...s.mobileLink, color: 'var(--text-secondary)' }}>{user.name}</div>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start' }}>Logout</button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
              </div>
            )}
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div style={{ height: 'var(--nav-height)' }} />
    </>
  );
}

const s = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    background: 'rgba(10, 14, 26, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border-primary)',
    zIndex: 'var(--z-sticky)',
    transition: 'all var(--transition-base)',
  },
  navScrolled: {
    background: 'rgba(10, 14, 26, 0.92)',
    boxShadow: 'var(--shadow-md)',
  },
  inner: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--space-6)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '1.4rem',
  },
  logoText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.3rem',
    fontWeight: 800,
    letterSpacing: '0.12em',
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  logoBadge: {
    padding: '1px 6px',
    fontSize: '0.6rem',
    fontWeight: 700,
    background: 'var(--gradient-secondary)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    letterSpacing: '0.05em',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
  },
  link: {
    padding: 'var(--space-2) var(--space-3)',
    fontSize: 'var(--fs-sm)',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--transition-fast)',
  },
  linkActive: {
    color: 'var(--accent-indigo-hover)',
    background: 'rgba(99, 102, 241, 0.1)',
  },
  authArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: '4px var(--space-3) 4px 4px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-primary)',
  },
  userName: {
    fontSize: 'var(--fs-sm)',
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  hamburger: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--space-2)',
  },
  hLine: {
    width: '20px',
    height: '2px',
    background: 'var(--text-secondary)',
    borderRadius: '1px',
    transition: 'all 0.25s ease',
    display: 'block',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    padding: 'var(--space-4) var(--space-6) var(--space-6)',
    borderTop: '1px solid var(--border-primary)',
    background: 'var(--bg-secondary)',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-3) var(--space-2)',
    fontSize: 'var(--fs-base)',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    transition: 'background var(--transition-fast)',
  },
  mobileDivider: {
    height: '1px',
    background: 'var(--border-primary)',
    margin: 'var(--space-2) 0',
  },
};

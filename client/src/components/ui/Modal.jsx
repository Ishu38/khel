import { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, children, width = 480 }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      style={styles.backdrop}
    >
      <div className="animate-scale-in" style={{ ...styles.modal, maxWidth: width }}>
        <div style={styles.header}>
          <h3 style={{ margin: 0, fontSize: 'var(--fs-xl)' }}>{title}</h3>
          <button onClick={onClose} className="btn btn-ghost btn-icon" aria-label="Close">✕</button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-modal-backdrop)',
    padding: 'var(--space-4)',
  },
  modal: {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-secondary)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    overflow: 'hidden',
    zIndex: 'var(--z-modal)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-5) var(--space-6)',
    borderBottom: '1px solid var(--border-primary)',
  },
  body: {
    padding: 'var(--space-6)',
  },
};

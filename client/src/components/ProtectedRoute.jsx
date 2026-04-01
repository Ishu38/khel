import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        minHeight: 'calc(100vh - var(--nav-height))', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return (
      <div style={{ 
        padding: 'var(--space-8)', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-4)' }}>
          ⛔ Access Denied
        </h2>
        <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-lg)' }}>
          This page is only available to {roles.join(' or ')} users.
        </p>
        <button 
          onClick={() => window.history.back()} 
          className="btn btn-primary btn-lg"
          style={{ marginTop: 'var(--space-6)' }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return children;
}

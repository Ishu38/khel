export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';
  return <div className={`spinner ${sizeClass} ${className}`} role="status" aria-label="Loading" />;
}

export function DotLoader() {
  return (
    <span className="dot-loader">
      <span /><span /><span />
    </span>
  );
}

export function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <LoadingSpinner size="lg" />
    </div>
  );
}

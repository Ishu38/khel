export default function StatCard({ icon, label, value, color = 'var(--accent-indigo-hover)', trend }) {
  return (
    <div className="stat-card animate-fade-in-up">
      {icon && <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>{icon}</div>}
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div style={{
          marginTop: 'var(--space-2)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 600,
          color: trend === 'up' ? 'var(--accent-emerald)' :
                 trend === 'down' ? 'var(--accent-rose)' : 'var(--text-tertiary)',
        }}>
          {trend === 'up' ? '↑ Improving' : trend === 'down' ? '↓ Declining' : '→ Stable'}
        </div>
      )}
    </div>
  );
}

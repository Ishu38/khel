export default function EmptyState({ icon = '📭', title, message, children }) {
  return (
    <div className="empty-state animate-fade-in-up">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-text">{message}</p>}
      {children}
    </div>
  );
}

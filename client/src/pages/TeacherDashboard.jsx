import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { teacherAPI } from '../services/api.js';
import StatCard from '../components/ui/StatCard.jsx';
import Modal from '../components/ui/Modal.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [classDetail, setClassDetail] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newClassroom, setNewClassroom] = useState({ name: '', school: '', grade: '', board: '' });
  const [newStudent, setNewStudent] = useState({ childName: '', age: 6 });

  useEffect(() => {
    teacherAPI.listClassrooms()
      .then(({ data }) => setClassrooms(data))
      .catch(() => setClassrooms([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedClassroom) return;
    Promise.all([
      teacherAPI.getClassroom(selectedClassroom),
      teacherAPI.classAnalytics(selectedClassroom),
    ]).then(([detailRes, analyticsRes]) => {
      setClassDetail(detailRes.data);
      setAnalytics(analyticsRes.data);
    }).catch(() => {});
  }, [selectedClassroom]);

  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    try {
      const { data } = await teacherAPI.createClassroom(newClassroom);
      setClassrooms(prev => [...prev, data]);
      setShowCreateModal(false);
      setNewClassroom({ name: '', school: '', grade: '', board: '' });
    } catch { /* ignore */ }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    try {
      const { data } = await teacherAPI.addStudent(selectedClassroom, newStudent);
      setClassDetail(data);
      setShowAddStudent(false);
      setNewStudent({ childName: '', age: 6 });
    } catch { /* ignore */ }
  };

  const handleRemoveStudent = async (studentId) => {
    if (!selectedClassroom) return;
    try {
      const { data } = await teacherAPI.removeStudent(selectedClassroom, studentId);
      setClassDetail(data);
    } catch { /* ignore */ }
  };

  if (!user || user.role !== 'teacher') {
    return <div className="container text-center" style={{ padding: 'var(--space-16)' }}><p style={{ color: 'var(--text-tertiary)' }}>Teacher access required.</p></div>;
  }

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--fs-4xl)' }}>🏫 <span className="gradient-text">Classroom</span></h1>
          <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>Manage your classrooms and track student progress</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">+ New Classroom</button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-12)' }}><div className="spinner spinner-lg" /></div>
      ) : classrooms.length === 0 ? (
        <EmptyState icon="🏫" title="No classrooms yet" message="Create your first classroom to get started.">
          <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">+ Create Classroom</button>
        </EmptyState>
      ) : (
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {/* Sidebar - Classroom List */}
          <div style={{ width: '280px', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {classrooms.map(c => (
                <button
                  key={c._id}
                  onClick={() => setSelectedClassroom(c._id)}
                  style={{
                    ...s.classCard,
                    ...(selectedClassroom === c._id ? s.classActive : {}),
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 'var(--fs-base)' }}>{c.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', display: 'flex', gap: 'var(--space-3)' }}>
                    {c.grade && <span>{c.grade}</span>}
                    <span>{c.studentCount || c.students?.length || 0} students</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            {!selectedClassroom ? (
              <div className="card text-center" style={{ padding: 'var(--space-12)' }}>
                <p style={{ color: 'var(--text-tertiary)' }}>Select a classroom to view details</p>
              </div>
            ) : (
              <>
                {/* Analytics */}
                {analytics && (
                  <div className="grid grid-3" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <StatCard icon="📊" label="Avg Accuracy" value={`${Math.round(analytics.avgAccuracy * 100)}%`} color="var(--accent-emerald)" />
                    <StatCard icon="🎮" label="Total Sessions" value={analytics.totalSessions} color="var(--accent-indigo-hover)" />
                    <StatCard icon="👥" label="Students" value={classDetail?.students?.length || 0} color="var(--accent-cyan)" />
                  </div>
                )}

                {/* Topic Performance */}
                {analytics?.topicBreakdown?.length > 0 && (
                  <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>📚 Topic Performance</h3>
                    {analytics.topicBreakdown.map((t, i) => (
                      <div key={i} style={s.topicRow}>
                        <span style={{ fontWeight: 500, fontSize: 'var(--fs-sm)', flex: 1 }}>{t.topic}</span>
                        <div style={s.barTrack}>
                          <div style={{ ...s.barFill, width: `${t.avgAccuracy * 100}%`, background: t.avgAccuracy >= 0.7 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }} />
                        </div>
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, width: '40px', textAlign: 'right' }}>
                          {Math.round(t.avgAccuracy * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Students */}
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <h3>👥 Students</h3>
                    <button onClick={() => setShowAddStudent(true)} className="btn btn-outline btn-sm">+ Add Student</button>
                  </div>
                  {classDetail?.students?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {classDetail.students.map((student) => {
                        const perf = analytics?.studentPerformance?.find(p => String(p.childId) === String(student.childId || student._id));
                        return (
                          <div key={student._id} style={s.studentRow}>
                            <div className="avatar avatar-sm">{student.childName?.[0] || '?'}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 500, fontSize: 'var(--fs-sm)' }}>{student.childName}</div>
                              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Age {student.age}</div>
                            </div>
                            {perf && (
                              <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--fs-xs)' }}>
                                <span style={{ color: perf.avgAccuracy >= 0.7 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                                  {Math.round(perf.avgAccuracy * 100)}% acc
                                </span>
                                <span style={{ color: 'var(--text-muted)' }}>{perf.sessions} games</span>
                              </div>
                            )}
                            <button onClick={() => handleRemoveStudent(student._id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--accent-rose)' }}>✕</button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>No students added yet.</p>
                  )}
                </div>

                {/* Assigned Games */}
                {classDetail?.games?.length > 0 && (
                  <div className="card" style={{ marginTop: 'var(--space-4)' }}>
                    <h3 style={{ marginBottom: 'var(--space-4)' }}>🎮 Assigned Games</h3>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                      {classDetail.games.map(g => (
                        <Link key={g._id} to={`/play/${g._id}`} className="badge badge-indigo" style={{ textDecoration: 'none', padding: 'var(--space-2) var(--space-3)' }}>
                          {g.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Create Classroom Modal */}
      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Classroom">
        <form onSubmit={handleCreateClassroom} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="input-group">
            <label className="input-label">Classroom Name</label>
            <input className="input" value={newClassroom.name} onChange={e => setNewClassroom(p => ({ ...p, name: e.target.value }))} required placeholder="e.g. Class III-A" />
          </div>
          <div className="input-group">
            <label className="input-label">School</label>
            <input className="input" value={newClassroom.school} onChange={e => setNewClassroom(p => ({ ...p, school: e.target.value }))} placeholder="School name" />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Grade</label>
              <input className="input" value={newClassroom.grade} onChange={e => setNewClassroom(p => ({ ...p, grade: e.target.value }))} placeholder="e.g. Class III" />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Board</label>
              <select className="select" value={newClassroom.board} onChange={e => setNewClassroom(p => ({ ...p, board: e.target.value }))}>
                <option value="">None</option><option value="ncert">NCERT</option><option value="cbse">CBSE</option><option value="icse">ICSE</option><option value="state">State</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>Create Classroom</button>
        </form>
      </Modal>

      {/* Add Student Modal */}
      <Modal open={showAddStudent} onClose={() => setShowAddStudent(false)} title="Add Student">
        <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="input-group">
            <label className="input-label">Student Name</label>
            <input className="input" value={newStudent.childName} onChange={e => setNewStudent(p => ({ ...p, childName: e.target.value }))} required placeholder="Full name" />
          </div>
          <div className="input-group">
            <label className="input-label">Age</label>
            <input type="number" className="input" min={3} max={14} value={newStudent.age} onChange={e => setNewStudent(p => ({ ...p, age: +e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>Add Student</button>
        </form>
      </Modal>
    </div>
  );
}

const s = {
  classCard: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-1)',
    padding: 'var(--space-4)', background: 'var(--bg-card)', border: '1.5px solid var(--border-primary)',
    borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s',
    textAlign: 'left', fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
  },
  classActive: {
    borderColor: 'var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.08)',
  },
  topicRow: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
    padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)',
  },
  barTrack: { width: '100px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 'var(--radius-full)', transition: 'width 0.8s ease' },
  studentRow: {
    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
    padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-glass-light)',
  },
};

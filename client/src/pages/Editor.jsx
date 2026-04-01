import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gamesAPI } from '../services/api.js';
import { useAuth } from '../hooks/useAuth.jsx';

const GAME_TYPES = [
  { id: 'tap_match', label: 'Tap & Match' }, { id: 'drag_sort', label: 'Drag & Sort' },
  { id: 'maze_runner', label: 'Maze Runner' }, { id: 'word_builder', label: 'Word Builder' },
  { id: 'quiz_adventure', label: 'Quiz Adventure' }, { id: 'strategy_sim', label: 'Strategy / Sim' },
  { id: 'code_and_play', label: 'Code & Play' }, { id: 'multiplayer_race', label: 'Multiplayer Race' },
];

const STAGES = [
  { id: 'sensorimotor_preoperational', label: 'Pre-Nursery (3-4)', minAge: 3, maxAge: 4 },
  { id: 'preoperational', label: 'Nursery-KG (4-6)', minAge: 4, maxAge: 6 },
  { id: 'concrete_operational', label: 'Class I-III (6-9)', minAge: 6, maxAge: 9 },
  { id: 'formal_operational', label: 'Class IV-VII (9-12)', minAge: 9, maxAge: 12 },
];

const emptyItem = () => ({ prompt: '', correctAnswer: '', distractors: ['', ''], hint: '', points: 10 });
const emptyLevel = () => ({ order: 1, title: 'Level 1', difficulty: 'medium', config: {}, items: [emptyItem()] });

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [activeLevel, setActiveLevel] = useState(0);

  const [game, setGame] = useState({
    title: '', description: '', gameType: 'tap_match',
    developmentalStage: 'concrete_operational', minAge: 6, maxAge: 9, language: 'en',
    curriculum: { board: '', grade: '', subject: '', topic: '', learningOutcomes: [] },
    settings: { timeLimit: 0, livesCount: 3, adaptiveDifficulty: true, theme: 'default' },
    levels: [emptyLevel()], tags: [], published: false,
  });

  useEffect(() => {
    if (!id) return;
    gamesAPI.get(id).then(({ data }) => setGame(data)).catch(() => setError('Game not found'));
  }, [id]);

  if (!user) return (
    <div className="container" style={{ padding: 'var(--space-16) var(--space-6)', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-tertiary)' }}>Please log in to use the editor.</p>
    </div>
  );

  const updateGame = (path, value) => {
    setGame(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const updateLevel = (levelIdx, field, value) => {
    setGame(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.levels[levelIdx][field] = value; return copy; });
  };

  const updateItem = (levelIdx, itemIdx, field, value) => {
    setGame(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.levels[levelIdx].items[itemIdx][field] = value; return copy; });
  };

  const addLevel = () => {
    setGame(prev => ({ ...prev, levels: [...prev.levels, { ...emptyLevel(), order: prev.levels.length + 1, title: `Level ${prev.levels.length + 1}` }] }));
    setActiveLevel(game.levels.length);
  };

  const removeLevel = (idx) => {
    if (game.levels.length <= 1) return;
    setGame(prev => ({ ...prev, levels: prev.levels.filter((_, i) => i !== idx) }));
    if (activeLevel >= game.levels.length - 1) setActiveLevel(Math.max(0, activeLevel - 1));
  };

  const addItem = (levelIdx) => {
    setGame(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.levels[levelIdx].items.push(emptyItem()); return copy; });
  };

  const removeItem = (levelIdx, itemIdx) => {
    setGame(prev => { const copy = JSON.parse(JSON.stringify(prev)); copy.levels[levelIdx].items = copy.levels[levelIdx].items.filter((_, i) => i !== itemIdx); return copy; });
  };

  const handleStageChange = (stageId) => {
    const stage = STAGES.find(s => s.id === stageId);
    updateGame('developmentalStage', stageId);
    if (stage) { updateGame('minAge', stage.minAge); updateGame('maxAge', stage.maxAge); }
  };

  const handleSave = async (publish = false) => {
    setSaving(true); setError('');
    try {
      const payload = { ...game, published: publish };
      if (id) { await gamesAPI.update(id, payload); }
      else { const { data } = await gamesAPI.create(payload); navigate(`/editor/${data._id}`, { replace: true }); }
    } catch (err) { setError(err.response?.data?.error || 'Save failed'); }
    finally { setSaving(false); }
  };

  const level = game.levels[activeLevel] || game.levels[0];
  const TABS = ['details', 'levels', 'settings'];

  return (
    <div className="container" style={{ padding: 'var(--space-6)' }}>
      {/* Top bar */}
      <div style={s.topBar}>
        <h2 style={{ margin: 0, fontSize: 'var(--fs-2xl)' }}>
          {id ? '🛠 Edit Game' : '🛠 Game Editor'}
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button onClick={() => handleSave(false)} disabled={saving} className="btn btn-secondary btn-sm">
            {saving ? '...' : '💾 Save Draft'}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="btn btn-primary btn-sm">
            🚀 Publish
          </button>
          {id && <button onClick={() => navigate(`/play/${id}`)} className="btn btn-ghost btn-sm">👁️ Preview</button>}
        </div>
      </div>

      {error && <div className="animate-shake" style={s.error}><span>⚠️</span> {error}</div>}

      {/* Tabs */}
      <div className="tabs" style={{ marginTop: 'var(--space-4)' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`tab ${activeTab === tab ? 'tab-active' : ''}`}>
            {tab === 'details' ? '📝 Details' : tab === 'levels' ? '🎯 Levels' : '⚙️ Settings'}
          </button>
        ))}
      </div>

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="animate-fade-in" style={s.panel}>
          <div style={s.fieldGrid}>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Title</label>
              <input className="input" value={game.title} onChange={e => updateGame('title', e.target.value)} placeholder="My Awesome Game" />
            </div>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="input-label">Description</label>
              <textarea className="textarea" value={game.description} onChange={e => updateGame('description', e.target.value)} placeholder="What does this game teach?" rows={3} />
            </div>
            <div className="input-group">
              <label className="input-label">Game Type</label>
              <select className="select" value={game.gameType} onChange={e => updateGame('gameType', e.target.value)}>
                {GAME_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Age Group</label>
              <select className="select" value={game.developmentalStage} onChange={e => handleStageChange(e.target.value)}>
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Language</label>
              <select className="select" value={game.language} onChange={e => updateGame('language', e.target.value)}>
                <option value="en">English</option><option value="hi">Hindi</option><option value="ta">Tamil</option><option value="bn">Bengali</option>
              </select>
            </div>
          </div>

          <hr className="divider" />
          <h4 style={{ marginBottom: 'var(--space-4)' }}>📚 Curriculum Alignment</h4>
          <div style={s.fieldGrid}>
            <div className="input-group">
              <label className="input-label">Board</label>
              <select className="select" value={game.curriculum.board} onChange={e => updateGame('curriculum.board', e.target.value)}>
                <option value="">None</option><option value="ncert">NCERT</option><option value="cbse">CBSE</option>
                <option value="icse">ICSE</option><option value="state">State Board</option><option value="montessori">Montessori</option><option value="ib_pyp">IB PYP</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Grade</label>
              <input className="input" value={game.curriculum.grade} onChange={e => updateGame('curriculum.grade', e.target.value)} placeholder="e.g. Class III" />
            </div>
            <div className="input-group">
              <label className="input-label">Subject</label>
              <input className="input" value={game.curriculum.subject} onChange={e => updateGame('curriculum.subject', e.target.value)} placeholder="e.g. Mathematics" />
            </div>
            <div className="input-group">
              <label className="input-label">Topic</label>
              <input className="input" value={game.curriculum.topic} onChange={e => updateGame('curriculum.topic', e.target.value)} placeholder="e.g. Multiplication" />
            </div>
          </div>
          <div className="input-group" style={{ marginTop: 'var(--space-4)' }}>
            <label className="input-label">Tags (comma-separated)</label>
            <input className="input" value={(game.tags || []).join(', ')} onChange={e => updateGame('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} placeholder="math, fun, multiplication" />
          </div>
        </div>
      )}

      {/* Levels Tab */}
      {activeTab === 'levels' && (
        <div className="animate-fade-in" style={s.panel}>
          <div style={s.levelNav}>
            {game.levels.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button onClick={() => setActiveLevel(i)} className={`chip ${activeLevel === i ? 'chip-active' : ''}`}>{l.title || `Level ${i + 1}`}</button>
                {game.levels.length > 1 && <button onClick={() => removeLevel(i)} className="btn btn-danger btn-sm" style={{ padding: '2px 6px', fontSize: '11px' }}>✕</button>}
              </div>
            ))}
            <button onClick={addLevel} className="btn btn-outline btn-sm">+ Level</button>
          </div>

          {level && (
            <div style={{ marginTop: 'var(--space-6)' }}>
              <div style={s.fieldGrid}>
                <div className="input-group">
                  <label className="input-label">Level Title</label>
                  <input className="input" value={level.title} onChange={e => updateLevel(activeLevel, 'title', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Difficulty</label>
                  <select className="select" value={level.difficulty} onChange={e => updateLevel(activeLevel, 'difficulty', e.target.value)}>
                    <option value="very_easy">Very Easy</option><option value="easy">Easy</option><option value="medium">Medium</option>
                    <option value="hard">Hard</option><option value="very_hard">Very Hard</option>
                  </select>
                </div>
              </div>

              <h4 style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>🎯 Items / Questions</h4>
              {level.items?.map((item, itemIdx) => (
                <div key={itemIdx} className="card" style={{ marginBottom: 'var(--space-3)', padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                    <span className="badge badge-indigo">Item {itemIdx + 1}</span>
                    {level.items.length > 1 && <button onClick={() => removeItem(activeLevel, itemIdx)} className="btn btn-danger btn-sm" style={{ fontSize: '11px' }}>Remove</button>}
                  </div>
                  <div style={s.fieldGrid}>
                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="input-label">Prompt / Question</label>
                      <input className="input" value={item.prompt} onChange={e => updateItem(activeLevel, itemIdx, 'prompt', e.target.value)} placeholder="e.g. What is 5 × 3?" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Correct Answer</label>
                      <input className="input" value={item.correctAnswer} onChange={e => updateItem(activeLevel, itemIdx, 'correctAnswer', e.target.value)} placeholder="e.g. 15" />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Points</label>
                      <input type="number" className="input" value={item.points} onChange={e => updateItem(activeLevel, itemIdx, 'points', +e.target.value)} />
                    </div>
                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="input-label">Distractors (comma-separated wrong answers)</label>
                      <input className="input" value={(item.distractors || []).join(', ')} onChange={e => updateItem(activeLevel, itemIdx, 'distractors', e.target.value.split(',').map(d => d.trim()))} placeholder="e.g. 10, 20, 8" />
                    </div>
                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="input-label">Hint (optional)</label>
                      <input className="input" value={item.hint || ''} onChange={e => updateItem(activeLevel, itemIdx, 'hint', e.target.value)} placeholder="Think about groups of 5..." />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addItem(activeLevel)} className="btn btn-outline btn-sm" style={{ marginTop: 'var(--space-2)' }}>+ Add Item</button>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="animate-fade-in" style={s.panel}>
          <div style={s.fieldGrid}>
            <div className="input-group">
              <label className="input-label">⏱ Time Limit (seconds, 0 = none)</label>
              <input type="number" className="input" value={game.settings.timeLimit || 0} onChange={e => updateGame('settings.timeLimit', +e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">❤️ Lives</label>
              <input type="number" className="input" value={game.settings.livesCount} onChange={e => updateGame('settings.livesCount', +e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">🎨 Theme</label>
              <select className="select" value={game.settings.theme} onChange={e => updateGame('settings.theme', e.target.value)}>
                <option value="default">Default</option><option value="forest">Forest</option><option value="ocean">Ocean</option>
                <option value="space">Space</option><option value="candy">Candy</option>
              </select>
            </div>
            <div className="input-group" style={{ justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-primary)' }}>
                <input type="checkbox" checked={game.settings.adaptiveDifficulty} onChange={e => updateGame('settings.adaptiveDifficulty', e.target.checked)} style={{ width: 18, height: 18, accentColor: 'var(--accent-indigo)' }} />
                🧠 Adaptive Difficulty
              </label>
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Auto-adjusts to keep the child in their Zone of Proximal Development</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' },
  error: { display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 'var(--radius-md)', color: 'var(--accent-rose)', fontSize: 'var(--fs-sm)' },
  panel: { padding: 'var(--space-6) 0' },
  fieldGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' },
  levelNav: { display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' },
};

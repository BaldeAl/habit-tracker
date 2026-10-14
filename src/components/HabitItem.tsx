import { useState } from 'react';
import { categoryLabel, formatDate, Habit, parseDate } from '../domain/habits';
import AddHabitForm from './AddHabitForm';
interface Props { habit: Habit; dates: string[]; onChange: (habit: Habit) => boolean; onDelete: () => void }
export default function HabitItem({ habit, dates, onChange, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  return <article className={`habit-row ${habit.active ? '' : 'paused'}`} aria-label={habit.name}>
    {editing ? <AddHabitForm initial={habit} onCancel={() => setEditing(false)} onSave={(name, category) => { const saved = onChange({ ...habit, name, category }); if (saved) setEditing(false); return saved; }} /> : <>
      <div className="habit-heading"><div><span className="eyebrow">{categoryLabel(habit.category)}{!habit.active && ' · En pause'}</span><h3>{habit.name}</h3></div><div className="row-actions"><button onClick={() => onChange({ ...habit, active: !habit.active })}>{habit.active ? 'Mettre en pause' : 'Reprendre'}</button><button onClick={() => setEditing(true)}>Modifier</button><button onClick={() => setConfirming(true)}>Supprimer</button></div></div>
      <div className="completion-grid">{dates.map(key => <button key={key} className="completion" aria-label={`${habit.name}, ${formatDate(parseDate(key))}`} aria-pressed={!!habit.completed[key]} disabled={!habit.active} onClick={() => onChange({ ...habit, completed: { ...habit.completed, [key]: !habit.completed[key] } })}><span>{parseDate(key).toLocaleDateString('fr-FR', { weekday: 'short' })}</span><strong>{parseDate(key).getDate()}</strong><span className="checkmark" aria-hidden="true">{habit.completed[key] ? '✓' : '—'}</span></button>)}</div>
      {confirming && <div className="delete-confirm" role="group" aria-label="Confirmer la suppression"><span>Supprimer cette habitude et son historique ?</span><button className="danger" onClick={onDelete}>Confirmer la suppression</button><button autoFocus onClick={() => setConfirming(false)}>Conserver</button></div>}
    </>}
  </article>;
}

import { useState } from 'react';
import { Habit } from './domain/habits';
import { Preference } from './hooks/useReminders';
interface Props { habits: Habit[]; preferences: Preference[]; save: (id: number, frequency: number) => Promise<void>; error: string }
export default function NotificationSettings({ habits, preferences, save, error }: Props) {
  const [pending, setPending] = useState<number | null>(null);
  return <section className="panel"><h2>Rappels</h2><p className="muted">Les rappels fonctionnent lorsque cette application reste ouverte. L’autorisation est demandée uniquement à l’activation.</p>{error && <p role="alert" className="error">{error}</p>}{habits.filter(habit => habit.active).map(habit => <div className="setting-row" key={habit.id}><label htmlFor={`reminder-${habit.id}`}>{habit.name}</label><select id={`reminder-${habit.id}`} disabled={pending !== null} value={preferences.find(value => value.habitId === habit.id)?.frequency || 0} onChange={async event => { setPending(habit.id); await save(habit.id, Number(event.target.value)); setPending(null); }}><option value={0}>Désactivé</option><option value={30}>Toutes les 30 secondes</option><option value={60}>Toutes les minutes</option><option value={3600}>Toutes les heures</option><option value={86400}>Toutes les 24 heures</option></select></div>)}{!habits.some(habit => habit.active) && <p className="muted">Aucune habitude active à rappeler.</p>}{pending !== null && <p role="status">Activation du rappel…</p>}</section>;
}

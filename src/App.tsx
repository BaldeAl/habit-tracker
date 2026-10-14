import { BrowserRouter, NavLink, Route, Routes, Link } from 'react-router-dom';
import HabitTracker from './HabitTracker';
import Settings from './components/Setting';
import NotificationSettings from './NotificationSettings';
import { useHabits } from './hooks/useHabits';
import { useReminders } from './hooks/useReminders';
export default function App() {
  const { habits, updateHabits, error, blocked } = useHabits();
  const reminders = useReminders(habits);
  return <BrowserRouter><a className="skip-link" href="#main">Aller au contenu</a><header className="site-header"><Link className="brand" to="/">Habit Tracker<span>Habitudes et progression</span></Link><nav aria-label="Navigation principale"><NavLink end to="/">Suivi</NavLink><NavLink to="/settings">Paramètres</NavLink></nav></header><main id="main" className="main-content">{error && <p className="error-banner" role="alert">{error}</p>}<Routes><Route path="/" element={<HabitTracker habits={habits} updateHabits={updateHabits} blocked={blocked} />} /><Route path="/settings" element={<><Settings habits={habits} onImport={next => updateHabits(next, true)} /><NotificationSettings habits={habits} {...reminders} /></>} /><Route path="*" element={<section className="panel"><h1>Page introuvable</h1><Link to="/">Revenir au suivi</Link></section>} /></Routes></main><footer className="site-footer">Habit Tracker<span>Données conservées sur cet appareil</span></footer></BrowserRouter>;
}

import { useState } from 'react';
import { categories, categoryLabel, formatDate, Habit, Period, periodDates, parseDate } from './domain/habits';
import AddHabitForm from './components/AddHabitForm';
import HabitItem from './components/HabitItem';
import HabitStatistics from './components/HabitStatistics';
import PeriodSelector from './components/PeriodSelector';
interface Props { habits: Habit[]; updateHabits: (habits: Habit[]) => boolean; blocked: boolean }
export default function HabitTracker({ habits, updateHabits, blocked }: Props) {
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState<Period>('Week');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const dates = periodDates(date, period);
  const filtered = habits.filter(habit => (category === 'All' || habit.category === category) && habit.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  const persist = (next: Habit[], message: string) => {
    const saved = updateHabits(next);
    if (saved) setStatus(message);
    return saved;
  };
  return <><div className="page-heading"><div><span className="eyebrow">Votre suivi quotidien</span><h1>Mon suivi</h1><p className="muted">{formatDate(parseDate(dates[0]))}{dates.length > 1 && ` — ${formatDate(parseDate(dates[dates.length - 1]))}`}</p></div><a className="button primary" href="#new-habit">Nouvelle habitude</a></div><PeriodSelector period={period} setPeriod={setPeriod} currentDate={date} setCurrentDate={setDate} /><section className="panel" id="new-habit"><h2>Ajouter une habitude</h2><fieldset disabled={blocked}><AddHabitForm onSave={(name, selectedCategory) => persist([...habits, { id: Math.max(Date.now(), ...habits.map(habit => habit.id + 1)), name, category: selectedCategory, color: '#25604b', completed: {}, active: true }], 'Habitude ajoutée.')} /></fieldset></section><section id="habits" className="panel"><div className="section-heading"><h2>Mes habitudes <span className="count">{filtered.length}</span></h2><div className="filters"><label className="sr-only" htmlFor="search">Rechercher une habitude</label><input id="search" type="search" placeholder="Rechercher une habitude" value={search} onChange={event => setSearch(event.target.value)} /><label className="sr-only" htmlFor="category-filter">Filtrer par catégorie</label><select id="category-filter" value={category} onChange={event => setCategory(event.target.value)}>{Array.from(new Set(['All', ...categories, ...habits.map(habit => habit.category)])).map(value => <option value={value} key={value}>{categoryLabel(value)}</option>)}</select></div></div>{filtered.length ? filtered.map(habit => <HabitItem key={habit.id} habit={habit} dates={dates} onChange={next => persist(habits.map(value => value.id === next.id ? next : value), 'Habitude mise à jour.')} onDelete={() => persist(habits.filter(value => value.id !== habit.id), 'Habitude supprimée.')} />) : <div className="empty-state"><h3>{habits.length ? 'Aucun résultat' : 'Votre première habitude commence ici'}</h3><p className="muted">{habits.length ? 'Modifiez la recherche ou la catégorie pour retrouver vos habitudes.' : 'Ajoutez un geste simple, puis cochez les jours où vous le réalisez.'}</p>{habits.length > 0 && <button onClick={() => { setSearch(''); setCategory('All'); }}>Effacer les filtres</button>}</div>}</section><HabitStatistics habits={filtered} dates={dates} /><p className="feedback" role="status" aria-live="polite">{status}</p></>;
}

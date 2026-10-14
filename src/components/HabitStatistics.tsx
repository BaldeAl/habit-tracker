import { Habit, parseDate } from '../domain/habits';
interface Props { habits: Habit[]; dates: string[] }
export default function HabitStatistics({ habits, dates }: Props) {
  const active = habits.filter(habit => habit.active);
  const completed = dates.map(key => active.filter(habit => habit.completed[key]).length);
  const total = completed.reduce((sum, value) => sum + value, 0);
  const possible = active.length * dates.length;
  const rate = possible ? Math.round(total / possible * 100) : 0;
  return <section id="statistics" className="panel"><div className="section-heading"><div><span className="eyebrow">La période en chiffres</span><h2>Votre régularité</h2></div><span className="muted">Habitudes actives · filtres appliqués</span></div><div className="metrics"><div><strong>{rate}<small> %</small></strong><span>Taux de réalisation</span></div><div><strong>{total}<small> / {possible}</small></strong><span>Actions réalisées</span></div><div><strong>{active.length}</strong><span>Habitudes actives</span></div></div>{possible > 0 ? <div className="chart" aria-label="Réalisations par jour">{dates.map((key, index) => <div className="chart-column" key={key}><span className="sr-only">{key} : {completed[index]} sur {active.length}</span><div className="bar-track"><div style={{ height: `${completed[index] / active.length * 100}%` }} /></div><span aria-hidden="true">{parseDate(key).getDate()}</span></div>)}</div> : <p className="muted">Ajoutez une habitude active pour suivre votre progression.</p>}</section>;
}

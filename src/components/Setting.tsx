import { useRef, useState } from 'react';
import { Habit, isHabit } from '../domain/habits';
interface Props { habits: Habit[]; onImport: (habits: Habit[]) => boolean }
export default function Settings({ habits, onImport }: Props) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const exportData = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(habits, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'habit-tracker.json';
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Sauvegarde téléchargée.');
  };
  return <section className="panel"><span className="eyebrow">Vos données</span><h1>Paramètres</h1><p>Vos habitudes sont enregistrées dans ce navigateur, sur cet appareil.</p><p className="muted">Exportez régulièrement une sauvegarde. L’import fusionne les habitudes par identifiant et remplace celles portant le même identifiant.</p><div className="button-row"><button className="primary" onClick={exportData}>Exporter les habitudes</button><button onClick={() => fileInput.current?.click()}>Importer une sauvegarde</button><input className="sr-only" ref={fileInput} tabIndex={-1} type="file" accept="application/json,.json" aria-label="Fichier de sauvegarde" onChange={async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError(''); setMessage('');
    try {
      if (file.size > 5000000) throw new Error();
      const values: unknown = JSON.parse(await file.text());
      if (!Array.isArray(values) || !values.every(isHabit)) throw new Error();
      const merged = new Map(habits.map(habit => [habit.id, habit]));
      values.forEach(habit => merged.set(habit.id, habit));
      if (onImport(Array.from(merged.values()))) setMessage(`${values.length} habitude(s) importée(s).`);
    } catch { setError('Fichier invalide. Choisissez une sauvegarde JSON Habit Tracker de moins de 5 Mo.'); }
  }} /></div><p role="status">{message}</p>{error && <p role="alert" className="error">{error}</p>}</section>;
}

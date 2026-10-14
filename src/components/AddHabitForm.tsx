import React, { useId, useState } from 'react';
import { categories, categoryLabel } from '../domain/habits';

interface Props {
  initial?: { name: string; category: string };
  onSave: (name: string, category: string) => boolean;
  onCancel?: () => void;
}

export default function AddHabitForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name || '');
  const [category, setCategory] = useState(initial?.category || 'Health');
  const [error, setError] = useState('');
  const id = useId();
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) { setError('Saisissez un nom pour cette habitude.'); return; }
    if (onSave(name.trim(), category) && !initial) { setName(''); setError(''); }
  };
  return <form className="habit-form" onSubmit={submit} noValidate>
    <div className="field grow"><label htmlFor={`${id}-name`}>Nom de l’habitude</label><input id={`${id}-name`} value={name} maxLength={80} placeholder="Ex. Lire 20 minutes" onChange={event => { setName(event.target.value); setError(''); }} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} autoFocus={!!initial} />{error && <span className="error" id={`${id}-error`} role="alert">{error}</span>}</div>
    <div className="field"><label htmlFor={`${id}-category`}>Catégorie</label><select id={`${id}-category`} value={category} onChange={event => setCategory(event.target.value)}>{Array.from(new Set([...categories, category])).map(value => <option key={value} value={value}>{categoryLabel(value)}</option>)}</select></div>
    <button className="primary" type="submit">{initial ? 'Enregistrer' : 'Ajouter'}</button>{onCancel && <button type="button" onClick={onCancel}>Annuler</button>}
  </form>;
}

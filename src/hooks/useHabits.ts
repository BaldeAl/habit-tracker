import { useState } from 'react';
import { Habit, isHabit } from '../domain/habits';

function readHabits(): { habits: Habit[]; error: string } {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem('habits') || '[]');
    if (!Array.isArray(stored) || !stored.every(isHabit)) throw new Error();
    return { habits: stored, error: '' };
  } catch {
    return { habits: [], error: 'Les données locales sont illisibles ou inaccessibles. Elles ne seront pas écrasées. Vérifiez les autorisations de stockage ou restaurez une sauvegarde.' };
  }
}

export function useHabits() {
  const [initial] = useState(readHabits);
  const [habits, setHabits] = useState(initial.habits);
  const [error, setError] = useState(initial.error);
  const [blocked, setBlocked] = useState(!!initial.error);
  const updateHabits = (next: Habit[], recover = false) => {
    if (blocked && !recover) return false;
    try {
      if (blocked) localStorage.setItem('habits-recovery-backup', localStorage.getItem('habits') || '');
      localStorage.setItem('habits', JSON.stringify(next));
      setBlocked(false);
      setHabits(next);
      setError('');
      return true;
    } catch {
      setError('Enregistrement impossible. Libérez de l’espace ou autorisez le stockage local, puis réessayez.');
      return false;
    }
  };
  return { habits, updateHabits, error, blocked };
}

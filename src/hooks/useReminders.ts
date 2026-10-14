import { useEffect, useState } from 'react';
import { Habit } from '../domain/habits';
export interface Preference { habitId: number; frequency: number }
export function useReminders(habits: Habit[]) {
  const [error, setError] = useState('');
  const [preferences, setPreferences] = useState<Preference[]>(() => {
    try {
      const values: unknown = JSON.parse(localStorage.getItem('notificationPreferences') || '[]');
      return Array.isArray(values) ? values.filter(value => typeof value?.habitId === 'number' && [0, 30, 60, 3600, 86400].includes(value.frequency)) : [];
    } catch { return []; }
  });
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const timers = preferences.flatMap(preference => {
      const habit = habits.find(value => value.id === preference.habitId && value.active);
      return habit && preference.frequency > 0 ? [window.setInterval(() => {
        try { new Notification('Habit Tracker', { body: `Un moment pour : ${habit.name}`, tag: String(habit.id) }); } catch { setError('Ce navigateur ne permet pas l’envoi de notifications.'); }
      }, preference.frequency * 1000)] : [];
    });
    return () => timers.forEach(window.clearInterval);
  }, [habits, preferences]);
  const save = async (habitId: number, frequency: number) => {
    setError('');
    try {
      if (frequency && (!('Notification' in window) || await Notification.requestPermission() !== 'granted')) {
        setError('Notifications indisponibles ou refusées. Autorisez-les dans les paramètres du navigateur.');
        return;
      }
      const next = [...preferences.filter(value => value.habitId !== habitId), { habitId, frequency }];
      localStorage.setItem('notificationPreferences', JSON.stringify(next));
      setPreferences(next);
    } catch { setError('Impossible d’enregistrer le rappel. Vérifiez le stockage et les autorisations du navigateur.'); }
  };
  return { preferences, save, error };
}

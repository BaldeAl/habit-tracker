export interface Habit {
  id: number;
  name: string;
  category: string;
  color: string;
  completed: Record<string, boolean>;
  active: boolean;
}

export type Period = 'Day' | 'Week' | 'Month';
export const categories = ['Work', 'Health', 'Hobby'];
export const categoryLabel = (category: string) => ({ Work: 'Travail', Health: 'Santé', Hobby: 'Loisirs', All: 'Toutes' }[category] || category);
export const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const parseDate = (key: string) => new Date(`${key}T12:00:00`);
export const formatDate = (date: Date) => date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export function periodDates(date: Date, period: Period): string[] {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (period === 'Week') start.setDate(start.getDate() - (start.getDay() + 6) % 7);
  if (period === 'Month') start.setDate(1);
  const length = period === 'Day' ? 1 : period === 'Week' ? 7 : new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  return Array.from({ length }, (_, index) => dateKey(new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)));
}

export function shiftDate(date: Date, period: Period, direction: number): Date {
  if (period !== 'Month') return new Date(date.getFullYear(), date.getMonth(), date.getDate() + direction * (period === 'Week' ? 7 : 1));
  const lastDay = new Date(date.getFullYear(), date.getMonth() + direction + 1, 0).getDate();
  return new Date(date.getFullYear(), date.getMonth() + direction, Math.min(date.getDate(), lastDay));
}

export function isHabit(value: unknown): value is Habit {
  if (!value || typeof value !== 'object') return false;
  const habit = value as Habit;
  return typeof habit.id === 'number' && Number.isFinite(habit.id) && typeof habit.name === 'string' && typeof habit.category === 'string' && typeof habit.color === 'string' && typeof habit.active === 'boolean' && !!habit.completed && typeof habit.completed === 'object' && !Array.isArray(habit.completed) && Object.entries(habit.completed).every(([key, completed]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && typeof completed === 'boolean');
}

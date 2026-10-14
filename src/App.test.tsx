import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => { localStorage.clear(); window.history.replaceState({}, '', '/'); });

test('validates, creates, completes, edits, pauses and deletes a persisted habit', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Saisissez un nom');
  fireEvent.change(screen.getByLabelText('Nom de l’habitude'), { target: { value: 'Lire' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
  const habit = screen.getByRole('article', { name: 'Lire' });
  const completion = within(habit).getAllByRole('button', { name: /^Lire,/ })[0];
  fireEvent.click(completion);
  expect(completion).toHaveAttribute('aria-pressed', 'true');
  expect(Object.values(JSON.parse(localStorage.getItem('habits')!)[0].completed)).toContain(true);
  fireEvent.click(within(habit).getByRole('button', { name: 'Modifier' }));
  fireEvent.change(within(habit).getByLabelText('Nom de l’habitude'), { target: { value: 'Lire un livre' } });
  fireEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Mettre en pause' }));
  expect(screen.getAllByRole('button', { name: /^Lire un livre,/ })[0]).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Supprimer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Conserver' }));
  expect(screen.getByRole('article')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Supprimer' }));
  fireEvent.click(screen.getByRole('button', { name: 'Confirmer la suppression' }));
  expect(screen.queryByRole('article')).not.toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem('habits')!)).toEqual([]);
});

test('preserves corrupted storage and prevents overwriting it', () => {
  localStorage.setItem('habits', '{broken');
  render(<App />);
  expect(screen.getByRole('alert')).toHaveTextContent('ne seront pas écrasées');
  expect(screen.getByRole('button', { name: 'Ajouter' })).toBeDisabled();
  expect(localStorage.getItem('habits')).toBe('{broken');
});

test('reports persistence failures without adding an unsaved habit', () => {
  render(<App />);
  const storage = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
  fireEvent.change(screen.getByLabelText('Nom de l’habitude'), { target: { value: 'Marcher' } });
  fireEvent.click(screen.getByRole('button', { name: 'Ajouter' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Enregistrement impossible');
  expect(screen.queryByRole('article')).not.toBeInTheDocument();
  storage.mockRestore();
});

test('requests notification permission only when enabling a reminder and handles denial', async () => {
  const requestPermission = jest.fn().mockResolvedValue('denied');
  Object.defineProperty(window, 'Notification', { configurable: true, value: { permission: 'default', requestPermission } });
  localStorage.setItem('habits', JSON.stringify([{ id: 1, name: 'Lire', category: 'Health', color: '#25604b', active: true, completed: {} }]));
  render(<App />);
  expect(requestPermission).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('link', { name: 'Paramètres' }));
  fireEvent.change(screen.getByLabelText('Lire'), { target: { value: '60' } });
  expect(await screen.findByRole('alert')).toHaveTextContent('Notifications indisponibles ou refusées');
  expect(requestPermission).toHaveBeenCalledTimes(1);
  expect(localStorage.getItem('notificationPreferences')).toBeNull();
  Reflect.deleteProperty(window, 'Notification');
});

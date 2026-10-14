import { dateKey, periodDates, shiftDate } from './habits';
test('uses local calendar dates and starts the week on Monday', () => {
  expect(dateKey(new Date(2026, 9, 14))).toBe('2026-10-14');
  expect(periodDates(new Date(2026, 9, 18), 'Week')).toEqual(['2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18']);
});
test('clamps month navigation and includes leap days', () => {
  expect(dateKey(shiftDate(new Date(2024, 0, 31), 'Month', 1))).toBe('2024-02-29');
  expect(dateKey(shiftDate(new Date(2026, 2, 31), 'Month', -1))).toBe('2026-02-28');
  expect(periodDates(new Date(2024, 1, 15), 'Month')).toHaveLength(29);
});

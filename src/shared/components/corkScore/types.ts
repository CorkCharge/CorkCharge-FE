export type DayRange = 1 | 3 | 7 | 30;
export const DAY_RANGE_OPTIONS = [
  { value: 1 as const, label: '1일' },
  { value: 3 as const, label: '3일' },
  { value: 7 as const, label: '일주일' },
  { value: 30 as const, label: '한달' },
];

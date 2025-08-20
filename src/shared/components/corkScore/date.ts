// utils/date.ts
import type { DayRange } from './types';

export const parseYMDLocal = (ymd: string) => {
  // "YYYY-MM-DD"를 로컬 타임으로 파싱 (UTC 해석으로 인한 하루 밀림 방지)
  const [y, m, d] = ymd.split('-').map(Number); //기호 '-' 다 빼고
  return new Date(y, (m ?? 1) - 1, d ?? 1); //Date 객체로 만들기
};

export const diffInDaysFromToday = (ymd: string) => {
  const created = parseYMDLocal(ymd);
  const now = new Date(); //오늘 날짜 객체로 만들기
  //날짜를 모두 자정으로 만들어서 날짜 차이 계산
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfCreated = new Date(created.getFullYear(), created.getMonth(), created.getDate());
  const ms = startOfToday.getTime() - startOfCreated.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24)); // 0=오늘, 1=어제 , 2=2일전
};

export const isWithinRange = (ymd: string, range: DayRange) => {
  const d = diffInDaysFromToday(ymd);
  return d >= 0 && d < range;
};

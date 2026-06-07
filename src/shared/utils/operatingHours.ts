export const getTodayOperatingHours = (opString: string) => {
  const todayDay = new Date().getDay();
  const dayMapper = ['일', '월', '화', '수', '목', '금', '토'];

  if (!opString.includes(',')) return opString;

  const todayOperation = opString
    .split(',')
    .map((x) => x.trim())
    .find((x) => x.startsWith(`${dayMapper[todayDay]}:`));

  return todayOperation ?? '';
};

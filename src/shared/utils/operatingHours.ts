export const getTodayOperatingHours = (opStirng: string) => {
  const todayDay = new Date().getDay();
  const dayMapper = ['일', '월', '화', '수', '목', '금', '토'];

  if (!opStirng.includes(',')) return opStirng;

  const todayOperation = opStirng.split(',').find((x) => x.startsWith(`${dayMapper[todayDay]}:`));

  return todayOperation;
};

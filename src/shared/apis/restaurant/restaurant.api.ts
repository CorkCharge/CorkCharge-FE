import apiClient from '../apiClient';

// 가까운 매장 가져오기 - type

// 위치 가져오기
const getCurrentPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));

// 카테고리별 매장 호출
export const fetchCategoryStore = async (category: string) => {
  const pos = await getCurrentPosition();
  const res = await apiClient.post('/restaurants/category', {
    category,
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  });
  return res.data;
};

// 홈화면 가까운 매장 및 핫한 매장 가져오기
export const fetchHomeStoreCard = async () => {
  const pos = await getCurrentPosition();
  const res = await apiClient.post('/restaurants/home', {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  });

  return res.data.data;
};

// 가까운 매장 호출
export const fetchNearStore = async () => {
  const pos = await getCurrentPosition();
  const res = await apiClient.post('/restaurants/nearby', {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  });
  return res.data.data;
};

// 핫플 콜키지 매장 호출
export const fetchHotStore = async () => {
  const res = await apiClient.get('/restaurants/recommand');
  return res.data.data;
};

// 신규등록 매장 조회
export const fetchNewStore = async ({
  sido,
  sigungu,
  dongList,
}: {
  sido?: string;
  sigungu?: string;
  dongList?: string[];
}) => {
  const pos = await getCurrentPosition();
  const res = await apiClient.post('/restaurants/new', {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
    sido,
    sigungu,
    dongList,
  });

  return res.data.data;
};

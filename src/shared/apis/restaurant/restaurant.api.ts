import apiClient from '../apiClient';

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

// 가까운 매장 호출
export const fetchNearStore = async () => {
  const pos = await getCurrentPosition();
  const res = await apiClient.post('/restaurants/nearby', {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  });
  return res.data.data;
};

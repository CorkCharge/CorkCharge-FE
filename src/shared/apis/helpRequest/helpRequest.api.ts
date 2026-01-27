import apiClient from '../apiClient';

export const fetchDoitList = async () =>
  // sido?: string,
  // sigungu?: string,
  // dong?: string[],
  // keyword?: string
  {
    // const res = await apiClient.post('/request/restaurants', { sido, sigungu, dong, keyword });
    const res = await apiClient.get('/request/restaurants');
    return res.data.data.restaurants;
  };

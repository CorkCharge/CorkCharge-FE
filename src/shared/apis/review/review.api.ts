import apiClient from '../apiClient';

export const fetchHomeReviews = async () => {
  const res = await apiClient.get('/reviews/home');
  return res.data.data;
};

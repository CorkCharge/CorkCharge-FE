import apiClient from '../apiClient';

// 홈 화면에 콜키지 리뷰들 가져오기
export const fetchHomeReviews = async () => {
  const res = await apiClient.get('/reviews/home');
  return res.data.data;
};

// 가게 상세 정보 탭에서 리뷰 가져오기
export const fetchStoreReviews = async (id: number) => {
  const res = await apiClient.get(`/reviews/${id}`);

  return res.data.data;
};

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

// 가게 리뷰 작성
export const writeReview = async (id: number, content: string, rating: number, image?: File) => {
  const formData = new FormData();

  formData.append(
    'request',
    new Blob([JSON.stringify({ content, rating })], { type: 'application/json' })
  );

  // images.forEach((image) => {
  //   formData.append('images', image);
  // });
  if (image) formData.append('images', image);

  await apiClient.post(`/reviews/${id}`, formData);
};

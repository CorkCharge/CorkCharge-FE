import apiClient from '../apiClient';
import type { ReviewResponse } from './review.type';

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

// 콜키지 리뷰 조회
export const fetchCorkageReviews = async (
  keyword?: string,
  sido?: string,
  sigungu?: string,
  dongList?: string[],
  isSortByBookmark: boolean = false
): Promise<ReviewResponse[]> => {
  const sort = isSortByBookmark ? 'BOOKMARK' : 'LATEST';
  const res = await apiClient.post('/reviews/corkageReview', {
    keyword,
    sido,
    sigungu,
    dongList,
    sort,
  });

  return res.data.data;
};

// 리뷰 수정
export const modifyReview = async ({
  reviewId,
  content,
  rating,
  images,
}: {
  reviewId: number;
  content: string;
  rating: number;
  images?: File[];
}) => {
  const formData = new FormData();

  const request = { content, rating };
  formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

  images?.forEach((image) => formData.append('images', image));

  await apiClient.patch(`/reviews/${reviewId}`, formData);
};

// 리뷰 삭제
export const deleteReview = async (reviewId: number) => {
  await apiClient.delete(`reviews/${reviewId}`);
};

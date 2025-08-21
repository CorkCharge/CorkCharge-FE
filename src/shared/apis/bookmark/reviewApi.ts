import apiClient from '../apiClient';

export interface SavedReview {
  bookmarkId: 9;
  reviewId: 5;
  restaurantName: '서북면옥';
  bookmarkCount: 1;
  reviewImageUrl: 'https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/review/a5616d80-58c8-436d-a6bb-b1cfc617f827_햄버거 후기.jpg';
  rating: 5;
  content: '맛있어요!';
  userName: 'ganggang';
  createdAt: '2025-08-07T15:53:55.490336';
}

export interface SavedReviewResponse {
  success: boolean;
  code: number;
  message: string;
  data: SavedReview[];
}

export const fetchSavedReview = async (): Promise<SavedReview[]> => {
  const response = await apiClient.get<SavedReviewResponse>(`/bookmarks/review`);
  console.log(response);

  return response.data.data;
};

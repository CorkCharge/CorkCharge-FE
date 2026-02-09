interface BaseReviewResponse {
  reviewId: number;
  writer: string;
  content: string;
  rating: number;
  createdAt: string;
  imageUrls: string[];
}

export interface StoreReviewResponse extends BaseReviewResponse {
  bookmarkCount: number;
  scrap: boolean;
}

export interface ReviewResponse extends BaseReviewResponse {
  restaurantId: number;
  restaurantName: string;
  bookmarkCount: number;
  scrap: boolean;
}

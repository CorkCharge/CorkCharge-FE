export interface ReviewResponse {
  reviewId: number;
  restaurantId: number;
  restaurantName: string;
  writer: string;
  content: string;
  rating: number;
  createdAt: string;
  imageUrls: string[];
  bookmarkCount: number;
}

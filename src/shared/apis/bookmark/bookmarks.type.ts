export interface MyTipsResponse {
  tipId: number;
  title: string;
  content: string;
  tipCategory: string;
  imageUrls: string[];
  createdAt: string;
}

export interface MyStoreResponse {
  bookmarkId: number;
  restaurantId: number;
  name: string;
  address: string;
  thumbnailUrl: string;
  rating: number;
  reviewCount: number;
  bookmarkCount: number;
  hasCorkage: boolean;
  corkagePrice: string;
  createdAt: string;
}

export interface MyReviewResponse {
  bookmarkId: number;
  reviewId: number;
  restaurantName: string;
  bookmarkCount: number;
  reviewImageUrl: string;
  rating: number;
  content: string;
  userName: string;
  createdAt: string;
}

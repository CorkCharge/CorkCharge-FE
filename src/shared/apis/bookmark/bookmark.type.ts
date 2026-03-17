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

export interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
}

export interface BookmarkRequest {
  targetId: number;
  targetType: 'REVIEW' | 'TIP' | 'RESTAURANT';
  groupIds?: number[];
}

export interface CancelBookmarkRequest {
  targetId: number;
  targetType: 'REVIEW' | 'TIP';
}

export interface EditGroupRequest {
  restaurantId: number;
  groupIds: number[];
}

export interface ReviewBookmarkListResponse extends ApiResponse {
  data: ReviewBookmark[];
}

export interface ReviewBookmark {
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

export interface TipBookmarkListResponse extends ApiResponse {
  data: {
    bookmarkId: number;
    tipId: number;
    title: string;
    tipCategory: string;
    imageUrl: string;
    createdAt: string;
  }[];
}

export interface CreateGroupRequest {
  name: string;
  color: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}

export interface UpdateGroupRequest {
  name: string;
  color: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}

export interface GroupListResponse extends ApiResponse {
  data: {
    totalGroupCount: number;
    groups: {
      groupId: number;
      name: string;
      color: string;
      visibility: 'PUBLIC' | 'PRIVATE';
      storeCount: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

export interface GroupDetailResponse extends ApiResponse {
  data: {
    groupName: string;
    totalCount: number;
    restaurants: {
      restaurantId: number;
      name: string;
      rating: number;
      reviewCount: number;
      openingHoursText: string;
      imageUrls: string[];
      corkagePrice: string;
      corkageOption: string;
    }[];
  };
}

// 내가 저장한 매장 list 정렬 순서
export type MyStoreOrder = 'LATEST' | 'REVIEW_COUNT_DESC' | 'RATING_DESC';

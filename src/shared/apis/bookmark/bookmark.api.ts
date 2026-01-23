import apiClient from '../apiClient';

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
}

interface BookmarkRequest {
  targetId: number;
  targetType: 'REVIEW' | 'TIP' | 'RESTAURANT';
  groupIds?: number[];
}

interface CancelBookmarkRequest {
  targetId: number;
  targetType: 'REVIEW' | 'TIP';
}

interface EditGroupRequest {
  restaurantId: number;
  groupIds: number[];
}

interface ReviewBookmarkListResponse extends ApiResponse {
  data: {
    bookmarkId: number;
    reviewId: number;
    restaurantName: string;
    bookmarkCount: number;
    reviewImageUrl: string;
    rating: number;
    content: string;
    userName: string;
    createdAt: string;
  }[];
}

interface TipBookmarkListResponse extends ApiResponse {
  data: {
    bookmarkId: number;
    tipId: number;
    title: string;
    tipCategory: string;
    imageUrl: string;
    createdAt: string;
  }[];
}

interface CreateGroupRequest {
  name: string;
  color: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}

interface UpdateGroupRequest {
  name: string;
  color: string;
  visibility: 'PUBLIC' | 'PRIVATE';
}

interface GroupListResponse extends ApiResponse {
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

interface GroupDetailResponse extends ApiResponse {
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

// 저장하기(리뷰/팁/매장) (2차)
export const createBookmark = async (data: BookmarkRequest): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>('/bookmarks', data);
  return response.data;
};

// 저장하기 취소 (리뷰/팁)
export const deleteBookmark = async (data: CancelBookmarkRequest): Promise<ApiResponse> => {
  const response = await apiClient.delete<ApiResponse>('/bookmarks', { data });
  return response.data;
};

// 저장 그룹 편집
export const editBookmarkGroup = async (data: EditGroupRequest): Promise<ApiResponse> => {
  const response = await apiClient.put<ApiResponse>('/bookmarks/restaurants', data);
  return response.data;
};

// 내가 저장한 리뷰 리스트
export const getMyReviewBookmarks = async (): Promise<ReviewBookmarkListResponse> => {
  const response = await apiClient.get<ReviewBookmarkListResponse>('/bookmarks/review');
  return response.data;
};

// 내가 저장한 tip 리스트
export const getMyTipBookmarks = async (): Promise<TipBookmarkListResponse> => {
  const response = await apiClient.get<TipBookmarkListResponse>('/bookmarks/tip');
  return response.data;
};

// 새 그룹 생성
export const createBookmarkGroup = async (data: CreateGroupRequest): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>('/bookmarks/groups', data);
  return response.data;
};

// 특정 그룹 정보 수정
export const updateBookmarkGroup = async (
  groupId: number,
  data: UpdateGroupRequest
): Promise<ApiResponse> => {
  const response = await apiClient.put<ApiResponse>(`/bookmarks/groups/${groupId}`, data);
  return response.data;
};

// 특정 그룹 삭제
export const deleteBookmarkGroup = async (groupId: number): Promise<ApiResponse> => {
  const response = await apiClient.delete<ApiResponse>(`/bookmarks/groups/${groupId}`);
  return response.data;
};

// 저장 그룹 리스트 조회
export const getBookmarkGroups = async (): Promise<GroupListResponse> => {
  const response = await apiClient.get<GroupListResponse>('/bookmarks/groups');
  return response.data;
};

// 특정 그룹 내용 조회
export const getBookmarkGroupDetail = async (
  groupId: number,
  sort: 'LATEST' | 'REVIEW_COUNT_DESC' | 'RATING_DESC' = 'LATEST'
): Promise<GroupDetailResponse> => {
  const response = await apiClient.get<GroupDetailResponse>(`/bookmarks/groups/${groupId}`, {
    params: { sort },
  });
  return response.data;
};

import apiClient from '../apiClient';
import type {
  ApiResponse,
  BookmarkRequest,
  CancelBookmarkRequest,
  EditGroupRequest,
  ReviewBookmarkListResponse,
  TipBookmarkListResponse,
  CreateGroupRequest,
  UpdateGroupRequest,
  GroupListResponse,
  GroupDetailResponse,
  MyStoreOrder,
} from './bookmark.type';

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

// 저장하기 / 취소하기 토글 (리뷰/팁)
export const toggleBookmark = async ({
  targetType,
  targetId,
  isBookmarked,
}: {
  targetType: 'REVIEW' | 'TIP';
  targetId: number;
  isBookmarked: boolean;
}) => {
  if (isBookmarked) return await deleteBookmark({ targetId, targetType });
  else return await createBookmark({ targetId, targetType });
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
  sort: MyStoreOrder = 'LATEST'
): Promise<GroupDetailResponse> => {
  const response = await apiClient.get<GroupDetailResponse>(`/bookmarks/groups/${groupId}`, {
    params: { sort },
  });
  return response.data;
};

// 특정 매장이 각 그룹에 저장되어 있는지 여부 조회 (사용할거면 GroupListResponse 타입 groups 배열 항목에 storedFlag 추가할 것)
export const getRestaurantBookmarkStatus = async (
  restaurantId: number
): Promise<GroupListResponse> => {
  const response = await apiClient.get<GroupListResponse>(
    `/bookmarks/groups/restaurants/${restaurantId}`
  );
  return response.data;
};

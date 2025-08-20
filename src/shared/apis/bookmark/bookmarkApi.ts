import apiClient from '../apiClient';

export interface BookmarkPayload {
  targetId: number; //1,
  targetType: string; //"REVIEW"
}
//targetType 재정의 필요

export interface BookmarkResponse {
  success: boolean;
  code: number;
  message: string;
}

export const bookmarkRequest = async (
  //보낼 데이터(요청)
  bookmarkBody: BookmarkPayload
): Promise<BookmarkResponse> => {
  const { data } = await apiClient.post<BookmarkResponse>('/bookmarks', bookmarkBody);
  return data;
};

//저장삭제
// export const deleteRequest = async (bookmarkBody: BookmarkPayload): Promise<BookmarkResponse> => {
//   const { data } = await apiClient.delete<BookmarkResponse>('/bookmarks,', bookmarkBody);
//   return data;
// };

export const deleteRequest = async (payload: BookmarkPayload): Promise<BookmarkResponse> => {
  const { data } = await apiClient.delete<BookmarkResponse>('/bookmarks', {
    data: payload, //delete body
    headers: { 'Content-Type': 'application/json' },
  });
  return data;
};

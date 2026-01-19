import apiClient from '../apiClient';

export interface SavedTip {
  bookmarkId: number; //11,
  tipId: number; //3,
  title: string; //"내가 좋아하는 술, 마음껏 즐기려면? 콜키지 팁 대방출",
  tipCategory: string; //"CORKAGE",
  imageUrl: string; //"https://corkcharge-bucket.s3.ap-northeast-2.amazonaws.com/tip/a652396b-091a-4a7d-b254-acfd4685b08f_tip 사진.jpg",
  createdAt: string; //"2025-08-04T18:23:17.864936"
}

export interface SavedTipResponse {
  success: boolean;
  code: number;
  message: string;
  data: SavedTip[];
}

export const fetchSavedTip = async (): Promise<SavedTip[]> => {
  const response = await apiClient.get<SavedTipResponse>(`/bookmarks/tip`);
  console.log(response);

  return response.data.data;
};

// 리뷰, 팁, 매장 저장
export const save = async (targetId: number, targetType: string) => {
  const res = await apiClient.post('/bookmarks', { targetId, targetType });
  return res.data;
};

// 리뷰 삭제
export const deleteTip = async (targetId: number, targetType: string) => {
  const res = await apiClient.delete('/bookmarks', { data: { targetId, targetType } });
  return res;
};

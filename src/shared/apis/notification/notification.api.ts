import apiClient from '../apiClient';
import type { NotificationDetailResponse, NotificationListResponse } from './notification.type';

// 알림 리스트 가져오기
export const getNotificationList = async (): Promise<NotificationListResponse[]> => {
  const res = await apiClient.get('/notifications');
  return res.data.data.notifications;
};

// 알림 상세 조회
export const getNotificationDetail = async (id: number): Promise<NotificationDetailResponse> => {
  const res = await apiClient.get(`/notifications/${id}`);
  return res.data.data;
};

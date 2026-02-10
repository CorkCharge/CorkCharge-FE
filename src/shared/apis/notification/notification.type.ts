// 이벤트, 공지, 해주세요, 문의
export type Notificationtype = 'EVENT' | 'NOTICE' | 'REQUEST' | 'INQUIRY';

export interface NotificationListResponse {
  notificationId: number;
  type: Notificationtype;
  title: string;
  createdAt: string;
}

export interface NotificationDetailResponse extends NotificationListResponse {
  content: string;
  imageUrls: string[];
}

export const NOTI_TYPE_MAPPING = {
  EVENT: '이벤트',
  NOTICE: '공지',
  REQUEST: '해주세요',
  INQUIRY: '문의',
};

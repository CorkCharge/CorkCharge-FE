import apiClient from '../apiClient';
import type { CorkageTypeEn, CorkageTypeKr, Priority, PriorityRequest } from './helpRequest.type';

const corkageTypeMapping: Record<CorkageTypeKr, CorkageTypeEn> = {
  테이블당: 'PER_TABLE',
  병당: 'PER_BOTTLE',
  인당: 'PER_PERSON',
};

const priorityMapping: Record<Priority, PriorityRequest> = {
  extraGlass: 'GLASS_PROVIDED',
  ice: 'ICE_PROVIDED',
  decanting: 'DECANTING',
};

// 해주세요 리스트 가져오기
export const fetchDoitList = async ({
  sido,
  sigungu,
  dong,
  keyword,
}: {
  sido?: string;
  sigungu?: string;
  dong?: string[];
  keyword?: string;
}) => {
  const res = await apiClient.post('/request/restaurants', { sido, sigungu, dong, keyword });
  return res.data.data.restaurants;
};

// 1차 해주세요 요청
export const firstRequest = async (restId: number) => {
  const res = await apiClient.post(`/request/${restId}`);
  return res.data;
};

// 2차 해주세요 요청
export const secondRequest = async ({
  restaurantId,
  corkageType,
  preferredPrice,
  firstPriority,
  secondPriority,
  content,
}: {
  restaurantId: number;
  corkageType: CorkageTypeKr;
  preferredPrice: number;
  firstPriority: Priority;
  secondPriority: Priority;
  content: string;
}) => {
  const res = await apiClient.post('/request/detail', {
    restaurantId,
    corkageType: corkageTypeMapping[corkageType],
    preferredPrice,
    firstPriority: priorityMapping[firstPriority],
    secondPriority: priorityMapping[secondPriority],
    content,
  });

  return res.data;
};

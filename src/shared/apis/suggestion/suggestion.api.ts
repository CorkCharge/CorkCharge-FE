import apiClient from '../apiClient';
import type { SuggestionDetailResponse, SuggestionListResponse } from './suggestion.type';

// 문의하기 글 쓰기
export const writeSuggestion = async (title: string, content: string, category: string) => {
  await apiClient.post('/suggestion', { title, content, category });
};

// 문의하기 리스트 조회
export const getSuggestionList = async (): Promise<SuggestionListResponse[]> => {
  const res = await apiClient.get('/suggestion');
  return res.data.data;
};

// 문의하기 글 상세 조회
export const getSuggestionDetail = async (id: number): Promise<SuggestionDetailResponse> => {
  const res = await apiClient.get(`/suggestion/${id}`);
  return res.data.data;
};

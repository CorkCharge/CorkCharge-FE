import apiClient from '../apiClient';

// 문의하기 글 쓰기
export const writeSuggestion = async (title: string, content: string, category: string) => {
  await apiClient.post('/suggestion', { title, content, category });
};

import apiClient from '@/shared/apis/apiClient';

export interface HelpRequestPayload {
  restaurantId: number;
  content: string;
}

export interface HelpRequestResponse {
  success: boolean;
  code: number;
  message: string;
}

export const createHelpRequest = async (
  payload: HelpRequestPayload
): Promise<HelpRequestResponse> => {
  const { data } = await apiClient.post<HelpRequestResponse>('/request', payload);
  return data;
};

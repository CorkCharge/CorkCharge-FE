export interface SuggestionListResponse {
  suggestionId: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface SuggestionDetailResponse {
  title: string;
  content: string;
  createdAt: string;
}

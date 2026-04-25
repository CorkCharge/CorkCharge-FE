import { writeSuggestion } from '@/shared/apis/suggestion/suggestion.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      content,
      category,
    }: {
      title: string;
      content: string;
      category: string;
    }) => writeSuggestion(title, content, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suggestionList'] });
    },
  });
};

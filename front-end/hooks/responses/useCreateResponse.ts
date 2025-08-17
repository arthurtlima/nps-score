import { useMutation, useQueryClient } from '@tanstack/react-query';
import { responsesService } from '@/services/responses.service';
import { CreateResponseData } from '@/types/response';

export const useCreateResponse = (companyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateResponseData) => responsesService.create(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['responses', companyId] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
    },
  });
};

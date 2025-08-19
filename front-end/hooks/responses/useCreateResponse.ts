import { useMutation } from '@tanstack/react-query';
import { responsesService } from '@/services/responses.service';
import { CreateResponseData } from '@/types/response';
import queryClient from '@/lib/queryClient';

export const useCreateResponse = (companyId: string) => {

  return useMutation({
    mutationFn: (data: CreateResponseData) => responsesService.create(companyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['responses', companyId] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
      queryClient.refetchQueries({ queryKey: ['responses', companyId] });
    },
  });
};

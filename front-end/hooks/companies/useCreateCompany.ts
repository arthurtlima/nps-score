import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesService } from '@/services/companies.service';

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companiesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
    },
  });
};

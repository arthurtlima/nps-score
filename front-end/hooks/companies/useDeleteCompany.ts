import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesService } from '@/services/companies.service';

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: companiesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
    },
  });
};

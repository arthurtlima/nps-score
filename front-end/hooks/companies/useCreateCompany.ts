import { useMutation } from '@tanstack/react-query';
import { companiesService } from '@/services/companies.service';
import queryClient from '@/lib/queryClient';

export const useCreateCompany = () => {

  return useMutation({
    mutationFn: companiesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
    },
  });
};

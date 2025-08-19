import { useMutation } from '@tanstack/react-query';
import { companiesService } from '@/services/companies.service';
import queryClient from '@/lib/queryClient';

export const useUpdateCompany = () => {

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      companiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
    },
  });
};

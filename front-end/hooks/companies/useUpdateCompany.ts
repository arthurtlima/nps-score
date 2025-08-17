import { useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesService } from '@/services/companies.service';

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      companiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['reports', 'nps'] });
    },
  });
};

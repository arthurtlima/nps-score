import { useQuery } from '@tanstack/react-query';
import { companiesService } from '@/services/companies.service';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: companiesService.getAll,
  });
};

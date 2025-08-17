import { useQuery } from '@tanstack/react-query';
import { npsService } from '@/services/nps.service';

export const useNpsReports = () => {
  return useQuery({
    queryKey: ['reports', 'nps'],
    queryFn: npsService.getAllReports,
  });
};

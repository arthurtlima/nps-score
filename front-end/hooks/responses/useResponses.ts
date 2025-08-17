import { useQuery } from '@tanstack/react-query';
import { responsesService } from '@/services/responses.service';

export const useResponses = (companyId: string) => {
  return useQuery({
    queryKey: ['responses', companyId],
    queryFn: () => responsesService.getByCompany(companyId),
    enabled: !!companyId,
  });
};

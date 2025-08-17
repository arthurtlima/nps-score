import api from '@/lib/api';
import { NpsRow, NpsBreakdown } from '@/types/nps';

export const npsService = {
  getAllReports: (): Promise<NpsRow[]> => api.get('/reports/nps').then(res => res.data),

  getCompanyReport: (companyId: string): Promise<NpsBreakdown> =>
    api.get(`/reports/nps/${companyId}`).then(res => res.data),
};

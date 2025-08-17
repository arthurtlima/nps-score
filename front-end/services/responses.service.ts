import api from '@/lib/api';
import { Response, CreateResponseData } from '@/types/response';

export const responsesService = {
  getByCompany: (companyId: string): Promise<Response[]> =>
    api.get(`/companies/${companyId}/responses`).then(res => res.data),

  create: (companyId: string, data: CreateResponseData): Promise<Response> =>
    api.post(`/companies/${companyId}/responses`, data).then(res => res.data),

  delete: (id: string): Promise<void> => api.delete(`/responses/${id}`).then(res => res.data),
};

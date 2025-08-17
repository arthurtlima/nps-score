import api from '@/lib/api';
import { Company, CreateCompanyData } from '@/types/company';

export const companiesService = {
  getAll: (): Promise<Company[]> => api.get('/companies').then(res => res.data),

  create: (data: CreateCompanyData): Promise<Company> =>
    api.post('/companies', data).then(res => res.data),

  update: (id: string, data: { name: string }): Promise<Company> =>
    api.put(`/companies/${id}`, data).then(res => res.data),

  delete: (id: string): Promise<void> => api.delete(`/companies/${id}`).then(res => res.data),
};

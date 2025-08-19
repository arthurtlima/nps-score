import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useCreateCompany } from './useCreateCompany';
import { companiesService } from '@/services/companies.service';
import { ReactNode } from 'react';
import queryClient from '@/lib/queryClient';

jest.mock('../../services/companies.service');
const mockCompaniesService = companiesService as jest.Mocked<typeof companiesService>;

describe('useCreateCompany', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('creates company successfully', async () => {
    const mockCompany = { id: '1', name: 'Test Company' };
    mockCompaniesService.create.mockResolvedValue(mockCompany);

    const { result } = renderHook(() => useCreateCompany(), { wrapper });

    result.current.mutate({ name: 'Test Company' });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockCompaniesService.create).toHaveBeenCalledWith({ name: 'Test Company' });
  });
});

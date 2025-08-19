import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useUpdateCompany } from './useUpdateCompany';
import { companiesService } from '@/services/companies.service';
import { ReactNode } from 'react';
import queryClient from '@/lib/queryClient';

jest.mock('../../services/companies.service');
const mockCompaniesService = companiesService as jest.Mocked<typeof companiesService>;

describe('useUpdateCompany', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('updates company successfully', async () => {
    const mockCompany = { id: '1', name: 'Test Company' };
    mockCompaniesService.update.mockResolvedValue(mockCompany);

    const { result } = renderHook(() => useUpdateCompany(), { wrapper });

    result.current.mutate({ id: '1', data: { name: 'Test Company 2' } });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockCompaniesService.update).toHaveBeenCalledWith("1", {"name": "Test Company 2"});
  });
});

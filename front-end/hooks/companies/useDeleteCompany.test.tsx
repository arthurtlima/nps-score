import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { useDeleteCompany } from './useDeleteCompany';
import { companiesService } from '@/services/companies.service';
import { ReactNode } from 'react';
import queryClient from '@/lib/queryClient';

jest.mock('../../services/companies.service');
const mockCompaniesService = companiesService as jest.Mocked<typeof companiesService>;

describe('useDeleteCompany', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('deletes company successfully', async () => {
    mockCompaniesService.delete.mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteCompany(), { wrapper });

    result.current.mutate('1');

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockCompaniesService.delete).toHaveBeenCalledWith('1');
  });
});

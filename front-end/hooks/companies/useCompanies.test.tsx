import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCompanies } from './useCompanies';

// Mock do service
jest.mock('../../services/companies.service.ts', () => ({
  companiesService: {
    getAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Empresa Teste' }]),
  },
}));

describe('useCompanies', () => {
  it('fetches companies successfully', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCompanies(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([{ id: '1', name: 'Empresa Teste' }]);
  });
});

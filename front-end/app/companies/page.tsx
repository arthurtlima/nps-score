'use client';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import DataTable from '@/components/DataTable';
import CompanyForm from '@/components/CompanyForm';
import NpsBadge from '@/components/NpsBadge';
import api from '@/lib/api';

export type NpsRow = {
  id: string;
  name: string;
  nps: number | null;
  promoters: number;
  neutrals: number;
  detractors: number;
  total: number;
};

export type Company = { id: string; name: string; created_at?: string };

export default function CompaniesPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: companiesData, isLoading: companiesIsLoading } = useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: async () => (await api.get('/companies')).data,
  });

  const { mutate: removeCompany, isPending } = useMutation({
    mutationFn: async (id: string) => api.delete(`/companies/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['companies'] }),
  });

  const {
    data: npsData,
    isLoading: npsIsLoading,
    error,
  } = useQuery<NpsRow[]>({
    queryKey: ['reports', 'nps'],
    queryFn: async () => {
      const res = await api.get('/reports/nps');
      return res.data;
    },
  });

  return (
    <Box display="grid" gap={2}>
      <Typography variant="h4" fontWeight={700}>
        Empresas
      </Typography>

      <Card>
        <CardContent>
          <CompanyForm onCreated={() => qc.invalidateQueries({ queryKey: ['companies'] })} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <DataTable
            loading={companiesIsLoading}
            columns={[
              {
                key: 'name',
                header: 'Empresa',
                render: (name: string, row: Company) => (
                  <Button
                    onClick={() => router.push(`/companies/${row.id}`)}
                    color="primary"
                    variant="text"
                    sx={{ textTransform: 'none', cursor: 'pointer' }}
                  >
                    {name}
                  </Button>
                ),
              },
              {
                key: 'id',
                header: 'Ações',
                render: (id: string) => (
                  <Button color="error" disabled={isPending} onClick={() => removeCompany(id)}>
                    Excluir
                  </Button>
                ),
              },
            ]}
            rows={companiesData ?? []}
            getRowId={r => r.id}
          />
        </CardContent>
      </Card>

      <Typography variant="h4" fontWeight={700}>
        NPS por Empresa
      </Typography>

      <Card>
        <CardContent>
          <DataTable
            loading={npsIsLoading}
            error={!!error}
            columns={[
              { key: 'name', header: 'Empresa' },
              { key: 'nps', header: 'NPS', render: (v: number | null) => <NpsBadge nps={v} /> },
              { key: 'promoters', header: 'Promotores' },
              { key: 'neutrals', header: 'Neutros' },
              { key: 'detractors', header: 'Detratores' },
              { key: 'total', header: 'Total' },
            ]}
            rows={npsData ?? []}
            emptyMessage="Sem dados ainda. Cadastre respostas nas empresas."
          />
        </CardContent>
      </Card>
    </Box>
  );
}

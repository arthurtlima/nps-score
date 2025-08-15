'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ResponseForm from '@/components/ResponseForm';
import DataTable from '@/components/DataTable';
import NpsBadge from '@/components/NpsBadge';
import api from '@/lib/api';

export default function CompanyDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const companyId = params.id as string;
  const qc = useQueryClient();

  const { data: company } = useQuery({
    queryKey: ['company', companyId],
    queryFn: async () => (await api.get(`/companies/${companyId}`)).data
  });

  const { data: responses, isLoading } = useQuery({
    queryKey: ['responses', companyId],
    queryFn: async () => (await api.get(`/companies/${companyId}/responses`)).data
  });

  const { data: nps } = useQuery({
    queryKey: ['reports', 'nps', companyId],
    queryFn: async () => (await api.get(`/reports/nps/${companyId}`)).data
  });

  const { mutate: removeResponse } = useMutation({
    mutationFn: async (id: string) => api.delete(`/responses/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['responses', companyId] })
  });

  return (
    <Box display="grid" gap={2}>
        <Button variant="outlined" sx={{ justifySelf: 'start' }} onClick={() => router.push('/companies')}>
          ← Voltar
        </Button>
      <Typography variant="h4" fontWeight={700}>{company?.name ?? 'Empresa'}</Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">NPS atual: <NpsBadge nps={nps?.nps ?? null} /></Typography>
          <Typography variant="body2">Promotores: {nps?.promoters ?? 0} • Neutros: {nps?.neutrals ?? 0} • Detratores: {nps?.detractors ?? 0} • Total: {nps?.total ?? 0}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Nova resposta</Typography>
          <ResponseForm companyId={companyId} onCreated={() => qc.invalidateQueries({ queryKey: ['responses', companyId] })} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Respostas</Typography>
          <DataTable
            loading={isLoading}
            columns={
              [
                { key: 'rating', header: 'Nota' },
                { key: 'comment', header: 'Comentário' },
                { key: 'id', header: 'Ações', render: (id: string) => (
                  <button onClick={() => removeResponse(id)}>Remover</button>
                ) }
              ]
            }
            rows={responses ?? []}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
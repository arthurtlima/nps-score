'use client';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useResponses } from '@/hooks/responses/useResponses';
import { useCompanies } from '@/hooks/companies/useCompanies';
import DataTable from '@/components/ui/DataTable/DataTable';
import Stars from '@/components/ui/Stars/Stars';

export default function CompanyResponsesPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const companyId = params.id;

  const { data: responses, isLoading } = useResponses(companyId);
  const { data: companies } = useCompanies();

  const company = companies?.find(c => c.id === companyId);

  return (
    <Box display="grid" gap={2}>
      <Button
        variant="outlined"
        onClick={() => router.push('/companies' as any)}
        sx={{ justifySelf: 'start' }}
        startIcon={<ArrowBack />}
      >
        Voltar
      </Button>

      <Box>
        <Typography variant="h2" fontWeight={700}>
          Avaliações Recebidas
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ mt: 1 }}>
          {company?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Visualize todas as avaliações NPS enviadas pelos clientes para esta empresa. Acompanhe
          comentários e notas para entender melhor a satisfação dos usuários.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Histórico de Avaliações
          </Typography>
          <DataTable
            loading={isLoading}
            columns={[
              {
                key: 'rating',
                header: 'Avaliação',
                render: (rating: number) => <Stars value={rating} onChange={() => {}} readOnly />,
              },
              {
                key: 'comment',
                header: 'Comentário',
                render: (comment: string | null) => comment || 'Sem comentário',
              },
              {
                key: 'created_at',
                header: 'Data de Envio',
                render: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
              },
            ]}
            rows={responses ?? []}
            emptyMessage="Nenhuma avaliação recebida ainda. Compartilhe o formulário de avaliação para começar a receber feedback."
          />
        </CardContent>
      </Card>
    </Box>
  );
}

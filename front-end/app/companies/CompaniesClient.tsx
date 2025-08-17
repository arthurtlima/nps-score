'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Box, Button, TextField, AlertColor } from '@mui/material';
import { Edit, Save, Cancel, Delete, Visibility } from '@mui/icons-material';
import DataTable from '@/components/ui/DataTable/DataTable';
import CompanyForm from '@/components/features/companies/CompanyForm/CompanyForm';
import NpsBadge from '@/components/features/companies/NpsBadge/NpsBadge';
import Notification from '@/components/ui/Notification/Notification';
import { useCompanies } from '@/hooks/companies/useCompanies';
import { useDeleteCompany } from '@/hooks/companies/useDeleteCompany';
import { useUpdateCompany } from '@/hooks/companies/useUpdateCompany';
import { useNpsReports } from '@/hooks/nps/useNpsReports';
import { Company } from '@/types/company';
import { NpsRow } from '@/types/nps';

type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
};

export const metadata = {
  title: 'Empresas - NPS Dashboard',
  description: 'Gerencie empresas para coleta de NPS',
};

export default function CompaniesClient() {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success' as AlertColor,
  });

  const { data: companies, isLoading } = useCompanies();
  const { mutate: deleteCompany, isPending: isDeleting } = useDeleteCompany();
  const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany();
  const { data: npsData, isLoading: npsIsLoading, error } = useNpsReports();

  const handleEdit = (company: Company) => {
    setEditingId(company.id);
    setEditName(company.name);
  };

  const handleSave = (id: string, originalName: string) => {
    if (editName.trim() === originalName) {
      setNotification({ open: true, message: 'Nenhuma alteração foi feita', type: 'warning' });
      setEditingId(null);
      return;
    }

    updateCompany(
      { id, data: { name: editName.trim() } },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: 'Empresa atualizada com sucesso!',
            type: 'success',
          });
          setEditingId(null);
        },
        onError: () => {
          setNotification({ open: true, message: 'Erro ao atualizar empresa', type: 'error' });
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteCompany(id, {
      onSuccess: () => {
        setNotification({ open: true, message: 'Empresa excluída com sucesso!', type: 'success' });
      },
      onError: () => {
        setNotification({ open: true, message: 'Erro ao excluir empresa', type: 'error' });
      },
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  const companiesColumns: Column<Company>[] = [
    {
      key: 'name',
      header: 'Empresa',
      width: '40%',
      render: (name: string, row: Company) =>
        editingId === row.id ? (
          <TextField
            size="small"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            disabled={isUpdating}
          />
        ) : (
          <Typography>{name}</Typography>
        ),
    },
    {
      key: 'id',
      header: 'Respostas',
      width: '30%',
      render: (id: string) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push(`/companies/${id}/responses` as any)}
          startIcon={<Visibility />}
        >
          Ver Avaliações
        </Button>
      ),
    },
    {
      key: 'id',
      header: 'Ações',
      width: '30%',
      render: (id: string, row: Company) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {editingId === id ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleSave(id, row.name)}
                disabled={isUpdating}
                startIcon={<Save />}
              >
                Salvar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleCancel}
                startIcon={<Cancel />}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleEdit(row)}
                disabled={isDeleting}
                startIcon={<Edit />}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                disabled={isDeleting || editingId !== null}
                onClick={() => handleDelete(id)}
                startIcon={<Delete />}
              >
                Excluir
              </Button>
            </>
          )}
        </Box>
      ),
    },
  ];

  const npsColumns: Column<NpsRow>[] = [
    { key: 'name', header: 'Empresa' },
    { key: 'nps', header: 'NPS', render: (v: number | null) => <NpsBadge nps={v} /> },
    { key: 'promoters', header: 'Promotores' },
    { key: 'neutrals', header: 'Neutros' },
    { key: 'detractors', header: 'Detratores' },
    { key: 'total', header: 'Total' },
  ];

  return (
    <Box display="grid" gap={3}>
      <Box>
        <Typography
          variant="h2"
          fontWeight={700}
          sx={{
            fontSize: { xs: '1.75rem', sm: '3rem' },
            px: { xs: 2, sm: 0 },
          }}
        >
          Gerenciamento de Empresas
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, px: { xs: 2, sm: 0 } }}>
          Cadastre e gerencie empresas para coleta de avaliações NPS. Visualize métricas de
          satisfação e acompanhe o desempenho de cada organização.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cadastrar Nova Empresa
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Adicione uma nova empresa para começar a coletar avaliações NPS
          </Typography>
          <CompanyForm />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Empresas Cadastradas
          </Typography>
          <DataTable
            loading={isLoading}
            columns={companiesColumns}
            rows={companies ?? []}
            getRowId={r => r.id}
            emptyMessage="Nenhuma empresa cadastrada ainda. Cadastre a primeira empresa acima."
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Relatório NPS por Empresa
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Acompanhe as métricas de satisfação de cada empresa
          </Typography>
          <DataTable
            loading={npsIsLoading}
            error={!!error}
            columns={npsColumns}
            rows={npsData ?? []}
            emptyMessage="Sem dados de NPS disponíveis. As métricas aparecerão após as primeiras avaliações."
          />
        </CardContent>
      </Card>

      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      />
    </Box>
  );
}

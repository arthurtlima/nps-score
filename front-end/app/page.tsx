'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import Notification from '@/components/Notification';
import Stars from '@/components/Stars';
import api from '../lib/api';

const schema = z.object({
  companyId: z.string().min(1, 'Selecione uma empresa'),
  rating: z.number().min(0).max(5),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DashboardPage() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success' as const,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyId: '',
      rating: 3,
      comment: '',
    },
  });

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => (await api.get('/companies')).data,
  });

  const { mutate: submitResponse } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post(`/companies/${data.companyId}/responses`, {
        rating: data.rating,
        comment: data.comment,
      });
      return response;
    },
    onSuccess: () => {
      reset();
      setNotification({ open: true, message: 'Avaliação enviada com sucesso!', type: 'success' });
    },
  });

  const onSubmit = (data: FormData) => {
    submitResponse(data);
  };

  return (
    <Box display="grid" gap={3}>
      <Typography variant="h4" fontWeight={700}>
        Formulário de Avaliação NPS
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="companyId"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    label="Selecione a empresa"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.companyId}
                    helperText={errors.companyId?.message}
                  >
                    {(companies || []).map((company: any) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Box>
                <Typography variant="body1" gutterBottom>
                  Como você avalia esta empresa?
                </Typography>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => <Stars value={field.value} onChange={field.onChange} />}
                />
              </Box>

              <TextField
                fullWidth
                label="Comentário adicional (opcional)"
                multiline
                rows={3}
                {...register('comment')}
                placeholder="Conte-nos mais sobre sua experiência..."
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ textDecoration: 'none', backgroundColor: 'secondary.main' }}
                disabled={isSubmitting}
              >
                Enviar Avaliação
              </Button>
            </Stack>
          </form>
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

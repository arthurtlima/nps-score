'use client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, Box, Button, Card, CardContent, TextField, MenuItem, Stack } from '@mui/material';
import Stars from '../components/Stars';
import api from '../lib/api';

const schema = z.object({
  companyId: z.string().min(1, 'Selecione uma empresa'),
  rating: z.number().min(0).max(5),
  comment: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function DashboardPage() {
  const { control, register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 3, comment: '' }
  });

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => (await api.get('/companies')).data
  });

  const { mutate: submitResponse } = useMutation({
    mutationFn: async (data: FormData) => {
      console.log("data ", data)
      const response = await api.post(`/companies/${data.companyId}/responses`, {
        rating: data.rating,
        comment: data.comment
      });
      return response;
    },
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit = (data: FormData) => {
    submitResponse(data);
  };

  return (
    <Box display="grid" gap={3}>
      <Typography variant="h4" fontWeight={700}>Formulário de Avaliação NPS</Typography>
      
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                select
                fullWidth
                label="Selecione a empresa"
                {...register('companyId')}
                error={!!errors.companyId}
                helperText={errors.companyId?.message}
              >
                {companies?.map((company: any) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </TextField>

              <Box>
                <Typography variant="body1" gutterBottom>Como você avalia esta empresa?</Typography>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Stars value={field.value} onChange={field.onChange} />
                  )}
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

              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                Enviar Avaliação
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Box display="flex" gap={1}>
        <Button href="/companies" variant="outlined">Gerenciar empresas</Button>
      </Box>
    </Box>
  );
}

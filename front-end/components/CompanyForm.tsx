'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack } from '@mui/material';
import api from '@/lib/api';

const schema = z.object({ name: z.string().min(2, 'Mínimo 2 caracteres') });

type FormData = z.infer<typeof schema>;
interface CompanyFormProps {
  onCreated?: () => void;
}

export default function CompanyForm({ onCreated }: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await api.post('/companies', data);
    reset();
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          size="small"
          label="Nome da empresa"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Criar
        </Button>
      </Stack>
    </form>
  );
}

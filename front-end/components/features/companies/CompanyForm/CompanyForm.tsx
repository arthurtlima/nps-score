'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack } from '@mui/material';
import { useCreateCompany } from '@/hooks/companies/useCreateCompany';

const schema = z.object({ name: z.string().min(2, 'Mínimo 2 caracteres') });

type FormData = z.infer<typeof schema>;

export default function CompanyForm() {
  const { mutate: createCompany, isPending } = useCreateCompany();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    createCompany(data, {
      onSuccess: () => {
        reset();
      },
    });
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
        <Button type="submit" variant="contained" disabled={isPending}>
          Cadastrar Empresa
        </Button>
      </Stack>
    </form>
  );
}

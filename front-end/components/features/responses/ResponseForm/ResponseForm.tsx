'use client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack } from '@mui/material';
import Stars from '@/components/ui/Stars/Stars';
import api from '@/lib/api';

const schema = z.object({
  rating: z.number().min(0).max(5),
  comment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
interface ResponseFormProps {
  companyId: string;
  onCreated?: () => void;
}

export default function ResponseForm({ companyId, onCreated }: ResponseFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 3, comment: '' },
  });

  const onSubmit = async (data: FormData) => {
    await api.post(`/companies/${companyId}/responses`, data);
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => <Stars value={field.value} onChange={v => field.onChange(v)} />}
        />
        <TextField size="small" label="Comentário (opcional)" fullWidth {...register('comment')} />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Salvar
        </Button>
      </Stack>
    </form>
  );
}

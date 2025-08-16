import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from '@mui/material';

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginForm({ open, onClose }: LoginFormProps) {
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleLogin}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField fullWidth label="Email" type="email" required />
            <TextField fullWidth label="Senha" type="password" required />
            <Button type="submit" variant="contained" fullWidth>
              Entrar
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';
import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Container
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (path: any) => {
    router.push(path);
    handleClose();
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de login aqui
    setLoginOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
            <Toolbar disableGutters>
                {isMobile ? (
                    <>
                    <IconButton size="large" edge="start" color="inherit" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => navigate('/')}>Avaliação NPS</MenuItem>
                        <MenuItem onClick={() => navigate('/companies')}>Empresas</MenuItem>
                    </Menu>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/')}>Avaliação NPS</Button>
                    <Button color="inherit" onClick={() => navigate('/companies')}>Empresas</Button>
                    </Box>
                )}

                <IconButton 
                    size="large" 
                    color="inherit" 
                    onClick={() => setLoginOpen(true)}
                    sx={{ marginLeft: 'auto' }}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="xs" fullWidth>
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
    </>
  );
}

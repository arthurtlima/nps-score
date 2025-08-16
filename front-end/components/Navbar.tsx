'use client';
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import LoginForm from './LoginForm';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'Avaliação NPS', path: '/' },
    { label: 'Empresas', path: '/companies' },
  ];

  const navigate = (path: string) => {
    router.push(path as any);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  <Box sx={{ width: 250 }}>
                    <List>
                      {menuItems.map(item => (
                        <ListItem key={item.path} disablePadding>
                          <ListItemButton
                            onClick={() => navigate(item.path)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'secondary.main',
                                color: 'white',
                              },
                              ...(pathname === item.path && {
                                backgroundColor: 'secondary.main',
                                color: 'white',
                              }),
                            }}
                          >
                            <ListItemText
                              primary={item.label}
                              sx={{ textTransform: 'uppercase', '& span': { fontWeight: '700' } }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {menuItems.map(item => (
                  <Button
                    key={item.path}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{
                      fontWeight: '700',
                      '&:hover': {
                        color: 'secondary.main',
                      },
                      ...(pathname === item.path && {
                        color: 'secondary.main',
                      }),
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
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

      <LoginForm open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

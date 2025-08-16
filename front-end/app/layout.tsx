import * as React from 'react';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { CssBaseline, ThemeProvider, Container, Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import theme from '@/theme/theme';

export const metadata = {
  title: 'NPS Dashboard',
  description: 'Relatório de NPS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReactQueryProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Container maxWidth="lg" sx={{ py: 4, px: 0, flex: 1 }}>
                {children}
              </Container>
              <Footer />
            </Box>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

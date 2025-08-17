import { Metadata } from 'next';
import * as React from 'react';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { CssBaseline, ThemeProvider, Container, Box } from '@mui/material';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import theme from '@/theme/theme';

export const metadata: Metadata = {
  title: {
    template: '%s | Sistema NPS',
    default: 'Pesquisa de Satisfação NPS',
  },
  description:
    'Sistema de coleta de avaliações NPS. Compartilhe sua experiência e ajude-nos a melhorar.',
  keywords: ['NPS', 'pesquisa', 'satisfação', 'avaliação', 'feedback'],
  authors: [{ name: 'Sua Empresa' }],
  creator: 'Sua Empresa',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Sistema de Pesquisa NPS',
    description: 'Avalie sua experiência e ajude-nos a melhorar nossos serviços',
    siteName: 'Sistema NPS',
  },
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

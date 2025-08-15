import * as React from 'react';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { CssBaseline, ThemeProvider, Container } from '@mui/material';
import theme from '@/theme/theme';

export const metadata = {
  title: 'NPS Dashboard',
  description: 'Relatório de NPS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReactQueryProvider>
            <Container maxWidth="lg" sx={{ py: 4 }}>{children}</Container>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
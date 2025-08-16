import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, backgroundColor: 'primary.main' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="custom.light" align="center">
          © {new Date().getFullYear()} NPS Dashboard. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
}
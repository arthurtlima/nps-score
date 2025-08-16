'use client';
import { createTheme } from '@mui/material/styles';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#713DB7',
    },
    secondary: {
      main: '#4FCF9E',
    },
    text: {
      primary: '#393939',
    },
    custom: {
      light: '#F4F4F4',
    },
  },
  typography: {
    fontFamily: lato.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#666',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;

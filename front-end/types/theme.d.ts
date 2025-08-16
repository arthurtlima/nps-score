import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      light: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      light?: string;
    };
  }
}

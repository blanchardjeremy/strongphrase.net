import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  // Customize your theme here
  colorSchemes: {
    light: {
      palette: {
        primary: {
          // main: '#1976d2',
        },
      },
    },
  },
  typography: {
    courierPrime: '"Courier Prime", monospace',
  },
});

export default theme;

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(215, 40, 47, 1)',
    },
    secondary: {
      main: 'rgba(35, 31, 32, 1)',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Open Sans',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
export default theme;
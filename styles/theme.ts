import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: "rgba(215, 40, 47, 1)"
    },

    secondary: {
      main: "rgba(35, 31, 32, 1)"
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

theme = responsiveFontSizes(theme);
export default theme;

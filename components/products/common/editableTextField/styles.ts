import { styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const TextFieldHelperText = styled('p')({
  textAlign: 'end',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '24px',
  letterSpacing: '0.09px',
  color: '#727272',
});

export const LeftTextFieldHelperText = styled('p')({
  textAlign: 'start',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '24px',
  letterSpacing: '0.09px',
  color: '#727272',
});

export const useStyles: any = makeStyles()((theme) => {
  return {
  customTextField: {
    '& input::placeholder': {
      fontSize: '13px !important',
    },
    '& textArea::placeholder': {
      fontSize: '13px !important',
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        border: "1px solid red" 
      },
    },
  },
  customInputFieldsProduct: {
    '& input::placeholder': {
      fontSize: '13px !important',
      fontWeight: 'bold',
    },
  },
}
});

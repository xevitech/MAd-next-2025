import { makeStyles } from 'tss-react/mui';

export const useStyles: any = makeStyles()((theme) => {
  return {
  customTextField: {
    '& input::placeholder': {
      fontSize: '13px !important',
    },

    '& textArea::placeholder': {
      fontSize: '13px !important',
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

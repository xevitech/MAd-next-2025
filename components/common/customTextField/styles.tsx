import { styled } from '@mui/material';

export const FieldOuterContainer: any = styled('div')(
  ({ breakPoints }: any) => ({
    height: breakPoints?.max1920px ? '50px' : '45px',

    display: 'flex',
    alignItems: 'center',
    width: '100%',
  })
);

export const FieldLabel: any = styled('p')(({ breakPoints }: any) => ({
  color: '#7B7979',
  fontSize: breakPoints?.max1920px ? '15px' : '13px',
  lineHeight: breakPoints?.max1920px ? '18px' : '15px',
  fontFamily: 'open sans',
}));

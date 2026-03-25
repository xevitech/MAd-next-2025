import { styled } from '@mui/material';

export const Container = styled('div')({
  border: '1px solid #BBBBBB',
  borderRadius: '6px',
});

export const Header = styled('div')({
  height: 'auto',
  background: '#F6F8FB',
  borderRadius: '6px 6px 0px 0px',
});

export const HeaderName = styled('div')({
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '22px',
  /* identical to box height */
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'center',
  width: '100%',
  padding: '12px',
  color: '#000000',
  position:'relative'
});

export const HeaderHighlight = styled('div')({
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '22px',
  /* identical to box height */
  display: 'flex',
  alignItems: 'center',
  color: '#D7282F',
});

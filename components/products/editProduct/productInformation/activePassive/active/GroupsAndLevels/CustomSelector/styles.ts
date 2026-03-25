import { styled } from '@mui/material';

export const OuterContainer = styled('div')({
  minHeight: '50px',
  border: '1px solid #BBBBBB',
  borderRadius: '4px',
  position: 'relative',
  display: 'inline-block',
  paddingLeft: '16px',
  paddingTop:'12px', 
});

export const ContainerLabel = styled('div')({
  position: 'absolute',
  top: '-18px',
  left: '10px',
  padding: '6px',
  background: 'white',
  paddingLeft: '10px',
  paddingRight: '10px',
  fontSize: '13px',
  lineHeight: '12px',
  /* identical to box height, or 92% */
  fontWeight: '600',
  letterSpacing: '0.4px',

  color: '#1C1C1C',
  fontFamily: 'open sans',
});

export const SpecItem = styled('div')({
  height: '24px',
  border: '1px solid #7D7C7C',
  borderRadius: '4px',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '24px',
  letterSpacing: '0.09px',
  color: '#424242',
  minWidth: '64px',
  textTransform: 'lowercase',
  display: 'flex',
  alignItems: 'center',
});

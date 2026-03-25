import { styled, Button } from '@mui/material';
export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  outline: 'none',
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: "6px",
  p: 3,
  '@media (max-width:480px)': {
    width: "90%",
    padding: "20px 10px"
  }
};
export const ModalHeader = styled('p')({
  fontFamily: 'open sans',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#231F20',
  textAlign: 'center',
});
export const ModalOuterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
export const ModalSubHeader = styled('p')({
  textAlign: 'center',
  fontSize: "14px",
  color: 'rgba(35, 31, 32, 0.6)',
  opacity: 0.5,
});
export const CustomButton = styled(Button)({
  textTransform: 'none',

  display: 'inline-flex',
  margin: 'auto',
  background: 'rgba(216, 38, 47, 0.9)',
  fontFamily: 'open sans',
  fontWeight: 'bold',
  fontSize: '13px',
  lineHeight: '18px',
  height: '36px',
  borderRadius: '6px',
  paddingLeft: '15px',
  paddingRight: '15px',
  minWidth: '180px',
  '&:hover': {
    background: 'rgba(215, 40, 47, 0.85)',
  },
});
export const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '12px',
});

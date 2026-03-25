import { styled, Button } from '@mui/material';

export const OuterContainer = styled('div')({
  background: '#FFFFFF',
  // background: "#FAFAFA",
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
  padding: '10px 12px',
  width: '95%',
  margin: 'auto',
  marginTop: '16px',
  marginBottom: '10px',
});

export const Header = styled('div')({
  minHeight: '29px',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '19px',
  color: '#000000',
  fontFamily: 'open sans',
  borderBottom: '1px solid #D2D2D2',
});

export const InputFieldsContainer = styled('div')({
  display: 'flex',
  padding: '24px 0px 0px',
  gap: '16px',
});

export const CustomButton = styled(Button)({
  background: '#D7282F',
  marginLeft: '10px',
  color: 'white',
  fontWeight: 600,
  fontSize: '14px',
  lineheight: '24px',
  width: '40px',
  height: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  letterSpacing: '0.09px',
  '&:hover': {
    background: '#D7282F',
    color: 'white',
  },
});

export const AuxListContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const AuxItem = styled('div')({
  display: 'flex',
  minHeight: '40px',
  alignItems: 'center',
  background: '#FAFAFA',
  borderBottom: '1px solid #E1E1E1',
  flex: 1,
});

export const SerialNo = styled('div')({
  display: 'flex',
  flex: 0.1,
  // justifyContent: "center",
  paddingLeft: '16px',
});

export const Name = styled('div')({
  display: 'flex',
  flex: '0.4',
});

export const Value = styled('div')({
  display: 'flex',
  flex: '0.4',
});

export const DeleteIcon = styled('div')({
  display: 'flex',
  flex: '0.1',
});

export const ListHeader = styled('div')({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '19px',
  color: '#000000',
  marginTop: '16px',
  minHeight: '29px',
});

export const BtnContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  alignItems: 'center',
  marginTop: '10px',
});

export const CancelBtn = styled(Button)({
  width: '66px',
  height: '36px',
  background: '#FFFFFF',
  border: '1px solid #989898',
  borderRadius: '4px',
  color: '#111111',
  fontWeight: 600,
  fontSize: '13px',
  padding: '5px 12px',
  lineHeight: '18px',
  textTransform: 'none',
  '&:hover': {
    background: '#FFFFFF',
    color: '#111111',
  },
});

export const SaveBtn = styled(Button)({
  width: '54px',
  height: '28px',
  background: '#D7282F',
  borderRadius: '4px',
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: '13px',
  lineHeight: '18px',
  textTransform: 'none',
  padding: '5px 12px',

  '&:hover': {
    background: '#D7282F',
    color: '#FFFFFF',
  },
});

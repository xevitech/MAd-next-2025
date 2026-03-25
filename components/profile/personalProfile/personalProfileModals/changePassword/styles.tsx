import { getAppBarUtilityClass, styled } from '@mui/material';

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  outline: 'none',
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '6px',
  p: 4,
  "@media only screen and (max-width: 460px)": {
    width: "90%",
  gap:"5px",
 
  },
  "@media only screen and (max-width: 296px)": {
  backgroundColor:"#fff"
  },
};
export const InputItemContainer: any = styled('div')(
  ({ breakPoint, flexColumn, padding, transform }: any) => ({
    position: 'relative',
    flex: 0.48,
    display: 'flex',
    width: breakPoint?.max540px && '100%',
    flexDirection: flexColumn ? 'column' : 'row',
    gap: flexColumn && '16px',
    padding: padding?.padding,
    transform: transform?.up && 'translatey(-11px)',
  })
);
export const OtpWrapper = styled('div')({});
export const OtpInputWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
});

export const OtpHeading = styled('div')({
  padding: '10px',
  textAlign: 'center',
  opacity: '0.7',
});

export const StepHeading = styled('div')({
  display: 'flex',
  fontFamily: 'open sans',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#231F20',
  textAlign: 'center',
  padding: '20px 10px',
});

export const OuterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
export const ModalHeader = styled('p')({
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '100.9%',
  color: '#223354',
  fontFamily: 'open sans',
  padding: '15px',
  textAlign: 'center',
  marginLeft: '10px',
  marginBottom: '10px',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '20px',
});
export const EyeIconContainer = styled('span')({
  position: 'absolute',
  // right: '35px',
  right:"10px",
  top: '4px',
  fontSize: '24px',
  opacity: '0.7',
  cursor: 'pointer',
  zIndex: 999,
});

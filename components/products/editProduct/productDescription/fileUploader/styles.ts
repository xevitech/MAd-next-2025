import { styled } from '@mui/material';
import { display } from '@mui/system';

export const ProductDescriptionFileUploader = styled('div')({
  width: '100%',
  border: '1px dashed #BBBBBB',
  borderRadius: '4px',
  minHeight: '102px',
  position: 'relative',
  display:'flex', 
  alignItems:'center',
  margin:"5px 0 0" 
});

export const FileUploaderHeading = styled('div')({
  position: 'absolute',
  top: '-8px',
  left: '10px',
  fontWeight: 600,
  fontSize: '13px',
  lineHeight: '12px',
  paddingLeft: '10px',
  paddingRight: '10px',
  background: 'white',
  letterSpacing: '0.4px',
  width: 'fit-content',
  color: '#1C1C1C',
});

export const FileUploaderContent = styled('div')({
  display: 'flex',
  margin: '0',
  marginTop: '0px',
  "@media screen and (max-width:600px)":{
    display:'block',
    paddingBottom:'10px',
    marginTop:'20px',
  }
});

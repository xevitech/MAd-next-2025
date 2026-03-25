import { Box, styled } from '@mui/material';
export const CustomChip :any=styled('div')(({breakPoints}:any)=>({
  height: '32px',
  width: 'fit-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(34, 51, 84, 0.1)',
  borderRadius: '99px',
  padding: '6px',
  fontWeight: 600,
  fontSize:breakPoints?.max768px?"12px":"12px",
  lineHeight: '18px',
  minWidth:breakPoints?.max768px?"65px":"74px",
  marginRight: '10px',marginBottom:'8px',
  "@media screen and (max-width: 767px)": {
    margin:"0 5px 5px 0"
  },
}));

export const SellerJobDetail = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "13px",
    padding: "0 4px"
  },
  "& svg":{
    fontSize:"15px",
  },
  "& .Mui-checked":{
    color:"#d7282f !Important"
  },
  "& .MuiButtonBase-root":{
    padding:3
  }
});

export const FieldsBoxCon = styled(Box)({
 margin:"10px 0 0"
});


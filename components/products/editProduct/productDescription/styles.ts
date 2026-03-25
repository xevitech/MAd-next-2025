import { Box, styled, Typography } from '@mui/material';
export const ProductContentContainer = styled('div')({
  // padding: '16px',
  width: '100%',
  background: '#ffff',
  marginTop: '16px',
  borderRadius: "6px",
  // boxShadow:
  //   '0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  alignItems: 'center',
  flexDirection: 'column',
});

export const ProductSectionHeaderContainer = styled('div')({
  height: '35px',
  borderBottom: '1px solid #DDDDDD',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '25px',
  width: '100%',
  marginBottom: '8px',
});

export const ProductDescriptionFileUploader = styled('div')({
  width: '100%',
  border: '1px dashed #BBBBBB',
  borderRadius: '4px',
  height: '102px',
  position: 'relative',
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
  margin: 'auto',
  marginTop: '8px',
});


export const ProductDescriptionInput: any = styled("div")(({ breakPoints }: any) => ({
  width: "100%",
  //display: "flex",
  display: breakPoints?.max768px ? "block" : "flex",
  gap: "16px",
  position: 'relative',
  '& .style_add_meta__vCqwd': {
    position: 'relative',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-17px',
  },
}));

export const ProductDescriptionInputFull: any = styled("div")(({ breakPoints }: any) => ({
  width: "100%",
  display: "block",
  gap: "16px"
}));

export const ProductDesApplicationAndUseCases = styled('div')({
  // padding:"20px 0 0"
  "& .redStar":{
    color:"#d7282f"
  }
});
export const ProductAppUseTitle = styled(Typography)({
  fontSize: "14px", fontWeight: "600", color: "#000",
  margin: "0 0 6px"
});
export const ProductSelctionDropdown = styled(Box)({
  margin:"5px 0 0",
  "& .MuiAutocomplete-listbox": {
    "& .MuiTypography-body1": {
      fontSize: "12px"
    },
    "& .MuiListItemIcon-root": {
      minWiodth: "40px",

    }
  },
  "& .MuiInputBase-sizeSmall":{
    paddingTop:"10px !important",
    paddingBottom:"10px !important"
  }
});

export const AttributeCheckChipBox = styled(Box)({
  border: "1px solid #B3B1B1",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "24px",
  display: "flex",
  paddingRight: "6px",
  borderRadius: "6px",
  cursor: "pointer",
  height: "100%",
  // margin: "0 6px 6px 0px",
  alignItems: "center",
  "&:hover": {
    border: "1px solid #d7282f",
    "& svg": {
      color: "#d7282f !Important",
    },
  },
  "& img": {
    // borderRadius: "12px 0 0px 12px",
  },
  "& svg": {
    color: "rgba(0, 0, 0, 0.4) !important",
    fontSize: "16px !important",
  },
  "& .MuiAutocomplete-tag": {
    margin: 0,
  }
});
export const AttributeRedCheck = styled(Box)({
  position: "relative",
  display: "inline-block",
  width: "22px",
  height: "24px",
  borderTopLeftRadius: "6px",
  borderBottomLeftRadius: "6px",
  border: "none",
  backgroundColor:'#d7282f'
});

export const AttributeTooltipBox = styled(Box)({
  "& svg": {
    cursor: "pointer",
  },
  "& .redstar": {
    color: "#d7282f",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .orangestar": {
    color: "#FFA700",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .yellowstar": {
    color: "#F2E803",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .lightgreenstar": {
    color: "#92E203",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .greenstar": {
    color: "#2CBA00",
    opacity: "0.2",
    "&:hover": {
      opacity: 1,
    },
  },
  "& .opacityONE": {
    opacity: 1,
  },
});

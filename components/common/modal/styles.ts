import { Box, styled } from "@mui/material";
import { makeStyles } from 'tss-react/mui';

/**** responsive css ****/
export const useStyles = makeStyles()((theme) => {
  return {
    modalheading: {
      "@media screen and (max-width: 767px)": {
        fontSize: "16px",
      }
    }
  }
});


export const InputItemContainer: any = styled("div")(
  ({ breakPoint, flexColumn, padding, transform }: any) => ({
    position: "relative",
    flex: 0.48,
    display: "flex",
    marginBottom: "20px",
    width: breakPoint?.max540px && "100%",
    flexDirection: flexColumn ? "column" : "row",
    gap: flexColumn && "16px",
    padding: padding?.padding,
    transform: transform?.up && "translatey(-11px)",
  })
);
export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  outline: "none",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,

  "@media screen and (max-width: 480px)": {
    width: "90%",
  }
};
export const Modalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  outline: "none",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "6px",
  p: 2,
  px: 3,

  "@media screen and (max-width: 480px)": {
    width: "90%",
  }
};

export const ModalHeader = styled("div")({
  fontWeight: 700,
  fontSize: "23px",
  lineHeight: "130.9%",
  display: "flex",
  width: "100%",
  marginBottom: "20px",
  fontFamily: "open sans",

  color: "#223354",
});

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20px",
});

export const ContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});
export const UploadFileBtn = styled(Box)({
  marginTop: '20px',
});


export const ComopanyLicenceBox = styled(Box)({
  border: "1px solid #C5C5C5",
  fontWeight: 400,
  fontSize: "13px",
  letterSpacing: "0.09px",
  color: "#444444",
  borderRadius: "4px",
  gap: "5px",
  alignItems: "center",
  padding: "7px 3px",
  display: "flex",
  width: "135px",
  margin: "10px 0 0"
});


export const ComopanyVisibilityIcon = styled(Box)({
  display: "flex",
  borderLeft: "1px solid #C5C5C5",
  paddingLeft: "5px",
  paddingRight: "5px",
  cursor: "pointer",
  position: "relative",
  margin: "auto",
  "& svg": {
    fontSize: "16px"
  }
});

export const CommonDialogHeader =({
"& .MuiDialogTitle-root":{
  backgroundColor: "#ffe9ea",
  padding:"10px 16px",
  fontSize:"18px",
  color:"#231f20"
},
"& .MuiDialogActions-root":{
  padding:"14px"
},
"& .MuiDialogContent-root":{
  padding:"25px 20px"
},
"& .MuiIconButton-root":{
  padding:"4px",
  color:"#231f20"
}

});



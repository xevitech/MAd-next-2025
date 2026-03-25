import { Label } from "@mui/icons-material";
import { Box, Button, Typography, styled } from "@mui/material";
import Avatar from "react-avatar";

export const labelStyles = {};

export const ButtonContainer = styled("div")({
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20px",
  textAlign: "center",
  width: "50%",
  display: "flex",
  gap: "10px",
  margin: "0 auto",
});
export const imageStyles = {
  height: "280px",
  width: "360px",
};
export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 440,
  outline: "none",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
  minHeight: 228,
  "@media screen and (max-width: 600px)": {
    width: "90%",
  },
};

export const OuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});
export const InputItemContainer: any = styled("div")(
  ({ breakPoint, flexColumn, padding, transform }: any) => ({
    position: "relative",
    flex: 0.48,
    display: "flex",
    width: breakPoint?.max540px && "100%",
    flexDirection: flexColumn ? "column" : "row",
    gap: flexColumn && "16px",
    padding: padding?.padding,
    margin: "20px",
  })
);

export const ModalHeading = styled("div")({
  fontWeight: 700,
  fontSize: "23px",
  lineHeight: "normal",
  display: "flex",
  alignItems: "center",
  color: "#223354",
  textAlign: "center",
  padding: "20px",
});

export const UpdateBtn = styled(Button)({
  fontWeight: "bold !important",
  height: "36px !important",
  display: "inline-flex !important",
  margin: "auto !important",
  backgroundColor: "#fff !important",
  border: "1px solid #d7282f !important",
  color: "#d7282f !important",
  boxShadow: "none !important",
  "&:hover": {
    background: "#DD484E !important",
    color: "#fff !important",
  },
});

export const UpAvatar = styled(Avatar)({
  objectFit: "cover",
  margin: "0 0 0 3px",
  width: "35px !important",
    height: "35px !important",
});

export const ProfileStylelabel: any = styled(Label)({
  background: "rgba(34, 51, 84, 0.1)",
  border: "1px dashed rgba(34, 51, 84, 0.3)",
  borderRadius: "6px",
  width: "100%",
  height: "118px",
  display: "flex",
  justifyContent: "center",
  paddingBottom: "20px",
  position: "relative",
});

export const ProgressImage = styled('div')({
  background:"#fbe7e8",
  borderRadius:"6px",
  margin:"8px 0 0",
  padding:"6px 0",
  position: "relative",
  display: "flex",
});
export const ImageName = styled('div')({
 color:"#000",
 fontSize:"13px", padding:"0 16px ",fontWeight:500
});

export const ImageSize = styled('div')({
  color:"#535455",
  fontSize:"12px", padding:"0 16px ", fontWeight:500
 });

export const StatusBar = styled('div')({
  display:"flex",
 justifyContent:"space-between"
 });

 export const StatusTypography = styled(Typography)({
 fontSize:"14px", fontWeight:500
 });

 export const ProfileProgress = styled(Box)({
  margin:"1rem 0 0"
  });
 


 


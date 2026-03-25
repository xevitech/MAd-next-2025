import { Box, Checkbox } from "@mui/material";
import { styled, ToggleButton } from "@mui/material";

export const ContainerHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#FFFFFF",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 10,
});

export const CheckboxContainer = styled(Checkbox)({
  color: "#D7282F",
  borderRadius: "4px",
  "&.Mui-checked": {
    color: "#D7282F",
  },
});

export const WebsiteContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  minHeight: "45px",
  alignItems: "center",
  flex: 1,
});

export const WebsiteContainerText = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#848487",
  justifyContent: "center",
  paddingLeft: "55px",
  marginBottom: 5,
});

export const WebsiteMainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderBottom: "1px solid rgba(34, 51, 84, 0.1)",
});

export const CompanyRegistrationContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const CompanyRegistrationText = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  marginTop: "9px",
});

export const UploadButtonContainer = styled("div")({
  display: "flex",
  flex: 0.5,
  justifyContent: "flex-start",
  gap: 5,
});

export const UploadButtonStyle = styled(ToggleButton)({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "13px",
  lineHeight: "185x",
  display: "flex",
  textTransform: "none",
  alignItems: "center",
  borderRadius: "6px",
  width: " 87.25px",
  height: "30.43px",
  background: "#D7282F",
  opacity: 0.85,
  color: "#FFFFFF",
  "&:hover": {
    color: "#FFFFFF",
  },
});

export const UploadedFileContainer = styled("div")({
  display: "flex",
  width: "151px",
  height: "30px",
  background: "#FFFFFF",
  border: " 1px solid #EAEAEA",
  borderRadius: "4px",
  justifyContent: "space-around",
});

export const UploadedFileText = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
  display: "flex",
  alignItems: "center",
  color: "#223354",
});

export const SaveButton = styled(ToggleButton)({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "21px",
  lineHeight: "29px",
  display: "flex",
  textTransform: "none",
  alignItems: "center",
  borderRadius: "6px",
  width: " 125px",
  height: "45px",
  background: "#D7282F",
  opacity: 0.85,
  color: "#FFFFFF",
});

export const SaveButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginRight: 20,
  marginTop: 10,
  marginBottom: 10,
  gap: 5,
});

export const DescriptionTextContainer = styled("div")({
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "0.09px",
  color: "#848487",
  justifyContent: "space-between",
  flex: 0.75,
});
export const CountryInput = styled(Box)({
 '& .MuiAutocomplete-root':{
    '& .MuiInputBase-root':{
      '&.MuiInputBase-sizeSmall':{
        paddingTop:'0',
        paddingBottom:'0',
        '& .MuiInputBase-input':{
          padding:'5px!important',
        },
      },
    },
 },
});
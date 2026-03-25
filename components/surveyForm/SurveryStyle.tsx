import {
  Box,
  Button,
  Checkbox,
  Radio,
  Slider,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

export const SurveyOuterBox = styled(Box)({
  background: "#fff",
  height: "100%",
  padding: "0 0 50px 0",
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "11px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
  },
});
export const SurveyInnerBox = styled(Stack)({
  paddingTop: "80px",
  width: "70%",
  margin: "0 auto",
  "@media screen and (max-width:1024px)": {
    width: "100%",
    padding: "20px",
  },
  "@media screen and (max-width:900px)": {
    padding: "16px",
  },
});
export const SurveyLogoBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  "& img": {
    height: "98px",
    "@media screen and (max-width:900px)": {
      height: "auto",
      width: "100%",
    },
  },
});
export const SurveyHeadingBox = styled(Box)({
  margin: "60px 0 0 0",
  "@media screen and (max-width:900px)": {
    margin: "20px 0 0 0",
  },
});
export const SurveyHeading = styled(Typography)({
  fontSize: "30px !important",
  fontWeight: "700",
  color: "#231f20",
  "@media screen and (max-width:900px)": {
    fontSize: "20px !important",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "18px !important",
  },
  "@media screen and (max-width:480px)": {
    fontSize: "16px !important",
    textAlign:'center'
  },
});
export const SurveyContentBox = styled(Box)({
  margin: "30px 0 0 0",
  width: "100%",
});
export const SurveyProgressBox = styled(Box)({
  backgroundColor: "#ffe4e5",
  borderRadius: "10px 10px 0 0",
  padding: "20px 50px",
  width: "100%",
  position: "sticky",
  top: "0px",
  zIndex: 1,
  opacity: 1,
  "& .progressBarStyle": {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#d7282f !important",
      borderRadius: "20px",
    },
    "&.MuiLinearProgress-root": {
      backgroundColor: "#fff !important",
      height: "14px",
      borderRadius: "20px",
    },
  },
});
export const SliderStyle = styled(Slider)({
  "& .MuiSlider-thumb": {
    display: "none",
  },
  "& .MuiSlider-track": {
    height: "14px",
    backgroundColor: "#d7282f",
    border: "1px solid #d7282f",
  },
  "& .MuiSlider-rail": {
    height: "14px",
    backgroundColor: "#fff",
    opacity: "1",
  },
});
export const SurveyFormBox = styled(Box)({
  backgroundColor: "#F9F9F9",
  borderRadius: " 0 0 10px 10px",
  padding: "20px 40px",
  width: "100%",
});
export const SurveyOrderedList = styled("ol")({});
export const SurveyList = styled("li")({
  "::marker": {
    fontSize: "20px !important",
    fontWeight: "700",
  },
  margin: "8px 0 0 0",
  "& .labelstyle": {
    "& .MuiFormControlLabel-label": { fontSize: "14px", fontWeight: "500" },
  },
});
export const SurveyListHeading = styled(Typography)({
  fontSize: "20px",
  fontWeight: "600",
  color: "#231f20 ",
  "@media screen and (max-width:900px)": {
    fontSize: "18px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "16px",
  },
});
export const SurveyListInnerHeading = styled(Typography)({
  fontSize: "18px",
  fontWeight: "600",
  color: "#231f20",
  "@media screen and (max-width:900px)": {
    fontSize: "16px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "15px",
  },
});
export const SurveyListInnerText = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  color: "#231f20",
  margin: "10px 0 4px 0",
  "@media screen and (max-width:900px)": {
    fontSize: "14px",
  },
  "@media screen and (max-width:600px)": {
    fontSize: "13px",
  },
});
export const SurveyTextFieldBox = styled(Box)({
  margin: "12px 0 0 0",
});
export const SurveyTextField = styled(TextField)({
  width: "60%",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiInputBase-input": {
    backgroundColor: "#fff",
  },
  "@media screen and (max-width:900px)": {
    width: "100%",
  },
});
export const SurveyRadioButton = styled(Radio)({
  color: "default",
  "&.Mui-checked": {
    color: "#d7282f",
  },
  svg: { fontSize: "18px" },
});
export const SurveyCheckboxBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
});
export const SurveyCheckboxStyle = styled(Checkbox)({
  color: "default",
  "&.Mui-checked": {
    color: "#d7282f ",
  },
  svg: { fontSize: "18px" },
});
export const SurveyInnerList = styled("ol")({
  margin: "12px 0 12px 18px",
});
export const SurveyInnerListData = styled("li")({
  "::marker": {
    fontSize: "20px !important",
    fontWeight: "700",
  },
  margin: "0 0 12px 0",
  "& .RatingStyle": {
    fontSize: "32px",
  },
});
export const SurveySubmitButtonBox = styled(Box)({
  margin: "30px 0 0 0",
});
export const SurveySubmitButton = styled(Button)({
  background: "#d7282f",
  color: "#fff",
  padding: "12px 22px",
  transition: "all ease .3s",
  fontSize: "14px",
  border: "1px solid #d7282f",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#d7282f",
    border: "1px solid #d7282f",
    transition: "all ease .3s",
  },
});

import { styled } from "@mui/styles";

export const LargeTextContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "34px",
  color: "#231F20",
  textAlign: "center",
 
  "@media screen and (max-width:350px)":{
    lineHeight:'20px'
  }
});
export const SmallTextContainer = styled("div")(({ value }: any) => ({
  ...value,
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "20px",
  color: value?.color || "#404040",
  textAlign: "center",

}));

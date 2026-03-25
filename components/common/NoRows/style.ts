import { styled } from "@mui/styles";

export const LargeTextContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "25px",
  lineHeight: "34px",
  color: "#231F20",
  textAlign: "center",
});
export const SmallTextContainer = styled("div")(({ value }: any) => ({
  ...value,
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "20px",
  lineHeight: "26px",
  color: value?.color || "#404040",
  textAlign: "center",
}));

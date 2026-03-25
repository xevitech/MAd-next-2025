import { styled } from "@mui/material";
export const CustomChip: any = styled("div")(({ breakPoints }: any) => ({
  height: "32px",
  width: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(34, 51, 84, 0.1)",
  borderRadius: "99px",
  padding: "6px",
  fontWeight: 600,
  fontSize: breakPoints?.max768px ? "12px" : "12px",
  lineHeight: "18px",
  minWidth: breakPoints?.max768px ? "65px" : "74px",
  marginLeft: "10px",
  marginBottom: "8px",
  "@media screen and (max-width: 767px)": {
    margin: "0 5px 5px 0",
  },
}));

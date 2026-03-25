import { styled } from "@mui/material";

export const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "20px",
  width: "40%",
  margin: "0 auto",
  paddingBottom: "10px",
  gap: "20px",
});
export const ImageStyles = styled("div")({
  position: "relative",
  objectFit: "cover",
  margin: "15px auto 0",
  minWidth: "300px",
});
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
  "@media screen and (max-width: 500px)": {
    width:"90%",
    padding:"12px 25px",
  }
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
  lineHeight: "130.9%",
  display: "flex",
  alignItems: "center",
  color: "#223354",
  textAlign: "center",
  padding:"10px 20px 20px"
});

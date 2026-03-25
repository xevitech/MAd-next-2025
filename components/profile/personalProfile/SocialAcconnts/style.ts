import { styled } from "@mui/styles";

export const AddAccountContainer = styled("div")({
  display: "flex",
  padding: "16px",
  flex: 1,
  gap: "20px",
  alignItems: "center",
});

export const AccountFieldContainer = styled("div")(({ value }: any) => ({
  display: "flex",
  flex: value.flex,
}));

export const TextFieldButtonContainer = styled("div")(({ value }: any) => ({
  display: "flex",
  flex: 1,
  gap: "20px",
  justifyContent: "flex-start",
  alignItems: "center",
}));

export const AccountTypeContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "14px",
  lineHeight: "19px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
});
export const AccountLinkContainer = styled("div")({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "15px",
  lineHeight: "20px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
});

export const ButtonContainer = styled("div")({
  padding: "16px",
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px",
});

export const LogoContainer = styled("div")({
  display: "flex",
  gap: 20,
  alignItems: "center",
});

export const ListContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
});

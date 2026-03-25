import { Typography ,styled} from "@mui/material";
import React from "react";
import router from "next/router";
import { makeStyles } from "tss-react/mui";
import Box from "@mui/material/Box";
const useStyles = makeStyles()(() => {
  return {
    Outercontainer: {
      width: "100%",
      height: "500px",
      display: "flex",
      justifyContent: "center",
      background: "#fff",
      boxShadow:
        "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
      border: "1px solid #E0E3E7",
      borderRadius: "6px",
      textAlign: "center",
      minHeight: "300px",
    },
    container: {
      alignSelf: "center",
    },
    heading: {
      color: "#393939",
      fontWeight: 700,
      fontSize: "25px !important",
      margin: "8px 0 8px !important",
    },
    txtt: {
      fontSize: "20px",
      color: "#404040",
    },
    link: {
      color: "#1976d2",
      cursor: "pointer",
      textDecoration: "underline",
      padding: "8px 0",
      "&:hover": {
        textDecoration: "none",
      },
    },
  };
});
export const Outercontainer = styled(Box)(() => ({
  width: "100%",
  height: "500px",
  display: "flex",
  justifyContent: "center",
  background: "#fff",
  boxShadow:
    "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
  border: "1px solid #E0E3E7",
  borderRadius: "6px",
  textAlign: "center",
  minHeight: "300px",
}));
export const Container = styled(Box)(() => ({
  alignSelf: "center",
}));
export const Heading = styled(Typography)(() => ({
  color: "#393939",
  fontWeight: 700,
  fontSize: "25px !important",
  margin: "8px 0 8px !important",
}));
export const Text = styled(Typography)(() => ({
  fontSize: "20px",
  color: "#404040",
}));
export const TextLink = styled(Typography)(() => ({
  color: "#1976d2",
  cursor: "pointer",
  textDecoration: "underline",
  padding: "8px 0",
  "&:hover": {
    textDecoration: "none",
  },
}));
export const AccessDenied = () => {
  const { classes } = useStyles();
  const NavigateHandler = (route: string ) => router.push(route);
  return (
    <>
      <Outercontainer>
        <Container>
          <img src="/assets/access_denied.svg" alt="" />
          <Heading
            variant="h4"
            style={{ fontWeight: 700 }}
          >
            Access Denied
          </Heading>
          <Text>
            You don't have permission to access this page
          </Text>

          <TextLink
            onClick={(e) => {
              NavigateHandler("/profile/");
            }}
          >
            Go to home page
          </TextLink>
        </Container>
      </Outercontainer>
    </>
  );
};

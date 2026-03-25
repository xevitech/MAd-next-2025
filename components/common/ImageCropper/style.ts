import { Box, styled } from "@mui/material";

export const styles = (theme) => ({
  cropContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    marginLeft: 16,
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 16,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px",
    },
  },
});

export const CropContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: 400,
  background: "#333",
  "@media screen and (max-width:600px)": {
    height: 300,
  },
  "@media screen and (max-width:1024px) and (orientation:landscape)": {
    height: 250,
  },
  "@media screen and (max-width:900px) and (orientation:landscape)": {
    height: 190,
  },
  "@media screen and (max-width:767px) and (orientation:landscape)": {
    height: 150,
  }
});

export const Controls = styled(Box)({
  padding: 16,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "stretch",
  "@media screen and (max-width:1024px)": {
    padding: "  4px 16px"
  },

  "@media screen and (max-width:899px) and (orientation:landscape)": {
    display: 'flex',
  },
  "@media screen and (max-width:600px)": {
    display: 'block', padding: 10
  },



});

export const SliderContainer = styled(Box)({
  display: "flex",
  flex: "1",
  alignItems: "center",
  gap: 20,
});

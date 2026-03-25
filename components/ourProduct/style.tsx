import { Box, Typography,styled } from "@mui/material";

export const MainBox = styled(Box)(() => ({
  backgroundColor: '#fff',

}));

export const Bgimage = styled(Box)(() => ({
  backgroundImage: `url('/assets/bannerforblog.svg')`,
  height: "40vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  position: "relative",
  width: "100%",
  "&:before": {
    content: '" "',
    width: "100%",
    height: "100%",
    backgroundColor:
      "rgba(0,0,0,0.66)",
    position: "absolute",
  },
}));

export const Textoverimg1 = styled(Typography)(() => ({
  fontSize: "40px !important",
  fontWeight: "700",
  color: "#FFFFFF",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media screen and (max-width:600px)": {
    fontSize: "13px !important",
    fontWeight: 'bold',
  },
  "@media (min-width:600px) and (max-width:900px)": {
    fontSize: "20px !important",
    fontWeight: 'bold',
  },
  "@media (min-width:901px) and (max-width:1200px)": {
    fontSize: "25px !important",
    fontWeight: 'bold',
  },
  "@media and (max-width:1201px)": {
    fontSize: "21px !important",
    fontWeight: 'bold',
  },
}));

export const Textoverimg2 = styled(Typography)(() => ({
  fontSize: "20px !important",
  fontWeight: "600",
  color: "#FFFFFF",
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media (min-width:300px) and (max-width:600px)": {
    fontSize: "13px !important",
    fontWeight: 'bold',
  },
  "@media (min-width:600px) and (max-width:900px)": {
    fontSize: "20px !important",
    fontWeight: 'bold',
  },
}));

export const BoxBorder = styled(Box)(() => ({
  border: '1px solid #DBDBDB ',
  borderRadius: '10px',
  AlignItems: 'center',
  textAlign: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
  "&:hover": {
    boxShadow: '0 0 9px -1px #cccccc',
  },
}));

export const Heading = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: '600',
  color: '#231F20'
}));

export const Text = styled(Typography)(() => ({
  fontSize: '13px',
  fontWeight: '600',
  color: '#4A4A4A'
}));

export const Snakebg = styled(Box)(() => ({
  backgroundImage: `url('/assets/snakedesign.svg')`,
  height: 'auto',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 -140px',
  padding: '100px',
  "@media screen and (max-width:1600px)": {
      padding: '30px 20px 60px',
  },
}))

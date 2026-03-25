import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ButtonBase, InputBase, Tab, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Tabs from "@mui/material/Tabs";

// Saller detail style **************************

export const SellerOuter = styled(Box)(({ theme }) => ({
  borderRadius: "6px",
  background: "white",
  border: "1px solid #d2d2d2",
  padding: "16px",
  "& .activeScrollspy a": {
    color: "#d7282f",
  },
  "& .activeScrollspy i:before": {
    color: "#d7282f",
  },

  "& .activeScrollspy": {
    "& .icon-project_photos span:before": {
      color: "#d7282f",
    },
    "& .icon-RD_management span:before": {
      color: "#d7282f",
    },
    "& .icon-QA_QC span:before": {
      color: "#d7282f"
    }

  }
}));
export const SellerOuterCon = styled(Box)(({ theme }) => ({
  padding: "16px",
  marginBottom: "16px",
  background: "#fff",
  borderRadius: "6px",
}));

export const StickyBar = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "70px",
  transition: "all ease .5s",
}));
export const SellerHeading = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  "& h4": {
    fontSize: "21px",
    fontWeight: 700,
    color: "#231F20",
  },
  "& button": {
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 700,
    color: "white",
    background: "#D7282F",
    padding: "9px 12px",
    "& img": {
      marginRight: "8px",
    },
  },
  [theme.breakpoints.down("lg")]: {
    "& h4": {
      fontSize: "18px",
    },
    "& button": {
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: 700,
      color: "white",
      background: "#D7282F",
      padding: "9px 12px",
      "& img": {
        marginRight: "8px",
      },
    },
  },
}));

export const Sellername = styled(Box)(({ theme }) => ({
  "& p": {
    fontSize: "14px",
    fontWeight: 600,
    color: "#223354",
    textTransform: "capitalize",
  },
  "& span": {
    fontSize: "13px",
    fontWeight: 400,
    color: "rgba(34, 51, 84, 0.5)",
    textTransform: "capitalize",
  },
  [theme.breakpoints.down("lg")]: {
    "& p": {
      fontSize: "16px",
    },
    "& span": {
      fontSize: "12px",
    },
    "& .MuiAvatar-root": {
      width: "60px",
      height: "60px",
    },
  },
}));

export const ChatButton = styled(ButtonBase)(({ theme }) => ({
  background: "#D7282F !important",
  fontSize: "14px",
  fontWeight: 600,
  color: "white !important",
  padding: "8px 12px !important",
  borderRadius: "6px !important",
  "& img": {
    marginRight: "8px",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "14px",
  },
}));

export const SendButton = styled(ButtonBase)(({ theme }) => ({
  background: "rgba(215, 40, 47, 1) !important",
  fontSize: "15px",
  fontWeight: 700,
  color: "white !important",
  padding: "10px 12px !important",
  borderRadius: "6px !important",
  [theme.breakpoints.down("lg")]: {
    fontSize: "14px",
  },
}));

// Rating style ****************************

export const Ratingcontainer = styled(Box)(({ theme }) => ({
  "& h5": {
    fontSize: "21px",
    fontWeight: 700,
    color: "#223354",
  },
  [theme.breakpoints.down("lg")]: {
    "& h5": {
      fontSize: "18px",
    },
  },
}));
export const RatingFlex = styled(Stack)(({ theme }) => ({
  "& h6": {
    color: "#223354",
    fontWeight: 700,
    fontSize: "16px",
  },
  "& h3": {
    color: "#223354",
    fontWeight: 700,
    fontSize: "25px",
  },
  [theme.breakpoints.down("lg")]: {
    "& h6": {
      fontSize: "14px",
    },
    "& h3": {
      fontSize: "22px",
    },
  },
}));

export const MiniSortContainer = styled(Box)(({ theme }) => ({
  borderRadius: "6px",
  background: "white",
}));

export const MiniSortStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  gap: "8px",

  "& h5": {
    color: "#000",
    fontWeight: 700,
    fontSize: "21px",
  },
  "& button": {
    padding: "0px 12px",
    boxSizing: "border-box",
    color: "#231f20",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "6px",
    "&:hover": {
      color: "#d7282f",
    },
    "&:active": {
      color: "#d7282f",
    },
  },
  [theme.breakpoints.down("md")]: {
    "& h5": {
      fontSize: "18px",
    },
    "& button": {
      padding: "0px 9px",
      fontSize: "13px",
    },
  },
}));

export const CategoryTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-scroller": {
    padding: "10px 0px",
    "@media screen and (max-width:600px)": {
      height: "75px",
    },
  },
  "& button": {
    color: "#231F20",
    padding: "0px 20px",
    textTransform: "inherit",
    fontWeight: "600",
    letterSpacing: "inherit",
    "& img": {
      width: "36px",
      height: "36px",
    },
  },
  "& button:hover": {
    color: "rgba(215, 40, 47, 0.85)",
  },
  "& button:active": {
    color: "rgba(215, 40, 47, 0.85)",
  },
  "& button:focus": {
    color: "rgba(215, 40, 47, 0.85)",
  },
  "& button.Mui-selected": {
    color: "rgba(215, 40, 47, 0.85)",
  },
  "& .MuiTabs-indicator": {
    color: "rgba(215, 40, 47, 0.85)!important",
    background: "rgba(215, 40, 47, 0.85)!important",
  },
  "& svg": { color: "black" },
  [theme.breakpoints.down("md")]: {
    "& .MuiTabs-scroller": {
      padding: "6px 0px",
    },
    "& button": {
      padding: "0px 15px",
      fontSize: "13px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiTabs-scroller": {
      padding: " 0px",
    },
    "& button": {
      padding: "0px 10px",
      fontSize: "12px",
      minHeight: "auto",
    },
    "& .MuiTabs-flexContainer": {
      height: "100%",
    },
  },
}));

export const CategoryTab = styled(Tab)(({ theme }) => ({}));

export const MiniSectionWrapper = styled(Box)(({ theme }) => ({
  borderRadius: "6px",
  background: "white",
  boxShadow:
    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
}));
export const CssGridBox = styled(Box)(({ theme }) => ({
  gap: "16px",
  display: "grid",
  gridTemplateColumns: "repeat( 1, minmax(250px, 1fr) )",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat( 3, minmax(250px, 1fr) )",
  },
}));
export const CssGridBox4Item = styled(Box)(({ theme }) => ({
  gap: "16px",
  display: "grid",
  gridTemplateColumns: "repeat( 1, minmax(250px, 1fr) )",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat( 4, minmax(250px, 1fr) )",
  },
}));

export const CssGridBox4ItemProductlisting = styled(Box)(({ theme }: any) => ({
  gap: "16px",
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(250px, 1fr) )",

  [theme.breakpoints.only("lg")]: {
    gap: "8px",
    gridTemplateColumns: "repeat(4, minmax(150px, 1fr) )",
  },

  [theme.breakpoints.only("md")]: {
    gridTemplateColumns: "repeat( 3, minmax(150px, 1fr) )",
  },
  [theme.breakpoints.between("600px", "900px")]: {
    gridTemplateColumns: "repeat(3, minmax(150px, 1fr) )",
  },
  [theme.breakpoints.only("sm")]: {
    flexDirection: "column",
    gap: "16px",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr) )",
  },
  [theme.breakpoints.only("xs")]: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    gridTemplateColumns: "repeat(2, minmax(100px, 1fr) )",
  },
  "@media only screen and (max-width: 1750px) and (min-width: 1536px)": {
    gap: "8px",
    gridTemplateColumns: "repeat(4, minmax(100px, 1fr) )",
  },
  "@media only screen and (max-width: 1250px) and (min-width: 1199px)": {
    gap: "5px",
  },
}));

export const ProductGridBox = styled(Box)(({ theme }) => ({
  gap: "16px",
  display: "grid",
  gridTemplateColumns: "repeat( 4, minmax(250px, 1fr) )",
}));

export const AboutUsHeading = styled(Box)(({ theme }) => ({}));
export const AboutLinkCol = styled(Box)(({ theme }) => ({}));

/******************* Contact Seller Chat styling *****************/
export const ContactSellerMini = styled(Box)(({ theme }) => ({
  borderRadius: "6px",
  background: "white",
  border: "1px solid #d2d2d2",
  "& .activeScrollspy a": {
    color: "#d7282f",
  },
  "& .activeScrollspy i:before": {
    color: "#d7282f",
  },

  "& .activeScrollspy": {
    "& .icon-project_photos span:before": {
      color: "#d7282f",
    },
    "& .icon-RD_management span:before": {
      color: "#d7282f",
    },
    "& .icon-QA_QC span:before": {
      color: "#d7282f",
    },
  },
}));
export const BImageBox = styled(Box)(({ theme }) => ({}));
export const ChatContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "16px",
  gap: "18px",
});

export const MessageBubble = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#f5f5f5",
  color: "#231f20",
  padding: "10px 15px 20px",
  borderRadius: "10px",
  // maxWidth: '300px',
  width: "100%",
  wordBreak: "break-word",
  "& .MuiTypography-root": {
    fontWeight: "600",
    fontSize: "14px",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "10px",
    left: "-10px",
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "10px 10px 10px 0",
    borderColor: `transparent #f5f5f5 transparent transparent`,
  },
}));

export const Timestamp = styled(Typography)({
  fontSize: "12px",
  color: "#888",
  marginTop: "4px",
  textAlign: "right",
});
export const GradientBox = styled(Stack)({
  backgroundImage: "linear-gradient(to right, #D7282F, #000)",
  padding: "7px 10px",
  borderRadius: "6px 6px 0 0px",
  "& .MuiTypography-root": {
    color: "#fff",
  },
});

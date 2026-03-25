import { styled } from "@mui/system";
import { AppBar, Box, Button, Typography } from "@mui/material";

export const CustomisedButton = styled(Button)({
  background: "rgba(215, 40, 47, 0.8)",
  color: "#FFFFFF",
  width: "130px",
  height: "35px",
  marginLeft: "10px",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19px",
  borderRadius: "6px",
  textTransform: "none",
  "&:hover": {
    background: "rgba(40, 40, 43,01)",
  },
});

export const LogoImage = styled("img")({
  height: "44px",
  width: "44px",
  cursor: "pointer",
});

export const HeaderRightContentContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1px",
  "@media screen and (max-width: 1024px)": {
    position: "absolute",
    right: "0",
    top: "5px",
  },
});

export const HeaderRightSideIconContainer = styled("div")({
  height: "44px",
  width: "44px",
  padding: "5px",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  position: "relative",
  transition: "none",
  border: "1px solid transparent",
  overflow: "hidden",
  "&.HeaderSearch": {
    "@media screen and (max-width:330px)": {
      display: "none",
    },
  },
  "& .headericon": {
    color: "#231F20",
    margin: "auto",

    "&:hover": {
      color: "#D7282f",
    },
  },
  "& .crossField": {
    color: "#231F20",
    margin: "auto",
    fontSize: "18px",
    position: "absolute",
    right: "-32px",
    transition: "all ease .3s",
    opacity: "0",
    zIndex: "1",
    "&:hover": {
      color: "#DD484E",
    },
  },
  "& .resetAll": {
    color: "#231F20",
    margin: "auto",
    fontSize: "18px",
    position: "absolute",
    right: "28px",
    "&:hover": {
      color: "#DD484E",
    },
  },
  "& .MuiInputBase-root": {
    width: "0px",
    transition: "all ease .2s",
    fontSize: "13px",
    
  },
  "&.active": {
    width: "320px",
    borderColor: "#d2d2d2",
    paddingLeft: "10px",
    borderRadius: "12px",
    height: "36px",
    backgroundColor: "white",
    "& .searchIco": {
      margin: "0",
    },
    "& .MuiInputBase-root": {
      width: "100%",
      paddingLeft: "4px",
    },
    "& .crossField": {
      opacity: "1",
      right: "8px",
    },
    "@media screen and (max-width: 767px)": {
      width: "205px",
    },
    "@media screen and (max-width:420px)": {
      width: "142px",
    },
  },
  "@media screen and (max-width: 767px)": {
    width: "32px",
    padding: 0,
  },
});

export const UserImage = styled("img")({});
export const UserImageContainer = styled("div")({
  cursor: "pointer",
});

export const UserNameContainer = styled("div")({
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

export const UserName = styled("span")({
  color: "#231f20",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "16px",
  whiteSpace: "nowrap",
  width: "180px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
});

export const HeaderContainer: any = styled("div")(({ breakPoints }: any) => ({
  minHeight: "50px",
  display: "flex",
  zIndex: "99",
  justifyContent: "space-between",
  top: "0",
  transition: "all ease .5s",

  // marginLeft: breakPoints?.max1024px
  //   ? "257px"
  //   : breakPoints?.max768px
  //     ? "0px"
  //     : "256px",
  // width: breakPoints?.max1024px
  //   ? "calc(100% - 257px)"
  //   : breakPoints?.max768px
  //   ? "calc(100% - 0px)"
  //   : "calc(100% - 256px)",
  background: "#FFFFFF",
  boxShadow: "0px 4px 5px #EFEFEF, 0px 2px 3px #EFEFEF",
  padding: "10px",

  marginLeft: "256px",
  width: "calc(100% - 256px)",
  "@media screen and (max-width: 1280px)": {
    marginLeft: "0",
    width: "100%",
    padding: "0px 25px 0px 50px",
    background: "#F4F4F4",
    minHeight: "61px",
    zIndex: "999",
  },

  "@media screen and (max-width: 1024px)": {
    marginLeft: "257px",
    width: "calc(100% - 257px)",
  },
  "@media screen and (max-width: 768px)": {
    marginLeft: "0",
    width: "calc(100% - 0px)",
  },
}));

export const AddListingBtnContainer = styled("div")({
  width: "fit-content",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width: 1280px)": {
    display: "none",
  },
});

export const Buttonlogout = styled(Button)({
  minWidth: "auto",
  padding: "0",
});

export const SmallLogoMobile = styled(Button)({
  display: "none",
  "@media screen and (max-width: 1280px)": {
    display: "block",
    width: "140px",
    height: "61px",
  },
  "@media screen and (max-width:480px)": {
    width: "115px",
    margin: "0",
  },
});

export const CurrencyDropdown = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // marginRight: "12px",
  "& .icon-currency": {
    fontSize: "24px",
    "@media screen and (max-width: 767px)": {
      fontSize: "20px",
    },
  },
  "&:hover": {
    "& .icon-currency": {
      color: "#d7282f",
    },
  },
  "& img":{
    margin:"0 6px 0 0"
  }
});

export const CurrenyList = styled(Box)({
  "& .MuiTypography-h6": {
    fontWeight: "600",
    fontSize: "15px",
    padding: "0 12px 6px",
    marginBottom: "6px",
    borderBottom: "1px solid #dddddd",
    color: "#000000",
  },
  "& .MuiFormControlLabel-root": {
    width: "100%",
    margin: "0",
    "& .MuiRadio-root": {
      padding: "4px",
      marginRight: "4px",
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "13px",
    },
  },
});
export const DropdownFooter = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  padding: "12px 12px 6px",
  marginTop: "6px",
  borderTop: "1px solid #dddddd",
  "& .MuiButtonBase-root": {
    padding: "1px 9px",
    fontSize: "11px",
  },
  "& .SaveBtn": {
    marginLeft: "10px",
    backgroundColor: "#d7282f",
    "&:hover": {
      backgroundColor: "#b50e15",
    },
  },
});

export const ListScroll = styled(Box)({
  maxHeight: "250px",
  overflowY: "auto",
  "@media screen and (max-width:900px)": {
    maxHeight: "200px",
  },
  // "@media screen and (max-width:767px)": {
  //   maxHeight: '150px',
  // },
  " @media (min-width: 280px) and (max-width: 653px) and (orientation: landscape)":
    {
      maxHeight: "130px",
    },
  "& .MuiMenuItem-root": {
    padding: "3px 7px",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
  },
});

export const CommonListMenuAdmin = {
  "& .MuiList-root": {
    "& .MuiMenuItem-root": {
      display: "flex",
      padding: "5px 11px",
      minHeight: "22px",
      alignItems: "center",
      justifyContent: "start",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "30px",
    },
  },
};
export const UserEmailAdmin = styled(Typography)({
  color: "#ccccc",
  fontWeight: 400,
  fontSize: "13px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  cursor: "pointer",
  wordBreak: "break-all",
});

export const StyleDialoge = {
  "& .MuiDialog-paper": {
    width: "450px",
  },
};

export const LogOutCloseButton = styled(Box)({
  height: "30px",
  width: "30px",
  backgroundColor: "#FFE8EC",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    color: "rgb(255, 26, 67)",
    fontSize: "18px",
    cursor: "pointer",
  },
});

export const CenterLogOutArea = styled(Box)({
  display: "flex",
  justifyContent: "center",
});
export const CenterLogOutButton = styled(Box)({
  height: "50px",
  width: "50px",
  borderRadius: "50%",
  border: "1px solid #d7272f",
  transform: "matrix(-1, 0, 0, 1, 0, 0)",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media screen and (max-width:600px)": {
    height: "40px",
    width: "40px",
  },
  "& svg": {
    color: "#FF1A43",
    fontSize: "2.8rem",
    "@media screen and (max-width:600px)": {
      fontSize: "25px",
    },
  },
});

export const MyContentArea = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "16px 24px 10px 24px",
  "& .MuiTypography-body1": {
    fontSize: "23px",
    color: "#231f20",
    fontWeight: "700",
    textAlign: "center",
    "@media screen and (max-width:320px)": {
      fontSize: "16px",
    },
  },
});

export const MyContentArea2 = styled(Box)({
  padding: "0px 24px 20px 24px",
  display: "flex",
  justifyContent: "center",
  "& .MuiTypography-body1": {
    fontSize: "16px",
    fontWeight: "400",
    color: "#4a4a4a",
    textAlign: "center",
    "@media screen and (max-width:320px)": {
      fontSize: "14px",
    },
  },
});

export const MyButtonSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 0 24px 0px",
  gap: "8px",
  "& .cancelbtn": {
    "&:hover": {
      backgroundColor: "#D7282F",
      color: "#fff",
      opacity: "0.85",
    },
    backgroundColor: "#fff",
    color: "#D7282F",
  },
});

export const StyledAppBar = styled(AppBar)({
  background: "#fff",
  boxShadow: "rgb(239, 239, 239) 0px 4px 5px, rgb(239, 239, 239) 0px 2px 3px",
});

export const TopHeadermenus = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "calc(100% - 256px)",
  marginLeft: "256px",
  // zIndex: "9",
  background: "#fff",
  boxShadow: "none",
  transition: "all ease .5s",

  "@media screen and (max-width: 1280px)": {
    marginLeft: "0",
    width: "100%",
    padding: "0px 25px 0px 50px",
    background: "#F4F4F4",
    minHeight: "61px",
    zIndex: "999",
  },

  "@media screen and (max-width: 1024px)": {
    marginLeft: "0",
    width: "100%",
  },
  "@media screen and (min-device-width: 769px) and (max-device-width: 1023px)":
    {
      marginLeft: "0px",
      width: "calc(100% - 0px)",
    },
  "@media screen and (max-width: 768px)": {
    marginLeft: "0",
    width: "calc(100% - 0px)",
  },
});
// searchbar for small screen
export const SearchOuter = styled(Box)({
  background: "#f4f4f4",
  display: "none",
  "@media screen and (max-width:480px)": {
    display: "block",
    padding: "0 40px 12px 40px",
  },
});
export const SearchInnerBox = styled(Box)({
  border: "1px solid #d2d2d2",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  borderRadius: "12px",
  height: "30px",
});

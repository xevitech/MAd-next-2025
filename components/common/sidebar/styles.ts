import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const LinearListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingLeft: "65px",
  marginTop: "10px",
  color: "#6E759F",
});

export const LinearListOuterContainer = styled("div")({
  width: "100%",
});

export const LinearListItemText = styled("p")({
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
  cursor: "pointer",
  width: "fit-content",

  "&:hover": {
    color: "#1A75FF ",
  },
});

export const TextHeaderContainer = styled("div")({
  color: "#323B78",
  fontWeight: 700,
  fontSize: "17px",
  lineHeight: "23px",
  width: "100%",
  paddingLeft: "26px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const TextHeaderText = styled("p")({
  display: "inline-block",
});
export const TextHeaderIconContainer = styled("span")({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
});

export const ForSellerHeader = styled("div")({
  width: "100%",
  height: "20px",
});

export const ForSellerHeaderText = styled("p")({
  color: "#CCCEDD",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "20px",
  textTransform: "uppercase",
  textAlign: "start",
  marginLeft: "30px",
});

export const MenuItemStandAloneButtonContainer = styled("div")({});
export const MenuItemStandAloneButton = styled(Button)({
  background: "#F6F8FB",
  width: "220px",
  borderRadius: "6px",
  cursor: "pointer",
  outline: "none",
  border: "none",
  marginTop: "10px",
  marginBottom: "10px",
  color: "#242E6F",
  fontWeight: 700,
  fontSize: "17px",
  lineHeight: "23px",
  height: "47px",
  textTransform: "none",
  padding: "0px",
  textAlign: "start",
  justifyContent: "flex-start",
  paddingLeft: "10px",
});

export const MenuItemsOuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
});

export const MenuFrontIconContainer = styled("span")({
  display: "inline-block",
  transform: `translatey(5px)`,
});

export const MenuEndIconContainer = styled("span")({
  display: "inline-flex",
  marginLeft: "1px",
  transform: "rotate(-90deg)",
});

export const SidebarMenuButtonTextWrapper = styled("span")({
  display: "inline-block",
  minWidth: "151px",
  textAlign: "start",
});

export const LogoContainer = styled("div")({
  display: "flex",
  width: "100%",
  alignItems: "center",
  height: "78px",
  justifyContent: "center",
});

export const LogoImage = styled("img")({
  cursor: "pointer",
});

export const UnderlinedDiv = styled("div")({
  border: "1px solid #F6F8FB",
  marginTop: "13px",
});
export const MenuItemContainer = styled("div")({});

export const UserSidebarContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    boxShadow: "0px 4px 3px #CCCEDD, 3px 0px 4px rgba(239, 239, 239, 0.5)",
    borderRadius: "0px 6px 6px 0px",
    width: "256px",
    transition: "all ease .5s",
    // zIndex: "9999",
    zIndex: "1200",
    "&.active-toggle": {
      "@media screen and (max-width:1280px)": {
        left: 0,
      },
      left: "-256px",
      "& .arrowToggle": {
        right: "-18px",
        borderRadius: "0px 4px 4px 0px",
        "& .MuiSvgIcon-root": {
          transform: "rotate(0deg)",
        },
      },
    },
  })
);

export const SidebarInnerContainer = styled("div")({
  background: "#FFFFFF",
  height: "100%",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "0px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  " & ::-webkit-scrollbar-thumb": {
    background: "#888",
  },
  " &::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  "& .ps-submenu-content ul .ps-menuitem-root:before": {
    content: '""',
    position: "absolute",
    top: "11px",
    left: "5px",
    width: "20px",
    height: "20px",
    background: "url(../assets/curve.svg) no-repeat",
  },
  "& .selected-sidebar": {
    "& .ps-menu-button": {
      background: "#f5f5f5 !important",
      "& .ps-menu-label": {
        color: "#d7282f",
      },
      "& svg": {
        color: "#d7282f",
      },
      "& .chatIcon": {
    "& .path1": {
      "&::before": {
        color: "#d7282f",
      },
    },
    "& .path2": {
      "&::before": {
        color: "#d7282f",
      },
    },
  },
    },
  },
  "& .icon-my-subscription": {
    transition: "all ease 0.3s",
    "&:before": {
      color: "#000",
      fontSize: "20px",
    },
  },
  "& .ps-menuitem-root .ps-menu-button:hover .ps-menu-icon i:before": {
    color: "#d7282f",
  },
  "& .chatIcon": {
    "& .path1": {
      "&::before": {
        color: "#000",
      },
    },
    "& .path2": {
      "&::before": {
        color: "#000",
      },
    },
  },
});

export const FooterLogoContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "10px",
});

export const UserInfoSidebarContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    height: "63px",
    display: "flex",
    background: breakPoints?.max1024min600pxi
      ? "transparent"
      : "rgba(145, 158, 171, 0.12)",
    borderRadius: "6px",
    gap: "10px",
    position: "relative",
    marginBottom: "10px",
    width: "236px",
    padding: "10px",
  })
);

export const ImageContainer = styled("div")({});
export const UserImage: any = styled("img")({});
export const NameAndRoleContainer: any = styled("div")(
  ({ breakPoints }: any) => ({
    justifyContent: "center",
    position: "relative",
    flexDirection: "column",
    display: "flex",
  })
);

export const FloatingEditButon: any = styled("span")(
  ({ breakPoints }: any) => ({
    cursor: "pointer",
    display: breakPoints?.max1024px ? "none" : "inline-flex",
    position: "absolute",
    right: "8px",
    top: "8px",
    color: "#D7282F",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "14px",
    opacity: "0.8",
  })
);

export const UserNameContainer = styled("div")({});

export const UserName = styled("p")({
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "15px",
  lineHeight: "17px",
  fontFamily: "open sans",
  color: "#223354",
  textTransform: "capitalize",
  whiteSpace: "nowrap",
  width: "140px",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
export const UserRoleContainer: any = styled("div")({});
export const UserRole = styled("p")({
  fontFamily: "open sans",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "10px",
  lineHeight: "12px",
  color: "rgba(34, 51, 84, 0.5)",
  letterSpacing: "0.4px",
  textAlign: "start",
  width: "100%",
});

export const BuyerRole = styled("span")({
  borderRadius: 22 / 2,
  position: "absolute",
  // top: "50%",
  transform: "translateY(-50%)",
  bottom: "0",
  right: "8px",
  border: "1px solid #ddd",
  background: "#d7282f",

  padding: "2px 4px",
  "& .MuiTypography-root": {
    fontSize: "10px",
    color: "#fff",
    margin: "-2px 0 0",
  },
});

export const EditIcon = styled("img")({
  marginRight: "2px",
  width: "10px",
  height: "9px",
});

export const SidebarIcon = styled("img")({});
export const SidebarToggle = styled(Box)({
  position: "absolute",
  right: "-10px",
  top: "50px",
  border: "1px solid #4e4e4e !important",
  zIndex: "99999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 0px",
  borderRadius: "4px",
  cursor: "pointer",
  background: "white",
  "&:hover": {
    backgroundColor: "#646464",
    "& .MuiSvgIcon-root": {
      color: "#ffffff",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
    color: "#4e4e4e",
    display: "inline-block",
    transform: "rotate(180deg)",
    transition: "all ease .3s",
  },
});

export const CustomSwitch3 = styled(Box)(({ theme }) => ({
  "& .MuiSwitch-root": {
    position: "relative",
    width: "92px",
    height: "36px",
    "& .MuiSwitch-track": {
      backgroundColor: "white !important",
      opacity: "1",
      border: "1px solid #d2d2d2",
      "&:before": {
        content: '"seller"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "black",
        display: "none",
      },
      "&:after": {
        content: '"Buyer"',
        backgroundImage: "none",
        fontSize: "12px",
        color: "black",
        display: "none",
      },
    },
    "& .MuiSwitch-thumb": {
      width: "36px",
      height: "18px",
      borderRadius: "26px",
      margin: "0",
    },
    "& .MuiSwitch-switchBase": {
      "&:before": {
        content: '"Seller"',
        backgroundImage: "none",
        fontSize: "10px",
        color: "white",
        position: "absolute",
        zIndex: "3",
        top: "11.2px",
        left: "16px",
        pointerEvents: "none",
        opacity: "1",
        transition: "all ease .2s",
      },
      "&:after": {
        content: '"Buyer"',
        backgroundImage: "none",
        fontSize: "10px",
        color: "white",
        position: "absolute",
        zIndex: "3",
        right: "15px",
        top: "11.2px",
        pointerEvents: "none",
        transition: "all ease .2s",
        opacity: "0",
      },
      "&.Mui-checked": {
        "& .MuiSwitch-thumb": {
          color: "#d7282f",
        },
        transform: "translateX(38px)",
        "& .MuiSwitch-track": {
          backgroundColor: "white",
        },
        "&:after": {
          opacity: "1",
        },
        "&:before": {
          opacity: "0",
        },
      },
      "& .MuiSwitch-thumb": {
        color: "#d7282f",
      },
    },
    "&:before": {
      content: '"Seller"',
      backgroundImage: "none",
      fontSize: "10px",
      color: "black",
      position: "absolute",
      zIndex: "0",
      top: "11.2px",
      left: "16px",
      pointerEvents: "none",
    },
    "&:after": {
      content: '"Buyer"',
      backgroundImage: "none",
      fontSize: "10px",
      color: "black",
      position: "absolute",
      zIndex: "-1",
      right: "15px",
      top: "11.2px",
      pointerEvents: "none",
    },
  },
  "@media screen and (max-width:600px)": {
    marginLeft: "16px",
    marginTop: "-10px",
  },
}));

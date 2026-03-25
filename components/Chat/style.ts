import {
  Box,
  Button,
  styled,
  Snackbar,
  Typography,
  List,
  Link,
  IconButton,
  Menu,
  TextField,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { BackgroundImage } from "../Contactus/style";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Badge from "@mui/material/Badge";
import { text } from "stream/consumers";
import zIndex from "@mui/material/styles/zIndex";
import { over, transform } from "lodash";

/*****========= Start Button varient For Chat (Only two are using) ========= ******/
export const ChatOutlineButton = styled(Button)({
  borderColor: "#d7282f !important",
  color: "#d7282f",
  padding: "2px 5px",
  textTransform: "capitalize",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
  },
});

/*****========= End   Button varient For Chat (Only two are using) ========= ******/

export const ChatPopSnackbar = styled(Snackbar)({
  "& .MuiSnackbarContent-root": {
    background: "#fff",
    padding: 0,
    width: "800px",
    position: "fixed",
    right: "70px",
    bottom: 0,
    "& .MuiSnackbarContent-message": {
      padding: 0,
      width: "100%",
    },
  },
});
export const ChatPopupConatiner = styled(Box)({
  height: "100%",
  "& .chat-emptypage": {
    height: "100%",
    "@media screen and (max-width:767px)": {
      height: "100vh",
    },
  },
});
export const ChatHeading = styled(Box)({
  display: "flex",
  gap: 8,
  width: "100%",
  alignItems: "center",
});
export const StatusInfoMessanger = styled(Box)({});

export const ChatStatus = styled(Typography)({
  fontSize: "11px !important",
  fontWeight: "400 !important",
  margin: "-3px 0 0 0 ",
  cursor: "pointer",
  textTransform: "capitalize",
  display: "flex",
  alignItems: "center",
  "& svg": {
    fontSize: "14px",
    margin: "0px 0 -2px",
  },
});

export const ChatContent = styled(Box)({
  // "& .mui-1r87cm-MuiDivider-root::before": {
  //   borderTop: "thin dashed rgba(0, 0, 0, 0.12)",
  // },
  // "& .mui-1r87cm-MuiDivider-root::after": {
  //   borderTop: "thin dashed rgba(0, 0, 0, 0.12)",
  // },
  display: "flex",
  flexDirection: "column",
  height: "100%",
  flex: 1,
  "& .MuiDivider-root": {
    // padding: "5px",
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: "#000",
      fontWeight: 600,
    },
  },
  "& .showcontent": {
    // display: "none",
    minHeight: 0,
    maxHeight: 0,
    opacity: 0,
    transition: "all .3s ease-in-out",
  },
  "& .active": {
    "& .showcontent": {
      minHeight: "40px",
      opacity: 1,
      overflow: "hidden",
    },
  },
  "& .chatsection": {
    width: "100%",
    // height: '65vh'
  },
});
export const ChatListText = styled(Box)({
  padding: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all ease .1s",
  cursor: "pointer",
  "&:hover": {
    background: "#f5f5f5",
    "& .dismissbtn": {
      display: "block",
    },
  },
  "& .MuiTypography-root": {
    color: "#848484",
    fontSize: "12px",
  },
  "& .dismissbtn": {
    display: "none",
  },
});

export const CheckTextInner = styled(Box)({
  display: "flex",
  gap: "5px",
  "& .reminderheading": {
    color: "#231F20 !important",
    fontWeight: 600,
    fontSize: "13px !important",
    padding: "0 0 2px",
  },
  "& .MuiCheckbox-root": {
    padding: "4px 6px 4px 0 !important",
  },
});
export const DismissBtn = styled(Box)({
  "& button": {
    padding: "0 4px",
    background: "#FFECEC",
    border: "1px solid #d7282f",
    borderRadius: 4,
    color: "#d7282f",
    boxShadow: "none",
    textTransform: "capitalize",
    fontSize: "12px",
    "&:hover": {
      background: "#d7282f",
      color: "#fff",
    },
  },
});
export const ChatMessangerWindow = styled(Box)({
  position: "fixed",
  right: "60px",
  bottom: 0,
  background: "#FFE5E7",
  borderRadius: "6px 6px 0px 0px",
  maxWidth: "250px",
  minWidth: "250px",
  zIndex: "100",
  display: "flex",
  gap: "2px",
  padding: "5px 12px",
  cursor: "pointer",
  "& .chatcount": {
    color: "#d7282f",
    fontSize: 12,
    fontWeight: 600,
  },
  "@media (max-width: 767px)": {
    display: "none",
  },
});
export const ChatContainer = styled(Box)({
  "& .MuiBackdrop-root": {
    position: "absolute",
  },
});
export const MessangerTxt = styled(Box)({
  fontSize: "16px",
  color: "#d7282f",
  display: "flex",
  fontWeight: "600",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  "& .icon-livechat": {
    margin: "3px 6px 0 0",
  },
  "& .total-count": {
    background: "#d7281f",
    color: "#fff",
    padding: "1px 5px",
    // height:'10px',
    // width: '10px',
    borderRadius: "50px",
    fontSize: "10px",
    display: "inline-block",
  },
});
export const PinkSmallBtn = styled(Button)({
  padding: "2px 4px",
  // background: "#FFECEC",
  border: "none !important",
  borderRadius: 4,
  color: "#d7282f",
  boxShadow: "none",
  textTransform: "none",
  fontSize: "14px",
  "&:hover": {
    textDecoration: "underline",
    background: "#FFECEC",
  },
});

export const ChatInnerScroll = styled(Box)({
  maxheight: "300px",
  overflowY: "auto",
});
export const NoChatFound = styled(Box)({
  textAlign: "center",
  padding: "14px",
  "& .MuiTypography-root": {
    color: "#000",
    fontSize: "14px",
    fontWeight: 600,
  },
});

/****======== Start Chat styling (Big side styling for chat) =======****/
export const BigSideFullData = styled(Box)({
  fontFamily: "open sans !important",
  // height: "100%",
  // height: "52vh",
  height: "578px",
  // height: "calc(var(--vh, 1vh) * 52vh)",
  // display: "flex",
  // flexDirection: "column",
  position: "relative",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  boxSizing: "border-box",
  overflow: "hidden",
  "@media screen and (max-width: 767px)": {
    height: "100svh",
    // height:`calc(${vh} * 100)`,
  },
});
export const ActiveUserTopStrip = styled(Box)({
  backgroundImage: "linear-gradient(to right, #D7282F , #000)",
  // minHeight:"50px",
  // maxHeight:"50px"
  // "@media screen and (max-width: 767px)": {
  //   position: "fixed",
  //   top: 0,
  //   zIndex: 1,
  //   width: "100%"
  // }
});
export const TopStripeLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& .MuiBadge-badge": {
    right: "18%",
    bottom: "22%",
  },
});
export const TopStripeRight = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "& i": {
    fontSize: "15px",
    cursor: "pointer",
    "&:before": {
      color: "#fff",
    },
  },
  "& .icon-chat-video": {
    fontSize: "10px",
  },
  "& img": {
    margin: "0 0 0 -5px",
    cursor: "pointer",
  },
});
export const TopStripeInner = styled(Box)({
  padding: "6px",
  display: "flex",
  justifyContent: "space-between",
  minHeight: "50px",
  maxHeight: "50px",
  alignItems: "center",
});
export const ActiveUserInfo = styled(Typography)({
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  "& .MuiTypography-body1": {
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    display: "flex",
  },
  "& .MuiAvatar-root": {
    width: "35px",
    height: "35px",
  },
});
export const ActiveUserName = styled(Typography)({
  textTransform: "capitalize",
  gap: "5px",
});
export const UserTypingStatus = styled(Typography)({
  fontWeight: "400 !important",
  fontSize: "12px !important",
});
export const BigSideInnerData = styled(Box)({});
export const AllMsgList = styled(List)({
  // height: "50vh",
  // flexGrow: 1,
  // position: "relative",
  overflowY: "auto",
  // height: "450px",
  flex: 1,
  position: "relative",
  flexGrow: 1,
  "@media screen and (max-width:767px)": {
    backgroundColor: "#f8f8f8",
    // margin: "50px 0 0"
  },  scrollbarWidth: "thin",
  scrollbarColor: "#dedede transparent",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dedede",
    borderRadius: "4px",
  },
  "& .MuiListItemText-secondary": {
    color: "#969393",
    fontSize: "12px",
    // padding: "6px"
  },
});

export const SenderMessageDetailInfo = styled("span")({
  display: "flex",
  justifyContent: "flex-end",
  // gap: "5px",
  float: "right",
  alignItems: "center",
  "&:hover": {
    "& .messagehover": {
      display: "block",
    },
  },
  "& .MuiTypography-root": {
    fontSize: "12px",
    "@media screen and (max-width:767px)": {
      fontSize: "13px",
      fontWeight: 500,
    },
  },
  "& .discountTag": {
    position: "absolute",
    top: "-2px",
    right: "0px",
    // background: "#d7282f",
    color: "#fff",
    padding: "2px 6px",
    fontSize: "10px",
    borderRadius: "4px",
    fontWeight: "600",
    backgroundImage: `url('/assets/images/discountBG.svg')`,
    height: "60px",
    width: "60px",
    backgroundSize: "cover",
  },
  "& .discountshow": {
    color: "#fff !important",
    position: "absolute",
    top: "10",
    right: "20",
    zIndex: 10,
    "& .MuiTypography-root": {
      color: "#fff",
      fontSize: "12px",
      textAlign: "center",
    },
  },
  "& .pro-discount": {
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});
export const ChatTimeMessage = styled(Box)({
  display: "flex",
  gap: "2px",
  alignItems: "center",
  "& svg": {
    fontSize: "14px",
    color: "#969393",
  },
});

export const RecieverMessageDetailInfo = styled("span")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px",
  float: "left",
  alignItems: "center",
  "&:hover": {
    "& .messagehover": {
      display: "block",
    },
  },
});
export const UserNameletter = styled("p")({
  fontSize: "14px",
  margin: 0,
});

export const SenderMsgBox = styled("span")({
  // textAlign: "right",
  maxWidth: "400px",
  // minWidth: "400px",
  background: "#FFE8E8",
  float: "right",
  borderRadius: "6px",
  padding: "6px",
  // display: "flex",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "13px",
    fontFamily: "open sans",
    wordBreak: "break-all",
    "@media screen and (max-width:767px)": {
      fontSize: "12px",
    },
  },
  "&.discountStyle": {
    position: "relative",
    background: "linear-gradient(90deg, #D7282F 48.56%, #F9B61D 100%)",
    padding: "14px 8px",
  },
});
export const HoverIocns = styled(Box)({
  display: "none",
  transition: "all 0.5s ease-in-out",
});
export const HoverIocnsInn = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "6px",
  alignItems: "center",
  alignContent: "center",
  flexDirection: "row",
  margin: "0 5px 0 0",
  "& i, svg": {
    color: "#fff",
    fontSize: "16px",
    background: "#969696",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      background: "#d7282f",
    },
  },
  "& i": {
    padding: "3px",
  },
  "& svg": {
    fontSize: "22px",
    padding: "3px",
  },
});
export const RecieverMsgBox = styled("span")({
  float: "left",
  maxWidth: "400px",
  borderRadius: "6px",
  background: "#FAFAFA",
  padding: "6px",
  "@media screen and (max-width:767px)": {
    background: "#e9e9e9",
  },
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "13px",
    fontFamily: "open sans",
    wordBreak: "break-all",
  },
});
export const ProductDetailMessageBox = styled(Box)({
  "& .discountName": {
    fontSize: "18px",
    color: "#FFB800",
    fontWeight: "700 !important",
    textTransform: "uppercase",
  },
  "& .productName": {
    fontSize: "13px !important",
    color: "#fff !important",
    fontWeight: "400 !important",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "& .productDescription": {
    display: "none",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "8px 0",
  },
  "& .visitProduct": {
    background: "#d7282f",
    color: "#fff",
    border: "1px solid #fff",
    padding: "2px 12px",
    fontSize: "12px",
    textTransform: "capitalize",
    margin: "12px 0 0 0",
  },
});
export const ProductInfoMainHeading = styled("h2")({
  color: "#231F20",
  fontSize: "14px",
  fontWeight: "600",
});
export const ChatProductImage = styled(Box)({
  background: "#fff",
  borderRadius: "10px",
  width: "100%",
  // height: "110px",
  // height: "80px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "@media screen and (max-width:767px)": {
    height: "auto",
  },
  minWidth: "70px",
  "& img": {
    // width: "100%",
    width: "50px",
    height: "50px",
    borderRadius: "10px",
    // height: "100%",
    objectFit: "cover",
  },
});
export const ChatProductInfoBox = styled(Box)({});
export const EditIconsBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  "& svg": {
    fontSize: "16px",
    color: "#878484",
  },
});

export const ProductInfoSubHeading = styled("h3")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  display: "-webkit-box",
  color: "#231F20",
  fontSize: "12px !important",
  fontWeight: "600",
});
export const ProductInfoDescription = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  textTransform: "capitalize",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "2",
  display: "-webkit-box",
  color: "#231F20",
  fontSize: "10px !important",
  fontWeight: "400",
  lineheight: "14px",
});
export const ProductOrderQuantity = styled(Box)({
  // padding: "10px 0",
  padding: "10px",
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "12px",
    fontWeight: "600",
    "& span": {
      fontWeight: "400",
      padding: "0 4px",
    },
  },
  "& .discountPrice": {
    fontSize: "14px !important",
    fontWeight: "600 !important",
    color: "#fff !important",
    "& .oldPrice": {
      textDecoration: "line-through",
      color: "#fff ",
      opacity: ".7",
    },
    "& .newPrice": {
      color: "#fff !important",
      fontWeigth: "700 !important",
    },
  },
});

/****======== End Chat styling (Big side styling for chat) =======****/

/****===== User List Styling ====****/
export const ChatHeader = styled(Box)({
  // padding: "13px",
  padding: "7px 13px",
  backgroundImage: "linear-gradient(to right, #FEDCDE , #fff)",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  "& .MuiTypography-root": {
    fontSize: "15px",
    fontWeight: 600,
  },
  "& button svg": {
    margin: "-15px 0 0",
  },
  "& .icon-crm-cancel": {
    fontSize: "17px",
    "&::before": {
      color: "#000",
    },
  },
});
// export const ChatHeaderInner = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   gap: 8,
//   width:"100%"
// });

export const ChatSearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  padding: "10px 10px 0",
  borderRadius: "4px",
  margin: "6px 0px 10px",
  "& .MuiInputBase-input": {
    paddingTop: "7px",
    paddingBottom: "7px",
    paddingLeft: "4px",
    transition: "all 2s ease-in",
    fontSize: "12px",
  },
  "& button": {
    padding: "0",
    margin: "3px 0px 3px -5px",
  },
  "& svg": {
    color: "#515151",
    fontSize: "19px",
  },
}));
export const ChatTypeData = styled("span")({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  "& .MuiTypography-root": {
    fontSize: "13px",
    padding: "0 0 0 5px",
  },
});

/****===== Small section (User List) styling =====****/
export const UserListBox: any = styled(Box)(() => {
  return {
    // maxHeight: "430px",
    // minHeight: "430px",
    // height: "430px",
    // maxHeight: viewType == 'admin' ? '100%' :"430px",
    // minHeight:viewType == 'admin' ? '100%' :"430px",
    // height: viewType == 'admin' ? '100%' :"430px",
    overflowY: "auto",
    overflowX: "hidden",
    "@media screen and (max-width: 767px)": {
      height: "calc(100svh - 210px)",
      // height:"calc(var(--vh, 1vh) * 100)",
      maxHeight: "max-content",
      minHeight: "max-content",
    },
    "& .MuiListItem-root": {
      padding: "2px 16px 2px 8px",
      margin: "1px 0",
      cursor: "pointer",
      gap: "10px",
      "&:hover": {
        background: "#F6F6F6",
      },
    },  scrollbarWidth: "thin",
  scrollbarColor: "#dedede transparent",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
    "& .react-swipeable-view-container": {
      "@media screen and (max-width: 767px)": {
        // height: "100vh"
        height: "calc(100svh - 210px)",
      },
    },
  };
});

export const TabForChat = styled(Box)({
  // margin: "-7px 0 0",
  fontWeight: "600",
  // height: "450px",
  "& .total-count": {
    background: "#d7281f",
    color: "#fff",
    padding: "1px 5px",
    fontSize: "10px",
    borderRadius: "50px",
  },
  "& .MuiListItem-root": {
    paddingTop: 0,
    paddingLeft: "10px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "45px",
  },
  "& .MuiAppBar-root": {
    background: "#fff",
    boxShadow: "none",
  },
});
export const ChatLabeldata = styled("span")({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  "& .MuiTypography-root": {
    fontSize: "12px",
    padding: "0 0 0 5px",
    color: "#000",
  },
  "& .total-count": {
    position: "absolute",
    right: "22px",
    top: "3px",
  },
});

export const ChatUserListHere = styled(List)({
  // height:"480px",
  // overflowY:"auto",
  "& .MuiAvatar-root": {
    width: "32px",
    height: "32px",
  },
  "& .MuiButtonBase-root": {
    padding: "2px 5px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "41px",
  },
});
export const ChatUserName = styled(Typography)({
  fontSize: "12px !important",
  fontWeight: "600 !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textTransform: "capitalize",
  "@media screen and (max-width:767px)": {
    fontSize: "14px !important",
  },
  "& span": {
    fontSize: "10px",
    color: "#969393",
    fontWeight: "400",
  },
  "& .pinicon": {
    padding: "0 0 0 3px",
    "& i": {
      fontSize: "10px",
      color: "#000",
    },
  },
});
export const LastSendMessage = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "& .chatmsgnumber": {
    background: "#FFEEEF",
    color: "#d7282f",
    padding: "3px 8px",
    fontSize: "10px",
    borderRadius: "50%",
  },
});
export const LastSendMessageText = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  display: "-webkit-box",
  height: "18px",
  fontSize: "11px !important",
  fontWeight: "400",
  color: "#969393",
  "@media screen and (max-width:767px)": {
    fontSize: "13px !important",
  },
});
export const ChatTypeOuter = styled(Box)({
  "& i": {
    fontSize: "14px",
    "@media screen and (max-width:767px)": {
      fontSize: "18px",
    },
    "&:before": {
      color: "#d7282f",
    },
  },
  "& svg": {
    color: "#d7282f",
    fontSize: "14px",
  },
});

export const ChatTypeTabs = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "13px",
    color: "#333333",
    minHeight: "47px",
    minWidth: "80px",
    padding: 0,
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },
  "& .MuiTabs-flexContainer": {
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".icon-leadsblack:before": {
    color: "inherit",
  },
  "& .MuiButtonBase-root:hover": { color: "#d7282f" },
  "& .MuiButtonBase-root": {
    fontSize: "12px",
    "@media screen and (max-width:767px)": {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
  "& .MuiTabs-scrollButtons": {
    width: 10,
    margin: "0 5px",
    "& svg": {
      background: "#ddd",
      borderRadius: "50px",
      //   background: "#ddd",
      // borderRadius: "6px",
      // width: "18px",
      // height: "48px"
    },
  },
};
export const TabPanelArea = styled(Box)({
  // padding: "5px 0",
  "& .MuiTabPanel-root": {
    padding: 0,
  },
  "& .activeuser-chat": {
    background: "#F6F6F6",
  },
  "& .settings-tab": {
    padding: "0px 15px",

    "& .MuiListItem-root": {
      padding: "0px",
      "& .MuiButtonBase-root": {
        gap: "10px",
        "& .MuiListItemText-root": {
          "& span": {
            fontSize: "14px",
          },
        },
      },
      "& .MuiListItemIcon-root": {
        minWidth: "auto",
        "& svg": {
          fontSize: "18px",
          color: "#231f20",
        },
      },
    },
  },
});
export const ChatTabsCustomSlide = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#D7282F",
    bottom: 0,
    color: "#D7282F !important",
    height: "1px",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    color: "#333333",
    minHeight: "47px",
    // minWidth: "70px",
    minWidth: "63px",
    padding: 0,
    "& svg": { margin: "0 3px", fontSize: 19 },
  },
  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    zIndex: 1,
    "& svg": { color: "#D7282F" },
  },

  "& .MuiButtonBase-root": {
    fontSize: "12px",
    "&:hover": { color: "#d7282f" },
  },

  "& .MuiTabs-scrollButtons": {
    width: 10,
    margin: "0 5px",
    "& svg": {
      background: "#ddd",
      borderRadius: "50px",
    },
  },
};

/****===== Start Bottom Typing section styling =====****/
export const BottomTypingAreaOuter = styled(Box)({
  // position: "absolute",
  width: "100%",
  // bottom: "20px",
  bottom: "10px",
  background: "#fff",
  position: "relative",
  "@media screen and (max-width:767px)": {
    // position:"fixed",
    // bottom:0
    // position: "sticky",
    // bottom: 0,
  },
});
export const ReplyFooterSection = styled(Box)({
  position: "relative",
  background: "#fff",
  border: "1px solid #D2D2D2",
  borderBottom: "None",
  borderRadius: "20px 20px 0px 1px",
  // // borderRight:"10px solid",
  // borderImage:"linear-gradient(to bottom, #ff0000, #00ff00) 1",
  // // borderImageSource: "linear-gradient(to left, #00C853, #B2FF59)",
  // mask: "linear-gradient(90deg, rgba(0,0,0,0) 2%, rgba(0,0,0,1) 50%)",
  padding: "6px 10px",
  "& .replymsg": {
    fontSize: "13px",
    color: "#231F20",
    padding: "0 22px 0 0",
  },
  "& .clearright": {
    position: "absolute",
    right: "15px",
    fontSize: "15px",
    color: "#838383",
    top: "6px",
    cursor: "pointer",
    "&:hover": {
      color: "#d7282f",
    },
  },
});
export const TypingAreaOuter = styled(Box)({
  display: "flex",
  borderTop: "1px solid #e4e4e4",
  padding: "0 10px",
  justifyContent: "space-between",
  "& .fullscreen-icon": {
    "& svg": {
      transform: "rotate(40deg)",
      color: "#838383",
      fontSize: "20px",
      cursor: "pointer",
      "&:hover": {
        color: "#d7282f",
      },
    },
  },
});
export const TypingAreaIcons = styled(Box)({
  display: "flex",
  gap: "14px",
  padding: "10px 0",
  "& i": {
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.5s",
  },
  "& i:hover": {
    marginTop: "-3px",
    "&:before": {
      color: "#d7282f",
    },
  },
});
export const EmojiOpenBox = styled(Box)({
  position: "absolute",
  zIndex: 1,
  bottom: "20px",
});

export const BottomTypingArea = styled(Box)({
  padding: "0 0 10px",
  "@media screen and (max-width:767px)": {
    padding: 0,
  },
  // background: "#F8F8F8",
  // borderTop:"1px solid #D2D2D2",
  // position: "absolute",
  // bottom: "11px",
  width: "100%",
  "& .MuiInput-underline": {
    "&:before": { display: "none" },
    "&:after": { display: "none" },
  },
  "& .sendiconhere": {
    transform: "rotate(-40deg)",
    color: "#d7282f",
    fontSize: "18px",
  },
});
export const ChatTypingBox = styled(Box)({
  background: "#F8F8F8",
  width: "calc(100% - 20px)",
  borderRadius: "6px",
  padding: "0 10px 0 0",
  margin: "0 10px 10px",
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-formControl": {
    fontSize: "14px !important",
  },
  "& .MuiFormControl-root": {
    "& .MuiInputBase-input": {  scrollbarWidth: "thin",
  scrollbarColor: "#dedede transparent",
      "&::-webkit-scrollbar": {
        width: "6px",
        height: "6px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#dedede",
        borderRadius: "4px",
      },
    },
  },
});
export const ChatImageBox = styled(Box)({
  position: "relative",
  border: "1px solid #ddd",
  borderRadius: "4px",
  height: "100px",
  width: "100px",
  "& img": {
    borderRadius: "4px",
  },
});
export const ChatImageCancelBox = styled(Box)({
  height: "22px",
  width: "22px",
  borderRadius: "50%",
  padding: "2px",
  background: "#FFF0F0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  right: "-12px",
  top: "-11px",
  cursor: "pointer",
});
/****===== End Bottom Typing section styling =====****/

/**** 17/04/2024 ****/
export const ReplyQuotationMessage = styled(Box)({
  background: "#F8F8F8",
  borderRadius: "30px",
  margin: "0 0 12px",
});
export const ReplyQuoteImage = styled(Box)({
  background: "#c6c6c6",
  width: "115px",
  height: "100px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
export const ReplyQuoteInfo = styled(Box)({
  background: "#f3f3f3",
  padding: "5px 0",
  position: "relative",
});
export const ReplyQuoteTitle = styled(Typography)({
  fontSize: "13px",
  fontWeight: "600",
  color: "#231F20",
});
export const ReplyQuoteDes = styled(Typography)({
  fontSize: "11px",
  fontWeight: "400",
  color: "#231F20",
  padding: "3px 0px 0",
});

export const LinkBox = styled(Box)({
  background: "#fff",
  padding: "4px 10px",
});
export const LinkStyle = styled(Link)({
  fontSize: "12px",
});
export const CrossIcons = styled(Box)({
  position: "absolute",
  right: "3px",
  top: 0,
  "& svg": {
    color: "#231F20",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      color: "#d7282f",
    },
  },
});
// hover on chat

export const Iconbtn = styled(IconButton)({
  position: "absolute",
  right: "0",
  padding: "2px",
  width: "8px",
  top: "22%",
  background: "#FFB1B5",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#FFB1B5",
  },
  "& svg": {
    color: "#fff",
  },
});
export const MenuOptions = styled(Menu)({
  "& .MuiPaper-root": {
    // boxShadow: "0 0px 2px 0 rgba(25,27,35,.15)",
    border: "1px solid #ddd",
  },
  "& svg": {
    fontSize: "18px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "25px !important",
  },
});

/****** Start Common style for Dialog ******/
export const ReportContactCheckInfo = styled(Box)({
  display: "flex",
  gap: "3px",
  alignItems: "start",
  margin: "14px 0 0",
});
export const ReportContactInfo = styled(Box)({
  "& .MuiTypography-h5": {
    fontSize: "15px",
    fontWeight: "600",
    color: "#231F20",
  },
});

export const StyleCommonChatDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "400px",
    borderRadius: "10px",
    maxWidth: "400px",
    // minHeight:"400px",
    // width:"100%"
  },
  "& .MuiDialogTitle-root": {
    color: "#231F20",
    fontSize: "18px",
    fontWeight: 600,
    padding: "10px 16px",
    "& .MuiIconButton-root": {
      top: "3px",
    },
  },
  "& .MuiDialogContent-root": {
    padding: "0 16px 10px",
  },
  "& .MuiDialogActions-root": {
    padding: "10px 20px",
  },
  "& .MuiDialogContentText-root": {
    fontSize: "14px",
    color: "#888080",
  },
  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      // width: "1rem",
      // height: "1rem",
      width: "20px",
      height: "20px",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
      padding: 0,
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "5px",
      height: "11px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      position: "absolute",
      top: "7px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
    "&.MuiCheckbox-root": {
      padding: "5px",
    },
  },
}));
/****** End Common style for Dialog ******/

/****===== Start Suggestion Section styling =====****/
export const SuggestionsSection = styled(Box)({
  padding: "10px 6px",
  display: "flex",
  flexWrap: "wrap",
  gap: "5px",
  "& .MuiTypography-root ": {
    background: "#FFF0F0",
    color: "#000",
    fontSize: "12px",
    margin: "0 2px",
    padding: "1px 10px",
    borderRadius: "25px",
    cursor: "pointer",
    "@media screen and (max-width:767px)": {
      padding: "1px 7px",
      fontSize: "11px",
      margin: "0 1px",
    },
    "&:hover": {
      background: "#FFF0F0",
    },
  },
});
/****===== End Suggestion Section styling =====****/

/****===== Start REPLY SENDER & RECIEVER message Section styling =====****/
export const ReplySenderMesgBox = styled(Box)({
  background: "#f8d1d1",
  padding: "2px 5px",
  borderLeft: "2px solid #d09a9c",
  borderRadius: "4px",
  marginBottom: "3px",
  "& .MuiTypography-root ": {
    color: "#6d181b",
    fontSize: "12px",
    "@media screen and (max-width:767px)": {
      fontSize: "13px",
      fontWeight: 500,
    },
  },
});
export const RSenderName = styled(Typography)({
  color: "#000",
  fontSize: "12px",
  fontWeight: 600,
});
export const ReplyRecieverMesgBox = styled(Box)({
  background: "#e3e3e3",
  padding: "2px 5px",
  borderLeft: "2px solid #acacac",
  borderRadius: "4px",
  marginBottom: "3px",
  "& .MuiTypography-root ": {
    color: "#000",
    fontSize: "12px",
  },
});
export const RRecieverName = styled(Typography)({
  color: "#000",
  fontSize: "12px",
  fontWeight: 600,
});

/****===== End REPLY SENDER & RECIEVER message Section styling =====****/

export const EmptyChatSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flex: "1",
  flexDirection: "column",
  "& img": {
    width: "250px",
    margin: "0 0 10px",
  },
  "& .MuiTypography-root": {
    padding: "0 0 10px",
    fontSize: "14px",
    color: "#000",
    textAlign: "center",
  },
});

export const ChatWindowTxt = styled(Typography)({
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
});

export const DialogTitleBox = styled(Box)({
  // width: "450px",
  radius: "8px, 8px, 0px, 0px",
  backgroundColor: " #FFFFFF ",
  // height: "519px",
  "@media screen and (max-width: 767px)": {
    width: "100%",
    height: "auto",
  },
});
export const MessagesHeader = styled(Box)({
  padding: "10px",
  width: "100%",
  backgroundImage: "linear-gradient(to right, #D7282F , #000)",
});
export const DialogTxt = styled(Typography)({
  color: "#fff",
  fontSize: "17px",
  fontWeight: 700,
});
export const DialogContentBox = styled(Box)({
  width: "100%",
  position: "relative",
  // height: "300px",
  borderRadius: "5px",
  border: "1px solid #D6D6D6",
  color: " #FCFDFF",
  // gap: "20px",
  margin: "40px auto ",
  padding: "10px",
});
export const WelcomeTxt = styled(Typography)({
  color: "#231F20",
  fontSize: "12px",
  fontWeight: 600,
  textAlign: "center",
  margin: " 25px auto",
});
export const WelcomeTxt1 = styled(Typography)({
  color: "#231F20",
  fontSize: "12px",
  fontWeight: 400,

  margin: " -10px auto",
  textAlign: "center",
});
export const TextFieldName = styled(TextField)({
  borderRadius: "4px",
  border: "1px solid #C8CCD5",
  marginLeft: "35px",
  gap: "10px",
  marginTop: "10px",
  // margin:"10px 10px"
});

export const ChatButton = styled(Button)({
  margin: "20px  auto 0",
  width: "120px",
  textAlign: "center",
  left: "40%",
  borderRadius: "6px",
  backgroundColor: "#D7282F",

  "&:hover": {
    background: "#D7282F",
  },
});
export const ButtonName = styled(Button)({
  color: "#fff",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "capitalize",
});
export const SingUpTxt = styled(Typography)({
  // marginLeft: "20px",
  textAlign: "center",
  fontSize: "12px",
  fontWeight: 700,
  color: " #231F20",
  marginTop: "10px",
  marginBottom: "10px",
});
export const InputBox1 = styled(Box)({
  marginTop: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  paddingTop: "4px",
  gap: 16,
});
export const UPTxt = styled("span")({
  color: "#D7282F",
});
export const ImgBox1 = styled(Box)({
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  // padding:"30px 170px 30px 185px",
  left: "45%",
  top: "12%",
  zIndex: 1,
});
export const FooterDilogBox = styled(Box)({
  color: "#777777",
  fontSize: "10",
  fontWeight: "400",
  textAlign: "center",
  alignItems: "center",
  marginTop: "-30px",
  padding: "20px",
});
export const FooterImg = styled("span")({
  width: "14px",
  height: "13",
});
export const FooterTxt = styled("span")({
  fontSize: "10",
  fontWeight: "700",
  color: " #4A4A4A",
});
export const ImagePdfSection = styled(Box)({
  width: "270px",
  maxWidth: "300px",
});
export const ImageUploadBox = styled(Box)({
  width: "100%",
  height: "150px",
  display: "flex",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "100%",
  },
});
export const ImageInfoSection = styled(Box)({
  padding: "10px 0",
  "& .MuiTypography-h5": {
    color: "#231F20",
    fontWeight: 600,
    fontSize: "13px",
    paddingBottom: "3px",
  },
});
export const Typographybody = styled(Typography)({
  color: "#231F20",
  fontSize: "13px",
});

export const OnlineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      // width: "100%",
      // height: "100%",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const OfflineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "grey",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      // animation: "ripple 1.2s infinite ease-in-out",
      // border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const BusyBadge = styled(Badge)(({ theme }) => ({
  cursor: "pointer",
  "& .MuiBadge-badge": {
    backgroundColor: "#d7282f",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      // animation: "ripple 1.2s infinite ease-in-out",
      // border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
// Group Chat Information
export const GroupChatInfo = styled(Box)({
  padding: "8px",
});
export const GroupChatInfoHeading = styled(Box)({
  borderBottom: "1px solid #F0F0F0",
  "& .MuiTypography-root": {
    color: "#231f20",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 3px 0",
  },
});
export const ProductGroupChat = styled(Box)({
  margin: "18px 0 0 0",
  padding: "0 0 10px 0",
  borderBottom: "1px solid #DFDFDF",
});
export const Image_Text = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
export const Chat_ImageBox = styled(Box)({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  boxShadow: "0px 4px 4px 0px #00000040 inset",
  overflow: "hidden",
});
export const Group_ChatImage = styled("img")({
  width: "100%",
  objectFit: "cover",
  height: "100%",
});
export const Group_Chat_proName = styled(Typography)({
  fontSize: "14px",
  fontWeight: "600",
  color: "#231f20",
});
export const Group_Chat_Id = styled(Typography)({
  fontSize: "10px",
  fontWeight: "400",
  color: "#858585",
});
export const Group_MemberBox = styled(Box)({
  margin: "12px 0 0 0",
});
export const Group_MemberInner = styled(Box)({
  border: "1px solid #EBEBEB",
  borderRadius: "5px 5px 0 0",
});
export const Group_Inner_BG = styled(Box)({
  backgroundColor: "#EBEBEB",
  borderRadius: "5px 5px 0 0",
  padding: "2px 6px",
  "& .MuiTypography-root": {
    fontSize: "14px",
    fontWeight: "600",
    color: "#231f20",
  },
});
export const Group_Member_List = styled(Box)({
  padding: "6px",
});
export const Group_Conmpany_Info = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  color: "#33333",
});
export const Group_Remove = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Footer_activeStatus = styled(Box)({});

export const MessengerIconBadge = styled(Badge)(({ theme }) => ({
  display: "flex",
  flexDirection: "row-reverse",
  cursor: "pointer",
}));

/*****========== Start Rename And Edit Group chat ui ==========*****/
export const RenameEditGroup = styled(Box)({
  display: "flex",
  margin: "0 0 0 5px",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
});
/*****========== End Rename And Edit Group chat ui ==========*****/

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

/*****===== Rate Supplier styling =====*****/
//////////////////****************************SupplierRateing**************************//////////
export const SupplierMainBox = styled(Box)({
  gap: "10px",
  padding: "10px",
  boxShadow: "0px 0px 10px 0px #00000040",
});

export const RateSupplierBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 0px 10px 0",
  gap: "12px",
  alignItems: "center",
  "& svg": {
    fontSize: "18px",
    cursor: "pointer",
    "&:hover": {
      color: "#d7282f",
    },
  },
});

export const RateSuppliertxt = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  color: "#000000",
});

export const InnerBox = styled(Box)({
  gap: "15px",
  border: "1px solid #DDDDDD",
  padding: "10px",
});
export const ReasonDiscription = styled(Typography)({
  fontSize: "12px",
  color: "#4a4a4a",
  fontWeight: "600",
  marginTop: "4px",
});

export const SerivesBox = styled(Box)({
  padding: "4px",
  borderRadius: "4px",
  backgroundColor: "#F4F6FA",
});
export const Serivestxt = styled(Box)({
  fontSize: "13px",
  fontWeight: "600",
  color: "#231F20",
});

export const MainImgBox = styled(Box)({
  border: "1px solid #E1E1E1",
  borderRadius: "5px",
  margin: "15px 0 15px",
  justifyContent: "space-between",
});

export const ResponsivenessMainBox = styled(Box)({
  padding: "15px",
});
export const RatingRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "30px",
});
export const Responsivenestxt = styled(Typography)({
  fontSize: "13px",
  fontWeight: "600",
  color: "#000000",
  gap: "10px",
});
export const ResponsivenesRate = styled(Box)({
  padding: "12px",
});
export const ImgBox = styled(Box)({
  "& img": {
    width: "100%",
  },
});
export const FooterTxt1 = styled(Typography)({
  fontSize: "12px",
  fontWeight: "400",
  padding: "10px 0 0",
});
export const ContantbtnBox = styled(Box)({
  display: "flex",
  justifyContent: "end",
  gap: 10,
  margin: "10px 0 0",
});

export const OneOutLinedButton = styled(Button)({
  border: "1px solid #D7282F",
  borderRadius: "4spx",
  color: "#d7282F",
  textTransform: "capitalize",
  fontSize: "13px",
  fontWeight: "500",
  background: "#fff",
  transition: "ease-in-out",
  boxShadow: "none !important",
  padding: "2px 12px",
  "&:hover": {
    background: "#b7292f",
    color: "#fff",
  },
});
export const OneFilledButton = styled(Button)({
  border: "1px solid #D7282F",
  borderRadius: "4spx",
  color: "#fff",
  textTransform: "capitalize",
  fontSize: "13px",
  fontWeight: "500",
  background: "#d7282F",
  transition: "ease-in-out",
  boxShadow: "none !important",
  padding: "2px 12px",
  "&:hover": {
    background: "#b7292f",
    color: "#fff",
    border: "1px solid #b7292f",
  },
});

/**********===== Start Responsive Styling =====***********/
export const BackOptionMobile = styled(Box)({
  display: "none",
  "& svg": {
    color: "#fff",
  },
  "@media screen and (max-width:767px)": {
    display: "block",
    position: "relative",
    left: "-5px",
  },
});
/**********===== End Responsive Styling =====***********/

/**********===== Start First Time Initiated Chat Styling =====***********/
export const FirstTimeInitiatedChat = styled(Box)({
  textAlign: "center",
  background: "#f8f8f8",
  padding: "18px",
  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
});

export const InitiatedChatButtons = styled(Box)({
  display: "inline-flex",
  gap: "10px",
  padding: "15px 0 0",
  "& button": {
    textTransform: "capitalize",
    border: "1px solid !important",
    height: "27px",
    padding: "3px 10px",
  },
});
export const AcceptBtn = styled(Button)({
  color: "#34a853",
  "&:hover": {
    background: "#34a853",
    color: "#fff",
    border: "1px solid #34a853",
  },
});
export const RejectBtn = styled(Button)({
  color: "#d7282f",
  "&:hover": {
    background: "#d7282f",
    color: "#fff",
    border: "1px solid #d7282f",
  },
});
export const IgnoreBtn = styled(Button)({
  color: "#1976d2",
  "&:hover": {
    background: "#1976d2",
    color: "#fff",
    border: "1px solid #1976d2",
  },
});

/**********===== End First Time Initiated Chat Styling =====***********/

export const StatusBoxRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "2px 10px",
  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
});

export const CustomDiv = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  // padding: theme.spacing(4),
  margin: "20px",
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  zIndex: 1301,
  width: "90%",
  // minHeight: "294.88px",
  "@media screen and (max-width:767px)": {
    left: "46%",
  },
  "&.InnerStyle": {
    padding: "26px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
}));

// Styled Paper component with custom styles
export const AnimatedPaper: any = styled(Paper)(({ value }: any) => ({
  position: "fixed",
  overflow: "hidden",
  bottom: value ? 0 : -578,
  right: "80px",
  // height: 650,
  height: "578px",
  transition: "bottom 0.3s ease-in-out",
  zIndex: 1300,
  // width: "800px",
  width: "850px",
  "& .MuiPaper-root": {
    height: "100%",
  },

  "@media screen and (max-width: 1024px)": {
    width: "95%",
    right: 0,
  },
  "@media screen and (max-width: 767px)": {
    width: "100%",
    left: 0,
    right: 0,
    height: "100%",
  },
}));
export const ChatTransferList = styled(Box)({
  "& .MuiListItem-root": {
    padding: 0,
    "& .MuiTypography-body1": {
      fontSize: "14px",
      color: "#000",
      fontWeight: 500,
    },
    "& .MuiTypography-body2": {
      fontSize: "13px",
      fontWeight: 400,
    },
    "& .MuiAvatar-root": {
      width: "32px",
      height: "32px",
    },
  },
  "& .MuiListItemAvatar-root": {
    minWidth: "45px !important",
  },
  "& .MuiList-root": {
    padding: 0,
  },
  "& .Mui-checked": {
    color: "#d7282f !important",
  },
  "& .MuiFormControlLabel-root": {
    margin: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
  maxHeight: "200px",
  overflowY: "auto",  scrollbarWidth: "thin",
  scrollbarColor: "#dedede transparent",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#dedede",
    borderRadius: "4px",
  },
});

export const ChatLog = styled(Box)({
  background: "#f5f5f5",
  fontSize: "12px",
  width: "100%",
  textAlign: "center",
  padding: "5px",
  color: "#d7282f",
  borderRadius: "4px",
});

/**********===== Start Admin RFQ Styling =====***********/
export const AdminRFQSection = styled(Box)({
  padding: "10px 5px",
  "& .MuiFormLabel-root": {
    fontSize: "13px",
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "12px",
  },
});
export const MyAddAttachmntArea = styled(Box)({
  "& .MuiButton-root": {
    textTransform: "capitalize",
    color: "#d7282f",
    fontSize: "13px",
    paddingTop: 0,
    paddingBottom: 0,
    "& i::before": {
      fontSize: "17px !important",
    },
    "&:hover": {
      background: "rgba(225, 40, 47, 0.04)",
    },
  },
});
export const PostRequestButton = styled(Button)({
  backgroundColor: "#d7282f",
  color: "#fff",
  borderRadius: "3px",
  padding: "3px 11px",
  border: "1px solid #d7282f",
  transition: "all ease .3s",
  textTransform: "capitalize",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#bc2b30",
    border: "1px solid #bc2b30",
  },
});
/**********===== End Admin RFQ Styling =====***********/
export const LoadMorBtnBox = styled(Box)({
  position: "relative",
  bottom: "10px",
});
// Chat Tab
export const ChatTab = styled(Tabs)({
  textTransform: "capitalize",
  "& .Mui-selected": {
    color: "#d7282f",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#d7282f",
  },
  minHeight: "auto",
  "& .MuiButtonBase-root": {
    // fontWeight: "700",
    // color: "#231f20",
    textTransform: "capitalize",
  },
});
// discount offer
export const DiscountOfferBox = styled(Box)({
  background: "#E9FAFF",
  borderRadius: "6px",
  padding: "10px",
  position: "relative",
  textAlign: "center",
  cursor: "pointer",
  minWidth:'300px',
  "& .flatOffer": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#d7282f",
    // fontFamily: "Impact !important",
    textTransform: "uppercase",
    "& sup": {
      color: "#231f20",
      fontWeight: "700",
    },
  },
  "& .slash": {
    fontSize: "26px",
  },
  "& .categoryBox": {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  "& .on": {
    fontSize: "12px",
    textTranform: "uppercase",
    color: "#231f20",
  },
  "& .CatName": {
    fontSize: "14px",
    textTranform: "uppercase",
    color: "#231f20",
    fontWeight: "700",
  },
  "& .verified": {
    fontSize: "16px",
    color: "#2874F0",
    fontWeight: "700",
  },
  "& .not-verified": {
    fontSize: "16px",
    color: "#d7282f",
    fontWeight: "700",
    cursor: "pointer",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  "& .DateTime": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#231f20",
  },
});
export const DiscountOfferName = styled(Box)({
  border: "2px solid #231f20",
  borderRadius: "14px",
  position: "relative",
  padding: "8px 12px 12px 12px",
  display: "inline-block",
  textAlign: "center",
  minWidth: "160px",
  "& .name": {
    fontSize: "18px",
    fontWeight: "700 !important",
    color: "#d7282f",
    fontFamily: "Oswald !important",
    textTransform: "uppercase",
  },
  "& .Sale": {
    position: "absolute",
    bottom: "-100%",
    left: "50%",
    transform: "translate(-50%,-50% )",
    background: "#E9FAFF",
    padding: "0 16px",
    "& .saleText": {
      fontSize: "28px",
      color: "#d7282f",
      fontFamily: "Rochester !important",
      fontWeight: "400 !important",
    },
  },
});
// securtiy setting
export const SecuritySettingBack = styled(Box)({
  backgroundColor: "#F4F6FA",
  padding: "8px",
  "& .innerBox": {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .backIcon": {
      position: "absolute",
      left: 0,
      cursor: "pointer",
    },
    "& .Heading": {
      fontSize: "18px",
      fontWeight: "700",
    },
  },
});
export const SecuritySettingBox = styled(Box)({
  padding: "40px 15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  "& .badge": {
    fontSize: "28px",
    color: "#231f20",
  },
  "& .Subheading": {
    fontSize: "18px",
    fontWeight: "700",
    color: "#231f20",
  },
  "& .Subtext": {
    fontSize: "14px",
    fontWeight: "400",
    color: "#231f20",
    textAlign: "center",
    "& span": {
      fontWeight: "600",
    },
    "& .Active": {
      color: "#34a853",
      textTransform: "capitalize",
    },
  },
  "& .SendBTN": {
    backgroundColor: "#d7282f",
    color: "#fff",
    textTransform: "capitalize",
  },
  "& .italicsText": {
    fontStyle: "italic",
    fontWeight: "300",
    color: "#231f20",
    textAlign: "center",
    fontSize: "12px",
  },
  "& .OtpBox": {
    "& input": {
      padding: "0px",
      height: "50px",
    },
  },
});
// Chat Tags
export const TagOuter = styled(Box)({
  padding: "0 15px",
  "& .TagHeading": {
    fontSize: "16px",
    fontWeight: "600",
    color: "#231f20",
    textAlign: "center",
    margin: "12px 0",
  },
  "& .olBox": {
    padding: "0 0 0 15px",
    "& li": {
      margin: "12px 0",
      fontSize: "14px",
      fontWeight: "500",
      textTransform: "capitalize",
      "& .LiFlex": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .liText": {
          fontSize: "14px",
          fontWeight: "500",
          textTransform: "capitalize",
        },
        "& .liAction": {
          display: "flex",
          alignItems: "center",
          gap: "4px",
          "& svg": {
            fontSize: "16px",
            cursor: "pointer",
          },
          "& .MuiDivider-root": {
            height: "15px",
          },
        },
      },
    },
    "& li::marker": {
      fontWeight: "600",
    },
  },
  "& .NewTagAdd": {
    margin: "12px",
    textAlign: "center",
    "& .MuiButtonBase-root": {
      backgroundColor: "#d7282f",
      color: "#fff",
      textTransform: "capitalize",
      fontSize: "13px",
    },
  },
});

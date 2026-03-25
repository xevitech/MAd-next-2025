import {
  Box,
  Card,
  Dialog,
  FormControl,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { margin, styled } from "@mui/system";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { AnyAaaaRecord } from "dns";
import Menu from "@mui/material/Menu";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
/******========= Start List View style ========******/
export const DetailDrawerBox = styled(Box)({
  margin: "2rem 0 1rem",
  padding: "0 0 1rem",
});
export const TableCoulmn = styled(Box)({
  // height: "100%",
  // height:"calc(100vh - 22vh)",
  height: "690px",
  "@media screen and (max-width: 900px)": {
    height: "400px",
  },
});

export const CrmTableField = styled(Box)({
  "& .crmlanguagefield": {
    "& .MuiChip-root": {
      // display: "table-cell",
      fontFamily: "inherit",
      borderRadius: "0 16px 16px 0",
      height: "19px",
      margin: "1px",
    },
    "& .MuiChip-label": {
      fontSize: "11px",
      padding: "3px 5px",
    },
  },
  "& .sociallinksValueShow": {
    display: "flex",
    gap: 8
  }
});

/******========= End List View style ========******/

/******========= Start Kanban View style ========******/
export const KanbanBoxContainer = styled(Box)({
  width: "calc(100% - 6px)",
  overflowX: "auto",
  height: "100%",
});
export const KanbanItem = styled(Box)({
  background: "#F6F6F6",
  border: "1px solid #EAEAEA",
  borderRadius: 6,
  width: "310px",
  height: "100%",
  padding: "9px 5px 20px",
  "@media screen and (max-width: 1600px)": {
    // padding: "8px",
  },
  // "& .MuiCheckbox-root": {
  //     visibility: "hidden"
  // },
  // "&:hover": {
  //     "& .MuiCheckbox-root": {
  //         visibility: "visible"
  //     },
  // },
  ".MuiCheckbox-root": {
    "& .Mui-checked": {
      color: "#d7282fcc !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#D7282F",
      fontSize: 16,
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: 3,
      left: 6,
      opacity: "0",
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
    "&.MuiButtonBase-root": {
      padding: "0 !important",
    },
  },
});

export const ItemInfo = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const CardHeading: any = styled(Typography)(({ text }: any) => ({
  color: text ? text : "#34A400",
  fontSize: "16px",
  fontWeight: 700,
  "& .MuiCheckbox-root": {
    padding: "0 !important",
  },
}));
export const CardLayout = styled("div")({
  margin: "12px 0 0",
  "& .MuiPaper-root": {
    padding: "12px 8px",
    boxShadow: "none",
    border: "1px solid #EBEBEB",
    "@media screen and (max-width: 1600px)": {
      padding: "10px 10px 20px",
    },
  },
});
export const LeadNameValue = styled(Typography)({
  color: "#231F20",
  fontSize: "14px",
  fontWeight: 600,
  textTransform: "capitalize",
  cursor: "pointer",
  "@media screen and (max-width: 1600px)": {
    fontSize: "14px",
  },
});
export const CardStyle = styled(Card)({
  background: "#fff",
  border: "1px solid #EBEBEB",
  borderRadius: 2,
});
export const CardInfo = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  "&.MuiCheckbox-root": {
    padding: "0 !important",
  },
});
export const CardTypeValue = styled(Typography)({
  color: "#4A4A4A",
  fontSize: "12px",
  fontWeight: 700,
});
export const PriceValue: any = styled(Typography)({
  color: "#4A4A4A",
  fontSize: "12px",
  fontWeight: 600,
});
export const PriceBoxV = styled(Box)({
  display: "flex",
});
export const LeadNumber = styled(Box)({
  fontSize: "12px",
  // fontWeight: 700,
  padding: "0px 14px 0",
  color: "#4A4A4A",
  position: "relative",
  "&:before": {
    content: '"."',
    position: "absolute",
    borderRadius: "50%",
    fontSize: "21px",
    left: "6px",
    top: 2,
    transform: "translateY(-50%)",
    opacity: ".6",
  },
});

export const EmailStack = styled(Stack)({
  padding: "4px 0",
  "& svg": {
    fontSize: "14px",
  },
});
export const CardMail: any = styled(Typography)(({ text }: any) => ({
  color: text ? text : "#4A4A4A",
  fontSize: 12,
}));
export const CompanyInfo: any = styled(Box)(({ value }: any) => ({
  display: "flex",
  padding: "1px 0",
  alignItems: "center",
  "& .MuiTypography-root": {
    color: value ? value : "#231F20",
    fontSize: "13px",
    fontWeight: 600,
    padding: "0 7px",
    cursor: "pointer",
    textTransform: "capitalize",
  },
}));
export const ComanyIcon: any = styled("div")(({ value }: any) => ({
  width: "30px",
  height: "30px",
  borderRadius: "50px",
  background: value ? value : "#E9FCE6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media screen and (max-width: 1600px)": {
    width: "30px",
    height: "30px",
  },
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "13px",
    fontWeight: 700,
  },
  "& svg": {
    fontSize: "20px",
  },
}));
export const AnnualRevenue = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
});
export const RevenueStack = styled(Stack)({
  position: "relative",
  "& .MuiTypography-root": {
    color: "#4A4A4A",
    fontSize: "12px",
    // fontWeight: 600,
  },
  "& svg": {
    fontSize: "18px",
  },
});
export const AddIcon = styled(AddCircleOutlinedIcon)({
  color: "#34A400",
  fontSize: "25px !important",
  "@media screen and (max-width: 1600px)": {
    fontSize: "19px !important",
    margin:'4px 0 0 0'
  },
});
export const RemoveIcon = styled(RemoveCircleOutlineIcon)({
  // color: "#34A400",
  fontSize: "25px !important",
  "@media screen and (max-width: 1600px)": {
    fontSize: "19px !important",
    margin:'4px 0 0 0'
  },
});

export const KanbanQuickAdd = styled(Menu)({
  "& .MuiButtonBase-root": {
    fontSize: "13px",
    color: "#000",
  },
  "& .MuiPaper-root": {
    margin: 0,
    boxShadow: "none",
  },
  "& .MuiDivider-root": {
    margin: "0 6px",
  },
});

export const KanbanItemHeader: any = styled(Box)(
  ({ theme, value, text }: any) => ({
    background: value ? value : "#F9FFF8",
    borderLeft: text ? `3px solid ${text}` : "3px solid #34A400",
    padding: "5px 8px",
    borderRadius: 4,
  })
);

export const KanbanItemHeaderBlue = styled(Box)({
  background: "#E3EEFF",
  borderLeft: "3px solid #4476CF",
  padding: "5px 8px",
  borderRadius: 4,
});
export const KanbanItemHeaderRed = styled(Box)({
  background: "#FFEEEF",
  borderLeft: "3px solid #D7282F",
  padding: "5px 8px",
  borderRadius: 4,
});
export const KanbanItemHeaderPurple = styled(Box)({
  background: "#F7F2FE",
  borderLeft: "3px solid #A386C7",
  padding: "5px 8px",
  borderRadius: 4,
});
export const KanbanItemHeaderGreen = styled(Box)({
  background: "#F9FFF8",
  borderLeft: "3px solid #34A400",
  padding: "5px 8px",
  borderRadius: 4,
});

export const KanbanItemGreen: any = styled(Box)(
  ({ theme, value, text }: any) => ({
    "& svg, i::before": {
      color: value ? `${value} !important` : "#34A400 !important",
    },
    "& i": {
      fontSize: "14px"
    },
  })
);
export const KanbanItemBlue = styled(Box)({
  "& svg": {
    // color: "#4476CF !important",
  },
});
export const KanbanItemRed = styled(Box)({
  "& svg": {
    // color: "#D7282F !important",
  },
});
export const KanbanItemPurple = styled(Box)({
  "& svg": {
    // color: "#A386C7 !important",
  },
});

export const LabelChipStack = styled(Box)({
  display: "-webkit-box",
  flexWrap: "wrap",
  gap: 6,
  margin: "7px 0 0",
  borderTop: "1px solid #E6E6E6",
  padding: "10px 0 0",
});
export const CustomChip: any = styled("div")(({ value, text }: any) => ({
  background: value ? value : "#F7FFC9",
  border: text ? `1px solid ${text}` : "1px solid #92AA12",
  color: text ? text : "#92AA12",
  fontSize: "11px",
  padding: "1px 6px",
  borderRadius: "100px",
  fontWeight: 400,
}));
export const MoreTag: any = styled(Box)(({ value, text }: any) => ({
  background: value ? value : "#F7FFC9",
  border: text ? `1px solid ${text}` : "1px solid #92AA12",
  color: text ? text : "#92AA12",
  fontSize: "11px",
  padding: "1px 6px",
  borderRadius: "100px",
  fontWeight: 400,
}));
export const KanbanScroll = styled("div")({
  height: "612px",
  overflowY: "auto",
  "@media screen and (max-width: 1700px)": {
    height: "480px",
    minheight: "480px"
  },


});
export const CustomChip2 = styled("div")({
  background: "#FFDEDF",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "12px",
  padding: "2px 6px",
  borderRadius: "100px",
  fontWeight: 600,
});
export const MoreTags = styled("div")({
  fontSize: "12px",
  color: "#4a4a4a",
  "& span": {
    fontWeight: 600,
  },
});
/******========= End Kanban View style ========******/
/******========= End PipelineManagement styling ========******/

/******========= Start kanban setting popup styling ========= *****/
export const KanbanSettingPopup = styled(Box)({ padding: "0 1rem 1rem" });
export const KanbanSettingForm = styled(Box)({
  margin: "1rem 0 1.5rem",
});
export const KanbanSettingButton = styled("div")({
  textAlign: "right",
  display: "flex",
  gap: 10,
  float: "right",
  margin: "0 0 10px",
});
export const KanbanHeading = styled(Typography)({
  fontSize: "16px",
  color: "#000",
  fontWeight: 600,
  "& span": {
    fontWeight: 400,
    fontSize: "14px",
  },
});
/******========= End kanban setting popup styling ========= *****/

/****** Start Common style for Dialog ******/
export const StyledBootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    maxWidth: "850px",
    borderRadius: "10px",
  },
  "& .MuiDialogContent-root": {
    padding: "30px 16px",
  },
  "& .MuiDialogActions-root": {
    padding: " 12px 10px",
    background: "#FFF7F7",
    justifyContent: "center",
  },
  " & .MuiDialogTitle-root": {
    background: "#FFE5E7",
    padding: "8px 15px",
    color: "#d7282f",
  },
}));
/****** End Common style for Dialog ******/
export const HideContent = styled("div")({});



/*****============ Other Module (Task, Meeting, Call) styling ============******/
export const TaskRelatesTable = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 5,
  "& i:before": {
    color: "#3E5060",
    fontSize: 16,
    margin: "1px 4px"
  },
  "& .relatedWithValueShow": {
    display: "flex",
    alignItems: "center",
    gap: 5,
    "& .MuiTypography-root": {
      fontSize: "13px",
    },
    "& .icon-contact:before": {
      fontSize: "10px",
    },
  }
});
export const TaskStatusCol = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 5,
});
export const TaskOwnerInfo = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 5,
  "& .MuiAvatar-root": {
    width: "22px",
    height: "22px",
    borderRadius: "50px",
  },
  "& .MuiTypography-root": {
    color: "#231F20",
    fontSize: "13px",
    fontWeight: 600,
  },
  "& span": {
    display: "flex",
    gap: 2,
    alignItems: "center",
    "& svg": {
      fontSize: "12px",
      color: "#4a4a4a !important",
    },

    "& .MuiTypography-root": {
      color: "#231F20",
      fontSize: "12px",
      fontWeight: 400,
    },
  },
});
export const TaskRightInfo = styled("div")({
  "& .MuiTypography-root": {
    fontSize: "12px",
    fontWeight: 400,
  },
});


/******========== Task kanban view ui ==========*******/
export const TaskKanbanBoxContainer = styled(Box)({
  height: "100%",
  "@media screen and (max-width: 1600px)": {
    width: "calc(100% - 6px)",
    overflowX: "scroll",
  },
});
export const TaskGridItem = styled(Grid)({
  maxWidth: "500px !important",
  flexBasis: "500px !important"
});
export const TaskKanbanItem = styled(Box)({
  background: "#F6F6F6",
  border: "1px solid #EAEAEA",
  borderRadius: 6,
  padding: "9px 5px 20px",
  width: "300px",
  height: "100%",
  "@media screen and (max-width: 1600px)": {
    // width: "310px",
  },
  ".MuiCheckbox-root": {
    "& .Mui-checked": {
      color: "#d7282fcc !important",
    },
    "& .MuiSvgIcon-root": {
      color: "#D7282F",
      fontSize: 16,
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: 3,
      left: 6,
      opacity: "0",
    },
    "&.Mui-checked": {
      "&:after": {
        opacity: "1",
      },
      "&:before": {
        borderColor: "#D7282F",
      },
    },
    "&.MuiButtonBase-root": {
      padding: "0 !important",
    },
  },
});


/********=================Contact Module styling here ===================== **********/
export const ListSocialIconTable = styled("div")({});
export const SocialLinksTooltipText = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "12px",
    fontWeight: 400,
    cursor: "pointer"
  },
});

/********================= Start Deal (Kanban view )PipeLine styling here ===================== **********/
export const DownArrowIconn = styled("span")({
  borderRight: "1px solid #BFBFBF",
  height: "30px",
  display: "flex",
  alignItems: "center",
  padding: "0 3px"
});
export const StyledMenu3 = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: 6,
    width: "138px",
    border: "1px solid #D2D2D2",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
    boxShadow: "none"
  },
  "& .MuiList-root": {
    padding: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "17px"
  },
  "& .MuiListItemIcon-root": {
    minWidth: 25,
  },
  "& .rightcheckicon": {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    transition: 'all ease .1s',
  },
  "& .MuiButtonBase-root:hover": {
    "& .rightcheckicon": {
      visibility: "visible"
    }
  }
});
/********================= End Deal (Kanban view )PipeLine styling here ===================== **********/

export const ListActionStyling = styled("span")({
  display: "flex",
  cursor: "pointer",
  alignItems:"center",
  "& svg": {
    width: "19px",
    height: "19px",
    color: "#d7282f",
  }
});
export const ListActionFlex = styled(Box)({
  display: "flex", gap: "6px",
  "& .MuiDivider-root": {
    height: "15px",
  }
});
export const ListGroupColumn = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "13px",
    cursor: "pointer"
  },
});



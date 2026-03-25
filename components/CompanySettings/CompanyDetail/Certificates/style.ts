import { Box, Button, styled, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
export const Tabs = styled(Button)({
});

export const CustomTabsContainer = styled("div")({
  "& .MuiTab-root": {
    textTransform: "none",
  },

  "& .Mui-selected": {
    color: "black",
    fontWeight: "400",
  },
});

/******** Maya styling for jira issues *********/
export const CompantDetailTb = {
  "@media (max-width:767px)": {
    background: "transparent !important",
  },
  "@media (max-width:600px)": {
    "& .MuiButtonBase-root": {
      display: "flex"
    }
  }
};

export const SwipeableDrawerStyle = styled(SwipeableDrawer)({
  "@media (max-width:600px)": {
    "& .MuiPaper-root": {
      width: "90%"
    }
  }
});
export const OuterAddCertificate = styled("div")({
  "@media (max-width:600px)": {
    padding: "0 !important"
  }
});

export const UploadImgBox = styled("div")({
  borderRadius: "6px"
});


/**** Start Association Certificate View/Edit Mode ****/
export const AssociationCategoryMain = styled(Box)({
  margin: "10px 0 0",
});


export const BGHeading = styled(Box)({
  background: "#F5F5F5",
  padding: "7px",
  borderRadius: "6px 6px 0px 0px",
  "& .MuiTypography-root": {
    color: "#000",
    fontWeight: 600,
    fontSize: "14px",
  }
});

export const AssociationCategoryViewMode = styled(Box)({
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "6px",

});
export const ButtonWithText = styled(Box)({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  padding: "7px 0",
  "& button": {
    background: "#d7282f",
    textTransform: "capitalize",
    boxShadow: "none !important",
    opacity: "0.85",
    "&:hover": {
      background: "#d7282f",
      opacity: 1
    }
  }
});


export const EditCategorySection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CancelTextWithIcon = styled(Box)({
  color: "#231f20",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  "& svg": {
    fontSize: "15px",
    color: "#d7282f"
  },
  // "& .MuiSvgIcon-root":{
  //   color:"d7282f"
  // },
//   "& .MuiTypography-root":{
//  color:"d7282f"
//   },
  "& .MuiTypography-body1": {
    color: "#d7282f",
    fontSize: "13px"
  },
  "&:hover": {
    opacity: "0.7"
  }
});
export const EditTextWithIcon = styled(Box)({
  color: "#d7282f",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  // "& .savewithicon":{
  //   color: "gree",
  // },
  "& svg": {
    fontSize: "18px",
    color: "#231f20",
  },
  "& .MuiTypography-body1": {
    color: "#231f20",
    fontSize: "13px",
    margin: "1px 3px 0"
  },
  "&:hover": {
    opacity: "0.7"
  },
  position: "relative",
  "&::before": {
    borderRight: "1px solid #d2d2d2",
    content: '" "',
    position: "absolute",
    right: "-9px",
    height: "17px",
    color: "#231f20",
  },
});

export const EditDeleteButtons = styled(Box)({
  display: "flex",
  gap: "12px",
  margin: "10px 0 0"
});
export const SavedCategoryCase = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  padding: "5px",
  background: "#f7f7f7",
  margin: "7px 0 5px",
  borderRadius: "4px",
  gap: "12px",
  width: "max-content",
  "& span": {
    fontSize: "12px",
    color: "#000",
    background: "#dfdfdf",
    padding: "2px 6px",
    borderRadius: "3px",
    textTransform: "capitalize",
  }
});
export const ImportantNoteText = styled(Typography)({
  fontSize: "12px",
  color: "#747474"
});

/**** Edit styling ****/
export const AssociationCategoryEditMode = styled(Box)({
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "6px",
  background: "#f5f5f5"
});
export const InnerScrollBox = styled(Box)({
  overflowX: "auto",
  display: "flex",
  gap: 10,
  borderBottom: "1px solid #ddd",
  padding: "0 0 10px",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "4px",
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
export const CategoryListBox = styled(Box)({
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "6px",
  width: "252px",
  background: "#fff",
  minWidth: 200,
  "& .MuiListItemButton-root": {
    padding: "0 4px",
    "& .MuiTypography-root": {
      fontSize: "13px"
    }
  }
});
export const CategoryListBoxInner = styled(Box)({
  maxHeight: "200px",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "4px",
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

export const SearchCommon = styled("div")(({ theme }) => ({
  position: "relative",
  marginLeft: 0,
  width: "100%",
  padding: "0",
  borderRadius: "4px",
  margin: "6px 0px 2px",
  "& .MuiInputBase-input": {
    paddingTop: "6px",
    paddingBottom: "6px",
    transition: "all 2s ease-in",
  },
  "& button": {
    padding: "0",
    margin: "3px 0px 3px -5px"
  },
  "& svg": {
    color: "#515151",
    fontSize: "16px",
  },
}));

/**** End Association Certificate View/Edit Mode ****/








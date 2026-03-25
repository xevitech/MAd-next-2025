import { Box } from "@mui/material";
import { styled } from "@mui/styles";

export const DataGridStyle = {
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },
  "&.MuiDataGrid-root": {
    height: "100%",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    fontSize: "14px",
    color: "#1A2027",
    fontFamily: "Open Sans",
  },
  "& .MuiDataGrid-cell, .MuiTypography-root": {
    color: "#3E5060",
    fontSize: "13px",
    fontFamily: "Open Sans",
    cursor: "pointer",
  },
  "& .Mui-checked": {
    color: "#d7282fcc !important",
  },
  // ".MuiCheckbox-root": {
  //   "& .MuiSvgIcon-root": {
  //     display: "none",
  //   },
  //   "&:before": {
  //     content: '" "',
  //     display: "block",
  //     width: "1rem",
  //     height: "1rem",
  //     border: "1px solid #d2d2d2",
  //     borderRadius: "4px",
  //   },
  //   "&:after": {
  //     content: '" "',
  //     display: "inline-block",
  //     transform: "rotate(45deg)",
  //     width: "4px",
  //     height: "8px",
  //     borderBottom: "2px solid #D7282F",
  //     borderRight: "2px solid #D7282F",
  //     position: "absolute",
  //     top: "11px",
  //     opacity: "0",
  //   },
  //   "&:hover": {
  //     "&:before": {
  //       borderColor: "#b1b0b0",
  //     },
  //   },
  //   "&.Mui-checked": {
  //     "&:after": {
  //       opacity: "1",
  //     },
  //     "&:before": {
  //       borderColor: "#D7282F",
  //     },
  //   },
  // },

  ".MuiCheckbox-root": {
    "& .MuiSvgIcon-root": {
      display: "none", // Hide default icons
    },

    // Custom checkbox styles (ONLY for normal checkboxes)
    "&:not(.MuiCheckbox-indeterminate)": {
      "&:before": {
        content: '" "',
        display: "block",
        width: "14px",
        height: "14px",
        border: "1px solid #d2d2d2",
        borderRadius: "4px",
        padding: 0,
      },
      "&:after": {
        content: '" "',
        display: "inline-block",
        transform: "rotate(45deg)",
        width: "4px",
        height: "8px",
        borderBottom: "1px solid #D7282F",
        borderRight: "1px solid #D7282F",
        position: "absolute",
        top: "11px",
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
    },

    // Keep the default icon for the "Select All" checkbox
    "&.MuiCheckbox-indeterminate": {
      "&:before": {
        content: '" "',
        display: "block",
        width: "14px",
        height: "14px",
        border: "1px solid #D7282F",
        borderRadius: "4px",
        padding: 0,
      },
      "&:after": {
        content: '" "',
        display: "inline-block",
        width: "8px",
        height: "1px",
        backgroundColor: "#D7282F",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: "1",
      },
      "&:hover": {
        "&:before": {
          borderColor: "#D7282F",
        },
      },
    },
  },

  "& .MuiDataGrid-virtualScroller": {
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
};

export const DeleteAll = styled("div")({
  fontSize: "25px",
  cursor: "pointer",
  color: "#D7282F",
});

export const TabsCustomSlide = {
  "&:hover": {
    backgroundColor: "transparnt",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#fff",
    height: "30px",
    minHeight: "30px",
    borderRadius: "7px",
    top: 7,
    border: "1px solid #D7282F",
    color: "#D7282F !important",
  },
  "& .MuiTab-root": {
    textTransform: "capitalize",
    fontSize: "14px",
    margin: "-2px 0 0",
  },

  "& .MuiTab-root.Mui-selected": {
    color: "#d7282f",
    borderRadius: "6px",
    minHeight: "30px",
    height: "30px",
    zIndex: 1,
    minWidth: "60px",
    lineHeight: "12px",
    "& span": {
      background: "#d7282f",
    },
  },

  "& .MuiTabs-flexContainer": {
    alignItems: "center",
  },
  "&.MuiTab-root.Mui-selected": {
    color: "#D7282F",
  },
  "@media screen and (max-width:320px)": {
    //only used in notification popup
    width: "80%",
  },
};

export const ContactTabs = styled(Box)({
  gap: "10px",
  display: "flex",
  "& .MuiButtonBase-root": {
    "@media (max-width: 420px)": {
      justifyContent: "flex-start",
    },
    "@media (max-width: 767px)": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "4px 12px",
      margin: "0",
    },
  },
  "@media (max-width: 767px)": {
    flexDirection: "column",
    gap: "0px",
  },
});
export const SimpleCheckBox = {
  padding: "0 9px 0 9px",
  "& .MuiSvgIcon-root": {
    display: "none", // Hide default checkbox icon
  },
  position: "relative",
  width: "125x",
  height: "17px",

  "&:not(.MuiCheckbox-indeterminate)": {
    "&::before": {
      content: '""',
      display: "block",
      width: "14px !important",
      height: "14px !important",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&.Mui-checked::before": {
      borderColor: "#D7282F",
    },
    "&::after": {
      content: '""',
      display: "block",
      width: "4px",
      height: "8px",
      borderBottom: "1px solid #D7282F",
      borderRight: "1px solid #D7282F",
      transform: "rotate(45deg)",
      position: "absolute",
      top: "2px",
      left: "14px",
      opacity: 0,
    },
    "&.Mui-checked::after": {
      opacity: 1,
    },
  },
};

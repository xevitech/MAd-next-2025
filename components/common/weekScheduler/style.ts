import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const SchedulerPaperBox = styled(Box)({
  "& .Layout-timeScaleContainer": {
    background: "#F9F9F9",
    borderColor: "#DDDDDD",
    borderRight: "1px solid #DDDDDD",
  },
  "& .Appointment-appointment": {
    borderRadius: "6px !important",
    padding: "5px 3px",
  },
  "& .VerticalAppointment-content": {
    fontSize: 10,
  },
  "& .Cell-dayOfMonth, .Cell-dayOfWeek, .Label-text": {
    color: "#B1B1B1 !important",
    fontSize: "14px !important",
    fontFamily: "open sans",
  },
  "& .MainLayout-background": {
    background: "#F9F9F9",
  },
  "& .MainLayout-leftPanel": {
    border: "none !important",
  },
  "& .MainLayout-container": {
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dedede",
      borderRadius: "4px",
    },
    "& .MainLayout-container": {
      width: "100%"
    }
  },
  "& .MuiToolbar-root": {
    "& .MuiButtonBase-root": {
      fontSize: "12px",
      padding: "3px",
      border: "1px solid #BFBFBF",
      color: "#000"
    },
    "& .Root-root": {
      position: "absolute",
      bottom: "6px",
      left: 0,
      width: "100%",
      "& .MuiButtonBase-root": {
        fontSize: "12px",
        border: "none",
        background: "#FFECEC",
        color:"#d7282f"
      },
      "& .MuiButtonBase-root:nth-child(1)": {
        position: "absolute",
        right: "30px",
      },
      "& .MuiButtonBase-root:nth-child(2)": {
        position: "absolute",
        right: "0",
      },
    },

  },
  "& .Switcher-inputRoot": {
    "& .Switcher-input": {
      paddingTop: "3px",
      paddingBottom: "3px",
      fontSize: "12px",
      color: "#000"
    }
  },
  "& .MuiToolbar-regular": {
    padding: 0
  },
  "& .Cell-dayOfWeek": {
    fontWeight: 400
  },
  "& .Root-root": {
    marginLeft: "4px",
    "& button:first-child": {
    },
    "& svg": {
      fontSize: "16px"
    }
  },
  "& .Toolbar-toolbar": {
    padding: "0px 0 55px",
  }
});


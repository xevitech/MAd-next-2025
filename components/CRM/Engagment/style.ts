import { BorderStyle } from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    InputBase,
    Stack,
    styled,
    Grid,
    Snackbar,
    Typography

} from "@mui/material";
export const EngagmentStatsContainer = styled(Box)({
    background: "#fff",
    borderRadius: "6px",
    padding: "1rem"
});
export const HeadingTrackingCommon = styled(Box)({
    background: "#F5F5F5",
    padding: "10px",
    borderRadius: "6px 6px 0px 0px",
    "& .MuiTypography-root": {
        color: "#393939",
        fontWeight: 600,
    }
});
export const TableGrid = styled(Box)({
    height: 500,
    width: "100%",
    margin: " 8px 0 0"
});

export const TrackingTopColumn = styled(Box)({
    textAlign: "center",
    "& .lightbg": {
        background: "#f5f5f5",
        border: "1px dashed #e0e0e0",
        "&:hover": {
            background: "#e4e4e4",
            border: "1px dashed #000",
            "& .MuiTypography-body1": {
                transform: "translateY(2px)"
            },
            "& .MuiTypography-h5": {
                transform: "translateY(-3px)"
            }
        },

    }
});
export const EngagmentTable = styled(Box)({
    padding: "1rem",
    ".tablecontainer": {
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "0 10px",
        width: "auto",
        borderBottom: "none"
    },
    "& .MuiTableCell-head": {
        fontWeight: 600,
        fontSize: "14px",
        color: "#1A2027",
        fontFamily: "Open Sans",
    },
    "& .MuiTableCell-body": {
        fontSize: "13px",
        color: "#3E5060",
        fontFamily: "Open Sans",
        // border: "none",
        padding: "6px 16px !important"
    },
    "& .MuiTableRow-head": {
        background: "#f5f5f5"
    },
    "& .MuiTableRow-root": {
        borderBottom: "1px solid #ddd"
    },
});
export const EngagmentTableClickeble = styled(Box)({
    margin: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    borderBottom: "none",
    ".tablecontainer": {
        border: "1px solid #ddd",
        borderRadius: "4px",
        margin: "0 10px",
        width: "auto",
        borderBottom: "none"
    },
    "& .MuiTableCell-head": {
        fontWeight: 600,
        fontSize: "14px",
        color: "#1A2027 !important",
        fontFamily: "Open Sans",
        padding: "12px 16px"
    },
    "& .MuiTableCell-body": {
        fontSize: "13px",
        color: "#3E5060 !important",
        fontFamily: "Open Sans",
        border: "none",
        padding: "1.5px 16px !important",
        "& svg": {
            fontSize: "16px"
        }
    },
    "& .MuiTableRow-head": {
        background: "#f5f5f5"
    },
    "& .MuiTableRow-root": {
        borderBottom: "1px solid #ddd"
    },
    "& .MuiTableRow-root:nth-child(even)": {
        border: "none"
    },
   
});
export const TrackingColData = styled(Box)({
    background: "#FFEEEF",
    border: "1px solid #FBDDDD",
    borderRadius: "4px",
    padding: "1rem",
    height: "100%",
    transition: "all 0.5s",
    cursor: "pointer",
    "& .MuiTypography-body1": {
        fontSize: "16px",
        color: "#4a4a4a",
        fontWeight: "600",
        transform: "translateY(0px)",
        transition: "all 0.5s",
        "@media screen and (max-width:1600px)": {
            fontSize: "14px",
        }

    },
    "&:hover": {
        background: "#ffdadc",
        border: "1px dashed #d7282f",
        "& .MuiTypography-body1": {
            transform: "translateY(2px)"
        },
        "& .MuiTypography-h5": {
            transform: "translateY(-3px)"
        }
    },
    "& .MuiTypography-h5": {
        color: "#d7282f",
        fontWeight: "600",
        fontSize: "16px",
        padding: "6px",
        transform: "translateY(0px)",
        transition: "all 0.5s",
        "&:hover": {

        }

    }
});
export const TotalCountData = styled("h5")({
});
export const TrackingTableOuter = styled(Box)({
    padding: "16px 0"
});
export const TableBorderSection = styled(Box)({
    border: "1px solid #ddd",
    borderRadius: "6px",
    margin: "0 0 20px",
    height: "100%"
});

export const TrackingDrawerData = styled(Box)({
});
export const TopbarTrackingdrawer = styled(Box)({
    background: "#ffedee",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    "& .MuiTypography-root": {
        fontWeight: 600,
        fontSize: "18px"
    }
});
export const InnerTableArea = styled(Box)({
    padding: "1rem",
});
/***** Icon datagrid  ******/
export const DataGridStyleIcon = {
    "& .MuiDataGrid-cell:focus": {
        outline: "none",
    },
    "&.MuiDataGrid-root": {
        height: "90%",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 600,
        fontSize: "14px",
        color: "#1A2027",
        fontFamily: "Open Sans",
    },
    "& .MuiDataGrid-cell": {
        color: "#3E5060",
        fontSize: "13px",
        fontFamily: "Open Sans",
        cursor: "pointer",
    },
    "& .Mui-checked": {
        color: "#d7282fcc !important",
    },
    "& .MuiSvgIcon-root": {
        color: "#D7282F",
        fontSize: 16,
    },
    "& .MuiDataGrid-columnSeparator": { display: "none" },
    ".MuiCheckbox-root": {
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
            borderBottom: "1px solid #D7282F",
            borderRight: "1px solid #D7282F",
            position: "absolute",
            top: "8px",
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
    },
    "& .MuiDataGrid-columnHeadersInner": {
        background: "#f5f5f5"
    }

};
export const TooltipTable = styled(Box)({
    "& .MuiDataGrid-row:first-child": {
        background: "#dcf6d2",
    },
    "& .MuiDataGrid-row:last-child": {
        background: "#FFEEEF",
    },
    "& .redrowtable": {
        "& .MuiDataGrid-row:first-child": {
            background: "#FFEEEF",
        },
        "& .MuiDataGrid-row:last-child": {
            background: "#dcf6d2",
        },
    }
});
export const TableHeading = styled(Box)({
    padding: "2px 5px",
    background:"#F5F5F5",
    "& .MuiTypography-root":{
        fontSize:"16px",
        color:"#393939",
        padding:"10px",
        fontWeight:600
    }
});
export const SmallTableView = styled(Box)({
    border: "1px solid #ddd",
    borderRadius: "4px",
    margin:"2rem 1rem",
    "& .MuiTableCell-body": {
        border: "1px solid #ddd",
        borderLeft:0,
        borderRight:0,
        padding:"6px 12px !important",
    },

});


















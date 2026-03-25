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
export const TrackingStatsContainer = styled(Box)({
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
    textAlign: "center"
});
export const TrackingColData = styled(Box)({
    background: "#FFEEEF",
    border: "1px solid #FBDDDD",
    borderRadius: "4px",
    padding: "1rem",
    height:"100%",
    transition: "all 0.5s",
    cursor:"pointer",
    "& .MuiTypography-body1": {
        fontSize: "16px",
        color: "#4a4a4a",
        fontWeight: "600",
        transform: "translateY(0px)",
        transition: "all 0.5s",
        "@media screen and (max-width:1500px)": {
            fontSize: "14px",
        }

    },
    "&:hover": {
        background: "#ffdadc",
        border:"1px dashed #d7282f",
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
    padding: "0px 16px"
});
export const TableBorderSection = styled(Box)({
    // padding: "10px",
    // border:"1px solid #ddd",
    // borderRadius:"6px"
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


















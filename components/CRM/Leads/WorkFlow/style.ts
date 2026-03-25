import { Box, Button, Dialog, FormControl, styled, Typography } from "@mui/material";

export const WorkflowWhiteContainer = styled(Box)({
    background: "#FFFFFF",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
    padding: "10px"
});

export const WorkflowWrapper = styled(Box)({
    border: "1px solid #D2D2D2",
    borderRadius: "10px",
    padding: "7px 18px",
});
export const SmallHeading = styled("h3")({
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
    fontSize: "18px"
});
export const RuleArea = styled(Box)({
    padding: "1rem 0 0"
});
export const RuleMainHeading = styled("h2")({
    fontSize: "18px",
    fontWeight: 600
});
export const RuleDes = styled(Typography)({
    fontSize: "14px",
    fontWeight: 400,
    padding: "10px 0"
});
export const RedFilledButton = styled(Button)({
    background: "#d7282f",
    color: "#fff",
    height: "30px",
    textTransform: "capitalize",
    "&:hover": {
        background: "#d7282f",
        color: "#fff",
    }
});

export const WorkflowSearchCommon = styled("div")(({ theme }) => ({
    position: "relative",
    marginLeft: 0,
    width: "400px",
    padding: "0",
    margin: "6px 0px 2px",
    "& .MuiInputBase-input": {
        paddingTop: "8px",
        paddingBottom: "8px",
        transition: "all 2s ease-in",
    },
    "& button": {
        padding: "0",
        margin: "3px 0px 3px -5px"
    },
    "& svg": {
        color: "#515151",
        fontSize: "19px",
    },
    "& fieldset": {
        borderRadius: "50px",
    },

}));

export const SearchContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between"
});
export const WorkFlowTableCoulmn = styled(Box)({
    margin: "1rem 0"
});
export const DataGridStyle = {
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
        color: "#d7282fcc",
    },
    "& .MuiSvgIcon-root": {
        color: "#D7282F",
        fontSize: 16,
    },
};

/**** Start Common styling for all Dialoge ****/
export const WorkflowBootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        borderTop:"none",
        padding:"12px 0 0"
    },
    "& .MuiDialogTitle-root":{
        padding:"0",
        color:"#000",
        fontSize:"18px",
        fontWeight:600
    },
    "& .MuiPaper-root":{
        width:"500px",
        padding:"20px"
    },
    "& .MuiDialogActions-root": {
        padding: "15px 0 0"
    }
}));

export const WFCreateRuleContainer = styled(Box)({
    display: "flex",
    gap: "10px"
});
export const MaxLimitTxt = styled(Typography)({
    fontSize: "13px",
    padding:"5px 2px 0"
});
export const WFFormControl = styled(FormControl)({
    margin: "0 0 16px"
});
/*************** End Common styling for all Dialoge  ****************/

/***************************************** CRM Buttons Variation  *************************************************/
export const CommonBlackOutineBtn = styled(Button)({
    minWidth: "90px",
    borderRadius: "4px",
    background: "#fff",
    border: "1px solid #231F20",
    color: "#231F20",
    fontSize: "13px",
    fontWeight: 600,
    padding: "0 6px",
    textTransform: "capitalize",
    height: "33px",
    "& svg": { fontSize: "16px !Important" },
    "&:hover": {
        background: "#231F20",
        opacity: "85%",
        color: "#fff",
        border: "1px solid transparent",
    },
    "&:hover i::before": {
        color: "#fff",
    },
    "@media screen and (max-width: 900px)": {
        minWidth: "70px",
        padding: "0 3px",
        height: "30px",
    },
});
export const CommonRedOutineBtn = styled(Button)({
    minWidth: "90px",
    borderRadius: "4px",
    background: "#fff",
    border: "1px solid #D7282F",
    color: "#D7282F",
    fontSize: "13px",
    fontWeight: 600,
    padding: "0 6px",
    textTransform: "capitalize",
    height: "33px",
    "& svg": { fontSize: "16px !Important" },
    "&:hover": {
        background: "#D7282F",
        opacity: "85%",
        color: "#fff",
        border: "1px solid transparent",
    },
    "&:hover i::before": {
        color: "#fff",
    },
    "@media screen and (max-width: 900px)": {
        minWidth: "70px",
        padding: "0 3px",
        height: "30px",
    },
});
/***************************************** CRM Buttons Variation  *************************************************/

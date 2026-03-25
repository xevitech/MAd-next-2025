import { Box, Button, FormControl, Grid, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import Popover from '@mui/material/Popover';

/******========= Start Scoring Rules page styling Here ========******/

/**** Start No scoring rules style ****/
export const ScroingFullpageData = styled(Box)({
    background: "#fff",
    padding: "1rem",
    "@media screen and (max-width:800px)": {
        padding: "0",
        "&.statusSetting":{
            padding:'1rem'
        }
    },
});
export const NoScoreContent = styled(Box)({
    background: "#fff",
    padding: "20px 0",
    textAlign: "center",
    minHeight: "680px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media screen and (max-width: 1600px)": {
        minHeight: "570px",
    },
});
export const PageHeading = styled(Typography)({
    fontSize: "25px",
    fontWeight: 700,
    color: "#393939",
    "@media screen and (max-width: 1600px)": {
        fontSize: "20px",
    },
});
export const PageDescription = styled(Typography)({
    fontSize: "14px",
    color: "#404040",
    padding: "10px 0 20px",
    "@media screen and (max-width: 1600px)": {
        padding: "7px 0 0",
    },
});
export const NoImage = styled(Image)({
    width: "400px",
    borderRadius: "50%",
    border: "none",
    color: "white",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: 1,
    willChange: "transform",
    transition: "transform 450ms",
    "@media screen and (max-width: 1600px)": {
        width: "350px",
    },
});
/**** End No scoring rules style ****/

/**** Start Create scoring rules style ****/
export const CreateScoreDialog = styled(Box)({
    // padding: "1rem",
    "& .MuiPaper-root": {
        width: "700px",
    },

});
export const CreareHeading = styled(Typography)({
    fontSize: "16px",
    // color: "#000",
    fontWeight: 600,
    "& span": {
        fontWeight: 400,
        fontSize: "14px",
    },
});
export const CreateScoreform = styled(Box)({});
export const CustomActionButon = styled(Box)({
    display: "flex",
    gap: "10px",
    alignItems: "end",
    justifyContent: "end",
    // padding: "10px 0"
});
export const StyledPopover = styled(Popover)({
    "& .MuiPaper-root": {
        width: "500px",
        padding: "14px"
    }
});
/**** End Create scoring rules style ****/


/**** Start SCORING RULE style ****/
export const ScorRuleOuterWrap = styled(Box)({
});
export const ScorRuleInner = styled("div")({
    border: "1px solid #E0E3E7",
    padding: "1rem",
    "& label": {
        color: "#404040",
        fontSize: "14px"
    }
});
export const ScorRuleTopBar = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "0 0 10px",
    "@media screen and (max-width:900px)": {
        display: "block",
    }
});
export const TopLeftcontent = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "center",
    "& .MuiTypography-root": {
        fontSize: "14px",
        color: "#231F20",
        fontWeight: 600,
    }
});
export const Pageheading = styled(Typography)({
    fontSize: "14px",
    color: "#231F20",
    fontWeight: 600,
});
export const LayoutInfo = styled("div")({
    borderRadius: "100px",
    border: "1px solid #D7282F",
    background: "#FFDEDF",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    height: "20px",
    "& .MuiTypography-root": {
        fontSize: "10px",
        color: "#D7282F",
        fontWeight: 700,
    }
});
export const TextAreaBox = styled(Box)({
    // background: "#F9F9F9",
    // border: "1px solid #f3f3f3",
    // borderRadius: "3px",
    // "& fieldset": {
    //     border: "none"
    // },
});
export const InnerContentSection = styled(Box)({
    margin: "15px 0",
    "& .MuiStack-root": {
        border: "1px solid #DDDDDD",
        borderRadius: 10,
        padding: "10px 12px",
        margin: "0 0 16px"
    }
});
export const StackRowItem = styled(Grid)({
    padding: '7px 0',
    display: "flex",
});
export const GridCon = styled(Grid)({
});
export const InnerItem = styled(Grid)({
    display: "flex",
    textAlign: "right",
    gap: "5px",
    "& .MuiStack-root": { display: "none", flexDirection: "row !important", padding: 0, margin: "0", border: "none !important", transition: "opacity 0.5s ease-in-out" },
    "&:hover .MuiStack-root": { display: "flex", },
    "& .MuiTypography-root": {
        fontSize: "14px",
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
            borderBottom: "2px solid #D7282F",
            borderRight: "2px solid #D7282F",
            position: "absolute",
            top: "10px",
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
            padding: "7px",
            "& svg": {
                display: "none",
            },
        },

    },
});
export const LeadFieldValue = styled(Typography)({ color: "#FF5E64" });
export const LeadField = styled(Typography)({ color: "#606060" });
export const AddPoints = styled(Typography)({ color: "#000", textAlign: "right" });
export const StackBox = styled(Box)({
    padding: "1rem 2rem",
    width: "60%",
    "@media screen and (max-width:1300px)": {
        width: "100%",
    },
    "@media screen and (max-width:800px)": {
        padding: "1rem",
    },
});
export const FormValueS = styled(Box)({
    display: "flex",
    gap: 5,
    alignItems: "center",
    "& .MuiInputBase-input": {
        padding: "5px",
        width: "auto"
    },
    "& .MuiTextField-root": {
        width: "30px"
    }
});
export const ConfirmationMsg = styled(Typography)({
    color: "#000",
    fontWeight: 600,
    fontSize: "14px",
    "& span": {
        padding: "0 2rem"
    }
});
export const ConfigureStack = styled(Box)({
    margin: "1rem 0 2rem",
    border: "1px solid #DDDDDD",
    borderRadius: 10,
    padding: "10px 12px",
});
export const GridContainerr = styled(Grid)({
    "@media screen and (max-width: 800px)": {
        gap: "10px "
    },
});
export const LeadFieldStack = styled(Stack)({
});
/**** End SCORING RULE style ****/

/**** Start Add CRITERIA POPUP style ****/
export const NumCircleOuter = styled(Box)({
    position: "relative",
});
export const NumCircle = styled(Box)({
    color: "#231F20",
    fontSize: "14px",
    fontWeight: "600",
    background: "#EFEFEF",
    border: "1px solid #E4E4E4",
    width: "30px",
    height: "30px",
    textAlign: "center",
    display: "grid",
    alignItems: "center",
    borderRadius: "50%",
    margin: "0 0 25px",
});
export const CustolFieldData = styled(Box)({
    margin: "1rem 0",
});

export const MiddleText = styled(Box)({
    background: "#fff",
    position: "absolute",
    margin: "-11px 4px  0",
    "& .MuiTypography-root": {
        color: "#d7282f",
        fontSize: "12px",
        position: "relative",
        zIndex: 1,
        background: "#fff"
    },
    "&::before": {
        content: '""',
        position: "absolute",
        backgroundColor: "#E4E4E4",
        left: "10px",
        width: "1px",
        height: "100%",
        top: "12px",
    },
    "&::after": {
        content: '""',
        position: "absolute",
        backgroundColor: "#E4E4E4",
        left: "10px",
        width: "1px",
        height: "100%",
        bottom: "10px",
    },
});
export const CriteriaFormValue = styled(Box)({
    display: "flex",
    gap: 5,
    alignItems: "center",
    height: "100%",
    padding: "0 0 0 10px",
    "& .MuiInputBase-input": {
        padding: "5px",
        width: "auto"
    },
    "& .MuiTextField-root": {
        width: "30px"
    },
    "& .MuiTypography-root": {
        color: "#222",
        fontSize: "14px"
    },
    "& .MuiRadio-root": {
        paddingRight: "4px",
        "& svg": {
            fontSize: "18px"
        }
    },
    '& .Mui-checked': {
        color: "#d7282f !important"
    }
});
export const LinkText = styled(Link)({
    color: "#0F4B98",
    '& .MuiTypography-root': {
        fontWeight: 600,
        fontSize: "14px"
    }

});
/**** End Add CRITERIA POPUP style ****/

/**** Start List Scoring page styling ****/
export const ScoringListPage = styled('div')({});
export const ScoringListOuter = styled('div')({});
export const SearchScoringBar = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    margin: "1rem 0",
    "& .MuiOutlinedInput-root": {
        paddingRight: "3px"
    }
});
export const TopBarLeft = styled('div')({
    display: "flex",
    gap: "30px"
});
/**** End List Scoring page styling ****/


/**** Start Deactivate Rule popup styling ****/
export const DeactivateRuleBox = styled(Box)({
    padding: "1rem",
    "& h4": {
        color: "#231F20",
        fontSize: "16px",
        fontWeight: 600
    },
    "& .MuiTypography-body1": {
        fontSize: "13px"
    }
});
export const DeactivatePopover = styled(Popover)({
    "& .MuiPaper-root": {
        width: "350px"
    }
});
/**** End Deactivate Rule popup styling ****/
/******========= End Scoring Rules page styling Here ========******/

/****** Start Common style for Edit or Delete icon ******/
export const EditDeleteHover = styled("div")({
    gap: "40px",
    display: "flex",
});
export const EditDeleteAction = styled(Stack)({
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginLeft: "30px",
    "& svg": { fontSize: "16px" },
    "& button": {
        borderRadius: "50%",
        minWidth: "auto",
        padding: "1px"
    }
});
export const IconButtonEdit = styled(Button)({
    "& svg": { color: "#000 !important" },
});
export const IconButtonDelete = styled(Button)({
    "& svg": { color: "#D7282F" },
});
/****** End Common style for Edit or Delete icon ******/
import { Box, Card, FormControl, Link, Popover, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
/******========= Start PipelineManagement styling ========******/
export const PipelineContainer = styled(Box)({
    padding: "10px 20px",
    background: "#fff"
});
export const PipelineTopbar = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media screen and (max-width:1024px)": {
        display: "block",
    },
});
export const PipelineName = styled(Box)({
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-root": {
        color: "#000",
        fontSize: "18px",
        fontWeight: 500,
    },
    "& .MuiInputBase-input": {
        padding: "6px 8px"
    }
});
export const PipelineButtons = styled(Box)({
    display: "flex",
    gap: 10,
    "& .savegreenbtn": {
        background: "#34A400",
        color: "#fff",
        border: "1px solid #34A400",
        "&:hover": {
            background: "#34A400",
            border: "1px solid #34A400",
        }
    }
});
export const PipeLineButtonSection = styled(Box)({
    display: "flex",
    gap: 10,
    alignItems: "center",
    // padding: "7px 8px",
    justifyContent: "end",
    "@media screen and (max-width:899px)": {
        // display: "grid",
        padding: "25px 0 0",
        gap: 10,
        justifyContent: "space-between",
    },
});
export const PipeLineTabRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #D2D2D2",
    "& .MuiBox-root:nth-of-type(-n + 3)": {
        border: "none"
    },
    "@media screen and (max-width:899px)": {
        display: "block",
        borderTop: "1px solid #D2D2D2",
    },
});

export const StyledForm = styled(FormControl)({
    color: "#D7282F",
    fontSize: "12px",
    "& .MuiInputBase-input": { padding: "10px 12px" },
    "& .MuiInputBase-root": {
        padding: 0,
        height: "30px"
    }
});
export const PipelineStage = styled(Box)({
    margin: "15px 0",
    display: "flex",
    "& .scrollgrid": {
        width: "calc(100% - 6px)",
        overflowX: "auto",
        // margin: "0 0 -17px",
        // padding: "0 0 12px",
    },
    "& .pipelinenowrap": {
        flexWrap: "nowrap",
        "@media screen and (max-width:600px)": {
            flexWrap: "wrap-reverse",
        },
    }
});
export const StagesData = styled(Box)({
    display: "flex",
    gap: 14,
    width: "calc(100% - 6px)",
    // overflowX: "scroll",
    "@media screen and (max-width:1200px)": {
        width: "calc(100% - 6px)",
        overflowX: "scroll",
    },
});
export const StagesItems = styled(Box)({
    // width: "25%",
    width: "220px",
    minWidth: "300px",
    background: "#F6F6F6",
    border: "1px solid #EAEAEA",
    borderRadius: "6px",
    padding: 10,
    minHeight: "600px",
    position: "relative",
    transition: "0.1s ease-out",
    "& svg": {
        color: "#4a4a4a",
        fontSize: "18px"
    },
    "@media screen and (max-width:980px)": {
        width: "220px",
    },
    "&:hover": {
        "& .addHover": {
            display: "block"

        }
    }
});
export const AddStagesBox = styled(Box)({
    width: "100%",
    // width: "200px",
    background: "#fff",
    padding: 10,
    minHeight: "500px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    border: "1px solid #EAEAEA",
    borderRadius: 4,
    height: "100%",
    "@media screen and (max-width:600px)": {
        minHeight: "170px",
    },
});
export const PiplineFormControl = styled(FormControl)({
    "& .MuiInputBase-root": {
        border: "1px solid #EAEAEA",
        borderRadius: "3px",
        background: "#fff",
        margin: "22px 0 20px"
    },
    "& .MuiInputBase-root:before, .MuiInputBase-root:after": { display: "none" },
    "& .MuiFormLabel-root": {
        fontSize: "16px",
        color: "#231F20",
    },
});
export const FormDataPipline = styled(Box)({
    padding: "12px 0",
    margin: "12px 0",
    "& .MuiFormControl-root .MuiFormLabel-root": {
        background: "none"
    }
});
export const CheckBoxStack = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "-10px 0 0"
});
export const ErrorOutline = styled(ErrorOutlineOutlinedIcon)({
    position: "absolute",
    right: 0
});
export const TypographyCheck = styled(Typography)({
    fontSize: "12px",
    color: "#231F20"
});
export const DeleteStage = styled("div")({
    position: "absolute",
    bottom: 0,
    width: "94%",
    background: "#F9FAFB",
    borderTop: "1px solid #DEDEDE",
    // padding: "9px 0 6px",
    color: "#4A4A4A",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: 10,
    "& a": {
        color: "#4A4A4A",
        display: "flex",
        gap: 5,
    },
    "& button": {
        textTransform: "capitalize",
        color: "#4A4A4A",
    }
});
export const PopoverStages = styled(Box)({
    width: "100%",
    padding: 10,
    maxHeight: 200,
    overflow: "auto",

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

});

export const LinkAddicon = styled(Link)({
    position: "absolute",
    right: -7,
    top: -10,
    "& svg": {
        color: "#959595",
        fontSize: "30px"
    }
});
export const StagesHeading = styled(Typography)({
    fontSize: "20",
    fontWeight: '700',
    color: "#4472C4",
    display: "flex",
    gap: 10,
    alignItems: "center",
});
export const AddPipelineDiv = styled(Box)({
    border: "1px solid #EAEAEA",
    borderRadius: "6px",
    background: "#fff",
    textAlign: "center",
    padding: "1px 0",
    display: "none",
    margin: "8px 0 0",
    "& svg": {
        fontSize: "22px !important",
        margin: "5px 0 0",
        cursor: "pointer"
    }
});
export const SectionTopHeading = styled(Typography)({
    fontSize: "16px",
    fontWeight: '600',
    color: "#34A400",
    background: "#F9FFF8",
    border: "1px solid #DDF5D9",
    borderRadius: 2,
    padding: "2px 5px",
    display: "flex",
    gap: 10,
    alignItems: "center",
});
export const SectionTopHeading2 = styled(Typography)({
    fontSize: "20",
    fontWeight: '700',
    color: "#000",
    display: "flex",
    gap: 10,
    alignItems: "center",
    "& svg": {
        color: "#34A400"
    }
});
export const AddNewStageData = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    "& h5": {
        color: "#231F20",
        fontSize: "25px",
        fontWeight: '600',
        "@media screen and (max-width:1500px)": {
            fontSize: "20px",
        },
    },
    "& p": {
        color: "#4A4A4A",
        fontSize: "14px",
        margin: "0 0px 12px",
        "@media screen and (max-width:1500px)": {
            fontSize: "12px",
        },
    },
    "& button": {
        color: "#D7282F",
        fontSize: "12px",
        border: "1px solid #D7282F",
        borderRadius: 4,
        textTransform: "capitalize", padding: "4px 7px",
        "& svg": {
            color: "#D7282F",
        }
    },
    "& button:hover": {
        color: "#fff",
        background: "#D7282F",
        border: "1px solid #D7282F",
        "& svg": {
            color: "#fff",
        }
    },
    "@media screen and (max-width:600px)": {
        width: "100%",
    },
});
// export const StyledDialog = styled(Dialog)({
//     "& .MuiPaper-root": {
//         width: "550px",
//         borderRadius: "10px"
//     },
//     '& .MuiDialogContent-root': {
//         padding: "0",
//     },
//     '& .MuiDialogActions-root': {
//         padding: "10px",
//         background: "#FFF7F7"
//     },
//     ' & .MuiDialogTitle-root': {
//         background: "#FFE5E7",
//         fontSize: "16px",
//         "@media screen and (max-width:1024px)": {
//             fontSize: "13px",
//             padding: "10px"
//         },
//     },
// });
export const TextInfo = styled('div')({
    textAlign: "center",
    padding: "22px 0",
    "& p": {
        color: "#4A4A4A",
        fontSize: "14px",
    },
    "& h6": {
        color: "#231F20",
        fontSize: "14px",
        fontWeight: 600
    }
});
export const RadioButtonBox = styled(Box)({
    padding: "0 20px 10px",
    "& .MuiTypography-root": {
        fontSize: "12px",
        color: "#000"
    },
    "& .MuiFormLabel-root": {
        color: "#231F20",
        fontSize: "14px",
        fontWeight: 600
    },
    "& svg": {
        width: "20px",
    },
    "& .Mui-checked": {
        color: "#d7282f !important"
    }
});
export const SelectStage = styled(Box)({
    display: "flex",
    gap: 10
});
export const Count = styled("span")({
    "& .MuiTypography-root": {
        fontSize: "12px",
        color: "#000",
        fontWeight: 600
    },
    background: "#DBDBDB",
    borderRadius: "50px",
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export const ListPipeViewOuter = styled(Box)({
    margin: "1rem 0 0",
    maxHeight: "600px",
    overflowY: "auto",
});
export const ListPipeBox = styled(Box)({
    border: "1px solid #EAEAEA",
    borderRadius: "50px",
    padding: "5px 12px",
    background: "#fff",
    transition: "0.1s ease-out",
    margin: "0 0 9px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "17px",
    "& svg": {
        color: "#959595",
        fontSize: "18px"
    },
    "& .listbox": {
        display: "none"
    },
    "&:hover": {
        background: "#FFE3E3",
        borderColor: "#FFD9D9",
        "& .listbox": {
            display: "flex",
            alignItems: "center",
            gap: 5,
            "& .thumbup": {
                margin: "-3px 0 0"
            },
            "& .thumbdown": {
                margin: "3px 0 0"
            },
            "& img, svg": {
                // transition: "all .2s ease-in-out",
                transition: "all ease .5s",

                "&:hover": {
                    // transform: "scale(1.1)",
                }
            }
        }
    },
    "& .MuiTypography-root": {
        fontSize: "14px",
        color: "#231F20",
    },
});
export const PopoverPipeline = styled(Popover)({
    "& .MuiPaper-root": {
        background: "#F6F6F6",
        border: "1px solid #EAEAEA",
        borderRadius: "6px",
        padding: 10,
        boxShadow: "none",
        width: "280px !important"
    },

});
export const AddStagesHere = styled("div")({
    width: "94%",
    borderTop: "1px solid #DEDEDE",
    padding: "8px 10px 0",
    color: "#4A4A4A",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 5,
    "& a": {
        color: "#4A4A4A",
        display: "flex",
        gap: 5
    },
    "& svg": {
        color: "#959595",
        fontSize: "18px"
    },
});
export const ViewPageStagesItems = styled(Box)({});
export const ViewPageStagesItemsInner = styled(Box)({
    width: "220px",
    minWidth: "300px",
    background: "#F6F6F6",
    border: "1px solid #EAEAEA",
    borderRadius: "6px",
    padding: 10,
    height: "auto",
    // minHeight: "250px",
    position: "relative",
    "& svg": {
        color: "#959595",
        fontSize: "18px"
    },
    "@media screen and (max-width:980px)": {
        width: "220px",
    },
    "& .deletestagespace": {
        position: "relative",
        padding: "8px 8px 0px",
        background: "transparent",
        "& button": {
            padding: 0,
            fontWeight: 600,
            "&:hover": {
                background: "transparent"
            }
        }
    }
});
export const ViewHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between"
});

/******================= Create Pipeline Popup styling here ================= *******/
export const CreatPipeLineForm = styled(Box)({});
export const PipelineLabel = styled(Box)({
});

////// New data Need to add in CRM V1 also PIPELINE ////
export const DealCardLayout = styled("div")({
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
export const DealLeadNameValue = styled(Typography)({
    color: "#231F20",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "capitalize",
    cursor: "pointer",
    "@media screen and (max-width: 1600px)": {
        fontSize: "14px",
    },
});
export const DealOwner = styled(Typography)({
    color: "#231F20",
    fontSize: "12px",
    padding: "3px 0 9px",
    textTransform: "capitalize",
    "& i": {
        margin: "0 5px 0px 0",
        "&::before": {
            color: "#34A400"
        }
    }

});

export const DealCardStyle = styled(Card)({
    background: "#fff",
    border: "1px solid #EBEBEB",
    borderRadius: 2,
});
export const DealCardInfo = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    "&.MuiCheckbox-root": {
        padding: "0 !important",
    },
});
export const DealCardTypeValue = styled(Typography)({
    color: "#4A4A4A",
    fontSize: "12px",
    fontWeight: 700,
});
export const DealPriceValue: any = styled(Typography)({
    color: "#4A4A4A",
    fontSize: "12px",
    fontWeight: 600,
});
export const DealPriceBoxV = styled(Box)({
    display: "flex",
});

export const DealnnualRevenue = styled(Box)({
    display: "flex",
    justifyContent: "space-evenly",
});
export const DealRevenueStack = styled(Stack)({
    position: "relative",
    height: "100%",
    "& .MuiTypography-root": {
        color: "#4A4A4A",
        fontSize: "12px",
    },
    "& svg": {
        fontSize: "18px",
    },
});
export const DealRevenueStack2 = styled(Stack)({
    position: "relative",
    justifyContent: "end",
    "& .MuiTypography-root": {
        color: "#4A4A4A",
        fontSize: "12px",
    },
    "& .ccalender": {
        fontSize: "14px !important",
    },
    "& svg": {
        fontSize: "18px",
    },
});

export const DealComanyIcon: any = styled("div")(({ value }: any) => ({
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
    "& i::before": {
        fontSize: "15px",
        color: "#34A400"
    },
    "& .icon-contact::before": {
        fontSize: "11px",
    }
}));
export const DealAnnualRevenue = styled(Box)({
    display: "flex",
    justifyContent: "space-evenly",
    margin: "6px 0 0"
});
export const DealCardMail: any = styled(Typography)(({ text }: any) => ({
    color: text ? text : "#4A4A4A",
    fontSize: 12,
}));
export const DealCompanyInfo: any = styled(Box)(({ value }: any) => ({
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
export const DealEmailStack = styled(Stack)({
    padding: "4px 0",
    "& svg": {
        fontSize: "14px",
    },
});

export const AddIcon = styled(AddCircleOutlinedIcon)({
    color: "#34A400 !important",
    fontSize: "25px !important",
    "@media screen and (max-width: 1600px)": {
        fontSize: "19px !important",
        margin: '4px 0 0 0'
    },
});















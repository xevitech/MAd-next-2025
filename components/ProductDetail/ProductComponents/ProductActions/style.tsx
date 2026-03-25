import { Box, Button, List, Stack, Typography, styled } from "@mui/material";

/************************* Browsing History ************************/
export const FlyoutOuterContainer = styled(Box)({
    borderRadius: "6px",
    background: "#fff",
    position: "absolute",
    bottom: 0,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
});
export const FlyoutInnerWrapper = styled(Box)({
    border: "1px solid #D8D8D8",
    borderRadius: "6px",
    margin: "5px",
    padding: "6px",
    "& .MuiTypography-h1": {
        fontSize: "15px",
        fontWeight: 600,
    }
});
export const TopTitleArea = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    "& svg": {
        cursor: "pointer",
        color: "#d7282f",
        fontSize: "18px"
    },


});
export const SelectAndClearRow = styled(Box)({
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    padding: "8px 0",
    margin: "8px 0",
    ".MuiCheckbox-root": {
        "&:before": {
            content: '" "',
            display: "block",
            width: "14px",
            height: "14px",
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
            top: "11px",
            opacity: "0",
        },
        "&:hover": {
            "&:before": {
                borderColor: "#b1b0b0",
            },
        },
        "& .MuiSvgIcon-root": {
            display: "none",
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
    "& .MuiFormControlLabel-label": {
        fontSize: "14px"
    }
});
export const RedFillButton = styled(Button)({
    background: "#d7282f",
    boxShadow: "none",
    height: "25px",
    textTransform: "capitalize",
    "&:hover": {
        background: "#d7282f",
        boxShadow: "none",
    }
});
export const BrowsingProductList = styled(Box)({
    padding: "12px 0",
    maxHeight: "400px",
    overflowY: "scroll",
    paddingRight: "10px",
    "@media (max-width:1300px)": {
        maxHeight: "270px",
    },
    ".MuiCheckbox-root": {
        "&:before": {
            content: '" "',
            display: "block",
            width: "16px",
            height: "16px",
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
            top: "3px",
            opacity: "0",
        },
        "&:hover": {
            "&:before": {
                borderColor: "#b1b0b0",
            },
        },
        "& .MuiSvgIcon-root": {
            display: "none",
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
export const BProductInfo = styled(Box)({
    display: "flex",
    gap: "5px",
    alignItems: "flex-start",
    ".MuiCheckbox-root": {
        padding: "0 4px 0 0",
    },
    "& .MuiFormControlLabel-root": {
        margin: 0
    }
});
export const BProductInfoInner = styled(Box)({
    display: "flex",
    gap: "10px",
    alignItems: "flex-start"
});

export const BProductInfoImage = styled(Box)({
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "6px",
    width: "140px",
    height: "55px",
    position: "relative",

    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    }
});
export const BProductContent = styled(Box)({
});

export const BProductName = styled(Typography)({
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    display: "-webkit-box",
    cursor: "pointer",
    wordBreak: "break-all",
    color: "#231F20",
    fontSize: "12px",
    margin: "0 0 3px"
});
export const BProductPrice = styled(Typography)({
    color: "#d7282f",
    fontWeight: 600,
    fontSize: "13px"
});
export const BItemQuantity = styled("span")({
    color: "#4A4A4A",
    fontSize: "11px",
    padding: "0 2px"
});
export const BottomButton = styled("div")({
    textAlign: "center",
    borderTop: "1px solid #ddd",
    padding: "10px 0 5px "
});

/***** Start Contact Supplier Styling for Product Flyout *****/
export const ContactSupplierProductType = styled(Box)({
    background: "#F4F6FA",
    padding: "6px 10px",
    margin: "2px 0 0",
    "& .MuiTypography-root": {
        fontSize: "13px",
        fontWeight: "600",
    },
    span: {
        borderRadius: "4px",
        padding: "0px 8px",
        backgroundColor: "#fff",
        margin: "0 4px",
    },
    "& .by-orderp": {
        border: "1px solid #D7282F",
        color: "#D7282F",
    },
    "& .in-stockp": {
        border: "1px solid #34A853",
        color: "#34A853",
    },
});

export const ContactSupplierProductTypeInn = styled(Box)({
    background: "#fff",
    padding: "10px",
    margin: "10px 0 0",
    borderRadius: "4px",
    "@media screen and (max-width:900px)": {
        padding: "3px",
    },
    "& svg": {
        fontSize: "16px"
    },
});
export const CSPriceQuoteColumn = styled(Box)({});
export const CSPriceQuoteInfo = styled(Box)({
    border: "1px solid #dadada",
    padding: "3px 20px",
    margin: "0 4px 4px 0",
    borderRadius: "5px",
    textAlign: "center",
    "& .MuiTypography-h5": {
        fontSize: "13px",
        color: "#D82E34",
        fontWeight: 700,
        "@media screen and (max-width:900px)": {
            fontSize: "12px",
        },
    },
    "& .MuiTypography-body1": {
        fontSize: "11px",
        color: "#4A4A4A",
    },
});
export const CSPriceTermVlue = styled(Box)({
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    paddingLeft: "0px",
    paddingRight: "16px",
    position: "relative",
    "& .MuiSvgIcon-root": {
        fontSize: "15px",
        color: "#0AA133",
        margin: "0 0 0 6px"
    },
    "@media (max-width:599px)": {
        right: "0",
        backgroundColor: "#f3f3f3",
        borderColor: "#e3e3e3",
    },
});
export const CSFQuantitySection = styled(Box)({
    padding: "1rem 0 0"
});
export const CSFLableValue = styled(Box)(() => ({
    "@media (max-width:1030px)": {
        minHeight: "90px",
    },
    "@media (max-width:900px)": {
        minHeight: "auto",
    },

    "& .MuiTypography-h3": {
        fontSize: "14px",
        color: "#000000",
        fontWeight: "600",
        marginBottom: "6px",
    },
    "& .MuiTypography-body1": {
        fontSize: "11px",
        color: "#000000",
        "& span": {
            fontWeight: "600",
            color: "#d7282f"
        },
    },
}));

export const CSFLableValueTop = styled(Box)(() => ({
    minHeight: "84px",
    "@media (max-width:1030px)": {
        minHeight: "90px",
    },
    "@media (max-width:900px)": {
        minHeight: "auto",
    },

    "& .MuiTypography-h3": {
        fontSize: "14px",
        color: "#000000",
        fontWeight: "600",
        marginBottom: "6px",
    },
    "& .MuiTypography-body1": {
        fontSize: "11px",
        color: "#000000",
        "& span": {
            fontWeight: "700",
        },
    },
}));
export const EnterQuantityRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
    "& .MuiFormLabel-root": {
        fontSize: "12px"
    },
    "& .MuiOutlinedInput-input": {
        fontSize: "12px"
    }
});
export const QuantityValue = styled(Box)({
    fontSize: "14px",
    color: "#D7282F",
    marginLeft: "10px",
    fontWeight: "600",
    "& span": {
        fontSize: "14px",
        color: "#474747",
        fontWeight: "600",
    },
});
export const ContactFlyoutOuter = styled(Box)({
    padding: "10px",
    // margin: "10px",
    background: "#fff",
    position: "absolute",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    bottom: 0,
    ".MuiCheckbox-root": {
        "&:before": {
            content: '" "',
            display: "block",
            width: "16px",
            height: "16px",
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
            top: "6px",
            opacity: "0",
        },
        "&:hover": {
            "&:before": {
                borderColor: "#b1b0b0",
            },
        },
        "& .MuiSvgIcon-root": {
            display: "none",
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
});
export const ContactFlyoutHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 0 10px",
    "& .MuiTypography-h5": {
        fontSize: "18px",
        fontWeight: 600,
    },
    "& svg": {
        cursor: "pointer",
        fontSize: "18px",
        "&:hover": {
            color: "#d7282f"
        }
    }
});
export const ContactFlyoutBorder = styled(Box)({
    border: "1px solid #ddd",
    padding: "8px"
});

export const AreaForCheckbox = styled(Box)({
    padding: "5px 0 0 12px",
    "& .MuiCheckbox-root": {
        padding: "3px 8px 0 1px"
    },
    "& .MuiTypography-body1": {
        fontSize: "11px"
    },
    "& .MuiFormControlLabel-root": {
        paddingBottom: "10px",
        alignItems: "flex-start",
        marginRight: "0"
    }
});
export const BottomSection = styled(Box)({
    textAlign: "right",
    "& button": {
        background: "#fff",
        boxShadow: "none",
        height: "25px",
        textTransform: "capitalize",
        border: "1px solid #d7282f",
        color: "#d7282f",
        "&:hover": {
            background: "#d7282f",
            boxShadow: "none",
            color: "#fff",
        }
    }
});

export const CPAddAttachmnt = styled(Box)({
    "& .MuiButton-root": {
        textTransform: "capitalize",
        color: "#d7282f",
        fontSize: "12px",
        paddingTop: "4px",
        paddingBottom: 0,
        "&:hover": {
            background: "rgba(225, 40, 47, 0.04)"
        }
    },
    "& i": {
        fontSize: "14px !important"
    },
    "& .MuiButton-startIcon": {
        marginRight: "3px",
    }
});
/***** Ending Contact Supplier Styling for Product Flyout *****/
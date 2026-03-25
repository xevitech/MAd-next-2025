import { Box, styled } from "@mui/material";

export const PatentLblBox = styled(Box)(() => ({
    display: "flex",
    gap: "8px",
    height: "28px",
    border: "1px solid #C5C5C5",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "24px",
    letterSpacing: "0.09px",
    color: "#444444",
    borderRadius: "4px",
    paddingLeft: "5px",
    paddingRight: "5px",
    overflow: "hidden",
    marginRight: '6px',
    alignItems: 'center',
    '& .downloadIcon': {
        padding: '0',
        border: '0',
        '& .MuiSvgIcon-root': {
            fontSize: '20px',
        },
        '&:hover': {
            '& .MuiSvgIcon-root': {
                color: '#d7282f',
            },
        },
    },
    '& a': {
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            fontSize: '16px',
        },
        '&:hover': {
            '& .MuiSvgIcon-root': {
                color: '#d7282f',
            },
        },
    },
}));

export const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export const ComFPatentLblBox = styled(Box)(() => ({
    display: "flex",
    gap: "8px",
    height: "28px",
    border: "1px solid #C5C5C5",
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: "24px",
    letterSpacing: "0.09px",
    color: "#444444",
    borderRadius: "4px",
    paddingLeft: "5px",
    paddingRight: "5px",
    overflow: "hidden",
    // marginRight: '6px',
    alignItems: 'center',
    margin:"0 6px 3px 0",
    '& .downloadIcon': {
        padding: '0',
        border: '0',
        minWidth:"auto",
        '& .MuiSvgIcon-root': {
            fontSize: '20px',
        },
        '&:hover': {
            '& .MuiSvgIcon-root': {
                color: '#d7282f',
            },
        },
    },
    '& a': {
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            fontSize: '16px',
        },
        '&:hover': {
            '& .MuiSvgIcon-root': {
                color: '#d7282f',
            },
        },
    },
    "& svg":{
        color:"#444444",
        fontSize:"16px !important"
    }
}));
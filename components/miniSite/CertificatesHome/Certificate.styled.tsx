import { Box, Typography, ButtonBase } from "@mui/material";
import { styled } from '@mui/system'

export const CertificateOuter: any = styled(Box)(({ theme, bg, bord, bshadow }: any) => ({
    background: bg ? bg : "white",
    border: bord ? "2px solid #CDCDCD" : null,
    borderRadius: "6px",
    boxShadow: bshadow ? bshadow : null,
    minHeight: '253px',
    "@media screen and (max-width:600px)": {
        minHeight: '414px',
        marginRight: 0,
    },
}))
export const Text11 = styled(Typography)(({ theme, fw, fs, txtColour }: any) => ({
    fontSize: fs ? fs : "11px",
    fontWeight: fw ? fw : 400,
    color: txtColour ? txtColour : "rgba(35, 31, 32, 1)",
    [theme.breakpoints.down('sm')]: {
        fontSize: "10px"
    }
}))
export const Text14 = styled(Typography)(({ theme, fw, fs, txtColour }: any) => ({
    fontSize: fs ? fs : "14px",
    fontWeight: fw ? fw : 400,
    color: txtColour ? txtColour : "rgba(35, 31, 32, 1)",
    [theme.breakpoints.down('sm')]: {
        fontSize: "13px"
    }
}))
export const Text13 = styled(Typography)(({ theme, fw, fs, txtColour }: any) => ({
    fontSize: fs ? fs : "13px",
    fontWeight: fw ? fw : 400,
    color: txtColour ? txtColour : "rgba(35, 31, 32, 1)",
    [theme.breakpoints.down('sm')]: {
        fontSize: "13px"
    },
    wordBreak: 'break-word'
}))
export const ViewMoreButton: any = styled(ButtonBase)(({ theme, expand }: any) => ({
    border: expand ? "1px solid rgba(35, 31, 32, 1)" : "1px solid rgba(215, 40, 47, 1)",
    color: expand ? "white" : "rgba(215, 40, 47, 1)",
    background: expand ? "rgba(35, 31, 32, 1)" : "white",
    borderRadius: "4px",
    padding: "2px 8px",
    fontSize: "12px",
    fontWeight: 600,
    fontFamily: "open sans",
    '& svg': {
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }
}))
export const Certificatebutton = styled(ButtonBase)(({ theme, bg, heighlight }: any) => ({
    fontFamily: "open sans",
    fontSize: "12px",
    fontWeight: 600,
    background: bg ? bg : "rgba(215, 40, 47, 1)",
    color: "white",
    borderRadius: "4px",
    padding: "8px 12px",
    '& :hover': {
        background: heighlight ? heighlight : "rgba(35, 31, 32, 1)",
    },
    '& :active': {
        background: heighlight ? heighlight : "rgba(35, 31, 32, 1)",
    },
    "@media screen and (max-width:280px)": {
        display: 'none'
    }
}))
export const CertificateSliderButton: any = styled(ButtonBase)(({ theme, right, top }: any) => ({
    position: "absolute",
    top: top ? top : "50%",
    left: !right ? "5px" : null,
    right: right ? "5px" : null,
    zIndex: 9,
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "100px",
    transform: 'translate(0 , -50%)',

}))


export const FixedSidebarBox = styled(Box)(({ theme, fix }: any) => ({
    position: fix ? "fixed" : "static",
    top: "0"
}))
export const ExpandCol = styled(Box)(({ theme, fix }: any) => ({
    display: 'flex',
    justifyContent: 'center',
    borderTop: '1px solid #e1e1e1',
    paddingTop: '12px',
    marginTop: '0',
    '& .MuiButton-text': {
        border: '1px solid #d2d2d2',
        borderRadius: '4px',
        marginLeft: '10px',
        background: 'white',
        '&:hover': {
            borderColor: '#afafaf',
        },
        '& .MuiSvgIcon-root': {
            position: 'relative',
            right: '-4px',
        },
    },
}))

export const SliderBtnCol = styled(Box)(({ theme }: any) => ({
    position: 'relative',
}))
export const RequestTextarea = styled(Box)(({ theme }: any) => ({
    position: 'relative',
    '& .RequestTextField': {
        '& .MuiInputBase-root': {
            paddingRight: '240px',
            "@media (max-width: 600px)": {
                padding: '16.5px 14px 116px',
            },
            '& textarea': {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },

                "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                },

                "&::-webkit-scrollbar-thumb": {
                    background: "#d2d2d2",
                    borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#6d6d6d !important",
                },
            },
        },
    },
}))
export const CertificateThumb = styled(Box)(({ theme }: any) => ({
    height: "150px",
    "@media screen and (max-width:320px)": {
        height: "167px",
    },
    '& img': {
        maxWidth: '100%',
        height: "100%",
        width: "100%",
        objectFit: "contain"
    },
}))

export const ViewBtn = styled(Box)(({ theme }: any) => ({
    '& .MuiButtonBase-root': {
        background: 'rgba(215, 40, 47, 1)',
        padding: '8px 12px',
        color: 'white',
        borderRadius: '4px',
        transition: 'all ease .5s',
        '&:hover': {
            background: 'rgba(35, 31, 32, 1)',
        },
        '&:active': {
            background: 'rgba(35, 31, 32, 1)',
        },
        "@media screen and (max-width:899px)": {
            minWidth: "120px",
        },
        "@media screen and (max-width:767px)": {
            display: 'none'
        }
    },
}))
export const CertificateDetail = styled(Box)(({ theme }: any) => ({
    '& .MuiBox-root': {
        '& .MuiTypography-body1': {
            fontSize: '13px',
            fontWeight: '600',
        },
    },
    '& .FontWeight400': {
        '& .MuiTypography-root': {
            fontWeight: '400 ',
        },
    },
    '& .viewLink': {
        fontSize: '13px',
        color: '#d7282f',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    "& .certificateStack": {
        "@media screen and (max-width:767px)": {
            display: 'block'
        }
    }
}))


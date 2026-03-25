import { Box, Typography, TextField, Grid } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import { styled } from '@mui/system';

export const CompanyProfileOuter: any = styled(Box)(({ theme, bs }: any) => ({
    background: "white",
    borderRadius: "6px",
    height: '99%',
    position: "relative",
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '10px',
    },
}))

export const CompanyProfileInner: any = styled(Box)(({ theme, bs }: any) => ({
}))

export const CPCustomeChip = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(215, 40, 47, 0.12)",
    border: `1px solid rgba(215, 40, 47, 1)`,
    width: "35px",
    height: "35px",
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    '& i:before': {
        color:"#d7282f"
     },
     '& i span:before': {
        color:"#d7282f !important"
     },
    [theme.breakpoints.down('md')]: {
        width: "30px",
        height: "30px",
        '& img': {
            width: "16px",
            height: "16px"
        }
    },
}))
export const CPtext: any = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    fontFamily: "open sans",
    fontSize: sz ? sz : "14px",
    fontWeight: wt ? wt : 400,
    color: txtColour ? txtColour : "#929292",
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
        fontSize: '18px',
        marginRight: '6px',
        color: '#d7282f',
    },

    [theme.breakpoints.down('md')]: {
        fontSize: "13px"
    },
}))
export const CPtextHeadings: any = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    fontFamily: "open sans",
    fontSize: sz ? sz : "16px",
    fontWeight: wt ? wt : 700,
    color: txtColour ? txtColour : "rgba(35, 31, 32, 1)",
    [theme.breakpoints.down('md')]: {
        fontSize: "16px"
    }

}))
export const CPlable: any = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    fontFamily: "open sans",
    fontSize: sz ? sz : "14px",
    fontWeight: wt ? wt : 400,
    color: txtColour ? txtColour : "rgba(34, 51, 84, .5)",
    [theme.breakpoints.down('md')]: {
        fontSize: "12px"
    }
}))
export const CPlableNews: any = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 3,
    overflow: "hidden",
    fontFamily: "open sans",
    fontSize: sz ? sz : "14px",
    fontWeight: wt ? wt : 400,
    color: txtColour ? txtColour : "rgba(34, 51, 84, .5)",
    [theme.breakpoints.down('md')]: {
        fontSize: "12px"
    }
}))
export const ServiceTitle = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    fontFamily: "open sans",
    fontSize: sz ? sz : "13px",
    fontWeight: wt ? wt : 600,
    color: txtColour ? txtColour : "#231f20",
    textAlign: 'center',

}))
export const NewsroomGridTitle = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    fontFamily: "open sans",
    fontSize: sz ? sz : "24px",
    fontWeight: wt ? wt : 600,
    color: txtColour ? txtColour : "#ffffff",
    "@media (max-width:600px)": {
        fontSize: '18px',
    },
}))
export const NewsroomGridsubTitle = styled(Typography)(({ theme, txtColour, sz, wt }: any) => ({
    fontFamily: "open sans",
    fontSize: sz ? sz : "14px",
    fontWeight: wt ? wt : 500,
    color: txtColour ? txtColour : "#ffffff",
    "@media (max-width:1500px)": {
        fontSize: '13px',
        fontWeight: 'normal',
    },
}))
export const NewRoomImage = styled("img")(({ theme, txtColour, sz, wt }: any) => ({
    height: '507px',
    width: '100%',
    objectFit: 'cover',
    transition: 'all ease .5s',

    [theme.breakpoints.down('sm')]: {
        height: "265px",
        width: "100%",
        objectFit: 'cover',
    }
}))
export const OutlinedImageBox = styled(Box)(({ theme }) => ({
    borderRadius: "6px",
    position: "relative",
    border: "2px solid #CDCDCD",
    background: "white",
    padding: "8px",
    '& img': {
        borderRadius: "6px",
        width: "100%"
    },
    [theme.breakpoints.down('md')]: {
        textAlign: "center",
        '& img': {
            maxWidth: "100%",
            width: "auto"
        },
    }
}))

export const CPTextInput: any = styled(TextField)(({ theme, wid }: any) => ({
    marginTop: '14px',
    width: wid ? wid : "48%",
    "@media screen and (max-width:600px)": {
        width: '100%'
    },

    '& .MuiInputBase-input': {
        fontSize: "14px",
        color: "#231F20",
        fontFamily: "open sans",
        fontWeight: 400,
    },
    '& .css-1ptx2yq-MuiInputBase-root-MuiInput-root::before': {
        borderBottom: "1px solid rgba(34, 51, 84, .1)"
    },
    '& .MuiInputBase-root.MuiInput-root:after': {
        display: 'none',
    },
    [theme.breakpoints.down('md')]: {
        '& .MuiInputBase-input': {
            fontSize: "13px",
        },
    }
}))

export const CPTextViewBox: any = styled(Box)(({ theme, wid }: any) => ({
    width: wid ? wid : "48%",
    "@media screen and (max-width:600px)": {
        width: '100%'
    },
    borderBottom: "1px solid rgba(34, 51, 84, .1)",
    '& p': {
        fontSize: "13px",
        color: "#231F20",
        fontFamily: "open sans",
        fontWeight: 400,
        wordBreak: "break-word"
    },
    '& label': {
        fontSize: "14px",
        color: "rgba(34, 51, 84, 0.5)",
        fontFamily: "open sans",
        fontWeight: 400,
    },
    "@media screen and (max-width:280px)": {
        width: '100%'
    },
    "& a": {
        fontSize: "13px",
    },
    "& a:hover": {
        color: "#d7282f",
    }
}))



export const CPTextViewBoxCP: any = styled(Box)(({ theme, wid }: any) => ({
    height: "100%",
    borderBottom: "1px solid rgba(34, 51, 84, .1)",
    "& .MuiTypography-root": {
        lineHeight: "18px"
    },
    '& p': {
        fontSize: "13px",
        color: "#231F20",
        fontFamily: "open sans",
        fontWeight: 400,
        wordBreak: "break-word",
        lineHeight: "normal"
    },
    '& label': {
        fontSize: "14px",
        color: "rgba(34, 51, 84, 0.5)",
        fontFamily: "open sans",
        fontWeight: 400,
    },
    "@media screen and (max-width:280px)": {
        width: '100%'
    },
    "& a": {
        fontSize: "13px",
        lineHeight: "normal"
    },
    "& a:hover": {
        color: "#d7282f",
    }
}))

export const CPsurface: any = styled(Box)(({ theme, bg }: any) => ({
    boxShadow: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
    borderRadius: "6px",
    background: bg ? bg : "#FFF5F6",
    height: "100%"
}))
export const GridImageItem = styled(Grid)(({ theme }: any) => ({
    overflow: "hidden",
    borderRadius: "6px",
    backgroundImage: "url(/assets/gridbg.png)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative"

}))

export const useStyles = makeStyles()((theme) => {
    return {
        RegionalBox: {
            '& .MuiCollapse-vertical': {
                height: '100%',
            },
        },
    }
})
export const ImageThumbBox = styled(Box)(({ theme }) => ({
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    '& img': {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
    }
}))

export const SingleSlideImage = styled(Box)(({ theme }) => ({
    height: "180px",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }
}))
export const SingleSlideBoxx = styled(Box)(({ theme }) => ({
    width: "25%"
}))






export const NewsThumbImg = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    '& img': {
        width: '120px',
        height: '84px',
        objectFit: 'cover',
        borderRadius: "4px"
    }
}))
export const ModalImg = styled(Box)(({ theme }) => ({
    '& img': {
        width: '560px',
        height: '450px',
        objectFit: 'contain',
    }
}))
export const CarousalImage = styled(Box)(({ theme }) => ({
    '& img': {
        width: '100%',
        height: '320px',
        objectFit: 'contain',
        "@media screen and (max-width:1280px)": {
            height: '380px'
        },
        "@media screen and (max-width:480px)": {
            height: '200px'
        },
        
    }
}))
export const NewsRooms = styled(Box)(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    borderRadius: '6px',
    transition: 'all ease .5s',
    padding: "5px 10px",
    '&:hover': {
        backgroundColor: '#f3f3f3',
    },
    "& .newroomrightdetail": {
        fontSize: "13px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: "0",
        textTransform: "capitalize",
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '3',
        display: '-webkit-box',
        "@media screen and (max-width:1500px)": {
            fontSize: "12px"
        },
        "& .newroomrighttitle": {
            fontSize: "16px"
        }
    }
}))
export const Linkhover = styled(Box)(({ theme }) => ({
    '& .CategoryOpt': {
        fontSize: '14px',
        cursor: 'pointer',
        color: "#1976d2",
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}))
export const CompanyInfoBusinetesstype = styled('span')(() => ({
    fontSize: '14px'
}))

export const NewsLargeImg = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    width: "100%",
    height: "500px",
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        borderRadius: "4px"
    },
    "& .lazy-load-image-background": {
        width: "100% !important",
        height: "100% !important"
    }
}))

export const FaqFullBox = styled(Box)(() => ({
    margin: "0 0 1rem"
}))

export const SlickSliderComponent = styled(Box)({
    "& .qqq": {
        "& .MuiButtonBase-root": {
            display: "none !important",
        },
    },
    "& .qqq:hover": {
        "& .MuiButtonBase-root": {
            display: "block !important",
        }
    }
});


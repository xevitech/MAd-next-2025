import { Box, ButtonBase, Typography, styled } from "@mui/material";

export const BannerBox = styled(Box)({
});

export const Bgimage = styled(Box)(() => ({
    backgroundImage: `url('/assets/banners/sectorbanner.png')`,
    height: "48vh",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    position: "relative",
    width: "100%",
    "&:before": {
        content: '" "',
        width: "100%",
        height: "100%",
        background: 'linear-gradient(95.26deg, #041620 7.32%, rgba(1, 14, 20, 0.4) 99.4%)',
        position: "absolute",
    },
}));
export const BannerTxt = styled(Box)(() => ({
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
}));
export const Textoverimg1 = styled(Typography)(() => ({
    fontSize: "50px  ",
    fontWeight: "700",
    color: "#d7282f",
    "@media only screen and (max-width: 900px)": {
        fontSize: "30px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "20px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "18px",
    },
}));
export const Spantext = styled('span')(() => ({
    fontSize: "50px  ",
    fontWeight: "700",
    color: "#fff",
    "@media only screen and (max-width: 900px)": {
        fontSize: "30px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "20px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "18px",
    },
}));
export const Textoverimg2 = styled(Typography)(() => ({
    margin: '8px 0 0 0',
    fontSize: "30px",
    fontWeight: "600",
    color: "#FFFFFF",
    "@media only screen and (max-width: 900px)": {
        fontSize: "24px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "18px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "16px",
    },
}));
export const Textoverimg3Box = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 0 0 0',
}));
export const Textoverimg3 = styled(Typography)(() => ({
    fontSize: "18px  ",
    fontWeight: "400",
    color: "#FFFFFF",
    width: '60%',
    "@media only screen and (max-width: 900px)": {
        fontSize: "16px",
        width: '100%',
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "14px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "12px",
    },
}));
export const Textoverimg4OuterBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: '-140px'
}));
export const Textoverimg4InnerBox = styled(Box)(() => ({
    width: '90%',
    "@media only screen and (max-width: 900px)": {
        width: '100%'
    },
}));
export const Textoverimg4 = styled(Typography)(() => ({
    textAlign: 'center',
    margin: '24px 0 18px 0',
    fontSize: "25px  ",
    fontWeight: "600",
    color: "#FFFFFF",
    "@media only screen and (max-width: 900px)": {
        fontSize: "20px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "18px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "16px",
    },
}));
export const SliderStyle = styled(Box)(() => ({
    position: "relative",
    margin: "12px",
    height: '30px',
    "& .slick-slider": {
        "& button::before": {
            color: "#000"
        },
        "& .slick-list": {
        },
        "& .slick-arrow": {
            zIndex: "3",
            background: "transparent",
            padding: "20px",
            "&::before": {
                content: '" "',
                display: "block",
                width: "20px",
                height: "20px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
            },
        },
        "& .slick-prev": {
            "&::before": {
                backgroundImage: `url('/assets/arrowLeft.svg')`,
                margin: "-62px -40px 0"
            },
        },
        "& .slick-next": {
            "&::before": {
                backgroundImage: `url('/assets/arrowRight.svg')`,
                margin: "-62px 14px 0"
            },
        },

    },
}));

export const SliderBox = styled(Box)(() => ({
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #ddd',
    backgroundColor: '#F6F6F6',
    display: 'flex !important',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: '10px',
    "& img": {
        height: '52px', zIndex: 1,
    },
    "&:hover": {
        "&:after": {
            display: "flex",
            content: '" "',
            background: "#d7282f",
            position: "absolute",
            left: "8px",
            right: "8px",
            top: "8px",
            bottom: "8px",
            borderRadius: "12px",
        },
        "& p": {
            color: "#fff"
        },
        backgroundColor: '#fff',
    }
}));
export const SliderBoxText = styled(Typography)(() => ({
    fontSize: '20px',
    fontWeight: '600',
    color: "#231f20",
    textAlign: 'center',
    zIndex: '9',
    position: 'relative'
}));

export const HeadingBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center'
}));
export const HeadingContent = styled(Typography)(() => ({
    fontSize: "36px",
    fontWeight: '600',
    color: '#231f20',
    "@media only screen and (max-width: 900px)": {
        fontSize: "26px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "20px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "18px",
    },
}));
export const Spantext2 = styled('span')(() => ({
    fontSize: "36px  ",
    fontWeight: "700",
    color: "#d7282f",
    "@media only screen and (max-width: 900px)": {
        fontSize: "26px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "20px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "18px",
    },
}));

export const Outerborderbox = styled(Box)(() => ({
    margin: "24px auto 0px auto",
    width: '90%',
    backgroundColor: '#F8F8F8'
}));
export const RelatedOuterBox = styled(Box)(() => ({
    margin: '0 auto',
    width: '90%',
    backgroundColor: '#F8F8F8'
}));
export const Boxborder = styled(Box)(() => ({
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px 20px 20px 20px',
    textAlign: 'center',
    transition: 'all ease .3s',
    backgroundColor: '#fff',
    "&:hover": {
        boxShadow: '2px 4px 10px 0px #FF8F8F40',
        transition: 'all ease .3s',
        cursor: 'pointer'
    }
}));
export const Imagebox = styled(Box)(() => ({
    "& img": {
        height: '60px'
    }
}));
export const BrandHeading = styled(Typography)(() => ({
    fontSize: '24px',
    fontWeight: "600",
    color: '#231f20',
}));
export const BrandSubHeading = styled(Typography)(() => ({
    fontSize: '13px',
    fontWeight: "400",
    color: '#231f20',
}));
export const ButtonBox = styled(Box)(() => ({
    margin: '24px 0 0 0',
    textAlign: 'center',
    padding: '0 0 18px 0'
}));
export const ViewMoreButton = styled(ButtonBase)(() => ({
    border: '1px solid #d7282f',
    borderRadius: '6px',
    color: '#d7282f',
    padding: '8px 16px',
    textTransform: 'capitalize',
    backgroundColor: '#fff',
    transition: 'all ease .5s',
    "&:hover": {
        backgroundColor: '#d7282f',
        color: '#fff',
        transition: 'all ease .5s',
    }
}));
export const RelatedNewBox = styled(Box)(() => ({
    borderRadius: '20px',
    padding: '0 0 10px 0',
    backgroundColor: '#fff',
    transition: '.4s',
    "& img": {
        width: '100%',
        height: '200px',
        borderTopRightRadius: '20px',
        borderTopLeftRadius: "20px",
    },
    "&:hover": {
        marginTop: '-10px',
        transition: '.4s',
    }
}));
export const RelatedNewBoxContent = styled(Box)(() => ({
    padding: '0px 12px'
}));
export const Headingtext = styled(Typography)(() => ({
    fontSize: '16px',
    fontWeight: '600',
    color: '#231f20',
    "@media only screen and (max-width: 900px)": {
        fontSize: "16px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "16px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "14px",
    },
}));
export const Subtext = styled(Typography)(() => ({
    fontSize: '13px',
    fontWeight: '400',
    color: '231f20',
    "@media only screen and (max-width: 900px)": {
        fontSize: "12px",
    },
    "@media only screen and (max-width: 600px)": {
        fontSize: "11px",
    },
    "@media only screen and (max-width: 340px)": {
        fontSize: "11px",
    },
}));
export const NameandDateBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0 12px 0'
}));
export const PeronNameIcon = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '16px 0 0 0',
    "& img": {
        height: '20px',
        width: '20px',
    },
    "& p": {
        fontSize: '13px',
        fontWeight: '400'
    }
}));
export const DateandIcon = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '16px 0 0 0',
    "& img": {
        height: '20px',
        width: '20px',
    },
    "& p": {
        fontSize: '13px',
        fontWeight: '400',
    }
}));
export const ViewMoreLess = styled(ButtonBase)(() => ({
    border: "1px solid #d7282f",
    borderRadius: '6px',
    backgroundColor: "#fff",
    color: '#d7282f',
    fontSize: '14px',
    fontWeight: '400',
    padding: '8px 16px',
    transition: 'all ease .5s',
    "&:hover": {
        backgroundColor: '#d7282f',
        border: '1px solid #d7282f',
        color: "#fff",
        transition: 'all ease .5s',
    }
}));
export const AboutSection = styled(Box)(() => ({
    backgroundColor: '#F3F9FF',
    padding: '28px',
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width:'50%'
}));
export const AboutHeading = styled(Typography)(() => ({
    fontSize: '20px',
    fontWeight: '600',
    color: '#d7282f',
}));
export const AboutSubHeading = styled(Typography)(() => ({
    fontSize: '36px',
    fontWeight: '700',
    color: '#231f20',
}));
export const Aboutcontent = styled(Typography)(() => ({
    fontSize: '14px',
    fontWeight: '400',
    color: '#4A4A4A',
}));
export const Startext = styled(Typography)(() => ({
    fontSize: '14px',
    fontWeight: '400',
    color: '#4A4A4A',
}));
export const AboutLastSectionBox = styled(Box)(() => ({
    margin: '24px 0 0 0',
    backgroundColor: '#fff',
    borderLeft: "6px solid #d7282f",
    padding: '8px 18px'
}));
export const AboutLastSection = styled(Typography)(() => ({
    fontSize: '14px',
    fontWeight: '400',
    color: '#4A4A4A',
}));

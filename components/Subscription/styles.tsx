import { Box, ButtonBase, Typography,styled } from "@mui/material";


export const WhiteBox = styled(Box)({
    background: "#FFFFFF",
    boxShadow: "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
    borderRadius: "6px",
    padding: "20px",
    "@media screen and (max-width:767px)": {
        padding: "0",
    },
});
export const TabStyle = styled(Box)({
    '& .MuiTabs-root': {
        margin: '0 0 0 16px',
    },
    '& .MuiTabs-flexContainer': {
        '& .MuiButtonBase-root': {
            minHeight: '55px',
        }
    },

});
export const SubscriptionContainer = styled(Box)({
    border: '1px solid #EAEAEA',
    borderRadius: '6px',
    '& .MuiBox-root': {
        '& .MuiTabs-scroller': {
            overflow: 'auto !important',
        },
    },
});
export const SubscriptionHead = styled(Box)({
    backgroundColor: '#f5f5f5',
    padding: '4px 16px',
    '& .MuiTypography-h6': {
        fontSize: '18px',
        fontWeight: '600',
    },
});
export const SubSearchCol = styled(Box)({
    margin: '20px 16px 0',
    paddingBottom: '24px',
    borderBottom: '1px solid #d2d2d2',
    "@media screen and (max-width:767px)": {
        margin: "20px 8px 0",
    },
});
export const SearchInput = styled(Box)({

    '& .MuiInputAdornment-root': {
        backgroundColor: '#D7282F',
        height: '35px',
        maxHeight: '35px',
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        margin: '0 -13px 0 0',
        borderRadius: '0 4px 4px 0',
        '& .MuiSvgIcon-root': {
            color: '#ffffff',
            fontSize: '22px',
        },
    },
});
export const ChangePlanBtn = styled(Box)({
    '& .MuiButtonBase-root': {
        textTransform: 'none',
        fontWeight: '600',
        "@media (max-width:1616px) and (min-width:1536px)": {
            fontSize: '12px'
        }
    }
});
export const CurrentPlan = styled(Box)({
    padding: '0 16px',
    marginBottom: '16px',
    '& .MuiTypography-h6': {
        fontSize: '14px',
        textTransform: 'uppercase',
        color: '#818181',
        marginBottom: '8px',
        marginTop: '16px',
    },
});
export const PlanToggleData:any = styled(Box)(({ toggle }: any) => {
    return {
        border: '1px solid #DDDDDD',
        borderRadius: '4px',
        background: toggle ? '' : 'linear-gradient(180deg, rgba(247, 247, 247, 0) 11.79%, #FFE8E8 111.66%)',
        padding: '12px 16px',
        "@media screen and (max-width:767px)": {
            padding: '12px 8px',
        },

    }
})

export const PlanOption = styled(Box)({
    '& .MuiTypography-subtitle1': {
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '22px',
        color: '#231F20',
    },
    '& .MuiTypography-body1': {
        fontSize: '12px',
    },

});
export const GreenStatus = styled(Box)({
    color: '#37A504',
    '& img': {
        marginRight: '4px',
    }
});
export const RedStatus = styled(Box)({
    color: '#D7282F',
    '& img': {
        marginRight: '4px',
    }
});
export const BlueTxt = styled(Box)({
    color: '#1A8BF3',
    fontSize: '14px',
    fontWeight: '600',
});
export const ToggleArrow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiSvgIcon-root': {
        color: '#231F20',
        fontSize: '16px',
        "@media (max-width: 899px)": {
            display: 'inline-block',
            transform: 'rotate(0deg)',
        },
        '&.arrowB': {
            "@media (max-width: 899px)": {
                display: 'inline-block',
                transform: 'rotate(360deg)'
            },
        },
    },

});
export const SeeAllFeature = styled(Box)({
    borderTop: '1px solid #dddddd',
    marginTop: '16px',
    '& .MuiTypography-h5': {
        fontSize: '16px',
        fontWeight: '600',
        margin: '22px 0 14px',
    },
});
export const GreenBtn = styled(Box)({
    '& .MuiButton-containedPrimary': {
        backgroundColor: '#85BB5C',
        width: '110px',
        height: '32px',
        padding: "2px 0px 0px 0px",
        '&:hover': {
            backgroundColor: '#5d8f37',
        },
    },
});
export const ModalTitle = styled(Box)({
    borderBottom: '1px solid #D7D7D7',
    paddingBottom: '16px',
    '& .MuiTypography-h6': {
        fontSize: '25px',
        color: '#231F20',
        fontWeight: '600',
        textAlign: 'center',
        '& .MuiTypography-body1': {
            display: 'block',
            textAlign: 'center',
        },
    },
});
export const PaymentCalc = styled(Box)({
    '& .MuiTypography-h5': {
        fontSize: '18px',
        color: '#D7282F',
        fontWeight: '500',
        marginBottom: '16px',
        "@media screen and (max-width:480px)": {
            fontSize: "14px",
            marginBottom: '12px'
        }
    },
});
export const QuantityCol = styled(Box)({
    '& .MuiTypography-body1': {
        display: 'block',
        fontSize: '14px',
        color: '#000000',
        marginBottom: '8px',
    },
});
export const QtyField = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '180px',
    "@media screen and (max-width:480px)": {
        width: "140px"
    },
    '& .MuiFormControl-root': {
        padding: '0 12px',
    },
});
export const EqualSign = styled(Box)({
    color: '#4A4A4A',
    fontSize: '24px',
    padding: '0 0 0 8px',
});
export const PlanPrice = styled(Box)({
     padding: '0 0 0 0px',
    // marginLeft:"-15px",
    '& .MuiTypography-body1': {
        display: 'block',
        fontSize: '14px',
        color: '#000000',
        marginBottom: '8px',
    },
});
export const TotalPrice = styled(Box)({
    fontSize: '21px',
    color: '#D7282F',
    padding: '4px 0 0 0px',
    '& strong': {
        fontWeight: '600',
    },
    "@media screen and (max-width:480px)": {
        fontSize: '16px'
    }
});
export const BGColumn = styled(Box)({
    backgroundColor: '#FFF7F7',
    padding: '24px',
    margin: '20px -24px -24px',
    borderTop: '1px solid #FFE8E8',
    borderRadius: '0 0 20px 20px'
});
export const TodayCharge = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});
export const IcoBox = styled(Box)({
    backgroundColor: '#FFE8E9',
        height:"54px",
        width:"54px",
    border: '1px solid #FFCCCE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    borderRadius: '3px',
    padding: '6px',
    '& .MuiSvgIcon-root': {
        color: '#D7282F',
        fontSize: '40px',
    },
});
export const ChargeTxt = styled(Box)({
    '& .MuiTypography-body1': {
        fontSize: '14px',
        color: '#8A8A8A',
    },
    '& .MuiTypography-h3': {
        fontSize: '26px',
        color: '#4A4A4A',
        fontWeight: '600',
    },
});
export const PlanDescription = styled(Box)({
    padding: '16px 0 20px 0',
    '& .MuiTypography-body1': {
        fontSize: '15px',
        color: '#4A4A4A',
        fontWeight: '400',
        lineHeight: '22px',
    },
});
export const PaymentMethod = styled(Box)({
    '& .MuiTypography-h5': {
        fontSize: '18px',
        color: '#D7282F',
        fontWeight: '500',
        marginBottom: '16px',
    },
});
export const ModalFooter = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '20px',
    '& .MuiButton-contained': {
        textTransform: 'none',
        fontSize: '16px',
        "@media screen and (max-width:480px)": {
            fontSize: '12px'
        }
    },
});
export const PaddingCol = styled(Box)({
    "@media (min-width: 899px)": {
        padding: '0px 0px 0px 41px',
    },
    "@media (max-width: 899px)": {
        padding: '20px 12px',
    },
});

//************************************ */ adds  **********************************************************************/
export const Mainbox = styled(Box)(() => ({
    height: "495px",
    width: "100%",
    backgroundImage: `url('/assets/adsbackground2.jpg')`,
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "5px",
    boxShadow: "0px 9px 10px rgba(159, 162, 191, 0.15), 0px 0px 19px rgba(159, 162, 191, 0.04)",
    position: 'relative',
    "@media screen and (max-width:900px)": {
        display: 'none',
    },
    "@media screen and (max-width:1535px)": {
        width: '600px',
        margin: 'auto',
    }
}));
export const NewMainbox = styled(Box)(() => ({
    backgroundImage: `url('/assets/adsbackground2.jpg')`,
    backgroundRepeat: 'no-repeat',
    boxShadow: "0px 9px 10px rgba(159, 162, 191, 0.15), 0px 0px 19px rgba(159, 162, 191, 0.04)",
    padding: '8px 14px 14px 14px',
    width: '100%',
    borderRadius: '5px',
    "@media screen and (max-width:1535px)": {
        width: '600px',
        margin: 'auto',
    },
    "@media screen and (max-width:767px)": {
        width: '100%',
    }
}));

export const StarBox = styled(Box)(() => ({
    float: 'right',
    marginTop: '6.75px',
    marginRight: "10px"
}))

export const AdsText = styled(Box)(() => ({
    padding: '0px 13.38px 0px 22.22px',
}))

export const AllText = styled('span')(() => ({
    color: '#231F20',
    fontSize: '25px',
    fontWeight: '600',
    textTransform: 'capitalize',
}))
export const QualityAndAssurance = styled('span')(() => ({
    color: '#D4454E',
    fontSize: '30px',
    fontWeight: '700',
    textTransform: 'capitalize',
    "@media screen and (max-width:767px)": {
        fontSize: '20px',
    }

}))
export const Product = styled('span')(() => ({
    color: '#231F20',
    fontSize: '30px',
    fontWeight: '700',
    textTransform: 'capitalize',
    "@media screen and (max-width:767px)": {
        fontSize: '20px',
    }
}))
export const Img = styled('img')(() => ({
    width: '300px',
    height: '245px',
}))
export const ImgBox = styled(Box)(() => ({
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
}))
export const ButtonBox = styled(Box)(() => ({
    position: 'absolute',
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "@media screen and (max-width:1535px)": {
        top: "80%",
    }
}))

// ****************** ad two ***************************
export const Mainbox2 = styled(Box)(() => ({
    height: "388px",
    width: "100%",
    backgroundImage: `url('/assets/newmask.svg')`,
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "5px",
    boxShadow: "0px 9px 10px rgba(159, 162, 191, 0.15), 0px 0px 19px rgba(159, 162, 191, 0.04)",
    marginTop: '32px',
    backgroundColor: '#FFF5F3',
    "@media screen and (max-width:1535px)": {
        width: '600px',
        margin: 'auto',
        backgroundSize: 'cover',
        marginTop: '32px'
    },
    "@media screen and (max-width:767px)": {
        width: '100%',
    }
}));
export const SecondAdsText = styled(Typography)(() => ({
    color: '#231F20',
    fontSize: '23px',
    fontWeight: '400',
    textTransform: 'capitalize',
    "@media screen and (max-width:767px)": {
        fontSize: '14px',
    }
}));
export const EnlargViewAndLeads = styled('span')(() => ({
    color: '#D7282F',
    fontSize: '30px',
    fontWeight: '600',
    textTransform: 'capitalize',
    "@media screen and (max-width:767px)": {
        fontSize: '14px',
    }
}));
export const Over = styled('span')(() => ({
    color: '#231F20',
    fontSize: '23px',
    fontWeight: '700',
    textTransform: 'capitalize',
    "@media screen and (max-width:767px)": {
        fontSize: '16px',
    }
}));
export const TextBox = styled(Box)(() => ({
    padding: '10px 13.38px 0px 22.22px',
    "@media screen and (max-width:767px)": {
        fontSize: '10px 13.38px 0px 10px',
    }
}))
export const Mapp = styled('img')(() => ({
    position: "absolute",
    top: "-60px",
}))
export const Ellipse = styled('img')(() => ({
    position: "absolute",
    top: "-10px",
    right: "6px",
}))
export const EllipseImage = styled('img')(() => ({
    position: "absolute",
    top: "-10px",
    right: "6px",
    borderRadius: "50%",
}))
export const Heximage = styled('img')(() => ({
    position: "absolute",
    top: "20px",
    left: "12px",
}))

export const Imageforadsone = styled('img')(() => ({
    width: '97%',
    marginTop: '20px'
}))
export const UpgradeBtn = styled(ButtonBase)(() => ({
    backgroundColor: 'rgba(215, 40, 47, 0.85)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    padding: '10px 30px',
    borderRadius: '6px',
    textTransform: 'capitalize',
    transition: '.3s',
    "&:hover": {
        backgroundColor: '#d7282f',
        transition: '.3s',
    }
}))
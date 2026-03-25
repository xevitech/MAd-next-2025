import { Box, Button, ButtonBase, InputBase, List, ListItem, ListItemText, Popover, Stack, Tab, Typography, styled } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


export const MainBox = styled(Box)(() => ({
    width: '284px', border: '1px solid #DCDCDC', position: 'relative'
}));

export const Crossbtn = styled(Box)(() => ({
    position: 'absolute',
    top: '8px',
    right: '-32px',
    backgroundColor: '#464646',
    cursor: 'pointer',
    padding: '4px',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px'
}));

export const SearchBar = styled(Box)(() => ({
    border: '1px solid #A3A3A3',
    padding: '4px 6px',
    margin: '0px',
    borderRadius: '6px',
    position: 'relative',
    marginBottom: '4px',
    '& .MuiInputBase-root': {
        width: '100%',
        margin: '0',
        '& .MuiInputBase-input': {
            padding: '4px',
            width: '100%',
            fontSize: '13px',
        },
    },
}));

export const Searchicon = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
}));

export const GlobalNav = styled(Box)(() => ({
    padding: '16px 16px 0',
    '&.hide': {
        '& .SubMenuList': {
            marginLeft: '-265px',
        },
    },
    '&.show': {
        '& .CategoryList': {
            width: '51px',
            paddingRight: '16px',
            borderColor: '#DCDCDC',
            overflow: 'hidden',
            '& .MuiLink-root': {
                '& span': {
                    opacity: '0',
                },
            },
        },
        '& .LinkContainer': {
            overflow: 'hidden',
        },
        '& .SubMenuList': {
            marginLeft: '0px',
        },
        '& .SearchContainer': {
            margin: '0 0 12px 0',
            padding: '0',
        },

    },
    '& .CategoryList': {
        width: '265px',
        paddingRight: '0',
        transition: 'all ease .3s',
        borderRight: '1px solid transparent',
        marginTop: '-16px',
        paddingTop: '16px',
        position: 'relative',
        zIndex: '1',
        backgroundColor: '#ffffff',
        '& li': {
            width: '265px',
        },
    },
    '& .SubMenuList': {
        width: '265px',
        transition: 'all ease .3s',
    },

}));

export const CategoryList = styled(Box)(() => ({

}));

export const SubMenuList = styled(Box)(() => ({

}));

export const LinkContainer = styled(Box)(() => ({

}));

export const SearchContainer = styled(Box)(() => ({
    margin: '-16px -16px 0',
    padding: '16px 16px 4px',
    background: '#ffffff',
    position: 'sticky',
    top: '0',
}));

export const SubChildLink = styled(Box)(() => ({
    margin: '0 0 0 16px',
    '& ul': {
        margin: '12px 0 0 2px',
        padding: '0 0 0 0',
        listStyle: 'none',
        '& li': {
            padding: '4px 0',
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            '&::before': {
                display: 'inline-block',
                content: '" "',
                width: '6px',
                height: '6px',
                borderRadius: '100%',
                backgroundColor: '#909090',
                marginRight: '8px',
            },
            '& a': {
                color: '#000000',
                cursor: 'pointer',
                '&:hover': {
                    color: '#D7282F',
                },
            },
        },
    },
}));

export const Icon = styled(SearchOutlinedIcon)(() => ({
    color: '#D7282F'
}));

export const Textt = styled(ListItemText)(() => ({
    color: '#000000',
    fontSize: '14px',
    fontWeight: '400'
}));

export const StyledInputBase = styled(InputBase)(() => ({
    color: 'inherit',
    marginLeft: '10px',
    '& .MuiInputBase-input': {
        '&:focus': {
            width: '20ch',
        },
    },
}));

export const Unorderdlist = styled('ul')(() => ({
    listStyleType: 'none',
    padding: '0px'
}));

export const Listtext = styled('li')(() => ({
    color: '#000000',
    fontSize: '13px',
    fontWeight: '400',
    transition: '0.3s',
    '& .MuiLink-root': {
        color: '#000000',
        margin: '6px 0',
        display: 'flex',
        transition: 'all ease .3s',
        clear: 'both',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0 2px',
        borderRadius: '3px',
        '&:hover': {
            backgroundColor: '#f7f7f7',
        },
        '& i': {
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            fontSize: '16px',
            transition: 'all ease .3s',
            float: 'left',
        },
        '& span': {
            margin: '3px 0 3px 5px',
            display: 'inline-block',
            transition: 'all ease .3s',
            opacity: '1',
            width: '100%',
        },
    },
}));

export const Span = styled('span')(() => ({
    marginLeft: '5px'
}));

export const Img = styled('img')(() => ({
    padding: '10px'
}));

export const Btn = styled(ButtonBase)(() => ({
    textDecoration: 'none',
    transition: '0.3s',
    "&:hover": {
        color: '#D7282F',
        transition: '0.3s',
    },
    "&:hover img": {
        background: '#D7282F',
        transition: '0.3s',
        borderRadius: '6px',
    }
}));

export const Menu = styled(Typography)(() => ({
    fontSize: '16px',
    fontWeight: '600'
}));

export const Hello = styled('ul')(() => ({
    padding: '0px',
}));
export const Listext = styled('li')(() => ({
    fontSize: '14px',
    fontWeight: '400',
    color: '#000000',
    marginLeft: '15px' //delete
}));

export const Menuhover = styled(Box)(() => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
    marginLeft: '-6px',

}));

export const Menutext = styled(Typography)(() => ({
    fontSize: '16px',
    fontWeight: '600',
    color: '#000000',
}));

export const OurCategory = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    "@media screen and (max-width: 480px)": {
        paddingRight: '8px',
    },
    '& .MuiTypography-root': {
        color: "#000",  //#fff
        fontSize: '16px',
        fontWeight: '600',
        marginLeft: '4px',
        lineHeight: '20px',
        marginRight: '6px',
        "@media screen and (max-width: 480px)": {
            display: 'none',
        },
    },
}));
export const CategoryIco = styled(Box)(() => ({
    display: 'flex',
    '& img': {
        width: '40px',
        height: '40px',
        "@media screen and (max-width: 480px)": {
            width: '34px',
            height: '34px',
        },
        "@media screen and (max-width: 400px)": {
            width: '28px',
            height: '28px',
        },
    },
}));

export const Categorybtn = styled(Typography)(() => ({
    fontSize: '14px',
    fontWeight: '600',
    color: '#000000',
    cursor: 'pointer',
}));

// new design style

export const OurCategoryflyout = styled(Box)(({ theme }) => ({
    width: "100%",
    position: "absolute",
    zIndex: "3",
    top: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 3px 6px #cccccc",
    transition: "max-height .4s",
    maxHeight: "0",
    left: 0,
    "&::-webkit-scrollbar": {
        width: "6px",
    },
    "&::-webkit-scrollbar-track": {
        background: "#ffff",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "10px",
    },
    "@media (max-width: 1200px) and (min-width: 900px)": {
        width: "680px",
        left: "-155px",
    },
    "@media (max-width: 900px) and (min-width: 600px)": {
        width: "330px",
        left: "0px",
    },
    "@media (max-width: 600px) and (min-width: 320px)": {
        width: "330px",
        left: "-155px",
    },
    "@media screen and (max-width:480px)": {
        width: "280px",
        left: "-160px",
    },
    "@media screen and (max-width:320px)": {
        width: "250px",
        left: "-150px",
    },
}));

export const CompanyInfoPopup = styled(Stack)(({ theme }) => ({
    "&:hover": {
        "& .MapFlyout": {
            maxHeight: "300px",
            "@media (max-width: 1200px) and (min-width: 900px)": {
                maxHeight: "430px",
            },
            "@media (max-width: 900px) and (min-width: 600px)": {
                maxHeight: "430px",
                overflowY: "auto",
            },
            "@media (max-width: 600px) and (min-width: 320px)": {
                overflowY: "auto",
            },
        },
        "& .MuiButtonBase-root": {
            transform: "rotate(180deg)",
            "& .MuiSvgIcon-root": {
                color: "#D7282F",
            },
        },
    },
    "& .MuiButtonBase-root": {
        transform: "rotate(0deg)",
        transition: "all ease .3s",
    },
}));

export const CategoriesMainHeading = styled(Typography)(() => ({
    fontSize: '13px',
    fontWeight: '600',
    color: '#231f20',
    cursor: "pointer"
}));
export const Listitems = styled(ListItem)(() => ({
    fontSize: '13px',
    fontWeight: '400',
    color: '#4a4a4a',
    paddingBottom: '0px',
    paddingLeft: '0px',
    cursor: 'pointer',
    "&:hover": {
        color: "#d7282f"
    }
}));
export const MoreCategories = styled(Typography)(() => ({
    fontSize: '13px',
    fontWeight: '600',
    color: '#d7282f',
    cursor: 'pointer'
}));
export const SeeMoreCategories = styled(Typography)(() => ({
    fontSize: '14px',
    fontWeight: '600',
    color: '#d7282f',
    cursor: 'pointer'
}));


// OurCategory Tab

export const HiddenTab = styled(Tab)(() => ({
    color: "#231f20",
    textTransform: 'capitalize',
    minHeight: "36px",
    borderRadius: '10px',
    // margin: '8px 0px 0',
    fontWeight: 600,
    "&:hover":
    {
        backgroundColor: '#fff',
        color: "#d7282f !important",
        fontWeight: 600,
        "& img": {
            filter: "brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(5106%) hue-rotate(344deg) brightness(91%) contrast(115%)",
        }
    },
    "& img": {
        width: "20px"
    }
}));


/*****===== Start Syling for header menu =====*****/
export const MenuHoverBoxOuter = styled(Box)(() => ({
}));
export const SubCategoryBox = styled(Box)(() => ({
    // display: "flex"
    // "& .slick-slider": {
    //     "& button": {
    //         display: "none !Important"
    //     }
    // }
}));

export const StylePopoverMenu = styled(Box)(() => ({
    "& .MuiPaper-root": {
        boxShadow: "none !important",
    },
}));
export const MenuMainCategoryList = styled(List)(() => ({

    "& .MuiListItemText-root": {
        "& .MuiTypography-root": {
            color: "#000",
            fontSize: "13px",
            fontWeight: '600',
            cursor: "pointer"
        },
    },
    "& .MuiListItem-root": {
        paddingTop: 0,
        paddingBottom: 0,
        transition: 'all ease .3s',
        "& svg": {
            fontSize: "15px"
        },
        "&:hover": {
            background: "#f0f0f1",
            "& .MuiTypography-root": {
                color: "#d7282f"
            },
            "& svg": {
                color: "#d7282f"
            },
        }
    },
    "& .MuiButtonBase-root": {
        background: "transparent"
    },

}));

export const MenuSubCategoryList = styled(List)(() => ({
    maxHeight: "200px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        width: "3px",
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
    "& .MuiListItemText-root": {
        cursor: "pointer",
        "& .MuiTypography-root": {
            color: "#000",
            fontSize: "13px",
        },
    },
    "& .MuiListItem-root": {
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        "& svg": {
            fontSize: "15px"
        },
        " & a":{
                textDecoration:"none !important"
            },
        "&:hover": {
            "& .MuiTypography-root": {
                color: "#d7282f"
            },
            "& svg": {
                color: "#d7282f"
            },
        },
        
    }
}));
export const CategoryHoverContainer = styled(Box)(() => ({
    width: "95%",
    margin: "0 auto",
    "@media screen and (max-width:1280px)": {
        width: "100%",
    }
}));
export const CategoryHoverMenuBox = styled(Box)(() => ({
    display: 'flex',
    "& .selectedState": {
        "& .MuiTypography-root": {
            color: "#d7282f !important"
        },
        "& svg": {
            color: "#d7282f"
        }
    },
}));

export const InnerColumnBox = styled(Box)(() => ({
    // width: '245px',
    // minHeight: "210px",
    // maxHeight: "210px",
    minHeight: "220px",
    maxHeight: "220px",
    overflowY: "auto",
    margin: "5px 0 0",
    "&::-webkit-scrollbar": {
        width: "3px",
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
    position: 'relative',
    "& .rightarrow": {
        // display: "none",
        padding: 0,
        margin: 0,
        fontSize: "inherit"
    },
    "& .MuiListItem-root": {
        "&:hover": {
            "& .rightarrow": {
                // display: "block"
            },
        },
    }
}));
export const RPInfoText = styled(Box)(() => ({
    textAlign: "center",
    padding: "10px 0 5px",
    "& .MuiTypography-body2": {
        fontSize: "13px",
        color: "#231f20",
    },
    "& .MuiTypography-h5": {
        fontSize: "14px",
        color: "#d7282f",
        fontWeight: "500",
    }
}));
export const RightRebButton = styled(Button)(() => ({
    background: "#d7282f !important",
    color: "#fff",
    textTransform: "capitalize",
    fontSize: "14px",
    position: 'absolute',
    right: "0",
    top: '50%',
    transform: 'translateY(-50%)',
    padding: 0,
    minWidth: "auto",
    minHeight: "70px",
    width: "19px",
    borderRadius: "4px 0 0 4px",
    display: "none",
    "& svg": {
        width: "auto",
        height: "auto",

    },
    "@media screen and (max-width:899px)": {
        display: "block"
    }
}));

/*****===== End Syling for header menu =====*****/

/*****===== Start Syling for header menu for Mobile Screen =====*****/
export const CategoryMobileOuter = styled(Box)({
    backgroundColor: "#FFFFFF",
    padding: "10px 0 0",
    boxShadow: "none",
    border: "none",
    "& .MuiAccordionSummary-content": {
        margin: "5px 0 !important"
    },
    "& .MuiAccordionSummary-root": {
        minHeight: "auto !important",
        margin: "auto",
        "&:hover": {
            "& svg": {
                color: "#d7282f",
            },
            "& .MuiTypography-body1": {
                color: "#d7282f",
            },
        },
        "& .Mui-expanded": {
            "& .MuiTypography-body1": {
                color: "#d7282f"
            }
        }
    },

    "& .MuiAccordion-root": {
        boxShadow: "none",
        margin: "0 !important",
        "&::before": {
            background: "none",

        },
    },
    "& .MuiAccordionDetails-root": {
        padding: "0px 16px 14px"
    }
});
export const MainTxt = styled(Typography)({
    fontSize: "16px",
    fontWeight: "700",
    color: "#231F20",
    "&:hover": {
        color: "#d7282f",
    },
});
export const SecondAcd = styled(Typography)({
    fontSize: "14px",
    fontWeight: "600",
    color: "#231F20",
    "&:hover": {
        color: "#d7282f",
    },
});
export const AccordionTxt = styled(Typography)({
    fontSize: "14px",
    fontWeight: "400",
    color: "#231F20",
    "&:hover": {
        color: "#d7282f",
    },
});
/*****===== End Syling for header menu for Mobile Screen =====*****/
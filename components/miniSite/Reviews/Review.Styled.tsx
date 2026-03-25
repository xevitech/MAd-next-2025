import { List, styled } from "@mui/material";
import { Box, Typography, Slider, ButtonBase, Rating } from "@mui/material";

export const ReviewHeading = styled(Typography)(({ theme }) => ({
  fontSize: "21px",
  fontWeight: 600,
  color: "#231F20",
  fontFamily: "open sans",

  [theme.breakpoints.down("lg")]: {
    fontSize: "20px",
  },
}));
export const ReviewSubHeading = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(116, 116, 116, 1)",
  fontFamily: "open sans",
  margin: "0 0 12px 0",
  [theme.breakpoints.down("lg")]: {
    fontSize: "13px",
  },
}));
export const ReviewHeadingsm = styled(Typography)(({ theme }) => ({
  fontSize: "21px",
  fontWeight: 600,
  color: "#231F20",
  fontFamily: "open sans",
  textTransform: "capitalize",
  [theme.breakpoints.down("lg")]: {
    fontSize: "16px",
  },
}));
export const ReviewSubHeadingsm = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: "rgba(116, 116, 116, 1)",
  fontFamily: "open sans",
  marginLeft: "6px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "16px",
  },
}));
export const RatingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    borderRadius: "8px",
  },
}));
export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
    fontSize: "25px",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
    fontSize: "25px",
  },
});
export const RatingValue = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  fontWeight: 600,
  color: "#231F20",
  fontFamily: "open sans",
  "& span": {
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "20px",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "30px",
    "& span": {
      fontSize: "15px",
    },
  },
}));
export const RatingLable: any = styled(Typography)(
  ({ theme, fw, txtcolor }: any) => ({
    fontSize: "14px",
    fontWeight: fw ? fw : 400,
    color: txtcolor ? txtcolor : "#7B7979",
    fontFamily: "open sans",
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  })
);
export const RatingLable2 = styled(Typography)(
  ({ theme, fw, txtcolor }: any) => ({
    position: "relative",
    fontSize: "14px",
    fontWeight: fw ? fw : 400,
    color: txtcolor ? txtcolor : "#7B7979",
    fontFamily: "open sans",
    marginLeft: "8px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
    [theme.breakpoints.down("md")]: {
      top: "0px",
    },
  })
);

export const ReviewText12 = styled(Typography)(
  ({ theme, fw, txtcolor }: any) => ({
    fontSize: "12px",
    fontWeight: fw ? fw : 400,
    color: txtcolor ? txtcolor : "rgba(35, 31, 32, 1)",
    fontFamily: "open sans",
  })
);
export const ReviewText13: any = styled(Typography)(
  ({ theme, fw, txtcolor }: any) => ({
    fontSize: "13px",
    fontWeight: fw ? fw : 400,
    color: txtcolor ? txtcolor : "rgba(35, 31, 32, 1)",
    fontFamily: "open sans",
    [theme.breakpoints.down("lg")]: {
      fontSize: "11px",
    },
  })
);
export const ReviewText14 = styled(Typography)(
  ({ theme, fw, txtcolor }: any) => ({
    fontSize: "14px",
    fontWeight: fw ? fw : 400,
    color: txtcolor ? txtcolor : "rgba(35, 31, 32, 1)",
    fontFamily: "open sans",
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
  })
);

export const CustomeRatingSlider: any = styled(Slider)(
  ({ theme, clr }: any) => ({
    color: clr ? clr : "#52af77",
    height: 6,
    cursor: "unset",
    padding: "6px 0",
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      display: "none",
      height: 20,
      width: 20,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  })
);

export const ReviewHeaderIcon = styled(Box)(({ theme }: any) => ({
  background: "#ECFBE6",
  borderRadius: "6px",
  padding: "0px 4px",
}));
export const ResponseIconContainer: any = styled(Box)(
  ({ theme, clr }: any) => ({
    background: clr ? clr : "#ECFBE6",
    borderRadius: "50px",
    padding: "7px 0",
    display: "flex",
    alignItems: "center",
    width: "38px",
    height: "38px",
    justifyContent: "center",
    "& img": {
      width: "24px",
      position: "relative",
      top: "2px",
    },
  })
);
export const ResponseContainer: any = styled(Box)(
  ({ theme, bg, bordercolor }: any) => ({
    background: bg ? bg : null,
    borderRadius: "6px",
    border: bordercolor ? `1px solid ${bordercolor}` : null,
  })
);
export const FeedbackTooltipBox: any = styled(Box)(
  ({ theme, arrowTop, background }: any) => ({
    background: "#F9F9F9",
    borderRadius: "6px",
    border: "1px solid #E8E8E8",
    position: "relative",
    zIndex: 2,
    "&::before": {
      position: "absolute",
      content: '""',
      display: "block",
      height: 16,
      width: 16,
      left: -8,
      top: arrowTop ? arrowTop : null,
      background: background ? background : null,
      transform: "rotate(45deg)",
      zIndex: 1,
      borderBottom: "1px solid #E8E8E8",
      borderLeft: "1px solid #E8E8E8",
      "@media (max-width: 599px)": {
        transform: "rotate(134deg)",
        top: "-9px",
        left: "20px",
      },
    },
  })
);

export const EmailSubmitButton = styled(ButtonBase)(
  ({ theme, bg, heighlight }: any) => ({
    fontFamily: "open sans",
    fontSize: "14px",
    fontWeight: 600,
    background: bg ? bg : "rgba(215, 40, 47, 1)",
    color: "white",
    borderRadius: "4px",
    padding: "9px 12px",
    "& :hover": {
      background: heighlight ? heighlight : "rgba(35, 31, 32, 1)",
    },
    "& :active": {
      background: heighlight ? heighlight : "rgba(35, 31, 32, 1)",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "15px",
    },
  })
);
export const UserSatisfaction = styled(Box)(({ theme }: any) => ({}));
export const RatingPercent = styled(Box)(({ theme }: any) => ({}));
export const QuotationPopover = styled(Box)(({ theme }: any) => ({
  background: "white",
  border: "1px solid #E1E1E1",
  borderRadius: "12px",
  position: "absolute",
  top: "50%",
  right: "20px",
  transform: "translate(0 , -50%)",
  "@media (max-width: 600px)": {
    position: "absolute",
    bottom: "14px",
    top: "inherit",
    left: "14px",
    right: "14px",
    transform: "inherit",
    width: "calc(100% -28px)",
  },
  "&:before": {
    content: '" "',
    display: "inline-block",
    background: "url(/assets/pop-tip.svg) top center no-repeat",
    width: "20px",
    height: "20px",
    position: "absolute",
    top: "50%",
    transform: "translate(0px, -50%)",
    left: "-11px",
    "@media (max-width: 600px)": {
      top: "-11px",
      transform: "rotate(90deg)",
      left: "11px",
    },
  },
  "& .MuiTypography-h6": {
    fontSize: "12px",
    backgroundColor: "#F0F3F8",
    borderRadius: "11px 11px 0px 0px",
    padding: "6px 14px",
    margin: "0",
  },
}));
export const PopoverList = styled(List)(({ theme }: any) => ({
  padding: "2px 0",
  "& .MuiListItem-root": {
    padding: "0px 14px",
    fontSize: "12px",
    color: "#7B7979",
    "& .MuiTypography-root": {
      fontSize: "12px !important",
    },
  },
}));

export const ReviewBoxP = styled(Box)(({ theme }: any) => ({
  "& .ratingreview": {
    display: "block",
  },
}));

export const TypographyTopTared = styled(Typography)(({ theme }: any) => ({
  "@media (max-width: 600px)": {
    fontSize: "14px",
  },
}));

export const TypographySort = styled(Typography)(({ theme }: any) => ({
  "@media (max-width: 600px)": {
    fontSize: "14px",
  },
}));

//  Comments and review

export const CommentBox = styled(Box)(({ theme }: any) => ({
  borderRadius: "6px",
  border: "1px solid #E9EBEE",
  margin: "16px 0 0 0",
  "&:hover": {
    "& .doctionBox": {
      opacity: "1",
      pointerEvents: "inherit",
    },
  },
}));
export const HeadingNiconBox = styled(Box)(({ theme }: any) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px",
  borderBottom: "1px solid #e9e9e9",
}));
export const TextNchip = styled(Box)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "16px 0 12px 24px",
}));
export const NameText = styled(Typography)(({ theme }: any) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#231f20",
}));
export const DoticonBox = styled(Box)(({ theme }: any) => ({
  paddingRight: "8px",
  pointerEvents: "none",
  transition: "all ease .3s",
}));
export const CommentTextBox = styled(Box)(({ theme }: any) => ({
  padding: "16px 24px",
}));
export const CommentText = styled(Typography)(({ theme }: any) => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "#231f20",
}));
export const IconNdateTimeBox = styled(Box)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "8px",
}));
export const Userplantext = styled(Typography)(({ theme }: any) => ({
  fontSize: "12px",
  fontWeight: "600",
  color: "rgb(52, 168, 83)",
}));
export const Noplan = styled(Typography)(({ theme }: any) => ({
  fontSize: "12px",
  fontWeight: "600",
  color: "#d7282f",
}));

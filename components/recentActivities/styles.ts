import { Box, styled, Typography } from "@mui/material";

export const TopHeader = styled(Typography)({
  fontSize: "24px",
  gap: "10px",
});
export const LeftContentText = styled("div")({
  gap: "10px",
});
export const Iconcontainer: any = styled("div")(({ itemColor }: any) => ({
  color: "#FFFFFF",
  padding: "2px",
  gap: "10px",
  width: "30px",
  height: "30px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50px",
  backgroundColor: itemColor,
  margin: "4px 0px",
  border: "1px solid #fff",
}));
export const Activitycontainer = styled("div")({
  width: "100%",
});

export const ActivityHeader = styled("div")({
  display: "flex",
  flex: 1,
  height: "35px",
});

export const ActivityIncont = styled("div")({
  margin: "0 0 0 25px",
  "@media (max-width: 767px)": {
    margin: 0,
  },
});

export const ActivityLabel: any = styled("span")(({ value }: any) => ({
  fontWeight: 600,
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginLeft: "15px",
  "@media (max-width: 767px)": {
    marginLeft: 0,
  },
  color: value,
}));
export const ActivityContentContainer: any = styled("div")(
  ({ value }: any) => ({
    marginLeft: "14px",
    "& .LeftLine": {
      position: "relative",
      "&::before": {
        content: '" "',
        width: "2px",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "#BEBEBE",
        "@media (max-width: 767px)": {
          display: "none",
        },
      },
      "&::after": {
        content: '" "',
        width: "2px",
        height: "11px",
        position: "absolute",
        bottom: "0",
        left: "0",
        backgroundColor: "#ffffff",
      },
    },
  })
);
export const DotItem: any = styled("div")(({ value }: any) => ({
  borderRadius: "10px",
  background: `${value}`,
  width: "8px",
  height: "8px",
  gap: "10px",
  minWidth: "8px",
  margin: "0 7px 0 0px",
  "@media (max-width: 767px)": {
  },
}));
export const ActivityContent = styled("span")(({ }) => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#333333",
  fontSize: "13px",
  padding: "0 7px 3px 0",
  "& .viewLink": {
    color: "#666666",
    "&:hover": {
      color: "#d7282f",
    },
  },
  "@media (max-width:767px)": {
    padding: "0 0 6px 0",
  },
}));
export const ContentLine = styled("span")(({ }) => ({
  minWidth: "30px",
  height: "2px",
  background: "#BEBEBE",
  "@media (max-width: 767px)": {
    display: "none",
  },
}));
export const ViewMore = styled("span")({
  color: "#666666",
});
export const VerticalLine: any = styled("span")(() => ({
  borderLeft: "2px solid #BEBEBE",
  marginLeft: "14px",
  gap: "10px",
  "@media (max-width: 767px)": {
    marginLeft: "0",
    display: "none",
  },
}));
export const ActivityDate: any = styled("p")(({ }) => ({
  fontSize: "13px",
  color: "#333333",
  fontWeight: 600,
  padding: "10px 0",
  margin: "10px 0 0 0",
}));
export const NavigationHeaderText = styled("p")({
  color: "#000000",
  // height: "22px",
  fontWeight: 600,
  // width: "159px",
  fontSize: "16px",
  "@media (max-width: 1600px)": {
    fontSize: "13px",
  },
});
export const SelectAllTxt = styled(Typography)({
  fontSize: "16px",
  "@media (max-width: 1600px)": {
    fontSize: "13px",
  },
});


/***************** Activity page new style ****************/
export const ActivityContainer: any = styled("div")(({ breakPoints }: any) => ({
  minHeight: "calc(100vh + 64px)",
  gap: "10px",
  backgroundColor: breakPoints?.max768px ? "#fff" : "#F1F5F9",
}));

export const ActivityContainerInn: any = styled("div")(
  ({ breakPoints }: any) => ({
    backgroundColor: "#FFFFFF",
    borderRadius: "6px",
    padding: "16px",
    position: breakPoints?.max768px ? "relative" : "unset",
  })
);

export const HeadTTxt = styled("p")({
  fontSize: "16px",
  fontWeight: 600,
  color: "#333333",
});

export const HeadDes = styled("p")({
  fontSize: "14px",
  fontWeight: 400,
  padding: "7px 0 0",
});

export const ActivityNav: any = styled("div")(({ breakPoints }: any) => ({
}));

export const ActivityMenu: any = styled("div")(({ breakPoints }: any) => ({
  float: "right",
  boxShadow: " 0px 0px 10px rgba(0, 0, 0, 0.1)",
  background: "#FBFBFB",
  border: breakPoints?.max768px ? "1px solid #E0E0E0" : "none",
  borderRadius: "8px",
  width: "320px",
  padding: "0 1rem",
  margin: "0 0 6px",
  "@media (max-width: 1500px)": {
    padding: "0 5px",
  },
  right: "70px",
  "& .MuiListItemIcon-root": {
  },
  "& .MuiPaper-root": {
    boxShadow: "none",
  },
}));

export const PaperTxt = styled("div")({
  fontFamily: "Open Sans !important",
  "& .activetab": {
    border: "1px solid #E7E7E7",
    borderRadius: "4px",
  },
  "& .MuiMenuItem-root": {
    display: "block",
    margin: "0 0 7px",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
    margin: "3px 0 0",
  },
});

export const IconContent = styled("div")({
  display: "flex",
});

export const ActivityList = styled("span")({
  fontSize: "13px",
  fontWeight: 400,
  color: "#000",
  "&.activetab": {
    color: "#d7282f",
    fontWeight: "600",
  },
});

export const ActivityNavbarInn = styled("span")({});

export const SmallActivitTxt = styled("span")({});

/**************** Turned makestyle in to styled component ***************/
export const Appfixed = styled("div")({
  flexGrow: 1,
  height: 900,
});

export const ScrollCol = styled(Box)({
  "@media (max-width: 720px)": {
    width: "100%",
    overflowX: "auto",
  },
});

export const RecentActivitySubmenu = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "12px",
  },
  "& .MuiListItemIcon-root": {
    minWidth: "auto",
  },
  "& .MuiButtonBase-root": {
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: "45px",
    paddingRight: "0",
  },
  "& .MuiListItemText-root": {
    margin: "2px 0",
  },
});

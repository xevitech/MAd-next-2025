import { Box, Typography, styled } from "@mui/material";
export const InviteaFriendContainer = styled("div")({
    background: "#fff",
    boxShadow:
        "0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
    borderRadius: "6px",
    padding: "0 3rem 2rem",
    "@media screen and (max-width:767px)": {
        padding: "2rem 1rem",
    },
});
export const InviteConatainerInner = styled("div")({
});

export const InviteContentBox = styled(Box)({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});
export const InviteImageBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "450px",
    overflow:"hidden",
    "@media screen and (max-width:1600px)": {
        height: "390px",
    },
    "@media screen and (max-width:767px)": {
        height: "300px",
    },
});
export const InviteImageBoxInner = styled(Box)({
    position: "absolute",
    bottom: "-24px",
    height: "100%",
    "@media screen and (max-width:767px)": {
        bottom: 0,
    },
    "& img": {
        width: "600px",
        height: "100%",
        "@media screen and (max-width: 1600px)": {
            width: "500px",
        },
        "@media screen and (max-width: 1280px)": {
            width: "100%",
        },
    },
});
export const InviteTextHeading = styled(Typography)({
    fontSize: "40px",
    color: "#4a4a4a",
    fontWeight: 700,
    "@media screen and (max-width:1600px)": {
        fontSize: "35px",
    },
    "@media screen and (max-width:767px)": {
        fontSize: "25px",
    },
    "& span": {
        color: "#d7282f"
    }
});
export const InviteTextDes = styled(Typography)({
    color: "#4A4A4A",
    fontSize: "16px",
    padding: "0 0 10px",
    "@media screen and (max-width:1600px)": {
        fontSize: "15px",
    },
});
export const InviteListSection = styled(Box)({
    background: "#FAFAFA",
    borderRadius: "8px",
    padding: "16px"
});
export const AvatarContainer = styled(Box)({
    display: "flex",
    alignItems: "center"
});
export const AvatarLabel = styled("div")({
    "& .MuiAvatar-root": {
        width: "50px",
        height: "50px",
        "@media screen and (max-width:767px)": {
            width: "30px",
            height: "30px"
        },
    },

});
export const AvtarText = styled("div")({
    marginLeft: "12px",
    "& .MuiTypography-root": {
        color: "#848484",
        fontSize: "14px",
        "@media screen and (max-width:767px)": {
            fontSize: "12px",
        }
    },
    "& .Invitenamevalue": {
        fontWeight: 600,
        fontSize: "18px",
        color: "#231F20",
        "@media screen and (max-width:1600px)": {
            fontSize: "16px",
        },
        "@media screen and (max-width:767px)": {
            fontSize: "14px",
        }
    },
});
export const InviteListColumn = styled("div")({
    background: "#fbeeee",
    borderRadius: "5px",
    padding: "10px",
    position: "relative",
});
export const ActionButton = styled("div")({
    position: "absolute",
    right: 10,
    top: 10,
    "@media screen and (max-width:767px)": {
        right: 2,
        top: 2,
    },
    "& .MuiButtonBase-root": {
        background: "#FF4951",
        color: "#fff",
        padding: "4px",
        "&:hover":{
            background:"#d7282f"
        },
        "@media screen and (max-width:767px)": {
            padding: "2px",
        },
    },
    "& .MuiSvgIcon-root": {
        fontSize: "17px",
        "@media screen and (max-width:767px)": {
            fontSize: "14px",
        },
    }
});








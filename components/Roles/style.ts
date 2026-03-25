import { Height, Padding } from "@mui/icons-material";
import { Box, Button, Divider, Typography, styled } from "@mui/material";

/********************** Start Styling for Role & permission Page *********************/

export const TitleHeading = styled(Typography)({
  color: "#393939",
  fontSize: "18px",
  fontWeight: 700,
  "@media screen and (max-width:600px)": {
    fontSize: "16px",
  },
  "@media screen and (max-width:320px)": {
    fontSize: "14px",
  },
});
export const SmallTitleHeading = styled(Typography)({
  color: "#393939",
  fontSize: "15px",
  fontWeight: 600,
});

export const AddNewRoleTitle = styled(Button)({
  color: "#d7282f",
  fontSize: "13px",
  cursor: "pointer",
  alignItems: "center",
  display: "flex",
  textTransform: "capitalize",
  border: "1px solid #d7282f",
  borderRadius: "4px",
  transition: "all ease .3s",
  height: "33px",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    border: "1px solid #d7282f",
    color: "#fff",
    backgroundColor: "#d7282f",
    transition: "all ease .3s",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    height: "30px",
  },
  "@media screen and (max-width: 448px)": {
    margin: "10px 0 0 0",
  },
});
export const AddRoleRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media screen and (max-width:767px)": {
    display: 'block',
    gap: "10px",
    margin: "10px 0px 0px 0px ",
  }
});
export const SelectCheckHere = styled(Box)({
  "& .MuiTypography-root": {
    fontSize: "14px",
    color: "#404040",
  },
  ".MuiCheckbox-root": {
    // padding: "0 8px",
    padding: "0 6px 0 14px",
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '" "',
      display: "block",
      width: "1rem",
      height: "1rem",
      border: "1px solid #d2d2d2",
      borderRadius: "4px",
    },
    "&:after": {
      content: '" "',
      display: "inline-block",
      transform: "rotate(45deg)",
      width: "4px",
      height: "8px",
      borderBottom: "2px solid #D7282F",
      borderRight: "2px solid #D7282F",
      position: "absolute",
      top: "3px",
      opacity: "0",
    },
    "&:hover": {
      "&:before": {
        borderColor: "#b1b0b0",
      },
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
export const RollScrollBox = styled(Box)({
  maxHeight: "500px",
  overflowY: "auto",
}); export const SearchAddBox = styled(Box)({
  display: "flex", alignItems: "center",
  gap: "10px",

  "@media screen and (max-width:448px)": {
    display: "block",
    marginTop: "10px",
  }
});
export const ScrollBox = styled(Box)({
  overflowX: "scroll",
});
export const RolePermissionRow = styled(Box)({
  padding: "10px 0",
});


export const RolePermissionOuter = styled(Box)({
  padding: "1rem 2rem 2rem",
  background: "#FFFFFF",
  overflow: "auto",
  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.075)",
  borderRadius: "6px",
  "& .paddingRemove": {
    padding: "0px",
    margin: "0px",
  },
  "@media screen and (max-width:600px)": {
    padding: "12px",
  },
});
export const RoleHeadingSection = styled(Box)({
  padding: "0rem 0 1rem",
  "& .MuiTypography-h4": {
    fontSize: "18px",
    fontWeight: 600,
  },
  "& .MuiTypography-body2": {
    fontSize: "14px",
    color: "#404040",
  },
});
export const RolePermissionInner = styled(Box)({
  padding: "10px 0 10px 0",
});

export const BottomButton = styled(Box)({
  display: "flex",
  gap: "10px",
  margin: "2rem 0 0",
});
export const CommonRedOutineBtn = styled(Button)({
  minWidth: "70px",
  borderRadius: "4px",
  background: "#fff",
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: 600,
  padding: "0 6px",
  textTransform: "capitalize",
  height: "33px",
  boxShadow: "none",
  "& svg": { fontSize: "16px !Important" },
  "&:hover": {
    background: "#D7282F",
    opacity: "85%",
    color: "#fff",
    border: "1px solid transparent",
  },
  "&:hover i::before": {
    color: "#fff",
  },
  "@media screen and (max-width: 900px)": {
    minWidth: "70px",
    padding: "0 3px",
    height: "30px",
  },
});
export const RolePermissionSection = styled(Box)({
  padding: "1rem 0",
  // width:"1500px"
});
export const RolesTableHeading = styled("h3")({
  fontSize: "18px",
});
export const SearchandButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "@media screen and (max-width: 767px)": {
    margin: "10px 0 0 0 ",
  },

});
export const SelectedRoles = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",

});
export const VerticalDivider = styled(Divider)({
  "&.MuiDivider-root": {
    height: "24px",
  },
});
export const RolNameSkl = styled(Box)({
  display: "flex",
  justifyContent: "space-between",

});

/********************** End Styling for Role & permission Page *********************/

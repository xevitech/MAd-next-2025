import { Box, Button, styled, Typography } from "@mui/material";
import { display } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E1E1E1",
  borderRadius: "6px",
  marginTop: "16px",
});

export const Header = styled("div")({
  height: "auto",
  background: "#d9d9d9",
  borderRadius: "6px 6px 0px 0px",
  padding: "10px 16px",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  /* identical to box height, or 150% */
  letterSpacing: "0.09px",
  color: "#000000",
  fontFamily: "open sans",
  marginBottom: "16px",
});

export const TextandButtonGroup = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  gap: "16px",
  padding: "16px",
  alignItems: "center",
  fontWeight: 600,
  cursor: "pointer",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});

export const GroupSpecification = styled(Box)({
  padding: '0 16px',
  '& .MuiCard-root': {
    border: '1px solid #cfcfcf',
    boxShadow: 'none',
    '& .MuiCardHeader-root': {
      paddingLeft: '6px',
      '& .MuiCardHeader-avatar': {
        marginRight: '0px',
        '& .MuiButtonBase-root': {
          padding: '6px',
          '&.Mui-checked': {
            color: '#D7282F',
          },
          '&.MuiCheckbox-indeterminate': {
            color: '#D7282F',
          },
          '& .MuiSvgIcon-root': {
            fontSize: '22px',
          },
        },
      },
      '& .MuiCardHeader-content': {
        '& .MuiCardHeader-title': {
          fontWeight: '600',
        },
        '& .MuiCardHeader-subheader': {
          fontSize: '12px',
        },
      },
    },
    '& .MuiList-root': {
      '& .MuiListItem-root': {
        padding: '0 6px 0',
        '&:hover': {
          backgroundColor: '#FFEEEF',
          '& .DeleteBtn': {
            opacity: '1',
          },
        },
        '& .DeleteBtn': {
          fontSize: '18px',
          color: '#D7282F',
          cursor: 'pointer',
          opacity: '0',
          transition: 'all ease .3s',
        },

        '& .MuiListItemIcon-root': {
          minWidth: 'auto',
          '& .MuiCheckbox-root': {
            padding: '6px',
            '&.Mui-checked': {
              color: '#D7282F',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '22px',
            },
          },
        },
        '& .MuiListItemText-root': {
          margin: '0',
          '& .MuiTypography-root': {
            fontSize: '13px',
          },

        },
      },
    },
  },
  '& .AddBtn': {
    '& .MuiButtonBase-root': {
      height: '36px',
      minWidth: '40px',
    },
  },
});
export const ErrorImage = styled('img')({
  width: "11px",
  height: "11px",
  margin: "0 4px 0 0px",
  "@media screen and (max-width:600px)": {
    width: "9px",
    height: "9px",
  },
});
export const LevelGroupingBox = styled(Box)({
  borderRadius: 6,
  width: '100%',
  margin: '1rem 0',
  border: "1px solid #E1E1E1",
  "& .MuiDataGrid-root": {
    border: "none"
  },
  "& .MuiInputBase-root": {
    height: "33px",
    fontSize: "13px"
  },
  // "& .MuiDataGrid-columnHeaderTitle": {
  //   fontWeight: 600,
  //   fontSize: "14px",
  //   color: "#1A2027",
  //   fontFamily: "Open Sans",
  // },
  "& .MuiDataGrid-cell, .MuiTypography-root": {
    // color: "#000",
    // fontSize: "13px",
    // cursor: "pointer",
    // fontWeight: 500,
    padding: "0 12px !important"
  },
  "& .MuiRadio-root": {
    "& svg": {
      fontSize: "19px"
    }
  },
  "& .MuiCheckbox-root": {
    "& svg": {
      fontSize: "18px"
    }
  },
  "& .MuiDataGrid-main": {
    "& .Mui-checked": {
      color: "#d7282f",
    }
  },
  "& .MuiDataGrid-columnHeaders": {
    background: "#F6F8FB"
  },

  ".MuiCheckbox-root": {
    "&:after": {
      top: "43%",
    },
  },

});
export const GroupButtonBox = styled(Box)({
  display: 'flex', justifyContent: 'flex-end',
  margin: "20px 12px"
});
export const SmallOutlineNewBtn = styled(Button)({
  border: "1px solid #d7282f",
  color: "#d7282f",
  textTransform: "capitalize",
  "&:hover": {
    border: "1px solid #d7282f",
    color: "#fff",
    background: "#d7282f"

  }
});
export const DependsOnHeader = styled('span')({
  color: "#1A2027", fontSize: "14px", fontWeight: 600, fontFamily: "Open Sans", display: "flex", alignItems: "center", gap: "5px"
});
export const AttributeDependency = styled(Typography)({
  color: "#231f20", fontSize: "14px", fontWeight: 400, 
});



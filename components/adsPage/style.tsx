import { ButtonBase, TextField, Typography, Box, Popover,styled } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const Heading = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "30px",
  color: "#231F20",
}));

export const Adsbutton = styled(ButtonBase)(() => ({
  padding: "8px 12px",
  borderRadius: "6px",
  marginTop: "67px",
  backgroundColor: "rgba(215, 40, 47, 0.75)",
  transition: " .5s",
  "&:hover": {
    backgroundColor: "rgba(215, 40, 47, 1)",
    transition: " .5s",
  },
  "@media screen and (max-width:600px)": { margin: "15px 0px" },
}));

export const Adsbuttontext = styled(Typography)(() => ({
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "14px",
  "@media screen and (max-width:600px)": { fontSize: "12px" },
}));

export const SubHeading = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "20px",
  color: "#231F20",
}));

export const Popovertext = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  color: "#000000",
}));

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#D7282F",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D7282F",
    },
  },
});

export const CssTextField2 = styled(TextField)({
  margin: "0px 10px",
  "& label.Mui-focused": {
    color: "#9CE480",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#51C11C",
    },
  },
});

export const CssTextField3 = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FFCE82",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFA319",
    },
  },
});

export const Setyourdates = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "18px",
  color: "#000000",
  marginTop: "10px",
}));

export const SelectWhen = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#4A4A4A",
}));

export const Btn = styled(ButtonBase)(() => ({
  fontWeight: "700",
  fontSize: "12px",
  backgroundColor: "rgba(215, 40, 47, 0.79)",
  color: "#fff",
  padding: "10px",
  borderRadius: "6px",
  float: "right",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "rgba(215, 40, 47, 1)",
    transition: "0.3s",
  },
}));

export const Btn2 = styled(ButtonBase)(() => ({
  fontWeight: "700",
  fontSize: "12px",
  backgroundColor: "#fff",
  color: "#7B7979",
  border: "1px solid #7B7979",
  padding: "10px",
  borderRadius: "6px",
  float: "right",
  transition: "0.3s",
  marginLeft: "15px",
  height: "37px",
  "&:hover": {
    backgroundColor: "rgba(215, 40, 47, 1)",
    color: "#fff",
    transition: "0.3s",
  },
}));

export const Btn3 = styled(ButtonBase)(() => ({
  padding: "0px",
  margin: "0px",
  color: "black",
}));

export const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: 300,
      width: "100%",
      "& .MuiDataGrid-root": {
        flexGrow: 1,
      },
    },
    title: {
      marginBottom: 16,
      fontWeight: 600,
      fontSize: "18px",
    },
  };
});
export const MainPopOver = styled(Box)(() => ({
  height: "800px",
  width: "1133px",
  overflowY: "scroll",
  "@media screen and (max-width:1199px)": {
    height: "800px",
    width: "900px",
  },
  "@media screen and (max-width:900px)": {
    height: "800px",
    width: "600px",
  },
  "@media screen and (max-width:600px)": {
    height: "800px",
    width: "350px",
  },
}));

export const DateTime = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "400",
  color: "rgba(34, 51, 84, 0.5)",
  marginBottom: "10px",
}));

export const Noadsheading = styled(Typography)(() => ({
  fontSize: "25px",
  fontWeight: "700",
  color: "#393939",
  textAlign: "center",
}));

export const Noadstext = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "400",
  color: "#404040",
  textAlign: "center",
}));

export const Noadsimg = styled("img")(() => ({
  textAlign: "center",
}));

export const ThProductListBox = styled(Box)(() => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
}));

export const ThProductName = styled(Typography)(() => ({
  fontSize: "13px",
}));

export const ThProductImage = styled("img")(() => ({
  borderRadius: "50px",
  height: "30px",
  width: "30px",
}));

export const EditIconCSS = styled("span")({
  display: "inline-block",
  cursor: "pointer",
});

export const HeadingAndButton = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
});

export const SetDatesData = styled(Box)({
  boxShadow: "0px 2px 4px 4px rgba(0, 0, 0, 0.075)",
  padding: "10px",
  borderRadius:'6px',
  margin:'-6px 0 0 0',
});

export const CreateAddTable = styled(Box)({
  height: 300, width: "100%",
  marginTop: "22px"
});

export const CreateAddTitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
  padding: 1
});
export const CreateAddInner = styled(Box)({
  marginBottom: "1rem",
 
});

export const BoxSelectAdd = styled(Box)({
  "@media screen and (max-width:600px)": {
    "& .MuiFormControl-root": {
      width: "100%",
      minWidth:"80%"
    }
  }
});

export const CreatAddPopover = styled(Popover)({
  "& .MuiPaper-root": {
    width: "635px",
    boxShadow: "none",
    border: "0.5px solid #D2D2D2",
    borderRadius: "10px 10px 0 0",
    background:"#fff",
    padding: "12px",
    "& .adsshown":{
      border:"1px solid #E1E1E1",
      borderRadius:"6px",
      "& img":{
        width:"100%"
      },
      "& .MuiTypography-root":{
        color:"#000",
        fontSize:"14px",
        fontWeight:600,
        // padding:"0 0 7px"
      }
    },
    "& .adsshownInn":{
      padding:"10px",
    }
  },
});
export const RedTypography = styled(Box)({
  color:"#D7282F",
  // padding:"7px 0 0",
  fontSize:"14px",
  fontWeight:600,
});
export const CreateAddFooter = styled(Box)({

});









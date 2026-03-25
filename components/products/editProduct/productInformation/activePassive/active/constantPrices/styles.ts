import { styled, Button, Box, FormControl } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const OuterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E1E1E1",
  borderRadius: "6px",
  fontFamily: "open sans",
});

export const Header = styled("div")({
  background: "#676474",
  height: "44px",
  padding: "10px 16px",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.09px",
  borderRadius: '6px 6px 0 0',
});

export const FieldsContainer = styled("div")({
  width: "100%",
  padding: "16px",
  paddingTop: "36px",
});

export const SubHeader = styled("div")({
  // width: "100%",
  padding: "16px",
  borderBottom: "1px solid #D2D2D2;",
  marginTop: "8px",
  marginLeft: "16px",
  marginRight: "16px",


});
export const SubHead = styled("div")({
  // width: "100%",
  padding: "16px 0",
  borderBottom: "1px solid #D2D2D2;",
  marginTop: "8px",
  marginLeft: "16px",
  marginRight: "16px",
  fontWeight: 600,
  fontSize: "14px"


});

export const CustomButton = styled(Button)({
  color: "red",
  border: "1px solid red",
  "&:hover": {
    border: "1px solid red",
    backgroundColor: "transparent",
    // color: "white",
  },
});

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: " #F0F3F8",

    // theme.palette.common.black,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FAFAFA",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));



export const ConstantAction = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "7px",
  "& .MuiDivider-root":{
    height:"15px",
    margin:"4px 2px 3px 0px"
  }

});
export const EditFormControl = styled(FormControl)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "& .MuiDivider-root":{
    height:"15px",
    margin:"4px 2px 3px 0px"
  }
 
});


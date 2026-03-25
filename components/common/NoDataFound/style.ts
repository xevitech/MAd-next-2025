import { Box } from "@mui/material";
import { styled } from "@mui/styles";

export const LargeTextContainer = styled("div")({
  fontWeight: "700",
  fontSize: "19px",
  color: "#231F20",
  textAlign: "center",
  margin: "9px 0 7px 0",

});
export const SmallTextContainer = styled("p")(({ value }: any) => ({
  ...value,
  fontWeight: "400",
  fontSize: "15px",
  color: value?.color || "#404040",
  textAlign: "center",
  height:"30px",
  "@media screen and (max-width:480px)":{
    "& br":{
      display:"none"
    }
  }
}));
export const AccountTypemain = styled(Box)(() => ({
  width:"716px",
  height: "576px",
  gap:"20px",
 

}));
export const AccountType = styled(Box)(() => ({
  border:"1px solid #BEBEBE",
  borderRadius:"10px",
  padding:"30px",
  width:"716px",
  height: "174px",
  gap:"30px",
marginTop:"20px"
}));
export const SaleAssistantBox = styled(Box)(() => ({
 display:"flex",
 alignItems:"start",
 gap:"10px",

}));
export const SaleAssistanttxt = styled(Box)(() => ({
fontSize:"16px",
fontWeight:"600",
color:"#231F20",
 marginTop:"10px"
 
 }));
 export const Saletxt = styled(Box)(() => ({
  fontSize:"12px",
  fontWeight:"400",
  color:"#231F20",
  marginTop:"5px"
   
   }));


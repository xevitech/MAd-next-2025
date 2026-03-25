import { styled, Button, Switch, Grid, Input } from "@mui/material";

export const DetailsContainer = styled("div")({
  width: "1080px",
  height: "369px",
  backgroundColor: "#FFFFFF",
  boxShadow:"0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
  borderRadius: "6px",
});

export const DetailsHeader = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  margin: "15px",
  marginBottom: "0px",
  paddingBottom: "10px",
});


export const ContactDetailsText: any = styled("p")(({ breakPoints }: any) => ({
  fontWeight: 600,
  fontSize: breakPoints?.max1920px ? "18px" : "16px",
  lineHeight: breakPoints?.max1920px ? "25px" : "22px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
}));


export const AddMoreButtonContainer: any = styled("span")({
  position: "absolute",
  right: "5px",
  top: "-9px",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  color: "#D7282F",
});
export const AddMoreButton = styled(Button)({
  background: "rgba(215, 40, 47, 0.8)",
  color: "#FFFFFF",
  height: "28px",
  display: "flex",
  marginLeft: "10px",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  borderRadius: "6px",
  flexDirection: "row",
  textTransform: "none",
  "&:hover": {
    background: "rgba(40, 40, 43,01)",
  },
});
export const FieldOuterContainer: any = styled("div")(
  ({ breakPoints, lastOne }: any) => ({
    display: "flex",
    flex: 1,
    minHeight: "5px",
    borderBottom: !lastOne && "1px solid rgba(34,51,84,0.1)",
    marginLeft: "10px",
    fontFamily: "open sans",
  })
);
export const PesronContainer: any = styled("div")({
  display: "flex",
  flexDirection: "row",
  position:"relative",
  zIndex:100
});
export const PersonNameContainer = styled("div")({
  width: "247.34px",
  height: "34px",
  marginLeft: "20px",
  top: "40%",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "21px",
  lineHeight: "29px",
  alignItems: "center",
  position:"relative"
});
export const PersonName = styled("p")({
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "25px",
  display: "flex",
  alignItems: "center",
  color: "#231F20",
  fontFamily: "open sans",
});
export const SwitchButton= styled(Switch)(({ theme }) =>({
 
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
   '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#D7282F' : '',
      },
      '& .MuiSwitch-colorPrimary':{
        color:"#7e7c7c47"
      }
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
    theme.palette.mode === 'dark' ? '#85898d' : "#D7282F",
    boxSizing: 'border-box',
  },
  
}))
export const GridData=styled(Grid)({
width:"314px",
height:"260",
})
export const FloatingEditIcon = styled('div')({
  position: 'absolute',
  left: '16em',
  top: '10px',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: '18px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  cursor: 'pointer',

  color: '#D7282F',
});
export const PencilIcon = styled('span')({
  marginRight: '5px',
  width: '15px',
  height: '12px',
  position: 'relative',
  display: 'flex',
  gap: '10px',
});
export const DeleteIconContainer=styled("span")({
  position: 'relative',
  display: 'flex',
  height:'10px',
   width: '10px',
})
export const FieldContainer: any = styled('div')(
  ({ breakPoints, lastOne }: any) => ({
    display: 'flex',
    flex: 1,
    minHeight: '50px',
    borderBottom: !lastOne && '1px solid rgba(34,51,84,0.1)',
    marginLeft: '10px',
    fontFamily: 'open sans',
  })
);
export const LabelContainer: any = styled('div')(({ breakPoints }: any) => ({
  flex: 0.4,
  fontSize: breakPoints?.max1920px ? '15px' : '13px',
  display: 'flex',
  fontWeight: 400,
  lineHeight: '138.9%',
  color: '#7B7979',
  alignItems: 'center',
  height: '100%',
}));
export const AddMoreDetailsContainer:any=styled('div')(({dataLength}:any)=>({
  position: "absolute",
  left: dataLength.length>0?"70%":"5%",
  zIndex:200,
  background:"white",
  height: "200px",
  top:10
}))
export const InputField=styled(Input)({
  width:"110px",
  right:10
})
export const ButtonContainer=styled("span")({
 position:"absolute",
 left:"70%",
 top:"15rem"
})
export const SaveButton=styled(Button)({
 backgroundColor:"#DD484E",
 color:"white",
 
 '&:hover':{
  backgroundColor:"#e06f74",
 }
})
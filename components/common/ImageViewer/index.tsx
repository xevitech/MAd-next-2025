import React from "react";
import { Dialog, Divider, Button } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  HeaderContainer,
  TitleContainer,
  ImageStyle,
} from "@/components/common/ImageViewer/style";
import Image from "next/image";
import { makeStyles } from 'tss-react/mui';
const useStyles = makeStyles()((theme) => {
  return {
  popcontainer: {
    width: '500px',
    height: '400px',
    "@media screen and (max-width: 768px)": {
      width: "100%", height:"300px"
    },
  },
  imagepopup: {width:"100%",
  maxWidth:"100%",
  height:"90%",
  objectFit:"contain"}
}
});

const ImageViewer = ({ handleClose, open, src ,filterName=null}) => {

const {classes} = useStyles();
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={classes.popcontainer} style={{ padding: "16px" }}>
        <HeaderContainer  style={{minHeight:'14px'}}>
          <TitleContainer>{filterName}</TitleContainer>
          <Button
            onClick={handleClose}
            color="error"
            style={{
              minHeight: "40px",
              minWidth: "40px",
              borderRadius: "50%",
              position: "absolute",
              top: "4px",
              right: "11px",
            }}
          >
            <CloseOutlinedIcon style={{ cursor: "pointer" }} />
          </Button>
        </HeaderContainer>
        <Divider />
          <Image src={src} alt="image viewer" width={400} height={500} style={ImageStyle} className={classes.imagepopup}/>
      </div>
    </Dialog>
  );
};

export default ImageViewer;

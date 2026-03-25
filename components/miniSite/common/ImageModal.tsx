import React from "react";
import { Box, Dialog } from "@mui/material";
import {
  CertificateModalImg,
  CertificateTitle,
  CertificateSlider,
} from "@/components/miniSite/styled";
import { makeStyles } from "tss-react/mui";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles()((theme) => {
  return {
    imageouter: {
      width: "100%",
      height: "450px",
      margin: "0 auto",
      paddingBottom: "15px !important",
    },
  };
});

export default function ImageModal({ open, handleClose, allData }) {
  const { classes } = useStyles();
  return (
    <Dialog
      fullWidth
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <CertificateModalImg>
        <CertificateSlider>
          <Carousel
            navButtonsAlwaysInvisible={allData?.length == 1 ? true : false}
            cycleNavigation={true}
            indicators={false}
            duration={500}
            swipe={true}
            animation="fade"
            navButtonsProps={{
              style: {
                backgroundColor: "black",
                borderRadius: 6,
                color: "white",
              },
            }}
          >
            {allData?.map((image, i) => (
              <Box
                textAlign="center"
                p={2}
                pb={0}
                key={i}
                className={classes.imageouter}
              >
                <img
                  style={{
                    width: "100%",
                    height: "90%",
                    maxWidth: "auto",
                    border: "1px solid #999999",
                    objectFit: "contain",
                  }}
                  src={image.source}
                  alt={image.file_original_name}
                />
                <CertificateTitle
                  paddingY={2}
                  color="black"
                  fontSize="14px"
                  fontWeight={600}
                >
                  {image?.file_original_name}
                </CertificateTitle>
              </Box>
            ))}
          </Carousel>
        </CertificateSlider>
      </CertificateModalImg>
    </Dialog>
  );
}

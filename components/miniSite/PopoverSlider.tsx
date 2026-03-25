import { Box, width } from "@mui/system";
import React from "react";
import { CertificateTitle, CertificateSlider } from "./styled";
import Carousel from "react-material-ui-carousel";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog, Slide, styled } from "@mui/material";
import { isImageFile } from "../common/common";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Image from "next/image";
export const Imageouter = styled(Box)(() => ({
  width: "100%",
  height: "450px",
  margin: "0 auto",
  paddingBottom: "15px !important",
  "@media screen and (max-width:767px)": {
    height: "350px",
  },
}));

export default function PopoverSlider({
  activedata,
  open,
  handleClose,
  allData = null,
  images,
  rowData,
}: any) {
  const Transition = React.forwardRef(function Transition(
    props: any,
    ref: any
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const ViewFile = async (image) => {
    window.open(image?.source);
  };

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-container": {
            "& .MuiDialog-paper": { width: "100%" },
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "8px 8px 8px 0",
          }}
          onClick={handleClose}
        >
          <CloseOutlinedIcon sx={{ cursor: "pointer", color: "#d7282f" }} />
        </Box>
        <CertificateSlider>
          <Carousel
            cycleNavigation={true}
            indicators={false}
            navButtonsAlwaysVisible={true}
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
            navButtonsAlwaysInvisible={
              activedata?.images.length == 1 ? true : false
            }
          >
            {activedata?.images?.map((image, i) => (
              <Imageouter
                textAlign="center"
                pb={0}
                key={i}
                style={{ padding: "0px 16px 16px 16px" }}
              >
                {isImageFile(image?.file_original_name) ||
                !image?.file_original_name ? (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      maxWidth: "auto",
                      border: "1px solid #999999",
                      objectFit: "contain",
                    }}
                    src={image.source}
                    alt={image.name}
                  />
                ) : (
                  <Box
                    sx={{
                      maxWidth: "auto",
                      width: "100%",
                      height: "90%",
                      objectFit: "contain",
                    }}
                  >
                    {" "}
                    <Image
                      style={{ marginTop: "150px" }}
                      src={"/assets/fileIcon.svg"}
                      width={80}
                      height={80}
                      alt="edit"
                    />
                    <CloudDownloadIcon
                      sx={{ width: "100%", height: "10%", cursor: "pointer" }}
                      onClick={() => ViewFile(image)}
                    />
                  </Box>
                )}
                <CertificateTitle
                  paddingY={2}
                  color="black"
                  fontSize="14px"
                  fontWeight={600}
                >
                  {rowData?.name}
                </CertificateTitle>
              </Imageouter>
            ))}
          </Carousel>
        </CertificateSlider>
      </Dialog>
    </>
  );
}

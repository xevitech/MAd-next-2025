import React, { useState, useEffect} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Tab, Tabs } from "@mui/material";
import { GetFileExtension } from "@/components/common/common";
import { Carousel } from "react-responsive-carousel";
import VideoPlayer from "@/components/common/videoplayer";
import {
  ArrowContainer,
  RightImageContainer,
  ModalHeaderContainer,
  ModalImageContainer,
  CrossIconContainer,
  ModalHeader,
  ImagemodalstyleDialog,
} from "@/components/ProductDetail/ProductComponents/Carousals/Style";
import Image from "next/image";

const ImageModal = ({ open, handleClose, images }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    let element: any = document.getElementById(`images${imageIndex}`);
    element?.scrollIntoViewIfNeeded(false);
  }, [imageIndex]);

  return (
    <ImagemodalstyleDialog
    sx={{"& .MuiPaper-root":{
      maxWidth:'600px',width:'600px',}
    }}
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <ModalHeader>
        <ModalHeaderContainer>
          <Box
            className="imagmodal"
            style={{
              backgroundColor: "white",
              minWidth: "100%",
            }}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={(e, v) => setValue(v)}
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Product Images" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <CrossIconContainer>
            <CloseOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </CrossIconContainer>
        </ModalHeaderContainer>

        <ModalImageContainer>
          <RightImageContainer>
            <Carousel
              selectedItem={imageIndex}
              onChange={(i) => setImageIndex(i)}
              showThumbs={false}
              showArrows={true}
              showStatus={false}
              showIndicators={false}
              swipeable={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <ArrowContainer
                  style={{ position: 'absolute', top: '50%', left: '5px', zIndex: 1, transform: 'translateY(-50%)' }}
                    className="c-arrow"
                    position="left"
                    onClick={() => {
                      setImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      );
                    }}
                  >
                    <Image
                      height={40}
                      width={40}
                      alt="Arrow"
                      src="/assets/arrow-left-circle.svg"
                    />
                  </ArrowContainer>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <ArrowContainer
                  style={{ position: 'absolute', top: '50%', right: '5px', zIndex: 1, transform: 'translateY(-50%)' }}
                    className="c-arrow"
                    position="right"
                    onClick={() => {
                      setImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      );
                    }}
                  >
                    <Image
                      height={40}
                      width={40}
                      alt="Arrow"
                      src="/assets/arrow-right-circle.svg"
                    />
                  </ArrowContainer>
                )
              }
            >
              {images.map((v, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      "& img": {
                        height: "400px",
                        "@media (max-width: 767px)": {
                          height: "200px",
                        },
                        width: "100% !important",
                        objectFit: "contain",
                      },
                    }}
                  >
                    {["png", "jpg", "jpeg", "webp", "gif"].includes(
                      GetFileExtension(images[imageIndex].src)
                    ) ? (
                      <Image
                        src={v.src}
                        height={500}
                        width={600}
                        alt={v?.alt_tag ?? "image"}
                        style={{ borderRadius: "6px" }}
                      />
                    ) : (
                      <VideoPlayer src={v} />
                    )}
                  </Box>
                );
              })}
            </Carousel>
          </RightImageContainer>
        </ModalImageContainer>
      </ModalHeader>
    </ImagemodalstyleDialog>
  );
};

export default ImageModal;

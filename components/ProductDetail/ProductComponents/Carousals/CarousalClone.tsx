import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import {
  MagnifyImagebox,
  WebCarousalContainer,
  CarousalSliderContainer,
} from "@/components/ProductDetail/ProductComponents/Carousals/Style";
import ImageModal from "@/components/ProductDetail/ProductComponents/Carousals/ImageModal";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import { Box, Grid, Stack } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "tss-react/mui";
import { ZoomIcon } from "./Style";
import { useSelector } from "react-redux";
import { FeatureImage } from "@/components/common/common";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const useStyles = makeStyles()((theme) => {
  return {
    ThumbnailStyle: {
      borderRadius: "6px 0px 0px 6px",
      backgroundColor: "rgba(232, 232, 232, .2)",
      border: "1px solid rgba(215, 215, 215, .5)",
    },

    smallimgcontainer: {
      background: "#fff",
      boxShadow:
        "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
      borderRadius: "6px",
      padding: "12px 0",
    },
  };
});

function WebCarousal() {
  const { classes } = useStyles();
  const [index, setIndex] = useState<number>(0);
  const [toggleModal, setModal] = useState<boolean>(false);
  const [productImage, setProductImages] = useState<any>([]);
  const { photos, variation_options } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );

  const sliderRef = useRef<any>();
  // Slider is slow due to image loading when image change it fetch image from server

  const GettingImagesurl = () => {
    let index = productConfig.map((v) => {
      return variation_options.map((value) => {
        if (value.id == v.parentID) {
          return value.parents.map((parent) => {
            if (parent.id == v.value) {
              return parent.imageslist;
            }
          });
        }
      });
    });
    let imageList = index
      .flat()
      .flat()
      .flat()
      .filter((v) => v);
    setProductImages(imageList);
  };

  useEffect(() => {
    GettingImagesurl();
  }, [productConfig]);

  let image =
    productImage.length > 0
      ? productImage.map((v) => ({ src: v, alt_tag: "" }))
      : FeatureImage(photos)?.map((v) => ({
          src: v.file_name,
          alt_tag: v.alt_tag,
        })) ?? [];

  const [selectedImage, setSelectedImage] = useState([]);
  const [coverting, setConverting] = useState(true);

  const downloadAndSaveImage = (imageUrl, storageKey) => {
    setConverting(true);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          setSelectedImage((prev) => [...prev, base64data]);
          setConverting(false);
        };
      });
  };

  useEffect(() => {
    for (let i = 0; i < image.length; i++) {
      downloadAndSaveImage(image[i], null);
    }
  }, [image.length]);

  const showSlide = image.length >= 5 ? 5 : image.length;

  const settings = {
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: 1,
    variableWidth: true,
    className: "slideThumbs",
    centerMode: true,
    vertical: true,
    infinite: true,
    verticalSwiping: true,
    centerPadding: 0,
    swipeToSlide: true,
    beforeChange: (current, next) => setIndex(next),
    afterChange: (current, next) => setIndex(current),
    adaptiveHeight: false,
  };

  return (
    <>
      <Grid
        container
        alignItems={{ md: "stretch" }}
        spacing={{ xs: 0 }}
        flexGrow={1}
      >
        {toggleModal && (
          <ImageModal
            images={image}
            open={toggleModal}
            handleClose={() => setModal(false)}
          />
        )}
        <Grid item xs>
          <WebCarousalContainer>
            <CarousalSliderContainer>
              {image.length >= 6 && (
                <ExpandLessOutlinedIcon
                  onClick={() => sliderRef?.current?.slickPrev()}
                />
              )}
              <Slider {...settings} ref={sliderRef}>
                {image.map((v, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      cursor: "pointer",
                      "& img:hover": {
                        borderColor: "#d7282f !important",
                      },
                    }}
                    onClick={() => setIndex(i)}
                  >
                    <img
                      src={v.src}
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "fill",
                        border: "1px solid #CACACA",
                        borderRadius: "4px",
                        padding: "2px",
                        transition: "all ease .3s",
                      }}
                    />
                  </Box>
                ))}
              </Slider>
              {image.length >= 6 && (
                <ExpandMoreOutlinedIcon
                  onClick={() => sliderRef?.current?.slickNext()}
                />
              )}
            </CarousalSliderContainer>
            <div style={{ width: "100%" }}>
              <Stack
                justifyContent={{ xs: "center" }}
                alignItems={{ xs: "center" }}
                height="100%"
                style={{
                  background: "white",
                  borderRadius: "0 6px 6px 0",
                  position: "relative",
                  borderLeft: "0",
                  width: "100%",
                }}
              >
                <MagnifyImagebox className="magnify_box">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        src:
                          image.length !== 0
                            ? image[index].src
                            : "/assets/NoImage.svg",
                        alt: image?.[index]?.alt_tag,
                        isFluidWidth: true,
                      },
                      largeImage: {
                        src:
                          image.length !== 0
                            ? image[index].src
                            : "/assets/NoImage.svg",
                        width: 1200,
                        height: 1000,
                        alt: image?.[index]?.alt_tag,
                      },
                      imageStyle: {
                        borderRadius: "6px",
                      },
                      style: {
                        zIndex: 100,
                      },
                      enlargedImageContainerStyle: {
                        zIndex: "101!important",
                      },
                      lensStyle: {
                        backgroundColor: "rgba(0,0,0,.6)",
                        height: "auto",
                      },
                      shouldUsePositiveSpaceLens: true,
                      enlargedImageStyle: {
                        background: "#FFFFFF",
                      },
                    }}
                    hoverDelayInMs={0}
                    hoverOffDelayInMs={10}
                    fadeDurationInMs={10}
                    cursorStyle="zoom-in"
                  />
                </MagnifyImagebox>
                  {image.length > 0 && (
                    <ZoomIcon>
                      <ZoomOutMapOutlinedIcon onClick={() => setModal(true)} />
                    </ZoomIcon>
                  )}
               
              </Stack>
            </div>
          </WebCarousalContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default WebCarousal;

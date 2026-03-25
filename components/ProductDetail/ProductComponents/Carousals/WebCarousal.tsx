import React, { useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import {
  MagnifyImagebox,
  WebCarousalContainer,
  MobileAutoSlider,
  VideoOuterBox,
} from "@/components/ProductDetail/ProductComponents/Carousals/Style";
import ImageModal from "@/components/ProductDetail/ProductComponents/Carousals/ImageModal";
import ZoomOutMapOutlinedIcon from "@mui/icons-material/ZoomOutMapOutlined";
import { Box, Grid, IconButton, Link, Stack } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "tss-react/mui";
import { ZoomIcon } from "./Style";
import { useSelector } from "react-redux";
import { FeatureImage } from "@/components/common/common";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { SocialIconsDetailPage } from "../Style";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useRouter } from "next/router";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
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
  const [videoData, setVideoData] = useState<any>({ show: false });
  const { photos, variation_options, video_id } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );
  const isVideoAvailable = video_id?.length > 0 ? true : false;
  const { name } = useSelector((state: any) => state.productDetail.detail.data);
  useEffect(() => {
    if (video_id?.length > 0) {
      setVideoData({ show: true, data: video_id[0] });
    }
  }, [video_id]);

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

  const files = [
    ...(video_id?.map((vid) => ({ ...vid, isVideo: true })) ?? []),
    ...image,
  ];
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

  const showSlide = files.length > 6 ? 6 : files.length;
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: files.length > 6 ? 6 : files.length,
    initialSlide: 0,
    autoplay: true,
    arrows: true,
    beforeChange: (current, next) => setIndex(next),
    afterChange: (current, next) => setIndex(current),
    prevArrow: <KeyboardArrowLeftOutlinedIcon className="prevArrow" />,
    nextArrow: <KeyboardArrowRightOutlinedIcon className="nextArrow" />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: files.length >= 4 ? 4 : files.length,
          slidesToScroll: files.length >= 4 ? 4 : files.length,
          infinite: false,
          dots: false,
          beforeChange: (current, next) => setIndex(next),
          afterChange: (current, next) => setIndex(current),
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: files.length >= 4 ? 4 : files.length,
          slidesToScroll: files.length >= 4 ? 4 : files.length,
          infinite: false,
          dots: false,
          beforeChange: (current, next) => setIndex(next),
          afterChange: (current, next) => setIndex(current),
        },
      },
    ],
  };
  var settingsmobile = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: showSlide,
    slidesToScroll: files.length > 6 ? 6 : files.length,
    initialSlide: 0,
    autoplay: false,
    arrows: false,
    beforeChange: (current, next) => setIndex(next),
    afterChange: (current, next) => setIndex(current),
    prevArrow: <img src="/assets/arrowLeft.svg" alt="" className="prevArrow" />,
    nextArrow: (
      <img src="/assets/arrowRight.svg" alt="" className="nextArrow" />
    ),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: files.length >= 1 ? 1 : files.length,
          slidesToScroll: files.length >= 1 ? 1 : files.length,
          initialSlide: 1,
          beforeChange: (current, next) => setIndex(next),
          afterChange: (current, next) => setIndex(current),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          beforeChange: (current, next) => setIndex(next),
          afterChange: (current, next) => setIndex(current),
        },
      },
    ],
  };
  const router = useRouter();
  const urlpath = `https://www.merchantad.com/${router?.asPath}`;
  const sharerNavigationHandler = (link: any) => {
    window.open(`${link}${urlpath}`);
  };

  return (
    <>
      <Grid
        sx={{ marginTop: "0 !important" }}
        container
        alignItems={{ md: "stretch" }}
        spacing={{ xs: 0 }}
        flexGrow={1}
        data-tracking="product-image-click"
      >
        {toggleModal && (
          <ImageModal
            images={image}
            open={toggleModal}
            handleClose={() => setModal(false)}
          />
        )}
        <Grid item xs>
          {!videoData?.show ? (
            <WebCarousalContainer>
              <div style={{ width: "100%" }}>
                <Stack
                  justifyContent={{ xs: "center" }}
                  alignItems={{ xs: "center" }}
                  height="100%"
                  style={{
                    background: "white",
                    position: "relative",
                    borderLeft: "0",
                    width: "100%",
                    border: "1px solid #e5e5e5",
                  }}
                >
                  <MagnifyImagebox className="magnify_box">
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          src:
                            image.length !== 0
                              ? image[isVideoAvailable ? index - 1 : index]?.src
                              : "/assets/NoImage.svg",
                          // alt: image?.[index]?.alt_tag,
                          alt:
                            image?.[isVideoAvailable ? index - 1 : index]?.alt_tag !== ""
                              ? image?.[isVideoAvailable ? index - 1 : index]?.alt_tag
                              : name,

                          isFluidWidth: true,
                        },
                        largeImage: {
                          src:
                            image.length !== 0
                              ? image[isVideoAvailable ? index - 1 : index]?.src
                              : "/assets/NoImage.svg",
                          width: 1200,
                          height: 1000,
                          alt:
                            image?.[isVideoAvailable ? index - 1 : index]?.alt_tag !== ""
                              ? image?.[isVideoAvailable ? index - 1 : index]?.alt_tag
                              : name,
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
          ) : (
            <VideoOuterBox className="magnify_box forbigscreenonly">
              <video
                src={video_id[0]?.source}
                width="100%"
                height="100%"
                controls
                style={{}}
              />
            </VideoOuterBox>
          )}
          <MobileAutoSlider>
            {files.length >= 1 && (
              <Slider {...settingsmobile} ref={sliderRef}>
                {files.map((v, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      cursor: "pointer",
                      border: "1px solid rgb(229, 229, 229)",
                      borderRadius: "4px",
                    }}
                    onMouseEnter={() => setIndex(i)}
                  >
                    {/* <img
                      src={v.src}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "contain",
                        padding: "2px",
                        transition: "all ease .3s",
                      }}
                    /> */}
                    {!v.isVideo ? (
                      <img
                        src={v.src}
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "contain",
                          padding: "2px",
                          transition: "all ease .3s",
                        }}
                      />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <video
                          src={v?.source}
                          width="100%"
                          height="250px"
                          controls
                          style={{ borderRadius: "6px", objectFit: "contain" }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Slider>
            )}
          </MobileAutoSlider>
          {/* AutoSlider End for Mobile */}
          <Box
            sx={{
              position: "relative",
              padding: "0 15px",
              margin: "9px 6px",
              "& .slick-slider": {
                "& .slick-list": {
                  minWidth: "200px",
                },
              },
              "& .MuiSvgIcon-root": {
                position: "absolute",
                top: "50%",
                color: "#231F20",
                transform: "translate(0 , -50%)",
                cursor: "pointer",
                "&.prevArrow": {
                  left: "4px !important",
                },
                "&.nextArrow": {
                  right: "4px",
                },
              },
              "& .slick-track": {
                display: "flex",
                gap: "10px",
                justifyContent: image.length >= 6 ? "flex-start" : "center",
                "& .slick-slide > div": {
                  display: "flex",
                },
              },
              "& .slick-slide": {
                width: "80px !important",
                "@media (max-width:900px)": {
                  width: "100% !important",
                },
              },
              "& .slick-prev:before, .slick-next:before": {
                color: "#231F20",
              },
              "& .slick-disabled": {
                opacity: ".25",
              },
              "@media (max-width:600px)": {
                display: "none",
              },
            }}
          >
            {files.length > 1 && (
              <Slider {...settings} ref={sliderRef}>
                {files.map((v, i) => (
                  <Box
                    data-tracking="product-image-click"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      cursor: "pointer",
                      border: `1px solid ${
                        i == index || (videoData?.show && v?.isVideo)
                          ? "#c62828"
                          : "#CACACA"
                      } !important`,
                      borderRadius: "4px",
                      "& img": {
                        "@media (max-width:1024px)": {
                          height: "40px !important",
                        },
                        "@media (max-width:900px)": {
                          height: "52px !important",
                        },
                      },
                      "& video": {
                        "@media (max-width:1024px)": {
                          height: "40px !important",
                        },
                        "@media (max-width:900px)": {
                          height: "52px !important",
                        },
                      },
                    }}
                    onMouseEnter={() => {
                      if (v.isVideo) {
                        setIndex(-1);
                        setVideoData({ show: true, data: v });
                      } else {
                        setVideoData({ show: false, data: [] });
                        setIndex(i);
                      }
                    }}
                  >
                    {!v.isVideo ? (
                      <img
                        data-tracking="product-image-click"
                        src={v.src}
                        style={{
                          width: "100%",
                          height: "49.8px",
                          objectFit: "contain",
                          padding: "2px",
                          transition: "all ease .3s",
                        }}
                      />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <video
                          src={v?.source}
                          width="100%"
                          height="49.8px"
                          // controls
                          data-tracking="product-image-click"
                          style={{ borderRadius: "6px", objectFit: "contain" }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Slider>
            )}
          </Box>
        </Grid>
      </Grid>
      <SocialIconsDetailPage>
        <Grid container spacing={0.5}>
          <Grid item data-tracking="social-sharing">
            <IconButton
              style={{ cursor: "default" }}
              data-tracking="social-sharing"
            >
              <ShareOutlinedIcon
                style={{ color: "#5C5C5C" }}
                data-tracking="social-sharing"
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href="https://www.facebook.com/powercozmo.epg"
              target="_blank"
            >
              <LightTooltip
                placement="top"
                title="Facebook"
                arrow
                disableInteractive
                data-tracking="facebook-social-sharing"
              >
                <FacebookIcon
                  style={{ color: "#3b5998" }}
                  data-tracking="facebook-social-sharing"
                  // onClick={(e) =>
                  //   sharerNavigationHandler(
                  //     "https://www.facebook.com/sharer/sharer.php?u="
                  //   )
                  // }
                />
              </LightTooltip>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton href="https://twitter.com/powercozmo" target="_blank">
              <LightTooltip
                placement="top"
                title="X(Twitter)"
                arrow
                disableInteractive
                data-tracking="twitter-social-sharing"
              >
                <i
                  className="icon-x-social"
                  data-tracking="twitter-social-sharing"
                  onClick={(e) =>
                    sharerNavigationHandler(
                      "https://twitter.com/intent/tweet?url="
                    )
                  }
                ></i>
              </LightTooltip>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              href="https://www.instagram.com/powercozmo/"
              target="_blank"
              data-tracking="instagram-social-sharing"
            >
              <LightTooltip
                placement="top"
                title="Instagram"
                arrow
                disableInteractive
                data-tracking="instagram-social-sharing"
              >
                <InstagramIcon
                  style={{ color: "#c13584" }}
                  data-tracking="instagram-social-sharing"
                  onClick={(e) =>
                    sharerNavigationHandler("https://www.instagram.com?url=")
                  }
                />
              </LightTooltip>
            </IconButton>
          </Grid>
        </Grid>
      </SocialIconsDetailPage>
    </>
  );
}

export default WebCarousal;

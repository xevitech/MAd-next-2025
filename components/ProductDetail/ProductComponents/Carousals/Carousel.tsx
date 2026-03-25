import { styled } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FeatureImage } from "@/components/common/common";
import { Box } from "@mui/material";

export default function CustomCarousel() {
  const [productImage, setProductImages] = useState<any>([]);
  const { photos, variation_options } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const { productConfig }: any = useSelector(
    (state: any) => state.productDetail
  );

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

  const ArrowContainer = styled("div")(({ position }: any) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    position: "absolute",
    zIndex: 10,
    top: "calc(50% - 15px)",
    cursor: "pointer",
    background: "#424242",
    [position]: 0,
    opacity: 0.3,
    "@media (max-width: 400px)": {
      backgroundColor:'#ffffff',
      opacity:'.8',
      [position]: 16,
      border:'1px solid #dddddd',
    },
  }));

  return (
    <Carousel
      autoPlay={true}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev) =>
        hasPrev && (
          <ArrowContainer position="left" onClick={onClickHandler}>
            <ArrowBackIosNewOutlinedIcon 
              sx={{ 
                color: "white", 
                fontSize:'14px', 
                position:'relative', 
                left:'0px', 
                "@media (max-width: 400px)": {
                  color:'#000000',
                }, 
                }} 
            />
          </ArrowContainer>
        )
      }
      renderArrowNext={(onClickHandler, hasNext) =>
        hasNext && (
          <ArrowContainer position="right" onClick={onClickHandler}>
            <ArrowForwardIosOutlinedIcon 
              sx={{ 
                color: "white", 
                fontSize:'14px', 
                position:'relative', 
                right:'-1px',
                  "@media (max-width: 400px)": {
                    color:'#000000',
                  }, 
                }} 
            />
          </ArrowContainer>
        )
      }
    >
      {image.map((src, i) => (
        <div key={i}>
          <Box
            sx={{
              '& img':{
                width: "auto !important",
                objectFit: "contain",
                borderRadius: "6px",
                "@media (max-width: 900px)": {
                  height:'260px',
                },
                "@media (max-width: 400px)": {
                  height:'200px',
                },
              },
            }}
          >
            <Image
              height={410}
              width={510}
              alt={src?.alt_tag ?? "image"}
              src={src.src}
            />
          </Box>
        </div>
      ))}
    </Carousel>
  );
}

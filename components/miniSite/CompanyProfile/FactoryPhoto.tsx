import CPheader from "./CPheaderComponent";
import { Box, IconButton, Skeleton, Stack } from "@mui/material";
import {
  ServiceTitle,
  ImageThumbBox,
  SingleSlideImage,
  SingleSlideBoxx,
} from "./CompanyProfile.styled";
import Slider from "react-slick";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import router from "next/router";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import { ShortStack } from "../styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ImageModal from "../common/ImageModal";
import { useSelector } from "react-redux";
export default function FactoryPhoto({ loader, factory_photos }) {
  const NavigateHandler = (route) => router.push(route);
  const slider = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState([]);

  const handleClickOpen = (image, index) => {
    let newImageArray = [...factory_photos];
    let firstItems = newImageArray.slice(0, index);
    let endItems = newImageArray.slice(index);
    newImageArray.unshift(image);
    setSelectedImage([...endItems, ...firstItems]);
    setOpen(true);
  };
  const [loading, setLoader] = useState<boolean>(false);
  const handleClose = (a: any, b: any) => {
    setOpen(false);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: factory_photos.length > 1 ? 3 : 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: factory_photos.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: factory_photos.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);

  return (
    <Box className="cslidercontainer">
      <Box mb={{ xs: 1 }}>
        <Stack
          pb={1}
          pr={1.5}
          spacing={1}
          direction={{ xs: "row" }}
          justifyContent={{ xs: "space-between" }}
          alignItems={{ xs: "center" }}
          sx={{ position: "relative" }}
        >
          <CPheader icon="icon-factory_photos" title="Factory Photos " />

          {factory_photos?.length > 4 && (
            <ShortStack
              direction={{ xs: "row" }}
              justifyContent={{ xs: "space-between" }}
              alignItems={{ xs: "center" }}
              sx={{ position: "absolute", right: "0px" }}
            >
              <IconButton
                onClick={() => slider?.current?.slickPrev()}
                size="medium"
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                onClick={() => slider?.current?.slickNext()}
                size="medium"
              >
                <ArrowForwardIosIcon
                  style={{ position: "relative", left: "-2px" }}
                />
              </IconButton>
            </ShortStack>
          )}
        </Stack>
      </Box>
      <Box>
        <>
          {factory_photos.length >= 1 ? (
            <Slider ref={slider} {...settings}>
              {factory_photos?.map((image, i) => (
                <Box
                  key={i}
                  pr={2}
                  pb={0}
                  onClick={() => handleClickOpen(image, i)}
                >
                  <ImageThumbBox>
                    <img src={image.source} alt={image.source} />
                  </ImageThumbBox>
                  <Box paddingY={{ xs: 1 }}>
                    <ServiceTitle>
                      {capitalizeFirstLetter(image.file_original_name)}
                    </ServiceTitle>
                  </Box>
                </Box>
              ))}
            </Slider>
          ) : (
           
            ""
          )}
          {factory_photos?.length === 0 && (
            <EmptyPage
              text={"factory Photos"}
              onClickHandler={() =>
                NavigateHandler("/companySettings/companyDetails?tab=factory")
              }
              actiontext={userid !== minisiteUserID ? false : true}
              logo="/assets/EmptyCompany.png"
            />
          )}
          {open && (
            <ImageModal
              handleClose={handleClose}
              open={open}
              allData={selectedImage}
            />
          )}
        </>
      </Box>
     
    </Box>

  );
}

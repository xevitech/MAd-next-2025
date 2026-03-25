import CPheader from "./CPheaderComponent";
import { Box, IconButton, Skeleton, Stack } from "@mui/material";
import {
  CPlable,
  ServiceTitle,
  ImageThumbBox,
  SingleSlideImage,
  SingleSlideBoxx,
} from "./CompanyProfile.styled";
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import { ShortStack } from "../styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ImageModal from "../common/ImageModal";
import { useSelector } from "react-redux";
export default function ProjectPhoto({ loader, factorydetails }) {
  const project_photos = factorydetails ?? [];
  const slider = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleClickOpen = (image, index) => {
    let newImageArray = [...project_photos];
    let firstItems = newImageArray.slice(0, index);
    let endItems = newImageArray.slice(index);
    newImageArray.unshift(image);
    setSelectedImage([...endItems, ...firstItems]);
    setOpen(true);
  };
  const handleClose = (a: any, b: any) => {
    setOpen(false);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
  const NavigateHandler = (route) => router.push(route);
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
        >
          {/* <CPheader icon="/assets/cpicon16.svg" title="Project Photos" /> */}
          <CPheader icon="icon-project_photos" title="Project Photos" />
          {project_photos?.length > 4 && (
            <ShortStack
              direction={{ xs: "row" }}
              justifyContent={{ xs: "space-between" }}
              alignItems={{ xs: "center" }}
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
                <ArrowForwardIosIcon />
              </IconButton>
            </ShortStack>
          )}
        </Stack>
      </Box>
      <Box>
        {project_photos.length >= 1 ? (
          <Slider ref={slider} {...settings}>
            {project_photos?.map((image, i) => (
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
                <CPlable txtColour="#4A4A4A">{image.description}</CPlable>
              </Box>
            ))}
          </Slider>
        ) : (
          // project_photos.length == 1 && (
          //   <SingleSlideBoxx
          //     pr={2}
          //     pb={0}
          //     onClick={() => handleClickOpen(project_photos?.[0], 0)}
          //   >
          //     <SingleSlideImage>
          //       <img
          //         src={project_photos[0]?.source}
          //         alt={project_photos[0]?.source}
          //       />
          //     </SingleSlideImage>
          //     <Box paddingY={{ xs: 1 }}>
          //       <ServiceTitle>
          //         {capitalizeFirstLetter(project_photos[0]?.file_original_name)}
          //       </ServiceTitle>
          //     </Box>
          //   </SingleSlideBoxx>
          // )
          ""
        )}
        {project_photos?.length === 0 && (
          <EmptyPage
            text={"project photos"}
            onClickHandler={() =>
              NavigateHandler("/companySettings/companyDetails?tab=company")
            }
            actiontext={userid !== minisiteUserID ? false : true}
            logo="/assets/projectPhoto.svg"
          />
        )}
        {open && (
          <ImageModal
            handleClose={handleClose}
            open={open}
            allData={selectedImage}
          />
        )}
      </Box>
      {/* <Slider ref={slider} {...settings}>
            {project_photos?.map((image, i) => (
              <Box
              key={i}
              pr={2}
              pb={0}
              onClick={() => handleClickOpen(image, i)}
            >
              <ImageThumbBox>
              <Skeleton variant="rounded" width={310} height={200} />
              </ImageThumbBox>
              <Box paddingY={{ xs: 1 }}>
                <ServiceTitle>
                <Skeleton variant="text" width={120} sx={{margin:"0 auto"}}/>
                </ServiceTitle>
              </Box>
            </Box>
            ))}
          </Slider> */}
    </Box>
  );
}

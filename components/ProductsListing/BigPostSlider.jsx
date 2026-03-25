import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Stack } from "@mui/system";
import Slider from "react-slick";
import { styled } from "@mui/styles";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slideImages = [
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 1",
  },
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 2",
  },
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 3",
  },
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 4",
  },
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 5",
  },
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 6",
  },
  {
    url: "https://picsum.photos/899/638.jpg",
    caption: "Slide 7",
  },
];

const Slides = ({ slide }) => {
  return (
    <Box
      style={{
        height: "697px",
        width: "100%",
        backgroundImage: `url(${slide})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></Box>
  );
};

const BigPostSlider = ({ itemdata }) => {
  const photos = itemdata?.photos;

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const ArrowContainer = styled("div")(({ position }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    width: "50px",
    borderRadius: "50%",
    position: "absolute",
    zIndex: 10,
    top: "calc(50% - 15px)",
    cursor: "pointer",
    background: "#424242",
    [position]: 15,
    opacity: 0.3,
  }));

  const [activeindex, setActiveindex] = useState(0);
  const [activeurl, setActiveurl] = useState(
    photos ? photos[activeindex] : null
  );

  useEffect(() => {
    if (!photos) return;
    setActiveurl(photos[activeindex]);
  }, [activeindex]);

  function nexthandler() {
    if (activeindex === photos.length - 1) {
      setActiveindex(0);
      return;
    }
    setActiveindex(activeindex + 1);
  }

  function prevhandler() {
    if (activeindex === 0) {
      setActiveindex(photos.length - 1);
      return;
    }
    setActiveindex(activeindex - 1);
  }

  return (
    <Box>
      <Box
        position="relative"
        style={{ border: "1px solid #DFDFDF", backgroundColor: "white" }}
      >
        <Stack
          width="100%"
          direction="row"
          top="49%"
          justifyContent="space-between"
          position="absolute"
          zIndex="2"
        >
          <IconButton color="inherit" size="medium" onClick={prevhandler}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton color="inherit" size="medium" onClick={nexthandler}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
        <Slides slide={activeurl} />
      </Box>
      <Box>
        <Slider {...settings}>
          {photos?.map((image, i) => (
            <Box
              key={`photos${i}`}
              component="a"
              href=""
              p={2}
              pb={0}
              style={{ borderRadius: "6px" }}
            >
              <img
                style={{ width: "100%", borderRadius: "6px" }}
                src={image}
                alt={image}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default BigPostSlider;

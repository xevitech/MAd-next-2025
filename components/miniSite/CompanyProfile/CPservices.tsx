import CPheader from "./CPheaderComponent";
import { Box, Dialog, Slide, DialogContent } from "@mui/material";
import { CPlable, ServiceTitle } from "./CompanyProfile.styled";
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    url: "/assets/dummyservice.jpg",
    title: "Operation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ",
  },
  {
    url: "/assets/dummyservice.jpg",
    title: "Operation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ",
  },
  {
    url: "/assets/dummyservice.jpg",
    title: "Operation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ",
  },
  {
    url: "/assets/dummyservice.jpg",
    title: "Operation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ",
  },
  {
    url: "/assets/dummyservice.jpg",
    title: "Operation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ",
  },
  {
    url: "/assets/dummyservice.jpg",
    title: "Operation",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  ",
  },
];

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Item({ data }) {
  return (
    <Box pr={2} pb={0}>
      <img style={{ width: "100%" }} src={data.url} alt={data.url} />
      <Box paddingY={{ xs: 1 }}>
        <ServiceTitle>{data.title}</ServiceTitle>
      </Box>
      <CPlable txtColour="#4A4A4A">{data.description}</CPlable>
    </Box>
  );
}

export default function CPservices() {
  const slider = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleClickOpen = (a: any) => {
    setSelectedImage(a.url);
    setOpen(true);
  };

  const handleClose = (a: any, b: any) => {
    setOpen(false);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: images.length > 1 ? 4 : 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: images.length > 1 ? 2 : 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: images.length > 1 ? 2 : 1,
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
  return (
    <Box>
      <Box mb={{ xs: 2 }}>
        <CPheader icon="/assets/cpicon12.svg" title="vv" controls={true} />
      </Box>
      <Box>
        <Slider ref={slider} {...settings}>
          {images.map((image, i) => (
            <Box
              key={i}
              pr={2}
              pb={0}
              onClick={handleClickOpen.bind(this, image)}
            >
              <img style={{ width: "100%" }} src={image.url} alt={image.url} />
              <Box paddingY={{ xs: 1 }}>
                <ServiceTitle>{image.title}</ServiceTitle>
              </Box>
              <CPlable txtColour="#4A4A4A">{image.description}</CPlable>
            </Box>
          ))}
        </Slider>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <img src={selectedImage} alt="Merchant AD certificate" />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}

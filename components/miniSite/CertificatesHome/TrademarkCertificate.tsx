import { CertificateOuter } from "./Certificate.styled";
import { Box, Dialog, Slide, DialogContent } from "@mui/material";
import Slider from "react-slick";
import React from "react";
import CPheader from "../CompanyProfile/CPheaderComponent";
import CertificateSlideItem from "./CertificateSlideItem";

const certificateData = [
  {
    type: {
      title: "Type of Certification:",
      value: "CE Certificate",
    },
    reference: {
      title: "Reference No.:",
      value: "RGYGH5678956",
    },
    name: {
      title: "Name:",
      value: "David Sen",
    },
    issuedby: {
      title: "Issued By:",
      value: "Merchant AD",
    },
    startdate: {
      title: "Start Date (validity period) :",
      value: "24-10-2021",
    },
    enddate: {
      title: "End Date (validity period) :",
      value: "24-12-2021",
    },
    message: {
      title: "Message:",
      value:
        "For more than ten years, we have supplied brand new, excessive, and used power generating equipment.",
    },
    images: [
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
    ],
  },
  {
    type: {
      title: "Type of Certification:",
      value: "CE Certificate",
    },
    reference: {
      title: "Reference No.:",
      value: "RGYGH5678956",
    },
    name: {
      title: "Name:",
      value: "David Sen",
    },
    issuedby: {
      title: "Issued By:",
      value: "Merchant AD",
    },
    startdate: {
      title: "Start Date (validity period) :",
      value: "24-10-2021",
    },
    enddate: {
      title: "End Date (validity period) :",
      value: "24-12-2021",
    },
    message: {
      title: "Message:",
      value:
        "For more than ten years, we have supplied brand new, excessive, and used power generating equipment.",
    },
    images: [
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
    ],
  },
  {
    type: {
      title: "Type of Certification:",
      value: "CE Certificate",
    },
    reference: {
      title: "Reference No.:",
      value: "RGYGH5678956",
    },
    name: {
      title: "Name:",
      value: "David Sen",
    },
    issuedby: {
      title: "Issued By:",
      value: "Merchant AD",
    },
    startdate: {
      title: "Start Date (validity period) :",
      value: "24-10-2021",
    },
    enddate: {
      title: "End Date (validity period) :",
      value: "24-12-2021",
    },
    message: {
      title: "Message:",
      value:
        "For more than ten years, we have supplied brand new, excessive, and used power generating equipment.",
    },
    images: [
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
      "/assets/Rectangle233.png",
    ],
  },
];

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TrademarkCertificate({ data }) {
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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <CertificateOuter paddingY={{ xs: 0, sm: 2 }} paddingX={{ xs: 1, sm: 2 }}>
      <Box>
        <Box mb={{ xs: 2 }}>
          <CPheader
            icon="/assets/cpicon3.svg"
            // icon="icon-company_facilities"
            title="Trademark"
            controls={true}
          />
        </Box>
        <Box>
          <Slider ref={slider} {...settings}>
            {certificateData.map((item, i) => (
              <CertificateSlideItem
                itemdata={item}
                images={item.images}
                key={i}
              />
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
    </CertificateOuter>
  );
}

export default TrademarkCertificate;

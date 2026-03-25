import { CertificateOuter } from "./Certificate.styled";
import { Box, Dialog, Slide, DialogContent } from "@mui/material";
import React from "react";
import CPheader from "../CompanyProfile/CPheaderComponent";
import ListbasedCertificateSliderItem from "./ListbasedCertificateSliderItem";

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
];

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

function ListStyleTrademarkCertificates() {
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
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
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
    <CertificateOuter p={{ xs: 2 }}>
      <Box>
        <Box mb={{ xs: 2 }}>
          <CPheader
            icon="/assets/cpicon2.svg"
            title="Trademark"
            controls={false}
          />
        </Box>
        <Box>
          <ListbasedCertificateSliderItem
            bord={false}
            itemdata={certificateData[0]}
            images={certificateData[0].images}
          />
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

export default ListStyleTrademarkCertificates;

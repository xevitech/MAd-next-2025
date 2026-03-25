import { Carousell } from "@/components/products/common/crousalPreview";
import { Box, Button, Modal } from "@mui/material";
import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "react-redux";
const PreviewModal = ({ open, closeModal, mode }) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "auto",
    outline: "none",
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  };
  const {
    bannerImage,
    swipe,
    indicators,
    cycleNavigation,
    navButtonVisible,
    activateBanner,
    defaultBanner,
    bannerMode,
  } = useSelector((state: any) => state.subseller);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 500,
    arrows: true,
  };

  // const images = bannerImage?.map((item, index) => {
  //   <div key={index}>
  //     <img
  //       style={{ width: "100%" }}
  //       src={item?.source}
  //       alt={`Image ${index}`}
  //     />
  //   </div>;
  // });

  // if (defaultBanner === "on") {
  //   if (images.length > 0 && activateBanner == "on") {
  //     settings.autoplay = true;
  //     settings.dots = true;
  //     settings.arrows = true;
  //   } else if (images.length > 0 && indicators === "on") {
  //     settings.arrows = true;
  //     settings.slidesToShow = 1;
  //   } else if (images.length > 0 && cycleNavigation === "on") {
  //     settings.arrows = true;
  //     settings.dots = true;
  //   } else if (images.length > 0 && navButtonVisible === "on") {
  //     settings.arrows = true;
  //   } else if (images.length > 0 && swipe === "on") {
  //     (settings.dots = true),
  //       (settings.arrows = true),
  //       (settings.autoplay = true),
  //       (settings.autoplaySpeed = 2000);
  //   }
  // }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          onClick={() => closeModal()}
          color="error"
          sx={{
            minHeight: "46px",
            minWidth: "46px",
            borderRadius: "50%",
            position: "absolute",
            top: "0px",
            right: "-6px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <CloseOutlinedIcon style={{ cursor: "pointer", paddingBottom: 5 }} />
        </Button>
        <Carousell />
      </Box>
    </Modal>
  );
};

export default PreviewModal;

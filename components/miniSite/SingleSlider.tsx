import { Box } from "@mui/material";
import React from "react";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SingleSliderBox } from "./styled";

const SingleSlider = (props) => {
  const { headerLoading, userInfo } = useSelector(
    (state: any) => state.miniSite
  );
  const { settings: bannerGeneralSettings = [], type } = props;

  const images =
    bannerGeneralSettings?.images?.map((item, index) => (
      <div key={index}>
        <img
          style={{ width: "100%" }}
          src={item?.source}
          alt={`Image ${index}`}
        />
      </div>
    )) || null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: true,
  };
  if (bannerGeneralSettings?.active_banner === "on") {
    if (images.length > 0 && bannerGeneralSettings.active_banner == "on") {
      settings.autoplay = true;
      settings.dots = true;
      settings.arrows = true;
    } else if (
      images.length > 0 &&
      bannerGeneralSettings.indicator_banner === "on"
    ) {
      settings.arrows = true;
      settings.slidesToShow = 1;
    } else if (
      images.length > 0 &&
      bannerGeneralSettings.nav_button_visible === "on"
    ) {
      settings.arrows = true;
      settings.dots = true;
    } else if (
      images.length > 0 &&
      bannerGeneralSettings.navigation_button === "on"
    ) {
      settings.arrows = true;
    } else if (
      images.length > 0 &&
      bannerGeneralSettings.swap_banner === "on"
    ) {
      (settings.dots = true),
        (settings.arrows = true),
        (settings.autoplay = true),
        (settings.autoplaySpeed = 2000);
    }
  }
  return (
    <>
      <SingleSliderBox>
        {headerLoading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"421px"}
            sx={{ "@media screen and (max-width:900px)": { height: "200px" } }}
          >
            {/* <div style={{ paddingTop: "57%" }} /> */}
          </Skeleton>
        ) : bannerGeneralSettings?.default_banner === "on" ? (
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={userInfo?.contact_profile?.profile_banner}
          />
        ) : (
          bannerGeneralSettings.length > 0 ||
          (bannerGeneralSettings && (
            <Box
              sx={{
                height: "auto",
                // "@media screen and (max-width:1200px)": { height: "290px" },
                // "@media screen and (max-width:900px)": { height: "200px" },
                // "@media screen and (max-width:600px)": { height: "200px" },
                "& .slick-slide": {
                  // height:'421px',                  
                },
                "&:hover": {
                  "& .slick-prev, & .slick-next": {
                    display: "block !important",
                  },
                },
                "& .slick-arrow": {
                  zIndex: "3",
                  background: "#ffffff",
                  "&::before": {
                    content: '" "',
                    display: "block",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                  },
                },
                "& .slick-prev": {
                  left: "5%",
                  top: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#282828",
                  borderRadius: "50%",
                  display: "none !important",
                  "&::before": {
                    backgroundImage: `url('/assets/arrowLeftWhite.svg')`,
                    height: "40px",
                  },
                },
                "& .slick-next": {
                  right: "5%",
                  top: "50%",
                  height: "40px",
                  width: "40px",
                  backgroundColor: "#282828",
                  borderRadius: "50%",
                  display: "none !important",
                  "@media screen and (max-width:767px)": { right: "10%" },
                  "&::before": {
                    backgroundImage: `url('/assets/arrowRightWhite.svg')`,
                    height: "40px",
                  },
                },
                "& .slick-dots li button:before": {
                  border: "1px solid #000",
                  borderRadius: "50%",
                  color: "#fff",
                  background: "#fff",
                  width: "8px",
                  height: "8px",
                  opacity: 1,
                  lineHeight: "normal",
                },
                "& .slick-dots li.slick-active button:before": {
                  background: "#d7282f",
                  color: "#d7282f",
                  border: "1px solid #d7282f",
                },
                "& .slick-dots li": {
                  margin: 0,
                },
              }}
            >
              <Slider {...settings}>
                {bannerGeneralSettings?.images?.map((item, index) => (
                  <div key={index}>
                    <img
                      className="bannerslidesimage"
                      src={item?.source}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}
              </Slider>
            </Box>
          ))
        )}
      </SingleSliderBox>
    </>
  );
};

export default SingleSlider;

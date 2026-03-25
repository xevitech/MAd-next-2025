import { CarousalImage } from "@/components/miniSite/CompanyProfile/CompanyProfile.styled";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";

interface CarouselProps {
  imageData: { source: string }[];
  altName: string;
}

const CustomCarousel: React.FC<CarouselProps> = ({ imageData, altName }) => {
  const [showArrowIcon, setShowArrowIcon] = useState(false);

  return (
    <>
      <Carousel
        cycleNavigation={true}
        indicators={false}
        duration={500}
        swipe={true}
        // animation="fade"
        navButtonsProps={{
          style: {
            backgroundColor: "#231F20",
            borderRadius: 6,
            color: "white",
          },
        }}
        sx={{
          height: "451px",
          // "@media screen and (max-width:900px)": { height: "250px" },
          "& .MuiIconButton-root": {
            padding: "4px !important",
          },
        }}
      >
        {imageData?.map((item, i) => {
          return (
            <Box
              textAlign="center"
              key={i}
              sx={{
                "& .CrouselImgHeight": {
                  height: "451px",
                  // "@media screen and (max-width:900px)": { height: "250px" },
                },
              }}
            >
              <Box
                onMouseOver={(e) => {
                  if (!showArrowIcon) {
                    setShowArrowIcon(true);
                  }
                }}
                onMouseLeave={(e) => {
                  if (showArrowIcon) {
                    setShowArrowIcon(false);
                  }
                }}
              >
                <img
                  className="CrouselImgHeight"
                  src={item?.source}
                  alt={altName}
                />
              </Box>
            </Box>
          );
        })}
      </Carousel>
    </>
  );
};

export default CustomCarousel;

import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function ImageCarousel({ element }) {
  return (
    <Carousel
      autoPlay={true}
      IndicatorIcon={false}
      indicators={false}
      navButtonsAlwaysInvisible={element?.photos?.length === 1 ? true : false}
      NextIcon={<ChevronRightIcon />}
      PrevIcon={<ChevronLeftIcon />}
    >
      {element?.photos?.map((item, i) => (
        <>
          <Image
            height={"230"}
            width={1000}
            src={item.source}
            alt={item.alt_tag}
            key={`photo-${i}`}
          />
        </>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;

import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
export function Carousell() {
  const {
    bannerImage,
    cycleNavigation,
    navButtonVisible,
    indicators,
    swipe,
    activateBanner,
    fullHeightHover,
    bannerPage,
    page,
    bannarImagePreview,
    activeEditPageData,
    bannerMode,
  } = useSelector((state: any) => state.subseller);

  if(bannarImagePreview.length == 0){
    return <div>No Photos</div>
  }
  return (
    <>
      {/* {bannerImage?.length > 0 ? ( */}
        <Carousel
          fullHeightHover={fullHeightHover == false ? true : false}
          autoPlay={activateBanner == false ? true : false}
          swipe={swipe == false ? true : false}
          indicators={indicators == false ? true : false}
          navButtonsAlwaysVisible={navButtonVisible == true ? false : true}
          cycleNavigation={cycleNavigation == true ? false : true}
        >
          {bannerMode === "create"
            ? bannarImagePreview?.map((item, i) => (
                <Box sx={{ maxWidth: "20px" }}>
                  <Paper>
                    <img
                      src={
                        item.source === "string"
                          ? item.source
                          : item.source[0].src
                        // URL.createObjectURL(item)
                      }
                      width={800}
                      height={400}
                    />
                  </Paper>
                </Box>
              ))
            : bannarImagePreview?.map((img, idx) => (
                <Box sx={{ maxWidth: "20px" }}>
                  <Paper>
                    <img
                      src={ Array.isArray(img.source) ? img.source[0].src : img.source}
                      width={800}
                      height={400}
                    />
                  </Paper>
                </Box>
              ))}
        </Carousel>
       {/* ) : (
       " No Photos"
       )} */}
    </>
  );
}

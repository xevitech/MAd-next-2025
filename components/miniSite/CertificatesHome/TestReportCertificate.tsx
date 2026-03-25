import { CertificateOuter } from "./Certificate.styled";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CPheader from "../CompanyProfile/CPheaderComponent";
import CertificateSlideItem from "./CertificateSlideItem";
import { Skeleton } from "@mui/lab";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAppContext from "@/hooks/useAppContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestReportCertificate({ data, allData, contextloading }: any) {
  const { breakPoints } = useAppContext();
  const [expendHeight, setExpendHeight] = useState();
  const [checked, setChecked] = React.useState(false);
  const arr = [1, 1];
  const ref = useRef(null);
  useEffect(() => {
    if (ref?.current?.offsetHeight) {
      setExpendHeight(ref.current.offsetHeight);
    }
  }, [contextloading]);

  const length = data?.row?.length;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrow: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // <CertificateOuter paddingY={{ xs: 0, sm: 2 }} paddingX={{ xs: 1, sm: 2 }}>
      <Box>
        {/* <Box mb={{ xs: 2 }}>
          <CPheader
            icon="/assets/cpicon2.svg"
            title={
              allData[0]?.type ? (
                allData[0].type
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width="150px"
                />
              )
            }
            expand={length > 2 ? true : false}
          />
        </Box> */}
        <Box>
          {allData?.length === 1 && (
            <Grid container spacing={2}>
              {!contextloading &&
                allData?.map((item, i) => (
                  <Grid
                    key={i}
                    ref={i === 0 ? ref : null}
                    item
                    xs={12}
                    md={12}
                    lg={6}
                    xl={6}
                  >
                    <CertificateSlideItem
                      length={length}
                      itemdata={item}
                      images={item.images}
                      setChecked={setChecked}
                      checked={checked}
                      data={allData}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
          {allData?.length > 1 && (
            <Box className="mscertificatebtns">
              <Slider {...settings}>
                {!contextloading &&
                  allData?.map((item, i) => (
                    <Grid
                      key={i}
                      ref={i === 0 ? ref : null}
                      item
                      xs={12}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <CertificateSlideItem
                        length={length}
                        itemdata={item}
                        images={item.images}
                        setChecked={setChecked}
                        checked={checked}
                        data={allData}
                      />
                    </Grid>
                  ))}
              </Slider>
            </Box>
          )}
        </Box>
      </Box>
    // </CertificateOuter>
  );
}

export default TestReportCertificate;

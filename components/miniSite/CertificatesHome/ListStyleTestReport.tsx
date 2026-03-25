import { CertificateOuter } from "./Certificate.styled";
import { Box, Dialog, Slide } from "@mui/material";
import Slider from "react-slick";
import React from "react";
import CPheader from "../CompanyProfile/CPheaderComponent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Divider } from "@mui/material";
import { Grid, Stack, Collapse } from "@mui/material";
import {
  CertificateSliderButton,
  Text14,
  ViewMoreButton,
} from "./Certificate.styled";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { GridExpandMoreIcon } from "@mui/x-data-grid-pro";
import PopoverSlider from "../PopoverSlider";

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ListStyleTestReport({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  var collapsHeight = matches ? 110 : null;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    swipeToSlide: true,
  };

  return (
    <CertificateOuter p={{ xs: 2 }}>
      <Box>
        <Box mb={{ xs: 2 }}>
          <CPheader
            icon="/assets/cpicon2.svg"
            title={data.type}
            controls={false}
          />
        </Box>
        <Box>
          <CertificateOuter mr={{ xs: 2 }} p={{ xs: 1 }}>
            <Grid container spacing={{ xs: 1 }}>
              <Grid item xs={12} sm={3.5}>
                <Box position="relative">
                  <CertificateSliderButton
                    top="45%"
                    onClick={() => slider?.current?.slickPrev()}
                  >
                    <KeyboardArrowLeftIcon
                      sx={{ color: "black" }}
                      fontSize="small"
                    />
                  </CertificateSliderButton>
                  <CertificateSliderButton
                    top="45%"
                    onClick={() => slider?.current?.slickNext()}
                    right={true}
                  >
                    <KeyboardArrowRightIcon
                      sx={{ color: "black" }}
                      fontSize="small"
                    />
                  </CertificateSliderButton>
                  <Slider ref={slider} {...settings}>
                    {data.row[0].images.map((image, i) => (
                      <Box textAlign="center" onClick={handleClickOpen} key={i}>
                        <img width="100%" src={image.source} alt={i} />
                      </Box>
                    ))}
                  </Slider>

                  {open && (
                    <PopoverSlider
                      open={open}
                      handleClose={handleClose}
                      activedata={data.row[0]}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs>
                <Collapse
                  orientation="vertical"
                  in={!matches ? expanded : true}
                  collapsedSize={110}
                >
                  <Stack
                    spacing={{ xs: 1, sm: 1.5 }}
                    divider={<Divider orientation="horizontal" />}
                  >
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>Type of Certification:</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].type}</Text14>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>Reference No.:</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].reference_no}</Text14>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>Name:</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].name}</Text14>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>Issued By</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].issued_by}</Text14>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>Start Date (validity period) :</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].start_date}</Text14>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>End Date (validity period) :</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].end_date}</Text14>
                      </Box>
                    </Stack>
                    <Stack direction="row">
                      <Box flex={1.5}>
                        <Text14>Message:</Text14>
                      </Box>
                      <Box flex={1}>
                        <Text14>{data.row[0].message}</Text14>
                      </Box>
                    </Stack>
                  </Stack>
                </Collapse>
                <Box
                  display={{ xs: "block", sm: "none" }}
                  textAlign="center"
                  mt={{ xs: 1.5 }}
                >
                  <ViewMoreButton expand={expanded} onClick={handleExpandClick}>
                    {" "}
                    <span>{expanded ? "Close" : "View more"}</span>{" "}
                    <GridExpandMoreIcon />{" "}
                  </ViewMoreButton>
                </Box>
              </Grid>
            </Grid>
          </CertificateOuter>
        </Box>
      </Box>
    </CertificateOuter>
  );
}

export default ListStyleTestReport;

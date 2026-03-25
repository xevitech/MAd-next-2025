import CPheader from "./CPheaderComponent";
import { Box, Slide, Stack, Skeleton, IconButton } from "@mui/material";
import {
  CPlable,
  ServiceTitle,
  ImageThumbBox,
  SingleSlideImage,
  SingleSlideBoxx,
} from "./CompanyProfile.styled";
import Slider from "react-slick";
import React, { useContext, useEffect } from "react";
import { MiniSiteContext } from "@/contextApi/miniContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ShortStack } from "../styled";
import ImageModal from "../common/ImageModal";
import { apiClient } from "@/components/common/common";
import { useSelector } from "react-redux";
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

const data = [
  {
    title: "Location:",
    value: "America / Washington",
  },
  {
    title: "Capacity:",
    value: "500kw",
  },
  {
    title: "Area:",
    value: "1500sq.ft",
  },
  {
    title: "Unit:",
    value: "1500",
  },
  {
    title: "Unit:",
    value: "100k",
  },
  {
    title: "Nearest Airport:",
    value: "Chandigarh International Airport",
  },
  {
    title: "Nearest Seaport:",
    value: "Mundra, GJ ",
  },
  {
    title: "Account Type:",
    value: "Seller",
  },
  {
    title: "Business Type:",
    value: "Manufacturer / EPC Contractor / Government Entity",
  },
];

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ServiceList() {
  const ctx = useContext(MiniSiteContext);

  const slider = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [servicelist, setServicelist] = React.useState([]);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);

  const FetchServices = async () => {
    let response = await apiClient(
      `mini-site/company_profile/services/list?user_id=${minisiteUserID}`,
      "get"
    );
    if (response.status == 200) {
      setServicelist(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (minisiteUserID) FetchServices();
  }, [minisiteUserID]);

  const handleClickOpen = (a: any) => {
    setSelectedImage(a);
    setOpen(true);
  };

  const handleClose = (a: any, b: any) => {
    setOpen(false);
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
  const arr = [1, 1, 1, 1];
  function ServiceListSkelton({ key }: any) {
    return (
      <Stack spacing={{ xs: 1.5 }} key={key} mr={{ xs: 2 }}>
        <Skeleton
          animation="wave"
          variant="text"
          height={300}
          sx={{ fontSize: "1rem" }}
        />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton animation="wave" variant="text" sx={{ fontSize: ".75rem" }} />
      </Stack>
    );
  }
  const NavigateHandler = (route) => router.push(route);
  const enabledServicesData = servicelist?.filter((item) => item.status === "enable");
  return (
    <Box className="cslidercontainer">
      <Box mb={{ xs: 1 }}>
        <Stack
          pb={1}
          pr={1.5}
          spacing={1}
          direction={{ xs: "row" }}
          justifyContent={{ xs: "space-between" }}
          alignItems={{ xs: "center" }}
        >
          <CPheader icon="icon-services" title="Services" />
          {servicelist?.length > 4 && (
            <ShortStack
              direction={{ xs: "row" }}
              justifyContent={{ xs: "space-between" }}
              alignItems={{ xs: "center" }}
            >
              <IconButton
                onClick={() => slider?.current?.slickPrev()}
                size="medium"
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                onClick={() => slider?.current?.slickNext()}
                size="medium"
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </ShortStack>
          )}
        </Stack>
      </Box>
      <Box>
        {servicelist.length >= 1 ? (
          <Slider ref={slider} {...settings}>
            {loading && arr.map((item) => <ServiceListSkelton key={item} />)}
            {!loading &&
              servicelist
                ?.filter((item) => item.status === "enable")
                .map((item, i) => (
                  <Box
                    key={item.id}
                    pr={2}
                    pb={0}
                    onClick={() => handleClickOpen(item?.image[0]?.source)}
                  >
                    <ImageThumbBox>
                      <img src={item.image[0]?.source} alt={item.title} />
                    </ImageThumbBox>
                    <Box paddingY={{ xs: 1 }}>
                      <ServiceTitle>
                        {capitalizeFirstLetter(item.title)}
                      </ServiceTitle>
                    </Box>
                    <CPlable txtColour="#4A4A4A">{item.description}</CPlable>
                  </Box>
                ))}
          </Slider>
        ) : (
          // servicelist.length == 1 && (
          //   <SingleSlideBoxx
          //     pr={2}
          //     pb={0}
          //     onClick={() => handleClickOpen(servicelist[0]?.image[0])}
          //   >
          //     <SingleSlideImage>
          //       <img
          //         src={servicelist[0]?.image[0]?.source}
          //         alt={servicelist[0]?.title}
          //       />
          //     </SingleSlideImage>
          //     <Box paddingY={{ xs: 1 }}>
          //       <ServiceTitle>
          //         {capitalizeFirstLetter(servicelist[0]?.title)}
          //       </ServiceTitle>
          //     </Box>
          //     <CPlable txtColour="#4A4A4A">
          //       {servicelist[0]?.description}
          //     </CPlable>
          //   </SingleSlideBoxx>
          // )
          ""
        )}
        {enabledServicesData?.length === 0 && (
          <EmptyPage
            logo="/assets/services.svg"
            onClickHandler={() =>
              NavigateHandler("/companySettings/companyDetails?tab=services")
            }
            text={"services"}
            actiontext={userid !== minisiteUserID ? false : true}
          />
        )}
        <ImageModal
          handleClose={handleClose}
          open={open}
          allData={servicelist.map((item) => item.image).flat()}
          // allData={servicelist.map((v) => ({
          //   ...v,
          //   source: v.image,
          //   file_original_name: v.title,
          // }))}
        />
      </Box>
      {/* <SingleSlideBoxx
              pr={2}
              pb={0}
              onClick={() => handleClickOpen(servicelist[0]?.image[0])}
            >
              <SingleSlideImage>
              <Skeleton variant="rounded" width={310} height={200} />
              </SingleSlideImage>
              <Box paddingY={{ xs: 1 }}>
                <ServiceTitle>
                <Skeleton variant="text" width={120} sx={{margin:"0 auto",
                  marginTop:"20px"
                }}/>
                </ServiceTitle>
              </Box>
              <CPlable txtColour="#4A4A4A">
              <Skeleton variant="text" width={300} sx={{margin:"0 auto"}} />
              </CPlable>
            </SingleSlideBoxx> */}
    </Box>
  );
}

import { Box, Stack } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  CertificateHeadText,
  CertificateTitle,
  CustomeChip,
  CertificateCarousel,
  CertificateBox,
} from "./styled";
import { Skeleton } from "@mui/lab";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import EmptyPage from "@/components/miniSite/EmptyPages/index";
import router from "next/router";
import ImageModal from "./common/ImageModal";
import { useSelector } from "react-redux";
import { apiClient, handleTrackUser, trackPageView } from "../common/common";

export function Certificate({ setHideCertificates }) {
  const [open, setOpen] = React.useState(false);
  const [activedata, setActivedata] = useState<any>();
  const [getTrackedId, setgetTrackedId] = useState("");
  const [certificatesData, setCertificatesData] = useState<any>([]);
  const [certificateloading, setCertificateloading] = useState<boolean>(false);
  let shop_id = JSON.parse(localStorage.getItem("shop_id"));
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  const {
    basic_information: { slug },
  } = headerData;
  let isScrolling: any;

  // useEffect(()=>{
  //   (async()=>{
  //     localStorage.removeItem("scrollPercentage");
  //     let response= await trackPageView(router?.asPath,"","mini-site-certificate","","");
  //      setgetTrackedId(response);
  //      await FetchCertificates();
  //    })();
  //  },[])

  //  useEffect(()=>{
  //   const handleTrackUSer=(event)=>{
  //     window.clearTimeout(isScrolling);
  //     if(getTrackedId!==""){
  //       if(event?.type === "scroll"){
  //         isScrolling = setTimeout(function() {handleTrackUser(event,"",getTrackedId)}, 100)
  //       }else{
  //         handleTrackUser(event,"",getTrackedId)
  //       }
  //     }
  //   }
  //    document.addEventListener('click', handleTrackUSer,true);
  //    document.addEventListener('scroll', handleTrackUSer);
  //    return(()=>{
  //     document.removeEventListener('click', handleTrackUSer,true);
  //     document.removeEventListener('scroll', handleTrackUSer);
  // })
  //  },[getTrackedId])

  // useEffect(() => {
  //   (async()=>{
  //     FetchCertificates();
  //     let interval ;
  //     const checkApi = async () => {
  //           interval  = setInterval(()=> trackPageView(router?.asPath,"yes","mini-site-certificate","",getTrackedId), 30000);
  //     }
  //     if(getTrackedId){
  //       router?.asPath?.includes("/certificate")&& checkApi()
  //     }

  //     return(()=>{
  //         clearInterval(interval);
  //     })
  //   })();
  // }, []);

  useEffect(() => {
    FetchCertificates();
  }, []);

  const FetchCertificates = async () => {
    setCertificateloading(true);
    let response = await apiClient(
      `mini-site/company_profile/company-profile?shop_slug=${slug}&type=Certificates`,
      "get",
      {
        // body: {
        //   companyid: headerData?.basic_information?.shop_id ?? shop_id,
        //   user_id: minisiteUserID,
        // },
      }
    );
    setCertificateloading(false);
    let allCertificates = response?.certificates;

    if (userid == minisiteUserID && allCertificates.length == 0) {
      setHideCertificates(true);
      setCertificatesData([]);
      return;
    }
    if (allCertificates.length < 4) {
      setHideCertificates(false);
    }
    setCertificatesData(allCertificates);
  };

  const handleClickOpen = (data) => {
    setActivedata(data);
    setOpen(true);
  };

  const handleClose = (a: any, b: any) => {
    setOpen(false);
  };

  const slider = React.useRef(null);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    initialSlide: 0,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
          infinite: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
        },
      },
    ],
  };

  const arr = [1, 1, 1, 1];

  const NavigateHandler = (route) => router.push(route);
  const enabledCertificatesData = certificatesData?.filter((item) => item.status === "enable");

  return (
    <>
      <Box>
        <Stack
          paddingBottom="8px"
          direction={{ xs: "row" }}
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid rgba(34, 51, 84, .1);"
        >
          <Stack
            direction={{ xs: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <CustomeChip component="span">
              <Image
                width={16}
                height={16}
                src="/assets/icon_certificate.svg"
                alt="icon"
              />
              {/* <i className="icon-certificates" style={{color:'red !important'}}></i> */}
            </CustomeChip>
            <CertificateHeadText variant="h4">
              Certificates{" "}
            </CertificateHeadText>
          </Stack>
        </Stack>
        <CertificateCarousel>
          {certificatesData.length > 0 ? (
            certificatesData.length > 1 ? (
              <Slider ref={slider} {...settings}>
                {!certificateloading &&
                  certificatesData?.map((item, i) => {
                    return (
                      <Box
                        key={i}
                        textAlign="center"
                        p={2}
                        pb={0}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CertificateBox
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClickOpen(item.images);
                          }}
                        >
                          <img src={item?.images[0]?.source} alt={item?.id} />
                        </CertificateBox>
                        <CertificateTitle paddingY={2} color="black">
                          {capitalizeFirstLetter(item?.name)} (
                          {capitalizeFirstLetter(item?.type)})
                        </CertificateTitle>
                      </Box>
                    );
                  })}
                {certificateloading &&
                  arr.map((item, i) => (
                    <Stack spacing={2} p={{ xs: 1.5 }} key={i}>
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100%"
                        height={350}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                      />
                    </Stack>
                  ))}
              </Slider>
            ) : (
              <Box
                textAlign="center"
                p={2}
                pb={0}
                onClick={(e) => e.stopPropagation()}
              >
                <CertificateBox
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickOpen(certificatesData[0]?.images);
                  }}
                >
                  <img
                    src={certificatesData[0]?.images[0]?.source}
                    alt={certificatesData[0]?.id}
                  />
                </CertificateBox>
                <CertificateTitle paddingY={2} color="black">
                  {capitalizeFirstLetter(certificatesData[0]?.name)} (
                  {capitalizeFirstLetter(certificatesData[0]?.type)})
                </CertificateTitle>
              </Box>
            )
          ) :enabledCertificatesData?.length === 0 && (
         <EmptyPage
         text={"certificates"}
         onClickHandler={() => {
           NavigateHandler(
             "/companySettings/companyDetails?tab=certificates"
           );
         }}
         logo="/assets/legal-contract.svg"
         actiontext={userid !== minisiteUserID ? false : true}
       />
        )}
         
        </CertificateCarousel>
        {open && (
          <ImageModal
            handleClose={handleClose}
            open={open}
            allData={activedata}
          />
        )}
      </Box>
    </>
  );
}

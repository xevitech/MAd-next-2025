import { Box, Divider, Grid, Link, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  BorderandSpacing,
  IcoFacebook,
  IcoInstagram,
  IcoLinkedIn,
  IcoTwitter,
  OnlyImageOverlay,
  OverlayCenter,
  OverlaySmall,
  Textspacing,
  TradeShowDetailBorder,
  TradeShowFullImage,
  TradeshowHeading,
  TradeShowName,
  TradeShowNameBox,
  TradeshowSection,
  TradeShowSliderBox,
  TradeShowSliderImageBox,
  TradeShowSmallImage,
  TradeshowSocialLinks,
  TradeshowText,
} from "./styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useRouter } from "next/router";
import { apiClient } from "@/components/common/common";
import Slider from "react-slick";
import TradeshowDetailSkeleton from "./skeleton/TradeshowDetailSkeleton";
export default function TradeshowDetail() {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const id = router.query.id;
  const [trade, setTrade] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchTradeShow = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await apiClient(
          `trade_show/single-tradeshow/${id}`,
          "GET",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { tradeshow } = response;
        console.log("tradesyhow", await response.tradeshow);
        if (response.tradeshow) {
          setTrade(tradeshow);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    fetchTradeShow();
  }, [id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
 
    return `${month} ${day} ${year}`;
};
  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startDay = start.getDate().toString().padStart(2, '0');
    const startMonth = start.toLocaleString("en-US", { month: "short" });
    const startYear = start.getFullYear();
    const endDay = end.getDate().toString().padStart(2, '0');
    const endMonth = end.toLocaleString("en-US", { month: "short" });
    const endYear = end.getFullYear();
 
    if (startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startDay} ${startYear} - ${endDay}`;
    }
 
    return `${startMonth} ${startDay} ${startYear} - ${endMonth} ${endDay} ${endYear}`;
};
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Box className="mypagecontainer">
        {loader ? (
          <TradeshowDetailSkeleton></TradeshowDetailSkeleton>
        ) : (
          <Stack gap={"24px"}>
            <TradeshowSection>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TradeShowFullImage
                    sx={{
                      height: "auto",
                      "@media screen and (max-width:900px)": { height: "auto" },
                    }}
                  >
                    <TradeShowSliderBox>
                      {loader ? (
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={"100%"}
                          sx={{
                            height: "600px",
                            "@media screen and (max-width:900px)": {
                              height: "300px",
                            },
                          }}
                        />
                      ) : (
                        <Slider {...settings}>
                          {trade?.photoList?.map((photo, index) => (
                            <div key={index}>
                              <TradeShowSliderImageBox>
                                <img
                                  src={photo?.source || "/default-image.jpg"}
                                  alt={trade?.name || `Image ${index + 1}`}
                                />
                              </TradeShowSliderImageBox>
                            </div>
                          ))}
                        </Slider>
                      )}
                    </TradeShowSliderBox>
                  </TradeShowFullImage>
                </Grid>
              </Grid>
            </TradeshowSection>
            <TradeShowNameBox>
              <TradeShowName>{trade?.name}</TradeShowName>
            </TradeShowNameBox>
            <TradeShowDetailBorder
              sx={{
                "@media screen and (max-width:900px)": {
                  padding: "16px",
                },
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  "@media screen and (max-width:900px)": { display: "none" },
                }}
              >
                <Grid item xs={12}>
                  <BorderandSpacing>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3} mt={2}>
                        <Textspacing>
                          <TradeshowHeading>Organizer:</TradeshowHeading>
                        </Textspacing>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} mt={2}>
                        <Box className="tradeShowText">
                          <TradeshowText>{trade?.organizer}</TradeshowText>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} mt={2}>
                        <Box className="tradeShowText">
                          <TradeshowHeading>Duration:</TradeshowHeading>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} mt={2}>
                        <Box className="tradeShowText">
                          <TradeshowText>
                            {trade?.start_date && trade?.end_date
                              ? formatDateRange(trade.start_date, trade.end_date)
                              : "N/A"}
                          </TradeshowText>
                        </Box>
                      </Grid>
                    </Grid>
                  </BorderandSpacing>
                </Grid>

                <Grid item xs={12}>
                  <BorderandSpacing>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Textspacing>
                          <TradeshowHeading>Venue:</TradeshowHeading>
                        </Textspacing>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowText>{trade?.venue}</TradeshowText>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowHeading>Location:</TradeshowHeading>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowText>{trade?.country}</TradeshowText>
                        </Box>
                      </Grid>
                    </Grid>
                  </BorderandSpacing>
                </Grid>

                <Grid item xs={12}>
                  <BorderandSpacing>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Textspacing>
                          <TradeshowHeading>Contact Person:</TradeshowHeading>
                        </Textspacing>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowText>{trade?.contact_person}</TradeshowText>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowHeading>Email:</TradeshowHeading>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <a
                            href={
                              trade?.email ? `mailto:${trade.email}` : "N/A"
                            }
                          >
                            <TradeshowText>
                              {trade?.email ?? "N/A"}
                            </TradeshowText>
                          </a>
                        </Box>
                      </Grid>
                    </Grid>
                  </BorderandSpacing>
                </Grid>

                <Grid item xs={12}>
                  <BorderandSpacing>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Textspacing>
                          <TradeshowHeading>Telephone:</TradeshowHeading>
                        </Textspacing>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <a href={trade?.phone ? `tel:${trade.phone}` : "N/A"}>
                            <TradeshowText>
                              {trade?.phone ?? "N/A"}
                            </TradeshowText>
                          </a>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowHeading>Website:</TradeshowHeading>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <a href={trade?.website ?? "N/A"}>
                            <TradeshowText>
                              {trade?.website ?? "N/A"}
                            </TradeshowText>
                          </a>
                        </Box>
                      </Grid>
                    </Grid>
                  </BorderandSpacing>
                </Grid>

                <Grid item xs={12}>
                  <BorderandSpacing>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Textspacing>
                          <TradeshowHeading>Industry Focus:</TradeshowHeading>
                        </Textspacing>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowText>
                            {trade?.industry_focus ?? "N/A"}
                          </TradeshowText>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <Box className="tradeShowText">
                          <TradeshowHeading>Share:</TradeshowHeading>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3}>
                        <TradeshowSocialLinks>
                          {/* <Link
                              href="https://www.facebook.com/powercozmo.epg"
                              target="_blank">
                              <FacebookIcon className="facebook" />
                            </Link>


                            <Link color={"#000"}
                              href="https://www.linkedin.com/company/powercozmo"
                              target="_blank">
                              <LinkedInIcon className="linkedin" />
                            </Link> */}

                          <Link
                            className="facebook-icon"
                            href="https://www.facebook.com/powercozmo.epg"
                            target="_blank"
                          >
                            <IcoFacebook></IcoFacebook>
                          </Link>
                          <Link
                            className="twitter-icon"
                            href="https://twitter.com/powercozmo"
                            target="_blank"
                          >
                            <IcoTwitter></IcoTwitter>
                          </Link>
                          <Link
                            className="linkedin-icon"
                            href="https://www.linkedin.com/company/powercozmo"
                            target="_blank"
                          >
                            <IcoLinkedIn></IcoLinkedIn>
                          </Link>
                          <Link
                            className="instagram-icon"
                            href="https://www.instagram.com/powercozmo/"
                            target="_blank"
                          >
                            <IcoInstagram></IcoInstagram>
                          </Link>


                        </TradeshowSocialLinks>
                      </Grid>
                    </Grid>
                  </BorderandSpacing>
                </Grid>

                <Grid item xs={12}>
                  <BorderandSpacing className="removeBorder">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={3}>
                        <Textspacing>
                          <TradeshowHeading>Introduction:</TradeshowHeading>
                        </Textspacing>
                      </Grid>
                      <Grid item xs={12} sm={12} md={7}>
                        <Box className="tradeShowText">
                          <TradeshowText>
                            <Typography>
                              {trade?.instructions ?? "N/A"}
                            </Typography>
                          </TradeshowText>
                        </Box>
                      </Grid>
                    </Grid>
                  </BorderandSpacing>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                sx={{
                  display: "none",
                  "@media screen and (max-width:900px)": { display: "block" },
                }}
              >
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Organizer:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>{trade?.organizer ?? "N/A"}</TradeshowText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Duration:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>
                      {trade?.start_date ?? "N/A"} - {trade?.end_date ?? "N/A"}
                    </TradeshowText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Venue:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>{trade?.venue ?? "N/A"}</TradeshowText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Location:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>{trade?.country ?? "N/A"}</TradeshowText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Contact Person:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>
                      {trade?.contact_person ?? "N/A"}
                    </TradeshowText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Email:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <a href={trade?.email ? `mailto:${trade.email}` : "N/A"}>
                      <TradeshowText>{trade?.email ?? "N/A"}</TradeshowText>
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Telephone:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <a href={trade?.phone ? `tel:${trade.phone}` : "N/A"}>
                      <TradeshowText>{trade?.phone ?? "N/A"}</TradeshowText>
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Website:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <a href={trade?.website ?? "N/A"}>
                      <TradeshowText>{trade?.website ?? "N/A"}</TradeshowText>
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Industry Focus:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>
                      {trade?.industry_focus ?? "N/A"}
                    </TradeshowText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Share:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowSocialLinks>
                      {/* <Link
                              href="https://www.facebook.com/powercozmo.epg"
                              target="_blank">
                              <FacebookIcon className="facebook" />
                            </Link>


                            <Link color={"#000"}
                              href="https://www.linkedin.com/company/powercozmo"
                              target="_blank">
                              <LinkedInIcon className="linkedin" />
                            </Link> */}

                      <Link
                        className="facebook-icon"
                        href="https://www.facebook.com/powercozmo.epg"
                        target="_blank"
                      >
                        <IcoFacebook></IcoFacebook>
                      </Link>
                      <Link
                        className="twitter-icon"
                        href="https://twitter.com/powercozmo"
                        target="_blank"
                      >
                        <IcoTwitter></IcoTwitter>
                      </Link>
                      <Link
                        className="linkedin-icon"
                        href="https://www.linkedin.com/company/powercozmo"
                        target="_blank"
                      >
                        <IcoLinkedIn></IcoLinkedIn>
                      </Link>
                      <Link
                        className="instagram-icon"
                        href="https://www.instagram.com/powercozmo/"
                        target="_blank"
                      >
                        <IcoInstagram></IcoInstagram>
                      </Link>


                    </TradeshowSocialLinks>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Divider></Divider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowHeading>Introduction:</TradeshowHeading>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <TradeshowText>
                      {" "}
                      {trade?.instructions ?? "N/A"}
                    </TradeshowText>
                  </Box>
                </Grid>
              </Grid>
            </TradeShowDetailBorder>
          </Stack>
        )}
      </Box>
    </>
  );
}
// there are two data grid be aware when you change data, do changes in both

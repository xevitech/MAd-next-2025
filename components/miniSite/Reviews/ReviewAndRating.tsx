import { CertificateOuter } from "../CertificatesHome/Certificate.styled";
import { Grid, Box, Stack, Rating, ButtonBase, Tooltip } from "@mui/material";
import {
  CustomeRatingSlider,
  FeedbackTooltipBox,
  RatingBox,
  RatingLable,
  RatingLable2,
  RatingPercent,
  UserSatisfaction,
  RatingValue,
  ResponseContainer,
  ResponseIconContainer,
  ReviewHeaderIcon,
  ReviewHeading,
  ReviewHeadingsm,
  ReviewSubHeading,
  ReviewSubHeadingsm,
  ReviewText13,
  ReviewBoxP,
} from "./Review.Styled";
import React, { useEffect, useState } from "react";
import StarRateTwoToneIcon from "@mui/icons-material/StarRateTwoTone";
import ReviewSkelton from "../MiniSkelton/ReviewSkelton";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { fetchReviewData } from "@/hooks/miniSite";
import { useRouter } from "next/router";
import { handleTrackUser, trackPageView } from "@/components/common/common";

function Ratings() {
  const { allReview } = useSelector((state: any) => state.miniSite);
  return (
    <ReviewBoxP>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid rgba(217, 217, 217, 1)"
        pb={{ xs: 1.2 }}
      >
        <Stack
          className="ratingreview"
          direction="row"
          justifyContent="space-between"
          alignItems="end"
          spacing={{ xs: 0.5, md: 1 }}
          height="36px"
        >
          <ReviewHeading variant="h2">Ratings & Reviews </ReviewHeading>
          <ReviewSubHeading>({allReview?.total} Ratings) </ReviewSubHeading>
        </Stack>
      </Stack>
      <Box display={{ xs: "block", md: "inline-block" }} paddingY={{ xs: 1 }}>
        <RatingBox pb={{ xs: 1.5, md: 0 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="baseline"
            spacing={{ xs: 0, md: 1 }}
          >
            <RatingValue>
              {allReview?.rating_group?.overall_avg
                ? Math.floor(allReview?.rating_group?.overall_avg)
                : 0}
              <span>/5</span>
            </RatingValue>
            <Rating
              size="large"
              name="read-only"
              value={allReview?.rating_group?.overall_avg}
              readOnly
              icon={<StarRateTwoToneIcon fontSize="small" />}
              emptyIcon={<StarRateTwoToneIcon fontSize="small" />}
            />
          </Stack>
          <RatingLable2>Reviewed by {allReview?.total} Users</RatingLable2>
        </RatingBox>
      </Box>
    </ReviewBoxP>
  );
}

function ReviewSmallheading() {
  const [value, setValue] = React.useState<number | null>(2);
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuality] = useState("");
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        borderBottom="1px solid rgba(217, 217, 217, 1)"
        pb={{ xs: 1.4 }}
        pt={{ xs: 0.2, md: 0.2, lg: 1.2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={{ xs: 1 }}
        >
          <ReviewHeaderIcon>
            <img src="/assets/pcicon5.svg" alt="icon" />
          </ReviewHeaderIcon>
          <ReviewHeadingsm variant="h2">User Satisfaction </ReviewHeadingsm>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 1 }}
        >
          <ReviewText13 txtcolor="rgba(34, 51, 84, 0.7)">
            How ratings work
          </ReviewText13>
          <Tooltip
            placement="bottom-start"
            title="The overall supplier performance is calculated as the average score of three factors: supplier service, on-time shipment, and product quality. Each factor is calculated based on dividing the total factor score by the number of buyer reviews in the past 365 days."
            arrow
          >
            <ButtonBase onClick={handleTooltipOpen}>
              <img src="/assets/pcicon4.svg" alt="icon" />
            </ButtonBase>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
}

function CustomerReview({ total }) {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={{ xs: 1 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <ReviewHeadingsm variant="h2">Customer Reviews </ReviewHeadingsm>
          <ReviewSubHeadingsm>({total || 0}) </ReviewSubHeadingsm>
        </Stack>
      </Stack>
    </Box>
  );
}

function RatingSlider({
  avg,
  color,
  intialVal,
  hideIntial,
  total,
  endVal,
  Icon,
  hideEndVal,
}: any) {
  function ratingPercentage() {
    const precentage = (endVal / total) * 100;
    if (precentage != Infinity || isNaN(precentage)) {
      if (isNaN(precentage)) {
        return 0;
      } else {
        return Math.floor(precentage);
      }
    } else {
      return 0;
    }
  }
  return (
    <Grid container spacing={{ xs: 0.5 }}>
      {!hideIntial && (
        <Grid item xs={1.5}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 0.5 }}
          >
            {intialVal && (
              <RatingLable fw={600} txtcolor="rgba(35, 31, 32, 1)">
                {intialVal}
              </RatingLable>
            )}
            {Icon && (
              <StarRateTwoToneIcon
                sx={{ width: "15px", height: "15pxpx" }}
                style={{ color: "black" }}
              />
            )}
          </Stack>
        </Grid>
      )}
      <Grid item xs={hideEndVal || hideIntial ? 10.5 : 9}>
        <CustomeRatingSlider
          clr={color}
          value={
            hideIntial == true
              ? Math.floor((avg / 5) * 100)
              : ratingPercentage()
          }
          aria-labelledby="input-slider"
        />
      </Grid>
      <Grid item xs={1.5} display={{ xs: hideEndVal, lg: "block" }}>
        <RatingLable fw={600} txtcolor="rgba(35, 31, 32, 1)">
          {hideIntial == true
            ? Math.floor((avg / 5) * 100)
            : ratingPercentage()}
          %
        </RatingLable>
      </Grid>
    </Grid>
  );
}

function GraphicalFeedback({ intialVal, data, endVal, Icon }: any) {
  const [activeInfo, setActiveInfo] = useState("quality");
  const [activeTab, setActiveTab] = useState<any>();
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (activeInfo === "quality") {
      const tabdata = {
        total: data?.quality_total,
        avg: data?.quality_avg,
        five_star: data?.quality_five_star,
        four_star: data?.quality_four_star,
        three_star: data?.quality_three_star,
        two_star: data?.quality_two_star,
        one_star: data?.quality_one_star,
        name: activeInfo,
        overalltotal: data?.overall_total,
      };
      setActiveTab(tabdata);
    }
    if (activeInfo === "response") {
      const tabdata = {
        total: data?.response_total,
        avg: data?.response_avg,
        five_star: data?.response_five_star,
        four_star: data?.response_four_star,
        three_star: data?.response_three_star,
        two_star: data?.response_two_star,
        one_star: data?.response_one_star,
        name: activeInfo,
        overalltotal: data?.overall_total,
      };
      setActiveTab(tabdata);
    }
    if (activeInfo === "delivery") {
      const tabdata = {
        total: data?.delivery_total,
        avg: data?.delivery_avg,
        five_star: data?.delivery_five_star,
        four_star: data?.delivery_four_star,
        three_star: data?.delivery_three_star,
        two_star: data?.delivery_two_star,
        one_star: data?.delivery_one_star,
        name: activeInfo,
        overalltotal: data?.overall_total,
      };
      setActiveTab(tabdata);
    }
  }, [activeInfo]);

  function handleclick(val) {
    setActiveInfo(val);
  }

  return (
    <Box>
      <ReviewSmallheading />
      <UserSatisfaction>
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box
              pr={{ xs: 0, sm: 3 }}
              style={{
                paddingLeft: "0px!important",
                paddingBottom: "0 !important",
              }}
              paddingTop={{ xs: 1, sm: 3 }}
            >
              <Stack spacing={{ xs: 2 }} mr={{ sm: 0, xs: 2 }}>
                <ResponseContainer
                  sx={{ cursor: "pointer" }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    handleclick("quality");
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  bg="#ECFAF2"
                  bordercolor="#B7FFD6"
                  padding="2px 8px"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1 }}
                  >
                    <ResponseIconContainer clr="#34A853">
                      <img src="/assets/pcicon6.svg" alt="icon" />
                    </ResponseIconContainer>
                    <RatingPercent flexGrow={1}>
                      <RatingLable fw={600} txtcolor="rgba(35, 31, 32, 1)">
                        Quality
                      </RatingLable>
                      <RatingSlider
                        hideEndVal="none"
                        hideIntial={true}
                        avg={data?.quality_avg}
                        total={data?.quality_avg}
                        endVal={data?.quality_total}
                        color="#34A853"
                      />
                    </RatingPercent>
                  </Stack>
                </ResponseContainer>
                <ResponseContainer
                  sx={{ cursor: "pointer" }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    handleclick("response");
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  bg="#FFF3F5"
                  bordercolor="#FFD8DF"
                  paddingX={{ xs: 1 }}
                  paddingY={{ xs: 0.5, lg: 1 }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1 }}
                  >
                    <ResponseIconContainer clr="#FF5960">
                      <img src="/assets/pcicon6.svg" alt="icon" />
                    </ResponseIconContainer>
                    <RatingPercent flexGrow={1}>
                      <RatingLable fw={600} txtcolor="rgba(35, 31, 32, 1)">
                        Response
                      </RatingLable>
                      <RatingSlider
                        hideEndVal="none"
                        hideIntial={true}
                        avg={data?.response_avg}
                        total={data?.response_avg}
                        endVal={data?.response_total}
                        color="#FF5960"
                      />
                    </RatingPercent>
                  </Stack>
                </ResponseContainer>
                <ResponseContainer
                  sx={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    handleclick("delivery");
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  bg="#FFF3E0"
                  bordercolor="#FFE9C6"
                  paddingX={{ xs: 1 }}
                  paddingY={{ xs: 0.5, lg: 1 }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1 }}
                  >
                    <ResponseIconContainer clr="#FFA319">
                      <img src="/assets/pcicon6.svg" alt="icon" />
                    </ResponseIconContainer>
                    <RatingPercent flexGrow={1}>
                      <RatingLable fw={600} txtcolor="rgba(35, 31, 32, 1)">
                        Delivery
                      </RatingLable>
                      <RatingSlider
                        hideEndVal="none"
                        hideIntial={true}
                        avg={data?.delivery_avg}
                        total={data?.delivery_avg}
                        endVal={data?.delivery_total}
                        color="#FFA319"
                      />
                    </RatingPercent>
                  </Stack>
                </ResponseContainer>
              </Stack>
            </Box>
          </Grid>
          <Grid
            className="Delivery"
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: isHovered ? "flex" : "none",
            }}
          >
            <FeedbackTooltip activeData={activeTab} />
          </Grid>
        </Grid>
      </UserSatisfaction>
    </Box>
  );
}

function FeedbackTooltip({ color, activeData, Icon }: any) {
  const [tooltipdata, setTooltipdata] = useState<any>({});
  var currentColor = "";
  var background = "";

  useEffect(() => {
    if (activeData) {
      const {
        name,
        total,
        avg,
        five_star,
        four_star,
        three_star,
        two_star,
        one_star,
      } = activeData;
      setTooltipdata({
        name,
        total,
        avg,
        five_star,
        four_star,
        three_star,
        two_star,
        one_star,
      });
    }
  }, [activeData]);
  function arrowPos() {
    if (tooltipdata?.name === "quality") {
      currentColor = "rgb(52, 168, 83)";
      background = "red";
      return "8%";
    }
    if (tooltipdata?.name === "response") {
      currentColor = "rgb(255, 89, 96)";
      return "48%";
    }
    if (tooltipdata?.name === "delivery") {
      currentColor = "rgb(255, 163, 25)";
      return "85%";
    }
  }
  function arrowBG() {
    if (tooltipdata?.name === "quality") {
      background = "#ECFAF2";
      return background;
    }
    if (tooltipdata?.name === "response") {
      background = "#FFF3F5";
      return background;
    }
    if (tooltipdata?.name === "delivery") {
      background = "#FFF3E0";
      return background;
    }
  }
  function BGcolor() {
    let background = "";
    let border = "";

    if (tooltipdata?.name === "quality") {
      background = "#ECFAF2";
      border = "1px solid #B7FFD6";
    } else if (tooltipdata?.name === "response") {
      background = "#FFF3F5";
      border = "1px solid #FFD8DF";
    } else if (tooltipdata?.name === "delivery") {
      background = "#FFF3E0";
      border = "1px solid #FFE9C6";
    }

    return { background, border };
  }

  return (
    <FeedbackTooltipBox
      sx={{
        background: BGcolor,
        border: BGcolor,
        boxShadow: "rgba(99, 99, 99, 0.4) 0px 5px 8px 0px",
        width: "100%",
      }}
      p={{ xs: 2 }}
      mt={{ xs: 2, sm: 3 }}
      arrowTop={arrowPos()}
      background={arrowBG()}
    >
      <Box borderBottom="1px solid #D9D9D9">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={{ xs: 1 }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={{ xs: 1 }}
          >
            <ReviewHeadingsm variant="h2">{tooltipdata?.name} </ReviewHeadingsm>
          </Stack>
        </Stack>
      </Box>
      <Stack mt={{ xs: 2 }}>
        <RatingSlider
          color={currentColor}
          intialVal="5"
          endVal={tooltipdata?.five_star}
          total={tooltipdata?.total}
          Icon={true}
        />
        <RatingSlider
          color={currentColor}
          intialVal="4"
          endVal={tooltipdata?.four_star}
          total={tooltipdata?.total}
          Icon={true}
        />
        <RatingSlider
          color={currentColor}
          backgroundColor={background}
          intialVal="3"
          endVal={tooltipdata?.three_star}
          total={tooltipdata?.total}
          Icon={true}
        />
        <RatingSlider
          color={currentColor}
          backgroundColor={background}
          intialVal="2"
          endVal={tooltipdata?.two_star}
          total={tooltipdata?.total}
          Icon={true}
        />
        <RatingSlider
          color={currentColor}
          backgroundColor={background}
          intialVal="1"
          endVal={tooltipdata?.one_star}
          total={tooltipdata?.total}
          Icon={true}
        />
      </Stack>
    </FeedbackTooltipBox>
  );
}

function ReviewAndRating() {
  const [ratinggroup, setRatinggroup] = useState<any>();
  let { asPath } = useRouter();
  const [reviewloader, setReviewloader] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [getTrackedId, setgetTrackedId] = useState("");
  let isScrolling: any;
  const { userInfo, allReview } = useSelector((state: any) => state.miniSite);
  useEffect(() => {
    if (allReview) {
      const { rating_group } = allReview;
      setRatinggroup(rating_group);
    }
  }, [allReview]);

  useEffect(() => {
    (async () => {
      localStorage.removeItem("scrollPercentage");
      let response = await trackPageView(
        asPath,
        "",
        "mini-site-reviews",
        "",
        ""
      );
      setgetTrackedId(response);
    })();
  }, []);

  useEffect(() => {
    const handleTrackUSer = (event) => {
      window.clearTimeout(isScrolling);
      if (getTrackedId !== "") {
        if (event?.type === "scroll") {
          isScrolling = setTimeout(function () {
            handleTrackUser(event, "", getTrackedId);
          }, 100);
        } else {
          handleTrackUser(event, "", getTrackedId);
        }
      }
    };
    document.addEventListener("click", handleTrackUSer, true);
    document.addEventListener("scroll", handleTrackUSer);
    return () => {
      document.removeEventListener("click", handleTrackUSer, true);
      document.removeEventListener("scroll", handleTrackUSer);
    };
  }, [getTrackedId]);

  useEffect(() => {
    async function fetchMyAPI() {
      setReviewloader(true);
      await dispatch(fetchReviewData(userInfo?.basic_information?.slug));
      setReviewloader(false);
    }
    fetchMyAPI();
    let interval;
    const checkApi = async () => {
      interval = await setInterval(
        () =>
          trackPageView(asPath, "yes", "mini-site-reviews", "", getTrackedId),
        30000
      );
    };
    checkApi();
    return () => {
      clearInterval(interval);
    };
  }, [getTrackedId]);

  return (
    <Box>
      {reviewloader && <ReviewSkelton key={1} />}
      {!reviewloader && (
        <CertificateOuter
          p={{ xs: 1, sm: 2 }}
          bshadow="0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)"
        >
          <Grid container spacing={{ xs: 2 }}>
            <Grid item xs={12} sm={12} md={4}>
              <Ratings />
              <CustomerReview total={ratinggroup?.overall_total} />
              <Stack mt={{ xs: 1 }}>
                <RatingSlider
                  intialVal="5"
                  total={ratinggroup?.overall_total}
                  endVal={ratinggroup?.overall_five_star}
                  Icon={true}
                />
                <RatingSlider
                  intialVal="4"
                  total={ratinggroup?.overall_total}
                  endVal={ratinggroup?.overall_four_star}
                  Icon={true}
                />
                <RatingSlider
                  intialVal="3"
                  total={ratinggroup?.overall_total}
                  endVal={ratinggroup?.overall_three_star}
                  Icon={true}
                />
                <RatingSlider
                  intialVal="2"
                  total={ratinggroup?.overall_total}
                  endVal={ratinggroup?.overall_two_star}
                  Icon={true}
                />
                <RatingSlider
                  intialVal="1"
                  total={ratinggroup?.overall_total}
                  endVal={ratinggroup?.overall_one_star}
                  Icon={true}
                />
              </Stack>
            </Grid>
            <Grid item xs>
              <GraphicalFeedback data={ratinggroup} />
            </Grid>
          </Grid>
        </CertificateOuter>
      )}
    </Box>
  );
}

export default ReviewAndRating;

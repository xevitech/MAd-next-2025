import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  BoxText,
  Buttonstyle,
  Commentsection,
  Delivery,
  Floatright,
  MiniSiteContainer,
  Nohtml,
  Qualitybox,
  Ratingg,
  Response,
  TextBlack,
  Thumbsup,
  Wrong,
  SellerThumbImg,
} from "../styled";
import ReviewAndRating from "./ReviewAndRating";
import { Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { apiClient, trackPageView } from "@/components/common/common";
import { toast } from "react-toastify";
import CommentList from "./CommentList";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { fetchReviewData, setUpdateFeedback } from "@/hooks/miniSite";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import SingleSlider from "../SingleSlider";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFA31A",
  },
});

const labels: { [index: string]: string } = {
  1: "Awful",

  2: "Poor",

  3: "Ok",

  4: "Good",

  5: "Excellent",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewHome = () => {
  const commentBoxRef = useRef();
  const { minisiteUserID, headerData } = useSelector(
    (state: any) => state.miniSite
  );
  const dispatch = useAppDispatch();
  const { userInfo, updateFeedback } = useSelector(
    (state: any) => state.miniSite
  );
  let userData = localStorage.getItem("userData");
  let user = JSON.parse(userData);
  const [comment, setComment] = useState<any>("");
  const [error, setError] = useState<any>("");
  const [quantityError, setQuantityError] = useState<any>("");
  const [quality, setQuality] = React.useState<number | null>(0);
  const [qualityHover, setQualityHover] = React.useState(-1);
  const [response, setResponse] = React.useState<number | null>(0);
  const [responseError, setResponseError] = useState<any>("");
  const [responseHover, setResponseHover] = React.useState(-1);
  const [delivery, setDelivery] = React.useState<number | null>(0);
  const [deliveryHover, setDeliveryHover] = React.useState(-1);
  const [feedbackLoader, setFeedbackLoader] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const { allReview } = useSelector((state: any) => state.miniSite);
  const [deliveryError, setDeliveryError] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const handleChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setComment("");
    } else {
      setComment(inputValue);
    }
  };

  const { banner_setting = [] } = allReview;

  useEffect(() => {
    if (updateFeedback?.length > 0) {
      setQuality(updateFeedback?.[0]?.quality);
      setResponse(updateFeedback?.[0]?.response);
      setDelivery(updateFeedback?.[0]?.delivery);
      setComment(updateFeedback?.[0]?.comments);
    }
  }, [updateFeedback]);
  const shouldSubmitReview =
    user?.id !== minisiteUserID &&
    allReview &&
    allReview.can_submit_review === false
      ? true
      : false;

  const submitFeedback = async () => {
    if (quality === 0) {
      setQuantityError(true);
      return;
    } else if (response === 0) {
      setResponseError(true);
      return;
    } else if (delivery === 0) {
      setDeliveryError(true);
      return;
    }
    if (updateFeedback?.length > 0) {
      setFeedbackLoader(true);
      let res = await apiClient(
        `front/mini-site/update-review/${updateFeedback?.[0]?.id}`,
        "PATCH",
        {
          body: {
            quality: quality,
            response: response,
            delivery: delivery,
            comments: comment,
            shop_id: headerData.basic_information.user_id,
            user_id: user?.id,
          },
        }
      );

      if (res.status == true || res.status == 200) {
        setQuality(0);
        setResponse(0);
        setDelivery(0);
        setComment("");
        dispatch(setUpdateFeedback([]));
        await dispatch(fetchReviewData(userInfo?.basic_information?.slug));
        toast.success(
          "We’re really grateful and appreciate you taking the time to share your rating with us"
        );
      }
      setFeedbackLoader(false);
    } else {
      if (!user?.id) {
        toast.error("Please login to review");
        return;
      } else if (user?.id == minisiteUserID) {
        toast.error("You can not review your profile");
        return;
      }

      if (
        comment.length == "" ||
        comment.length == null ||
        comment.length > 400 ||
        comment.length < 4
      ) {
        setError(true);
      } else {
        setFeedbackLoader(true);
        let res = await apiClient("front/mini-site/submit-review", "post", {
          body: {
            quality: quality,
            response: response,
            delivery: delivery,
            comments: comment,
            shop_id: headerData.basic_information.user_id,
            user_id: user?.id,
          },
        });

        if (res.status == false) {
          toast.error(res.message);
        } else {
          setQuality(0);
          setResponse(0);
          setDelivery(0);
          setComment("");
          toast.success(
            "We’re really grateful and appreciate you taking the time to share your rating with us"
          );
          await dispatch(fetchReviewData(userInfo?.basic_information?.slug));
        }
        setFeedbackLoader(false);
        setLoader(false);
      }
    }
  };

  return (
    <>
      <Box>
        {banner_setting?.length > 0 && (
          <SingleSlider settings={banner_setting[0]} type="reviews" />
        )}
        <MiniSiteContainer className="sectionspacing">
          <Stack spacing={{ xs: 2.5 }} paddingX={{ xs: 1, sm: 0 }}>
            <ReviewAndRating />
            <CommentList />
            {shouldSubmitReview && (
              <Box
                p={{ xs: 1, sm: 2 }}
                sx={{
                  backgroundColor: "#ffff",
                  boxShadow:
                    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                  borderRadius: "6px",
                }}
              >
                <Box display={"flex"} alignItems={"center"} mb={1}>
                  <Thumbsup />
                  <Ratingg sx={{ fontWeight: "600" }}>Rate Seller</Ratingg>
                </Box>
                <Divider />

                <Box mt={4}>
                  <Box>
                    <Qualitybox>
                      <Grid
                        container
                        display={"flex"}
                        alignItems={"center"}
                        p={1}
                      >
                        <Grid
                          item
                          md={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <SellerThumbImg>
                            <img src="/assets/Quality21.svg" alt="" />
                          </SellerThumbImg>
                          <BoxText sx={{ fontWeight: "600" }}>Quality</BoxText>
                        </Grid>
                        <Grid item md={3}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <StyledRating
                              name="size-small"
                              value={quality}
                              size="small"
                              getLabelText={getLabelText}
                              onChange={(event, newValue) => {
                                if (quantityError) {
                                  setQuantityError(false);
                                }
                                setQuality(newValue);
                              }}
                              onChangeActive={(event, newHover) => {
                                setQualityHover(newHover);
                              }}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                            {quality !== null && (
                              <Box sx={{ ml: 2, fontSize: "14px" }}>
                                {
                                  labels[
                                    qualityHover !== -1 ? qualityHover : quality
                                  ]
                                }
                              </Box>
                            )}
                          </Box>

                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          ></Box>
                        </Grid>
                      </Grid>
                    </Qualitybox>
                  </Box>
                  {quantityError && (
                    <Box>
                      <Nohtml
                        style={{
                          color: quantityError ? "#d7282f " : "",
                        }}
                      >
                        Quality must be selected.
                      </Nohtml>
                    </Box>
                  )}
                  <Box mt={2}>
                    <Response sx={{}}>
                      <Grid
                        container
                        display={"flex"}
                        alignItems={"center"}
                        p={1}
                      >
                        <Grid
                          item
                          md={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <SellerThumbImg>
                            <img src="/assets/Resonse.svg" alt="" />
                          </SellerThumbImg>
                          <BoxText sx={{ fontWeight: "600" }}>Response</BoxText>
                        </Grid>
                        <Grid item md={3}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <StyledRating
                              name="size-large"
                              value={response}
                              size="small"
                              getLabelText={getLabelText}
                              onChange={(event, newValue) => {
                                if (responseError) {
                                  setResponseError(false);
                                }

                                setResponse(newValue);
                              }}
                              onChangeActive={(event, newHover) => {
                                setResponseHover(newHover);
                              }}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                            {response !== null && (
                              <Box sx={{ ml: 2, fontSize: "14px" }}>
                                {
                                  labels[
                                    responseHover !== -1
                                      ? responseHover
                                      : response
                                  ]
                                }
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Response>
                  </Box>
                  {responseError && (
                    <Box>
                      <Nohtml
                        style={{
                          color: responseError ? "#d7282f " : "",
                        }}
                      >
                        Response must be selected.
                      </Nohtml>
                    </Box>
                  )}
                  <Box mt={2}>
                    <Delivery>
                      <Grid
                        container
                        display={"flex"}
                        alignItems={"center"}
                        p={1}
                      >
                        <Grid
                          item
                          md={2}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <SellerThumbImg>
                            <img src="/assets/Delivery.svg" alt="" />
                          </SellerThumbImg>
                          <BoxText sx={{ fontWeight: "600" }}>Delivery</BoxText>
                        </Grid>
                        <Grid item md={3}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {" "}
                            <StyledRating
                              name="size-large"
                              value={delivery}
                              size="small"
                              getLabelText={getLabelText}
                              onChange={(event, newValue) => {
                                if (deliveryError) {
                                  setDeliveryError(false);
                                }

                                setDelivery(newValue);
                              }}
                              onChangeActive={(event, newHover) => {
                                setDeliveryHover(newHover);
                              }}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                            {delivery !== null && (
                              <Box sx={{ ml: 2, fontSize: "14px" }}>
                                {
                                  labels[
                                    deliveryHover !== -1
                                      ? deliveryHover
                                      : delivery
                                  ]
                                }
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Delivery>
                  </Box>
                  {deliveryError && (
                    <Box>
                      <Nohtml
                        style={{
                          color: deliveryError ? "#d7282f " : "",
                        }}
                      >
                        Delivery must be selected.
                      </Nohtml>
                    </Box>
                  )}
                </Box>

                {allReview?.can_submit_review === true ? (
                  ""
                ) : (
                  <Box mt={4}>
                    <Wrong sx={{ fontWeight: "600" }}>Comments</Wrong>
                  </Box>
                )}
                {allReview?.can_submit_review === true ? (
                  ""
                ) : (
                  <Box mt={1}>
                    <Commentsection
                      onFocus={(e) => setInputFocus(true)}
                      onBlur={(e) => setInputFocus(false)}
                      id={"comment-box"}
                      ref={commentBoxRef}
                      aria-label="minimum height"
                      minRows={4}
                      placeholder="write a comment...."
                      onChange={(e) => {
                        handleChangeHandler(e);
                      }}
                      value={comment}
                      style={{ border: error ? "1px solid #d7282f " : "" }}
                    />
                    <Box display={"flex"} justifyContent={"space-between"}>
                      {error && (
                        <Box>
                          <Nohtml style={{ color: error ? "#d7282f " : "" }}>
                            Your message must be between 4-150 characters
                          </Nohtml>
                        </Box>
                      )}
                    </Box>
                    <Box mt={0.7}>
                      <TextBlack fontWeight={"600"}>
                        The name “{user?.name ? user.name : ""}” will be
                        displayed with your feedback.
                      </TextBlack>
                    </Box>
                    <Floatright>
                      <Buttonstyle
                        sx={{ opacity: comment ? 1 : 0.45, height: "35px" }}
                        disabled={comment ? false : true}
                        data-tracking="seller-review-submit"
                        onClick={() => {
                          submitFeedback();
                        }}
                      >
                        {feedbackLoader ? (
                          <ThreeDots
                            height="18"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Submit Feedback"
                        )}
                      </Buttonstyle>
                      {comment && (
                        <Buttonstyle
                          sx={{
                            height: "35px !important",
                            backgroundColor: "#fff !important",
                            color: "#231f20 !important",
                            border: "1px solid #231f20 !important",
                            transition: "all ease .3s",
                            "&:hover": {
                              color: "#fff !important",
                              backgroundColor: "#231f20 !important",
                              border: "1px solid #231f20 !important",
                              transition: "all ease .3s",
                            },
                          }}
                          onClick={() => {
                            setQuality(0);
                            setResponse(0);
                            setDelivery(0);
                            setComment("");
                            dispatch(setUpdateFeedback([]));
                          }}
                        >
                          Cancel
                        </Buttonstyle>
                      )}
                    </Floatright>
                  </Box>
                )}
              </Box>
            )}
          </Stack>
        </MiniSiteContainer>
      </Box>
    </>
  );
};

export default ReviewHome;

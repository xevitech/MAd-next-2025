import React, { useContext, useLayoutEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  ButtonBase,
  CardContent,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Stack } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { MyAppContext } from "@/contextApi/appContext";
import router from "next/router";
import { ChipCustom } from "../profile/personalProfile/styles";
import { Card, CirculerBox } from "./style";
import { useSelector } from "react-redux";
import { FirstletterCapital } from "../common/common";
import moment from "moment";
import { MapcrowntBoxImage } from "../miniSite/styled";
import { LightTooltip } from "../common/Tooltip/tooltip";

const Flex = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  "@media screen and (max-width:350px)": {
    display: "block",
  },
}));

const Welcome = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "18px ",
  color: "#231F20",
  "& span": {
    fontWeight: "600",
  },
  "@media screen and (max-width:988px)": {
    fontSize: "15px ",
  },
}));

const UserName = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "21px",
  "@media screen and (max-width:988px)": {
    fontSize: "15px ",
  },
}));

const Para = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#7B7979",
}));

const Member = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: "14px",
  color: "#231F20",
  "@media screen and (max-width:480px)": {
    textAlign: "left",
  },
}));

const PCMnSeller = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#7B7979",
  width: "70%",
}));

const Seller = styled(Typography)(() => ({
  fontWeight: "400",
  fontSize: "14px",
  color: "#7B7979",
  width: "30%",
}));

const Helo = styled(ButtonBase)(() => ({
  padding: "10px",
  fontWeight: "400",
  fontSize: "13px",
  color: "#D7282F",
  border: "1px solid #D7282F",
  borderRadius: "6px",
  fontFamily: "open sans",
  width: "130px",
  height: "35px",
  transition: "ease-in .3s",
  "&:hover": {
    background: "#D7282F",
    color: "#fff",
    border: `1px solid "#d7282fcc"}`,
  },
  "& .MuiBox-root": {
    borderColor: "white",
  },
}));

const MemberIdsection = styled("div")(() => ({
  margin: "10px 0 0",
  width: "100%",
}));

const ButtonView = styled("div")(() => ({
  margin: "12px 0 0",
}));

const Userbtn = styled(PersonOutlineOutlinedIcon)(() => ({
  height: "20px",
  width: "20px",
}));

export const Buttonone = styled(ButtonBase)(() => ({
  border: "1px solid #D7282F",
  color: "#D7282F",
  fontSize: "13px",
  fontWeight: "400",
  height: "35px",
  width: "130px",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "ease-in .3s",
  "&:hover": {
    backgroundColor: "#D7282F",
    color: "#ffff",
    "& .MuiBox-root": {
      borderColor: "white !important",
    },
  },
}));

export const Dividerheight = styled(Box)(() => ({
  border: "1px solid #D7282F !important",
  height: "15px",
  transition: "ease-in .3s",
  margin: "0px 5px",
}));

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        style={{
          width: "127px",
          height: "125px",
          color: "#4caf50",
          position: "relative",
          zIndex: "1",
        }}
      />
      <Box
        sx={{
          top: "-1px",
          left: "0",
          bottom: "-1px",
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e7e7e7",
          borderRadius: "100%",
          overflow: "hidden",
          padding: "0",
          "&:before": {
            position: "absolute",
            background: "#ffffff",
            content: '" "',
            left: "0",
            top: "0",
            right: "-1px",
            bottom: "-1px",
            borderRadius: "100%",
            margin: "11px",
          },
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            position: "relative",
            zIndex: "1",
            fontSize: "21px",
            fontWeight: "700",
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
const NavigateHandler = (route) => router.push(route);
export default function HeaderContent({ name }) {
  const { breakPoints }: any = useContext(MyAppContext);
  const {
    mobileverified,
    memberid,
    role,
    profileCompletionPercent,
    pendingFields,
    memberJoined,
    planBanner,
  } = useSelector((state: any) => state.userData);
  const date = memberJoined;
  const formattedDate = moment(date).format("DD/MM/YYYY");

  const { user_info } = useSelector((state: any) => state.userData);
  return (
    <>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card sx={{ minHeight: "170px" }}>
            <CardContent>
              <Flex>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    "@media screen and (max-width:480px)": { display: "block" },
                  }}
                >
                  <Welcome>
                    Welcome <span>{name}</span>
                  </Welcome>

                  {user_info?.type == "subuser" ? (
                    <></>
                  ) : mobileverified ? (
                    <LightTooltip title="Verified" placement="top" arrow>
                      <img src="/assets/badge.svg" alt="" />
                    </LightTooltip>
                  ) : (
                    <LightTooltip title="Not Verified" placement="top" arrow>
                      <img
                        style={{ height: 25 }}
                        src="/assets/unverified.svg"
                        alt=""
                      />
                    </LightTooltip>
                  )}
                  {planBanner ? (
                    <img src={planBanner} alt="" style={{ height: 25 }} />
                  ) : (
                    ""
                  )}
                </Box>
                <Box>
                  <Typography>{mobileverified}</Typography>
                </Box>
              </Flex>
              <Para>Check your new badge in your profile.</Para>
              <Divider
                sx={{ mt: "9px", borderColor: "#223354", opacity: "0.1" }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  "@media screen and (max-width:480px)": {
                    display: "block",
                  },
                }}
              >
                <MemberIdsection>
                  {memberid && (
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={4} md={6} lg={4}>
                        <Member>Member ID</Member>
                      </Grid>
                      <Grid item xs={6} sm={8} md={6} lg={8}>
                        <PCMnSeller>{memberid ? memberid : "---"}</PCMnSeller>
                      </Grid>
                    </Grid>
                  )}

                  {role && (
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={4} md={6} lg={4}>
                        <Member sx={{ textAlign: "left !important" }}>
                          Role
                        </Member>
                      </Grid>
                      <Grid item xs={6} sm={8} md={6} lg={8}>
                        <Seller>
                          {role == "both"
                            ? " Seller/Buyer"
                            : FirstletterCapital(role)}
                        </Seller>
                      </Grid>
                    </Grid>
                  )}
                  {role && (
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={4} md={6} lg={4}>
                        <Member sx={{ textAlign: "left !important" }}>
                          Member Since
                        </Member>
                      </Grid>
                      <Grid item xs={6} sm={8} md={6} lg={8}>
                        <Seller>{formattedDate}</Seller>
                      </Grid>
                    </Grid>
                  )}
                </MemberIdsection>
                {role !== "subuser" && (
                  <Box>
                    <ButtonView>
                      <Buttonone onClick={(e) => NavigateHandler("/profile")}>
                        <Userbtn />
                        <Dividerheight></Dividerheight>
                        View Profile
                      </Buttonone>
                    </ButtonView>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        {role !== "subuser" && (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card sx={{}}>
              <CardContent className="dashboardcontentt">
                <Grid container spacing={2}>
                  <Grid item sm={12} md={3} lg={3} xl={2.5}>
                    <CirculerBox>
                      <CircularProgressWithLabel
                        width={100}
                        height={100}
                        value={
                          profileCompletionPercent == 0 ||
                          !profileCompletionPercent
                            ? 1
                            : Number(profileCompletionPercent)
                        }
                        style={{ color: "#D7282F" }}
                      />
                    </CirculerBox>
                  </Grid>
                  <MapcrowntBoxImage></MapcrowntBoxImage>

                  <Grid item sm={12} md={9} lg={9} xl={9.5}>
                    <Box>
                      <UserName>
                        {" "}
                        {profileCompletionPercent == 100
                          ? "Completed"
                          : "Complete User Profile"}{" "}
                      </UserName>
                      <Para>
                        User with complete profile will get quicker responses to
                        inquiries.
                      </Para>
                      <Divider sx={{ mt: "9px" }} />

                      <Box
                        sx={{
                          // display: "flex",
                          flexWrap: "wrap",
                          mt: "9px",
                        }}
                      >
                        {pendingFields.length === 0 &&
                        profileCompletionPercent === 100 ? (
                          <>
                            <Box>
                              <Typography className="CompletedText">
                                Your personal profile is{" "}
                                <Box
                                  className="CompletedSpan"
                                  component={"span"}
                                  sx={{ cursor: "default !important" }}
                                >
                                  100%{" "}
                                </Box>{" "}
                                complete. You can click{" "}
                                <Box
                                  className="CompletedSpan"
                                  component={"span"}
                                  onClick={(e) => NavigateHandler("/profile/")}
                                >
                                  View Profile{" "}
                                </Box>
                                at any time to make changes or updates your
                                profile.{" "}
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <Box>
                            <Typography className="CompletedText">
                              Your personal profile is not complete. You can
                              click{" "}
                              <Box
                                className="CompletedSpan"
                                component={"span"}
                                onClick={(e) => NavigateHandler("/profile/")}
                              >
                                View Profile{" "}
                              </Box>
                              to visit your personal profile and update it.{" "}
                            </Typography>
                          </Box>
                        )}                        
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
}

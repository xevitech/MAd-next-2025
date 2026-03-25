import React, { useState } from "react";
import {
  BlueTxt,
  CurrentPlan,
  GreenBtn,
  GreenStatus,
  PlanOption,
  PlanToggleData,
  RedStatus,
  SeeAllFeature,
  ToggleArrow,
} from "@/components/Subscription/styles";
import {
  Button,
  Dialog,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import UpgradeModal from "@/components/Subscription/UpgradeModal";
import moment from "moment";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useRouter } from "next/router";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "react-redux";
const SummaryAccordian = ({
  tabIndex,
  setTabIndex,
  index,
  detail,
  setFetchPlanDetail,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }: any) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  let toggle = tabIndex === index ? true : false;
  const { feature_list } = detail;
  let time = moment.utc(detail?.created_at).toDate();
  let ltc = moment(time).format("YYYY-MM-DD HH:mm:ss");
  const router = useRouter();
  const [featureName, setFeatureName] = useState("");
  const handleClickOpen = (name) => {
    setFeatureName(name);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    width: "100%",
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const { role } = useSelector((state: any) => state.userData);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  return (
    <>
      {open && (
        <BootstrapDialog
          // onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "20px",
              padding: "24px",
            },
          }}
        >
          <UpgradeModal
            open={open}
            handleClose={() => setOpen(false)}
            detail={detail}
            featureData={featureName}
            setFetchPlanDetail={setFetchPlanDetail}
          />
        </BootstrapDialog>
      )}
      <CurrentPlan key={index}>
        <Typography variant="h6" component="h6">
          Current Plan
        </Typography>
        <PlanToggleData toggle={toggle}>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
              <PlanOption>
                <Typography variant="subtitle1">Plan Name</Typography>
                <Typography
                  component="span"
                  color="error"
                  sx={{ fontSize: "14px !important", fontWeight: "600" }}
                >
                  {detail?.name ?? ""}
                </Typography>
              </PlanOption>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <PlanOption>
                <Typography variant="subtitle1">
                  <GreenStatus
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img src="assets/active.svg" /> Active
                  </GreenStatus>
                </Typography>
                <Typography component="span">
                  Start{" "}
                  {detail?.start_date
                    ? moment(detail?.start_date).format("DD MMM YYYY")
                    : ""}
                </Typography>
              </PlanOption>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <PlanOption>
                <Typography variant="subtitle1">
                  ${detail?.amount}/month
                </Typography>
              </PlanOption>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <PlanOption>
                <Typography variant="subtitle1">
                  <RedStatus
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img src="assets/daysAgo.svg" />
                    {moment(ltc).fromNow()}
                  </RedStatus>
                </Typography>
                <Typography component="span">
                  Ends{" "}
                  {detail?.end_date
                    ? moment(detail?.end_date).format("DD MMM YYYY")
                    : ""}
                </Typography>
              </PlanOption>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <PlanOption style={{ cursor: "pointer" }}>
                {(role === "seller" ||
                  (role === "subuser" && 
                    permissions?.plans?.view==true 
                  )) && (
                  <Typography component="span">
                    <BlueTxt onClick={() => router.push("/plancards")}>
                      Upgrade
                    </BlueTxt>
                  </Typography>
                )}
              </PlanOption>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
              <PlanOption>
                <ToggleArrow>
                  {toggle ? (
                    <KeyboardArrowDownOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fontSize: "28px",
                      }}
                      onClick={() => setTabIndex(-1)}
                    />
                  ) : (
                    <KeyboardArrowUpOutlinedIcon
                      className="arrowB"
                      style={{
                        cursor: "pointer",
                        fontSize: "28px",
                      }}
                      onClick={() => setTabIndex(index)}
                    />
                  )}
                </ToggleArrow>
              </PlanOption>
            </Grid>
          </Grid>
          {toggle && (
            <SeeAllFeature>
              <Typography variant="h5" component="h5">
                See All Features
              </Typography>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="left"
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Unit Type
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Available
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {feature_list.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="left">
                          {row?.value == "no" ? (
                            <span>
                              <CloseOutlinedIcon
                                sx={{ fontSize: "16px", color: "#d7282F" }}
                              />
                            </span>
                          ) : row?.value == "yes" ? (
                            <span>
                              <CheckOutlinedIcon
                                sx={{ fontSize: "16px", color: "#34a853" }}
                              />
                            </span>
                          ) : (
                            <span>
                              <strong>{row?.currunt_value}</strong>
                              {row?.value && `/` + row?.value}
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row?.value == "no" || row?.value == "yes" ? (
                            <></>
                          ) : (
                            <span>
                              <strong>{row?.value - row?.currunt_value}</strong>
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row?.value == "no" || row?.value == "yes" ? (
                            <></>
                          ) : (
                            <BorderLinearProgress
                              variant="determinate"
                              value={(row.currunt_value / row?.value) * 100}
                            />
                          )}
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{ padding: "0px 16px 0px 16px" }}
                        >
                          {(role === "seller" ||
                            (role === "subuser" &&
                              permissions?.my_subscriptions?.add==true 
                              )) && (
                            <GreenBtn>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  handleClickOpen(row);
                                }}
                                disabled={
                                  detail?.name
                                    ?.toLowerCase()
                                    ?.includes("free") || row?.value == "yes"
                                    ? true
                                    : false
                                }
                              >
                                {row?.value == "no"
                                  ? "Add On"
                                  : row?.value == "yes"
                                  ? "Added"
                                  : "Buy More"}
                              </Button>
                            </GreenBtn>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </SeeAllFeature>
          )}
        </PlanToggleData>
      </CurrentPlan>
    </>
  );
};

export default SummaryAccordian;

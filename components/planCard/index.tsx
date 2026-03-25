import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import Plancardscss from "./plans.module.css";
import CustomizedTable from "./CustomizedTable";
import { GetCurrentPlan, apiClient } from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  Listitemtext1,
  Permonth,
  FeatureListBox,
  DialogOuterBox,
  CrossIconBox,
  CrossIconInnerBox,
  DialogContentBox,
  DialogContenttext,
} from "./style";

import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import Planskeleton from "./Planskeleton";
import FeaturelistSkeleton from "./FeaturelistSkeleton";
import { Dialog, keyframes, styled } from "@mui/material";
import { useAppDispatch } from "redux/store";
import { setAddListingLoader } from "@/hooks/appReducers";
const rotateBox = keyframes`
  0% {
    transform: rotateX(100deg);
    opacity:0;
  }
  100% {
    transform: rotateX(0deg);
    opacity:1;
  }
`;
const rotateImage = keyframes`
0% {
  transform: rotateZ(45deg);
  opacity: 0;
}

25% {
  transform: rotateZ(-25deg);
  opacity: .4;
}

50% {
  transform: rotateZ(15deg);
  opacity: .8;
}

100% {
  transform: rotateX(0);
  opacity: 1;
}
`;
const PlanIconBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  height: "56px",
  width: "56px",
  borderRadius: "50%",
  border: "2px solid #d7282f",
  alignItems: "center",
  animation: `${rotateBox} .5s`,
});

export const DialogImage = styled("img")({
  animation: `${rotateImage} 1s`,
});

export default function Bestprice() {
  const { profileInfos } = useSelector((state: any) => state.userData);
  const [subType, setSubType] = React.useState("month");
  const [planList, setPlanList] = React.useState<any>([]);
  const [featureList, setFeatureList] = React.useState<any>([]);
  const [loader, setLoder] = React.useState(false);
  const [color, setColor] = React.useState<string>("");
  const { countryCode } = useSelector((state: any) => state.geoLocation);
  const [activePlan, setActivePlan] = useState<any>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: any) => state.userData);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  React.useEffect(() => {
    fetchPlanList();

    setLoder(true);
  }, [countryCode, profileInfos]);

  const UpGradePlan = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "custom-btn cancel-button",
        cancelButton: "custom-btn remove-btn",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want to change plan?",
        text: "Your previous plan will be expire automatically!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, change it!`,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoder(true);
          let formData = new FormData();
          let userData = localStorage?.userData
            ? JSON.parse(localStorage?.userData)
            : {};
          formData.append("user_id", userData?.id ?? "");
          formData.append("plan_id", id ?? "");
          formData.append("payment_id", Math.random().toString(36).slice(2));
          formData.append("source", "API");
          formData.append("payment_mode", "COD");
          formData.append(
            "transaction_id",
            Math.random().toString(36).slice(2)
          );
          formData.append("gateway_id", "RAZORPAY");
          formData.append("status", "success");
          let response = await apiClient(
            "front/user/subscribe_plan",
            "post",
            {
              body: formData,
            },
            true
          );

          if (response.status === 200) {
            setLoder(false);
            toast.success("Your plan is activated successfully");
            await GetCurrentPlan();
            if (router.query.name) {
              const { name, currency, availability, type, is_placeholder } =
                router.query;
              router.push(
                `/products/List?add&name=${name}&type=${type}&availability=${availability}&currency=${currency}&is_placeholder=${is_placeholder}`
              );
              dispatch(setAddListingLoader(true));
            } else if (router?.query?.productId) {
              router.push(`/products/edit/${router?.query?.productId}`);
            } else {
              router.push("/subscription");
            }
          }
        } else {
          setLoder(false);
        }

        setColor("");
      });
  };
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const fetchPlanList = async () => {
    setLoder(true);
    let formData = new FormData();
    let userData = localStorage?.userData
      ? JSON.parse(localStorage?.userData)
      : {};
    formData.append("user_type", userData?.type ?? "");
    formData.append("user_id", userData?.id ?? "");
    formData.append("country_code", countryCode ? countryCode : "IN");
    let response = await apiClient(
      "front/user/plan_list",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      setLoder(false);
      const { feature_list, plan_list, active_plan_id } = response.data;
      setActivePlan(active_plan_id);
      let allPlanList = plan_list.map((plan, i) => {
        let plan_id = plan.plan_list
          .filter((v) => v.permission == "yes")
          .map((v) => v.featurelist_id);
        return {
          ...plan,
          planID: plan.planId,
          planId: plan_id,
          color: "",
          features: feature_list.map((v) => {
            if (plan_id.includes(v.id)) return v;
          }),
        };
      });
      let list = addColor(allPlanList);
      list?.sort((a, b) => a.id - b.id);
      const index = list?.findIndex((item) => item.id === active_plan_id);

      if (index !== -1) {
        const foundItem = list && list[index];
        list?.splice(index, 1);
        list?.unshift(foundItem);
      }
      setPlanList(list);
      let allFeature = feature_list.map((v) => ({ ...v, plans: allPlanList }));
      setFeatureList(allFeature);
      setLoder(false);
    }
  };

  const discountedPrice = (discount, sale_price) => {
    let toatalPrice: any;
    if (discount) {
      const discountPrice: any = (sale_price * discount) / 100;
      toatalPrice = parseInt(sale_price) + parseFloat(discountPrice);
    }
    return Math.round(toatalPrice);
  };

  const addColor = (planList) => {
    if (planList?.length > 0) {
      let plans = [...planList];
      for (let i: any = 0; i < plans.length; i++) {
        if (i === 0) {
          plans[i].color = "CGreen";
        } else if (i === 1) {
          plans[i].color = "Mgenta";
        } else if (i === 2) {
          plans[i].color = "Blue";
        } else if (i === 3) {
          plans[i].color = "Purple";
        } else if (i === 4) {
          plans[i].color = "Brown";
        } else if (plans[i - 1]?.color === "Brown") {
          plans[i].color = "CGreen";
        } else if (plans[i - 1]?.color === "CGreen") {
          plans[i].color = "Mgenta";
        } else if (plans[i - 1]?.color === "Mgenta") {
          plans[i].color = "Blue";
        } else if (plans[i - 1]?.color === "Blue") {
          plans[i].color = "Purple";
        } else if (plans[i - 1]?.color === "Purple") {
          plans[i].color = "Brown";
        } else {
          plans[i].color = "CGreen";
        }
      }
      return plans;
    }
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  planList.sort((a,b)=>a.sorting - b.sorting)
  return (
    <div className="full_page" style={{ paddingTop: "80px" }}>
      <div className={Plancardscss.MainBestprice}>
        <div className={Plancardscss.headbox}>
          <h2 className={Plancardscss.subheading}>
            The <strong>best work</strong> solution,
          </h2>
          <h1 className={Plancardscss.bestpriceheading}>
            for the{" "}
            <span className={Plancardscss.bestpricespan}>Best Price</span>
          </h1>

          <div className={Plancardscss.planbox}>
            <Box
              className={Plancardscss.mask}
              style={{
                transform: `translateX(${
                  subType === "month" ? "-56px" : "55px"
                })`,
              }}
            />
            <Button
              className={Plancardscss.ripplebtn}
              style={{ minWidth: "50%" }}
              variant="text"
              sx={{ color: subType === "month" ? "#ffffff" : "#231F20" }}
              onClick={() => setSubType("month")}
            >
              month
            </Button>
            <Button
              className={Plancardscss.ripplebtn}
              style={{ minWidth: "50%" }}
              variant="text"
              sx={{ color: subType === "yearly" ? "#ffffff" : "#231F20" }}
              onClick={() => setSubType("yearly")}
            >
              Annual
            </Button>
          </div>
        </div>

        <Grid container spacing={2} className={Plancardscss.plansection}>
          <Grid
            item
            xl={2.5}
            lg={3.5}
            md={3.5}
            sm={5}
            xs={12}
            position={"relative"}
          >
            <FeatureListBox
              sx={{
                width: "100%",
                "@media (max-width: 600px)": {
                  position: "relative !important",
                  height: "100% !important",
                  top: "0!important",
                  marginBottom: "16px",
                  borderWidth: "1px !important",
                  borderRadius: "10px!important",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-40px",
                  right: "0",
                  left: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "@media (max-width: 600px)": {
                    left: "16px",
                    right: "16px",
                  },
                  "& .MuiTypography-h6": {
                    fontSize: "18px",
                    width: "100%",
                    backgroundColor: "#d7282f",
                    color: "#ffffff",
                    padding: "0px 12px",
                    borderRadius: "8px 0 0 0",
                    textAlign: "center",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "@media (max-width: 600px)": {
                      borderRadius: "8px 8px 0 0",
                    },
                  },
                }}
              >
                <Typography variant="h6">Feature List</Typography>
              </Box>
              <Box
                sx={{
                  pt: 1,
                  height: "100%",
                  textAlign: "center",
                  border: "1px solid #d2d2d2",
                  borderRadius: "6px",
                  borderRight: "none",
                  background: "#fff",
                  "& .MuiListItemText-root": {
                    "&:nth-child(even)": {
                      background: "#f7f7f7",
                    },
                    "&:nth-child(odd)": {
                      backgroundColor: "#ffffff",
                    },

                    "& .MuiListItemText-primary": {
                      fontWeight: "400",
                    },
                  },
                }}
              >
                {loader ? (
                  <FeaturelistSkeleton />
                ) : (
                  featureList.map((item, i) => {
                    if (item) {
                      return <Listitemtext1>{item.name}</Listitemtext1>;
                    } else {
                      return <Listitemtext1 primary="---" />;
                    }
                  })
                )}
              </Box>
            </FeatureListBox>
          </Grid>

          {loader ? (
            <Planskeleton />
          ) : (
            <Grid
              item
              xl="auto"
              lg="auto"
              md={8}
              sm={6}
              xs={12}
              sx={{
                position: "relative",
                overflow: "auto",
                paddingTop: "20px!important",
                marginTop: "-4px",
                paddingBottom: "6px",
              }}
            >
              <FeatureListBox
                sx={{
                  width: "99%",
                  right: "-16px",
                  borderRadius: "0 !important",
                  borderWidth: "1px 0 1px 0!important",
                  left: "16px",
                  top: "171px!important",
                  height: "calc(100% - 254px) !important",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-40px",
                    right: "0",
                    left: "0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& .MuiTypography-h6": {
                      fontSize: "18px",
                      width: "100%",
                      backgroundColor: "#72707a",
                      color: "#ffffff",
                      padding: "0px",
                      borderRadius: "0",
                      textAlign: "center",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Typography variant="h6"></Typography>
                </Box>
                <Box
                  sx={{
                    pt: 1,
                    height: "100%",
                    textAlign: "center",
                  }}
                ></Box>
              </FeatureListBox>

              <Grid
                container
                spacing={2}
                sx={{
                  maxWidth: "1190px",
                  flexWrap: "nowrap",
                  "@media (min-width: 1700px) and (max-width: 1880px)": {
                    maxWidth: "1060px",
                  },
                  "@media (min-width: 1600px) and (max-width: 1700px)": {
                    maxWidth: "960px",
                  },
                  "@media (min-width: 1450px) and (max-width: 1600px)": {
                    maxWidth: "727px",
                  },
                  "@media (min-width: 1280px) and (max-width: 1450px)": {
                    maxWidth: "662px",
                  },
                  "@media (min-width: 1200px) and (max-width: 1280px)": {
                    maxWidth: "662px",
                  },
                }}
              >
                {planList?.length > 0 &&
                  planList.map((value, i) => {
                    const {
                      name,
                      features,
                      color,
                      is_featured,
                      plan_list,
                      discount_value,
                      sub_total,
                    } = value;
                    const planButtonColors = {
                      Free: "#02cc93",
                      Silver: "#fa3f93 ",
                      Gold: "#01afe9 ",
                      Enterprise: "#8345d3",
                    };
                    return (
                      <Grid
                        className={`${Plancardscss.MainGrid} ${Plancardscss.StartupCard}`}
                        flexDirection={"column"}
                        item
                        lg="auto"
                        xl="auto"
                        md="auto"
                        sm="auto"
                        xs="auto"
                        position={"relative"}
                      >
                        <FeatureListBox
                          sx={{
                            width: "16px",
                            right: "-16px",
                            borderRadius: "0 !important",
                            borderWidth: "1px 0 1px 0!important",
                            height: "calc(100% - 250px) !important",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "-40px",
                              right: "0",
                              left: "0px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              "& .MuiTypography-h6": {
                                fontSize: "18px",
                                width: "100%",
                                backgroundColor: "#f4f6fa",
                                color: "#ffffff",
                                padding: "0px",
                                borderRadius: "0",
                                textAlign: "center",
                                height: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              },
                            }}
                          >
                            <Typography variant="h6"></Typography>
                          </Box>
                          <Box
                            sx={{
                              pt: 1,
                              height: "100%",
                              textAlign: "center",
                              background: "#f4f6fa",
                            }}
                          ></Box>
                        </FeatureListBox>
                        {is_featured == 1 && (
                          <img
                            className={Plancardscss.popularimg}
                            src="/assets/popular_img.svg"
                            alt=""
                          />
                        )}
                        <Stack
                          className={Plancardscss.CardGrid}
                          sx={
                            value?.id == activePlan && {
                              border: `1px solid ${
                                color == "Purple"
                                  ? "#6b36af"
                                  : color == "CGreen"
                                  ? "#00b884"
                                  : color == "Mgenta"
                                  ? "#ec207b"
                                  : "#00a0d7"
                              }`,
                              position: "relative",
                            }
                          }
                        >
                          <Typography>
                            <h1
                              className={Plancardscss.number}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Box
                                component={"span"}
                                sx={{
                                  fontSize: "14px",
                                  margin: "0 10px 0 0",
                                  fontWeight: "300",
                                  color: "#767676",
                                }}
                              >
                                <del>
                                  {discount_value == 0 ? (
                                    ""
                                  ) : (
                                    <>
                                      {" "}
                                      <sup>$</sup>
                                      {sub_total}
                                    </>
                                  )}
                                </del>
                              </Box>
                              <sup className={Plancardscss.dollar}>$</sup>
                              {subType == "month"
                                ? value?.sale_price
                                : value?.sale_price * 12}
                            </h1>
                            <Permonth>Plan per {subType}</Permonth>
                          </Typography>
                          <Button
                            sx={{ cursor: "default" }}
                            className={`${Plancardscss[`Plan${color}B`]} ${
                              Plancardscss.PlanBtn
                            }`}
                          >
                            {name}
                          </Button>
                          <Box sx={{ pt: 1, height: "100%", width: "90%" }}>
                            {plan_list.map((item, i) => {
                              if (item) {
                                return (
                                  <>
                                    <Listitemtext1>
                                      {item.value === "no" || item.value < 0 ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "#d7282f",
                                            opacity: ".75",
                                          }}
                                        >
                                          <CloseIcon
                                            sx={{ fontSize: "18px" }}
                                          />

                                          <span style={{}}>
                                            <Box
                                              component={"span"}
                                              sx={{
                                                color: "#231f20",
                                                fontWeight: "500",
                                                textTransform: "capitalize",
                                              }}
                                            ></Box>
                                          </span>
                                        </Box>
                                      ) : item.value === "yes" ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "#231f20",
                                          }}
                                        >
                                          <CheckIcon
                                            sx={{
                                              color: "#231f20",
                                              fontSize: "18px",
                                            }}
                                          />{" "}
                                          <span style={{}}>
                                            <Box
                                              component={"span"}
                                              sx={{
                                                color: "#231f20",
                                                fontWeight: "500",
                                                textTransform: "capitalize",
                                              }}
                                            ></Box>
                                          </span>
                                        </Box>
                                      ) : item.value >= 1 ? (
                                        <Box
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            color: planButtonColors[name],
                                          }}
                                        >
                                          <span
                                            style={{
                                              marginLeft:
                                                item.value < 10
                                                  ? "0px"
                                                  : item.value > 100
                                                  ? "0px"
                                                  : "0",
                                            }}
                                          >
                                            <Box
                                              component={"span"}
                                              sx={{
                                                color: "#231f20",
                                                fontWeight: "500",
                                                textTransform: "capitalize",
                                              }}
                                            >
                                              {item.value}
                                            </Box>
                                          </span>
                                        </Box>
                                      ) : (
                                        <Typography
                                          sx={{
                                            color: "#231f20",
                                            fontWeight: "500",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {"N/A"}
                                        </Typography>
                                      )}
                                    </Listitemtext1>
                                  </>
                                );
                              } else {
                                return <Listitemtext1 primary="---" />;
                              }
                            })}
                          </Box>
                          {value?.id == activePlan ? (
                            <>
                            <Button
                              onClick={handleClickOpen}
                              className={`${Plancardscss.UpgradeBtn4Active}`}
                              sx={{
                                mb: 2,
                                color: "#fff",
                                backgroundColor: "#0aa133",
                                "&:hover": {
                                  backgroundColor: "#0aa133",
                                  color: "#fff",
                                },
                              }}
                            >
                              Active
                            </Button>
                            <Button
                            className={` ${
                                    Plancardscss[`Plan${color}Br`]
                                  } ${Plancardscss[`Plan${color}T`]}`}
                                  sx={{ mb: 2 }}
                                  onClick={() => {
                                    setColor(color);
                                    UpGradePlan(value.planID);
                                  }}>
                              Renew plan
                            </Button>
                            </>
                          ) : (
                            <>
                              {(role === "seller" ||
                                role === "buyer" ||
                                (role === "subuser" &&
                                  permissions?.plans?.add == true)) && (
                                <Button
                                  className={`${Plancardscss.UpgradeBtn} ${
                                    Plancardscss[`Plan${color}Br`]
                                  } ${Plancardscss[`Plan${color}T`]}`}
                                  sx={{ mb: 2 }}
                                  onClick={() => {
                                    setColor(color);
                                    UpGradePlan(value.planID);
                                  }}
                                >
                                  {value.planId == loader ? (
                                    <ThreeDots
                                      height="29"
                                      width="35"
                                      radius="9"
                                    />
                                  ) : planList?.find(
                                      (ele) => ele.id == activePlan
                                    )?.sale_price > +value?.sale_price ? (
                                    "Downgrade"
                                  ) : (
                                    "Upgrade"
                                  )}
                                </Button>
                              )}
                            </>
                          )}
                        </Stack>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          )}
          <Grid
            item
            xl={0.5}
            lg={0.5}
            md={0.5}
            sm={1}
            xs={12}
            position={"relative"}
          >
            <FeatureListBox
              sx={{
                width: "16px",
                left: "0px",
                borderRadius: "0 0px 10px 0 !important",
                borderWidth: "1px 0 1px 0!important",
                height: "calc(100% - 256px) !important",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-40px",
                  right: "0",
                  left: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiTypography-h6": {
                    fontSize: "18px",
                    width: "100%",
                    backgroundColor: "#f4f6fa",
                    color: "#ffffff",
                    padding: "0px",
                    borderRadius: "0 10px 0 0",
                    textAlign: "center",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <Typography variant="h6"></Typography>
              </Box>
              <Box
                sx={{
                  pt: 1,
                  height: "100%",
                  textAlign: "center",
                  background: "#f4f6fa",
                }}
              ></Box>
            </FeatureListBox>
          </Grid>
        </Grid>
        <CustomizedTable planList={planList} featureList={featureList} />
        <Dialog open={open} onClose={handleClose}>
          <DialogOuterBox>
            <CrossIconBox>
              <CrossIconInnerBox sx={{}} onClick={handleClose}>
                <CloseIcon sx={{ color: "#d7282f", fontSize: "1.5rem" }} />
              </CrossIconInnerBox>
            </CrossIconBox>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "16px 0 0 0",
              }}
            >
              <PlanIconBox sx={{}}>
                <DialogImage
                  src="/assets/images/powercozmo_plans.svg"
                  alt=""
                  style={{}}
                />
              </PlanIconBox>
            </Box>
            <DialogContentBox>
              <DialogContenttext>
                You have already subscribed to this plan.
              </DialogContenttext>
            </DialogContentBox>
          </DialogOuterBox>
        </Dialog>
      </div>
    </div>
  );
}

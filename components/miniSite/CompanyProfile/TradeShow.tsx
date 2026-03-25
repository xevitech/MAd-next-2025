import { apiClient } from "@/components/common/common";
import {
  Box,
  Collapse,
  Divider,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useLayoutEffect, useState } from "react";
import { CPTextViewBoxCP } from "./CompanyProfile.styled";
import CountrySelect from "@/components/common/countrydropdown/Index";
import moment from "moment";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import Carousel from "react-material-ui-carousel";
import EmptyPage from "../EmptyPages";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyAppContext } from "@/contextApi/appContext";
import { countries } from "@/utils/countries";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
const TradeShowImageox: any = styled(Box)(({ theme, bg }: any) => ({
  height: "200px",
}));
const Img: any = styled("img")(({ theme, bg }: any) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  "@media screen and (max-width:600px)": {
    height: "auto",
  },
}));
const TradeCompanySelectOption: any = styled("span")(({ theme, bg }: any) => ({
  "& .MuiFormControl-root": {
    width: "100px",
    "& img": {
      marginRight: "8px !important",
    },
    "& .MuiInput-input": {
      fontSize: "12px",
      padding: "3px 4px 3px 0px !important",
    },
  },
}));
interface TradeShowProps {
  userID?: string;
}

function TradeShow({ userID }: TradeShowProps) {
  const router = useRouter();
  const [multipleTrade, setMultipleTrade] = useState<any>(null);
  const [showArrowIcon, setShowArrowIcon] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const { minisiteUserID } = useSelector((state: any) => state.miniSite);
  const [loader, setLoader] = useState(true);
  const [checked, setChecked] = useState<boolean>(false);
  const { breakPoints } = useContext(MyAppContext);
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const NavigateHandler = (route) => router.push(route);
  useLayoutEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setLoader(true);
      let response;
      if (userID) {
        response = await apiClient(
          "mini-site/company_profile/trade_show/list",
          "post",
          {
            body: {
              user_id: userID,
            },
          }
        );
      } else {
        response = await apiClient("trade_show/list", "get");
      }

      if (response?.status === 200) {
        (response?.data || []).sort((a, b) => {
          const dateA = a?.date ? new Date(a.date) : null;
          const dateB = b?.date ? new Date(b.date) : null;
          if (dateA && dateB) {
            return dateA?.getTime() - dateB?.getTime();
          }
        });
        setMultipleTrade(response?.data);
        setLoader(false);
      }
    } catch {}
  };

  if (loader) {
    return (
      <Grid container spacing={2} alignItems="stretch">
        {[...Array(3)].map((_, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Box
              sx={{
                height: "100%",
                boxShadow:
                  "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                border: "1px solid #E8E8E8",
                padding: "8px",
                borderRadius: "6px",
              }}
            >
              <Box>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={"100%"}
                  height={"200px"}
                />
              </Box>
              <Box sx={{}} pb={{ xs: 1.8 }}>
                <Skeleton animation="wave" variant="text" width={"50%"} />
                <Skeleton animation="wave" variant="text" width={"30%"} />
                <Box my={1}>
                  <Divider />
                </Box>
                <Skeleton animation="wave" variant="text" width={"50%"} />
                <Skeleton animation="wave" variant="text" width={"100%"} />
                <Skeleton animation="wave" variant="text" width={"100%"} />
                <Skeleton animation="wave" variant="text" width={"100%"} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ padding: "8px 0px", marginTop: "8px" }}>
      <Collapse
        in={checked}
        collapsedSize={
          breakPoints.max600px
            ? 420
            : multipleTrade.length > 1
            ? 390
            : breakPoints.max900px
            ? 350
            : 380
        }
      >
        {multipleTrade?.length > 0 ? (
          <Grid container spacing={2} alignItems={"stretch"}>
            {multipleTrade?.map((value, index) => (
              <>
                <Grid item xs={12} sm={6} lg={4} key={value.id}>
                  <Box
                    sx={{
                      height: "100%",
                      boxShadow:
                        "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                      border: "1px solid #E8E8E8",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Carousel
                        cycleNavigation={true}
                        indicators={false}
                        duration={500}
                        swipe={true}
                        animation="fade"
                        navButtonsProps={{
                          style: {
                            backgroundColor: "#231F20",
                            borderRadius: 6,
                            color: "white",
                          },
                        }}
                        navButtonsAlwaysVisible={
                          value.photos.length > 1
                            ? index == hoverIndex && showArrowIcon
                            : false
                        }
                        navButtonsAlwaysInvisible={
                          value.photos.length > 1 ? false : true
                        }
                        sx={{
                          "& .MuiIconButton-root": {
                            padding: "4px !important",
                          },
                        }}
                      >
                        {value.photos.map((img) => (
                          <Box
                            key={img.id}
                            onMouseOver={(e) => {
                              if (!showArrowIcon) {
                                setShowArrowIcon(true);
                                setHoverIndex(index);
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (showArrowIcon) {
                                setShowArrowIcon(false);
                                setHoverIndex(-1);
                              }
                            }}
                          >
                            <TradeShowImageox>
                              <Img src={img.source} alt={img.source} />
                            </TradeShowImageox>

                            <Box
                              sx={{
                                position: "absolute",
                                bottom: "30px",
                                right: "0px",
                                backgroundColor: "#FFFFFF",
                                color: "#231f20",
                                borderTopLeftRadius: "25px",
                                borderBottomLeftRadius: "25px",
                                padding: "6px",
                                fontSize: "12px",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.25) 0px -143px 60px, rgba(0, 0, 0, 0.12) 0px -92px 116px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 8px 14px, rgba(0, 0, 0, 0.09) 0px -1px 6px",
                              }}
                            >
                              <span>
                                <img
                                  src="/assets/redcalander.png"
                                  alt=""
                                  style={{ marginRight: "5px" }}
                                />
                              </span>
                              {moment(value.date).format("DD-MM-YYYY")}
                            </Box>
                            <TradeCompanySelectOption
                              style={{
                                position: "absolute",
                                bottom: "30px",
                                left: "0px",
                                backgroundColor: "#FFFFFF",
                                color: "#231f20",
                                borderTopRightRadius: "25px",
                                borderBottomRightRadius: "25px",
                                padding: "6px",
                                fontSize: "12px",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.25) 0px -143px 60px, rgba(0, 0, 0, 0.12) 0px -92px 116px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 8px 14px, rgba(0, 0, 0, 0.09) 0px -1px 6px",
                              }}
                            >
                              <LightTooltip
                                title={
                                  countries.find((v) => v.code == value.country)
                                    ?.name
                                }
                                placement="top"
                                arrow
                              >
                                <span>
                                  <img
                                    src={`https://flagcdn.com/w20/${value?.country?.toLowerCase()}.png`}
                                    style={{ marginRight: "5px" }}
                                  />

                                  {
                                    countries.find(
                                      (v) => v.code == value.country
                                    )?.name
                                  }
                                </span>
                              </LightTooltip>
                            </TradeCompanySelectOption>
                          </Box>
                        ))}
                      </Carousel>
                    </Box>
                    <CPTextViewBoxCP pb={{ xs: 1.8 }}>
                      <Typography component="label">Trade Show Name</Typography>
                      <Typography>{value.name}</Typography>
                      <Box my={1}>
                        <Divider />
                      </Box>
                      <Typography component="label">
                        Trade Show Instructions
                      </Typography>
                      <Typography>{value.instructions}</Typography>
                    </CPTextViewBoxCP>
                  </Box>
                </Grid>
                {/* <Grid item xs={12} sm={6} lg={4} key={value.id}>
                <Box sx={{
                  height: "100%",
                  boxShadow:
                    "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                  border: "1px solid #E8E8E8",
                  padding: "8px",
                  borderRadius: "6px",
                }}>
                  <Box>
                    <Skeleton animation='wave' variant="rectangular" width={'100%'} height={'200px'} />
                  </Box>
                  <Box sx={{}} pb={{ xs: 1.8 }}>
                    <Skeleton animation='wave' variant="text" width={'50%'}  />
                    <Skeleton animation='wave' variant="text" width={'30%'}  />
                    <Box my={1}>
                      <Divider />
                    </Box>
                    <Skeleton animation='wave' variant="text" width={'50%'}  />
                    <Skeleton animation='wave' variant="text" width={'100%'}  />
                    <Skeleton animation='wave' variant="text" width={'100%'}  />
                    <Skeleton animation='wave' variant="text" width={'100%'}  />
                  </Box>
                </Box>
              </Grid> */}
              </>
            ))}
          </Grid>
        ) : (
          <>
            <EmptyPage
              logo="/assets/trade_new.svg"
              onClickHandler={() =>
                NavigateHandler("/companySettings/companyDetails?tab=company")
              }
              text={"trade show"}
              actiontext={userid !== minisiteUserID ? false : true}
            />
          </>
        )}
      </Collapse>
      {(multipleTrade?.length > 3 ||
        (breakPoints.max600px && multipleTrade?.length > 1)) && (
        <>
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            sx={{ marginTop: "10px" }}
          >
            {!checked && (
              <Redoutlinebtn
                height={"25px"}
                onClick={() => setChecked(true)}
                style={{ padding: "16px", marginRight: "12px" }}
              >
                Expand
                <ExpandMoreIcon />
              </Redoutlinebtn>
            )}
            {"     "}
            {checked && (
              <Blackoutlinebtn
                height={"25px"}
                onClick={() => setChecked(false)}
                style={{ padding: "16px" }}
              >
                Close
                <ExpandLessIcon />
              </Blackoutlinebtn>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default TradeShow;

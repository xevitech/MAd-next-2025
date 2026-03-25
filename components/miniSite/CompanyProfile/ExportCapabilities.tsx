import { Box, Grid, Skeleton, Typography, styled } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import CPheader from "./CPheaderComponent";
import { CPTextViewBox } from "./CompanyProfile.styled";
import { apiClient } from "@/components/common/common";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { FileUpload } from "@/components/common/uploadFile";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EmptyPage from "../EmptyPages";
import { TerritoryList } from "@/utils/countriesphp";

const Img: any = styled("img")(({ theme, bg }: any) => ({
  width: "100%",
  height: "200px",
  "@media screen and (max-width:600px)": {
    height: "auto",
  },
}));

const LCOptions = [
  "Revocable LC",

  "Irrevocable LC",

  "Documentary LC",

  "Standby LC",

  "Confirmed LC",

  "Unconfirmed LC",

  "Transferable LC",

  "Non-transferable LC",
];

export default function ExportCapabilities() {
  const { headerData, minisiteUserID } = useSelector(
    (state: any) => state.miniSite
  );
  const [customerList, setCustomerList] = useState<any>(null);
  const [currencyList, setCurrencyList] = useState<any>(null);
  const [showArrowIcon, setShowArrowIcon] = useState<boolean>(false);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [LCTypes, setLCTypes] = useState<string[]>([]);
  const [paymentMethodWithoutLC, setPaymentMethodWithoutLC] = useState<
    string[]
  >([]);
  const router = useRouter();
  let userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const NavigateHandler = (route) => router.push(route);
  const [loader, setLoader] = useState(false);

  const {
    basic_information: { slug },
  } = headerData;

  useLayoutEffect(() => {
    FetchCustomerList();
    FetchCurrency();
  }, []);

  const FetchCurrency = async () => {
    let response = await apiClient("currency", "get");
    setCurrencyList(
      response.data.map((v) => ({
        id: v.id,
        value: v.code,
        view: v.name,
      }))
    );
  };

  const FetchCustomerList = async () => {
    setLoader(true);
    let response = await apiClient(
      `mini-site/company_profile/export-traders?shop_slug=${slug}`,
      "get"
    );
    setCustomerList(response.data);
    setLoader(false);
  };

  let country =
    headerData?.export?.export_market
      ?.split(",")
      ?.map((v) => TerritoryList.find((i) => i.value == v)?.view) ?? [];

  const CheckEmptyData = () => {
    if (
      (customerList?.length === 0 || customerList === null) &&
      country?.length === 0 &&
      headerData?.export?.payment_terms == null &&
      headerData?.export?.accepted_currency == null &&
      headerData?.export?.payment_methods == null
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (
      headerData?.export?.payment_methods?.includes("LC (Letter of Credit)")
    ) {
      const paymentMethods = headerData?.export?.payment_methods?.split(",");

      const extractedLCTypes = [];
      const withOutLCTypes = [];

      paymentMethods?.forEach((item) => {
        if (item === "LC (Letter of Credit)") return;
        if (LCOptions?.includes(item)) {
          extractedLCTypes?.push(item);
        } else {
          withOutLCTypes?.push(item);
        }
      });

      setLCTypes(extractedLCTypes);
      setPaymentMethodWithoutLC(withOutLCTypes);
    } else {
      const paymentMethods = headerData?.export?.payment_methods?.split(",");
      setPaymentMethodWithoutLC(paymentMethods);
    }
  }, [headerData?.export?.payment_methods]);
  if (loader) {
    return (
      <>
        <Box mb={{ xs: 2 }}></Box>
        <Box>
          <Grid mb={{ xs: 1 }} container spacing={{ xs: 1 }}>
            <Grid item xs={12} sm={4}>
              <CPTextViewBox
                wid="100%"
                sx={{ height: "100%", paddingBottom: "4px" }}
              >
                <Skeleton animation="wave" variant="text" width={100} />
                <Skeleton animation="wave" variant="text" width={80} />
              </CPTextViewBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CPTextViewBox
                wid="100%"
                sx={{ height: "100%", paddingBottom: "4px" }}
              >
                <Skeleton animation="wave" variant="text" width={100} />
                <Skeleton animation="wave" variant="text" width={80} />
              </CPTextViewBox>
            </Grid>
            <Grid item xs={12} sm={4}>
              <CPTextViewBox
                wid="100%"
                sx={{ height: "100%", paddingBottom: "4px" }}
              >
                <Skeleton animation="wave" variant="text" width={100} />
                <Skeleton animation="wave" variant="text" width={80} />
              </CPTextViewBox>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CPTextViewBox
                wid="100%"
                sx={{ height: "100%", paddingBottom: "4px" }}
              >
                <Skeleton animation="wave" variant="text" width={100} />

                <Skeleton animation="wave" variant="text" width={80} />
              </CPTextViewBox>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginTop: "12px" }}>
          {customerList && (
            <Box>
              <Skeleton animation="wave" variant="text" width={120} />
            </Box>
          )}
          <Box sx={{ margin: "12px 0 0 0 " }}>
            <Grid mb={{ xs: 1 }} container spacing={{ xs: 1, lg: 2 }}>
              {customerList
                ?.filter((item) => item.status === "Enable")
                .map((v, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={v.id}>
                    <Box
                      sx={{
                        boxShadow:
                          "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                        border: "1px solid #E8E8E8",
                        backgroundColor: "#fff",
                        height: "100%",
                        borderRadius: "6px",
                        padding: "8px",
                      }}
                    >
                      <Box>
                        <Carousel>
                          <Skeleton
                            variant="rounded"
                            width={386}
                            height={200}
                          />
                        </Carousel>
                      </Box>
                      <Grid container spacing={1} mt={0.5}>
                        <Grid item xs={12}>
                          <CPTextViewBox
                            pb={{ xs: 1.8 }}
                            wid="100%"
                            sx={{
                              height: "100%",
                              paddingBottom: "6px !important",
                            }}
                          >
                            <Typography component="label">
                              <Skeleton
                                animation="wave"
                                variant="text"
                                width={140}
                              />
                            </Typography>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={300}
                            />
                          </CPTextViewBox>
                        </Grid>
                        <Grid item xs={12}>
                          <CPTextViewBox
                            pb={{ xs: 1.8 }}
                            wid="100%"
                            sx={{
                              height: "100%",
                              paddingBottom: "6px !important",
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={160}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={300}
                            />
                          </CPTextViewBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                          <CPTextViewBox
                            pb={{ xs: 1.8 }}
                            wid="100%"
                            sx={{
                              height: "100%",
                              paddingBottom: "6px !important",
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={80}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={50}
                            />
                          </CPTextViewBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                          <CPTextViewBox
                            pb={{ xs: 1.8 }}
                            wid="100%"
                            sx={{
                              height: "100%",
                              paddingBottom: "6px !important",
                              "& .MuiInput-input": {
                                fontSize: "13px",
                              },
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={80}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={50}
                            />
                          </CPTextViewBox>
                        </Grid>
                        <Grid item xs={12}>
                          <CPTextViewBox
                            pb={{ xs: 1.8 }}
                            wid="100%"
                            sx={{
                              height: "100%",
                              borderBottom: "none !important",
                              paddingBottom: "6px !important",
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={150}
                            />
                            <Box sx={{ margin: "4px 0 0 0" }}>
                              <Skeleton
                                variant="rounded"
                                width={124}
                                height={30}
                              />
                            </Box>
                          </CPTextViewBox>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </>
    );
  }
  const isAnyCustomerCasesAreEnabled = customerList?.some(
    (list) => list?.status !== "Disable"
  );
  return (
    <>
      <Box mb={{ xs: 1 }}>
        <CPheader
          icon="icon-export_capabilities"
          title="Export Capabilities"
          controls={false}
        />
      </Box>
      <Box>
        {CheckEmptyData() ? (
          <EmptyPage
            logo="/assets/export-capabilities.svg"
            onClickHandler={() =>
              NavigateHandler("/companySettings/companyDetails?tab=export")
            }
            text={"export capabilites"}
            actiontext={userid !== minisiteUserID ? false : true}
          />
        ) : (
          <>
            <Box mb={{ xs: 2 }}></Box>
            <Box>
              <Grid mb={{ xs: 1 }} container spacing={{ xs: 1 }}>
                <Grid item xs={12} sm={4}>
                  <CPTextViewBox
                    wid="100%"
                    sx={{ height: "100%", paddingBottom: "4px" }}
                  >
                    <Typography component="label">Export Market:</Typography>
                    <Typography>{country?.join(", ")}</Typography>
                  </CPTextViewBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CPTextViewBox
                    wid="100%"
                    sx={{ height: "100%", paddingBottom: "4px" }}
                  >
                    <Typography component="label">
                      Accepted Delivery Term:
                    </Typography>
                    <Typography>
                      {headerData?.export?.payment_terms?.replaceAll(",", ", ")}
                    </Typography>
                  </CPTextViewBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CPTextViewBox
                    wid="100%"
                    sx={{ height: "100%", paddingBottom: "4px" }}
                  >
                    <Typography component="label">
                      Accepted Currency:
                    </Typography>
                    <Typography>
                      {headerData?.export?.accepted_currency?.replaceAll(
                        ",",
                        ", "
                      )}
                    </Typography>
                  </CPTextViewBox>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <CPTextViewBox
                    wid="100%"
                    sx={{ height: "100%", paddingBottom: "4px" }}
                  >
                    <Typography component="label">Payment Methods:</Typography>

                    <Typography>
                      {headerData?.export?.payment_methods?.includes(
                        "LC (Letter of Credit)"
                      )
                        ? `${paymentMethodWithoutLC?.join(
                            ", "
                          )}, LC (Letter of Credit): ${LCTypes?.join(", ")}.`
                        : `${paymentMethodWithoutLC?.join(", ")}.`}
                    </Typography>
                  </CPTextViewBox>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginTop: "12px" }}>
              {isAnyCustomerCasesAreEnabled && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#231f20",
                      fontWeight: "600",
                    }}
                  >
                    Customer Cases
                  </Typography>
                </Box>
              )}
              <Box sx={{ margin: "12px 0 0 0 " }}>
                <Grid mb={{ xs: 1 }} container spacing={{ xs: 1, lg: 2 }}>
                  {customerList
                    ?.filter((item) => item.status === "Enable")
                    .map((v, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={4} key={v.id}>
                        <Box
                          sx={{
                            boxShadow:
                              "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
                            border: "1px solid #E8E8E8",
                            backgroundColor: "#fff",
                            height: "100%",
                            borderRadius: "6px",
                            padding: "8px",
                          }}
                        >
                          <Box>
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
                                v.cooperation_photos.length > 1
                                  ? index == hoverIndex && showArrowIcon
                                  : false
                              }
                              navButtonsAlwaysInvisible={
                                v.cooperation_photos.length > 1 ? false : true
                              }
                              sx={{
                                "& .MuiIconButton-root": {
                                  padding: "4px !important",
                                },
                              }}
                            >
                              {v.cooperation_photos.map((img) => (
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
                                  <Img src={img.source} alt={img.source} />
                                </Box>
                              ))}
                            </Carousel>
                          </Box>
                          <Grid container spacing={1} mt={0.5}>
                            <Grid item xs={12}>
                              <CPTextViewBox
                                pb={{ xs: 1.8 }}
                                wid="100%"
                                sx={{
                                  height: "100%",
                                  paddingBottom: "6px !important",
                                }}
                              >
                                <Typography component="label">
                                  Project/Customer Name
                                </Typography>
                                <Typography>{v.customer_name}</Typography>
                              </CPTextViewBox>
                            </Grid>
                            <Grid item xs={12}>
                              <CPTextViewBox
                                pb={{ xs: 1.8 }}
                                wid="100%"
                                sx={{
                                  height: "100%",
                                  paddingBottom: "6px !important",
                                }}
                              >
                                <Typography component="label">
                                  Product Supplied to Customer
                                </Typography>
                                <Typography>{v.supplied_product}</Typography>
                              </CPTextViewBox>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                              <CPTextViewBox
                                pb={{ xs: 1.8 }}
                                wid="100%"
                                sx={{
                                  height: "100%",
                                  paddingBottom: "6px !important",
                                }}
                              >
                                <Typography component="label">
                                  Annual Turnover
                                </Typography>
                                <Typography>
                                  {v.currency} {v.annual_turnover}
                                </Typography>
                              </CPTextViewBox>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                              <CPTextViewBox
                                pb={{ xs: 1.8 }}
                                wid="100%"
                                sx={{
                                  height: "100%",
                                  paddingBottom: "6px !important",
                                  "& .MuiInput-input": {
                                    fontSize: "13px",
                                  },
                                }}
                              >
                                <Typography component="label">
                                  Customer's Country/Region
                                </Typography>
                               
                                  <Typography>
                                    <CountrySelect
                                      mode="view"
                                      country={v.customer_region}
                                    />
                                  </Typography>
                              </CPTextViewBox>
                            </Grid>
                            <Grid item xs={12}>
                              <CPTextViewBox
                                pb={{ xs: 1.8 }}
                                wid="100%"
                                sx={{
                                  height: "100%",
                                  borderBottom: "none !important",
                                  paddingBottom: "6px !important",
                                }}
                              >
                                <Typography component="label">
                                  Transaction Documents
                                </Typography>
                                <Box sx={{ margin: "4px 0 0 0" }}>
                                  <FileUpload
                                    mode="view"
                                    files={v.transaction_documents}
                                  />
                                </Box>
                              </CPTextViewBox>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

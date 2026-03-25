import React, { useState, useEffect } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import ProductModule from "./product.module.css";
import { setSingleProductId } from "@/hooks/UseProductListContext";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";
import { ThreeDots } from "react-loader-spinner";
import { CurrencySymbol, apiClient } from "@/components/common/common";
import { Navigate } from "@/components/common/common";
import { returnCountryFromCode } from "@/utils/commonFunctions/other";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import {
  Availabilitybox,
  CatName,
  Doneicon,
  ListPriceButton,
  Listviewouterbox,
  MyListRow,
  NameNAvailability,
  SeparationDots,
} from "./style";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WishlistComponent from "./Wishlist";
import Swal from "sweetalert2";
import {
  CompanyName,
  CompanyNameListView,
  TMyProductName,
  TMyProductPretitle,
} from "./ProductListing.styled";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { useRouter } from "next/router";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import useInitiateChatAndOpenWindow from "../Chat/common/customHooks/useInitiateChat";
import { showAlert } from "../common/sweetAlert";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
export default function ProductListView(props) {
  const element = props.data;
  const dispatch = useAppDispatch();
  const [openModal, setModal] = useState(false);

  const [territory, setTerritory] = useState("");
  const [showLoader, setShowLoader] = useState("");
  const { singleProductDetail } = useSelector((state) => state.productList);

  const {
    user_info: { id: currentlyLoggedInUserId },
  } = useSelector((state) => state.userData);

  // const initiateChat = useInitiateChatAndOpenWindow();

  const handleQuote = async (id, type) => {
    setShowLoader(type);
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
    }
    setModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
    singleProductDetail;
  };

  useEffect(() => {
    if (element.country_origin_id == "1t") {
      setTerritory("North America");
    } else if (element.country_origin_id == "2t") {
      setTerritory("Europe");
    } else if (element.country_origin_id == "3t") {
      setTerritory("Asia");
    } else if (element.country_origin_id == "4t") {
      setTerritory("Middle East");
    } else if (element.country_origin_id == "5t") {
      setTerritory("Gulf Countries");
    } else if (element.country_origin_id == "6t") {
      setTerritory("South America");
    } else if (element.country_origin_id == "7t") {
      setTerritory("Africa");
    } else if (element.country_origin_id == "8t") {
      setTerritory("Australia and Oceania");
    } else {
      setTerritory(returnCountryFromCode(element.country_origin_id));
    }
  }, [element]);

  const Value = [
    {
      title: "Manufacturer:",
      value: element?.brand_name ?? "",
    },
    // {
    //   title: "location",
    //   value: territory ?? "",
    // },
    {
      title: "Condition:",
      value: element?.condition?.replace("_", " ") ?? "",
    },
    {
      title: "Manufacturing Years",
      value: element?.manufacturer_year ?? "",
    },
    {
      title: "Model Number:",
      value: element?.model_number ?? "",
    },
  ];
  const Value1 = [
    {
      title: "Manufacturer:",
      value: element?.brand_name ?? "",
    },
    {
      title: "Model Number:",
      value: element?.model_number ?? "",
    },
    {
      title: "Condition:",
      value: element?.condition?.replace("_", " ") ?? "",
    },
    {
      title: "Manufacturing Years",
      value: element?.manufacturer_year ?? "",
    },
  ];

  let bussiness = element?.company_details?.business_type;
  let businessTypeIcon = "Others1.svg";
  let manufacturer_image = "s-badge.png";
  let bussinessName = JSON.parse(bussiness)?.find(
    (ele) => ele?.toggle == 1
  )?.name;
  if (bussinessName == "Manufacturers") {
    businessTypeIcon = "Manufacturers1.svg";
  } else if (bussinessName == "Agents and Representatives") {
    businessTypeIcon = "Agents1.svg";
  } else if (bussinessName == "Resellers") {
    businessTypeIcon = "Resellers1.svg";
  } else if (bussinessName == "Distributors") {
    businessTypeIcon = "Distributors1.svg";
  } else if (bussinessName == "Retailers") {
    businessTypeIcon = "Retailers1.svg";
  } else if (bussinessName == "Wholesalers") {
    businessTypeIcon = "Wholesalers1.svg";
  } else {
    businessTypeIcon = "Others1.svg";
  }
  const router = useRouter();
  const unit = useSelector((state) => state.header.unit);

  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "";
  };

  let toolTipData = `The seller's base price is based on an <b>${element?.price_term?.replaceAll(
    ",",
    ", "
  )}</b> delivery term.`;

  const currencySymbolToShow =
    element?.symbol ?? CurrencySymbol(element?.currency_id);

  return (
    <>
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      <Listviewouterbox sx={{}}>
        <NameNAvailability>
          <LightTooltip
            placement="top"
            title={element.category_name}
            arrow
            disableInteractive
          >
            <CatName>
              <span>{element.category_name}</span>
            </CatName>
          </LightTooltip>
          <Availabilitybox>
            <Typography
              className={ProductModule.location_txt}
              sx={{
                color: `${
                  element.availability == "by_order" ? "#d7282fd9" : "#34A853 "
                }!important`,
                fontSize: "14px !important",
                fontWeight: "600 !important",
                display: "flex",
                alignItems: "center",
                "@media screen and (max-width:768px)": {
                  fontSize: "12px !important",
                },
              }}
            >
              {element.availability == "by_order" ? "By Order" : "In Stock"}{" "}
              <Doneicon />
            </Typography>
            <WishlistComponent element={element} />
          </Availabilitybox>
        </NameNAvailability>
        <Grid container columnSpacing={2} alignItems={"stretch"}>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Box
              onClick={() => Navigate(element)}
              className={`${ProductModule.product_list_img} 
                  ${ProductModule.row_view_img}
                  `}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "13px 0px 11px -20px #7B7979",
                cursor: "pointer",
                maxHeight: "180px !important",
                height: "180px !important",
                "@media screen and (max-width:900px)": {
                  boxShadow: "none",
                  background: "#f6f6f6",
                },
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                src={element?.main_image}
                alt={element?.product_name}
              />

              {element.product_type === "configured" && (
                <div className={ProductModule.config_products}>
                  <span>Configuration</span>
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <Box>
              <TMyProductPretitle
                style={{ cursor: "pointer" }}
                onClick={() => Navigate(element)}
              >
                {element.pre_title_name}
              </TMyProductPretitle>
              <Box>
                <TMyProductName
                  style={{ cursor: "pointer" }}
                  onClick={() => Navigate(element)}
                >
                  {element.product_name}
                </TMyProductName>
              </Box>
              <Box
                sx={{
                  margin: "8px 0 0 0",
                  borderTop: "1px solid #eaeaea",
                  padding: "8px 0 0 0",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box sx={{ minHeight: "69px" }}>
                      {element.product_type === "configured"
                        ? Value1.filter((val) => val.value).map(
                            (item, index) => {
                              if (index <= 3) {
                                return (
                                  <Box sx={{ display: "flex", gap: "7px" }}>
                                    <MyListRow>
                                      <Typography
                                        sx={{
                                          fontSize: "12px !important",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {item.title == "location" ? (
                                          <>
                                            {element?.availability !==
                                            "in_stock"
                                              ? "Place of Origin"
                                              : "Current Location"}
                                          </>
                                        ) : (
                                          item.title
                                        )}
                                      </Typography>
                                    </MyListRow>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        color: "#231f20",
                                      }}
                                    >
                                      {item.value}
                                    </Typography>
                                  </Box>
                                );
                              }
                            }
                          )
                        : Value.filter((val) => val.value).map(
                            (item, index) => {
                              if (index <= 3) {
                                return (
                                  <Box sx={{ display: "flex", gap: "7px" }}>
                                    <MyListRow>
                                      <Typography
                                        sx={{
                                          fontSize: "12px !important",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {item.title == "location" ? (
                                          <>
                                            {element?.availability !==
                                            "in_stock"
                                              ? "Place of Origin"
                                              : "Current Location"}
                                          </>
                                        ) : (
                                          item.title
                                        )}
                                      </Typography>
                                    </MyListRow>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        color: "#231f20",
                                      }}
                                    >
                                      {item.value}
                                    </Typography>
                                  </Box>
                                );
                              }
                            }
                          )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <ListPriceButton>
                <Box sx={{ margin: "8px 0 0 0" }}>
                  {/* {element.product_type == "simple" &&
                    (element.price_type === "fixed" ||
                    element.price_type === "quantity" ? (
                      <Box
                        sx={{
                          fontSize: "13px",
                          color: "#4A4A4A",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "4px",
                          marginTop: "6px",
                          paddingBottom: "8px",
                          "& .MuiTypography-h6": {
                            fontSize: "12px",
                            color: "#D7282F",
                            fontWeight: "600",
                            "& span": {
                              fontSize: "12px",
                              color: "#4A4A4A",
                            },
                          },
                        }}
                      >
                        {element?.hide_price == 1 &&
                          element.price_type == "fixed" && <>Price:</>}
                        {element?.hide_price == 1 &&
                          element.price_type == "quantity" &&
                          element.quantity_status == 1 && <>Price:</>}
                        {element.availability == "in_stock" ? (
                          element.price_type == "quantity" ? (
                            element.quantity_status == 1 &&
                            element?.hide_price == 1 ? (
                              <Typography
                                variant="h6"
                                sx={{ lineHeight: "normal" }}
                              >
                                {CurrencySymbol(element.currency_id)}
                                {element.price_range &&
                                element.price_range.length > 1
                                  ? `${
                                      element.price_range[0]
                                        ? element.price_range[0]?.toLocaleString()
                                        : ""
                                    } - ${CurrencySymbol(element.currency_id)}${
                                      element?.price_range[1]
                                        ? element?.price_range[1]?.toLocaleString()
                                        : ""
                                    }`
                                  : element?.price_range}
                                <span>{" /"}</span>
                                <span>{element.qty_unit_name}</span>
                                {element?.price_term && (
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData}`,
                                        }}
                                      ></div>
                                    }
                                    placement="top"
                                  >
                                    <InfoOutlinedIcon
                                      style={{
                                        color: "#0AA133",
                                        fontSize: "11px",
                                        margin: "0px 2px -3px",
                                      }}
                                    />
                                  </LightTooltip>
                                )}
                              </Typography>
                            ) : (
                              <Typography
                                variant="h6"
                                style={{ visibility: "hidden" }}
                              >
                                Ask price
                              </Typography>
                            )
                          ) : (
                            <>
                              {element.hide_price == 0 ? (
                                <Typography
                                  variant="h6"
                                  style={{ visibility: "hidden" }}
                                >
                                  "Ask price"
                                </Typography>
                              ) : (
                                <>
                                  <Typography variant="h6">
                                    {`${CurrencySymbol(element.currency_id)}`}
                                    {Array.isArray(element?.price_range) &&
                                    element?.price_range &&
                                    element?.price_range.length > 1 ? (
                                      `${
                                        element.price_range[0]
                                          ? element.price_range[0]?.toLocaleString()
                                          : ""
                                      } - ${
                                        element?.symbol ??
                                        CurrencySymbol(element.currency_id)
                                      } ${
                                        element?.price_range[1]
                                          ? element?.price_range[1]?.toLocaleString()
                                          : ""
                                      }`
                                    ) : (
                                      <>
                                        {element?.unit_price ??
                                          element?.price_range}
                                      </>
                                    )}
                                    {element?.unit_name && (
                                      <>
                                        <span>{"/"}</span>
                                        <span>
                                          {element?.unit_name ??
                                            element?.qty_unit}
                                        </span>
                                      </>
                                    )}
                                    {element?.price_term && (
                                      <LightTooltip
                                        disableInteractive
                                        arrow
                                        title={
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: `${toolTipData}`,
                                            }}
                                          ></div>
                                        }
                                        placement="top"
                                      >
                                        <InfoOutlinedIcon
                                          style={{
                                            color: "#0AA133",
                                            fontSize: "13px",
                                            margin: "0px 2px -3px",
                                          }}
                                        />
                                      </LightTooltip>
                                    )}
                                  </Typography>
                                </>
                              )}
                            </>
                          )
                        ) : element.price_type == "quantity" ? (
                          <Typography variant="h6">
                            {CurrencySymbol(element.currency_id)}
                            {element.price_range &&
                            element.price_range.length > 1
                              ? `${
                                  element.price_range[0]
                                    ? element.price_range[0]?.toLocaleString()
                                    : ""
                                } - ${CurrencySymbol(element.currency_id)}${
                                  element?.price_range[1]
                                    ? element?.price_range[1]?.toLocaleString()
                                    : ""
                                }`
                              : element?.price_range}
                            <span>{" /"}</span>
                            <span>{element.qty_unit_name}</span>
                            {element?.price_term && (
                              <LightTooltip
                                disableInteractive
                                arrow
                                title={
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `${toolTipData}`,
                                    }}
                                  ></div>
                                }
                                placement="top"
                              >
                                <InfoOutlinedIcon
                                  style={{
                                    color: "#0AA133",
                                    fontSize: "13px",
                                    margin: "0px 2px -3px",
                                  }}
                                />
                              </LightTooltip>
                            )}
                          </Typography>
                        ) : (
                          <>
                            {element.hide_price == 0 ? (
                              <Typography
                                variant="h6"
                                style={{ visibility: "hidden" }}
                              >
                                Ask price
                              </Typography>
                            ) : (
                              <Typography variant="h6">
                                {`${CurrencySymbol(element.currency_id)}${
                                  element.unit_price
                                } /
                        ${element?.unit_name}`}
                                {element?.price_term && (
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData}`,
                                        }}
                                      ></div>
                                    }
                                    placement="top"
                                  >
                                    <InfoOutlinedIcon
                                      style={{
                                        color: "#0AA133",
                                        fontSize: "13px",
                                        margin: "0px 2px -3px",
                                      }}
                                    />
                                  </LightTooltip>
                                )}
                              </Typography>
                            )}
                          </>
                        )}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: "27.17px",
                          margin: "6px 0 0 0",
                          padding: "0 0 8px 0",
                        }}
                      ></Box>
                    ))} */}
                  {/* {(element.product_type == "simple" &&
                          (element.price_type == "fixed" ||
                            element.price_type == "quantity" ||  element.is_placeholder == "yes")) ||
                        element?.hide_price == 1 ? (
                          <Box
                            sx={{
                              fontSize: "13px",
                              color: "#4A4A4A",
                              display: "flex",
                              alignItems: "baseline",
                              gap: "4px",
                              marginTop: "1px",
                              paddingBottom: "8px",
                              "& .MuiTypography-h6": {
                                fontSize: "13px",
                                color: "#D7282F",
                                fontWeight: "600",
                                "@media screen and (max-width:1500px)": {
                                  fontSize: "11px",
                                },
                                "& span": {
                                  fontSize: "12px",
                                  color: "#4A4A4A",
                                },
                              },
                            }}
                          >
                            Price:
                            <Typography variant="h6">
                                {element.price_type === "fixed"
                                ? `${CurrencySymbol(element.currency_id)}
                                  ${element.unit_price?.toLocaleString()}`
                                : `${CurrencySymbol(
                                    element.currency_id
                                  )}${element.price_range[0]?.toLocaleString()} - ${CurrencySymbol(
                                    element.currency_id
                                  )}${element.price_range[1]?.toLocaleString()}`}  

                              <span>
                                / {element.qty_unit_name ?? element.unit_name ?? element.price_unavailable_type}
                              </span>
                              {element?.price_term && (
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData}`,
                                        }}
                                      ></div>
                                    }
                                    placement="top"
                                  >
                                    <InfoOutlinedIcon
                                      style={{
                                        color: "#0AA133",
                                        fontSize: "11px",
                                        margin: "0px 2px -3px",
                                      }}
                                    />
                                  </LightTooltip>
                                )}
                            </Typography>
                          </Box>
                        ) : null} */}
                  {/* {(element.product_type == "simple" &&
                    (element.availability === "by_order" ||
                      element.price_type === "fixed" ||
                      element.price_type === "quantity" ||
                      element.is_placeholder === "yes")) ||
                  element?.hide_price == 1 ? (
                    <Box
                      sx={{
                        fontSize: "13px",
                        color: "#4A4A4A",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                        marginTop: "1px",
                        paddingBottom: "8px",
                        "& .MuiTypography-h6": {
                          fontSize: "13px",
                          color: "#D7282F",
                          fontWeight: "600",
                          "@media screen and (max-width:1500px)": {
                            fontSize: "11px",
                          },
                          "& span": {
                            fontSize: "12px",
                            color: "#4A4A4A",
                          },
                        },
                      }}
                    >
                      {element.is_placeholder === "yes" ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Price:
                          <Typography variant="h6" sx={{ color: "#D7282F" }}>
                            {element.price_unavailable_type ? (
                              element.price_unavailable_type
                            ) : (
                              <Box sx={{ height: "28.8px" }}></Box>
                            )}
                          </Typography>
                        </Box>
                      ) : 
                        element.price_type === "fixed" ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          Price:
                          <Typography variant="h6">
                            {`${CurrencySymbol(
                              element.currency_id
                            )}${element.unit_price?.toLocaleString()}`}
                            <span>/ {element.unit_name}</span>
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          Price:
                          <Typography variant="h6">
                            {element.price_type === "fixed"
                              ? `${CurrencySymbol(
                                  element.currency_id
                                )}${element.unit_price?.toLocaleString()}`
                              : `${CurrencySymbol(
                                  element.currency_id
                                )}${element.price_range[0]?.toLocaleString()} - ${CurrencySymbol(
                                  element.currency_id
                                )}${element.price_range[1]?.toLocaleString()}`}
                            <span>
                              / {element.qty_unit_name ?? element.unit_name}
                            </span>
                            {element?.price_term && (
                              <LightTooltip
                                disableInteractive
                                arrow
                                title={
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `${toolTipData}`,
                                    }}
                                  ></div>
                                }
                                placement="top"
                              >
                                <InfoOutlinedIcon
                                  style={{
                                    color: "#0AA133",
                                    fontSize: "11px",
                                    margin: "0px 2px -3px",
                                  }}
                                />
                              </LightTooltip>
                            )}
                          </Typography>
                        </>
                      )}
                    </Box>
                  ) : null} */}
                  {element.product_type === "simple" ? (
                    <Box
                      sx={{
                        fontSize: "13px",
                        color: "#4A4A4A",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "4px",
                        marginTop: "1px",
                        paddingBottom: "8px",
                        "& .MuiTypography-h6": {
                          fontSize: "13px",
                          color: "#D7282F",
                          fontWeight: "600",
                          "@media screen and (max-width:1500px)": {
                            fontSize: "11px",
                          },
                          "& span": {
                            fontSize: "12px",
                            color: "#4A4A4A",
                          },
                        },
                      }}
                    >
                      {element.is_placeholder === "yes" ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          {element.availability === "by_order" ||
                          element.availability === "in_stock" ? (
                            <>
                              {element.hide_price == 1 && element.price_type ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  {/* Price: */}
                                  <Typography variant="h6">
                                    {element.price_type === "fixed" ? (
                                      <>
                                        {element?.symbol}
                                        {element.unit_price?.toLocaleString()}
                                        <span>/ {element.unit_name}</span>
                                      </>
                                    ) : element.price_type === "quantity" ? (
                                      <>
                                        {`${
                                          element?.symbol
                                        }${element.price_range[0]?.toLocaleString()} - ${
                                          element?.symbol
                                        }${element.price_range[1]?.toLocaleString()}`}
                                        <span>/ {element.qty_unit_name}</span>
                                      </>
                                    ) : (
                                      <>
                                        {element?.price_unavailable_type ? (
                                          // "Price:"
                                          ""
                                        ) : (
                                          <Box sx={{ height: "22px" }}></Box>
                                        )}
                                        <Typography
                                          variant="h6"
                                          sx={{ color: "#D7282F" }}
                                        >
                                          {element.price_unavailable_type ? (
                                            <>
                                              {element.price_unavailable_type}
                                            </>
                                          ) : (
                                            <Box sx={{ height: "22px" }}></Box>
                                          )}
                                        </Typography>
                                      </>
                                    )}

                                    {element?.price_term &&
                                      (element.price_type === "fixed" ||
                                        element.price_type === "quantity") && (
                                        <LightTooltip
                                          disableInteractive
                                          arrow
                                          title={
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: `${toolTipData}`,
                                              }}
                                            ></div>
                                          }
                                          placement="top"
                                        >
                                          <InfoOutlinedIcon
                                            style={{
                                              color: "#0AA133",
                                              fontSize: "11px",
                                              margin: "0px 2px -3px",
                                            }}
                                          />
                                        </LightTooltip>
                                      )}
                                  </Typography>
                                </Box>
                              ) : (
                                <>
                                  <Box sx={{ height: "20.8px" }}></Box>
                                </>
                              )}
                            </>
                          ) : null}
                        </Box>
                      ) : element.availability === "by_order" ||
                        element.availability === "in_stock" ? (
                        <>
                          {element.hide_price == 1 ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              {/* Price: */}
                              <Typography variant="h6">
                                {element.price_type === "fixed" ? (
                                  <>
                                    {element?.symbol}
                                    {element.unit_price?.toLocaleString()}
                                    <span>/ {element.unit_name}</span>
                                  </>
                                ) : element.price_type === "quantity" ? (
                                  <>
                                    {`${
                                      element?.symbol
                                    }${element.price_range[0]?.toLocaleString()} - ${
                                      element?.symbol
                                    }${element.price_range[1]?.toLocaleString()}`}
                                    <span>/ {element.qty_unit_name}</span>
                                  </>
                                ) : null}
                                {element?.price_term && (
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData}`,
                                        }}
                                      ></div>
                                    }
                                    placement="top"
                                  >
                                    <InfoOutlinedIcon
                                      style={{
                                        color: "#0AA133",
                                        fontSize: "11px",
                                        margin: "0px 2px -3px",
                                      }}
                                    />
                                  </LightTooltip>
                                )}
                              </Typography>
                            </Box>
                          ) : (
                            <>
                              <Box sx={{ height: "28.8px" }}></Box>
                            </>
                          )}
                        </>
                      ) : null}
                    </Box>
                  ) : null}

                  {element.product_type == "configured" && (
                    <Box
                      sx={{
                        fontSize: "14px",
                        color: "#4A4A4A",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginTop: "6px",
                        paddingBottom: "8px",
                        "& .MuiTypography-h6": {
                          fontSize: "16px",
                          color: "#D7282F",
                          fontWeight: "600",
                        },
                        "& .MuiTypography-body1": {
                          fontSize: "12px",
                        },
                      }}
                    >
                      <Typography variant="h6">
                        <Typography
                          variant="h6"
                          style={{ visibility: "hidden" }}
                        >
                          {"Ask price"}
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box className={ProductModule.buttonbox}>
                  <Button
                    disabled={showLoader === "quote" ? true : false}
                    variant="contained"
                    className={ProductModule.get_quote}
                    onClick={(e) => {
                      let id = localStorage?.userData
                        ? JSON.parse(localStorage?.userData).id
                        : "";
                      if (+currentlyLoggedInUserId === +element?.user_id) {
                        const swalWithBootstrapButtons = Swal.mixin({
                          customClass: {
                            confirmButton: "custom-btn cancel-button",
                            cancelButton: "custom-btn remove-btn",
                          },
                          buttonsStyling: false,
                        });
                        swalWithBootstrapButtons.fire({
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }
                      e.stopPropagation();
                      handleQuote(element.id, "quote");
                    }}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {showLoader === "quote" ? (
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="#D7282F"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Get Quote"
                    )}
                  </Button>
                  {/* <Box
                    sx={{
                      border: "1px solid #d7282f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      padding: "0 10px",
                      cursor: "pointer",
                      height: "32px",
                      "&:hover": {
                        borderColor: "#d82e34",
                        backgroundColor: "#ffedee",
                      },
                      "& .icon-livechat": {
                        fontSize: "16px",
                        "& .path1": {
                          "&::before": {
                            color: "#d82e34",
                          },
                        },
                      },
                    }}
                    aria-label="Chat with Seller"
                    onClick={() => {
                      let id = localStorage?.userData
                        ? JSON.parse(localStorage?.userData).id
                        : "";
                      if (+element?.user_id !== +currentlyLoggedInUserId) {
                        initiateChat(
                          +element?.user_id,
                          +currentlyLoggedInUserId
                        );
                      } else {
                        const textToShow =
                          "You can’t send messages to yourself ! <br> This view simulates how others see your store.";
                        showAlert({
                          userID: currentlyLoggedInUserId,
                          minisiteUserID: element?.user_id,
                          textContent: "",
                          iconToShow: false,
                          imageWidth: 80,
                          styledTextHtml: `<span style="color: #231f20; font-size:18px;font-weight:500;">${
                            textToShow ?? ""
                          }</span>`,
                        });
                      }
                    }}
                  >
                    <i class="icon-livechat">
                      <span className="path1"></span>
                      <span
                        className="path2"
                        aria-label="Chat with Seller"
                      ></span>
                    </i>
                  </Box> */}
                </Box>
              </ListPriceButton>
              <Box
                sx={{
                  margin: "8px 0 0 0",
                  padding: "8px 0 0 0",
                  borderTop: "1px dashed #eaeaea",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  {bussiness && (
                    <>
                      <img
                        src={`/assets/images/${businessTypeIcon}`}
                        style={{ height: "19px" }}
                      />
                      {bussinessName?.replace(/s(?=[^s]*$)/, "")}
                    </>
                  )}
                  {element.is_verified && (
                    <>
                      <SeparationDots />
                      <img
                        src="/assets/verifyWtext.svg"
                        style={{ height: "19px" }}
                      />
                    </>
                  )}
                  <CompanyNameListView
                    onClick={() => {
                      window.open(
                        `/mini-site/${element?.company_details?.slug}`,
                        "_blank",
                        "noreferrer"
                      );
                    }}
                  >
                    <SeparationDots sx={{ margin: "0px 2px 7px 0" }} />
                    {element?.company_details?.company_name}{" "}
                    <ChevronRightOutlinedIcon />
                  </CompanyNameListView>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Listviewouterbox>
    </>
  );
}

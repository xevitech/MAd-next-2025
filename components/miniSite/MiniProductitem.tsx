import ProductModule from "../miniSite/Products/product.module.css";
import Carousel from "react-material-ui-carousel";
import { Box, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Stack from "@mui/material/Stack";
import {
  ProductListTile,
  TypeStyle,
  InStockStyle,
  ByOrderStyle,
  ProductItemInfoCardOuter,
  ProductHeadePriceButton,
} from "./styled";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { ProductHeadePriceButtonred } from "../ProductsListing/ProductListing.styled";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { apiClient, ReplaceSpaces } from "../common/common";
import { toast } from "react-toastify";
import { countriesList } from "@/utils/countriesphp";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { getTokenFromCookies } from "@/utils/cookieUtils";
const MiniProductitem = ({
  data,
  handleQuote,
  loader,
  territoryData,
  userid,
}: any) => {
  const route = useRouter();
  const { classes } = useStyles();
  const [Favourite, setFavourite] = useState<boolean>(data?.wishList);
  const [Country, setCountries] = useState<any>([]);
  const [mount, setMount] = useState<boolean>(false);

  const AddToWishlist = async (item) => {
    if (!getTokenFromCookies()) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    setFavourite(!Favourite);
    let response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id: item.id, user_id: userid },
    });
    if (response.status === true) {
      toast.success(response.message);
    }
  };

  const FetchTerritory = useCallback(async () => {
    setCountries(
      countriesList.map((element) => ({
        value: element?.code,
        view: element?.name,
        type: "Country",
        region: `${element.region}t`,
      }))
    );
  }, []);

  useEffect(() => {
    if (!mount) {
      FetchTerritory();
      setMount(true);
    }
  }, [mount]);

  const CountryAndTerritory = [...Country, ...territoryData];

  const GetName = (value) => {
    let view = CountryAndTerritory?.find(
      (v) => `${v.value}`.replace("t", "") == value.replace("t", "")
    );
    return view?.view;
  };
  const sessionUserID = localStorage.userData
    ? JSON.parse(localStorage.getItem("userData")).id
    : "";
  return (
    <ProductListTile key={data.id}>
      <ProductItemInfoCardOuter className={ProductModule.product_col}>
        <Box sx={{ width: "100%" }}>
          <Stack p={1}>
            <Stack
              spacing={{ xs: 2 }}
              justifyContent={{ xs: "space-between" }}
              alignItems={{ xs: "center" }}
              direction={{ xs: "row" }}
            ></Stack>

            <Stack
              spacing={{ xs: 2 }}
              justifyContent={{ xs: "space-between" }}
              alignItems={{ xs: "center" }}
              direction={{ xs: "row" }}
            >
              <TypeStyle>
                {userid !== sessionUserID && (
                  <Tooltip title="Wishlist" placement="top" arrow>
                    <span
                      className={ProductModule.wislistouter}
                      onClick={() => {
                        AddToWishlist(data);
                      }}
                    >
                      {Favourite ? (
                        <FavoriteIcon
                          style={{ color: "#d7282f" }}
                          className={ProductModule.wislist_imgActive}
                        />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          className={ProductModule.wislist_img}
                        />
                      )}
                    </span>
                  </Tooltip>
                )}
                <Typography component="span">{data.unique_number} </Typography>
              </TypeStyle>

              {data.availability === "in_stock" ? (
                <InStockStyle>
                  In Stock <DoneIcon />
                </InStockStyle>
              ) : data.availability === "by_order" ? (
                <ByOrderStyle>
                  By Order <DoneIcon />
                </ByOrderStyle>
              ) : null}
            </Stack>
          </Stack>

          <Box
            className={ProductModule.product_list_img}
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.open(
                `/productdetail/${ReplaceSpaces(
                  data.category_name
                )}/${ReplaceSpaces(
                  data?.company_details?.slug ?? ""
                )}/${ReplaceSpaces(data.slug)}`,
                "_blank"
              )
            }
          >
            {data?.product_type === "configured" && (
              <div className={ProductModule.config_products}>
                <span>
                  {data?.product_type === "configured" && "configuration"}
                </span>
              </div>
            )}
            <Carousel
              changeOnFirstRender={true}
              indicators={false}
              duration={500}
              swipe={true}
              animation="slide"
              navButtonsProps={{
                style: {
                  backgroundColor: "black",
                  borderRadius: 6,
                  color: "white",
                },
              }}
            >
              {data?.photos &&
                data?.photos?.map((item, i) => (
                  <img
                    key={i}
                    style={{ width: "100%" }}
                    src={item?.source}
                    alt={item.alt_tag}
                  />
                ))}
            </Carousel>
          </Box>

          <Stack
            p={{ xs: 1 }}
            pb={{ xs: 0 }}
            pt={{ xs: 2 }}
            spacing={{ xs: 2 }}
            justifyContent={{ xs: "space-between" }}
            alignItems={{ xs: "center" }}
            direction={{ xs: "row" }}
            onClick={() =>
              window.open(
                `/productdetail/${ReplaceSpaces(
                  data.category_name
                )}/${ReplaceSpaces(
                  data?.company_details?.slug ?? ""
                )}/${ReplaceSpaces(data.slug)}`,
                "_blank"
              )
            }
          >
            <Box>
              <Tooltip
                title={data.product_name}
                followCursor
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "#000",
                      backgroundColor: "#fff",
                      fontSize: "12px",
                      fontFamily: "Open sans",
                      boxShadow:
                        "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    },
                  },
                }}
              >
                <Typography
                  className={classes.ProductTitleStyle}
                  component="h6"
                >
                  {data.product_name}
                </Typography>
              </Tooltip>
            </Box>
          </Stack>

          <Box
            className="productCenterInfo"
            sx={{ cursor: "pointer" }}
            justifyContent={{ xs: "space-between" }}
            onClick={() =>
              window.open(
                `/productdetail/${ReplaceSpaces(
                  data.category_name
                )}/${ReplaceSpaces(
                  data?.company_details?.slug ?? ""
                )}/${ReplaceSpaces(data.slug)}`,
                "_blank"
              )
            }
          >
            <Box className={ProductModule.location_box}>
              <Typography className={classes.ProductSmallHeadings}>
                {data.availability === "by_order"
                  ? "Place of Origin:"
                  : "Current Location:"}
              </Typography>
              <Typography
                className={`${classes.ProductLocationandbrand} ${classes.brandtxt}`}
              >
                {data.availability == "by_order"
                  ? GetName(`${data.tertiary_id}`)
                  : GetName(`${data.country_origin_id}`)}
              </Typography>
            </Box>
            <Box className={ProductModule.location_box}>
              <Typography className={classes.ProductSmallHeadings}>
                Manufacturer:
              </Typography>
              <Typography
                className={`${classes.ProductLocationandbrand} ${classes.brandtxt}`}
              >
                {" "}
                {data.brand_name}
              </Typography>
            </Box>
            <div className={ProductModule.condition_value}>
              {data.availability === "in_stock" && (
                <Box className={ProductModule.location_box}>
                  <Typography className={classes.ProductSmallHeadings}>
                    Condition:
                  </Typography>
                  <Tooltip title="Condition">
                    <Typography
                      className={`${classes.ProductLocationandbrand} ${classes.brandtxt}`}
                    >
                      {" "}
                      {data.condition}
                    </Typography>
                  </Tooltip>
                </Box>
              )}
              {data.price_type && (
                <Box className={ProductModule.location_box}>
                  <Typography className={classes.ProductSmallHeadings}>
                    Price Type:
                  </Typography>
                  <Tooltip title="Price Type">
                    <Typography
                      className={`${classes.ProductLocationandbrand} ${classes.brandtxt}`}
                    >
                      {data.price_type === "fixed"
                        ? "Fixed Price"
                        : "Qty Based"}
                    </Typography>
                  </Tooltip>
                </Box>
              )}
            </div>
          </Box>
        </Box>
        <Stack
          className={ProductModule.divider}
          p={{ xs: 2 }}
          pb={{ xs: 0 }}
          direction={{ xs: "row" }}
          justifyContent={{
            xs: data.unit_price ? "space-between" : "center",
            xl: data.unit_price ? "space-between" : "center",
            lg: data.unit_price ? "space-between" : "center",
            md: data.unit_price ? "space-between" : "center",
          }}
          alignItems={{ xs: "center" }}
          spacing={{ xs: 2 }}
        >
          <Box>
            {" "}
            {data.unit_price ? (
              <Typography className={classes.PriceTextStyle}>
                <Typography component="span">
                  <sup>$</sup>
                  {data.unit_price != "0" ? `${data.unit_price}` : ""}
                </Typography>
              </Typography>
            ) : null}
          </Box>

          <Box>
            <ProductHeadePriceButtonred
              onClick={() => handleQuote(data.id, "quote")}
            >
              <Typography component="span">
                {loader?.loader === "quote" && loader?.id === data.id ? (
                  <ThreeDots
                    height="25"
                    width="40"
                    radius="2"
                    color="#D7282F"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : (
                  "Get a Quote"
                )}
              </Typography>{" "}
            </ProductHeadePriceButtonred>
          </Box>
        </Stack>
        <Box
          className="tileFooter"
          sx={{
            width: "100%",
            position: "absolute",
            bottom: "-65px",
            paddingBottom: "12px",
            zIndex: "2",
            backgroundColor: "#ffffff",
            borderRadius: "6px",
            transition: "all ease .5s",
          }}
        >
          <Stack
            className={ProductModule.divider}
            alignItems={{ xs: "center" }}
            spacing={{ xs: 2 }}
          >
            <Box
              className={ProductModule.boxquote}
              sx={{ display: "flex", alignItems: "centger", gap: "10px" }}
            >
              <ProductHeadePriceButton
                className={ProductModule.redoutline_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuote(data.id, "quote");
                }}
              >
                <Typography component="span">
                  {loader?.loader === "quote" ? (
                    <ThreeDots
                      height="28"
                      width="30"
                      radius="9"
                      color="#D7282F"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                  "Get Quote"
                   )} 
                </Typography>
              </ProductHeadePriceButton>
              <Box
                sx={{
                  border: "1px solid #E6ECF2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  padding: "0 10px",
                  cursor: "pointer",
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
              >
                <i className="icon-livechat">
                  <span className="path1"></span>
                  <span className="path2"></span>
                </i>
              </Box>
            </Box>
          </Stack>
          <Stack
            sx={{
              padding: "0 10px",
              borderTop: "1px solid #EAEAEA",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{
                fontSize: "12px",
                color: "#231f20",
                fontWeight: 600,
                margin: "4px 0 8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textTransform: "capitalize",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
                display: "-webkit-box",
                cursor: "pointer",
              }}
              onClick={() => {
                window.open(
                  `/mini-site/${data?.company_details?.slug}`,
                  "_blank",
                  "noreferrer"
                );
              }}
            >
              <LightTooltip
                disableInteractive
                title={data?.company_details?.company_name}
                placement="top"
                arrow
              >
                {data?.company_details?.company_name}
              </LightTooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "7px",
              }}
            >
              <LightTooltip
                placement="top"
                title="Manufacture"
                arrow
                disableInteractive
              >
                <img
                  src="/assets/verifyWtext.svg"
                  style={{ height: "16px" }}
                />
              </LightTooltip>
              {data.is_verified && (
                <img src="/assets/verifyWtext.svg" style={{ height: "21px" }} />
              )}
            </Box>
          </Stack>
        </Box>
      </ProductItemInfoCardOuter>
    </ProductListTile>
  );
};

export default MiniProductitem;

const useStyles = makeStyles()((theme) => {
  return {
    CategoryTextStyle: {
      fontSize: 12,
      color: "rgba(35, 31, 32, 1)",
      fontWeight: 400,
      fontFamily: "Open sans",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      mstextOverflow: "ellipsis",
      "& span": {
        fontSize: 14,
        fontWeight: 600,
      },
    },
    PriceTextStyle: {
      display: "inline-flex",
      alignItems: "top",
      fontSize: 14,
      gap: "4px",
      color: "rgba(35, 31, 32, 1)",
      fontWeight: 400,
      fontFamily: "Open sans",
      whiteSpace: "nowrap",
      "& span": {
        fontSize: 16,
        fontWeight: 600,
        color: "#D7282F",
      },
      "& sup": {
        fontSize: 14,
        fontWeight: 600,
        color: "#D7282F",
      },
    },
    InStockStyle: {
      color: "#34A853",
      fontFamily: "Open sans",
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: "nowrap",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 5,
      "@media screen and (max-width: 1500px)": {
        fontSize: "12px",
      },
      "& svg": {
        width: 15,
        "@media screen and (max-width: 1500px)": {
          fontSize: "12px",
          gap: 2,
        },
      },
    },
    ByOrderStyle: {
      color: "rgba(215, 40, 47, 1)",
      fontFamily: "Open sans",
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: "nowrap",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 5,
      "@media screen and (max-width: 1500px)": {
        fontSize: "12px",
      },
      "& svg": {
        width: 15,
        "@media screen and (max-width: 1500px)": {
          fontSize: "12px",
          gap: 2,
        },
      },
    },
    ProductTitleStyle: {
      color: "rgba(35, 31, 32, 1)",
      fontFamily: "Open sans",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      overflow: "hidden",
      textOverflow: "ellipsis",
      margin: "0",
      textTransform: "capitalize",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "2",
      display: "-webkit-box",
      cursor: "pointer",
      padding: "0px 0 3px",
      "@media screen and (max-width: 1700px)": {
        fontSize: "14px",
      },
      "&:hover": {
        color: "rgb(215, 40, 47)",
      },
    },
    TypeStyle: {
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Open sans",
      color: "rgba(35, 31, 32, 1)",
      "& span": {
        fontWeight: 400,
        fontSize: 12,
        fontFamily: "Open sans",
        color: "rgba(35, 31, 32, 1)",
      },
    },
    ProductSmallHeadings: {
      color: "rgba(35, 31, 32, 1)",
      fontFamily: "Open sans",
      fontSize: "12px !important",
      whiteSpace: "nowrap",
      paddingBottom: "4px",
    },

    ProductLocationandbrand: {
      fontFamily: "Open sans",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      "@media screen and (max-width: 1700px)": {
        fontSize: "11px !important",
        textOverflow: "unset",
      },

      "& svg": {
        color: "rgba(215, 40, 47, 0.85)",
        position: "relative",
        bottom: -4,
        left: -4,
        fontSize: 18,
      },
    },

    product_bg: {
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "4px",
      fontSize: "13px",
      color: "#3E3E3E",
      padding: "2px 8px",
      border: "1px solid #e7e7e7",
      textAlign: "center",
    },
    brandtxt: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "12px !important",
      fontWeight: "600 !important",
      padding: "0 0 0 5px",
    },
  };
});

import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  OuterContainerStyle,
  ConfigProduct,
  ProDuctDetailBase,
} from "@/components/ProductDetail/style";
import WebCarousal from "@/components/ProductDetail/ProductComponents/Carousals/WebCarousal";
import ConfigureProduct from "@/components/ProductDetail/ProductComponents/ConfigureProduct";
import ContactSupplier from "@/components/ProductDetail/ProductComponents/ContactSupplier";
import Header from "@/components/ProductDetail/ProductComponents/Header";
import ProductDesciption from "@/components/ProductDetail/ProductComponents/ProductDesciption";
import ProductInformation from "@/components/ProductDetail/ProductComponents/ProductInformation";
import ProductOptions from "@/components/ProductDetail/ProductComponents/ProductOptions";
import ProductPricing from "@/components/ProductDetail/ProductComponents/ProductPricing";
import SellerProducts from "@/components/ProductDetail/ProductComponents/SellerProducts";
import Supplier from "@/components/ProductDetail/ProductComponents/Supplier";
import { Box } from "@mui/material";
import BigOverview from "./BigOverview";
import QuickLogin from "./QuickLogin";
import EmptyPage from "@/components/common/EmptyPage";
import FavoriteIcon from "@mui/icons-material/Favorite";
let IconStyle = { fontSize: "14px", color: "#D7282F", cursor: "pointer" };
import {
  ConfigProductCol,
  IpadPortrtaitView,
  UpToIpadView,
  MyIpadMobileGrid,
  RelatyedSearchArea,
  RelatedSearchHeading,
  PDPStyledKeyword,
  RelatyedSearchContent,
} from "./Style";
import {
  ButtonStyleContainer,
  HeaderRightButtonConatainer,
} from "@/components/ProductDetail/style";
import { useDispatch } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  AddCountryList,
  AddProductDetail,
} from "@/hooks/productDetailsReducer";
import {
  BrandList,
  apiClient,
  handleTrackUser,
  trackPageView,
} from "@/components/common/common";
import { TerritoryList, countriesList } from "@/utils/countriesphp";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import ConfigProductSkeleton from "./Skeleton/ConfigProductSkeleton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { toast } from "react-toastify";
import { getTokenFromCookies } from "@/utils/cookieUtils";

export default function ProductGrid() {
  const dispatch = useDispatch();
  localStorage.setItem("isLandingPage", "true");
  const { toggleConfigure } = useSelector((state: any) => state.productDetail);
  let isScrolling: any;
  const { data, status, loader } = useSelector(
    (state: any) => state.productDetail.detail
  );
  const { is_wishlist, id, user_id, userID } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  const [getTrackedId, setgetTrackedId] = useState<any>("");
  useEffect(() => {
    (async () => {
      let countryTerritory: any = await FetchTerritory();
      dispatch(AddCountryList(countryTerritory));
    })();
  }, []);
  const [Favorite, setFavourite] = useState<boolean>(is_wishlist);
  const FetchTerritory = async () => {
    let countryTerritory = [];
    let territory = TerritoryList.map((element) => ({
      value: element?.id + "t",
      view: element?.name,
      type: "Territory",
    }));
    let country = countriesList.map((element) => ({
      value: element?.code,
      view: element?.name,
      type: "Country",
      region: `${element.region}t`,
    }));
    countryTerritory = [...territory, ...country];

    return countryTerritory;
  };

  let sellerProduct =
    data?.seller_product?.filter((v) => v.id !== data.id) ?? [];
  let relatedProduct =
    data?.related_product?.filter((v) => v.id !== data.id) ?? [];

  const webView = {
    xs: "block",
    sm: "block",
    lg: "block",
    xl: "block",
    md: "block",
    laptop: "none",
  };

  const mobileView = {
    xs: "block",
    sm: "block",
    lg: "none",
    xl: "none",
    md: "none",
    laptop: "block",
  };

  const webViewContact = {
    xs: "none",
    sm: "none",
    lg: "block",
    xl: "block",
    md: "none",
    laptop: "none",
  };

  const mobileViewContact = {
    xs: "block",
    sm: "block",
    lg: "none",
    xl: "none",
    md: "block",
    laptop: "block",
  };

  const { query, asPath } = useRouter();

  console.log("data", query);

  useEffect(() => {
    if (query?.id?.[2]) fetchProductDetail();
  }, [query]);

  useEffect(() => {
    localStorage.removeItem("scrollPercentage");
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
    let interval;
    const checkApi = async () => {
      interval = setInterval(
        () => trackPageView(asPath, "yes", "ProductDetail", "", getTrackedId),
        30000
      );
    };
    if (getTrackedId !== "") {
      checkApi();
    }
    return () => {
      clearInterval(interval);
    };
  }, [getTrackedId]);

  useEffect(() => {
    if (is_wishlist && !Favorite) setFavourite(true);
  }, [is_wishlist]);
  const AddToWishlist = async () => {
    let response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id: id },
    });
    if (!response.status || response.status !== 200) {
      setFavourite(!Favorite);
    }
  };
  const WishlistHandler = () => {
    if (!getTokenFromCookies()) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    setFavourite((prev) => !prev);
    AddToWishlist();
  };

  const fetchProductDetail = async () => {
    let userID = localStorage?.userData
      ? JSON.parse(localStorage?.userData).id
      : null;
    const currencyId = localStorage.getItem("currency");

    let data = {
      slug: query?.id?.[2] ?? "",
      user_id: userID ? userID : "",
      id: query?.id?.[3] ?? "",
      search_keyword: query?.search_keyword ?? "",
      page_name: "productdetail",
      currency: currencyId ?? 0,
      // ip_address:
    };
    // console.log("data", data);
    let params: any = await apiClient("front/single/view", "post", {
      body: data,
    });
   

    if (params?.status == 200) {
      let response = await trackPageView(
        asPath,
        "",
        "ProductDetail",
        params?.data,
        ""
      );
      setgetTrackedId(response);
      dispatch(
        AddProductDetail({
          status: true,
          data: { ...params.data, userID },
          loader: false,
        })
      );
    }
    if (!params.status) {
      dispatch(AddProductDetail({ status: false, loader: false, data: {} }));
    }
  };

  let Image = () => {
    let featuredImage = data?.photos?.filter((v) => v.is_featured) ?? [];
    if (featuredImage.length > 0) {
      return featuredImage[0]?.file_name;
    } else {
      return data?.photos?.[0]?.file_name;
    }
  };

  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${data?.name ?? ""}",
        "image": "${Image()}",
        "description": "${data?.description ?? ""}"
        "brand": {
          "@type": "Brand",
          "name": "${data?.brand_name ?? ""}"
        },
        "offers": {
          "@type": "Offer",
          "url": "",
          "priceCurrency": "",
          "price": "",
          "availability": "${data?.availability ?? ""}"
          "itemCondition": "${data?.condition ?? ""}"
        },
      }`,
    };
  }

  const { validity, manufacturer_year, model_number, condition, availability } =
    useSelector((state: any) => state.productDetail.detail.data);
  const { country } = useSelector((state: any) => state.productDetail);

  const GetCountryName = (name: any) => {
    let countryName = name.split(",");
    let countriesName = countryName.map(
      (v) => country.find((el) => el.value == v)?.view
    );
    return countriesName.toString();
  };

  const Value = [
    {
      title: "Manufacturing Year",
      value: manufacturer_year ? manufacturer_year : "",
    },
    {
      title: "Model No.",
      value: model_number ? model_number : "",
    },
    {
      title: "Condition",
      value: availability == "in_stock" ? (condition ? condition : "") : "",
    },
    {
      title: "Validity",
      value: validity?.replaceAll("_", " "),
    },
  ];
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let toolText = BrandList.find((v) => v.name == data?.condition);
  return (
    <>
      <Head>
        {!data?.meta_title && <title>{data?.name}</title>}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      {loader ? (
        <ConfigProductSkeleton />
      ) : status ? (
        <ProDuctDetailBase
          sx={{ padding: "0 8px 0", backgroundColor: "white" }}
          // onClick={(e) => {
          //   e.stopPropagation();
          //   {
          //   }
          // }}
        >
          <Grid container style={OuterContainerStyle}>
            <Header />
          </Grid>
          <div className="mypagecontainer">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={8.9} xl={9.5}>
                <Grid container spacing={{ xs: 2 }}>
                  <Grid item xs={12}>
                    <UpToIpadView>
                      <Grid container spacing={{ xs: 1, lg: 2 }}>
                        <Grid
                          className="mobilenozoom"
                          item
                          xs={12}
                          sm={12}
                          md={3.5}
                          lg={4.5}
                          xl={5}
                          style={{ paddingRight: "3px" }}
                          display={webView}
                        >
                          <Stack
                            spacing={{ xs: 2 }}
                            justifyContent={{ xs: "space-between" }}
                            style={{
                              position: "sticky",
                              top: "76px",
                              zIndex: "5",
                              borderRadius: "6px",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: "5px",
                                top: "25px",
                                zIndex: "999",
                                fontSize: "10px",
                                border: "1px solid #d2d2d2",
                                padding: "0 6px",
                                borderRadius: "4px",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              Product ID: {data?.unique_number}
                            </Box>

                            <Box
                              sx={{
                                position: "absolute",
                                right: "5px",
                                top: "0",
                                zIndex: "999",
                              }}
                            >
                              <HeaderRightButtonConatainer>
                                {user_id != userID && (
                                  <ButtonStyleContainer
                                    data-tracking="wishlist-identifier"
                                    onClick={WishlistHandler}
                                  >
                                    {!Favorite ? (
                                      <FavoriteBorderOutlinedIcon
                                        data-tracking="wishlist-identifier"
                                        style={IconStyle}
                                      />
                                    ) : (
                                      <FavoriteIcon style={IconStyle} data-tracking="wishlist-identifier"/>
                                    )}
                                  </ButtonStyleContainer>
                                )}
                              </HeaderRightButtonConatainer>
                            </Box>
                            <WebCarousal />
                            {availability == "in_stock" && (
                              
                              <>
                                {Value.some((v) => !!v.value) && (
                                  <Box
                                    sx={{
                                      backgroundColor: "#F3F3F3",
                                      padding: "8px 12px 12px",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "14px",
                                        color: "#000000",
                                        fontWeight: "600",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Overview
                                    </Typography>
                                    <Box
                                      sx={{
                                        width: "100%",
                                        overflowX: "auto",
                                        backgroundColor: "#ffffff",
                                        padding: "20px 12px",
                                        "&::-webkit-scrollbar": {
                                          width: "0.4em",
                                          height: "0.4em",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                          boxShadow:
                                            "inset 0 0 6px rgba(0,0,0,0.00)",
                                          webkitBoxShadow:
                                            "inset 0 0 6px rgba(0,0,0,0.00)",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                          backgroundColor: "#dedede",
                                          borderRadius: "4px",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover:horizontal":
                                          {
                                            background: "#6d6d6d",
                                          },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "inline-flex",
                                          alignItems: "flex-start",
                                          width: "auto",
                                        }}
                                      >
                                        {Value.map(
                                          (v, i) =>
                                            v.value && (
                                              <Box
                                                key={i}
                                                sx={{
                                                  paddingLeft: "4px",
                                                  maxWidth: "180px",
                                                  minWidth: "180px",
                                                  "@media (max-width: 1500px)":
                                                    {
                                                      minWidth: "140px",
                                                    },
                                                  "& .MuiTypography-h6": {
                                                    fontSize: "12px",
                                                    color: "#4A4A4A",
                                                    fontWeight: "normal",
                                                  },
                                                  "& .MuiTypography-body1": {
                                                    fontSize: "15px",
                                                    color: "#000000",
                                                    fontWeight: "600",
                                                  },
                                                }}
                                              >
                                                <Typography variant="h6">
                                                  {v.title}
                                                </Typography>
                                                <Typography
                                                  variant="body1"
                                                  sx={{
                                                    textTransform: "capitalize",
                                                    "& .MuiSvgIcon-root": {
                                                      fontSize: "14px",
                                                      color: "#0AA133",
                                                    },
                                                  }}
                                                >
                                                  {v.value}
                                                  {v.title === "Condition" &&
                                                    v.value && (
                                                      <LightTooltip
                                                        PopperProps={{
                                                          style: { zIndex: 10 },
                                                        }}
                                                        disableInteractive
                                                        arrow
                                                        placement="top"
                                                        title={toolText?.buyer}
                                                      >
                                                        <InfoOutlinedIcon
                                                          sx={{
                                                            margin: "0 2px",
                                                          }}
                                                        />
                                                      </LightTooltip>
                                                    )}
                                                </Typography>
                                              </Box>
                                            )
                                        )}
                                      </Box>
                                    </Box>
                                  </Box>
                                )}
                              </>
                            )}
                          </Stack>
                        </Grid>
                        <Grid
                          className="mobilespacing"
                          item
                          xs={12}
                          sm={12}
                          md={5}
                          lg={7.5}
                          xl={7}
                          style={{ paddingRight: "0" }}
                        >
                          <Stack spacing={{ xs: 0 }}>
                            <ProductDesciption />
                            <BigOverview />
                          </Stack>
                        </Grid>
                        <Grid
                          className="mobilespacing"
                          item
                          xs={12}
                          sm={12}
                          md={3.5}
                          lg={3}
                          xl={3}
                          style={{ paddingRight: "0" }}
                        >
                          <Stack
                            bgcolor="white"
                            padding="0px 0px 14px"
                            spacing={{ xs: 1.5, sm: 1.4, md: 3, lg: 3, xl: 3 }}
                            borderRadius="6px"
                            className="fixedHeightSide"
                            display={mobileViewContact}
                          >
                            <ContactSupplier />
                            <ProductPricing />
                            <ProductOptions />
                            <Supplier />
                            <QuickLogin />
                          </Stack>
                        </Grid>
                      </Grid>
                    </UpToIpadView>
                  </Grid>
                  <Grid item xs={12} mt={-2}>
                    <IpadPortrtaitView>
                      <Grid container spacing={1}>
                        <MyIpadMobileGrid item xs={12} sm={7.5}>
                          <ProductDesciption />
                          <Stack
                            spacing={{ xs: 2 }}
                            justifyContent={{ xs: "space-between" }}
                            style={{
                              position: "sticky",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: "4px",
                                top: "18px",
                                zIndex: "999",
                                fontSize: "10px",
                                border: "1px solid #d2d2d2",
                                padding: "0 6px",
                                borderRadius: "4px",
                                backgroundColor: "#ffffff",
                              }}
                            >
                              Product ID: {data?.product_id}
                            </Box>

                            <WebCarousal />
                            {availability == "in_stock" && (
                              <Box
                                sx={{
                                  backgroundColor: "#F3F3F3",
                                  padding: "8px 12px 12px",
                                  borderRadius: "6px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#000000",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                  }}
                                >
                                  Overview
                                </Typography>
                                <Box
                                  sx={{
                                    width: "100%",
                                    overflowX: "auto",
                                    backgroundColor: "#ffffff",
                                    padding: "20px 12px",
                                    "&::-webkit-scrollbar": {
                                      width: "0.4em",
                                      height: "0.4em",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                      boxShadow:
                                        "inset 0 0 6px rgba(0,0,0,0.00)",
                                      webkitBoxShadow:
                                        "inset 0 0 6px rgba(0,0,0,0.00)",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                      backgroundColor: "#dedede",
                                      borderRadius: "4px",
                                    },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "inline-flex",
                                      alignItems: "flex-start",
                                      width: "auto",
                                    }}
                                  >
                                    {Value.map((v) => (
                                      <Box
                                        sx={{
                                          paddingLeft: "4px",
                                          maxWidth: "180px",
                                          minWidth: "180px",
                                          "@media (max-width: 1500px)": {
                                            minWidth: "160px",
                                            maxWidth: "25%",
                                            textAlign: "center",
                                          },
                                          "& .MuiTypography-h6": {
                                            fontSize: "12px",
                                            color: "#4A4A4A",
                                            fontWeight: "normal",
                                          },
                                          "& .MuiTypography-body1": {
                                            fontSize: "16px",
                                            color: "#000000",
                                            fontWeight: "600",
                                            "@media (max-width: 900px)": {
                                              fontSize: "14px",
                                            },
                                          },
                                        }}
                                      >
                                        {v.title && (
                                          <Typography variant="h6">
                                            {v.title}
                                          </Typography>
                                        )}
                                        <Typography
                                          variant="body1"
                                          sx={{
                                            textTransform: "capitalize",
                                            "& .MuiSvgIcon-root": {
                                              fontSize: "15px",
                                              color: "#0AA133",
                                            },
                                          }}
                                        >
                                          {v.value}
                                          {v.title == "Condition" && (
                                            <LightTooltip
                                              disableInteractive
                                              arrow
                                              placement="top"
                                              title={toolText?.buyer}
                                            >
                                              <InfoOutlinedIcon
                                                sx={{ margin: "0 2px" }}
                                              />
                                            </LightTooltip>
                                          )}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              </Box>
                            )}
                          </Stack>

                          <Stack spacing={{ xs: 2 }}>
                            <Box
                              sx={{
                                display: "none",
                                "@media screen and (max-width: 767px)": {
                                  display: "block",
                                },
                              }}
                            >
                              <ProductPricing />
                            </Box>
                            <BigOverview />
                          </Stack>
                        </MyIpadMobileGrid>
                        <MyIpadMobileGrid item xs={12} sm={4.5}>
                          <Stack
                            bgcolor="white"
                            padding="0px 0px 14px"
                            spacing={{ xs: 1.5, sm: 1.4, md: 3, lg: 3, xl: 3 }}
                            borderRadius="6px"
                            position="relative"
                            className="fixedHeightSide"
                            display={mobileViewContact}
                          >
                            <ContactSupplier />
                            <Box
                              sx={{
                                display: "block",
                                "@media screen and (max-width: 767px)": {
                                  display: "none",
                                },
                              }}
                            >
                              <ProductPricing />
                            </Box>
                            <ProductOptions />
                            <Supplier />
                            <QuickLogin />
                          </Stack>
                        </MyIpadMobileGrid>
                      </Grid>
                    </IpadPortrtaitView>
                  </Grid>
                  <Grid item xs={12}>
                    <ConfigProductCol>
                      {/* <ConfigureProduct /> */}
                    </ConfigProductCol>
                    <ProductInformation />
                  </Grid>
                  {sellerProduct.length > 0 && (
                    <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                      <SellerProducts
                        productList={sellerProduct}
                        Name="Seller Product"
                      />
                    </Grid>
                  )}
                  {relatedProduct.length > 0 && (
                    <Grid item xs={12}>
                      <SellerProducts
                        marginTop="0px"
                        productList={relatedProduct}
                        Name="Related Product"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <RelatyedSearchArea>
                      <RelatedSearchHeading variant="h2">
                        <span>Related Search</span>
                      </RelatedSearchHeading>
                      <RelatyedSearchContent>
                        <PDPStyledKeyword>Power plant pumps</PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Industrial pumps for power plants
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Centrifugal pumps for power generation
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>Diaphragm pumps</PDPStyledKeyword>
                        <PDPStyledKeyword>Power plant pumps</PDPStyledKeyword>
                        <PDPStyledKeyword>Cooling water pumps</PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Chemical dosing pumps
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>Power plant pumps</PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Industrial pumps for power plants
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Centrifugal pumps for power generation
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Diaphragm pumps for power generation
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Cooling water pumps for power plants
                        </PDPStyledKeyword>
                        <PDPStyledKeyword>
                          Chemical dosing pumps
                        </PDPStyledKeyword>
                      </RelatyedSearchContent>
                    </RelatyedSearchArea>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={3.1}
                xl={2.5}
                className={"RightToggle"}
              >
                <Stack
                  bgcolor="white"
                  padding="0px 0px 14px"
                  spacing={{ xs: 1.5, sm: 1.4, md: 3, lg: 3, xl: 3 }}
                  borderRadius="6px"
                  position="relative"
                  className="fixedHeightSide"
                  display={webViewContact}
                >
                  <ContactSupplier />
                  <ProductPricing />
                  {data?.product_type !== "simple" && <ProductOptions />}
                  <Supplier />
                  <QuickLogin />
                </Stack>
              </Grid>
            </Grid>
          </div>
        </ProDuctDetailBase>
      ) : (
        <EmptyPage
          text={"Product"}
          onClickHandler={() => console.log()}
          logo="/assets/category_rejected.svg"
          type="product"
        />
      )}
      {data?.product_type !== "simple" && (
        <ConfigProduct className={toggleConfigure ? "active" : ""}>
          <ConfigureProduct />
        </ConfigProduct>
      )}
    </>
  );
}
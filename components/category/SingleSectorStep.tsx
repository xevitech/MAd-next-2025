import React, { useEffect, useState } from "react";
import {
  BrandItem,
  CommonInnerContent,
  SingleSectorPageWrapper,
  ContentSection,
  ImageHeading,
  ImageInfo,
  InnerContentBox,
  LeftCategorySide,
  MainSectorHeading,
  MoreSubCategory,
  MoreSubCategoryListStyling,
  MyImageBox,
  MyInfoBox,
  MyInnerContainer,
  PageSmallHeading,
  SubMenuText,
  SubcategorRow,
  BackgroundSection,
  IconWrapper,
  ContentWrapper,
  Overlay,
  BannerContentWrap,
  CommonSectionBox,
  EngineerBoxInfo,
  EPersonalInfo,
  EngineerDes,
  TopRatedCompaniesBox,
  ComNameLogoInfo,
  OriginDate,
  UserStatus,
  CompanyBusinessType,
  CompanyProductList,
  CompanyProductItem,
  CompanyRating,
  SecrorMinMaxOrder,
  EngineerImageBox,
  TopRatedCompaniesInner1,
  BannerOuter,
  ImgTextBox,
  Bannerdescription,
  EngineerOuterBox,
  EngineerFlexBox,
  EngineerContentBox,
} from "./style";
import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../ProductsListing/ProductItem";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Paper } from "@mui/material";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import CategroyListSkeleton from "./skeleton/CategroyListSkeleton";
import CategoryProduct from "./skeleton/CategoryProduct";
import RelatedProducts from "./skeleton/RelatedProducts";
import BrandSkeleton from "./skeleton/BrandSkeleton";
import TopRatedCompanies from "./skeleton/TopRatedCompanies";
import Head from "next/head";
import TopEngineerSkeleton from "./skeleton/TopEngineerSkeleton";
import { object } from "yup";
import { Navigate } from "../common/common";

const TopEngineerSection = styled(Box)`
  .wg-box-content {
    position: relative;
    width: 90%;
    max-width: 400px;
    margin: auto;
    overflow: hidden;
  }

  .wg-box-content .wg-box-content-overlay {
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: all 0.4s ease-in-out 0s;
  }

  .wg-box-content:hover .wg-box-content-overlay {
    opacity: 1;
  }

  .wg-box-content-image {
    width: 100%;
  }

  .wg-box-content-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;
  }

  .wg-box-content:hover .wg-box-content-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }

  .wg-box-fadeIn-bottom {
    top: 80%;
  }
`;
const settingsDesktop = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1524,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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

const settingsEngineer = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1524,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
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
const SingleSectorPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [sectorData, setSectorData] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [productListData, setProductListData] = useState([]);
  const [relatedData, setRelatedData] = useState([]);
  const [relatedBrandData, setRelatedBrandData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productsList } = useSelector((state: any) => state.productList);
  const normalPostList = productsList;

  const getSectorData = async () => {
    try {
      const currency_id = JSON.parse(localStorage.getItem("currency")) ?? "1";
      const res = await fetch(
        `${BASE_URL}/front/singleSector/${slug}?currency=${currency_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Error fetching sector data: ${res.status}`);
      }
      const resp = await res.json();
      let response = resp.data?.[0];

      if (resp.status == true) {
        setSubCategoryData(response.sub_category);

        setProductListData(response?.product_list);
        setRelatedData(response.related_product);
        setRelatedBrandData(response?.related_brand);
        setSectorData(response);
        setLoading(false);
      }
      console.log("setSubCategoryData", subCategoryData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("slug_values-", slug);

    if (slug) {
      getSectorData();
    }
  }, [slug]);
  const [subCategoryLengths, setSubCategoryLengths] = useState<number[]>([]);
  return (
    <SingleSectorPageWrapper>
      <Head>
        <title>
          {sectorData?.name} {"| Merchant AD"}
        </title>
        <meta name="title" content={sectorData?.meta_title} />
        <meta name="description" content={sectorData?.meta_description} />
        <meta name="keyword" content={sectorData?.tags} />
      </Head>
      {loading ? (
        <Skeleton animation="wave" variant="rounded" height={"300px"} />
      ) : (
        <BackgroundSection
          sx={{ backgroundImage: `url(${sectorData?.banner})` }}
        >
          <Overlay />
          <Container
            maxWidth="lg"
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BannerContentWrap>
              <BannerOuter>
                <ImgTextBox>
                  <IconWrapper sx={{ marginBottom: "0px" }}>
                    {loading ? (
                      <>
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          height={"90px"}
                          width={"90px"}
                          sx={{ minWidth: "90px" }}
                        />
                      </>
                    ) : (
                      <img src={sectorData?.icon} alt="Icon" />
                    )}
                  </IconWrapper>
                  <ContentWrapper>
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        height={"35px"}
                        sx={{
                          textAlign: "center",
                          width: "300px",
                          "@media screen and (max-width:480px)": {
                            width: "100px",
                          },
                        }}
                      />
                    ) : (
                      <>
                        <Typography variant="h4" component="h1">
                          {sectorData?.name}
                        </Typography>
                        <Box>
                          <Bannerdescription>
                            {sectorData?.description}
                          </Bannerdescription>
                        </Box>
                        <source />
                      </>
                    )}
                  </ContentWrapper>
                </ImgTextBox>
              </BannerOuter>
            </BannerContentWrap>
          </Container>
        </BackgroundSection>
      )}
      <MyInnerContainer>
        <ContentSection>
          <MoreSubCategory>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3.5}
                md={3}
                pt={"0 !important"}
                sx={{ borderRight: "1px solid #e3e3e3" }}
              >
                {loading ? (
                  <CategroyListSkeleton />
                ) : (
                  <LeftCategorySide>
                    <MainSectorHeading>
                      <Typography>{sectorData?.name}</Typography>
                    </MainSectorHeading>
                    <MoreSubCategoryListStyling>
                      {subCategoryData.map((category, index) => {
                        return (
                          <>
                            <ListItem key={index} disablePadding>
                              <ListItemButton
                                component="a"
                                href="#simple-list"
                                className="listItem"
                              >
                                <ListItemText
                                  onClick={() =>
                                    router.push(
                                      `/category/${sectorData?.slug}/${category.slug}`
                                    )
                                  }
                                >
                                  {category.name}
                                </ListItemText>{" "}
                                <Paper
                                  className={
                                    category?.sub_category?.length === 0
                                      ? ""
                                      : "subMenu"
                                  }
                                >
                                  <List
                                    sx={{
                                      "& .MuiTypography-body1": {
                                        fontSize: "11px",
                                      },
                                    }}
                                  >
                                    {category.sub_category.map(
                                      (sub_category, index) => {
                                        console.log(category, "sub_category");
                                        return (
                                          <>
                                            <SubMenuText
                                              onClick={() =>
                                                router.push(
                                                  `/category/${sectorData?.slug}/${category.slug}/${sub_category.slug}`
                                                )
                                              }
                                            >
                                              {sub_category.name}
                                            </SubMenuText>
                                            <Divider
                                              variant="middle"
                                              component="li"
                                            />
                                          </>
                                        );
                                      }
                                    )}
                                  </List>
                                </Paper>
                                {category?.sub_category?.length > 0 && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                )}
                              </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </>
                        );
                      })}
                    </MoreSubCategoryListStyling>
                  </LeftCategorySide>
                )}
              </Grid>

              <Grid item xs={12} sm={7.5} md={9} pt={"0 !important"}>
                {loading ? (
                  <CategoryProduct />
                ) : (
                  <SubcategorRow>
                    <Grid container spacing={1}>
                      {productListData.map((product, index) => {
                        return (
                          <>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                              <InnerContentBox>
                                <MyImageBox
                                  onClick={
                                    () => Navigate(product)
                                    // router.push(
                                    //   `/productdetail/${product.brand_name}/${product.slug}`
                                    // )
                                  }
                                >
                                  <img
                                    src={product.product_images?.source}
                                    height="50px"
                                    alt="dasd"
                                  />
                                </MyImageBox>
                                <MyInfoBox>
                                  <ImageHeading>{product.name}</ImageHeading>
                                  <ImageInfo>
                                    {product.description?.replace(
                                      /<[^>]+>/g,
                                      ""
                                    )}
                                  </ImageInfo>
                                </MyInfoBox>
                              </InnerContentBox>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </SubcategorRow>
                )}
              </Grid>
            </Grid>
          </MoreSubCategory>

          {relatedData?.length <= 0 ? (
            ""
          ) : (
            <CommonSectionBox>
              <CommonInnerContent>
                {loading ? (
                  <RelatedProducts />
                ) : (
                  <>
                    <PageSmallHeading variant="h3">
                      <span>Related Product</span>
                    </PageSmallHeading>
                    <Grid container spacing={2}>
                      {relatedData?.length > 0 &&
                        relatedData?.map((element, index) => {
                          return (
                            <Grid item xs={12} sm={6} md={3}>
                              <ProductItem data={element} key={index} />
                            </Grid>
                          );
                        })}
                    </Grid>
                  </>
                )}
              </CommonInnerContent>
            </CommonSectionBox>
          )}

          {relatedBrandData?.length <= 0 ? (
            ""
          ) : (
            <CommonSectionBox>
              {loading ? (
                <BrandSkeleton />
              ) : (
                <>
                  <PageSmallHeading variant="h3">
                    <span>All Related Brands</span>
                  </PageSmallHeading>
                  <CommonInnerContent>
                    <Slider {...settingsDesktop}>
                      {relatedBrandData.map((brand, index) => {
                        return (
                          <div key={index}>
                            <BrandItem>
                              <img
                                src={brand.logo.length > 0 && brand.logo}
                                alt={`${brand.name} Logo`}
                              />
                            </BrandItem>
                          </div>
                        );
                      })}
                    </Slider>
                  </CommonInnerContent>
                </>
              )}
            </CommonSectionBox>
          )}

          {sectorData?.top_related_companies?.length > 0 ? (
            <CommonSectionBox>
              <CommonInnerContent>
                {loading ? (
                  <TopRatedCompanies></TopRatedCompanies>
                ) : (
                  <>
                    <PageSmallHeading variant="h3">
                      <span>Top Related Companies</span>
                    </PageSmallHeading>
                    <Grid container spacing={2}>
                      {sectorData?.top_related_companies?.length > 0 &&
                        sectorData.top_related_companies?.map(
                          (top, topIndex) => {
                            console.log("top_seller_1000", top);
                            return (
                              <>
                                {top?.top_seller?.map((seller, sellerIndex) => {
                                  let parsedBusinessType = JSON.parse(
                                    seller.business_type
                                  );
                                  const activeBusinessTypes = parsedBusinessType
                                    .map((type) => type.name)
                                    .join(", ");
                                  return (
                                    <>
                                      <Grid item xs={12} sm={12} md={6}>
                                        <TopRatedCompaniesBox
                                          sx={{ height: "100%" }}
                                        >
                                          <Box>
                                            <TopRatedCompaniesInner1>
                                              <ComNameLogoInfo
                                                onClick={() =>
                                                  router.push(
                                                    `/mini-site/${seller.slug}/home`
                                                  )
                                                }
                                              >
                                                <img
                                                  src={seller?.logo?.source}
                                                  alt="Company Logo"
                                                />
                                              </ComNameLogoInfo>
                                              <Box>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                    flexWrap: "wrap",
                                                  }}
                                                >
                                                  <Typography
                                                    variant="h5"
                                                    sx={{ fontSize: "20px" }}
                                                  >
                                                    {seller?.name}
                                                  </Typography>
                                                  <img
                                                    src={
                                                      seller?.verification_image ||
                                                      "/assets/verifyWtext.svg"
                                                    }
                                                    alt=""
                                                  />
                                                </Box>
                                                <OriginDate>
                                                  <img
                                                    src={
                                                      seller?.crown_image ||
                                                      "/assets/images/category/crown.svg"
                                                    }
                                                    alt="Image"
                                                  />
                                                  <Typography>
                                                    Since{" "}
                                                    {seller?.registration_year}
                                                  </Typography>

                                                  <CompanyBusinessType>
                                                    {seller.business_type && (
                                                      <>
                                                        {JSON.parse(
                                                          seller.business_type
                                                        )
                                                          .filter(
                                                            (business) =>
                                                              business.toggle ===
                                                                true ||
                                                              business.toggle ===
                                                                "1"
                                                          )
                                                          .map((business) =>
                                                            business.name.replace(
                                                              /s(?=[^s]*$)/,
                                                              ""
                                                            )
                                                          )
                                                          .join(",")}
                                                      </>
                                                    )}
                                                  </CompanyBusinessType>
                                                  <UserStatus>
                                                    {seller?.no_of_employee ||
                                                      "100+"}{" "}
                                                    Staff
                                                  </UserStatus>
                                                </OriginDate>
                                                <CompanyRating>
                                                  <Typography>
                                                    <span>
                                                      Rating and reviews:
                                                    </span>{" "}
                                                    {seller?.average_rating}/5{" "}
                                                    <Link>
                                                      ({seller.total_review}{" "}
                                                      reviews)
                                                    </Link>
                                                  </Typography>
                                                </CompanyRating>
                                              </Box>
                                            </TopRatedCompaniesInner1>
                                            <Grid item xs={12}>
                                              <CompanyProductList>
                                                <Grid container spacing={2}>
                                                  {seller?.product_list?.map(
                                                    (product, productIndex) => {
                                                      const priceRange =
                                                        product?.price_range;
                                                      let formattedPriceRange =
                                                        "0";
                                                      if (
                                                        Array.isArray(
                                                          priceRange
                                                        ) &&
                                                        priceRange.length === 2
                                                      ) {
                                                        formattedPriceRange = `${product?.symbol}${priceRange[0]} -  ${product?.symbol}${priceRange[1]}`;
                                                      } else if (
                                                        typeof priceRange ===
                                                        "string"
                                                      ) {
                                                        formattedPriceRange =
                                                          priceRange.replace(
                                                            "-",
                                                            " - "
                                                          );
                                                      } else {
                                                        formattedPriceRange = `${product?.symbol} ${product.unit_price}`;
                                                      }

                                                      return (
                                                        <Grid
                                                          item
                                                          xs={12}
                                                          sm={6}
                                                          md={6}
                                                          lg={3}
                                                          key={`${top.id}-${seller.id}-${productIndex}`}
                                                        >
                                                          <CompanyProductItem
                                                            onClick={() =>
                                                              router.push(
                                                                `/productdetail/${product.product_type}/${product.slug}`
                                                              )
                                                            }
                                                          >
                                                            <img
                                                              src={
                                                                product.main_image
                                                              }
                                                              width={10}
                                                              alt=""
                                                            />
                                                            <Typography variant="h6">
                                                              {product?.name}
                                                            </Typography>
                                                            <SecrorMinMaxOrder>
                                                              <Typography variant="h5">
                                                                {
                                                                  formattedPriceRange
                                                                }
                                                              </Typography>
                                                              Min. order:{" "}
                                                              {product?.min_qty}{" "}
                                                              piece
                                                            </SecrorMinMaxOrder>
                                                          </CompanyProductItem>
                                                        </Grid>
                                                      );
                                                    }
                                                  )}
                                                </Grid>
                                              </CompanyProductList>
                                            </Grid>
                                            {/* </div> */}
                                          </Box>
                                        </TopRatedCompaniesBox>
                                      </Grid>
                                    </>
                                  );
                                })}
                              </>
                            );
                          }
                        )}
                    </Grid>
                  </>
                )}
              </CommonInnerContent>
            </CommonSectionBox>
          ) : null}

          <CommonSectionBox>
            {loading ? (
              <TopEngineerSkeleton />
            ) : (
              <>
                <PageSmallHeading variant="h3">Top Engineers</PageSmallHeading>
                <TopEngineerSection>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <EngineerOuterBox>
                        <EngineerFlexBox>
                          <img
                            className="wg-box-content-image"
                            src="/assets/images/category/engineer-image-2.jpg"
                            alt="Brand Logo"
                            style={{ objectFit: "cover" }}
                          />
                        </EngineerFlexBox>
                        <EngineerContentBox>
                          <EPersonalInfo>
                            <Typography variant="h3">John Martin</Typography>
                            <Typography>Founder & CEO</Typography>
                          </EPersonalInfo>
                          <EngineerDes>
                            Former co-founder of Opendoor. Early staff at
                            Spotify and Clearbit.
                          </EngineerDes>
                        </EngineerContentBox>
                      </EngineerOuterBox>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <EngineerOuterBox>
                        <EngineerFlexBox>
                          <img
                            className="wg-box-content-image"
                            src="/assets/images/category/engineer-image.jpg"
                            alt="Brand Logo"
                            style={{ objectFit: "cover" }}
                          />
                        </EngineerFlexBox>
                        <EngineerContentBox>
                          <EPersonalInfo>
                            <Typography variant="h3"> Phoenix Baker</Typography>
                            <Typography>Engineering Manager</Typography>
                          </EPersonalInfo>
                          <EngineerDes>
                            An Engineering Manager leading technical teams and
                            projects efficiently.
                          </EngineerDes>
                        </EngineerContentBox>
                      </EngineerOuterBox>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <EngineerOuterBox>
                        <EngineerFlexBox>
                          <img
                            className="wg-box-content-image"
                            src="/assets/images/category/engineer-image-3.jpg"
                            alt="Brand Logo"
                            style={{ objectFit: "cover" }}
                          />
                        </EngineerFlexBox>
                        <EngineerContentBox>
                          <EPersonalInfo>
                            <Typography variant="h3"> Drew Cano</Typography>
                            <Typography>Sales executive</Typography>
                          </EPersonalInfo>
                          <EngineerDes>
                            A Sales Executive driving revenue growth and
                            building strong client relationships.
                          </EngineerDes>
                        </EngineerContentBox>
                      </EngineerOuterBox>
                    </Grid>
                  </Grid>
                </TopEngineerSection>
              </>
            )}
          </CommonSectionBox>
        </ContentSection>
      </MyInnerContainer>
    </SingleSectorPageWrapper>
  );
};
export default SingleSectorPage;

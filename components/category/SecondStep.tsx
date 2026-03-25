import {
  Box,
  Breadcrumbs,
  Button,
  Collapse,
  Divider,
  Grid,
  List,
  ListItemIcon,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BrandItem,
  CategoryMainBox,
  CategoryShowLessSpan,
  CommonInnerContent,
  CommonWhiteArea,
  ContentSection,
  FaqSection,
  HotSearchArea,
  HoverInfo,
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
  MyPageInfo,
  NewsItem,
  NewsSectionHere,
  PageSmallHeading,
  ParentCategory,
  ParentCategoryInner,
  SellerCardItem,
  SellerImage,
  StyledKeyword,
  SubMenuText,
  SubcategorRow,
  TopSellers,
  VideoArea,
  VideoHeading,
} from "./style";
import Banner from "./Banner";
import { apiClient, Navigate } from "../common/common";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setProductList } from "@/hooks/UseProductListContext";
import ProductItem from "../ProductsListing/ProductItem";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Slider from "react-slick";
import moment from "moment";

import {
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DividerUI } from "../common/dropZone/style";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { LightTooltip } from "../common/Tooltip/tooltip";
import TopratedSkeleton from "./skeleton/TopratedSkeleton";
import RelatedProducts from "./skeleton/RelatedProducts";
import CategroyListSkeleton from "./skeleton/CategroyListSkeleton";
import CategoryProduct from "./skeleton/CategoryProduct";
import BrandSkeleton from "./skeleton/BrandSkeleton";
import EmptyPage from "../common/EmptyPage";

const useStyles = makeStyles({
  root: {},
  listItem: {
    "&:hover $subMenu": {
      display: "block",
      opacity: 1,
    },
  },
  subMenu: {
    display: "none",
    position: "absolute",
    top: 0,
    left: "100%",
    backgroundColor: "white",
    transition: "opacity 0.3s ease",
    boxShadow:
      "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    zIndex: 1,
    opacity: 0,
    minWidth: 200,
  },
});
const settingsDesktop = {
  dots: false,
  infinite: false,
  arrow: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 8,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1524,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
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
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // borderLeft: `3px solid #d7282f`,
  margin: "10px",
  "&:not(:last-child)": {
    // borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    "& svg": {
      fontSize: "15px",
    },
  },
  "& .MuiAccordionSummary-root": {
    borderLeft: `4px solid #d7282f`,
  },
  "& .MuiAccordionDetails-root": {
    padding: "7px",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  // flexDirection: 'row-reverse',
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    // transform: 'rotate(90deg)',
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
export default function SecondStep({ list }) {
  console.log("listlist", list);
  const { data = [], categoryList: currentCatogeryData = [] } = list;
  const { product_list = {}, brand_list = [], slug, breadcrumbs } = data[0];
  const router = useRouter();
  const subCategoryList =
    useSelector((state: any) => state.categoryDetail)?.subCategoryDetail ?? [];
  const [expanded, setExpanded] = React.useState<any>(null);
  const [subChildCategoryList, setChildSubCategoryList] = useState<any>([]);
  const [relatedSearchData, setRelatedSearchData] = useState<any>([]);
  const { productsList } = useSelector((state: any) => state.productList);
  const { query, asPath } = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  useEffect(() => {
    if (query?.id[2]) {
      FetchChildCategoryDetail(query?.id[2]);
    }
  }, [subCategoryList, query]);
  const handleRedirect = async (slug: any) => {
    router.push(`/blog/${slug}`);
  };
  const FetchChildCategoryDetail = async (slug: any) => {
    let response: any = await apiClient(
      `menu/SubCategoryList?slug=${slug}&with_product=${1}`,
      "get"
    );
    if (response.status == 200) {
      setChildSubCategoryList(response?.data?.[0]?.sub_category ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (subCategoryList.length > 0) {
      let id = subCategoryList.find((v: any) => v.slug == query?.id?.[1]).id;
      setExpanded(id);
    }
  }, [subCategoryList]);

  useEffect(() => {
    fetchRelatedSearchList();
  }, [currentCatogeryData[0]?.id]);

  const dispatch = useAppDispatch();

  const categoryList =
    useSelector((state: any) => state.header)?.categoryList ?? [];
  const TabIndex = categoryList?.findIndex(
    (v: any) => v.slug == query?.category
  );
  const categoryBreadCrumbs = categoryList?.[TabIndex];
  const subCategoryBreadCrumbs = categoryList?.[TabIndex]?.sub_category?.find(
    (v: any) => v?.slug == query?.id?.[0]
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  useEffect(() => {
    if (
      (subCategoryBreadCrumbs && !expanded) ||
      subCategoryBreadCrumbs?.slug !== expanded
    ) {
      setExpanded(subCategoryBreadCrumbs?.slug);
    }
  }, [subCategoryBreadCrumbs]);

  const fetchRelatedSearchList = async () => {
    try {
      const response = await apiClient(
        `front/singleCategory/relatedSearch/${currentCatogeryData[0]?.id}`,
        "get"
      );
      if (response?.status === 200) {
        setRelatedSearchData(response?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const normalPostList = productsList;
  const filterProductList = async (value = "", params = {}, type = "") => {
    let response = await apiClient("front/product/list", "post", {
      // body: {
      //   category_id: query?.id?.[0],
      // },
    });
    if (response.status === 200) {
      dispatch(setProductList(response.data));
    }
    return response;
    setLoading(false);
  };
  const [topSellers, setTopseller] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFull, setIsFull] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(5);
  const [expandedfaq, setExpandedfaq] = React.useState<string | false>(
    "panel1"
  );
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedfaq(newExpanded ? panel : false);
    };

  const classes = useStyles();

  useEffect(() => {
    filterProductList();
  }, []);

  const handleSubCatogeryClick = (category, parentCategory?) => {
    const { slug = "" } = category;
    const { slug: parentSlug = "" } = parentCategory || {};
    const pathUrl = parentSlug
      ? `${asPath}/${parentSlug}/${slug}`
      : `${asPath}/${slug}`;
    router.push(pathUrl);
  };

  const getTopSellerData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/top-seller?currency=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Error fetching top seller data: ${res.status}`);
      }
      const responseData = await res.json();
      const sellersData = responseData?.data
        ?.map((item) => item.top_seller)
        .flat();
      setTopseller(sellersData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopSellerData();
  }, []);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient("blogs/getAll", "GET");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <CategoryMainBox>
        <Box>
          <Box>
            <Box sx={{ width: "100%" }}>
              <Box>
                <Banner
                  categoryName={list?.data?.[0]}
                  breadcrumbs={breadcrumbs}
                />
                <MyInnerContainer>
                  <MyPageInfo>
                    <Typography variant="h2">
                      Explore a wide variety of {data?.[0]?.name} designed for
                      the {data?.[0]?.parent_name}
                    </Typography>
                    <Typography
                      sx={{
                        "& .boxed": {
                          margin: "0 !important",
                        },
                      }}
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: data[0]?.description || "",
                      }}
                    ></Typography>
                  </MyPageInfo>

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
                                <Typography>{data[0]?.name}</Typography>
                              </MainSectorHeading>
                              <MoreSubCategoryListStyling>
                                {data[0]?.sub_category.map(
                                  (category, index) => (
                                    <>
                                      <ListItem disablePadding>
                                        <ListItemButton
                                          component="a"
                                          // href="#simple-list"
                                          className="listItem"
                                          onClick={() =>
                                            handleSubCatogeryClick(category)
                                          }
                                        >
                                          <ListItemText>
                                            {category?.name}
                                          </ListItemText>
                                          <Paper
                                            className={
                                              category?.sub_category?.length ===
                                              0
                                                ? ""
                                                : "subMenu"
                                            }
                                          >
                                            {category?.sub_category.map(
                                              (subCategory) => (
                                                <List
                                                  sx={{
                                                    "& .MuiTypography-body1": {
                                                      fontSize: "11px",
                                                    },
                                                  }}
                                                >
                                                  <SubMenuText
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleSubCatogeryClick(
                                                        subCategory,
                                                        category
                                                      );
                                                    }}
                                                  >
                                                    {subCategory?.name}
                                                  </SubMenuText>
                                                  <Divider
                                                    variant="middle"
                                                    component="li"
                                                  />
                                                </List>
                                              )
                                            )}
                                          </Paper>
                                          {category?.sub_category?.length >
                                            0 && (
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
                                      {/* <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list" className="listItem">
                                  <ListItemText>Cooling Water Pumps</ListItemText>
                                  <Paper className="subMenu">
                                    <<List>sx={{
                                      "& .MuiTypography-body1": {
                                        fontSize: "11px"
                                      }
                                    }}>
                                      <SubMenuText>Chemical Transfer Pumps</SubMenuText>
                                      <Divider variant="middle" component="li" />
                                      <SubMenuText>Diaphragm Pumps</SubMenuText>
                                      <Divider variant="middle" component="li" />
                                      <SubMenuText>Hydraulic Diaphragm Pumps</SubMenuText>
                                      <Divider variant="middle" component="li" />
                                      <SubMenuText>Submersible Pumps</SubMenuText>
                                    </List>
                                  </Paper>
                                  <Typography variant="body2" color="text.secondary">
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                </ListItemButton>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                  <ListItemText>Feedwater Pumps</ListItemText>
                                  <Typography variant="body2" color="text.secondary">
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                </ListItemButton>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                  <ListItemText>Fuel Transfer Pumps</ListItemText>
                                  <Typography variant="body2" color="text.secondary">
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                </ListItemButton>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                  <ListItemText>Condensate Pumps</ListItemText>
                                  <Typography variant="body2" color="text.secondary">
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                </ListItemButton>
                              </ListItem>
                              <Divider variant="inset" component="li" />
                              <ListItem disablePadding>
                                <ListItemButton component="a" href="#simple-list">
                                  <ListItemText>Waste & sludge Pumps </ListItemText>
                                  <Typography variant="body2" color="text.secondary">
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                </ListItemButton>
                              </ListItem> */}
                                    </>
                                  )
                                )}
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
                                {product_list?.length > 0 ? (
                                  product_list?.map((product) => (
                                    <Grid item xs={6} sm={4} md={4} lg={2}>
                                      <InnerContentBox
                                        onClick={() => {
                                          const pathname = "/productlist";
                                          const query = {
                                            category: product?.slug,
                                          };
                                          // router.push(
                                          //   { pathname, query },
                                          //   undefined,
                                          //   { shallow: true }
                                          // );
                                          Navigate(product);
                                          // window.open(
                                          //   `/productlist?category=${product?.slug}`,
                                          //   "_blank",
                                          //   "noreferrer"
                                          // );
                                        }}
                                      >
                                        <MyImageBox>
                                          <img
                                            src={product?.photos?.source}
                                            height="50px"
                                            alt="dasd"
                                          />
                                        </MyImageBox>
                                        <MyInfoBox>
                                          <ImageHeading>
                                            {product?.name}
                                          </ImageHeading>
                                          <ImageInfo
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                product?.description || "",
                                            }}
                                          ></ImageInfo>
                                        </MyInfoBox>
                                      </InnerContentBox>
                                    </Grid>
                                  ))
                                ) : (
                                  <>
                                    <EmptyPage
                                      customeTitle="No Product found"
                                      // customdescription="Currently there are no products listed under this category"
                                      customdescription={`Currently, there are no products listed under the ${data[0]?.name} category.`}
                                      onClickHandler={() => {}}
                                      logo="/assets/notification/product.svg"
                                      actiontext={false}
                                    />
                                  </>
                                )}
                              </Grid>
                            </SubcategorRow>
                          )}
                        </Grid>
                      </Grid>
                    </MoreSubCategory>
                    {relatedSearchData?.length > 0 && (
                      <HotSearchArea>
                        <PageSmallHeading variant="h2">
                          <span>Related Search</span>
                        </PageSmallHeading>
                        <CommonInnerContent>
                          {relatedSearchData?.map((searchData, index) => (
                            <StyledKeyword
                              key={index}
                              onClick={() =>
                                window.open(
                                  `/productlist?name=${searchData?.name}`
                                )
                              }
                            >
                              {searchData?.name}
                            </StyledKeyword>
                          ))}
                        </CommonInnerContent>
                      </HotSearchArea>
                    )}
                    {/* <CommonWhiteArea>
                      <PageSmallHeading variant="h2"><span>Popular Brand</span></PageSmallHeading>
                      <CommonInnerContent>
                        <Grid container spacing={1}>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-1.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-2.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-3.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-1.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-2.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-3.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-1.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-2.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                          <Grid item xs={1.5} sm={1.3} md={1.3}>
                            <BrandItem>
                              <img src="/assets/images/category/brand-1.png" alt="Brand Logo" />
                            </BrandItem>
                          </Grid>
                        </Grid>
                      </CommonInnerContent>
                    </CommonWhiteArea> */}
                    {brand_list && brand_list.length > 0 && (
                      <CommonWhiteArea>
                        {loading ? (
                          <BrandSkeleton />
                        ) : (
                          <>
                            <PageSmallHeading variant="h2">
                              <span>Popular Brand</span>
                            </PageSmallHeading>
                            <CommonInnerContent>
                              <div className="slider-container">
                                <Slider {...settingsDesktop}>
                                  {brand_list.map((brand) => (
                                    <div
                                      onClick={() => {
                                        const pathUrl = "/productlist";
                                        router.push(
                                          {
                                            pathname: pathUrl,
                                            query: {
                                              category: slug,
                                              brand: `${brand?.slug}-${brand?.id}`,
                                            },
                                          },
                                          undefined,
                                          { shallow: true }
                                        );
                                      }}
                                    >
                                      <BrandItem>
                                        <img
                                          src={brand?.logo}
                                          alt={brand?.name}
                                        />
                                      </BrandItem>
                                    </div>
                                  ))}
                                </Slider>
                              </div>
                            </CommonInnerContent>
                          </>
                        )}
                      </CommonWhiteArea>
                    )}

                    <CommonWhiteArea>
                      <PageSmallHeading variant="h2">
                        <span>Hot Product Videos</span>
                      </PageSmallHeading>
                      <CommonInnerContent>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            {/* <source src="your-video-file.mp4" type="video/mp4" /> */}
                            <VideoArea>
                              <img
                                src="/assets/images/category/video1.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Chemical Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video2.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video3.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video2.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video1.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video3.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video2.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                          <Grid item xs={6} sm={4} md={2} lg={1.5}>
                            <VideoArea>
                              <img
                                src="/assets/images/category/video3.jpg"
                                alt="fg"
                              />
                              <PlayCircleOutlinedIcon />
                            </VideoArea>
                            <VideoHeading>Cooling Water Pumps</VideoHeading>
                          </Grid>
                        </Grid>
                      </CommonInnerContent>
                    </CommonWhiteArea>
                    {topSellers?.length > 0 && (
                      <CommonWhiteArea>
                        {loading ? (
                          <TopratedSkeleton />
                        ) : (
                          <>
                            {" "}
                            <PageSmallHeading variant="h2">
                              <span>Top Rated Sellers</span>
                            </PageSmallHeading>
                            <TopSellers>
                              <Grid container spacing={2}>
                                {topSellers?.map((top) => {
                                  console.log("topSeller", top);
                                  return (
                                    <>
                                      <Grid
                                        item
                                        xs={12}
                                        sm={4}
                                        md={2.5}
                                        lg={2}
                                        xl={1.5}
                                        sx={{
                                          alignItems: "stretch",
                                          display: "grid",
                                        }}
                                      >
                                        {/* <SellerCardItem className="card"> */}
                                        <SellerCardItem className="">
                                          <SellerImage>
                                            <img src={top.logo} alt="fg" />
                                          </SellerImage>
                                          <HoverInfo>
                                            <Typography
                                              className="title"
                                              variant="h5"
                                            >
                                              {top.name}
                                            </Typography>
                                            <Typography
                                              className="title"
                                              variant="body1"
                                            >
                                              {top.location}
                                            </Typography>

                                            <Rating
                                              // className="hovertext"
                                              name="read-only"
                                              value={top.average_rating}
                                              readOnly
                                              size="small"
                                            />
                                          </HoverInfo>
                                        </SellerCardItem>
                                      </Grid>
                                    </>
                                  );
                                })}
                              </Grid>
                            </TopSellers>
                          </>
                        )}
                      </CommonWhiteArea>
                    )}
                    <CommonWhiteArea>
                      {loading ? (
                        <RelatedProducts />
                      ) : (
                        <>
                          <PageSmallHeading variant="h2">
                            <span>Related Product</span>
                          </PageSmallHeading>
                          <CommonInnerContent>
                            <Grid container spacing={2}>
                              {normalPostList?.length > 0 &&
                                normalPostList.map((element, index) => (
                                  <Grid item xs={12} sm={6} md={3}>
                                    <ProductItem data={element} key={index} />
                                  </Grid>
                                ))}
                            </Grid>
                          </CommonInnerContent>
                        </>
                      )}
                    </CommonWhiteArea>
                    <CommonWhiteArea>
                      <PageSmallHeading variant="h2">
                        <span>Just For You</span>
                      </PageSmallHeading>
                      <Box
                        sx={{
                          position: "relative",
                          marginTop: "12px",
                          "& .slick-slider": {
                            "& button::before": {
                              color: "#000",
                            },
                            "& .slick-list": {
                              minWidth: "200px",
                            },
                            "& .slick-arrow": {
                              zIndex: "3",
                              background: "#ffffff",
                              padding: "20px",
                              "&::before": {
                                content: '" "',
                                display: "block",
                                width: "20px",
                                height: "20px",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                              },
                            },
                            "& .slick-prev": {
                              left: "-6px",

                              "&::before": {
                                backgroundImage: `url('/assets/arrowLeft.svg')`,
                                margin: "-9px -8px 0",
                              },
                            },
                            "& .slick-next": {
                              right: "-6px",
                              "&::before": {
                                backgroundImage: `url('/assets/arrowRight.svg')`,
                                margin: "-9px -8px 0",
                              },
                            },
                            "& .slick-dots": {
                              bottom: "12px",
                              "& button": {
                                "&::before": {
                                  color: "#fff",
                                  opacity: 1,
                                  fontSize: "16px",
                                },
                              },
                              "& .slick-active": {
                                "& button": {
                                  "&::before": {
                                    color: "#d7282f",
                                    opacity: 1,
                                  },
                                },
                              },
                            },
                          },
                        }}
                      >
                        <Slider {...settings}>
                          <div>
                            <img
                              src="/assets/banners/slidebanner1.jpg"
                              alt="Banner Image 1"
                              width={"100%"}
                              style={{
                                height: "400px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div>
                            <img
                              src="/assets/banners/slidebanner2.jpg"
                              alt="Banner Image 2"
                              width={"100%"}
                              style={{
                                height: "400px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div>
                            <img
                              src="/assets/banners/slidebanner3.jpg"
                              alt="Banner Image 3"
                              width={"100%"}
                              style={{
                                height: "400px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </Slider>
                      </Box>
                    </CommonWhiteArea>
                    <CommonWhiteArea>
                      <PageSmallHeading variant="h2">
                        Industry News
                      </PageSmallHeading>
                      <NewsSectionHere>
                        <Grid container spacing={2}>
                          {blogs?.slice(0, 4).map((industry) => {
                            let isoDateString = industry.created_at;
                            let date = new Date(isoDateString);
                            let formattedDate = date.toLocaleString("en-US");
                            let activeBusinessTypes = "";
                            const htmlToText = (html) => {
                              const div = document.createElement("div");
                              div.innerHTML = html;
                              return div.innerText || div.textContent;
                            };
                            activeBusinessTypes = htmlToText(
                              industry.description
                            );

                            return (
                              <>
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  lg={3}
                                  key={industry.id}
                                >
                                  <NewsItem>
                                    <Box
                                      className="imgBox"
                                      onClick={() => {
                                        handleRedirect(industry?.slug);
                                      }}
                                    >
                                      <img
                                        src={industry?.image}
                                        alt={industry.title}
                                      />
                                    </Box>
                                    <Box
                                      className="flexBox"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                      }}
                                    >
                                      <Typography className="UserName">
                                        {industry.user
                                          ? industry.user.name
                                          : "Unknown User"}
                                      </Typography>
                                      <Box className="Dot">•</Box>
                                      <Typography className="datePlace">
                                        {moment(formattedDate).format(
                                          "DD MMM YYYY"
                                        )}
                                      </Typography>
                                    </Box>

                                    <LightTooltip
                                      arrow
                                      disableInteractive
                                      followCursor
                                      placement="top"
                                      title={industry.title}
                                    >
                                      <Typography
                                        className="blogTitle"
                                        onClick={() => {
                                          handleRedirect(industry?.slug);
                                        }}
                                      >
                                        {industry.title}
                                      </Typography>
                                    </LightTooltip>
                                    <Typography variant="body1">
                                      {industry.short_description}
                                    </Typography>
                                  </NewsItem>
                                </Grid>
                              </>
                            );
                          })}
                        </Grid>
                      </NewsSectionHere>
                    </CommonWhiteArea>

                    {data?.[0].faqs.length > 0 ? (
                      <CommonWhiteArea>
                        <FaqSection>
                          <PageSmallHeading variant="h2">
                            <span>FAQs Related to {data?.[0].name}</span>
                          </PageSmallHeading>
                          {data[0].faqs.map((faq, index) => (
                            <div key={index}>
                              <Accordion
                                expanded={expandedfaq === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                              >
                                <AccordionSummary
                                  expandIcon={
                                    expandedfaq === `panel${index}` ? (
                                      <RemoveIcon />
                                    ) : (
                                      <AddIcon />
                                    )
                                  }
                                  aria-controls={`panel${index}-content`}
                                  id={`panel${index}-header`}
                                >
                                  <Typography variant="h4">
                                    Q: {faq.question}
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography variant="body1">
                                    <span>A:</span> {faq.answer}
                                  </Typography>
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          ))}
                        </FaqSection>
                      </CommonWhiteArea>
                    ) : (
                      <></>
                    )}
                  </ContentSection>
                </MyInnerContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </CategoryMainBox>
    </>
  );
}

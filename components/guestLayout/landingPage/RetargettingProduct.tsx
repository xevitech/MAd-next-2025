import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AddAttachmntArea,
  AttachmentBox,
  AttachmentName,
  AttachmentOuter,
  ButtonSize,
  ComNameLogoInfo,
  CompanyBusinessType,
  CompanyOriginInfo,
  CompanyProductItem,
  CompanyProductList,
  CompanyRating,
  ContainerBox,
  EasySourcingBox,
  FlagImageStyle,
  GlobalTradeSection,
  InnerGrid,
  JoinAsSupllier,
  LandingNewsSection,
  LandingPageHeadings,
  LandingpageSliderBox,
  LandingPageText,
  ListBox,
  ListIcon,
  ListItemBox,
  ListitemIconBox,
  ListOuterBox,
  MessageFormButton,
  MessageHeading,
  MessageSubText,
  MessageText,
  OriginDate,
  OurTopProducts,
  QuotationTxt,
  RecentlyViewedProducts,
  RetargetListItemBox,
  RetargetSubHeading,
  SecrorMinMaxOrder,
  SectionColoredBox,
  SectionWhiteBox,
  SendMessages,
  SendMessagesBox,
  SendMessagesInnerBox,
  SliderBackground,
  SliderContentGap,
  SmartSellerOuter,
  TopRatedCompaniesBox,
  TopRatedCompaniesInner,
  UserStatus,
  ViewMoreBtn,
} from "./styles";
import Stack from "@mui/material/Stack";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CurrencySymbol } from "@/components/common/common";

import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Slider from "react-slick";
import ProductItem from "@/components/ProductsListing/ProductItem";
import ProductItemOptimized from "@/components/ProductsListing/ProductItemOptimized";
import { AddProductDetail } from "@/hooks/productDetailsReducer";
import { apiClient, VisuallyHiddenInput } from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ContactSupplierFly from "@/components/ProductDetail/ProductComponents/ProductActions/ContactSupplierFly";
import BrowsingHistory from "@/components/ProductDetail/ProductComponents/ProductActions/BrowsingHistory";
import BigPostdummy from "@/components/ProductsListing/BigPostdummy";
import { retargettingGlobalmarket } from "@/utils/constantImages";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormHelperText, Button } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import BigpostSkeleton from "./skeleton/BigpostSkeleton";
import ProductSkeletonwithBigPost from "./skeleton/ProductSkeletonwithBigPost";
import TopSellerSkeleton from "./skeleton/TopSellerSkeleton";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { useRouter } from "next/router";
import HotitemsSkeleton from "./skeleton/HotitemsSkeleton";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { RootState } from "redux/store";
import { getBussinessTypeIcon } from "@/components/Helper";
import { json } from "node:stream/consumers";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "20px 0 0 0" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <ButtonSize onClick={onClick} sx={{ right: 0 }}>
      <ArrowForwardIosIcon />
    </ButtonSize>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <ButtonSize onClick={onClick} sx={{ right: 35 }}>
      <ArrowBackIosIcon />
    </ButtonSize>
  );
};
const settingsProduct = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        nextArrow: false,
        prevArrow: false,
      },
    },
  ],
};
const settingsBigPost = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 900,
  autoplaySpeed: 3000,
  cssEase: "linear",
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const settingsBrowsingHistory = {
  dots: false,
  infinite: false,
  arrow: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: false,
  prevArrow: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        nextArrow: false,
        prevArrow: false,
      },
    },
  ],
};

const settings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  rows: 2,
  dots: true,
};

const RetargettingProduct = forwardRef((props, ref) => {
  const [value, setValue] = React.useState(0);
  const [tabvalue, setTabValue] = React.useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState("0px");
  const [topRatedProducts, settopRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentLoading, setRecentLoading] = useState(false);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [topItems, setTopItems] = useState([]);

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product Name is required"),
    description: Yup.string().required("Description is required"),
    purchaseQuantity: Yup.number().required("Purchase Quantity is required"),
    unitSets: Yup.number().required("Unit/Sets is required"),
  });

  const initialValues = {
    productName: "",
    description: "",
    purchaseQuantity: "",
    unitSets: "",
  };
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    purchaseQuantity: "",
    unitSets: "",
  });
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [topSellers, settopSellers] = useState([]);
  const [tradeShowData, setTradeShowData] = useState([]);
  const [recentlyViewedProduct, setRecentlyViewedProduct] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const handleChangeInnertabs = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabValue(newValue);
    setOpenDropdown(false);
  };
  const [bigPostList, setBigPostList] = React.useState([]);
  const [fixbarMenusType, setFixbarMenusType] = React.useState("");
  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };


   const recentlyViewedProductFunctionWithNewApi = async () => {
    const currency = localStorage.getItem("currency") ?? 1;
    const userId = JSON.parse(localStorage.getItem("userData"))?.id;
    const ipAddress = localStorage.getItem("ipAddress");
    setRecentLoading(true);
    const response = await fetch(`https://merchantad.xevitech.com/api/v2/visitor/recent-viewed-product?user_id=${userId}&ip=${ipAddress}&currency=${currency}`);
    const data  = await response.json();
    const {
      recentViewedProducts
    } = data?.data;
    console.log('data_1we',data);
    if(response?.status ===200){
      setRecentlyViewedProduct(recentViewedProducts);
      setRecentLoading(false);
    }
  };

 
  useEffect(() => {
    recentlyViewedProductFunctionWithNewApi();
  }, []);

  useEffect(() => {
    const fetchTradeShowData = async () => {
      try {
        const response = await apiClient("trade_show/admin_list", "GET");
        if (response.status === false) {
          throw new Error("Data fetch was unsuccessful");
        }
        setTradeShowData(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTradeShowData();
  }, []);

  const [unitsOptions, setUnitsOptions] = useState([]);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data } = await apiClient("unit", "get");
        setUnitsOptions(data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);
  const unit = useSelector((state: RootState) => state.header.unit);

  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "";
  };

  const initialQuoteValues = {
    product_name: "",
    description: "",
    purchage_quantity: "",
    file: [],
    units: "",
  };
  const quoteValidationSchema = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required"),
    description: Yup.string().required("Description is required"),
    purchage_quantity: Yup.number().required(
      "Purchase Quantity is required and should be number"
    ),
    units: Yup.string().required("Unit/Sets is required"),
  });

  const handleSubmitQuotee = async (values, { setSubmitting, resetForm }) => {
    const token = getTokenFromCookies();
    let formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("purchage_quantity", values.purchage_quantity);
    formData.append("units", values.units);
    formData.append("description", values.description);
    if (values.file) {
      if (Array.isArray(values.file)) {
        values.file.forEach((file) => formData.append("file[]", file));
      } else {
        formData.append("file", values.file);
      }
    }

    if (!token) {
      toast.error("Token not found. Please login to continue.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await apiClient(
        "front/contactUs",
        "post",
        {
          body: formData,
          Authorization: `Bearer ${token}`,
        },
        true
      );

      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting request:", error);
      toast.error("Error submitting form. Please try again..");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startDay = start.toLocaleString("en-US", { day: "2-digit" });
    const startMonth = start.toLocaleString("en-US", { month: "short" });
    const startYear = start.toLocaleString("en-US", { year: "numeric" });
    const endDay = end.toLocaleString("en-US", { day: "2-digit" });
    const endMonth = end.toLocaleString("en-US", { month: "short" });
    const endYear = end.toLocaleString("en-US", { year: "numeric" });
    return `${startMonth} ${startDay} - ${endMonth} ${endDay} , ${endYear}`;
  };

  useEffect(() => {
    const fetchTopSellers = async () => {
      setLoading(true);
      try {
        const currency = localStorage.getItem("currency") ?? 1;

        const response = await apiClient(
          `products/top-seller?currency=${currency}`,
          "GET",
          {}
        );
        const topSellers = response.data;
        settopSellers(topSellers);
      } catch (error) {
        console.error(error);
      }
    };
    setLoading(false);
    fetchTopSellers();
  }, []);

  useEffect(() => {
    const topRatedProductsFunction = async () => {
      const currency = localStorage.getItem("currency") ?? 1;

      let response = await apiClient(
        `products/top-ranking-product?currency=${currency}`,
        "GET"
      );
      if (response.status === 200) {
        setBigPostList(response.data);
        setLoading(false);
      }
    };
    topRatedProductsFunction();
  }, []);

  const filterProductList = async () => {
    const currency = localStorage.getItem("currency") ?? 1;
    // console.log("filterProductList function called");
    let response = await apiClient(
      `products/recent-viewed-product?currency=${currency}`,
      "GET"
    );
    if (response.status === 200) {
      const {
        data: { topRatedProducts },
      } = response;
      return response;
    }
  };
  useEffect(() => {
    if (openDropdown) {
      if (dropdownRef.current) {
        setDropdownHeight(`${dropdownRef.current.scrollHeight}px`);
      }
      filterProductList();
    } else {
      setDropdownHeight("0px");
    }
  }, [openDropdown]);

  const getCategoryNames = (categoryLists) => {
    const categoryDetails = [];

    const recursiveGetCategoryNames = (
      categories,
      parentSlug = "",
      depth = 0
    ) => {
      categories.forEach((category) => {
        let currentPath;
        if (depth === 0) {
        } else {
          currentPath = `${parentSlug}/${category.slug}`;
        }
        if (depth === 0) {
        } else {
          categoryDetails.push({
            name: category.name,
            slug: category.slug,
            link: currentPath,
          });
        }
        if (category.sub_category) {
          recursiveGetCategoryNames(
            category.sub_category,
            currentPath,
            depth + 1
          );
        }
      });
    };
    recursiveGetCategoryNames(categoryLists);
    return categoryDetails;
  };

  const categoryDetails = getCategoryNames(topItems);
  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      const currency = localStorage.getItem("currency") ?? 1;
      const response = await apiClient(
        `products/recent-viewed-product?currency=${currency}`,
        "get",
        {}
      );
      if (response.status === 200) {
        setTopSellingProducts(response.data?.topSellingProducts);
      }
    };
    fetchTopSellingProducts();
  }, []);
  const handleSubmitQuote = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      toast.error("Token not found. Please login to continue.");
      setSubmitting(false);
      return;
    }
    try {
      const response = await apiClient("front/contactUs", "POST", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting request:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchAllProductsList = async () => {
      let userid = JSON.parse(localStorage.getItem("userData"))?.id;
      const currency = localStorage.getItem("currency") ?? 1;

      var body = {
        per_page: "18",
        search_by_name: "",
        user_id: userid ? userid : "",
        currency: currency,
      };
      let response = await apiClient("front/product/list", "post", { body });
      const { data } = response;
      setData(data);
      dispatch(AddProductDetail({ status: false, loader: false, data: {} }));
    };
    fetchAllProductsList();
  }, []);

  const [ddata, setDdata] = useState();
  const [age, setAge] = React.useState("");
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.body.classList.add("cms-body");
    return () => {
      document.body.classList.remove("cms-body");
    };
  });
  const [open, setOpen] = useState(false);
  const handleFixbarMenusClick = (type) => {
    setFixbarMenusType(type);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderComponent = (section) => {
    switch (section) {
      case "browseHistory":
        return (
          <BrowsingHistory handleClose={handleClose} manualWidth="300px" />
        );
      case "contactSupplier":
        return (
          <ContactSupplierFly handleClose={handleClose} manualWidth="700px" />
        );
      default:
        null;
    }
  };
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return <Box sx={{ height: "100vh" }}></Box>;
  }
console.log('recentlyViewedProduct',recentlyViewedProduct);
  return (
    <Box marginTop={"40px"}>
      <Stack gap={"40px"}>
        <SectionWhiteBox>
          <Box className="mypagecontainer">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RetargetSubHeading sx={{ margin: "0 0 10px 0" }}>
                Recently Viewed Product
              </RetargetSubHeading>
              {recentlyViewedProduct?.length > 5 && (
                <ViewMoreBtn
                  onClick={() => {
                    router.push("/browsing-history");
                  }}
                >
                  View More
                </ViewMoreBtn>
              )}
            </Box>
            {recentLoading ? (
              <>
                <ProductSkeleton />
              </>
            ) : (
              <RecentlyViewedProducts>
                <Slider {...settingsBrowsingHistory}>
                  {recentlyViewedProduct?.slice(0, 5)?.map((product, index) => (
                    <div key={index}>
                      <Box sx={{ margin: "0px 5px" }}>
                        {/* <ProductItem data={product} />
                         */}
                         <ProductItemOptimized data={product}/>
                      </Box>
                    </div>
                  ))}
                </Slider>
              </RecentlyViewedProducts>
            )}
          </Box>
        </SectionWhiteBox>
        <SectionColoredBox>
          <Box className="mypagecontainer">
            <OurTopProducts>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Typography variant="h4">Top ranking</Typography>
                    {loading ? (
                      <>
                        <BigpostSkeleton />
                      </>
                    ) : (
                      <Box>
                        {bigPostList?.length > 0 && (
                          <Box
                            key={"index"}
                            style={{
                              backgroundColor: "#FFF6F6",
                              borderRadius: "6px",
                              boxShadow:
                                "inset rgba(17, 17, 26, 0.05) 0px -1px 1px, rgba(17, 17, 26, 0.1) 0px 0px 3px",
                            }}
                          >
                            {bigPostList.length > 1 ? (
                              <Slider {...settingsBigPost}>
                                {/* {console.log("bigPost",bigPostList)} */}
                                {bigPostList?.map((bigPostElement, i) => (
                                  <Box
                                    sx={{ position: "relative" }}
                                    key={`Bigpost-${i}`}
                                  >
                                    <BigPostdummy data={bigPostElement} />
                                  </Box>
                                ))}
                              </Slider>
                            ) : (
                              bigPostList?.map((bigPostElement, i) => (
                                <Box
                                  sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    "&:hover": {
                                      "& .BigPostFooter": {
                                        bottom: "0",
                                        boxShadow: "0 5px 11px #cccccc",
                                      },
                                    },
                                  }}
                                  key={`Bigpost1-${i}`}
                                >
                                  <BigPostdummy data={bigPostElement} key={i} />
                                </Box>
                              ))
                            )}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Typography variant="h4">Fresh arrivals</Typography>
                    {loading ? (
                      <>
                        <ProductSkeletonwithBigPost />
                      </>
                    ) : (
                      <Slider {...settingsProduct}>
                        {data.slice(0, 8)?.map((product, index) => (
                          <div key={index}>
                            <Box sx={{ margin: "0 5px" }}>
                              <ProductItem data={product} />
                            </Box>
                          </div>
                        ))}
                      </Slider>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </OurTopProducts>
          </Box>
        </SectionColoredBox>
        <Box className="mypagecontainer">
          <RetargetSubHeading variant="h4" gutterBottom>
            Frontiers of Manufacturing & Processing equipment Industry
          </RetargetSubHeading>

          {loading ? (
            <>
              <TopSellerSkeleton />
            </>
          ) : (
            <Grid container spacing={2}>
              {topSellers.map((category, categoryIndex) =>
                category.top_seller.map((company, index) => (
                  <Grid item xs={12} sm={12} md={6} key={index}>
                    <TopRatedCompaniesBox className="in-whiteBox">
                      <TopRatedCompaniesInner>
                        <ComNameLogoInfo>
                          <Link
                            href={`mini-site/${company.slug}/home`}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                              textDecoration: "none",
                              color: "inherit",
                              "&:hover": {
                                color: "inherit",
                                textDecoration: "none",
                              },
                            }}
                          >
                            <img
                              src={company?.logo || ""}
                              alt="Company Logo"
                              width="100%"
                              height="100%"
                            />
                          </Link>
                        </ComNameLogoInfo>
                        <CompanyOriginInfo>
                          <Link
                            href={`mini-site/${company.slug}/home`}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                              textDecoration: "none",
                              color: "inherit",
                              "&:hover": {
                                color: "inherit",
                                textDecoration: "none",
                              },
                            }}
                          >
                            
                            <Typography
                              variant="h5"
                              sx={{ lineHeight: "normal" }}
                            >
                              {company.price_type === "quantity" ? (
                                <>
                                  {company?.symbol ??
                                    CurrencySymbol(company.currency_id)}{" "}
                                  {company?.price_range &&
                                  company.price_range.length > 1 ? (
                                    <>
                                      {company.price_range[0]
                                        ? company.price_range[0]?.toLocaleString()
                                        : ""}{" "}
                                      -{" "}
                                      {company?.symbol ??
                                        CurrencySymbol(
                                          company.currency_id
                                        )}{" "}
                                      {company?.price_range[1]
                                        ? company?.price_range[1]?.toLocaleString()
                                        : ""}
                                    </>
                                  ) : (
                                    company?.unit_price ?? company?.price_range
                                  )}
                                </>
                              ) : company.price_type !== "price_unavailable" ? (
                                company?.unit_price ?? company?.price_range
                              ) : (
                                company?.price_unavailable_type
                              )}

                              {company?.unit_name && (
                                <>
                                  <span>{"/"}</span>
                                  <span>
                                    {company?.unit_name
                                      ? company?.unit_name
                                      : UnitName(company?.qty_unit)}
                                  </span>
                                </>
                              )}

                            </Typography>
                            <Typography
                              variant="h5"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                flexWrap: "wrap",
                                "&:hover": {
                                  color: "#d7282f",
                                },
                              }}
                            >
                              {company.name || "abc"}
                              {company.status !== "Not Verified" && (
                                <img
                                  src="/assets/verifyWtext.svg"
                                  alt=""
                                  width="60"
                                  height="21"
                                  style={{ pointerEvents: "none" }}
                                />
                              )}
                            </Typography>
                          </Link>
                          <OriginDate>
                            {company?.is_active_plan.icon && (
                              <img
                                src={company?.is_active_plan?.icon}
                                alt="Image"
                                style={{
                                  height: "26px",
                                }}
                              />
                            )}
                            <Typography variant="body2">
                              Since {company?.registration_year || "N/A"}
                            </Typography>
                            <LightTooltip
                              title={company?.getTooltipMessage}
                              disableInteractive
                              placement="top"
                              arrow
                            >
                              <CompanyBusinessType
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <img
                                  width="30"
                                  height="20"
                                  src={`/assets/images/${getBussinessTypeIcon(
                                    JSON.parse(company.business_type)
                                      .filter(
                                        (business) =>
                                          business.toggle === true ||
                                          business.toggle === "1"
                                      )
                                      .map((business) => business.name)
                                      .join("")
                                  )}`}
                                  alt=""
                                />
                                {company.business_type && (
                                  <>
                                    {JSON.parse(company.business_type)
                                      .filter(
                                        (business) =>
                                          business.toggle === true ||
                                          business.toggle === "1"
                                      )
                                      .map((business) =>
                                        business.name.replace(/s(?=[^s]*$)/, "")
                                      )
                                      .join(",")}
                                  </>
                                )}
                              </CompanyBusinessType>
                            </LightTooltip>
                            <UserStatus>
                              {company?.no_of_employee || "N/A"}+ Staff
                            </UserStatus>
                          </OriginDate>
                          <CompanyRating>
                            <Typography>
                              <span>Rating and reviews:</span>{" "}
                              <span className="ratingNum">
                                {company.average_rating === 0
                                  ? "0"
                                  : company.average_rating}
                              </span>
                              {company.average_rating > 0 && "/5"}{" "}
                              <span>and </span>
                              <Link>
                                (
                                {`${company?.total_review} ${
                                  company.total_review <= 0
                                    ? "Review"
                                    : "Reviews"
                                }` || "0 Reviews"}
                                )
                              </Link>
                            </Typography>
                          </CompanyRating>
                        </CompanyOriginInfo>
                      </TopRatedCompaniesInner>
                      <CompanyProductList>
                        <Grid container spacing={2}>
                          {Array.isArray(company.product_list) &&
                            company.product_list.map(
                              (product, productIndex) => (
                                <Grid
                                  item
                                  xs={12}
                                  sm={6}
                                  md={4}
                                  lg={3}
                                  key={productIndex}
                                >
                                  <CompanyProductItem>
                                    <Link
                                      href={`/productdetail/${category?.slug}/${company?.slug}/${product.slug}`}
                                      target="_blank"
                                      sx={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        "&:hover": {
                                          color: "inherit",
                                          textDecoration: "none",
                                        },
                                      }}
                                    >
                                      <img
                                        src={
                                          product?.photos[0]?.source ||
                                          product?.photos[1]?.source ||
                                          "https://t4.ftcdn.net/jpg/02/04/59/29/360_F_204592965_Xgu7wwQEj8QSnmI0HALnFzyBAIUOMz0j.jpg"
                                        }
                                        alt="Product Image"
                                      />
                                      <Typography variant="h6">
                                        {product.name}
                                      </Typography>
                                    </Link>
                                    <SecrorMinMaxOrder>
                                      <Typography
                                        variant="h5"
                                        sx={{
                                          lineHeight: "normal",
                                          wordBreak: "break-all",
                                        }}
                                      >
                                        {product.price_type === "quantity" ? (
                                          <>
                                            {product?.price_range?.length ==
                                              2 || product?.unit_price
                                              ? (product?.symbol ??
                                                  CurrencySymbol(
                                                    product?.currency_id
                                                  )) + " "
                                              : ""}
                                            {product?.price_range &&
                                            product.price_range.length > 1 ? (
                                              <>
                                                {product.price_range[0]
                                                  ? product.price_range[0]?.toLocaleString()
                                                  : ""}{" "}
                                                -{" "}
                                                {product?.symbol ??
                                                  CurrencySymbol(
                                                    product.currency_id
                                                  )}{" "}
                                                {product?.price_range[1]
                                                  ? product?.price_range[1]?.toLocaleString()
                                                  : ""}
                                              </>
                                            ) : (
                                              product?.unit_price ??
                                              product?.price_range
                                            )}
                                          </>
                                        ) : product.price_type !==
                                          "price_unavailable" ? (
                                          <>
                                            {product?.symbol ??
                                              CurrencySymbol(
                                                product.currency_id
                                              )}{" "}
                                            {product?.unit_price ??
                                              product?.price_range}
                                          </>
                                        ) : (
                                          product?.price_unavailable_type
                                        )}

                                        {product.price_type !==
                                          "price_unavailable" &&
                                          product?.unit_name && (
                                            <>
                                              <span>{"/"}</span>
                                              <span>
                                                {product?.unit_name
                                                  ? product?.unit_name
                                                  : UnitName(product?.qty_unit)}
                                              </span>
                                            </>
                                          )}
                                      </Typography>
                                      Min. order: {product?.min_qty}{" "}
                                      {product?.unit_name ?? "piece"}
                                    </SecrorMinMaxOrder>
                                  </CompanyProductItem>
                                </Grid>
                              )
                            )}
                        </Grid>
                      </CompanyProductList>
                    </TopRatedCompaniesBox>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Box>
        <SectionWhiteBox>
          <LandingNewsSection className="mypagecontainer">
            <LandingPageHeadings>
              Start Selling Smarter with Merchant AD?
            </LandingPageHeadings>
            <SmartSellerOuter>
              <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 4 }}
                alignItems={"center"}
              >
                <Grid item xs={12} sm={12} md={5} lg={4} xl={3.5}>
                  <Box>
                    <img
                      src="/assets/images/landing-page/smartselling.jpg"
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={8} xl={8.5}>
                  <Box>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InnerGrid>
                          <img
                            src="/assets/images/landing-page/verified.svg"
                            alt=""
                          />
                          <Typography className="heading">
                            Connect with Verified Buyers
                          </Typography>
                          <Typography className="text">
                            Engage only with authenticated, serious buyers. We
                            filter out the noise so you focus on real
                            opportunities.
                          </Typography>
                        </InnerGrid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InnerGrid>
                          <img
                            src="/assets/images/landing-page/personalsupport.svg"
                            alt=""
                          />
                          <Typography className="heading">
                            Personal Support
                          </Typography>
                          <Typography className="text">
                            Get a dedicated partner to guide you through the
                            platform. We're here to help you succeed—every step
                            of the way.
                          </Typography>
                        </InnerGrid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InnerGrid>
                          <img
                            src="/assets/images/landing-page/freelisting.svg"
                            alt=""
                          />
                          <Typography className="heading">
                            Free Listing
                          </Typography>
                          <Typography className="text">
                            Upload your products at no cost. Create and preview
                            your listings—no payment needed.
                          </Typography>
                        </InnerGrid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InnerGrid>
                          <img
                            src="/assets/images/landing-page/global.svg"
                            alt=""
                          />
                          <Typography className="heading">
                            Reach Buyers Globally
                          </Typography>
                          <Typography className="text">
                            Gain exposure to thousands of industrial buyers
                            worldwide. Your machines get discovered by the right
                            audience, everywhere.
                          </Typography>
                        </InnerGrid>
                      </Grid>
                      <Grid item xs={12} mt={3}>
                        <JoinAsSupllier>
                          <Button>Join As Supplier</Button>
                        </JoinAsSupllier>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </SmartSellerOuter>
          </LandingNewsSection>
        </SectionWhiteBox>
        <Box className="mypagecontainer">
          {loading || categoryDetails.length === 0 ? (
            <HotitemsSkeleton />
          ) : (
            <>
              {" "}
              <RetargetSubHeading>Top Categories</RetargetSubHeading>
              <Grid
                container
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(6, 1fr)",
                  },
                  gridTemplateRows: "repeat(6, auto)",
                  columnGap: "16px",
                }}
              >
                {categoryDetails.slice(0, 20).map((category, index) => (
                  <Grid item key={index}>
                    <ListOuterBox>
                      <ListBox>
                        <RetargetListItemBox>
                          <Link
                            href={category.link}
                            target="_blank"
                            sx={{
                              textDecoration: "none",
                              color: "#616161",
                              "&:hover": {
                                color: "inherit",
                                textDecoration: "none",
                              },
                            }}
                          >
                            {" "}
                            {category?.name}
                          </Link>
                        </RetargetListItemBox>
                      </ListBox>
                    </ListOuterBox>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>

        <SendMessages ref={ref}>
          <ContainerBox
            className="mypagecontainer"
            sx={{ position: "relative", zIndex: 10 }}
          >
            <SendMessagesInnerBox>
              <Grid container spacing={0} alignItems={"center"}>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                  <SendMessagesBox>
                    <MessageHeading>
                      SEND{" "}
                      <Box component={"span"} className="headingfistspan">
                        US A MESSAGE
                      </Box>
                      <Box
                        component={"span"}
                        sx={{ display: "block" }}
                        className="headingsecondspan"
                      >
                        Want To{" "}
                        <Box component={"span"} className="headingthirdspan">
                          Get Quotations?
                        </Box>
                      </Box>
                    </MessageHeading>
                    {/* <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmitQuote}
                    >
                      {({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                      }) => (
                        <Form>
                          <Box>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <TextField
                                  label="Product Name"
                                  size="small"
                                  fullWidth
                                  id="outlined-basic"
                                  variant="outlined"
                                  name="productName"
                                  placeholder="Enter Product"
                                  onChange={handleChange}
                                  InputLabelProps={{ shrink: true }}
                                  value={values.productName}
                                  error={
                                    touched.productName &&
                                    Boolean(errors.productName)
                                  }
                                />
                                <ErrorMessage name="productName">
                                  {(msg) => (
                                    <FormHelperText error>{msg}</FormHelperText>
                                  )}
                                </ErrorMessage>
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Description"
                                  size="small"
                                  fullWidth
                                  id="outlined-textarea"
                                  variant="outlined"
                                  placeholder="Enter Description"
                                  multiline
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  rows={4}
                                  name="description"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.description}
                                  error={
                                    touched.description &&
                                    Boolean(errors.description)
                                  }
                                />
                                <ErrorMessage name="description">
                                  {(msg) => (
                                    <FormHelperText error>{msg}</FormHelperText>
                                  )}
                                </ErrorMessage>
                              </Grid>

                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box sx={{}}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.purchaseQuantity &&
                                      Boolean(errors.purchaseQuantity)
                                    }
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Purchase Quantity
                                    </InputLabel>
                                    <Select
                                      size="small"
                                      label="Purchase Quantity"
                                      name="purchaseQuantity"
                                      labelId="purchase-quantity-label"
                                      id="demo-simple-select"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.purchaseQuantity}
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                    >
                                      <MenuItem value={10}>10</MenuItem>
                                      <MenuItem value={20}>20</MenuItem>
                                      <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                    <ErrorMessage name="purchaseQuantity">
                                      {(msg) => (
                                        <FormHelperText error>
                                          {msg}
                                        </FormHelperText>
                                      )}
                                    </ErrorMessage>
                                  </FormControl>
                                </Box>
                              </Grid>

                              <Grid item xs={12} sm={12} md={6} lg={6}>
                                <Box sx={{}}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.unitSets &&
                                      Boolean(errors.unitSets)
                                    }
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Unit/Sets
                                    </InputLabel>
                                    <Select
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      size="small"
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Unit/Sets"
                                      name="unitSets"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.unitSets}
                                    >
                                      <MenuItem value={10}>10</MenuItem>
                                      <MenuItem value={20}>20</MenuItem>
                                      <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                    <ErrorMessage name="unitSets">
                                      {(msg) => (
                                        <FormHelperText error>
                                          {msg}
                                        </FormHelperText>
                                      )}
                                    </ErrorMessage>
                                  </FormControl>
                                </Box>
                              </Grid>

                              <Grid item xs={12}>
                                <Box>
                                  <MessageFormButton type="submit">
                                    Post Your Request
                                  </MessageFormButton>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Form>
                      )}
                    </Formik> */}
                    <Formik
                      initialValues={initialQuoteValues}
                      validationSchema={quoteValidationSchema}
                      onSubmit={handleSubmitQuotee}
                    >
                      {({
                        values,
                        setFieldValue,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                      }) => {
                        const handleFileChange = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const selectedFiles = Array.from(
                            event.target.files as FileList
                          );
                          if (filePreviews.length + selectedFiles.length > 3) {
                            toast.error(
                              "You can only attach a maximum of 3 files."
                            );
                            return;
                          }
                          const updatedFiles = [
                            ...(values.attachment || []),
                            ...selectedFiles,
                          ];
                          setFieldValue("attachment", updatedFiles);

                          // Get file names and truncate if necessary
                          const names = selectedFiles.map((file) => {
                            const name = file.name;
                            // file.name.length > 5
                            //   ? file.name.substring(0, 5) + ".."
                            //   : file.name;
                            return name;
                          });
                          setFilePreviews((prev) => [...prev, ...names]);
                        };
                        const handleRemoveAttachment = (index) => {
                          // console.log("Removing attachment at index:", index);

                          // Update filePreviews
                          setFilePreviews((prev) => {
                            const updatedPreviews = prev.filter(
                              (_, i) => i !== index
                            );
                            return updatedPreviews;
                          });
                        };
                        return (
                          <Form>
                            <Box>
                              <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Product Name"
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="product_name"
                                    placeholder="Enter Product"
                                    onChange={handleChange}
                                    value={values.product_name}
                                    error={
                                      touched.product_name &&
                                      Boolean(errors.product_name)
                                    }
                                  />
                                  <ErrorMessage name="product_name">
                                    {(msg) => (
                                      <FormHelperText error>
                                        {msg}
                                      </FormHelperText>
                                    )}
                                  </ErrorMessage>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <Box sx={{}}>
                                    <FormControl
                                      fullWidth
                                      size="small"
                                      error={
                                        touched.purchage_quantity &&
                                        Boolean(errors.purchage_quantity)
                                      }
                                    >
                                      {/* <InputLabel id="demo-simple-select-label">
                                            Purchase Quantity
                                          </InputLabel> */}
                                      <TextField
                                        label="Purchase Quantity"
                                        size="small"
                                        name="purchage_quantity"
                                        //

                                        id="outlined-basic"
                                        variant="outlined"
                                        placeholder="Purchase Quantity"
                                        onChange={handleChange}
                                        value={values.purchage_quantity}
                                        // error={
                                        //   touched.purchage_quantity &&
                                        //   Boolean(errors.purchage_quantity)
                                        // }
                                      />
                                      <ErrorMessage name="purchage_quantity">
                                        {(msg) => (
                                          <FormHelperText error>
                                            {msg}
                                          </FormHelperText>
                                        )}
                                      </ErrorMessage>
                                    </FormControl>
                                  </Box>
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                                      <Box sx={{}}>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            touched.units &&
                                            Boolean(errors.units)
                                          }
                                        >
                                          <InputLabel id="demo-simple-select-label">
                                            Unit/Sets
                                          </InputLabel>
                                          <Select
                                            IconComponent={
                                              KeyboardArrowDownOutlinedIcon
                                            }
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Unit/Sets"
                                            name="units"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.units}
                                          >
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={30}>30</MenuItem>
                                          </Select>
                                          <ErrorMessage name="unitSets">
                                            {(msg) => (
                                              <FormHelperText error>
                                                {msg}
                                              </FormHelperText>
                                            )}
                                          </ErrorMessage>
                                        </FormControl>
                                      </Box>
                                    </Grid> */}
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                  <Box>
                                    <FormControl
                                      fullWidth
                                      size="small"
                                      error={
                                        touched.units && Boolean(errors.units)
                                      }
                                    >
                                      <InputLabel id="units-label">
                                        Unit/Sets
                                      </InputLabel>
                                      <Select
                                        IconComponent={
                                          KeyboardArrowDownOutlinedIcon
                                        }
                                        size="small"
                                        labelId="units-label"
                                        label="Unit/Sets"
                                        name="units"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.units}
                                        MenuProps={{
                                          PaperProps: {
                                            sx: {
                                              maxHeight: 200,
                                            },
                                          },
                                        }}
                                      >
                                        {unitsOptions.map((unit) => (
                                          <MenuItem value={unit.name}>
                                            {unit.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      <ErrorMessage name="units">
                                        {(msg) => (
                                          <FormHelperText error>
                                            {msg}
                                          </FormHelperText>
                                        )}
                                      </ErrorMessage>
                                    </FormControl>
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    label="Description"
                                    size="small"
                                    fullWidth
                                    id="outlined-textarea"
                                    placeholder="Please describe your specific sourcing requirements for product attributes, desired quantity, and any additional services you expect from suppliers"
                                    multiline
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    rows={4}
                                    name="description"
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    value={values.description}
                                    error={
                                      touched.description &&
                                      Boolean(errors.description)
                                    }
                                  />
                                  <ErrorMessage name="description">
                                    {(msg) => (
                                      <FormHelperText error>
                                        {msg}
                                      </FormHelperText>
                                    )}
                                  </ErrorMessage>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                  <AddAttachmntArea>
                                    {filePreviews?.length > 0 && (
                                      <AttachmentOuter>
                                        {filePreviews.map((name, index) => (
                                          <AttachmentBox key={index}>
                                            <img
                                              src="/assets/fileIcon.svg"
                                              alt=""
                                              height={18}
                                              width={18}
                                            />
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              title={name}
                                              placement="top"
                                            >
                                              <AttachmentName>
                                                {name}
                                              </AttachmentName>
                                            </LightTooltip>
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              title="cancel"
                                              placement="top"
                                            >
                                              <CloseOutlinedIcon
                                                onClick={() =>
                                                  handleRemoveAttachment(index)
                                                }
                                                sx={{
                                                  fontSize: "16px",
                                                  cursor: "pointer",
                                                }}
                                              />
                                            </LightTooltip>
                                          </AttachmentBox>
                                        ))}
                                      </AttachmentOuter>
                                    )}
                                    <Button
                                      component="label"
                                      role={undefined}
                                      tabIndex={-1}
                                      startIcon={
                                        <i className="icon-attachment"></i>
                                      }
                                    >
                                      Add Attachment
                                      <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                      />
                                    </Button>
                                  </AddAttachmntArea>
                                </Grid>
                                <Grid item xs={12}>
                                  <Box>
                                    <MessageFormButton type="submit">
                                      Post Your Request
                                    </MessageFormButton>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Form>
                        );
                      }}
                    </Formik>
                  </SendMessagesBox>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <QuotationTxt>
                    <Box>
                      <MessageText>Hassle-Free Sourcing</MessageText>
                      <MessageSubText>
                        Easily submit your sourcing inquiries and receive
                        competitive quotes.
                      </MessageSubText>
                    </Box>
                    <EasySourcingBox>
                      <List>
                        <ListItemBox>
                          <ListitemIconBox>
                            <ListIcon />
                          </ListitemIconBox>
                          <ListItemText>
                            <span>One-click request, multiple quotes – </span>{" "}
                            Instantly get offers from a wide range of suppliers.
                          </ListItemText>
                        </ListItemBox>
                        <ListItemBox>
                          <ListitemIconBox>
                            <ListIcon />
                          </ListitemIconBox>
                          <ListItemText>
                            <span>Verified suppliers matched to you – </span>
                            Only connect with verified, trustworthy suppliers.
                          </ListItemText>
                        </ListItemBox>

                        <ListItemBox>
                          <ListitemIconBox>
                            <ListIcon />
                          </ListitemIconBox>
                          <ListItemText>
                            <span>Compare and save – </span>Compare offers and
                            pricing at a glance.
                          </ListItemText>
                        </ListItemBox>
                        <ListItemBox>
                          <ListitemIconBox>
                            <ListIcon />
                          </ListitemIconBox>
                          <ListItemText>
                            <span>Easy sample requests – </span>Request product
                            samples directly from suppliers.
                          </ListItemText>
                        </ListItemBox>

                        <ListItemBox>
                          <ListitemIconBox>
                            <ListIcon />
                          </ListitemIconBox>
                          <ListItemText>
                            Boost efficiency – Simplify your entire sourcing
                            process and cut down decision time.
                          </ListItemText>
                        </ListItemBox>
                      </List>
                    </EasySourcingBox>
                  </QuotationTxt>
                </Grid>
              </Grid>
            </SendMessagesInnerBox>
          </ContainerBox>
        </SendMessages>
        <SectionWhiteBox>
          <GlobalTradeSection className="mypagecontainer">
            <Box className="GlobalBG">
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box>
                    <LandingPageHeadings className="leftHeading">
                      We Streamline Access To Global Markets
                    </LandingPageHeadings>
                    <LandingPageText sx={{ padding: "10px 0 10px" }}>
                      At Merchant AD, we simplify your entry into global markets
                      by connecting you with key industry players and solutions
                      across energy, power generation, oil & gas, and water
                      management. Our platform offers seamless trade
                      opportunities and efficient logistics, enabling businesses
                      to expand their reach and internationally.
                    </LandingPageText>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <SliderBackground>
                    <div className="slider-container">
                      <Slider {...settings}>
                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.india}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>India</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>
                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.china}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>China</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>
                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.jordan}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Jordan</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>
                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.saudi}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Saudi Arabia</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>
                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.hongkong}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Hong kong</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>
                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.iraq}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Iraq</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>

                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.indonesia}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Indonesia</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>

                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.japan}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Japan</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>

                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.malaysia}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Malaysia</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>

                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.southafrica}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>South Africa</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>

                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.germany}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Germany</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>

                        <Box>
                          <LandingpageSliderBox>
                            <SliderContentGap>
                              <FlagImageStyle>
                                <img
                                  src={retargettingGlobalmarket?.itly}
                                  alt=""
                                  width="80"
                                  height="58"
                                />
                              </FlagImageStyle>
                              <Typography>Italy</Typography>
                            </SliderContentGap>
                          </LandingpageSliderBox>
                        </Box>
                      </Slider>
                    </div>
                  </SliderBackground>
                </Grid>
              </Grid>
            </Box>
          </GlobalTradeSection>
        </SectionWhiteBox>
      </Stack>
    </Box>
  );
});
export default RetargettingProduct;

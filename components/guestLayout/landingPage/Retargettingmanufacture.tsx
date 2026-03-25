import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AddAttachmntArea,
  AttachmentBox,
  AttachmentName,
  AttachmentOuter,
  ButtonSize,
  CategoryinBox,
  CenterDes,
  CommonInnerContent,
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
  ImageHeading,
  ImageInfo,
  InnerContentBox,
  InnerGrid,
  JoinAsSupllier,
  LandingNewsSection,
  LandingPageHeadings,
  LandingpageSliderBox,
  LandingPageText,
  LeftCategorySide,
  ListIcon,
  ListItemBox,
  ListitemIconBox,
  MainSectorHeading,
  MessageFormBox,
  MessageFormButton,
  MessageHeading,
  MessageSubText,
  MessageText,
  MoreSubCategoryListStyling,
  MyImageBox,
  MyInfoBox,
  OnlyImageOverlay,
  OriginDate,
  OurTopProducts,
  OverlayCenter,
  OverlaySmall,
  QuotationTxt,
  RetargetSubHeading,
  RetargettabOuter,
  Retargettabs,
  SecrorMinMaxOrder,
  SectionColoredBox,
  SectionWhiteBox,
  SendMessages,
  SendMessagesBox,
  SendMessagesInnerBox,
  Since,
  SliderBackground,
  SliderContentGap,
  SmartSellerOuter,
  SubMenuText,
  TopRatedCompaniesBox,
  TopRatedCompaniesInner,
  TradeShowFullImage,
  TradeshowSection,
  TradeShowSmallImage,
  UserStatus,
  ViewMoreBTN,
} from "./styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { RootState } from "redux/store";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Slider from "react-slick";
import ProductItem from "@/components/ProductsListing/ProductItem";
import { AddProductDetail } from "@/hooks/productDetailsReducer";
import {
  apiClient,
  CurrencySymbol,
  VisuallyHiddenInput,
} from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { toast } from "react-toastify";
import ContactSupplierFly from "@/components/ProductDetail/ProductComponents/ProductActions/ContactSupplierFly";
import BrowsingHistory from "@/components/ProductDetail/ProductComponents/ProductActions/BrowsingHistory";
import { retargettingGlobalmarket } from "@/utils/constantImages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormHelperText, Button } from "@mui/material";
import CategorySkeleton from "./skeleton/CategorySkeleton";
import RecentelyViewProduct from "./skeleton/RecentelyViewProduct";
import TopSellerSkeleton from "./skeleton/TopSellerSkeleton";
import ProductSkeleton from "./skeleton/ProductSkeleton";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { useRouter } from "next/router";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { getBussinessTypeIcon } from "@/components/Helper";
// import { setUserCurrencyLanguage } from "@/hooks/appReducers";
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
const settingsBrowsingHistory = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
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

const Retargettingmanufacture = forwardRef((props, ref) => {
  const [value, setValue] = React.useState(0);
  const [tabvalue, setTabValue] = React.useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState("0px");
  const [tradeShowData, setTradeShowData] = useState([]);
  const [topSellers, settopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [topRatedProducts, settopRatedProducts] = useState([]);
  const { userCurrencyLanguage } = useSelector((state: any) => state.userData);

  let toolTipData = "ajklabajkabkj";

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
  const [recentlyViewedProduct, setRecentlyViewedProduct] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    purchaseQuantity: "",
    unitSets: "",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
  const [categoryList, setCategoryList] = useState([]);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (openDropdown) {
      if (dropdownRef.current) {
        setDropdownHeight(`${dropdownRef.current.scrollHeight}px`);
      }
    } else {
      setDropdownHeight("0px");
    }
    filterProductList();
  }, [openDropdown]);
  const filterProductList = async () => {
    const currency = localStorage.getItem("currency") ?? 1;
    let response = await apiClient(
      `front/product/list?currency=${currency}`,
      "get",
      {}
    );
    if (response.status === 200) {
      setBigPostList(response.big_post);
      return response;
    }
  };
  const handleSubmitQuote = async (values, { setSubmitting, resetForm }) => {
    // const token = localStorage.getItem("Token");
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

      console.log("Response:", response);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting request:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const [unitsOptions, setUnitsOptions] = useState([]);
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const { data } = await apiClient("unit", "get");
        console.log("udata", data);
        setUnitsOptions(data);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  }, []);
  const [filePreviews, setFilePreviews] = useState([]);

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
    console.log("valuEs", values);
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

      console.log("Response:", response);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error posting request:", error);
      toast.error("Error submitting form. Please try again..");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTradeShowData = async () => {
      try {
        const response = await apiClient("trade_show/admin_list", "GET");
        if (response.status === false) {
          throw new Error("Data fetch was unsuccessful");
        }
        setTradeShowData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchTradeShowData();
  }, []);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const currency = localStorage.getItem("currency") ?? 1;

        const response = await apiClient(
          `products/top-seller?currency=${currency}`,
          "GET"
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

  const topSellersArray = Array.from(topSellers);

  useEffect(() => {
    const fetchAllProductsList = async () => {
      let userid = JSON.parse(localStorage.getItem("userData"))?.id;
      const currency = localStorage.getItem("currency") ?? 1;

      var body = {
        per_page: "10",
        page: 1,
        seller_id: "",
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
  const [age, setAge] = React.useState("");
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
  const getFilteredSellers = () => {
    switch (tabvalue) {
      case 0:
        return topSellers;
      case 1:
        return topSellers.filter(
          (category) => category.name === "Power Generation"
        );
      case 2:
        return topSellers.filter(
          (category) => category.name === "Power Energy"
        );
      case 3:
        return topSellers.filter((category) => category.name === "Oil & Gas");
      case 4:
        return topSellers.filter(
          (category) => category.name === "Water Management"
        );
      default:
        return topSellers;
    }
  };

  const filteredSellers = getFilteredSellers();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.productName ||
      !formData.description ||
      !formData.purchaseQuantity ||
      !formData.unitSets
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }
    const token = localStorage.getItem("Token");
    if (!token) {
      toast.error("Token not found. Please login to continue.");
      return;
    }

    try {
      const response = await apiClient("front/contactUs", "POST", {
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error posting request:", error);
      toast.error("Error submitting form. Please try again.");
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = getTokenFromCookies();
    setToken(token);
  }, []);

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
  const topRatedProductsFunction = async () => {
    const currency = localStorage.getItem("currency") ?? 1;

    setLoading(true);
    let response = await apiClient(
      `products/top-rated-product?currency=${currency}`,
      "GET"
    );
    settopRatedProducts(response.data);
    if (response.status === 200) {
      setBigPostList(topRatedProducts);
      return response;
    }
    setLoading(false);
  };
  const recentlyViewedProductFunction = async () => {
    setLoading(true);

    const userId = JSON.parse(localStorage.getItem("userData"))?.id;
    const ipAddress = localStorage.getItem("ipAddress");
    const currency = localStorage.getItem("currency") ?? 1;

    let response = await apiClient(
      `products/recent-viewed-product?user_id=${userId}&ip=${ipAddress}&currency=${currency}`,
      "GET"
    );
    const {
      data: { recentViewedProducts },
    } = response;
    const {
      data: { categoryLists },
    } = response;
    setRecentlyViewedProduct(recentViewedProducts);
    setLoading(false);
    console.log("response categorylist:", response.data.categoryLists);
    setCategoryList(categoryLists);
    if (response.status === 200) {
      setBigPostList(topRatedProducts);
      return response;
    }
  };

  useEffect(() => {
    topRatedProductsFunction();
    recentlyViewedProductFunction();
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const unit = useSelector((state: RootState) => state.header.unit);

  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "";
  };

  if (!showContent) {
    return <Box sx={{ height: "100vh" }}></Box>;
  }

  ////console.log('topSellers',topSellers);
  console.log("Top Sellers Data: ", topSellers);

  return (
    <Box marginTop={"60px"}>
      <Stack
        gap={"40px"}
        sx={{ "@media screen and (max-width:767px)": { gap: "20px" } }}
      >
        <Box className="mypagecontainer">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              pt={"0 !important"}
              sx={{ borderRight: "1px solid #e3e3e3" }}
            >
              {!loading ? (
                <LeftCategorySide>
                  {categoryList.map((category) => (
                    <Box key={category.id} sx={{ height: "100%" }}>
                      <MainSectorHeading>
                        <Typography>{category.name}</Typography>
                      </MainSectorHeading>
                      <MoreSubCategoryListStyling>
                        {category?.sub_category?.length > 0 &&
                          category.sub_category.map((subCategory, index) => (
                            <div key={subCategory.id}>
                              <ListItem disablePadding>
                                <ListItemButton
                                  component="a"
                                  href="#simple-list"
                                  className="listItem"
                                >
                                  <Link
                                    href={`category/${
                                      category.slug
                                    }/${subCategory.slug
                                      .split(/\s*&\s*|\s+/)
                                      .map((word) => word.toLowerCase())
                                      .join("-")}`}
                                    target="_blank"
                                    sx={{
                                      textDecoration: "none",
                                      color: "inherit",
                                      flexGrow: "1",
                                      "&:hover": {
                                        color: "inherit",
                                        textDecoration: "none",
                                      },
                                    }}
                                  >
                                    <ListItemText>
                                      {subCategory.name}
                                    </ListItemText>
                                  </Link>
                                  <Divider />
                                  <Box className="removePoper">
                                    {subCategory.sub_category &&
                                      subCategory.sub_category.length > 0 && (
                                        <Paper className="subMenu">
                                          <List
                                            sx={{
                                              paddingLeft: 0,
                                              "& .MuiTypography-body1": {
                                                fontSize: "12px",
                                              },
                                            }}
                                          >
                                            {subCategory.sub_category.map(
                                              (nestedSubCategory) => (
                                                <div key={nestedSubCategory.id}>
                                                  <Link
                                                    href={`category/${subCategory.parent_name
                                                      .split(/\s*&\s*|\s+/)
                                                      .map((word) =>
                                                        word.toLowerCase()
                                                      )
                                                      .join("-")}/${
                                                      nestedSubCategory.slug
                                                    }`}
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
                                                    <SubMenuText>
                                                      {nestedSubCategory.name}
                                                    </SubMenuText>
                                                  </Link>
                                                  <Divider
                                                    variant="middle"
                                                    component="li"
                                                  />
                                                </div>
                                              )
                                            )}
                                          </List>
                                        </Paper>
                                      )}
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <KeyboardArrowRightRoundedIcon fontSize="small" />
                                  </Typography>
                                </ListItemButton>
                              </ListItem>
                              {index < category.sub_category.length - 1 && (
                                <Divider variant="inset" component="li" />
                              )}
                            </div>
                          ))}
                      </MoreSubCategoryListStyling>
                    </Box>
                  ))}
                </LeftCategorySide>
              ) : (
                <>
                  <CategorySkeleton />
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={9} pt={"0 !important"}>
              {!loading ? (
                <CategoryinBox>
                  {}
                  <Grid container spacing={1}>
                    {recentlyViewedProduct.map((product) => (
                      <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Link
                          href={`/productdetail/${product.id}/${
                            product.user_name.split(" ")[0]
                          }/${product.slug}`}
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
                          <InnerContentBox>
                            <MyImageBox>
                              <img
                                src={
                                  product.photos?.source ||
                                  "/assets/images/category/category1.svg"
                                }
                                height="50px"
                                alt="dasd"
                              />
                            </MyImageBox>
                            <MyInfoBox>
                              <ImageHeading>{product.name}</ImageHeading>
                              <ImageInfo>{product.slug}</ImageInfo>
                            </MyInfoBox>
                          </InnerContentBox>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </CategoryinBox>
              ) : (
                <>
                  <RecentelyViewProduct />
                </>
              )}
            </Grid>
          </Grid>
        </Box>
        <SectionColoredBox>
          <Box className="mypagecontainer">
            <RetargettabOuter>
              <Box>
                <Retargettabs
                  value={tabvalue}
                  onChange={handleChangeInnertabs}
                  aria-label="basic tabs example"
                  scrollButtons="auto"
                  variant="scrollable"
                >
                  <Tab label="All Categories" {...a11yProps(0)} />
                  {topSellers.length > 0 &&
                    topSellers.map((sector, index) => {
                      console.log("cate10000", sector);
                      return (
                        <Tab
                          label={sector.name}
                          {...a11yProps(sector.id)}
                          key={index + 1}
                        />
                      );
                    })}
                </Retargettabs>
              </Box>
            </RetargettabOuter>
            <RetargettabOuter>
              <CustomTabPanel value={tabvalue} index={0}>
                {!loading ? (
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
                                    src={
                                      company?.logo ||
                                      "assets/images/No-seller-comimage.svg"
                                    }
                                    alt="Company Logo"
                                    width={"100%"}
                                    height={"100%"}
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

                                    display: "flex",
                                    alignItems: "center",
                                    "&:hover": {
                                      color: "inherit",
                                      textDecoration: "none",
                                    },
                                    "@media screen and (max-width:480px)": {
                                      justifyContent: "center !important",
                                    },
                                  }}
                                >
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
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
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
                                              business.name.replace(
                                                /s(?=[^s]*$)/,
                                                ""
                                              )
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
                                      {company.average_rating &&
                                        company.average_rating}
                                    </span>
                                    {company.average_rating > 0 && "/5"}{" "}
                                    <span>and </span>
                                    <Link>
                                      (
                                      {`${company?.total_review} ${
                                        company.total_review <= 0
                                          ? "Review"
                                          : "Reviews"
                                      }`}
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
                                    (product, productIndex) => {
                                      // console.log("product-list-100", product); // Log product for debugging
                                      return (
                                        <Grid
                                          item
                                          xs={12}
                                          sm={6}
                                          md={6}
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
                                                  ""
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
                                                sx={{ lineHeight: "normal" }}
                                              >
                                                {product.price_type ===
                                                "quantity" ? (
                                                  <>
                                                    {/* { product?.symbol ?? CurrencySymbol(product.currency_id)}{" "} */}
                                                    {product?.price_range
                                                      ?.length == 2 ||
                                                    product?.unit_price
                                                      ? (product?.symbol ??
                                                          CurrencySymbol(
                                                            product?.currency_id
                                                          )) + " "
                                                      : ""}
                                                    {product?.price_range &&
                                                    product.price_range.length >
                                                      1 ? (
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
                                                          : UnitName(
                                                              product?.qty_unit
                                                            )}
                                                      </span>
                                                    </>
                                                  )}
                                              </Typography>
                                              Min. order: {product?.min_qty}{" "}
                                              {product?.unit_name ?? "piece"}
                                            </SecrorMinMaxOrder>
                                          </CompanyProductItem>
                                        </Grid>
                                      );
                                    }
                                  )}
                              </Grid>
                            </CompanyProductList>
                          </TopRatedCompaniesBox>
                        </Grid>
                      ))
                    )}
                    {topSellers.length >= 4 && (
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ViewMoreBTN
                            onClick={() => {
                              router.push("/manufacture");
                            }}
                          >
                            View More
                          </ViewMoreBTN>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                ) : (
                  <>
                    <TopSellerSkeleton />
                  </>
                )}
              </CustomTabPanel>
              {topSellers.length > 0 &&
                topSellers.map((sector, index) => {
                  return (
                    <CustomTabPanel
                      value={tabvalue}
                      index={index + 1}
                      key={index + 1}
                    >
                      {!loading ? (
                        <Grid container spacing={2}>
                          {/* Loop through top_seller list of the active tab */}
                          {sector.top_seller.map((company, categoryIndex) => (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              key={categoryIndex}
                            >
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
                                        width={"100%"}
                                        height={"100%"}
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
                                        display: "flex",
                                        alignItems: "center",
                                        "&:hover": {
                                          color: "inherit",
                                          textDecoration: "none",
                                        },
                                        "@media screen and (max-width:480px)": {
                                          justifyContent: "center !important",
                                        },
                                      }}
                                    >
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
                                        Since {company?.registration_year}
                                      </Typography>
                                      <LightTooltip
                                        title={company?.getTooltipMessage}
                                        disableInteractive
                                        placement="top"
                                        arrow
                                      >
                                        <CompanyBusinessType
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
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
                                                .map(
                                                  (business) => business.name
                                                )
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
                                                  business.name.replace(
                                                    /s(?=[^s]*$)/,
                                                    ""
                                                  )
                                                )
                                                .join(",")}
                                            </>
                                          )}
                                        </CompanyBusinessType>
                                      </LightTooltip>
                                      <UserStatus>
                                        {company?.no_of_employee || "N/A"}+
                                        Staff
                                      </UserStatus>
                                    </OriginDate>
                                    <CompanyRating>
                                      <Typography>
                                        <span>Rating and reviews:</span>{" "}
                                        <span className="ratingNum">
                                          {company.average_rating &&
                                            company.average_rating}
                                        </span>
                                        {company.average_rating > 0 && "/5"}{" "}
                                        <span>and </span>
                                        <Link>
                                          (
                                          {`${company?.total_review} ${
                                            company.total_review <= 0
                                              ? "Review"
                                              : "Reviews"
                                          }` || "N/A Reviews"}
                                          )
                                        </Link>
                                      </Typography>
                                    </CompanyRating>
                                  </CompanyOriginInfo>
                                </TopRatedCompaniesInner>
                                {/* Product List */}
                                <CompanyProductList>
                                  <Grid container spacing={2}>
                                    {Array.isArray(company.product_list) &&
                                      company.product_list.map(
                                        (product, productIndex) => (
                                          <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            lg={3}
                                            key={productIndex}
                                          >
                                            <CompanyProductItem>
                                              <Link
                                                href={`/productdetail/${sector.slug}/${company.slug}/${product.slug}`}
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
                                                    product?.photos[0]
                                                      ?.source ||
                                                    product?.photos[1]
                                                      ?.source ||
                                                    ""
                                                  }
                                                  alt="Product Image"
                                                />
                                                <Typography variant="h6">
                                                  {product.name}
                                                </Typography>
                                              </Link>
                                              <SecrorMinMaxOrder>
                                                {/* <Typography variant="h5">
                                                  {product.price_type ===
                                                  "quantity" ? (
                                                    <>
                                                      $
                                                      {product
                                                        ?.price_range[0] ||
                                                        "0"}{" "}
                                                      - $
                                                      {product
                                                        ?.price_range[1] || "0"}
                                                    </>
                                                  ) : (
                                                    <>
                                                      $
                                                      {product.unit_price ??
                                                        "0"}
                                                    </>
                                                  )}
                                                </Typography> */}
                                                <Typography
                                                  variant="h5"
                                                  sx={{ lineHeight: "normal" }}
                                                >
                                                  {product.price_type ===
                                                  "quantity" ? (
                                                    <>
                                                      {/* { product?.symbol ?? CurrencySymbol(product.currency_id)}{" "} */}
                                                      {product?.price_range
                                                        ?.length == 2 ||
                                                      product?.unit_price
                                                        ? (product?.symbol ??
                                                            CurrencySymbol(
                                                              product?.currency_id
                                                            )) + " "
                                                        : ""}
                                                      {product?.price_range &&
                                                      product.price_range
                                                        .length > 1 ? (
                                                        <>
                                                          {product
                                                            .price_range[0]
                                                            ? product.price_range[0]?.toLocaleString()
                                                            : ""}{" "}
                                                          -{" "}
                                                          {product?.symbol ??
                                                            CurrencySymbol(
                                                              product.currency_id
                                                            )}{" "}
                                                          {product
                                                            ?.price_range[1]
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
                                                      {(product?.unit_price !=
                                                        0 &&
                                                        product?.unit_price) ??
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
                                                            : UnitName(
                                                                product?.qty_unit
                                                              )}
                                                        </span>
                                                      </>
                                                    )}

                                                  {/* Uncomment if needed */}
                                                  {/* <LightTooltip
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
  </LightTooltip> */}
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
                          ))}
                          {/* "View More" Button */}
                          {sector.top_seller.length >= 4 && (
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <ViewMoreBTN
                                  onClick={() => {
                                    router.push("/manufacture");
                                  }}
                                >
                                  View More
                                </ViewMoreBTN>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      ) : (
                        <TopSellerSkeleton />
                      )}
                    </CustomTabPanel>
                  );
                })}
            </RetargettabOuter>
          </Box>
        </SectionColoredBox>
        <SectionWhiteBox>
          <Box className="mypagecontainer">
            <RetargetSubHeading>Get product inspiration</RetargetSubHeading>
            {!loading ? (
              <OurTopProducts
                sx={{
                  "@media screen and (max-width:600px)": {
                    padding: ".5rem 0 1rem",
                  },
                  margin: "0rem",
                }}
              >
                <Slider {...settingsBrowsingHistory}>
                  {topRatedProducts.slice(0, 8)?.map((product, index) => (
                    <div key={index}>
                      <Box sx={{ margin: "0 5px" }}>
                        <ProductItem data={product} />
                      </Box>
                    </div>
                  ))}
                </Slider>
              </OurTopProducts>
            ) : (
              <>
                <ProductSkeleton />
              </>
            )}
          </Box>
        </SectionWhiteBox>
        <SectionWhiteBox>
          <LandingNewsSection className="mypagecontainer">
            <LandingPageHeadings>
              {" "}
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

        <SendMessages ref={ref}>
          <ContainerBox
            className="mypagecontainer"
            sx={{ position: "relative", zIndex: 10 }}
          >
            <SendMessagesInnerBox>
              <Grid container spacing={0} alignItems={"center"}>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                  <SendMessagesBox>
                    <MessageHeading sx={{ marginBottom: "1rem" }}>
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
                          const names = selectedFiles.map((file) => {
                            const name = file.name;
                            return name;
                          });
                          setFilePreviews((prev) => [...prev, ...names]);
                        };
                        const handleRemoveAttachment = (index) => {
                          console.log("Removing attachment at index:", index);

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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
                                  loading="lazy"
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
export default Retargettingmanufacture;

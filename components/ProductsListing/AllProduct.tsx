import React, { useEffect, useState } from "react";
import ProductModule from "./product.module.css";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import RequestPrice from "./RequestPrice";
import ProductItem from "./ProductItem";
import {
  Grid,
  Button,
  Stack,
  Skeleton,
  Box,
  InputBase,
  Typography,
  Drawer,
  Divider,
  Autocomplete,
  TextField,
  IconButton,
  Popper,
} from "@mui/material";
import ProductListView from "./ProductListView";
import ListSkeleton from "./Skeleton/ListSkeleton";
import GridSkeleton from "./Skeleton/GridSkeleton";
import _debounce from "lodash/debounce";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllFilters from "./AllFilters";
// import { CssGridBox4ItemProductlisting } from "../miniSite/Products/Products.styled";
import BigPostdummy from "./BigPostdummy";
import NoDataFound from "../common/NoDataFound";
import AnnualFilter from "./AnnualFilter";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import BusinessFilter from "./BusinessFilter";
import ConditionFilter from "./ConditionFilter";
import PriceTypeFilter from "./PriceTypeFilter";
import ProductAvailabeFilter from "./ProductAvailabeFilter";
import ManufactureFilter from "./ManufactureFilter";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  setBigPostList,
  setEmptyData,
  setLastPage,
  setManufacturersSuppliers,
  setMostSearchesProducts,
  setPageNumber,
  setProductKeywords,
  setProductList,
  setRelatedLikedProducts,
  setTotalProduct,
  setViewType,
} from "@/hooks/UseProductListContext";
import CountryFilter from "./CountryFilter";
import { apiClient } from "../common/common";
import { useRouter } from "next/router";
import HistoryIcon from "@mui/icons-material/History";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "@mui/material/Pagination";
import {
  ProductListPagination,
  SearchList,
  ProductCategoryCollpase,
  CategoryShowLessSpan,
  CategoryShowLess,
  BoxContainerSticky,
  IconsGap,
  Svgabsolute,
  CssGridBox4ItemProductlisting,
  FilterMenu,
} from "./style";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ProductListViewSideBar from "./ProductListViewSideBar";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { removeLastIndexValue } from "../Helper";
export default function AllProduct(props) {
  const {
    lastPage,
    pageNumber,
    filterCategory,
    viewType,
    productsList,
    totalProduct,
    manufacturersSuppliers,
    bigPostList,
    getLatestPopup,
    emptyData,
    categoryData,
    categoryIds,
    productKeywords,
    loader,
    relatedLikedProducts,
    mostSearchesProducts,
  } = useSelector((state: any) => state.productList);
  const dispatch = useAppDispatch();
  const { query }: any = useRouter();

  let category = categoryData.find((v) => v.id == categoryIds)?.name ?? "";
  const [isMount, setMount] = useState(false);
  const [allloader, setAllLoader] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchProudct, setSearchProudct] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [searchHistory, setSearchHistory] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<any>(query?.name ?? "");
  const [searchItem, setSearchItem] = useState<any>({ value: "", view: "" });
  const [toggleSuggetionList, setToggleSuggestionList] =
    useState<boolean>(false);

  const history = localStorage?.searchHistory
    ? JSON.parse(localStorage?.searchHistory)
    : [];
  const userInfo = localStorage?.userData
    ? JSON.parse(localStorage?.userData)
    : null;

  useEffect(() => {
    document.body.classList.add("fixed-header");
  });

  useEffect(() => {
    if (history.length > 0 && searchHistory.length == 0) {
      setSearchHistory(history);
      setSuggestionList(history);
    }
  }, [history]);

  useEffect(() => {
    if (!searchItem?.value && query.name) {
      setSearchItem({ view: query.name, value: query.name });
    }
  }, [query.name, searchItem]);

  var body = {
    search_by_name: searchItem?.value ? searchItem.value : query?.name ?? "",
    per_page: "18",
    page: pageNumber ? pageNumber : "",
    category_id: filterCategory?.categories
      ? query?.category?.toString() ?? ""
      : "",
    brands: filterCategory?.brand ? query?.brand?.toString() ?? "" : "",
    business: filterCategory?.business_type
      ? query?.business?.toString() ?? ""
      : "",
    yearly_revenue: filterCategory?.annual_revenue
      ? query?.revenue?.toString() ?? ""
      : "",
    condition: filterCategory?.condition
      ? query?.condition?.toString() ?? ""
      : "",
    price_type: filterCategory?.price_type
      ? query?.priceType?.toString() == "Quantity Based,Fixed Price" ||
        query?.priceType?.toString() == "Fixed Price,Quantity Based"
        ? "fixed,quantity"
        : query?.priceType?.toString() == "Quantity Based"
        ? "quantity"
        : query?.priceType?.toString() == "Fixed Price"
        ? "fixed"
        : ""
      : "",
    availability: filterCategory?.product_availability
      ? query?.availability?.toString() ?? ""
      : "",
    manufacturer_year: filterCategory?.manufacturer_year
      ? query?.manufacturer?.toString() ?? ""
      : "",
    price_range: filterCategory?.price_range
      ? query?.range?.toString() ?? ""
      : "",
    search_by_country: filterCategory?.search_by_country
      ? query?.country?.toString() ?? ""
      : "",
  };

  // **********************************************

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {},
    "& .css-1iz4iln": {
      color: "#D7282F",
      padding: "0 8px",
      right: "0px",
      cursor: "pointer",
      pointerEvents: "inherit",
      zIndex: "1",
    },
    ".css-1v4rvp9-MuiInputBase-root": {
      width: "100%",
      "& .MuiInputBase-input": {
        width: "100%",
        paddingLeft: "0",
        paddingRight: "calc(1em + 22px)",
        fontSize: "13px",
      },
    },
  }));
  const { keywordData, KeyName }: any = useSelector(
    (state: any) => state.productList
  );
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: "0px 4px",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "40%",
    transform: "translate(0 , -40%)",
    cursor: "pointer",
    zIndex: "2",
    "& .MuiSvgIcon-root": {
      color: "#231F20",
    },
    "&:hover": {
      "& .MuiSvgIcon-root": {
        color: "#D7282F",
      },
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "0 0 7px 24px",
      transition: theme.transitions.create("width"),
      width: "100%",
      fontSize: "12px",
      "&::placeholder": {
        fontSize: "12px",
      },
    },
  }));
  const Borderbox = styled(Stack)(({ theme }) => ({
    border: "1px solid #CCCEDD",
    borderRadius: 100,
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: "1",
    left: "34px",
    overflow: "hidden",
    width: "26px",
    height: "26px",
    justifyContent: "center",
    transition: "all ease .5s",
    display: "none",
    "@media screen and (max-width: 767px)": {
      display: "block",
    },
    top: "2px",
    "&:hover": {
      width: "calc(100% - 30px)",
      backgroundColor: "#ffffff",
    },
  }));

  const FetchSuggestionList = React.useRef(
    _debounce(async (keyword: any) => {
      if (keyword) {
        setSearchLoader(true);
        let response = await apiClient("front/product/list/search", "post", {
          body: { keyword },
        });
        if (response.status == 200) {
          if (keyword) {
            setSuggestionList(
              response.data.map((v) => ({
                value: v.slug,
                view: v.product_name,
                history: false,
              }))
            );
          }
        }
        setSearchLoader(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    setSearchQuery(query?.name);
  }, []);

  useEffect(() => {
    if (query) {
      filterProductList(query?.name, query);
    }
  }, [query]);

  const getBrandIds = (values) => {
    const parts = values.split(",");
    const brandNames = parts.map((item) => {
      const splittedValues = item.split("-");
      return splittedValues[splittedValues.length - 1];
    });
    const result = brandNames.join(",");
    return result;
  };

  interface Params {
    url?: string;
    per_page?: string;
    [key: string]: any; // Allows for any additional properties
  }
  const filterProductList = async (
    value = "",
    params: Params = {},
    type = ""
  ) => {
    // const newParams = {...params, per_page: '1'}
    const { url } = params;
    const newParams = {
      ...params,
      ...(params?.brand_id && { brand_id: getBrandIds(params.brand_id) }),
      ...(params?.catogery && {
        category_lists: removeLastIndexValue(params.catogery, true),
      }),
    };

    const currency = localStorage.getItem("currency") ?? 1;
    const fetchURL = url ? url : "front/product/list";
    if (type !== "more") setAllLoader(true);
    let payload = {
      user_id: userInfo ? userInfo.id : "",
      currency: currency,
      per_page: "18",
      search_by_name: value,
      ...newParams,
    };
    let response = await apiClient(fetchURL, "post", {
      body: payload,
    });
    if (response.status === 200) {
      dispatch(setProductKeywords(response.keywords));
      dispatch(setTotalProduct(response.total));
      dispatch(setManufacturersSuppliers(response.manufacturers_suppliers));
      dispatch(setProductList(response.data));
      dispatch(setRelatedLikedProducts(response.related_liked_products));
      dispatch(setMostSearchesProducts(response.most_searches_products));
      if (response?.data?.length > 0) {
        dispatch(setEmptyData(false));
        if (type === "more") {
          dispatch(setProductList([...response.data]));
        } else {
          dispatch(setProductList(response.data));
        }
        dispatch(setLastPage(response.lastPage));
        if (type !== "more") {
          dispatch(setPageNumber(response.currentPage));
        } else {
          dispatch(setPageNumber(response.currentPage + 1));
        }
        dispatch(setBigPostList(response.big_post));
        dispatch(setTotalProduct(response.total));
        dispatch(setManufacturersSuppliers(response.manufacturers_suppliers));
      } else {
        dispatch(setEmptyData(true));
      }
    }
    setAllLoader(false);
    return response;
  };

  useEffect(() => {
    if (Object.values(query).length > 0) {
      var body = {
        per_page: "18",
        page: 1,
        search_by_name: searchItem?.value
          ? searchItem.value
          : query?.name ?? "",
        category_id: filterCategory?.categories
          ? query?.category?.toString() ?? ""
          : "",
        brands: filterCategory?.brand ? query?.brand?.toString() ?? "" : "",
        business: filterCategory?.business_type
          ? query?.business?.toString() ?? ""
          : "",
        yearly_revenue: filterCategory?.annual_revenue
          ? query?.revenue?.toString() ?? ""
          : "",
        condition: filterCategory?.condition
          ? query?.condition?.toString() ?? ""
          : "",
        price_type: filterCategory?.price_type
          ? query?.priceType?.toString() == "Quantity Based,Fixed Price" ||
            query?.priceType?.toString() == "Fixed Price,Quantity Based"
            ? "fixed,quantity"
            : query?.priceType?.toString() == "Quantity Based"
            ? "quantity"
            : query?.priceType?.toString() == "Fixed Price"
            ? "fixed"
            : ""
          : "",
        availability: filterCategory?.product_availability
          ? query?.availability?.toString() ?? ""
          : "",
        manufacturer_year: filterCategory?.manufacturer_year
          ? query?.manufacturer?.toString() ?? ""
          : "",
        price_range: filterCategory?.price_range
          ? query?.range?.toString() ?? ""
          : "",
        search_by_country: filterCategory?.search_by_country
          ? query?.country?.toString() ?? ""
          : "",
      };
      setMount(true);
      // filterProductList(searchProudct, body);
    } else {
      setSearchItem({ value: "", view: "" });
      // if (isMount) filterProductList(searchProudct, { per_page: "18" });
    }
  }, [query, isMount]);

  useEffect(() => {
    if (window.location.search == "") {
      filterProductList("", {
        per_page: "18",
      });
    }
  }, []);

  var settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  const normalPostList = productsList;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const searchHistoryHandler = (value: any) => {
    let historyValue = searchHistory.filter((v) => v.value !== value.value);
    if (historyValue.length >= 5) {
      historyValue.shift();
      historyValue.unshift({ ...value, history: true });
    } else {
      historyValue.unshift({ ...value, history: true });
    }
    setSearchHistory(historyValue);
    localStorage.setItem("searchHistory", JSON.stringify(historyValue));
  };
  const [page, setPage] = React.useState(1);
  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    await filterProductList(
      searchProudct,
      { ...body, page: value, url: `front/product/list?page=${value}` },
      "more"
    );
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const list = (anchor) => (
    <Box className={ProductModule.mobilefilters}>
      <div className="productnav">
        <AllFilters />
        <CategoryFilter />
        <PriceFilter />
        <CountryFilter />
        <BrandFilter />
        <BusinessFilter />
        <ConditionFilter />
        <PriceTypeFilter />
        <ProductAvailabeFilter />
        <ManufactureFilter />
        <AnnualFilter />
      </div>
    </Box>
  );

  const loadMore = () => {
    return (
      <Grid container spacing={2} mt={2} mx={0}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton
                    animation="wave"
                    width={20}
                    height={20}
                    variant="rectangular"
                    sx={{ mr: 1 }}
                  />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
            </Box>

            <Box
              sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={30} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton
                    animation="wave"
                    width={20}
                    height={20}
                    variant="rectangular"
                    sx={{ mr: 1 }}
                  />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
            </Box>

            <Box
              sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={30} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton
                    animation="wave"
                    width={20}
                    height={20}
                    variant="rectangular"
                    sx={{ mr: 1 }}
                  />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
            </Box>

            <Box
              sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={30} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl={2.4} height={"100%"}>
          <Box
            sx={{
              border: "1px solid #e1e1e1",
              boxShadow: "0 3px 9px 0 rgba(0,0,0,.1)",
              borderRadius: "6px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
              }}
            >
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Skeleton
                    animation="wave"
                    width={20}
                    height={20}
                    variant="rectangular"
                    sx={{ mr: 1 }}
                  />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={100} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                padding: "4px",
                border: "1px solid #e7e7e7",
                margin: "8px",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={"150px"}
              />
            </Box>
            <Box
              sx={{
                margin: "8px",
                borderBottom: "1px dashed #e7e7e7",
                paddingBottom: "10px",
              }}
            >
              <Skeleton variant="text" animation="wave" width={"70%"} />
            </Box>

            <Box
              sx={{ borderBottom: "1px dashed #e7e7e7", paddingBottom: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={40} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={30} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={60} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: "2px 8px",
                }}
              >
                <Box>
                  <Skeleton variant="text" animation="wave" width={70} />
                </Box>
                <Box>
                  <Skeleton variant="text" animation="wave" width={50} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                margin: "8px",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e7e7e7",
                  padding: "3px 8px",
                  minWidth: "100px",
                  borderRadius: "4px",
                }}
              >
                <Skeleton variant="text" animation="wave" width={"100%"} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const RemoveHistoryHandler = ({ value }) => {
    let Value = [...searchHistory].filter((v) => v.value != value);
    setSearchHistory(Value);
    setSuggestionList(Value);
    localStorage.setItem("searchHistory", JSON.stringify(Value));
  };

  const router = useRouter();

  const addQueryParams = (name) => {
    if (name == "") {
      delete router.query.q;
      router.push(router);
      return;
    }
    router.query.name = name;
    router.push(router);
  };
  const CustomPopper = (props) => {
    return (
      <Popper
        {...props}
        sx={{
          "@media screen and (max-width:767px)": {
            position: "fixed",
            zIndex: 10,
          },
        }}
        placement="bottom-start"
      />
    );
  };
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={9}
      lg={9}
      xl={10}
      className={ProductModule.grid_right}
      onClick={(e) => {
        // e.stopPropagation();
        setToggleSuggestionList(false);
      }}
    >
      {getLatestPopup && <RequestPrice />}
      <Box className={ProductModule.searchtop}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BoxContainerSticky>
              <Box
                className={ProductModule.sideserchbar}
                sx={{ position: "relative" }}
              >
                {/* <Box className={ProductModule.searchbar_outer}>
                  <SearchIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      transform: "translate(0, -50%)",
                      left: "12px",
                      color: "#D7282F",
                      cursor: "pointer",
                      zIndex: "2",
                      "@media (max-width:767px)": {
                        fontSize: "18px",
                        width: "18px",
                        height: "18px",
                        left: "14px"
                      }
                    }}
                  />
                  <Box
                    className={ProductModule.searchbar}
                    mt={0}
                    sx={{
                      "& .MuiInputBase-root": {
                        paddingTop: "2px !important",
                        paddingBottom: "2px",
                        "& fieldset": {
                          borderWidth: "0 !important",
                        },
                      },
                    }}
                  >
                    <Autocomplete
                      // autoHighlight={true}
                      // open={true}
                      disablePortal
                      PopperComponent={CustomPopper}
                      clearIcon={
                        searchItem?.value ? (
                          <ClearIcon
                            style={{ left: "-17px" }}
                            onClick={(e) => {
                              setSearchItem({
                                value: "",
                                view: "",
                              });
                              addQueryParams("");
                            }}
                          />
                        ) : (
                          ""
                        )
                      }
                      freeSolo
                      forcePopupIcon={false}
                      slotProps={{
                        popper: {
                          sx: {
                            zIndex: 10,
                            "@media (max-width:767px)": {
                              // zIndex: 1300,
                              width: "100% !important",
                              padding: "10px"
                            }
                          },
                        },
                      }}
                      size="small"
                      onInputChange={(e: any) => {
                        if (e?.target?.value) {
                          FetchSuggestionList(e?.target?.value);
                          setSearchItem({
                            value: e?.target?.value,
                            view: e?.target?.value,
                          });
                        } else {
                          if (searchItem?.value) {
                            if (searchItem?.value?.length == 1) {
                              // router.push({
                              //   pathname: "",
                              //   search: "",
                              // });
                            }
                          } else {
                            setSearchItem({
                              value: "",
                              view: "",
                            });

                            addQueryParams("");
                          }
                        }
                      }}
                      id="product-list-autocomplete"
                      sx={{ width: "100%" }}
                      getOptionLabel={(option) => option.view}
                      options={suggestionList}
                      onChange={(e, newValue) => {
                        console.log(newValue, '************');
                        
                        if (newValue) searchHistoryHandler(newValue);
                        filterProductList(newValue?.view ?? "");
                        if (newValue !== null) {
                          setSearchItem(newValue);
                        }
                        //  {
                        //   router.push("/productlist");
                        // }
                        if (newValue) addQueryParams(newValue.view);
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          filterProductList(searchItem?.value ?? "");
                          searchHistoryHandler(searchItem);
                          addQueryParams(searchItem.value);
                        }
                      }}
                      value={searchItem}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{
                            padding: "3px 8px!important", minHeight: "40px !important",
                            "& > img": { mr: 2, flexShrink: 0 },
                          }}
                          {...props}
                        >
                          {option.history && (
                            <HistoryIcon
                              style={{ fontSize: "20px", marginRight: "8px" }}
                            />
                          )}
                          <IconsGap>
                            <Box sx={{
                              padding: "10px",
                              "@media (max-width:767px)": {
                                paddingTop: "2px",
                                paddingBottom: "2px"
                              }

                            }}>{option.view}</Box>
                            <Svgabsolute>
                              {option.history && (
                                <IconButton
                                  sx={{
                                    marginLeft: "auto",
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                    },
                                  }}
                                  edge="end"
                                  aria-label="delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    RemoveHistoryHandler(option);
                                  }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              )}
                            </Svgabsolute>
                          </IconsGap>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Your Gateway to Power Generation - Energy - Oil & Gas"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {searchLoader && (
                                  <CircularProgress color="inherit" size={20} />
                                )}
                                {params?.InputProps?.endAdornment ??
                                  searchItem?.value ??
                                  ""}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                    <Button
                      variant="outlined"
                      className={ProductModule.brand_serach}
                      sx={{
                        alignItems: "flex-end",
                        padding: "4px 12px !important",
                      }}
                      onClick={(event) => {
                        searchHistoryHandler({ ...searchItem, history: true });
                        // filterProductList(searchItem.value);
                        addQueryParams(searchItem.value);
                      }}
                    >
                      Search
                    </Button>
                  </Box>
                </Box> */}
                {/* <Borderbox
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                >
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon style={{ fontSize: "16px" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Your Gateway to Power Generation - Energy - Oil & Gas"
                      inputProps={{ "aria-label": "search" }}
                      // onChange={(event) => {
                      //   event.stopPropagation();
                      //   setCountryName(event.target.value);
                      //   handleCountry(event.target.value);
                      // }}
                      // value={countryName}
                    />
                  </Search>
                </Borderbox> */}
                {/* <Stack
                  className={ProductModule.filterstack}
                  direction="row"
                  justifyContent="end"
                  sx={{ alignItems: "center" }}
                  spacing={1}
                > */}
                <FilterMenu>
                  <Button
                    onClick={toggleDrawer("left", true)}
                    variant="contained"
                    startIcon={<TuneRoundedIcon />}
                  >
                    {/* Filter */}
                  </Button>
                  <>
                    <Drawer
                      anchor={"left"}
                      open={state["left"]}
                      onClose={toggleDrawer("left", false)}
                    >
                      {list("left")}
                    </Drawer>
                  </>
                </FilterMenu>
                {/* <div className={ProductModule.viewtype}>
                    <Box style={{ color: "#000" }}>
                      {
                        <LightTooltip
                          disableInteractive
                          arrow
                          title="Grid View"
                          placement="top"
                        >
                          <GridViewOutlinedIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(setViewType(0));
                            }}
                            aria-label="Grid View"
                            className={
                              viewType === 0
                                ? ProductModule.sort_icon_status
                                : ""
                            }
                          />
                        </LightTooltip>
                      }
                    </Box>
                    <Box style={{ color: "#000" }}>
                      {
                        <LightTooltip
                          disableInteractive
                          arrow
                          title="List View"
                          placement="top"
                        >
                          <ListAltOutlinedIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(setViewType(1));
                            }}
                            aria-label="List View"
                            className={
                              viewType === 1
                                ? ProductModule.sort_icon_status
                                : ""
                            }
                          />
                        </LightTooltip>
                      }
                    </Box>
                  </div> */}
                {/* </Stack> */}
              </Box>
            </BoxContainerSticky>
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={11}>
            <Box
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "6px",
                padding: "12px 16px",
                position: "relative",
                // marginTop: "8px",
                "@media screen and (max-width: 767px)": {
                  padding: "12px 5px",
                  margin: "0 0 10px",
                },
                "@media screen and (max-width:600px)": {
                  padding: "12px 5px",
                  background: "#f6f6f6",
                },
                "& .MuiTypography-h6": {
                  fontSize: "14px",
                  color: "#4A4A4A",
                  "@media screen and (max-width: 767px)": {
                    fontSize: "14px",
                    margin: 0,
                  },
                  "& span": {
                    fontWeight: "700",
                  },
                },
              }}
            >
              <Typography variant="h6">
                {loader ? (
                  <>
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={"12%"}
                    ></Skeleton>
                  </>
                ) : (
                  <>
                    Total <span>{totalProduct}</span> Products
                  </>
                )}
                {KeyName && " in "}{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {KeyName.replaceAll("-", " ")}
                </span>
                {manufacturersSuppliers &&
                  `from about ${manufacturersSuppliers} manufacturers & Suppliers`}
              </Typography>
              <Box>
                {productKeywords &&
                  productKeywords[0]?.split(",")?.length > 0 && (
                    <>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <ProductCategoryCollpase>
                          {productKeywords[0]
                            ?.split(",")
                            ?.map((keywords, keys) => (
                              <SearchList
                                key={keys}
                                style={{
                                  color:
                                    keywords == searchItem?.value && "#d7282f",
                                }}
                                onClick={() => {
                                  setSearchItem({
                                    value: keywords,
                                    view: keywords,
                                  });
                                  filterProductList(keywords);
                                  addQueryParams(keywords);
                                }}
                              >
                                {keywords}
                              </SearchList>
                            ))}
                        </ProductCategoryCollpase>
                      </Collapse>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "95%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          {!expanded && (
                            <>
                              <Box
                                sx={{
                                  background:
                                    "linear-gradient(270deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
                                  position: "absolute",
                                  right: "0",
                                  height: "100%",
                                  width: "120px",
                                }}
                              ></Box>
                              {productKeywords[0]
                                ?.split(",")
                                ?.map((keywords, keys) => (
                                  <SearchList
                                    key={keys}
                                    style={{
                                      color:
                                        keywords == searchItem?.value &&
                                        "#d7282f",
                                    }}
                                    onClick={() => {
                                      setSearchItem({
                                        value: keywords,
                                        view: keywords,
                                      });
                                      filterProductList(keywords);
                                      addQueryParams(keywords);
                                    }}
                                  >
                                    {keywords}
                                  </SearchList>
                                ))}
                            </>
                          )}
                        </Box>
                      </Box>
                      <CategoryShowLess
                        sx={{
                          width: "5%",
                          display: "flex",
                          alignItems: "center",
                          "& .MuiLink-root": {
                            color: "#D7282F",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            fontSize: "13px",
                            "&:hover": {
                              color: "#850005",
                            },
                          },
                        }}
                      >
                        <Button onClick={toggleExpanded} disableRipple>
                          {expanded ? (
                            <CategoryShowLessSpan>
                              Less <KeyboardArrowUpIcon />
                            </CategoryShowLessSpan>
                          ) : (
                            <CategoryShowLessSpan>
                              More <KeyboardArrowDownIcon />
                            </CategoryShowLessSpan>
                          )}
                        </Button>
                      </CategoryShowLess>
                    </>
                  )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1}>
            <div className={ProductModule.viewtype}>
              <Box style={{ color: "#000" }}>
                {
                  <LightTooltip
                    disableInteractive
                    arrow
                    title="Grid View"
                    placement="top"
                  >
                    <GridViewOutlinedIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(setViewType(0));
                      }}
                      aria-label="Grid View"
                      className={
                        viewType === 0 ? ProductModule.sort_icon_status : ""
                      }
                    />
                  </LightTooltip>
                }
              </Box>
              <Box style={{ color: "#000" }}>
                {
                  <LightTooltip
                    disableInteractive
                    arrow
                    title="List View"
                    placement="top"
                  >
                    <ListAltOutlinedIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(setViewType(1));
                      }}
                      aria-label="List View"
                      className={
                        viewType === 1 ? ProductModule.sort_icon_status : ""
                      }
                    />
                  </LightTooltip>
                }
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Box
        className={`${ProductModule.product_list_right} ${ProductModule.listviewright}`}
        p={0}
        paddingX={{ xs: 2 }}
      >
        {viewType === 0 ? (
          <>
            {allloader ? (
              <>
                <GridSkeleton />
              </>
            ) : (
              <Box className={ProductModule.grid_layout}>
                {!emptyData && (
                  <CssGridBox4ItemProductlisting>
                    {bigPostList?.length > 0 && (
                      <Stack
                        className={ProductModule.bigpostouter}
                        sx={{
                          height: "100%",
                          gridColumn: {
                            xl: "1 / span 2",
                            lg: "1 / span 2",
                            md: "1 / span 2",
                            sm: "1 / span 2",
                            xs: "1 / span 2",
                          },
                          gridRow: {
                            xl: "1 / span 1",
                            lg: "1 / span 1",
                            md: "1 / span 1",
                            sm: "1 / span 1",
                            xs: "1 / span 1",
                          },
                        }}
                        key={"index"}
                        style={{
                          backgroundColor: "#fafafa",
                          borderRadius: "6px",
                        }}
                      >
                        {bigPostList.length > 1 ? (
                          <Slider {...settings}>
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
                      </Stack>
                    )}
                    {/* product page render */}
                    {normalPostList?.length > 0 && !emptyData
                      ? normalPostList.map((element, index) => (
                          <div
                            key={`product-${index}`}
                            style={{ height: "100%" }}
                          >
                            <ProductItem data={element} key={index} />
                          </div>
                        ))
                      : null}
                  </CssGridBox4ItemProductlisting>
                )}
                {emptyData && <NoDataFound />}
              </Box>
            )}
            {lastPage != "1" &&
              lastPage > "1" &&
              normalPostList?.length > 0 && (
                <ProductListPagination>
                  <Stack spacing={2}>
                    <Pagination
                      count={lastPage}
                      page={page}
                      onChange={handleChange}
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </ProductListPagination>
              )}
          </>
        ) : (
          <>
            {allloader ? (
              <ListSkeleton />
            ) : (
              <Box className={ProductModule.list_layout}>
                <Box className={ProductModule.row_view}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
                      <Box sx={{ height: "100%" }}>
                        {emptyData ? (
                          <NoDataFound />
                        ) : productsList?.length > 0 ? (
                          productsList.map((element, index) => (
                            <div key={`ww-${index}`}>
                              <ProductListView data={element} key={index} />
                            </div>
                          ))
                        ) : null}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
                      <Box sx={{ height: "100%" }}>
                        <ProductListViewSideBar
                          relatedLikedProducts={relatedLikedProducts}
                          mostSearchesProducts={mostSearchesProducts}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  {lastPage != "1" &&
                    lastPage > "1" &&
                    normalPostList?.length > 0 && (
                      <ProductListPagination>
                        <Stack spacing={2}>
                          <Pagination
                            count={lastPage}
                            page={page}
                            onChange={handleChange}
                          />
                        </Stack>
                      </ProductListPagination>
                    )}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
}

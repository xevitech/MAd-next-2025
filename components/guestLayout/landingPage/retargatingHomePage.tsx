// 'use client';
import { useRouter } from "next/router";
import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BodyContentInfo,
  CenterDiv,
  ContentContainer,
  FixbarMenusTypeStyle,
  InnMenuData,
  LandingPageHeadings,
  LandingPageHeadingsSpan,
  RetargatingBannerContainer,
  RetargetFrequentlySearch,
  RetargetFrequentlySearchList,
  RetargetSearchBar,
  RetargetTabs,
  RetargetTabsBox,
  RetargetWelcomeBox,
  RightFixedMenus,
} from "./styles";
import { useMediaQuery } from '@mui/material';
import { apiClient } from "@/components/common/common";
import Grid from "@mui/material/Grid";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import { Autocomplete, TextField, InputAdornment, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import _ from "lodash";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import { IconsGap, Svgabsolute } from "@/components/ProductsListing/style";

import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import ContactSupplierFly from "@/components/ProductDetail/ProductComponents/ProductActions/ContactSupplierFly";
import BrowsingHistory from "@/components/ProductDetail/ProductComponents/ProductActions/BrowsingHistory";
import { Typography } from "@mui/material";
import { UserName } from "@/components/CRM/style";
// import ChatWindow from "@/components/Chat";
import Link from "next/link";
import index from "pages/recentsearches";
import { useTheme } from '@mui/material/styles';
import theme from "styles/theme";
const RetargettingProduct = lazy(() => import("./RetargettingProduct"));
const Retargettingmanufacture = lazy(() => import("./Retargettingmanufacture"));
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const router = useRouter();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ padding: "0px 0 0 0" }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RetargatingHomePage() {
  const [value, setValue] = React.useState(0);
  const quoteSectionRef = useRef(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("newvalue", newValue);
    setValue(newValue);
    console.log("userData", localStorage.getItem("userData"));
  };

  const [fixbarMenusType, setFixbarMenusType] = React.useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [userData0, setUserData0] = useState(null);
  const [userName, setUserName] = useState(null);
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
  const [searchItem0, setSearchItem0] = useState({ value: "", view: "" });
  const [searchItem, setSearchItem] = useState({ value: "", view: "" });
  const [suggestionList0, setSuggestionList0] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);
  const [searchLoader0, setSearchLoader0] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchHistory0, setSearchHistory0] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showContent0, setShowContent0] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const handleRedirect = async (keyword) => {
    try {
      router.push(`manufacture?filter=${keyword}`);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const handleRedirect1 = async (keyword) => {
    try {
      router.push(`productlist?name=${keyword}`);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const [keywordData, setKeywordData] = useState([]);
  const fetchRetargetProductKeywords = async () => {
    try {
      const { data } = await apiClient(
        `search_keywords/topKeywords`,
        "get",
        {}
      );

      console.log("respofetchretaregt", data);
      setKeywordData(data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  useEffect(() => {
    fetchRetargetProductKeywords();
    return () => {};
  }, []);

  // const addQueryParams = (name) => {
  //   const pathname = "/productlist";
  //   if (typeof name === "object") {
  //     name = name?.value;
  //   }
  //   const newQuery = name ? { name } : {};
  //   router.push({ pathname, query: newQuery }, undefined, { shallow: true });
  // };
  // const addQueryParams0 = (name) => {
  //   const pathname = "/manufactureProducts";
  //   if (typeof name === "object") {
  //     name = name?.value;
  //   }
  //   const newQuery = name ? { name } : {};
  //   router.push({ pathname, query: newQuery }, undefined, { shallow: true });
  // };

  const addQueryParams = (name, isManufacture = false) => {
    const pathname = isManufacture ? "/manufacture" : "/productlist";
    if (typeof name === "object") {
      name = name?.value;
    }
    const newQuery = name ? { name } : {};
    router.push({ pathname, query: newQuery }, undefined, { shallow: true });
  };

  // search functionality
  const FetchSuggestionList = async (keyword) => {
    console.log("FetchSuggestionLis ie index1");

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
  };

  // search functionality manufacture
  // const FetchSuggestionList0 = async (keyword) => {
  //   console.log("FetchSuggestionListManufacture ie index0", keyword);
  const FetchSuggestionList0 = useCallback(
    _.debounce(async (keyword) => {
      console.log("Throttled FetchSuggestionList0", keyword);
      if (keyword) {
        setSearchLoader0(true);
        let response = await apiClient(
          "front/manufacture/seller_products?currency=1",
          "get",
          {
            body: { keyword },
          }
        );
        if (response.status == 200) {
          if (keyword) {
            console.log("searchdata", data);
            setSuggestionList0(
              response.data.map((v) => ({
                value: v.slug,
                view: v.slug,
                // view: v.products.map((i) => i.product_name).join(", "),
                history: true,
              }))
            );
          }
        }
        setSearchLoader0(false);
      }
    }, 2000),
    []
  );
  const searchHistoryHandler = (value) => {
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

  const searchHistoryHandler0 = (value) => {
    let historyValue0 = searchHistory0.filter((v) => v.value !== value.value);
    if (historyValue0.length >= 5) {
      historyValue0.shift();
      historyValue0.unshift({ ...value, history: true });
    } else {
      historyValue0.unshift({ ...value, history: true });
    }
    setSearchHistory0(historyValue0);
    localStorage.setItem("searchHistory0", JSON.stringify(historyValue0));
  };

  const RemoveHistoryHandler = (value) => {
    let Value = [...searchHistory].filter((v) => v.value != value.value);
    setSearchHistory(Value);
    setSuggestionList(Value);
    localStorage.setItem("searchHistory", JSON.stringify(Value));
  };
  // manufacture
  const RemoveHistoryHandler0 = (value) => {
    let Value = [...searchHistory0].filter((v) => v.value != value.value);
    setSearchHistory0(Value);
    setSuggestionList0(Value);
    localStorage.setItem("searchHistory0", JSON.stringify(Value));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let history = localStorage?.searchHistory
        ? JSON.parse(localStorage?.searchHistory)
        : [];
      let history0 = localStorage?.searchHistory0
        ? JSON.parse(localStorage?.searchHistory0)
        : [];
      setSearchHistory0(history0);
      setSuggestionList0(history0);
      setSearchHistory(history);
      setSuggestionList(history);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent0(true);
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    setUserData0(JSON.parse(localStorage.getItem("userData0")));
  }, []);
  console.log(userData);

  if (!showContent) {
    return <Box sx={{ height: "100vh" }}></Box>;
  }
  const scrollToQuoteSection = () => {
    if (quoteSectionRef.current) {
      const topOffset = quoteSectionRef.current.offsetTop - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };



  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      {/* <ChatWindow /> */}
      <RetargatingBannerContainer>
        <ContentContainer className="mypagecontainer">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <CenterDiv>
                <RetargetTabsBox>
                  <Box sx={{}}>
                    <RetargetTabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Products" {...a11yProps(0)} />
                      <Tab label="Manufacturers" {...a11yProps(1)} />
                    </RetargetTabs>
                  </Box>
                </RetargetTabsBox>
                <CustomTabPanel value={value} index={1}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <RetargetSearchBar sx={{ maxWidth: "100%" }}>
                      <Autocomplete
                        disablePortal
                        defaultValue={searchItem0.value}
                        disableClearable
                        freeSolo
                        forcePopupIcon={false}
                        slotProps={{
                          popper: {
                            sx: {
                              zIndex: 10,
                            },
                          },
                        }}
                        size="medium"
                        onInputChange={(e, newInputValue) => {
                          if (newInputValue) {
                            FetchSuggestionList0(newInputValue);
                            setSearchItem0({
                              value: newInputValue,
                              view: newInputValue,
                            });
                          } else {
                            if (searchItem0?.value) {
                              if (searchItem0?.value?.length === 1) {
                              }
                            } else {
                              setSearchItem0({
                                value: "",
                                view: "",
                              });
                            }
                          }
                        }}
                        id="product-list-autocomplete"
                        sx={{ width: "100%" }}
                        getOptionLabel={(option) => option.view}
                        options={suggestionList0}
                        onChange={(e, newValue) => {
                          if (newValue) searchHistoryHandler0(newValue);
                          if (newValue !== null) {
                            setSearchItem0(newValue);
                          }
                          if (newValue) addQueryParams(newValue.view, true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            searchHistoryHandler0(searchItem0);
                            addQueryParams(searchItem0.value, true);
                          }
                        }}
                        value={searchItem0}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{
                              "& .MuiFormLabel-root": {
                                fontSize: "0.8rem",
                              },
                              padding: "3px 8px!important",
                              minHeight: "40px !important",
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                          >
                            {option.history && (
                              <HistoryIcon
                                style={{
                                  fontSize: "20px",
                                  marginRight: "8px",
                                }}
                              />
                            )}
                            <IconsGap>
                              <Box
                                sx={{
                                  padding: "10px",
                                }}
                              >
                                {option.view}
                              </Box>
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
                                      RemoveHistoryHandler0(option);
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
                            sx={{
                              "& .MuiInputBase-root": {
                                padding: "0px",
                              },
                              "& .MuiInputBase-input": {
                                padding: "16.5px 14px",
                                "@media screen and (max-width:600px)": {
                                  padding: "11.5px 14px !important",
                                },
                              },
                            }}
                            {...params}
                            fullWidth
                            id="standard-bare"
                            variant="outlined"
                            placeholder="Enter a manufacturer or a Model. Eg Gas compressor, Generators..."
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  <IconButton className="seachbtn">
                                    <SearchIcon
                                      onClick={() => {
                                        addQueryParams(searchItem0, true);
                                      }}
                                    />
                                  </IconButton>
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </RetargetSearchBar>
                    <RetargetFrequentlySearch>
                      <RetargetFrequentlySearchList
                        onClick={() => handleRedirect("Manufacturers")}
                      >
                        Manufacturers
                      </RetargetFrequentlySearchList>
                      <RetargetFrequentlySearchList
                        onClick={() =>
                          handleRedirect("Agents and Representative")
                        }
                      >
                        Agents and Representatives
                      </RetargetFrequentlySearchList>
                      <RetargetFrequentlySearchList
                        onClick={() => handleRedirect("Resellers")}
                      >
                        Resellers
                      </RetargetFrequentlySearchList>
                      <RetargetFrequentlySearchList
                        onClick={() => handleRedirect("Distributors")}
                      >
                        Distributors
                      </RetargetFrequentlySearchList>
                      <RetargetFrequentlySearchList
                        onClick={() => handleRedirect("Retailers")}
                      >
                        ResellersRetailers
                      </RetargetFrequentlySearchList>
                      <RetargetFrequentlySearchList
                        onClick={() => handleRedirect("Wholesalers")}
                      >
                        Wholesalers
                      </RetargetFrequentlySearchList>
                    </RetargetFrequentlySearch>
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={0}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <RetargetSearchBar
                      sx={{ maxWidth: "100%" }}
                      className="sharat"
                    >
                      <Autocomplete
                        disablePortal
                        defaultValue={searchItem.value}
                        disableClearable
                        freeSolo
                        forcePopupIcon={false}
                        slotProps={{
                          popper: {
                            sx: {
                              zIndex: 10,
                            },
                          },
                        }}
                        size="medium"
                        onInputChange={(e, newInputValue) => {
                          if (newInputValue) {
                            FetchSuggestionList(newInputValue);
                            setSearchItem({
                              value: newInputValue,
                              view: newInputValue,
                            });
                          } else {
                            if (searchItem?.value) {
                              if (searchItem?.value?.length === 1) {
                              }
                            } else {
                              setSearchItem({
                                value: "",
                                view: "",
                              });
                            }
                          }
                        }}
                        id="product-list-autocomplete"
                        sx={{ width: "100%" }}
                        getOptionLabel={(option) => option.view}
                        options={suggestionList}
                        onChange={(e, newValue) => {
                          if (newValue) searchHistoryHandler(newValue);
                          if (newValue !== null) {
                            setSearchItem(newValue);
                          }
                          if (newValue) addQueryParams(newValue.view);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            searchHistoryHandler(searchItem);
                            addQueryParams(searchItem.value);
                          }
                        }}
                        value={searchItem}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{
                              "& .MuiFormLabel-root": {
                                fontSize: "0.8rem",
                              },
                              padding: "3px 8px!important",
                              minHeight: "40px !important",
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...props}
                          >
                            {option.history && (
                              <HistoryIcon
                                style={{
                                  fontSize: "20px",
                                  marginRight: "8px",
                                }}
                              />
                            )}
                            <IconsGap>
                              <Box
                                sx={{
                                  padding: "10px",
                                }}
                              >
                                {option.view}
                              </Box>
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
                            sx={{
                              "& .MuiInputBase-root": {
                                padding: "0px",
                              },
                              "& .MuiInputBase-input": {
                                padding: "16.5px 14px",
                                "@media screen and (max-width:600px)": {
                                  padding: "11.5px 14px !important",
                                },
                              },
                            }}
                            {...params}
                            fullWidth
                            id="standard-bare"
                            variant="outlined"
                            placeholder="Enter a manufacturer or a Model. Eg Gas compressor, Generators..."
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  <IconButton className="seachbtn">
                                    <SearchIcon
                                      onClick={() => {
                                        addQueryParams(searchItem);
                                      }}
                                    />
                                  </IconButton>
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </RetargetSearchBar>

                    <RetargetFrequentlySearch>
                      {keywordData &&
                        keywordData.length > 0 &&
                        (isMobile ? keywordData.slice(0, 6) : keywordData).map((keyword, index) => (
                        // keywordData.map((keyword, index) => (
                          <RetargetFrequentlySearchList
                            key={keyword.id}
                            onClick={() => handleRedirect1(keyword.name)}
                          >
                            {keyword.name}
                          </RetargetFrequentlySearchList>
                        ))}
                    </RetargetFrequentlySearch>
                  </Box>
                </CustomTabPanel>
              </CenterDiv>
            </Grid>
          </Grid>
        </ContentContainer>
      </RetargatingBannerContainer>
      <BodyContentInfo>
        <RetargetWelcomeBox>
          <Box className="mypagecontainer">
            <LandingPageHeadings>
              Hello{" "}
              <LandingPageHeadingsSpan>
                {(userData && userData?.name) || "Guest"}
              </LandingPageHeadingsSpan>
              , Welcome to powercozmo.com
            </LandingPageHeadings>
          </Box>
        </RetargetWelcomeBox>
        <CustomTabPanel value={value} index={0}>
          <Suspense fallback={<div></div>}>
            <RetargettingProduct ref={quoteSectionRef} />
          </Suspense>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Suspense fallback={<div></div>}>
            <Retargettingmanufacture ref={quoteSectionRef} />
          </Suspense>
        </CustomTabPanel>
        <RightFixedMenus>
          <Typography>
            <span onClick={scrollToQuoteSection} style={{ cursor: "pointer" }}>
              Get a Quote
            </span>
          </Typography>
        </RightFixedMenus>
      </BodyContentInfo>
    </Box>
  );
}

import { HeaderList, setUnit } from "@/hooks/HeaderHooks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItemText,
  MenuItem,
  MenuList,
  Popper,
  Slide,
  styled,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductDrawer from "./HeaderDrawer/ProductDrawer";
import {
  AfterLoginOptions,
  ALoginBox,
  AppbarBox,
  BlackBarTop,
  ButtonOptionsClick,
  CancelOption,
  CategoriesLinkBtn,
  ClickDrawerInner,
  DrawerWidthBox,
  DropDownSelect,
  FixedAtTop,
  ForSelectContainer,
  ForSocialContainer,
  ForSpaceSection,
  HeaderLogoSearch,
  HeaderPartBox,
  HeaderSupplierLogInfo,
  ImgCountryLabel,
  LanguageCountryBox,
  LogoQuotationText,
  LogoSearchRow,
  MainSectorsRow,
  MainSectorsRowInner,
  MenuAndLogo,
  MyCommonHeader,
  MyContainer,
  MyMenuBox,
  NavInDrawer,
  OnClickLanguageCountryBox,
  OptionClickBox,
  OtherClickOption,
  SearchbarArea,
  SectorSctroll,
  SelectAndSocialIcons,
  useStyles,
  ViewAllCategoriesLink,
  ViewAllCategoriesLinkMobile,
  WebLogo
} from "./style";

import { setUserBasicInfo } from "@/hooks/appReducers";
import {
  setNotification
} from "@/hooks/ChatReducer";
import { AddUnitList } from "@/hooks/productDetailsReducer";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from "@mui/material";
import {
  apiClient,
  calculateTotalUnreadArchivedMessages,
  createEchoInstance
} from "../common";
import {
  CurrencyDropdown
} from "../header/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppBar from "@mui/material/AppBar";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

import OurCategoryTab from "@/components/sidebar/OurCategoryTab";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import XIcon from "@mui/icons-material/X";
import Badge from "@mui/material/Badge";
import { useTheme } from "@mui/system";
import _debounce from "lodash/debounce";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultCurrencyAndLanguageHeader } from "../header/headerStaticValues";
import CountryData from "./CountryData";
import CurrencylanguageData from "./CurrencylanguageData";
import HeaderPopups from "./HeaderPopups";
import HeaderSearchBar from "./HeaderSearchBar";
import OrderPopupData from "./OrderPopupData";
import WelcomePopupData from "./WelcomePopupData";
import WishlistPopupData from "./WishlistPopupData";
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ar", name: "Arabic" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ar", name: "Arabic" },
];
const iconStyles = {
  color: "#fff",
  border: "1px solid",
  transition: "color 0.3s",
  "&:hover": {
    color: "#1976d2",
  },
};
type Anchor = "top" | "left" | "bottom" | "right";


const PrimaryAppBar = styled(AppBar)(({ theme }) => ({
  transition: "transform 0.3s ease",
}));
const SecondaryAppBar = styled(AppBar)(({ theme }) => ({
  transition: "transform 0.3s ease",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  "@media screen and (max-width:900px)": {
    transform: "translateY(0%)",
  },
}));

if (typeof window !== "undefined") {
  (window as any).Pusher = require("pusher-js");
}
const ManageListButton = styled(Button)({
  background: "#d7282f",
  textTransform: "capitalize",
  display: "none",
  borderRadius: "0",
  "& .MuiButton-icon": {
    width: "16px",
  },
  "&:hover": {
    background: "#d7282f",
    textDecoration: "underline",
  },
  "@media screen and (max-width:1600px)": {
    padding: "3px 14px",
    fontSize: "12px",
    height: "37px",
  },
  "@media screen and (max-width:899px)": {
    display: "flex",
  },
});

const HeaderPage = () => {
  const [value, setValue] = React.useState(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>("");
  const [active, setActive] = useState<string>("home");
  const {
    asPath,
    query: { name = "" },
  } = useRouter();
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchHistory, setSearchHistory] = useState<any>([]);
  const [render, setRender] = useState<any>(false);
  const { wishListData } = useSelector((state: any) => state.header);
  const open = Boolean(anchorEl);
  const {
    messageRecievedNotification,
    usersList,
    popup,
    activeUser,
    chatRequest,
  } = useSelector((state: any) => state.chatData);
  const {
    user_info: { id: currentLoggedInUsedId },
  } = useSelector((state: any) => state.userData);

  const handleChange4 = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  let { unreadMessageCount } = calculateTotalUnreadArchivedMessages(usersList);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    setRender(true);
    createEchoInstance();
  }, []);

  let history = [];
  if (typeof window !== "undefined") {
    history = localStorage?.searchHistory
      ? JSON.parse(localStorage?.searchHistory)
      : [];
  }

  useEffect(() => {
    if (history.length > 0 && searchHistory.length == 0) {
      setSearchHistory(history);
      setSuggestionList(history);
    }
  }, [history]);



  const NavigateHandler = (route) => router.push(route);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(() => {
    dispatch(HeaderList());
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [anchorMenuMessage, setAnchorMenuMessage] = React.useState(null);
  const [menuData, setMenuData] = React.useState<any>("");
  const messagesSlideInRef = useRef(null);
  const productSlideInRef = useRef(null);
  const favoriteSlideInRef = useRef(null);
  const userSlideInRef = useRef(null);
  const messagesRef = useRef(null);
  const productRef = useRef(null);
  const cartRef = useRef(null);
  const favoriteRef = useRef(null);
  const userRef = useRef(null);
  const currencyRef = useRef(null);
  const languageRef = useRef(null);
  const openMenu = Boolean(anchorMenu);
  const openMessage = Boolean(anchorMenuMessage);

  const [searchLoader, setSearchLoader] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [searchItem, setSearchItem] = useState<any>({ value: "", view: "" });
  const { user_info } = useSelector((state: any) => state?.userData);

  const productButtonRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousemove", function (event) {
      const x = event.clientX;
      const y = event.clientY;
      const hoveredElement = document.elementFromPoint(x, y);

      const navigationWrapper = document.querySelector(".GlobalNavigation");
      if (
        productButtonRef.current &&
        productButtonRef.current.contains(event.target as Node)
      ) {
        setActive("category");
        setAnchor(event.target);
        setDrawer(true);
      } else if (
        navigationWrapper &&
        navigationWrapper.contains(event.target as Node)
      ) {
        setActive("category");
        setAnchor(event.target);
        setDrawer(true);
      } else {
        setActive("");
        setAnchor(null);
        setDrawer(false);
      }
      const headerPopover = document.querySelector(".header_popover");
      const isSelectOptionOpen =
        document.querySelector(".popover_options") !== null;

      const logOptionsSlideIn = document.querySelectorAll(
        ".logoptions_slideIn"
      );
      const logOptionsSlideInArray = Array.from(logOptionsSlideIn);

      // if (
      //   !isSelectOptionOpen &&
      //   !(headerPopover && headerPopover.contains(hoveredElement)) &&
      //   !logOptionsSlideInArray.some((element) =>
      //     element.contains(hoveredElement)
      //   )
      // ) {
      //   setShowPopup(false);
      //   setAnchorMenuMessage(null);
      // }
    });
  }, []);

  const handleMouseLeave = () => {
    document.body.classList.remove("hovered-image");
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  useEffect(() => {
    localStorage?.getItem("userData") &&
      setMenuData(JSON.parse(localStorage?.getItem("userData")));
    setSearchItem({
      value: name,
      view: name,
    });
  }, []);

  menuData?.email;

  let openDrawer = Boolean(anchor);
  useEffect(() => {
    if (asPath === "/") setActive("home");
    if (asPath === "/about-us") setActive("about-us");
    if (asPath === "/contact-us") setActive("contact-us");
  }, [asPath]);
  useEffect(() => {
    if (active === "category" && !openDrawer) {
      if (asPath === "/") setActive("home");
      if (asPath === "/about-us") setActive("about-us");
      if (asPath === "/contact-us") setActive("contact-us");
    }
  }, [openDrawer, asPath]);

 
  const FetchSuggestionList = React.useRef(
    _debounce(async (keyword: string) => {
      if (keyword) {
        setSearchLoader(true);
        try {
          const response = await apiClient(
            `front/product/list/productSearch?query=${keyword}`,
            "get"
          );

          if (response.status === 200) {
            console.log("Search Keyword:", keyword);
            setSuggestionList(
              response.results.map((v: any) => ({
                value: v.slug,
                view: v.title,
                history: false,
              }))
            );
          }
        } catch (error) {
        } finally {
          setSearchLoader(false);
        }
      }
    }, 500)
  ).current;

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    let response = await apiClient("unit/all", "get");
    if (response?.data) {
      dispatch(setUnit(response?.data));
      dispatch(AddUnitList(response?.data));
    }
  };
  const router = useRouter();

  const [anchorLanguageCurrency, setAnchorE2] =
    React.useState<null | HTMLElement>(null);
  const handleClickCurrency = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    dispatch(setNotification(false));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClose()}
      >
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );

  interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
  }

  const options = ["Option 1", "Option 2", "Option 3"];
  const [isFixed, setIsFixed] = useState(false);
  const [sliderContentType, setSliderContentType] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer2 = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [openDrawerInner, setOpen] = useState(false);
  const handleClick = (type = "") => {
    setSliderContentType(type);
    setOpen((prev) => !prev);
  };

  const getPopupComponent = () => {
    switch (value) {
      case "welcome":
        return (
          <WelcomePopupData
            menuData={user_info}
            setUserBasicInfo={setUserBasicInfo}
            setAnchorMenuMessage={setAnchorMenuMessage}
          />
        );
      
      case "order":
        return <OrderPopupData setAnchorMenuMessage={setAnchorMenuMessage} />;
      case "whishlist":
        return (
          <WishlistPopupData setAnchorMenuMessage={setAnchorMenuMessage} />
        );
      case "currencylanguage":
        return (
          <CurrencylanguageData setAnchorMenuMessage={setAnchorMenuMessage} />
        );
      case "country":
        return <CountryData setAnchorMenuMessage={setAnchorMenuMessage} />;
      default:
        "null";
    }
  };

  const handleMouseEnter = (event, value, ref, disableScroll = false) => {
    setValue(value);
    setAnchorMenu(ref?.current);
    setAnchorMenuMessage(event.currentTarget);
    setShowPopup(true);
    if (disableScroll) document.body.classList.add("hovered-image");
  };

  const [scrollHeaderVisible, setScrollHeaderVisible] = useState(false);
  const handleScrollHeader = () => {
    const isProductDetailPage = pathname?.includes("/productdetail");
    const element = document.querySelector(".icon-payment-new");

    if (element && isProductDetailPage) {
      const elementPosition = element.getBoundingClientRect().top;
      if (elementPosition <= 120) {
        setScrollHeaderVisible(true);
      } else {
        setScrollHeaderVisible(false);
      }
    } else if (window.scrollY > 100 && !isProductDetailPage) {
      setScrollHeaderVisible(true);
    } else if (window.scrollY > 600 && isProductDetailPage) {
      setScrollHeaderVisible(true);
    } else {
      setScrollHeaderVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollHeader);
    return () => {
      window.removeEventListener("scroll", handleScrollHeader);
    };
  }, []);

  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [hideHeader, setHideHeader] = useState(false);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollPos = window.pageYOffset;

      const element = document.querySelector(".icon-payment-new");
      if (element) {
        const ele = element.getBoundingClientRect();
        if (ele.x >= currentScrollPos) {
          setHideHeader(true);
        } else {
          setHideHeader(false);
        }
      }
      setScrollingDown(
        currentScrollPos > prevScrollPos && currentScrollPos >= 150
      );
      setPrevScrollPos(currentScrollPos <= 0 ? 0 : currentScrollPos);
    }
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
  React.useEffect(() => {
  }, [suggestionList]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  const isProductDetailPage = pathname?.includes("/productdetail");

  const RemoveHistoryHandler = ({ value }) => {
    let Value = [...searchHistory].filter((v) => v.value != value);
    setSearchHistory(Value);
    setSuggestionList(Value);
    localStorage.setItem("searchHistory", JSON.stringify(Value));
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

  const addQueryParams = (name) => {
    const pathname = "/productlist";
    if (typeof name === "object") {
      name = name?.value;
    }
    const newQuery = name ? { name } : {};
    router.push({ pathname, query: newQuery }, undefined, { shallow: true });
  };

  const isAuthenticated = user_info?.id;

  const navigateToPage = useCallback((pageUrl) => router.push(pageUrl), []);

  useEffect(() => {
    const currencyData = localStorage.getItem("currency");
    if (!currencyData) {
      localStorage.setItem("currency", "1");
    }
  }, []);
  const getSelectedCurrencyAndLanguage = () => {
    const data = JSON.parse(localStorage.getItem("currency_language")) || {};

    const { currency = "1-USD", language = "English" } = data;

    if (!data?.currency || !data?.language) {
      localStorage.setItem(
        "currency_language",
        JSON.stringify(defaultCurrencyAndLanguageHeader)
      );
    }

    return (
      <>
        {language ?? ""}-{currency.split("-")[1] ?? ""}
      </>
    );
  };

  const renderSliderContent = () => {
    if (sliderContentType === "country") {
      return <CountryData setAnchorMenuMessage={setAnchorMenuMessage} />;
    } else {
      return (
        <CurrencylanguageData
          setAnchorMenuMessage={setAnchorMenuMessage}
          closeDrawerFunction={setOpen}
        />
      );
    }
  };
  return (
    <HeaderPartBox>
      <Snackbar
        open={messageRecievedNotification && !popup}
        autoHideDuration={6000}
        onClose={handleClose}
        message="New Message"
        action={action}
      />
      {/* <HeaderPopups
        showPopover={showPopup}
        setShowPopup={setShowPopup}
        handleMouseLeave={handleMouseLeave}
        anchorRef={anchorMenu}
        headerType={value}
      > */}
      <HeaderPopups
        showPopover={showPopup}
        setShowPopup={setShowPopup}
        anchorRef={anchorMenu}
        headerType={value}
      >
        {getPopupComponent()}
      </HeaderPopups>
      {render ? (
        <>
          {openDrawer && (
            <ProductDrawer
              drawer={openDrawer}
              handleClose={() => setAnchor(null)}
              anchor={anchor}
            />
          )}
          <MyCommonHeader>
            <PrimaryAppBar
              position="fixed"
              sx={{
                top: 0,
                left: 0,
                right: 0,
                transform: scrollingDown
                  ? "translateY(-100%)"
                  : "translateY(0)",
                boxShadow: "none",
                border: "none",
              }}
            >
              <div>
                <MyContainer>
                  <AppbarBox>
                    <Toolbar disableGutters>
                      <BlackBarTop>
                        <MyMenuBox>
                          <Box
                            sx={{
                              flexGrow: 1,
                              display: { xs: "flex", md: "flex" },
                            }}
                          >
                            <Button
                              data-tracking="homeButton"
                              onClick={() => {
                                setActive("home");
                                navigateToPage("/");
                              }}
                              className={
                                active === "home" ? "pmenu-active" : ""
                              }
                              disableRipple
                            >
                              Home
                            </Button>
                            <Button
                              onClick={() => {
                                setActive("about-us");
                                navigateToPage("/about-us");
                              }}
                              className={
                                active === "about-us" ? "pmenu-active" : ""
                              }
                              disableRipple
                            >
                              About Us
                            </Button>
                            <Button
                              ref={productButtonRef}
                              className={
                                active === "category" ? "pmenu-active" : ""
                              }
                              disableRipple
                            >
                              Our Products
                            </Button>
                            <Button
                              onClick={() => {
                                setActive("contact-us");
                                navigateToPage("/contact-us");
                              }}
                              className={
                                active === "contact-us" ? "pmenu-active" : ""
                              }
                              disableRipple
                            >
                              Contact Us
                            </Button>
                          </Box>
                        </MyMenuBox>
                        <SelectAndSocialIcons
                          sx={{ flexGrow: 1 }}
                          style={{
                            display: isMobile
                              ? "none"
                              : isTablet
                              ? "none"
                              : "flex",
                          }}
                          className="logoptions_slideIn"
                        >
                          <ForSelectContainer>
                            
                            <DropDownSelect>
                              <CurrencyDropdown
                                ref={languageRef}
                                disableRipple
                                endIcon={<KeyboardArrowDownIcon />}
                                onMouseEnter={(e) =>
                                  handleMouseEnter(
                                    e,
                                    "currencylanguage",
                                    languageRef,
                                    true
                                  )
                                }
                                onMouseLeave={handleMouseLeave}
                              >
                                <i className="icon-language-icon"></i>{" "}
                                {getSelectedCurrencyAndLanguage()}
                              </CurrencyDropdown>
                            </DropDownSelect>
                            <DropDownSelect>
                              <CurrencyDropdown
                                ref={currencyRef}
                                disableRipple
                                endIcon={<KeyboardArrowDownIcon />}
                                onMouseEnter={(e) =>
                                  handleMouseEnter(
                                    e,
                                    "country",
                                    currencyRef,
                                    true
                                  )
                                }
                                onMouseLeave={handleMouseLeave}
                              >
                                <i className="icon-flag-icon"></i> Country
                              </CurrencyDropdown>
                            </DropDownSelect>
                          </ForSelectContainer>
                          <ForSocialContainer>
                            <a
                              href="https://www.facebook.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  ...iconStyles,
                                  "&:hover": {
                                    color: "#3b5998",
                                  },
                                }}
                                aria-label="Facebook"
                              >
                                <FacebookIcon />
                              </IconButton>
                            </a>

                            <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  ...iconStyles,
                                  "&:hover": {
                                    color: "#1da1f2",
                                  },
                                }}
                                aria-label="Twitter"
                              >
                                <XIcon sx={{ fontSize: "13px" }} />
                              </IconButton>
                            </a>

                            <a
                              href="https://www.instagram.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  ...iconStyles,
                                  "&:hover": {
                                    color: "#e4405f",
                                  },
                                }}
                                aria-label="Instagram"
                              >
                                <InstagramIcon />
                              </IconButton>
                            </a>

                            <a
                              href="https://www.linkedin.com/company"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  ...iconStyles,
                                  "&:hover": {
                                    color: "#0077b5",
                                  },
                                }}
                                aria-label="LinkedIn"
                              >
                                <LinkedInIcon />
                              </IconButton>
                            </a>
                          </ForSocialContainer>
                        </SelectAndSocialIcons>
                      </BlackBarTop>
                    </Toolbar>
                  </AppbarBox>
                </MyContainer>
              </div>
            </PrimaryAppBar>
            <SecondaryAppBar
              position="fixed"
              sx={{
                transform: !scrollingDown
                  ? "translateY(40%)"
                  : isProductDetailPage && hideHeader
                  ? "translateY(-100%)"
                  : "translateY(0%)",
                boxShadow: "0 3px 5px -3px #e0e0e0",
              }}
            >
              <FixedAtTop>
                <MyContainer>
                  <HeaderLogoSearch>
                    <LogoSearchRow>
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={3}
                          style={{
                            display: isMobile
                              ? "none"
                              : isTablet
                              ? "none"
                              : "block",
                          }}
                        >
                          <WebLogo
                            onClick={() => {
                              if (asPath !== "/") navigateToPage("/");
                            }}
                            sx={{
                              cursor: "pointer",
                              position: "relative",
                              top: asPath === "/productdetail" ? "0px" : "3px",
                              display: "inline-flex",
                              justifyContent:
                                isMobile || isTablet ? "center" : "flex-start",
                            }}
                          >
                            <img
                              src="/assets/merchantad-logo.png"
                              alt="logo"
                              width="180"
                              height="39"
                            />
                          </WebLogo>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={9}
                          style={{
                            display: isMobile
                              ? "none"
                              : isTablet
                              ? "none"
                              : "block",
                          }}
                        >
                          <SearchbarArea
                            sx={{
                              display: "flex",
                              flexDirection: isMobile ? "column" : "row",
                              alignItems: "center",
                            }}
                          >
                            {/* <AutoSearchbar>
                              <Autocomplete
                                disablePortal
                                defaultValue={name}
                                open={true}
                                disableClearable
                                PopperComponent={CustomPopper}
                                clearIcon={
                                  searchItem?.history ? (
                                    <ClearIcon
                                      style={{ left: "-17px" }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchItem({
                                          value: "",
                                          view: "",
                                          history: false,
                                        });
                                        addQueryParams("");
                                      }}
                                    />
                                  ) : null
                                }
                                freeSolo
                                forcePopupIcon={false}
                                slotProps={{
                                  popper: {
                                    sx: {
                                      zIndex: 10,
                                      "@media (max-width:767px)": {
                                        width: "100% !important",
                                        padding: "10px",
                                      },
                                    },
                                  },
                                }}
                                size="small"
                                onInputChange={(e: any) => {
                                  const value = e?.target?.value;
                                  if (value) {
                                    FetchSuggestionList(value);
                                    setSearchItem({
                                      value,
                                      view: value,
                                      history: false,
                                    });
                                  } else {
                                    setSearchItem({
                                      value: "",
                                      view: "",
                                      history: false,
                                    });
                                  }
                                }}
                                id="product-list-autocomplete"
                                sx={{
                                  width: "100%",
                                }}
                                getOptionLabel={(option) => option.view || ""}
                                options={suggestionList}
                                onChange={(e, newValue) => {
                                  if (newValue) {
                                    searchHistoryHandler(newValue);
                                    setSearchItem(newValue);
                                    addQueryParams(newValue.view);
                                  }
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
                                      "& div": {
                                        fontSize: "13px !important",
                                        padding: "3px 0px",
                                        color: "#231f20",
                                      },
                                      padding: "3px 8px!important",
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
                                          "@media (max-width:767px)": {
                                            paddingTop: "2px",
                                            paddingBottom: "2px",
                                          },
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
                                    {...params}
                                    placeholder="Enter a keyword to search products"
                                    InputProps={{
                                      ...params.InputProps,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <LightTooltip
                                            placement="bottom"
                                            arrow
                                            title="Coming Soon"
                                            disableInteractive
                                          >
                                            <IconButton
                                              edge="end"
                                              aria-label="search"
                                            >
                                              <CameraAltOutlinedIcon />
                                            </IconButton>
                                          </LightTooltip>
                                          <Button
                                            className="searchaction"
                                            onClick={() => {
                                              addQueryParams(searchItem);
                                            }}
                                          >
                                            Search
                                          </Button>
                                          {params.InputProps.endAdornment}
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                )}
                              />
                            </AutoSearchbar> */}
                            <HeaderSearchBar />
                            <OtherClickOption
                              sx={{
                                display: "flex",
                                flexDirection: isMobile ? "row" : "row",
                                alignItems: "center",
                              }}
                            >
                              {!user_info?.id ? (
                                <OtherClickOption
                                  sx={{
                                    display: "flex",
                                    flexDirection: isMobile ? "row" : "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <OptionClickBox>
                                    wishlist icon
                                  </OptionClickBox>
                                  <OptionClickBox>
                                    Cart Icon
                                  </OptionClickBox>
                                 
                                  
                                  <OptionClickBox>
                                    <img
                                      src="/assets/images/log-in.svg"
                                      alt="log"
                                      style={{ width: "20px" }}
                                    />
                                    <HeaderSupplierLogInfo>
                                      <Typography variant="body2">
                                        Welcome
                                      </Typography>
                                      <Typography variant="h4">
                                        <Link href="/user/signin">Sign In</Link>{" "}
                                        /{" "}
                                        <Link href="/user/signup">
                                          Register
                                        </Link>
                                      </Typography>
                                    </HeaderSupplierLogInfo>
                                  </OptionClickBox>
                                </OtherClickOption>
                              ) : (
                                <AfterLoginOptions className="logoptions_slideIn logoption2">
                                 
                                  
                                  <ALoginBox>
                                    <Badge
                                      badgeContent={wishListData?.length || 0}
                                      color="primary"
                                    >
                                      <FavoriteBorderIcon
                                        ref={favoriteRef}
                                        onMouseEnter={(e) =>
                                          handleMouseEnter(
                                            e,
                                            "whishlist",
                                            favoriteRef
                                          )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        onClick={(e) =>
                                          NavigateHandler("/wishlist")
                                        }
                                      />
                                    </Badge>
                                    </ALoginBox>
                                    
                                    <ALoginBox>
                                      <Badge
                                        badgeContent={0}
                                        color="primary"
                                      >
                                        <ShoppingCartOutlinedIcon
                                          ref={cartRef}
                                          onMouseEnter={(e) =>
                                            handleMouseEnter(e, "cart", cartRef)
                                          }
                                          onMouseLeave={handleMouseLeave}
                                          onClick={() => NavigateHandler("/cart")}
                                        />
                                      </Badge>
                                    </ALoginBox>
                                  <ALoginBox>
                                    <img
                                      src="/assets/images/header/user-icon.png"
                                      alt=""
                                      ref={userRef}
                                      onMouseEnter={(e) =>
                                        handleMouseEnter(e, "welcome", userRef)
                                      }
                                      onMouseLeave={handleMouseLeave}
                                    />
                                  </ALoginBox>
                                </AfterLoginOptions>
                              )}
                            </OtherClickOption>
                          </SearchbarArea>
                        </Grid>

                        {isTablet && (
                          <>
                            <Grid item xs={12} sm={12}>
                              <LogoQuotationText>
                                <MenuAndLogo>
                                  <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer2(true)}
                                  >
                                    <MenuIcon />
                                  </IconButton>
                                  <Drawer
                                    anchor="left"
                                    open={drawerOpen}
                                    onClose={toggleDrawer2(false)}
                                  >
                                    <DrawerWidthBox role="presentation">
                                      <ClickDrawerInner>
                                        <ForSpaceSection>
                                          <CancelOption>
                                            <CloseRoundedIcon
                                              onClick={toggleDrawer2(false)}
                                              onKeyDown={toggleDrawer2(false)}
                                            />
                                            <Typography>Menu</Typography>
                                          </CancelOption>
                                          {!isAuthenticated && (
                                            <ButtonOptionsClick>
                                              <Button
                                                variant="contained"
                                                onClick={() =>
                                                  navigateToPage("/user/signin")
                                                }
                                              >
                                                Sign in
                                              </Button>
                                              <Button
                                                variant="contained"
                                                onClick={() =>
                                                  navigateToPage("/user/signup")
                                                }
                                              >
                                                Sign up
                                              </Button>
                                            </ButtonOptionsClick>
                                          )}
                                          <NavInDrawer>
                                            <MenuList>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage("/");
                                                  }}
                                                >
                                                  Home
                                                </ListItemText>
                                              </MenuItem>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage("/about-us");
                                                  }}
                                                >
                                                  About Us
                                                </ListItemText>
                                              </MenuItem>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage(
                                                      "/our-products"
                                                    );
                                                  }}
                                                >
                                                  Our Products
                                                </ListItemText>
                                              </MenuItem>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage(
                                                      "/contact-us"
                                                    );
                                                  }}
                                                >
                                                  Contact Us
                                                </ListItemText>
                                              </MenuItem>
                                              
                                            </MenuList>
                                          </NavInDrawer>
                                        </ForSpaceSection>
                                        <Divider />

                                        <LanguageCountryBox>
                                          <ImgCountryLabel
                                            onClick={() =>
                                              handleClick("currency-language")
                                            }
                                          >
                                            <Typography>
                                              <i className="icon-language-icon"></i>
                                              {getSelectedCurrencyAndLanguage()}
                                            </Typography>
                                            <KeyboardArrowRightRoundedIcon />
                                          </ImgCountryLabel>
                                          <Divider />
                                          <ImgCountryLabel
                                            onClick={() =>
                                              handleClick("country")
                                            }
                                          >
                                            <Typography>
                                              <i className="icon-flag-icon"></i>
                                              Country
                                            </Typography>
                                            <KeyboardArrowRightRoundedIcon />
                                          </ImgCountryLabel>
                                        </LanguageCountryBox>
                                        <Divider />
                                        <ForSocialContainer>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#3b5998",
                                              },
                                            }}
                                            aria-label="Facebook"
                                          >
                                            <FacebookIcon />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#1da1f2",
                                              },
                                            }}
                                            aria-label="Twitter"
                                          >
                                            <XIcon sx={{ fontSize: "13px" }} />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#e4405f",
                                              },
                                            }}
                                            aria-label="Instagram"
                                          >
                                            <InstagramIcon />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#0077b5",
                                              },
                                            }}
                                            aria-label="LinkedIn"
                                          >
                                            <LinkedInIcon />
                                          </IconButton>
                                        </ForSocialContainer>
                                        <div>
                                          <Slide
                                            direction="left"
                                            in={openDrawerInner}
                                            timeout={1000}
                                            mountOnEnter
                                            unmountOnExit
                                          >
                                            <OnClickLanguageCountryBox
                                              className={
                                                openDrawerInner
                                                  ? "content-box active"
                                                  : "content-box"
                                              }
                                            >
                                              <KeyboardArrowLeftRoundedIcon
                                                onClick={() => setOpen(false)}
                                              />
                                              <List>
                                                {renderSliderContent()}
                                              </List>
                                            </OnClickLanguageCountryBox>
                                          </Slide>
                                        </div>
                                      </ClickDrawerInner>
                                    </DrawerWidthBox>
                                  </Drawer>
                                  <img
                                  onClick={() => {
                                    if (asPath !== "/") navigateToPage("/");
                                  }}
                                    className="Imagelogo"
                                    src="/assets/merchantad-logo.png"
                                    alt="logo"
                                    style={{ width: "140px" }}
                                  />
                                </MenuAndLogo>
                                {!isAuthenticated ? (
                                  <OtherClickOption
                                    sx={{
                                      display: "flex",
                                      flexDirection: isMobile ? "row" : "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    
                                    
                                    <OptionClickBox>
                                      <img
                                        src="/assets/images/log-in.svg"
                                        alt="log"
                                        style={{ width: "20px" }}
                                      />
                                      <HeaderSupplierLogInfo>
                                        <Typography variant="body2">
                                          Welcome
                                        </Typography>
                                        <Typography variant="h4">
                                          <Link href="/user/signin">
                                            Sign In
                                          </Link>{" "}
                                          /{" "}
                                          <Link href="/user/signup">
                                            Register
                                          </Link>
                                        </Typography>
                                      </HeaderSupplierLogInfo>
                                    </OptionClickBox>
                                  </OtherClickOption>
                                ) : (
                                  <AfterLoginOptions className="logoptions_slideIn logoption2">
                                    
                                    <ALoginBox>
                                      <Badge
                                        badgeContent={0}
                                        color="primary"
                                      >
                                        <ShoppingCartOutlinedIcon
                                          ref={cartRef}
                                          onMouseEnter={(e) =>
                                            handleMouseEnter(e, "cart", cartRef)
                                          }
                                          onMouseLeave={handleMouseLeave}
                                          onClick={() => NavigateHandler("/cart")}
                                        />
                                      </Badge>
                                    </ALoginBox>
                                    <ALoginBox>
                                      <Badge badgeContent={2} color="primary">
                                        <FavoriteBorderIcon
                                          ref={favoriteRef}
                                          onMouseEnter={(e) =>
                                            handleMouseEnter(
                                              e,
                                              "whishlist",
                                              favoriteRef
                                            )
                                          }
                                          onMouseLeave={handleMouseLeave}
                                          onClick={(e) =>
                                            NavigateHandler("/wishlist")
                                          }
                                        />
                                      </Badge>
                                      </ALoginBox>
                                      
                                      
                                    
                                    <ALoginBox>
                                      <img
                                        src="/assets/images/header/user-icon.png"
                                        alt=""
                                        ref={userRef}
                                        onMouseEnter={(e) =>
                                          handleMouseEnter(
                                            e,
                                            "welcome",
                                            userRef
                                          )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                      />
                                    </ALoginBox>
                                  </AfterLoginOptions>
                                )}
                              </LogoQuotationText>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                {/* <AutoSearchbar>
                                  <Autocomplete
                                    size="small"
                                    freeSolo
                                    id="free-solo-2-demo"
                                    options={options}
                                    disableClearable
                                    renderInput={(params) => (
                                      <TextField
                                        size="small"
                                        sx={{
                                          "& .MuiFormLabel-root": {
                                            fontSize: "0.8rem",
                                          },
                                        }}
                                        {...params}
                                        placeholder="Enter a keyword to search products"
                                        InputProps={{
                                          ...params.InputProps,
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <IconButton
                                                edge="end"
                                                aria-label="search"
                                              >
                                                <CameraAltOutlinedIcon />
                                              </IconButton>
                                              <Button
                                                className="searchaction"
                                                onClick={() => {}}
                                              >
                                                Search
                                              </Button>
                                              {params.InputProps.endAdornment}
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    )}
                                  />
                                </AutoSearchbar> */}
                                <HeaderSearchBar />
                                <ViewAllCategoriesLink
                                  onClick={(e) =>
                                    navigateToPage("/category/list")
                                  }
                                >
                                  <CategoriesLinkBtn
                                    variant="outlined"
                                    startIcon={<FormatListBulletedIcon />}
                                  >
                                    View All Categories
                                  </CategoriesLinkBtn>
                                </ViewAllCategoriesLink>
                              </Box>
                            </Grid>
                          </>
                        )}
                        {isMobile && (
                          <>
                            <Grid item xs={12} sm={12}>
                              <LogoQuotationText>
                                <MenuAndLogo>
                                  <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer2(true)}
                                  >
                                    <MenuIcon />
                                  </IconButton>
                                  <Drawer
                                    anchor="left"
                                    open={drawerOpen}
                                    onClose={toggleDrawer2(false)}
                                    sx={{ overflow: "hidden" }}
                                  >
                                    <DrawerWidthBox role="presentation">
                                      <ClickDrawerInner>
                                        <ForSpaceSection>
                                          <CancelOption>
                                            <CloseRoundedIcon
                                              onClick={toggleDrawer2(false)}
                                              onKeyDown={toggleDrawer2(false)}
                                            />
                                            <Typography>Menu</Typography>
                                          </CancelOption>
                                          {!isAuthenticated && (
                                            <ButtonOptionsClick>
                                              <Button
                                                variant="contained"
                                                onClick={() =>
                                                  navigateToPage("/user/signin")
                                                }
                                              >
                                                Sign in
                                              </Button>
                                              <Button
                                                variant="contained"
                                                onClick={() =>
                                                  navigateToPage("/user/signup")
                                                }
                                              >
                                                Sign up
                                              </Button>
                                            </ButtonOptionsClick>
                                          )}
                                          <NavInDrawer>
                                            <MenuList>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    router.push("/");
                                                  }}
                                                >
                                                  Home
                                                </ListItemText>
                                              </MenuItem>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage("/about-us");
                                                  }}
                                                >
                                                  About Us
                                                </ListItemText>
                                              </MenuItem>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage(
                                                      "/our-products"
                                                    );
                                                  }}
                                                >
                                                  Our Products
                                                </ListItemText>
                                              </MenuItem>
                                              <MenuItem disableRipple>
                                                <ListItemText
                                                  onClick={() => {
                                                    navigateToPage(
                                                      "/contact-us"
                                                    );
                                                  }}
                                                >
                                                  Contact Us
                                                </ListItemText>
                                              </MenuItem>
                                              
                                            </MenuList>
                                          </NavInDrawer>
                                        </ForSpaceSection>
                                        <Divider />

                                        <LanguageCountryBox onMouseLeave={()=> {setShowPopup(false);
         setAnchorMenuMessage(null);}}>
                                          <ImgCountryLabel
                                            onClick={() =>
                                              handleClick("currency-language")
                                            }
                                          >
                                            <Typography>
                                              <i className="icon-language-icon"></i>
                                              {getSelectedCurrencyAndLanguage()}--
                                            </Typography>
                                            <KeyboardArrowRightRoundedIcon />
                                          </ImgCountryLabel>
                                          <Divider />
                                          <ImgCountryLabel
                                            onClick={() =>
                                              handleClick("country")
                                            }
                                          >
                                            <Typography>
                                              <i className="icon-flag-icon"></i>
                                              Country
                                            </Typography>

                                            <KeyboardArrowRightRoundedIcon />
                                          </ImgCountryLabel>
                                        </LanguageCountryBox>
                                        <Divider />
                                        <ForSocialContainer>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#3b5998",
                                              },
                                            }}
                                            aria-label="Facebook"
                                          >
                                            <FacebookIcon />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#1da1f2",
                                              },
                                            }}
                                            aria-label="Twitter"
                                          >
                                            <XIcon sx={{ fontSize: "13px" }} />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#e4405f",
                                              },
                                            }}
                                            aria-label="Instagram"
                                          >
                                            <InstagramIcon />
                                          </IconButton>
                                          <IconButton
                                            size="small"
                                            sx={{
                                              ...iconStyles,
                                              "&:hover": {
                                                color: "#0077b5",
                                              },
                                            }}
                                            aria-label="LinkedIn"
                                          >
                                            <LinkedInIcon />
                                          </IconButton>
                                        </ForSocialContainer>
                                        <div>
                                          <Slide
                                            direction="left"
                                            in={openDrawerInner}
                                            timeout={1000}
                                            mountOnEnter
                                            unmountOnExit
                                          >
                                            <OnClickLanguageCountryBox
                                              className={
                                                openDrawerInner
                                                  ? "content-box active"
                                                  : "content-box"
                                              }
                                            >
                                              <KeyboardArrowLeftRoundedIcon
                                                sx={{
                                                  fontSize: "25px",
                                                  margin: "0 0 -10px -5px",
                                                }}
                                                onClick={() => setOpen(false)}
                                              />
                                              <List>
                                                {renderSliderContent()}
                                              </List>
                                            </OnClickLanguageCountryBox>
                                          </Slide>
                                        </div>
                                      </ClickDrawerInner>
                                    </DrawerWidthBox>
                                  </Drawer>
                                  <img
                                    onClick={() => {
                                      router.push("/");
                                    }}
                                    className="Imagelogo"
                                    src="/assets/merchantad-logo.png"
                                    alt="logo"
                                    style={{ width: "140px" }}
                                  />
                                </MenuAndLogo>
                                {!isAuthenticated ? (
                                  <OtherClickOption
                                    sx={{
                                      display: "flex",
                                      flexDirection: isMobile ? "row" : "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    {/* <OptionClickBox>
                                      <img
                                        src="/assets/images/supplier-img.svg"
                                        alt="Supplier"
                                      />
                                    </OptionClickBox>
                                    <OptionClickBox>
                                      <img
                                        className="qutation-mobile"
                                        src="/assets/images/quotation.svg"
                                        alt="Quotation"
                                        style={{ width: "20px" }}
                                      />
                                    </OptionClickBox> */}


                                    <ALoginBox>
                                    <Badge
                                      badgeContent={wishListData?.length || 0}
                                      color="primary"
                                    >
                                      <FavoriteBorderIcon
                                        ref={favoriteRef}
                                        onMouseEnter={(e) =>
                                          handleMouseEnter(
                                            e,
                                            "whishlist",
                                            favoriteRef
                                          )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        onClick={(e) =>
                                          NavigateHandler("/wishlist")
                                        }
                                      />
                                    </Badge>
                                    </ALoginBox>
                                    
                                    <ALoginBox>
                                      <Badge
                                        badgeContent={0}
                                        color="primary"
                                      >
                                        <ShoppingCartOutlinedIcon
                                          ref={cartRef}
                                          onMouseEnter={(e) =>
                                            handleMouseEnter(e, "cart", cartRef)
                                          }
                                          onMouseLeave={handleMouseLeave}
                                          onClick={() => NavigateHandler("/cart")}
                                        />
                                      </Badge>
                                    </ALoginBox>







                                  </OtherClickOption>
                                ) : (
                                  <AfterLoginOptions className="logoptions_slideIn logoption2">
                                    <ALoginBox>
                                      <Badge badgeContent={2} color="primary">
                                        <FavoriteBorderIcon ref={favoriteRef} />
                                      </Badge>
                                    </ALoginBox>
                                    <ALoginBox>
                                      <img
                                        src="/assets/images/header/user-icon.png"
                                        alt=""
                                        ref={userRef}
                                        onMouseEnter={(e) =>
                                          handleMouseEnter(
                                            e,
                                            "welcome",
                                            userRef
                                          )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                      />
                                    </ALoginBox>
                                  </AfterLoginOptions>
                                )}
                              </LogoQuotationText>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              {/* <AutoSearchbar>
                                <Autocomplete
                                  size="small"
                                  freeSolo
                                  id="free-solo-2-demo"
                                  options={options}
                                  disableClearable
                                  renderInput={(params) => (
                                    <TextField
                                      size="small"
                                      sx={{
                                        "& .MuiFormLabel-root": {
                                          fontSize: "0.8rem",
                                        },
                                      }}
                                      {...params}
                                      placeholder="Search Your products"
                                      InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              edge="end"
                                              aria-label="search"
                                            >
                                              <CameraAltOutlinedIcon />
                                            </IconButton>
                                            <Button
                                              className="searchaction"
                                              onClick={() => {
                                                console.log(
                                                  "Search button clicked"
                                                );
                                              }}
                                            >
                                              <SearchRoundedIcon />
                                            </Button>
                                            {params.InputProps.endAdornment}
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  )}
                                />
                              </AutoSearchbar> */}
                              <HeaderSearchBar />
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </LogoSearchRow>
                  </HeaderLogoSearch>
                </MyContainer>
                <MainSectorsRow sx={{ backgroundColor: "#fff", color: "#fff" }}>
                  <Box
                    sx={{ position: "relative" }}
                    style={{
                      display: isMobile ? "none" : "block",
                    }}
                  >
                    <MyContainer>
                      <OurCategoryTab />
                    </MyContainer>
                  </Box>
                  {isMobile && (
                    <>
                      <Box sx={{ position: "relative" }}>
                        <MyContainer>
                          <MainSectorsRowInner>
                            <SectorSctroll>
                              <OurCategoryTab />
                            </SectorSctroll>
                            <ViewAllCategoriesLinkMobile
                              onClick={(e) => navigateToPage("/category/list")}
                            >
                              <CategoriesLinkBtn
                                variant="outlined"
                                startIcon={<FormatListBulletedIcon />}
                                disableRipple
                              >
                                Categories
                              </CategoriesLinkBtn>
                            </ViewAllCategoriesLinkMobile>
                          </MainSectorsRowInner>
                        </MyContainer>
                      </Box>
                    </>
                  )}
                </MainSectorsRow>
              </FixedAtTop>
            </SecondaryAppBar>
          </MyCommonHeader>
        </>
      ) : null}
    </HeaderPartBox>
  );
};
export default HeaderPage;

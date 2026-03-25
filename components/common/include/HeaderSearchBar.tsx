import { setUserBasicInfo } from "@/hooks/appReducers";
import {
  setNotification
} from "@/hooks/ChatReducer";
import { setUnit } from "@/hooks/HeaderHooks";
import { AddUnitList } from "@/hooks/productDetailsReducer";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Popper, styled, Typography, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiClient,
  calculateTotalUnreadArchivedMessages
} from "../common";
import { AutoSearchbar, useStyles } from "./style";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppBar from "@mui/material/AppBar";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/system";
import WelcomePopupData from "./WelcomePopupData";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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
// import MessagesPopupData from "./MessagesPopupData";
import { IconsGap, Svgabsolute } from "@/components/ProductsListing/style";
import HistoryIcon from "@mui/icons-material/History";
import { ClearIcon } from "@mui/x-date-pickers";
import _debounce from "lodash/debounce";
import { usePathname } from "next/navigation";
import CountryData from "./CountryData";
import CurrencylanguageData from "./CurrencylanguageData";
import OrderPopupData from "./OrderPopupData";
import WishlistPopupData from "./WishlistPopupData";
// import { updateUserListWithMessage } from "@/components/Chat/common/commonFunctions";
import { defaultCurrencyAndLanguageHeader } from "../header/headerStaticValues";
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

export default function HeaderSearchBar() {
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
  const [isFocused, setIsFocused] = useState(false);

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
    // createEchoInstance();
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

  /*

  const updateUsersList = useCallback(
    (e) => {
      const {
        userList: { data: userData },
        messageData,
      } = e || {};
      const {
        request_status = "",
        sender_id,
        message_type,
        room_id,
        transferred_to_user_id,
        transferred_from_user_id,
        is_owner,
        is_transfer,
        userName,
        id: messageId,
      } = messageData || {};
      if (+sender_id === +currentLoggedInUsedId && message_type !== "log")
        return;
      if (!popup && +messageData?.room_id === +activeUser?.room_id) {
        const updatedMessageData = {
          ...messageData,
          user_name: userName,
          messageId,
        };
        dispatch(UpdateChat([updatedMessageData]));
      }

      const { activeUsersArray, pendingRequests } = Object.entries(
        userData
      ).reduce(
        (acc, [key, value]: any) => {
          if (key === "pendingRequest" && value?.data) {
            acc.pendingRequests.push(value?.data);
          } else if (value) {
            acc.activeUsersArray.push(value);
          }
          return acc;
        },
        { activeUsersArray: [], pendingRequests: [] }
      );
      const combinedUsers = [...activeUsersArray, ...pendingRequests[0]];

      if (!messageData) {
        dispatch(setActiveUser({}));
        dispatch(replaceChat([]));
        dispatch(setUsersList(combinedUsers));
        return;
      }
      const updateActiveUserData = () => {
        if (activeUser && Object.keys(activeUser).length === 0) return;
        const matchingUser = activeUsersArray?.find(
          (user) => +user?.room_id === +messageData?.room_id
        );
        const { group_users = [], is_transfer = "" } = matchingUser || {};

        const updatedUserDetails = {
          ...activeUser,
          is_transfer:
            is_transfer === 1
              ? is_transfer
              : group_users?.length > 2
              ? is_transfer
              : 0,
          group_users,
        };
        dispatch(setActiveUser(updatedUserDetails));
      };
      if (
        message_type === "log" &&
        +room_id === +activeUser?.room_id &&
        (+transferred_to_user_id === +currentLoggedInUsedId ||
          (transferred_from_user_id === +currentLoggedInUsedId && is_owner))
      )
        updateActiveUserData();
      const updatedUsersLists =
        +activeUser?.room_id === +messageData?.room_id && popup
          ? updateUserListWithMessage(
              combinedUsers,
              messageData,
              currentLoggedInUsedId,
              activeUser
            )
          : combinedUsers;
      const pendingRequestUserLists = updatedUsersLists?.filter(
        (user) => user?.request_status === "pending"
      );
      const approvedRequestUserLists = updatedUsersLists?.filter(
        (user) => user?.request_status !== "pending"
      );
      dispatch(
        request_status === "pending"
          ? setChatRequestList(pendingRequestUserLists)
          : setUsersList(approvedRequestUserLists)
      );
    },
    [usersList, activeUser, dispatch, popup]
  );

  

  useEffect(() => {
    const currentLoggedUserId = getUserIdLocalStorage();
    if (currentLoggedUserId) {
      (window as any).Echo?.private(`notifications.${currentLoggedUserId}`)
        .listen("UserNotification", updateUsersList)
        .error((error) => {
          console.error("Error connecting to notifications channel:", error);
        });
    }

    return () => {
      (window as any).Echo?.private(
        `notifications.${currentLoggedUserId}`
      ).stopListening("UserNotification", updateUsersList);
    };
  }, [updateUsersList]);

  */

  const NavigateHandler = (route) => router.push(route);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // useEffect(() => {
  //   dispatch(HeaderList());
  // }, []);

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

      if (
        !isSelectOptionOpen &&
        !(headerPopover && headerPopover.contains(hoveredElement)) &&
        !logOptionsSlideInArray.some((element) =>
          element.contains(hoveredElement)
        )
      ) {
        setShowPopup(false);
        setAnchorMenuMessage(null);
      }
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

          console.log(response, "response_1000");
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

  // useEffect(() => {
  //   fetchUnits();
  // }, []);

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
  const setStateValue = useCallback(() => {
    if (typeof router?.query?.name === "undefined") {
      setSearchItem({
        value: "",
        view: "",
        history: false,
      });
    }
  }, [router.query.name]);

  useEffect(() => {
    setStateValue();
  }, [router.query]);

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
    // searchInput.current.focus()
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
      setScrollingDown(currentScrollPos > prevScrollPos);
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
  React.useEffect(() => {}, [suggestionList]);

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
    try {
      apiClient(`front/product/seached_keyword/productSearch`, "post", {
        body: {
          name: name,
          user_id: user_info?.id,
        },
      });
    } catch (error) {}
    router.push({ pathname, query: newQuery }, undefined, { shallow: true });
  };

  const isAuthenticated = user_info?.id;

  const navigateToPage = useCallback((pageUrl) => router.push(pageUrl), []);

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
    <>
      <AutoSearchbar>
        <Autocomplete
          disablePortal
          // defaultValue={name}
          disableClearable
          onBlur={() => {
            // setSearchItem({ value: "", view: "" })
            setSuggestionList([]);
          }}
          onFocus={() => {
            setSuggestionList(history);
          }}
          PopperComponent={CustomPopper}
          open={isFocused && suggestionList.length > 0}
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
                "@media (max-width:600px)": {
                  width: "100% !important",
                  padding: "10px",
                },
              },
            },
          }}
          size="small"
          onInputChange={(e: any) => {
            if (!e || e.key === "Enter") return;
            const value = e?.target?.value;
            if (value) {
              setSuggestionList([]);
              FetchSuggestionList(value);
              setSearchItem({
                value,
                view: value,
                history: false,
              });
            } else {
              setSuggestionList(searchHistory);
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
              setSuggestionList([]);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHistoryHandler(searchItem);
              addQueryParams(searchItem.value);
              addQueryParams(searchItem.value);
              setSuggestionList([]);
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
              placeholder="Search for products..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    
                    <Button
                      className="searchaction"
                      onClick={() => {
                        addQueryParams(searchItem);
                      }}
                    >
                      {isMobile && <SearchRoundedIcon />}
                      {!isMobile && <Typography>Search</Typography>}
                    </Button>
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </AutoSearchbar>
    </>
  );
}

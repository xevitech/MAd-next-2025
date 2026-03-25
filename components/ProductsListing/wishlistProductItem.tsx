import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  apiClient,
  CurrencySymbol,
  fetchChatHistory,
  getUserIdLocalStorage,
  Navigate,
} from "../common/common";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import { setSingleProductId } from "@/hooks/UseProductListContext";
import { toast } from "react-toastify";
import { countriesList } from "@/utils/countriesphp";
import {
  chatWindowPopup,
  replaceChat,
  setActiveUser,
  setRoomId,
  setUsersList,
} from "@/hooks/ChatReducer";
import { Box, Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import { BootstrapDialog } from "../Chat/style";
import QuickSignup from "../auth/quickSignup/QuickSignup";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";
import {
  ByOrderTypography,
  ContentFlewView,
  Doneicon,
  InStockTypography,
  ProductItemInfoCard,
  ProductItemInfoCardOuter,
  ProductsmallTypography,
  ProductTitleTypo,
  SeparationDots,
} from "./style";
import { LightTooltip } from "../common/Tooltip/tooltip";
import ProductModule from "./product.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CustomSlider from "./CustomSlider";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ThreeDots } from "react-loader-spinner";
import { CompanyName, ProductHeadePriceButton } from "./ProductListing.styled";
import Swal from "sweetalert2";
import { CheckBoxStyle } from "../profile/common";
import Login from "../ProductDetail/ProductComponents/Modal/Login";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { getBussinessTypeIcon } from "../Helper";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
const WishlistProductItem = (props) => {
  const { data, onSelect, isSelected, label_id = "", FetchWishListFunction, fetchLebalList } = props;
  const [openModal, setModal] = useState(false);
  const [Favourite, setFavourite] = useState(data?.wishList);
  const [showLoader, setShowLoader] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSignPopup, setShowSignPopup] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(true);
  const {
    detail: { data: productData = {} },
  } = useSelector((state: any) => state.productDetail);
  const {
    user_id: userIdLocalStorage = "",
    seller_name = "",
    company_details: { company_name = "" } = {},
  } = productData || {};
  const dispatch = useDispatch();
  const { Territory } = useSelector((state: any) => state.productList);
  const { usersList, activeUser } = useSelector((state: any) => state.chatData);
  const {
    user_info: { id: currentLoggedUser },
  } = useSelector((state: any) => state.userData);

  const handleQuote = async (id, type) => {
    setShowLoader(type);
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
    }
    setModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
  };

  const AddToWishlist = async (item) => {
    if (!getTokenFromCookies()) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    setFavourite(!Favourite);
    let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    let response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id: item.id, user_id: userid },
    });
    if (response.status === true) {
      toast.success(response.message);
    } else {
      setFavourite(!Favourite);
    }
  };

  const FetchWishList = async (page) => {
    let response = await apiClient("front/list/wishlist", "get", {
      body: { page },
    });
    if (response.status == 200) {
    }
  };

  const handleDeleteWishlist = async (item) => {
    const response = await apiClient("front/list/wishlist/delete", "post", {
      body: {
        product_ids: item?.id,
        label_id: label_id
      },
    });
    if (response.status == 200) {
     if(label_id){
      fetchLebalList();
    } else {
      FetchWishListFunction();
    }}
  };

  const imageData = "https://merchantad.xevitech.com/public/";
  let country = countriesList.map((element) => ({
    value: element?.code,
    view: element?.name,
    type: "Country",
    region: `${element.region}t`,
  }));

  const GetName = (id) => {
    let List = [...country, ...Territory];
    let view =
      List.find((v) => v.value?.replace("t", "") == `${id}`.replace("t", ""))
        ?.view ?? "";
    return view;
  };

  const unit = useSelector((state: any) => state.header.unit);

  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "NA";
  };

  let bussiness = data?.company_details?.business_type;
  let manufacturer_image = "s-badge.png";

  let bussinessName;
  if (typeof bussiness === "string" && typeof bussiness === "object") {
    bussinessName = data?.company_details?.business_type;
  } else {
    bussinessName =
      bussiness && JSON.parse(bussiness)?.find((ele) => ele?.toggle == 1)?.name;
  }

  if (bussinessName == "Manufacturer") {
    manufacturer_image = "manufacturer.svg";
  } else if (bussinessName == "Agents and Representative") {
    manufacturer_image = "Agent.svg";
  } else if (bussinessName == "Reseller") {
    manufacturer_image = "Re-seller.svg";
  } else if (bussinessName == "Distributor") {
    manufacturer_image = "Distributor.svg";
  } else if (bussinessName == "Retailer") {
    manufacturer_image = "Retailer.svg";
  } else if (bussinessName == "Others") {
    manufacturer_image = "other.svg";
  } else {
    manufacturer_image = "Wholesaler.svg";
  }

  let toolTipData = `The seller's base price is based on an <b>${data?.price_term?.replaceAll(
    ",",
    ", "
  )}</b> delivery term.`;

  const handleChatButtonClick = () => {
    const {
      company_details: { company_name = "", name = "", slug = "" } = {},
      user_id = "",
      category_slug = "",
      slug: productNameSLug = "",
      id: product_id,
      product_name,
      unique_number,
      price_term,
      unit_price,
    } = data || {};

    const quotationUrl = `${window.location.href}/productdetail/${category_slug}/${slug}/${productNameSLug}`;
    const initialActiveUser = {
      name: name,
      id: user_id,
      companyName: company_name,
      seller_name: name,
      quotationUrl: quotationUrl,
    };
    const currentLoggedUserId = getUserIdLocalStorage();
    dispatch(setActiveUser(initialActiveUser));
    fetchChatHistory({
      userId: userIdLocalStorage ? userIdLocalStorage : user_id,
      params: "search=&type=all",
      url: "",
    })
      .then((responseData) => {
        const { message = "" } = responseData?.data || {};
        const { user_status } = responseData || {};
        const userIndex = user_status.findIndex((user) => {
          return user.user_id !== currentLoggedUserId;
        });
        if (userIndex !== -1) {
          const { online, company, user_id, room_id, name, avatar_original } =
            user_status[userIndex];
          const user = user_status[userIndex];
          const {
            all: { data, nextPageUrl },
          } = message;
          dispatch(replaceChat(data));
          dispatch(setRoomId(room_id));
          const initialActiveUser = {
            room_id: room_id,
            name: name,
            id: user_id,
            online: online,
            companyName: company,
            previousChatUrl: nextPageUrl,
            quotationUrl: !data?.length ? quotationUrl : null,
            avatar_original: avatar_original,
            product_id,
            product_name: product_name,
            unique_number,
            price_term,
            unit_price,
            request_send_from: currentLoggedUser,
          };
          const isUserIsAlreadyExist = usersList.find(
            (user) => +user.id === user_id
          );
          if (!isUserIsAlreadyExist) {
            const newUserDetails = {
              ...user,
              is_group: null,
              shop_name: user_status[userIndex]?.company,
              id: user_id,
              is_blocked: 0,
              is_pinned: 0,
            };
            const newUserLists = [...usersList, newUserDetails];
            dispatch(setUsersList(newUserLists));
          }
          dispatch(setActiveUser(initialActiveUser));
        }
      })
      .catch((error) => {});
    dispatch(chatWindowPopup(true));
  };

  const [state, setState] = useState({ open: false });

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
    let status = 0;
    localStorage.setItem("reminder", status.toString());
  };

  const handlePopupClose = () => {
    setShowSignPopup(false);
  };
  const HandleClose = () => {
    setShowSignPopup(false);
  };

  const handleAfterSignup = () => {
    handleChatButtonClick();
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      onSelect(data.id, label_id, isChecked);
    } else {
      onSelect(data.id, label_id, isChecked);
    }
  };
  return (
    <Box sx={{ maxWidth: "100%", height: "100%" }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showSignPopup}
      >
        {toggleSignup ? (
          <QuickSignup
            text="Quick Signup"
            setHideLogin={HandleClose}
            display="block"
            setToggleSignup={setToggleSignup}
            SubmitQuotation={handleAfterSignup}
            buttonName="Start Chat"
            type={"signup"}
          />
        ) : (
          <Login
            setToggleSignup={setToggleSignup}
            setHideLogin={HandleClose}
            SubmitQuotation={handleAfterSignup}
            buttonName="Login & Start Chat"
          />
        )}
      </BootstrapDialog>
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      <Box sx={{ position: "relative" }}>
        <ProductItemInfoCardOuter
          key={data.id}
          className={ProductModule.product_col}
        >
          <ProductItemInfoCard>
            <Stack p={{ xs: 1 }}>
              <Stack
                sx={{
                  "& svg": {
                    margin: "-2px 0 0",
                  },
                }}
                spacing={{ xs: 2 }}
                justifyContent={{ xs: "space-between" }}
                alignItems={{ xs: "center" }}
                direction={{ xs: "row" }}
              >
                <Box
                  sx={{
                    borderRadius: "4px",
                    backgroundColor: "#F2F2F2",
                    padding: "2px 6px",
                    fontSize: "11px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "1",
                    display: "-webkit-box",
                    textTransform: "capitalize",
                  }}
                >
                  <LightTooltip
                    placement="top"
                    title={data?.category_name}
                    arrow
                    disableInteractive
                  >
                    {data.category_name}
                  </LightTooltip>
                </Box>
                {data.availability === "in_stock" ? (
                  <InStockTypography>
                    In Stock <Doneicon />
                  </InStockTypography>
                ) : data.availability === "by_order" ? (
                  <ByOrderTypography>
                    By Order <Doneicon />
                  </ByOrderTypography>
                ) : null}
              </Stack>
            </Stack>

            <Box
              className={ProductModule.product_list_img}
              onMouseLeave={(e) => setAnchorEl(null)}
            >
              {typeof window !== "undefined" &&
                data?.user_id !=
                  JSON.parse(localStorage.getItem("userData"))?.id && (
                  <Box sx={{ position: "absolute", left: "6px", top: "6px" }}>
                    <LightTooltip
                      placement="top"
                      title="Wishlist"
                      arrow
                      disableInteractive
                    >
                      <span
                        className={ProductModule.wislistouter}
                        aria-label="Wishlist"
                        onClick={() => {
                          handleDeleteWishlist(data);
                        }}
                      >
                        {!Favourite ? (
                          <FavoriteIcon
                            style={{ color: "#d7282f" }}
                            className={ProductModule.wislist_imgActive}
                            aria-label="Wishlist"
                          />
                        ) : (
                          <FavoriteBorderOutlinedIcon
                            className={ProductModule.wislist_img}
                            aria-label="Wishlist"
                          />
                        )}
                      </span>
                    </LightTooltip>
                  </Box>
                )}
              {data.product_type === "configured" && (
                <div className={ProductModule.config_products}>
                  <span>Configured</span>
                </div>
              )}
              {/* image img */}
              {/* recet view data?.photos.source} below */}
              <img
                style={{ width: "100%", height: 150, cursor: "pointer" }}
                src={data?.photos || data?.main_image || data?.photos?.source}
                alt={data.product_name || data.name}
                onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                onClick={() => Navigate(data)}
                loading="lazy" // Lazy load for better performance
              />
              {Boolean(anchorEl) && (
                <CustomSlider
                  setAnchorEl={setAnchorEl}
                  anchorEl={anchorEl}
                  photos={data?.photos?.[0]?.source || data?.photos?.source}
                />
              )}
            </Box>

            <Box sx={{ padding: "0 10px" }}>
              <div
                className={ProductModule.stackproductname}
                onClick={() => Navigate(data)}
              >
                <Box className={ProductModule.location_box}>
                  {data.product_name && (
                    <Tooltip
                      title={data.product_name || data.user_name}
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
                      <ProductTitleTypo
                        // component="h2"
                        style={{ cursor: "pointer" }}
                      >
                        {data.product_name}
                      </ProductTitleTypo>
                    </Tooltip>
                  )}
                </Box>
              </div>

              {/* {data.product_type === "simple" &&
                (data.price_type === "fixed" ||
                data.price_type === "quantity" ? (
                  <Box
                    sx={{
                      fontSize: "13px",
                      color: "#4A4A4A",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "4px",
                      marginTop: "6px",
                      paddingBottom: "8px",
                      "& .MuiTypography-h6": {
                        fontSize: "12px",
                        color: "#D7282F",
                        fontWeight: "600",
                        "& span": {
                          fontSize: "12px",
                          color: "#4A4A4A",
                        },
                      },
                    }}
                  >                 
                    {data.availability == "in_stock" ? (
                      data.price_type == "quantity" ? (
                        data.hide_price == 1 ? (
                          <Typography
                            variant="h6"
                            sx={{ lineHeight: "normal" }}
                          >
                            {CurrencySymbol(data.currency_id)}
                            {data.price_range && data.price_range.length > 1
                              ? `${
                                  data.price_range[0]
                                    ? data.price_range[0]?.toLocaleString()
                                    : ""
                                } - ${CurrencySymbol(data.currency_id)}${
                                  data?.price_range[1]
                                    ? data?.price_range[1]?.toLocaleString()
                                    : ""
                                }`
                              : data?.price_range}
                            <span>{" /"}</span>
                            <span>{data.qty_unit_name}</span>
                            {data?.price_term && (
                              <LightTooltip
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
                              </LightTooltip>
                            )}
                          </Typography>
                        ) : (
                          <Box
                            sx={{
                              height: "17px",
                            }}
                          ></Box>
                        )
                      ) : (
                        <>
                          {data?.hide_price == 1 ? (
                            <Typography variant="h6">
                              {`${CurrencySymbol(data.currency_id)}`}
                              {data?.unit_price}
                              <span>{"/"}</span>
                              <span>{data?.unit_name ?? data?.qty_unit}</span>

                              {data?.price_term && (
                                <LightTooltip
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
                                      fontSize: "13px",
                                      margin: "0px 2px -3px",
                                    }}
                                  />
                                </LightTooltip>
                              )}
                            </Typography>
                          ) : (
                            <Box
                              sx={{
                                height: "26px",
                              }}
                            ></Box>
                          )}
                        </>
                      )
                    ) : data.price_type == "quantity" ? (
                      <Typography variant="h6">
                        {CurrencySymbol(data.currency_id)}
                        {data.price_range && data.price_range.length > 1
                          ? `${
                              data.price_range[0]
                                ? data.price_range[0]?.toLocaleString()
                                : ""
                            } - ${CurrencySymbol(data.currency_id)}${
                              data?.price_range[1]
                                ? data?.price_range[1]?.toLocaleString()
                                : ""
                            }`
                          : data?.price_range}
                        <span>{" /"}</span>
                        <span>{data.qty_unit_name}</span>
                        {data?.price_term && (
                          <LightTooltip
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
                                fontSize: "13px",
                                margin: "0px 2px -3px",
                              }}
                            />
                          </LightTooltip>
                        )}
                      </Typography>
                    ) : (
                      <>
                        {data.hide_price == 1 && data.price_type == "fixed" ? (
                          <Typography variant="h6">
                            {`${CurrencySymbol(data.currency_id)}${
                              data.unit_price
                            } /
                        ${data?.unit_name}`}
                            {data?.price_term && (
                              <LightTooltip
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
                                    fontSize: "13px",
                                    margin: "0px 2px -3px",
                                  }}
                                />
                              </LightTooltip>
                            )}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "27.17px",
                      margin: "6px 0 0 0",
                      padding: "0 0 8px 0",
                    }}
                  ></Box>
                ))} */}
                 {data.product_type === "simple" ? (
                <Box
                  sx={{
                    fontSize: "13px",
                    color: "#4A4A4A",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                    marginTop: "1px",
                    paddingBottom: "8px",
                    "& .MuiTypography-h6": {
                      fontSize: "13px",
                      color: "#D7282F",
                      fontWeight: "600",
                      "@media screen and (max-width:1500px)": {
                        fontSize: "11px",
                      },
                      "& span": {
                        fontSize: "12px",
                        color: "#4A4A4A",
                      },
                    },
                  }}
                >
                  {data.is_placeholder === "yes" ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {data.availability === "by_order" ||
                      data.availability === "in_stock" ? (
                        <>
                          {data.hide_price == 1 &&
                          (data.price_type == "fixed" ||
                            data?.price_type == "quantity") ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              {/* Price: */}
                              <Typography variant="h6">
                                {data.price_type === "fixed" ? (
                                  <>
                                    {data?.symbol}
                                    {data.unit_price?.toLocaleString()}
                                    <span>/ {data.unit_name}</span>
                                  </>
                                ) : data.price_type === "quantity" ? (
                                  <>
                                    {`${
                                      data?.symbol
                                    }${data.price_range[0]?.toLocaleString()} - ${
                                      data?.symbol
                                    }${data.price_range[1]?.toLocaleString()}`}
                                    <span>/ {data.qty_unit_name}</span>
                                  </>
                                ) : null}

                                {data?.price_term &&
                                  (data.price_type === "fixed" ||
                                    data.price_type === "quantity") && (
                                    <LightTooltip
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
                                    </LightTooltip>
                                  )}
                              </Typography>
                            </Box>
                          ) : data?.price_type == "price_unavailable" ? (
                            <>
                              {data?.price_type == "price_unavailable" && (
                                <>
                                  {data?.price_unavailable_type ? (
                                    // "Price:"
                                    ""
                                  ) : (
                                    <Box sx={{ height: "22px" }}></Box>
                                  )}
                                  <Typography
                                    variant="h6"
                                    sx={{ color: "#D7282F" }}
                                  >
                                    {data.price_unavailable_type ? (
                                      <>{data.price_unavailable_type}</>
                                    ) : (
                                      <Box sx={{ height: "22px" }}></Box>
                                    )}
                                  </Typography>
                                </>
                              )}
                            </>
                          ) : (
                            <Box sx={{ height: "20.8px" }}></Box>
                          )}
                        </>
                      ) : null}
                    </Box>
                  ) : data.availability === "by_order" ||
                    data.availability === "in_stock" ? (
                    <>
                      {data.hide_price == 1 ? (
                        <Box>
                          {/* Price: */}
                          <Typography variant="h6" component={"span"}>
                            {data.price_type === "fixed" ? (
                              <>
                                {data?.symbol}
                                {data.unit_price?.toLocaleString()}
                                <span>/ {data.unit_name}</span>
                              </>
                            ) : data.price_type === "quantity" ? (
                              <>
                                {`${
                                  data?.symbol
                                }${data.price_range[0]?.toLocaleString()} - ${
                                  data?.symbol
                                }${data.price_range[1]?.toLocaleString()}`}
                                <span>/ {data.qty_unit_name}</span>
                              </>
                            ) : null}
                            {data?.price_term && (
                              <LightTooltip
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
                              </LightTooltip>
                            )}
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <Box sx={{ height: "20.8px" }}></Box>
                        </>
                      )}
                    </>
                  ) : null}
                </Box>
              ) : null}
              {data?.product_type === "configured" && (
                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#4A4A4A",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "6px",
                    paddingBottom: "8px",
                    "& .MuiTypography-h6": {
                      fontSize: "10px",
                      color: "#D7282F",
                      fontWeight: "600",
                    },
                    "& .MuiTypography-body1": {
                      fontSize: "12px",
                    },
                  }}
                >
                  <Typography variant="h6">
                    <Typography variant="h6" style={{ visibility: "hidden" }}>
                      {"Ask price"}
                    </Typography>
                  </Typography>
                </Box>
              )}

              <Box className="productCenterInfo" sx={{ padding: "5px 0" }}>
                {data.product_type == "simple" && (
                  <>
                    <ContentFlewView className={ProductModule.conditiondata}>
                      <ProductsmallTypography>
                        Manufacturer:
                      </ProductsmallTypography>
                      <LightTooltip
                        placement="top-start"
                        title={data?.brand_name || "N/A"}
                        arrow
                        disableInteractive
                      >
                        <Typography className="boldtxt ProductLocationandbrand wishlistItem">
                          {data?.brand_name || data?.manufacturer || "N/A"}
                        </Typography>
                      </LightTooltip>
                    </ContentFlewView>
                    {data.product_type == "simple" && data?.condition ? (
                      <ContentFlewView className={ProductModule.conditiondata}>
                        <ProductsmallTypography>
                          Condition:
                        </ProductsmallTypography>
                        <LightTooltip
                          placement="top-start"
                          title={data?.condition || "N/A"}
                          arrow
                          disableInteractive
                        >
                          <Typography className="boldtxt ProductLocationandbrand wishlistItem">
                            {data?.condition || "N/A"}
                          </Typography>
                        </LightTooltip>
                      </ContentFlewView>
                    ) : data.availability == "by_order" &&
                      data?.model_number ? (
                      <ContentFlewView className={ProductModule.conditiondata}>
                        <ProductsmallTypography>
                          Model Number:
                        </ProductsmallTypography>
                        <LightTooltip
                          placement="top-start"
                          title={data?.model_number || "N/A"}
                          arrow
                          disableInteractive
                        >
                          <Typography className="boldtxt ProductLocationandbrand wishlistItem">
                            {data?.model_number || ""}
                          </Typography>
                        </LightTooltip>
                      </ContentFlewView>
                    ) : (
                      <Box sx={{ padding: "27px" }}></Box>
                    )}
                  </>
                )}
                {data.product_type == "configured" && (
                  <>
                    {data.brand_name && (
                      <ContentFlewView className={ProductModule.conditiondata}>
                        <ProductsmallTypography>
                          Manufacturer:
                        </ProductsmallTypography>
                        <LightTooltip
                          disableInteractive
                          title={data.brand_name}
                          placement="top"
                          arrow
                        >
                          <Typography className="boldtxt ProductLocationandbrand wishlistItem">
                            {data.brand_name ?? "other"}
                          </Typography>
                        </LightTooltip>
                      </ContentFlewView>
                    )}
                    <ContentFlewView className={ProductModule.conditiondata}>
                      {data?.model_number ? (
                        <ProductsmallTypography>
                          Model Number:
                        </ProductsmallTypography>
                      ) : (
                        <ProductsmallTypography
                          sx={{ height: "18px" }}
                        ></ProductsmallTypography>
                      )}
                      <LightTooltip
                        placement="top-start"
                        title={data?.condition || "N/A"}
                        arrow
                        disableInteractive
                      >
                        <Typography className="boldtxt ProductLocationandbrand wishlistItem">
                          {data?.model_number || ""}
                        </Typography>
                      </LightTooltip>
                    </ContentFlewView>
                  </>
                )}

                <Box sx={{ clear: "both" }}></Box>
              </Box>
            </Box>
          </ProductItemInfoCard>
          <Box
            // className={`tileFooter ${
            //  bussiness || data.is_verified == "Verified" ? "imageExists" : "imageNotExists"
            // }`}
            className="tileFooter"
            sx={{
              "& img": {
                border: "none !important",
                padding: "0 !important",
              },
            }}
          >
            <Stack
              className={ProductModule.divider}
              alignItems={{ xs: "center" }}
              spacing={{ xs: 2 }}
            >
              <Box
                className={ProductModule.boxquote}
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <ProductHeadePriceButton
                  sx={{
                    "& svg": {
                      margin: "0 auto",
                    },
                  }}
                  className={ProductModule.redoutline_btn}
                  onClick={(e) => {
                    let id = localStorage?.userData
                      ? JSON.parse(localStorage?.userData).id
                      : "";
                    if (id === data?.user_id) {
                      const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: "custom-btn cancel-button",
                          cancelButton: "custom-btn remove-btn",
                        },
                        buttonsStyling: false,
                      });
                      swalWithBootstrapButtons.fire({
                        title: "Error!",
                        text: "You cannot get a quote for your own product.",
                        icon: "warning",
                        showCancelButton: false,
                        reverseButtons: true,
                      });
                      return;
                    }

                    e.stopPropagation();
                    handleQuote(data.id, "quote");
                  }}
                >
                  <Typography component="span">
                    {showLoader === "quote" ? (
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
                <LightTooltip
                  disableInteractive
                  title={"Chat with Seller"}
                  aria-label="Chat with Seller"
                  placement="top"
                  arrow
                >
                  <Box
                    role="button" // Adding role for accessibility
                    aria-label="Chat with Seller"
                    sx={{
                      border: "1px solid #d7282f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      padding: "6px 10px",
                      minHeight: "29px",
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
                    onClick={() => {
                      let id = localStorage?.userData
                        ? JSON.parse(localStorage?.userData).id
                        : "";
                      document.body.classList.add("chat-bodyadd");
                      if (id === data?.user_id) {
                        const swalWithBootstrapButtons = Swal.mixin({
                          customClass: {
                            confirmButton: "custom-btn cancel-button",
                            cancelButton: "custom-btn remove-btn",
                          },
                          buttonsStyling: false,
                        });
                        swalWithBootstrapButtons.fire({
                          title: "Error!",
                          text: "You cannot initiate chat for your own product.",
                          icon: "warning",
                          showCancelButton: false,
                          reverseButtons: true,
                        });
                        document.body.classList.remove("chat-bodyadd");
                        return;
                      } else if (id) {
                        handleChatButtonClick();
                      } else {
                        setShowSignPopup(true);
                      }
                    }}
                  >
                    <i className="icon-livechat">
                      <span
                        className="path1"
                        aria-label="Chat with Seller"
                      ></span>
                      <span
                        className="path2"
                        aria-label="Chat with Seller"
                      ></span>
                    </i>
                  </Box>
                </LightTooltip>
              </Box>
            </Stack>
            <Stack
              sx={{
                padding: "0 10px",
                borderTop: "1px solid #EAEAEA",
                marginTop: "10px",
                minHeight: "30px",
              }}
            >
              <CompanyName
                sx={{}}
                onClick={() => {
                  window.open(
                    `/mini-site/${data?.company_details}`,
                    "_blank",
                    "noreferrer"
                  );
                }}
              >
                <LightTooltip
                  disableInteractive
                  title={data?.company_details}
                  placement="top"
                  arrow
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {data?.company_details}
                    <ChevronRightOutlinedIcon />
                  </Box>
                </LightTooltip>
              </CompanyName>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "7px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {/* <LightTooltip arrow disableInteractive placement="top" title> */}
                <img
                  src={`/assets/images/${getBussinessTypeIcon(
                    JSON.parse(data.business_type)
                      ?.filter(
                        (business) =>
                          business.toggle === true || business.toggle === "1"
                      )
                      .map((business) => business.name)
                      .join("")
                  )}`}
                  width="30"
                  height="20"
                  loading="lazy"
                />
                {JSON.parse(data?.business_type)
                  ?.filter(
                    (business) =>
                      business.toggle === true || business.toggle === "1"
                  )
                  .map((business) => business.name.replace(/s(?=[^s]*$)/, ""))
                  .join(",")}
                {/* </LightTooltip> */}
                {data.is_verified && (
                  <>
                    <SeparationDots />
                    <img
                      src="/assets/verifyWtext.svg"
                      width="60"
                      height="21"
                      loading="lazy"
                    />
                  </>
                )}
              </Box>
            </Stack>
          </Box>
        </ProductItemInfoCardOuter>
        <Box
          sx={{
            ...CheckBoxStyle,
            "& .MuiCheckbox-root": { padding: "0px !important" },
            position: "absolute",
            right: "-9px",
            top: "-12px",
            backgroundColor: "#fff",
            "& .MuiCheckbox-root:after": {
              top: "3px",
            },
          }}
        >
          <Checkbox onChange={handleCheckboxChange} />
        </Box>
      </Box>
    </Box>
  );
};

export default WishlistProductItem;
// prodcutitem.jsx

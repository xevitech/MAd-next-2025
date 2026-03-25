import ProductModule from "./product.module.css";
import { Box, Checkbox, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import { setSingleProductId } from "../../hooks/UseProductListContext";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";
import { ThreeDots } from "react-loader-spinner";
import {
  CurrencySymbol,
  apiClient,
  createEchoInstance,
  fetchChatHistory,
  getUserIdLocalStorage,
} from "@/components/common/common";
import {
  CompanyName,
  CompanyNamearrow,
  ProductHeadePriceButton,
} from "./ProductListing.styled";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Navigate } from "@/components/common/common";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  ByOrderTypography,
  ContentFlewView,
  InStockTypography,
  ProductItemInfoCard,
  ProductItemInfoCardOuter,
  ProductTitleTypo,
  ProductsmallTypography,
  SeparationDots,
} from "./style";
import { countriesList } from "@/utils/countriesphp";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import { toast } from "react-toastify";
import CustomSlider from "./CustomSlider";
import Swal from "sweetalert2";
import { LightTooltip } from "../common/Tooltip/tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  chatWindowPopup,
  replaceChat,
  setActiveUser,
  setRoomId,
  setUsersList,
} from "@/hooks/ChatReducer";
import { BootstrapDialog } from "../Chat/style";
import Login from "../ProductDetail/ProductComponents/Modal/Login";
import QuickSignup from "../auth/quickSignup/QuickSignup";
import { CheckBoxStyle } from "../profile/common";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { useRouter } from "next/router";
import { setWishListData } from "@/hooks/HeaderHooks";
import { getBussinessTypeIcon } from "../Helper";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { StyleDrawer } from "../ProductDetail/style";
import ProductItemConfigGetQuote from "../ProductDetail/ProductComponents/Modal/ProductItemConfigGetQuote";
import QuoteConfiModal from "../ProductDetail/ProductComponents/Modal/QuoteConfiModal";

const ProductItemOptimized = ({ data }) => {

  console.log('data_p',data);
  const [openModal, setModal] = useState(false);
  const [openConfiModal, setConfiModal] = useState(false);
  const [Favourite, setFavourite] = useState(false);
  useEffect(() => {
    setFavourite(data?.wishList);
  }, [data]);


  const [showLoader, setShowLoader] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSignPopup, setShowSignPopup] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(true);
  const {
    detail: { data: productData = {} },
  } = useSelector((state) => state.productDetail);
  const { wishListData: wishLists } = useSelector((state) => state.header);
  const {
    user_id: userIdLocalStorage = "",
    seller_name = "",
    company_details: { company_name = "" } = {},
  } = productData || {};

  const { query } = useRouter();

  const { name = "" } = query || {};
  const { currency_id, hide_price } = useSelector(
    (state) => state.productDetail.detail.data
  );
  // const { classes } = useStyles();
  const dispatch = useDispatch();
  const { Territory } = useSelector((state) => state.productList);
  const { usersList, activeUser } = useSelector((state) => state.chatData);
  const {
    user_info: { id: currentLoggedUser },
  } = useSelector((state) => state.userData);
  const [productId, setProductId] = useState("");
  const iconRef = useRef();
  const handleQuote = async (id, type) => {
    const currencyId = JSON.parse(localStorage.getItem("currency"));
    setShowLoader(type);
    let response = await apiClient("front/single/view", "post", {
      // body: { id: id, currency_id: data?.currency_id },
      body: { id: id, currency_id: currencyId },
    });
    if (response.status === 200) {
      // setProductId(response.data);
      dispatch(setQuoteDetails(response.data));
    }
    setModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
  };
  const handleConfiQuote = async (id, type) => {
    setShowLoader(type);
    let response = await apiClient("front/single/view", "post", {
      body: { id: id, currency_id: data?.currency_id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
    }
    setConfiModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
  };
  const AddToWishlist = async (item, isFavourite) => {
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
    if (!isFavourite) {
      const updatedWishLists = [...wishLists, { ...data }];
      dispatch(setWishListData(updatedWishLists));
    } else {
      const updatedWishLists = wishLists?.filter(
        (wishlist) => +wishlist.id !== +data?.id
      );
      dispatch(setWishListData(updatedWishLists));
    }
  };

  let country = countriesList.map((element) => ({
    value: element?.code,
    view: element?.name,
    type: "Country",
    region: `${element.region}t`,
  }));

  const unit = useSelector((state) => state.header.unit);

  let businessm =data?.business_type;
  let manufacturer_image = "Others1.svg";
  let businessTypeIcon = "Others1.svg";

  let bussinessName;
let bussiness='';
  // if (typeof bussiness === "string") {
  //   const parsedData = JSON.parse(bussiness);

  //   if (Array.isArray(parsedData)) {
  //     bussinessName = parsedData
  //       .filter(
  //         (business) => business.toggle === true || business.toggle === "1"
  //       )
  //       .map((business) => business.name)
  //       .join(",");
  //   } else {
  //     bussinessName =
  //       data?.company_details?.business_type || data?.business_type || "";
  //   }
  // } else {
  //   bussinessName = data?.business_type || data?.company_details?.business_type;
  // }

  // let businessm = data?.business;

  if (businessm == "Manufacturers") {
    manufacturer_image = "Manufacturers1.svg";
  } else if (businessm == "Agents and Representatives") {
    manufacturer_image = "Agents1.svg";
  } else if (businessm == "Resellers") {
    manufacturer_image = "Resellers1.svg";
  } else if (businessm == "Distributors") {
    manufacturer_image = "Distributors1.svg";
  } else if (businessm == "Retailers") {
    manufacturer_image = "Retailers1.svg";
  } else {
    manufacturer_image = "Others1.svg";
  }

  businessTypeIcon = getBussinessTypeIcon(bussinessName);

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
      pre_title_name,
      main_image,
    } = data || {};

    const quotationUrl = `${window.location.href}/productdetail/${category_slug}/${slug}/${productNameSLug}`;
    const initialActiveUser = {
      name: name,
      id: user_id,
      companyName: company_name,
      seller_name: name,
      quotationUrl: quotationUrl,
      sendQuotation: false,
    };
    const Echo = createEchoInstance();
    (window || {}).Echo = Echo;
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
            main_image,
            pre_title_name,
            request_send_from: currentLoggedUser,
            sendQuotation: false,
            is_blocked: 0,
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

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
    let status = 0;
    localStorage?.setItem("reminder", status?.toString());
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
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

  const toggleFlyout = () => {
    setIsFlyoutOpen(!isFlyoutOpen);
  };

  const handleIconClick = (e) => {
    AddToWishlist(data, Favourite);
    const svgElement = iconRef.current;
    if (svgElement) {
      const pathElement = svgElement.querySelector("path");
      if (pathElement) {
        pathElement.setAttribute("data-productId", data?.id ?? null);
        pathElement.setAttribute("data-tracking", "wishlist-identifier");
      }
    }
  };
  const productName = data?.product_name ?? data?.name;
  function showDialog() {
    const dialog = document.getElementById("priceDialog");
    if (dialog) dialog.showModal();
  }

  function closeDialog() {
    const dialog = document.getElementById("priceDialog");
    if (dialog) dialog.close();
  }

  return (
    <Box sx={{ maxWidth: "100%", height: "100%", display: "grid" }}>
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
      {openConfiModal && (
        <QuoteConfiModal
          open={openConfiModal}
          handleClose={() => setConfiModal(false)}
        />
      )}
      <Box
        sx={{
          position: "relative",
          "& .PrivateSwipeArea-root": {
            width: "0px !important",
          },
        }}
      >
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
                    {data?.category_name}
                  </LightTooltip>
                </Box>
                {data.stock_type === "in_stock" ? (
                  <InStockTypography>
                    In Stock <DoneIcon />
                  </InStockTypography>
                ) : data.stock_type === "by_order" ? (
                  <ByOrderTypography>
                    By Order <DoneIcon />
                  </ByOrderTypography>
                ) : null}
              </Stack>
            </Stack>

            <Box
              className={ProductModule.product_list_img}
              onMouseLeave={(e) => setAnchorEl(null)}
            >
              {typeof window !== "undefined" &&
                data?.user_id != currentLoggedUser && (
                  <Box
                    sx={{ position: "absolute", left: "6px", top: "6px" }}
                    data-tracking="wishlist-identifier"
                  >
                    <LightTooltip
                      placement="top"
                      title="Wishlist"
                      arrow
                      disableInteractive
                      data-tracking="wishlist-identifier"
                    >
                      <span
                        className={ProductModule.wislistouter}
                        data-tracking="wishlist-identifier"
                        aria-label="Wishlist"
                      >
                        {Favourite ? (
                          <FavoriteIcon
                            style={{ color: "#d7282f" }}
                            className={ProductModule.wislist_imgActive}
                            aria-label="Wishlist"
                            data-tracking="wishlist-identifier"
                            onClick={handleIconClick}
                            ref={iconRef}
                          />
                        ) : (
                          <FavoriteBorderOutlinedIcon
                            className={ProductModule.wislist_img}
                            aria-label="Wishlist"
                            data-tracking="wishlist-identifier"
                            onClick={handleIconClick}
                            ref={iconRef}
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
                src={
                  data?.primary_image
                    ? `https://merchantad.xevitech.com/public/${data?.primary_image}`
                    : "https://rakanonline.com/wp-content/uploads/2022/08/default-product-image.png"
                }
                alt={data.product_name}
                onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                onClick={() => {
                  const newData = { ...data, searchKey: name };
                  Navigate(newData);
                }}
                loading="lazy"
                data-tracking="product-image-click"
              />
              {Boolean(anchorEl) && (
                <CustomSlider
                  setAnchorEl={setAnchorEl}
                  anchorEl={anchorEl}
                  photos={
                    Array.isArray(data?.photos) && data?.photos?.length > 0
                      ? data?.photos[0]?.source
                      : data?.photos?.source
                  }
                />
              )}
            </Box>

            <Box sx={{ padding: "0 10px" }}>
              <div
                sx={{ margin: "3px 10px 0" }}
                className={ProductModule.stackproductname}
                onClick={() => {
                  const newData = { ...data, searchKey: name };
                  Navigate(newData);
                }}
              >
                <Box className={ProductModule.location_box}>
                  {productName && (
                    <Tooltip
                      title={productName || data.user_name}
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
                        component="h2"
                        style={{ cursor: "pointer" }}
                      >
                        {data.product_name}
                      </ProductTitleTypo>
                    </Tooltip>
                  )}
                </Box>
              </div>

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
                      {data.stock_type === "by_order" ||
                      data.stock_type === "in_stock" ? (
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
                                    {data?.currency_symbol}
                                    {data.price?.toLocaleString()}
                                    <span>/ {data.unit_name}</span>
                                  </>
                                ) : data.price_type === "quantity" ? (
                                  <>
                                    {`${
                                      data?.currency_symbol
                                    }${data.price?.toLocaleString()} - ${
                                      data?.currency_symbol
                                    }${data.price?.toLocaleString()}`}
                                    <span>/ {data.unit_name}</span>
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
                  ) : data.stock_type === "by_order" ||
                    data.stock_type === "in_stock" ? (
                    <>
                      {data.hide_price == 1 ? (
                        <Box>
                          {/* Price: */}
                          <Typography variant="h6" component={"span"}>
                            {data.price_type === "fixed" ? (
                              <>
                                {data?.currency_symbol}
                                {data.price?.toLocaleString()}
                                <span>/ {data.unit_name}</span>
                              </>
                            ) : data.price_type === "quantity" ? (
                              <>
                                {(() => {
                                  const priceRange = JSON.parse(
                                    data?.price || "[]"
                                  );
                                  return `${data?.currency_symbol}${priceRange[0]} - ${data?.currency_symbol}${priceRange[1]}`;
                                })()}
                                <span>/ {data.unit_name}</span>
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
              {data?.product_type == "configured" && (
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
                        title={data?.manufacturer || "N/A"}
                        arrow
                        disableInteractive
                      >
                        {/* manufacturer : 👇*/}
                        <Typography className="boldtxt ProductLocationandbrand">
                          {data?.manufacturer || "     --"}
                          {/* manufacture brandName */}
                        </Typography>
                      </LightTooltip>
                    </ContentFlewView>
                    {data.product_type == "simple" && data?.condition ? (
                      // data.availability == "in_stock" &&
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
                          <Typography className="boldtxt ProductLocationandbrand">
                            {data?.condition || ""}
                          </Typography>
                        </LightTooltip>
                      </ContentFlewView>
                    ) : data.stock_type == "by_order" && data?.model_number ? (
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
                          <Typography className="boldtxt ProductLocationandbrand">
                            {data?.model_number || ""}
                          </Typography>
                        </LightTooltip>
                      </ContentFlewView>
                    ) : (
                      <Box sx={{ padding: "24px" }}></Box>
                    )}
                  </>
                )}
                {data.product_type == "configured" && (
                  <>
                    {data.manufacturer && (
                      <ContentFlewView className={ProductModule.conditiondata}>
                        <ProductsmallTypography>
                          Manufacturer:
                        </ProductsmallTypography>
                        <LightTooltip
                          disableInteractive
                          title={data.manufacturer}
                          placement="top"
                          arrow
                        >
                          <Typography className="boldtxt ProductLocationandbrand">
                            {data.manufacturer ?? "other"}
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
                        <Typography className="boldtxt ProductLocationandbrand">
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
          <StyleDrawer
            anchor="right"
            open={isFlyoutOpen}
            onClose={() => setIsFlyoutOpen(true)}
            onOpen={toggleFlyout}
          >
            <ProductItemConfigGetQuote
              toggleFlyout={toggleFlyout}
              selectedData={data}
              type={""}
            />
          </StyleDrawer>
          <Box
            className={`tileFooter ${
              data.company_verified ? "imageExists" : "imageNotExists"
            }`}
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
                  data-tracking="getQuoteButton"
                  sx={{
                    "& svg": {
                      margin: "0 auto",
                    },
                  }}
                  className={ProductModule.redoutline_btn}
                  onClick={(e) => {
                    if (
                      data?.product_type === "configured" &&
                      data?.variation_options?.length > 0
                    ) {
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }
                      toggleFlyout();
                      setProductId(data.product_id);
                      return;
                    } else if (
                      data?.product_type === "configured" &&
                      data?.variation_options?.length < 0
                    ) {
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }
                      handleConfiQuote(data.product_id, "quote");
                      setProductId(data.product_id);
                      return;
                    } else if (data?.price_type === "price_unavailable") {
                      let imageUrl = "/assets/Price Unavailable 2.svg";
                      let message = `<span style="color: #231f20; font-size: 16px; font-weight: 500; display: block;">You can't <strong>'Get a quote'</strong> for this product at the moment. <br> 
                      Please explore other products or contact supplier for your query. </span>`;
                      // if (data?.unit_price === "Contact for Pricing") {
                      //   imageUrl = "/assets/contact_pricing.svg";
                      //   message = `
                      //     <span style="color: #231f20; font-size: 18px; font-weight: 500; display: block;">
                      //       Pricing for this item is available upon request. <br> Please contact our sales team for a detailed quotation.
                      //     </span>
                      //   `;
                      // } else if (data?.unit_price === "Coming Soon") {
                      //   imageUrl = "/assets/coming_soon.svg";

                      //   message = `
                      //     <span style="color: #231f20; font-size: 18px; font-weight: 500; display: block;">
                      //       This product will be available soon. <br> Pricing information will be published upon release.
                      //     </span>
                      //   `;
                      // } else if (data?.unit_price === "Price Unavailable") {
                      //   imageUrl = "/assets/Price Unavailable 2.svg";

                      //   message = `
                      //     <span style="color: #231f20; font-size: 18px; font-weight: 500; display: block; ">
                      //       Pricing for this item is currently unavailable. <br> Please check back later or reach out for assistance.
                      //     </span>
                      //   `;
                      // } else if (data?.unit_price === "Pre Order") {
                      //   imageUrl = "/assets/pre_order.svg";

                      //   message = `
                      //     <span style="color: #231f20; font-size: 18px; font-weight: 500; display: block;">
                      //       This item is currently available for pre-order. <br> Secure your order in advance of official release.
                      //     </span>
                      //   `;
                      // } else {
                      //   imageUrl = "/assets/Price Unavailable 2.svg";
                      //   message = `
                      //     <span style="color: #231f20; font-size: 18px; font-weight: 500; display: block;">
                      //       We are currently unable to display pricing information <br>  for this item.  Please try again later or contact us for more details.
                      //     </span>
                      //   `;
                      // }

                      const swalWithBootstrapButtons = Swal.mixin({
                        customClass: {
                          confirmButton: "custom-btn cancel-button",
                          cancelButton: "custom-btn remove-btn",
                        },
                        buttonsStyling: false,
                      });

                      swalWithBootstrapButtons.fire({
                        title: "",
                        html: message,
                        icon: undefined,
                        showCancelButton: false,
                        confirmButtonText: "OK",
                        reverseButtons: true,
                        imageUrl: imageUrl,
                        imageWidth: 80,
                        imageAlt: "Notice Icon",
                      });
                      // showDialog();
                    } else if (
                      data?.product_type === "configured" &&
                      data?.variation_options?.length < 0
                    ) {
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }

                      handleConfiQuote(data.product_id, "quote");

                      setProductId(data.product_id);
                      return;
                    } else if (
                      data.is_placeholder === "yes" &&
                      data?.product_type === "configured" &&
                      data?.variation_options?.length < 0
                    ) {
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }

                      // toggleFlyout();
                      handleConfiQuote(data.product_id, "quote");
                      setProductId(data.product_id);
                      return;
                    } else if (
                      data.is_placeholder === "yes" &&
                      data?.product_type === "configured" &&
                      data?.variation_options?.length > 0
                    ) {
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }
                      toggleFlyout();
                      setProductId(data.product_id);
                    } else {
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }
                      // e.stopPropagation();
                      if (
                        data?.product_type === "simple" ||
                        data.is_placeholder === "yes"
                      ) {
                        handleQuote(data.product_id, "quote");
                      } else {
                        handleConfiQuote(data.product_id, "quote");
                      }
                    }
                  }}
                >
                  <Typography component="span" data-tracking="getQuoteButton">
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
                    inputProps={{
                      "aria-label": "Chat with Seller",
                    }}
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
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You can’t send messages to yourself ! <br> This view simulates how others see your store.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockmessage.svg",
                          imageWidth: 80,
                          imageAlt: "alt",
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
                    <i class="icon-livechat">
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
                sx={{
                  "& span": {
                    width: "100%",
                  },
                }}
                // mini site open on click
                onClick={() => {
                  window.open(data.mini_site_url, "_blank", "noreferrer");
                }}
              >
                {/* hover business */}
                <LightTooltip
                  disableInteractive
                  title={data?.company_name}
                  placement="top"
                  arrow
                >
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "12px",
                      color: "#4a4a4a",
                      width: "100%",
                    }}
                  >
                    {data?.company_name || "-"}
                  </Typography>
                  <ChevronRightOutlinedIcon />
                </LightTooltip>
              </CompanyName>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "7px",
                  width: "",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {bussiness ? (
                  <>
                    <img
                      src={`/assets/images/${businessTypeIcon}`}
                      width="30"
                      height="20"
                      loading="lazy"
                    />
                    {bussinessName?.replace(/s(?=[^s]*$)/, "")}
                  </>
                ) : businessm ? (
                  <>
                    <img
                      src={`/assets/images/${manufacturer_image}`}
                      width="30"
                      height="20"
                      loading="lazy"
                    />
                    {businessm?.replace(/s(?=[^s]*$)/, "")}
                  </>
                ) : (
                  <>
                    <img
                      src={`/assets/images/Others1.svg`}
                      width="30"
                      height="20"
                      loading="lazy"
                    />
                    Other
                  </>
                )}
                {data.company_verified && (
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
      </Box>
    </Box>
  );
};

export default ProductItemOptimized;


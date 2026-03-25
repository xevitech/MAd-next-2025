import CheckIcon from "@mui/icons-material/Check";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { SliderArrowbigpost } from "../miniSite/styled";
import ProductModule from "./product.module.css";

import {
  apiClient,
  Navigate
} from "@/components/common/common";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import { setSingleProductId } from "@/hooks/UseProductListContext";
import { getTokenFromCookies } from "@/utils/cookieUtils";
import { countries } from "@/utils/countries";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "redux/store";
import Swal from "sweetalert2";
import { LightTooltip } from "../common/Tooltip/tooltip";
import QuoteModal from "../ProductDetail/ProductComponents/Modal/QuoteModal";
import {
  BigPostOuterBox,
  BPMain,
  BPstackLabel,
  BPstackText,
  BPstockChip,
} from "./ProductListing.styled";
import {
  BigPostFooter,
  BigPostModelNumber,
  BigPostModelNumberOuter,
  BigPostOuterCardd,
  BigPostProductName,
  ContainerOuterBigPost,
  MobileHorizontallyThumbs,
  MobileSmallThumb,
  SeparationDots
} from "./style";
// import useInitiateChatAndOpenWindow from "../Chat/common/customHooks/useInitiateChat";
const Slides = ({ slide, element }) => {
  // console.log("element sldie",element)
  return (
    <Stack
      className={ProductModule.imgbigpost}
      justifyContent="center"
      overflow="hidden"
      alignItems="center"
      // minHeight={200}
      // maxHeight={400}
    >
      <BigPostOuterBox
        href={`/productdetail/${element?.id}/${element?.brand_name}/${element?.slug}`}
        target="_blank"
      >
        <LazyLoadImage
          src={slide?.source}
          alt={slide?.alt_tag}
          className={ProductModule.sliderbigimg}
        />
        {/* {console.log("jbsjb")} */}
      </BigPostOuterBox>
    </Stack>
  );
};

export default function BigPostdummy(props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const element = props.data;
  let images = element?.photos;
  const [selectedImage, setSelectedImage] = useState([]);
  const [activeindex, setActiveindex] = useState(0);
  const [activeurl, setActiveurl] = useState(selectedImage[activeindex]);
  const [openModal, setModal] = useState<boolean>(false);
  const [loader, setShowLoader] = useState<string>("");
  const [Favourite, setFavourite] = useState<boolean>(element?.wishList);
  const [vertrical, setVertical] = useState<boolean>(true);
  const data = props?.data;

  const {
    user_info: { id: currentLoggedUserId },
  } = useSelector((state: any) => state.userData);

  // const initiateChat = useInitiateChatAndOpenWindow();

  const NextArrow: any = ({ className, style, onClick }) => (
    <span>
      <KeyboardArrowUpIcon
        style={{
          ...style,
          top: 0,
          color: "#231F20",
          background: "rgba(220, 220, 220, 0.9)",
          right: "35%",
          borderRadius: "50%",
          fontSize: "17px",
        }}
        onClick={onClick}
        className={className}
      />
    </span>
  );

  const PrevArrow: any = ({ className, style, onClick }) => (
    <span>
      <KeyboardArrowDownIcon
        style={{
          ...style,
          bottom: 0,
          left: "35%",
          color: "#231F20",
          background: "rgba(220, 220, 220, 0.9)",
          zIndex: 1,
          borderRadius: "50%",
          fontSize: "17px",
        }}
        onClick={onClick}
        className={className}
      />
    </span>
  );
  const showSlide = selectedImage.length >= 3 ? 3 : selectedImage.length;
  var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: true,
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    prevArrow: <KeyboardArrowLeftOutlinedIcon className="prevArrow" />,
    nextArrow: <KeyboardArrowRightOutlinedIcon className="nextArrow" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: showSlide - 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: showSlide - 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var settingshorizontally = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    arrow: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  var setting_2 = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
  let toolTipData = `The seller's base price is based on an <b></b> delivery term.`;
  useEffect(() => {
    setSelectedImage(images);
    return () => setSelectedImage([]);
  }, [images?.length]);

  useEffect(() => {
    setActiveurl(selectedImage[activeindex]);
  }, [activeindex]);

  function nexthandler() {
    if (activeindex === selectedImage?.length - 1) {
      setActiveindex(0);
      return;
    }
    setActiveindex(activeindex + 1);
  }

  function prevhandler() {
    if (activeindex === 0) {
      setActiveindex(selectedImage?.length - 1);
      return;
    }
    setActiveindex(activeindex - 1);
  }

  const fetchSingleProductDetails = async (id) => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      dispatch(setQuoteDetails(response.data));
      return response;
    }
  };

  const handleQuote = async (id, type) => {
    setShowLoader(type);
    fetchSingleProductDetails(id);
    setModal(true);
    setShowLoader("");
    dispatch(setSingleProductId(id));
  };
  const AddToWishlist = async () => {
    if (!getTokenFromCookies()) {
      toast.error("Please login to add product in wishlist");
      return;
    }
    let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    setFavourite(!Favourite);
    let response = await apiClient("front/addproduct_To_wishList", "post", {
      body: { product_id: element.id, user_id: userid },
    });
    if (!response.status || response.status !== 200) {
      setFavourite(!Favourite);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  let bussiness = data?.company_details?.business_type ?? data?.business_type;
  let manufacturer_image = "Others1.svg";
  let manufacturer_image1 = "Others1.svg";

  let bussinessName;

  if (typeof bussiness === "string") {
    const parsedData = JSON.parse(bussiness);

    if (Array.isArray(parsedData)) {
      bussinessName = parsedData
        .filter(
          (business) => business.toggle === true || business.toggle === "1"
        )
        .map((business) => business.name)
        .join(",");
    } else {
      bussinessName =
        data?.company_details?.business_type || data?.business_type || "";
    }
  } else {
    bussinessName = data?.business_type || data?.company_details?.business_type;
  }

  if (bussinessName == "Manufacturers") {
    manufacturer_image = "Manufacturers1.svg";
  } else if (bussinessName == "Agents and Representatives") {
    manufacturer_image = "Agents1.svg";
  } else if (bussinessName == "Resellers") {
    manufacturer_image = "Resellers1.svg";
  } else if (bussinessName == "Distributors") {
    manufacturer_image = "Distributors1.svg";
  } else if (bussinessName == "Retailers") {
    manufacturer_image = "Retailers1.svg";
  } else if (bussinessName == "") {
    manufacturer_image = "Others1.svg";
  } else if (bussinessName == "Wholesalers") {
    manufacturer_image = "Wholesalers1.svg";
  } else if (bussinessName == null) {
    manufacturer_image = "Others1.svg";
  } else if (bussinessName == undefined) {
    manufacturer_image = "Others1.svg";
  } else {
    manufacturer_image = "Others1.svg";
  }

  const unit = useSelector((state: any) => state.header.unit);
  const UnitName = (unit_id) => {
    return unit.find((v) => v.id == unit_id)?.name ?? "";
  };

  return (
    <>
      {openModal && (
        <QuoteModal open={openModal} handleClose={() => setModal(false)} />
      )}
      <BigPostOuterCardd>
        <Box>
          <BPMain direction="row" justifyContent="space-between">
            <Box
              sx={{
                borderRadius: "4px",
                backgroundColor: "#F2F2F2",
                padding: "2px 6px",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              {data.category_name}
            </Box>
            <Box>
              <BPstockChip
                qty={element.quantity}
                style={{ fontWeight: "600" }}
                className={`${
                  element.availability === "in_stock"
                    ? ProductModule.InStockStyle
                    : ProductModule.ByOrderStyle
                }`}
              >
                {element.availability === "in_stock"
                  ? "In Stock"
                  : element.availability === "by_order"
                  ? "By Order"
                  : ""}
                <CheckIcon className={ProductModule.checkicon} />
              </BPstockChip>
            </Box>
          </BPMain>
        </Box>

        <ContainerOuterBigPost>
          {selectedImage.length != 1 && (
            <Box
              className="desktopthumbslider"
              sx={{
                width: "14%",
                "@media screen and (max-width:900px)": {
                  width: "10%",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& .slick-arrow": {
                  transform: "rotate(90deg)",
                  "&::before": {
                    color: "#DADADA",
                    opacity: "1",
                  },
                },
                "& .slick-prev": {
                  top: "-12px",
                  left: "0",
                  right: "0",
                  zIndex: "2",
                  margin: "auto",
                },
                "& .slick-next": {
                  bottom: "-7px",
                  left: "0",
                  right: "0",
                  zIndex: "2",
                  margin: "auto",
                  top: "inherit",
                },
                "& .slick-slide": {
                  width: "100% !important",
                  maxWidth: "100% !Important",
                },
                "& .slick-slider": {
                  "& svg": {
                    color: "#fff",
                    background: "#e3e3e3",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                  },
                },
                "& .slick-track": {
                  height: "100% !important",
                },
              }}
            >
              {selectedImage.length != 1 && (
                <div
                  style={{
                    maxHeight: "240px",
                  }}
                >
                  <Slider {...settings}>
                    {selectedImage?.map((image, i) => (
                      <Box
                        sx={{
                          borderRadius: "6px",
                          border: "1px solid rgba(34, 51, 84, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            border: "1px solid #d7282f",
                          },
                        }}
                        key={`selectedImage${i}`}
                      >
                        <LazyLoadImage
                          style={{
                            objectFit: "contain",
                            height: "54px",
                            width: "100%",
                            borderRadius: "6px",
                          }}
                          src={image?.source}
                          alt={image.alt_tag}
                          className={
                            i === activeindex
                              ? ProductModule.slideActive
                              : ProductModule.slidesmall
                          }
                          onMouseEnter={() => setActiveindex(i)}
                          loading="lazy"
                        />
                      </Box>
                    ))}
                  </Slider>
                </div>
              )}
            </Box>
          )}
          <Box
            sx={{
              width: "90%",
              "@media screen and (max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            <Stack
              justifyContent="center"
              overflow="hidden"
              alignItems="center"
              flexGrow={1}
              bgcolor="white"
            >
              <Box
                className={ProductModule.postimage}
                position="relative"
                style={{
                  width: "100%",
                  borderLeft: 0,
                  borderRight: 0,
                }}
              >
                {element.product_type === "configured" && (
                  <div className={ProductModule.config_products}>
                    <span>Configuration</span>
                  </div>
                )}
                <Stack
                  onClick={handleClick}
                  className={ProductModule.stackarrow}
                  direction="row"
                >
                  {selectedImage.length != 1 && (
                    <>
                      <SliderArrowbigpost sx={50} onClick={prevhandler}>
                        <KeyboardArrowLeftIcon
                          fontSize="medium"
                          className={ProductModule.slikarrow}
                        />
                      </SliderArrowbigpost>
                      <SliderArrowbigpost sx={50} onClick={nexthandler}>
                        <KeyboardArrowRightIcon
                          fontSize="medium"
                          className={ProductModule.slikarrow}
                        />
                      </SliderArrowbigpost>
                    </>
                  )}
                </Stack>
                <Slides
                  slide={activeurl || selectedImage[0]}
                  element={element}
                />
              </Box>
            </Stack>
          </Box>
          {selectedImage.length != 1 && (
            <MobileHorizontallyThumbs className="mobilethumbslider">
              {selectedImage.length != 1 && (
                <div>
                  <Slider {...settingshorizontally}>
                    {selectedImage?.map((image, i) => (
                      <div>
                        <MobileSmallThumb key={`selectedImage${i}`}>
                          <LazyLoadImage
                            style={{
                              objectFit: "contain",
                              // height: "54px",
                              width: "100%",
                              borderRadius: "6px",
                            }}
                            src={image.source}
                            alt={image.alt_tag}
                            className={
                              i === activeindex
                                ? ProductModule.slideActive
                                : ProductModule.slidesmall
                            }
                            onClick={() => setActiveindex(i)}
                          />
                        </MobileSmallThumb>
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </MobileHorizontallyThumbs>
          )}
        </ContainerOuterBigPost>
        <Box>
          <Stack p={0} pb={0}>
            <Box
              sx={{
                margin: "0 8px 0",
                paddingBottom: "8px",
                borderBottom: "1px solid #EAEAEA",
              }}
            >
              <BigPostProductName
                component="h4"
                onClick={() => Navigate(element)}
                style={{ cursor: "pointer" }}
                className={ProductModule.product_name}
              >
                {element?.name?.length > 70
                  ? `${element?.name.substring(0, 70)}...`
                  : element?.name}
                {/* {element.name} */}
                {element?.product_name}
              </BigPostProductName>
              {data.product_type === "simple" ? (
                <Box
                  sx={{
                    fontSize: "13px",
                    color: "#4A4A4A",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "4px",
                    marginTop: "1px",
                    // paddingBottom: "8px",
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
                     
                      <Typography variant="h6" sx={{ color: "#D7282F" }}>
                        {data.price_unavailable_type || ""}
                      </Typography>
                    </Box>
                  ) : data.availability === "by_order" ||
                    data.availability === "in_stock" ? (
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
                  ) : null}
                </Box>
              ) : null}

              {data.product_type == "configured" && data?.model_number ? (
                <BigPostModelNumberOuter>
                  <BigPostModelNumber>Model Number:</BigPostModelNumber>
                  <LightTooltip
                    placement="top-start"
                    title={data?.model_number || "N/A"}
                    arrow
                    disableInteractive
                  >
                    <BigPostModelNumber
                      fontWeight={600}
                      className="boldtxt ProductLocationandbrand"
                    >
                      {data?.model_number || ""}
                    </BigPostModelNumber>
                  </LightTooltip>
                </BigPostModelNumberOuter>
              ):<><Box sx={{height:'21px'}}></Box></>}
            </Box>
          </Stack>
          <Stack>
            {element.country_origin_id && (
              <Box
                sx={{
                  margin: "8px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #EAEAEA",
                }}
              >
                <BPstackLabel component="label">Territory</BPstackLabel>
                <Stack direction="row" alignItems="center" mt={{ xs: 0.5 }}>
                  <BPstackText>
                    {" "}
                    <LocationOnOutlinedIcon
                      className={ProductModule.locatio_icon}
                    />
                    {countries
                      .filter((name) => {
                        return name.code == element.country_origin_id;
                      })
                      .map((item) => item.name)}
                  </BPstackText>
                </Stack>
              </Box>
            )}
          </Stack>
        </Box>

        <BigPostFooter className="BigPostFooter">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          ></Box>
          <Box
            sx={{
              padding: "0 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    fontSize: "13px",
                    color: "#231f20",
                    fontWeight: 600,
                    // margin: "4px 0 8px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textTransform: "capitalize",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "1",
                    display: "inline-flex",
                    alignItems: "end",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#d7282f",
                    },
                    "&  svg": { fontSize: "18px" },
                  }}
                  onClick={() => {
                    window.open(
                      `/mini-site/${
                        data?.company_details?.slug ?? data?.shop_slug
                      }`,
                      "_blank",
                      "noreferrer"
                    );
                  }}
                >
                  <LightTooltip
                    disableInteractive
                    title={data?.company_details?.company_name}
                    placement="top"
                    arrow
                  >
                    <>
                      {data?.company_details?.company_name ??
                        data?.shop_slug ??
                        data?.shop_name}
                      <ChevronRightOutlinedIcon />
                    </>
                  </LightTooltip>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      gap: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {bussiness && (
                      <>
                        <img
                          src={`/assets/images/${manufacturer_image}`}
                          style={{ height: "19px" }}
                          alt=""
                        />
                        {bussinessName.replace(/s(?=[^s]*$)/, "")}
                      </>
                    )}
                    {data.is_verified && (
                      <>
                        <SeparationDots />
                        <img src="/assets/verifyWtext.svg" alt="" />
                      </>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "end",
                    height: "100%",
                  }}
                >
                  <Button
                    sx={{ color: "#d7282f" }}
                    variant="contained"
                    className={ProductModule.big_post_btnblack}
                    onClick={() => {
                      let id = localStorage?.userData
                        ? JSON.parse(localStorage?.userData).id
                        : "";
                      if (id === element?.user_id) {
                        const swalWithBootstrapButtons = Swal.mixin({
                          customClass: {
                            confirmButton: "custom-btn cancel-button",
                            cancelButton: "custom-btn remove-btn",
                          },
                          buttonsStyling: false,
                        });
                        swalWithBootstrapButtons.fire({
                          title: "",
                          html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px !important">You cannot request a quotation <br> for your own products.</span>`,
                          icon: undefined,
                          showCancelButton: false,
                          reverseButtons: true,
                          imageUrl: "/assets/minisiteimages/blockquote.webp",
                          imageWidth: 80,
                          imageAlt: "alt",
                        });
                        return;
                      }
                      handleQuote(element.id, "quote");
                    }}
                  >
                    {loader === "quote" ? (
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
                      " Get Quote"
                    )}
                  </Button>
                  
                </Box>
              </Grid>
            </Grid>
          </Box>
        </BigPostFooter>
      </BigPostOuterCardd>
    </>
  );
}

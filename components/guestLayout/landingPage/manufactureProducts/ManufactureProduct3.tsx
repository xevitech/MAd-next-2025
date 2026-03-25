import {
  Avatar,
  Box,
  Button,
  Chip,
  Drawer,
  Grid,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";

import {
  BusinessImage,
  ChipOuter,
  ChipSpan,
  FilterBox,
  FilterBTN,
  FilterHeading,
  ManufactureBusinessType,
  ManufactureChatBTN,
  ManufactureContactSupplierBTN,
  ManufactureCountry,
  ManufactureFlexBox,
  ManufacturerAttachmntArea,
  ManuFacturerBTNBox,
  ManufacturerButtonRequest,
  ManuFacturerDetails,
  ManuFacturerFlexBox,
  ManuFacturerimageBox,
  ManuFacturerimageNtextBox,
  ManuFacturerNameverifiedcountryBox,
  ManuFacturerPlanNall,
  ManuFacturerSellerName,
  ManuFacturerSupplierTo,
  ManufactureSellerName,
  ManufactureUserStatus,
  ManufactureWishlist,
  Spacing,
} from "./ManufactureStyle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  AttachmentBox,
  AttachmentName,
  AttachmentOuter,
  ButtonSize,
  OurTopProducts,
} from "../styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { apiClient } from "@/components/common/common";
import ProductItem from "@/components/ProductsListing/ProductItem";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CountryFilter4 from "@/components/ProductsListing/CountryFilter4";
import CategoryFilter4 from "@/components/ProductsListing/CategoryFilter4";
import { CommonDialogHeader } from "@/components/common/modal/styles";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ManufactureSkeleton from "../skeleton/ManufactureSkeleton";
import NoDataFound from "@/components/common/NoDataFound";
import { useFormik } from "formik";
// import ChatWindow from "@/components/Chat";
// import useInitiateChatAndOpenWindow from "@/components/Chat/common/customHooks/useInitiateChat";
import Swal from "sweetalert2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PriceFilter4 from "@/components/ProductsListing/PriceFilter4";
import BusinessFilter4 from "@/components/ProductsListing/BusinessFilter4";
import { getBussinessTypeIcon } from "@/components/Helper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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
  infinite: false,
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

const SellerInfoAndSlider = ({
  sellerName,
  country,
  companyName,
  since,
  staffCount,
  business,
  products,
  idd,
  key,
  hdco,
  plan_name,
  logo,
  shop_user_id,
  isInWishlist,
  wishlist,
  userId,
  currentlyLoggedInUserId,
  verified_by,
  handleAddToWishlist,
  flag,
  tooltip,
  staff,
  token,
}) => {
  const getLogoFunc = (plan_name) => {
    switch (plan_name) {
      case "Gold":
        return (
          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/gold.svg"
            alt=""
            height={25}
          />
        );

      case "Silver":
        return (
          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/silver.svg"
            alt=""
            height={25}
          />
        );
      case "Enterprise":
        return (
          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/enterprise.svg"
            alt=""
            height={25}
          />
        );
      default:
        return (
          <img
            src="https://merchantad.xevitech.com/public/uploads/icon/free.svg"
            alt="free"
            height={25}
          />
        );
    }
  };
  const getBackgroundStyle = (plan_name) => {
    switch (plan_name) {
      case "Gold":
        return {
          background:
            "linear-gradient(180deg, rgba(255, 215, 0, 0.16) 0%, rgba(255, 215, 0, 0) 100%)",
          padding: "20px",
          borderRadius: "10px",
          margin: "0 0 10px 0",
        };

      case "Enterprise":
        return {
          background:
            "linear-gradient(180deg, rgba(0, 71, 171, 0.16) 0%, rgba(0, 71, 171, 0) 100%)",
          padding: "20px",
          borderRadius: "10px",
        };
      case "Silver":
        return {
          background:
            "linear-gradient(180deg, rgba(128, 122, 135, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)",
          padding: "20px",
          borderRadius: "10px",
        };
      default:
        return {
          background:
            "linear-gradient(180deg, rgba(115, 110, 10, 0.16) 0%, rgba(251, 15, 0, 0) 100%)",
          padding: "20px",
          borderRadius: "10px",
        };
    }
  };

  const businessTypeIcon = getBussinessTypeIcon(business);
  return (
    <Box sx={getBackgroundStyle(plan_name)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ManuFacturerFlexBox>
            <ManuFacturerimageNtextBox>
              <ManuFacturerimageBox>
                <img
                  src={logo ?? "assets/images/No-seller-comimage.svg"}
                  alt="logo"
                />
              </ManuFacturerimageBox>
              <ManuFacturerDetails>
                <ManuFacturerNameverifiedcountryBox>
                  <ManufactureSellerName>{sellerName}</ManufactureSellerName>
                  {verified_by !== "Not Verified" && (
                    <img
                      src="/assets/verifyWtext.svg"
                      alt=""
                      width={60}
                      height={21}
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${flag?.toLowerCase()}.png`}
                      alt={`Flag of ${country}`}
                      style={{
                        border: "1px solid #ddd",
                        padding: "1px",
                        borderRadius: "2px",
                      }}
                    />
                    <Box component={"span"}>
                      <ManufactureCountry>{country}</ManufactureCountry>
                    </Box>
                  </Box>
                </ManuFacturerNameverifiedcountryBox>
                <ManuFacturerPlanNall>
                  {getLogoFunc(plan_name)}
                  {since && (
                    <Typography sx={{ fontSize: "12px" }}>
                      Since {since}
                    </Typography>
                  )}
                  <LightTooltip
                    arrow
                    disableInteractive
                    placement="top"
                    title={tooltip}
                  >
                    <ManufactureBusinessType sx={{ fontSize: "14px" }}>
                      <BusinessImage
                        src={`assets/images/${businessTypeIcon}`}
                        alt=""
                      />
                      {business?.toString().replace(/s(?=[^s]*$)/, "")}
                    </ManufactureBusinessType>
                  </LightTooltip>
                  <ManufactureUserStatus>
                    {staff}+ Staff
                  </ManufactureUserStatus>
                </ManuFacturerPlanNall>
              </ManuFacturerDetails>
            </ManuFacturerimageNtextBox>
            <ManuFacturerBTNBox>
              <ManufactureContactSupplierBTN
                onClick={() => hdco({ shop_user_id, logo, sellerName })}
              >
                Contact seller
              </ManufactureContactSupplierBTN>

              <ManufactureChatBTN
                onClick={() => {
                  if (userId === currentlyLoggedInUserId) {
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
                  } 
                }}
              >
                Chat Now
              </ManufactureChatBTN>
              <ManufactureWishlist>
                {wishlist.includes(shop_user_id) ? (
                  <FavoriteIcon
                    onClick={() => handleAddToWishlist(shop_user_id)}
                    style={{ color: "#d7282f", cursor: "pointer" }}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => handleAddToWishlist(shop_user_id)}
                    style={{ color: "#d7282f", cursor: "pointer" }}
                  />
                )}
              </ManufactureWishlist>
            </ManuFacturerBTNBox>
          </ManuFacturerFlexBox>
        </Grid>
        <Grid item xs={12}>
          <OurTopProducts sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              {Array.isArray(products) ? (
                products.length > 0 ? (
                  products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                      <Box sx={{ margin: "0 5px" }}>
                        <ProductItem
                          data={{
                            ...product,
                            business,
                            company_namee: sellerName,
                            category_name: companyName,
                          }}
                        />
                        {/* bb={business} */}
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <div>No products available</div>
                )
              ) : (
                Object.values(products || {}).map((product: {}, index) => (
                  <Grid item xs={12} sm={12} md={4} key={index}>
                    <Box sx={{ margin: "0 5px" }}>
                      <ProductItem
                        data={{
                          ...product,
                          business,
                          company_namee: sellerName,
                          category_name: companyName,
                        }}
                      />
                      {/* bb={business} */}
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
          </OurTopProducts>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function ManufactureProducts3() {
  const router = useRouter();
  const [checkedBusiness, setCheckedBusiness] = useState<any>([]);
  const [checkedCountry, setCheckedCountry] = useState<any>([]);
  const [checkedCategory, setCheckedCategory] = useState<any>([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const userQuery = router.query;
  const { isReady } = router;
  const name = userQuery.name as string;
  const filter = userQuery.filter as string;

  const [state, setState] = React.useState({
    bottom: false,
  });
  const [selectedSellerId, setSelectedSellerId] = useState<any>({});
  const [token, setToken] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [userID, setuserID] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [unitsOptions, setUnitsOptions] = useState<any[]>([]);
  const [pricerange, setPriceRange] = useState([]);
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [statusWishlist, setStatusWishlist] = useState(null);
  const companyDetails = useSelector((state: any) => state.companyProfile);
  const { basic_information } = companyDetails;

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userData"))?.id;
    const token = localStorage.getItem("token");
    setuserID(id);
    setToken(token ?? "");
  }, []);
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

  const initialValues = {
    product_name: "",
    purchase_quantity: "",
    units: "",
    description: "",
    attachment: [],
  };
  const validationSchema = Yup.object().shape({
    product_name: Yup.string().required("Product name is required"),
    purchase_quantity: Yup.number().required("Purchase quantity is required"),
    units: Yup.string().required("Units/Sets is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    if (!token) {
      toast.info("Please Login");
      return;
    }
    let formData = new FormData();
    formData.append("product_name", values.product_name);
    formData.append("purchase_quantity", values.purchase_quantity);
    formData.append("sets", values.units);
    formData.append("description", values.description);
    formData.append("seller_user_id", selectedSellerId?.shop_user_id);
    formData.append("enquiry_user_id", userID);
    if (values.attachment) {
      if (Array.isArray(values.attachment)) {
        values.attachment.forEach((file) =>
          formData.append("attachment[]", file)
        );
      } else {
        formData.append("attachment", values.attachment);
      }
    }
    try {
      const response = apiClient(
        "front/getQuery/contactSeller",
        "post",
        { body: formData },
        true
      );
      toast.success("query submitted");
      formik.resetForm();
      setFilePreviews([]);
      setIsSubmitted(false);
    } catch (err) {
      toast.error("err", err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleAddToWishlist = async (shop_user_id) => {
    try {
      console.log("shop_user_id", shop_user_id);
      if (!token) {
        toast.info("Please login to add products to wishlist");
        return;
      }

      const response = await apiClient("front/shops/like_unlike", "POST", {
        body: { shop_id: shop_user_id },
      });

      if (response?.status === 200) {
        toast.success("Added to wishlist successfully!");
        fetchWishlist();
      } else {
        toast.error(response?.message || "Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  const fetchWishlist = async () => {
    try {
      if (token) {
        const response = await apiClient("product/supplier/wishlist", "GET", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const shops = Object.values(response).filter(
          (shop: any) => shop.shop_id
        );
        console.log("shops", shops);
        setWishlist(shops.map((i: any) => i.shop_id));
        console.log("wishlist", shops);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("An error occurred in fetchWishList. Please try again.");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isInWishlist = (shop_user_id) => wishlist.includes(shop_user_id);

  const {
    user_info: { id: currentlyLoggedInUserId },
  } = useSelector((state: any) => state.userData);

  // const initiateChat = useInitiateChatAndOpenWindow();

  const fetchSellerProducts = async () => {
    try {
      const currency = localStorage.getItem("currency") ?? "1";
      const params = new URLSearchParams();

      if (checkedBusiness.length > 0) {
        checkedBusiness.forEach((type) => {
          params.append("business_type", type);
        });
      } else if (filter) {
        params.append("business_type", filter);
      }

      checkedCountry.forEach((type) => {
        params.append("country_name", type);
      });

      checkedCategory.forEach((type) => {
        params.append("category_name", type);
      });

      if (pricerange.length === 2) {
        params.append("yearly_revenu", `${pricerange[1]}-${pricerange[0]}`);
      } else if (selectedValue) {
        params.append("yearly_revenu", selectedValue);
      }

      if (name) {
        params.append("name", name);
      }

      const queryString = params.toString();
      const url = `front/manufacture/seller_products?currency=${currency}&${queryString}`;
      const response = await apiClient(url, "get");
      if (response.status === 200) {
        console.log("Seller Products:", response.data);
        setApiData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  const handleBusinessFilterChange = (selectedFilters: any[]) => {
    setCheckedBusiness(selectedFilters);
  };
  const handleCountryFilterChange = (selectedFilters: any[]) => {
    setCheckedCountry(selectedFilters);
  };
  const handleCategoryFilterChange = (selectedFilters) => {
    setCheckedCategory(selectedFilters);
  };
  const handleCategoryPriceChange = (max, min) => {
    setPriceRange([max, min]);
    console.log("Updated price range:", pricerange);
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event);
    console.log("event", event);
  };

  const setBusinessFilterFromQuery = (filterValue) => {
    if (filterValue) {
      setCheckedBusiness([filterValue]);
    }
  };
  const displayItemsFn = () => {
    setSelectedValue(null);
    setCheckedCategory([]);
  };
  const handleQueryfn = () => {
    if (userQuery.name) {
      const { name: _, ...newQuery } = router.query;
      router.push({
        pathname: router.pathname,
      });
    } else if (userQuery.filter) {
      const { filter: _, ...newQuery } = router.query;
      router.push({
        pathname: router.pathname,
      });
    }
  };

  useEffect(() => {
    if (isReady) {
      fetchSellerProducts();
    }
  }, [
    checkedBusiness,
    checkedCountry,
    checkedCategory,
    isReady,
    pricerange,
    selectedValue,
    userQuery,
  ]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = ({ shop_user_id, logo, sellerName }) => {
    setOpen(true);
    setSelectedSellerId({ shop_user_id, logo, sellerName });
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedSellerId({});
  };
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const updatedFiles = [
      ...(formik.values.attachment || []),
      ...selectedFiles,
    ];
    formik.setFieldValue("attachment", updatedFiles);
    const names = selectedFiles.map((file: any) => file.name);
    setFilePreviews((prev) => [...prev, ...names]);
  };
  const handleRemoveAttachment = (index) => {
    setFilePreviews((prev) => {
      const updatedPreviews = prev.filter((_, i) => i !== index);
      return updatedPreviews;
    });
    formik.setFieldValue(
      "attachment",
      formik.values.attachment.filter((_, i) => i !== index)
    );
  };

  if (loading) {
    return <ManufactureSkeleton></ManufactureSkeleton>;
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, bottom: open });
    };
  const list = () => (
    <Box sx={{ width: "auto" }} role="presentation">
      <FilterBox>
        <FilterHeading>Filter</FilterHeading>
        <div className="productnav">
          <BusinessFilter4
            checkedValues={checkedBusiness}
            onChange={handleBusinessFilterChange}
          />
          <CountryFilter4
            checkedValues={checkedCountry}
            onChange={handleCountryFilterChange}
          />
          <CategoryFilter4
            value={checkedCategory}
            onChange={handleCategoryFilterChange}
          />
          <PriceFilter4
            value={selectedValue}
            onAnnualPriceChange={handleSelectChange}
          />
        </div>
      </FilterBox>
    </Box>
  );
  return (
    <Box className="mypagecontainer manufactureBG">
      {/* <ChatWindow /> */}
      <Spacing sx={{}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
            {!isMobile && (
              <FilterBox>
                <FilterHeading>Filter</FilterHeading>
                <div className="productnav">
                  <Box
                    sx={
                      ((checkedBusiness && checkedBusiness.length > 0) ||
                        (checkedCategory && checkedCategory.length > 0) ||
                        (checkedCountry && checkedCountry.length > 0) ||
                        (selectedValue && selectedValue.length > 0) ||
                        name ||
                        filter) && {
                        border: "1px solid #E9E9E9",
                        borderRadius: "10px",
                        padding: "10px",
                        margin: "8px 0 0 0",
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                      }
                    }
                  >
                    {selectedValue && (
                      <ChipOuter
                        onClick={(e) => {
                          setSelectedValue("");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {Array.isArray(selectedValue) &&
                        selectedValue.length > 2 ? (
                          <Chip
                            label={selectedValue.join(", ")}
                            variant="outlined"
                            onDelete={() => setSelectedValue([] as any)}
                          />
                        ) : (
                          <LightTooltip
                            arrow
                            disableInteractive
                            placement="top-start"
                            title={
                              Array.isArray(selectedValue)
                                ? selectedValue.join(", ")
                                : selectedValue
                            }
                          >
                            <Chip
                              label={
                                <>
                                  <ChipSpan>Price Range:</ChipSpan>{" "}
                                  {Array.isArray(selectedValue)
                                    ? selectedValue.join(", ")
                                    : selectedValue}
                                </>
                              }
                              variant="outlined"
                              onDelete={() => setSelectedValue("")}
                            />
                          </LightTooltip>
                        )}
                      </ChipOuter>
                    )}

                    {checkedCategory.length > 0 && (
                      <ChipOuter>
                        {checkedCategory.length >= 2 ? (
                          <LightTooltip
                            arrow
                            disableInteractive
                            placement="top-start"
                            title={checkedCategory.join(", ")}
                          >
                            <Chip
                              label={
                                <>
                                  <ChipSpan>Categories:</ChipSpan>{" "}
                                  {checkedCategory.join(", ")}
                                </>
                              }
                              variant="outlined"
                              onDelete={() => setCheckedCategory([])}
                            />
                          </LightTooltip>
                        ) : (
                          checkedCategory.map((category, index) => (
                            <Chip
                              key={index}
                              variant="outlined"
                              label={
                                <>
                                  <ChipSpan>Category:</ChipSpan> {category}
                                </>
                              }
                              onDelete={() =>
                                setCheckedCategory(
                                  checkedCategory.filter((_, i) => i !== index)
                                )
                              }
                            />
                          ))
                        )}
                      </ChipOuter>
                    )}

                    {checkedCountry.length > 0 && (
                      <ChipOuter>
                        {checkedCountry.length >= 2 ? (
                          <LightTooltip
                            arrow
                            disableInteractive
                            placement="top-start"
                            title={checkedCountry.join(", ")}
                          >
                            <Chip
                              sx={{ width: "100%" }}
                              label={
                                <>
                                  <ChipSpan>Countries:</ChipSpan>{" "}
                                  {checkedCountry.join(", ")}
                                </>
                              }
                              variant="outlined"
                              onDelete={() => setCheckedCountry([])}
                            />
                          </LightTooltip>
                        ) : (
                          checkedCountry.map((country, index) => (
                            <Chip
                              key={index}
                              label={
                                <>
                                  <ChipSpan>Country:</ChipSpan> {country}
                                </>
                              }
                              variant="outlined"
                              onDelete={() =>
                                setCheckedCountry(
                                  checkedCountry.filter((_, i) => i !== index)
                                )
                              }
                            />
                          ))
                        )}
                      </ChipOuter>
                    )}

                    {name ? (
                      <Chip
                        label={name}
                        variant="outlined"
                        onDelete={handleQueryfn}
                      />
                    ) : (
                      ""
                    )}

                    {(checkedBusiness.length > 0 || filter) && (
                      <ChipOuter>
                        {checkedBusiness.length > 0 ? (
                          checkedBusiness.length >= 2 ? (
                            <LightTooltip
                              arrow
                              disableInteractive
                              placement="top"
                              title={checkedBusiness.join(", ")}
                            >
                              <Chip
                                label={
                                  <>
                                    <ChipSpan>Business Types:</ChipSpan>{" "}
                                    {checkedBusiness.join(", ")}
                                  </>
                                }
                                variant="outlined"
                                onDelete={() => {
                                  setCheckedBusiness([]);
                                }}
                              />
                            </LightTooltip>
                          ) : (
                            checkedBusiness.map((business, index) => (
                              <Chip
                                key={index}
                                label={
                                  <>
                                    <ChipSpan>Business Type:</ChipSpan>{" "}
                                    {business}
                                  </>
                                }
                                variant="outlined"
                                onDelete={() =>
                                  setCheckedBusiness(
                                    checkedBusiness.filter(
                                      (_, i) => i !== index
                                    )
                                  )
                                }
                              />
                            ))
                          )
                        ) : (
                          filter && (
                            <Chip
                              label={
                                <>
                                  <ChipSpan>Business Type:</ChipSpan> {filter}
                                </>
                              }
                              variant="outlined"
                              onDelete={handleQueryfn}
                            />
                          )
                        )}
                      </ChipOuter>
                    )}
                  </Box>

                  <BusinessFilter4
                    checkedValues={checkedBusiness}
                    onChange={handleBusinessFilterChange}
                  />
                  <CountryFilter4
                    checkedValues={checkedCountry}
                    onChange={handleCountryFilterChange}
                  />
                  <CategoryFilter4
                    value={checkedCategory}
                    onChange={handleCategoryFilterChange}
                  />
                  <PriceFilter4
                    value={selectedValue}
                    onAnnualPriceChange={handleSelectChange}
                  />
                </div>
              </FilterBox>
            )}
            {isMobile && (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <FilterBTN
                  onClick={toggleDrawer(true)}
                  startIcon={<FilterAltOutlinedIcon />}
                >
                  Filter
                </FilterBTN>
                <Drawer
                  anchor="left"
                  open={state.bottom}
                  onClose={toggleDrawer(false)}
                >
                  {list()}
                </Drawer>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={10}>
            <ManufactureFlexBox>
              {apiData.length > 0 ? (
                apiData.map((item, index) => {
                  let businessNames = [];

                  if (item.business_type) {
                    try {
                      const parsedBusinessType = JSON.parse(item.business_type);
                      businessNames = parsedBusinessType
                        .filter(
                          (business) =>
                            business.toggle === true || business.toggle === "1"
                        )
                        .map((business) => business.name)
                        .join(",");
                    } catch (error) {
                      console.error("Error parsing business type:", error);
                    }
                  }

                  return (
                    <SellerInfoAndSlider
                      key={`${item.user_id}-${index}`}
                      sellerName={item.company_name}
                      country={item.country_name}
                      flag={item.registration_country_id}
                      tooltip={item.getTooltipMessage}
                      staff={item.no_of_employee}
                      since={item.registration_year}
                      staffCount={item?.staff_count}
                      business={businessNames}
                      products={item?.products}
                      idd={item?.user_id}
                      hdco={handleClickOpen}
                      plan_name={item?.plan_name}
                      logo={item?.logo}
                      shop_user_id={item.shop_user_id}
                      isInWishlist={isInWishlist}
                      wishlist={wishlist}
                      userId={item?.id}
                      currentlyLoggedInUserId={currentlyLoggedInUserId}
                      companyName={item?.category_name}
                      verified_by={item?.verified_by}
                      token={token}
                      handleAddToWishlist={handleAddToWishlist}
                    />
                  );
                })
              ) : (
                <Box>
                  <NoDataFound />
                </Box>
              )}
            </ManufactureFlexBox>
          </Grid>
        </Grid>
      </Spacing>
      <Box>
        <BootstrapDialog
          sx={CommonDialogHeader}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Query
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <ManuFacturerSupplierTo>
            <Typography>
              To: {selectedSellerId?.sellerName || "Loading..."}
            </Typography>
            <ManuFacturerSellerName>
              <Avatar
                alt="Remy Sharp"
                src={
                  selectedSellerId?.logo ??
                  "assets/images/No-seller-comimage.svg"
                }
              />
              <Typography variant="body2"></Typography>
            </ManuFacturerSellerName>
          </ManuFacturerSupplierTo>
          <DialogContent dividers>
            <form
              onSubmit={(event) => {
                setIsSubmitted(true);
                formik.handleSubmit(event);
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="product_name"
                    fullWidth
                    label="Product Name"
                    variant="outlined"
                    size="small"
                    value={formik.values.product_name}
                    onChange={formik.handleChange}
                    error={isSubmitted && Boolean(formik.errors.product_name)}
                    helperText={isSubmitted && formik.errors.product_name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="purchase_quantity"
                    fullWidth
                    label="Purchase Quantity"
                    variant="outlined"
                    size="small"
                    value={formik.values.purchase_quantity}
                    onChange={formik.handleChange}
                    error={
                      isSubmitted && Boolean(formik.errors.purchase_quantity)
                    }
                    helperText={isSubmitted && formik.errors.purchase_quantity}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Select
                    name="units"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formik.values.units}
                    onChange={formik.handleChange}
                    error={isSubmitted && Boolean(formik.errors.units)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    displayEmpty
                    renderValue={(value) =>
                      value ? (
                        value
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#A2A2A2",
                            fontWeight: "400",
                          }}
                        >
                          Select a unit
                        </Typography>
                      )
                    }
                  >
                    {unitsOptions.map((unit) => (
                      <MenuItem key={unit.name} value={unit.name}>
                        {unit.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Please describe your specific sourcing requirements."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={isSubmitted && Boolean(formik.errors.description)}
                    helperText={isSubmitted && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <ManufacturerAttachmntArea>
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
                              <AttachmentName>{name}</AttachmentName>
                            </LightTooltip>
                            <LightTooltip
                              arrow
                              disableInteractive
                              title="cancel"
                              placement="top"
                            >
                              <CloseOutlinedIcon
                                onClick={() => handleRemoveAttachment(index)}
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
                      startIcon={<i className="icon-attachment"></i>}
                    >
                      Add Attachment
                      <VisuallyHiddenInput
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />
                    </Button>
                  </ManufacturerAttachmntArea>
                </Grid>
              </Grid>
              <DialogActions>
                <ManufacturerButtonRequest
                  variant="outlined"
                  color="primary"
                  type="submit"
                  size="small"
                >
                  Send Query{" "}
                </ManufacturerButtonRequest>
              </DialogActions>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </Box>
    </Box>
  );
}

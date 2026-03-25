import React, { useEffect, useState } from "react";
import {
  FontContainer,
  OverviewBox,
  OverviewData,
  OverviewOpt,
  AvailabilityCol,
  ProductAvailability,
  PriceQuoteCol,
  QuoteBtnCol,
  SelectedOrigin,
  ShippingOption,
  PaymentOpt,
  ProductAvlil,
  OriginShippingPayIconsInfo,
  CheckedTypography,
  ContactForShippingBox,
  PaymentMethodImageBox,
  DetailBigOverview,
  SelectproductFeature,
  StyleDrawer,
} from "@/components/ProductDetail/style";
import { Box, Grid, Typography, Button } from "@mui/material";
import {
  CountryName,
  HideOptionns,
  PortLocationContainer,
  PortStyleContainer,
} from "@/components/ProductDetail/ProductComponents/Style";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  CurrencySymbol,
  getCountryNameByCode,
  GetFileExtension,
  NameFromUrl,
} from "@/components/common/common";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import QuoteModal from "./Modal/QuoteModal";
import { useAppDispatch } from "redux/store";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import Quantity from "./Modal/Quantity";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import QueryModal from "./Modal/QueryModal";
import Auth from "@/auth/Auth";
import Swal from "sweetalert2";
import ConfigureProduct from "./ConfigureProduct";
import Placeholder from "pages/placeholder/[id]";
import ConfigueQuoteModal from "./Modal/ConfigueQuoteModal";
import GetQuoteConfigModal from "./Modal/GetQuoteConfiModal";
import ProductItemConfigGetQuote from "./Modal/ProductItemConfigGetQuote";
import { PriceRangeColInfo } from "@/components/products/editProduct/commercialInformation/styles";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SpHead = styled(Typography)(() => ({
  fontWeight: 600,
  fontFamily: "Open sans",
  color: "#231F20",
  textTransform: "capitalize",
}));

const BigOverview = ({ marginTop = "0px" }) => {
  const { upload_files, is_placeholder } = useSelector(
    (state: any) => state.productDetail.detail.data
  );
  function downloadCatalogs() {
    let links = upload_files.map((v) => v.source);
    let name = NameFromUrl(links[0]);
    let ext = GetFileExtension(links);
    for (let i = 0; i < links.length; i++) {
      fetch(links[i], { mode: "no-cors", method: "GET" })
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.setAttribute("aria-label", "Download Catalog");
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          const fileName = links[i].substring(links[i].lastIndexOf("/") + 1);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading image:", error));
    }
  }

  const {
    existence_place,
    country_origins,
    product_type,
    availability,
    dispatch_day,
    dispatch_in,
    brand_name,
    price_term,
    negotiable_price,
    price_type,
    quantity_based_list,
    quantity_status,
    qty_unit,
    unit_price,
    currency_id,
    unit,
    hide_price,
    specifications,
    custom_specification,
    port_,
    case_label,
    in_house_production,
    in_house_production_days,
    available_restrictions_availibility,
    available_restrictions_country,
    available_restrictions_status,
    manufacturing_restrictions_availibility,
    manufacturing_restrictions_country,
    manufacturing_restrictions_status,
    shiping_restrictions_toggle,
    production_unit,
    delivery_time,
    delivery_select,
    caseData,
    payment_methods,
    hide_price_condition,
    quote_button_type,
    case_type,
    delivery_time_period,
    delivery_time_value,
    user_id,
    production_unit_name,
    symbol,
    qty_unit_name,
    price_unavailable_type,
    id,
    unit_name = "",
    minimum_order,
  } = useSelector((state: any) => state.productDetail.detail.data);
  const newPOrtData = port_.split(",");
  // let symbol = `${CurrencySymbol(currency_id)}`;

  // const strongElementText = case_label.match(/<strong>(.*?)<\/strong>/)[1];
  // const splittedValues = strongElementText
  //   .split(",")
  //   .map((value) => value.trim());
  const { quotedetails } = useSelector((state: any) => state.quoteDetails);
  const matchResult = case_label?.match(/<strong>(.*?)<\/strong>/);
  let splittedValues;
  if (matchResult) {
    const strongElementText = matchResult[1];
    splittedValues = strongElementText.split(",").map((value) => value.trim());
  } else {
    splittedValues = case_label;
  }

  let unitList = useSelector((state: any) => state.header.unit);
  const { productQuantity } = useSelector((state: any) => state.quoteDetails);
  const { country } = useSelector((state: any) => state.productDetail);
  const [openModal, setModal] = useState<boolean>(false);
  const [openConfiModal, setConfiModal] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const { sea_ } = useSelector((state: any) => state.productDetail.detail.data);
  const data = useSelector((state: any) => state.productDetail.detail.data);
  const dispatch = useAppDispatch();
  const Units = useSelector((state: any) => state.productDetail.unit);
  const [openSupplier, setOpenSupplier] = React.useState(false);
  const handleClose = () => {
    setOpenSupplier(false);
  };
  const GetCountryName = (name: any) => {
    let countryName = name?.split(",");
    let countriesName = countryName?.map(
      (v) => country.find((el) => el.value == v)?.view
    );
    return countriesName?.toString();
  };
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  console.log("quotedetails?.hide_price----", quotedetails, hide_price);
  const toggleFlyout = () => {
    setIsFlyoutOpen(!isFlyoutOpen);
  };
  const [isFlyoutConfiOpen, setIsFlyoutConfiOpen] = useState(false);

  console.log(minimum_order, unit_name, "minimum_order-----------------");

  const toggleConfiFlyout = () => {
    setIsFlyoutConfiOpen(!isFlyoutConfiOpen);
  };
  const GetCountryOrigins = (name: any) => {
    if (availability == "in_stock") {
      let countryName = existence_place?.split(",");
      let countriesName = countryName?.map(
        (v) => country.find((el) => el.value == v)?.view
      );
      return countriesName?.toString();
    } else {
      let countryName = country_origins?.split(",");
      let countriesName = countryName?.map(
        (v) => country.find((el) => el.value == v)?.view
      );
      return countriesName?.toString();
    }
  };

  const Value = [
    ...(Array.isArray(custom_specification) ? custom_specification : []),
    ...specifications.map((v) => ({ title: v.name, value: v.values })),
  ];
  const newSeaData = sea_.split(",");
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      // {
      //   breakpoint: 1600,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //     infinite: false,
      //     dots: false,
      //   },
      // },
      // {
      //   breakpoint: 1366,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2,
      //     infinite: false,
      //     dots: false,
      //   },
      // },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: false,
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
  let unitToShow =
    Units?.find((v) => (v.id == qty_unit ? qty_unit : unit ? unit : ""))
      ?.name ?? null;
  let productionUnit =
    Units?.find((v) => v.id == production_unit)?.name ?? null;
  let AvailableCountry = GetCountryName(available_restrictions_country);

  let ManufacturerCountry = GetCountryName(manufacturing_restrictions_country);
  let country_origin = GetCountryOrigins(country_origins);
  const DeliveryTerms = [
    { name: "EXW", tooltip: "Ex Works" },
    { name: "FOB", tooltip: "Free On Board" },
    { name: "CFR/CNF", tooltip: "Cost and Freight" },
    { name: "CNF/CFR", tooltip: "Cost and Freight" },
    { name: "CFR", tooltip: "Cost and Freight" },
    { name: "CNF", tooltip: "Cost and Freight" },
    { name: "CIF", tooltip: "Cost, Insurance and Freight" },
    { name: "CPT", tooltip: "Carriage Paid To" },
    { name: "CIP", tooltip: "Carriage and Insurance Paid To" },
    { name: "DAF", tooltip: "Delivered at Frontier" },
    { name: "DES", tooltip: "Delivered Ex Ship" },
    { name: "DDP", tooltip: "Delivery Duty Paid" },
    { name: "DDU", tooltip: "Delivery Duty Unpaid" },
  ];
  let ids = localStorage?.userData ? JSON.parse(localStorage?.userData).id : "";
  const paymentMethods = [
    {
      src: "/assets/powercozmo.png",
      name: "Payment through Merchant AD",
      tooltip:
        "Most recommended method, Merchant AD safeguards the payment until the buyer verifies the receipt of goods or documents, establishing a secure and transparent transaction for both parties.",
    },
    {
      src: "/assets/cbs.svg",
      name: "CBS (Cash before Shipment)",
      tooltip:
        "Guarantees payment for the seller before shipment, eliminating risk but potentially discouraging buyers due to the upfront requirement.",
    },
    {
      src: "/assets/advancepayment.svg",
      name: "Advanced Payment",
      tooltip:
        "Encourages buyer commitment and accelerates cash flow for the seller by receiving a portion of the payment upfront but requires trust from the buyer.",
    },
    {
      src: "/assets/ach.svg",
      name: "ACH Transfer",
      tooltip:
        "Transfers funds electronically within the same country, offering a cost-effective alternative to wire transfers but with slightly longer processing times.",
    },
    {
      src: "/assets/credit-card.svg",
      name: "Credit Card",
      tooltip:
        "Offers convenience and wide acceptance for buyers, but sellers incur processing fees.",
    },
    {
      src: "/assets/debit-card.svg",
      name: "Debit Card",
      tooltip:
        "Similar to credit cards but deducts funds directly from the buyer's bank account, offering convenience and security.",
    },
    {
      src: "/assets/paypal.svg",
      name: "Online Payment Platforms (e.g. PayPal)",
      tooltip:
        "Provides a secure and user-friendly platform for online payments, but fees may be associated with transactions.",
    },
    {
      src: "/assets/cash.svg",
      name: "Cash",
      tooltip:
        "Traditional payment method accepted by most businesses but carries the risk of theft or loss.",
    },
    { name: "Escrow", tooltip: "", src: "/assets/escrow.svg" },
    {
      src: "/assets/dp.svg",
      name: "D/P (Documents against Payment)",
      tooltip:
        "Provides some security for the seller while allowing buyers to inspect goods before payment.",
    },
    {
      src: "/assets/da.svg",
      name: "D/A (Documents against Acceptance)",
      tooltip: "Offers extended credit terms to the buyer compared to D/P.",
    },
    {
      src: "/assets/tt.svg",
      name: "TT (Telegraphic Transfer)",
      tooltip:
        "Fast, secure, and widely accepted globally. Transparent fees and tracking of funds.",
    },
    {
      src: "/assets/lc.svg",
      name: "LC (Letter of Credit)",
      tooltip:
        "Guarantees payment to the seller through a bank upon fulfilling specific conditions outlined in the LC document, offering high security but requiring complex setup and incurring bank fees.",
    },
  ];

  const hideOptions1 = [
    {
      name: "Sign in to show price.",
      value: 1,
    },
    {
      name: "<strong>Price Flexible</strong>: The price of the product is flexible and may vary depending on quantity and other factors. Please sign in to discuss pricing.",
      value: 2,
    },
    {
      name: "<strong>Price Negotiable Upon Request</strong>: Please sign in for pricing information. The price of the product may vary depending on quality and other factors.",
      value: 3,
    },
    {
      name: "<strong>Price Subject to Negotiation</strong>: The price of the product is negotiable upon request. Please sign in for more information.",
      value: 4,
    },
    {
      name: `<strong>Price Subject to Final Agreement</strong>: The price of this product is flexible and may vary depending on quantity and other factors. Please sign in to discuss pricing.`,
      value: 5,
    },
  ];
  const login = [
    {
      name: "@Sign in@ to show price.",
      value: 1,
    },
    {
      name: "Price Flexible: The price of this product is flexible and may vary depending on quantity and other factors. Please @Sign in@ to discuss pricing.",
      value: 2,
    },
    {
      name: "Price Negotiable Upon Request: Please @Sign in@ for pricing information. The price of this product may vary depending on quantity and other factors.",
      value: 3,
    },
    {
      name: "Price Subject to Negotiation: The price of this product is negotiable upon request. Please @Sign in@ for more information",
      value: 4,
    },
    {
      name: "Price Subject to Final Agreement: The price of this product is flexible and may vary depending on quantity and other factors. Please @Sign in@ to discuss pricing",
      value: 5,
    },
  ];
  const hideOptions = !Auth?.userData()?.id ? login : hideOptions1;
  console.log("quote_button_type-------", quote_button_type);
  let UnitPrice: any =
    typeof unit_price === "string" ? unit_price.split("-") : unit_price;
  const router = useRouter();

  const getWithoutLoginContent = (htmlData) => {
    return htmlData?.split(/@([^@]+)@/)?.map((part, index) => (
      <HideOptionns key={index} className="showhideoption">
        {index % 2 === 0 ? (
          part
        ) : (
          <span
            key={index}
            onClick={() => {
              if (part === "Sign in") {
                router.push("/user/signup");
              } else {
                // setOpenSupplier(true);
              }
            }}
            className="blueclr"
            style={{
              cursor: "pointer",
              fontWeight: "600",
              color: "#d7282f",
            }}
          >
            {part}
          </span>
        )}
      </HideOptionns>
    ));
  };

  const getWithLoginContent = (type) => {
    return type == 1 ? (
      <>
        <span
          className="blueclr"
          onClick={() => {
            // setOpenSupplier(true);
            let id = localStorage?.userData
              ? JSON.parse(localStorage?.userData).id
              : "";

            if (id === user_id) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "custom-btn cancel-button",
                  cancelButton: "custom-btn remove-btn",
                },
                buttonsStyling: false,
              });

              swalWithBootstrapButtons.fire({
                title: "",
                html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                icon: undefined,
                showCancelButton: false,
                reverseButtons: true,
                imageUrl: "/assets/minisiteimages/blockmessage.svg",
                imageWidth: 80,
                imageAlt: "alt",
              });
              return;
            }
            if (quote_button_type == "contact") {
              setOpenSupplier(true);
            } else {
              // setModal(true);
              setOpenSupplier(true);
              // dispatch(setQuoteDetails(data));
            }
          }}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            color: "#0055D6",
          }}
        >
          Contact Us{" "}
        </span>
        for pricing information.
      </>
    ) : type == 2 ? (
      <>
        <span style={{ fontWeight: "600", color: "#4a4a4a" }}>
          Price Flexible:
        </span>
        The price of this product is flexible and may vary depending on quantity
        and other factors. Please{" "}
        <span
          className="blueclr"
          onClick={() => {
            let id = localStorage?.userData
              ? JSON.parse(localStorage?.userData).id
              : "";

            if (id === user_id) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "custom-btn cancel-button",
                  cancelButton: "custom-btn remove-btn",
                },
                buttonsStyling: false,
              });

              swalWithBootstrapButtons.fire({
                title: "",
                html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br>contact for your own product.</span>`,
                icon: undefined,
                showCancelButton: false,
                reverseButtons: true,
                imageUrl: "/assets/minisiteimages/blockmessage.svg",
                imageWidth: 80,
                imageAlt: "alt",
              });
              return;
            }

            setOpenSupplier(true);
          }}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            color: "#0055D6",
          }}
        >
          Contact Us{" "}
        </span>
        for pricing information.
      </>
    ) : type == 3 ? (
      <>
        <span style={{ fontWeight: "600", color: "#4a4a4a" }}>
          Price Negotiable Upon Request:
        </span>{" "}
        Please{" "}
        <span
          className="blueclr"
          onClick={() => {
            // setOpenSupplier(true);
            let id = localStorage?.userData
              ? JSON.parse(localStorage?.userData).id
              : "";

            if (id === user_id) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "custom-btn cancel-button",
                  cancelButton: "custom-btn remove-btn",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons.fire({
                title: "",
                html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                icon: undefined,
                showCancelButton: false,
                reverseButtons: true,
                imageUrl: "/assets/minisiteimages/blockmessage.svg",
                imageWidth: 80,
                imageAlt: "alt",
              });
              return;
            }
            setOpenSupplier(true);
            // if (quote_button_type == "contact") {
            //   setOpenSupplier(true);
            // } else {
            //   setOpenSupplier(true)
            //   return;
            // }
            // if (quote_button_type == "contact") {
            //   setOpenSupplier(true);
            // } else {
            //   setModal(true);
            //   dispatch(setQuoteDetails(data));
            // }
          }}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            color: "#0055D6",
          }}
        >
          Contact Us{" "}
        </span>
        for pricing information. The price of this product may vary depending on
        quantity and other factors.
      </>
    ) : type == 4 ? (
      <>
        <span style={{ fontWeight: "600", color: "#4a4a4a" }}>
          Price Subject to Negotiation:
        </span>{" "}
        The price of this product is negotiable upon request. Please{" "}
        <span
          className="blueclr"
          onClick={() => {
            // setOpenSupplier(true);
            let id = localStorage?.userData
              ? JSON.parse(localStorage?.userData).id
              : "";

            if (id === user_id) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "custom-btn cancel-button",
                  cancelButton: "custom-btn remove-btn",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons.fire({
                title: "",
                html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                icon: undefined,
                showCancelButton: false,
                reverseButtons: true,
                imageUrl: "/assets/minisiteimages/blockmessage.svg",
                imageWidth: 80,
                imageAlt: "alt",
              });
              return;
            }
            if (quote_button_type == "contact") {
              setOpenSupplier(true);
            } else {
              setOpenSupplier(true);
              // setModal(true);
              // dispatch(setQuoteDetails(data));
            }
          }}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            color: "#0055D6",
          }}
        >
          Contact Us{" "}
        </span>
        for more information.
      </>
    ) : (
      <>
        <span style={{ fontWeight: "bold", color: "#4a4a4a" }}>
          Price Subject to Final Agreement:
        </span>{" "}
        The price of this product is flexible and may vary depending on quantity
        and other factors. Please{" "}
        <span
          className="blueclr"
          onClick={() => {
            // setOpenSupplier(true);
            let id = localStorage?.userData
              ? JSON.parse(localStorage?.userData).id
              : "";

            if (id === user_id) {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "custom-btn cancel-button",
                  cancelButton: "custom-btn remove-btn",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons.fire({
                title: "",
                html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                icon: undefined,
                showCancelButton: false,
                reverseButtons: true,
                imageUrl: "/assets/minisiteimages/blockmessage.svg",
                imageWidth: 80,
                imageAlt: "alt",
              });
              return;
            }
            if (quote_button_type == "contact") {
              setOpenSupplier(true);
            } else {
              setOpenSupplier(true);
              // setModal(true);
              // dispatch(setQuoteDetails(data));
            }
          }}
          style={{
            cursor: "pointer",
            fontWeight: "600",
            color: "#0055D6",
          }}
        >
          Contact Us{" "}
        </span>
        to discuss pricing.
      </>
    );
  };

  let article = ["A", "E", "I", "O", "U"].includes(
    data?.price_term?.[0]?.toUpperCase()
  )
    ? "an"
    : "a";

  let toolTipData = `The seller's base price is based on ${article} <b>${data?.price_term?.replaceAll(
    ",",
    ", "
  )}</b> delivery term.`;

  let parsedCaseData = null;
  try {
    parsedCaseData = caseData ? JSON.parse(caseData) : null;
  } catch (error) {}

  const hasSelection =
    parsedCaseData?.selection &&
    ((parsedCaseData?.show_territory === 1 &&
      parsedCaseData?.selection === "territory") ||
      (parsedCaseData?.show_countries === 1 &&
        parsedCaseData?.selection === "country"));

  const [priceRange, setPriceRange] = useState([]);

  useEffect(() => {
    const ranges = [];

    for (let index = 0; index < quantity_based_list?.length; index++) {
      if (quantity_based_list[index]?.min_qty == "") {
        break;
      }

      const item = quantity_based_list[index];
      if (item?.min_qty != "" && item?.price != "") {
        let rangeStart, rangeEnd;

        const isLastSamePrev =
          index > 0 &&
          item?.min_qty === quantity_based_list[index - 1]?.min_qty;

        if (
          index > 0 &&
          quantity_based_list[index - 1]?.min_qty > item?.min_qty
        ) {
          break;
        }

        if (index === 0) {
          rangeStart = 1;
          rangeEnd = item?.min_qty;
        } else if (
          index === quantity_based_list?.length - 1 &&
          !isLastSamePrev
        ) {
          rangeStart = quantity_based_list[index - 1]?.min_qty + 1;
          rangeEnd = item?.min_qty;
        } else if (
          index === quantity_based_list?.length - 1 &&
          isLastSamePrev
        ) {
          rangeStart = quantity_based_list[index - 1]?.min_qty;
          rangeEnd = null;
        } else {
          rangeStart = quantity_based_list[index - 1]?.min_qty + 1;
          rangeEnd = item?.min_qty;
        }
        ranges.push(
          <Grid item xs="auto" sm="auto" md="auto" key={item?.id}>
            <PriceRangeColInfo>
              <Typography variant="h5">
                {`${symbol}${quantity_based_list[
                  index
                ]?.price.toLocaleString()}`}
              </Typography>
              <Typography variant="body1">
                {rangeEnd !== null && rangeStart != rangeEnd
                  ? `${rangeStart}-${rangeEnd}/${qty_unit_name}`
                  : rangeStart == rangeEnd && rangeEnd !== null
                  ? `${rangeEnd}/${qty_unit_name}`
                  : `>${rangeStart}/${qty_unit_name}`}
              </Typography>
            </PriceRangeColInfo>
          </Grid>
        );
      }
    }

    setPriceRange(ranges);
  }, [quantity_based_list, qty_unit_name]);

  return (
    <>
      {is_placeholder == "yes" ? (
        <DetailBigOverview>
          {Boolean(anchorEl) &&
            quantity_status == 1 &&
            product_type === "simple" &&
            price_type === "quantity" && (
              <Quantity
                handlePopoverClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                Units={Units}
                qty_unit={qty_unit}
              />
            )}
          {openModal && (
            <QuoteModal open={openModal} handleClose={() => setModal(false)} />
          )}
          <OverviewBox>
            <Typography variant="h2">
              Product features & Characteristics
            </Typography>
            <OverviewData
              className={
                Value?.filter((v) => v.value).length < 4 ? "noScroll" : ""
              }
            >
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={Value.filter((v) => v.value).length < 1 ? 12 : 5}
                  sm={Value.filter((v) => v.value).length < 1 ? 12 : 3}
                  md={Value.filter((v) => v.value).length < 1 ? 12 : 4}
                  lg={Value.filter((v) => v.value).length < 1 ? 12 : 3}
                >
                  <Box
                    className={"brandname"}
                    sx={{
                      left: "0",
                      top: "-6px",
                      borderRadius: "6px",
                      bottom: "0",
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "column",
                      justifyContent: "center",

                      "& .MuiTypography-h6": {
                        fontSize: "12px",
                        color: "#4A4A4A",
                        fontWeight: "normal",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "88%",
                        "@media (max-width: 1024px)": {
                          fontSize: "11px",
                        },
                      },
                      "& .MuiTypography-body1": {
                        fontSize: "18px",
                        color: "#D7282F",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        "@media (max-width: 1600px)": {
                          fontSize: "16px",
                        },
                        "@media (max-width: 1024px)": {
                          fontSize: "13px",
                        },
                      },
                      "@media (max-width: 768px)": {},
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        width: "88%",
                        "@media (max-width: 1200px)": {
                          gap: "5px",
                          "& .brandimg": {
                            width: "16px",
                          },
                        },
                      }}
                    >
                      <img
                        src="/assets/images/brand-image.svg"
                        className="brandimg"
                      />
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="h6">
                          {"Manufacturer/Brand"}
                        </Typography>
                        <LightTooltip
                          disableInteractive
                          arrow
                          title={brand_name}
                          placement="top-start"
                        >
                          <Typography variant="body1">{brand_name}</Typography>
                        </LightTooltip>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                {Value.filter((v) => v.value).length > 1 ? (
                  <Grid item xs={7} sm={9} md={8} lg={9}>
                    <Slider {...settings}>
                      {Value.map((item, index) => {
                        if (item.value || item.value !== "") {
                          return (
                            <OverviewOpt key={item.title}>
                              <div>
                                <Box
                                  sx={{
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderLeft: "1px solid #dddddd",
                                    "@media (max-width: 1400px)": {
                                      textAlign: "center",
                                    },
                                    "@media (max-width: 1300px)": {
                                      border: "none",
                                    },
                                    "@media (max-width: 767px)": {
                                      paddingLeft: "0",
                                      border: "none",
                                    },
                                    "& .MuiTypography-h6": {
                                      fontSize: "12px",
                                      color: "#4A4A4A",
                                      fontWeight: "normal",
                                      "@media (max-width: 1024px)": {
                                        fontSize: "11px",
                                      },
                                    },
                                    "& .MuiTypography-body1": {
                                      fontSize: "18px",
                                      color: "#000000",
                                      fontWeight: "600",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      // paddingRight: "10px",
                                      "@media (max-width:1024px)": {
                                        fontSize: "14px",
                                      },
                                    },
                                  }}
                                >
                                  <Box
                                    className={
                                      item.title == "Brand" ? "brandname" : ""
                                    }
                                  >
                                    <LightTooltip
                                      arrow
                                      title={item?.title}
                                      disableInteractive
                                      placement="top-start"
                                      slotProps={{
                                        popper: {
                                          modifiers: [
                                            {
                                              name: "offset",
                                              options: {
                                                offset: [-30, 0],
                                              },
                                            },
                                          ],
                                        },
                                      }}
                                    >
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          textTransform: "capitalize",
                                          display: "-webkit-box",
                                          WebkitBoxOrient: "vertical",
                                          WebkitLineClamp: 1,
                                          overflow: "hidden",
                                        }}
                                      >
                                        {item?.title}
                                      </Typography>
                                    </LightTooltip>
                                    <LightTooltip
                                      disableInteractive
                                      arrow
                                      title={item?.value}
                                      placement="top-start"
                                    >
                                      <Typography variant="body1">
                                        {/* {item?.value}{" "}{item?.unit_name} */}
                                        {typeof item?.value === "string" &&
                                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(
                                          item?.value
                                        )
                                          ? new Date(
                                              item?.value
                                            ).toLocaleDateString("en-US", {
                                              month: "2-digit",
                                              day: "2-digit",
                                              year: "numeric",
                                            }) // MM-DD-YYYY format
                                          : item?.value}{" "}
                                        {item?.unit_name}
                                      </Typography>
                                    </LightTooltip>
                                  </Box>
                                </Box>
                              </div>
                            </OverviewOpt>
                          );
                        }
                      })}
                    </Slider>
                  </Grid>
                ) : (
                  <Grid item xs={7} sm={9} md={8} lg={9}>
                    <OverviewOpt>
                      <Box
                        sx={{
                          marginLeft: "16px",
                          paddingLeft: "4px",
                          borderLeft: "1px solid #dddddd",
                          marginBottom: "5px",
                          "@media (max-width: 600px)": {
                            margin: "0 0 0 10px",
                          },
                          "& .MuiTypography-h6": {
                            fontSize: "12px",
                            color: "#4A4A4A",
                            fontWeight: "normal",
                          },
                          "& .MuiTypography-body1": {
                            fontSize: "18px",
                            color: "#000000",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingRight: "10px",
                            "@media (max-width: 767px)": {
                              fontSize: "14px",
                            },
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="h6">
                            {Value?.[0]?.title}
                          </Typography>
                          <LightTooltip
                            disableInteractive
                            arrow
                            title={Value?.[0]?.value}
                            placement="top-start"
                          >
                            <Typography variant="body1">
                              {Value?.[0]?.value} {Value?.[0]?.unit_name}
                            </Typography>
                          </LightTooltip>
                        </Box>
                      </Box>
                    </OverviewOpt>
                  </Grid>
                )}
              </Grid>
            </OverviewData>
          </OverviewBox>

          {/* configured product */}
          {product_type == "configured" && (
            <ProductAvailability sx={{ marginTop: "10px" }}>
              <AvailabilityCol>
                <Typography variant="h6">
                  This is
                  {availability == "in_stock" ? (
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {capitalizeFirstLetter(availability)?.replace("_", " ")}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      style={{ color: "#d7282f", border: "1px solid #d7282f" }}
                    >
                      {capitalizeFirstLetter(availability)?.replace("_", " ")}
                    </Typography>
                  )}
                  <span>
                    product.{" "}
                    {hide_price === 0 &&
                      ",available for purchase at below listed prices."}
                    {/* product, available for purchase at below listed */}
                    {/* {price_type == "quantity" && quantity_based_list?.length > 1
                      ? " prices."
                      : " price."} */}
                  </span>
                </Typography>
              </AvailabilityCol>
              <PriceQuoteCol sx={{ padding: 0 }}>
                <ConfigureProduct />
              </PriceQuoteCol>
            </ProductAvailability>
          )}

          {/* end */}

          {is_placeholder == "yes" &&
            unit_price != null &&
            (unit_price != "0.00" ||
              (price_type == "price_unavailable" &&
                price_unavailable_type)) && (
              <ProductAvailability>
                {(quantity_status == 0 && price_type == "quantity") ||
                  (hide_price == 0 &&
                    price_type == "fixed" &&
                    product_type == "simple" && (
                      <Box sx={{ fontSize: "14px", fontWeight: "600" }}></Box>
                    ))}
                {product_type != "simple" && (
                  <Box sx={{ fontSize: "14px", fontWeight: "600" }}></Box>
                )}
                {(quantity_status == 1 && price_type == "quantity") ||
                (hide_price == 1 && price_type == "fixed") ? (
                  <AvailabilityCol>
                    <Typography variant="h6">
                      This is
                      {availability == "in_stock" ? (
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {capitalizeFirstLetter(availability)?.replace(
                            "_",
                            " "
                          )}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          style={{
                            color: "#d7282f",
                            border: "1px solid #d7282f",
                          }}
                        >
                          {capitalizeFirstLetter(availability)?.replace(
                            "_",
                            " "
                          )}
                        </Typography>
                      )}
                      <span>
                        product{" "}
                        {hide_price === 0 &&
                          ", available for purchase at below listed prices."}
                        {/* product, available for purchase at below listed */}
                        {/* {price_type == "quantity" &&
                        quantity_based_list?.length > 1
                          ? " prices."
                          : " price."} */}
                      </span>
                    </Typography>
                  </AvailabilityCol>
                ) : (
                  <AvailabilityCol>
                    <Typography variant="h6">
                      This is
                      {availability == "in_stock" ? (
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {capitalizeFirstLetter(availability)?.replace(
                            "_",
                            " "
                          )}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          style={{
                            color: "#d7282f",
                            border: "1px solid #d7282f",
                          }}
                        >
                          {capitalizeFirstLetter(availability)?.replace(
                            "_",
                            " "
                          )}
                        </Typography>
                      )}
                      <span>product.</span>
                    </Typography>
                  </AvailabilityCol>
                )}

                {product_type == "simple" &&
                  unit_price != null &&
                  (unit_price != "0.00" ||
                    (price_type == "price_unavailable" &&
                      price_unavailable_type)) && (
                    <PriceQuoteCol>
                      <Grid container>
                        {quantity_based_list?.length > 0 &&
                        price_type == "quantity" ? (
                          quantity_status == 1 && hide_price == 1 ? (
                            quantity_based_list?.map((row: any) => (
                              <Grid item md="auto" sx={{ padding: " 0" }}>
                                <Box
                                  sx={{
                                    border: "1px solid #dadada",
                                    padding: "3px 18px",
                                    margin: "0 6px 6px 0",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    "& .MuiTypography-h5": {
                                      fontSize: "16px",
                                      color: "#D82E34",
                                      fontWeight: 700,
                                    },
                                    "& .MuiTypography-body1": {
                                      fontSize: "12px",
                                      color: "#4A4A4A",
                                    },
                                  }}
                                >
                                  <Typography variant="h5">
                                    {`${symbol}${row.price.toLocaleString()}`}
                                  </Typography>
                                  <Typography variant="body1">
                                    {row.max_qty > 0 ? (
                                      `${row.min_qty}-${row.max_qty} `
                                    ) : (
                                      <>&#8805; {row.min_qty} </>
                                    )}
                                    /{qty_unit_name}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))
                          ) : (
                            <Box
                              sx={{
                                paddingRight: "12px",
                                marginRight: "12px",
                                "& .MuiTypography-h5": {
                                  fontSize: "22px",
                                  color: "#D82E34",
                                  fontWeight: "bold",
                                },
                                "& .MuiTypography-h4": {
                                  fontSize: "13px",
                                  color: "#000000",
                                  fontWeight: "normal",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "20px",
                                    color: "#0AA133",
                                  },
                                },
                                "& .MuiTypography-body1": {
                                  fontSize: "13px",
                                  color: "#4A4A4A",
                                },
                              }}
                            >
                              {hide_price == 1 ? (
                                <>
                                  {" "}
                                  <Typography variant="h5">
                                    {symbol}
                                    {UnitPrice.length > 1
                                      ? `${Number(
                                          UnitPrice[0]
                                        ).toLocaleString()}-${Number(
                                          UnitPrice[1]
                                        ).toLocaleString()}`
                                      : +unit_price.toLocaleString()}
                                  </Typography>
                                  <Typography variant="body1">
                                    {" "}
                                    {`0-1  ${
                                      Units?.find((v) => v.id == unit)?.name ??
                                      "NA"
                                    }`}
                                  </Typography>
                                </>
                              ) : (
                                <Box>
                                  {Auth?.userData()?.id && (
                                    <Typography
                                      className="showhidepeice"
                                      sx={{
                                        display: "flex",
                                        gap: "5px",
                                      }}
                                    >
                                      <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                        <i className="icon-instock-hideprice">
                                          <span className="path1"></span>
                                          <span className="path2"></span>
                                          <span className="path3"></span>
                                        </i>
                                      </Box>
                                      <Box>
                                        {getWithLoginContent(
                                          hideOptions[+hide_price_condition - 1]
                                            ?.value
                                        )}
                                      </Box>
                                    </Typography>
                                  )}

                                  {!Auth?.userData()?.id && (
                                    <Typography
                                      className="showhidepeice"
                                      sx={{
                                        display: "flex",
                                        gap: "5px",
                                      }}
                                    >
                                      <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                        <i className="icon-instock-hideprice">
                                          <span className="path1"></span>
                                          <span className="path2"></span>
                                          <span className="path3"></span>
                                        </i>
                                      </Box>
                                      <Box>
                                        {getWithoutLoginContent(
                                          hideOptions[+hide_price_condition - 1]
                                            ?.name
                                        )}
                                      </Box>
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </Box>
                          )
                        ) : (
                          <>
                            {hide_price == 1 ? (
                              <>
                                <Grid
                                  item
                                  md="auto"
                                  // sx={{ padding: "8px 0" }}
                                >
                                  <Box
                                    sx={{
                                      // border: "1px solid #dadada",
                                      // padding: "3px 18px",
                                      padding: "3px 0",
                                      marginRight: "12px",
                                      borderRadius: "5px",
                                      textAlign: "center",
                                      "& .MuiTypography-h5": {
                                        fontSize: "16px",
                                        color: "#D82E34",
                                        fontWeight: 700,
                                      },
                                      "& .MuiTypography-body1": {
                                        fontSize: "12px",
                                        color: "#4A4A4A",
                                      },
                                    }}
                                  >
                                    <Typography variant="h5">
                                      {typeof unit_price === "number" &&
                                      !isNaN(unit_price) ? (
                                        <>
                                          {symbol} {unit_price}/{unit_name}
                                        </>
                                      ) : (
                                        <>
                                          {price_type == "price_unavailable" &&
                                          price_unavailable_type ? (
                                            price_unavailable_type
                                          ) : (
                                            <>
                                              {symbol}
                                              {unit_price}/{unit_name}{" "}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </Typography>
                                    <Typography variant="body1">
                                      {/* {`0-1  ${
                                Units?.find((v) => v.id == unit)?.name ?? "NA"
                              }`} */}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </>
                            ) : (
                              <Box
                                sx={{
                                  "& .MuiTypography-root": {
                                    fontSize: "13px",
                                    color: "#000000",
                                    fontWeight: "normal",
                                    display: "flex",
                                    gap: "4px",
                                    "& .MuiSvgIcon-root": {
                                      fontSize: "20px",
                                      color: "#0AA133",
                                    },
                                  },
                                }}
                              >
                                {Auth?.userData()?.id && (
                                  <Typography
                                    className="showhidepeice"
                                    sx={{
                                      display: "flex",
                                      gap: "5px",
                                    }}
                                  >
                                    <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                      <i className="icon-instock-hideprice">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                      </i>
                                    </Box>
                                    <Box>
                                      {hideOptions[+hide_price_condition - 1]
                                        ?.value == 1 ? (
                                        <>
                                          <span
                                            className="blueclr"
                                            onClick={() => {
                                              // setOpenSupplier(true);
                                              let id = localStorage?.userData
                                                ? JSON.parse(
                                                    localStorage?.userData
                                                  ).id
                                                : "";

                                              if (id === user_id) {
                                                const swalWithBootstrapButtons =
                                                  Swal.mixin({
                                                    customClass: {
                                                      confirmButton:
                                                        "custom-btn cancel-button",
                                                      cancelButton:
                                                        "custom-btn remove-btn",
                                                    },
                                                    buttonsStyling: false,
                                                  });
                                                swalWithBootstrapButtons.fire({
                                                  title: "",
                                                  html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot
 <br> contact for your own product.</span>`,
                                                  icon: undefined,
                                                  showCancelButton: false,
                                                  reverseButtons: true,
                                                  imageUrl:
                                                    "/assets/minisiteimages/blockmessage.svg",
                                                  imageWidth: 80,
                                                  imageAlt: "alt",
                                                });
                                                return;
                                              }
                                              if (
                                                quote_button_type == "contact"
                                              ) {
                                                setOpenSupplier(true);
                                              } else {
                                                setOpenSupplier(true);
                                                // setModal(true);
                                                // dispatch(setQuoteDetails(data));
                                              }
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              fontWeight: "600",
                                              color: "#0055D6",
                                            }}
                                          >
                                            Contact Us{" "}
                                          </span>
                                          for pricing information.
                                        </>
                                      ) : hideOptions[+hide_price_condition - 1]
                                          ?.value == 2 ? (
                                        <>
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              color: "#4a4a4a",
                                            }}
                                          >
                                            Price Flexible:
                                          </span>
                                          The price of this product is flexible
                                          and may vary depending on quantity and
                                          other factors. Please{" "}
                                          <span
                                            className="blueclr"
                                            onClick={() => {
                                              // setOpenSupplier(true);
                                              let id = localStorage?.userData
                                                ? JSON.parse(
                                                    localStorage?.userData
                                                  ).id
                                                : "";

                                              if (id === user_id) {
                                                const swalWithBootstrapButtons =
                                                  Swal.mixin({
                                                    customClass: {
                                                      confirmButton:
                                                        "custom-btn cancel-button",
                                                      cancelButton:
                                                        "custom-btn remove-btn",
                                                    },
                                                    buttonsStyling: false,
                                                  });
                                                swalWithBootstrapButtons.fire({
                                                  title: "",
                                                  html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                                  icon: undefined,
                                                  showCancelButton: false,
                                                  reverseButtons: true,
                                                  imageUrl:
                                                    "/assets/minisiteimages/blockmessage.svg",
                                                  imageWidth: 80,
                                                  imageAlt: "alt",
                                                });
                                                return;
                                              }
                                              if (
                                                quote_button_type == "contact"
                                              ) {
                                                setOpenSupplier(true);
                                              } else {
                                                setOpenSupplier(true);
                                                // setModal(true);
                                                // dispatch(setQuoteDetails(data));
                                              }
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              fontWeight: "600",
                                              color: "#0055D6",
                                            }}
                                          >
                                            Contact Us{" "}
                                          </span>
                                          for pricing information.
                                        </>
                                      ) : hideOptions[+hide_price_condition - 1]
                                          ?.value == 3 ? (
                                        <>
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              color: "#4a4a4a",
                                            }}
                                          >
                                            Price Negotiable Upon Request
                                          </span>
                                          , Please{" "}
                                          <span
                                            className="blueclr"
                                            onClick={() => {
                                              // setOpenSupplier(true);
                                              let id = localStorage?.userData
                                                ? JSON.parse(
                                                    localStorage?.userData
                                                  ).id
                                                : "";

                                              if (id === user_id) {
                                                const swalWithBootstrapButtons =
                                                  Swal.mixin({
                                                    customClass: {
                                                      confirmButton:
                                                        "custom-btn cancel-button",
                                                      cancelButton:
                                                        "custom-btn remove-btn",
                                                    },
                                                    buttonsStyling: false,
                                                  });
                                                swalWithBootstrapButtons.fire({
                                                  title: "",
                                                  html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                                  icon: undefined,
                                                  showCancelButton: false,
                                                  reverseButtons: true,
                                                  imageUrl:
                                                    "/assets/minisiteimages/blockmessage.svg",
                                                  imageWidth: 80,
                                                  imageAlt: "alt",
                                                });
                                                return;
                                              }
                                              if (
                                                quote_button_type == "contact"
                                              ) {
                                                setOpenSupplier(true);
                                              } else {
                                                setOpenSupplier(true);
                                                // setModal(true);
                                                // dispatch(setQuoteDetails(data));
                                              }
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              fontWeight: "600",
                                              color: "#0055D6",
                                            }}
                                          >
                                            Contact Us{" "}
                                          </span>
                                          for pricing information. The price of
                                          this product may vary depending on
                                          quantity and other factors
                                        </>
                                      ) : hideOptions[+hide_price_condition - 1]
                                          ?.value == 4 ? (
                                        <>
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              color: "#4a4a4a",
                                            }}
                                          >
                                            Price Subject to Negotiation:
                                          </span>{" "}
                                          The price of this product is
                                          negotiable upon request. Please{" "}
                                          <span
                                            className="blueclr"
                                            onClick={() => {
                                              // setOpenSupplier(true);
                                              let id = localStorage?.userData
                                                ? JSON.parse(
                                                    localStorage?.userData
                                                  ).id
                                                : "";

                                              if (id === user_id) {
                                                const swalWithBootstrapButtons =
                                                  Swal.mixin({
                                                    customClass: {
                                                      confirmButton:
                                                        "custom-btn cancel-button",
                                                      cancelButton:
                                                        "custom-btn remove-btn",
                                                    },
                                                    buttonsStyling: false,
                                                  });
                                                swalWithBootstrapButtons.fire({
                                                  title: "",
                                                  html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                                  icon: undefined,
                                                  showCancelButton: false,
                                                  reverseButtons: true,
                                                  imageUrl:
                                                    "/assets/minisiteimages/blockmessage.svg",
                                                  imageWidth: 80,
                                                  imageAlt: "alt",
                                                });
                                                return;
                                              }
                                              if (
                                                quote_button_type == "contact"
                                              ) {
                                                setOpenSupplier(true);
                                              } else {
                                                setOpenSupplier(true);
                                                // setModal(true);
                                                // dispatch(setQuoteDetails(data));
                                              }
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              fontWeight: "600",
                                              color: "#0055D6",
                                            }}
                                          >
                                            Contact Us{" "}
                                          </span>
                                          for more information
                                        </>
                                      ) : (
                                        <>
                                          <span
                                            style={{
                                              fontWeight: "bold",
                                              color: "#4a4a4a",
                                            }}
                                          >
                                            {" "}
                                            Price Subject to Final Agreement:
                                          </span>
                                          The price of this product is flexible
                                          and may vary depending on quantity and
                                          other factors. Please{" "}
                                          <span
                                            className="blueclr"
                                            onClick={() => {
                                              // setOpenSupplier(true);
                                              let id = localStorage?.userData
                                                ? JSON.parse(
                                                    localStorage?.userData
                                                  ).id
                                                : "";

                                              if (id === user_id) {
                                                const swalWithBootstrapButtons =
                                                  Swal.mixin({
                                                    customClass: {
                                                      confirmButton:
                                                        "custom-btn cancel-button",
                                                      cancelButton:
                                                        "custom-btn remove-btn",
                                                    },
                                                    buttonsStyling: false,
                                                  });
                                                swalWithBootstrapButtons.fire({
                                                  title: "",
                                                  html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                                  icon: undefined,
                                                  showCancelButton: false,
                                                  reverseButtons: true,
                                                  imageUrl:
                                                    "/assets/minisiteimages/blockmessage.svg",
                                                  imageWidth: 80,
                                                  imageAlt: "alt",
                                                });
                                                return;
                                              }
                                              if (
                                                quote_button_type == "contact"
                                              ) {
                                                setOpenSupplier(true);
                                              } else {
                                                setOpenSupplier(true);
                                                // setModal(true);
                                                // dispatch(setQuoteDetails(data));
                                              }
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              fontWeight: "600",
                                              color: "#0055D6",
                                            }}
                                          >
                                            Contact Us{" "}
                                          </span>
                                          to discuss pricing.
                                        </>
                                      )}
                                    </Box>
                                  </Typography>
                                )}

                                {!Auth?.userData()?.id && (
                                  <Typography
                                    className="showhidepeice"
                                    sx={{
                                      display: "flex",
                                      gap: "5px",
                                    }}
                                  >
                                    <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                      <i className="icon-instock-hideprice">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                      </i>
                                    </Box>
                                    <Box>
                                      {getWithoutLoginContent(
                                        hideOptions[+hide_price_condition - 1]
                                          ?.name
                                      )}
                                    </Box>
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </>
                        )}

                        {hide_price == 1 && price_type == "fixed" && (
                          <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                justifyContent: "center",
                                paddingLeft: "0px",
                                paddingRight: "16px",
                                position: "relative",
                                "& .MuiSvgIcon-root": {
                                  fontSize: "15px",
                                  color: "#0AA133",
                                },
                                "@media (max-width: 900px)": {
                                  right: "0",
                                  backgroundColor: "#f3f3f3",
                                  borderColor: "#e3e3e3",
                                },
                              }}
                            >
                              <Typography variant="h6">
                                {price_term?.replaceAll(",", ", ")}
                                <LightTooltip
                                  disableInteractive
                                  arrow
                                  placement="top"
                                  title={
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: `${toolTipData}`,
                                      }}
                                    ></div>
                                  }
                                >
                                  <InfoOutlinedIcon />
                                </LightTooltip>
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                        {price_type == "quantity" &&
                          quantity_status == 1 &&
                          hide_price == 1 && (
                            <Grid
                              item
                              xs={12}
                              sm="auto"
                              md="auto"
                              sx={{
                                padding: "0",
                                "@media (max-width: 900px)": {
                                  marginTop: "10px",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  height: "100%",
                                  justifyContent: "center",
                                  paddingLeft: "0px",
                                  paddingRight: "16px",
                                  position: "relative",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "15px",
                                    color: "#0AA133",
                                  },
                                  "@media (max-width: 600px)": {
                                    right: "0",
                                    backgroundColor: "#f3f3f3",
                                    borderColor: "#e3e3e3",
                                  },
                                }}
                              >
                                <Typography variant="h6">
                                  {price_term?.replaceAll(",", ", ")}
                                  <LightTooltip
                                    disableInteractive
                                    arrow
                                    placement="top"
                                    title={
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: `${toolTipData}`,
                                        }}
                                      ></div>
                                    }
                                  >
                                    <InfoOutlinedIcon />
                                  </LightTooltip>
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                      </Grid>
                      {price_type == "fixed" &&
                        negotiable_price == 1 &&
                        hide_price == 1 && (
                          <OriginShippingPayIconsInfo
                            style={{ margin: "6px 0 0 0" }}
                          >
                            <i className="icon-agreement">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                            <Typography variant="body1" sx={{ marginTop: "0" }}>
                              The final price of this product will be subject to
                              negotiation and mutual agreement.
                            </Typography>
                          </OriginShippingPayIconsInfo>
                        )}
                    </PriceQuoteCol>
                  )}
              </ProductAvailability>
            )}

          {hasSelection ? (
            <SelectedOrigin>
              <OriginShippingPayIconsInfo>
                <i className="icon-Originicon-new">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Box
                  className="overviewtitle"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "normal",
                  }}
                >
                  {parsedCaseData?.countries?.length > 1 ? (
                    <>Countries of Origin</>
                  ) : (
                    <>Country of Origin</>
                  )}
                  <Typography
                    variant="body1"
                    sx={{ marginTop: "0" }}
                    className="origincountrycolor"
                  >
                    <div dangerouslySetInnerHTML={{ __html: case_label }}></div>
                  </Typography>
                  {case_type === "case_1" &&
                    parsedCaseData?.source_component_toggle === "1" && (
                      <CheckedTypography
                        variant="body1"
                        sx={{ marginTop: "0" }}
                      >
                        Please note that some components of this product may be
                        sourced from other countries.
                      </CheckedTypography>
                    )}
                </Box>
              </OriginShippingPayIconsInfo>
            </SelectedOrigin>
          ) : case_label ? (
            <SelectedOrigin>
              <OriginShippingPayIconsInfo>
                <i className="icon-Originicon-new">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Box
                  className="overviewtitle"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "normal",
                  }}
                >
                  Country of Origin
                  {case_label.split("@@@@").map((label, index) => (
                    <Typography
                      key={`${index}-${label}`} // Ensures unique key
                      variant="body1"
                      sx={{ marginTop: "0" }}
                      className="origincountrycolor"
                    >
                      <div dangerouslySetInnerHTML={{ __html: label }}></div>
                    </Typography>
                  ))}
                </Box>
              </OriginShippingPayIconsInfo>
            </SelectedOrigin>
          ) : null}

          <ShippingOption>
            <Grid container spacing={1.5}>
              {delivery_time && delivery_select && (
                <Grid item xs={12} sm={12} md={12}>
                  <PortLocationContainer>
                    <OriginShippingPayIconsInfo>
                      <i className="icon-Leadicon-new">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                      </i>
                    </OriginShippingPayIconsInfo>
                    <PortStyleContainer>
                      <Box>
                        <FontContainer
                          className="overviewtitle"
                          fontSize="14px"
                          color=" #000000"
                          fontWeight="600"
                          width="100%"
                        >
                          Lead Time
                        </FontContainer>
                        {availability == "by_order" && (
                          <Box sx={{ marginTop: "0" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                lineHeight: "normal",
                              }}
                            >
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                Delivery Time Period:
                              </Box>
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                {" "}
                                {delivery_time} {delivery_select}
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                Production Capacity:
                              </Box>
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                {" "}
                                {in_house_production
                                  ? `${in_house_production}`
                                  : ""}{" "}
                                {production_unit_name}{" "}
                                {in_house_production_days
                                  ? in_house_production_days?.replace(/s$/, "")
                                  : ""}
                              </Box>
                            </Box>
                          </Box>
                        )}
                        {availability == "in_stock" && (
                          <Box sx={{ marginTop: "0" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                {" "}
                                Order Preparation Time:
                              </Box>
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                {" "}
                                {dispatch_in ? `${dispatch_in}` : ""}{" "}
                                {dispatch_day ? dispatch_day : ""}
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                {" "}
                                Delivery Time Period:
                              </Box>
                              <Box
                                sx={{
                                  color: "#434343",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  "@media (max-width: 767px)": {
                                    fontSize: "12px",
                                  },
                                }}
                              >
                                {" "}
                                {delivery_time_value
                                  ? `${delivery_time_value}`
                                  : ""}{" "}
                                {delivery_time_period
                                  ? delivery_time_period
                                  : ""}
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </PortStyleContainer>
                  </PortLocationContainer>
                </Grid>
              )}
              {country_origin && (
                <Grid item xs={12} sm={12} md={12}>
                  <PortLocationContainer>
                    <OriginShippingPayIconsInfo sx={{}}>
                      <i className="icon-shipping-new">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                        <span className="path4"></span>
                        <span className="path5"></span>
                      </i>
                    </OriginShippingPayIconsInfo>
                    <PortStyleContainer>
                      <Box>
                        <FontContainer
                          className="overviewtitle"
                          fontSize="14px"
                          color=" #000000"
                          fontWeight="600"
                          width="100%"
                        >
                          Shipping
                        </FontContainer>
                        <Box sx={{ marginTop: "0" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              "@media (max-width: 767px)": {
                                display: "block",
                                padding: "3px 0",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {newPOrtData.length > 1
                                ? "Nearby Airports:"
                                : "Nearby Airport:"}
                            </Box>
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                fontWeight: "600",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {newPOrtData.length > 1 ? (
                                <>
                                  {port_ || "Not available"} in{" "}
                                  <CountryName>{country_origin}</CountryName>
                                </>
                              ) : (
                                <>
                                  {port_ || "Not available"}
                                  {","}
                                  <CountryName> {country_origin}</CountryName>
                                </>
                              )}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              "@media (max-width: 767px)": {
                                display: "block",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {newSeaData.length > 1
                                ? "Nearby Seaports:"
                                : "Nearby Seaport:"}
                            </Box>
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                fontWeight: "600",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {newSeaData.length > 1 ? (
                                <>
                                  {sea_ || "Not available"} in{" "}
                                  <CountryName>{country_origin}</CountryName>
                                </>
                              ) : (
                                <>
                                  {sea_ || "Not available"}
                                  {","}
                                  <CountryName> {country_origin}</CountryName>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </PortStyleContainer>
                  </PortLocationContainer>
                </Grid>
              )}
            </Grid>
          </ShippingOption>

          <PaymentOpt>
            <OriginShippingPayIconsInfo>
              <i className="icon-payment-new">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
              </i>
              <Typography
                sx={{ whiteSpace: "nowrap", fontWeight: "600" }}
                className="overviewtitle"
              >
                Payments:
              </Typography>
            </OriginShippingPayIconsInfo>
            <Grid container sx={{ paddingTop: "2px", gap: "4px" }}>
              {payment_methods?.split(",").length > 0 ? (
                payment_methods.split(",").map((v, i) => {
                  let tooltip: any = paymentMethods?.find((i) => i.name == v);
                  if (tooltip?.src) {
                    return (
                      <Grid item sm="auto" md="auto" key={i}>
                        <LightTooltip
                          PopperProps={{ style: { zIndex: 0 } }}
                          disableInteractive
                          arrow
                          placement="top"
                          title={tooltip?.tooltip}
                        >
                          <PaymentMethodImageBox>
                            <img src={tooltip?.src} />
                          </PaymentMethodImageBox>
                        </LightTooltip>
                      </Grid>
                    );
                  }
                })
              ) : (
                <Grid item sm="auto" md="auto">
                  <Typography variant="body2">N/A</Typography>
                </Grid>
              )}
            </Grid>
          </PaymentOpt>
          {(available_restrictions_status == "1" ||
            manufacturing_restrictions_status == "1") && (
            <ProductAvlil>
              <OriginShippingPayIconsInfo>
                <i className="icon-productavail">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Box>
                  <FontContainer
                    className="overviewtitle"
                    fontSize="14px"
                    color=" #000000"
                    fontWeight="600"
                    width="100%"
                  >
                    Product availability or manufacturing restrictions:
                  </FontContainer>
                  <Box>
                    {available_restrictions_status === "1" &&
                      AvailableCountry &&
                      AvailableCountry?.split(",").length > 0 && (
                        <Typography variant="body1">
                          This product {available_restrictions_availibility}{" "}
                          available to sell in the{" "}
                          {AvailableCountry.split(",").map(
                            (country, index, array) => (
                              <span key={`${country}-${index}`}>
                                {country.trim()}
                                {index !== array.length - 1 ? ", " : "."}
                              </span>
                            )
                          )}
                        </Typography>
                      )}

                    {manufacturing_restrictions_status === "1" &&
                      ManufacturerCountry &&
                      ManufacturerCountry?.split(",").length > 0 && (
                        <Typography variant="body1">
                          This product {manufacturing_restrictions_availibility}{" "}
                          manufactured for the{" "}
                          {ManufacturerCountry.split(",").map(
                            (country, index, array) => (
                              <span key={`${country}-${index}`}>
                                {country.trim()}
                                {index !== array.length - 1 ? ", " : "."}
                              </span>
                            )
                          )}
                        </Typography>
                      )}
                  </Box>
                </Box>
              </OriginShippingPayIconsInfo>
              {shiping_restrictions_toggle == 1 && (
                <ContactForShippingBox>
                  <i className="icon-contact-ai">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                  </i>
                  <Typography variant="body1">
                    Please{" "}
                    <span
                      className="blueclr"
                      style={{
                        cursor: "pointer",
                        color: "#0055D6",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        setOpenSupplier(true);
                      }}
                    >
                      Contact us
                    </span>{" "}
                    for shipping restrictions to your specific location.
                  </Typography>
                </ContactForShippingBox>
              )}
            </ProductAvlil>
          )}
          <StyleDrawer
            anchor="right"
            open={isFlyoutConfiOpen}
            onClose={() => setIsFlyoutConfiOpen(true)}
            onOpen={toggleConfiFlyout}
          >
            <QuoteModal
              open={openConfiModal}
              handleClose={() => setConfiModal(false)}
            />
          </StyleDrawer>

          <StyleDrawer
            anchor="right"
            open={isFlyoutOpen}
            onClose={() => setIsFlyoutOpen(true)}
            onOpen={toggleFlyout}
          >
            <ProductItemConfigGetQuote
              toggleFlyout={toggleFlyout}
              data={data}
              type={"selectff"}
            />
          </StyleDrawer>
          <QuoteBtnCol>
            <Button
              className="leftgetquote"
              variant="contained"
              color="error"
              size="small"
              sx={{
                textTransform: "inherit",
                width: quote_button_type == "quote" ? "140px" : "140px",

                "@media screen and (max-width: 767px)": {
                  display: "none !important",
                },
              }}
              onClick={() => {
                let id = localStorage?.userData
                  ? JSON.parse(localStorage?.userData).id
                  : "";
                if (id === user_id) {
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
                } else if (
                  data?.price_type === "price_unavailable" &&
                  quote_button_type === "quote"
                ) {
                  let message = `<span style="color: #231f20; font-size: 16px; font-weight: 500; display: block;">You can't <strong>'Get a quote'</strong> for this product at the moment.<br>
                  Please explore other products or contact supplier for your query.`;
                  let imageUrl = "/assets/Price Unavailable 2.svg";

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
                  return;
                  // showDialog();
                } else if (quote_button_type == "contact") {
                  setOpenSupplier(true);
                  return;
                  // showDialog();
                } else if (quote_button_type === "quote") {
                  setModal(true);
                  dispatch(setQuoteDetails(data));
                  // setOpenSupplier(true);
                  return;
                  // showDialog();
                }
                // if (quote_button_type == "contact") {
                //   setOpenSupplier(true);
                // } else {
                //   setModal(true);
                //   dispatch(setQuoteDetails(data));
                // }
              }}
            >
              {quote_button_type == "contact"
                ? "Contact Us Now"
                : "Get Quote Now"}
            </Button>

            {openSupplier && (
              <QueryModal
                handleClose={handleClose}
                open={openSupplier}
                type="contact"
              />
            )}
            <Box
              sx={{
                "@media (max-width:950px)": {},
                "& .MuiButton-outlined": {
                  color: "#3E3E3E",
                  textTransform: "capitalize",
                  border: "1px solid #3E3E3E",
                  backgroundColor: "#FAFAFA",
                  fontWeight: "600",
                  padding: "0px 16px",
                  fontSize: "13px",
                  height: "30px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "14px",
                    color: "#0AA133",
                    marginLeft: "4px",
                  },
                  "@media (max-width:950px)": {
                    fontSize: "12px",
                    padding: "0px 4px",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                    borderColor: "#858585",
                  },
                  "& .MuiButton-startIcon": {
                    margin: "0 6px 0 0",
                    color: "#D82E34",
                    "& i": {
                      fontSize: "12px",
                    },
                  },
                },
                "@media (max-width: 600px)": {
                  marginLeft: "0",
                },
                "@media (max-width: 480px)": {
                  width: "100%",
                },
              }}
            >
              {upload_files?.length > 0 && (
                <LightTooltip
                  disableInteractive
                  arrow
                  title="Download the latest product resources, including data sheets, drawings, and more."
                  placement="top"
                >
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<i className="icon-download"></i>}
                    sx={{
                      fontSize: "16px",
                      transition: "ease-in .1s",
                      borderRadius: "4px !important",
                      "&:hover": {
                        backgroundColor: "#d7282f !important",
                        border: "1px solid #d7282f !Important",
                        color: "#fff",
                        "& .MuiSvgIcon-root, i": {
                          color: "#fff",
                        },
                      },
                    }}
                    data-tracking="catalog-download"
                    onClick={() => {
                      window.open(`${upload_files}`);
                      // downloadCatalogs;
                    }}
                  >
                    Product Resources <InfoOutlinedIcon />
                  </Button>
                </LightTooltip>
              )}
            </Box>
          </QuoteBtnCol>
        </DetailBigOverview>
      ) : (
        <DetailBigOverview
          sx={{
            "& .PrivateSwipeArea-root": {
              width: "0px !important",
            },
          }}
        >
          {Boolean(anchorEl) &&
            quantity_status == 1 &&
            product_type === "simple" &&
            price_type === "quantity" && (
              <Quantity
                handlePopoverClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                Units={Units}
                qty_unit={qty_unit}
              />
            )}
          {openModal && (
            <QuoteModal open={openModal} handleClose={() => setModal(false)} />
          )}
          <OverviewBox>
            <Typography variant="h2">
              Product features & Characteristics
            </Typography>
            <OverviewData
              className={
                Value?.filter((v) => v.value).length < 4 ? "noScroll" : ""
              }
            >
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={Value.filter((v) => v.value).length < 1 ? 12 : 5}
                  sm={Value.filter((v) => v.value).length < 1 ? 12 : 3}
                  md={Value.filter((v) => v.value).length < 1 ? 12 : 4}
                  lg={Value.filter((v) => v.value).length < 1 ? 12 : 3}
                >
                  <Box
                    className={"brandname"}
                    sx={{
                      left: "0",
                      top: "-6px",
                      borderRadius: "6px",
                      bottom: "0",
                      display: "flex",
                      alignItems: "start",
                      flexDirection: "column",
                      justifyContent: "center",

                      "& .MuiTypography-h6": {
                        fontSize: "12px",
                        color: "#4A4A4A",
                        fontWeight: "normal",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "88%",
                        "@media (max-width: 1024px)": {
                          fontSize: "11px",
                        },
                      },
                      "& .MuiTypography-body1": {
                        fontSize: "18px",
                        color: "#D7282F",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        "@media (max-width: 1600px)": {
                          fontSize: "16px",
                        },
                        "@media (max-width: 1024px)": {
                          fontSize: "13px",
                        },
                      },
                      "@media (max-width: 768px)": {},
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        width: "88%",
                        "@media (max-width: 1200px)": {
                          gap: "5px",
                          "& .brandimg": {
                            width: "16px",
                          },
                        },
                      }}
                    >
                      <img
                        src="/assets/images/brand-image.svg"
                        className="brandimg"
                      />
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="h6">
                          {"Manufacturer/Brand"}
                        </Typography>
                        <LightTooltip
                          disableInteractive
                          arrow
                          title={brand_name}
                          placement="top-start"
                        >
                          <Typography variant="body1">{brand_name}</Typography>
                        </LightTooltip>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                {Value.filter((v) => v.value).length > 1 ? (
                  <Grid item xs={7} sm={9} md={8} lg={9}>
                    <Slider {...settings}>
                      {Value.map((item, index) => {
                        if (item.value || item.value !== "") {
                          return (
                            <OverviewOpt key={item.title}>
                              <div>
                                <Box
                                  sx={{
                                    // paddingLeft: "16px",
                                    paddingLeft: "8px",
                                    paddingRight: "8px",
                                    borderLeft: "1px solid #dddddd",
                                    "@media (max-width: 1400px)": {
                                      textAlign: "center",
                                    },
                                    "@media (max-width: 1300px)": {
                                      border: "none",
                                    },
                                    "@media (max-width: 767px)": {
                                      paddingLeft: "0",
                                      border: "none",
                                    },
                                    "& .MuiTypography-h6": {
                                      fontSize: "12px",
                                      color: "#4A4A4A",
                                      fontWeight: "normal",
                                      "@media (max-width: 1024px)": {
                                        fontSize: "11px",
                                      },
                                    },
                                    "& .MuiTypography-body1": {
                                      fontSize: "18px",
                                      color: "#000000",
                                      fontWeight: "600",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      // paddingRight: "10px",
                                      "@media (max-width:1024px)": {
                                        fontSize: "14px",
                                      },
                                    },
                                  }}
                                >
                                  <Box
                                    className={
                                      item.title == "Brand" ? "brandname" : ""
                                    }
                                  >
                                    <Typography
                                      variant="h6"
                                      sx={{ textTransform: "capitalize" }}
                                    >
                                      {item.title}
                                    </Typography>
                                    <LightTooltip
                                      disableInteractive
                                      arrow
                                      title={item.value}
                                      placement="top-start"
                                    >
                                      <Typography variant="body1">
                                        {item.value} {item?.unit_name}
                                      </Typography>
                                    </LightTooltip>
                                  </Box>
                                </Box>
                              </div>
                            </OverviewOpt>
                          );
                        }
                      })}
                    </Slider>
                  </Grid>
                ) : (
                  <Grid item xs={7} sm={9} md={8} lg={9}>
                    <OverviewOpt>
                      <Box
                        sx={{
                          // paddingLeft: "16px",
                          marginLeft: "16px",
                          paddingLeft: "4px",
                          borderLeft: "1px solid #dddddd",
                          marginBottom: "5px",
                          "@media (max-width: 600px)": {
                            margin: "0 0 0 10px",
                          },
                          "& .MuiTypography-h6": {
                            fontSize: "12px",
                            color: "#4A4A4A",
                            fontWeight: "normal",
                            textTransform: "capitalize",
                          },
                          "& .MuiTypography-body1": {
                            fontSize: "18px",
                            color: "#000000",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            paddingRight: "10px",
                            "@media (max-width: 767px)": {
                              fontSize: "14px",
                            },
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="h6">
                            {Value?.[0]?.title}
                          </Typography>
                          <LightTooltip
                            disableInteractive
                            arrow
                            title={Value?.[0]?.value}
                            placement="top-start"
                          >
                            <Typography variant="body1">
                              {Value?.[0]?.value} {Value?.[0]?.unit_name}
                            </Typography>
                          </LightTooltip>
                        </Box>
                      </Box>
                    </OverviewOpt>
                  </Grid>
                )}
              </Grid>
            </OverviewData>
          </OverviewBox>

          {/* configured product */}
          {product_type == "configured" && (
            <ProductAvailability sx={{ marginTop: "10px" }}>
              <AvailabilityCol>
                <Typography variant="h6">
                  This is
                  {availability == "in_stock" ? (
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {capitalizeFirstLetter(availability)?.replace("_", " ")}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      style={{ color: "#d7282f", border: "1px solid #d7282f" }}
                    >
                      {capitalizeFirstLetter(availability)?.replace("_", " ")}
                    </Typography>
                  )}
                  <span>
                    product.{" "}
                    {hide_price === 0 &&
                      ", available for purchase at below listed prices."}
                    {/* product, available for purchase at below listed */}
                    {/* {price_type == "quantity" && quantity_based_list?.length > 1
                      ? " prices."
                      : " price."} */}
                  </span>
                </Typography>
              </AvailabilityCol>
              <PriceQuoteCol sx={{ padding: 0 }}>
                <ConfigureProduct />
              </PriceQuoteCol>
            </ProductAvailability>
          )}

          {/* end */}

          {product_type == "simple" && (
            <ProductAvailability>
              {(quantity_status == 0 && price_type == "quantity") ||
                (hide_price == 0 &&
                  price_type == "fixed" &&
                  product_type == "simple" && (
                    <Box sx={{ fontSize: "14px", fontWeight: "600" }}></Box>
                  ))}
              {product_type != "simple" && (
                <Box sx={{ fontSize: "14px", fontWeight: "600" }}></Box>
              )}
              {product_type == "simple" &&
              ((quantity_status == 1 &&
                price_type == "quantity" &&
                hide_price == 1) ||
                (hide_price == 1 && price_type == "fixed")) ? (
                <AvailabilityCol>
                  <Typography variant="h6">
                    This is
                    {availability == "in_stock" ? (
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {capitalizeFirstLetter(availability)?.replace("_", " ")}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        style={{
                          color: "#d7282f",
                          border: "1px solid #d7282f",
                        }}
                      >
                        {capitalizeFirstLetter(availability)?.replace("_", " ")}
                      </Typography>
                    )}
                    <span>
                      {/* product, available for purchase at below listed */}
                      product.{" "}
                      {hide_price === 0 &&
                        ",available for purchase at below listed prices."}
                      {/* {price_type == "quantity" &&
                      quantity_based_list?.length > 1
                        ? " prices."
                        : " price."} */}
                    </span>
                  </Typography>
                </AvailabilityCol>
              ) : (
                <AvailabilityCol>
                  <Typography variant="h6">
                    This is
                    {availability == "in_stock" ? (
                      <Typography
                        variant="body1"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {capitalizeFirstLetter(availability)?.replace("_", " ")}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        style={{
                          color: "#d7282f",
                          border: "1px solid #d7282f",
                        }}
                      >
                        {capitalizeFirstLetter(availability)?.replace("_", " ")}
                      </Typography>
                    )}
                    <span>product.</span>
                  </Typography>
                </AvailabilityCol>
              )}

              {product_type == "simple" && (
                <PriceQuoteCol>
                  <Grid container>
                    {quantity_based_list?.length > 0 &&
                    price_type == "quantity" ? (
                      quantity_status == 1 && hide_price == 1 ? (
                        priceRange
                      ) : (
                        <Box
                          sx={{
                            paddingRight: "12px",
                            marginRight: "12px",
                            "& .MuiTypography-h5": {
                              fontSize: "22px",
                              color: "#D82E34",
                              fontWeight: "bold",
                            },
                            "& .MuiTypography-h4": {
                              fontSize: "13px",
                              color: "#000000",
                              fontWeight: "normal",
                              "& .MuiSvgIcon-root": {
                                fontSize: "20px",
                                color: "#0AA133",
                              },
                            },
                            "& .MuiTypography-body1": {
                              fontSize: "13px",
                              color: "#4A4A4A",
                            },
                          }}
                        >
                          {hide_price == 1 ? (
                            <>
                              {" "}
                              <Typography variant="h5">
                                {symbol}
                                {UnitPrice.length > 1
                                  ? `${Number(
                                      UnitPrice[0]
                                    ).toLocaleString()}-${Number(
                                      UnitPrice[1]
                                    ).toLocaleString()}`
                                  : +unit_price.toLocaleString()}
                              </Typography>
                              <Typography variant="body1">
                                {" "}
                                {`0-1  ${
                                  Units?.find((v) => v.id == unit)?.name ?? "NA"
                                }`}
                              </Typography>
                            </>
                          ) : (
                            <Box>
                              {Auth?.userData()?.id && (
                                <Typography
                                  className="showhidepeice"
                                  sx={{
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
                                  <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                    <i className="icon-instock-hideprice">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                      <span className="path3"></span>
                                    </i>
                                  </Box>
                                  <Box>
                                    {getWithLoginContent(
                                      hideOptions[+hide_price_condition - 1]
                                        ?.value
                                    )}
                                  </Box>
                                </Typography>
                              )}

                              {!Auth?.userData()?.id && (
                                <Typography
                                  className="showhidepeice"
                                  sx={{
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
                                  <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                    <i className="icon-instock-hideprice">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                      <span className="path3"></span>
                                    </i>
                                  </Box>
                                  <Box>
                                    {getWithoutLoginContent(
                                      hideOptions[+hide_price_condition - 1]
                                        ?.name
                                    )}
                                  </Box>
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      )
                    ) : (
                      <>
                        {hide_price == 1 ? (
                          <>
                            <Grid item md="auto" sx={{ padding: "8px 0" }}>
                              <Box
                                sx={{
                                  // border: "1px solid #d2d2d2",
                                  // padding: "3px 18px",
                                  padding: "0px 0",
                                  marginRight: "12px",
                                  borderRadius: "5px",
                                  textAlign: "center",
                                  "& .MuiTypography-h5": {
                                    fontSize: "16px",
                                    color: "#D82E34",
                                    fontWeight: 700,
                                  },
                                  "& .MuiTypography-body1": {
                                    fontSize: "12px",
                                    color: "#4A4A4A",
                                  },
                                }}
                              >
                                <Typography variant="h5">
                                  {typeof unit_price === "number" &&
                                  !isNaN(unit_price) ? (
                                    <>
                                      {symbol}
                                      {/* {CurrencySymbol(+currency_id)}{" "} */}
                                      {unit_price}/{unit_name}
                                    </>
                                  ) : (
                                    <>
                                      {symbol} {unit_price}/{unit_name}
                                    </>
                                  )}
                                </Typography>
                                <Typography variant="body1">
                                  {/* {`0-1  ${
                                Units?.find((v) => v.id == unit)?.name ?? "NA"
                              }`} */}
                                </Typography>
                              </Box>
                            </Grid>
                          </>
                        ) : (
                          <Box
                            sx={{
                              "& .MuiTypography-root": {
                                fontSize: "13px",
                                color: "#000000",
                                fontWeight: "normal",
                                display: "flex",
                                gap: "4px",
                                "& .MuiSvgIcon-root": {
                                  fontSize: "20px",
                                  color: "#0AA133",
                                },
                              },
                            }}
                          >
                            {Auth?.userData()?.id && (
                              <Typography
                                className="showhidepeice"
                                sx={{
                                  display: "flex",
                                  gap: "5px",
                                }}
                              >
                                <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                  <i className="icon-instock-hideprice">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                  </i>
                                </Box>
                                <Box>
                                  {hideOptions[+hide_price_condition - 1]
                                    ?.value == 1 ? (
                                    <>
                                      <span
                                        className="blueclr"
                                        onClick={() => {
                                          // setOpenSupplier(true);
                                          let id = localStorage?.userData
                                            ? JSON.parse(localStorage?.userData)
                                                .id
                                            : "";

                                          if (id === user_id) {
                                            const swalWithBootstrapButtons =
                                              Swal.mixin({
                                                customClass: {
                                                  confirmButton:
                                                    "custom-btn cancel-button",
                                                  cancelButton:
                                                    "custom-btn remove-btn",
                                                },
                                                buttonsStyling: false,
                                              });
                                            swalWithBootstrapButtons.fire({
                                              title: "",
                                              html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                              icon: undefined,
                                              showCancelButton: false,
                                              reverseButtons: true,
                                              imageUrl:
                                                "/assets/minisiteimages/blockmessage.svg",
                                              imageWidth: 80,
                                              imageAlt: "alt",
                                            });
                                            return;
                                          }
                                          if (quote_button_type == "contact") {
                                            setOpenSupplier(true);
                                          } else {
                                            setOpenSupplier(true);
                                            // setModal(true);
                                            // dispatch(setQuoteDetails(data));
                                          }
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "600",
                                          color: "#0055D6",
                                        }}
                                      >
                                        Contact Us{" "}
                                      </span>
                                      for pricing information
                                    </>
                                  ) : hideOptions[+hide_price_condition - 1]
                                      ?.value == 2 ? (
                                    <>
                                      Price Flexible: The price of this product
                                      is flexible and may vary depending on
                                      quantity and other factors. Please{" "}
                                      <span
                                        className="blueclr"
                                        onClick={() => {
                                          // setOpenSupplier(true);
                                          let id = localStorage?.userData
                                            ? JSON.parse(localStorage?.userData)
                                                .id
                                            : "";

                                          if (id === user_id) {
                                            const swalWithBootstrapButtons =
                                              Swal.mixin({
                                                customClass: {
                                                  confirmButton:
                                                    "custom-btn cancel-button",
                                                  cancelButton:
                                                    "custom-btn remove-btn",
                                                },
                                                buttonsStyling: false,
                                              });
                                            swalWithBootstrapButtons.fire({
                                              title: "",
                                              html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                              icon: undefined,
                                              showCancelButton: false,
                                              reverseButtons: true,
                                              imageUrl:
                                                "/assets/minisiteimages/blockmessage.svg",
                                              imageWidth: 80,
                                              imageAlt: "alt",
                                            });
                                            return;
                                          }
                                          if (quote_button_type == "contact") {
                                            setOpenSupplier(true);
                                          } else {
                                            setOpenSupplier(true);
                                            // setModal(true);
                                            // dispatch(setQuoteDetails(data));
                                          }
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "600",
                                          color: "#0055D6",
                                        }}
                                      >
                                        Contact Us{" "}
                                      </span>
                                      for pricing information.
                                    </>
                                  ) : hideOptions[+hide_price_condition - 1]
                                      ?.value == 3 ? (
                                    <>
                                      <span
                                        style={{
                                          fontWeight: "600",
                                          color: "#4a4a4a",
                                        }}
                                      >
                                        {" "}
                                      </span>
                                      Price Negotiable Upon Request: Please{" "}
                                      <span
                                        className="blueclr"
                                        onClick={() => {
                                          // setOpenSupplier(true);
                                          let id = localStorage?.userData
                                            ? JSON.parse(localStorage?.userData)
                                                .id
                                            : "";

                                          if (id === user_id) {
                                            const swalWithBootstrapButtons =
                                              Swal.mixin({
                                                customClass: {
                                                  confirmButton:
                                                    "custom-btn cancel-button",
                                                  cancelButton:
                                                    "custom-btn remove-btn",
                                                },
                                                buttonsStyling: false,
                                              });
                                            swalWithBootstrapButtons.fire({
                                              title: "",
                                              html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                              icon: undefined,
                                              showCancelButton: false,
                                              reverseButtons: true,
                                              imageUrl:
                                                "/assets/minisiteimages/blockmessage.svg",
                                              imageWidth: 80,
                                              imageAlt: "alt",
                                            });
                                            return;
                                          }
                                          if (quote_button_type == "contact") {
                                            setOpenSupplier(true);
                                          } else {
                                            setOpenSupplier(true);
                                            // setModal(true);
                                            // dispatch(setQuoteDetails(data));
                                          }
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "600",
                                          color: "#0055D6",
                                        }}
                                      >
                                        Contact Us{" "}
                                      </span>
                                      for pricing information. The price of this
                                      product may vary depending on quantity and
                                      other factors
                                    </>
                                  ) : hideOptions[+hide_price_condition - 1]
                                      ?.value == 4 ? (
                                    <>
                                      <span
                                        style={{
                                          fontWeight: "600",
                                          color: "#4a4a4a",
                                        }}
                                      >
                                        Price Subject to Negotiation:
                                      </span>{" "}
                                      The price of this product is negotiable
                                      upon request. Please{" "}
                                      <span
                                        className="blueclr"
                                        onClick={() => {
                                          // setOpenSupplier(true);
                                          let id = localStorage?.userData
                                            ? JSON.parse(localStorage?.userData)
                                                .id
                                            : "";

                                          if (id === user_id) {
                                            const swalWithBootstrapButtons =
                                              Swal.mixin({
                                                customClass: {
                                                  confirmButton:
                                                    "custom-btn cancel-button",
                                                  cancelButton:
                                                    "custom-btn remove-btn",
                                                },
                                                buttonsStyling: false,
                                              });
                                            swalWithBootstrapButtons.fire({
                                              title: "",
                                              html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                              icon: undefined,
                                              showCancelButton: false,
                                              reverseButtons: true,
                                              imageUrl:
                                                "/assets/minisiteimages/blockmessage.svg",
                                              imageWidth: 80,
                                              imageAlt: "alt",
                                            });
                                            return;
                                          }
                                          if (quote_button_type == "contact") {
                                            setOpenSupplier(true);
                                          } else {
                                            setOpenSupplier(true);
                                            // setModal(true);
                                            // dispatch(setQuoteDetails(data));
                                          }
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "600",
                                          color: "#0055D6",
                                        }}
                                      >
                                        Contact Us{" "}
                                      </span>
                                      for more information
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          color: "#4a4a4a",
                                        }}
                                      >
                                        {" "}
                                        Price Subject to Final Agreement:
                                      </span>{" "}
                                      The price of this product is flexible and
                                      may vary depending on quantity and other
                                      factors. Please{" "}
                                      <span
                                        className="blueclr"
                                        onClick={() => {
                                          // setOpenSupplier(true);
                                          let id = localStorage?.userData
                                            ? JSON.parse(localStorage?.userData)
                                                .id
                                            : "";

                                          if (id === user_id) {
                                            const swalWithBootstrapButtons =
                                              Swal.mixin({
                                                customClass: {
                                                  confirmButton:
                                                    "custom-btn cancel-button",
                                                  cancelButton:
                                                    "custom-btn remove-btn",
                                                },
                                                buttonsStyling: false,
                                              });
                                            swalWithBootstrapButtons.fire({
                                              title: "",
                                              html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                              icon: undefined,
                                              showCancelButton: false,
                                              reverseButtons: true,
                                              imageUrl:
                                                "/assets/minisiteimages/blockmessage.svg",
                                              imageWidth: 80,
                                              imageAlt: "alt",
                                            });
                                            return;
                                          }
                                          if (quote_button_type == "contact") {
                                            setOpenSupplier(true);
                                          } else {
                                            setOpenSupplier(true);
                                            // setModal(true);
                                            // dispatch(setQuoteDetails(data));
                                          }
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "600",
                                          color: "#0055D6",
                                        }}
                                      >
                                        Contact Us{" "}
                                      </span>
                                      to discuss pricing.
                                    </>
                                  )}
                                </Box>
                              </Typography>
                            )}

                            {!Auth?.userData()?.id && (
                              <Typography
                                className="showhidepeice"
                                sx={{
                                  display: "flex",
                                  gap: "5px",
                                }}
                              >
                                <Box sx={{ margin: "3px 2px -4px -3px" }}>
                                  <i className="icon-instock-hideprice">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                  </i>
                                </Box>
                                <Box>
                                  {getWithoutLoginContent(
                                    hideOptions[+hide_price_condition - 1]?.name
                                  )}
                                </Box>
                              </Typography>
                            )}
                          </Box>
                        )}
                      </>
                    )}

                    {hide_price == 1 && price_type == "fixed" && (
                      <Grid item xs={12} md="auto" sx={{ padding: "0" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            justifyContent: "center",
                            paddingLeft: "0px",
                            paddingRight: "16px",
                            position: "relative",
                            "& .MuiSvgIcon-root": {
                              fontSize: "15px",
                              color: "#0AA133",
                            },
                            "@media (max-width: 900px)": {
                              right: "0",
                              backgroundColor: "#f3f3f3",
                              borderColor: "#e3e3e3",
                            },
                          }}
                        >
                          <Typography variant="h6">
                            {price_term?.replaceAll(",", ", ")}
                            <LightTooltip
                              disableInteractive
                              arrow
                              placement="top"
                              title={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: `${toolTipData}`,
                                  }}
                                ></div>
                              }
                            >
                              <InfoOutlinedIcon />
                            </LightTooltip>
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    {price_type == "quantity" &&
                      quantity_status == 1 &&
                      hide_price == 1 && (
                        <Grid
                          item
                          xs={12}
                          sm="auto"
                          md="auto"
                          sx={{
                            padding: "0",
                            "@media (max-width: 900px)": {
                              marginTop: "10px",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                              justifyContent: "center",
                              paddingLeft: "0px",
                              paddingRight: "16px",
                              position: "relative",
                              "& .MuiSvgIcon-root": {
                                fontSize: "15px",
                                color: "#0AA133",
                              },
                              "@media (max-width: 600px)": {
                                right: "0",
                                backgroundColor: "#f3f3f3",
                                borderColor: "#e3e3e3",
                              },
                            }}
                          >
                            <Typography variant="h6">
                              {price_term?.replaceAll(",", ", ")}
                              <LightTooltip
                                disableInteractive
                                arrow
                                placement="top"
                                title={
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `${toolTipData}`,
                                    }}
                                  ></div>
                                }
                              >
                                <InfoOutlinedIcon />
                              </LightTooltip>
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                    <Grid item xs={12} sm="auto" md="auto">
                      <Box
                        sx={{
                          padding: "8px",
                          margin: price_type == "quantity" ? "5px 0 0 0" : 0,
                        }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <Box
                            component={"span"}
                            sx={{
                              fontSize: "16px",
                              color: "#d7282f",
                              fontWeight: "700",
                            }}
                          >
                            {unit_name
                              ? `${minimum_order} ${unit_name}${
                                  minimum_order > 1 ? "s" : ""
                                }`
                              : `${minimum_order} ${qty_unit_name}${
                                  minimum_order > 1 ? "s" : ""
                                }`}
                          </Box>
                          MOQ{" "}
                          <LightTooltip
                            arrow
                            disableInteractive
                            placement="top"
                            title="Minimun Order Quantity"
                          >
                            <InfoOutlinedIcon
                              sx={{
                                fontSize: "15px !important",
                                color: "#0AA133",
                                margin: "0 0 0 -10px",
                              }}
                            />
                          </LightTooltip>{" "}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  {price_type == "fixed" &&
                    negotiable_price == 1 &&
                    hide_price == 1 && (
                      <OriginShippingPayIconsInfo
                        style={{ margin: "6px 0 0 0" }}
                      >
                        <i className="icon-agreement">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <Typography variant="body1" sx={{ marginTop: "0" }}>
                          The final price of this product will be subject to
                          negotiation and mutual agreement.
                        </Typography>
                      </OriginShippingPayIconsInfo>
                    )}
                </PriceQuoteCol>
              )}
            </ProductAvailability>
          )}

          {case_type && hasSelection ? (
            <SelectedOrigin>
              <OriginShippingPayIconsInfo>
                <i className="icon-Originicon-new">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Box
                  className="overviewtitle"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "normal",
                  }}
                >
                  {parsedCaseData?.countries?.length > 1 ? (
                    <>Countries of Origin</>
                  ) : (
                    <>Country of Origin</>
                  )}
                  <Typography
                    variant="body1"
                    sx={{ marginTop: "0" }}
                    className="origincountrycolor"
                  >
                    <div dangerouslySetInnerHTML={{ __html: case_label }}></div>
                  </Typography>
                  {case_type === "case_1" &&
                    parsedCaseData?.source_component_toggle === "1" && (
                      <CheckedTypography
                        variant="body1"
                        sx={{ marginTop: "0" }}
                      >
                        Please note that some components of this product may be
                        sourced from other countries.
                      </CheckedTypography>
                    )}
                </Box>
              </OriginShippingPayIconsInfo>
            </SelectedOrigin>
          ) : case_label ? (
            <SelectedOrigin>
              <OriginShippingPayIconsInfo>
                <i className="icon-Originicon-new">
                  <span className="path1"></span>
                  <span className="path2"></span>
                  <span className="path3"></span>
                  <span className="path4"></span>
                </i>
                <Box
                  className="overviewtitle"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "normal",
                  }}
                >
                  Country of Origin
                  {case_label.split("@@@@").map((label, index) => (
                    <Typography
                      key={`${index}-${label}`} // Ensures unique key
                      variant="body1"
                      sx={{ marginTop: "0" }}
                      className="origincountrycolor"
                    >
                      <div dangerouslySetInnerHTML={{ __html: label }}></div>
                    </Typography>
                  ))}
                </Box>
              </OriginShippingPayIconsInfo>
            </SelectedOrigin>
          ) : null}

          <ShippingOption>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={12} md={12}>
                <PortLocationContainer>
                  <OriginShippingPayIconsInfo>
                    <i className="icon-Leadicon-new">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                    </i>
                  </OriginShippingPayIconsInfo>
                  <PortStyleContainer>
                    <Box>
                      <FontContainer
                        className="overviewtitle"
                        fontSize="14px"
                        color=" #000000"
                        fontWeight="600"
                        width="100%"
                      >
                        Lead Time
                      </FontContainer>
                      {availability == "by_order" && (
                        <Box sx={{ marginTop: "0" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              lineHeight: "normal",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              Delivery Time Period:
                            </Box>
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                fontWeight: "600",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {" "}
                              {delivery_time} {delivery_select}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              Production Capacity:
                            </Box>
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                fontWeight: "600",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {" "}
                              {in_house_production
                                ? `${in_house_production}`
                                : ""}{" "}
                              {production_unit_name} {/* {" per "} */}
                              {in_house_production_days
                                ? in_house_production_days?.replace(/s$/, "")
                                : ""}
                            </Box>
                          </Box>
                        </Box>
                      )}
                      {availability == "in_stock" && (
                        <Box sx={{ marginTop: "0" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {" "}
                              Order Preparation Time:
                            </Box>
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                fontWeight: "600",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {" "}
                              {dispatch_in ? `${dispatch_in}` : ""}{" "}
                              {dispatch_day ? dispatch_day : ""}
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {" "}
                              Delivery Time Period:
                            </Box>
                            <Box
                              sx={{
                                color: "#434343",
                                fontSize: "13px",
                                fontWeight: "600",
                                "@media (max-width: 767px)": {
                                  fontSize: "12px",
                                },
                              }}
                            >
                              {" "}
                              {delivery_time_value
                                ? `${delivery_time_value}`
                                : ""}{" "}
                              {delivery_time_period ? delivery_time_period : ""}
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </PortStyleContainer>
                </PortLocationContainer>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PortLocationContainer>
                  <OriginShippingPayIconsInfo sx={{}}>
                    <i className="icon-shipping-new">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                    </i>
                  </OriginShippingPayIconsInfo>
                  <PortStyleContainer>
                    <Box>
                      <FontContainer
                        className="overviewtitle"
                        fontSize="14px"
                        color=" #000000"
                        fontWeight="600"
                        width="100%"
                      >
                        Shipping
                      </FontContainer>
                      <Box sx={{ marginTop: "0" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            "@media (max-width: 767px)": {
                              display: "block",
                              padding: "3px 0",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              color: "#434343",
                              fontSize: "13px",
                              "@media (max-width: 767px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {newPOrtData.length > 1
                              ? "Nearby Airports:"
                              : "Nearby Airport:"}
                          </Box>
                          <Box
                            sx={{
                              color: "#434343",
                              fontSize: "13px",
                              fontWeight: "600",
                              "@media (max-width: 767px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {newPOrtData.length > 1 ? (
                              <>
                                {port_ || "Not available"} in{" "}
                                <CountryName>{country_origin}</CountryName>
                              </>
                            ) : (
                              <>
                                {port_ || "Not available"}
                                {","}
                                <CountryName> {country_origin}</CountryName>
                              </>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            "@media (max-width: 767px)": {
                              display: "block",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              color: "#434343",
                              fontSize: "13px",
                              "@media (max-width: 767px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {" "}
                            {newSeaData.length > 1
                              ? "Nearby Seaports:"
                              : "Nearby Seaport:"}
                          </Box>
                          <Box
                            sx={{
                              color: "#434343",
                              fontSize: "13px",
                              fontWeight: "600",
                              "@media (max-width: 767px)": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            {newSeaData.length > 1 ? (
                              <>
                                {sea_ || "Not available"} in{" "}
                                <CountryName>{country_origin}</CountryName>
                              </>
                            ) : (
                              <>
                                {sea_ || "Not available"}
                                {","}
                                <CountryName> {country_origin}</CountryName>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </PortStyleContainer>
                </PortLocationContainer>
              </Grid>
            </Grid>
          </ShippingOption>
          <PaymentOpt>
            <OriginShippingPayIconsInfo>
              <i className="icon-payment-new">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
              </i>
              <Typography
                sx={{ whiteSpace: "nowrap", fontWeight: "600" }}
                className="overviewtitle"
              >
                Payments:
              </Typography>
            </OriginShippingPayIconsInfo>
            <Grid container sx={{ paddingTop: "2px", gap: "4px" }}>
              {payment_methods?.split(",").map((v, i) => {
                let tooltip: any = paymentMethods?.find((i) => i.name == v);
                if (tooltip?.src) {
                  return (
                    <Grid item sm="auto" md="auto">
                      <LightTooltip
                        PopperProps={{ style: { zIndex: 0 } }}
                        disableInteractive
                        arrow
                        placement="top"
                        title={tooltip?.tooltip}
                      >
                        <PaymentMethodImageBox>
                          <img src={tooltip?.src} />
                        </PaymentMethodImageBox>
                      </LightTooltip>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </PaymentOpt>
          {(available_restrictions_status == "1" ||
            manufacturing_restrictions_status == "1" ||
            shiping_restrictions_toggle == 1) && (
            <ProductAvlil>
              <OriginShippingPayIconsInfo>
                {(manufacturing_restrictions_status === "1" ||
                  available_restrictions_status === "1") && (
                  <>
                    <i className="icon-productavail">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                    </i>
                    <Box>
                      <FontContainer
                        className="overviewtitle"
                        fontSize="14px"
                        color=" #000000"
                        fontWeight="600"
                        width="100%"
                      >
                        Product availability or manufacturing restrictions:
                      </FontContainer>
                      <Box>
                        {available_restrictions_status === "1" &&
                          AvailableCountry &&
                          AvailableCountry?.split(",").length > 0 && (
                            <Typography variant="body1">
                              This product {available_restrictions_availibility}{" "}
                              available to sell in the{" "}
                              {AvailableCountry.split(",").map(
                                (country, index, array) => (
                                  <span key={`${country}-${index}`}>
                                    {country.trim()}
                                    {index !== array.length - 1 ? ", " : "."}
                                  </span>
                                )
                              )}
                            </Typography>
                          )}

                        {manufacturing_restrictions_status === "1" &&
                          ManufacturerCountry &&
                          ManufacturerCountry?.split(",").length > 0 && (
                            <Typography variant="body1">
                              This product{" "}
                              {manufacturing_restrictions_availibility}{" "}
                              manufactured for the{" "}
                              {ManufacturerCountry.split(",").map(
                                (country, index, array) => (
                                  <span key={`${country}-${index}`}>
                                    {country.trim()}
                                    {index !== array.length - 1 ? ", " : "."}
                                  </span>
                                )
                              )}
                            </Typography>
                          )}
                      </Box>
                    </Box>
                  </>
                )}
              </OriginShippingPayIconsInfo>

              {shiping_restrictions_toggle == 1 && (
                <ContactForShippingBox>
                  <i className="icon-contact-ai">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                  </i>
                  <Typography variant="body1">
                    Please{" "}
                    <span
                      className="blueclr"
                      style={{
                        cursor: "pointer",
                        color: "#0055D6",
                        fontWeight: "600",
                      }}
                      data-tracking="contact-seller"
                      onClick={() => {
                        let id = localStorage?.userData
                          ? JSON.parse(localStorage?.userData).id
                          : "";

                        if (id === user_id) {
                          const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                              confirmButton: "custom-btn cancel-button",
                              cancelButton: "custom-btn remove-btn",
                            },
                            buttonsStyling: false,
                          });

                          swalWithBootstrapButtons.fire({
                            title: "",
                            html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br>contact for your own product.</span>`,
                            icon: undefined,
                            showCancelButton: false,
                            reverseButtons: true,
                            imageUrl: "/assets/minisiteimages/blockmessage.svg",
                            imageWidth: 80,
                            imageAlt: "alt",
                          });
                          return;
                        }

                        setOpenSupplier(true);
                      }}
                    >
                      Contact us
                    </span>{" "}
                    for shipping restrictions to your specific location.
                  </Typography>
                </ContactForShippingBox>
              )}
            </ProductAvlil>
          )}
          <StyleDrawer
            anchor="right"
            open={isFlyoutOpen}
            onClose={() => setIsFlyoutOpen(true)}
            onOpen={toggleFlyout}
          >
            {/* <ConfigureFlyOut toggleFlyout={toggleFlyout} /> */}
            <GetQuoteConfigModal toggleFlyout={toggleFlyout} type={"big"} />
          </StyleDrawer>
          <QuoteBtnCol>
            <Button
              className="leftgetquote"
              variant="contained"
              color="error"
              size="small"
              sx={{
                textTransform: "inherit",
                width: quote_button_type == "quote" ? "140px" : "140px",

                "@media screen and (max-width: 767px)": {
                  display: "none !important",
                },
              }}
              onClick={() => {
                if (data?.product_type != "simple") {
                  let id = localStorage?.userData
                    ? JSON.parse(localStorage?.userData).id
                    : "";

                  if (id === user_id) {
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: "custom-btn cancel-button",
                        cancelButton: "custom-btn remove-btn",
                      },
                      buttonsStyling: false,
                    });
                    swalWithBootstrapButtons.fire({
                      title: "",
                      html:
                        quote_button_type === "contact"
                          ? `<span style="color: #231f20; font-size:18px; font-weight:500; margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`
                          : `<span style="color: #231f20; font-size:18px; font-weight:500; margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                      icon: undefined,
                      showCancelButton: false,
                      reverseButtons: true,
                      imageUrl:
                        quote_button_type === "contact"
                          ? "/assets/minisiteimages/blockmessage.webp"
                          : "/assets/minisiteimages/blockquote.webp",
                      imageWidth: 80,
                      imageAlt: "alt",
                    });
                    return;
                  }
                  toggleFlyout();
                } else {
                  let id = localStorage?.userData
                    ? JSON.parse(localStorage?.userData).id
                    : "";

                  if (id === user_id) {
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: "custom-btn cancel-button",
                        cancelButton: "custom-btn remove-btn",
                      },
                      buttonsStyling: false,
                    });
                    swalWithBootstrapButtons.fire({
                      title: "",
                      html:
                        quote_button_type === "contact"
                          ? `<span style="color: #231f20; font-size:18px; font-weight:500; margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`
                          : `<span style="color: #231f20; font-size:18px; font-weight:500; margin:-10px 0px 30px 0px">You cannot request a quotation <br> for your own products.</span>`,
                      icon: undefined,
                      showCancelButton: false,
                      reverseButtons: true,
                      imageUrl:
                        quote_button_type === "contact"
                          ? "/assets/minisiteimages/blockmessage.webp"
                          : "/assets/minisiteimages/blockquote.webp",
                      imageWidth: 80,
                      imageAlt: "alt",
                    });
                    return;
                  }
                  if (quote_button_type == "contact") {
                    setOpenSupplier(true);
                  } else {
                    // setOpenSupplier(true);
                    setModal(true);
                    dispatch(setQuoteDetails(data));
                  }
                }
              }}
            >
              {quote_button_type == "contact"
                ? "Contact Us Now"
                : "Get Quote Now"}
            </Button>

            {openSupplier && (
              <QueryModal
                handleClose={handleClose}
                open={openSupplier}
                type="contact"
              />
            )}
            <Box
              sx={{
                "@media (max-width:950px)": {},
                "& .MuiButton-outlined": {
                  color: "#3E3E3E",
                  textTransform: "capitalize",
                  border: "1px solid #3E3E3E",
                  backgroundColor: "#FAFAFA",
                  fontWeight: "600",
                  padding: "0px 16px",
                  fontSize: "13px",
                  height: "30px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "14px",
                    color: "#0AA133",
                    marginLeft: "4px",
                  },
                  "@media (max-width:950px)": {
                    fontSize: "12px",
                    padding: "0px 4px",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                    borderColor: "#858585",
                  },
                  "& .MuiButton-startIcon": {
                    margin: "0 6px 0 0",
                    color: "#D82E34",
                    "& i": {
                      fontSize: "12px",
                    },
                  },
                },
                "@media (max-width: 600px)": {
                  marginLeft: "0",
                },
                "@media (max-width: 480px)": {
                  width: "100%",
                },
              }}
            >
              {upload_files?.length > 0 && (
                <LightTooltip
                  disableInteractive
                  arrow
                  title="Download the latest product resources, including data sheets, drawings, and more."
                  placement="top"
                >
                  <a
                    href={upload_files?.[0]?.file_name}
                    download
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<i className="icon-download"></i>}
                      sx={{
                        fontSize: "16px",
                        transition: "ease-in .1s",
                        borderRadius: "4px !important",
                        "&:hover": {
                          backgroundColor: "#d7282f !important",
                          border: "1px solid #d7282f !important",
                          color: "#fff",
                          "& .MuiSvgIcon-root, i": {
                            color: "#fff",
                          },
                        },
                      }}
                      data-tracking="catalog-download"
                    >
                      Product Resources <InfoOutlinedIcon />
                    </Button>
                  </a>
                </LightTooltip>
              )}
            </Box>
          </QuoteBtnCol>
        </DetailBigOverview>
      )}
    </>
  );
};

export default BigOverview;

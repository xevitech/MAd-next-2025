import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomAvailabilityCol,
  CustomPriceQuoteCol,
  CustomProductTypeData,
  LabelCheckboxGroup,
  LableValue,
  LableValueTop,
} from "../style";
import { useSelector } from "react-redux";
import {
  CurrencySymbol,
  apiClient,
  getCountryNameByCode,
} from "@/components/common/common";
import _debounce from "lodash/debounce";
import { TerritoryList, countriesList } from "@/utils/countriesphp";
import { useAppDispatch } from "redux/store";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import {
  OriginShippingPayIconsInfo,
  PriceQuoteCol,
} from "@/components/ProductDetail/style";
import Auth from "@/auth/Auth";
import { HideOptionns } from "../../Style";
import Swal from "sweetalert2";
import { setQuoteDetails } from "@/hooks/quoteHooks";
import { PriceRangeColInfo } from "@/components/products/editProduct/commercialInformation/styles";
import QueryModal from "../QueryModal";
import { number } from "yup";
const CustomizeRequest = React.memo(({ priceTermList, formik, id, type } : any) => {
  const [quantity, setQuantity] = useState<any>("");
  const [seaportList, setSeaportList] = useState<any>([
    { value: "", view: "" },
  ]);
  const [airportList, setAirportList] = useState<any>([
    { value: "", view: "" },
  ]);
  const [SelectedOrigin, setSelectedOrigin] = useState<any>([]);

  const [userPriceTerms, setUserPriceTerms] = useState<any>("");
  const [shipingMethod, setShippingMethod] = useState<any>("sea");
  const [portCountry, setPortCountry] = useState<any>({ value: "", view: "" });
  const [seaPort, setSeaPort] = useState<any>({ value: "", view: "" });
  const [airPort, setAirPort] = useState<any>({ value: "", view: "" });
  const [roadInfo, setRoadInfo] = useState<any>("");
  const [attachment, setAttachments] = useState<any>([]);
  const { unitName } = useSelector((state: any) => state.productDetail);
  const { unitList, quotedetails } = useSelector(
    (state: any) => state.quoteDetails
  );
  const [userMessage, setUserMessage] = useState<string>("");
  const country = countriesList.map((v) => ({ value: v.code, view: v.name }));

  const {
    product_type,
    availability,
    price_term,
    negotiable_price,
    price_type,
    quantity_based_list,
    quantity_status,
    qty_unit,
    unit_price,
    unit,
    hide_price,
    quote_button_type,
    user_id,
    qty_unit_name,
    price_unavailable_type,
    unit_name = "",
    minimum_order
  } = useSelector((state: any) => state.productDetail.detail.data);
  const Units = useSelector((state: any) => state.productDetail.unit);

  const parsePrice = (price) => {
    if (typeof price === "string") {
      const cleaned = price.replace(/,/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    return Number(price);
  };

  const getPriceRanges = (orderOptions) => {
    const ranges = [];

    for (let index = 0; index < orderOptions?.length; index++) {
      const item = orderOptions[index];

      if (item?.min_qty === "") {
        break;
      }

      if (item?.min_qty !== "" && item?.price !== "") {
        let rangeStart, rangeEnd;

        const isLastSamePrev =
          index > 0 && item?.min_qty === orderOptions[index - 1]?.min_qty;

        if (index > 0 && orderOptions[index - 1]?.min_qty > item?.min_qty) {
          break;
        }

        if (index === 0) {
          rangeStart = 1;
          rangeEnd = Number(item?.min_qty);
        } else if (index === orderOptions?.length - 1 && !isLastSamePrev) {
          rangeStart = Number(orderOptions[index - 1]?.min_qty) + 1;
          rangeEnd = Number(item?.min_qty);
        } else if (index === orderOptions?.length - 1 && isLastSamePrev) {
          rangeStart = Number(orderOptions[index - 1]?.min_qty);
          rangeEnd = null;
        } else {
          rangeStart = Number(orderOptions[index - 1]?.min_qty) + 1;
          rangeEnd = Number(item?.min_qty);
        }

        ranges.push({
          id: item?.id,
          min_qty: rangeStart,
          max_qty: rangeEnd !== null ? rangeEnd : "more",
          price: parsePrice(item?.price), // Use sanitized price
        });
      }
    }

    return ranges;
  };
  const [isMoreThanQuantity, setIsMoreThanQuantity] = useState(false);
  const getPriceForQuantity = (quantity, quantityBasedList) => {
    const applicablePrice = quantityBasedList
      ?.filter((item) => item.min_qty <= quantity)
      .sort((a, b) => b.min_qty - a.min_qty)
      .shift();
    if (applicablePrice) {
      return {
        calculatedPrice: applicablePrice.price * quantity,
        price: applicablePrice.price,
      };
    } else {
      return "";
    }
  };
  useEffect(() => {
    const applicablePrice = getPriceRanges(quotedetails?.quantity_based_list)
      ?.filter((item) => item.min_qty <= quantity)
      .sort((a, b) => b.min_qty - a.min_qty)
      .shift();
    if (
      quantity > applicablePrice?.max_qty &&
      applicablePrice?.max_qty != "more"
    ) {
      setIsMoreThanQuantity(true);
      return;
    } else {
      setIsMoreThanQuantity(false);
    }
  }, [quantity]);



  const formatCurrency = (value) => {
    if (!value) return "";

    const parts = value.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : "";

    const formattedInteger = integerPart.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      "$1,"
    );

    return formattedInteger + decimalPart;
  };

  useEffect(() => {
    FetchSeaPortList("a");
    FetchAirPortList("a");
  }, []);

  const importData = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "";
    input.multiple = true;
    input.onchange = (_) => {
      let files = Array.from(input.files);
      setAttachments([...attachment, ...files]);
    };
    input.click();
  };

  const RenderPrice = (quantityBasedList, quantity) => {
    const priceEntry = quantityBasedList?.find(
      (item) => item.quantity <= quantity
    );
    return priceEntry ? priceEntry.price : "NA";
  };

  const getMinRequiredQuantity = (quantity, quantityBasedList) => {
    const applicableTier = quantityBasedList
      ?.filter((item) => item.min_qty > quantity)
      .sort((a, b) => a.min_qty - b.min_qty)
      .shift();

    return applicableTier ? applicableTier.min_qty : null;
  };
  const [countryName, setCountryNames] = useState("");
  const minRequiredQuantity = getMinRequiredQuantity(
    quantity,
    quotedetails?.quantity_based_list
  );
  useEffect(() => {
    if (portCountry.value) {
      if (shipingMethod == "sea") FetchSeaPortList("", portCountry.value);
      if (shipingMethod == "air") FetchAirPortList("", portCountry.value);
    }
  }, [portCountry, shipingMethod]);
  const dispatch = useAppDispatch();

  const QuantityHandler = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (/^\d+$/.test(input) === false) {
      setQuantity("");
      return;
    }
    if (input.length > 4) {
      return;
    }
    formik.setFieldError("customize_request.quantity", "");
    let quantityValue = e.target.value;
    const regex = /^[1-9]\d*$/;
    if (/^\d+$/.test(quantityValue) && parseInt(quantityValue) > 0) {
      if (quotedetails?.price_type == "quantity") {
        if (quantityValue == 0) {
          setQuantity(quantityValue);
        } else {
          setQuantity(quantityValue);
        }
      } else {
        if (regex.test(quantityValue) || quantityValue === "") {
          setQuantity(quantityValue);
        }
      }
    } else {
      if (quantityValue == "" && quantityValue == 0) {
        setQuantity(null);
      }
    }
  };
  const currency_id = JSON.parse(localStorage.getItem("currency")) ?? 1;
  const FetchSeaPortList = async (value, country = "") => {
    let response = await apiClient(
      `ports/getPorts?search=${value}&type=sea_ports&country=${country}&per_page=50`,
      "get"
    );
    if (response.status === 200) {
      setSeaportList(
        response.data.map((v) => ({ view: v.name, value: v.name }))
      );
    }
    return response;
  };
  const FetchAirPortList = async (value, country = "") => {
    let response = await apiClient(
      `ports/getPorts?search=${value}&type=air_ports&country=${country}&per_page=50`,
      "get"
    );

    if (response.status === 200) {
      setAirportList(
        response.data.map((v) => ({ view: v.name, value: v.name }))
      );
    }
    return response;
  };

  const fetchSeaPort = React.useRef(
    _debounce(async (value, country) => {
      if (value) {
        await FetchSeaPortList(value, country);
      }
    }, 500)
  ).current;

  const fetchAirPort = React.useRef(
    _debounce(async (value, country) => {
      if (value) {
        await FetchAirPortList(value, country);
      }
    }, 500)
  ).current;

  let optionList = [];
  if (quotedetails?.case_type === "case_1") {
    let primary_country = JSON?.parse(quotedetails?.caseData)?.value?.split(
      ","
    );
    optionList = [].concat(...primary_country);
  }
  if (quotedetails?.case_type === "case_2") {
    let caseData = JSON?.parse(quotedetails?.caseData);

    let primary_country =
      typeof caseData?.primary_country === "string"
        ? caseData.primary_country.split(",")
        : [];

    let other_source =
      typeof caseData?.other_source === "string"
        ? caseData.other_source.split(",")
        : [];

    optionList = [].concat(...primary_country, ...other_source);
  }

  if (quotedetails?.case_type === "case_3") {
    let primary_country = JSON?.parse(quotedetails?.caseData)?.map(
      (ele) => ele?.made_in
    );
    let origin = JSON?.parse(quotedetails?.caseData)?.map((ele) => ele?.origin);
    let primary_country_update = primary_country.flatMap((item) =>
      item.split(",")
    );
    optionList = [].concat(...origin, ...primary_country_update);
  }

  const data = useSelector((state: any) => state.productDetail.detail.data);
  let toolTipData = `The seller's base price is based on an <b>${quotedetails?.price_term?.replaceAll(
    ",",
    ", "
  )}</b> delivery term.`;

  const byOrderFixedPrice = `${CurrencySymbol(currency_id)} ${
    parsePrice(quotedetails?.unit_price) * quantity
  }`;
  let curency = `${CurrencySymbol(currency_id)}`;
  let final: any = getPriceForQuantity(
    quantity,
    getPriceRanges(quotedetails?.quantity_based_list)
  );
  let finalPrice =
    price_type === "fixed"
      ? byOrderFixedPrice
      : curency + final?.calculatedPrice;
  if (finalPrice === "NA") {
  }
  const finalData = quotedetails?.unit_price * quantity;
  const priceMessage =
    quotedetails?.price_type === "quantity"
      ? finalPrice !== ""
        ? finalPrice
        : minRequiredQuantity
        ? `Enter Minimum Quantity ${minRequiredQuantity}`
        : "Price not available"
      : byOrderFixedPrice;
  useEffect(() => {
    let price =
      quotedetails?.price_type == "quantity"
        ? RenderPrice(quotedetails?.quantity_based_list, quantity)
        : quotedetails?.unit_price;
    let Data = {
      price: price_type === "fixed" ? price : final?.price,
      quantity,
      selectedOrigin: SelectedOrigin,
      userPriceTerms,
      shipingMethod,
      portCountry: portCountry?.value,
      attachment,
      userMessage,
      countryName,
      unit_price: quotedetails?.unit_price,
      destination_port:
        shipingMethod == "road"
          ? roadInfo
          : shipingMethod == "air"
          ? airPort?.value
          : seaPort?.value,
      currency: quotedetails?.currency_id,
      finalPrice:
        quotedetails?.price_type === "fixed"
          ? parsePrice(quotedetails?.unit_price) * quantity
          : final?.calculatedPrice,
      total_price:
        quotedetails?.price_type === "fixed"
          ? parsePrice(quotedetails?.unit_price) * quantity
          : final?.calculatedPrice,
      isOutOfRange: isMoreThanQuantity,
    };
    formik.setFieldValue("customize_request", Data);
  }, [
    finalPrice,
    quantity,
    SelectedOrigin,
    userPriceTerms,
    shipingMethod,
    portCountry,
    countryName,
    userMessage,
    seaPort,
    airPort,
    roadInfo,
    unit_price,
  ]);

  useEffect(() => {
    handleQuote();
  },[]);
  
  let symbol = `${CurrencySymbol(currency_id)}`;
  const [customiseRequest, setCustomiseRequestData] = useState<any>("");

  const hideOptions = [
    {
      name: "Sign in to show price.",
      value: 1,
    },
    {
      name: "Price Flexible: The price of the product is flexible and may vary depending on quantity and other factors. Please sign in to discuss pricing.",
      value: 2,
    },
    {
      name: "Price Negotiable Upon Request: Please sign in for pricing information. The price of the product may vary depending on quality and other factors.",
      value: 3,
    },
    {
      name: "Price Subject to Negotiation: The price of the product is negotiable upon request. Please sign in for more information.",
      value: 4,
    },
    {
      name: "Price Subject to Final Agreement: The price of this product is flexible and may vary depending on quantity and other factors. Please sign in to discuss pricing.",
      value: 5,
    },
  ];

  const [openSupplier, setOpenSupplier] = React.useState(false);
  const handleQuote = async () => {
    let response = await apiClient("front/single/view", "post", {
      body: { id: id },
    });
    if (response.status === 200) {
      setCustomiseRequestData(response?.data);
    }
  };

  const parsed = customiseRequest?.caseData
    ? JSON.parse(customiseRequest?.caseData)
    : "";

  let countryNames = [];
  if (customiseRequest?.case_type === "case_1") {
    countryNames =
      parsed && typeof parsed === "object" && parsed.country?.length
        ? parsed?.country?.map((code) => getCountryNameByCode(code))
        : [];
  } else if (customiseRequest?.case_type === "case_2") {
    countryNames =
      parsed && typeof parsed === "object" && parsed.primary_country
        ? [getCountryNameByCode(parsed.primary_country?.value)]
        : [];
  } else if (customiseRequest?.case_type === "case_3") {
    countryNames =
      parsed && typeof parsed === "object" && Array.isArray(parsed)
        ? parsed.map((item) => {
            const madeInData = JSON.parse(item.made_in);
            return getCountryNameByCode(madeInData.value);
          })
        : [];
  }
  const availableCountries = countryNames;
  const getNoDataWitoutLogin = (htmlData) => {
    return htmlData?.split(/@([^@]+)@/)?.map((part, index) => (
      <HideOptionns key={index} className="showhideoption">
        {index % 2 === 0 ? (
          part
        ) : (
          <span
            key={index}
            // onClick={() => {
            //   {
            //     type != "get" && setOpenSupplier(true);
            //   }
            // }}
            className="blueclr"
            style={{
              cursor: "pointer",
              fontWeight: "600",
              color:
                type === "get"
                  ? "black"
                  : part === "contact us"
                  ? "#d7282f"
                  : "#d7282f",
            }}
          >
            {part}
          </span>
        )}
      </HideOptionns>
    ));
  };

  let UnitPrice: any =
    typeof unit_price === "string" ? unit_price.split("-") : unit_price;
  const getWithLoginContent = (type) => {
    return type == 1 ? (
      <>
        <span
          className="blueclr"
          style={{
            cursor: "pointer",
            fontWeight: "600",
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
          
          style={{
            cursor: "pointer",
            // fontWeight: "600",
          }}
        >
          Contact Us{" "}
        </span>
        Please contact us for pricing information. The price of this product may
        vary depending on quantity and other factors.
      </>
    ) : type == 4 ? (
      <>
        <span style={{ fontWeight: "600", color: "#4a4a4a" }}>
          Price Subject to Negotiation:
        </span>{" "}
        The price of this product is negotiable upon request. Please{" "}
        <span>Contact Us </span>
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

        
        >
          Contact Us{" "}
        </span>
        to discuss pricing.
      </>
    );
  };

  const [priceRange, setPriceRange] = useState([]);

  useEffect(() => {
    const ranges = [];

    for (
      let index = 0;
      index < quotedetails?.quantity_based_list?.length;
      index++
    ) {
      if (quotedetails?.quantity_based_list[index]?.min_qty == "") {
        break;
      }

      const item = quotedetails?.quantity_based_list[index];
      if (item?.min_qty != "" && item?.price != "") {
        let rangeStart, rangeEnd;

        const isLastSamePrev =
          index > 0 &&
          item?.min_qty ===
            quotedetails?.quantity_based_list[index - 1]?.min_qty;

        if (
          index > 0 &&
          quotedetails?.quantity_based_list[index - 1]?.min_qty > item?.min_qty
        ) {
          break;
        }

        if (index === 0) {
          rangeStart = 1;
          rangeEnd = item?.min_qty;
        } else if (
          index === quotedetails?.quantity_based_list?.length - 1 &&
          !isLastSamePrev
        ) {
          rangeStart =
            quotedetails?.quantity_based_list[index - 1]?.min_qty + 1;
          rangeEnd = item?.min_qty;
        } else if (
          index === quotedetails?.quantity_based_list?.length - 1 &&
          isLastSamePrev
        ) {
          rangeStart = quotedetails?.quantity_based_list[index - 1]?.min_qty;
          rangeEnd = null;
        } else {
          rangeStart =
            quotedetails?.quantity_based_list[index - 1]?.min_qty + 1;
          rangeEnd = item?.min_qty;
        }
        ranges.push(
          <Grid item xs="auto" sm="auto" md="auto" key={item?.id}>
            <PriceRangeColInfo>
              <Typography variant="h5">
                {`${symbol}${quotedetails?.quantity_based_list[
                  index
                ]?.price.toLocaleString()}`}
              </Typography>
              <Typography variant="body1">
                {rangeEnd !== null && rangeStart != rangeEnd
                  ? `${rangeStart}-${rangeEnd}/${
                      customiseRequest?.qty_unit_name ?? ""
                    }`
                  : rangeStart == rangeEnd && rangeEnd !== null
                  ? `${rangeEnd}/${customiseRequest?.qty_unit_name ?? ""}`
                  : `>${rangeStart}/${customiseRequest?.qty_unit_name ?? ""}`}
              </Typography>
            </PriceRangeColInfo>
          </Grid>
        );
      }
    }
    setPriceRange(ranges);
  }, [quotedetails?.quantity_based_list, customiseRequest?.qty_unit_name]);
  const handleClose = () => {
    setOpenSupplier(false);
  };
  return (
    <>
      {openSupplier && (
        <QueryModal
          handleClose={handleClose}
          open={openSupplier}
          type="contact"
        />
      )}
      {hide_price == 1 ? (
        (availability == "in_stock" || availability == "by_order") &&
        price_type == "quantity" ? (
          <CustomProductTypeData>
            {product_type == "simple" &&
              hide_price == 1 &&
              (availability == "in_stock" || availability == "by_order") &&
              price_type == "quantity" && (
                <CustomAvailabilityCol>
                  <Typography
                    variant="h6"
                    sx={{
                      "& .Instock": {
                        border: "1px solid #34A853",
                        color: "#34A853",
                        padding: "0 8px",
                        margin: "0 8px",
                        borderRadius: "4px",
                      },
                      "& .Byorder": {
                        border: "1px solid #d7282f",
                        color: "#d7282f",
                        padding: "0 8px",
                        margin: "0 8px",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    This is
                    <Typography
                      variant="body1"
                      sx={{
                        textTransform: "capitalize",
                      }}
                      className={`${
                        quotedetails.availability === "in_stock"
                          ? "Instock"
                          : "Byorder"
                      }`}
                    >
                      {capitalizeFirstLetter(availability)?.replace("_", " ")}
                    </Typography>
                    {quotedetails?.hide_price === 1 ? (
                      <span>
                        product,available for purchase at below listed
                        {quotedetails.quantity_based_list?.length > 1
                          ? " prices."
                          : " price."}
                      </span>
                    ) : (
                      "product."
                    )}
                  </Typography>
                </CustomAvailabilityCol>
              )}
            {product_type == "simple" && (
              <CustomPriceQuoteCol>
                <Grid container>
                  {quantity_based_list?.length > 0 &&
                    price_type == "quantity" &&
                    quantity_status == 1 &&
                    // quantity_based_list?.map((row: any) => (
                    //   <Grid item md="auto" sx={{ padding: " 0" }}>
                    //     <Box
                    //       sx={{
                    //         border: "1px solid #dadada",
                    //         padding: "3px 18px",
                    //         margin: "0 6px 6px 0",
                    //         borderRadius: "5px",
                    //         textAlign: "center",
                    //         "& .MuiTypography-h5": {
                    //           fontSize: "16px",
                    //           color: "#D82E34",
                    //           fontWeight: 700,
                    //         },
                    //         "& .MuiTypography-body1": {
                    //           fontSize: "12px",
                    //           color: "#4A4A4A",
                    //         },
                    //       }}
                    //     >
                    //       <Typography variant="h5">
                    //         {`${CurrencySymbol(
                    //           +currency_id
                    //         )}${row.price.toLocaleString()}`}
                    //       </Typography>
                    //       <Typography variant="body1">
                    //         {`${row.min_qty}-${row.max_qty}  ${
                    //           Units?.find((v) => v.id == qty_unit)?.name ?? "NA"
                    //         }`}
                    //       </Typography>
                    //     </Box>
                    //   </Grid>
                    // ))
                    priceRange}
                  {price_type == "quantity" && quantity_status == 1 && (
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
              </CustomPriceQuoteCol>
            )}
          </CustomProductTypeData>
        ) : price_type == "fixed" ? (
          <>
            {product_type == "simple" && (
              <Box
                sx={{
                  margin: "2px 0 0 0",
                  background: "#F4F6FA",
                  padding: "6px 10px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    "& .Instock": {
                      border: "1px solid #34A853",
                      color: "#34A853",
                      padding: "0 8px",
                      margin: "0 8px",
                      borderRadius: "4px",
                    },
                    "& .Byorder": {
                      border: "1px solid #d7282f",
                      color: "#d7282f",
                      padding: "0 8px",
                      margin: "0 8px",
                      borderRadius: "4px",
                    },
                  }}
                >
                  This is{" "}
                  <Box
                    component={"span"}
                    className={`${
                      quotedetails.availability === "in_stock"
                        ? "Instock"
                        : "Byorder"
                    }`}
                  >
                    {capitalizeFirstLetter(quotedetails.availability)?.replace(
                      "_",
                      " "
                    )}
                  </Box>
                  product{" "}
                  {quotedetails?.hide_price === 1 &&
                    ", available for purchase at below listed prices."}
                </Typography>
                <Box
                  sx={{
                    margin: "10px 0 0 0",
                    borderRadius: "4px",
                    padding: "9px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#d7282f",
                      fontSize: "16px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {`${symbol}${quotedetails?.unit_price}/${
                      customiseRequest?.unit_name ?? "NA"
                    }`}
                    <Box sx={{}}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#000",
                          marginLeft: "5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
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
                          <InfoOutlinedIcon
                            sx={{
                              color: "#0AA133",
                              fontSize: "15px !important",
                            }}
                          />
                        </LightTooltip>
                      </Typography>
                    </Box>
                  </Typography>
                  <Box><Typography>{minimum_order} {unit_name} (MOQ)</Typography></Box>
                </Box>
              </Box>
            )}
          </>
        ) : null
      ) : (
        <CustomProductTypeData>
          {
            <CustomAvailabilityCol>
              <Typography variant="h6">
                This is
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: "capitalize",
                    border:
                      quotedetails.availability === "in_stock"
                        ? "1px solid #34A853"
                        : quotedetails.availability === "by_order"
                        ? "1px solid #d7282f"
                        : "none",
                    color:
                      quotedetails.availability === "in_stock"
                        ? "#34A853"
                        : quotedetails.availability === "by_order"
                        ? "#d7282f"
                        : "none",
                  }}
                >
                  {capitalizeFirstLetter(quotedetails.availability)?.replace(
                    "_",
                    " "
                  )}
                </Typography>
                {quotedetails?.hide_price === 1 ? (
                  <span>
                    product, available for purchase at below listed
                    {quotedetails.quantity_based_list?.length > 1
                      ? " prices."
                      : " price."}
                  </span>
                ) : (
                  "product."
                )}
              </Typography>
            </CustomAvailabilityCol>
          }
          {quotedetails?.hide_price === 1 && (
            <CustomPriceQuoteCol
              sx={{ padding: quotedetails?.hide_price === 1 ? "0px" : " 9px" }}
            >
              <Grid container>
                {quotedetails?.price_type === "fixed" &&
                quotedetails?.hide_price == 1 ? (
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
                        {CurrencySymbol(currency_id)}
                        {quotedetails.unit_price}
                        {quotedetails?.unit_name &&
                          `/ ${quotedetails?.unit_name}`}
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
                ) : (
                  <>{priceRange}</>
                )}
              </Grid>
            </CustomPriceQuoteCol>
          )}
          {/* {quotedetails?.price_type === "fixed" && */}
          {quotedetails?.hide_price == 0 && (
            <PriceQuoteCol>
              <Grid container>
                {quantity_based_list?.length > 0 && price_type == "quantity" ? (
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
                                  hideOptions[
                                    +quotedetails?.hide_price_condition - 1
                                  ]?.value
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
                                {getNoDataWitoutLogin(
                                  hideOptions.find((opt) => opt.value === (Number(customiseRequest?.hide_price_condition)))
                                    ?.name
                                )}
                              </Box>
                            </Typography>
                          )}
                          {/* {!Auth?.userData()?.id && (
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
                                  hideOptions[
                                    +quotedetails?.hide_price_condition - 1
                                  ]?.name
                                )}
                              </Box>
                            </Typography>
                          )} */}
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
                              {hideOptions[
                                +quotedetails?.hide_price_condition - 1
                              ]?.value == 1 ? (
                                <>
                                  <span>Contact Us </span>
                                  for pricing information.
                                </>
                              ) : hideOptions[
                                  +quotedetails?.hide_price_condition - 1
                                ]?.value == 2 ? (
                                <>
                                  <span
                                    style={{
                                      // fontWeight: "600",
                                      color: "#4a4a4a",
                                    }}
                                  >
                                    Price Flexible:
                                  </span>
                                  The price of this product is flexible and may
                                  vary depending on quantity and other factors.
                                  Please{" "}
                                  <span
                                  // className="blueclr"
                                  // onClick={() => {
                                  //   // setOpenSupplier(true);
                                  //   let id = localStorage?.userData
                                  //     ? JSON.parse(localStorage?.userData).id
                                  //     : "";

                                  //   if (id === user_id) {
                                  //     const swalWithBootstrapButtons =
                                  //       Swal.mixin({
                                  //         customClass: {
                                  //           confirmButton:
                                  //             "custom-btn cancel-button",
                                  //           cancelButton:
                                  //             "custom-btn remove-btn",
                                  //         },
                                  //         buttonsStyling: false,
                                  //       });
                                  //     swalWithBootstrapButtons.fire({
                                  //       title: "",
                                  //       html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                  //       icon: undefined,
                                  //       showCancelButton: false,
                                  //       reverseButtons: true,
                                  //       imageUrl:
                                  //         "/assets/minisiteimages/blockmessage.svg",
                                  //       imageWidth: 80,
                                  //       imageAlt: "alt",
                                  //     });
                                  //     return;
                                  //   }
                                  //   if (quote_button_type == "contact") {
                                  //     // setOpenSupplier(true);
                                  //   } else {
                                  //     // setModal(true);
                                  //     // dispatch(setQuoteDetails(data));
                                  //   }
                                  // }}
                                  // style={{
                                  //   cursor: "pointer",
                                  //   fontWeight: "600",
                                  //   // color: "#0055D6",
                                  // }}
                                  >
                                    Contact Us{" "}
                                  </span>
                                  for pricing information.
                                </>
                              ) : hideOptions[
                                  +quotedetails?.hide_price_condition - 1
                                ]?.value == 3 ? (
                                <>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "#4a4a4a",
                                    }}
                                  >
                                    Price Negotiable Upon Request
                                  </span>
                                  , Please{" "}
                                  <span
                                  // className="blueclr"
                                  // onClick={() => {
                                  //   // setOpenSupplier(true);
                                  //   let id = localStorage?.userData
                                  //     ? JSON.parse(localStorage?.userData).id
                                  //     : "";

                                  //   if (id === user_id) {
                                  //     const swalWithBootstrapButtons =
                                  //       Swal.mixin({
                                  //         customClass: {
                                  //           confirmButton:
                                  //             "custom-btn cancel-button",
                                  //           cancelButton:
                                  //             "custom-btn remove-btn",
                                  //         },
                                  //         buttonsStyling: false,
                                  //       });
                                  //     swalWithBootstrapButtons.fire({
                                  //       title: "",
                                  //       html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                  //       icon: undefined,
                                  //       showCancelButton: false,
                                  //       reverseButtons: true,
                                  //       imageUrl:
                                  //         "/assets/minisiteimages/blockmessage.svg",
                                  //       imageWidth: 80,
                                  //       imageAlt: "alt",
                                  //     });
                                  //     return;
                                  //   }
                                  //   if (quote_button_type == "contact") {
                                  //     // setOpenSupplier(true);
                                  //   } else {
                                  //     // setModal(true);
                                  //     // dispatch(setQuoteDetails(data));
                                  //   }
                                  // }}
                                  // style={{
                                  //   cursor: "pointer",
                                  //   // fontWeight: "600",
                                  //   // color: "#0055D6",
                                  // }}
                                  >
                                    Contact Us{" "}
                                  </span>
                                  for pricing information. The price of this
                                  product may vary depending on quantity and
                                  other factors
                                </>
                              ) : hideOptions[
                                  +quotedetails?.hide_price_condition - 1
                                ]?.value == 4 ? (
                                <>
                                  <span
                                    style={{
                                      fontWeight: "600",
                                      color: "#4a4a4a",
                                    }}
                                  >
                                    Price Subject to Negotiation:
                                  </span>{" "}
                                  The price of this product is negotiable upon
                                  request. Please{" "}
                                  <span
                                  // className="blueclr"
                                  // onClick={() => {
                                  //   // setOpenSupplier(true);
                                  //   let id = localStorage?.userData
                                  //     ? JSON.parse(localStorage?.userData).id
                                  //     : "";

                                  //   if (id === user_id) {
                                  //     const swalWithBootstrapButtons =
                                  //       Swal.mixin({
                                  //         customClass: {
                                  //           confirmButton:
                                  //             "custom-btn cancel-button",
                                  //           cancelButton:
                                  //             "custom-btn remove-btn",
                                  //         },
                                  //         buttonsStyling: false,
                                  //       });
                                  //     swalWithBootstrapButtons.fire({
                                  //       title: "",
                                  //       html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                  //       icon: undefined,
                                  //       showCancelButton: false,
                                  //       reverseButtons: true,
                                  //       imageUrl:
                                  //         "/assets/minisiteimages/blockmessage.svg",
                                  //       imageWidth: 80,
                                  //       imageAlt: "alt",
                                  //     });
                                  //     return;
                                  //   }
                                  //   if (quote_button_type == "contact") {
                                  //     setOpenSupplier(true);
                                  //   } else {
                                  //     setModal(true);
                                  //     dispatch(setQuoteDetails(data));
                                  //   }
                                  // }}
                                  // style={{
                                  //   cursor: "pointer",
                                  //   // fontWeight: "600",
                                  //   // color: "#0055D6",
                                  // }}
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
                                  The price of this product is flexible and may
                                  vary depending on quantity and other factors.
                                  Please{" "}
                                  <span
                                  // className="blueclr"
                                  // onClick={() => {
                                  //   // setOpenSupplier(true);
                                  //   let id = localStorage?.userData
                                  //     ? JSON.parse(localStorage?.userData).id
                                  //     : "";

                                  //   if (id === user_id) {
                                  //     const swalWithBootstrapButtons =
                                  //       Swal.mixin({
                                  //         customClass: {
                                  //           confirmButton:
                                  //             "custom-btn cancel-button",
                                  //           cancelButton:
                                  //             "custom-btn remove-btn",
                                  //         },
                                  //         buttonsStyling: false,
                                  //       });
                                  //     swalWithBootstrapButtons.fire({
                                  //       title: "",
                                  //       html: `<span style="color: #231f20; font-size:18px;font-weight:500;margin:-10px 0px 30px 0px">You cannot <br> contact for your own product.</span>`,
                                  //       icon: undefined,
                                  //       showCancelButton: false,
                                  //       reverseButtons: true,
                                  //       imageUrl:
                                  //         "/assets/minisiteimages/blockmessage.svg",
                                  //       imageWidth: 80,
                                  //       imageAlt: "alt",
                                  //     });
                                  //     return;
                                  //   }
                                  //   if (quote_button_type == "contact") {
                                  //     setOpenSupplier(true);
                                  //   } else {
                                  //     setModal(true);
                                  //     dispatch(setQuoteDetails(data));
                                  //   }
                                  // }}
                                  // style={{
                                  //   cursor: "pointer",
                                  //   fontWeight: "600",
                                  //   // color: "#0055D6",
                                  // }}
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
                              {getNoDataWitoutLogin(
                                hideOptions.find((opt) => opt.value === (Number(customiseRequest?.hide_price_condition)))?.name
                              )}
                            </Box>
                          </Typography>
                        )}
                        {/* {!Auth?.userData()?.id && (
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
                          

                              {getNoDataWitoutLogin(
                                hideOptions[
                                  +quotedetails?.hide_price_condition - 1
                                ]?.name
                              )}
                            </Box>
                          </Typography>
                        )} */}
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
                  <OriginShippingPayIconsInfo style={{ margin: "6px 0 0 0" }}>
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
          {/* {quotedetails?.price_type === "fixed" &&
            quotedetails?.hide_price == 0 && (
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: matchedOption?.name || "",
                  }}
                />
              </Grid>
            )} */}
        </CustomProductTypeData>
      )}
      <Box sx={{ padding: "16px", paddingBottom: "0" }}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <LableValue>
              <Typography variant="h3">Quantity Selection</Typography>
              {/* <Typography variant="body1">
                This product is available as an <span>order-based</span> item.
                Please provide your estimated required quantity.
              </Typography> */}
            </LableValue>
            <Grid container>
              <Grid item md={10}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  <TextField
                    label="Enter Quantity"
                    id="outlined-size-small"
                    size="small"
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                    }}
                    value={quantity}
                    onChange={(e) => {
                      QuantityHandler(e);
                    }}
                    error={
                      formik?.errors?.customize_request?.quantity &&
                      formik?.errors?.customize_request?.quantity
                    }
                    helperText={
                      formik?.errors?.customize_request?.quantity &&
                      formik?.errors?.customize_request?.quantity
                    }
                  />
                  {quantity && (
                    <Box sx={{ marginLeft: "3px" }}>
                      {quotedetails?.hide_price === 1 &&
                        quotedetails?.price_type != "price_unavailable" &&
                        unitList?.find(
                          (v) =>
                            v.id ==
                            (quotedetails?.price_type == "fixed"
                              ? quotedetails?.unit
                              : quotedetails?.qty_unit)
                        )?.name}
                    </Box>
                  )}
                  {quantity && (
                    <Box
                      sx={{
                        fontSize: "20px",
                        color: "#D7282F",
                        marginLeft: "10px",
                        fontWeight: "600",
                        "& span": {
                          fontSize: "14px",
                          color: "#474747",
                          fontWeight: "600",
                        },
                      }}
                    >

                      {quotedetails?.hide_price === 1 &&
                        quotedetails?.price_type != "price_unavailable" && (
                          <>{formatCurrency(priceMessage)}</>
                        )}
                      <span>
                        
                      </span>
                    </Box>
                  )}
                </Box>
                {isMoreThanQuantity && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#D7282F",
                      marginTop: "4px",
                    }}
                  >
                    The quantity you have entered is not within the seller's
                    price range. The price is calculated based on the nearest
                    available quantity range.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* <Grid item md={6}>
            <Box>
              <LableValueTop>
                <Typography variant="h3">Origin Selection</Typography>
                <Typography variant="body1">
                  This product is manufactured by the same company in the
                  following origins or territories. Please select your preferred
                  origin.
                </Typography>
              </LableValueTop>
              <Box
                sx={{
                  "& .MuiChip-root": {
                    background: "#D7282F",
                    "& .MuiChip-label": {
                      color: "#fff",
                    },
                    "& svg": {
                      color: "#fff",
                    },
                  },
                }}
              >
                <FormControl sx={{ width: "100%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Origin
                  </InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    size="small"
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={countryName}
                    onChange={(e) => setCountryNames(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#acabab",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#6d6d6d",
                          },
                        },
                      },
                    }}
                  >
                    {availableCountries?.map((country) => (
                      <MenuItem
                        placeholder="Select origin"
                        style={{
                          display: "block",
                          width: "auto",
                          whiteSpace: "nowrap",
                        }}
                        key={country}
                        value={country}
                      >
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid> */}

          
          {/* <Grid item md={6}>
            <Box>
              <LableValueTop>
                <Typography variant="h3">Delivery Term Selection</Typography>
                <Typography variant="body1">
                  The seller's base price is based on{" "}
                  {["A", "E", "I", "O", "U"].includes(
                    quotedetails?.price_term?.[0]?.toUpperCase()
                  )
                    ? "an"
                    : "a"}{" "}
                  <span>{quotedetails?.price_term || "EXW"}</span> delivery
                  term. If you would like to request a quote for a different
                  delivery term, please select from the following options,
                  Please note that additional charges may apply for different
                  delivery terms.
                </Typography>
              </LableValueTop>
              <Box>
                <FormControl sx={{ width: "100%" }} size="small">
                  <InputLabel id="demo-select-small-label">
                    Select Delivery Term
                  </InputLabel>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 200,
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#acabab",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#6d6d6d",
                          },
                        },
                      },
                    }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={userPriceTerms}
                    label="Delivery Terms"
                    onChange={(e) => {
                      // if (
                      //   e?.target?.value == "EXW" ||
                      //   e?.target?.value == "FCA" ||
                      //   e?.target?.value == "FSA" ||
                      //   e?.target?.value == "FOB"
                      // ) {
                      //   setSeaPort({ view: "", value: "" });
                      //   setAirPort({ view: "", value: "" });
                      //   setPortCountry({ view: "", value: "" });
                      //   setRoadInfo("");
                      //   setUserPriceTerms(e.target.value);
                      // } else {
                      setUserPriceTerms(e.target.value);
                      // }
                    }}
                  >
                    {priceTermList.map((v) => (
                      <MenuItem
                        value={v.id}
                        key={v.id}
                        style={{
                          display: "block",
                          width: "auto",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {v.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid> */}

          {/* <Grid item md={12}>
            <Box
              sx={{
                backgroundColor: "#ECECEC",
                padding: "12px",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  padding: "0 0 10px 0",
                }}
              >
                <Grid container spacing={2} sx={{ margin: "0" }}>
                  <Grid item md={6}>
                    <Box>
                      <LableValue>
                        <Typography variant="h3">
                          Shipping Method Selection
                        </Typography>
                        <Typography variant="body1">
                          The seller offers various shipping methods to suit
                          your needs. Please select the most appropriate method
                          for your shipment.
                        </Typography>
                      </LableValue>
                      <LabelCheckboxGroup>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            sx={{
                              "& .Mui-checked": {
                                color: "#D7282F !important",
                              },
                            }}
                            value={shipingMethod}
                            onChange={(e, value) => {
                              setSeaPort({ view: "", value: "" });
                              setAirPort({ view: "", value: "" });
                              setPortCountry({ view: "", value: "" });
                              setRoadInfo("");
                              setShippingMethod(value);
                            }}
                          >
                            <FormControlLabel
                              value="sea"
                              control={<Radio size="small" />}
                              label="By Sea"
                            />
                            <FormControlLabel
                              value="air"
                              control={<Radio size="small" />}
                              label="By Air"
                            />
                            <FormControlLabel
                              value="road"
                              control={<Radio size="small" />}
                              label="By Road"
                            />
                          </RadioGroup>
                        </FormControl>
                      </LabelCheckboxGroup>
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Box>
                      <LableValue>
                        <Typography variant="h3">Destination Port</Typography>
                        <Typography variant="body1" sx={{ margin: "0 0 6px" }}>
                          Please provide the destination port details for your
                          shipment
                        </Typography>
                      </LableValue>
                      <Grid container spacing={1} sx={{ paddingRight: "32px" }}>
                        <Grid item md={6}>
                          <Box>
                            <FormControl
                              sx={{ width: "calc(100% - 0px)" }}
                              size="small"
                            >
                              <Autocomplete
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value.value
                                }
                                disableClearable
                                id="multiple-limit-tags"
                                options={
                                  country.length > 0
                                    ? country
                                    : [{ view: "", value: "" }]
                                }
                                value={portCountry}
                                onChange={(e, value) => {
                                  setSeaPort({ view: "", value: "" });
                                  setAirPort({ view: "", value: "" });
                                  setRoadInfo("");
                                  setPortCountry(value);
                                }}
                                ListboxProps={{
                                  sx: {
                                    maxHeight: "200px",
                                    "&::-webkit-scrollbar": {
                                      width: "6px",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                      backgroundColor: "#f1f1f1",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                      backgroundColor: "#acabab",
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                      backgroundColor: "#6d6d6d",
                                    },
                                  },
                                }}
                                getOptionLabel={(option: any) => option.view}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Port Country"
                                    placeholder="Country"
                                  />
                                )}
                                size="small"
                                sx={{ width: "100%" }}
                              />
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box>
                            <FormControl
                              sx={{ width: "calc(100% - 0px)" }}
                              size="small"
                            >
                              {shipingMethod !== "road" ? (
                                <>
                                  <Autocomplete
                                    isOptionEqualToValue={(option, value) =>
                                      option.value === value.value
                                    }
                                    id="multiple-limit-tags"
                                    options={
                                      shipingMethod === "sea"
                                        ? seaportList
                                        : airportList
                                    }
                                    value={
                                      shipingMethod === "sea"
                                        ? seaPort
                                        : airPort
                                    }
                                    onChange={(e, value) => {
                                      shipingMethod === "sea"
                                        ? setSeaPort(value)
                                        : setAirPort(value);
                                    }}
                                    onInputChange={(e: any) => {
                                      if (e?.target?.value) {
                                        shipingMethod === "sea"
                                          ? fetchSeaPort(
                                              e.target.value,
                                              portCountry?.value
                                            )
                                          : fetchAirPort(
                                              e.target.value,
                                              portCountry?.value
                                            );
                                      }
                                    }}
                                    ListboxProps={{
                                      sx: {
                                        "&::-webkit-scrollbar": {
                                          width: "6px",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                          backgroundColor: "#f1f1f1",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                          backgroundColor: "#acabab",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                          backgroundColor: "#6d6d6d",
                                        },
                                      },
                                    }}
                                    getOptionLabel={(option: any) =>
                                      option.view
                                    }
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={
                                          shipingMethod == "sea"
                                            ? "Select Seaport"
                                            : "Select Airport"
                                        }
                                        placeholder={
                                          shipingMethod == "sea"
                                            ? "SeaPort"
                                            : "Airport"
                                        }
                                      />
                                    )}
                                    size="small"
                                    sx={{ width: "100%" }}
                                  />
                                </>
                              ) : (
                                <TextField
                                  size="small"
                                  label="City/Road"
                                  placeholder="Place enter city/road details"
                                  value={roadInfo}
                                  // disabled={
                                  //   userPriceTerms == "EXW" ||
                                  //   userPriceTerms == "FCA" ||
                                  //   userPriceTerms == "FSA" ||
                                  //   userPriceTerms == "FOB"
                                  //     ? true
                                  //     : false
                                  // }
                                  onChange={(e) => setRoadInfo(e.target.value)}
                                />
                              )}
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid> */}

        </Grid>

        {/* <Grid container>
          <Grid item md={12}>
            <Box
              sx={{
                margin: "10px 0 4px 0",
                fontFamily: "open sans",
                "& textarea": {
                  borderRadius: "4px",
                  border: "1px solid #BBBBBB",
                  outline: "none",
                  padding: "12px",
                  width: "100%",
                  fontFamily: "open sans",
                  // margin: "4px 0 0 0",
                  "&:hover": {
                    borderColor: "#333333",
                  },
                },
                "& .textarea-heading": {
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "4px",
                  marginTop: "16px",
                },
              }}
            >
              <Typography className="textarea-heading">
                Write message to supplier to know more about your request
              </Typography>
              <TextareaAutosize
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                aria-label="minimum height"
                minRows={2}
                placeholder="If you have any specific requirements, preferences, questions or inquiries, please provide them here"
              />
            </Box>
          </Grid>
        </Grid> */}

      </Box>
    </>
  );
})

export default CustomizeRequest;

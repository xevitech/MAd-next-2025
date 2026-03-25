import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { SelectableTextField } from "@/components/products/common/selectableTextField";
import { OrderAndPrice } from "../OrderAndPrice";
// import useProductContext from "@/hooks/useProductContext";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
} from "@/components/products/editProduct/productInformation/productAvailability/inStock/styles";
import { EditableTextField } from "@/components/products/common/editableTextField";
import CustomAutocompelete from "@/components/products/common/autoCompelete";
import {
  AddMoreRangeBtn,
  AllPriceRange,
  CurrencyCode,
  OrderQtiyLabel,
  OrderQtiyValue,
  PriceOrderCol,
  PriceOrderColInn,
  PriceOrderLabel,
  PriceOrderValueColmn,
  PriceRangeColInfo,
  PricingOrderQtyy,
  QuantityBaseShowHideBtn,
  SymbolForQty,
  useStyles,
} from "@/components/products/editProduct/commercialInformation/styles";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AddUnitField from "../AddUnitField";
import { apiClient, FirstletterCapital } from "@/components/common/common";
import { useSelector } from "react-redux";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HidePriceOptions from "../HidePriceOptions";
export const QuantityBasedPricing = ({
  formik,
  availability,
  product_type,
  productDetail,
  commercialUnitList,
  setCommercialUnitList,
  setIsOrderQuantity,
  accordionValue
}) => {
  // const { commercialInfoPaymentTerms, commercialInfoCurrencies } =
  //   useProductContext();

  const {
    commercialInfoPaymentTerms,
    commercialInfoCurrencies,
    commercialInfoUnits,
  } = useSelector((state: any) => state.editProduct);
  const [priceError, setPriceError] = useState(false);
  const currency_id = productDetail?.currency_id ? productDetail?.currency_id : JSON.parse(localStorage.getItem("productCurrency")) ?? 1;
  const { classes } = useStyles();
  const {
    price_term,
    qty_unit,
    // currency_id,
    order_quantity,
    negotiable_price,
    hide_price,
    minimum_order
  } = formik.values;

  const initialValue = [
    {
      min: "",
      price: "",
      id: 1,
    },
  ];
  const [orderOptions, setOrderOptions] = useState<any>(
    order_quantity.length > 1 ? order_quantity : initialValue
  );

  useEffect(() => {
    const { quantity_based_list } = productDetail;
    if (quantity_based_list?.length > 0) {
      let list = quantity_based_list.map((v) => ({
        min: v.min_qty,
        price: v.price,
        id: v.id,
      }));
      setOrderOptions(list);
      formik.setFieldValue("order_quantity", list);
    }
  }, [productDetail]);

  const createOrderQuantity = () => {
    // setIsOrderQuantity(true);
    if (orderOptions.length < 5) {
      const newOption = {
        min: "",
        price: "",
        id: orderOptions.length + 1,
      };
      setOrderOptions((prev) => [...prev, newOption]);
      formik?.setFieldValue("order_quantity", [...orderOptions, newOption]);
      formik?.setFieldError("order_quantity", "");
    }
  };

  const deleteOrderQuantity = (index) => {
    if (typeof index === "number") {
      let orderQuantity = [...orderOptions];
      orderQuantity.splice(index, 1);
      setOrderOptions(orderQuantity);
      formik?.setFieldValue("order_quantity", orderQuantity);
      formik?.setFieldError("order_quantity", '');
    }
  };

  // const AddMoreHandler = (index = null) => {
  //   if (index) {
  //     let orderQuantity = [...orderOptions];
  //     orderQuantity.splice(index, 1);
  //     setOrderOptions(orderQuantity);
  //     return;
  //   }
  //   setIsOrderQuantity(true);
  //   if (orderOptions.length < 5) {
  //     setOrderOptions((prev) => [
  //       ...prev,
  //       {
  //         min: "",
  //         price: "",
  //         id: order_quantity.length + 1,
  //         product_id: "",
  //       },
  //     ]);
  //   }
  // };

  // useEffect(() => {
  //   formik?.setFieldValue("order_quantity", orderOptions);
  // }, [orderOptions]);

  let unitList = commercialUnitList?.map((v) => ({
    ...v,
    view: FirstletterCapital(v.view),
  }));
  const unitValue = unitList?.find((v) => v?.value == `${qty_unit}`);

  const currencyValue = commercialInfoCurrencies?.find(
    (v) => v?.value == `${currency_id}`
  );

  function getCurrencyDetails(viewString) {
    const currencyData = [
      { view: "U.S. Dollar ($)", code: "USD" },
      { view: "Australian Dollar ($)", code: "AUD" },
      { view: "British Pound Sterling (£)", code: "GBP" },
      { view: "Brazilian Real (R$)", code: "BRL" },
      { view: "Chinese Yuan Renminbi (¥)", code: "CNY" },
      { view: "Canadian Dollar ($)", code: "CAD" },
      { view: "Euro (€)", code: "EUR" },
      { view: "Japanese Yen (¥)", code: "JPY" },
      { view: "Mexican Peso ($)", code: "MXN" },
      { view: "Swiss Franc (CHF)", code: "CHF" },
      { view: "Indian Rupee (₹)", code: "INR" },
      { view: "Danish Krone (kr)", code: "DKK" },
      { view: "Taka (৳)", code: "BDT" },
      { view: "Thai Baht (฿)", code: "THB" },
      { view: "Swedish Krona (kr)", code: "SEK" },
      { view: "Singapore Dollar ($)", code: "SGD" },
      { view: "Russian Ruble (руб)", code: "RUB" },
      { view: "Polish Zloty (zł)", code: "PLN" },
      { view: "Philippine Peso (₱)", code: "PHP" },
      { view: "New Zealand Dollar ($)", code: "NZD" },
      { view: "Norwegian Krone (kr)", code: "NOK" },
      { view: "Malaysian Ringgit (RM)", code: "MYR" },
      { view: "Israeli New Sheqel (₪)", code: "ILS" },
      { view: "Hungarian Forint (Ft)", code: "HUF" },
      { view: "Hong Kong Dollar ($)", code: "HKD" },
      { view: "Czech Koruna (Kč)", code: "CZK" }
    ];

    const currency = currencyData?.find((item) => item.view === viewString);

    if (currency) {
      const symbolMatch = currency?.view.match(/\(([^)]+)\)/);
      const symbol = symbolMatch ? symbolMatch[1] : "";

      return {
        countryCode: currency?.code,
        symbol: symbol,
      };
    } else {
      return null;
    }
  }

  const handleFun = (values) => {
    formik?.setFieldValue("order_quantity", values);
    setOrderOptions(values);
  };

  const [latestUnitValue, setLatestUnitValue] = useState<any>("");

  useEffect(() => {
    if (latestUnitValue == "") {
      return;
    }
    const findUnit = commercialUnitList?.find(
      (value) => value.view.toLowerCase() == latestUnitValue.toLowerCase()
    );
    if (findUnit?.value) {
      formik.setFieldValue("qty_unit", findUnit?.value);
      formik.setFieldTouched("qty_unit", true, false);
      formik.setFieldError("qty_unit", null);
    }
  }, [commercialUnitList, latestUnitValue]);
  
  const formatCurrency = (value) => {
    if (!value) return "";
  
    const parts = value.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : "";
  
    // Correct grouping: first group of three digits, followed by groups of two digits
    const formattedInteger = integerPart.replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      "$1,"
    );
  
    return formattedInteger + decimalPart;
  };

  // const priceRange = orderOptions?.map((item, index, array) => {

  //   if (item?.min != "" && item?.price != "") {
  //     if (index == 0 && array.length == 1) {
  //       return (
  //         <Grid item xs="auto" sm="auto" md="auto">
  //           <PriceRangeColInfo>
  //             <Typography variant="h5">
  //               {getCurrencyDetails(currencyValue?.view)?.countryCode}{" "}
  //               ({getCurrencyDetails(currencyValue?.view)?.symbol}){" "}
  //               {formatCurrency(item?.price)}
  //             </Typography>
  //             <Typography variant="body1">
  //               &#8805; {item?.min} {unitValue?.view}
  //             </Typography>
  //           </PriceRangeColInfo>
  //         </Grid>
  //       );
  //     } else if (array.length > 1) {
  //       const differenceIsOneCond =
  //         array[index + 1]?.min - 1 == array[index]?.min;
  //       const isLastValue = array.length - 1 === index;
  //       if (differenceIsOneCond) {
  //         return (
  //           <Grid item xs="auto" sm="auto" md="auto">
  //             <PriceRangeColInfo>
  //               <Typography variant="h5">
  //                 {getCurrencyDetails(currencyValue?.view)?.countryCode}{" "}
  //                 ({getCurrencyDetails(currencyValue?.view)?.symbol}){" "}
  //                 {formatCurrency(item?.price)}
  //               </Typography>
  //               <Typography variant="body1">
  //                 {item?.min} {unitValue?.view}
  //               </Typography>
  //             </PriceRangeColInfo>
  //           </Grid>
  //         );
  //       } else if (isLastValue && !differenceIsOneCond) {
  //         return (
  //           <Grid item xs="auto" sm="auto" md="auto">
  //             <PriceRangeColInfo>
  //               <Typography variant="h5">
  //                 {getCurrencyDetails(currencyValue?.view)?.countryCode}{" "}
  //                 ({getCurrencyDetails(currencyValue?.view)?.symbol}){" "}
  //                 {formatCurrency(item?.price)}
  //               </Typography>
  //               <Typography variant="body1">
  //                 &#8805; {item?.min} {unitValue?.view}
  //               </Typography>
  //             </PriceRangeColInfo>
  //           </Grid>
  //         );
  //       }
  //       return (
  //         <Grid item xs="auto" sm="auto" md="auto">
  //           <PriceRangeColInfo>
  //             <Typography variant="h5">
  //               {getCurrencyDetails(currencyValue?.view)?.countryCode}{" "}
  //               ({getCurrencyDetails(currencyValue?.view)?.symbol}){" "}  {formatCurrency(item?.price)}
  //             </Typography>
  //             <Typography variant="body1">{`${array[index]?.min} - ${
  //               array[index + 1]?.min - 1 == -1 ||
  //               isNaN(array[index + 1]?.min - 1)
  //                 ? ""
  //                 : array[index + 1]?.min - 1
  //             }
  //             ${unitValue?.view}`}</Typography>
  //           </PriceRangeColInfo>
  //         </Grid>
  //       );
  //     } else {
  //       return (
  //         <Grid item xs="auto" sm="auto" md="auto">
  //           <PriceRangeColInfo>
  //             <Typography variant="h5">
  //               {getCurrencyDetails(currencyValue?.view)?.countryCode}{" "}
  //               ({getCurrencyDetails(currencyValue?.view)?.symbol}){" "}  {formatCurrency(item?.price)}
  //             </Typography>
  //             <Typography variant="body1">{`${array[index - 1]?.min} - ${
  //               item?.min
  //             }  ${unitValue?.view}`}</Typography>
  //           </PriceRangeColInfo>
  //         </Grid>
  //       );
  //     }
  //   }
  // });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [priceRange, setPriceRange] = useState([]);
  const [lastValue, setLastValue] = useState(false);

  // useEffect(() => {
  //   const ranges = [];
  //   let shouldDisableButton = false;
  //   let isLastValue = false;

  //   for (let index = 0; index < orderOptions?.length; index++) {
  //     if (orderOptions[index]?.min == "") {
  //       break;
  //     }

  //     const item = orderOptions[index];
  //     if (item?.min != "" && item?.price != "") {
  //       let rangeStart, rangeEnd;

  //       const isLastSamePrev =
  //         index > 0 && item?.min === orderOptions[index - 1]?.min;

  //       if (index > 0 && orderOptions[index - 1]?.min > item?.min) {
  //         break;
  //       }

  //       if (index === 0) {
  //         rangeStart = 1;
  //         rangeEnd = item?.min;
  //       } else if (index === orderOptions?.length - 1 && !isLastSamePrev) {
  //         rangeStart = orderOptions[index - 1]?.min + 1;
  //         rangeEnd = item?.min;
  //       } else if (index === orderOptions?.length - 1 && isLastSamePrev) {
  //         isLastValue = true;
  //         shouldDisableButton = true;
  //         rangeStart = orderOptions[index - 1]?.min;
  //         rangeEnd = null;
  //       } else {
  //         rangeStart = orderOptions[index - 1]?.min + 1;
  //         rangeEnd = item?.min;
  //       }

  //       ranges.push(
  //         <Grid item xs="auto" sm="auto" md="auto" key={item?.id}>
  //           <PriceRangeColInfo>
  //             <Typography variant="h5">
  //               {getCurrencyDetails(currencyValue?.view)?.countryCode} (
  //               {getCurrencyDetails(currencyValue?.view)?.symbol}){" "}
  //               {formatCurrency(item?.price)}
  //             </Typography>
  //             <Typography variant="body1">
  //               {rangeEnd !== null && rangeStart != rangeEnd
  //                 ? `${rangeStart}-${rangeEnd} ${unitValue?.view}`
  //                 : rangeStart == rangeEnd && rangeEnd !== null
  //                 ? `${rangeEnd} ${unitValue?.view}`
  //                 : `>${rangeStart} ${unitValue?.view}`}
  //             </Typography>
  //           </PriceRangeColInfo>
  //         </Grid>
  //       );
  //     }
  //   }

  //   setPriceRange(ranges);
  //   setIsButtonDisabled(shouldDisableButton);
  //   setLastValue(isLastValue);
  // }, [orderOptions, currencyValue, unitValue]);

  const priceRanges = useMemo(() => {
    const ranges = [];
    let shouldDisableButton = false;
    let isLastValue = false;

    for (let index = 0; index < orderOptions?.length; index++) {
      if (orderOptions[index]?.min === "") break;
  
      const item = orderOptions[index];
      if (item?.min !== "" && item?.price !== "") {
        let rangeStart, rangeEnd;

        const isLastSamePrev =
          index > 0 && item?.min === orderOptions[index - 1]?.min;

        if (index > 0 && orderOptions[index - 1]?.min > item?.min) {
          break;
        }

        if (index === 0) {
          rangeStart = 1;
          rangeEnd = item?.min;
        } else if (index === orderOptions?.length - 1 && !isLastSamePrev) {
          rangeStart = orderOptions[index - 1]?.min + 1;
          rangeEnd = item?.min;
        } else if (index === orderOptions?.length - 1 && isLastSamePrev) {
          isLastValue = true;
          shouldDisableButton = true;
          rangeStart = orderOptions[index - 1]?.min;
          rangeEnd = null;
        } else {
          rangeStart = orderOptions[index - 1]?.min + 1;
          rangeEnd = item?.min;
        }
  
        ranges.push(
          <Grid item xs="auto" sm="auto" md="auto" key={item?.id}>
            <PriceRangeColInfo>
              <Typography variant="h5">
                {getCurrencyDetails(currencyValue?.view)?.countryCode} (
                {getCurrencyDetails(currencyValue?.view)?.symbol}){" "}
                {formatCurrency(item?.price)}
              </Typography>
              <Typography variant="body1">
                {rangeEnd !== null && rangeStart !== rangeEnd
                  ? `${rangeStart}-${rangeEnd} ${unitValue?.view}`
                  : rangeStart === rangeEnd && rangeEnd !== null
                  ? `${rangeEnd} ${unitValue?.view}`
                  : `>${rangeStart} ${unitValue?.view}`}
              </Typography>
            </PriceRangeColInfo>
          </Grid>
        );
      }
    }
    return { ranges, shouldDisableButton, isLastValue };
  }, [orderOptions, currencyValue, unitValue]);
  
  useEffect(() => {
    setIsButtonDisabled(priceRanges.shouldDisableButton);
    setLastValue(priceRanges.isLastValue);
  }, [priceRanges.shouldDisableButton, priceRanges.isLastValue]);
  

  return (
    <>
      {availability == "in_stock" && (
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} lg={4} xl={2}>
            <FormControl sx={{ width: "100%" }}>
              <div style={{}}>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginTop: "16px",
                  }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <EditableTextField
                      labelToolTipText="Enter the exact number of units currently available in your inventory. This helps 
                    buyers gauge availability and plan their purchases accordingly. Please keep 
                    updating regularly."
                      numberOnly={true}
                      characterLimit={4}
                      label="Quantity Available"
                      required={true}
                      placeholder="Enter Quantity"
                      name="quantity_available"
                      value={formik.values.quantity_available}
                      size="small"
                      formik={formik}
                      handleChange={(e) => {
                        const regex = /^[0-9]+$/;
                        if (
                          e.target.value === "" ||
                          regex.test(e.target.value)
                        ) {
                          formik.setFieldValue(
                            "quantity_available",
                            e.target.value
                          );
                        }
                      }}
                    />
                  </FormControl>
                </div>
              </div>
            </FormControl>
          </Grid>
        </Grid>
      )}
      <Box
        sx={{
          marginTop: "16px",
          "@media screen and (max-width: 1600px)": {
            marginTop: "27px",
          },
        }}
      >
        <Grid container alignItems={"flex-start"} spacing={2}>
          {product_type === "simple" && (
            <>
              <Grid item xs={12} sm={12} md={4}>
                {/* <Box sx={{ height: "100%" }}> */}
                <FormControl sx={{ width: "100%", position: "relative" }}>
                  <div style={{ paddingLeft: "0px" }}>
                    <CustomAutocompelete
                      labelToolTipText="Ensure consistency with industry standards and buyer expectations."
                      placeholder="Measurement Unit"
                      formik={formik}
                      label="Measurement Unit"
                      required={true}
                      options={unitList}
                      name="qty_unit"
                      value={qty_unit}
                      size="small"
                      handleChange={(value) => {
                        formik.setFieldValue("qty_unit", value);
                        formik.setFieldTouched("qty_unit", true, false);
                        formik.setFieldError("qty_unit", null);
                      }}
                      // handleChange={(value) => {
                      //   formik.setFieldValue("qty_unit", value);
                      //   formik.setFieldError("qty_unit", "");

                      // }}
                      initialValue={unitList?.find(
                        (v) => v.value == `${qty_unit}`
                      )}
                    />
                  </div>
                  {/* <AddUnitField
                    commercialUnitList={commercialUnitList}
                    setCommercialUnitList={setCommercialUnitList}
                    setValue={(e) => formik.setFieldValue("qty_unit", e)}
                  /> */}
                  <AddUnitField
                    accordionValue={accordionValue}
                    commercialUnitList={commercialUnitList}
                    setCommercialUnitList={setCommercialUnitList}
                    setValue={(e) => {
                      setLatestUnitValue(e);
                      // formik.setFieldValue("qty_unit", e);
                      // formik.setFieldTouched("qty_unit", true, false);
                      // formik.setFieldError("qty_unit", null);
                    }}
                  />
                </FormControl>
                {/* </Box> */}
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={4}>
            {/* <Box sx={{ height: "100%" }}> */}
            <FormControl sx={{ width: "100%" }}>
              <div style={{ paddingLeft: "0px" }}>
                {/* <EditableTextField
                  // labelToolTipText="Choose a currency relevant to your target market and international trade."
                  required={true}
                  label="Currency"
                  placeholder="Currency"
                  name="currency_id"
                  value={
                    commercialInfoCurrencies?.find(
                      (v) => v.value == currency_id
                    )?.view || ""
                  }
                  // readOnly={true}
                  isCurrency={true}
                  isReadOnly={true}
                  handleChange={(value) => {
                    formik.setFieldError("currency_id", "");
                    formik.setFieldValue("currency_id", value);
                  }}
                  size="small"
                  formik={formik}
                /> */}

                <EditableTextField
                  // labelToolTipText="Enter the exact number of units currently available in your inventory. This helps
                  //     buyers gauge availability and plan their purchases accordingly. Please keep
                  //     updating regularly."
                  numberOnly={true}
                  // characterLimit={4}
                  required={true}
                  label="Minimum Order Quantity"
                  placeholder="Enter Minimum Order Quantity"
                  name="minimum_order"
                  value={minimum_order}
                  size="small"
                  formik={formik}
                  handleChange={(e) => {
                    const regex = /^[0-9]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      formik.setFieldValue("minimum_order", e.target.value);
                    }
                  }}
                />

                {/* <CustomAutocompelete
                  labelToolTipText="Choose a currency relevant to your target market and international trade."
                  placeholder="Currency"
                  formik={formik}
                  label="Currency"
                  options={commercialInfoCurrencies}
                  value={currency_id}
                  name="currency_id"
                  size="small"
                  handleChange={(value) => {
                    formik.setFieldError("currency_id", "");
                    formik.setFieldValue("currency_id", value);
                  }}
                  initialValue={commercialInfoCurrencies?.find(
                    (v) => v.value == `${currency_id}`
                  )}
                /> */}
              </div>
            </FormControl>
            {/* </Box> */}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            {/* <Box sx={{ height: "100%" }}> */}
            <FormControl sx={{ width: "100%" }}>
              <div style={{ paddingLeft: "0px" }}>
                <Autocomplete
                  onInputChange={(e: any) => {}}
                  size="small"
                  // multiple
                  limitTags={1}
                  id="tags-outlined"
                  options={commercialInfoPaymentTerms.map((v) => v.view)}
                  // freeSolo={
                  //   commercialInfoPaymentTerms.length > 0 ? false : true
                  // }
                  getOptionLabel={(option) => option}
                  value={price_term}
                  onChange={(e, value) => {
                    // formik.setFieldError("price_term", "");
                    // if (value.length > 6) {
                    //   formik.setFieldError(
                    //     "price_term",
                    //     "Only 6 selection is allowed!"
                    //   );
                    //   return;
                    // }
                    formik.setFieldValue("price_term", value);
                  }}
                  slotProps={{
                    popper: {
                      sx: {
                        zIndex: 9,
                      },
                    },
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputLabelProps={{ shrink: true }}
                      label={
                        <div>
                          <span
                            style={{
                              paddingRight: "5px",
                              fontWeight: 600,
                              letterSpacing: "0.4px",
                              color: "#1C1C1C",
                              fontFamily: "open sans",
                            }}
                          >
                            {"Shipping Incoterm"}
                          </span>

                          <LightTooltip
                            disableInteractive
                            placement={"top"}
                            title="Required!"
                            arrow
                          >
                            <span
                              style={{
                                color: "#D7282F",
                                paddingRight: "5px",
                              }}
                            >
                              *
                            </span>
                          </LightTooltip>

                          {
                            <LightTooltip
                              // disableInteractive
                              placement={"top"}
                              title={
                                "Choose from standard Incoterms (e.g., FOB, CIF, DDP)."
                              }
                              arrow
                            >
                              {
                                <span
                                  style={{
                                    display: "inline-block",
                                    position: "relative",
                                    width: "16px",
                                    height: "16px",
                                  }}
                                >
                                  <Image
                                    src={"/assets/helpIcon.svg"}
                                    layout="fill"
                                    alt="image"
                                  />{" "}
                                </span>
                              }
                            </LightTooltip>
                          }
                        </div>
                      }
                      placeholder="Shipping Incoterm"
                      error={formik?.errors?.price_term ? true : false}
                      helperText={`${formik?.errors?.price_term ?? ""}`}
                    />
                  )}
                />
                {/* <CustomAutocompelete
                  labelToolTipText="Choose from standard Incoterms (e.g., FOB, CIF, DDP)."
                  placeholder="Shipping Incoterm"
                  required={true}
                  formik={formik}
                  label="Shipping Incoterm"
                  size="small"
                  options={commercialInfoPaymentTerms}
                  name="price_term"
                  value={price_term}
                  handleChange={(value) => {
                    formik.setFieldError("price_term", "");
                    formik.setFieldValue("price_term", value);
                  }}
                  initialValue={commercialInfoPaymentTerms?.find(
                    (v) => v.value == `${price_term}`
                  )}
                /> */}
              </div>
            </FormControl>
            {/* </Box> */}
          </Grid>
        </Grid>
      </Box>
      {product_type === "simple" && unitValue && currencyValue && (
        <Box
          sx={{
            // padding: "16px",
            padding: "16px 16px 25px",
            border: "1px solid #DDDDDD",
            marginTop: "16px",

            borderRadius: "6px",
            position: "relative",
            "& .MuiToggleButtonGroup-root": {
              height: "22px",
              "& .MuiButtonBase-root": {
                fontSize: "10px",
              },
            },
          }}
        >
          <QuantityBaseShowHideBtn>
            <ToggleButtonGroup
              className={classes.toggleBtn}
              color="primary"
              size="small"
              exclusive
              aria-label="Platform"
              value={+hide_price}
            >
              <ToggleButton
                value={1}
                onClick={(e) => formik.setFieldValue("hide_price", 1)}
              >
                Show
              </ToggleButton>
              <ToggleButton
                value={0}
                onClick={(e) => formik.setFieldValue("hide_price", 0)}
              >
                Hide
              </ToggleButton>
            </ToggleButtonGroup>
          </QuantityBaseShowHideBtn>
          {unitValue &&
            currencyValue &&
            orderOptions?.map((element, index) => (
              <OrderAndPrice
                priceError={priceError}
                setPriceError={setPriceError}
                key={index}
                data={element}
                id={element?.id}
                index={index}
                deleteSection={deleteOrderQuantity}
                addMoreSection={createOrderQuantity}
                order_quantity={orderOptions}
                Handler={handleFun}
                setIsOrderQuantity={setIsOrderQuantity}
                formik={formik}
                unitValue={unitValue}
                currencyValue={currencyValue}
                getCurrencyDetails={getCurrencyDetails}
                isButtonDisabled={isButtonDisabled}
                setIsButtonDisabled={setIsButtonDisabled}
                lastValue={lastValue}
              />
            ))}
          {/* {order_quantity?.length < 5 && (
            <span style={{ display: "inline-block" }}>
              <LightTooltip
                title="Add more range to give discounts upon the increased quantity "
                placement="top"
                arrow
                disableInteractive
              >
                <Button
                  style={{
                    position: "absolute",
                    bottom: "-13px",
                    left: `calc(50% - 62px)`,
                    background: "#FFFFFF",
                    border: "1px solid #DD484E",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "4px",
                    textTransform: "none",
                    height: "24px",
                    color: "#DD484E",
                    minWidth: "120px",
                  }}
                  onClick={() => {
                    AddMoreHandler();
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      paddingRight: "6px",
                      position: "relative",
                      width: "12px",
                      height: "12px",
                      marginRight: "10px",
                    }}
                  >
                    {" "}
                    <Image
                      src={"/assets/plus_Sign.svg"}
                      alt="plus-sign-img"
                      layout="fill"
                    />
                  </span>{" "}
                  Add More{" "}
                  <span
                    style={{
                      paddingLeft: "6px",
                      position: "relative",
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      marginLeft: "7px",
                    }}
                  >
                    {" "}
                    <Image
                      src={"/assets/greenExclamation.svg"}
                      layout="fill"
                      alt="img"
                    />
                  </span>
                </Button>
              </LightTooltip>
            </span>
          )} */}
          {/* Start New Design for order Quality */}
          {/* <PricingOrderQtyy>
            <Grid container spacing={2} sx={{ alignItems: "baseline" }}>
              <Grid item xs={12} sm={4} md={4}>
                <PriceOrderCol>
                  <SymbolForQty>&#8805; </SymbolForQty>
                  <PriceOrderColInn>
                    <PriceOrderLabel> Minimum Order Quantiy  <span>*</span></PriceOrderLabel>
                    <OrderQtiyLabel>Piece/Pieces</OrderQtiyLabel>
                    <PriceOrderValueColmn>
                      <TextField id="outlined-basic" variant="outlined" size="small" fullWidth />
                      <OrderQtiyValue>2 Piece</OrderQtiyValue>
                    </PriceOrderValueColmn>
                  </PriceOrderColInn>
                </PriceOrderCol>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <PriceOrderCol>
                  <CurrencyCode>US $ </CurrencyCode>
                  <PriceOrderColInn>
                    <PriceOrderLabel> Price <span>*</span></PriceOrderLabel>
                    <OrderQtiyLabel>Piece/Pieces</OrderQtiyLabel>
                    <PriceOrderValueColmn>
                      <TextField id="outlined-basic" variant="outlined" size="small" fullWidth />
                      <OrderQtiyValue>2 Piece’s price is <span>$40</span></OrderQtiyValue>
                    </PriceOrderValueColmn>
                  </PriceOrderColInn>
                </PriceOrderCol>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Box>
                  <LightTooltip
                    title="Add more range to give discounts upon the increased quantity "
                    placement="top"
                    arrow
                    disableInteractive
                  >
                    <AddMoreRangeBtn variant="outlined" startIcon={<AddRoundedIcon />} endIcon={<InfoOutlinedIcon />}
                      onClick={() => {
                        AddMoreHandler();
                      }}
                    >
                      Add More{" "}
                    </AddMoreRangeBtn>
                  </LightTooltip>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <AllPriceRange>
                  <Typography variant="h4">Prices ranges will be shown as below:</Typography>
                  <Grid container>
                    <Grid item xs="auto" sm="auto" md="auto">
                      <PriceRangeColInfo>
                        <Typography variant="h5">
                          US $20.00
                        </Typography>
                        <Typography variant="body1">
                          2 - 49 pieces
                        </Typography>
                      </PriceRangeColInfo>
                    </Grid>
                    <Grid item xs="auto" sm="auto" md="auto">
                      <PriceRangeColInfo>
                        <Typography variant="h5">
                          US $15.00
                        </Typography>
                        <Typography variant="body1">
                          &#8805; 50 Pecies
                        </Typography>
                      </PriceRangeColInfo>
                    </Grid>
                  </Grid>
                </AllPriceRange>
              </Grid>
            </Grid>
          </PricingOrderQtyy> */}
          {/* End New Design for order Quality */}
          {
            qty_unit &&
            currency_id &&
            (
              <Grid
                item
                xs={12}
                sx={{
                  "@media screen and (max-width:900px)": {
                    marginTop: "10px",
                  },
                }}
              >
                <AllPriceRange mt={2}>
                  <Typography variant="h4">
                    Prices ranges will be shown as below:
                  </Typography>
                  <Grid container spacing={1}>
                    {priceRanges?.ranges}
                  </Grid>
                  {((formik?.value?.quantity_status == 0 &&
                    formik?.values?.price_type === "quantity") ||
                    (formik?.values?.price_type === "quantity" &&
                      hide_price == 0)) && <HidePriceOptions formik={formik} />}
                </AllPriceRange>
              </Grid>
            )}
        </Box>
      )}
    </>
  );
};

import {
  Box,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useFormik } from "formik";
import poststyle from "components/products/editProduct/style.module.css";
import Image from "next/image";
// import useProductContext from "@/hooks/useProductContext";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import {
  AddMoreRangeBtn,
  AllPriceRange,
  CurrencyCode,
  CurrencyCodeBox,
  CurrencyCodeBoxSecond,
  ErrormessBox,
  OrderQtiyLabel,
  OrderQtiyLabel1,
  OrderQtiyValue,
  PriceOrderCol,
  PriceOrderColInn,
  PriceOrderColPerInn,
  PriceOrderColPerInn1,
  PriceOrderLabel,
  PriceOrderLabel1,
  PriceOrderValueColmn,
  PriceRangeColInfo,
  PricesmainBox,
  PricesTextFiled,
  PricesTextFiledSecond,
  PricingOrderQtyy,
  SymbolForQty,
  SymbolForQtyBox,
  SymbolForQtyBox1,
  useStyles,
} from "@/components/products/editProduct/commercialInformation/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useErrorTimeout from "@/hooks/useErrorTimeout";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
export const OrderAndPricePlaceholder = (props) => {
  const {
    index,
    data,
    addMoreSection,
    formik,
    key,
    Handler,
    order_quantity,
    deleteSection,
    unitValue,
    currencyValue,
    getCurrencyDetails,
    id,
    setPriceError,
    priceError,
    isButtonDisabled,
    setIsButtonDisabled,
    lastValue = false,
  } = props;

  const { commercialInfoCurrencies } = useSelector(
    (state: any) => state.editProduct
  );
  const { classes } = useStyles();
  const { commercialInfoUnits } = useSelector(
    (state: any) => state.calculatorData
  );

  const [emptyError, setEmptyError] = useState(false);
  const [minError, setMinError] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const [decimalError, setDecimalError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  const onChangeHandler = (name, value, event) => {
    if (value == "") {
      setError(name);
      let options = [...order_quantity];
      options[index][name] = "";
      Handler(options);
    } else {
      let options = [...order_quantity];
      if (name == "price") {
        options[index][name] = value;
      } else {
        options[index][name] = +value;
      }
      Handler(options);
      setError(name);
    }
  };

  const setError = (name) => {
    if (formik?.errors?.order_quantity?.length > 0) {
      const errors: any = [...formik?.errors?.order_quantity];
      if (errors[index]) {
        if (errors[index][name]) {
          errors[index][name] = "";
          formik.setFieldError("order_quantity", errors);
        }
      }
    }
  };

  const showError = (name) => {
    if (formik?.errors?.order_quantity?.[index]?.[name]) return true;
    else return false;
  };

  const { qty_unit, currency_id } = formik.values;
  const currency =
    commercialInfoCurrencies?.length > 0 &&
    (commercialInfoCurrencies?.find((v) => v.value == currency_id)?.view ?? "");
  const units =
    commercialInfoUnits?.length > 0 &&
    (commercialInfoUnits?.find((v) => v.value == qty_unit)?.view ?? "");

    const handleBlur = (value, idx) => {
      if (value == "") return;
      if (
        value < order_quantity[index - 1]?.min &&
        // || value == order_quantity[index - 1]?.min
        idx == order_quantity?.length - 1
      ) {
        formik.setFieldError(
          "order_quantity",
          "Please enter greater value than or eqaul to previous minimum quantity."
        );
        setMinError(true);
        return;
      } else if (
        (value < order_quantity[index - 1]?.min ||
          value == order_quantity[index - 1]?.min) &&
        idx != order_quantity?.length - 1
      ) {
        formik.setFieldError(
          "order_quantity",
          "Please enter greater value than previous minimum quantity."
        );
        setMinError(true);
        return;
      }
      formik.setFieldError("order_quantity", "");
      setMinError(false);
    };

  useErrorTimeout(limitError, setLimitError, 3000);
  useErrorTimeout(decimalError, setDecimalError, 3000);
  useErrorTimeout(maxError, setMaxError, 3000);

  useEffect(() => {
    if (
      limitError ||
      decimalError ||
      maxError ||
      formik.errors?.order_quantity
    ) {
      setPriceError(true);
      return;
    }
    setPriceError(false);
  }, [limitError, decimalError, maxError, formik.errors?.order_quantity]);

  return (
    <div style={{ marginTop: index != 0 ? "20px" : "0px" }} key={data?.id}>
      <PricingOrderQtyy>
        <Grid
          container
          columnSpacing={{ xs: 0.5, sm: 1, md: 2 }}
          sx={{ alignItems: "center" }}
        >
          <Grid item xs={12} sm={12} md={4.7} lg={4.7} xl={4.7}>
            <PriceOrderCol sx={{ height: "100%" }}>
              <PriceOrderColInn>
                <PriceOrderColPerInn>
                  <PriceOrderLabel>
                    Enter Upper Range <span>*</span>
                  </PriceOrderLabel>
                  <OrderQtiyLabel>{unitValue?.view}</OrderQtiyLabel>
                </PriceOrderColPerInn>
                <SymbolForQtyBox1>
                  <SymbolForQtyBox>
                    {index != 0 &&
                    index == order_quantity?.length - 1 &&
                    lastValue ? (
                      <SymbolForQty>&#8805; </SymbolForQty>
                    ) : (
                      <SymbolForQty>&#8804; </SymbolForQty>
                    )}
                  </SymbolForQtyBox>
                  <PriceOrderValueColmn
                    sx={{ position: "relative", width: "100%" }}
                  >
                    {/* <TextField
                        sx={{
                          "@media screen and (max-width:900px)": {
                            "& .MuiOutlinedInput-input": {
                              padding: "8.5px 14px 8.5px 45px",
                            },
                          },
                        }}
                        autoComplete="off"
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={data?.min}
                        onBlur={(e) => handleBlur(e?.target?.value)}
                        onChange={(e) => {
                          if (e?.target?.value.length < 5) {
                            onChangeHandler("min", e?.target?.value, e);
                          }
                        }}
                        error={minError ? true : false}
                        helperText={
                          minError ? formik?.errors?.order_quantity : " "
                        }
                      /> */}

                    <PricesTextFiled
                      autoComplete="off"
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={data?.min}
                      onBlur={(e) => handleBlur(e?.target?.value, index)}
                      onChange={(e) => {
                        setIsButtonDisabled(false);
                        let { value } = e.target;
                        value = value.replace(/[^0-9]/g, "");
                        if (value.length > 5) {
                          setMaxError(true);
                          return;
                        }
                        onChangeHandler("min", value, e);
                        setMaxError(false);
                        formik.setFieldError("order_quantity", "");
                      }}
                      error={
                        minError
                          ? true
                          : formik?.errors?.order_quantity && data?.min == ""
                          ? true
                          : maxError
                          ? true
                          : false
                      }
                    />
                    {minError ? (
                      <Box
                        className="error-message-container"
                        sx={{
                          position:
                            formik?.errors?.order_quantity ===
                            "Please enter greater value than previous minimum quantity."
                              ? "relative !important"
                              : "absolute",
                        }}
                      >
                        <CommonErrorMessage
                          message={formik?.errors?.order_quantity}
                        />
                      </Box>
                    ) : formik.errors?.order_quantity &&
                      data?.min == "" &&
                      !minError ? (
                      <Box className="error-message-container">
                        <CommonErrorMessage
                          message={formik?.errors?.order_quantity}
                        />
                      </Box>
                    ) : maxError ? (
                      <div className="error-message-container">
                        <CommonErrorMessage message=" Max Characters Limit Reached!" />
                      </div>
                    ) : null}
                  </PriceOrderValueColmn>
                </SymbolForQtyBox1>
              </PriceOrderColInn>
            </PriceOrderCol>
          </Grid>
          <Grid item xs={12} sm={12} md={4.7} lg={4.7} xl={4.7}>
            <PriceOrderCol sx={{ height: "100%" }}>
              <PriceOrderColInn>
                <PriceOrderColPerInn1>
                  <PriceOrderLabel1>
                    Price Per {unitValue?.view}{" "}
                    <span>
                      {" "}
                      <span>
                        <LightTooltip
                          arrow
                          disableInteractive
                          placement="top"
                          title="We strongly recommend adding the base price of your product. You can choose 
                   whether to display or hide this information. Additionally, you can set discount 
                   levels from the price settings, defining specific cases for each level of discount."
                        >
                          <img
                            src="/assets/helpIcon.svg"
                            style={{ height: "13px", width: "13px" }}
                            alt=""
                          />
                        </LightTooltip>
                      </span>
                    </span>
                  </PriceOrderLabel1>
                  <OrderQtiyLabel1>{currencyValue?.view}</OrderQtiyLabel1>
                </PriceOrderColPerInn1>
                <CurrencyCodeBox>
                  <CurrencyCodeBoxSecond>
                    <CurrencyCode sx={{ whiteSpace: "nowrap" }}>
                      {getCurrencyDetails(currencyValue?.view)?.countryCode} (
                      {getCurrencyDetails(currencyValue?.view)?.symbol})
                    </CurrencyCode>
                  </CurrencyCodeBoxSecond>
                  <PriceOrderValueColmn
                    sx={{ position: "relative", width: "100%" }}
                  >
                    <PricesTextFiledSecond
                      autoComplete="off"
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={data?.price}
                      onChange={(e) => {
                        setDecimalError(false);
                        setLimitError(false);
                        let { value } = e.target;
                        let characterLimit = 8;

                        value = value.replace(/[^0-9.]/g, "");
                        let regex = /^[0-9]*[.,]?[0-9]{0,3}$/;
                        const decimalIndex = value.indexOf(".");
                        if (decimalIndex !== -1) {
                          value =
                            value.substring(0, decimalIndex + 1) +
                            value
                              .substring(decimalIndex + 1)
                              .replace(/\./g, "");
                        }
                        if (regex.test(value)) {
                          let [beforeDecimal, afterDecimal] = value.split(".");

                          if (beforeDecimal.length > characterLimit) {
                            setLimitError(true);
                            return;
                          }

                          if (afterDecimal && afterDecimal.length > 2) {
                            setDecimalError(true);
                            return;
                          }

                          if (beforeDecimal.length > characterLimit) {
                            setLimitError(true);
                            return;
                          }

                          onChangeHandler("price", value, e);
                        }
                      }}
                      error={
                        formik.errors?.order_quantity &&
                        data?.price == "" &&
                        !minError
                          ? true
                          : limitError
                          ? true
                          : decimalError
                          ? true
                          : false
                      }
                    />
                    {formik.errors?.order_quantity &&
                    data?.price == "" &&
                    !minError ? (
                      <div className="error-message-container">
                        <CommonErrorMessage
                          message={formik?.errors?.order_quantity}
                        />
                      </div>
                    ) : limitError ? (
                      <div className="error-message-container">
                        <CommonErrorMessage message="Max Characters Limit Reached!" />
                      </div>
                    ) : decimalError ? (
                      <div className="error-message-container">
                        <CommonErrorMessage message="Max 2 digits allowed after the decimal point!" />
                      </div>
                    ) : null}
                    {index > 0 && (
                      <DeleteOutlineOutlinedIcon
                        className={poststyle.delete_icon}
                        style={{
                          cursor: "pointer",
                          color: "#D7282F",
                          backgroundColor: "#ffd1d3",
                          borderRadius: "100%",
                          fontSize: "24px",
                          padding: "4px",
                          position: "absolute",
                          zIndex: "2",
                          // top: "42%",
                          top: "24px",
                          transform: "translate(-50%, -50%)",
                          right: "-22px",
                        }}
                        onClick={() => deleteSection(index)}
                      />
                    )}
                  </PriceOrderValueColmn>
                </CurrencyCodeBox>
              </PriceOrderColInn>
            </PriceOrderCol>
          </Grid>
          <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3}>
            <Typography sx={{ visibility: "hidden" }}>Button data</Typography>
            <Typography sx={{ visibility: "hidden" }}>Button data</Typography>
            <PricesmainBox>
              {index == order_quantity.length - 1 &&
                order_quantity.length != 5 && (
                  <Box>
                    <LightTooltip
                      title={
                        isButtonDisabled
                          ? "Your upper range should be greater than previous upper range."
                          : "Add more range to give discounts upon the increased quantity."
                      }
                      placement="top"
                      arrow
                      disableInteractive
                    >
                      <AddMoreRangeBtn
                        sx={{
                          minWidth: "max-content",
                          "&.Mui-disabled": {
                            pointerEvents: "unset",
                            border: "0 !important",
                            "&:hover": { background: "transparent" },
                          },
                        }}
                        variant="outlined"
                        startIcon={<AddRoundedIcon   sx={{ color: isButtonDisabled ? "grey !important" : "inherit !important" }} />}
                        endIcon={
                          <InfoOutlinedIcon
                            sx={{ color: isButtonDisabled ? "grey !important" : "green !important" }}
                          />
                        }
                        disabled={isButtonDisabled}
                        onClick={() => {
                          if (
                            data?.min == "" ||
                            data?.price == "" ||
                            minError
                          ) {
                            setEmptyError(true);
                            return;
                          }
                          setEmptyError(false);
                          addMoreSection();
                        }}
                      >
                        Add More{" "}
                      </AddMoreRangeBtn>
                    </LightTooltip>
                  </Box>
                )}
            </PricesmainBox>
            <ErrormessBox>
              {emptyError && <p>Please enter value.</p>}
            </ErrormessBox>
          </Grid>
        </Grid>
      </PricingOrderQtyy>

      {/* old code ========================================================= starts here*/}

      {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                name="min"
                size="small"
                value={data?.min}
                onChange={(e) => {
                  if (e.target.value.length < 5) {
                    onChangeHandler("min", e.target.value, e);
                  }
                }}
                label={
                  <div>
                    <span
                      style={{
                        // display: "inline-block",
                        // fontSize: "16px",
                        paddingRight: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.4px",
                        color: "#1C1C1C",
                        fontFamily: "open sans",
                      }}
                    >
                      Min
                    </span>
                    <LightTooltip placement={"top"} title="Required!" arrow>
                      <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                        *
                      </span>
                    </LightTooltip>
                  </div>
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  autoComplete: "off",
                }}
                error={showError("min")}
                helperText={formik?.errors?.order_quantity?.[index]?.min}
              ></TextField>
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={12} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                value={data?.max}
                size="small"
                onChange={(e) => {
                  if (e.target.value.length < 5) {
                    onChangeHandler("max", e.target.value, e);
                  }
                }}
                name="max"
                label={
                  <div>
                    <span
                      style={{
                        // display: "inline-block",
                        // fontSize: "16px",
                        paddingRight: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.4px",
                        color: "#1C1C1C",
                        fontFamily: "open sans",
                      }}
                    >
                      Max
                    </span>
                    <LightTooltip placement={"top"} title="Required!" arrow>
                      <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                        *
                      </span>
                    </LightTooltip>
                  </div>
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  autoComplete: "off",
                }}
                error={showError("max")}
                helperText={formik?.errors?.order_quantity?.[index]?.max}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ position: "relative" }}>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                name={"per_unit"}
                size="small"
                fullWidth
                value={data?.per_unit}
                onChange={(e) => {
                  if (e.target.value.length < 9) {
                    onChangeHandler("per_unit", e.target.value, e);
                  }
                }}
                label={
                  <div>
                    <span
                      style={{
                        // display: "inline-block",
                        // fontSize: "16px",
                        paddingRight: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.4px",
                        color: "#1C1C1C",
                        fontFamily: "open sans",
                      }}
                    >
                      Price Per Unit
                    </span>
                    <LightTooltip placement={"top"} title="Required!" arrow>
                      <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                        *
                      </span>
                    </LightTooltip>
                  </div>
                }
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  autoComplete: "off",
                }}
                error={showError("per_unit")}
                helperText={formik?.errors?.order_quantity?.[index]?.per_unit}
              ></TextField>
            </FormControl>
            {index > 0 && (
              <DeleteOutlineOutlinedIcon
                className={poststyle.delete_icon}
                style={{
                  cursor: "pointer",
                  color: "#D7282F",
                  backgroundColor: "#ffd1d3",
                  borderRadius: "100%",
                  fontSize: "24px",
                  padding: "4px",
                  position: "absolute",
                  zIndex: "2",
                  top: "50%",
                  transform: "translate(0, -21%)",
                  right: "-12px",
                }}
                onClick={() => addMoreSection(index)}
              />
            )}
            {index === 0 && (
              <DeleteOutlineOutlinedIcon
                className={poststyle.hidden_icon}
                style={{
                  cursor: "pointer",
                  color: "#D7282F",
                  backgroundColor: "#ffd1d3",
                  borderRadius: "100%",
                  fontSize: "28px",
                  padding: "4px",
                  position: "absolute",
                  zIndex: "2",
                  top: "50%",
                  transform: "translate(0, -30%)",
                  right: "-14px",
                }}
                onClick={() => addMoreSection(index)}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <div className={poststyle.commercial_txt}>
              {Object.values(data).length > 0 && (
                <p>
                  Price per {units} for total order quantity greater than{" "}
                  <strong style={{ color: "#202020" }}>{data.min}</strong> and
                  less than{" "}
                  <strong style={{ color: "#202020" }}>{data.max}</strong> is{" "}
                  <strong style={{ color: "#202020" }}> {data.per_unit} </strong>
                  {currency}
                </p>
              )}
            </div>
          </Grid>
        </Grid> */}
    </div>
  );
};

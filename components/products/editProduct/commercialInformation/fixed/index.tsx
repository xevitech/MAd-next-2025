import { EditableTextField } from "@/components/products/common/editableTextField";
import { SelectableTextField } from "@/components/products/common/selectableTextField";
import {
  FormControl,
  Tooltip,
  Autocomplete,
  TextField,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import useProductContext from "@/hooks/useProductContext";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
} from "../../productInformation/productAvailability/byOrder/styles";
import CustomAutocompelete from "@/components/products/common/autoCompelete";
import {
  useStyles,
  PriceToggle,
} from "@/components/products/editProduct/commercialInformation/styles";
import {
  FirstletterCapital,
  apiClient,
  productScoreValues,
} from "@/components/common/common";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AddUnitField from "../AddUnitField";
import { Router, useRouter } from "next/router";
import EditProductFormik from "@/hooks/useEditProductFormik";
import { useSelector } from "react-redux";
import HidePriceOptions from "../HidePriceOptions";

export const FixedPricing = ({
  formik,
  availability,
  commercialUnitList,
  setCommercialUnitList,
  HandlePercentage,
  productDetail,
  accordionValue,
}) => {
  const { classes } = useStyles();
  const [componentSourceToggle, setComponentSourceToggle] = useState<any>(0);
  // const {
  //   commercialInfoPaymentTerms,
  //   commercialInfoCurrencies,
  //   handleCommercialInfoFixedPricingPrice,
  // } = useProductContext();

  const { handleCommercialInfoFixedPricingPrice } = EditProductFormik();

  const { commercialInfoPaymentTerms, commercialInfoCurrencies } = useSelector(
    (state: any) => state.editProduct
  );
  const currency_id = productDetail?.currency_id
    ? productDetail?.currency_id
    : JSON.parse(localStorage.getItem("productCurrency")) ?? 1;
  const {
    price_term,
    unit,
    unit_price,
    // currency_id,
    hide_price,
    negotiable_price,
    quantity_available,
    minimum_order,
  } = formik.values;
  let unitList = commercialUnitList?.map((v) => ({
    ...v,
    view: FirstletterCapital(v.view),
  }));
  const router = useRouter();

  useEffect(() => {
    formik.setFieldValue(
      "negotiable_price",
      componentSourceToggle == true ? 1 : 0
    );
  }, [componentSourceToggle]);

  useEffect(() => {
    setComponentSourceToggle(negotiable_price == "1" ? true : false);
  }, []);

  useEffect(() => {
    if (productDetail?.unit_price) {
      formik.setFieldValue("unit_price", productDetail?.unit_price);
    }
  }, [productDetail?.unit_price]);

  const [latestUnitValue, setLatestUnitValue] = useState<any>("");

  useEffect(() => {
    if (latestUnitValue == "") {
      return;
    }
    const findUnit = commercialUnitList?.find(
      (value) => value.view.toLowerCase() == latestUnitValue.toLowerCase()
    );
    if (findUnit?.value) {
      formik.setFieldValue("unit", findUnit?.value);
      formik.setFieldError("unit", "");
    }
  }, [commercialUnitList, latestUnitValue]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={availability === "in_stock" ? 5 : 2.5}
            xl={availability === "in_stock" ? 5 : 2.5}
          >
            <FormControl sx={{ width: "100%" }}>
              <div style={{}}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                    marginTop: "16px",
                    "@media screen and (max-width:600px)": {
                      flexDirection: "column",
                    },
                  }}
                >
                  {availability == "in_stock" && (
                    <FormControl sx={{ width: "100%" }}>
                      <EditableTextField
                        labelToolTipText="Enter the exact number of units currently available in your inventory. This helps 
                          buyers gauge availability and plan their purchases accordingly. Please keep 
                          updating regularly."
                        numberOnly={true}
                        characterLimit={4}
                        required={true}
                        label="Quantity Available"
                        placeholder="Enter Quantity"
                        name="quantity_available"
                        value={quantity_available}
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
                  )}

                  <FormControl sx={{ width: "100%" }}>
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
                        if (
                          e.target.value === "" ||
                          regex.test(e.target.value)
                        ) {
                          formik.setFieldValue("minimum_order", e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </Box>
              </div>
            </FormControl>
          </Grid>
        </Grid>

        <Box
          sx={{
            margin: "12px 0 0 0",
            border: "1px solid #ddd",
            padding: "8px 16px 16px 16px",
            borderRadius: "6px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", color: "#000" }}
              >
                Price Details
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  "& .MuiToggleButtonGroup-root": {
                    height: "22px",
                    "& .MuiButtonBase-root": {
                      fontSize: "10px",
                    },
                  },
                }}
              >
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
              </Box>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={2.4} xl={2.4}>
              <FormControl sx={{ width: "100%" }}>
                <div style={{}}>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <FormControl sx={{ width: "100%", position: "relative" }}>
                      <CustomAutocompelete
                        labelToolTipText="Ensure consistency with industry standards and buyer expectations."
                        required={true}
                        placeholder="Measurement Unit"
                        formik={formik}
                        label="Measurement Unit"
                        name="unit"
                        size="small"
                        options={unitList}
                        value={unit}
                        handleChange={(value) => {
                          formik.setFieldError("unit", "");
                          formik.setFieldValue("unit", value);
                        }}
                        initialValue={unitList?.find(
                          (v) => v.value == `${unit}`
                        )}
                      />
                      <AddUnitField
                        accordionValue={accordionValue}
                        commercialUnitList={commercialUnitList}
                        setCommercialUnitList={setCommercialUnitList}
                        setValue={(e) => {
                          setLatestUnitValue(e);
                        }}
                      />
                    </FormControl>
                  </div>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2.4} xl={2.4}>
              {/* <FormControl
              sx={{
                width: "100%",
                marginTop: "16px",
                // marginLeft: "30px",
              }}
            >
              <CustomAutocompelete
                labelToolTipText="Choose from standard Incoterms (e.g., FOB, CIF, DDP)"
                placeholder="Price Term"
                required={true}
                formik={formik}
                label="Price Term"
                options={commercialInfoPaymentTerms}
                name="price_term"
                value={price_term}
                size="small"
                handleChange={(value) => {
                  formik.setFieldError("price_term", "");
                  formik.setFieldValue("price_term", value);
                }}
                initialValue={commercialInfoPaymentTerms?.find(
                  (v) => v.value == `${price_term}`
                )}
              />
            </FormControl> */}
              <FormControl
                sx={{
                  width: "100%",
                  marginTop: "16px",
                  position: "relative",
                }}
              >
                {/* <PriceToggle>
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
                </PriceToggle> */}
                <EditableTextField
                  labelToolTipText="We strongly recommend adding the base price of your product. You can choose 
                   whether to display or hide this information. Additionally, you can set discount 
                   levels from the price settings, defining specific cases for each level of discount."
                  numberOnly={true}
                  characterLimit={8}
                  required={true}
                  label="Price"
                  placeholder="Enter Price"
                  name="unit_price"
                  value={unit_price}
                  size="small"
                  formik={formik}
                  handleChange={handleCommercialInfoFixedPricingPrice}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7.2} xl={7.2}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4}> */}
                {/* <FormControl sx={{ width: "100%", marginTop: "16px" }}>
                    <EditableTextField
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
                      size="small"
                      formik={formik}
                    />
                  </FormControl> */}
                {/* </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={8} xl={5}>
                  <FormControl
                    sx={{
                      width: "100%",
                      marginTop: "16px",
                    }}
                  >
                    <Autocomplete
                      onInputChange={(e: any) => {}}
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
                        formik.setFieldError("price_term", "");
                        // if (value.length > 6) {
                        //   formik.setFieldError(
                        //     "price_term",
                        //     "Only 6 selection is allowed!"
                        //   );
                        //   return;
                        // }
                        formik.setFieldValue("price_term", value);
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
                                  disableInteractive
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
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Box
                    mt={2}
                    display="flex"
                    alignItems="center"
                    style={{ gap: "16px" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#231f20",
                      }}
                    >
                      Negotiable Price{" "}
                    </Typography>
                    <ToggleButtonGroup
                      className={classes.toggleBtn}
                      color="primary"
                      size="small"
                      exclusive
                      aria-label="Platform"
                      style={{ height: "25px", position: "relative" }}
                      value={+negotiable_price}
                    >
                      <ToggleButton
                        value={1}
                        onClick={(e) =>
                          formik.setFieldValue("negotiable_price", 1)
                        }
                      >
                        Yes
                      </ToggleButton>
                      <ToggleButton
                        value={0}
                        onClick={(e) =>
                          formik.setFieldValue("negotiable_price", 0)
                        }
                      >
                        No
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                Choose an initial price and then fine-tune your discounts based
                on buyer behavior and seasonal trend and many more from
                <span
                  onClick={(e) => router.push("/pricesettings")}
                  style={{
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "#d7282f",
                  }}
                >
                  {" "}
                  Price setting.
                </span>
              </Typography>
              {((formik?.value?.quantity_status == 0 &&
                formik?.values?.price_type === "quantity") ||
                (formik?.values?.price_type === "fixed" &&
                  hide_price == 0)) && <HidePriceOptions formik={formik} />}
              {/* <FormGroup> */}
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "20px",
                      },
                      "&.Mui-checked": {
                        color: "#d7282f",
                      },
                    }}
                    checked={componentSourceToggle}
                    onChange={(e) => {
                      setComponentSourceToggle(e.target.checked);
                      // formik.setFieldValue("negotiable_price", 1)
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#1c1c1c",
                      fontWeight: "400",
                    }}
                  >
                    The final price of this product will be subject to
                    negotiation and mutual agreement.
                  </Typography>
                }
              />
              {/* </FormGroup> */}
            </Grid>
          </Grid>
        </Box>
      </div>
      {/* {availability == "in_stock" && (
        <>
          <ContentDescription
            style={{
              paddingTop: "16px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgb(187, 187, 187)",
              margin: "16px 0 0 0",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box sx={{ height: "100%" }}>
                  <Box>
                    <ContentDescriptionHeader>
                      Order Preparation Time
                      <span>
                        <LightTooltip placement={"top"} title="Required!" arrow>
                          <span
                            style={{
                              color: "#D7282F",
                              paddingRight: "5px",
                              paddingLeft: "5px",
                              // fontFamily:"open sans"
                            }}
                          >
                            *
                          </span>
                        </LightTooltip>
                      </span>
                      <span>
                        <LightTooltip
                          placement={"top"}
                          title="Inventory/Warehouse products are dispatched usually in <7 days"
                          arrow
                        >
                          <div
                            style={{
                              width: "14px",
                              height: "14px",
                              display: "inline-block",
                              position: "relative",
                            }}
                          >
                            <Image
                              alt="help-img"
                              src={"/assets/helpIcon.svg"}
                              layout="fill"
                            />{" "}
                          </div>
                        </LightTooltip>
                      </span>
                    </ContentDescriptionHeader>
                    <ContentDescriptionText style={{ marginBottom: "10px" }}>
                      Duration in which the product can be dispatched to the
                      nearest seaport/airport.
                    </ContentDescriptionText>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <EditableTextField
                          placeholder="Enter Number"
                          numberOnly={true}
                          label="Value"
                          name="dispatch_in"
                          required={true}
                          size="small"
                          value={dispatch_in}
                          formik={formik}
                        ></EditableTextField>
                      </FormControl>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <CustomAutocompelete
                          placeholder="Period"
                          required={true}
                          formik={formik}
                          label="Period"
                          options={shippedInVariables}
                          name="dispatch_day"
                          size="small"
                          value={dispatch_day}
                          handleChange={(value) => {
                            formik.setFieldValue("dispatch_day", value);
                            formik.setFieldError("dispatch_day", "");
                          }}
                          initialValue={shippedInVariables?.find(
                            (v) => v.value == `${dispatch_day}`
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box>
                    <p
                      style={{
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "24px",
                        letterSpacing: "0.09px",
                        color: "#414141",
                      }}
                    >
                      Generally {"<7"} days for products in warehouse or
                      inventory
                    </p>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box sx={{ height: "100%" }}>
                  <Box>
                    <ContentDescriptionHeader>
                      Delivery Time Period
                      <span>
                        <LightTooltip placement={"top"} title="Required!" arrow>
                          <span
                            style={{
                              color: "#D7282F",
                              paddingRight: "5px",
                              paddingLeft: "5px",
                            }}
                          >
                            *
                          </span>
                        </LightTooltip>
                      </span>
                      <span>
                        <LightTooltip
                          placement={"top"}
                          title="Provide realistic and accurate timeframe"
                          arrow
                        >
                          <div
                            style={{
                              width: "14px",
                              height: "14px",
                              display: "inline-block",
                              position: "relative",
                            }}
                          >
                            <Image
                              alt="help-img"
                              src={"/assets/helpIcon.svg"}
                              layout="fill"
                            />{" "}
                          </div>
                        </LightTooltip>
                      </span>
                    </ContentDescriptionHeader>
                    <ContentDescriptionText
                      sx={{
                        marginBottom: "10px",
                        "@media only screen and (min-width:900px) and (max-width:1254px)":
                          { minHeight: "48px" },
                      }}
                    >
                      Expected time frame for delivery after order confirmation
                    </ContentDescriptionText>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <EditableTextField
                          placeholder="Enter Number"
                          numberOnly={true}
                          label="Value"
                          name="delivery_time_value"
                          required={true}
                          size="small"
                          value={delivery_time_value}
                          formik={formik}
                        ></EditableTextField>
                      </FormControl>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} xs={12}>
                      <FormControl sx={{ width: "100%" }}>
                        <CustomAutocompelete
                          placeholder="Period"
                          required={true}
                          formik={formik}
                          label="Period"
                          options={shippedInVariables}
                          name="delivery_time_period"
                          size="small"
                          value={delivery_time_period}
                          handleChange={(value) => {
                            formik.setFieldValue("delivery_time_period", value);
                            formik.setFieldError("delivery_time_period", "");
                          }}
                          initialValue={shippedInVariables?.find(
                            (v) => v.value == `${delivery_time_period}`
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </ContentDescription>
        </>
      )} */}
    </div>
  );
};

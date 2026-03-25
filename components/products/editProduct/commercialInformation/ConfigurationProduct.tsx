// import useProductContext from "@/hooks/useProductContext";
import {
  FormControl,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import React from "react";
import CustomAutocompelete from "../../common/autoCompelete";

import { EditableTextField } from "../../common/editableTextField";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
} from "../styles";
import Image from "next/image";
import EditProductFormik from "@/hooks/useEditProductFormik";

function ConfigurationProduct({ formik, availability }) {
  // const { shippedInVariables } = useProductContext();
  const {shippedInVariables} = EditProductFormik();
  const { dispatch_in, dispatch_day } = formik.values;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <FormControl
              sx={{
                width: "100%",
                marginTop: "16px",
              }}
            >
              <CustomAutocompelete
                labelToolTipText=""
                placeholder="Price Term"
                required={true}
                formik={formik}
                label="Price Terms"
                options={commercialInfoPaymentTerms}
                name="price_term"
                size="small"
                value={price_term}
                handleChange={(value) => {
                  formik.setFieldError("price_term", "");
                  formik.setFieldValue("price_term", value);
                }}
                initialValue={commercialInfoPaymentTerms?.find(
                  (v) => v.value == `${price_term}`
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormControl sx={{ width: "100%", marginTop: "16px" }}>
                  <CustomAutocompelete
                    placeholder="Currency"
                    required={true}
                    formik={formik}
                    label="Currency"
                    name="currency_id"
                    size="small"
                    options={commercialInfoCurrencies}
                    value={currency_id}
                    handleChange={(value) => {
                      formik.setFieldError("currency_id", "");
                      formik.setFieldValue("currency_id", value);
                    }}
                    initialValue={commercialInfoCurrencies?.find(
                      (v) => v.value == `${currency_id}`
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
      </div>
      {availability == "in_stock" && (
        <>
          <ContentDescription
            style={{
              paddingTop: "16px",
              paddingBottom: "16px",
              borderBottom: "1px solid rgb(187, 187, 187)",
            }}
          >
            <ContentDescriptionHeader>
              Order Preparation Time 
              <span>
                <Tooltip placement={"top"} title="Required!" arrow>
                  <span
                    style={{
                      color: "#D7282F",
                      paddingRight: "5px",
                      paddingLeft: "5px",
                    }}
                  >
                    *
                  </span>
                </Tooltip>
              </span>
              <span>
                <Tooltip
                  placement={"top"}
                  title="Inventory/Warehouse products are dispatched usually in <7 days."
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
                </Tooltip>
              </span>
            </ContentDescriptionHeader>
            <ContentDescriptionText style={{ marginBottom: "10px" }}>
              Duration in which the product can be dispatched to the nearest
              seaport/airport.
            </ContentDescriptionText>

            <Grid container spacing={2}>
              <Grid item xl={3} lg={6} md={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <EditableTextField
                    placeholder="Enter Number"
                    numberOnly={true}
                    label="Value"
                    name="dispatch_in"
                    required={true}
                    value={dispatch_in}
                    formik={formik}
                    size="small"
                  ></EditableTextField>
                </FormControl>
              </Grid>
              <Grid item xl={3} lg={6} md={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <CustomAutocompelete
                    placeholder="Period"
                    required={true}
                    formik={formik}
                    label="Period"
                    size="small"
                    options={shippedInVariables}
                    name="dispatch_day"
                    value={dispatch_day}
                    handleChange={(value) => {
                      formik.setFieldError("dispatch_day", "");
                      formik.setFieldValue("dispatch_day", value);
                    }}
                    initialValue={shippedInVariables?.find(
                      (v) => v.value == `${dispatch_day}`
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={6} lg={6} md={12} xs={12}>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "24px",
                    marginTop: "6px",
                    letterSpacing: "0.09px",
                    color: "#414141",
                  }}
                >
                  Generally {"<7"} days for products in warehouse or inventory
                </p>
              </Grid>
            </Grid>
          </ContentDescription>
        </>
      )}
    </div>
  );
}

export default ConfigurationProduct;

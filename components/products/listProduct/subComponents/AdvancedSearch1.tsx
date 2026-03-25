import {
    Divider,
    FormControl,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { SimpleSelect } from "../../common/simpleSelect";
  import { CustomDatePicker } from "@/components/common/datePicker";
  import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
  import {
    priceTypeOptions,
    productTypeOptions,
    availabilityOptions,
  } from "@/utils/AddProductPageSelectDropdownsData";
  import {
    comparisonOptions,
    productStatusOptions,
  } from "@/utils/dropdownOptions";
  import { TextFieldAndDropdown } from "@/components/common/textFieldAndDropdown";
  import {
    BtnFilled,
    BtnOutlined,
  } from "@/components/common/buttons/ButtonsVariations";
  import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
  import Box from "@mui/material/Box";
  import Autocomplete from "@mui/material/Autocomplete";
  import { SearchContainer } from "../styles";
  import Container from "@mui/material/Container";
  import { useFormik } from "formik";
  import { ThreeDots } from "react-loader-spinner";
  import moment from "moment";
  
  export const AdvancedSearch1 = ({
    parentCategories,
    handleClose,
    getProductsList,
    setSearchValue,
    productStatus
  }: any) => {
    const [loader, setLoader] = useState<boolean>(false);
    console.log(productStatus)
  // console.log("valuee",valuee)
    const handleChange = (event: any) => {
      const { name, value } = event.target;
      formik.setFieldValue(name, value);
    };
    let searchedValue = sessionStorage?.filterProduct
      ? JSON.parse(sessionStorage?.filterProduct)
      : {};
  
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        availability: searchedValue?.availability ?? "",
        productCategory: searchedValue?.productCategory ?? {
          view: "",
          value: "",
        },
        productStatus: searchedValue?.productStatus ?? "",
        created_at: searchedValue?.created_at ?? "",
        updated_at: searchedValue?.updated_at ?? "",
        country: searchedValue?.country ?? "",
        priceType: searchedValue?.priceType ?? "",
        productType: searchedValue?.productType ?? "",
        rfq: searchedValue?.rfq ?? "",
        total_message: searchedValue?.total_message ?? "",
        // numMessages: searchedValue?.numMessages ?? "",
        messagesOperator: searchedValue?.messagesOperator ?? "",
        numViews: searchedValue?.numViews ?? "",
        viewsOperator: searchedValue?.viewsOperator ?? "",
        rfqOperator: searchedValue?.rfqOperator ?? "",
      },
      onSubmit: async (value) => {
        setLoader(true);
        handleClose();
        console.log("values",value)
        const uploadPayload = [
          {
            key: "availability",
            value: value?.availability,
          },
          {
            key: "category_id",
            value: value?.productCategory?.value?.toString(),
          },
          { key: "published", value: value?.productStatus },
          { key: "created_at", value: value?.created_at },
          { key: "updated_at", value: value?.updated_at },
          { key: "country_id", value: value?.country },
          { key: "price_type", value: value?.priceType },
          { key: "product_type", value: value?.productType },
          { key: "no_of_views", value: value?.numViews },
          { key: "no_views", value: value?.viewsOperator },
          // { key: "web_review_count", value: value?.viewsOperator },
          { key: "no_of_messsage", value: value?.total_message },
          { key: "no_message", value: value?.messagesOperator },
          { key: "total_message", value: value?.total_message },
          { key: "rfq", value: value?.rfq },
          { key: "no_of_operators", value: value?.rfqOperator },
          { key: "", value: "" },
          {key : "type", value: productStatus.split('=')[1]}
        //   productStatus && productStatus !== "place_holder_type=no"
        //   ? { key: "type", value: productStatus.split('=')[1] } // Accessing the RHS part
        //   : { key: "published", value: value?.productStatus },
        ];
        sessionStorage.setItem("filterProduct", JSON.stringify(value));
        setSearchValue(value);
        console.log("payload",uploadPayload)
        await getProductsList(["place_holder_type=no", uploadPayload]);
        setLoader(false);
      },
    });
  
    // const onResetHandler = () => {
    //   formik.setFieldValue("availability", "");
    //   formik.setFieldValue("productCategory", {
    //     view: "",
    //     value: "",
    //   });
    //   formik.setFieldValue("productStatus", "");
    //   formik.setFieldValue("created_at", "");
    //   formik.setFieldValue("updated_at", "");
    //   formik.setFieldValue("country", "");
    //   formik.setFieldValue("priceType", "");
    //   formik.setFieldValue("productType", "");
    //   formik.setFieldValue("rfq", "");
    //   formik.setFieldValue("numMessages", "");
    //   formik.setFieldValue("total_message", "");
    //   formik.setFieldValue("messagesOperator", "");
    //   formik.setFieldValue("numViews", "");
    //   formik.setFieldValue("viewsOperator", "");
    //   formik.setFieldValue("rfqOperator", "");
    //   formik.resetForm();
    //   sessionStorage.removeItem("filterProduct");
    // };
    const onResetHandler = () => {
      formik.resetForm(); // Resets all fields to their initial values
      sessionStorage.removeItem("filterProduct"); // Clears the filterProduct from session storage
    };
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <Container className="FilterContainer">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px",
                paddingTop: "16px",
                alignItems: "center",
              }}
            >
              <Typography
                component="span"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  fontFamily: "open sans",
                }}
              >
                Filters
              </Typography>
              <ClearOutlinedIcon
                style={{
                  color: "#D7282FD9",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={() => {
                  handleClose();
                }}
              />
            </div>
            <Divider style={{ marginBottom: "16px" }} />
            <SearchContainer>
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SimpleSelect
                    value={formik?.values?.availability}
                    name={"availability"}
                    placeholder={"Product Availability"}
                    options={availabilityOptions}
                    handleChange={handleChange}
                    error={false}
                    overlay={true}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <Autocomplete
                    size="small"
                    disableClearable={true}
                    id="category-list-autocomplete"
                    options={parentCategories}
                    getOptionLabel={(option) => option?.view}
                    onChange={(event: any, newValue: any) => {
                      event.stopPropagation();
                      formik.setFieldValue("productCategory", newValue);
                    }}
                    value={formik.values.productCategory}
                    defaultValue={formik.values.productCategory}
                    slotProps={{
                      popper: {
                        sx: {
                          zIndex: 98
                        }
                      }
                    }}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option.view}
                      </Box>
                    )}
                    renderInput={(params) => {
                      return <TextField label={`Product Category`} {...params} />;
                    }}
                  />
                </Grid>
  
  
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SimpleSelect
                    error={false}
                    value={formik?.values?.productStatus}
                    name={"productStatus"}
                    handleChange={handleChange}
                    options={productStatusOptions}
                    placeholder="Product Status"
                  />
                </Grid>
  
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <CustomDatePicker
                      error={false}
                      name="created_at"
                      label="Created on"
                      value={formik?.values?.created_at || "0000-00-00"}
                      handleChange={handleChange}
                      max_date={moment(new Date())}
                    />
                  </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <FormControl fullWidth>
                    <CustomDatePicker
                      error={false}
                      name="updated_at"
                      label="Last Updated"
                      value={formik?.values?.updated_at || "0000-00-00"}
                      handleChange={handleChange}
                      max_date={moment(new Date())}
                    />
                  </FormControl>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <SimpleSelect
                    error={false}
                    value={formik?.values?.priceType}
                    handleChange={handleChange}
                    options={priceTypeOptions}
                    placeholder="Price Type"
                    name="priceType"
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} >
                  <SimpleSelect
                    error={false}
                    value={formik?.values?.productType}
                    options={productTypeOptions}
                    name="productType"
                    placeholder="Product Type"
                    handleChange={handleChange}
                    
                    
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <TextFieldAndDropdown
                    dropdownOptions={comparisonOptions}
                    textFieldName={"rfq"}
                    dropdownName={"rfqOperator"}
                    textFieldLabel={"RFQ"}
                    dropdownLabel={"Range"}
                    handleChange={handleChange}
                    dropdownValue={formik?.values?.rfqOperator}
                    textFieldValue={formik?.values?.rfq}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <TextFieldAndDropdown
                    dropdownOptions={comparisonOptions}
                    textFieldName={"numViews"}
                    dropdownName={"viewsOperator"}
                    textFieldLabel={"No. of Views"}
                    dropdownLabel={"Range"}
                    handleChange={handleChange}
                    dropdownValue={formik?.values?.viewsOperator}
                    textFieldValue={formik?.values?.numViews}
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                  <TextFieldAndDropdown
                    handleChange={handleChange}
                    textFieldName={"total_message"}
                    dropdownName={"messagesOperator"}
                    dropdownOptions={comparisonOptions}
                    textFieldLabel={"No. of Messages"}
                    dropdownLabel={"Range"}
                    dropdownValue={formik?.values?.messagesOperator}
                    textFieldValue={formik?.values?.total_message}
                  />
                </Grid>
              </Grid>
            </SearchContainer>
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <BtnFilled type="submit" disabled={loader}>
                    {loader ? (
                      <ThreeDots
                        height="40"
                        width="40"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      "Search"
                    )}
                  </BtnFilled>
                  <BtnOutlined
                    onClick={() => {
                      onResetHandler();
                    }}
                  >
                    <RefreshOutlinedIcon />
                    Reset
                  </BtnOutlined>
                </div>
              </Grid>
            </Grid>
          </Container>
        </form>
      </>
    );
  };
  
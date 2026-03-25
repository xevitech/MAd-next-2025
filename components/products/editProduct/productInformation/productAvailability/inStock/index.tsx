import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { EditableTextField } from "@/components/products/common/editableTextField";
import poststyle from "components/products/editProduct/style.module.css";
import { SelectableTextField } from "@/components/products/common/selectableTextField";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useAppContext from "@/hooks/useAppContext";

import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
  useStyles,
} from "./styles";
// import useProductContext from "@/hooks/useProductContext";
import { CustomButton } from "@/components/guestLayout/landingPage/styles";
import CustomAutocompelete from "@/components/products/common/autoCompelete";
import { ThreeDots } from "react-loader-spinner";
import {
  BrandList,
  apiClient,
  productScoreValues,
} from "@/components/common/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import Swal from "sweetalert2";
import EditProductFormik from "@/hooks/useEditProductFormik";
import {
  ManufacturingYears,
  postValidityOptions,
} from "@/utils/AddProductPageSelectDropdownsData";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  setShowByOrderAddBrand,
  setShowInstockAddBrand,
} from "@/hooks/ProductReducers";
export const InStock = ({
  setSpecificationBlock,
  accordionValue,
  availability,
  HandlePercentage,
  setCompletedFields,
  setPublished,
  setAccordianValue,
  FetchProductDetail,
  percentage,
  categoryIds,
}) => {
  const dispatch = useAppDispatch();
  const { formik, AddInStockBrand, getBrands } = EditProductFormik();

  const { breakPoints } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [customBrand, setCustomBrand] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [tooltiptext, setTooltiptext] = useState<string>("");
  const { query }: any = useRouter();
  const productId: string = query.Id;

  const { brandsData, showInStockAddBrand, productDetail } = useSelector(
    (state: any) => state.editProduct
  );
  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (accordionValue != "information") {
      dispatch(setShowInstockAddBrand(false));
    }
  }, [accordionValue]);

  useEffect(() => {
    if (tooltiptext == "" && productDetail?.condition) {
      let toolText = BrandList.find((v) => v.name == productDetail?.condition);
      setTooltiptext(toolText.seller);
    }
  }, [productDetail?.condition]);
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const validation = Yup.object().shape({
    validity: Yup.string().required("Please select post validity"),
    condition: Yup.string().required("Please select product condition"),
    brand_id: Yup.string()
      .required("Please select product manufacturer/brand")
      .nullable(),
    manufacturer_year: Yup.string().required(
      "Please select manufacturing year"
    ),
    model_number: Yup.string().required("Please enter product model number"),
  });
  const localFormik: any = useFormik({
    validationSchema: validation,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      brand_id: productDetail?.brand_id !== 0 ? productDetail?.brand_id : "",
      condition: productDetail?.condition ?? "",
      validity: productDetail?.validity
        ? postValidityOptions?.find((v) => v.value == productDetail?.validity)
            ?.value ?? ""
        : "",
      manufacturer_year: productDetail?.manufacturer_year ?? "",
      model_number: productDetail?.model_number ?? "",
    },
    onSubmit: async (values) => {
      const regex = /^\d+$/;
      if (!regex.test(localFormik.values.brand_id)) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "custom-btn cancel-button",
            cancelButton: "custom-btn remove-btn",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
          title: "Error in brand saving!",
          text: "To add a new brand, click on the 'Add Brand' button.",
          icon: "error",
          showCancelButton: false,
          reverseButtons: true,
        });
        return;
      }

      setPublished("");
      const { model_number, brand_id, manufacturer_year, validity, condition } =
        values;
      let formData = new FormData();
      formData.append("availability", "in_stock");
      formData.append("last_update", "Product Information");
      formData.append("percentage", percentageValue);
      formData.append("id", productId);
      formData.append("brand_id", brand_id || "");
      formData.append("manufacturer_year", manufacturer_year || "");
      formData.append("validity", validity || "");
      formData.append("condition", condition || "");
      formData.append("model_number", model_number || "");
      formData.append("country_origin_cities", "");
      formData.append("country_origins", "");

      formData.append("published", "0");
      setButtonLoader(true);
      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response.status == 200) {
        setCompletedFields((prev) => ({ ...prev, information: true }));
        setSpecificationBlock({ disable: false, expanded: true });
        setAccordianValue("specification");
        FetchProductDetail();
      }
      setBrand("");
      setCustomBrand("");
      dispatch(setShowInstockAddBrand(false));
      setButtonLoader(false);
    },
  });
  const { validity, brand_id, manufacturer_year, model_number, condition } =
    localFormik.values;
  useEffect(() => {
    const { product_type } = formik.values;
    const {
      postValidity,
      manufacturerBrand,
      manufacturingYear,
      modelNumber,
      condition: conditionValue,
    } = productScoreValues?.productInformation?.inStock;

    if (product_type === "simple") {
      if (availability === "in_stock") {
        HandlePercentage(
          "product_information_stock_validity",
          validity ? postValidity : 0
        );
        HandlePercentage(
          "product_information_stock_brand_id",
          brand_id ? manufacturerBrand : 0
        );
        HandlePercentage(
          "product_information_stock_manufacturer_year",
          manufacturer_year ? manufacturingYear : 0
        );
        HandlePercentage(
          "product_information_stock_model_number",
          model_number ? modelNumber : 0
        );
        HandlePercentage(
          "product_information_stock_condition",
          condition ? conditionValue : 0
        );
      }
    }
    // else {
    //   HandlePercentage("brand_id", 0);
    //   HandlePercentage("model_number", 0);
    //   HandlePercentage("manufacturer_year", 0);
    //   HandlePercentage("product_information_order_validity", validity ? 3 : 0);
    //   HandlePercentage(
    //     "product_information_order_condition",
    //     conditionValue ? 3 : 0
    //   );
    // }
  }, [
    model_number,
    brand_id,
    manufacturer_year,
    validity,
    condition,
    availability,
  ]);

  useEffect(() => {
    if ((validity === "" || condition === "") && isMount) {
      setCompletedFields((prev) => ({ ...prev, information: false }));
      setIsMount(false);
    }
  }, [validity, condition, isMount]);

  useEffect(() => {
    if (productDetail?.condition && productDetail?.validity && !isMount) {
      setSpecificationBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, information: true }));
      setIsMount(true);
    }
  }, [productDetail]);

  useEffect(() => {
    if (availability === "by_order") {
      if (condition !== "") localFormik.setFieldValue("condition", "");
      if (validity !== "") localFormik.setFieldValue("validity", "");
      if (model_number !== "") localFormik.setFieldValue("model_number", "");
      if (manufacturer_year !== "")
        localFormik.setFieldValue("manufacturer_year", "");
    }
  }, [availability]);

  const { classes } = useStyles();
  useEffect(() => {
    if (customBrand) {
      try {
        let { value } = brandsData.find(
          (v) => v.view.toLowerCase() == customBrand.toLowerCase()
        );
        localFormik.setFieldValue("brand_id", value);
        setCustomBrand("");
      } catch (err) {}
    }
  }, [brandsData]);
  const onChangeHandler = (e) => {
    if (error) setError(false);
    if (errorText) setErrorText("");
    let regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(e.target.value)) {
      setCustomBrand(e.target.value);
      let id =
        brandsData?.find(
          (v) =>
            v.view.toLowerCase() == `${e.target.value.trim()}`.toLowerCase()
        )?.value ?? "";
      if (id) {
        setBrand(id);
        localFormik.setFieldValue("brand_id", id);
      }
    }
  };

  const onSubmitHandler = () => {
    if (customBrand === "") {
      setError(true);
      setErrorText("Please enter brand name");
      return;
    }

    AddInStockBrand1(
      customBrand,
      setLoading,
      setError,
      setErrorText,
      true,
      categoryIds
    );
    // localFormik.setFieldError("brand_id", "");
  };

  const ButtonCol = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "14px",
  });
  const AddInStockBrand1 = async (
    customBrand,
    setLoading = null,
    setError = null,
    setErrorText = null,
    addCategories = false,
    categoryList = ""
  ) => {
    const formData = new FormData();
    if (addCategories) {
      formData.append("categories", categoryList);
    }
    formData.append("name", customBrand.trim());
    setLoading(true);
    let response = await apiClient(
      "brands/createBrandbyCategory",
      "post",
      { body: formData },
      true
    );

    if (response.status === 200 && response?.message == "Create sucessfully") {
      getBrands();
      dispatch(setShowInstockAddBrand(false));
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "Success",
        text: "Brand successfully added. You will receive a notification after admin approval.",
        icon: "success",
        showCancelButton: false,
        reverseButtons: true,
      });
    } else if (
      response.status === 200 &&
      response?.message == "Already Exists"
    ) {
      // if (response.message) {
      setError(true);
      setErrorText("The name has already been taken.");
      // }
    }
    setLoading(false);
  };
  const [conditionNew, setCondition] = useState("");

  useEffect(() => {
    if (localFormik?.values?.condition) {
      setCondition(localFormik?.values?.condition);
    }
  }, [localFormik?.values?.condition, setCondition]);

  const handleConditionChange = (event) => {
    localFormik.setFieldError("condition", "");
    localFormik.setFieldValue("condition", event.target.value);
    const selectedBrand = BrandList.find(
      (brand) => brand.name === event.target.value
    );
    if (selectedBrand) {
      setTooltiptext(selectedBrand.seller);
    }
    setCondition(event.target.value);
  };
  const validOptions = brandsData.filter((item) => item.view.trim() !== "");
  return (
    <>
      <form onSubmit={localFormik.handleSubmit}>
        <div className={poststyle.instock_content}>
          <div className={poststyle.instock_content_inn}>
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <FormControl
                  sx={{ width: "100%" }}
                  className={poststyle.instock_input}
                >
                  <CustomAutocompelete
                    labelToolTipText="How long do you want your product listing to be visible? Choose a period relevant to your sales strategy and product availability."
                    placeholder="Validity"
                    formik={localFormik}
                    label="Post Validity"
                    required={true}
                    value={validity}
                    name={"validity"}
                    options={postValidityOptions}
                    size="small"
                    handleChange={(value) => {
                      localFormik.setFieldValue("validity", value);
                      localFormik.setFieldError("validity", "");
                    }}
                    initialValue={postValidityOptions?.find(
                      (v) => v.value === `${validity}`
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <FormControl
                  sx={{ width: "100%", position: "relative" }}
                  className={poststyle.instock_input}
                >
                  <CustomAutocompelete
                    labelToolTipText="Enter the exact brand name as it appears on your product. This helps buyers identify the product's origin and quality. If your product comes from different brands, make a new post for each brand to keep things clear."
                    placeholder="Brand"
                    required
                    formik={localFormik}
                    label="Manufacturer/Brand"
                    value={brand_id}
                    name="brand_id"
                    size="small"
                    options={validOptions}
                    handleChange={(value) => {
                      if (value) {
                        dispatch(setShowByOrderAddBrand(false));
                        setBrand("");
                        setCustomBrand("");
                      }
                      localFormik.setFieldValue("brand_id", value);
                      localFormik.setFieldError("brand_id", "");
                    }}
                    initialValue={validOptions?.find(
                      (v) => v.value == brand_id
                    )}
                  />
                  <span
                    className={poststyle.add_brand_txt}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setShowInstockAddBrand(!showInStockAddBrand));
                    }}
                  >
                    <span> + </span> Add Brand
                  </span>
                  {showInStockAddBrand && (
                    <span
                      // className={`${poststyle.add_brand_field} ${poststyle.add_brand_field1}`}
                      className={poststyle.add_brand_field1}
                    >
                      {/* className={`${subdomaincss.GreyButton} ${subdomaincss.mainbutton}`} */}
                      <TextField
                        value={customBrand}
                        onChange={onChangeHandler}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            onSubmitHandler();
                          }
                        }}
                        size="small"
                        placeholder="Enter Name"
                        error={error}
                        helperText={errorText}
                      ></TextField>
                      <BtnFilled
                        className={poststyle.add_btn}
                        onClick={onSubmitHandler}
                        style={
                          {
                            /*marginLeft: "16px"*/
                          }
                        }
                      >
                        {loading ? (
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
                          "Add"
                        )}
                      </BtnFilled>
                      <Button
                        className={poststyle.addbrand_cross}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCustomBrand("");
                          setError(false);
                          setErrorText("");
                          dispatch(setShowInstockAddBrand(false));
                        }}
                        color="error"
                      >
                        {" "}
                        <CloseOutlinedIcon
                          style={{ cursor: "pointer", fontSize: "18px" }}
                        />
                      </Button>
                    </span>
                  )}
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <FormControl
                  sx={{ width: "100%" }}
                  className={poststyle.instock_input}
                >
                  <CustomAutocompelete
                    labelToolTipText="Provide the specific year your product was manufactured. This helps buyers assess age, potential advancements, and compatibility with existing systems."
                    placeholder="Year"
                    // required
                    formik={localFormik}
                    required={true}
                    label="Manufacturing Year"
                    name="manufacturer_year"
                    size="small"
                    value={manufacturer_year}
                    options={ManufacturingYears}
                    handleChange={(value) => {
                      localFormik.setFieldValue("manufacturer_year", value);
                      localFormik.setFieldError("manufacturer_year", "");
                    }}
                    initialValue={ManufacturingYears?.find(
                      (v) => v.value == manufacturer_year
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={6} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <div style={{ paddingLeft: "0px" }}>
                    <EditableTextField
                      labelToolTipText="Enter the unique model number assigned by the manufacturer. This aids buyers in verifying specifications and compatibility with other components."
                      showCharactersCount={true}
                      // required
                      upperCharacterLimit={30}
                      required={true}
                      placeholder={"Enter Model Number"}
                      label={"Model Number"}
                      value={model_number}
                      name="model_number"
                      size="small"
                      formik={localFormik}
                    />
                  </div>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </div>
        <ContentDescription className={poststyle.condition_section}>
          <ContentDescriptionHeader>
            Condition
            <span>
              <LightTooltip
                placement={"top"}
                title="Required!"
                arrow
                disableInteractive
              >
                <span
                  style={{
                    color: "#D7282F",
                    paddingRight: "3px",
                    paddingLeft: "3px",
                    // fontFamily:"open sans"
                  }}
                >
                  *
                </span>
              </LightTooltip>
            </span>
            <span>
              <LightTooltip
                placement={"right"}
                title="Select the option that accurately describes the product's condition. Buyers rely on accurate information to make informed decisions."
                arrow
                disableInteractive
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <Image
                    alt="help-img"
                    src={"/assets/helpIcon.svg"}
                    width={12}
                    height={12}
                  />{" "}
                </div>
              </LightTooltip>
            </span>
            <Box
              component={"span"}
              sx={{
                display: "inline-block",
                "@media screen and (max-width:480px)": { display: "inline" },
              }}
            >
              {localFormik?.errors?.condition && (
                <p className={poststyle.pink_btn}>
                  Please select product condition
                </p>
              )}
            </Box>
          </ContentDescriptionHeader>
          <Box
            sx={{
              margin: "12px 0 0 0",
            }}
          >
            <Grid container spacing={1} alignItems={"stretch"}>
              <Grid item xs={3.5}>
                <Box
                  sx={{
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{                      
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#d2d2d2",
                        borderRadius: "6px",
                        "&:hover": {
                          backgroundColor: "#6d6d6d",
                        },
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1",
                        borderRadius: "6px",
                      },
                      scrollBehavior: "smooth",
                    }}
                  >
                    <div className={classes.condition_btn}>
                      {" "}
                      <ToggleButtonGroup
                        style={{ gap: "10px" }}
                        value={condition}
                        exclusive
                        onChange={(e: any) => {
                          localFormik.setFieldValue(
                            "condition",
                            e.target.value
                          );
                          localFormik.setFieldError("condition", "");
                        }}
                        aria-label="text alignment"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <FormControl fullWidth size="medium">
                          <InputLabel id="condition-select-label">
                            Select condition of your product
                          </InputLabel>
                          <Select
                            labelId="condition-select-label"
                            value={conditionNew}
                            onChange={handleConditionChange}
                            label="Select condition of your product"
                            MenuProps={{
                              PaperProps: { sx: { maxHeight: 200 } },
                            }}
                          >
                            {BrandList.map((brand) => (
                              <MenuItem key={brand.name} value={brand.name}>
                                {brand.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </ToggleButtonGroup>
                    </div>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  "@media screen and (max-width:900px)": { minHeight: "50px" },
                }}
              >
                <Box
                  sx={{
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    height: "100%",
                    padding: "8px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    display: "grid",
                    alignItems: "center",
                    "& .MuiTypography-body1": {
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "rgb(123, 121, 121)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      "@media screen and (max-width:320px)": {
                        fontSize: "11px",
                      },
                      "@media screen and (max-width:600px)": {
                        fontSize: "13px",
                      },
                      "@media screen and (max-width:280px)": {
                        fontSize: "12px",
                      },
                    }}
                  >
                    {!tooltiptext && (
                      <Typography>
                        No condition selected, Choose a condition to view
                        details.
                      </Typography>
                    )}
                    {tooltiptext}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* <div className={classes.condition_btn}>
            {" "}
            <ToggleButtonGroup
              style={{ gap: "10px" }}
              className={classes?.buttonGroup}
              value={condition}
              exclusive
              onChange={(e: any) => {
                localFormik.setFieldValue("condition", e.target.value);
                localFormik.setFieldError("condition", "");
              }}
              aria-label="text alignment"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {BrandList.map((v) => (
                <Tooltip title={v.seller} arrow placement="top">
                  <ToggleButton
                    style={{
                      textTransform: "none",
                    }}
                    className={
                      condition === v.name
                        ? classes?.pricingTypeCustomToggleButtonSelected
                        : classes?.pricingTypeCustomToggleButton
                    }
                    size="small"
                    value={v.name}
                    aria-label="left aligned"
                  >
                    {v.name}
                    {condition === v.name && (
                      <span
                        style={{
                          display: "inline-flex",
                          position: "relative",
                          width: "10px",
                          height: "12px",
                          marginLeft: "8px",
                          top: "1px",
                        }}
                      >
                        <Image
                          src={"/assets/smallTick.svg"}
                          width={10}
                          height={10}
                          alt="img"
                        />
                      </span>
                    )}
                  </ToggleButton>
                </Tooltip>
              ))}

              {localFormik?.errors?.condition && (
                <p className={poststyle.pink_btn}>
                  please select product condition
                </p>
              )}
            </ToggleButtonGroup>
          </div> */}
        </ContentDescription>
        {/* <Box
          sx={{
            width: "100%",
            background: "#ffff",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            alignItems: "center",
            flexDirection: "column",
          }}
        > */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            paddingTop: "14px",
          }}
        >
          <Button
            color="error"
            variant="outlined"
            size="small"
            style={{
              textTransform: "none",
              minWidth: "90px",
              height: "30.75px",
              // marginLeft: "auto",
            }}
            type="submit"
          >
            {buttonLoader ? (
              <ThreeDots
                height="14"
                width="107"
                radius="5"
                color="#d32f2f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              " Save & Continue"
            )}
            <ArrowForwardIosIcon
              style={{ fontSize: "15px", marginLeft: "4px" }}
            ></ArrowForwardIosIcon>
          </Button>
        </Box>
        {/* </Box> */}
      </form>
    </>
  );
};

import {
  BtnFilled,
  BtnOutlined,
} from "@/components/common/buttons/ButtonsVariations";
import { SelectableTextField } from "@/components/products/common/selectableTextField";
import { Box, Button, Grid, TextField, Tooltip, styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import poststyle from "components/products/editProduct/style.module.css";
import React, { useEffect, useState } from "react";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
} from "./styles";
// import useProductContext from "@/hooks/useProductContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CustomAutocompelete from "@/components/products/common/autoCompelete";
import { ThreeDots } from "react-loader-spinner";
import {
  apiClient,
  configProductScoreValues,
  productScoreValues,
} from "@/components/common/common";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Swal from "sweetalert2";
import EditProductFormik from "@/hooks/useEditProductFormik";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import {
  setShowByOrderAddBrand,
  setShowInstockAddBrand,
} from "@/hooks/ProductReducers";
import { EditableTextField } from "@/components/products/common/editableTextField";

export const ByOrder = ({
  setSpecificationBlock,
  availability,
  HandlePercentage,
  setCompletedFields,
  setAccordianValue,
  setPublished,
  FetchProductDetail,
  percentage,
  categoryIds,
  accordionValue,
}) => {
  // const {
  //   formik,
  //   productDetail,
  //   brandsData,
  //   showByOrderAddBrand,
  //   setShowByOrderAddBrand,
  //   AddByOrderBrand,
  // } = useProductContext();

  const dispatch = useAppDispatch();

  const { productDetail, brandsData, showByOrderAddBrand } = useSelector(
    (state: any) => state.editProduct
  );
  const validOptions = brandsData.filter((item) => item.view.trim() !== "");
  const { formik, AddByOrderBrand, getBrands } = EditProductFormik();
  const [loading, setLoading1] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [customBrand, setCustomBrand] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const { query }: any = useRouter();
  const productId: string = query.Id;
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  useEffect(() => {
    getBrands();
  }, []);
    useEffect(() =>{
      if(accordionValue != "information"){
        dispatch(setShowByOrderAddBrand(false))
      }
    }, [accordionValue])

  const AddInStockBrand1 = async (
    customBrand,
    setLoading1 = null,
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
    setLoading1(true);

    let response = await apiClient(
      "brands/createBrandbyCategory",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200 && response?.message == "Create sucessfully") {
      getBrands();
      dispatch(setShowByOrderAddBrand(false)); // Close modal after success

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Success",
          text: "Brand successfully added. You will receive a notification after admin approval.",
          icon: "success",
          showCancelButton: false,
          reverseButtons: true,
        })
        .then(() => {
          Swal.close();
        });

      // setCustomBrand("");
      setError(false);
      setErrorText("");
    } else if(response.status === 200 && response?.message == "Already Exists") {
      // if (response.message) {
        setError(true);
        setErrorText("The name has already been taken.");
      // }
    }

    setLoading1(false);
  };

  const validation = Yup.object().shape({
    brand_id: Yup.string()
      .required("Please select manufacturer/brand")
      .nullable(),
      model_number: Yup.string().required("Please enter product model number"),
  });
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const byOrderFormik = useFormik({
    validationSchema: validation,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      brand_id:
        productDetail?.brand_id !== 0 && productDetail?.brand_id != null
          ? productDetail?.brand_id
          : "",
      model_number: productDetail?.model_number ?? "",
    },
    onSubmit: async (values) => {
      const regex = /^\d+$/;
      if (!regex.test(byOrderFormik.values.brand_id)) {
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
      setButtonLoader(true);
      const { brand_id, model_number } = values;
      let formData = new FormData();
      formData.append("last_update", "Product Information");
      formData.append("percentage", percentageValue);
      formData.append("availability", "by_order");
      formData.append("id", productId);
      formData.append("brand_id", brand_id || "");
      formData.append("published", "0");
      formData.append("condition", "");
      formData.append("manufacturer_year", "");
      formData.append("validity", "");
      formData.append("model_number", model_number || "");
      formData.append("existence_place", "");
      formData.append("existence_cities", "");
      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response.status == 200) {
        setSpecificationBlock({ disable: false, expanded: true });
        setAccordianValue("specification");
        setCompletedFields((prev) => ({ ...prev, information: true }));
        FetchProductDetail();
      }
      setBrand("");
      setCustomBrand("");
      dispatch(setShowByOrderAddBrand(false));
      setButtonLoader(false);
    },
  });

  const { brand_id, model_number } = byOrderFormik.values;

  useEffect(() => {
    const { product_type } = formik.values;
    if (product_type === "simple") {
      const { manufacturerBrand } =
        productScoreValues?.productInformation?.byOrder;
      // if (availability === "by_order") {
      //   HandlePercentage("brand_id", brand_id ? 3 : 0);
      //   HandlePercentage("model_number", 0);
      //   HandlePercentage("manufacturer_year", 0);
      //   HandlePercentage("validity", 0);
      //   HandlePercentage("condition", 0);
      // }
      // } else {
      if (availability === "by_order") {
        HandlePercentage("brand_id", brand_id ? manufacturerBrand/2 : 0);
        HandlePercentage("model_number", model_number ? manufacturerBrand/2 : 0);
      }
    } else {
      const { manufacturerBrand } =
        configProductScoreValues?.productInformation?.byOrder;
      if (availability === "by_order") {
        HandlePercentage("brand_id", brand_id ? 4.282655 : 0);
        HandlePercentage("model_number", model_number ? 4.282655 : 0);
      }
    }
  }, [availability, brand_id, model_number]);

  useEffect(() => {
    if (brand_id === "" && isMount) {
      setCompletedFields((prev) => ({ ...prev, information: false }));
      setIsMount(false);
    }
  }, [brand_id, isMount]);

  useEffect(() => {
    const { brand_id } = productDetail;
    if (brand_id && !isMount) {
      setSpecificationBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, information: true }));
      setIsMount(true);
    }
  }, [productDetail]);

  useEffect(() => {
    if (customBrand) {
      try {
        let { value } = brandsData.find(
          (v) => v.view.toLowerCase() == customBrand.toLowerCase()
        );
        byOrderFormik.setFieldError("brand_id", "");
        byOrderFormik.setFieldValue("brand_id", value);
        setCustomBrand("");
      } catch (err) {
        console.log(err);
      }
    }
    // getBrands();
  }, [brandsData]);

  const onChangeHandler = (e) => {
    if (error) setError(false);
    if (errorText) setErrorText("");
    let regex = /^[a-zA-Z0-9\s.]*$/;
    if (regex.test(e.target.value)) {
      setCustomBrand(e.target.value);
      let id =
        brandsData?.find(
          (v) => v.view.toLowerCase() == `${e.target.value.trim()}`.toLowerCase()
        )?.value ?? "";
      if (id) {
        setBrand(id);
        byOrderFormik.setFieldValue("brand_id", id);
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
      setLoading1,
      setError,
      setErrorText,
      true,
      categoryIds
    );
  };
  const ButtonCol = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "14px",
  });

  return (
    <>
      <form onSubmit={byOrderFormik.handleSubmit}>
        <Box
          sx={{
            width: "100%",
            background: "#ffff",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} xs={12}>
              <FormControl sx={{ width: "100%", position: "relative" }}>
                <CustomAutocompelete
                  labelToolTipText="Enter the exact brand name as it appears on your product. This helps buyers identify the product's origin and quality. If your product comes from different brands, make a new post for each brand to keep things clear."
                  placeholder="Brand"
                  formik={byOrderFormik}
                  required={true}
                  label="Manufacturer/Brand"
                  options={validOptions}
                  value={brand_id}
                  name="brand_id"
                  size="small"
                  handleChange={(value) => {
                    if (value) {
                      dispatch(setShowByOrderAddBrand(false));
                      setBrand("");
                      setCustomBrand("");
                    }
                    byOrderFormik.setFieldError("brand_id", "");
                    byOrderFormik.setFieldValue("brand_id", value);
                  }}
                  initialValue={validOptions?.find(
                    (v) => v.value == `${brand_id}`
                  )}
                />
                <span
                  className={poststyle.add_brand_txt}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setShowByOrderAddBrand(!showByOrderAddBrand));
                  }}
                >
                  <span style={{}}> + </span> Add Brand
                </span>
                {showByOrderAddBrand && (
                  <span className={poststyle.add_brand_field}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        onSubmitHandler();
                      }}
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
                        setCustomBrand("");
                        setError(false);
                        setErrorText("");
                        dispatch(setShowByOrderAddBrand(false));
                      }}
                      color="error"
                    >
                      <CloseOutlinedIcon
                        style={{ cursor: "pointer", fontSize: "18px" }}
                      />
                    </Button>
                  </span>
                )}
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
                      value={byOrderFormik?.values?.model_number}
                      name="model_number"
                      size="small"
                      formik={byOrderFormik}
                    />
                  </div>
                </FormControl>
              </Grid>
          </Grid>
          <Button
            color="error"
            variant="outlined"
            size="small"
            style={{
              textTransform: "none",
              minWidth: "90px",
              marginLeft: "auto",
              height: "35.75px",
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
      </form>
    </>
  );
};

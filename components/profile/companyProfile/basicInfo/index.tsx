import React, { useState, useEffect, useRef } from "react";
import { CustomDropdown } from "@/components/common/customDropdown";
import useAppContext from "@/hooks/useAppContext";
import Image from "next/image";
import {
  OuterContainer,
  ContentInnerContainer,
  ContainerHeader,
  ContainerHeaderText,
  ContainerHeaderDescription,
  FloatingEditIcon,
  PencilIcon,
  LabelContainer,
  CancelLink,
  SaveLink,
} from "@/components/profile/common";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { revenue, employees } from "@/utils/dropdownOptions";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  FirstletterCapital,
  apiClient,
  categorySectorContent,
} from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "@/hooks/appReducers";
import { getCompanyProfile } from "@/hooks/company";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { ThreeDots } from "react-loader-spinner";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import moment from "moment";
import { getCategoryData } from "@/hooks/CategoryReducer";
export const BasicInfo = (props: any) => {
  const { breakPoints } = useAppContext();
  const [parentCategories, setParentCategories] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const { allCategories } = useSelector((state: any) => state.categoryDetail);
  const [skeltonLoader, setSkeltonLoader] = useState(false);
  const [lastChange, setLastChanged] = useState<any>("");
  const momentDate = moment(lastChange?.lastChanged, "YYYY-MM-DD HH:mm:ss");
  const nextYear = momentDate.add(1, "year");
  const formattedDate = nextYear.format("DD-MMMM-YYYY");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [isProductsError, setIsProductsError] = useState(false);
  const [isOtherProductsError, setIsOtherProductsError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setSkeltonLoader(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (companyDetails) {
        setSkeltonLoader(false);
      } else {
        setSkeltonLoader(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    dispatch(getCategoryData());
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const selectedCategory = allCategories.find(
        (category) => category.id === selectedCategoryId
      );
      setSubCategoryOptions(selectedCategory?.sub_category || []);
    }
  }, [selectedCategoryId, allCategories]);

  const validation = Yup.object().shape({
    yearly_revenue: Yup.string().required("Please select yearly revenue"),
    no_of_employee: Yup.string().required("Please select no. of employees"),

    company_other_products: Yup.array().max(
      10,
      "You can only add upto 10 other products"
    ),
    category_sector_id: Yup.string()
      .required("Please select main sector")
      .nullable(),
    category_id: Yup.string()
      .required(" Please select main product category")
      .nullable(),
    company_products: Yup.array()
      .min(1, "Please enter main products")
      .max(7, "You can only add upto 7 main products")
      .required("Please enter main products"),
  });

  let formik: any = useFormik({
    initialValues: {
      category_id: props?.defaultValues?.category_id[0] ?? "",
      category_sector_id: props?.defaultValues?.category_sector_name ?? "",
      company_other_products:
        props?.defaultValues?.company_other_products ?? [],
      company_products: props?.defaultValues?.company_products ?? [],
      no_of_employee: props?.defaultValues?.no_of_employee,
      yearly_revenue: props?.defaultValues?.yearly_revenue,
      editMode: false,
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const {
        category_id,
        company_other_products,
        company_products,
        no_of_employee,
        yearly_revenue,
        category_sector_id,
      } = values;
      setLoader(true);
      setSkeltonLoader(true);

      let response = await apiClient("company_profile/updateProfile", "patch", {
        body: {
          category_id: category_id,
          company_other_products: company_other_products.join(","),
          company_products: company_products.join(","),
          no_of_employee,
          yearly_revenue,
          category_sector_id: selectedCategoryId,
        },
      });

      if (response.status == 200 || response.status == true) {
        if (response?.lastChanged) {
          setLastChanged(true);
          setLoader(false);
          setLastChanged(response);
          return;
        }
        await dispatch(getCompanyProfile());
        setSkeltonLoader(false);
        dispatch(profileData());
        formik.setFieldValue("editMode", false);
        setIsProductsError(false);
      }
      setLoader(false);
      setSkeltonLoader(false);
    },
  });

  const {
    category_id,
    company_other_products,
    company_products,
    no_of_employee,
    yearly_revenue,
    category_sector_id,
    editMode,
  } = formik.values;

  const CancelEditing = () => {
    if (editMode) {
      setSkeltonLoader(false);
      formik.resetForm();
      formik.setFieldValue("editMode", false);
    } else {
      setSkeltonLoader(false);
      formik.setFieldValue("category_id", props?.defaultValues?.category_id);
      formik.setFieldValue(
        "company_other_products",
        props?.defaultValues?.company_other_products
      );
      formik.setFieldValue(
        "company_products",
        props?.defaultValues?.company_products
      );
      formik.setFieldValue(
        "no_of_employee",
        props?.defaultValues?.no_of_employee
      );
      formik.setFieldValue(
        "yearly_revenue",
        props?.defaultValues?.yearly_revenue
      );
      formik.setFieldValue("editMode", false);
      formik.setFieldError("company_other_products", "");
    }
    setIsProductsError(false);
    setIsOtherProductsError(false);
    setLastChanged(false);
  };

  const handleSubCategoryChange = (event, newValue) => {
    formik.setFieldValue("category_id", newValue);
    formik.setFieldError("category_id", "");
    formik.setFieldError("category_sector_id", "");
  };
  const handleCategoryChange = (event, newValue) => {
    const selectedCategory = allCategories.find(
      (item) => item.name === newValue
    );
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory.id);
      formik.setFieldValue("category_sector_id", selectedCategory?.name);
      formik.setFieldError("category_sector_id", "");
    } else {
      setSelectedCategoryId(null);
      formik.setFieldValue("category_sector_id", "");
    }
    formik.setFieldValue("category_id", "");
  };

  const mainSectorRef = useRef(null);
  const mainProductCategoryRef = useRef(null);
  const mainProductRef = useRef(null);
  const noOfEmployeRef = useRef(null);
  const yearlyRevenueRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if(!formik.values.category_sector_id || formik.errors.category_sector_id) {
      mainSectorRef.current?.focus();
      return;
    }
    if(!formik.values.category_id || formik.errors.category_id) {
      mainProductCategoryRef?.current?.focus();
      return;
    }
    if(!formik.values.company_products || formik.errors.company_products) {
      mainProductRef?.current?.focus();
      return;
    }
    if(!formik.values.no_of_employee || formik.errors.no_of_employee) {
      noOfEmployeRef.current?.focus();
      return;
    }
    if(!formik.values.yearly_revenue || formik.errors.yearly_revenue) {
      yearlyRevenueRef?.current?.focus();
      return;
    }
  }

  return (
    <ContentInnerContainer breakPoints={breakPoints}>
      <ContainerHeader>
        <ContainerHeaderText breakPoints={breakPoints}>
          Basic Information
        </ContainerHeaderText>
        <ContainerHeaderDescription breakPoints={breakPoints}>
          Manage Information Related to your Company Profile
        </ContainerHeaderDescription>

        {!editMode ? (
          <FloatingEditIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              formik.setFieldValue("editMode", true);
            }}
          >
            <PencilIcon>
              <LightTooltip title="Edit" arrow placement="top">
                <Image
                  src={"/assets/EditPencil.svg"}
                  layout="fill"
                  alt="editImage"
                />
              </LightTooltip>
            </PencilIcon>{" "}
            {companyDetails?.basic_information?.category_id[0] ? "Edit" : "Add"}
          </FloatingEditIcon>
        ) : (
          <FloatingEditIcon
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <CancelLink onClick={CancelEditing}>
              <CloseIcon />
              <Box
                sx={{
                  "@media screen and (max-width:320px)": {
                    display: "none",
                  },
                }}
              >
                Cancel
              </Box>
            </CancelLink>

            {loader ? (
              <ThreeDots
                height="30"
                width="60"
                radius="5"
                color="#d32f2f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              <SaveLink>
                <Button
                  disabled={loader || isProductsError || isOtherProductsError}
                  onClick={handleSave}
                  sx={{ padding: "0px", minWidth: "auto" }}
                >
                  <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                  <Box
                    sx={{
                      "@media screen and (max-width:320px)": {
                        display: "none",
                      },
                    }}
                  >
                    Save
                  </Box>
                </Button>
              </SaveLink>
            )}
          </FloatingEditIcon>
        )}
      </ContainerHeader>
      <OuterContainer>
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          {!editMode ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Main Sector</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer sx={{ display: "block" }}>
                Main Sector
                <span style={{ color: "#d7282f" }}>*</span>
              </LabelContainer>
            </Grid>
          )}
          {!editMode ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              {skeltonLoader ? (
                <Skeleton animation="wave" variant="text" width={"35%"} />
              ) : (
                <p>
                  {category_sector_id.length > 0 ? category_sector_id : "N/A"}
                </p>
              )}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={allCategories?.map((item) => item.name) || []}
                sx={{ width: "100%" }}
                onChange={handleCategoryChange}
                value={formik?.values?.category_sector_id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Please select main sector"
                    error={
                      formik.touched.category_sector_id &&
                      Boolean(formik.errors.category_sector_id)
                    }
                    helperText={
                      formik.touched.category_sector_id &&
                      formik.errors.category_sector_id
                    }
                    inputRef={mainSectorRef}
                  />
                )}
              />
            </Grid>
          )}
          {category_sector_id && (
            <>
              <Grid item xs={12}>
                <hr className="hair-line" />
              </Grid>
              {!editMode ? (
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <LabelContainer>Main Product Category</LabelContainer>
                </Grid>
              ) : (
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <LabelContainer sx={{ alignItems: "flex-start" }}>
                    Main Product Category
                    <div style={{ color: "#d7282f" }}>*</div>
                    <Box component="span">
                      <LightTooltip sx={{zIndex:"1000"}}
                        title={<span>{categorySectorContent}</span>}
                      >
                        <InfoOutlinedIcon
                          sx={{
                            fontSize: "15px",
                            color: "#0AA133",
                            margin: "0 0 -3px 3px",
                          }}
                        />
                      </LightTooltip>
                    </Box>
                  </LabelContainer>
                </Grid>
              )}
            </>
          )}
          {category_sector_id && (
            <>
              {!editMode ? (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  sx={{ fontSize: "14px" }}
                >
                  {skeltonLoader ? (
                    <Skeleton animation="wave" variant="text" width={"30%"} />
                  ) : (
                    <p>{category_id?.length > 0 ? category_id : ""}</p>
                  )}
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  sx={{ fontSize: "14px" }}
                >
                  <>
                    <Autocomplete
                      size="small"
                      disablePortal
                      id="sub-category-combo-box"
                      options={
                        subCategoryOptions?.map((item) => item.name) || []
                      }
                      sx={{ width: "100%" }}
                      onChange={handleSubCategoryChange}
                      value={formik?.values?.category_id}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Please select main product category"
                          error={
                            formik.touched.category_id &&
                            Boolean(formik.errors.category_id)
                          }
                          helperText={
                            formik.touched.category_id &&
                            formik.errors.category_id
                          }
                          inputRef={mainProductCategoryRef}
                        />
                      )}
                    />
                  </>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: "400",
                      color: "#717171",
                    }}
                  >
                    Fill in the main product categories of the products you are
                    dealing with, it will be shown on your mini site to attract
                    potential buyers.
                  </Typography>
                  {editMode && lastChange && (
                    <span
                      style={{
                        marginLeft: "3px",
                        fontSize: "10px",
                        color: "#d7282f",
                      }}
                    >
                      You have reached the limit of updating your product main
                      categories three times this year. Please wait until the{" "}
                      <strong>{formattedDate}</strong> to make further changes.
                    </span>
                  )}
                </Grid>
              )}
            </>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {!editMode ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Main Products</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer sx={{ alignItems: "flex-start" }}>
                Main Products<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {!editMode ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              {skeltonLoader ? (
                <Skeleton animation="wave" variant="text" width={"30%"} />
              ) : (
                <p>
                  {company_products.length > 0
                    ? company_products?.join(", ")
                    : "N/A"}
                </p>
              )}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              <>
                <Autocomplete
                  size="small"
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  value={company_products}
                  defaultValue={company_products}
                  onChange={(event: any, newValue) => {
                    let value = newValue
                      .map((v) => FirstletterCapital(v))
                      .filter((v) => v.trim() !== "");
                    if (value.length > 7) {
                      formik.setFieldError(
                        "company_products",
                        "You can add only 7 main products"
                      );
                      return;
                    } else {
                      formik.setFieldError("company_products", "");
                    }

                    formik.setFieldValue("company_products", value);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        size="small"
                        label={option}
                        {...getTagProps({ index })}
                        sx={{
                          backgroundColor: "rgba(34, 51, 84, 0.1) !important",
                          "& .MuiChip-deleteIcon": {
                            color: "#d7282fd9",
                          },
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Type the main products and press enter"
                      variant="outlined"
                      onChange={(e) => {
                        if (
                          company_products?.includes(e?.target?.value?.trim())
                        ) {
                          setIsProductsError(true);
                        } else {
                          setIsProductsError(false);
                        }
                      }}
                      error={
                        isProductsError
                          ? true
                          : false || formik.errors.company_products
                      }
                      InputLabelProps={{ shrink: true }}
                      helperText={
                        isProductsError
                          ? "Duplicate not allowed!"
                          : "" || formik.errors.company_products
                      }
                      inputRef={mainProductRef}
                    />
                  )}
                />
              </>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#4a4a4a",
                  opacity: ".8",
                }}
              >
                Please press the Enter key after typing each main products.
              </Typography>
              <Typography
                sx={{ fontSize: "11px", fontWeight: "400", color: "#717171" }}
              >
                Fill in the main product names you are dealing with, it will be
                shown on your mini site to attract potential buyers.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {!editMode ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Other Products</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Other Products</LabelContainer>
            </Grid>
          )}{" "}
          {!editMode ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              {skeltonLoader ? (
                <Skeleton animation="wave" variant="text" width={"28%"} />
              ) : (
                <p>
                  {company_other_products.length > 0
                    ? company_other_products?.join(", ")
                    : "N/A"}
                </p>
              )}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              <>
                <Autocomplete
                  size="small"
                  sx={{ width: "100%" }}
                  onChange={(event: any, newValue) => {
                    let value = newValue
                      .map((v) => FirstletterCapital(v))
                      .filter((v) => v.trim() !== "");
                    if (value.length > 10) {
                      formik.setFieldError(
                        "company_other_products",
                        "You can add only 10 company products"
                      );
                      return;
                    } else {
                      formik.setFieldError("company_other_products", "");
                    }

                    formik.setFieldValue("company_other_products", value);
                  }}
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    const inputValue = event.currentTarget.value?.trim();
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (inputValue && inputValue !== "") {
                        const updatedValue = [
                          ...company_other_products,
                          FirstletterCapital(inputValue),
                        ].filter((v) => v.trim() !== "");
                        if (updatedValue.length > 10) {
                          formik.setFieldError(
                            "company_other_products",
                            "You can add only 10 company products"
                          );
                        } else {
                          formik.setFieldValue(
                            "company_other_products",
                            updatedValue
                          );
                          formik.setFieldError("company_other_products", "");
                        }
                      }
                    }
                  }}
                  multiple
                  id="tags-filled"
                  options={[]}
                  value={company_other_products}
                  defaultValue={company_other_products}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        size="small"
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                        sx={{
                          backgroundColor: "rgba(34, 51, 84, 0.1) !important",
                          "& .MuiChip-deleteIcon": {
                            color: "#d7282fd9",
                          },
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Type the other products and press enter"
                      onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        if (company_other_products.includes(trimmedValue)) {
                          setIsOtherProductsError(true);
                        } else {
                          setIsOtherProductsError(false);
                        }
                      }}
                      error={
                        isOtherProductsError
                          ? true
                          : false || formik.errors.company_other_products
                      }
                      InputLabelProps={{ shrink: true }}
                      helperText={
                        isOtherProductsError
                          ? "Duplicate not allowed!"
                          : "" || formik.errors.company_other_products
                      }
                    />
                  )}
                />
              </>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#4a4a4a",
                  opacity: ".8",
                }}
              >
                Please press the Enter key after typing each other products.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {!editMode ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                No. Of Employees
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                No. Of Employees<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}
          {!editMode ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              {skeltonLoader ? (
                <Skeleton animation="wave" variant="text" width={"14%"} />
              ) : (
                <p>{no_of_employee == 0 ? "N/A" : no_of_employee}</p>
              )}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              <CustomDropdown
               inputRef={noOfEmployeRef}
                name="employees"
                options={employees}
                value={no_of_employee}
                type={"employee"}
                errorText={formik.errors.no_of_employee}
                error={formik.errors.no_of_employee ? true : false}
                handleChange={(e) => {
                  formik.setFieldValue("no_of_employee", e.target.value);
                  formik.setFieldError("no_of_employee", "");
                }}
                placeholder=" Select No.of Employees"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {!editMode ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Yearly Revenue
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Yearly Revenue<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {!editMode ? (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{ fontSize: "14px" }}
            >
              {skeltonLoader ? (
                <Skeleton animation="wave" variant="text" width={"40%"} />
              ) : (
                <p>{yearly_revenue == 0 ? "N/A" : yearly_revenue}</p>
              )}
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              sx={{
                fontSize: "14px",
                ".erroricon": {
                  display: "none",
                },
              }}
            >
              <CustomDropdown
               inputRef={yearlyRevenueRef}
                name="revenue"
                options={revenue}
                placeholder=" Select Yearly Revenue"
                value={yearly_revenue}
                errorText={formik.errors.yearly_revenue}
                error={formik.errors.yearly_revenue ? true : false}
                handleChange={(e) => {
                  formik.setFieldValue("yearly_revenue", e.target.value);
                  formik.setFieldError("yearly_revenue", "");
                }}
              />
            </Grid>
          )}
        </Grid>
      </OuterContainer>
    </ContentInnerContainer>
  );
};

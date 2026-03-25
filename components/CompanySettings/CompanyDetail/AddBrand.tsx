import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  DescriptionTextContainer,
  ErrorMessage,
  SaveButtonContainer,
  FullFieldLabel,
  FullFieldValue,
  FullFieldContainer,
  FieldBorder,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import {
  Autocomplete,
  Box,
  Chip,
  Divider,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { FileUpload } from "@/components/common/uploadFile";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  apiClient,
  FirstletterCapital,
  toBase64,
} from "@/components/common/common";
import { MyAppContext } from "@/contextApi/appContext";
import { ThreeDots } from "react-loader-spinner";
import { ServiceAddText } from "./style";
import HelperText from "./Common/helperText";
import { toast } from "react-toastify";

const AddBrand = ({
  type,
  setAddMore,
  fetchServicesList,
  editColumn,
  setEditColumn,
}) => {
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [loading, setLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [linked_companiesError, setLinked_companiesError] = useState(false);
  const [productsError, setProductsError] = useState(false);
  const [related_categoriesError, setRelated_categoriesError] = useState(false);
  const [keywordsError, setKeywordsError] = useState(false);
  let id = editColumn.id;
  const validation = Yup.object().shape({
    name: Yup.string().required("Please enter brand name"),
    description: Yup.string()
      .required("Please enter description")
      .max(256, "Max Characters Limit Reached!"),
  });

  let formik = useFormik({
    initialValues: {
      name: editColumn?.name ?? "",
      categories: editColumn?.categories?.split(",") ?? [],
      description: editColumn?.description ?? "",
      linked_companies: editColumn?.linked_companies?.split(",") ?? [],
      products: editColumn?.products?.split(",") ?? [],
      related_categories: editColumn?.related_categories?.split(",") ?? [],
      Keywords: editColumn?.keywords?.split(",") ?? [],
      image: editColumn?.logo ?? "",
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);
      const {
        name,
        description,
        image,
        categories,
        linked_companies,
        products,
        related_categories,
        Keywords,
      } = values;
      let dataToSend = new FormData();
      let dataToUpdate = new FormData();
      let endPoint = type === "edit" ? "edit" : "create";

      dataToSend.append("name", name);
      dataToSend.append("description", description);
      dataToSend.append("logo", values.image[0]);
      dataToSend.append("categories", categories.join(","));
      dataToSend.append("linked_companies", linked_companies.join(",")),
        dataToSend.append("products", products.join(",")),
        dataToSend.append("related_categories", related_categories.join(",")),
        dataToSend.append("keywords", Keywords.join(",")),
        dataToUpdate.append("name", name),
        dataToUpdate.append("id", id);
      dataToUpdate.append("description", description);
      dataToUpdate.append("logo", values.image[0]);
      dataToUpdate.append("categories", categories.join(","));
      dataToUpdate.append("linked_companies", linked_companies.join(",")),
        dataToUpdate.append("products", products.join(",")),
        dataToUpdate.append("related_categories", related_categories.join(",")),
        dataToUpdate.append("keywords", Keywords.join(","));

      if (type === "edit") {
        let response = await apiClient(
          `brands/update`,
          "post",
          {
            body: dataToUpdate,
          },
          true
        );
        if (response.status === 200) {
          if (type === "edit") setEditColumn({});
          setAddMore("");
          fetchServicesList();
          setLoading(false);
        } else {
          toast.error(response?.message);
          setLoading(false);
        }
      } else {
        let response = await apiClient(
          `brands/create`,
          "post",
          {
            body: dataToSend,
          },
          true
        );
        if (response.status === 200) {
          if (type === "edit") setEditColumn({});
          setAddMore("");
          fetchServicesList();
          setLoading(false);
          setCompleteScreenLoader(false);
        } else {
          toast.error(response?.message);
          setCompleteScreenLoader(false);
          setLoading(false);
        }
      }
    },
  });

  const {
    categories,
    linked_companies,
    products,
    related_categories,
    Keywords,
  } = formik.values;

  const maxCharacters = 256;
  const remainingCharacters = Math.max(
    0,
    maxCharacters - formik.values.description.length
  );

  const cancelHandle = () => {
    setAddMore("");
    setCompleteScreenLoader(false);
    formik.resetForm();
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("description", e.target.value);
    formik.setFieldError("description", "");
    if (value?.length > 256) {
      formik.setFieldError("description", "Max Characters Limit Reached!");
      return;
    }
  };
  const { errors, values } = formik;

  const DisplayImage = (file) => {
    try {
      return URL.createObjectURL(file[0]);
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  let imageUrl =
    Array.isArray(formik.values?.image) && formik.values?.image?.length > 0
      ? DisplayImage(formik.values?.image)
      : typeof formik.values?.image === "string"
        ? formik.values?.image
        : "";

  return (
    <>
      <Grid container sx={{ padding: "12px 16px 0px 16px" }}>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container className="addservice_label">
            <Grid item xs={12} md={12}>
              <ServiceAddText variant="h6">
                {type == "add-brand" ? "Add New " : "Update "} Brand
              </ServiceAddText>
              <FullFieldContainer>
                <FullFieldLabel>
                  Brand Name <span className="detailastrics">*</span>
                </FullFieldLabel>

                <FullFieldValue position={"relative"}>
                  <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    size="small"
                    name="name"
                    type="name"
                    placeholder="Enter Brand Name"
                    value={formik.values.name}
                    onChange={(e: any) => {
                      if (e.target.value.length > 20) {
                        formik.setFieldError("name", "Maximum limit reached!");
                        formik.handleChange(e);
                      } else {
                        formik.setFieldError("name", "");
                        formik.handleChange(e);
                      }
                    }}
                    error={errors?.name ? true : false}
                  />
                  <Box sx={{ marginTop: "-5px" }}>
                    {errors?.name && <HelperText errorText={errors?.name} />}
                  </Box>
                </FullFieldValue>
              </FullFieldContainer>
            </Grid>

            {/* <Grid item xs={12} md={12}>
              <FullFieldContainer>
                <FullFieldLabel>
                  Categories <span className="detailastrics"></span>
                </FullFieldLabel>

                <FullFieldValue position={"relative"}>
                  <Autocomplete
                    size="small"
                    multiple
                    id="tags-filled"
                    options={[]}
                    defaultValue={categories}
                    freeSolo
                    sx={{ width: "100%" }}
                    onChange={(event: any, newValue) => {
                      if(event?.key == "Backspace"){
                        let newCategories = [...categories];
                        newCategories?.pop();
                        formik.setFieldValue("categories", newCategories);
                      }else{
                        let categoryValue = event?.target?.value?.includes(',') ? [...categories, ...event?.target?.value?.split(",")] : newValue;
                        formik.setFieldValue("categories", categoryValue);
                        formik.setFieldError("categories", "");
                      }
                      // let value = newValue
                      //   .map((v) => FirstletterCapital(v?.trim()))
                      //   ?.filter(Boolean);

                      // if (newValue != null) {
                      //   formik.setFieldValue("categories", value);
                      //   formik.setFieldError("categories", "");
                      // }
                    }}
                    onKeyDown={(
                      event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                      if (event.key === "Enter" && !event.defaultPrevented) {
                        event.preventDefault();
                        const inputValue = event.currentTarget["value"]?.trim();
                        if (inputValue !== "") {
                          const updatedValue = [...categories, inputValue];
                          formik.setFieldValue("categories", updatedValue);
                          formik.setFieldError("categories", "");
                        }
                      }
                    }}   
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
                        placeholder="Type the other categories and press enter"
                        onChange={(e) => {
                          if (categories?.includes(e?.target?.value)) {
                            setCategoryError(true);
                          } else {
                            setCategoryError(false);
                          }
                        }}
                        error={categoryError ? true : false}
                        InputLabelProps={{ shrink: true }}
                        helperText={categoryError ? "Duplicate not allowed !" : ""}
                      />
                    )}
                  />
                </FullFieldValue>
                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#4a4a4a",
                    opacity: '.8',
                    marginLeft: "2px",
                    paddingTop: "5px",
                  }}
                >
                  Please press the Enter key after typing each categories.
                </Typography>
              </FullFieldContainer>
            </Grid> */}
            {/* <Grid item xs={12} md={12}>
              <FullFieldContainer>
                <FullFieldLabel>Brand Logo</FullFieldLabel>

                <FullFieldValue>
                  <FieldBorder
                    style={{
                      position: "relative",
                      border: `${errors.image ? "1px solid #d32f2f" : ""}`,
                    }}
                  >
                    <div>
                      <FileUpload
                        fileType="image/png, image/jpeg"
                        alignItem="start"
                        single={true}
                        mode={"edit"}
                        name="certificate"
                        error={(error)=> formik.setFieldError("image", error)}
                        files={
                          editColumn?.logo &&
                            !Array.isArray(formik.values.image)
                            ? [
                              {
                                file_original_name: editColumn.logo,
                              },
                            ]
                            : formik.values.image
                        }
                        updateFiles={(value) => {
                          
                          if (
                            value[0]?.type !== "video/mp4" &&
                            value[0]?.type !== "video/ogg" &&
                            value[0]?.type !== "video/webm"
                          ) {
                            formik.setFieldValue("image", value);
                            formik.setFieldError("image", "");
                          } else {
                            formik.setFieldError(
                              "image",
                              "Invalid image format"
                            );
                          }
                        }}
                        removedFile={(deletedID) => console.log()}
                      />
                      {!imageUrl && <div></div>}
                      <></>
                    </div>
                  </FieldBorder>
                  <Box sx={{ marginTop: "-5px" }}>
                    {errors?.image && <HelperText errorText={errors?.image} />}
                  </Box>
                </FullFieldValue>
              </FullFieldContainer>
            </Grid> */}
          </Grid>

          {/* <FullFieldContainer>
            <FullFieldLabel>
              Linked Companies <span className="detailastrics"></span>
            </FullFieldLabel>

            <FullFieldValue position={"relative"}>
              <Autocomplete
                size="small"
                sx={{ width: "100%" }}
                multiple
                id="tags-filled"
                options={[]}
                value={linked_companies}
                defaultValue={linked_companies}
                freeSolo
                onChange={(event: any, newValue) => {
                  if(event?.key == "Backspace"){
                    let linkedCompanies = [...linked_companies];
                    linkedCompanies?.pop();
                    formik.setFieldValue("linked_companies", linkedCompanies);
                  }else{
                    let linkedCompaniesValue = event?.target?.value?.includes(",") ? [...linked_companies, ...event?.target?.value?.split(",")] : newValue;
                    formik.setFieldValue("linked_companies", linkedCompaniesValue);
                  }
                  // let value = newValue
                  //   .map((v) => FirstletterCapital(v?.trim()))
                  //   ?.filter(Boolean);

                  // if (newValue != null) {
                  //   formik.setFieldValue("linked_companies", value);
                  //   formik.setFieldError("linked_companies", "");
                  // }
                }}
                // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                //   if (event.key === "Enter" && !event.defaultPrevented) {
                //     event.preventDefault();
                //     const inputValue = event.currentTarget["value"]?.trim();
                //     if (inputValue !== "") {
                //       const updatedValue = [...linked_companies, inputValue];
                //       formik.setFieldValue("linked_companies", updatedValue);
                //       formik.setFieldError("linked_companies", "");
                //     }
                //   }
                // }}
               
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
                    placeholder="Type the linked companies and press enter"
                    error={linked_companiesError ? true : false}
                    onChange={(e) => {
                      if (linked_companies?.includes(e?.target?.value)) {
                        setLinked_companiesError(true);
                      } else {
                        setLinked_companiesError(false);
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={linked_companiesError ? " Duplicate not allowed !" : ""}
                  />
                )}
              />
              <Box sx={{ marginTop: "-5px" }}>
                {errors?.linked_companies && (
                  <HelperText errorText={errors?.linked_companies} />
                )}
              </Box>
            </FullFieldValue>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#4a4a4a",
                opacity: '.8',
                marginLeft: "2px",
                paddingTop: "5px",
              }}
            >
              Please press the Enter key after typing each linked companies.
            </Typography>
          </FullFieldContainer> */}

          {/* <FullFieldContainer>
            <FullFieldLabel>
              Products <span className="detailastrics"></span>
            </FullFieldLabel>

            <FullFieldValue position={"relative"}>
              <Autocomplete
                size="small"
                sx={{ width: "100%" }}
                multiple
                id="tags-filled"
                options={[]}
                value={products}
                defaultValue={products}
                freeSolo
                onChange={(event: any, newValue) => {
                  if(event?.key == 'Backspace'){
                    let oldProducts = [...products];
                    oldProducts?.pop()
                    formik.setFieldValue("products", oldProducts);
                  }else{
                    let productsValue = event?.target?.value?.includes(",")
                    ? [...products, ...event?.target?.value?.split(",")]
                    : newValue;
                    formik.setFieldValue("products", productsValue);
                    formik.setFieldError("products", "");
                  }
                  // let value = newValue
                  //   .map((v) => FirstletterCapital(v?.trim()))
                  //   ?.filter(Boolean);

                  // if (newValue != null) {
                  //   formik.setFieldValue("products", value);
                  //   formik.setFieldError("products", "");
                  // }
                }}
                // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                //   if (event.key === "Enter" && !event.defaultPrevented) {
                //     event.preventDefault();
                //     const inputValue = event.currentTarget["value"]?.trim();
                //     if (inputValue !== "") {
                //       const updatedValue = [...products, inputValue];
                //       formik.setFieldValue("products", updatedValue);
                //       formik.setFieldError("products", "");
                //     }
                //   }
                // }}
                
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
                    placeholder="Type the products and press enter"
                    error={formik.errors.products || productsError ? true : false}
                    onChange={(e) => {
                      if (products?.includes(e?.target?.value)) {
                        setProductsError(true);
                      } else {
                        setProductsError(false);
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={productsError ? " Duplicate not allowed !" : ""}
                  />
                )}
              />
              <Box sx={{ marginTop: "-5px" }}>
                {errors?.products && (
                  <HelperText errorText={errors?.products} />
                )}
              </Box>
            </FullFieldValue>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#4a4a4a",
                opacity: '.8',
                marginLeft: "2px",
                paddingTop: "5px",
              }}
            >
              Please press the Enter key after typing each products.
            </Typography>
          </FullFieldContainer> */}
          {/* <FullFieldContainer>
            <FullFieldLabel>
              Related Categories <span className="detailastrics"></span>
            </FullFieldLabel>

            <FullFieldValue position={"relative"}>
              <Autocomplete
                size="small"
                sx={{ width: "100%" }}
                onChange={(event: any, newValue) => {
                  if(event?.key == 'Backspace'){
                    let oldRelatedCategories = [...related_categories];
                    oldRelatedCategories?.pop();
                    formik.setFieldValue("related_categories", oldRelatedCategories);
                  }else{
                    let newRelatedCategories = event?.target?.value?.includes(",")
                    ? [...related_categories, ...event?.target?.value?.split(",")]
                    : newValue;
                    formik.setFieldValue("related_categories", newRelatedCategories);
                    formik.setFieldError("related_categories", "");
                  }
                  // let value = newValue
                  //   .map((v) => FirstletterCapital(v?.trim()))
                  //   ?.filter(Boolean);

                  // if (newValue != null) {
                  //   formik.setFieldValue("related_categories", value);
                  //   formik.setFieldError("related_categories", "");
                  // }
                }}
                // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                //   if (event.key === "Enter" && !event.defaultPrevented) {
                //     event.preventDefault();
                //     const inputValue = event.currentTarget["value"]?.trim();
                //     if (inputValue !== "") {
                //       const updatedValue = [...related_categories, inputValue];
                //       formik.setFieldValue("related_categories", updatedValue);
                //       formik.setFieldError("related_categories", "");
                //     }
                //   }
                // }}
                multiple
                id="tags-filled"
                options={[]}
                value={related_categories}
                defaultValue={related_categories}
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
                    placeholder="Type the related categories and press enter"
                    error={formik.errors.related_categories || related_categoriesError ? true : false}
                    onChange={(e) => {
                      if (related_categories?.includes(e?.target?.value)) {
                        setRelated_categoriesError(true);
                      } else {
                        setRelated_categoriesError(false);
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={related_categoriesError ? " Duplicate not allowed !" : ""}
                  />
                )}
              />
              <Box sx={{ marginTop: "-5px" }}>
                {errors?.related_categories && (
                  <HelperText errorText={errors?.related_categories} />
                )}
              </Box>
            </FullFieldValue>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#4a4a4a",
                opacity: '.8',
                marginLeft: "2px",
                paddingTop: "5px",
              }}
            >
              Please press the Enter key after typing related categories.
            </Typography>
          </FullFieldContainer> */}
          {/* <FullFieldContainer>
            <FullFieldLabel>
              Keywords <span className="detailastrics"></span>
            </FullFieldLabel>

            <FullFieldValue position={"relative"}>
              <Autocomplete
                size="small"
                sx={{ width: "100%" }}
                onChange={(event: any, newValue: any) => {
                  if(event?.key == 'Backspace'){
                    let oldKeywords = [...Keywords];
                    oldKeywords?.pop();
                    formik.setFieldValue("Keywords", oldKeywords);
                  }else{
                    let newKeywords = event?.target?.value?.includes(",")
                    ? [...Keywords, ...event?.target?.value?.split(",")]
                    : newValue;
                     formik.setFieldValue("Keywords", newKeywords);
                    formik.setFieldError("Keywords", "");
                  }
                  // let value = newValue
                  //   .map((v) => FirstletterCapital(v?.trim()))
                  //   ?.filter(Boolean);

                  // if (newValue != null) {
                  //   formik.setFieldValue("Keywords", value);
                  //   formik.setFieldError("Keywords", "");
                  // }
                }}
                // onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                //   if (event.key === "Enter" && !event.defaultPrevented) {
                //     event.preventDefault();
                //     const inputValue = event.currentTarget["value"]?.trim();
                //     if (inputValue !== "") {
                //       const updatedValue = [...Keywords, inputValue];
                //       formik.setFieldValue("Keywords", updatedValue);
                //       formik.setFieldError("Keywords", "");
                //     }
                //   }
                // }}
                multiple
                id="tags-filled"
                options={[]}
                value={Keywords}
                defaultValue={Keywords}
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
                    placeholder="Type the Keywords and press enter"
                    error={formik.errors.Keywords || keywordsError ? true : false}
                    onChange={(e) => {
                      if (Keywords?.includes(e?.target?.value)) {
                        setKeywordsError(true);
                      } else {
                        setKeywordsError(false);
                      }
                    }}
                    InputLabelProps={{ shrink: true }}
                    helperText={keywordsError ? " Duplicate not allowed !" : ""}
                  />
                )}
              />
              <Box sx={{ marginTop: "-5px" }}>
                {errors?.Keywords && (
                  <HelperText errorText={errors?.Keywords} />
                )}
              </Box>
            </FullFieldValue>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#4a4a4a",
                opacity: '.8',
                marginLeft: "2px",
                paddingTop: "5px",
              }}
            >
              Please press the Enter key after typing keywords.
            </Typography>
          </FullFieldContainer> */}
          <Grid container>
            <Grid item xs={12} md={12}>
              <FullFieldContainer>
                <FullFieldLabel>
                 Description <span className="detailastrics">*</span>
                </FullFieldLabel>

                <FullFieldValue>
                  <TextareaAutosize
                    style={{
                      width: "100%",
                      minHeight: "60px",
                      maxHeight: 200,
                      overflowY: "scroll",
                      borderColor: errors?.description
                        ? "#e74c3c"
                        : "rgba(0, 0, 0, 0.23)",
                      borderRadius: "6px",
                      fontFamily: "Open Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#000000de",
                      lineHeight: "23px",
                      padding: "8px",
                      outline: "none",
                    }}
                    value={formik.values.description}
                    name="description"
                    onChange={handleInputChange}
                    placeholder="Enter description"
                  />
                  <Box sx={{ marginTop: "-5px !important" }}>
                    <ErrorMessage
                      className={`${errors.description && "MuiFormHelperText-root"
                        }`}
                    >
                      <>
                        {errors?.description && (
                          <HelperText errorText={errors?.description} />
                        )}
                      </>
                    </ErrorMessage>
                  </Box>
                </FullFieldValue>
              </FullFieldContainer>
            </Grid>
          </Grid>

          <Grid container className="add_ser_remaining">
            <Grid item xs={12}>
              <FullFieldContainer>
                <DescriptionTextContainer>
                  Maximum characters:{" "}
                  {`${Number(formik.values.description.length)}/256`}
                </DescriptionTextContainer>
              </FullFieldContainer>

              <FullFieldContainer>
                <DescriptionTextContainer>
                  Briefly describe the features of your brands
                </DescriptionTextContainer>
              </FullFieldContainer>
            </Grid>
          </Grid>

          <Divider variant="middle" sx={{ margin: "10px 0" }} />
          <Grid container pt={2}>
            <Grid item xs={12}>
              <Box>
                <SaveButtonContainer>
                  <>
                    <Blackoutlinebtn
                      borderRadius={"6px"}
                      height={"35px"}
                      onClick={() => cancelHandle()}
                    >
                      Cancel
                    </Blackoutlinebtn>
                    <Redoutlinebtn
                      type="submit"
                      borderRadius={"6px"}
                      height={"35px"}
                    >
                      {loading ? (
                        <ThreeDots
                          height="36px"
                          width="36px"
                          radius="9"
                          color="#D7282F"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      ) : (
                        <>{type == "add-brand" ? "Save" : "Update"}</>
                      )}
                    </Redoutlinebtn>
                  </>
                </SaveButtonContainer>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default AddBrand;

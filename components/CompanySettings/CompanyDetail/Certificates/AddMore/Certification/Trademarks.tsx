import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  SaveButtonContainer,
  FullFieldLabel,
  FullFieldValue,
  FullFieldContainer,
  FieldBorder,
  ImageFormatSpan,
} from "../../../commonStyles";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "@/components/common/buttons/ButtonsVariations";
import { FileUpload } from "@/components/common/uploadFile";
import { CustomDatePicker } from "@/components/common/datePicker";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import { ThreeDots } from "react-loader-spinner";
import { useFormik } from "formik";
import {
  apiClient,
  getUniqueListBy,
  imageFormatDocs,
  urlWithHttp,
} from "@/components/common/common";
import * as Yup from "yup";
import { toast } from "react-toastify";
import TextArea from "./TextArea";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  AssociationCategoryEditMode,
  AssociationCategoryMain,
  AssociationCategoryViewMode,
  BGHeading,
  ButtonWithText,
  CancelTextWithIcon,
  CategoryListBox,
  CategoryListBoxInner,
  EditCategorySection,
  EditDeleteButtons,
  EditTextWithIcon,
  ImportantNoteText,
  InnerScrollBox,
  SavedCategoryCase,
  SearchCommon,
  UploadImgBox,
} from "../../style";
import Auth from "@/auth/Auth";
import ProductSkeleton from "@/components/products/editProduct/productCategories/Skeleton";
const Trademarks = ({ editData, onClose }) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [sourceshow, setSourceShow] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<any>(
    editData?.associate_category ?? []
  );
  let editMode = Object.keys(editData).length > 0 ? true : false;
  const validation: any = Yup.object().shape({
    filling_no: Yup.string().required("Please enter registration/filling No."),
    name: Yup.string().required("Please enter trademark name"),
    start_date: Yup.date().required("Please select start date"),
    end_date: Yup.date()
      .required("Please select date of expiration")
      .min(
        Yup.ref("start_date"),
        "date of expiration can't be before Start date"
      ),
    certificate_url: Yup.string()
      .url("Please enter a valid URL (http:// or https://)")
      .nullable(),

    images: Yup.array().min(1, "Please upload trademark images"),
    message: Yup.string().max(350, "Max Characters Limit Reached!"),
    selectedCategory: Yup.array().min(1, "Please select category"),
  });
  const formik: any = useFormik({
    validateOnChange: false,
    validationSchema: validation,
    enableReinitialize: true,
    initialValues: {
      source_of_trademark: editData?.source_of_trademark ?? "authorized",
      source: editData?.source ?? "",
      filling_no: editData?.filling_no ?? "",
      start_date: editData?.start_date ?? "",
      end_date: editData?.end_date ?? "",
      name: editData?.name ?? "",
      message: editData?.message ?? "",
      images: editData?.images ?? [],
      type: "trademark",
      certificate_url: editData?.certificate_url ?? "",
      deleted_images_ids: [],
      selectedCategory: selectedList ?? [],
      status: editData?.status ?? "enable",
    },
    onSubmit: async (values) => {
      setLoader(true);
      let endPoints = editMode ? "edit" : "create";
      let formData = new FormData();
      formData.append("name", values?.name);
      formData.append(
        "associate_category",
        selectedList?.map((item) => item?.id)?.join(",")
      );
      formData.append("source_of_trademark", values?.source_of_trademark);
      formData.append("source", values?.source);
      formData.append("status", values?.status);
      formData.append("start_date", values?.start_date);
      formData.append("end_date", values?.end_date);
      formData.append("certificate_url", values?.certificate_url);
      formData.append("message", values?.message);
      formData.append("filling_no", values?.filling_no);
      for (let i = 0; i < values.images.length; i++) {
        if (!values?.images[i].id)
          formData.append("images[]", values?.images[i]);
      }
      formData.append("type", values?.type);
      if (endPoints == "edit") {
        if (values.deleted_images_ids.length > 0) {
          formData.append(
            "deleted_images_ids",
            values?.deleted_images_ids.join(",")
          );
        }
        formData.append("id", editData?.id);
      }
      let response = await apiClient(
        `company_profile/certificate/${endPoints}`,
        "post",
        {
          body: formData,
        },
        true
      );
      if (!response.status) {
        toast.error("Something went wrong!");
      }
      formik.resetForm();
      setSelectedList([]);
      setLoader(false);
      onClose(false, true);
    },
  });
  const [categoryList, setCategoryList] = useState<any>([]);
  const [cloneCategoryList, setCloneCategoryList] = useState<any>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const { values, errors } = formik;
  const [newCategory, setNewCategory] = useState<any>([]);

  useEffect(() => {
    if (isEditMode) {
      getCategoryList();
      EditModeFetchList();
    }
  }, [isEditMode]);

  useEffect(() => {
    if (editData?.associate_category?.length > 0) {
      setSelectedList(
        editData?.associate_category?.map((v, i) => ({
          ...v,
          level: i + 1,
        }))
      );
    }
  }, [editData]);
  useEffect(() => {
    if (values.source_of_trademark === "authorized") {
      setSourceShow(true);
    } else {
      setSourceShow(false);
    }
  }, [values.source_of_trademark]);

  const SelectedStyle = (level, id) => {
    const style = selectedList?.filter((v) => v.level === level && v.id === id);
    return style.length > 0;
  };

  const NewCategoryOnChangeHandler = (value, index) => {
    SearchValues(value, index);
    let newCategoryArray = [...newCategory];
    newCategoryArray[index] = value ? value : "";
    setNewCategory(newCategoryArray);
  };

  const SearchValues = (value, index) => {
    if (!value) {
      setCategoryList(cloneCategoryList);
    } else {
      let arr1 = [...cloneCategoryList];
      let data = arr1[index]?.data?.filter((val) => {
        return val.name.toLowerCase().includes(value.toLowerCase());
      });
      let state = [...categoryList];
      state[index] = { level: index + 1, data };
      setCategoryList(state);
    }
  };

  const EditModeFetchList = () => {
    setIsEditMode(true);
    let promises = selectedList.map(async (v) => {
      return await apiClient("categoryList", "post", {
        body: {
          parent: v.parent_id,
          user_id: Auth?.userData()?.id,
        },
      });
    });
    Promise.all(promises).then((data) => {
      setCategoryList([
        ...data.map((v, i) => ({ level: i + 1, data: v.data })),
        { level: data.length + 1, data: [] },
      ]);
      setCloneCategoryList([
        ...data.map((v, i) => ({ level: i + 1, data: v.data })),
        { level: data.length + 1, data: [] },
      ]);
    });
  };

  const getCategoryList = async (parentId = 0, level = 0, type = "new") => {
    let response = await apiClient("categoryList", "post", {
      body: { parent: parentId, user_id: Auth?.userData()?.id },
    });
    if (response.status) {
      if (type === "update") {
        let index = cloneCategoryList.findIndex((v) => v.level === level);
        let list = [...cloneCategoryList];
        if (index >= 0) {
          list[index] = { level, data: response.data };
        } else {
          list[level - 1] = { level, data: response.data };
        }
        setCategoryList([...list]);
        setCloneCategoryList([...list]);
        return;
      } else {
        let listExist = cloneCategoryList.filter((v) => v.level <= level);
        let updateList = [
          ...listExist,
          { level: level + 1, data: response.data },
        ];
        setCategoryList(updateList);
        setCloneCategoryList(updateList);
      }
      return response;
    }
  };

  const updateList = (parentId = 0, ele, level = 0, type = "new") => {
    formik.setFieldError("selectedCategory", "");
    setSelectedList((prev) => {
      const updatedList = prev.filter((item) => item.level < level);
      return [...updatedList, { ...ele, level }];
    });
    const getData =
      ele?.sub_category?.length > 0 &&
      ele?.sub_category?.filter((item) => item.parent_id == parentId);
    if (getData && getData.length > 0) {
      let listExist = cloneCategoryList.filter((v) => v.level <= level);
      let updateList = [...listExist, { level: level + 1, data: getData }];
      setCategoryList(updateList);
      setCloneCategoryList(updateList);
    } else {
      let listExist = cloneCategoryList.filter((v) => v.level <= level);
      setCategoryList(listExist);
      setCloneCategoryList(listExist);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    formik.setFieldError(name, "");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    formik.setFieldError("message", "");
    if (value.length > 350) {
      formik.setFieldValue("message", value.slice(0, 350));
      formik.setFieldError("message", "Max Characters Limit Reached!");
      return;
    }
    formik.setFieldValue("message", value);
  };

  const handleSaveCategory = () => {
    formik.setFieldValue("selectedCategory", selectedList);
    setIsEditMode(false);
  };
  let ListSkeleton = [1, 2, 3, 4];
  return (
    <>
      <Grid container p={2} pt={1} className="companydetail_addservice">
        <Grid item xs={12} lg={12}>
          <form className="test_report_tab" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <AssociationCategoryMain
                  sx={{
                    border: `${
                      errors.selectedCategory ? "1px solid #d32f2f" : ""
                    }`,
                  }}
                >
                  {isEditMode ? (
                    <AssociationCategoryEditMode>
                      {categoryList?.length == 0 && <ProductSkeleton />}
                      <InnerScrollBox>
                        {categoryList?.length > 0 &&
                          categoryList?.map((item, index) => {
                            if (item.level === 1 && index === 0) {
                              return (
                                <CategoryListBox>
                                  <SearchCommon>
                                    <TextField
                                      fullWidth
                                      id="standard-bare"
                                      variant="outlined"
                                      placeholder="Search..."
                                      onChange={(e) =>
                                        NewCategoryOnChangeHandler(
                                          e.target.value,
                                          0
                                        )
                                      }
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton>
                                            <SearchIcon />
                                          </IconButton>
                                        ),
                                      }}
                                    />
                                  </SearchCommon>
                                  <CategoryListBoxInner>
                                    <List>
                                      {item?.data?.length > 0 ? (
                                        getUniqueListBy(item.data, "name")?.map(
                                          (element: any, index: number) =>
                                            element?.name && (
                                              <ListItem
                                                disablePadding
                                                key={index}
                                                sx={{}}
                                              >
                                                <ListItemButton
                                                  sx={{
                                                    margin: "0 0 2px 0",
                                                    borderRadius: "2px",
                                                    "&.MuiButtonBase-root": {
                                                      background: SelectedStyle(
                                                        item.level,
                                                        element.id
                                                      )
                                                        ? "#FFECEC"
                                                        : "transparent",
                                                      "&:hover": {
                                                        background:
                                                          SelectedStyle(
                                                            item.level,
                                                            element.id
                                                          )
                                                            ? "#FFECEC"
                                                            : "rgba(0, 0, 0, 0.04)",
                                                      },
                                                    },
                                                  }}
                                                >
                                                  <ListItemText
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      e.stopPropagation();
                                                      if (
                                                        !SelectedStyle(
                                                          item.level,
                                                          element.id
                                                        )
                                                      ) {
                                                        updateList(
                                                          element.id,
                                                          element,
                                                          item.level
                                                        );
                                                      }
                                                    }}
                                                    sx={{
                                                      // background: SelectedStyle(
                                                      //   item.level,
                                                      //   element.id
                                                      // )
                                                      //   ? "#FFECEC"
                                                      //   : "transparent",
                                                      color: SelectedStyle(
                                                        item.level,
                                                        element.id
                                                      )
                                                        ? "#231f20"
                                                        : "#7B7979",
                                                      // padding: "4px",
                                                      // borderRadius: "4px",
                                                    }}
                                                    primary={element?.name}
                                                  />
                                                </ListItemButton>
                                              </ListItem>
                                            )
                                        )
                                      ) : (
                                        <>
                                          {ListSkeleton.map((v, i) => (
                                            <ListItem sx={{ padding: "0" }}>
                                              <ListItemButton
                                                sx={{ padding: "0" }}
                                              >
                                                <ListItemText
                                                  sx={{ padding: "0" }}
                                                >
                                                  <Skeleton
                                                    animation="wave"
                                                    variant="text"
                                                    width={"100px"}
                                                  />
                                                </ListItemText>
                                              </ListItemButton>
                                            </ListItem>
                                          ))}
                                        </>
                                      )}
                                    </List>
                                  </CategoryListBoxInner>
                                </CategoryListBox>
                              );
                            }
                          })}
                        {categoryList?.length > 0 &&
                          categoryList?.map((item, index) => {
                            if (item.level > 1 && item?.data?.length > 0) {
                              return (
                                <CategoryListBox>
                                  <SearchCommon>
                                    <TextField
                                      fullWidth
                                      id="standard-bare"
                                      variant="outlined"
                                      placeholder="Search..."
                                      onChange={(e) =>
                                        NewCategoryOnChangeHandler(
                                          e.target.value,
                                          index
                                        )
                                      }
                                      InputProps={{
                                        endAdornment: (
                                          <IconButton>
                                            <SearchIcon />
                                          </IconButton>
                                        ),
                                      }}
                                    />
                                  </SearchCommon>
                                  <CategoryListBoxInner>
                                    <List>
                                      {getUniqueListBy(item?.data, "name")?.map(
                                        (element: any, index) =>
                                          element?.name && (
                                            <ListItem disablePadding>
                                              <ListItemButton
                                                key={index}
                                                sx={{
                                                  margin: "0 0 2px 0",
                                                  borderRadius: "2px",
                                                  background: SelectedStyle(
                                                    item.level,
                                                    element.id
                                                  )
                                                    ? "#FFECEC"
                                                    : "transparent",
                                                  "&:hover": {
                                                    background: SelectedStyle(
                                                      item.level,
                                                      element.id
                                                    )
                                                      ? "#FFECEC"
                                                      : "rgba(0, 0, 0, 0.04)",
                                                  },
                                                }}
                                              >
                                                <ListItemText
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (
                                                      !SelectedStyle(
                                                        item.level,
                                                        element.id
                                                      )
                                                    ) {
                                                      updateList(
                                                        element.id,
                                                        element,
                                                        item.level
                                                      );
                                                    }
                                                  }}
                                                  style={{
                                                    // background: SelectedStyle(
                                                    //   item.level,
                                                    //   element.id
                                                    // )
                                                    //   ? "#FFECEC"
                                                    //   : "transparent",
                                                    color: SelectedStyle(
                                                      item.level,
                                                      element.id
                                                    )
                                                      ? "#231f20"
                                                      : "#7B7979",
                                                  }}
                                                  primary={element?.name}
                                                />
                                              </ListItemButton>
                                            </ListItem>
                                          )
                                      )}
                                    </List>
                                  </CategoryListBoxInner>
                                </CategoryListBox>
                              );
                            }
                          })}
                      </InnerScrollBox>
                      <EditDeleteButtons
                        sx={{ display: "flex", justifyContent: "right" }}
                      >
                        <EditTextWithIcon
                          className="savewithicon"
                          onClick={() => handleSaveCategory()}
                        >
                          <SaveOutlinedIcon />
                          <Typography variant="body1">Save</Typography>
                        </EditTextWithIcon>
                        <CancelTextWithIcon
                          className="cancelwithicon"
                          onClick={() => setIsEditMode(false)}
                        >
                          <CloseIcon />
                          <Typography>Cancel</Typography>
                        </CancelTextWithIcon>
                      </EditDeleteButtons>
                    </AssociationCategoryEditMode>
                  ) : (
                    <AssociationCategoryViewMode>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <BGHeading>
                            <Typography>
                              {" "}
                              Association Category
                              <span className="detailastrics">*</span>
                            </Typography>
                          </BGHeading>
                        </Grid>
                        {selectedList?.length == 0 && (
                          <Grid item xs={12}>
                            <ButtonWithText>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => setIsEditMode(true)}
                              >
                                Select Category
                              </Button>
                              <ImportantNoteText>
                                The corresponding category of the trademark must
                                be accurately filled in, otherwise it will
                                affect your use right on displaying products
                              </ImportantNoteText>
                            </ButtonWithText>
                          </Grid>
                        )}
                      </Grid>

                      <EditCategorySection>
                        <SavedCategoryCase>
                          {selectedList?.length > 0 &&
                            selectedList?.map((ele) => (
                              <Breadcrumbs
                                separator="›"
                                aria-label="breadcrumb"
                              >
                                <span>{ele?.name}</span>
                              </Breadcrumbs>
                            ))}
                        </SavedCategoryCase>
                        {selectedList?.length > 0 && (
                          <EditDeleteButtons>
                            <EditTextWithIcon
                              className="savewithicon"
                              onClick={() => setIsEditMode(true)}
                            >
                              <img
                                src={"/assets/EditPencil.svg"}
                                alt="editImage"
                                width={12}
                                height={12}
                              />
                              <Typography variant="body1">Edit</Typography>
                            </EditTextWithIcon>
                            <CancelTextWithIcon
                              className="cancelwithicon"
                              onClick={() => setSelectedList([])}
                            >
                              <CloseIcon />
                              <Typography>Delete</Typography>
                            </CancelTextWithIcon>
                          </EditDeleteButtons>
                        )}
                      </EditCategorySection>
                    </AssociationCategoryViewMode>
                  )}
                </AssociationCategoryMain>
                {errors?.selectedCategory && (
                  <span>
                    <img
                      src="/assets/error-outline-red.svg"
                      alt=""
                      style={{ width: "8px", height: "8px" }}
                    />
                    <span
                      style={{
                        marginLeft: "3px",
                        fontSize: "10px",
                        color: "#d7282f",
                      }}
                    >
                      {errors?.selectedCategory}
                    </span>
                  </span>
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Trademark Name <span className="detailastrics">*</span>
                  </FullFieldLabel>
                  <FullFieldValue position={"relative"}>
                    <TextField
                      inputProps={{
                        autoComplete: "off",
                      }}
                      style={{
                        width: "100%",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                      }}
                      variant="outlined"
                      size="small"
                      name="name"
                      type="text"
                      value={values?.name}
                      placeholder="Enter trademark name"
                      onChange={handleChange}
                      error={errors?.name ? true : false}
                    />
                    {errors?.name && (
                      <span
                        style={{
                          position: "absolute",
                          left: "0px",
                          bottom: "-14px",
                        }}
                      >
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          style={{ width: "8px", height: "8px" }}
                        />
                        <span
                          style={{
                            marginLeft: "3px",
                            fontSize: "10px",
                            color: "#d7282f",
                          }}
                        >
                          {errors?.name}
                        </span>
                      </span>
                    )}
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    URL/LINK
                  </FullFieldLabel>
                  <FullFieldValue>
                    <TextField
                      inputProps={{
                        autoComplete: "off",
                      }}
                      style={{
                        width: "100%",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                      }}
                      variant="outlined"
                      size="small"
                      name="certificate_url"
                      type="text"
                      value={values?.certificate_url}
                      placeholder="https://example.com"
                      onChange={handleChange}
                      error={Boolean(errors?.certificate_url)}
                      helperText={`${errors?.certificate_url ?? ""}`}
                    />
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Source of Trademark{" "}
                  </FullFieldLabel>
                  <FullFieldValue>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "10px",
                        backgroundColor: "#E8E8E8",
                        gap: "7px",
                        padding: "6px",
                        borderRadius: "6px",
                      }}
                    >
                      <BtnFilled
                        borderRadius={"6px"}
                        height={"25px"}
                        background={
                          values.source_of_trademark === "Own"
                            ? "#D7282F"
                            : "#E8E8E8"
                        }
                        colour={
                          values.source_of_trademark === "Own"
                            ? "white"
                            : "#231F20"
                        }
                        onClick={() => {
                          formik.setFieldValue("source_of_trademark", "Own");
                          setSourceShow(false);
                        }}
                      >
                        Own
                      </BtnFilled>
                      <BtnFilled
                        borderRadius={"6px"}
                        height={"25px"}
                        background={
                          values?.source_of_trademark === "authorized"
                            ? "#D7282F"
                            : "#E8E8E8"
                        }
                        colour={
                          values?.source_of_trademark === "authorized"
                            ? "white"
                            : "#231F20"
                        }
                        onClick={() => {
                          formik.setFieldValue(
                            "source_of_trademark",
                            "authorized"
                          );
                          setSourceShow(true);
                        }}
                      >
                        Authorized
                      </BtnFilled>
                    </div>
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>
              {sourceshow && (
                <Grid item xs={12} sm={6} md={4}>
                  <FullFieldContainer>
                    <FullFieldLabel className="certificatespacing">
                      Source
                    </FullFieldLabel>
                    <FullFieldValue>
                      <TextField
                        inputProps={{
                          autoComplete: "off",
                        }}
                        style={{
                          width: "100%",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                        }}
                        variant="outlined"
                        size="small"
                        name="source"
                        type="text"
                        value={values?.source}
                        placeholder="ATRCPO12255"
                        onChange={handleChange}
                        helperText={errors?.source ?? ""}
                        error={errors?.source ? true : false}
                      />
                    </FullFieldValue>
                  </FullFieldContainer>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Registration/Filling No.{" "}
                    <span className="detailastrics">*</span>
                  </FullFieldLabel>
                  <FullFieldValue position={"relative"}>
                    <TextField
                      style={{
                        width: "100%",
                        // paddingTop: "4px",
                        paddingBottom: "4px",
                      }}
                      variant="outlined"
                      size="small"
                      name="filling_no"
                      type="text"
                      value={values.filling_no}
                      placeholder="Enter registration/filling no."
                      onChange={handleChange}
                      error={errors?.filling_no ? true : false}
                    />
                    {errors?.filling_no && (
                      <span
                        style={{
                          position: "absolute",
                          left: "0px",
                          bottom: "-14px",
                        }}
                      >
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          style={{ width: "8px", height: "8px" }}
                        />
                        <span
                          style={{
                            marginLeft: "3px",
                            fontSize: "10px",
                            color: "#d7282f",
                          }}
                        >
                          {errors?.filling_no}
                        </span>
                      </span>
                    )}
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Start Date <span className="detailastrics">*</span>
                  </FullFieldLabel>
                  <FullFieldValue>
                    <FormControl
                      style={{
                        width: "100%",
                        height: "50%",
                        // paddingTop: "4px",
                      }}
                    >
                      <CustomDatePicker
                        name={"start_date"}
                        value={values.start_date || "0000-00-00"}
                        handleChange={handleChange}
                        errorText={errors?.start_date ?? ""}
                        error={errors?.start_date ? true : false}
                      />
                    </FormControl>
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Date of Expiration <span className="detailastrics">*</span>
                  </FullFieldLabel>
                  <FullFieldValue>
                    <FormControl style={{ width: "100%", height: "50%" }}>
                      <CustomDatePicker
                        name={"end_date"}
                        value={values.end_date || "0000-00-00"}
                        handleChange={handleChange}
                        errorText={errors?.end_date ?? ""}
                        error={errors?.end_date ? true : false}
                      />
                    </FormControl>
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Trademark Images <span className="detailastrics">*</span>
                    <ImageFormatSpan>{imageFormatDocs}</ImageFormatSpan>
                  </FullFieldLabel>
                  <UploadImgBox>
                    <FieldBorder
                      style={{
                        position: "relative",
                        border: `${errors.images ? "1px solid #d32f2f" : ""}`,
                      }}
                    >
                      <FileUpload
                        fileType={".pdf,.doc,.docx,.png,.jpeg,.jpg,.xls,.xlsx"}
                        name="transaction_documents"
                        files={values.images}
                        updateFiles={(e) => {
                          if (e?.length > 3) {
                            formik.setFieldError(
                              "images",
                              "Please upload maximum 3 photos"
                            );
                            return;
                          } else {
                            formik.setFieldError("images", "");
                            formik.setFieldValue("images", [...e]);
                          }
                        }}
                        removedFile={(deletedID) =>
                          formik.setFieldValue("deleted_images_ids", deletedID)
                        }
                      />
                      {errors.images ? (
                        <span
                          style={{
                            color: "#d32f2f",
                            position: "absolute",
                            bottom: "-16px",
                            fontSize: "10px",
                            fontWeight: "400",
                            marginLeft: "-3px",
                          }}
                        >
                          <span>
                            <img
                              src="/assets/error-outline-red.svg"
                              alt=""
                              style={{ width: "8px", height: "8px" }}
                            />
                          </span>{" "}
                          {errors.images}
                        </span>
                      ) : (
                        ""
                      )}
                    </FieldBorder>
                  </UploadImgBox>
                </FullFieldContainer>
              </Grid>

              <Grid item xs={6} sm={4} md={6}>
                <FullFieldContainer>
                  <FullFieldLabel className="certificatespacing">
                    Status
                  </FullFieldLabel>
                  <FullFieldValue className="lala">
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        name="status"
                        size="small"
                        value={formik.values.status}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value={"enable"}>Enable</MenuItem>
                        <MenuItem value={"disable"}>Disable</MenuItem>
                      </Select>
                    </FormControl>
                  </FullFieldValue>
                </FullFieldContainer>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FullFieldContainer>
                  <TextArea
                    values={values.message}
                    handleInputChange={handleInputChange}
                    errors={errors.message}
                    count={350}
                    placeholder={"Enter Approved Goods"}
                    name="Approved Goods"
                  />
                </FullFieldContainer>
              </Grid>
            </Grid>
            <Divider variant="middle" style={{ margin: "10px 0" }} />
            <Grid item xs={12}>
              <SaveButtonContainer>
                <Blackoutlinebtn
                  onClick={() => {
                    onClose(false), formik.resetForm();
                  }}
                >
                  Cancel
                </Blackoutlinebtn>
                <Redoutlinebtn type="submit" style={{ height: "36px" }}>
                  {loader ? (
                    <ThreeDots
                      height="36"
                      width="40"
                      radius="9"
                      color="#d7282e"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : editMode ? (
                    "Update"
                  ) : (
                    "Save"
                  )}
                </Redoutlinebtn>
              </SaveButtonContainer>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default Trademarks;

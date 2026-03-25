import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  AddMoreStripe,
  AddNewProductcatalogue,
  BrowseBox,
  BrowseIconC,
  BtmActiontns,
  CBrowseText,
  CLUpImageName,
  CLUploadImagRow,
  CLUploadImageCol,
  CatelogDes,
  CatelogMainHeading,
  CatelogTableCoulmn,
  CatelogWrapper,
  CatelogeWhiteContainer,
  CommonRedOutineBtn,
  CreateCatalogueCNtent,
  CreateSearchCommon,
  CreateTableTabs,
  // DataGridStyle,
  FixedWidthBox,
  FlexArea,
  ListComonent,
  ListTableContainer,
  MainDialogueContent,
  ModalHeader,
  ModalTitle,
  OuterBox,
  ParentSearchedCategoryList,
  SearchContainer,
  SearchedCategoryList,
  Section,
  SelectBoxOuter,
  SelectBoxOuterInner,
  SelectHeading,
  SelectScrollBox,
  Selectdes,
  SettingFormBox,
  SmallHeading,
  SpecificationBox,
  SpecificationBtn,
  SpecificationSelect,
  TextFieldDiv,
} from "./style";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGridPro } from "@mui/x-data-grid-pro";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useAppDispatch } from "redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import HelperText from "../CompanySettings/CompanyDetail/Common/helperText";
import { isArray } from "lodash";
import { useRouter } from "next/router";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  apiClient,
  convertSize,
  getFileExtension,
  imageSize,
  imageSizeMessage,
  imageType,
  imageTypeMessage,
} from "../common/common";
import { ThreeDots } from "react-loader-spinner";
import { HeaderCellText } from "../products/listProduct/styles";

import CatalogSkeleton from "./catalogSkeleton";
import Link from "next/link";
import { toast } from "react-toastify";
import DeniedPopup from "./DeniedPopup";
import { DataGridStyle } from "../common/commonStyle";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiTypography-h6": {
    color: "#223354",
    fontSize: "14px",
    fontWeight: 700,
    padding: 0,
  },
  "& .MuiDialog-paper": {
    padding: "16px 18px",
    width: "320px",
    maxWidth: "320px",
  },
}));

const BootstrapDialog2 = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "700px",
    maxWidth: "700px",
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateCatalog = () => {
  const dispatch = useAppDispatch();
  const router: any = useRouter();
  const columns: any = [
    {
      field: "id",
      headerName: "Sr. No.",
      minWidth: 50,
      flex: 0.5,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const rowIndex = params.api.getRowIndex(params.id) + 1;
        return <>{rowIndex}</>;
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "unique_number",
      headerName: "Product Id",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        let productId=params?.id
        return <>{productId}</>;
      },
    },

    {
      field: "model_number",
      headerName: "Model Number",
      minWidth: 100,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
    },
  ];

  /*** Specification Popup libraries ***/
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleClickOpen = async () => {
    await getSpecificationList();
    setOpen(true);
  };
  const handleClose2 = () => {
    router.push("/catalog/List");
    setSpecificationError(false);
    setOpen(false);
  };
  const [Files, setFiles] = useState<any>([]);
  const [productLoader, setProductLoader] = useState<boolean>(false);
  const [categoryLoader, setCategoryLoader] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [addLoader, setAddLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [filterTerm, setFilterTerm] = useState<any>([]);
  const [parentCategory, setParentCategory] = useState<any>([]);
  const [specifications, setSpecifications] = useState<any>([]);
  const [specificationLoader, setSpecificationLoader] = useState(false);
  const [specificatinError, setSpecificationError] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [filterSubCategoryList, setFilterSubCategoryList] = useState<any>([]);
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState("");
  const [simpleProduct, setSimpleProduct] = useState([]);

  const handleClick = (id) => {
    const updatedData = specifications.map((item) =>
      item.attribute_id === id ? { ...item, status: !item?.status } : item
    );
    setSpecifications(updatedData);
  };

  useEffect(() => {
    const fetchList = async () => {
      setCategoryLoader(true);
      let response: any = await apiClient(`product/my_category_list`, "get");
      if (response?.status == 200) {
        setParentCategory(response?.data);
        setFilterTerm(response?.data);
        setCategoryLoader(false);
      } else {
        setCategoryLoader(false);
      }
    };
    fetchList();
    FetchProductList(2);
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const ValidateField = (field: string) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  const validation = Yup.object().shape({
    category: Yup.string().required("Please select cateogry"),
    name: Yup.string()
      .required("Please enter catalog name")
      .max(100, "Catalog name is too long. Please limit it to 50 characters."),
    image: Yup.array()
      .min(1, "Please upload at least one image")
      .max(3, "Please upload maximum 3 images")
      .required("Please upload a image"),
    product_list: Yup.array()
      .min(1, "Please select at least one product")
      .required("Please select product"),
  });
  let formik: any = useFormik({
    initialValues: {
      name: "",
      sector_category: "",
      category: "",
      sub_category: "",
      image: [],
      product_list: [],
      specifications_id: [],
      subcategory: "",
      product_list2: [],
      upload_source: "existing",
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      saveNewCatalog(values);
    },
  });

  const saveNewCatalog = async (values) => {
    if (addLoader) return;
    setAddLoader(true)
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("sector_category", values.sector_category);
    formData.append("sub_category", values.sub_category);
    formData.append("product_list", values.product_list);
    formData.append("upload_source", values.upload_source);
    values.image.forEach((file, index) => {
      formData.append(`image[${index}]`, file);
    });

    /// return false;
    try {
      let response = await apiClient(
        "product/catalog",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status === 200 || response.status == true) {
        toast.success("Product catalog created successfully");
        router.push("/catalog/List");
        /// setOpenSuccess(true);
      } else if (response.status === 201 || response?.status === false) {
        toast.error("The name has already been taken.");
      } else {

      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAddLoader(false);
    }
  };

  const getSpecificationList = async () => {
    setSpecificationLoader(true);
    let response = await apiClient(
      "product/catalog_specifications_list",
      "POST",
      {
        body: {
          product_ids: formik?.values?.product_list?.join(),
        },
      }
    );

    if (response.status === 200 || response.status == true) {
      let data = response?.data;
      setSpecificationLoader(false);
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            item.status = true;
          }
        });
        setSpecifications(data);
      }
    }
  };
  const addFiles = (e: any) => {
    const newFiles = e.target.files;
    const newFilesArray = Array.from(newFiles);
    const totalImages = Files.length + newFilesArray.length;
    if (totalImages > 3) {
      formik.setFieldError("image", "Please upload a maximum of 3 images");
      formik.setFieldTouched("image", true);
      setTimeout(() => {
        formik.setFieldError("image", "");
      }, 2000);
      return;
    }
    const invalidFileType = newFilesArray.filter((file: File) => {
      return !["image/jpeg", "image/jpg", "image/png"].includes(file.type);
    });

    const invalidFileSize = newFilesArray.filter((file: File) => {
      return convertSize(file.size, "MB") > 2;
    });

    if (invalidFileType.length > 0) {
      formik.setFieldError("image", "Please upload only PNG and JPG images");
      formik.setFieldTouched("image", true);
      setTimeout(() => {
        formik.setFieldError("image", "");
      }, 2000);
      return;
    }
    if (invalidFileSize.length > 0) {
      formik.setFieldError("image", "File size too large: Max size is 2MB");
      formik.setFieldTouched("image", true);
      setTimeout(() => {
        formik.setFieldError("image", "");
      }, 2000);
      return;
    }

    const updatedFiles = [...Files, ...newFilesArray];
    setFiles(updatedFiles);
    formik.setFieldValue("image", updatedFiles);
    formik.setFieldError("image", "");
    formik.setFieldTouched("image", true);
  };

  const removeFile = (id: number, index: number) => {
    if (id) {
      setFiles((prev: any) => {
        let file = prev.filter((element: any) => element?.id !== id);
        return file;
      });
      formik.setFieldValue("image", Files);
      formik.setFieldError("image", "");
    } else {
      setFiles((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
      formik.setFieldValue("image", Files);
      formik.setFieldError("image", "");
    }
  };

  const [isEmpty, setIsEmpty] = useState(false);

  const FetchProductList = async (category) => {
    setProductLoader(true);
    let response = await apiClient("product/approved_product/list", "get", {
      body: { category_id: category, product_type: "simple", published: 3 },
    });

    if (response.status === 200) {
      const filteredProducts = response.data;
      if (filteredProducts.length > 0) {
        setProducts(
          filteredProducts.map((v: any, i: any) => ({ ...v, sr_no: i + 1 }))
        );
      } else {
        setProducts([]);
      }
    } else {
      setIsEmpty(true);
    }
    setProductLoader(false);
  };

  const simpleProductList = async () => {
    setProductLoader(true);
    try {
      let res = await apiClient(`product/simple_product/list`, "get");
      if (res?.status === 200) {
        setSimpleProduct(res.data);
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setProductLoader(false);
    }
  };

  useEffect(() => {
    simpleProductList();
  }, []);

  const handleSectorChanges = async (sector_id: any) => {
    let cat = parentCategory.filter(
      (category) => category.parent_id == sector_id
    );
    setFilterCategoryList(cat[0]?.child_categories);
    //cat0 means power sector
  };
  // if(filterCategoryList>0){}

  const handleCategoryChange = async (category: any) => {
    setFilterSubCategoryList(category?.sub_categories);
  };

  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    if (newValue === "1") {
      formik.setFieldValue("product_list", []);
      formik.setFieldError("product_list", "");
      formik.setTouched({ ...formik.touched, product_list: false });

      formik.setFieldError("name", "");
      formik.setFieldError("image", "");
      formik.setTouched({
        ...formik.touched,
        name: false,
        image: false,
      });
    } else if (newValue === "2") {
      setSelectedRow([]);
      setSelectedRow(null);

      formik.setFieldError("name", "");
      formik.setFieldError("image", "");
      formik.setFieldError("product_list", "");
      formik.setTouched({
        ...formik.touched,
        name: false,
        image: false,
        product_list: false,
      });
    }
  };

  const handleSubmit = async () => {

    if (addLoader) return;

    setAddLoader(true);

    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("category", formik.values.category);
    formData.append("sector_category", formik.values.sector_category);
    formData.append("sub_category", formik.values.sub_category);
    formData.append("product_list", formik.values.product_list);
    formData.append("upload_source", "bulk_upload");

    formik.values.image.forEach((file, index) => {
      formData.append(`image[${index}]`, file);
    });

    try {
      let response = await apiClient(
        "product/catalog",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status === 200 || response.status === true) {
        const data = response.data;
        const fullUrl = `${window.location.origin}/catalog/bulkupload/${data.id}?catalogName=${formik?.values?.name}`;
        router.push(fullUrl);
        toast.success("New Product added successfully");

      } else {
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setAddLoader(false);
    }
  };
  const [newParent, setNewParent] = useState<string | null>(null);
  const [newChild, setNewChild] = useState<string | null>(null);
  const [newChild1, setNewChild1] = useState<string | null>(null);

  // Default Values For CAtegorty subcategory
  useEffect(() => {
    if (!formik.values.category && parentCategory?.length > 0) {
      const fc = parentCategory[0];

      // Set default parent category
      formik.setFieldValue("sector_category", fc?.parent_id);
      setNewParent(fc?.parent_id);
      handleSectorChanges(fc?.parent_id);

      // Set default first child category
      if (fc.child_categories && fc.child_categories.length >= 1) {
        const firstSubCat = fc.child_categories[2];
        setNewChild(firstSubCat.id);
        formik.setFieldValue("category", firstSubCat.id);
        handleCategoryChange(firstSubCat.id);
        setFilterSubCategoryList(firstSubCat?.sub_categories);
      }

      // Set default second child category if available
      if (fc.child_categories && fc.child_categories.length >= 2) {
        const secondSubcategory = fc.child_categories[1];
        setNewChild1(secondSubcategory?.id);
      }
    }
  }, [formik, parentCategory]);
  const [selectName, setSelectName] = useState<any>("");
  const handleSelectionChange = (newSelection: any[]) => {
    const productId = newSelection.length > 0 ? newSelection[0] : null;

    if (productId) {
      const selectedData = products.filter(
        (product: { id: any }) => product.id === productId
      );
      if (selectedData.length > 0) {
        setSelectedRow(productId);
        const nameData = selectedData[0]?.name;

        if (nameData) {
          localStorage.setItem("cat_selected_product", nameData);
          localStorage.setItem("catalog_product_id", productId);

          formik.setFieldValue("product_list", productId);
          formik.setFieldTouched("product_list", true);
          formik.setFieldValue("upload_source", "bulk");
        } else {
          console.error("Selected product has no name");
        }
      }
    } else {
      setSelectedRow(null);
      localStorage.removeItem("cat_selected_product");
      localStorage.removeItem("catalog_product_id");

      formik.setFieldValue("product_list", "");
      formik.setFieldTouched("product_list", false);
      formik.setFieldValue("upload_source", "");
    }
  };
  const filteredCategories = filterCategoryList?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSubCategoryChange = (e) => {
    setSubCategorySearchTerm(e.target.value);
  };
  const filteredSubCategories = filterSubCategoryList?.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(subCategorySearchTerm.toLowerCase())
  );

  const addNewProduct = async () => {
    let isValid = true;
    if (!formik.values.name || formik.values.name.trim() === "") {
      formik.setFieldError("name", "Please enter catalog name");
      formik.setFieldTouched("name", true);
      isValid = false;
      return
    }
    if (formik.values.image.length === 0) {
      formik.setFieldError("image", "Please upload at least one image.");
      formik.setFieldTouched("image", true);
      isValid = false;
      return
    }
    if (
      !formik.values.product_list ||
      formik.values.product_list.length === 0
    ) {
      toast.error("Please select at least one product.");
      formik.setFieldTouched("product_list", true);
      isValid = false;
      return;
    }

    if (isValid) {
      await handleSubmit();
    }
  };

  const handleRedirection = () => {
    router.push("/catalog/List");
  };

  return (
    <>
      {isEmpty ? (
        <Box>
          <DeniedPopup callBackFunction={handleRedirection} />
        </Box>
      ) : products?.length > 0 && !isEmpty ? (
        <div className="full_page">
          <Box>
            <ProfileHeader text={"Catalog"} />
          </Box>
          <CatelogeWhiteContainer>
            <CatelogWrapper>
              {categoryLoader ? (
                <CatalogSkeleton />
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <SelectHeading variant="h6">
                    Select Your Category
                  </SelectHeading>
                  <Selectdes variant="body1">
                    Add a few details to complete your catalog
                  </Selectdes>

                  <CreateCatalogueCNtent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <SelectBoxOuter>
                          <SelectScrollBox>
                            <FixedWidthBox>
                              <SelectBoxOuterInner>
                                <ParentSearchedCategoryList
                                  sx={{ width: "100%" }}
                                >
                                  {/* 🙌 */}
                                  <ListComonent>
                                    {parentCategory?.length > 0 &&
                                      parentCategory.map((sector, index) => {
                                        // Log the sector details for debugging

                                        return (
                                          <ListItem
                                            className={`${
                                              formik.values.sector_category ===
                                                sector?.parent_id ||
                                                newParent === sector?.parent_id
                                                ? "SelectedCatelog"
                                                : ""
                                              }`}
                                            disablePadding
                                            key={sector?.parent_id}
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "sector_category",
                                                sector?.parent_id
                                              );
                                              formik.setFieldError(
                                                "sector_category",
                                                ""
                                              );
                                              setNewParent(sector.parent_id);
                                              handleSectorChanges(
                                                sector?.parent_id
                                              );
                                            }}
                                          >
                                            <ListItemButton>
                                              <ListItemIcon>
                                                <img
                                                  src={sector?.parent_icon}
                                                  width="20px"
                                                  alt="icon"
                                                />
                                              </ListItemIcon>
                                              <ListItemText
                                                primary={sector?.parent_name}
                                              />
                                            </ListItemButton>
                                          </ListItem>
                                        );
                                      })}
                                  </ListComonent>
                                </ParentSearchedCategoryList>
                                {formik?.errors?.parentCategory && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <WarningAmberOutlinedIcon
                                      style={{
                                        fontSize: "9px",
                                        margin: "0px 4px 0 0",
                                        color: "#d7282f",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: "10px",
                                        color: "#d7282f !important",
                                      }}
                                    >
                                      {formik.errors.parentCategory}
                                    </Typography>
                                  </Box>
                                )}
                              </SelectBoxOuterInner>
                            </FixedWidthBox>
                            <FixedWidthBox>
                              <SelectBoxOuterInner>
                                <CreateSearchCommon className="Catalog-AddCategory">
                                  <TextField
                                    fullWidth
                                    size="small"
                                    id="standard-bare"
                                    variant="outlined"
                                    onChange={handleChange}
                                    placeholder="Search"
                                    InputProps={{
                                      startAdornment: (
                                        <IconButton>
                                          <SearchIcon />
                                        </IconButton>
                                      ),
                                    }}
                                  />
                                </CreateSearchCommon>
                                <SearchedCategoryList>
                                  <ListComonent>
                                    {filteredCategories?.length > 0 &&
                                      filteredCategories?.map(
                                        (category, index) => (
                                          <ListItem
                                            className={
                                              // } //     : "" //     ? "SelectedCatelog" //   (formik?.values?.category || newChild) //   category?.id == // {
                                              `${
                                                formik.values.category ===
                                                category?.id ||
                                                newChild === category?.id
                                                ? "SelectedCatelog"
                                                : ""
                                              }
                                        }`
                                            }
                                            disablePadding
                                            key={category?.id}
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "category",
                                                category?.id
                                              );
                                              setNewChild(category?.id);
                                              formik.setFieldError(
                                                "category",
                                                ""
                                              );

                                              handleCategoryChange(category);
                                            }}
                                          >
                                            <ListItemButton>
                                              <ListItemIcon>
                                                <img
                                                  src={category?.icon}
                                                  width="20px"
                                                  alt=""
                                                />
                                              </ListItemIcon>
                                              <ListItemText
                                                primary={category?.name}
                                              />
                                            </ListItemButton>
                                          </ListItem>
                                        )
                                      )}
                                  </ListComonent>
                                </SearchedCategoryList>
                                {formik?.errors?.category && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <WarningAmberOutlinedIcon
                                      style={{
                                        fontSize: "9px",
                                        margin: "0px 4px 0 0",
                                        color: "#d7282f",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: "10px",
                                        color: "#d7282f !important",
                                      }}
                                    >
                                      {formik.errors.category}
                                    </Typography>
                                  </Box>
                                )}
                              </SelectBoxOuterInner>
                            </FixedWidthBox>
                            <FixedWidthBox>
                              <SelectBoxOuterInner>
                                <CreateSearchCommon className="Catalog-AddCategory">
                                  <TextField
                                    fullWidth
                                    size="small"
                                    id="standard-bare"
                                    variant="outlined"
                                    onChange={handleSubCategoryChange}
                                    placeholder="Search"
                                    InputProps={{
                                      startAdornment: (
                                        <IconButton>
                                          <SearchIcon />
                                        </IconButton>
                                      ),
                                    }}
                                  />
                                </CreateSearchCommon>
                                <SearchedCategoryList>
                                  <ListComonent>
                                    {filteredSubCategories?.length > 0 &&
                                      filteredSubCategories?.map(
                                        (sub_category, index) => (
                                          <ListItem
                                            className={`${
                                              sub_category?.id ===
                                                formik?.values?.sub_category ||
                                                newChild1 === sub_category?.id
                                                ? "SelectedCatelog"
                                                : ""
                                              }`}
                                            disablePadding
                                            key={sub_category?.id}
                                            onClick={() => {
                                              formik.setFieldValue(
                                                "sub_category",
                                                sub_category?.id
                                              );
                                              setNewChild1(sub_category?.id);

                                              formik.setFieldError(
                                                "sub_category",
                                                ""
                                              );
                                            }}
                                          >
                                            <ListItemButton>
                                              <ListItemText
                                                primary={sub_category?.name}
                                              />
                                            </ListItemButton>
                                          </ListItem>
                                        )
                                      )}
                                  </ListComonent>
                                </SearchedCategoryList>
                                {formik?.errors?.sub_category && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <WarningAmberOutlinedIcon
                                      style={{
                                        fontSize: "9px",
                                        margin: "0px 4px 0 0",
                                        color: "#d7282f",
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: "10px",
                                        color: "#d7282f !important",
                                      }}
                                    >
                                      {formik.errors.sub_category}
                                    </Typography>
                                  </Box>
                                )}
                              </SelectBoxOuterInner>
                            </FixedWidthBox>
                          </SelectScrollBox>
                        </SelectBoxOuter>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <SelectBoxOuter>
                          <SelectHeading variant="h6">
                            Configure Your Settings
                          </SelectHeading>
                          <Selectdes variant="body1">
                            Add a few details to complete your catalog
                          </Selectdes>
                          <SettingFormBox
                          // component="form"
                          >
                            <TextFieldDiv>
                              <TextField
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                id="outlined-basic"
                                label="Catalog Name"
                                placeholder="Catalog Name"
                                variant="outlined"
                                onChange={(e) => {
                                  const inputValue = e.target.value.trimStart();

                                  if (inputValue.length <= 100) {
                                    formik.setFieldValue("name", inputValue);
                                    formik.setFieldError("name", "");
                                  } else {
                                    formik.setFieldError(
                                      "name",
                                      "Catalog name content is too long. Please limit it to 100 character."
                                    );
                                  }
                                  formik.setFieldTouched("name", true, false);
                                }}
                                onBlur={(e) => {
                                  formik.handleBlur(e);
                                  formik.setFieldError("name", "");
                                }}
                                value={formik.values.name}
                                error={ValidateField("name")}
                              />

                              {formik?.errors?.name && (
                                <Box
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <WarningAmberOutlinedIcon
                                    style={{
                                      fontSize: "9px",
                                      margin: "0px 4px 0 0",
                                      color: "#d7282f",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      fontSize: "10px",
                                      color: "#d7282f !important",
                                    }}
                                  >
                                    {formik.errors.name}
                                  </Typography>
                                </Box>
                              )}
                            </TextFieldDiv>

                            <Box sx={{ position: "relative" }}>
                              <TextFieldDiv>
                                <TextField
                                  fullWidth
                                  id="outlined-read-only-input"
                                  label="Upload File"
                                  multiline
                                  rows={5}
                                  InputLabelProps={{ shrink: true }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                  error={ValidateField("image")}
                                />

                                <BrowseIconC>
                                  <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                  >
                                    <BrowseBox>
                                      <img
                                        src="/assets/images/crm/browsefile_icon.svg"
                                        alt="Edit"
                                        width={35}
                                        height={30}
                                      />
                                      <CBrowseText>Upload an Image</CBrowseText>
                                    </BrowseBox>
                                    <VisuallyHiddenInput
                                      type="file"
                                      accept={"image/*"}
                                      multiple
                                      onChange={(e) => {
                                        addFiles(e);
                                        e.target.value = null;
                                      }}
                                    />
                                  </Button>
                                </BrowseIconC>
                                {Files &&
                                  isArray(Files) &&
                                  Files?.length > 0 && (
                                    <CLUploadImagRow>
                                      {Files &&
                                        isArray(Files) &&
                                        Files?.length > 0 &&
                                        Files?.map((ele, index) => {
                                          return (
                                            <CLUploadImageCol>
                                              <img
                                                src={URL.createObjectURL(ele)}
                                                alt=""
                                                height="18px"
                                              />
                                              <CLUpImageName>
                                                <Typography className="imagenname">
                                                  {ele?.file_original_name ||
                                                    ele?.name}
                                                </Typography>
                                                <Typography variant="body2">
                                                  {getFileExtension(ele?.name)}
                                                </Typography>
                                              </CLUpImageName>
                                              <CancelRoundedIcon
                                                onClick={() =>
                                                  removeFile(ele?.id, index)
                                                }
                                              />
                                            </CLUploadImageCol>
                                          );
                                        })}
                                    </CLUploadImagRow>
                                  )}
                                {formik.errors?.image && (
                                  <HelperText
                                    errorText={formik?.errors?.image}
                                  />
                                )}
                              </TextFieldDiv>
                            </Box>
                          </SettingFormBox>
                        </SelectBoxOuter>
                      </Grid>
                    </Grid>
                  </CreateCatalogueCNtent>

                  <ListTableContainer>
                    <CreateTableTabs
                      sx={{ width: "100%", typography: "body1" }}
                    >
                      <TabContext value={value}>
                        <Box
                          sx={{
                            borderBottom:
                              value === "1" ? "1px solid #ddd" : "1px solid #ddd",
                          }}
                        >
                          <Tabs
                            onChange={handleChangeTab}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            value={value}
                          >
                            <Tab
                              label="Add Existing Product to catalog"
                              value="1"
                            />
                            <Tab
                              label="Add New Product to catalog"
                              value="2"
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value="1">
                          <CatelogTableCoulmn
                            sx={{
                              height:600,
                              width: "100%",
                              margin: "1rem 0",
                            }}
                          >
                            {/* Add Existing Products To the catalogue */}
                            <DataGridPro
                              // autoHeight
                              rows={products}
                              columns={columns}
                              loading={productLoader}
                              rowHeight={38}
                              headerHeight={40}
                              pagination
                              pageSize={10}
                              checkboxSelection
                              sx={DataGridStyle}
                              selectionModel={formik.values.product_list}
                              onSelectionModelChange={(ids) => {
                                formik.setFieldValue("product_list", ids);
                                formik.setFieldError("product_list", "");
                              }}
                            />
                          </CatelogTableCoulmn>
                            <BtmActiontns
                              sx={{
                                justifyContent: "right",
                                margin: "16px 0 0 0",
                              }}
                            >
                              {formik?.values?.product_list?.length > 0 && (
                                <></>
                              )}
                              <CommonRedOutineBtn
                                variant="outlined"
                                onClick={handleClose2}
                              >
                                Previous Page
                              </CommonRedOutineBtn>
                              <CommonRedOutineBtn
                                variant="outlined"
                                type="submit"
                                onClick={() => {
                                  if (
                                    formik.values.product_list?.length === 0
                                  ) {
                                    toast.error(
                                      "Please select at least one product."
                                    );
                                    return;
                                  }
                                }}
                              >
                                {addLoader ? (
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
                                  <>Save Catalog</>
                                )}
                              </CommonRedOutineBtn>
                            </BtmActiontns>
                        </TabPanel>
                        <TabPanel value="2">
                          <AddNewProductcatalogue>
                            <AddMoreStripe>
                              <Typography>
                                Select a Product for reference to create/Add
                                more products
                              </Typography>
                            </AddMoreStripe>
                            <CatelogTableCoulmn
                              sx={{ height: 528, width: "100%" }}
                            >
                              <DataGridPro
                                rows={simpleProduct}
                                key="ddd"
                                columns={columns}
                                loading={productLoader}
                                rowHeight={38}
                                headerHeight={40}
                                pageSize={10}
                                pagination
                                checkboxSelection
                                sx={DataGridStyle}
                                selectionModel={selectedRow ? selectedRow : []}
                                onSelectionModelChange={(newSelection) =>
                                  handleSelectionChange(newSelection)
                                }
                              />
                            </CatelogTableCoulmn>
                              <BtmActiontns
                                sx={{
                                  justifyContent: "right",
                                  margin: "16px 0 0 0",
                                }}
                              >
                                <CommonRedOutineBtn
                                  variant="outlined"
                                  onClick={handleClose2}
                                >
                                  Previous Page
                                </CommonRedOutineBtn>
                                <CommonRedOutineBtn
                                  variant="outlined"
                                  type="button"
                                  onClick={async () => {
                                    if (selectedRow?.length === 0) {
                                      toast.error(
                                        "Please select at least one product."
                                      );
                                      return;
                                    } else {
                                      await addNewProduct();
                                    }
                                  }}
                                >
                                  {/* {router.push(`bulkupdate/${formik.values.product_list.slice(0,-2)}`)} */}
                                  {addLoader ? (
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
                                    <>Next</>
                                  )}
                                </CommonRedOutineBtn>
                                {/* </Link> */}
                              </BtmActiontns>
                          </AddNewProductcatalogue>
                        </TabPanel>
                      </TabContext>
                    </CreateTableTabs>
                  </ListTableContainer>
                </form>
              )}
            </CatelogWrapper>
            <React.Fragment>
              <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={openSuccess}
              >
                <DialogContent>
                  <MainDialogueContent>
                    <img src="/assets/done-icon.svg" width={60} />
                    <Typography variant="h5" gutterBottom>
                      Catalog Created
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      Your catalog has been created
                    </Typography>
                  </MainDialogueContent>
                </DialogContent>
                <Box p={1}>
                  <BtmActiontns sx={{ justifyContent: "center" }}>
                    <CommonRedOutineBtn
                      variant="outlined"
                      onClick={() => {
                        setOpenSuccess(false);
                        router.push("/catalog/list");
                      }}
                    >
                      View All
                    </CommonRedOutineBtn>
                    <CommonRedOutineBtn
                      variant="outlined"
                      onClick={() => {
                        setOpenSuccess(false);
                        router.push("/catalog/list");
                      }}
                    >
                      View
                    </CommonRedOutineBtn>
                  </BtmActiontns>
                </Box>
              </BootstrapDialog>
            </React.Fragment>
            <Box>
              <BootstrapDialog2
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{}}
              >
                <OuterBox>
                  <ModalHeader>
                    <Box>
                      <ModalTitle>Specifications List</ModalTitle>
                    </Box>
                    <Box>
                      <SpecificationSelect>
                        Selected Specifications{" "}
                        <span>
                          (
                          {specifications?.length > 0 &&
                            specifications
                              ?.filter((item) => item.status)
                              .map((item) => item.attribute_id)?.length}
                          )
                        </span>
                      </SpecificationSelect>
                    </Box>
                  </ModalHeader>
                  <Section>
                    <Typography>
                      Create your own custom specification or choose from our
                      suggested options for this category. Ensure clarity and
                      consistency by using precise wording and Proper
                      capitalization.
                    </Typography>
                  </Section>
                  <Section>
                    <SpecificationBox>
                      {specifications?.length > 0 ? (
                        specifications?.map((specification) => (
                          <SpecificationBtn
                            key={specification.attribute_id}
                            disableRipple
                            onClick={() =>
                              handleClick(specification.attribute_id)
                            }
                          >
                            {specification?.status === true && (
                              <img
                                src="/assets/selectedAttribute.svg"
                                alt="Icon"
                                style={{ margin: "0 2px 0 -8px" }}
                              />
                            )}
                            {specification.name}
                          </SpecificationBtn>
                        ))
                      ) : (
                        <Typography sx={{ color: "#D7282F !important" }}>
                          No specification added yet. please try to add from
                          create post{" "}
                        </Typography>
                      )}
                    </SpecificationBox>
                    {specificatinError && (
                      <Typography sx={{ color: "#D7282F !important" }}>
                        Please select at least one specification{" "}
                      </Typography>
                    )}
                  </Section>
                  <Box pt={2}>
                    <BtmActiontns sx={{ justifyContent: "center" }}>
                      <CommonRedOutineBtn
                        variant="outlined"
                        onClick={() => {
                          const selectedSpecifications = specifications?.filter(
                            (item) => item.status
                          );
                          if (selectedSpecifications?.length > 0) {
                            setSpecificationError(false);
                            handleClose2();
                          } else {
                            setSpecificationError(true);
                          }
                        }}
                      >
                        Save
                      </CommonRedOutineBtn>
                      <CommonRedOutineBtn
                        variant="outlined"
                        onClick={handleClose2}
                      >
                        Cancel
                      </CommonRedOutineBtn>
                    </BtmActiontns>
                  </Box>
                </OuterBox>
              </BootstrapDialog2>
            </Box>
          </CatelogeWhiteContainer>
        </div>
      ) : (
        <div className="full_page">
          <Box>
            <ProfileHeader text={"Catalog"} />
          </Box>
          <CatelogeWhiteContainer>
            <CatelogWrapper>
              <CatalogSkeleton />
            </CatelogWrapper>
          </CatelogeWhiteContainer>{" "}
        </div>
      )}
    </>
  );
};

export default CreateCatalog;

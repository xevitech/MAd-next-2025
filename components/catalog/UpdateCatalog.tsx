import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  AddMoreProductTable,
  AddProductTable,
  AddProductTableBox,
  BrowseBox,
  BrowseIconC,
  BtmActiontns,
  CBrowseText,
  CLUpImageName,
  CLUploadImagRow,
  CLUploadImageCol,
  CatelogWrapper,
  CatelogeWhiteContainer,
  CommonRedOutineBtn,
  CreateCatalogueCNtent,
  CreateSearchCommon,
  FixedWidthBox,
  ListComonent,
  ParentSearchedCategoryList,
  SearchedCategoryList,
  SelectBoxOuter,
  SelectBoxOuterInner,
  SelectHeading,
  SelectScrollBox,
  Selectdes,
  SettingFormBox,
  TextFieldDiv,
} from "./style";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Dialog from "@mui/material/Dialog";
import { useAppDispatch } from "redux/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import HelperText from "../CompanySettings/CompanyDetail/Common/helperText";
import { useRouter } from "next/router";
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
import CatalogSkeleton from "./catalogSkeleton";
import { toast } from "react-toastify";
import { setLoader } from "@/hooks/ProductReducers";
import AddExistingProduct from "./catalogSkeletons/AddExistingProduct";
import { DataGridPro } from "@mui/x-data-grid-pro";
import CatalogUpdateSkeleton from "./catalogSkeletons/CatalogUpdateSkeleton";
import { DataGridStyle } from "../common/commonStyle";

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

const UpdateCatalog = () => {
  const dispatch = useAppDispatch();
  const router: any = useRouter();

  const [productLoader, setProductLoader] = useState<boolean>(false);
  const [categoryLoader, setCategoryLoader] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [addLoader, setAddLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [filterTerm, setFilterTerm] = useState<any>([]);
  const [parentCategory, setParentCategory] = useState<any>([]);
  const [filterCategoryList, setFilterCategoryList] = useState<any>([]);
  const [filterSubCategoryList, setFilterSubCategoryList] = useState<any>([]);
  const [catalog, setCatalog] = useState<any>([]);
  const [selectExistingProduct, setSelectExistingProduct] = useState([]);
  const [sectorCategoryId, setSectorCategoryId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState(0);
  const [loader, setLoader] = useState(true);
  const [catalogupdateloader, setCatalogupdateloader] = useState(true);
  const [removedImages, setRemovedImages] = useState<number[]>([]);
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState("");
  const { query } = useRouter();

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
    // FetchProductList(2);
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const validation = Yup.object().shape({
    category: Yup.string().required("Please select cateogry"),
    name: Yup.string()
      .nullable()
      .required("Please enter catalog name")
      .max(100, "Catalog name is too long. Please limit it to 50 characters."),
    image: Yup.array()
      .min(1, "Please upload at least one image")
      .max(3, "Please upload maximum 3 images")
      .required("Please upload a image"),
  });
  let formik: any = useFormik({
    initialValues: {
      name: name || "",
      sector_category: sectorCategoryId || "",
      category: categoryId || "",
      sub_category: subCategoryId || "",
      image: images || [],
      removed_image_index: "",
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await formik.validateForm();
      await updateCatalog(values);
    },
  });

  const listId = query?.id;
  const fetchList = async () => {
    if (listId) {
      setLoader(true);
      let response: any = await apiClient(
        `product/catalog_product/list/${listId}`,
        "get"
      );
      if (response?.status == 200 || response?.status == true) {
        setLoader(false);
        if (response?.status === 200 || response?.status === true) {
          const catalogData = response?.data?.product_catalog;
          if (catalogData?.image && catalogData.image.length > 0) {
            const catalogNewData = catalogData.image.map((item, index) => {
              return { indexValue: index, src: item };
            });
            setImages(catalogNewData);
          } else {
            setImages([]);
          }
          setCatalog(catalogData);
          setName(catalogData?.name || "");
          setSectorCategoryId(catalogData?.sector_category || null);
          setCategoryId(catalogData?.category || null);

          setSubCategoryId(catalogData?.sub_category || null);
          formik.setFieldValue("sector_category", catalogData?.sector_category);
          formik.setFieldValue("category", catalogData?.category);
          formik.setFieldValue("sub_category", catalogData?.sub_category);
          if (catalogData?.sector_category) {
            setCategoryId(catalogData?.category);
          } else if (catalogData?.category) {
            setSubCategoryId(catalogData?.sub_category);
          }
          formik.setFieldValue("name", catalogData?.name);
        }
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, [listId]);
  const updateCatalog = async (values: any) => {
    if (addLoader) return;

    setLoading(true);
    setAddLoader(true);

    let catalog_id = query?.id;
    if (!catalog_id) {
      setLoading(false);
      setAddLoader(false);
      return;
    }
    const {
      name,
      category,
      sector_category,
      sub_category,
      image,
      selectedProduct,
      removed_image_index,
    } = values;

    let formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("sector_category", sector_category);
    formData.append("sub_category", sub_category);
    formData.append("_method", "patch");
    formData.append("product_list", selectExistingProduct.join(", "));
    formData.append("removed_image_index", removedImages.join(","));
    if (image) {
      if (Array.isArray(image)) {
        image.forEach((file, index) => {
          formData.append(`image[]`, file);
        });
      }
    }
    // setLoader(true);
    const response = await apiClient(
      `product/catalog/${catalog_id}`,
      "post",
      {
        body: formData,
      },
      true
    );
    if (response?.status === 200 || response.status === true) {
      toast.success("Catalog Product updated successfully");
      router.push("/catalog/List");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const [newParent, setNewParent] = useState<string | null>(null);
  const [newChild, setNewChild] = useState<string | null>(null);
  const [newChild1, setNewChild1] = useState<string | null>(null);

  const handleSectorChanges = (sectorId) => {
    const selectedSector = parentCategory.find(
      (sector) => sector.parent_id === sectorId
    );
    if (selectedSector && selectedSector.child_categories) {
      setFilterCategoryList(selectedSector.child_categories);
    }
  };
  const handleCategoryChange = (category) => {
    if (category?.sub_categories) {
      setFilterSubCategoryList(category.sub_categories);
    }
  };

  useEffect(() => {
    if (parentCategory.length > 0 && !formik.values.sector_category) {
      const defaultSector = parentCategory[0];
      setNewParent(defaultSector.parent_id);
      handleSectorChanges(defaultSector.parent_id);

      if (defaultSector.child_categories.length > 0) {
        const firstCategory = defaultSector.child_categories[0];
        formik.setFieldValue("category", firstCategory.id);
        setNewChild(firstCategory.id);
        handleCategoryChange(firstCategory);

        if (
          firstCategory.sub_categories &&
          firstCategory.sub_categories.length > 0
        ) {
          formik.setFieldValue(
            "sub_category",
            firstCategory.sub_categories[0].id
          );
          setNewChild1(firstCategory.sub_categories[0].id);
        }
      }
    }
  }, [parentCategory, formik.values.sector_category]);

  useEffect(() => {
    if (formik.values.sector_category) {
      handleSectorChanges(formik.values.sector_category);
    }
  }, [formik.values.sector_category]);

  useEffect(() => {
    if (formik.values.category) {
      const selectedCategory = filterCategoryList.find(
        (category) => category.id === formik.values.category
      );
      if (selectedCategory) {
        handleCategoryChange(selectedCategory);
      }
    }
  }, [formik.values.category, filterCategoryList]);

  const addFiles = (e: any) => {
    const newFiles = e.target.files;
    const newFilesArray = Array.from(newFiles);
    const totalImages = images.length + newFilesArray.length;
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

    const updatedFiles = [...images, ...newFilesArray];
    setImages(updatedFiles);
    formik.setFieldValue("image", updatedFiles);
    formik.setFieldError("image", "");
    formik.setFieldTouched("image", true);
  };

  const removeFile = (index: number | null, file: File | null = null) => {
    if (index !== null || file !== null) {
      setImages((prev: any) => {
        let updatedImages = [...prev];

        if (index !== null) {
          const newUpdatedImages = updatedImages.filter(
            (image: any) => image.indexValue !== index
          );
          setRemovedImages((prevRemovedImages) => [
            ...prevRemovedImages,
            index,
          ]);

          formik.setFieldValue("image", newUpdatedImages);
          formik.setFieldError("image", "");

          return newUpdatedImages;
        }
        if (file !== null) {
          const newUpdatedImages = updatedImages.filter(
            (image: any) => image.name !== file.name
          );

          formik.setFieldValue("image", newUpdatedImages);
          formik.setFieldError("image", "");
          return newUpdatedImages;
        }
        return updatedImages;
      });
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
  const [CatalogData, setCatalogData] = useState<any>([]);
  const FetchCatalogList = async (selectedProductIds) => {
    try {
      setCatalogupdateloader(true);
      let response = await apiClient("product/catalog_update/products", "get");

      if (response.status === 200) {
        const filteredProducts = response.data;
        const selectedProducts = filteredProducts.filter((product) => {
          return selectedProductIds.includes(product.id);
        });

        if (selectedProducts.length > 0) {
          setProducts(selectedProducts.map((v, i) => ({ ...v, sr_no: i + 1 })));
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCatalogupdateloader(false);
    }
  };
  const { id } = router.query;
  const [showSkeleton, setShowSkeleton] = useState(false);

  const getCatalogDetail = async (catalog_id) => {
    setShowSkeleton(true);
    setCatalogupdateloader(true);

    try {
      let response = await apiClient(
        `product/catalog/show/${catalog_id}`,
        "get"
      );
      if (response.status === 200) {
        setCatalogData(response.data);
        const selectedProductIds = response.data.product_list
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
          .map((item) => +item);

        setSelectExistingProduct(selectedProductIds);
        if (selectedProductIds.length === 0) {
          setProducts([]);
          setTimeout(() => {
            setShowSkeleton(false);
            setCatalogupdateloader(false);
          }, 2000);
          return;
        }
        await FetchCatalogList(selectedProductIds);
      }
    } catch (error) {
      console.error("Error fetching catalog detail:", error);
    } finally {
      setTimeout(() => {
        setShowSkeleton(false);
        setCatalogupdateloader(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (id) {
      getCatalogDetail(id);
    }
  }, [id]);

  const handleSelectionChange = (newSelection) => {
    setSelectExistingProduct(newSelection);
  };

  const columns2: any = [
    {
      headerName: "Sr. No.",
      minWidth: 70,
      renderCell: (params: {
        api: { getRowIndex: (arg0: any) => number };
        id: any;
      }) => {
        const rowIndex = params.api.getRowIndex(params.id) + 1;
        return <>{rowIndex}</>;
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 250,
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "model_number",
      headerName: "Model Number",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        const modelNumber = params.row.model_number;
        return modelNumber ? modelNumber : "N/A";
      },
    },
  ];

  return (
    <>
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
                <SelectHeading variant="h6">Select Your Category</SelectHeading>
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
                                      return (
                                        <ListItem
                                          className={`${
                                            formik.values.sector_category ===
                                            sector?.parent_id
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
                                            setSectorCategoryId(
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
                                  value={searchTerm}
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
                                    filteredCategories?.map((category) => {
                                      return (
                                        <ListItem
                                          className={`${
                                            formik.values.category ===
                                              category?.id ||
                                            newChild === category?.id
                                              ? "SelectedCatelog"
                                              : ""
                                          }
                                              }`}
                                          disablePadding
                                          key={category?.id}
                                          onClick={() => {
                                            formik.setFieldValue(
                                              "category",
                                              category?.id
                                            );
                                            setCategoryId(category?.id);
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
                                      );
                                    })}
                                </ListComonent>
                              </SearchedCategoryList>
                              {formik?.errors?.category && (
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
                                            formik.values.sub_category ===
                                              sub_category?.id ||
                                            newChild === sub_category?.id
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
                                            setSubCategoryId(sub_category?.id);
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
                              value={formik.values.name}
                              onChange={(e) => {
                                const inputValue = e.target.value.trimStart();

                                if (inputValue.length <= 100) {
                                  formik.setFieldValue("name", inputValue);
                                  setName(e.target.value);
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
                              error={!!formik.errors.name}
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
                                error={!!formik.errors.image}
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
                              {images &&
                                Array.isArray(images) &&
                                images.length > 0 && (
                                  <CLUploadImagRow>
                                    {images.map((ele, index) => {
                                      const getRelativePath = (url) => {
                                        const fullPath = new URL(url);
                                        return fullPath.pathname
                                          .replace("/public", "")
                                          .replace(/^\/+/, "");
                                      };
                                      const imagePath =
                                        ele instanceof File
                                          ? ele.name
                                          : getRelativePath(ele.src);

                                      return (
                                        <CLUploadImageCol key={index}>
                                          <img
                                            src={
                                              ele instanceof File
                                                ? URL.createObjectURL(ele)
                                                : ele.src
                                            }
                                            alt={""}
                                            height="18px"
                                          />
                                          <CLUpImageName>
                                            <Typography className="imagenname">
                                              {ele.file_original_name ||
                                                (ele instanceof File
                                                  ? ele.name
                                                  : imagePath)}
                                            </Typography>
                                            <Typography variant="body2">
                                              {/* {getFileExtension(ele?.src)} */}
                                              {ele?.src
                                                ? getFileExtension(ele?.src)
                                                : ele?.type?.replace(
                                                    "image/",
                                                    ""
                                                  )}
                                            </Typography>
                                          </CLUpImageName>
                                          <CancelRoundedIcon
                                            onClick={() => {
                                              if (
                                                ele.indexValue !== undefined
                                              ) {
                                                removeFile(ele.indexValue);
                                              } else {
                                                removeFile(null, ele);
                                              }
                                            }}
                                          />
                                        </CLUploadImageCol>
                                      );
                                    })}
                                  </CLUploadImagRow>
                                )}
                              {formik.errors.image && (
                                <HelperText errorText={formik.errors.image} />
                              )}
                            </TextFieldDiv>
                          </Box>
                        </SettingFormBox>
                      </SelectBoxOuter>
                    </Grid>
                  </Grid>
                </CreateCatalogueCNtent>
                <div>
                  {!catalogupdateloader ? (
                    <CatelogeWhiteContainer
                      sx={{
                        boxShadow: products.length === 0 ? "none" : "inherit",
                        padding: products.length === 0 ? "0" : "inherit",
                      }}
                    >
                      <CatelogWrapper padding={"7px 0 !important"}>
                        <AddMoreProductTable>
                          {products && products?.length > 0 ? (
                            <AddProductTableBox sx={{ width: "100%" }}>
                              <Box>
                                <Tabs
                                  value={value}
                                  variant="scrollable"
                                  scrollButtons="auto"
                                  aria-label="scrollable auto tabs example"
                                >
                                  <Tab label="Update Product to Catalog" />
                                </Tabs>
                              </Box>
                              <Box>
                                <AddProductTable
                                  style={{
                                    height: 430,
                                    width: "100%",
                                    margin: "1rem 0 0 0 !important",
                                  }}
                                >
                                  <DataGridPro
                                    rows={products}
                                    columns={columns2}
                                    pageSize={5}
                                    rowHeight={40}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    sx={DataGridStyle}
                                    selectionModel={selectExistingProduct}
                                    onSelectionModelChange={
                                      handleSelectionChange
                                    }
                                  />
                                </AddProductTable>
                              </Box>
                            </AddProductTableBox>
                          ) : null}
                        </AddMoreProductTable>
                      </CatelogWrapper>
                    </CatelogeWhiteContainer>
                  ) : (
                    <Box
                      sx={{
                        "& .skeletonBox": {
                          boxShadow: "none",
                          padding: "0",
                          "& .innerskeletonDiv": {
                            padding: "7px 0px !important",
                            margin: "0",
                          },
                        },
                      }}
                    >
                      <CatalogUpdateSkeleton />
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "12px",
                      margin: "22px 0",
                      // padding: "0 0 22px 0",
                    }}
                  >
                    <BtmActiontns>
                      <CommonRedOutineBtn
                        variant="outlined"
                        onClick={() => {
                          router.push(`/catalog/List`);
                        }}
                      >
                        Cancel
                      </CommonRedOutineBtn>
                    </BtmActiontns>
                    <BtmActiontns>
                      <CommonRedOutineBtn
                        sx={{ minWidth: "122px" }}
                        variant="outlined"
                        type="submit"
                        disabled={addLoader}
                        className="updateBTN"
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
                          <>Update Catalog</>
                        )}
                      </CommonRedOutineBtn>
                    </BtmActiontns>
                  </Box>
                </div>
              </form>
            )}
          </CatelogWrapper>
        </CatelogeWhiteContainer>
      </div>
    </>
  );
};
export default UpdateCatalog;

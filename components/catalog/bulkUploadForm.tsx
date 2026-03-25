import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  ActionBoxHere,
  ListOfProductData,
  CatelogeWhiteContainer,
  CatelogWrapper,
  CommonRedOutineBtn,
  DataGridStyle,
  ListProductRow,
  ListProductTable,
  ListTypography,
  AddMoreProductTable,
  AddProductTable,
  AddProductTableBox,
  BtmActiontns,
  AddMoreStripe,
  NewProductCase,
  SelectedProductDescription,
  CheckListSelectedproduct,
  Selectmessage,
  CheckListSelectedInn,
  SubCheckList,
  MainProductHeading,
  NumberProductAdd,
  TextfieldAndButton,
  RedFilledButton,
  InstructionTxt,
} from "./style";
import { Chip, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGridPro } from "@mui/x-data-grid-pro";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Tab } from "@mui/material";
import { useRouter } from "next/router";
import { apiClient } from "../common/common";
import { toast } from "react-toastify";
import { event } from "jquery";
const columns: any = [
  { field: "id", headerName: "Sr. No.", minWidth: 70 },
  {
    field: "productName",
    headerName: "Product Name",
    minWidth: 250,
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "productId",
    headerName: "Product Id",
    minWidth: 150,
    flex: 1,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "productType",
    headerName: "Product Type",
    minWidth: 200,
    flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      const isSimple = params.value === "Simple";
      return (
        <Chip
          label={params.value}
          style={{
            backgroundColor: isSimple ? "#dbe8f9" : "#ECFBE6",
            color: isSimple ? "#355f97" : "#3BB900",
          }}
        />
      );
    },
  },
  {
    field: "availability",
    headerName: "Availability",
    minWidth: 120,
    flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === "In Stock" ? "success" : "default"}
        style={{
          backgroundColor: params.value === "In Stock" ? "#ECFBE6" : "#FFE1E2",
          color: params.value === "In Stock" ? "#3BB900" : "#231F20",
        }}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    flex: 1,

    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === "Published" ? "success" : "default"}
        style={{
          backgroundColor: params.value === "Published" ? "#ECFBE6" : "#DBE8F9",
          color: params.value === "Published" ? "#231F20" : "231F20",
        }}
      />
    ),
  },
  {
    field: "modelNumber",
    headerName: "Model Number",
    minWidth: 120,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Action",
    minWidth: 100,
    flex: 1,
    renderCell: (params) => (
      <ActionBoxHere>
        <IconButton aria-label="edit" color="primary">
          <img
            src="/assets/editicon.svg"
            alt="Edit"
            width={15}
            height={16}
            style={{ color: "#231F20" }}
          />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteOutlinedIcon
            sx={{ color: "#d8282f", fontSize: "20px !important" }}
          />
        </IconButton>
      </ActionBoxHere>
    ),
  },
];

const rows = [
  {
    id: 1,
    productName: "100kw 125kVA Soundproof Cummins Generator",
    productId: "PC215B0402",
    productType: "Simple",
    availability: "By Order",
    status: "Published",
    modelNumber: "BC-150",
  },
  {
    id: 2,
    productName: "Boats 250kw Marine Genset For Sale Used",
    productId: "PC86542133",
    productType: "Simple",
    availability: "In Stock",
    status: "Draft",
    modelNumber: "BC-150",
  },
  {
    id: 3,
    productName: "11kv 33kv Oil Immersed Power Transformer",
    productId: "PC45621789",
    productType: "Simple",
    availability: "By Order",
    status: "Draft",
    modelNumber: "BC-150",
  },
  {
    id: 4,
    productName: "Boats 250kw Marine Genset For Sale Used",
    productId: "PC65432158",
    productType: "Simple",
    availability: "By Order",
    status: "Draft",
    modelNumber: "BC-150",
  },
  {
    id: 5,
    productName: "11kv 33kv Oil Immersed Power Transformer",
    productId: "PC78956423",
    productType: "Simple",
    availability: "In Stock",
    status: "Draft",
    modelNumber: "BC-150",
  },
  {
    id: 6,
    productName: "100kw 125kVA Soundproof Cummins Generator",
    productId: "PC32156489",
    productType: "Simple",
    availability: "In Stock",
    status: "Draft",
    modelNumber: "BC-150",
  },
  {
    id: 7,
    productName: "100kw 125kVA Soundproof Cummins Generator",
    productId: "PC25647891",
    productType: "Simple",
    availability: "In Stock",
    status: "Draft",
    modelNumber: "BC-150",
  },
];

const columns2: any = [
  {
    headerName: "Sr. No.",
    minWidth: 70,
    renderCell: (params) => {
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
  },
];
const rows2 = [
  {
    id: 1,
    productName: "100kw 125kVA Soundproof Cummins Generator",
    productId: "PC215B0402",
    modelNumber: "BC-150",
  },
  {
    id: 2,
    productName: "Boats 250kw Marine Genset For Sale Used",
    productId: "PC86542133",
    modelNumber: "BC-150",
  },
  {
    id: 3,
    productName: "11kv 33kv Oil Immersed Power Transformer",
    productId: "PC45621789",
    modelNumber: "BC-150",
  },
  {
    id: 4,
    productName: "Boats 250kw Marine Genset For Sale Used",
    productId: "PC65432158",
    modelNumber: "BC-150",
  },
  {
    id: 5,
    productName: "11kv 33kv Oil Immersed Power Transformer",
    productId: "PC78956423",
    modelNumber: "BC-150",
  },
  {
    id: 6,
    productName: "100kw 125kVA Soundproof Cummins Generator",
    productId: "PC32156489",
    modelNumber: "BC-150",
  },
  {
    id: 7,
    productName: "100kw 125kVA Soundproof Cummins Generator",
    productId: "PC25647891",
    modelNumber: "BC-150",
  },
];

const bulkUploadForm = () => {
  const [value, setValue] = useState(1);
  const router = useRouter();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [parentChecked, setParentChecked] = useState({
    productDescription: false,
    productInformation: false,
    productFeatures: false,
    commercialInfo: false,
    description: false,
    uploadProduct: false,
  });
  const [childChecked, setChildChecked] = useState([false, false, false]);
  const [products, setProducts] = useState<any>([]);
  const [catalog, setCatalog] = useState<any>([]);
  const [quantity, setQuantity] = useState(null);
  const [quantityError, setQuantityError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [checkboxValuesError, setCheckboxValuesError] = useState(false);
  const [addLoader, setAddLoader] = useState(false);
  const { query } = useRouter();

  const [checkboxValues, setCheckboxValues] = useState({
    name: false,
    product_type: false,
    pre_title_name : false,
    description: false,
    keywords: false,
    upload_files: false,
    target_industry: false,
    stock_keeping_unit: false,
    product_applications: false,
    product_use_cases: false,
    validity: false,
    brand_id: false,
    manufacturer_year: false,
    model_number: false,
    condition: false,
    manufacture_restrictions:false,
    unique_number: false,
    choice_options: false,
    payment_methods: false,
    place_of_origin: false,
    shipping_options:false,
    pricing: false,
    tabs: [],
    photos: false,
  });
  const tabs = [
    "Product Description",
    "Technical Specifications",
    "Packing Details",
    "Shipping Options",
    "Warranty Information",
    "Certifications And Compliance",
    "Return Policy",
  ];

  useEffect(() => {
    FetchProductList();
  }, []);

  const FetchProductList = async () => {
    let response = await apiClient("product/approved_product/list", "get");

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
    }
  };
  const handleSubmit = async () => {

    if (addLoader) return;


    setAddLoader(true);

    try {
      const catalog_id = query?.id;

      const data = {
        catalog_id,
        quantity,
      };
      const updatedObject = { ...checkboxValues, ...data };
      const product_id = localStorage.getItem("catalog_product_id");
      let response = await apiClient(
        `product/catalog/copy_product?catalog_id=${catalog_id}&product_id=${product_id}`,
        "post",
        {
          body: updatedObject,
        }
      );
    if (response.status == 200) {
        const fullUrl = `${window.location.origin}/catalog/List`;
        router.push(fullUrl);
      } else {
        console.log("Error while creating the catalog", response);
      }
    } catch (error) {
      console.error("Error while creating the catalog", error);
    } finally {
      setAddLoader(false);
    }
  };

  const handleQuantityChanges = (event) => {
    const { value } = event.target;
    setQuantity(value);
    setErrorMessage(false);
    setQuantityError(false);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: checked };

      setParentChecked((prevParentChecked) => {
        const updatedParentChecked = { ...prevParentChecked };

        updatedParentChecked.productDescription = [
          "name",
          "product_type",
          "unique_number",
          "pre_title_name",
          "description",
          "keywords",
          "upload_files",
          "target_industry",
          "stock_keeping_unit",
          "product_applications",
          "product_use_cases"
        ].some((key) => updatedValues[key]);

        updatedParentChecked.productInformation = [
          "validity",
          "brand_id",
          "manufacturer_year",
          "model_number",
          "condition",
        ].some((key) => updatedValues[key]);
        updatedParentChecked.productFeatures = ["choice_options"].some(
          (key) => updatedValues[key]
        );
        updatedParentChecked.commercialInfo = [
          "payment_methods",
          "pricing",
          "place_of_origin",
          "shipping_options",
          "manufacture_restrictions",
        ].some((key) => updatedValues[key]);
        updatedParentChecked.uploadProduct = ["photos"].some(
          (key) => updatedValues[key]
        );

        return updatedParentChecked;
      });

      return updatedValues;
    });
  };


  const handleParentChange = (parentName) => (event, index) => {
    const checked = event.target.checked;
    setParentChecked((prev) => ({
      ...prev,
      [parentName]: checked,
    }));

    setCheckboxValues((prevValues) => {
      const updatedValues = { ...prevValues };

      Object.keys(updatedValues).forEach((key) => {
        if (parentName === "productDescription") {
          if (
            ![
              "validity",
              "brand_id",
              "manufacturer_year",
              "model_number",
              "condition",
              "manufacture_restrictions",
              "tabs",
              "photos",
              "choice_options",
              "pricing",
              "place_of_origin",
              "shipping_options",
              "payment_methods",
            ].includes(key)
          ) {
            updatedValues[key] = checked;
          }
        } else if (parentName === "productInformation") {
          if (
            [
              "validity",
              "brand_id",
              "manufacturer_year",
              "model_number",
              "condition",
            ].includes(key)
          ) {
            updatedValues[key] = checked;
          }
        } else if (parentName === "productFeatures" && ["choice_options"].includes(key)) {
          updatedValues[key] = checked;
        } else if (parentName === "commercialInfo" && [
          "payment_methods",
          "pricing",
          "place_of_origin",
          "shipping_options",
          "manufacture_restrictions",
        ].includes(key)) {
          updatedValues[key] = checked;
        } else if (parentName === "description") {
          updatedValues.tabs = checked ? tabs.map((_, index) => index) : [];
          updatedValues[index] = checked;
        } else if (parentName === "uploadProduct") {
          updatedValues.photos = checked;
        }
      });

      return updatedValues;
    });
  };

  const handleTabsChange = (event, index) => {
    const { name, checked } = event.target;
    const newTabs = [...checkboxValues.tabs];
    if (checked) {
      newTabs.push(index);
    } else {
      const indexToRemove = newTabs.indexOf(index);
      if (indexToRemove > -1) {
        newTabs.splice(indexToRemove, 1);
      }
    }
    const updatedValues = { ...checkboxValues, tabs: newTabs, [name]: checked };
    setCheckboxValues(updatedValues);
    setParentChecked((prevParentChecked) => ({
      ...prevParentChecked,
      description: newTabs.length > 0,
    }));
  };
  const { catalogName } = router.query;
  const formattedCatalogName =
    typeof catalogName === 'string' ? catalogName.replace(/%20/g, '') : '';


  return (
    <>
      <div className="full_page">
        <Box>
          <ProfileHeader text={formattedCatalogName} />
        </Box>
        <CatelogeWhiteContainer>
          <CatelogWrapper>
            <AddMoreProductTable>
              <AddProductTableBox sx={{ width: "100%" }}>
                <Box>
                  {value === 1 && (
                    <>
                      {/* Start Selected product Ui */}
                      <SelectedProductDescription>
                        <AddMoreStripe>
                          <Typography>
                            Selected Product :{" "}
                            <span>
                              {localStorage.getItem("cat_selected_product")}{" "}
                            </span>
                          </Typography>
                        </AddMoreStripe>

                        <CheckListSelectedproduct>
                          <Selectmessage>
                            Select the fields which are common between all the
                            products you want to create/add to your catalog :
                          </Selectmessage>
                          <CheckListSelectedInn>
                            <Grid container spacing={0}>
                              <InstructionTxt>
                                <span>*</span>For all new products created, the category will be the same as the selected reference product.{" "}
                                <span className="cantchange">
                                  ( You can't change category)
                                </span>
                              </InstructionTxt>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            parentChecked.productDescription
                                          }
                                          onChange={handleParentChange(
                                            "productDescription"
                                          )}
                                        />
                                      }
                                      label="Product Description"
                                    />{" "}
                                  </MainProductHeading>
                                  <SubCheckList>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Title"
                                      name="name"
                                      checked={checkboxValues.name}
                                      onChange={handleCheckboxChange}
                                    />
                                    {/* <FormControlLabel
                                      control={<Checkbox />}
                                      label="Product Type"
                                      name="product_type"
                                      checked={checkboxValues.product_type}
                                      onChange={handleCheckboxChange}
                                    />

                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Unique Number"
                                      name="unique_number"
                                      checked={checkboxValues.unique_number}
                                      onChange={handleCheckboxChange}
                                    /> */}
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Subtitle"
                                      name="pre_title_name"
                                      checked={checkboxValues.pre_title_name}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="About this Product"
                                      name="description"
                                      checked={checkboxValues.description}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label=" Product keyword"
                                      name="keywords"
                                      checked={checkboxValues.keywords}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Upload Datasheet, Drawing, Catalog"
                                      name="upload_files"
                                      checked={checkboxValues.upload_files}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Target Industry"
                                      name="target_industry"
                                      checked={checkboxValues.target_industry}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Stock Keeping Unit (SKU)"
                                      name="stock_keeping_unit"
                                      checked={
                                        checkboxValues.stock_keeping_unit
                                      }
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label=" Product Application"
                                      name="product_applications"
                                      checked={
                                        checkboxValues.product_applications
                                      }
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label=" Product Use Cases"
                                      name="product_use_cases"
                                      checked={checkboxValues.product_use_cases}
                                      onChange={handleCheckboxChange}
                                    />
                                  </SubCheckList>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            parentChecked.productInformation
                                          }
                                          onChange={handleParentChange(
                                            "productInformation"
                                          )}
                                        />
                                      }
                                      label="Product Information"
                                    />{" "}
                                  </MainProductHeading>
                                  <SubCheckList>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Post Validity"
                                      name="validity"
                                      checked={checkboxValues.validity}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Manufacturer/Brand"
                                      name="brand_id"
                                      checked={checkboxValues.brand_id}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Manufacturing Year"
                                      name="manufacturer_year"
                                      checked={checkboxValues.manufacturer_year}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Model Number"
                                      name="model_number"
                                      checked={checkboxValues.model_number}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Condition"
                                      name="condition"
                                      checked={checkboxValues.condition}
                                      onChange={handleCheckboxChange}
                                    />
                                  </SubCheckList>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            parentChecked.productFeatures
                                          }
                                          onChange={handleParentChange(
                                            "productFeatures"
                                          )}
                                        />
                                      }
                                      label="Product Features & Characteristics"
                                    />{" "}
                                  </MainProductHeading>
                                  <SubCheckList>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Specification List"
                                      name="choice_options"
                                      checked={checkboxValues.choice_options}
                                      onChange={handleCheckboxChange}
                                    />
                                  </SubCheckList>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={parentChecked.commercialInfo}
                                          onChange={handleParentChange(
                                            "commercialInfo"
                                          )}
                                        />
                                      }
                                      label="Commercial Information"
                                    />{" "}
                                  </MainProductHeading>
                                  <SubCheckList>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Payment Methods"
                                      name="payment_methods"
                                      checked={checkboxValues.payment_methods}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Pricing"
                                      name="pricing"
                                      checked={checkboxValues.pricing}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Country Of Origin"
                                      name="place_of_origin"
                                      checked={checkboxValues.place_of_origin}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Shipping Options"
                                      name="shipping_options"
                                      checked={checkboxValues.shipping_options}
                                      onChange={handleCheckboxChange}
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Product Availability Or Manufacturing Restrictions"
                                      name="manufacture_restrictions"
                                      checked={checkboxValues.manufacture_restrictions}
                                      onChange={handleCheckboxChange}
                                    />
                                  </SubCheckList>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={parentChecked.uploadProduct}
                                          onChange={handleParentChange(
                                            "uploadProduct"
                                          )}
                                        />
                                      }
                                      label="Upload Product Images/Videos"
                                    />{" "}
                                  </MainProductHeading>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={
                                            parentChecked.description
                                          }
                                          onChange={handleParentChange(
                                            "description"
                                          )}
                                        />
                                      }
                                      label="Description"
                                    />{" "}
                                  </MainProductHeading>
                                  <SubCheckList>
                                    {tabs.map((tabsName, index) => {
                                      return (
                                        <FormControlLabel
                                          control={<Checkbox />}
                                          label={tabsName}
                                          name={`${index}`}
                                          checked={checkboxValues?.tabs?.includes(
                                            index
                                          )}
                                          onChange={(event) => {
                                            handleTabsChange(event, index);
                                          }}
                                        />
                                      );
                                    })}
                                  </SubCheckList>
                                  {checkboxValuesError && (
                                    <div
                                      style={{
                                        color: "red",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      Please Select atleast one option
                                    </div>
                                  )}
                                </FormGroup>
                              </Grid>

                              <Grid item xs={12}>
                                <NumberProductAdd>
                                  <Typography>
                                    No. of Products you want to add:{" "}
                                  </Typography>
                                  <TextfieldAndButton>
                                    <TextField
                                      variant="outlined"
                                      placeholder="Enter value"
                                      sx={{width:'20% !important'}}
                                      size="small"
                                      name="quantity"
                                      value={quantity}
                                      disabled={addLoader}
                                      onChange={handleQuantityChanges}
                                    />

                                    <RedFilledButton
                                      variant="contained"
                                      color="primary"
                                      fullWidth
                                      size="small"
                                      onClick={async () => {
                                        if (addLoader) return;

                                        setAddLoader(true);

                                        const isProductDescriptionValid =
                                          Object.values(checkboxValues).some((value) => value === true);
                                        const isProductInformationValid =
                                          Object.values(checkboxValues).some((value) => value === true);
                                        const isProductFeaturesValid =
                                          Object.values(checkboxValues).some((value) => value === true);
                                        const isCommercialInfoValid =
                                          Object.values(checkboxValues).some((value) => value === true);
                                        const isProductShippingValid =
                                          Object.values(checkboxValues).some((value) => value === true);
                                        const isUploadProductValid =
                                          Object.values(checkboxValues).some((value) => value === true);

                                        const numericQuantity = parseInt(quantity, 10);

                                        if (
                                          !isProductDescriptionValid &&
                                          !isProductInformationValid &&
                                          !isProductFeaturesValid &&
                                          !isCommercialInfoValid &&
                                          !isProductShippingValid &&
                                          !isUploadProductValid
                                        ) {
                                          toast.error("Please select at least one option.");
                                          setAddLoader(false);
                                          return;
                                        }
                                        if (numericQuantity === 0) {
                                          setErrorMessage(true);
                                          setQuantityError(false);
                                          setAddLoader(false);
                                          return;
                                        } else if (!quantity) {
                                          setQuantityError(true);
                                          setErrorMessage(false);
                                          setAddLoader(false);
                                          return;
                                        }

                                        try {
                                          await handleSubmit();
                                          toast.success("Product catalog created successfully");
                                        } catch (error) {
                                          toast.error("An error occurred. Please try again.");
                                        } finally {
                                          // setAddLoader(false);
                                        }
                                      }}
                                      disabled={addLoader}
                                    >
                                      Create/Add
                                    </RedFilledButton>
                                  </TextfieldAndButton>

                                  {quantityError && (
                                    <div
                                      style={{
                                        color: "#d7282f",
                                        fontSize: '13px',
                                        marginTop: '8px',
                                      }}
                                    >
                                      {"Please enter value."}
                                    </div>
                                  )}
                                  {errorMessage && (
                                    <div
                                      style={{
                                        color: "#d7282f",
                                        fontSize: '13px',
                                        marginTop: '8px',
                                      }}
                                    >
                                      {"Please enter value greater than 0"}
                                    </div>
                                  )}
                                </NumberProductAdd>
                              </Grid>
                            </Grid>
                          </CheckListSelectedInn>
                        </CheckListSelectedproduct>
                      </SelectedProductDescription>
                      {/* End Selected product Ui */}
                    </>
                  )}
                </Box>
              </AddProductTableBox>
            </AddMoreProductTable>
            {/* End Add More product Data */}
          </CatelogWrapper>
        </CatelogeWhiteContainer>
      </div>
    </>
  );
};
export default bulkUploadForm;

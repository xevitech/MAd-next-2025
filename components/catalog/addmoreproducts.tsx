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
    field: "modelNumber",
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

const AddMoreProducts = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState([false, false, false]);

  const handleParentChange = (event) => {
    setParentChecked(event.target.checked);
    setChildChecked(childChecked.map(() => event.target.checked)); // Set all child checkboxes to match parent
  };

  const handleChildChange = (index) => (event) => {
    const updatedChildChecked = [...childChecked];
    updatedChildChecked[index] = event.target.checked;
    setChildChecked(updatedChildChecked);
    setParentChecked(updatedChildChecked.every(Boolean)); // Check if all children are checked
  };
  return (
    <>
      <div className="full_page">
        <Box>
          <ProfileHeader text={"Power Catalog"} />
        </Box>
        <CatelogeWhiteContainer>
          <CatelogWrapper>
            <ListOfProductData>
              <ListProductRow>
                <ListTypography>List of Product</ListTypography>
                <CommonRedOutineBtn
                  variant="contained"
                  size="small"
                  startIcon={<AddRoundedIcon />}
                >
                  Add More Products
                </CommonRedOutineBtn>
              </ListProductRow>
              <ListProductTable style={{ height: 500, width: "100%" }}>
                <DataGridPro
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowHeight={40}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  sx={DataGridStyle}
                />
              </ListProductTable>
            </ListOfProductData>

            {/* Start Add More product Data */}
            <AddMoreProductTable>
              <ListProductRow>
                <ListTypography>Add More Products</ListTypography>
                <CommonRedOutineBtn
                  variant="contained"
                  size="small"
                  startIcon={<AddRoundedIcon />}
                >
                  Add More Products
                </CommonRedOutineBtn>
              </ListProductRow>
              <AddProductTableBox sx={{ width: "100%" }}>
                <Box
                  sx={{ borderBottom: value === 0 ? "0" : "1px solid #ddd" }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="Add Existing Product to Catalog" />
                    <Tab label="Add New Product to Catalog (Bulk Upload)" />
                  </Tabs>
                </Box>
                <Box>
                  {value === 0 && (
                    <>
                      <AddProductTable style={{ height: 430, width: "100%" }}>
                        <DataGridPro
                          rows={rows2}
                          columns={columns2}
                          pageSize={5}
                          rowHeight={40}
                          rowsPerPageOptions={[5]}
                          checkboxSelection
                          disableSelectionOnClick
                          sx={DataGridStyle}
                        />
                      </AddProductTable>
                      <BtmActiontns sx={{ justifyContent: "right" }}>
                        <CommonRedOutineBtn variant="outlined">
                          Cancel
                        </CommonRedOutineBtn>
                        <CommonRedOutineBtn variant="outlined" type="submit">
                          Save Catalog
                        </CommonRedOutineBtn>
                      </BtmActiontns>
                    </>
                  )}
                  {value === 1 && (
                    <>
                      <NewProductCase>
                        <AddMoreStripe>
                          <Typography>
                            Select a Product for reference to create/Add more
                            products
                          </Typography>
                        </AddMoreStripe>
                        <AddProductTable
                          style={{
                            height: 430,
                            width: "100%",
                            margin: "1rem 0",
                          }}
                        >
                          <DataGridPro
                            rows={rows2}
                            columns={columns2}
                            pageSize={5}
                            rowHeight={40}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                            sx={DataGridStyle}
                          />
                        </AddProductTable>
                        <BtmActiontns sx={{ justifyContent: "right" }}>
                          <CommonRedOutineBtn variant="outlined">
                            Next
                          </CommonRedOutineBtn>
                        </BtmActiontns>
                      </NewProductCase>

                      {/* Start Selected product Ui */}
                      <SelectedProductDescription>
                        <AddMoreStripe>
                          <Typography>
                            Selected Product :{" "}
                            <span>
                              100kw 125kVA Soundproof Cummins Generator{" "}
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
                                <span>*</span>For all new products created
                                category will be same as selected reference
                                product.{" "}
                                <span className="cantchange">
                                  ( You can't change category)
                                </span>
                              </InstructionTxt>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Product Description"
                                    />
                                  </MainProductHeading>
                                  <SubCheckList>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Title"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Subtitle"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="About this Product"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label=" Product keyword"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Upload Datasheet, Drawing, Catalog"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="SuTarget Industrybtitle"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Stock Keeping Unit (SKU)"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label=" Product Application"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label=" Product Use Cases"
                                    />
                                  </SubCheckList>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <FormGroup>
                                  <MainProductHeading>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Product Information"
                                    />
                                  </MainProductHeading>
                                  <SubCheckList>
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Post Validity"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Manufacturer/Brand"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Manufacturing Year"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Model Number"
                                    />
                                    <FormControlLabel
                                      control={<Checkbox />}
                                      label="Condition"
                                    />
                                  </SubCheckList>
                                </FormGroup>
                              </Grid>
                              <Grid item xs={12}>
                                <NumberProductAdd>
                                  <Typography>
                                    No of products you want to add:{" "}
                                  </Typography>
                                  <TextfieldAndButton>
                                    <TextField
                                      variant="outlined"
                                      placeholder="Search..."
                                      fullWidth
                                      size="small"
                                    />

                                    <RedFilledButton
                                      variant="contained"
                                      color="primary"
                                      fullWidth
                                      size="small"
                                    >
                                      Create/Add
                                    </RedFilledButton>
                                  </TextfieldAndButton>
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
export default AddMoreProducts;

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
  Skeleton,
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
import AddExistingProduct from "./catalogSkeletons/AddExistingProduct";
import { DataGridStyle } from "../common/commonStyle";
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
    renderCell: (params: {
      value:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment;
    }) => {
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
    renderCell: (params: {
      value:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment;
    }) => (
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

    renderCell: (params: {
      value:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment;
    }) => (
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
    renderCell: (params: any) => (
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

const addMoreProductList = () => {
  const router = useRouter();
  const q = router.query.id;
  const id = q?.[0] ?? null;

  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
    if (newValue === 1) {
      if (selectedRow) {
        setSelectedRow(selectedRow);
      } else {
        setSelectedRow(null);
      }
    } else {
      setSelectedRow(null);
    }
  };
  const [simpleProduct, setSimpleProduct] = useState([]);
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState([false, false, false]);
  const [products, setProducts] = useState<any>([]);
  const [catalog, setCatalog] = useState<any>([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [loader, setLoader] = useState(true);

  const [selectedExsitingProdouct, setSelectedExsitingProdouct] = useState([]);

  const handleChildChange =
    (index: string | number) => (event: { target: { checked: boolean } }) => {
      const updatedChildChecked = [...childChecked];
      updatedChildChecked[index] = event.target.checked;
      setChildChecked(updatedChildChecked);
      setParentChecked(updatedChildChecked.every(Boolean));
    };

  useEffect(() => {
    FetchProductList();

    if (id) {
      getCatalogDetail(id);
    }
  }, [id]);

  const FetchProductList = async () => {
    setLoader(true);
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
    setLoader(false);
  };

  const simpleProductList = async () => {
    setLoader(true);
    try {
      let res = await apiClient(`product/simple_product/list`, "get");
      console.log(res, "filteredSimpleProducts");
      if (res?.status === 200) {
        setSimpleProduct(res.data);
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    simpleProductList();
  }, []);
  const getCatalogDetail = async (catalog_id: string) => {
    setLoader(true);
    let response = await apiClient(`product/catalog/show/${catalog_id}`, "get");

    if (response.status === 200) {
      setCatalog(response.data);

      let seletedProduct = response?.data?.product_list;

      let selProductInArray = seletedProduct?.split(",");
      const cleanedArray = selProductInArray?.filter(
        (item) => item && item.trim() !== ""
      );

      const trimmedArray = selProductInArray
        ?.map((item) => item.trim())
        ?.filter((item) => item !== "");

      setSelectedExsitingProdouct(trimmedArray);
      setLoader(false);
    }
  };

  const handleSubmitClick = async () => {
    setLoader(true);
    const seletedProduct = selectedIds.join(", ");

    let response = await apiClient("product/catalog/new-product", "post", {
      body: {
        product_list: seletedProduct,
        catalog_id: id,
      },
    });

    if (response.status == 200) {
      const fullUrl = `${window.location.origin}/catalog/List`;
      router.push(fullUrl);
      toast.success("Product added to the catalog successfully");
    }
    setLoader(false);
  };
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
        } else {
          console.error("Selected product has no name");
        }
      }
    } else {
      setSelectedRow(null);
      localStorage.removeItem("cat_selected_product");
      localStorage.removeItem("catalog_product_id");
    }
  };
  const { catalogName } = router.query;
  const formattedCatalogName =
    typeof catalogName === "string" ? catalogName.replace(/%20/g, "") : "";

  const hadnleBulkUploadNext = async () => {
    const fullUrl = `${window.location.origin}/catalog/bulkupload/${id}?catalogName=${formattedCatalogName}`;
    router.push(fullUrl);
    toast.success("New Product added successfully");
  };
  return (
    <>
      <div className="full_page">
        <Box>
          {/* <ProfileHeader text={catalog?.name} /> */}
          <ProfileHeader
            text={
              loader ? (
                <Skeleton animation="wave" variant="text" width="12%" />
              ) : (
                catalog?.name
              )
            }
          />
        </Box>
        <CatelogeWhiteContainer>
          <CatelogWrapper>
            {/* Start Add More product Data */}
            <AddMoreProductTable>
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
                      {loader || products.length === 0 ? (
                        <Box sx={{ margin: "1rem 0" }}>
                          {" "}
                          <AddExistingProduct />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "12px",
                              margin: "16px 0 0 0",
                            }}
                          >
                            <Skeleton
                              animation="wave"
                              variant="rounded"
                              width={"97.23px"}
                              height={"33px"}
                            />
                            <Skeleton
                              animation="wave"
                              variant="rounded"
                              width={"97.23px"}
                              height={"33px"}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <>
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
                              selectionModel={selectedExsitingProdouct}
                              onSelectionModelChange={(sel) => {
                                setSelectedIds(sel);
                                setSelectedExsitingProdouct(sel);
                              }}
                            />
                          </AddProductTable>
                          <BtmActiontns
                            sx={{
                              justifyContent: "right",
                              margin: "16px 0 0 0",
                            }}
                          >
                            <CommonRedOutineBtn
                              variant="outlined"
                              onClick={() => {
                                router.push("/catalog/List");
                              }}
                            >
                              Catalog List
                            </CommonRedOutineBtn>
                            <CommonRedOutineBtn
                              variant="outlined"
                              type="submit"
                              onClick={() => {
                                if (selectedExsitingProdouct?.length === 0) {
                                  toast.error(
                                    "Please select at least one product."
                                  );
                                } else {
                                  handleSubmitClick();
                                }
                              }}
                            >
                              Save Catalog
                            </CommonRedOutineBtn>
                          </BtmActiontns>
                        </>
                      )}
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
                        {loader || products.length === 0 ? (
                          <>
                            {" "}
                            <AddExistingProduct />
                          </>
                        ) : (
                          <>
                            <AddProductTable
                              style={{
                                height: 430,
                                width: "100%",
                                margin: "1rem 0 0 0",
                              }}
                            >
                              <DataGridPro
                                rows={simpleProduct}
                                columns={columns2}
                                pageSize={5}
                                rowHeight={40}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                sx={DataGridStyle}
                                selectionModel={selectedRow ? selectedRow : []}
                                onSelectionModelChange={(newSelection) =>
                                  handleSelectionChange(newSelection)
                                }
                              />
                            </AddProductTable>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: "12px",
                                margin: "16px 0px 0px 0px",
                              }}
                            >
                              <CommonRedOutineBtn
                                variant="outlined"
                                onClick={() => {
                                  router.push("/catalog/List");
                                }}
                              >
                                Catalog List
                              </CommonRedOutineBtn>
                              <BtmActiontns
                                // sx={{ justifyContent: "right" }}
                                onClick={() => {
                                  if (selectedRow?.length === 0) {
                                    toast.error(
                                      "Please select at least one product."
                                    );
                                  } else {
                                    hadnleBulkUploadNext();
                                  }
                                }}
                              >
                                <CommonRedOutineBtn variant="outlined">
                                  Next
                                </CommonRedOutineBtn>
                              </BtmActiontns>
                            </Box>
                          </>
                        )}
                      </NewProductCase>
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
export default addMoreProductList;

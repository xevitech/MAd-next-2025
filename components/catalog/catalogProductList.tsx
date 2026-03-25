import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
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
  CatalogFlexBox,
} from "./style";
import { Chip, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { DataGridPro } from "@mui/x-data-grid-pro";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Tab } from "@mui/material";
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
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import CatelogueSkelton from "./CatelogueSkelton";
import ProductDetailModal from "../products/listProduct/subComponents/ProductListModals/ProductDetailModal";
import ListofProductSkeleton from "./catalogSkeletons/ListofProductSkeleton";
import {
  CellHeader,
  CellText,
  HeaderCellText,
  ProductNameCSS,
} from "../products/listProduct/styles";
import { LightTooltip } from "../common/Tooltip/tooltip";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import Image from "next/image";
import { FontContainer } from "../ProductDetail/style";
import EmptyPage from "../common/EmptyPage";

const CatalogProductList = () => {
  const [serialNo, setSerialNo] = useState<any>(0);
  const columns: any = [
    {
      // field: "id",
      headerName: "Sr. No",
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
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        return (
          <>
            <ProductNameCSS
              onClick={(e) => {
                e.stopPropagation();
                setSerialNo(cellValues.row);
                setModal(true);
                setdetailview(cellValues.id);
              }}
            >
              {cellValues?.row?.img === null ? (
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "rgb(201,201,201)",
                    textAlign: "center",
                  }}
                >
                  <PhotoSizeSelectActualOutlinedIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      marginTop: 7,
                    }}
                  />
                </div>
              ) : (
                <>
                  <Image
                    width={34}
                    height={34}
                    alt="Product Image"
                    style={{ borderRadius: "50%" }}
                    src={cellValues?.row?.main_image}
                  />
                </>
              )}
              <CellHeader>
                <LightTooltip
                  arrow
                  title={cellValues.value}
                  followCursor
                  placement="top"
                >
                  <CellText
                    sx={{
                      color: "#3E5060",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        color: "#d7282f",
                      },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "150px",
                    }}
                  >
                    {cellValues.value}
                  </CellText>
                </LightTooltip>
                {/* <LightTooltip
                  arrow
                  title={cellValues.row.pre_title_name}
                  followCursor
                  placement="top"
                > */}
                <CellText
                  style={{
                    fontSize: "11px",
                    color: "rgb(123, 121, 121)",
                    fontWeight: "normal",
                  }}
                >
                  {cellValues.row.postId}
                </CellText>
                {/* </LightTooltip> */}
              </CellHeader>
            </ProductNameCSS>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      // flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "product_type",
      headerName: "Product Type",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isProductTypeDefined = params?.value && params?.value !== "N/A";
        let displayValue = "N/A"; 
        if (isProductTypeDefined) {
          if (params?.row?.is_placeholder === "yes") {
            displayValue = "Simple/Placeholder";
          } else if (params.value === "configured") {
            displayValue = "Configured";
          } else {
            displayValue = "Simple";
          }
        }
        let backgroundColor = "";
        let textColor = "";
    
        switch (displayValue) {
          case "Simple":
            backgroundColor = "rgb(219, 232, 249)";
            textColor = "rgb(53, 95, 151)";
            break;
          case "Simple/Placeholder":
            backgroundColor = "rgb(219, 232, 249)";
            textColor = "rgb(53, 95, 151)"; 
            break;
          case "Configured":
            backgroundColor = "rgb(236, 251, 230)";
            textColor = "rgb(59, 185, 0)"; 
            break;
          default:
            backgroundColor = "#ECFBE6";
            textColor = "#3BB900";
            break;
        }
        return (
          <Chip
            label={displayValue}
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
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
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const available = params.row.availability;
        return (
          <Chip
            // label={available ? available : "N/A"}
            label={
              available
                ? available === "in_stock"
                  ? "In Stock"
                  : available === "by_order"
                  ? "By Order"
                  : "N/A"
                : "N/A"
            }
            color={available === "in_stock" ? "success" : "default"}
            style={{
              backgroundColor:
                available === "in_stock" ? "#ECFBE6" : "rgb(253, 231, 231)",
              color: available === "in_stock" ? "#3BB900" : "rgb(215, 40, 47)",
            }}
          />
        );
      },
    },
    {
      field: "published",
      headerName: "Status",
      minWidth: 80,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const status = params.row.status;
        return (
          <Chip
            label={status ? status : "Draft"}
            color={status === "Published" ? "success" : "default"}
            style={{
              backgroundColor:
                status === "Published"
                  ? "#ECFBE6"
                  : status === "Pending"
                  ? "#fff4db"
                  : status === "Rejected"
                  ? // ? "#708192"
                    "#ffedec"
                  : "#ffe7d7", // Default to Draft

              color:
                status === "Published"
                  ? "#3BB900"
                  : status === "Pending"
                  ? "#cd9b09"
                  : status === "Rejected"
                  ? "#d7282f"
                  : "#b78a01", // Default to Draft
            }}
          />
        );
      },
    },
    {
      field: "is_placeholder",
      headerName: "Model No.",
      minWidth: 120,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const modelNumber = params.row.model_number;
        return modelNumber ? modelNumber : "N/A";
      },
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const productType = params?.row?.is_placeholder === "no";
        const handleEditClick = (e) => {
          e.stopPropagation();
          if (productType) {
            router.push(`/products/edit/${params.id}`);
          } else {
            router.push(`/products/placeholder/${params.id}`);
          }
        };
        return (
          <ActionBoxHere
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {/* <IconButton aria-label="edit" color="primary"> */}
            <img
              src="/assets/editicon.svg"
              alt="Edit"
              width={15}
              height={16}
              style={{ color: "#231F20" }}
              onClick={handleEditClick}
            />
            {/* </IconButton> */}
            {/* <IconButton aria-label="delete"> */}
            <DeleteOutlinedIcon
              sx={{ color: "#d8282f", height: "20px", width: "20px" }}
              onClick={(e) => {
                e.stopPropagation();
                setProductIDs(params.id);
                e.preventDefault();
                setDeleteConfirmation(true);
              }}
            />
            {/* </IconButton> */}
          </ActionBoxHere>
        );
      },
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
  const [value, setValue] = useState(0);
  const router = useRouter();
  const q = router.query.id;
  const id = q?.[1] ?? 0;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [parentChecked, setParentChecked] = useState(false);
  const [childChecked, setChildChecked] = useState([false, false, false]);
  const [products, setProducts] = useState<any>([]);
  const [catalog, setCatalog] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [productList, setProductList] = useState<any>([]);
  const [productIDs, setProductIDs] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [detailview, setdetailview] = useState<any>();

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

  const [loader, setLoader] = useState<boolean>(true);

  //   const fetchLists = async () => {
  //   setLoader(true);  // Start loader before making the request

  //   try {
  //     const response = await apiClient(`product/catalog_product/list/${id}`, 'get');

  //     if (response?.status === 200) {
  //       setProducts(response.data.products || []);  // Ensure products is an array
  //       setLoader(false);
  //     } else {
  //       setProducts([]);  // Handle error, set products as empty array
  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     setProducts([]);  // Handle any API request failure
  //     setLoader(false);
  //     console.error('Error fetching products:', error);
  //   }
  // };

  const fetchList = async () => {
    setLoader(true); // Start loader before making the request

    try {
      let response: any = await apiClient(
        `product/catalog_product/list/${id}`,
        "get"
      );
      if (response?.status == 200) {
        setLoader(false);
        setCatalog(response?.data?.product_catalog || []);
        setProducts(response?.data?.products || []);
      }
    } catch (error) {
      setProducts([]);
      setCatalog([]);
      setLoader(false);
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchList();
  }, [id]);

  let fetchDelete = async (productIDs) => {
    try {
      const formData = new FormData();
      formData.append("product_list",  productIDs?.length > 0 ? productIDs?.join() : productIDs); 
      const res = await fetch(
        `${BASE_URL}/product/delete_catalog_product/${id}`, 
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`, 
          },
          body: formData, 
        }
      );
      if (res.status === 200) {
        setDeleteConfirmation(false);
        setDeleteLoading(true);
        toast.success("Product deleted successfully from the catalog");
        await fetchList();
      } else {
        console.error("Error deleting product from catalog");
      }
    } catch (error) {
    } finally {
      setDeleteLoading(false);
    }
  };

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const handleDelete = async () => {
    if (!id || !productIDs) {
      return;
    }
    await fetchDelete(productIDs);
    await fetchList();
    setProductIDs([]);
  };

  const handleSelectionChange = (newSelection) => {
    const newSelectedRow = newSelection.length ? newSelection[0] : null;
    setSelectedRow(newSelectedRow);
  };
  const { catalogName } = router.query;
  const formattedCatalogName =
    typeof catalogName === "string" ? catalogName.replace(/%20/g, "") : "";

  return (
    <>
      <Drawer
        anchor={"right"}
        open={modal}
        onClose={() => setModal(false)}
        sx={{
          zIndex: "9999",
          "@media (max-width: 1280px)": {
            "& .MuiPaper-root": {
              width: "92%",
            },
          },
        }}
      >
        <ProductDetailModal
          productid={detailview}
          setModal={setModal}
          products={products}
          serialNo={serialNo}
        />
      </Drawer>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text={productIDs.length > 1 ? "these products" : " this product"}
          onClickAction={handleDelete}
        />
      )}
      <div className="full_page">
        <Box>
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
            <ListOfProductData>
              <ListProductRow className="list-of-product">
                <CatalogFlexBox
                  // sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <ListTypography>List of Products</ListTypography>
                  <CatalogFlexBox className="selectedrow listPro"
                    sx={{ }}
                  >
                    {productIDs?.length > 0 && (
                      <>
                        <Typography fontSize="14px" fontWeight={300}>
                          Selected Product ({productIDs?.length})
                        </Typography>
                        <Divider  className="VertiDivider"
                          orientation="vertical"
                          sx={{
                            "&.MuiDivider-root": {
                              height: "24px",
                            },
                          }}
                        />
                      </>
                    )}

                    {productIDs?.length > 0 && (
                      <FontContainer className="selecteddelete"
                        fontSize="14px"
                        fontWeight={300}
                        color="#D7282F"
                        style={{ cursor: "pointer", display: "flex" }}
                        onClick={() => {
                          setDeleteConfirmation(true);
                          setProductIDs(productIDs);
                        }}
                      >
                        Delete Selected{" "}
                        <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                      </FontContainer>
                    )}
                  </CatalogFlexBox>
                </CatalogFlexBox>
                <CommonRedOutineBtn
                  variant="contained"
                  size="small"
                  startIcon={<AddRoundedIcon />}
                  onClick={() =>
                    router.push(
                      `product/${id}?catalogName=${formattedCatalogName}`
                    )
                  }
                >
                  Add More Products
                </CommonRedOutineBtn>
              </ListProductRow>
              {loader ? (
                <Box sx={{ margin: "1rem 0" }}>
                  <ListofProductSkeleton />
                </Box>
              ) : (
                <ListProductTable
                  sx={{
                    margin: "0px",
                    "& .MuiChip-label": {
                      margin: "0 !important",
                      textTransform: "capitalize",
                      fontSize: "12px !important",
                    },
                  }}
                  style={{
                    height: 545,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {products && products.length > 0 ? (
                    <DataGridPro
                      rows={products}
                      columns={columns}
                      pageSize={10}
                      pagination
                      rowHeight={38}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      onSelectionModelChange={(newSelectionModel) =>
                        setProductIDs(newSelectionModel)
                      }
                      sx={DataGridStyle}
                    />
                  ) : (
                    // <p>No products available</p>
                    <EmptyPage
                      text={"Products"}
                      customdescription={"You have not added any products yet."}
                      onClickHandler={() => router.push(`product/${id}`)}
                      logo="/assets/Group.svg"
                      actiontext={true}
                    />
                  )}
                </ListProductTable>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "0px 0px 0px 0px",
                }}
              >
                <CommonRedOutineBtn
                  variant="outlined"
                  onClick={() => {
                    router.push("/catalog/List");
                  }}
                >
                  Previous Page
                </CommonRedOutineBtn>
              </Box>
            </ListOfProductData>
          </CatelogWrapper>
        </CatelogeWhiteContainer>
      </div>
    </>
  );
};
export default CatalogProductList;

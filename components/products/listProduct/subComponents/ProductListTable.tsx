import { useState, useEffect, useRef } from "react";
import React from "react";
import Popover from "@mui/material/Popover";
import {
  Button,
  Divider,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import moment from "moment";
import {
  GridToolbarExport,
  GridToolbarColumnsButton,
  DataGridPro,
  useGridApiRef,
  gridClasses,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useRouter } from "next/navigation";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  CellText,
  ChipCustom,
  HeaderCellText,
  ProductListEditIcon,
  CellHeader,
  ProductNameCSS,
  EditIconCSS,
  FontContainer,
  Columnexport,
  Switchcolor,
  GridTable,
  AssignToBox,
  AllWithIcon,
  ProductListBox,
  TableOtherActions,
} from "@/components/products/listProduct/styles";
import {
  capitalizeFirstLetter,
  convertUnderscoreToSpaceAndCapitalize,
} from "@/utils/commonFunctions/other";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import {
  CheckDevice,
  FirstletterCapital,
  GetCurrentPlan,
  apiClient,
} from "@/components/common/common";
import { isArray } from "lodash";
import { toast } from "react-toastify";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import NoDataFound from "@/components/common/NoDataFound";
import EmptyPage from "@/components/common/EmptyPage";
import ProductListSkeleton from "@/components/products/listProduct/subComponents/Skeleton";
import { Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  PopoverContent,
  NumValue,
  Boldtxt,
  StartTxt,
  Datecol,
  ColTxt,
  ColTxtBorder,
  BigPostData,
} from "../styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "tss-react/mui";
import ProductDetailModal from "./ProductListModals/ProductDetailModal";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import Image from "next/image";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { DataGridStyle } from "@/components/common/commonStyle";
import PlanAlertDialog from "@/components/common/DeleteAlert/PlanAlert";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { BoxSeller, BoxSellerList } from "@/components/SellerSubaccount/styles";
import EditProductFormik from "@/hooks/useEditProductFormik";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { fetchSubsellerLists } from "@/hooks/sellerSubaccount";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const imgSrc =
  "https://images.pexels.com/photos/9889058/pexels-photo-9889058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "#f5f5f5",
        },
        colorPrimary: {
          "&.Mui-checked": {
            color: "#D7282F",
          },
          MuiCssBaseline: {
            "@global": {
              ".Mui-disabled": { opacity: 0.5 },
              ".Mui-selected": { background: "red" },
            },
          },
        },
        track: {
          opacity: 0.38,
          backgroundColor: "#000",
          ".Mui-checked.Mui-checked + &": {
            opacity: 0.7,
            backgroundColor: "#a5a5a5",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "error",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "error",
      },
    },
    MuiTypography: {
      defaultProps: {},
    },
  },
});

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#D7282F",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#D7282F",
  },
}));

const useStyles = makeStyles()((theme) => {
  return {
    selectdelete: {
      border: "1px solid #fff",
      padding: "0px 5px",
      borderRadius: "3px",
      "&:hover": {
        "& .MuiTypography-root": {
          color: "#d7282f",
        },
      },
    },
    statusbox: {
      width: "400px",
    },
    statusvalue: { padding: "5px 0", fontSize: "12px" },
    statusheading: { color: "#d7282f", fontWeight: 600 },

    deletetxt: {
      fontSize: "15px",
      color: "#D7282F",
      fontWeight: 400,
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
    },

    deleteicon: {
      color: "#D7282F",
      fontSize: "16px",
      fontWeight: 300,
    },

    dividerver: {
      height: "40px",
      alignSelf: "center",
    },

    producttable: {
      margin: "20px 0",
      boxShadow:
        "0px 0px 0px rgba(159, 162, 191, 0.18), 0px 1px 0px rgba(159, 162, 191, 0.32)",
      background: "white",
      paddingBottom: "50px",
    },
    bigpostImg: {
      display: "flex",
      gap: 10,
      alignItems: "center",
    },

    tableBigpost: {
      boxShadow: "none",
      borderRadius: 10,
    },
    tablehead: {
      color: "#1A2027",
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "open sans !important",
    },
    tableth: {
      color: "#3E5060",
      fontSize: "13px !important",
      fontFamily: "open sans !important",
    },
    table: {
      "& .MuiTableCell-root": {
        padding: "14px",
        margin: "4px 11px",
        borderCollapse: "collapse",
      },
    },

    moreicon: {
      display: "none",
    },
    tooltiparea: {
      display: "flex",
      gap: 10,
    },
    txt: {
      fontSize: "12px",
    },
    redbox: { borderRadius: "8px 0px 0px 0px" },
  };
});

export const ProductListTable = ({
  filteredDataNotFound,
  products,
  loader,
  count,
  setLoader,
  setProductList,
  search,
  setSearch,
  openModal,
  setCount,
  activeButton,
  current_page,
  setCurrentPage,
  getProductsLists,
  pageSize,
  delayedQuery,
  simpleSearch,
  setPageSize,
  setActiveButton,
}) => {
  const { formik } = EditProductFormik();

  const [deleteModal, setDeleteModal] = useState({
    status: false,
    id: "",
  });
  const { classes } = useStyles();
  const [multipleIds, setMultipleDeleteID] = useState<any>([]);
  const [multipleDeleteModal, setMultipleDeleteModal] =
    useState<boolean>(false);
  const [bigPost, setBigPost] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loaderState, setloaderState] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [bigPostList, setBigPostList] = useState<any>([]);
  const [totalCredit, setTotalCredit] = useState<any>(0);
  const [leftCredit, setLeftCredit] = useState<any>(0);
  const [totalView, setTotalView] = useState<any>(0);
  const [detailview, setdetailview] = useState<any>();
  const [serialNo, setSerialNo] = useState<any>(0);
  const [planLoading, setPlanLoading] = useState(false);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: any) => state.userData);
  const { sellerList } = useSelector((state: any) => state.subseller);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    dispatch(fetchSubsellerLists());
  }, []);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const router = useRouter();
  useEffect(() => {
    if (!isMobile) setIsMobile(CheckDevice());
  }, [isMobile]);

  const getProductsList = async (current_page) => {
    setLoader(true);
    const formData = new FormData();
    formData?.append("type", activeButton);
    formData.append("per_page", "10");
    formData.append("page", current_page);
    let response = await apiClient(
      `product/list`,
      "post",
      { body: formData },
      true
    );
    if (response.status == 200) {
      setCount(response);
      setProductList(response.data);
    }
    setLoader(false);
    return response;
  };

  const paginationData = (e, page) => {
    getProductsList(page + 1);
    setCurrentPage(page + 1);
  };

  const RenderSerialNo = (i) => {
    if (current_page == 1) {
      return i;
    }
    if (i - 1 == 9) {
      return `${current_page}0`;
    }
    if (current_page > 1 && i - 1 < 9) {
      return `${current_page - 1}${i}`;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setColumns([
        {
          field: "serialNo",
          headerName: "Sr. No.",
          minWidth: 80,
          flex: 1,
          headerAlign: "center",
          align: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText> {params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return <CellText>{cellValues.value}</CellText>;
          },
        },
        {
          hideable: false,
          field: "productName",
          headerName: "Post/Product Name",
          minWidth: 250,
          flex: 1,
          headerAlign: "left",
          align: "left",

          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <ProductNameCSS
                  onClick={(e) => {
                    e.stopPropagation();
                    setSerialNo(cellValues.row.serialNo);
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
                    <Image
                      width={34}
                      height={34}
                      alt="Product Image"
                      style={{ borderRadius: "50%" }}
                      src={cellValues?.row?.img}
                    />
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
          field: "category",
          headerName: "Category",
          minWidth: 140,
          flex: 1,
          headerAlign: "left",
          align: "left",

          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                {cellValues?.value === null ? (
                  "--"
                ) : (
                  <CellText>{cellValues?.value}</CellText>
                )}
              </>
            );
          },
        },
        {
          field: "postvalidity",
          headerName: "Post Validity",
          minWidth: 120,
          flex: 1,
          headerAlign: "center",
          align: "center",

          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                {cellValues?.value === null ? (
                  "--"
                ) : (
                  <CellText>
                    {convertUnderscoreToSpaceAndCapitalize(cellValues?.value)}
                  </CellText>
                )}
              </>
            );
          },
        },
        {
          field: "productType",
          headerName: "Product Type",
          minWidth: 260,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            const { is_placeholder } = cellValues?.row;
            return (
              cellValues?.value && (
                <ChipCustom
                  thinText={true}
                  danger={cellValues?.value === "simple"}
                  style={{ fontSize: 12 }}
                >
                  {is_placeholder === "yes"
                    ? `${capitalizeFirstLetter(cellValues?.value)}/Placeholder`
                    : `${capitalizeFirstLetter(cellValues?.value)}`}
                </ChipCustom>
              )
            );
          },
        },
        {
          field: "productAvailability",
          headerName: "Availability",
          minWidth: 150,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <CellText>
                <ChipCustom
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    background:
                      cellValues?.value === "in_stock"
                        ? "#ECFBE6"
                        : "rgb(255, 225, 226)",
                    color:
                      cellValues?.value === "in_stock" ? "#2a7e03" : "#d7282f",
                  }}
                >
                  {convertUnderscoreToSpaceAndCapitalize(cellValues?.value)}
                </ChipCustom>
              </CellText>
            );
          },
        },
        {
          field: "priceType",
          headerName: "Price Type",
          minWidth: 150,
          flex: 1,
          align: "center",
          headerAlign: "center",

          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            // Check if value is null, and return "--"
            if (cellValues?.value === null) {
              return "--";
            }

            // Check for "fixed", "quantity", and "price_unavailable" and return the corresponding label
            switch (cellValues?.value) {
              case "fixed":
                return (
                  <ChipCustom
                    thinText={true}
                    danger={true} // Set to true for "fixed" type
                    style={{ fontSize: 12 }}
                  >
                    Fixed
                  </ChipCustom>
                );
              case "quantity":
                return (
                  <ChipCustom thinText={true} style={{ fontSize: 12 }}>
                    Quantity
                  </ChipCustom>
                );
              case "price_unavailable":
                return (
                  <ChipCustom
                    thinText={true}
                    style={{
                      fontSize: 12,
                      background: "#FDE7E7",
                      color: "#d7282f",
                    }}
                  >
                    Price Unavailable
                  </ChipCustom>
                );
              default:
                // If none of the above cases match, return the capitalized value
                return (
                  <ChipCustom thinText={true} style={{ fontSize: 12 }}>
                    {capitalizeFirstLetter(cellValues?.value)}
                  </ChipCustom>
                );
            }
          },
        },
        {
          field: "status",
          headerName: "Status",
          minWidth: 140,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  aria-owns={
                    Boolean(anchorEl) ? "product-list-popover" : undefined
                  }
                  aria-haspopup="true"
                >
                  {params?.colDef?.headerName}
                  <HelpOutlineOutlinedIcon
                    onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                    onMouseLeave={(e) => setAnchorEl(null)}
                    style={{ fontSize: "15px", cursor: "pointer" }}
                  />
                </Box>
                <Popover
                  id="product-list-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={() => setAnchorEl(null)}
                  disableRestoreFocus
                  PaperProps={{
                    sx: {
                      bgcolor: "#fff",
                      maxWidth: "revert",
                      width: 400,
                      padding: "15px",
                    },
                  }}
                >
                  <Typography className={classes.statusheading}>
                    Status
                  </Typography>
                  <Typography className={classes.statusvalue}>
                    {" "}
                    <strong> Published: </strong>Your Products have been
                    approved by Merchant AD and can be displayed to buyers
                  </Typography>
                  <Typography className={classes.statusvalue}>
                    {" "}
                    <strong> Pending: </strong>Your Products will be reviewed by
                    our staff within 48 hours. If still showing "Pending" status
                    after 48 hours, please contact your local office for your
                    Product approval.
                  </Typography>
                  <Typography className={classes.statusvalue}>
                    {" "}
                    <strong> Draft: </strong>Product in draft status are not
                    ready for public release but are being actively worked on.
                  </Typography>
                  <Typography className={classes.statusvalue}>
                    {" "}
                    <strong> Expired: </strong>This will show product is no
                    longer available as its post date has expired..
                  </Typography>
                  <Typography className={classes.statusvalue}>
                    {" "}
                    <strong> Rejected: </strong>Your Products may contain
                    illegal or not readable information. If not, please contact
                    your local Merchant AD office.
                  </Typography>
                  <Typography className={classes.statusvalue}>
                    {" "}
                    <strong> Trash: </strong>This will show products deleted by
                    sellers and these can be restored back to products list.
                  </Typography>
                </Popover>
              </HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            let value = cellValues.row.status;
            return (
              <ChipCustom
                thinText={true}
                danger={value === "draft" || value === "pending"}
                style={{
                  fontSize: 12,
                  background:
                    value === "draft" && cellValues.row.deletedAt != 1
                      ? // ? "rgb(219, 232, 249)"
                        "#ffe7d7"
                      : value === "pending" && cellValues.row.deletedAt != 1
                      ? // ? "rgb(253, 231, 231)"
                        "#fff4db"
                      : value === "expired" && cellValues.row.deletedAt != 1
                      ? // ? "rgb(253, 231, 231)"
                        "#e4dbd8"
                      : value === "rejected" && cellValues.row.deletedAt != 1
                      ? "rgb(253, 231, 231)"
                      : // : ["expired", "rejected"].includes(value) && cellValues.row.deletedAt == 1
                      cellValues.row.deletedAt == 1
                      ? "#d2d4d5"
                      : "",
                  color:
                    value === "draft" && cellValues.row.deletedAt != 1
                      ? // ? "rgb(53, 95, 151)"
                        "#b78a01"
                      : value === "pending" && cellValues.row.deletedAt != 1
                      ? // ? "#d7282f"
                        "#cd9b09"
                      : value === "expired" && cellValues.row.deletedAt != 1
                      ? // ? "#d7282f"
                        "#795548"
                      : value === "rejected" && cellValues.row.deletedAt != 1
                      ? "#d7282f"
                      : cellValues.row.deletedAt == 1
                      ? "#343a40"
                      : "",
                }}
              >
                {capitalizeFirstLetter(
                  activeButton !== "trashed" ? cellValues.row.status : "deleted"
                )}
              </ChipCustom>
            );
          },
        },
        {
          field: "modelNo",
          headerName: "Model No.",
          minWidth: 120,
          flex: 1,
          editable: true,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText> {params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                {cellValues?.value === null ? (
                  "N/A"
                ) : (
                  <CellText>{cellValues?.value}</CellText>
                )}
              </>
            );
          },
        },
        {
          field: "quantity",
          headerName: "Qty",
          minWidth: 100,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <CellText>{cellValues?.value}</CellText>
              </>
            );
          },
        },
        {
          field: "rfq",
          headerName: "RFQ",
          minWidth: 120,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <CellText>{cellValues?.value}</CellText>
              </>
            );
          },
        },
        {
          field: "numViews",
          headerName: "No. Of Views",
          minWidth: 120,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <CellText>{cellValues?.value}</CellText>
              </>
            );
          },
        },
        {
          field: "numMessages",
          headerName: "No. Of Messages",
          minWidth: 160,
          flex: 1,
          align: "center",
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <CellText>{cellValues?.value}</CellText>
              </>
            );
          },
        },
        {
          field: "createdOn",
          headerName: "Created on",
          minWidth: 150,
          flex: 1,
          align: "center",
          headerAlign: "center",

          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <CellText>{cellValues?.value}</CellText>
              </>
            );
          },
        },
        {
          field: "updatedOn",
          headerName: "Last Updated",
          minWidth: 150,
          flex: 1,
          align: "center",
          headerAlign: "left",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            return (
              <>
                <CellText>{cellValues?.value}</CellText>
              </>
            );
          },
        },
        {
          hideable: false,
          field: "actions",
          headerName: "Actions",
          minWidth: 160,
          flex: 1,
          headerAlign: "center",
          renderHeader: (params) => {
            return (
              <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>
            );
          },
          renderCell: (cellValues) => {
            const {
              id,
              featured,
              is_big_post,
              deletedAt,
              status,
              is_placeholder,
            } = cellValues.row;

            return (
              <>
                <ProductListEditIcon>
                  {deletedAt ? (
                    (role == "seller" ||
                      (role == "subuser" &&
                        permissions?.product?.restore == true)) && (
                      <LightTooltip
                        title="Restore"
                        arrow
                        placement="top"
                        disableInteractive
                      >
                        <EditIconCSS>
                          <RestorePageOutlinedIcon
                            onClick={() => {
                              RestoreProduct(id);
                            }}
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#d7282f",
                            }}
                          />{" "}
                        </EditIconCSS>
                      </LightTooltip>
                    )
                  ) : (
                    <>
                      {(role == "seller" ||
                        (role == "subuser" &&
                          permissions?.product?.featured == true)) && (
                        <LightTooltip
                          title="Featured"
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <Switchcolor
                            disabled={status == "published" ? false : true}
                            size="small"
                            defaultChecked={featured == 0 ? false : true}
                            onChange={(e) =>
                              UpdateTable({ id, featured: featured ? 0 : 1 })
                            }
                          />
                        </LightTooltip>
                      )}
                      {(role == "seller" ||
                        (role == "subuser" &&
                          permissions?.product?.edit == true)) && (
                        <LightTooltip
                          title="Edit"
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EditIconCSS>
                            <Image
                              src="/assets/editicon.svg"
                              onClick={() => {
                                formik.resetForm();
                                if (is_placeholder === "yes") {
                                  router.push(`/products/placeholder/${id}`);
                                } else {
                                  router.push(`/products/edit/${id}`);
                                }
                              }}
                              alt="Edit"
                              width={15}
                              height={16}
                              style={{ color: "#231F20" }}
                            />{" "}
                          </EditIconCSS>
                        </LightTooltip>
                      )}
                      {(role == "seller" ||
                        (role == "subuser" &&
                          permissions?.product?.delete == true)) && (
                        <LightTooltip
                          title="Delete"
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EditIconCSS>
                            <DeleteOutlinedIcon
                              onClick={() => {
                                setMultipleDeleteModal(true);
                                setDeleteModal((prev) => ({
                                  status: true,
                                  id: cellValues?.id,
                                }));
                              }}
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#d7282f",
                              }}
                            />{" "}
                          </EditIconCSS>
                        </LightTooltip>
                      )}
                      {(role == "seller" ||
                        (role == "subuser" &&
                          permissions?.product?.duplicate == true)) && (
                        <LightTooltip
                          title={"Make Duplicate"}
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EditIconCSS
                            className={
                              is_big_post === 1 ? "textPrimary" : "textPrimary"
                            }
                          >
                            <CopyAllIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#d7282f",
                                margin: "2px 0 0;",
                              }}
                              onClick={() => {
                                CreateDuplicateProduct(id);
                              }}
                            />
                          </EditIconCSS>
                        </LightTooltip>
                      )}
                      {(role == "seller" ||
                        (role == "subuser" &&
                          permissions?.product?.big_post == true)) && (
                        <LightTooltip
                          title={
                            status == "published"
                              ? is_big_post == 1
                                ? "Remove Big Post"
                                : "Make a Big Post"
                              : ""
                          }
                          arrow
                          placement="top"
                          disableInteractive
                        >
                          <EditIconCSS
                            style={{ opacity: status == "published" ? 1 : 0 }}
                            className={
                              is_big_post == 1
                                ? "textPrimary"
                                : "textPrimary actionButton"
                            }
                          >
                            <PostAddOutlinedIcon
                              style={{
                                color: is_big_post == 1 ? "#3BB900" : "#a4a8ad",
                                fontSize: "23px",
                              }}
                              onClick={() => {
                                if (status == "published") {
                                  UpdateBigPost({
                                    id,
                                    is_big_post: is_big_post == 1 ? "0" : "1",
                                  });
                                }
                              }}
                            />
                          </EditIconCSS>
                        </LightTooltip>
                      )}
                    </>
                  )}
                </ProductListEditIcon>
              </>
            );
          },
        },
      ]);
      setloaderState(false);
    }, 0);
  }, []);

  const deleteProduct = async (id) => {
    const formData = new FormData();
    formData.append("ids", id);
    try {
      const response = await apiClient(
        "product/delete",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status == 200) {
        toast.success(response.message);
        setDeleteModal({ status: false, id: "" });
        getProductsLists(["all", []]);
        setRows((prev) => prev.filter((element) => element?.id !== id));
      }
    } catch (error) {}
  };

  const [loading, setLoading] = useState(true);
  const [Rows, setRows] = useState([]);
  const [tableState, setTableState] = useState<any>(
    JSON.parse(
      typeof window != "undefined" && localStorage.getItem("tableState")
    )
  );
  const apiRef = useGridApiRef();
  // useEffect(() => {
  //   if (products) {
  //     setRows((pre) => {
  //       let data = products?.map((element, index) => ({
  //         serialNo: index + 1,
  //         productName: element?.name,
  //         pre_title_name: element?.pre_title_name,
  //         is_placeholder: element?.is_placeholder,
  //         postId: element?.unique_number,
  //         published: element?.published,
  //         featured: element?.featured,
  //         id: element?.id,
  //         modelNo: element?.model_number,
  //         productType: element?.product_type,
  //         productAvailability: element?.availability,
  //         status: element?.published_status,
  //         createdOn: moment(element?.created_at).format("LL"),
  //         updatedOn: moment(element?.updated_at).format("LL"),
  //         deletedAt: element?.deleted_at ? 1 : "",
  //         category: element?.category_name,
  //         postvalidity: element?.validity,
  //         quantity: element?.min_qty,
  //         priceType: element?.price_type,
  //         rfq: element?.rfq_count,
  //         img: element?.photos,
  //         numMessages: element?.total_message,
  //         numViews: element?.webpagereview_count,
  //         is_big_post: element?.is_big_post,
  //       }));
  //       return data.sort((a: any, b: any) => a["serialNo"] - b["serialNo"]);
  //     });
  //   }
  //   setLoading(false);
  // }, [products]);
  let data = products
    ?.map((element, index) => ({
      serialNo: index + 1,
      productName: element?.name,
      pre_title_name: element?.pre_title_name,
      is_placeholder: element?.is_placeholder,
      postId: element?.unique_number,
      published: element?.published,
      featured: element?.featured,
      id: element?.id,
      modelNo: element?.model_number,
      productType: element?.product_type,
      productAvailability: element?.availability,
      status: element?.published_status,
      createdOn: moment(element?.created_at).format("LL"),
      updatedOn: moment(element?.updated_at).format("LL"),
      deletedAt: element?.deleted_at ? 1 : "",
      category: element?.category_name,
      postvalidity: element?.validity,
      quantity: element?.min_qty,
      priceType: element?.price_type,
      rfq: element?.rfq_count,
      img: element?.photos,
      numMessages: element?.total_message,
      numViews: element?.webpagereview_count,
      is_big_post: element?.is_big_post,
    }))
    .sort((a: any, b: any) => a["serialNo"] - b["serialNo"]);
  let List = [1, 2, 3, 4, 5, 6, 7];

  const DeleteMultiple = async (id: any) => {
    setloaderState(true);
    let ids: any;
    if (id == "") {
      ids = multipleIds.toString();
    } else {
      ids = id;
    }
    let response = await apiClient("product/delete", "post", {
      body: { ids },
    });
    if (response.status === 200) {
      setloaderState(false);
      const searchParameters = [
        { key: "name", value: simpleSearch.product_name },
        { key: "model_number", value: simpleSearch.model_no },
        { key: "unique_number", value: simpleSearch.unique_no },
      ];
      delayedQuery(searchParameters);
      setMultipleDeleteID([]);
      setDeleteModal({ status: false, id: "" });
      if (search) setSearch(false);
    }
    setMultipleDeleteModal(false);
  };

  const UpdateTable = async (dataToSend) => {
    const { id, featured } = dataToSend;
    let formData = new FormData();
    formData.append("featured", featured);
    formData.append("id", id);
    let response = await apiClient(
      "product/view/single/update",
      "post",
      {
        body: formData,
      },
      true
    );
  };
  const handlePopstate = () => {
    Swal.close();
  };
  window?.addEventListener("popstate", handlePopstate);

  const RestoreProduct = async (id: any) => {
    let ids: any;
    ids = isArray(id) ? id.toString() : id;
    let formData = new FormData();
    formData.append("product_id", ids);
    let response = await apiClient(
      "product/restore-trash",
      "post",
      {
        body: formData,
      },
      true
    );
    if (response.status == 200 || response.status == true) {
      setMultipleDeleteModal(false);
      toast.success(response.message);
      getProductsLists(["trashed", []]);
      setActiveButton("all");
    }
  };

  useEffect(() => {
    GetCurrentPlan();
  }, []);

  const UpdateBigPost = async (dataToSend) => {
    let planDetail = localStorage?.planDetail
      ? JSON.parse(localStorage.planDetail)
      : [{ id: 19, status: false }];
    let planData = planDetail.find((v) => v.id == 19);

    const { id, is_big_post } = dataToSend;

    if (is_big_post == "1") {
      if (planData.available == "0") {
        setOpenPlanModal(true);
        return;
      }
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "custom-btn cancel-button",
        cancelButton: "custom-btn remove-btn",
      },
      buttonsStyling: false,
    });
    if (is_big_post == "0") {
      swalWithBootstrapButtons
        .fire({
          // title: "Are you sure you want to remove big post?",
          title: `<div style="font-size:23px;color:#231f20;">Are you sure you want to remove big post?</div>`,
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "Yes, remove it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              // title: "Big post successfully removed!",
              title: `<div style="font-size:23px;color:#231f20;">Big post successfully removed!</div>`,
              icon: "success",
            });
            setRows((prev: any) => {
              let rows = [...prev];
              let index = rows.findIndex((v) => v.id == id);
              rows[index].is_big_post = is_big_post;
              return rows;
            });
            let formData = new FormData();
            formData.append("is_big_post", is_big_post);
            formData.append("id", id);
            let response = apiClient(
              "product/view/single/update",
              "post",
              {
                body: formData,
              },
              true
            );
            fetchBigPostList();
            GetCurrentPlan();
          } else {
            swalWithBootstrapButtons.fire({
              title: `<div style="font-size:23px;color:#231f20;">Your big post is safe!</div>`,
              icon: "info",
            });
          }
        });
    } else {
      setRows((prev: any) => {
        let rows = [...prev];
        let index = rows.findIndex((v) => v.id == id);
        rows[index].is_big_post = is_big_post;
        return rows;
      });
      let formData = new FormData();
      formData.append("is_big_post", is_big_post);
      formData.append("id", id);
      let response = await apiClient(
        "product/view/single/update",
        "post",
        {
          body: formData,
        },
        true
      );
      if (response.status === 200) {
        GetCurrentPlan();
      }
      fetchBigPostList();
    }
  };

  useEffect(() => {
    fetchBigPostList();
  }, []);

  const fetchBigPostList = async () => {
    let response = await apiClient("product/bigger/list", "get");
    if (response.status === 200) {
      const { data, total_credit, left_credit, total_views } = response;
      setBigPostList(data);
      setTotalCredit(total_credit);
      setLeftCredit(left_credit);
      setTotalView(total_views);
    }
  };

  const CreateDuplicateProduct = async (product_id) => {
    let response = await apiClient("product/duplicate/create", "post", {
      body: {
        product_id,
      },
    });

    if (response.status == 200) {
      const { new_product_id } = response;
      Swal.fire({
        title: " Product successfully cloned ",
        text: "Redirect to edit page or stay on the product list page!",
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        showCancelButton: true,
        confirmButtonText: " Go to edit page",
        cancelButtonText: "Stay here",
        buttonsStyling: false,
        showCloseButton: true,
      }).then((result) => {
        window?.removeEventListener("popstate", handlePopstate);
        if (result.isConfirmed) {
          router.push(`/products/edit/${new_product_id}`);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          getProductsLists([activeButton, []]);
        }
      });
    }
  };
  const [selectedSellerId, setSelectedSellerId] = useState("");
  const [assignValue, setAssignValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/product/assign_to_subuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          user_id: selectedSellerId,
          product_id: multipleIds,
          comment: inputRef.current.value,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        setAssignValue("");
        getProductsList(current_page);
      } else {
        console.error("Failed to submit feedback. Status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickAction = () => {
    setPlanLoading(true);
    router.push(`/plancards`);
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [columns, setColumns] = useState([]);
  return (
    <>
      <PlanAlertDialog
        open={openPlanModal}
        handleClose={() => setOpenPlanModal(false)}
        onClickAction={onClickAction}
        loading={planLoading}
        features={"Big Posts"}
      />
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
      {multipleDeleteModal && (
        <DeleteDialog
          open={multipleDeleteModal}
          text={multipleIds?.length > 1 ? "these Products" : "this Product"}
          componentText={activeButton}
          handleClose={() => {
            setMultipleDeleteModal(false);
          }}
          onClickAction={() => {
            activeButton == "trashed"
              ? RestoreProduct(multipleIds)
              : DeleteMultiple(deleteModal?.id);
          }}
        />
      )}

      <div className="producttable">
        <GridTable
          sx={{
            height: 520,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            "& .actionButton": {
              display: "block",
              visibility: "hidden",
            },
            [`& .${gridClasses.row}:hover`]: {
              ".actionButton": {
                display: "block",
                visibility: "visible",
                color: "#d7282f",
                position: "relative",
                left: -3,
                top: -1,
                cursor: "pointer",
              },
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <DataGridPro
              sx={DataGridStyle}
              className="creatposttable"
              style={{
                border: "5px",
                borderRadius: "10px",
                borderColor: "transparent",
                position: "relative",
              }}
              localeText={{
                columnMenuShowColumns: "Manage Columns",
              }}
              componentsProps={{
                panel: {
                  placement: "bottom-end",
                  sx: {
                    top: "-60px !important",
                    color: "red",
                  },
                },
              }}
              loading={loader}
              checkboxSelection
              rows={!loader ? data : []}
              page={current_page}
              onPageChange={(newPage) => setCurrentPage(newPage)}
              columns={columns}
              initialState={{
                ...tableState,
                pinnedColumns: {
                  right: window?.innerWidth < 600 ? [] : ["actions"],
                  left:
                    window?.innerWidth < 600
                      ? [GRID_CHECKBOX_SELECTION_COL_DEF.field]
                      : [
                          GRID_CHECKBOX_SELECTION_COL_DEF.field,
                          "serialNo",
                          "productName",
                        ],
                },
              }}
              pagination={true}
              rowHeight={46}
              disableSelectionOnClick
              pageSize={10}
              paginationMode="client"
              apiRef={apiRef}
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={(newSelectionModel) => {
                setMultipleDeleteID(newSelectionModel);
                setSelectedSellerId("");
              }}
              components={{
                Toolbar: () => (
                  <>
                    <Columnexport>
                      <Grid
                        container
                        sx={{ p: { xs: 0, md: 1 } }}
                        alignItems="center"
                      >
                        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                          <BoxSeller component="div">
                            <BoxSellerList component="div">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                  width: "100%",
                                  "@media screen and (max-width:768px)": {
                                    display: "block",
                                  },
                                }}
                              >
                                <ProductListBox>
                                  <FontContainer
                                    fontSize="18px !important"
                                    sx={{
                                      fontWeight: "600 !important",
                                      cursor: "default",
                                      "@media screen and (max-width:1600px)": {
                                        fontSize: "14px !Important",
                                      },
                                    }}
                                  >
                                    Product List
                                  </FontContainer>
                                  <FontContainer
                                    fontSize="14px !important"
                                    fontWeight={300}
                                    style={{ cursor: "default" }}
                                  >
                                    <AllWithIcon>
                                      <Typography>
                                        {/* changes below */}{" "}
                                        {` All ${
                                          count.data.length > 0
                                            ? `(${count.data.length})`
                                            : "(0)"
                                        }`}
                                      </Typography>
                                      <LightTooltip
                                        placement="top"
                                        arrow
                                        title='"All" includes published, pending approval, rejected, and draft listings, but does not include deleted listings.'
                                        disableInteractive
                                      >
                                        <InfoOutlinedIcon />
                                      </LightTooltip>
                                    </AllWithIcon>
                                  </FontContainer>
                                </ProductListBox>
                                {/* <Divider orientation="vertical" /> */}
                                <TableOtherActions>
                                  {multipleIds.length > 0 && (
                                    <>
                                      <Divider orientation="vertical" />
                                      <FontContainer
                                        fontSize="14px !important"
                                        fontWeight={300}
                                        style={{ cursor: "default" }}
                                      >
                                        {` Product Selected ${
                                          multipleIds.length > 0
                                            ? `(${multipleIds.length})`
                                            : "(0)"
                                        }`}
                                      </FontContainer>
                                      <Divider orientation="vertical" />
                                    </>
                                  )}

                                  {multipleIds.length > 0 && (
                                    <Box
                                      className={classes.selectdelete}
                                      component="div"
                                      display="flex"
                                      gap={0.5}
                                      alignItems="center"
                                      onClick={() =>
                                        setMultipleDeleteModal(true)
                                      }
                                    >
                                      {activeButton == "trashed" ? (
                                        <span className={classes.deletetxt}>
                                          <FontContainer
                                            fontSize="14px !important"
                                            fontWeight={300}
                                            color="#D7282F !important"
                                            style={{
                                              cursor: "pointer",
                                              display: "flex",
                                              fontFamily: "open sans",
                                            }}
                                          >
                                            Restore
                                            <RestorePageOutlinedIcon
                                              sx={{ fontSize: "20px" }}
                                            />
                                          </FontContainer>
                                        </span>
                                      ) : (
                                        <span>
                                          {(role == "seller" ||
                                            (role == "subuser" &&
                                              permissions?.product?.delete ==
                                                true)) && (
                                            <FontContainer
                                              fontSize="14px !important"
                                              fontWeight={300}
                                              color="#D7282F !important"
                                              style={{
                                                cursor: "pointer",
                                                display: "flex",
                                                fontFamily: "open sans",
                                              }}
                                            >
                                              Delete Selected{" "}
                                              <DeleteOutlinedIcon
                                                sx={{ fontSize: "20px" }}
                                              />
                                            </FontContainer>
                                          )}
                                        </span>
                                      )}
                                    </Box>
                                  )}
                                </TableOtherActions>
                              </Box>
                              {multipleIds.length > 0 && (
                                <AssignToBox>
                                  <FormControl
                                    variant="outlined"
                                    size="small"
                                    style={{ minWidth: 150 }}
                                  >
                                    <InputLabel shrink>Assign to</InputLabel>
                                    <Select
                                      label="Assign to"
                                      defaultValue=""
                                      IconComponent={
                                        KeyboardArrowDownOutlinedIcon
                                      }
                                      value={selectedSellerId}
                                      onChange={(e) => {
                                        setSelectedSellerId(e.target.value);
                                        // setAssignValue("");
                                      }}
                                      displayEmpty
                                      renderValue={(selected) => {
                                        if (!selected) {
                                          return (
                                            <span
                                              style={{
                                                color: "rgba(0, 0, 0, 0.4)",
                                              }}
                                            >
                                              Select sub account
                                            </span>
                                          );
                                        }

                                        const selectedSeller = sellerList.find(
                                          (seller) => seller.id === selected
                                        );
                                        return selectedSeller
                                          ? selectedSeller.name
                                          : "";
                                      }}
                                    >
                                      {sellerList?.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                          <Box
                                            display="flex"
                                            gap={1}
                                            alignItems="center"
                                          >
                                            <span>{item.name}</span>
                                          </Box>
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  <TextField
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    ref={inputRef}
                                    value={inputRef?.current?.value}
                                    onChange={(e) => {
                                      // alert("")
                                      const newValue = e.target.value;
                                      // setAssignValue(newValue);
                                      inputRef.current.value = newValue;
                                    }}
                                    placeholder="Add Comment..."
                                  />

                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={submitFeedback}
                                  >
                                    Assign
                                  </Button>
                                </AssignToBox>
                              )}
                            </BoxSellerList>
                          </BoxSeller>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          lg={3}
                          xl={3}
                          className="tableLink"
                        >
                          <Box sx={{}}>
                            <GridToolbarColumnsButton
                              sx={{ color: "#e74c3c" }}
                            />
                            {(role == "seller" ||
                              (role == "subuser" &&
                                permissions?.product?.export == true)) && (
                              <GridToolbarExport sx={{ color: "#e74c3c" }} />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Columnexport>
                  </>
                ),
                NoRowsOverlay: () => (
                  <>
                    {loader ? (
                      <>
                        {List.map((_, i) => (
                          <ProductListSkeleton key={i} />
                        ))}
                      </>
                    ) : (
                      <>
                        {Rows.length === 0 && search ? (
                          <NoDataFound />
                        ) : (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                            position={"relative"}
                            // zIndex="10"
                          >
                            {activeButton == "all" &&
                            !filteredDataNotFound &&
                            Rows.length === 0 ? (
                              <EmptyPage
                                text={"product"}
                                logo="/assets/Group.svg"
                                onClickHandler={() => {
                                  alert("test"), openModal(true);
                                }}
                              />
                            ) : filteredDataNotFound ? (
                              <NoDataFound   />
                            ) : (
                              <EmptyPage
                                text={"product"}
                                logo="/assets/Group.svg"
                                onClickHandler={() => openModal(true)}
                                actiontext={false}
                                customMessage={{
                                  boldText: `No ${FirstletterCapital(
                                    activeButton
                                  )} Product Found`,
                                  smallText: "",
                                }}
                              />
                            )}
                          </Stack>
                        )}
                      </>
                    )}
                  </>
                ),
                NoResultsOverlay: () => (
                  <>
                    {search && Rows.length === 0 ? (
                      <NoDataFound />
                    ) : (
                      <Stack
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                        position={"relative"}
                        zIndex="10"
                      >
                        {activeButton == "all" ? (
                          <EmptyPage
                            text={"product"}
                            logo="/assets/Group.svg"
                            onClickHandler={() => openModal(true)}
                          />
                        ) : (
                          <EmptyPage
                            text={"product"}
                            logo="/assets/Group.svg"
                            onClickHandler={() => openModal(true)}
                            actiontext={false}
                            customMessage={{
                              boldText: `No ${FirstletterCapital(
                                activeButton
                              )} Product Found`,
                              smallText: "",
                            }}
                          />
                        )}
                      </Stack>
                    )}
                  </>
                ),
                LoadingOverlay: () => {
                  return (
                    <>
                      {List.map((v, i) => (
                        <ProductListSkeleton key={i} />
                      ))}
                    </>
                  );
                },
              }}
            />
          </ThemeProvider>
        </GridTable>
        {bigPostList?.length > 0 && (
          <BigPostData>
            {bigPostList.length > 0 && (
              <PopoverContent>
                <NumValue className={bigPost ? classes.redbox : null}>
                  {bigPostList.length}
                  <Typography style={{ fontSize: "12px", fontWeight: "600" }}>
                    Product
                  </Typography>
                </NumValue>

                <ColTxt>
                  <Boldtxt> Big Post</Boldtxt>
                </ColTxt>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.dividerver}
                />
                <ColTxtBorder>
                  <StartTxt>Total Credit</StartTxt>
                  <Datecol>{totalCredit}</Datecol>
                </ColTxtBorder>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.dividerver}
                />
                <ColTxtBorder>
                  <StartTxt>Credit Left</StartTxt>
                  <Datecol>{leftCredit}</Datecol>
                </ColTxtBorder>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.dividerver}
                />
                <ColTxt
                  style={{ display: "flex", gap: 10, alignItems: "center" }}
                >
                  <StartTxt>Total Views</StartTxt>
                  <Boldtxt>{totalView}</Boldtxt>
                </ColTxt>
                {!bigPost ? (
                  <KeyboardArrowDownIcon
                    style={{ marginRight: "16px", cursor: "pointer" }}
                    onClick={() => setBigPost(true)}
                  />
                ) : (
                  <KeyboardArrowUpIcon
                    style={{ marginRight: "16px", cursor: "pointer" }}
                    onClick={() => setBigPost(false)}
                  />
                )}
              </PopoverContent>
            )}
            {bigPost && bigPostList?.length > 0 && (
              <TableContainer
                component={Paper}
                className={classes.tableBigpost}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tablehead}>
                        Serial No.
                      </TableCell>
                      <TableCell className={classes.tablehead} align="left">
                        Post/Product Name
                      </TableCell>
                      <TableCell className={classes.tablehead} align="left">
                        Product ID
                      </TableCell>

                      <TableCell className={classes.tablehead} align="left">
                        No. of Views
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bigPostList.map((row, index) => (
                      <TableRow
                        key={row.index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={classes.tableth}
                          sx={{ th: { border: "1px solid #000" } }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell align="right" className={classes.tableth}>
                          <Box className={classes.bigpostImg} textAlign="left">
                            {row.photos === null ? (
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
                              <Image
                                src={row.photos}
                                height={30}
                                width={30}
                                alt="Product images"
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <Typography
                              component="span"
                              className={classes.tableth}
                            >
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left" className={classes.tableth}>
                          {row.unique_number}
                        </TableCell>
                        <TableCell align="left" className={classes.tableth}>
                          {row.web_review_count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </BigPostData>
        )}
      </div>
    </>
  );
};

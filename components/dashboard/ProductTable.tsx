import { useState, useEffect, useMemo, useContext } from "react";
import {
  colors,
  Divider,
  Stack,
  styled,
  TableFooter,
  Tooltip,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
// import { ProductContext } from "contextApi/productContext";
import { MyAppContext } from "contextApi/appContext";
import {
  GridToolbarExport,
  GridToolbarColumnsButton,
  DataGridPro,
  GridEventListener,
  useGridApiRef,
} from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import { Box } from "@mui/material";
import Switch from "@mui/material/Switch";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { BASE_URL, LOCAL_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { useRouter } from "next/navigation";
import {
  CellText,
  ChipCustom,
  Header,
  HeaderCellText,
  ProductListEditIcon,
  CellHeader,
  ProductNameCSS,
  EditIconCSS,
  FontContainer,
  Columnexport,
  Switchcolor,
  Fontcontainer2,
} from "@/components/products/listProduct/styles";
import {
  capitalizeFirstLetter,
  convertUnderscoreToSpaceAndCapitalize,
} from "@/utils/commonFunctions/other";
import { CustomChip } from "@/components/profile/personalProfile/jobDetails/styles";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { ReplaceSpaces, apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import NoDataFound from "@/components/common/NoDataFound";
import EmptyPage from "@/components/common/EmptyPage";
import ProductListSkeleton from "@/components/products/listProduct/subComponents/Skeleton";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { Card } from "./style";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { DataGridStyle } from "@/components/common/commonStyle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { SerialNo } from "../../editProduct/productInformation/activePassive/active/addAuxiliary/styles";

LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const imgSrc =
  "https://images.pexels.com/photos/9889058/pexels-photo-9889058.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#D7282F",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#D7282F",
  },
}));

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
export const ProductTable = ({
  products,
  loader,
  getProductsList,
  search,
  setSearch,
}) => {
  // const { formik } = useContext(ProductContext);

  const [deleteModal, setDeleteModal] = useState({
    status: false,
    id: "",
  });
  const [multipleIds, setMultipleDeleteID] = useState<any>([]);
  const [multipleDeleteModal, setMultipleDeleteModal] =
    useState<boolean>(false);

  const router = useRouter();
  const NavigateHandlerr = (route) => router.push(route);
  const columns: any = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return <HeaderCellText> {params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        return <CellText>{cellValues.value}</CellText>;
      },
    },

    {
      hideable: false,
      field: "postId",
      headerName: "Post/Product Id",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        return <CellText>{cellValues?.value}</CellText>;
      },
    },

    {
      hideable: false,
      field: "productName",
      headerName: "Post/Product Name",
      minWidth: 250,
      flex: 2,
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
                NavigateHandler(cellValues);
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
                  title={cellValues.value}
                  followCursor
                  placement="top"
                  arrow
                >
                  <CellText style={{ color: "#1A2027" }}>
                    {cellValues.value}
                  </CellText>
                </LightTooltip>
                <LightTooltip
                  title={cellValues.row.pre_title_name}
                  followCursor
                  placement="top"
                  arrow
                >
                  <CellText
                    style={{ fontSize: "12px", color: "rgb(123, 121, 121)" }}
                  >
                    {cellValues.row.pre_title_name}
                  </CellText>
                </LightTooltip>
              </CellHeader>
            </ProductNameCSS>
          </>
        );
      },
    },

    {
      field: "productType",
      headerName: "Product Type",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        return (
          cellValues?.value && (
            <ChipCustom
              thinText={true}
              danger={cellValues?.value === "simple"}
              style={{ fontSize: 12 }}
            >
              {capitalizeFirstLetter(cellValues?.value) === "Simple"
                ? "Simple"
                : "Configuration"}
            </ChipCustom>
          )
        );
      },
    },

    {
      field: "productAvailability",
      headerName: "Availability",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        return (
          <CellText>
            <ChipCustom
              danger={cellValues?.value === "by_order"}
              style={{ fontSize: 12 }}
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
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",

      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        return cellValues?.value === null ? (
          "--"
        ) : (
          <ChipCustom thinText={true} danger={cellValues?.value === "fixed"}>
            {capitalizeFirstLetter(cellValues?.value) === "Fixed"
              ? "Fixed"
              : "Quantity"}
          </ChipCustom>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",

      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
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
      field: "quantity",
      headerName: "Qty",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
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
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: (params) => {
        return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
      },
      renderCell: (cellValues) => {
        let value = cellValues.row.status;
        return (
          <ChipCustom
            thinText={true}
            danger={value === "draft" || value == "pending"}
            style={{
              fontSize: 12,
              background: ["expired", "rejected"].includes(value)
                ? "#ffebec "
                : "",
              color: ["expired", "rejected"].includes(value) ? "#d7282f" : "",
            }}
          >
            {capitalizeFirstLetter(cellValues.row.status)}
          </ChipCustom>
        );
      },
    },
    // {
    //   hideable: false,
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 130,
    //   headerAlign: "center",
    //   renderHeader: (params) => {
    //     return <HeaderCellText>{params?.colDef?.headerName}</HeaderCellText>;
    //   },
    //   renderCell: (cellValues) => {
    //     const { id, featured, status } = cellValues.row;
    //     return (
    //       <>
    //         <ProductListEditIcon>
    //           <Tooltip title="Featured">
    //             <Switchcolor
    //               size="small"
    //               disabled={status == "published" ? false : true}
    //               defaultChecked={featured == 0 || featured == '' ? false : true}
    //               onChange={(e) =>
    //                 UpdateTable({ id, featured: featured ? 0 : 1 })
    //               }
    //             />
    //           </Tooltip>
    //           <Tooltip title="Edit">
    //             <EditIconCSS>
    //               <Image
    //                 src="/assets/editicon.svg"
    //                 onClick={() => {
    //                   formik.resetForm();
    //                   router.push(`/products/edit/${id}`);
    //                 }}
    //                 alt="Edit"
    //                 width={15}
    //                 height={16}
    //                 style={{ color: "#231F20" }}
    //               />{" "}
    //             </EditIconCSS>
    //           </Tooltip>

    //           <Tooltip title="Delete">
    //             <EditIconCSS>
    //               <DeleteOutlineOutlinedIcon
    //                 onClick={() => {
    //                   setDeleteModal((prev) => ({
    //                     status: true,
    //                     id: cellValues?.id,
    //                   }));
    //                 }}
    //                 style={{
    //                   width: "20px",
    //                   height: "20px",
    //                   color: "#d7282f",
    //                 }}
    //               />{" "}
    //             </EditIconCSS>
    //           </Tooltip>
    //         </ProductListEditIcon>
    //       </>
    //     );
    //   },
    // },
  ];

  const RenderStatus = (status) => {
    if (status == "0") return "pending";
    if (status == "1") return "published";
    if (status == "2") return "draft";
    if (status == "3") return "published";
    if (status == "4") return "rejected";
  };

  const NavigateHandler = (value: any) => {
    const { slug, category, company_details, id } = value.row;
    let user_id = JSON.parse(localStorage.getItem("userData")).id;
    window.open(
      `/productdetail/${ReplaceSpaces(category)}/${ReplaceSpaces(
        company_details?.slug ?? "powercozmo"
      )}/${ReplaceSpaces(slug)}/${id}/${user_id}`,
      "_blank",
      "noreferrer"
    );
  };

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
        setRows((prev) => prev.filter((element) => element?.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);
  const [Rows, setRows] = useState([]);
  const [tableState, setTableState] = useState<any>(
    JSON.parse(
      typeof window != "undefined" && localStorage.getItem("tableState")
    )
  );
  const apiRef = useGridApiRef();
 useEffect(() => {
  if (products) {
    setRows(() => {
      let data = products
        ?.filter((element) => element?.published_status === "published")
        .map((element, index) => ({
          serialNo: index + 1,
          productName: element?.name,
          pre_title_name: element?.pre_title_name,
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
          category: element?.category_name,
          postvalidity: element?.validity,
          company_details: element?.company_details,
          slug: element?.slug,
          quantity: element?.min_qty,
          priceType: element?.price_type,
          rfq: 0,
          img: element?.photos,
          numMessages: element?.total_message,
          numViews: element?.webpagereview_count,
        }));

      return data.sort((a, b) => a.serialNo - b.serialNo);
    });
  }
  setLoading(false);
}, [products]);


  const handleStateChange: GridEventListener<any> = (
    params,
    event,
    details
  ) => {
    // temporarily storing state of grid in localstorage, later will be replaced with an api call and its done
    localStorage.setItem(
      "tableState",
      JSON.stringify(apiRef.current.exportState())
    );
  };
  let List = [1, 2, 3, 4, 5, 6, 7];

  const DeleteMultiple = async () => {
    const ids = multipleIds.toString();
    let response = await apiClient("product/delete", "post", {
      body: { ids },
    });
    if (response.status === 200) {
      getProductsList("all", []);
      if (search) setSearch(false);
    }
    setMultipleDeleteID([]);
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

  return (
    <Box
      sx={{
        height: `${Rows?.length === 0 ? "395px" : "500px"}`,
        width: "100%",
      }}
    >
      {loader ? (
        <>
          <ProductListSkeleton />
        </>
      ) : Rows.length === 0 ? (
        <Box
          sx={{
            minHeight: "395px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmptyPage
            text={"Products"}
            logo="/assets/Group.svg"
            onClickHandler={() => {
              NavigateHandlerr("./products/List?add");
            }}
          />
        </Box>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <DataGridPro
              style={{
                border: "5px",
                borderRadius: "10px",
                borderColor: "transparent",
              }}
              componentsProps={{
                panel: {},
              }}
              localeText={{
                columnMenuShowColumns: "Manage Columns",
              }}
              loading={loader}
              rows={!loader ? Rows : []}
              columns={columns}
              initialState={{
                ...tableState,
              }}
              rowHeight={46}
              disableSelectionOnClick
              pagination={Rows.length > 0}
              apiRef={apiRef}
              experimentalFeatures={{ newEditingApi: true }}
              rowsPerPageOptions={[5, 10, 20]}
              onStateChange={handleStateChange}
              onSelectionModelChange={(newSelectionModel) =>
                setMultipleDeleteID(newSelectionModel)
              }
              components={{
                Toolbar: () => (
                  <>
                    {(deleteModal?.status || multipleDeleteModal) && (
                      <DeleteDialog
                        open={deleteModal?.status || multipleDeleteModal}
                        text="Product"
                        handleClose={() => {
                          multipleDeleteModal
                            ? setMultipleDeleteModal(false)
                            : setDeleteModal((prev) => ({
                                status: false,
                                id: "",
                              }));
                        }}
                        onClickAction={() => {
                          multipleDeleteModal
                            ? DeleteMultiple()
                            : deleteProduct(deleteModal?.id);
                        }}
                      />
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
        </>
      )}
    </Box>
  );
};

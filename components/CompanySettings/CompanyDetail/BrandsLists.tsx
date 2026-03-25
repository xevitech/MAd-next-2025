import { Box, Divider, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  OuterContainer,
  HeaderContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
import { apiClient } from "@/components/common/common";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { MyAppContext } from "@/contextApi/appContext";
import EmptyPage from "@/components/common/EmptyPage";
import NoDataFound from "@/components/common/NoDataFound";
import { DataGridStyle } from "@/components/common/commonStyle";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import ServicesSkeleton from "./Services/Skeleton";
import ImageViewer from "@/components/common/ImageViewer";
import moment from "moment";
import BrandSkeleton from "./FactoryDetails/BrandSkeleton";
import { ChipCustom } from "@/components/products/listProduct/styles";
import { capitalizeFirstLetter } from "@/utils/commonFunctions/other";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
const BrandLists = () => {
  const [brandList, setBrandList] = useState<any>([]);
  const [cloneBrandList, setCloneBrandList] = useState<any>([]);
  const [addMore, setAddMore] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteID, setDeleteID] = useState<any>([]);
  const { breakPoints } = useContext(MyAppContext);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [viewImage, setViewImage] = useState<boolean>(false);
  const [edit, setEdit] = useState("");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const router = useRouter();
  const NavigateHandlerr = (route) => router.push(route);
  // End Right Drawer flapout //
  const dispatch = useDispatch();
  const fetchBrandList = async () => {
    let response = await apiClient("my/brands/list?status=1", "get");
    if (response?.status === 200) {
      setBrandList(response?.data);
      setCloneBrandList(response?.data);
      dispatch(getCompanyProfile());
    }
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    fetchBrandList();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Brand Name",
      minWidth: 100,
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "logo",
      headerName: "Brand Image",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <img
          style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%",
            cursor: "pointer",
            objectFit: "contain",
          }}
          alt="Brand Image"
          src={
            params.value
              ? params.value
              : "/assets/default/defaultCompanyImage.png"
          }
          onClick={() => {
            setViewImage(true);
            setImageUrl(
              params.value
                ? params.value
                : "/assets/default/defaultCompanyImage.png"
            );
            setEdit(params?.row?.name);
          }}
        />
      ),
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created on",
      flex: 1,
      renderCell: (params) =>
        moment(params.row.created_at).format("DD/MM/YYYY"),
    },
    {
      field: "updated_at",
      headerName: "Updated on",
      flex: 1,
      renderCell: (params) =>
        moment(params.row.created_at).format("DD/MM/YYYY"),
    },
    {
      field: "approval_status",
      headerName: "Approval Status",
      flex: 1,
      editable: true,
      renderCell: (cellValues) => {
        let value = cellValues.row.approval_status;
        return <ChipCustom>{value == 1 ? "Approved" : ""}</ChipCustom>;
      },
    },
  ];

  let List = [1, 2, 3, 4, 5];
  const [loader, setLoader] = useState<boolean>(false);
  const [tableState, setTableState] = useState<any>(
    JSON.parse(
      typeof window != "undefined" && localStorage.getItem("tableState")
    )
  );

  const apiRef = useGridApiRef();

  return (
    <Box
      sx={{
        height: `${brandList?.length === 0 ? "395px" : "500px"}`,
        width: "100%",
        "& .MuiDataGrid-root.MuiDataGrid-root": {
          height: "100%",
        },
      }}
    >
      {loader ? (
        <>
          <BrandSkeleton />
        </>
      ) : brandList?.length === 0 ? (
        <Box
          sx={{
            minHeight: "393px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmptyPage
            text={"brands"}
            logo="/assets/brand.svg"
            onClickHandler={() => {
              NavigateHandlerr("./seller/brands");
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
              rows={!loader ? brandList : []}
              columns={columns}
              initialState={{
                ...tableState,
              }}
              rowHeight={46}
              disableSelectionOnClick
              pagination={brandList.length > 0}
              pageSize={5}
              apiRef={apiRef}
              experimentalFeatures={{ newEditingApi: true }}
              rowsPerPageOptions={[5, 10, 20]}
              onSelectionModelChange={(newSelectionModel) =>
                setDeleteID(newSelectionModel)
              }
              sx={DataGridStyle}
              hideFooterSelectedRowCount={true}
              components={{
                LoadingOverlay: () => {
                  return (
                    <>
                      {List.map((v, i) => (
                        <BrandSkeleton key={i} />
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
export default BrandLists;

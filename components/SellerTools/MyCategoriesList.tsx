import React, { useEffect, useState } from "react";
import { LicenseInfo } from "@mui/x-license-pro";
import DetailsIcon from "@mui/icons-material/Details";
import {
  SellerCatgoryThName,
  SellerCatgoryValue,
  BoxText,
  SellerCatgoryStatus,
  CategoryTable,
  ParentCategoryBox,
} from "./styles";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Mainbox } from "./styles";
import { DataGridPro, useGridApiRef } from "@mui/x-data-grid-pro";
import { DataGridStyle } from "../common/commonStyle";
import ServicesSkeleton from "../CompanySettings/CompanyDetail/Services/Skeleton";
import NoDataFound from "../common/NoDataFound";
import EmptyPage from "../common/EmptyPage";
import { useRouter } from "next/router";
import { apiClient } from "../common/common";
import Auth from "@/auth/Auth";
import CategorySkeleton from "./CategorySkeleton";
import { ChipCustom } from "../products/listProduct/styles";
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
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <CategoryTable>
          <Typography>{children}</Typography>
        </CategoryTable>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function MyCategoriesList() {
  const router = useRouter();
  const navigateHandler = (route) => router.push(route);
  const columns = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        const rowIndex = params.api.getRowIndex(params.id) + 1;
        return <>{rowIndex}</>;
      },
    },
    {
      field: "id",
      headerName: "Id",
      minWidth: 60,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            <SellerCatgoryThName>
              {params?.colDef?.headerName}
            </SellerCatgoryThName>
          </div>
        );
      },
      renderCell: (cellValues) => {
        return (
          <>
            <div>
              <SellerCatgoryValue>{cellValues?.row?.id}</SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "sector",
      headerName: "Sector",
      minWidth: 200,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            <SellerCatgoryThName>
              {params?.colDef?.headerName}
            </SellerCatgoryThName>
          </div>
        );
      },
      renderCell: (cellValues) => {
        let newParent = extractDataRecursive(cellValues?.row)
          ?.reverse()
          ?.find((ele) => ele.parent_name == null);
        return (
          <>
            <div>
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  objectFit: "contain",
                  margin: "0 6px 0 0px",
                }}
                src={newParent?.icon}
                alt="vv"
              />
            </div>

            <div>
              <SellerCatgoryValue>{newParent?.name}</SellerCatgoryValue>
            </div>
          </>
        );
      },
    },
    {
      field: "parent_id",
      headerName: "Parent Category",
      minWidth: 500,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },
      renderCell: (cellValues) => {
        let newParent = extractDataRecursive(cellValues?.row)?.reverse();
        return (
          <ParentCategoryBox>
            {newParent?.length > 0 &&
              newParent?.map(
                (ele, index) =>
                  ele?.parent_name != null && (
                    <>
                      <SellerCatgoryValue
                        style={{
                          color:
                            index == newParent.length - 1
                              ? "#34A853"
                              : "#231F20",
                        }}
                      >
                        {ele?.name}
                      </SellerCatgoryValue>
                      {index !== newParent.length - 1 && (
                        <i
                          style={{
                            fontSize: "10px",
                            padding: "0 4px",
                            margin: "1px 3px 0px",
                          }}
                        ></i>
                      )}
                    </>
                  )
              )}
          </ParentCategoryBox>
        );
      },
    },
    {
      field: "approval_status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: (params) => {
        return (
          <SellerCatgoryThName>
            {params?.colDef?.headerName}
          </SellerCatgoryThName>
        );
      },
      renderCell: (cellValues) => {
        let value = cellValues.row.approval_status;
        return <ChipCustom>{value == 1 ? "Approved" : ""}</ChipCustom>;
      },
    },
  ];
  const [multipleDeleteID, setMultipleDeleteID] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [value, setValue] = React.useState(0);
  const [renderComponent, setRenderComponent] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const getCategoryList = async (parentId = 0, level = 0, type = "new") => {
    setLoader(true);
    let response = await apiClient("category/list?status=1", "post", {
      body: { fetch: "all", parent: parentId, user_id: Auth?.userData()?.id },
    });
    if (response.status === 200) {
      setLoader(false);
      setCategoryList(response?.data);
    }
  };

  useEffect(() => {
    setRenderComponent(true);
    getCategoryList();
  }, []);

  let List = [1, 2, 3, 4, 5];
  function extractDataRecursive(data, result = []) {
    if (data && typeof data === "object") {
      result.push({
        id: data.id,
        name: data.name,
        parent_id: data.parent_id,
        parent_name: data.parent_name,
        icon: data.icon,
      });
      if (data.children_recursive) {
        extractDataRecursive(data.children_recursive, result);
      }
    }
    return result;
  }
  const apiRef = useGridApiRef();
  return (
    <Box
      sx={{
        height: `${categoryList?.length === 0 ? "395px" : "500px"}`,
        width: "100%",
        "& .MuiDataGrid-root.MuiDataGrid-root": {
          height: "100%",
        },
      }}
    >
      {loader ? (
        <>
          <CategorySkeleton />
        </>
      ) : categoryList.length === 0 ? (
        <Box
          sx={{
            minHeight: "395px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmptyPage
            text={"category"}
            logo="/assets/no-categories.svg"
            onClickHandler={() => navigateHandler("./seller/categories")}
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
              loading={loader}
              rows={!loader ? categoryList : []}
              columns={columns}
              localeText={{
                columnMenuShowColumns: "Manage Columns",
              }}
              rowHeight={46}
              disableSelectionOnClick
              pagination={categoryList?.length > 0}
              pageSize={5}
              apiRef={apiRef}
              experimentalFeatures={{ newEditingApi: true }}
              rowsPerPageOptions={[5, 10, 20]}
              onSelectionModelChange={(newSelectionModel) =>
                setMultipleDeleteID(newSelectionModel)
              }
              sx={DataGridStyle}
              hideFooterSelectedRowCount={true}
              // autoHeight
              components={{
                // NoRowsOverlay: () => (
                //   <>
                //     {loader ? (
                //       <>
                //         {List.map((v, i) => (
                //           <CategorySkeleton key={i} />
                //         ))}
                //       </>
                //     ) : (
                //       <>
                //         {categoryList?.length ? (
                //           <NoDataFound />
                //         ) : (
                //           <EmptyPage
                //             text={"category"}
                //             logo="/assets/no-categories.svg"
                //             onClickHandler={() =>
                //               navigateHandler("./seller/categories")
                //             }
                //           />
                //         )}
                //       </>
                //     )}
                //   </>
                // ),
                LoadingOverlay: () => {
                  return (
                    <>
                      {List.map((v, i) => (
                        <CategorySkeleton key={i} />
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
}
export default MyCategoriesList;

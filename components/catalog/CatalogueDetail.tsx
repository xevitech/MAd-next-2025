import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  CatelogueDetailHeadingBox,
  CatelogueDetailOuter,
  CatelogueDetailSubHeadingBox,
  DataGridStyle,
  MainHeadingCatalogue,
} from "./style";
import { DataGridPro } from "@mui/x-data-grid-pro";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "react-redux";
import { GridRenderCellParams } from "@mui/x-data-grid-pro";
const columns: any = [
  {
    field: "index",
    headerName: "Sr. No.",
    // minWidth: 50,
    // flex: 1,
    headerAlign: "left",
    align: "left",
    renderCell: (params) => {
      const rowIndex = params.api.getRowIndex(params.id) + 1;
      return <>{rowIndex}</>;
    },
  },
  {
    field: "id",
    headerName: "Product ID",
    minWidth: 100,
    flex: 1,
    headerAlign: "left",
    align: "left",
    editable: false,
  },

  {
    field: "name",
    headerName: "Product Name",
    minWidth: 100,
    flex: 1,
    editable: false,
    headerAlign: "left",
    align: "left",
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Box
          sx={{
            height: "32px",
            width: "32px",
            border: "1px solid #ddd",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {params.row.main_image && (
            <img
              src={params.row.main_image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt={`Product ${params.row.id}`}
            />
          )}
        </Box>
        <Typography sx={{fontSize:'13px',margin:'0 0 0 10px'}}>{params.row.name}</Typography>
        
      </>
    ),
  },
  {
    field: "brand_name",
    headerName: "Product Brand",
    flex: 1,
    editable: false,
    headerAlign: "left",
    align: "left",
  },
];
export default function CatalogueDetail({ toggleDrawer, catalogueData }) {
  const { catalogData, loader } = useSelector(
    (state: any) => state.productList
  );
  const catalogueDetail = catalogData?.find(
    (item) => item?.id == catalogueData
  );
  const productList = catalogData[0]?.product_list;
  const rows = productList.map((product) => ({
    id: product.id,
    name: product.name,
    main_image: product?.main_image,
    brand_name: product?.brand?.name,
  }));

  return (
    <>
      <Box
        sx={{
          padding: "12px 16px 0px 16px",
        }}
      >
        <MainHeadingCatalogue
          sx={{
            position: "sticky",
            top: "0px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography>Catalog Detail</Typography>
          </Box>
          <Box>
            <CloseOutlinedIcon
              sx={{ color: "#d7282f", cursor: "pointer", fontSize: "20px" }}
              onClick={() => toggleDrawer()}
            />
          </Box>

          {/* <Divider /> */}
        </MainHeadingCatalogue>
        <Divider />
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <CatelogueDetailOuter>
              <CatelogueDetailHeadingBox>
                <Typography>Catalog Name</Typography>
              </CatelogueDetailHeadingBox>
              <CatelogueDetailSubHeadingBox>
                <Typography>{catalogueDetail?.name}</Typography>
              </CatelogueDetailSubHeadingBox>
            </CatelogueDetailOuter>
          </Grid>
          <Grid item xs={12}>
            <CatelogueDetailOuter>
              <CatelogueDetailHeadingBox>
                <Typography>Category</Typography>
              </CatelogueDetailHeadingBox>
              <CatelogueDetailSubHeadingBox>
                <Typography>{catalogueDetail?.cat?.name}</Typography>
              </CatelogueDetailSubHeadingBox>
            </CatelogueDetailOuter>
          </Grid>
          <Grid item xs={12}>
            <CatelogueDetailOuter>
              <CatelogueDetailHeadingBox>
                <Typography>Catalogue Images</Typography>
              </CatelogueDetailHeadingBox>
              <CatelogueDetailSubHeadingBox sx={{}}>
                <Grid container spacing={1}>
                  {catalogueDetail?.image?.length > 0 ? (
                    catalogueDetail.image.map((img, index) => (
                      <Grid item xs={4} key={index}>
                        <Box
                          sx={{
                            height: "120px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "4px",
                          }}
                        >
                          <img
                            src={img}
                            alt={`Catalogue Image`}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No images available</Typography>
                  )}
                </Grid>
              </CatelogueDetailSubHeadingBox>
            </CatelogueDetailOuter>
          </Grid>
        </Grid>
        <MainHeadingCatalogue sx={{ margin: "12px 0 0 0" }}>
          <Typography>Product List</Typography>
          <Divider />
        </MainHeadingCatalogue>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Box>
              <DataGridPro
                autoHeight
                columns={columns}
                rows={rows}
                rowHeight={38}
                headerHeight={40}
                // checkboxSelection
                sx={DataGridStyle}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

import React, {  useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { InputBase, Stack,styled } from "@mui/material";
import { Box, Button, Grid } from "@mui/material";
import { LicenseInfo } from "@mui/x-license-pro";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

import {
  Header,
  OuterContainer,
  InnerContainer,
  Card,
} from "../SellerTools/styles";
import { ProfileHeader } from "../common/profileheader";
import SkeletonForEnquiryList from "./enquiryListSkeleton";
import EmptyPage from "../common/EmptyPage";
import { DataGridStyle } from "../common/commonStyle";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { enquiries } from "@/hooks/useEnquiryList";

export const Searchbar = styled("div")(({ theme }) => ({
  border: "1px solid #2233541a",
  paddingLeft: "10px",
  position: "relative",
  marginLeft: "10px !important",
  width: "96%",
  borderRadius: "3px",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  right: "10px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    width: "100%",
  },
}));
export const PendingButton = styled(Button)({
    fontSize: "13px",
    borderRadius: "6px",
    boxShadow: "none",
    textTransform: "capitalize", 
    padding:"4px 7px"
 });



export default function ListEnqiry(props) {
  let List = [1, 2, 3, 4, 5, 6, 7, 8];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(enquiries());
  }, [dispatch]);
  const { enquiry, pageLoader, loader } = useSelector(
    (state: any) => state.enquiry
  );

  const [pageSize, setPageSize] = useState(10);
  const [editstate, editsetState] = useState({ right: true });

  const toggleDrawer1 = (anchor1, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    editsetState({ ...editstate, [anchor1]: open });
  };

  const columns = [
    {
      field: "serialNo",
      headerName: "Sr. No.",
      minWidth: 100,
      flex: 1,
      renderCell: (cellValues) => {
        console.log("cellvalue", cellValues);
        return <div>{cellValues.value}</div>;
      },
    },
    {
      field: "product_id",
      headerName: "Product Id",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return <>{params.value != undefined ? params.value : "--"}</>;
      },
    },
    {
      field: "name",
      headerName: "Sender Name",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        console.log(params, "params of the sender name");
        return (
          <>
            {params?.row?.enquiry_user?.name != undefined
              ? params?.row?.enquiry_user?.name?.charAt(0).toUpperCase() +
                params?.row?.enquiry_user?.name.slice(1)
              : "--"}
          </>
        );
      },
    },
    {
      field: "product_name",
      headerName: "Product Name",
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.productlist?.name != undefined
              ? params?.row?.productlist?.name?.charAt(0).toUpperCase() +
                params?.row?.productlist?.name?.slice(1)
              : "--"}
          </>
        );
      },
    },
    {
      field: "enquiry_message",
      headerName: "message",
      type: "text",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.value
              ? params.value.charAt(0).toUpperCase() + params.value.slice(1)
              : "--"}
          </>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <PendingButton
              variant="contained"
              style={{
                color: `${params.value == "pending" ? "#FFFFFF" : "#FFBF00"}`,
                border: `${
                  params.value == "pending"
                    ? "1px solid #F6272F"
                    : "1px solid #d7282fcc"
                }`,
                backgroundColor: "#d7282fcc",
              }}
            >
              {params.value == "pending" ? "Pending" : "Blocked"}
            </PendingButton>
          </>
        );
      },
    },
  ];

  return (
    <div className="full_page">
      <Grid container>
        <Grid item xs={12}>
          <OuterContainer>
            <InnerContainer>
              <ProfileHeader text={"Enquiry"} />
              <Header>
                <Card>
                  {loader ? (
                    <>
                      {List.map((v, i) => (
                        <SkeletonForEnquiryList key={i} />
                      ))}
                    </>
                  ) : (
                    <>
                      {enquiry?.length > 0 ? (
                        <Box sx={{ overflow: "auto" }}>
                          <Box
                            sx={{
                              height: 500,
                              width: "100%",
                              display: "table",
                              tableLayout: "fixed",
                            }}
                          >
                            <DataGridPro
                              sx={DataGridStyle}
                              rows={!loader ? enquiry : []}
                              columns={columns}
                              pageSize={pageSize}
                              rowHeight={45}
                              rowsPerPageOptions={[5, 10, 25, 50, 100]}
                              onPageSizeChange={(newPageSize) =>
                                setPageSize(newPageSize)
                              }
                              pagination
                              checkboxSelection={true}
                              disableSelectionOnClick={true}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            height: 520,
                            width: "100%",
                            display: "table",
                            tableLayout: "fixed",
                          }}
                        >
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                            position={"relative"}
                            zIndex="10"
                          >
                            <EmptyPage
                              text={"Enquiry"}
                              onClickHandler={() => {}}
                              logo="/assets/contact_img.svg"
                              actiontext={false}
                            />
                          </Stack>
                        </Box>
                      )}
                    </>
                  )}
                </Card>
              </Header>
            </InnerContainer>
          </OuterContainer>
        </Grid>
      </Grid>
    </div>
  );
}

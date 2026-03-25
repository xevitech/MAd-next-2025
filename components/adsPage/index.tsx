import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Adsbutton,
  Adsbuttontext,
  EditIconCSS,
  HeadingAndButton,
} from "./style";
import { ButtonBase, Grid, Modal, Stack, Typography } from "@mui/material";
import { ProfileHeader } from "../common/profileheader";
import { OuterContainer, InnerContainer } from "../SellerTools/styles";
import { MenuItem, TextField } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import EmptyPage from "../common/EmptyPage";
import { DataGridStyle } from "../common/commonStyle";
import SkeletonForContactList from "../ContactList/ContactListSkeleton";
import styled from "@emotion/styled";
import moment from "moment";
import CreateAdd from "./CreateAdd";
import Image from "next/image";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { apiClient } from "../common/common";
import Head from "next/head";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { FontContainer } from "@/components/products/listProduct/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
const adsTypeFilter = [
  {
    value: "simple",
    label: "Simple",
  },
];

export const ListHeader = styled("div")({
  justifyContent: "space-between",
  flex: 1,
  background: "#FFFFFF",
  boxShadow: "0px 4px 20px rgb(170 180 190 / 30%)",
  borderRadius: "6px",
  marginBottom: "20px",
  minHeight: "129px",
  border: "1px solid #DFDFDF",
  padding: "20px",
});

export default function index() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  let List = [1, 2, 3, 4, 5, 6, 7, 8];
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [addType, setAddType] = useState("simple");
  const [pageSize, setPageSize] = useState(10);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [adsId, setAdsId] = useState<any>([]);
  const [editMode, setEditMode] = useState<any>("New");
  const [page, setPage] = useState<number>(1);
  const [lastPage, setlastpage] = React.useState<number>(1);
  const [adsList, setAdsList] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [adsDetail, setAdsDetail] = useState<any>({});
  const { role } = useSelector((state: any) => state.userData);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { subSellerList } = useSelector((state: any) => state.userData);

  const permissions =
    subSellerList && subSellerList.length > 0 ? subSellerList[0] : null;
  useEffect(() => {
    fetchAllAds(page);
  }, [addType]);

  const fetchAllAds = async (page) => {
    setLoader(true);
    let response = await apiClient("ads/getlist", "post", {
      body: {
        ad_type: addType,
        per_page: 10,
        page,
      },
    });
    if (response.status == 200 || response.status == true) {
      setAdsList(response.data);
      setlastpage(response.lastPage);
    }
    setLoader(false);
  };

  const handleAddTypeChange = async (e) => {
    setAddType(e.target.value);
  };

  const DeleteAds = async () => {
    let response = await apiClient("ads/delete/" + adsId.join(","), "GET");
    if (response.status == 200) {
      fetchAllAds(page);
      setDeleteConfirmation(false);
      setAdsId([]);
      toast.success("Ads successfully deleted");
    }
  };

  const column: any = [
    {
      field: "ad_type",
      headerName: "Ad Type",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return (
          <>
            {params?.row?.ad_type?.charAt(0).toUpperCase() +
              params?.row?.ad_type?.slice(1)}
          </>
        );
      },
    },
    {
      field: "title_1",
      headerName: "Memo",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            {params?.row?.title_1?.charAt(0).toUpperCase() +
              params?.row?.title_1?.slice(1)}
          </>
        );
      },
    },
    {
      field: "images",
      headerName: "Image",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            {params?.row?.ad_type === "simple" ? (
              <span>No image</span>
            ) : (
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
            )}
          </>
        );
      },
    },
    {
      field: "start_data",
      headerName: "Period",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            {moment(params?.row?.start_date).format("DD MMM YYYY")} -{" "}
            {moment(params?.row?.end_date).format("DD MMM YYYY")}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Typography>
              {params?.row?.status == 1
                ? "Approved"
                : params?.row?.status == 0
                ? "Requested"
                : "Rejected"}
            </Typography>
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box>
              {(role === "seller" ||
                (role === "subuser" && permissions?.ads?.edit == true)) && (
                <LightTooltip
                  placement="top"
                  title="Edit"
                  arrow
                  disableInteractive
                >
                  <EditIconCSS>
                    <ButtonBase
                      onClick={async (e) => {
                        setEditMode("Edit");
                        handleClick(e);
                        await fetchAdsDetail(params?.row.id);
                      }}
                    >
                      <Image
                        src="/assets/editicon.svg"
                        alt="Edit"
                        width={14}
                        height={14}
                        style={{ color: "#231F20" }}
                      />
                    </ButtonBase>
                  </EditIconCSS>
                </LightTooltip>
              )}
            </Box>

            <Box>
              {(role === "seller" ||
                (role === "subuser" && permissions?.ads?.delete == true)) && (
                <LightTooltip
                  placement="top"
                  arrow
                  title="Delete"
                  disableInteractive
                >
                  <EditIconCSS>
                    <ButtonBase
                      onClick={(e) => {
                        setAdsId([params?.row.id]);
                        setDeleteConfirmation(true);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon
                        style={{ color: "#d7282f", fontSize: "19px" }}
                        sx={{
                          "& .MuiDataGrid-root .MuiSvgIcon-root": {
                            display: "flex",
                          },
                        }}
                      />
                    </ButtonBase>
                  </EditIconCSS>
                </LightTooltip>
              )}
            </Box>
          </Box>
        </>
      ),
    },
  ];

  const fetchAdsDetail = async (adsId) => {
    let response = await apiClient(`ads/getdetails/${adsId}`, "GET");
    if (response.status == 200) {
      setAdsDetail(response.data);
    }
  };

  return (
    <>
      <Head>
        <title>My Ads | Merchant AD</title>
      </Head>
      <div className="full_page">
        {deleteConfirmation && (
          <DeleteDialog
            open={deleteConfirmation}
            handleClose={setDeleteConfirmation}
            text="ads"
            onClickAction={DeleteAds}
          />
        )}

        <Grid container>
          <Grid item xs={12}>
            <OuterContainer>
              <InnerContainer>
                <HeadingAndButton>
                  <ProfileHeader text={"My Ads "} />
                  {(role === "seller" ||
                    (role === "subuser" && permissions?.ads?.add == true)) && (
                    <Adsbutton
                      aria-describedby={id}
                      onClick={(e) => {
                        setEditMode("New");
                        handleClick(e);
                      }}
                    >
                      <Adsbuttontext>Create Your Ads</Adsbuttontext>
                    </Adsbutton>
                  )}
                </HeadingAndButton>
                <ListHeader>
                  <Box
                    pb={2}
                    sx={{ display: "flex", alignItems: "center", gap: "18px",
                      "@media screen and (max-width:767px)":{

                      }
                     }}
                  >
                    {role == "subuser" && permissions?.ads?.delete === false ? (
                      <></>
                    ) : (
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Select  ad Types"
                        maxRows={4}
                        select
                        size="small"
                        sx={{ width: "180px" }}
                        onChange={(e) => handleAddTypeChange(e)}
                        value={addType}
                      >
                        {adsTypeFilter.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    <Box display="flex" alignItems="center" gap={"18px"}>
                      {role == "subuser" &&
                      permissions?.ads?.delete === false ? (
                        <></>
                      ) : (
                        <Typography
                          fontFamily="open sans"
                          fontSize="14px"
                          fontWeight={300}
                        >
                          {`Selected Ad (${adsId.length})`}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          height: "21px",
                          backgroundColor: "rgb(210, 210, 210)",
                          width: "1px",
                        }}
                      ></Box>
                      {adsId.length > 0 &&
                        (role === "seller" ||
                          (role === "subuser" &&
                            permissions?.ads?.delete == true)) && (
                          <FontContainer
                            fontSize="14px"
                            fontWeight={300}
                            color="#D7282F"
                            style={{ cursor: "pointer", display: "flex" }}
                            onClick={() => {
                              setDeleteConfirmation(true);
                            }}
                          >
                            Delete Selected{" "}
                            <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                          </FontContainer>
                        )}
                    </Box>
                  </Box>
                  <Box>
                    <Modal
                      open={open}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          backgroundColor: "white",
                          width: 800,
                          margin: "50px auto",
                          p: 2,
                          "@media screen and (max-width:899px)": {
                            width: "90%",
                          },
                        }}
                      >
                        <CreateAdd
                          data={adsDetail}
                          closePopOver={handleClose}
                          editMode={editMode}
                          fetchAllAds={fetchAllAds}
                        />
                      </Box>
                    </Modal>
                  </Box>
                  {loader ? (
                    <>
                      {List.map((v, i) => (
                        <SkeletonForContactList key={i} />
                      ))}
                    </>
                  ) : (
                    <>
                      {adsList.length > 0 ? (
                        <Box sx={{ height: "100%", width: "100%" }}>
                          <DataGridPro
                            sx={DataGridStyle}
                            rows={!loader ? adsList : []}
                            columns={column}
                            pageSize={10}
                            rowHeight={45}
                            autoHeight
                            onPageSizeChange={(newPageSize) =>
                              setPageSize(newPageSize)
                            }
                            localeText={{
                              columnMenuShowColumns: "Manage Columns",
                            }}
                            onPageChange={(item) => {
                              setPage(item + 1);
                              fetchAllAds(item + 1);
                            }}
                            pagination
                            checkboxSelection={true}
                            disableSelectionOnClick={true}
                            onSelectionModelChange={(newSelectionModel) =>
                              setAdsId(newSelectionModel)
                            }
                          />
                        </Box>
                      ) : (
                        <Box sx={{ backgroundColor: "white" }}>
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                            position={"relative"}
                            zIndex="10"
                          >
                            <EmptyPage
                              text={"Ads"}
                              onClickHandler={() => {}}
                              logo="/assets/images/emptyads.svg"
                              actiontext={false}
                            />
                          </Stack>
                        </Box>
                      )}
                    </>
                  )}
                </ListHeader>
              </InnerContainer>
            </OuterContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import { Box, Divider, Stack, styled } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  OuterContainer,
  HeaderContainer,
  EditTextContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { apiClient } from "@/components/common/common";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { MyAppContext } from "@/contextApi/appContext";
import EmptyPage from "@/components/common/EmptyPage";
import NoDataFound from "@/components/common/NoDataFound";
import Image from "next/image";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DataGridStyle } from "@/components/common/commonStyle";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import ServicesSkeleton from "./Services/Skeleton";
import AddBrand from "./AddBrand";
import { PencilIcon1 } from "./style";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import ImageViewer from "@/components/common/ImageViewer";
import { Header1 } from "@/components/SellerTools/styles";
import { ProfileHeader } from "@/components/common/profileheader";
import moment from "moment";
import { FontContainer } from "@/components/products/listProduct/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
const BrandSelectedList = styled(Box)({
  marginBottom: "10px",
  display: "flex",
  gap: 10,
  alignItems: "center",
});
const BrandSelectedRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const Brands = () => {
  const [servicesList, setBrandList] = useState<any>([]);
  const [cloneServiceList, setCloneServiceList] = useState<any>([]);
  const [addMore, setAddMore] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [editColumn, setEditColumn] = useState<any>({});
  const [deleteID, setDeleteID] = useState<any>([]);
  const iconStyle = { fontSize: "18px", cursor: "pointer" };
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

  const { role } = useSelector((state: any) => state.userData);

  const toggleDrawer = (anchor: any, open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddMore("add-brand");
    setState({ ...state, [anchor]: open });
  };
  // End Right Drawer flapout //
  const dispatch = useDispatch();
  const fetchBrandList = async () => {
    let response = await apiClient("my/brands/list", "get");
    if (response?.status === 200) {
      setBrandList(response?.data);
      setCloneServiceList(response?.data);
      dispatch(getCompanyProfile());
    }
    setLoader(false);
  };
  const { subSellerList } = useSelector((state: any) => state.userData);
  const permissions =
    subSellerList && subSellerList.length > 0 ? subSellerList[0] : null;
  useEffect(() => {
    setLoader(true);
    fetchBrandList();
  }, []);
  const list = (anchor) => (
    <Box
      sx={{
        width: "500px",
        "@media screen and (max-width:600px)": {
          width: "250px !important",
        },
      }}
      role="presentation"
    >
      <AddBrand
        type={addMore}
        setAddMore={setAddMore}
        fetchServicesList={fetchBrandList}
        editColumn={addMore === "edit" ? editColumn : {}}
        setEditColumn={setEditColumn}
      />
    </Box>
  );

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Brand Name",
      flex: 1,
      minWidth: 150,
    },

    {
      field: "logo",
      headerName: "Brand Image",
      flex: 0.75,
      minWidth: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          style={{
            height: "35px",
            width: "35px",
            borderRadius: "50%",
            cursor: params.value ? "pointer" : "default",
            objectFit: "contain",
          }}
          alt="Brand Image"
          src={
            params.value ? params.value : "/assets/default/prod-thumb-pic.png"
          }
          // onClick={() => {
          //   setViewImage(true);
          //   setImageUrl(
          //     params.value
          //       ? params.value
          //       : "/assets/default/prod-thumb-pic.png"
          //   );
          //   setEdit(params?.row?.name);
          // }}
          onClick={
            params.value
              ? () => {
                  setViewImage(true);
                  setImageUrl(params.value);
                  setEdit(params?.row?.name);
                }
              : undefined
          }
        />
      ),
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "created_at",
      headerName: "Created on",
      flex: 1,
      minWidth: 150,
      renderCell: (params) =>
        moment(params.row.created_at).format("DD/MM/YYYY"),
    },
    {
      field: "updated_at",
      headerName: "Updated on",
      flex: 1,
      minWidth: 150,
      renderCell: (params) =>
        moment(params.row.created_at).format("DD/MM/YYYY"),
    },
    {
      field: "approval_status",
      headerName: "Approval Status",
      flex: 1,
      minWidth: 150,
      editable: true,
      renderCell: (params) => {
        return params.row?.approval_status == 1 ? "Approved" : "Not Approved";
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      renderCell: (params) => (
        <>
          <PencilIcon1>
            {(role == "seller" ||
              (role == "subuser" && permissions?.brands?.edit == true)) && (
              <LightTooltip
                placement="top"
                title="Edit"
                arrow
                disableInteractive
              >
                <Image
                  height={14}
                  width={14}
                  style={{ ...iconStyle, fontSize: "18px" }}
                  src={"/assets/EditPencil.svg"}
                  alt="editImage"
                  onClick={() => {
                    setState({ ...state, right: true });
                    setEditColumn(params.row);
                    setAddMore("edit");
                  }}
                />
              </LightTooltip>
            )}
          </PencilIcon1>{" "}
          {(role == "seller" ||
            (role == "subuser" && permissions?.brands?.delete == true)) && (
            <LightTooltip
              placement="top"
              title="Delete"
              arrow
              disableInteractive
            >
              <DeleteOutlineOutlinedIcon
                onClick={() => {
                  setDeleteID(+params.id);
                  setDeleteConfirmation(true);
                }}
                style={{ ...iconStyle, color: "#D7282F" }}
              />
            </LightTooltip>
          )}
        </>
      ),
    },
  ];
  const DeleteServices = async () => {
    let response = await apiClient("brands/delete", "post", {
      body: { id: deleteID.toString() },
    });

    if (response.status == 200) toast.success("Brand Deleted Successfully");
    setDeleteConfirmation(false);
    setDeleteID([]);
    fetchBrandList();
  };

  let List = [1, 2, 3, 4, 5];
  const [loader, setLoader] = useState<boolean>(false);
  return (
    <>
      <div className="full_page">
        <Box>
          <Header1>
            <ProfileHeader text={"Brands"} />
          </Header1>
          <Grid container spacing={3} className="company_detail_service">
            <Grid item xs={12}>
              <OuterContainer style={{ width: "100%" }}>
                {deleteConfirmation && (
                  <DeleteDialog
                    open={deleteConfirmation}
                    handleClose={setDeleteConfirmation}
                    text="brand"
                    onClickAction={DeleteServices}
                    multidelete={deleteID}
                  />
                )}
                {viewImage && (
                  <ImageViewer
                    open={viewImage}
                    handleClose={() => {
                      setViewImage(false);
                      setImageUrl("");
                    }}
                    src={imageUrl}
                    filterName={edit}
                  />
                )}
                <HeaderContainer
                  breakPoints={breakPoints}
                  sx={{
                    display: "flex",
                    aligItems: "center !important",
                    paddingBottom: "10px !important",
                  }}
                >
                  <BrandSelectedRow component="div">
                    <BrandSelectedList component="div">
                      <FontContainer fontSize="18px">Brands</FontContainer>
                      <Divider orientation="vertical" />
                      {}
                      {role == "subuser" &&
                      permissions?.brands?.delete == false ? (
                        <></>
                      ) : (
                        <FontContainer fontSize="14px" fontWeight={300}>
                          {` Brands Selected ${
                            deleteID.length > 0 ? `(${deleteID.length})` : "(0)"
                          }`}
                        </FontContainer>
                      )}{" "}
                      <Divider orientation="vertical" />
                      {deleteID.length > 0 && (
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
                    </BrandSelectedList>
                  </BrandSelectedRow>
                  <EditTextContainer>
                    {(role == "seller" ||
                      (role == "subuser" &&
                        permissions?.brands?.add == true)) && (
                      <Redoutlinebtn
                        height={"36px"}
                        width={"140px"}
                        onClick={toggleDrawer("right", true)}
                        sx={{
                          "@media screen and (max-width:767px)": {
                            marginBottom: "10px !important",
                            "& svg": {
                              fontSize: "17px",
                            },
                          },
                        }}
                      >
                        Add Brands
                        <AddCircleOutlineIcon
                          sx={{ marginLeft: 1, height: 24 }}
                        />
                      </Redoutlinebtn>
                    )}
                  </EditTextContainer>
                </HeaderContainer>
                <Divider variant="middle" style={{ margin: 0 }} />

                <>
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    {loader ? (
                      <>
                        {List.map((v, i) => (
                          <ServicesSkeleton key={i} />
                        ))}
                      </>
                    ) : (
                      servicesList.length == 0 && (
                        <EmptyPage
                          text={"Brands"}
                          onClickHandler={toggleDrawer("right", true)}
                          logo="/assets/brand.svg"
                        />
                      )
                    )}
                    {servicesList.length > 0 && (
                      <DataGridPro
                        style={{
                          border: "5px",
                          borderRadius: "10px",
                          borderColor: "transparent",
                        }}
                        pagination
                        rows={!loader ? servicesList : []}
                        columns={columns}
                        pageSize={5}
                        rowHeight={46}
                        loading={loader}
                        rowsPerPageOptions={[5]}
                        checkboxSelection={
                          role == "subuser" &&
                          permissions?.brands?.delete == true
                        }
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        onSelectionModelChange={(newSelectionModel) =>
                          setDeleteID(newSelectionModel)
                        }
                        sx={DataGridStyle}
                        hideFooterSelectedRowCount={true}
                        autoHeight
                        components={{
                          NoRowsOverlay: () => (
                            <>
                              {loader ? (
                                <>
                                  {List.map((v, i) => (
                                    <ServicesSkeleton key={i} />
                                  ))}
                                </>
                              ) : (
                                <>
                                  {cloneServiceList.length !==
                                  servicesList.length ? (
                                    <NoDataFound />
                                  ) : (
                                    <Stack
                                      height="100%"
                                      alignItems="center"
                                      justifyContent="center"
                                      position={"relative"}
                                      zIndex="10"
                                    >
                                      <EmptyPage
                                        text={"brands"}
                                        onClickHandler={toggleDrawer(
                                          "right",
                                          true
                                        )}
                                        logo="/assets/brand.svg"
                                      />
                                    </Stack>
                                  )}
                                </>
                              )}
                            </>
                          ),
                          LoadingOverlay: () => {
                            return (
                              <>
                                {List.map((v, i) => (
                                  <ServicesSkeleton key={i} />
                                ))}
                              </>
                            );
                          },
                        }}
                      />
                    )}
                  </Box>
                </>
                {/* )} */}
              </OuterContainer>
            </Grid>
            {addMore && (
              <div>
                <SwipeableDrawer
                  anchor={"right"}
                  open={state["right"]}
                  onClose={() => {}}
                  onOpen={toggleDrawer("right", true)}
                >
                  {list("right")}
                </SwipeableDrawer>
              </div>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};
export default Brands;

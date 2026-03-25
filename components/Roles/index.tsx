import { Box, TextField, IconButton, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfileHeader } from "../common/profileheader";
import {
  AddNewRoleTitle,
  AddRoleRow,
  BottomButton,
  CommonRedOutineBtn,
  RoleHeadingSection,
  RolePermissionInner,
  RolePermissionOuter,
  RolesTableHeading,
  SearchAddBox,
  SearchandButton,
  SelectedRoles,
  VerticalDivider,
} from "./style";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/NoDataFound/style";
import EmptyPage from "../common/EmptyPage";
import { DataGridStyle } from "../common/commonStyle";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LightTooltip } from "../common/Tooltip/tooltip";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { CatelogSearchCommon, CatelogTableCoulmn } from "../catalog/style";
import Image from "next/image";
import { EditIconCSS } from "../adsPage/style";
import { FontContainer } from "../ProductDetail/style";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoles, fetchRolesData } from "@/hooks/UseProductListContext";
import { useRouter } from "next/router";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import CatelogueSkelton from "../catalog/CatelogueSkelton";

const RolesList = () => {
  const [filterRole, setFilterRole] = useState([]);
  const [searchRole, setSearchRole] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [addSkelton, setAddSkelton] = useState(false);
  const [rolesId, setRolesId] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const router: any = useRouter();
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const column: any = [
    {
      field: "index",
      headerName: "#",
      flex: 0.5,
      minwidth: 100,
      renderCell: (params) => {
        const rowIndex = params.api.getRowIndex(params.id) + 1;
        return <>{rowIndex}</>;
      },
    },
    {
      field: "name",
      headerName: "Rolename",
      flex: 0.5,
      minwidth: 100,
    },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 2,
      minwidth: 200,
      width: 500,
      renderCell: (params) => {
        return (
          <>
            {params.value.map((ele, index) => (
              <Box key={index}>
                {ele.name}
                {/* {ele.slug}
              {ele.class}
             {ele.id} */}
              </Box>
            ))}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minwidth: 200,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return (
          <Box component="div" display="flex" alignItems="center" gap={1}>
            {params?.value == 0 ? "Enable" : "Disable"}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
      minwidth: 100,
      renderCell: (params) => {
        return (
          <Box component="div" display="flex" alignItems="center" gap={1}>
            {(role === "seller" ||
              (role === "subuser" &&
                permissions?.roles_permissions?.edit==true
                )) && (
              <LightTooltip
                title="Edit"
                arrow
                placement="top"
                disableInteractive
              >
                <EditIconCSS
                  onClick={(e) => {
                    router.push(`roles/${params?.id}`);
                  }}
                >
                  <Image
                    src="/assets/editicon.svg"
                    alt="Edit"
                    width={15}
                    height={16}
                    style={{ color: "#231F20" }}
                  />
                </EditIconCSS>
              </LightTooltip>
            )}
            {(role === "seller" ||
              (role === "subuser" &&
                permissions?.roles_permissions?.delete==true
              )) && (
              <LightTooltip
                title="Delete"
                arrow
                placement="top"
                disableInteractive
              >
                <EditIconCSS>
                  <DeleteOutlinedIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#d7282f",
                    }}
                    onClick={(e) => {
                      setRolesId(params?.id);
                      setDeleteConfirmation(true);
                    }}
                  />
                </EditIconCSS>
              </LightTooltip>
            )}
          </Box>
        );
      },
    },
  ];
  const { role } = useSelector((state: any) => state.userData);
  const { rolesData, loader } = useSelector((state: any) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!loader) {
        setAddSkelton(false);
        await dispatch(fetchRolesData());
      }
      dispatch(fetchRolesData());
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (rolesData) {
      const filterData = rolesData?.filter((row) => {
        const searchRow = searchRole.toLowerCase().trim();
        return row.name?.toLowerCase().includes(searchRow);
      });
      setFilterRole(filterData);
    }
  }, [searchRole, rolesData]);
  useEffect(() => {
    if (rolesData) {
      setFilterRole(rolesData);
    }
  }, [rolesData]);
  const handleSearchChange = (event) => {
    setSearchRole(event.target.value);
  };
  const handleClickOpen = () => {
    router.push("/roles/create");
  };
  const handleDelete = async () => {
    await dispatch(
      deleteRoles(rolesId?.length > 0 ? rolesId?.join() : rolesId)
    );
    setDeleteConfirmation(false);
    setRolesId([]);
    dispatch(fetchRolesData());
  };

  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={() => setDeleteConfirmation(false)}
          text=" roles"
          onClickAction={handleDelete}
        />
      )}
      <div className="full_page">
        <Box>
          <ProfileHeader text={"Roles & Permission"} />
        </Box>
        <RolePermissionOuter>
          <AddRoleRow>
            <Box>
              {filterRole?.length > 0 && (
                <SelectedRoles>
                  <RolesTableHeading>List of Roles </RolesTableHeading>
                  <VerticalDivider orientation="vertical" />
                  <Typography fontSize="14px" fontWeight={300}>
                    Selected Roles ({rolesId?.length})
                  </Typography>
                  <VerticalDivider orientation="vertical" />
                  {rolesId.length > 0 &&
                    (role === "seller" ||
                      (role === "subuser" &&
                        permissions?.roles_permissions?.delete==true
                        )) && (
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
                </SelectedRoles>
              )}
            </Box>
            <SearchandButton>
              <SearchAddBox>
                <CatelogSearchCommon className="paddingRemove">
                  <TextField
                    fullWidth
                    label="Search"
                    id="standard-bare"
                    variant="outlined"
                    placeholder="Search"
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </CatelogSearchCommon>
                {(role === "seller" ||
                  (role === "subuser" &&
                    permissions?.roles_permissions?.add==true
                    )) && (
                  <AddNewRoleTitle
                    size="small"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen}
                  >
                    Add New Role
                  </AddNewRoleTitle>
                )}
              </SearchAddBox>
            </SearchandButton>
          </AddRoleRow>
          <RolePermissionInner>
            <CatelogTableCoulmn sx={{ height: 520, width: "100%" }}>
              {loader ? (
                <>
                  <CatelogueSkelton />
                </>
              ) : rolesData?.length === 0 ? (
                <EmptyPage
                  text={"roles"}
                  onClickHandler={() => {
                    if (
                      role !== "seller" ||
                      (role === "subuser" &&
                        permissions?.roles_permissions?.add==true
                        )
                    ) {
                      handleClickOpen();
                    }
                  }}
                  logo="/assets/images/no_catalogue.svg"
                  actiontext={true}
                />
              ) : filterRole?.length > 0 ? (
                <DataGridPro
                  autoHeight
                  rows={filterRole}
                  columns={column}
                  loading={filterRole.length === 0}
                  rowHeight={38}
                  headerHeight={40}
                  checkboxSelection
                  sx={DataGridStyle}
                  disableSelectionOnClick
                  editMode="row"
                  onSelectionModelChange={(newSelectionModel) =>
                    setRolesId(newSelectionModel)
                  }
                  pagination
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  onPageChange={(newPage) => setPage(newPage)}
                  rowCount={filterRole.length}
                />
              ) : filterRole?.length === 0 ? (
                <Box
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minHeight: "200px", display: "flex" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Image
                      height={80}
                      width={80}
                      alt="No Seller Sub Accounts added"
                      src={"/assets/NoResult.svg"}
                    />
                    <LargeTextContainer>No result found</LargeTextContainer>
                    <SmallTextContainer>
                      We couldn&apos;t found what you searched for <br />
                      Try searching again
                    </SmallTextContainer>
                  </div>
                </Box>
              ) : null}
            </CatelogTableCoulmn>
          </RolePermissionInner>
        </RolePermissionOuter>
      </div>
    </>
  );
};
export default RolesList;

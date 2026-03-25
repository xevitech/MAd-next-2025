import { DeleteIcon } from "@/components/SellerTools/styles";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGridPro,
  GridColDef,
  DataGridProProps,
} from "@mui/x-data-grid-pro";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import React, { useEffect, useState } from "react";
import {
  BeforeSection,
  CancelBtn,
  ClickHereBTN,
  ContainerBox,
  EditMenuBTN,
  EditNamePosition,
  EditNamePositionBefore,
  EditNamePositionInnerBefore,
  EditStoreBefore,
  EditStoreBox,
  EditStoreInnerBox,
  EditStoreText,
  EditWrapper,
  ManageBannerPopup,
  ManageBannerTitle,
  ManagepopupHeading,
  MenuTextStyle,
  PopCrossBTN,
  SaveBtnDialog,
  TextOuterBox,
} from "../Subdomainstyle";
import { apiClient } from "@/components/common/common";
import { toast } from "react-toastify";
import MenuItemSkeleton from "../MenuSkeleton";
import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { useSelector } from "react-redux";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useRouter } from "next/router";
import { removeSpaces } from "@/components/Helper";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const ManageMenu = () => {
  const [domaindata, setdomaindata] = useState<any>([]);
  const [openSubMenu, setSubMenu] = React.useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [mini_id, setminiId] = useState<boolean>(false);
  const [mini_name, setminiName] = useState(false);
  const [typeAndPageURL, setTypeAndPageURL] = useState({
    type: "",
    page_url: null,
  });
  const [mini_value, setminiValue] = useState(false);
  const [sub_menu_name, setsubMenu] = useState("");
  const [sub_id, setsubId] = useState("");
  const [openEdit, setEditOpen] = React.useState(false);
  const [load, setLoad] = useState<boolean>(false);
  const [viewType, setDataViewType] = useState("");
  const [menuValue, setsubMenuvalue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState<boolean>();
  const { role } = useSelector((state: any) => state.userData);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleSubMenuClose = () => {
    setSubMenu(false);
  };
  const handleChange1 = (event) => {
    const val = event.target.value;
    setmenuvalue({
      ...menuvalue,
      [event.target.name]: val,
      [event.target.display_order]: val,
    });
  };
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) =>
    row.name;

  const List2 = [1, 2, 3, 4, 5, 6];
  const [menuvalue, setmenuvalue] = useState<any>({
    menuname: "",
    url: "",
    submenu: "",
    display_order: "",
  });
  const[nameData,setNameData]=useState([])
  const [menuData, setMenuData] = useState<any>([]);
  const columns: GridColDef[] = [
    {
      field: "submenu",
      headerName: "Sub Menu",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
      renderCell: (params) => {
        const handleDeleteClick = () => {
          setsubId(params?.row?.id);
          setsubMenu(params?.row?.name);
          setSubMenu(true);
        };
        return (
          <img
            alt="Sub Menu"
            src="/assets/greySubmenu.svg"
            onClick={handleDeleteClick}
            style={{ cursor: params?.row?.is_delete ? "pointer" : "pointer" }}
          />
        );
      },
    },

    {
      field: "display_order",
      headerName: "Display order",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <>{params?.row?.display_order}</>;
      },
    },
    {
      field: "url",
      headerName: "URL",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <img src="/assets/greyLink.svg" alt="Edit" width={22} height={16} />
        );
      },
    },

    {
      field: "edit",
      headerName: "Edit",
      minWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      editable: true,
      renderCell: (params) => {
        const handleEditClick = () => {
          setTypeAndPageURL({
            type: params?.row?.type,
            page_url: params?.row?.page_url,
          });
          setminiId(params.row.id);
          setminiName(params.row.name);
          setminiValue(params.row.display_order);
          setEditOpen(true);
        };
        return (
          <>
            {(role == "seller" ||
              (role == "subuser" && permissions.manage_menu.edit == true)) && (
              <img
                alt="Edit"
                src="/assets/greyEdit.svg"
                onClick={handleEditClick}
                style={{
                  cursor: params?.row?.is_delete ? "pointer" : "pointer",
                }}
              />
            )}
          </>
        );
      },
    },
    {
      field: "is_delete",
      headerName: "Delete",
      minWidth: 100,
      width: 100,
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const handleDeleteClick = () => {
          if (params?.row?.is_delete) {
            setminiId(params.row.id);
            setDeleteConfirmation(true);
          }
        };

        return (
          <>
            {(role == "seller" ||
              (role == "subuser" &&
                permissions.manage_menu.delete == true)) && (
              <DeleteIcon
                sx={{ color: params?.row?.is_delete ? "#d7282f" : "grey" }}
                onClick={handleDeleteClick}
                style={{
                  cursor: params?.row?.is_delete ? "pointer" : "not-allowed",
                }}
              />
            )}
          </>
        );
      },
    },
  ];
  useEffect(() => {
    getHeaderData();
    const fetchSubdomain = async () => {
      let response = await apiClient("sub_domain/list", "get", {});
      if (response.status === 200) setdomaindata(response.data);
      setLoader(false);
    };
    fetchSubdomain();
  }, []);

  const handlenewRow = async (e) => {
    let formData = new FormData();
    const page_url = removeSpaces(menuvalue.menuname);
    formData.append("name", menuvalue.menuname);
    formData.append("display_order", menuvalue.display_order);
    formData.append("page_url", page_url);
    formData.append("id", e);
    let response = await apiClient(
      `sub_domain/menu_update`,
      "post",
      {
        body: formData,
      },
      true
    );

    if (response.status == false) {
      toast.error("Try again with new name");
    }
    if (response.status === 200) {
      toast.success(response.message);
      getHeaderData();
      setEditOpen(false);
    }
  };

  const processParentsRecursively = (item, parentNames, parentChildren) => {
    if (item.parents.length > 0) {
      parentNames.push(item.name[0]); // Store the parent name
      item.parents.forEach((parent) => {
        parentNames.push(parent.name[0]); // Store the parent name
        parent.name = [item.name[0], ...parent.name]; // Update parent name to include child name
        if (parent.children.length > 0) {
          // Recursively process children
          processParentsRecursively(parent, parentNames, parentChildren);
        }
        if (parent.children.length > 0) {
          parentChildren.push(parent.children); // Store the children of the parent
        }
      });
    }
  };
  async function getHeaderData() {
    setLoad(true);
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    let userid = JSON.parse(localStorage.getItem("userData"))?.id;

    let response = await apiClient("front/list_minisite_menus", "post", {
      body: { shop_id: userid },
    });
    if (response.status === 200) {
      setLoad(false);
      setDataViewType(response?.data);
      const names = Array.isArray(response?.data) ? response.data.map(item => item.name) : [];
       setNameData(names)
      let reOrderData = [];
      response?.data?.map((ele) => {
        let subdomainURL = "mini-site/";
        if (ele.type == "home") {
          subdomainURL = subdomainURL + "home?id=" + userid;
        } else if (ele.type == "products") {
          subdomainURL = subdomainURL + "Products";
        } else if (ele.type == "review") {
          subdomainURL = subdomainURL + "Reviews";
        } else if (ele.type == "company_profile") {
          subdomainURL = subdomainURL + "CompanyProfile";
        } else if (ele.type == "certificate") {
          subdomainURL = subdomainURL + "Certificate";
        } else if (ele.type == "factory_tour") {
          subdomainURL = subdomainURL + "Factory";
        } else if (ele.type == "research_development") {
          subdomainURL = subdomainURL + "RD";
        }

        reOrderData.push({
          id: ele?.id,
          is_delete: ele?.is_delete,
          name: [ele?.name],
          type: ele?.type,
          display_order: ele?.display_order,
          parents: ele?.parents,
          page_url: ele?.page_url,
        });
      });

      const newReOrder = [...reOrderData];

      let parentNames: any[] = [];
      let storeParent: any = {};
      let parentNames2: any[] = [];
      let parentChildern: any[] = [];
      let parentArray: any[] = [];

      newReOrder.forEach((item) => {
        if (item.parents.length > 0) {
          parentNames.push(item.name[0]);

          storeParent = [...item.parents];

          storeParent.forEach((parent) => {
            parentNames2.push(parent.name[0]);
            parent.name = [item.name[0], parent.name];

            if (parent?.children?.length > 0) {
              parentChildern = [...parent?.children];
              parent?.children?.map((itm) => {
                itm.name = [...parent.name, itm.name];

                return parentArray.push([itm.name]);
              });
            }
          });
        }
      });

      const parentsData = [];
      newReOrder.forEach((item) => {
        if (item.parents.length > 0) {
          parentsData.push(...item.parents);
          if (item.parents.children > 0) {
            parentsData.push(...item.parents, ...parentChildern);
          }
        }
      });

      reOrderData.push(...parentsData, ...parentChildern);
      setMenuData(reOrderData);
      return response;
    }
  }

  const handleNewMenus = async () => {
    const trimmedMenuName = menuvalue.menuname.trim();
    const page_url = removeSpaces(trimmedMenuName);
    const existingMenuNames = menuData.map(menu => menu.name[0].toLowerCase());
    if (nameData.some(menu => menu.toLowerCase() === trimmedMenuName.toLowerCase())) {
      toast.error("This menu name is already exists.");
      return;
    }
    if (existingMenuNames.includes(trimmedMenuName.toLowerCase())) {
      toast.error("This  menu name is already exists.");
      return;
    }
    let response = await apiClient("front/create_mini_site_menu", "post", {
      body: {
        name: trimmedMenuName,
        display_order: menuvalue.display_order,
        page_url: page_url,
      },
    });
    if (response.status === 200) {
      getHeaderData();
      toast.success(response.message);
      setOpen(false);
    } else {
      toast.error(response.message?.name[0]);
      setOpen(true);
    }
  };
  const handleNewSubMenu = async () => {
    const trimmedSubMenuName = menuValue.trim();
    const page_url = removeSpaces(trimmedSubMenuName);
    const existingSubMenuNames = menuData.flatMap(menu => menu?.parents?.map(parent => parent.name[0].toLowerCase()) || []);
  
    if (trimmedSubMenuName === "") {
      toast.error("Please enter a menu name.");
      return;
    }
    if (existingSubMenuNames.includes(trimmedSubMenuName.toLowerCase())) {
      toast.error("This menu name is already exists.");
      return;
    }
    let response = await apiClient("front/create_mini_site_menu", "post", {
      body: {
        name: trimmedSubMenuName,
        parent: sub_id,
        display_order: "",
        page_url: page_url,
      },
    });
    if (response.status === 200) {
      getHeaderData();
      toast.success(response.message);
      setSubMenu(false);
      setsubMenuvalue("");
    } else {
      toast.error(response.message);
      setSubMenu(true);
    }
  };

  const handleDelete = async () => {
    let response = await apiClient(
      "front/delete_minisite_menu/" + mini_id,
      "delete"
    );
    // if (response.status === 200) setdomaindata(response.data);
    toast.success(response.message);
    getHeaderData();
    setLoader(false);
    setDeleteConfirmation(false);
  };
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setRightPanelActive(false);
  };
  return (
    <Box style={{ backgroundColor: "white" }}>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="Delete Menu"
          onClickAction={handleDelete}
        />
      )}
      <Box style={{ height: 450, width: "100%" }}>
        <form onSubmit={handlenewRow}>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ padding: "0px 0px 16px 0px" }}>
              <ManageBannerTitle>
                <Typography>Manage Menu</Typography>
                <ClearOutlinedIcon onClick={handleClose} />
              </ManageBannerTitle>
            </DialogTitle>
            <Box sx={{ padding: "0px 24px 24px 24px" }}>
              <TextField
                margin="dense"
                size="small"
                id="name"
                label="Menu Name"
                type="text"
                fullWidth
                defaultValue={""}
                name="menuname"
                onChange={handleChange1}
              />

              <TextField
                margin="dense"
                size="small"
                id="name"
                label="Position"
                type="number"
                fullWidth
                defaultValue={""}
                name="display_order"
                onChange={handleChange1}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "12px 0 0 0",
                }}
              >
                <EditMenuBTN
                  onClick={() => {
                    handleNewMenus();
                  }}
                  type="submit"
                >
                  Add
                </EditMenuBTN>
              </Box>
            </Box>
          </Dialog>
        </form>
        <form onSubmit={handlenewRow}>
          <Dialog open={openEdit}>
            {!typeAndPageURL?.type ? (
              <>
                <ContainerBox
                  sx={{
                    "@media screen and (max-width:600px)": { display: "none" },
                  }}
                  className={`container ${
                    rightPanelActive ? "right-panel-active" : ""
                  }`}
                >
                  <PopCrossBTN onClick={handleEditClose}>
                    <CloseOutlinedIcon sx={{ color: "#231f20" }} />
                  </PopCrossBTN>
                  <EditStoreBox
                    sx={{
                      left: rightPanelActive ? "50%" : "-100%",
                      opacity: rightPanelActive ? 1 : 0,
                      zIndex: rightPanelActive ? 5 : 1,
                    }}
                  >
                    <ManagepopupHeading>Manage Menu</ManagepopupHeading>
                    <Box textAlign={"center"}>
                      <img
                        src="/assets/editstore.png"
                        alt="edit"
                        style={{ height: "100px" }}
                      />
                      <EditMenuBTN
                        variant="outlined"
                        onClick={() =>
                          window.open(
                            `/mini-site/${domaindata?.domain}/${typeAndPageURL?.page_url}`,
                            "_blank"
                          )
                        }
                      >
                        Minisite Edit Menu
                      </EditMenuBTN>
                    </Box>
                  </EditStoreBox>
                  <EditNamePosition
                    sx={{
                      left: rightPanelActive ? "100%" : "0",
                      zIndex: rightPanelActive ? 1 : 2,
                    }}
                  >
                    <ManagepopupHeading>Manage Menu</ManagepopupHeading>
                    <TextOuterBox
                      sx={{
                        "::before": {
                          height: `${typeAndPageURL?.type ? "0" : "100%"}`,
                        },
                      }}
                    >
                      <TextField
                        size="small"
                        margin="dense"
                        id="name"
                        label="Menu Name"
                        type="text"
                        fullWidth
                        defaultValue={mini_name}
                        name="menuname"
                        onChange={handleChange1}
                      />

                      <TextField
                        size="small"
                        margin="dense"
                        id="display_order"
                        label="Position"
                        type="number"
                        fullWidth
                        defaultValue={mini_value}
                        name="display_order"
                        onChange={handleChange1}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: `${
                            typeAndPageURL?.type ? "center" : "start"
                          }`,
                          "@media screen and (max-width:600px)": {
                            justifyContent: "center",
                          },
                        }}
                      >
                        <EditMenuBTN
                          sx={{ mt: 1 }}
                          onClick={() => {
                            handlenewRow(mini_id);
                          }}
                          type="submit"
                        >
                          Update Menu Name
                        </EditMenuBTN>
                      </Box>
                    </TextOuterBox>
                  </EditNamePosition>
                  <BeforeSection
                    sx={{
                      transform: rightPanelActive
                        ? "translateX(-100%)"
                        : "translateX(0)",
                    }}
                  >
                    <EditNamePositionBefore
                      sx={{
                        transform: rightPanelActive
                          ? "translateX(50%)"
                          : "translateX(0)",
                      }}
                    >
                      <EditNamePositionInnerBefore
                        sx={{
                          transform: rightPanelActive
                            ? "translateX(-2%)"
                            : "translateX(-20%)",
                        }}
                      >
                        <EditStoreText>
                          Edit Menu Name And Position
                        </EditStoreText>
                        <ClickHereBTN
                          variant="outlined"
                          onClick={handleSignInClick}
                        >
                          Click Here
                        </ClickHereBTN>
                      </EditNamePositionInnerBefore>
                      <EditStoreBefore
                        sx={{
                          transform: rightPanelActive
                            ? "translateX(20%)"
                            : "translateX(0%)",
                        }}
                      >
                        <EditStoreText>Edit Your Store</EditStoreText>
                        <ClickHereBTN
                          variant="outlined"
                          onClick={handleSignUpClick}
                        >
                          Click Here
                        </ClickHereBTN>
                      </EditStoreBefore>
                    </EditNamePositionBefore>
                  </BeforeSection>
                </ContainerBox>
                <ContainerBox
                  sx={{
                    height: "auto",
                    minHeight: "auto",
                    padding: "20px",
                    display: "none",
                    position: "relative",
                    "@media screen and (max-width:600px)": { display: "block" },
                  }}
                >
                  <PopCrossBTN onClick={handleEditClose}>
                    <CloseOutlinedIcon sx={{ color: "#231f20" }} />
                  </PopCrossBTN>
                  <ManagepopupHeading sx={{ margin: "0 0 20px 0 !important" }}>
                    Manage Menu
                  </ManagepopupHeading>
                  <Stack gap="8px">
                    <TextField
                      size="small"
                      margin="dense"
                      id="name"
                      label="Menu Name"
                      type="text"
                      fullWidth
                      defaultValue={mini_name}
                      name="menuname"
                      onChange={handleChange1}
                    />

                    <TextField
                      size="small"
                      margin="dense"
                      id="display_order"
                      label="Position"
                      type="number"
                      fullWidth
                      defaultValue={mini_value}
                      name="display_order"
                      onChange={handleChange1}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      <EditMenuBTN
                        sx={{}}
                        onClick={() => {
                          handlenewRow(mini_id);
                        }}
                        type="submit"
                      >
                        Update Menu Name
                      </EditMenuBTN>
                      <EditMenuBTN
                        variant="outlined"
                        onClick={() =>
                          window.open(
                            `/mini-site/${domaindata?.domain}/${typeAndPageURL?.page_url}`,
                            "_blank"
                          )
                        }
                      >
                        Minisite Edit Menu
                      </EditMenuBTN>
                    </Box>
                  </Stack>
                </ContainerBox>
              </>
            ) : (
              <>
                <ManageBannerTitle>
                  <Typography>Manage Menu</Typography>
                  <ClearOutlinedIcon onClick={handleEditClose} />
                </ManageBannerTitle>
                <ManageBannerPopup>
                  <Box>
                    <Grid
                      container
                      spacing={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={!typeAndPageURL?.type ? 6 : 8}
                      >
                        <TextOuterBox
                          sx={{
                            "::before": {
                              height: `${typeAndPageURL?.type ? "0" : "100%"}`,
                            },
                          }}
                        >
                          <TextField
                            size="small"
                            margin="dense"
                            id="name"
                            label="Menu Name"
                            type="text"
                            fullWidth
                            defaultValue={mini_name}
                            name="menuname"
                            onChange={handleChange1}
                          />

                          <TextField
                            size="small"
                            margin="dense"
                            id="display_order"
                            label="Position"
                            type="number"
                            fullWidth
                            defaultValue={mini_value}
                            name="display_order"
                            onChange={handleChange1}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: `${
                                typeAndPageURL?.type ? "center" : "start"
                              }`,
                              "@media screen and (max-width:600px)": {
                                justifyContent: "center",
                              },
                            }}
                          >
                            <EditMenuBTN
                              sx={{ mt: 1 }}
                              onClick={() => {
                                handlenewRow(mini_id);
                              }}
                              type="submit"
                            >
                              Update Menu Name
                            </EditMenuBTN>
                          </Box>
                        </TextOuterBox>
                      </Grid>
                    </Grid>
                  </Box>
                </ManageBannerPopup>
              </>
            )}
          </Dialog>
        </form>
        <form>
          <Dialog open={openSubMenu} onClose={handleSubMenuClose}>
            <DialogTitle>Add Sub Menu</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                label="Parent Menu"
                type="text"
                fullWidth
                defaultValue={sub_menu_name}
                name="parent"
                contentEditable={false}
                disabled
              />
              <TextField
                margin="dense"
                id="name"
                label="Sub Menu Name"
                type="text"
                value={menuValue}
                fullWidth
                defaultValue={""}
                name="subMenu"
                onChange={(e) => {
                  const name = e?.target?.value;
                  setsubMenuvalue(name);
                }}
              />
            </DialogContent>
            <DialogActions>
              <CancelBtn onClick={handleSubMenuClose}>Cancel</CancelBtn>
              <SaveBtnDialog
                onClick={() => {
                  handleNewSubMenu();
                }}
                type="submit"
              >
                Add
              </SaveBtnDialog>
            </DialogActions>
          </Dialog>
        </form>

        <MenuTextStyle>
          Menu Name
          <ContactSupportOutlinedIcon />
        </MenuTextStyle>
        <DataGridPro
          treeData
          rows={!load ? menuData : []}
          columns={columns}
          getTreeDataPath={getTreeDataPath}
          localeText={{
            columnMenuShowColumns: "Manage Columns",
          }}
          sx={{
            "&.MuiDataGrid-root": {
              border: "none",
              paddingBottom: "15px",
              marginTop: "-20px",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-root": {
              margin: "10px",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
              fontSize: "14px",
              color: "#1A2027",
              fontFamily: "Open Sans",
            },
            "& .MuiDataGrid-cell": {
              color: "#000",
              fontSize: "13px",
              fontFamily: "Open Sans",
              fontWeight: 600,
              "@media screen and (max-width: 767px)": {
                justifyContent: "left",
              },
            },

            "& .MuiDataGrid-columnHeaderTitleContainer": {
              "@media screen and (max-width: 767px)": {
                justifyContent: "left !Important",
              },
            },

            "& .Mui-checked": {
              color: "#d7282fcc !important",
            },
            "& .MuiDataGrid-footerContainer": { display: "none" },
            "& .MuiDataGrid-columnSeparator": {},
            "& .MuiDataGrid-columnHeader:first-child": {
              visibility: "hidden",
              "@media screen and (max-width:800px)": {
                visibility: "visible",
              },
            },
          }}
          loading={load}
          components={{
            NoRowsOverlay: () => (
              <>
                {load && (
                  <>
                    {List2.map((v, i) => (
                      <MenuItemSkeleton key={i} />
                    ))}
                  </>
                )}
              </>
            ),
            LoadingOverlay: () => {
              return (
                <>
                  {List2.map((v, i) => (
                    <MenuItemSkeleton key={i} />
                  ))}
                </>
              );
            },
          }}
        />
      </Box>
      {(role == "seller" ||
        (role == "subuser" && permissions.manage_menu.add == true)) && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Redoutlinebtn
            onClick={() => {
              setOpen(true);
            }}
            variant="outlined"
          >
            Add New Menu
          </Redoutlinebtn>
        </Box>
      )}
    </Box>
  );
};
export default ManageMenu;

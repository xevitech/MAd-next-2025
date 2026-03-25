import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Popper, Typography } from "@mui/material";
import { Box, Grid, TextField } from "@mui/material";
import { LicenseInfo } from "@mui/x-license-pro";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import { OuterContainer, InnerContainer } from "../SellerTools/styles";
import { ProfileHeader } from "../common/profileheader";
import {
  BTNBox,
  CancelBTN,
  CreateListBox,
  CreateListBTN,
  CreateNewList,
  DeleteSelectedBTN,
  FlexBox,
  FlexBoxSpaceBetween,
  ListName,
  MoveToBTN,
  MoveToList,
  MoveToListText,
  OuterBox,
  PopperPaper,
  SaveBTN,
  SidebarBox,
  TabsStyle,
  TabStyle,
  VerticalTab,
  VerticalTabContentBox,
  VerticalTabs,
} from "./styles";
import { apiClient } from "../common/common";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import WishlistProductItem from "../ProductsListing/wishlistProductItem";
import SupplierWishlist from "./supplierWishlist";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import EmptyPage from "../common/EmptyPage";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import ChatWindow from "../Chat";
import SaveProductSkeleton from "./skeleton/SaveProductSkeleton";
import { LightTooltip } from "../common/Tooltip/tooltip";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box
          sx={{
            p: 2,
            "@media screen and (max-width:900px)": { padding: "16px 0 0 0" },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

const VerticalTabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ px: 3, "@media screen and (max-width:900px)": { px: 0 } }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default function ListWish(props) {
  const [loader, setLoader] = React.useState<boolean>(true);
  const [wishlistloader, setLoaderwishlist] = React.useState<boolean>(true);
  const [wishListed, setWishList] = useState<any>([]);
  const [multipleIds, setMultipleDeleteID] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [lastPage, setlastpage] = React.useState<number>(0);
  const { role } = useSelector((state: any) => state.userData);
  const [loading, setLoading] = useState(false);
  const [checkPermissions, setCheckPermissions] = useState(null);
  const [skelton, setSkelton] = useState(false);
  const [topRatedProducts, settopRatedProducts] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [value, setValue] = useState(0);
  const [verticalValue, setVerticalValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl22, setAnchorEl22] = useState<null | HTMLElement>(null);
  const [open1, setOpen1] = useState(false);
  const [open22, setOpen22] = useState(false);
  const arrowRef = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [productIds, setproductsIds] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteLabel, setDeleteLabel] = useState<boolean>(false);
  const [labelId, setLabelId] = useState("");
  const [listName, setListName] = useState("");
  const [labelData, setLabelData] = useState([]);
  const [addListData, setAddListData] = useState(false);
  const [labelEdit, setLabelEdit] = useState(false);
  const [editableLabelId, setEditableLabelId] = useState(null);
  const [tempLabelName, setTempLabelName] = useState("");
  const [products, setProducts] = useState([]);
  const { user_info, default_role, subSellerList } = useSelector(
    (state: any) => state.userData
  );
  const [moveLabel, setMoveLabel] = useState([]);
  const [currentLabelId, setCurrentLabeliD] = useState("");
  const [labelName, setLabelName] = useState("");
  const [selectedLabelId, setSelectedLabelId] = useState(null);

  const handleSelectProduct1 = (label) => {
    setSelectedLabelId(label.label_id);
  };

  useEffect(() => {
    if (!default_role) {
      setSkelton(true);
    } else {
      setSkelton(false);
    }
  });
  useLayoutEffect(() => {
    setCheckPermissions(user_info?.type);
  }, [user_info, subSellerList]);

  const FetchWishList = async (page) => {
    setLoaderwishlist(true);
    let response = await apiClient("front/list/wishlist", "get", {
      body: { page },
    });
    if (response.status == 200) {
      setWishList(response.data.map((v, i) => ({ ...v, serial_no: i + 1 })));
      setlastpage(response.lastPage);
      setLoader(false);
      fetchLebalList();
    }
    setLoaderwishlist(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  const handleDeleteWishlist = async () => {
    if (selectedIds.length == 0) {
      toast.error("Please select a product to delete from your wishlist.");
      setOpen22(false);
      return;
    }
    setLoader(true);
    const response = await apiClient("front/list/wishlist/delete", "post", {
      body: {
        product_ids: selectedIds && selectedIds.join(","),
        label_id: verticalValue === 0 ? "" : currentLabelId,
      },
    });

    if (response.status == 200) {
      handleRemoveProduct(selectedIds, verticalValue);
      await FetchWishList(currentPage);
      await fetchLebalList();
      setOpen22(false);
      setDeleteConfirmation(false);
      setSelectedIds([]);
      setMultipleDeleteID([]);
    }
    setLoader(false);
  };
  const handleDeleteLabel = async () => {
    setLoader(true);
    const response = await apiClient(
      `product/wishlist/delete_label/${labelId}`,
      "post"
    );
    if (response.status == 200) {
      setDeleteLabel(false);
      fetchLebalList();
      setVerticalValue(0);
    }
    setLoader(false);
  };
  const handleUpdateLabel = async (labelId) => {
    setLoader(true);
    try {
      const response = await apiClient(
        `product/wishlist/label/updatelabel/${labelId}`,
        "post",
        {
          body: {
            label_name: tempLabelName,
          },
        }
      );
      if (response?.status === 200 || response?.status === true) {
        await FetchWishList(currentPage);
        fetchLebalList();
        toast.success("Label updated successfully!");
      } else {
        const errorMessages = response.message;
        toast.error(errorMessages);
      }
    } catch (error) {}
    setLoader(false);
  };
  const handleCreateList = async () => {
    setLoader(true);
    let response = await apiClient("product/wishlist/label/create", "post", {
      body: {
        label_name: listName,
      },
    });
    const labelResponse = response?.response?.id;

    if (response?.status === 200 || response?.status === true) {
      if (selectedIds.length > 0) {
        await fetchLebalMove(labelResponse);
      }
      setLoader(false);
      toast.success("Label created successfully!");
      setOpen22(false);
      setListName("");
      setOpen1(false);
      setAddListData(false);
      fetchLebalList();
    } else {
      const errorMessages = response.message;
      toast.error(errorMessages);
      setLoader(false);
    }
  };

  const fetchLebalList = async () => {
    setLoader(true);
    try {
      let response = await apiClient("product/wishlist/label/list", "get", {});
      setLabelData(response?.data);
      if (response.status == 200 || response.data || response.data.label_wise) {
        const labels = response.label_wise;
        if (labels) {
          const products = labels[currentLabelId]?.products;
          setProducts(products);
        }
      } else {
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const fetchLebalMove = async (label_id) => {
    setLoader(true);
    setWishList([]);
    let response = await apiClient(
      "product/wishlist/moveproduct-tolabel",
      "post",
      {
        body: {
          label_id: label_id,
          product_ids: selectedIds && selectedIds.join(","),
        },
      }
    );
    if (response.status == 200) {
      FetchWishList(1);
      setSelectedIds([]);
      toast.success(response?.message);
      setOpen22(false);
      setLoader(false);
      fetchLebalList();
    }
  };
  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    if (open1) {
      setAnchorEl(null);
      setOpen1(false);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen1(true);
    }
  };
  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (open22) {
      setAnchorEl22(null);
      setOpen22(false);
    } else {
      setAnchorEl22(event.currentTarget);
      setOpen22(true);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleVerticalChange = (event, newValue) => {
    setLoading(true);

    setTimeout(() => {
      const selectedTabLabel = labelData?.[newValue - 1] || {};
      const { products } = selectedTabLabel || {};
      setProducts(products);
      setLoading(false);
      setVerticalValue(newValue);
    }, 1000);
  };

  const handleRemoveProduct = (productIds, currentTabValue) => {
    const backUpLabelData = [...(labelData ?? [])];
    const selectedTabLabel = labelData?.[currentTabValue - 1] || {};
    const filteredProducts = labelData?.[currentTabValue - 1]?.products?.filter(
      (prod) => !productIds.includes(prod?.id)
    );
    backUpLabelData.map((le) => {
      if (le?.label_id === selectedTabLabel?.label_id) {
        le.products = filteredProducts;
      }
    });
    setProducts(filteredProducts);
  };
  const handleSelectProduct = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      } else {
        return [...prev, id];
      }
    });
    setproductsIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  const handleEditClick = (id, name) => {
    setEditableLabelId(id);
    setTempLabelName(name);
  };
  const handleCancel = () => {
    setEditableLabelId(null);
  };
  const handleSave = (id) => {
    handleUpdateLabel(id);
    setEditableLabelId(null);
  };
  const handleClose = () => {
    setListName("");
  };
  const switchOtherTab = () => {
    setOpen1(false);
    setOpen22(false);
    setSelectedIds([]);
  };
  useEffect(() => {
    FetchWishList(1);
  }, []);
  const handleInput = (event) => {
    let value = event.target.value;

    if (value.length === 0) return; // Prevents issues when input is empty

    let formattedValue = value
      .split("")
      .map((char, index) => {
        if (index === 0) {
          return char.toUpperCase(); // First letter always uppercase
        }
        return char; // Rest remains as typed
      })
      .join("");

    event.target.value = formattedValue;
  };
  return (
    <Box className="full_page">
      {/* <ChatWindow /> */}
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text="Wishlist"
          onClickAction={handleDeleteWishlist}
          componentText={"wishlist"}
        />
      )}
      {deleteLabel && (
        <DeleteDialog
          open={deleteLabel}
          handleClose={setDeleteLabel}
          text="Label"
          onClickAction={handleDeleteLabel}
          componentText={"Label"}
        />
      )}

      <Grid container>
        <Grid item xs={12}>
          <OuterContainer>
            <InnerContainer>
              <ProfileHeader
                text={
                  checkPermissions === "seller"
                    ? "Saved Product/Supplier"
                    : "Favourite Product/Supplier  "
                }
              />

              <Box>
                {checkPermissions === "seller" ? (
                  <Box>
                    <OuterBox>
                      <Box>
                        <Box sx={{ width: "100%" }}>
                          <FlexBoxSpaceBetween>
                            <TabsStyle
                              value={value}
                              onChange={handleChange}
                              aria-label="basic tabs example"
                            >
                              <TabStyle
                                label="Product"
                                {...a11yProps(0)}
                                icon={<i className="icon-product-img"></i>}
                                iconPosition="start"
                              />
                              <TabStyle
                                label="Supplier"
                                onClick={switchOtherTab}
                                {...a11yProps(1)}
                                icon={<i className="icon-supplier"></i>}
                                iconPosition="start"
                              />
                            </TabsStyle>
                            {value === 0 && (
                              <Box
                                className="Listpopper"
                                sx={{
                                  margin: "0 0 10px 0",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                {selectedIds.length > 0 && (
                                  <DeleteSelectedBTN
                                    onClick={handleDeleteWishlist}
                                  >
                                    Remove
                                  </DeleteSelectedBTN>
                                )}
                                {selectedIds.length > 0 && (
                                  <MoveToBTN onClick={(e) => handleMove(e)}>
                                    Move
                                  </MoveToBTN>
                                )}
                                <Popper
                                  open={open22}
                                  sx={{ zIndex: 999 }}
                                  anchorEl={anchorEl22}
                                  placement="bottom-end"
                                  disablePortal={true}
                                  modifiers={[
                                    {
                                      name: "flip",
                                      enabled: true,
                                      options: {
                                        altBoundary: true,
                                        rootBoundary: "document",
                                        padding: 8,
                                      },
                                    },
                                    {
                                      name: "preventOverflow",
                                      enabled: true,
                                      options: {
                                        altAxis: true,
                                        altBoundary: true,
                                        tether: true,
                                        rootBoundary: "document",
                                        padding: 8,
                                      },
                                    },
                                    {
                                      name: "arrow",
                                      enabled: true,
                                      options: {
                                        element: arrowRef.current,
                                      },
                                    },
                                  ]}
                                >
                                  <PopperPaper>
                                    <Box>
                                      <Box>
                                        {addListData ? (
                                          <>
                                            <FlexBox>
                                              <ListName>List Name</ListName>
                                              <Box>
                                                <TextField
                                                  onInput={handleInput}
                                                  value={listName}
                                                  onChange={(e) =>
                                                    setListName(e.target.value)
                                                  }
                                                  size="small"
                                                  placeholder="List Name"
                                                />
                                              </Box>
                                            </FlexBox>
                                            <BTNBox>
                                              <CancelBTN
                                                onClick={() => {
                                                  handleClose();
                                                  setAddListData(false);
                                                }}
                                              >
                                                Cancel
                                              </CancelBTN>
                                              <SaveBTN
                                                onClick={handleCreateList}
                                                sx={{
                                                  background: !listName.trim()
                                                    ? "rgba(0, 0, 0, 0.12) !important"
                                                    : "default",
                                                  color: !listName.trim()
                                                    ? "rgba(0, 0, 0, 0.26) !important"
                                                    : "default",
                                                  pointerEvents:
                                                    !listName.trim()
                                                      ? "none !important"
                                                      : "default",
                                                  border: !listName.trim()
                                                    ? "0 !important"
                                                    : "default",
                                                }}
                                              >
                                                {loader ? (
                                                  <ThreeDots
                                                    height="18"
                                                    width="40"
                                                    radius="9"
                                                    color="white"
                                                    ariaLabel="three-dots-loading"
                                                    visible={true}
                                                  />
                                                ) : (
                                                  "Save"
                                                )}
                                              </SaveBTN>
                                            </BTNBox>
                                          </>
                                        ) : (
                                          <Box>
                                            <CreateNewList
                                              onClick={() =>
                                                setAddListData(true)
                                              }
                                              disableRipple
                                              startIcon={<AddIcon />}
                                            >
                                              Create New List
                                            </CreateNewList>
                                          </Box>
                                        )}
                                      </Box>
                                      {/* Move Listing data */}
                                      {addListData === true
                                        ? ""
                                        : labelData?.map((item: any, index) => {
                                            return (
                                              <MoveToList
                                                key={index}
                                                sx={{ cursor: "pointer" }}
                                              >
                                                <MoveToListText>
                                                  <Typography
                                                    onClick={() => {
                                                      if (
                                                        selectedIds.length > 0
                                                      ) {
                                                        fetchLebalMove(
                                                          item?.label_id
                                                        );
                                                      } else {
                                                        toast.error(
                                                          `Please select at least one product to add to ${item?.label_name}`
                                                        );
                                                        setOpen22(false);
                                                      }
                                                    }}
                                                  >
                                                    {item?.label_name}
                                                  </Typography>
                                                </MoveToListText>
                                              </MoveToList>
                                            );
                                          })}
                                    </Box>
                                  </PopperPaper>
                                </Popper>
                                {!selectedIds?.length &&
                                  wishListed?.length > 0 && (
                                    <Box>
                                      <CreateListBTN
                                        startIcon={<AddIcon />}
                                        onClick={handleClick1}
                                      >
                                        Create List
                                      </CreateListBTN>
                                      <Popper
                                        open={open1}
                                        sx={{ zIndex: 999 }}
                                        anchorEl={anchorEl}
                                        placement="bottom-end"
                                        disablePortal={true}
                                        modifiers={[
                                          {
                                            name: "flip",
                                            enabled: true,
                                            options: {
                                              altBoundary: true,
                                              rootBoundary: "document",
                                              padding: 8,
                                            },
                                          },
                                          {
                                            name: "preventOverflow",
                                            enabled: true,
                                            options: {
                                              altAxis: true,
                                              altBoundary: true,
                                              tether: true,
                                              rootBoundary: "document",
                                              padding: 8,
                                            },
                                          },
                                          {
                                            name: "arrow",
                                            enabled: true,
                                            options: {
                                              element: arrowRef.current,
                                            },
                                          },
                                        ]}
                                      >
                                        <PopperPaper>
                                          <FlexBox>
                                            <ListName>List Name</ListName>
                                            <Box>
                                              <TextField
                                                onInput={handleInput}
                                                value={listName}
                                                onChange={(e) => {
                                                  setListName(e?.target?.value);
                                                }}
                                                size="small"
                                                placeholder="List Name"
                                              />
                                            </Box>
                                          </FlexBox>
                                          <BTNBox>
                                            <CancelBTN
                                              onClick={() => {
                                                setOpen1(false);
                                                handleClose();
                                              }}
                                            >
                                              Cancel
                                            </CancelBTN>
                                            <SaveBTN
                                              onClick={() => handleCreateList()}
                                              sx={{
                                                background: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.12) !important"
                                                  : "default",
                                                color: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.26) !important"
                                                  : "default",
                                                pointerEvents: !listName.trim()
                                                  ? "none !important"
                                                  : "default",
                                                border: !listName.trim()
                                                  ? "0 !important"
                                                  : "default",
                                              }}
                                            >
                                              {loader ? (
                                                <ThreeDots
                                                  height="18"
                                                  width="40"
                                                  radius="9"
                                                  color="white"
                                                  ariaLabel="three-dots-loading"
                                                  wrapperStyle={{}}
                                                  visible={true}
                                                />
                                              ) : (
                                                "Save"
                                              )}
                                            </SaveBTN>
                                          </BTNBox>
                                        </PopperPaper>
                                      </Popper>
                                    </Box>
                                  )}
                              </Box>
                            )}
                          </FlexBoxSpaceBetween>

                          {value === 0 && (
                            <Box
                              className="Listpopper"
                              sx={{
                                display: "none",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                margin: "10px 0 0 0",
                                gap: "12px",
                                "@media screen and (max-width:480px)": {
                                  display: "flex",
                                },
                              }}
                            >
                              {selectedIds.length > 0 && (
                                <DeleteSelectedBTN
                                  onClick={handleDeleteWishlist}
                                >
                                  Remove
                                </DeleteSelectedBTN>
                              )}
                              {selectedIds.length > 0 && (
                                <MoveToBTN onClick={(e) => handleMove(e)}>
                                  Move
                                </MoveToBTN>
                              )}
                              <Popper
                                open={open22}
                                sx={{ zIndex: 999 }}
                                anchorEl={anchorEl22}
                                placement="bottom-end"
                                disablePortal={true}
                                modifiers={[
                                  {
                                    name: "flip",
                                    enabled: true,
                                    options: {
                                      altBoundary: true,
                                      rootBoundary: "document",
                                      padding: 8,
                                    },
                                  },
                                  {
                                    name: "preventOverflow",
                                    enabled: true,
                                    options: {
                                      altAxis: true,
                                      altBoundary: true,
                                      tether: true,
                                      rootBoundary: "document",
                                      padding: 8,
                                    },
                                  },
                                  {
                                    name: "arrow",
                                    enabled: true,
                                    options: {
                                      element: arrowRef.current,
                                    },
                                  },
                                ]}
                              >
                                <PopperPaper>
                                  <Box>
                                    <Box>
                                      {addListData ? (
                                        <>
                                          <FlexBox>
                                            <ListName>List Name</ListName>
                                            <Box>
                                              <TextField
                                                onInput={handleInput}
                                                value={listName}
                                                onChange={(e) =>
                                                  setListName(e.target.value)
                                                }
                                                size="small"
                                                placeholder="List Name"
                                              />
                                            </Box>
                                          </FlexBox>
                                          <BTNBox>
                                            <CancelBTN
                                              onClick={() => {
                                                handleClose();
                                                setAddListData(false);
                                              }}
                                            >
                                              Cancel
                                            </CancelBTN>
                                            <SaveBTN
                                              onClick={handleCreateList}
                                              sx={{
                                                background: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.12) !important"
                                                  : "default",
                                                color: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.26) !important"
                                                  : "default",
                                                pointerEvents: !listName.trim()
                                                  ? "none !important"
                                                  : "default",
                                                border: !listName.trim()
                                                  ? "0 !important"
                                                  : "default",
                                              }}
                                            >
                                              {loader ? (
                                                <ThreeDots
                                                  height="18"
                                                  width="40"
                                                  radius="9"
                                                  color="white"
                                                  ariaLabel="three-dots-loading"
                                                  visible={true}
                                                />
                                              ) : (
                                                "Save"
                                              )}
                                            </SaveBTN>
                                          </BTNBox>
                                        </>
                                      ) : (
                                        <Box>
                                          <CreateNewList
                                            onClick={() => setAddListData(true)}
                                            disableRipple
                                            startIcon={<AddIcon />}
                                          >
                                            Create New List
                                          </CreateNewList>
                                        </Box>
                                      )}
                                    </Box>
                                    {/* Move Listing data */}
                                    {addListData === true
                                      ? ""
                                      : labelData?.map((item: any, index) => {
                                          return (
                                            <MoveToList
                                              key={index}
                                              sx={{ cursor: "pointer" }}
                                            >
                                              <MoveToListText>
                                                <Typography
                                                  onClick={() => {
                                                    if (
                                                      selectedIds.length > 0
                                                    ) {
                                                      fetchLebalMove(
                                                        item?.label_id
                                                      );
                                                    } else {
                                                      toast.error(
                                                        `Please select at least one product to add to ${item?.label_name}`
                                                      );
                                                      setOpen22(false);
                                                    }
                                                  }}
                                                >
                                                  {item?.label_name}
                                                </Typography>
                                              </MoveToListText>
                                            </MoveToList>
                                          );
                                        })}
                                  </Box>
                                </PopperPaper>
                              </Popper>
                              {!selectedIds?.length &&
                                wishListed?.length > 0 && (
                                  <Box>
                                    <CreateListBTN
                                      startIcon={<AddIcon />}
                                      onClick={handleClick1}
                                    >
                                      Create List
                                    </CreateListBTN>
                                    <Popper
                                      open={open1}
                                      sx={{ zIndex: 999 }}
                                      anchorEl={anchorEl}
                                      placement="bottom-end"
                                      disablePortal={true}
                                      modifiers={[
                                        {
                                          name: "flip",
                                          enabled: true,
                                          options: {
                                            altBoundary: true,
                                            rootBoundary: "document",
                                            padding: 8,
                                          },
                                        },
                                        {
                                          name: "preventOverflow",
                                          enabled: true,
                                          options: {
                                            altAxis: true,
                                            altBoundary: true,
                                            tether: true,
                                            rootBoundary: "document",
                                            padding: 8,
                                          },
                                        },
                                        {
                                          name: "arrow",
                                          enabled: true,
                                          options: {
                                            element: arrowRef.current,
                                          },
                                        },
                                      ]}
                                    >
                                      <PopperPaper>
                                        <FlexBox>
                                          <ListName>List Name</ListName>
                                          <Box>
                                            <TextField
                                              onInput={handleInput}
                                              value={listName}
                                              onChange={(e) => {
                                                setListName(e?.target?.value);
                                              }}
                                              size="small"
                                              placeholder="List Name"
                                            />
                                          </Box>
                                        </FlexBox>
                                        <BTNBox>
                                          <CancelBTN
                                            onClick={() => {
                                              setOpen1(false);
                                              handleClose();
                                            }}
                                          >
                                            Cancel
                                          </CancelBTN>
                                          <SaveBTN
                                            onClick={() => handleCreateList()}
                                            sx={{
                                              background: !listName.trim()
                                                ? "rgba(0, 0, 0, 0.12) !important"
                                                : "default",
                                              color: !listName.trim()
                                                ? "rgba(0, 0, 0, 0.26) !important"
                                                : "default",
                                              pointerEvents: !listName.trim()
                                                ? "none !important"
                                                : "default",
                                              border: !listName.trim()
                                                ? "0 !important"
                                                : "default",
                                            }}
                                          >
                                            {loader ? (
                                              <ThreeDots
                                                height="18"
                                                width="40"
                                                radius="9"
                                                color="white"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                              />
                                            ) : (
                                              "Save"
                                            )}
                                          </SaveBTN>
                                        </BTNBox>
                                      </PopperPaper>
                                    </Popper>
                                  </Box>
                                )}
                            </Box>
                          )}
                          {/* Wishlist tabs */}
                          <CustomTabPanel value={value} index={0}>
                            <Box>
                              {loader || loading ? (
                                <Box>
                                  <SaveProductSkeleton />
                                </Box>
                              ) : wishListed.length > 0 ? (
                                <Grid container rowSpacing={2}>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3.5}
                                    lg={2.5}
                                    xl={2.5}
                                  >
                                    <SidebarBox>
                                      <Box
                                        sx={{
                                          bgcolor: "background.paper",
                                          textAlign: "left",
                                          width: "100%",
                                        }}
                                      >
                                        <VerticalTabs
                                          orientation="vertical"
                                          variant="scrollable"
                                          value={verticalValue}
                                          onChange={handleVerticalChange}
                                          aria-label="Vertical tabs example"
                                          sx={{
                                            "&.MuiTabs-root": {
                                              minHeight: "auto",
                                            },
                                          }}
                                        >
                                          {/* All default tabs */}
                                          <VerticalTab
                                            sx={{ justifyContent: "start" }}
                                            label={
                                              <Box sx={{ marginLeft: "4px" }}>
                                                All
                                              </Box>
                                            }
                                            onClick={switchOtherTab}
                                            icon={<WindowOutlinedIcon />}
                                            iconPosition="start"
                                            {...a11yProps(0)}
                                          />
                                          {/* Custmised label list for verical tab */}
                                          {labelData?.map((item, index) => (
                                            <VerticalTab
                                              disableRipple
                                              sx={{
                                                cursor: tempLabelName.trim()
                                                  ? "pointer"
                                                  : "default",
                                                "& .CancelIcon": {
                                                  cursor: "pointer !important",
                                                },
                                              }}
                                              key={item.label_id}
                                              label={
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                      "space-between",
                                                    width: "100%",
                                                  }}
                                                  onClick={() => {
                                                    setCurrentLabeliD(
                                                      item.label_id
                                                    );
                                                    setLabelName(item?.name);
                                                    switchOtherTab();
                                                  }}
                                                >
                                                  {editableLabelId ===
                                                  item.label_id ? (
                                                    <>
                                                      <Box
                                                        sx={{
                                                          textAlign: "left",
                                                        }}
                                                      >
                                                        <TextField
                                                          onInput={handleInput}
                                                          variant="outlined"
                                                          size="small"
                                                          value={tempLabelName}
                                                          onChange={(e) =>
                                                            setTempLabelName(
                                                              e.target.value
                                                            )
                                                          }
                                                          sx={{
                                                            width: "100%",
                                                            "& .MuiInputBase-root":
                                                              {
                                                                backgroundColor:
                                                                  "#fff",
                                                              },
                                                            "& .MuiInputBase-input":
                                                              {
                                                                padding:
                                                                  "6.5px 14px",
                                                              },
                                                          }}
                                                        />
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: "4px",
                                                        }}
                                                      >
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Save"
                                                        >
                                                          <CheckCircleIcon
                                                            className="CheckIcon"
                                                            onClick={() =>
                                                              handleSave(
                                                                item.label_id
                                                              )
                                                            }
                                                            sx={{
                                                              color:
                                                                tempLabelName.trim()
                                                                  ? "#d7282f"
                                                                  : "gray",
                                                              fontSize: "18px",
                                                              cursor:
                                                                tempLabelName.trim()
                                                                  ? "pointer"
                                                                  : "not-allowed",
                                                              pointerEvents:
                                                                tempLabelName.trim()
                                                                  ? "auto"
                                                                  : "none",
                                                            }}
                                                          />
                                                        </LightTooltip>
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Cancel"
                                                        >
                                                          <CancelIcon
                                                            className="CancelIcon"
                                                            onClick={
                                                              handleCancel
                                                            }
                                                            sx={{
                                                              color: "#d7282f",
                                                              fontSize: "18px",
                                                              cursor: "pointer",
                                                            }}
                                                          />
                                                        </LightTooltip>
                                                      </Box>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: "4px",
                                                        }}
                                                      >
                                                        <ListAltOutlinedIcon />
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          title={
                                                            item.label_name
                                                          }
                                                          placement="top"
                                                        >
                                                          <Typography className="tabName">
                                                            {item.label_name}
                                                          </Typography>
                                                        </LightTooltip>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: "4px",
                                                        }}
                                                      >
                                                        {" "}
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Edit"
                                                        >
                                                          <img
                                                            onClick={() =>
                                                              handleEditClick(
                                                                item.label_id,
                                                                item.label_name
                                                              )
                                                            }
                                                            src="/assets/EditPencil.svg"
                                                            alt="Edit"
                                                            width={"12px"}
                                                          />
                                                        </LightTooltip>
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Delete"
                                                        >
                                                          <DeleteOutlineOutlinedIcon
                                                            onClick={() => {
                                                              setDeleteLabel(
                                                                true
                                                              );
                                                              setLabelId(
                                                                item?.label_id
                                                              );
                                                            }}
                                                            sx={{
                                                              color: "#d7282f",
                                                              fontSize: "16px",
                                                            }}
                                                          />
                                                        </LightTooltip>
                                                      </Box>
                                                    </>
                                                  )}
                                                </Box>
                                              }
                                              {...a11yProps(index + 1)}
                                            />
                                          ))}
                                        </VerticalTabs>
                                      </Box>
                                    </SidebarBox>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8.5}
                                    lg={9.5}
                                    xl={9.5}
                                  >
                                    <Box>
                                      <VerticalTabPanel
                                        value={verticalValue}
                                        index={0}
                                      >
                                        <VerticalTabContentBox>
                                          {wishListed.length > 0 ? (
                                            <Grid container spacing={2}>
                                              {wishListed.map(
                                                (product, index) => (
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    key={index}
                                                  >
                                                    <Box
                                                      sx={{
                                                        margin: "0 5px",
                                                        "@media screen and (max-width:900px)":
                                                          { margin: "0" },
                                                      }}
                                                    >
                                                      <WishlistProductItem
                                                        key={product.id}
                                                        data={product}
                                                        onSelect={
                                                          handleSelectProduct
                                                        }
                                                        isSelected={selectedIds.includes(
                                                          product.id
                                                        )}
                                                        FetchWishListFunction={
                                                          FetchWishList
                                                        }
                                                        fetchLebalList={
                                                          fetchLebalList
                                                        }
                                                      />
                                                    </Box>
                                                  </Grid>
                                                )
                                              )}
                                            </Grid>
                                          ) : loader ? (
                                            <Box>
                                              <SaveProductSkeleton />
                                            </Box>
                                          ) : (
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <EmptyPage
                                                text={"Wishlist"}
                                                onClickHandler={() => {}}
                                                logo="/assets/cart.svg"
                                                actiontext={false}
                                              />
                                            </Box>
                                          )}
                                        </VerticalTabContentBox>
                                      </VerticalTabPanel>

                                      <VerticalTabPanel
                                        value={verticalValue}
                                        index={verticalValue}
                                      >
                                        <Grid container spacing={2}>
                                          {products?.length > 0 &&
                                          verticalValue !== 0 ? (
                                            products?.map((product, index) => (
                                              <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={4}
                                                key={index}
                                              >
                                                <Box
                                                  sx={{
                                                    margin: "0 5px",
                                                    "@media screen and (max-width:900px)":
                                                      { margin: "0" },
                                                  }}
                                                >
                                                  <WishlistProductItem
                                                    key={product.id}
                                                    data={product}
                                                    onSelect={
                                                      handleSelectProduct
                                                    }
                                                    isSelected={selectedIds.includes(
                                                      product.id
                                                    )}
                                                    label_id={currentLabelId}
                                                    FetchWishListFunction={
                                                      FetchWishList
                                                    }
                                                    fetchLebalList={
                                                      fetchLebalList
                                                    }
                                                  />
                                                </Box>
                                              </Grid>
                                            ))
                                          ) : (
                                            <Grid item xs={12} sm={12}>
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                {verticalValue > 0 && (
                                                  <EmptyPage
                                                    text={"Wishlist"}
                                                    onClickHandler={() => {}}
                                                    logo="/assets/cart.svg"
                                                    actiontext={false}
                                                  />
                                                )}
                                              </Box>
                                            </Grid>
                                          )}{" "}
                                        </Grid>
                                      </VerticalTabPanel>
                                    </Box>
                                  </Grid>
                                </Grid>
                              ) : loader ? (
                                <Box>
                                  <SaveProductSkeleton />
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <EmptyPage
                                    text={"Wishlist"}
                                    onClickHandler={() => {}}
                                    logo="/assets/cart.svg"
                                    actiontext={false}
                                  />
                                </Box>
                              )}
                            </Box>
                          </CustomTabPanel>
                          {/* Supplier tab */}
                          <CustomTabPanel value={value} index={1}>
                            <SupplierWishlist />
                          </CustomTabPanel>
                        </Box>
                      </Box>
                    </OuterBox>
                  </Box>
                ) : (
                  <Box>
                    <OuterBox>
                      <Box>
                        <Box sx={{ width: "100%" }}>
                          <FlexBoxSpaceBetween>
                            <TabsStyle
                              value={value}
                              onChange={handleChange}
                              aria-label="basic tabs example"
                            >
                              <TabStyle
                                label="Product"
                                {...a11yProps(0)}
                                icon={<i className="icon-product-img"></i>}
                                iconPosition="start"
                              />
                              <TabStyle
                                label="Supplier"
                                onClick={switchOtherTab}
                                {...a11yProps(1)}
                                icon={<i className="icon-supplier"></i>}
                                iconPosition="start"
                              />
                            </TabsStyle>
                            {value === 0 && (
                              <Box
                                className="Listpopper"
                                sx={{
                                  margin: "0 0 10px 0",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                {selectedIds.length > 0 && (
                                  <DeleteSelectedBTN
                                    onClick={handleDeleteWishlist}
                                  >
                                    Remove
                                  </DeleteSelectedBTN>
                                )}
                                {selectedIds.length > 0 && (
                                  <MoveToBTN onClick={(e) => handleMove(e)}>
                                    Move
                                  </MoveToBTN>
                                )}
                                <Popper
                                  open={open22}
                                  sx={{ zIndex: 999 }}
                                  anchorEl={anchorEl22}
                                  placement="bottom-end"
                                  disablePortal={true}
                                  modifiers={[
                                    {
                                      name: "flip",
                                      enabled: true,
                                      options: {
                                        altBoundary: true,
                                        rootBoundary: "document",
                                        padding: 8,
                                      },
                                    },
                                    {
                                      name: "preventOverflow",
                                      enabled: true,
                                      options: {
                                        altAxis: true,
                                        altBoundary: true,
                                        tether: true,
                                        rootBoundary: "document",
                                        padding: 8,
                                      },
                                    },
                                    {
                                      name: "arrow",
                                      enabled: true,
                                      options: {
                                        element: arrowRef.current,
                                      },
                                    },
                                  ]}
                                >
                                  <PopperPaper>
                                    <Box>
                                      <Box>
                                        {addListData ? (
                                          <>
                                            <FlexBox>
                                              <ListName>List Name</ListName>
                                              <Box>
                                                <TextField
                                                  onInput={handleInput}
                                                  value={listName}
                                                  onChange={(e) =>
                                                    setListName(e.target.value)
                                                  }
                                                  size="small"
                                                  placeholder="List Name"
                                                />
                                              </Box>
                                            </FlexBox>
                                            <BTNBox>
                                              <CancelBTN
                                                onClick={() => {
                                                  handleClose();
                                                  setAddListData(false);
                                                }}
                                              >
                                                Cancel
                                              </CancelBTN>
                                              <SaveBTN
                                                onClick={handleCreateList}
                                                sx={{
                                                  background: !listName.trim()
                                                    ? "rgba(0, 0, 0, 0.12) !important"
                                                    : "default",
                                                  color: !listName.trim()
                                                    ? "rgba(0, 0, 0, 0.26) !important"
                                                    : "default",
                                                  pointerEvents:
                                                    !listName.trim()
                                                      ? "none !important"
                                                      : "default",
                                                  border: !listName.trim()
                                                    ? "0 !important"
                                                    : "default",
                                                }}
                                              >
                                                {loader ? (
                                                  <ThreeDots
                                                    height="18"
                                                    width="40"
                                                    radius="9"
                                                    color="white"
                                                    ariaLabel="three-dots-loading"
                                                    visible={true}
                                                  />
                                                ) : (
                                                  "Save"
                                                )}
                                              </SaveBTN>
                                            </BTNBox>
                                          </>
                                        ) : (
                                          <Box>
                                            <CreateNewList
                                              onClick={() =>
                                                setAddListData(true)
                                              }
                                              disableRipple
                                              startIcon={<AddIcon />}
                                            >
                                              Create New List
                                            </CreateNewList>
                                          </Box>
                                        )}
                                      </Box>
                                      {/* Move Listing data */}
                                      {addListData === true
                                        ? ""
                                        : labelData?.map((item: any, index) => {
                                            return (
                                              <MoveToList
                                                key={index}
                                                sx={{ cursor: "pointer" }}
                                              >
                                                <MoveToListText>
                                                  <Typography
                                                    onClick={() => {
                                                      if (
                                                        selectedIds.length > 0
                                                      ) {
                                                        fetchLebalMove(
                                                          item?.label_id
                                                        );
                                                      } else {
                                                        toast.error(
                                                          `Please select at least one product to add to ${item?.label_name}`
                                                        );
                                                        setOpen22(false);
                                                      }
                                                    }}
                                                  >
                                                    {item?.label_name}
                                                  </Typography>
                                                </MoveToListText>
                                              </MoveToList>
                                            );
                                          })}
                                    </Box>
                                  </PopperPaper>
                                </Popper>
                                {!selectedIds?.length &&
                                  wishListed?.length > 0 && (
                                    <Box>
                                      <CreateListBTN
                                        startIcon={<AddIcon />}
                                        onClick={handleClick1}
                                      >
                                        Create List
                                      </CreateListBTN>
                                      <Popper
                                        open={open1}
                                        sx={{ zIndex: 999 }}
                                        anchorEl={anchorEl}
                                        placement="bottom-end"
                                        disablePortal={true}
                                        modifiers={[
                                          {
                                            name: "flip",
                                            enabled: true,
                                            options: {
                                              altBoundary: true,
                                              rootBoundary: "document",
                                              padding: 8,
                                            },
                                          },
                                          {
                                            name: "preventOverflow",
                                            enabled: true,
                                            options: {
                                              altAxis: true,
                                              altBoundary: true,
                                              tether: true,
                                              rootBoundary: "document",
                                              padding: 8,
                                            },
                                          },
                                          {
                                            name: "arrow",
                                            enabled: true,
                                            options: {
                                              element: arrowRef.current,
                                            },
                                          },
                                        ]}
                                      >
                                        <PopperPaper>
                                          <FlexBox>
                                            <ListName>List Name</ListName>
                                            <Box>
                                              <TextField
                                                onInput={handleInput}
                                                value={listName}
                                                onChange={(e) => {
                                                  setListName(e?.target?.value);
                                                }}
                                                size="small"
                                                placeholder="List Name"
                                              />
                                            </Box>
                                          </FlexBox>
                                          <BTNBox>
                                            <CancelBTN
                                              onClick={() => {
                                                setOpen1(false);
                                                handleClose();
                                              }}
                                            >
                                              Cancel
                                            </CancelBTN>
                                            <SaveBTN
                                              onClick={() => handleCreateList()}
                                              sx={{
                                                background: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.12) !important"
                                                  : "default",
                                                color: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.26) !important"
                                                  : "default",
                                                pointerEvents: !listName.trim()
                                                  ? "none !important"
                                                  : "default",
                                                border: !listName.trim()
                                                  ? "0 !important"
                                                  : "default",
                                              }}
                                            >
                                              {loader ? (
                                                <ThreeDots
                                                  height="18"
                                                  width="40"
                                                  radius="9"
                                                  color="white"
                                                  ariaLabel="three-dots-loading"
                                                  wrapperStyle={{}}
                                                  visible={true}
                                                />
                                              ) : (
                                                "Save"
                                              )}
                                            </SaveBTN>
                                          </BTNBox>
                                        </PopperPaper>
                                      </Popper>
                                    </Box>
                                  )}
                              </Box>
                            )}
                          </FlexBoxSpaceBetween>
                          {value === 0 && (
                            <Box
                              sx={{
                                display: "none",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                margin: "10px 0 0 0",
                                gap: "12px",
                                "@media screen and (max-width:480px)": {
                                  display: "flex",
                                },
                              }}
                            >
                              {selectedIds.length > 0 && (
                                <DeleteSelectedBTN
                                  onClick={handleDeleteWishlist}
                                >
                                  Remove
                                </DeleteSelectedBTN>
                              )}
                              {selectedIds.length > 0 && (
                                <MoveToBTN onClick={(e) => handleMove(e)}>
                                  Move
                                </MoveToBTN>
                              )}
                              <Popper
                                open={open22}
                                sx={{ zIndex: 999 }}
                                anchorEl={anchorEl22}
                                placement="bottom-end"
                                disablePortal={true}
                                modifiers={[
                                  {
                                    name: "flip",
                                    enabled: true,
                                    options: {
                                      altBoundary: true,
                                      rootBoundary: "document",
                                      padding: 8,
                                    },
                                  },
                                  {
                                    name: "preventOverflow",
                                    enabled: true,
                                    options: {
                                      altAxis: true,
                                      altBoundary: true,
                                      tether: true,
                                      rootBoundary: "document",
                                      padding: 8,
                                    },
                                  },
                                  {
                                    name: "arrow",
                                    enabled: true,
                                    options: {
                                      element: arrowRef.current,
                                    },
                                  },
                                ]}
                              >
                                <PopperPaper>
                                  <Box>
                                    <Box>
                                      {addListData ? (
                                        <>
                                          <FlexBox>
                                            <ListName>List Name</ListName>
                                            <Box>
                                              <TextField
                                                onInput={handleInput}
                                                value={listName}
                                                onChange={(e) =>
                                                  setListName(e.target.value)
                                                }
                                                size="small"
                                                placeholder="List Name"
                                              />
                                            </Box>
                                          </FlexBox>
                                          <BTNBox>
                                            <CancelBTN
                                              onClick={() => {
                                                handleClose();
                                                setAddListData(false);
                                              }}
                                            >
                                              Cancel
                                            </CancelBTN>
                                            <SaveBTN
                                              onClick={handleCreateList}
                                              sx={{
                                                background: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.12) !important"
                                                  : "default",
                                                color: !listName.trim()
                                                  ? "rgba(0, 0, 0, 0.26) !important"
                                                  : "default",
                                                pointerEvents: !listName.trim()
                                                  ? "none !important"
                                                  : "default",
                                                border: !listName.trim()
                                                  ? "0 !important"
                                                  : "default",
                                              }}
                                            >
                                              {loader ? (
                                                <ThreeDots
                                                  height="18"
                                                  width="40"
                                                  radius="9"
                                                  color="white"
                                                  ariaLabel="three-dots-loading"
                                                  visible={true}
                                                />
                                              ) : (
                                                "Save"
                                              )}
                                            </SaveBTN>
                                          </BTNBox>
                                        </>
                                      ) : (
                                        <Box>
                                          <CreateNewList
                                            onClick={() => setAddListData(true)}
                                            disableRipple
                                            startIcon={<AddIcon />}
                                          >
                                            Create New List
                                          </CreateNewList>
                                        </Box>
                                      )}
                                    </Box>
                                    {/* Move Listing data */}
                                    {addListData === true
                                      ? ""
                                      : labelData?.map((item: any, index) => {
                                          return (
                                            <MoveToList
                                              key={index}
                                              sx={{ cursor: "pointer" }}
                                            >
                                              <MoveToListText>
                                                <Typography
                                                  onClick={() => {
                                                    if (
                                                      selectedIds.length > 0
                                                    ) {
                                                      fetchLebalMove(
                                                        item?.label_id
                                                      );
                                                    } else {
                                                      toast.error(
                                                        `Please select at least one product to add to ${item?.label_name}`
                                                      );
                                                      setOpen22(false);
                                                    }
                                                  }}
                                                >
                                                  {item?.label_name}
                                                </Typography>
                                              </MoveToListText>
                                            </MoveToList>
                                          );
                                        })}
                                  </Box>
                                </PopperPaper>
                              </Popper>
                              {!selectedIds?.length &&
                                wishListed?.length > 0 && (
                                  <Box>
                                    <CreateListBTN
                                      startIcon={<AddIcon />}
                                      onClick={handleClick1}
                                    >
                                      Create List
                                    </CreateListBTN>
                                    <Popper
                                      open={open1}
                                      sx={{ zIndex: 999 }}
                                      anchorEl={anchorEl}
                                      placement="bottom-end"
                                      disablePortal={true}
                                      modifiers={[
                                        {
                                          name: "flip",
                                          enabled: true,
                                          options: {
                                            altBoundary: true,
                                            rootBoundary: "document",
                                            padding: 8,
                                          },
                                        },
                                        {
                                          name: "preventOverflow",
                                          enabled: true,
                                          options: {
                                            altAxis: true,
                                            altBoundary: true,
                                            tether: true,
                                            rootBoundary: "document",
                                            padding: 8,
                                          },
                                        },
                                        {
                                          name: "arrow",
                                          enabled: true,
                                          options: {
                                            element: arrowRef.current,
                                          },
                                        },
                                      ]}
                                    >
                                      <PopperPaper>
                                        <FlexBox>
                                          <ListName>List Name</ListName>
                                          <Box>
                                            <TextField
                                              onInput={handleInput}
                                              value={listName}
                                              onChange={(e) => {
                                                setListName(e?.target?.value);
                                              }}
                                              size="small"
                                              placeholder="List Name"
                                            />
                                          </Box>
                                        </FlexBox>
                                        <BTNBox>
                                          <CancelBTN
                                            onClick={() => {
                                              setOpen1(false);
                                              handleClose();
                                            }}
                                          >
                                            Cancel
                                          </CancelBTN>
                                          <SaveBTN
                                            onClick={() => handleCreateList()}
                                            sx={{
                                              background: !listName.trim()
                                                ? "rgba(0, 0, 0, 0.12) !important"
                                                : "default",
                                              color: !listName.trim()
                                                ? "rgba(0, 0, 0, 0.26) !important"
                                                : "default",
                                              pointerEvents: !listName.trim()
                                                ? "none !important"
                                                : "default",
                                              border: !listName.trim()
                                                ? "0 !important"
                                                : "default",
                                            }}
                                          >
                                            {loader ? (
                                              <ThreeDots
                                                height="18"
                                                width="40"
                                                radius="9"
                                                color="white"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                              />
                                            ) : (
                                              "Save"
                                            )}
                                          </SaveBTN>
                                        </BTNBox>
                                      </PopperPaper>
                                    </Popper>
                                  </Box>
                                )}
                            </Box>
                          )}
                          {/* Wishlist tabs */}
                          <CustomTabPanel value={value} index={0}>
                            <Box>
                              {loader || loading ? (
                                <Box>
                                  <SaveProductSkeleton />
                                </Box>
                              ) : wishListed.length > 0 ? (
                                <Grid container rowSpacing={2}>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={3.5}
                                    lg={2.5}
                                    xl={2.5}
                                  >
                                    <SidebarBox>
                                      <Box
                                        sx={{
                                          bgcolor: "background.paper",
                                          textAlign: "left",
                                          width: "100%",
                                        }}
                                      >
                                        <VerticalTabs
                                          orientation="vertical"
                                          variant="scrollable"
                                          value={verticalValue}
                                          onChange={handleVerticalChange}
                                          aria-label="Vertical tabs example"
                                          sx={{}}
                                        >
                                          {/* All default tabs */}
                                          <VerticalTab
                                            sx={{ justifyContent: "start" }}
                                            label={
                                              <Box sx={{ marginLeft: "4px" }}>
                                                All
                                              </Box>
                                            }
                                            icon={<WindowOutlinedIcon />}
                                            iconPosition="start"
                                            {...a11yProps(0)}
                                          />
                                          {/* Custmised label list for verical tab */}
                                          {labelData?.map((item, index) => (
                                            <VerticalTab
                                              disableRipple
                                              sx={{
                                                cursor: tempLabelName.trim()
                                                  ? "pointer"
                                                  : "default",
                                                "& .CancelIcon": {
                                                  cursor: "pointer !important",
                                                },
                                              }}
                                              key={item.label_id}
                                              label={
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                      "space-between",
                                                    width: "100%",
                                                  }}
                                                  onClick={() => {
                                                    setCurrentLabeliD(
                                                      item.label_id
                                                    );
                                                    setLabelName(item?.name);
                                                    switchOtherTab();
                                                  }}
                                                >
                                                  {editableLabelId ===
                                                  item.label_id ? (
                                                    <>
                                                      <Box
                                                        sx={{
                                                          textAlign: "left",
                                                        }}
                                                      >
                                                        <TextField
                                                          onInput={handleInput}
                                                          variant="outlined"
                                                          size="small"
                                                          value={tempLabelName}
                                                          onChange={(e) =>
                                                            setTempLabelName(
                                                              e.target.value
                                                            )
                                                          }
                                                          sx={{
                                                            width: "100%",
                                                            "& .MuiInputBase-root":
                                                              {
                                                                backgroundColor:
                                                                  "#fff",
                                                              },
                                                          }}
                                                        />
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: "4px",
                                                        }}
                                                      >
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Save"
                                                        >
                                                          <CheckCircleIcon
                                                            className="CheckIcon"
                                                            onClick={() =>
                                                              handleSave(
                                                                item.label_id
                                                              )
                                                            }
                                                            sx={{
                                                              color:
                                                                tempLabelName.trim()
                                                                  ? "#d7282f"
                                                                  : "gray",
                                                              fontSize: "18px",
                                                              cursor:
                                                                tempLabelName.trim()
                                                                  ? "pointer"
                                                                  : "not-allowed",
                                                              pointerEvents:
                                                                tempLabelName.trim()
                                                                  ? "auto"
                                                                  : "none",
                                                            }}
                                                          />
                                                        </LightTooltip>
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Cancel"
                                                        >
                                                          <CancelIcon
                                                            onClick={
                                                              handleCancel
                                                            }
                                                            sx={{
                                                              color: "#d7282f",
                                                              fontSize: "18px",
                                                              cursor: "pointer",
                                                            }}
                                                          />
                                                        </LightTooltip>
                                                      </Box>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: "4px",
                                                        }}
                                                      >
                                                        <ListAltOutlinedIcon />
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          title={
                                                            item.label_name
                                                          }
                                                          placement="top"
                                                        >
                                                          <Typography className="tabName">
                                                            {item.label_name}
                                                          </Typography>
                                                        </LightTooltip>
                                                      </Box>
                                                      <Box
                                                        sx={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          gap: "4px",
                                                        }}
                                                      >
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Edit"
                                                        >
                                                          <img
                                                            onClick={() =>
                                                              handleEditClick(
                                                                item.label_id,
                                                                item.label_name
                                                              )
                                                            }
                                                            src="/assets/EditPencil.svg"
                                                            alt="Edit"
                                                            width={"12px"}
                                                          />
                                                        </LightTooltip>
                                                        <LightTooltip
                                                          arrow
                                                          disableInteractive
                                                          placement="top"
                                                          title="Delete"
                                                        >
                                                          <DeleteOutlineOutlinedIcon
                                                            onClick={() => {
                                                              setDeleteLabel(
                                                                true
                                                              );
                                                              setLabelId(
                                                                item?.label_id
                                                              );
                                                            }}
                                                            sx={{
                                                              color: "#d7282f",
                                                              fontSize: "16px",
                                                            }}
                                                          />
                                                        </LightTooltip>
                                                      </Box>
                                                    </>
                                                  )}
                                                </Box>
                                              }
                                              {...a11yProps(index + 1)}
                                            />
                                          ))}
                                        </VerticalTabs>
                                      </Box>
                                    </SidebarBox>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8.5}
                                    lg={9.5}
                                    xl={9.5}
                                  >
                                    <Box>
                                      <VerticalTabPanel
                                        value={verticalValue}
                                        index={0}
                                      >
                                        <VerticalTabContentBox>
                                          {wishListed.length > 0 ? (
                                            <Grid container spacing={2}>
                                              {wishListed.map(
                                                (product, index) => (
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={6}
                                                    lg={4}
                                                    key={index}
                                                  >
                                                    <Box
                                                      sx={{
                                                        margin: "0 5px",
                                                        "@media screen and (max-width:900px)":
                                                          { margin: "0" },
                                                      }}
                                                    >
                                                      <WishlistProductItem
                                                        key={product.id}
                                                        data={product}
                                                        onSelect={
                                                          handleSelectProduct
                                                        }
                                                        isSelected={selectedIds.includes(
                                                          product.id
                                                        )}
                                                        FetchWishListFunction={
                                                          FetchWishList
                                                        }
                                                        fetchLebalList={
                                                          fetchLebalList
                                                        }
                                                      />
                                                    </Box>
                                                  </Grid>
                                                )
                                              )}
                                            </Grid>
                                          ) : loader ? (
                                            <Box>
                                              <SaveProductSkeleton />
                                            </Box>
                                          ) : (
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <EmptyPage
                                                text={"Wishlist"}
                                                onClickHandler={() => {}}
                                                logo="/assets/cart.svg"
                                                actiontext={false}
                                              />
                                            </Box>
                                          )}
                                        </VerticalTabContentBox>
                                      </VerticalTabPanel>

                                      <VerticalTabPanel
                                        value={verticalValue}
                                        index={verticalValue}
                                      >
                                        <Grid container spacing={2}>
                                          {products?.length > 0 &&
                                          verticalValue !== 0 ? (
                                            products?.map((product, index) => (
                                              <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                lg={4}
                                                key={index}
                                              >
                                                <Box
                                                  sx={{
                                                    margin: "0 5px",
                                                    "@media screen and (max-width:900px)":
                                                      { margin: "0" },
                                                  }}
                                                >
                                                  <WishlistProductItem
                                                    key={product.id}
                                                    data={product}
                                                    onSelect={
                                                      handleSelectProduct
                                                    }
                                                    isSelected={selectedIds.includes(
                                                      product.id
                                                    )}
                                                    label_id={currentLabelId}
                                                    FetchWishListFunction={
                                                      FetchWishList
                                                    }
                                                    fetchLebalList={
                                                      fetchLebalList
                                                    }
                                                  />
                                                </Box>
                                              </Grid>
                                            ))
                                          ) : (
                                            <Grid item xs={12} sm={12}>
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                {verticalValue > 0 && (
                                                  <EmptyPage
                                                    text={"Wishlist"}
                                                    onClickHandler={() => {}}
                                                    logo="/assets/cart.svg"
                                                    actiontext={false}
                                                  />
                                                )}
                                              </Box>
                                            </Grid>
                                          )}{" "}
                                        </Grid>
                                      </VerticalTabPanel>
                                    </Box>
                                  </Grid>
                                </Grid>
                              ) : loader ? (
                                <Box>
                                  <SaveProductSkeleton />
                                </Box>
                              ) : (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <EmptyPage
                                    text={"Wishlist"}
                                    onClickHandler={() => {}}
                                    logo="/assets/cart.svg"
                                    actiontext={false}
                                  />
                                </Box>
                              )}
                            </Box>
                          </CustomTabPanel>
                          {/* Supplier tab */}
                          <CustomTabPanel value={value} index={1}>
                            <SupplierWishlist />
                          </CustomTabPanel>
                        </Box>
                      </Box>
                    </OuterBox>
                  </Box>
                )}
              </Box>
            </InnerContainer>
          </OuterContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

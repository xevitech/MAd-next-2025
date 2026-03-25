import React, { useState, useEffect, useMemo } from "react";
import { ProfileHeader } from "../common/profileheader";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  AboutCateloge,
  AddMorePro,
  CatalogDescriptionArea,
  CatalogFlexBox,
  CataloguCommonHeading,
  CatelogArea,
  CatelogSearchCommon,
  CatelogTableCoulmn,
  CatelogWrapper,
  CatelogeWhiteContainer,
  CommonRedOutineBtn,
  ListTableContainer,
  SearchContainer,
  SmallHeading,
  TypographyBody2,
} from "./style";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/NoDataFound/style";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGridPro,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import EmptyPage from "../common/EmptyPage";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { LightTooltip } from "../common/Tooltip/tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import CatelogueSkelton from "./CatelogueSkelton";
import { deleteCatalog, fetchCatelogue } from "@/hooks/UseProductListContext";
import {
  EditIconCSS,
  ProductListEditIcon,
} from "../products/listProduct/styles";
import { useRouter } from "next/router";
import Image from "next/image";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import { FontContainer } from "../ProductDetail/style";
import { toast } from "react-toastify";
import CatalogueDetail from "./CatalogueDetail";
import AddIcon from "@mui/icons-material/Add";
import Carousel from "react-material-ui-carousel";
import {
  ComDetailCarouselDialog,
  ComDetailCarouselHead,
  TradeShowImages,
} from "../profile/companyProfile/styles";
import CloseIcon from "@mui/icons-material/Close";
import NoDataFound from "../common/NoDataFound";
import { DataGridStyle } from "../common/commonStyle";
type Anchor = "top" | "left" | "bottom" | "right";

const ListCatalog = () => {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = useState(false);
  const [searchText, setSearchText] = useState<any>("");
  const [categoryText, setCategoryText] = useState("");
  const [filteredRows, setFilteredRows] = useState<any>([]);
  const [catalogIDs, setCatalogIDs] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [catalogue, setCatalogue] = useState<any>("");
  const router: any = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const { role } = useSelector((state: any) => state.userData);
  const storedSubSellerList = JSON.parse(localStorage.getItem("subSellerList"));
  const permissions =
    storedSubSellerList && storedSubSellerList.length > 0
      ? storedSubSellerList[0]
      : null;
  const columns: any = [
    {
      field: "index",
      headerName: "Sr. No.",
      minWidth: 50,
      // flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const rowIndex = params.api.getRowIndex(params.id) + 1;
        return <>{rowIndex}</>;
      },
    },
    {
      field: "name",
      headerName: "Catalog Name",
      minWidth: 200,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
              width: "100%",
              "&:hover": { color: "#d7282f" },
            }}
            onClick={() => {
              return router.push(`/catalog/single/${params?.row?.id}`);
            }}
          >
            <LightTooltip
              title={params.value}
              arrow
              placement="top"
              disableInteractive
            >
              {params.value ? params.value : "N/A"}
            </LightTooltip>
          </Box>
        );
      },
    },
    {
      field: "category_tree",
      headerName: "Category",
      minWidth: 300,
      flex: 1,
      headerAlign: "left",
      align: "left",
      editable: false,
    },
    {
      field: "image",
      headerName: "Catalog Images",
      minWidth: 200,
      flex: 1,
      editable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const [open, setOpen] = useState(false);
        const [sliderImages, setSliderImages] = useState<string[]>([]);
        const photos = params?.value;
        const handleAvatarClick = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };
        return (
          <>
            <AvatarGroup spacing="small">
              {Array.isArray(photos) &&
                photos.map((img, index) => (
                  <Avatar
                    key={index}
                    src={img}
                    alt={`Image ${index + 1}`}
                    onClick={handleAvatarClick}
                    style={{
                      height: "32px",
                      width: "32px",
                      objectFit: "cover",
                      marginRight: 6,
                    }}
                  />
                ))}
            </AvatarGroup>
            <ComDetailCarouselDialog
              open={open}
              onClose={handleClose}
              maxWidth="sm"
              fullWidth
            >
              <ComDetailCarouselHead>
                <Typography variant="h6">Catalog Images</Typography>
                <IconButton onClick={handleClose} color="inherit">
                  <CloseIcon />
                </IconButton>
              </ComDetailCarouselHead>
              <DialogContent>
                <Carousel>
                  {params.formattedValue?.map((img, index) => (
                    <TradeShowImages>
                      <img key={index} src={img} />
                    </TradeShowImages>
                  ))}
                </Carousel>
              </DialogContent>
            </ComDetailCarouselDialog>
          </>
        );
      },
    },
    {
      field: "product_count",
      headerName: "No. of Products",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "addProduct",
      headerName: "Add More Product",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => (
        <AddMorePro
          variant="text"
          color="error"
          startIcon={<AddIcon />}
          onClick={() =>
            router.push(
              `product/${params?.row?.id}?catalogName=${params?.row?.name}`
            )
          }
        >
          Add More Product
        </AddMorePro>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      minWidth: 130,
      renderCell: (params) => {
        return (
          <ProductListEditIcon sx={{ justifyContent: "center" }}>
            {(role == "seller" ||
              (role == "subuser" && permissions?.catalog?.view == true)) && (
              <EditIconCSS>
                <LightTooltip
                  title="View"
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <div
                    onClick={() => {
                      return router.push(
                        `/catalog/single/${params?.row?.id}?catalogName=${params?.row?.name}`
                      );
                    }}
                  >
                    <VisibilityRoundedIcon aria-label="View Catalog"></VisibilityRoundedIcon>
                  </div>
                </LightTooltip>
              </EditIconCSS>
            )}
            {(role == "seller" ||
              (role == "subuser" && permissions?.catalog?.edit == true)) && (
              <LightTooltip
                title="Edit"
                arrow
                placement="top"
                disableInteractive
              >
                <EditIconCSS>
                  <Image
                    src="/assets/editicon.svg"
                    onClick={(e) => {
                      handleEdit(params?.row?.id, e);
                    }}
                    alt="Edit"
                    width={15}
                    height={16}
                    style={{ color: "#231F20" }}
                  />
                </EditIconCSS>
              </LightTooltip>
            )}
            {(role == "seller" ||
              (role == "subuser" && permissions?.catalog?.delete == true)) && (
              <LightTooltip
                title="Delete"
                arrow
                placement="top"
                disableInteractive
              >
                <EditIconCSS>
                  <DeleteOutlinedIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      setCatalogIDs(params?.id);
                      e.preventDefault();
                      setDeleteConfirmation(true);
                    }}
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#d7282f",
                    }}
                  />
                </EditIconCSS>
              </LightTooltip>
            )}
          </ProductListEditIcon>
        );
      },
    },
  ];

  const { catalogData, loader } = useSelector(
    (state: any) => state.productList
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchList = async () => {
      if (!loader) {
        await dispatch(fetchCatelogue());
      }
    };
    fetchList();
  }, [dispatch]);
  useEffect(() => {
    if (catalogData) {
      const filtered = catalogData.filter((row) => {
        const searchTerms = searchText.toLowerCase().trim();
        return (
          row.name.toLowerCase().includes(searchTerms) ||
          (row.cat?.name
            ? row.cat.name.toLowerCase().includes(searchTerms)
            : false)
        );
      });
      setFilteredRows(filtered);
    }
  }, [searchText, catalogData]);

  useEffect(() => {
    if (catalogData) {
      setFilteredRows(catalogData);
    }
  }, [catalogData]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDelete = async () => {
    let response = await dispatch(
      deleteCatalog(catalogIDs?.length > 0 ? catalogIDs?.join() : catalogIDs)
    );
    if (response?.payload?.status == 200 || response?.payload?.status == true) {
      setDeleteConfirmation(false);
      setDeleteLoading(true);
      await dispatch(fetchCatelogue());
      setCatalogIDs([]);
      toast.success("Catalog deleted successfully");
    }
    setDeleteLoading(false);
  };

  const handleEdit = (id, e) => {
    if (id !== undefined && id !== null) {
      e.stopPropagation();
      router.push(`/catalog/update/${id}`);
    } else {
      e.stopPropagation();
      router.push("/catalog/create");
    }
  };

  const handleClickOpen = () => {
    router.push("/catalog/create");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (open == false) {
        setCatalogue("");
      }
      setState({ ...state, [anchor]: open });
    };
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: "700px",
        "@media screen and (max-width:600px)": {
          width: "250px",
        },
      }}
    >
      <CatalogueDetail
        toggleDrawer={toggleDrawer(anchor, false)}
        catalogueData={catalogue}
      />
    </Box>
  );

  return (
    <>
      {deleteConfirmation && (
        <DeleteDialog
          open={deleteConfirmation}
          handleClose={setDeleteConfirmation}
          text={catalogIDs.length > 1 ? "these catalogs" : " this catalog"}
          onClickAction={handleDelete}
        />
      )}
      <div className="full_page">
        <Box>
          <CataloguCommonHeading>
            {(["right"] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <Drawer anchor="right" open={state[anchor]}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <ProfileHeader
              text={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    "@media screen and (max-width:767px)": {
                      justifyContent: "center",
                      gap: "0",
                    },
                  }}
                >
                  Catalog{" "}
                  <LightTooltip
                    placement="right"
                    title={
                      <div>
                        <AboutCateloge>About Catalog</AboutCateloge>
                        <TypographyBody2>
                          Use a catalog to upload and manage your inventory. You
                          need a catalog to add items to your shop or to feature
                          items in your ads.
                        </TypographyBody2>
                      </div>
                    }
                    arrow
                    disableInteractive
                  >
                    <InfoOutlinedIcon
                      sx={{
                        "@media screen and (max-width:767px)": {
                          display: "none",
                        },
                      }}
                    />
                  </LightTooltip>
                </Box>
              }
            />
          </CataloguCommonHeading>
          <CatelogeWhiteContainer>
            <CatelogWrapper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  "@media screen and (max-width:676px)": {
                    display: "block",
                    marginBottom: "10px",
                  },
                }}
              >
                <SmallHeading>Welcome to your Catalog</SmallHeading>

                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions.product_catalog.add == true)) && (
                  <CommonRedOutineBtn
                    variant="contained"
                    size="small"
                    onClick={handleClickOpen}
                    startIcon={<AddRoundedIcon />}
                  >
                    Add New Catalog
                  </CommonRedOutineBtn>
                )}
              </Box>
              <Divider />
              <CatalogDescriptionArea>
                <Typography variant="body1">
                  This is a place for you to manage your inventory information
                </Typography>
                <Typography variant="body2">
                  Add all the items that you want to advertise or sell. You can
                  then display them in ads and shops.
                </Typography>
              </CatalogDescriptionArea>
              <CatelogArea>
                <ListTableContainer>
                  <SearchContainer>
                    <CatalogFlexBox>
                      <SmallHeading>List of Catalogs</SmallHeading>
                      <Divider
                        className="VertiDivider"
                        orientation="vertical"
                        sx={{
                          "&.MuiDivider-root": {
                            height: "24px",
                          },
                        }}
                      />
                      <CatalogFlexBox className="selectedrow">
                        {catalogIDs.length > 0 && (
                          <>
                            <Typography fontSize="14px" fontWeight={300}>
                              Selected Catalog ({catalogIDs?.length})
                            </Typography>
                            <Divider
                              className="VertiDivider"
                              orientation="vertical"
                              sx={{
                                "&.MuiDivider-root": {
                                  height: "24px",
                                },
                              }}
                            />
                          </>
                        )}

                        {catalogIDs.length > 0 && (
                          <FontContainer
                            fontSize="14px" className="selecteddelete"
                            fontWeight={300}
                            color="#D7282F"
                            style={{ cursor: "pointer", display: "flex" }}
                            onClick={() => {
                              setDeleteConfirmation(true);
                              setCatalogIDs(catalogIDs);
                            }}
                          >
                            Delete Selected{" "}
                            <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                          </FontContainer>
                        )}
                      </CatalogFlexBox>
                    </CatalogFlexBox>

                    <CatelogSearchCommon>
                      {catalogData.length > 0 && (
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
                      )}
                    </CatelogSearchCommon>
                  </SearchContainer>
                  <CatelogTableCoulmn sx={{ height: 520, width: "100%" }}>
                    {loader ? (
                      <Box>
                        <CatelogueSkelton />
                      </Box>
                    ) : filteredRows.length === 0 && searchText !== "" ? (
                      <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ minHeight: "200px", display: "flex" }}
                      >
                        <NoDataFound />
                      </Box>
                    ) : catalogData.length === 0 ? (
                      <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ minHeight: "200px", display: "flex" }}
                      >
                        <EmptyPage
                          text={"catalog"}
                          onClickHandler={() => router.push("/catalog/create")}
                          logo="/assets/images/no_catalogue.svg"
                          actiontext={true}
                        />
                      </Box>
                    ) : (
                      <DataGridPro
                        // autoHeight
                        rows={filteredRows}
                        columns={columns}
                        loading={filteredRows.length === 0}
                        rowHeight={38}
                        headerHeight={40}
                        checkboxSelection
                        sx={DataGridStyle}
                        disableSelectionOnClick
                        editMode="row"
                        onSelectionModelChange={(newSelectionModel) =>
                          setCatalogIDs(newSelectionModel)
                        }
                        pagination
                        pageSize={10}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        onPageChange={(newPage) => setPage(newPage)}
                        rowCount={filteredRows.length}
                        initialState={{
                          pinnedColumns: {
                            right: window?.innerWidth < 600 ? [] : ["actions"],
                          },
                        }}
                      />
                    )}
                  </CatelogTableCoulmn>
                </ListTableContainer>
              </CatelogArea>
            </CatelogWrapper>
          </CatelogeWhiteContainer>
        </Box>
      </div>
    </>
  );
};

export default ListCatalog;

import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import {
  Box,
  Divider,
  TextField,
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  Dialog,
  IconButton,
  DialogContent,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import companydetail from "../companydetail.module.css";
import {
  OuterContainer,
  HeaderContainer,
  HeaderTextContainer,
  EditTextContainer,
  DeleteSelectedOuterBox,
  DeleteSelectedInnerBox,
  DeleteSelectedText,
  DeleteSelectedDivider,
  DeleteSelectedRedText,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import { apiClient, getCountryNameByCode } from "@/components/common/common";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { MyAppContext } from "@/contextApi/appContext";
import EmptyPage from "@/components/common/EmptyPage";
import NoDataFound from "@/components/common/NoDataFound";
import Image from "next/image";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DrawerEdit, PencilIcon1 } from "../style";
import { DataGridStyle } from "@/components/common/commonStyle";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useDispatch } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import { FontContainer } from "@/components/SellerSubaccount/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/EmptyPage/styles";
import PopoverSlider from "@/components/miniSite/PopoverSlider";
import ServicesSkeleton from "../Services/Skeleton";
import AddCustomerCaseForm from "./AddCustomerCaseForm";
import Carousel from "react-material-ui-carousel";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
const CustomerCaseForm = () => {
  const [servicesList, setServiceList] = useState<any>([]);
  const [cloneServiceList, setCloneServiceList] = useState<any>([]);
  const [addMore, setAddMore] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [editColumn, setEditColumn] = useState<any>({});
  const [deleteID, setDeleteID] = useState<any>([]);
  const { breakPoints } = useContext(MyAppContext);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [viewImage, setViewImage] = useState<boolean>(false);
  const [searchService, setSearchService] = useState<any>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterData, setfilterData] = useState(false);
  const [currencyList, setCurrencyList] = useState<any>([]);
  const iconStyle = { fontSize: "18px", cursor: "pointer" };
  useEffect(() => {
    setLoader(true);
    fetchServicesList();
  }, []);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  useEffect(() => {
    FetchCurrency();
  }, []);
  const FetchCurrency = async () => {
    let response = await apiClient("currency", "get");
    setCurrencyList(
      response.data.map((v) => ({
        id: v.id,
        value: v.code,
        view: v.name,
      }))
    );
  };
  const DeleteCustomer = async () => {
    let response = await apiClient("export_traders/delete", "post", {
      body: { id: deleteID.toString() },
    });
    if (response.status == 200) toast.success("Record Deleted Successfully");
    setDeleteConfirmation(false);
    fetchServicesList();
    dispatch(getCompanyProfile());
    setDeleteID([]);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddMore("add-more");
    setState({ ...state, [anchor]: open });
  };
  const dispatch = useDispatch();
  const fetchServicesList = async () => {
    let response = await apiClient("export_traders/list", "get");
    if (response?.status === 200) {
      setServiceList(response?.data);
      setCloneServiceList(response?.data);
      dispatch(getCompanyProfile());
    }
    setLoader(false);
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: "500px",
        "@media screen and (max-width:600px)": {
          width: "250px !important",
        },
        padding: "12px 16px 0px 16px",
      }}
      role="presentation"
    >
      <AddCustomerCaseForm
        type={addMore}
        setAddMore={setAddMore}
        fetchServicesList={fetchServicesList}
        editColumn={addMore === "edit" ? editColumn : {}}
        setEditColumn={setEditColumn}
        currencyList={currencyList}
      />
    </Box>
  );
  const ImageDialog = ({ open, onClose, images }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Typography variant="h6">Cooperation Photos</Typography>
        <IconButton onClick={onClose} color="inherit">
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: "0 20px 20px" }}>
        <Carousel>
          {images?.map((image, index) => (
            <img
              key={index}
              src={image?.source}
              alt={`Cooperation ${index + 1}`}
              height="400px"
              width="100%"
            />
          ))}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
  const rows = servicesList?.map((data, index) => ({
    id: data?.id,
    projectName: data.customer_name,
    productSupplied: data.supplied_product,
    annualTurnover: data.annual_turnover,
    currency: data.currency,
    countryRegion: data.customer_region,
    cooperationPhotos: data?.cooperation_photos,
    transactionDocuments: data?.transaction_documents,
    status: data.status,
  }));
  const columns: any = [
    {
      field: "projectName",
      headerName: "Project/Customer Name",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "productSupplied",
      headerName: "Product Supplied to Customer",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "annualTurnover",
      headerName: "Annual Turnover",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "currency",
      headerName: "Currency",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "countryRegion",
      headerName: "Customer's Country/Region",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const value = params?.value;
        const countryName = getCountryNameByCode(value);
        return <div>{countryName}</div>;
      },
    },
    {
      field: "cooperationPhotos",
      headerName: "Cooperation Photos",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleOpenDialog = () => setDialogOpen(true);
        const handleCloseDialog = () => setDialogOpen(false);
        const images = params?.value;
        return (
          <>
            <AvatarGroup max={3} onClick={handleOpenDialog}>
              {images?.map((item, index) => (
                <Avatar
                  key={index}
                  sx={{ width: 36, height: 36 }}
                  alt={`Image ${index}`}
                  src={item?.source}
                />
              ))}
            </AvatarGroup>
            <ImageDialog
              open={dialogOpen}
              onClose={handleCloseDialog}
              images={images}
            />
          </>
        );
      },
    },
    {
      field: "transactionDocuments",
      headerName: "Transaction Documents",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <LightTooltip placement="top" title="View" arrow disableInteractive>
            <RemoveRedEyeIcon
              style={{ color: "#01aef2", fontSize: "18px" }}
              onClick={() => {
                const value = params?.value;
                if (Array.isArray(value)) {
                  value.forEach((item) => {
                    if (item?.source) {
                      window.open(item.source, "_blank");
                    }
                  });
                }
              }}
            />
          </LightTooltip>
          <LightTooltip
            placement="top"
            title="Download"
            arrow
            disableInteractive
          >
            <DownloadOutlinedIcon
              style={{ color: "#D7282F", fontSize: "21px" }}
              onClick={() => {
                const value = params?.value;
                if (Array.isArray(value)) {
                  value.forEach((item) => {
                    const link = document.createElement("a");
                    link.href = item?.source;
                    link.download = item?.source.split("/").pop();
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  });
                }
              }}
            />
          </LightTooltip>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Show on Minisite",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value === "Enable" ? "#ecfbe6" : "#ffe1e2",
            color: params.value === "Enable" ? "#2a7e03" : "#d7282f",
            padding: "4px 8px",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {params.value === "Enable" ? "Yes" : "No"}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params, index) => {
        const handleCloseDrawer = () => setDrawerOpen(false);
        const handleOpenDrawer = () => setDrawerOpen(true);
        return (
          <>
            <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <LightTooltip
                placement="top"
                title="Edit"
                arrow
                disableInteractive
              >
                <PencilIcon1>
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
                </PencilIcon1>
              </LightTooltip>
              <LightTooltip
                placement="top"
                title="Delete"
                arrow
                disableInteractive
              >
                <DeleteOutlineOutlinedIcon
                  onClick={(e) => {
                    setDeleteID(+params.id);
                    setDeleteConfirmation(true);
                  }}
                  style={{ color: "#D7282F", fontSize: "16px" }}
                />
              </LightTooltip>
            </Box>
            <DrawerEdit
              anchor="right"
              open={drawerOpen}
              onClose={handleCloseDrawer}
            >
              <Box p={2} role="presentation"></Box>
            </DrawerEdit>
          </>
        );
      },
    },
  ];

  const FilterTable = (e) => {
    if (e.target.value.trim() !== "") {
      setSearchService(e.target.value);
      setServiceList(cloneServiceList);
      let results = cloneServiceList.filter((val) => {
        return val.customer_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      if (results.length == 0) {
        setfilterData(true);
      } else {
        setfilterData(false);
        setServiceList(results);
      }
      return;
    } else {
      setSearchService("");
      setfilterData(false);
      setServiceList(cloneServiceList);
    }
  };
  let List = [1, 2, 3, 4, 5];
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <Box mt={2}>
      <Grid container spacing={3} className="company_detail_service">
        <Grid item xs={12}>
          <OuterContainer
            style={{
              width: "100%",
              boxShadow: "6px 12px 23px 10px rgb(112 112 112 / 7%)",
            }}
          >
            {deleteConfirmation && (
              <DeleteDialog
                open={deleteConfirmation}
                handleClose={setDeleteConfirmation}
                text="Customer case"
                onClickAction={DeleteCustomer}
              />
            )}
            {viewImage && (
              <PopoverSlider
                open={viewImage}
                handleClose={() => setViewImage(false)}
                activedata={{ images: imageUrl }}
                rowData={[]}
              />
            )}
            <HeaderContainer breakPoints={breakPoints} className="customerCase">
              <div>
                <HeaderTextContainer breakPoints={breakPoints}>
                  Customer cases{" "}
                </HeaderTextContainer>
              </div>

              <EditTextContainer>
                {
                  <Redoutlinebtn
                    onClick={toggleDrawer("right", true)}
                    sx={{
                      "@media screen and (max-width:600px)": {
                        marginBottom: "10px !important",
                      },
                    }}
                  >
                    Add Customer cases
                    <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
                  </Redoutlinebtn>
                }
              </EditTextContainer>
            </HeaderContainer>

            <Divider variant="middle" style={{ margin: 0 }} />
            <>
              {servicesList.length > 0 && (
                <DeleteSelectedOuterBox>
                  <TextField
                    placeholder="Search Customer cases"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: "4px",
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "rgba(0, 0, 0, 0.4)",
                        },
                        "& .MuiInputBase-root": {
                          color: "#231F20",
                        },
                      },
                    }}
                    value={searchService}
                    onChange={FilterTable}
                    InputProps={{
                      style: { color: "#000" },
                    }}
                  />
                  <DeleteSelectedInnerBox>
                    <Box>
                      <DeleteSelectedText>
                        Customer Cases Selected (
                        {deleteID.length < 0 ? 0 : deleteID.length})
                      </DeleteSelectedText>
                    </Box>
                    <DeleteSelectedDivider></DeleteSelectedDivider>
                    {deleteID.length > 0 && (
                      <Box>
                        <DeleteSelectedRedText
                          onClick={() => {
                            setDeleteConfirmation(true);
                          }}
                        >
                          Delete Selected
                          <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                        </DeleteSelectedRedText>
                      </Box>
                    )}
                  </DeleteSelectedInnerBox>
                </DeleteSelectedOuterBox>
              )}
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
                  !filterData &&
                  servicesList.length == 0 && (
                    <Box
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ minHeight: "300px", display: "flex" }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <Image
                          height={80}
                          width={80}
                          alt="No customer cases added"
                          src={"/assets/no_customer_cases.svg"}
                        />
                        <LargeTextContainer>
                          No Customer cases Added{" "}
                        </LargeTextContainer>
                        <SmallTextContainer>
                          You have not managed any Customer cases yet.
                        </SmallTextContainer>
                        <SmallTextContainer
                          value={{ cursor: "pointer", color: "#D7282F" }}
                          className={companydetail.addmorebtn}
                          height={"36px"}
                          width={"140px"}
                          onClick={toggleDrawer("right", true)}
                        >
                          Click here to add Customer case
                        </SmallTextContainer>
                      </div>
                    </Box>
                  )
                )}
                {filterData && <NoDataFound />}

                {!filterData && servicesList.length > 0 && (
                  <DataGridPro
                    style={{
                      border: "5px",
                      borderRadius: "10px",
                      borderColor: "transparent",
                    }}
                    localeText={{
                      columnMenuShowColumns: "Manage Columns",
                    }}
                    pagination
                    rows={!loader ? rows : []}
                    columns={columns}
                    pageSize={5}
                    rowHeight={46}
                    loading={loader}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onSelectionModelChange={(newSelectionModel) => {
                      setDeleteID(newSelectionModel);
                    }}
                    sx={DataGridStyle}
                    hideFooterSelectedRowCount={true}
                    autoHeight
                    components={{
                      NoRowsOverlay: () => (
                        <>
                          {/* {loader ? (
                            <>
                              {List.map((v, i) => (
                                <ServicesSkeleton key={i} />
                              ))}
                            </>
                          ) : ( */}
                          <>
                            {cloneServiceList.length !== servicesList.length ? (
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
                                  text={"customer case"}
                                  onClickHandler={toggleDrawer("right", true)}
                                  logo="/assets/services.svg"
                                />
                              </Stack>
                            )}
                          </>
                          {/* )} */}
                        </>
                      ),
                    }}
                  />
                )}
              </Box>
            </>
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
  );
};
export default CustomerCaseForm;

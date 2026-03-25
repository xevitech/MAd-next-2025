import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import {
  Box,
  Divider,
  TextField,
  Stack,
  Typography,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import { apiClient } from "@/components/common/common";
import AddServices from "./AddServices";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import { MyAppContext } from "@/contextApi/appContext";
import ImageViewer from "@/components/common/ImageViewer";
import EmptyPage from "@/components/common/EmptyPage";
import NoDataFound from "@/components/common/NoDataFound";
import Image from "next/image";
import { FactorySmallTextContainer } from "@/components/CompanySettings/CompanyDetail/commonStyles";

//  drawer //
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { PencilIcon1 } from "../style";
import moment from "moment";
import ServicesSkeleton from "./Skeleton";
import { DataGridStyle } from "@/components/common/commonStyle";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { useDispatch } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
import { FontContainer } from "@/components/SellerSubaccount/styles";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/EmptyPage/styles";
import PopoverSlider from "@/components/miniSite/PopoverSlider";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const Services = () => {
  const [servicesList, setServiceList] = useState<any>([]);
  const [cloneServiceList, setCloneServiceList] = useState<any>([]);
  const [addMore, setAddMore] = useState<string>("");
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [editColumn, setEditColumn] = useState<any>({});
  const [deleteID, setDeleteID] = useState<any>([]);
  const iconStyle = { fontSize: "18px", cursor: "pointer" };
  const { setCompleteScreenLoader, breakPoints } = useContext(MyAppContext);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [viewImage, setViewImage] = useState<boolean>(false);
  const [searchService, setSearchService] = useState<any>("");
  const [filterData, setfilterData] = useState(false);

  // Start Right Drawer flapout //
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
  // End Right Drawer flapout //
  const dispatch = useDispatch();
  const fetchServicesList = async () => {
    let response = await apiClient("company_profile/services/list", "get");
    if (response?.status === 200) {
      setServiceList(response?.data);
      setCloneServiceList(response?.data);
      dispatch(getCompanyProfile());
    }
    setLoader(false);
  };
  const imageArray = [0];

  useEffect(() => {
    setLoader(true);
    fetchServicesList();
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
      <AddServices
        type={addMore}
        setAddMore={setAddMore}
        fetchServicesList={fetchServicesList}
        editColumn={addMore === "edit" ? editColumn : {}}
        setEditColumn={setEditColumn}
      />
    </Box>
  );
  
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 170,
      flex: 1.5,
    },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <AvatarGroup
          max={3}
          onClick={() => {
            if (params?.row?.image) {
              setViewImage(true);

              setImageUrl(params.row.image); 
            }
          }}
        >
          {params?.row?.image?.map(
            (
              imageObj,
              index 
            ) => (
              <Avatar
                key={index}
                sx={{ width: 36, height: 36 }}
                alt={`Avatar ${index + 1}`}
                src={imageObj?.source || ""} 
              />
            )
          )}
        </AvatarGroup>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 250,
      flex: 1,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Created On",
      sortable: false,
      minWidth: 100,
      flex: 1.5,
      renderCell: (params) =>
        moment(params.row.created_at).format("DD/MM/YYYY"),
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      minWidth: 100,
      flex: 1.5,
      // renderCell: (params) => params.row.status,
      renderCell: (params) => (
        <Box sx={{
          backgroundColor: params.row.status === "enable" ? "#ecfbe6" : "#ffe1e2",
            color: params.row.status === "enable" ? "#2a7e03" : "#d7282f",
            padding: "4px 8px",
            borderRadius: "4px",
          textAlign: "center", textTransform: "capitalize"
        }}>
          {params.row.status}
        </Box>
      ),
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      sortable: false,
      minWidth: 100,
      flex: 1,
      renderCell: (params) =>
        moment(params.row.updated_at).format("DD/MM/YYYY"),
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      flex: 1,
      renderCell: (params) => (
        <>
          <PencilIcon1>
            <LightTooltip placement="top" title="Edit" arrow disableInteractive>
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
          </PencilIcon1>{" "}
          <LightTooltip placement="top" title="Delete" arrow disableInteractive>
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                setDeleteID(+params.id);
                setDeleteConfirmation(true);
              }}
              style={{ ...iconStyle, color: "#D7282F" }}
            />
          </LightTooltip>
        </>
      ),
    },
  ];

  const DeleteServices = async () => {
    let response = await apiClient(
      "company_profile/services_news/delete",
      "post",
      {
        body: { ids: deleteID.toString() },
      }
    );
    if (response.status == 200) toast.success("Record Deleted Successfully");
    setDeleteConfirmation(false);
    fetchServicesList();
    setDeleteID([]);
  };

  const FilterTable = (e) => {
    if (e.target.value.trim() !== "") {
      setSearchService(e.target.value);
      setServiceList(cloneServiceList);
      let results = cloneServiceList.filter((val) => {
        return (
          val.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.description.toLowerCase().includes(e.target.value.toLowerCase())
        );
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
    <Grid container spacing={3} className="company_detail_service">
      <Grid item xs={12}>
        <OuterContainer style={{ width: "100%" }}>
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={setDeleteConfirmation}
              text="service"
              onClickAction={DeleteServices}
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
          <HeaderContainer breakPoints={breakPoints}>
            <div>
              <HeaderTextContainer breakPoints={breakPoints}>
                Services{" "}
              </HeaderTextContainer>

              <FactorySmallTextContainer>
                Manage Information related to Services
              </FactorySmallTextContainer>
            </div>

            <EditTextContainer>
              {
                <Redoutlinebtn
                  className={companydetail.addmorebtn}
                  height={"36px"}
                  width={"140px"}
                  onClick={toggleDrawer("right", true)}
                  sx={{
                    "@media screen and (max-width:600px)": {
                      marginBottom: "10px !important",
                    },
                  }}
                >
                  Add Services
                  <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
                </Redoutlinebtn>
              }
            </EditTextContainer>
          </HeaderContainer>

          <Divider variant="middle" style={{ margin: 0 }} />
          <>
            <DeleteSelectedOuterBox>
            { servicesList.length > 0 && (
              <TextField
                placeholder="Search Services"
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
            )}
              <DeleteSelectedInnerBox>
                { servicesList.length> 0 && (
                <Box>
                  <DeleteSelectedText>
                    Services Selected ({deleteID.length})
                  </DeleteSelectedText>
                </Box>
                  )}
                    { servicesList.length> 0 && (
                <DeleteSelectedDivider></DeleteSelectedDivider>
                    )}
                {deleteID.length > 0 && (
                  <Box>
                    <DeleteSelectedRedText onClick={() => {
                        setDeleteConfirmation(true);
                    }}>
                      Delete Selected
                      <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                    </DeleteSelectedRedText>
                  </Box>
                )}
              </DeleteSelectedInnerBox>
            </DeleteSelectedOuterBox>

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
                        alt="No product added"
                        src={"/assets/images/no_services.svg"}
                      />
                      <LargeTextContainer>
                        No Services Added{" "}
                      </LargeTextContainer>
                      <SmallTextContainer>
                        You have not managed any Services yet.
                      </SmallTextContainer>
                      <SmallTextContainer
                        value={{ cursor: "pointer", color: "#D7282F" }}
                        className={companydetail.addmorebtn}
                        height={"36px"}
                        width={"140px"}
                        onClick={toggleDrawer("right", true)}
                      >
                        Click here to add Services
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
                  rows={!loader ? servicesList : []}
                  columns={columns}
                  pageSize={5}
                  rowHeight={46}
                  loading={loader}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
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
                                  text={"services"}
                                  onClickHandler={toggleDrawer("right", true)}
                                  logo="/assets/services.svg"
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
        </OuterContainer>
      </Grid>

      {/* // Right drawer function // */}
      {addMore && (
        <div>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => { }}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </div>
      )}
    </Grid>
  );
};
export default Services;

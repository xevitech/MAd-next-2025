import {
  Alert,
  Box,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { GridColDef } from "@mui/x-data-grid";
import {
  FirstletterCapital,
  apiClient,
  showCase,
} from "@/components/common/common";
import { DataGridPro } from "@mui/x-data-grid-pro";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { LicenseInfo } from "@mui/x-license-pro";
import AddMoreCertificates from "./AddMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import companydetail from "../companydetail.module.css";
import { Redoutlinebtn } from "@/components/common/buttons/ButtonsVariations";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Image from "next/image";
import {
  AccountFieldContainer,
  AddAccountContainer,
  HeaderContainer,
  HeaderTextContainer,
  OuterContainer,
  TextFieldButtonContainer,
  CertificateNumBtn,
  DeleteSelectedOuterBox,
  DeleteSelectedInnerBox,
  DeleteSelectedText,
  DeleteSelectedDivider,
  DeleteSelectedRedText,
} from "../commonStyles";
import DeleteDialog from "@/components/common/DeleteAlert/DeleteDialog";
import { ThreeDots } from "react-loader-spinner";
import EmptyPage from "@/components/common/EmptyPage";
import { PencilIcon1 } from "../style";
import CertificateSkeleton from "../CompanySkeletons/CertificateSkeleton";
import ServicesSkeleton from "../Services/Skeleton";
import { DataGridStyle } from "@/components/common/commonStyle";
import { SwipeableDrawerStyle } from "./style";
import moment from "moment";
import PopoverSlider from "@/components/miniSite/PopoverSlider";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { FontContainer } from "@/components/SellerSubaccount/styles";
import { data } from "jquery";
import { useDispatch } from "react-redux";
import { getCompanyProfile } from "@/hooks/company";
let List = [1, 2, 3, 4, 5, 6];
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const AllCertificateData = ({ certificateTypes }) => {
  const iconStyle = { fontSize: "18px", cursor: "pointer" };
  const [deleteConfirmation, setDeleteConfirmation] = useState<any>({
    status: false,
    id: [],
  });
  const [getAccount, setGetAccount] = useState("");
  const [viewImage, setViewImage] = useState<any>(false);
  const [alertState, setAlertState] = useState<any>(false);
  const [deleteID, setDeleteID] = useState<any>([]);
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>({});
  const [active, setActive] = useState<any>(null);
  const [allCertificate, setAllCertificate] = useState<any>([]);
  const [allCertificateClone, setAllCertificateClone] = useState<any>([]);
  const [allImageData, setAllImageData] = useState<any>([]);
  const [rowData, setAllRowData] = useState();
  const [localLoading, setLocalLoader] = useState<boolean>(false);
  const [clearLoading, setClearLoader] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [certificateType, setCertificateType] = useState<string>("all");

  const dispatch = useDispatch();
  const list = () => (
    <Box
      className="right_flapout service_flapout"
      sx={{ width: 1200 }}
      role="presentation"
    >
      <AddMoreCertificates
        editData={editData}
        onClose={HandleClose}
        name={active}
      />
    </Box>
  );

  const HandleClose = (toggle, fetchData = false) => {
    setEditData({});
    setToggleDrawer(toggle);
    if (fetchData) {
      getCertificateList();
    }
  };
  const getCertificateList = async () => {
    let customUrl = "company_profile/certificate/list";

    if (searchString) {
      customUrl = customUrl + `?search=${searchString}`;
    }
    if (certificateType.length > 0 && certificateType !== "all") {
      customUrl = customUrl.includes("?")
        ? customUrl + `&type=${certificateType}`
        : customUrl + `?type=${certificateType}`;
    }

    const response = await apiClient(customUrl, "get");
    setLocalLoader(false);
    setClearLoader(false);
    if (response.status == 200) {
      setAllCertificate(response.data);
      setAllCertificateClone(response.data);
      response?.data?.length < 4 ? setAlertState(true) : setAlertState(false);
      dispatch(getCompanyProfile());
    }
    setLoader(false);
  };

  useEffect(() => {
    getCertificateList();
  }, []);

  const deleteCertificateList = async (id: any) => {
    console.log(typeof id, "typo");
    const idForPyaload = typeof id === "number" ? [id] : id;
    const response = await apiClient(
      "company_profile/certificate/delete",
      "post",
      {
        body: { id: idForPyaload },
      }
    );
    if (response.status) {
      const deletedList = allCertificate.filter((item) => item.id !== id);
      setDeleteID([]);
      setAllCertificate(deletedList);
      setAllCertificateClone(deletedList);
      setDeleteConfirmation(false);
      setDeleteConfirmMulti(false);
      getCertificateList();
      dispatch(getCompanyProfile());
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Certificate Name",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        const { name, test_item } = params.row;
        return <div>{name ? name : `(${test_item})`}</div>;
      },
    },
    {
      field: "reference_no",
      headerName: "Certificate Number",
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
      sortable: false,
      renderCell: (cellValues) => {
        const { type, filling_no, reference_no } = cellValues.row;
        return (
          <>
            {type == "trademark"
              ? filling_no != null
                ? filling_no
                : "NA"
              : reference_no != null
              ? reference_no
              : "NA"}
          </>
        );
      },
    },
    {
      field: "type",
      headerName: "Certificate Type",
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (cellValues) => {
        const { type } = cellValues.row;
        return <>{FirstletterCapital(type)}</>;
      },
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (cellValues) => {
        return (
          <>
            {/* {cellValues.row.status ? cellValues.row.status : "enable"} */}
            <Box
              sx={{
                backgroundColor:
                  cellValues.row.status === "enable" ? "#ecfbe6" : "#ffe1e2",
                color:
                  cellValues.row.status === "enable" ? "#2a7e03" : "#d7282f",
                padding: "4px 8px",
                borderRadius: "4px",
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {cellValues.row.status ? cellValues.row.status : "enable"}
            </Box>
          </>
        );
      },
    },

    {
      field: "created_at",
      headerName: "Created On",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues?.value === null
              ? "NA"
              : moment(cellValues.value).format("YYYY-MM-DD")}
          </>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues?.value === null
              ? "NA"
              : moment(cellValues.value).format("YYYY-MM-DD")}
          </>
        );
      },
    },
    {
      field: "start_date",
      headerName: "Start Date",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return <>{cellValues?.value === null ? "NA" : cellValues.value}</>;
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      sortable: false,
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return <>{cellValues?.value === null ? "NA" : cellValues.value}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 100,
      flex: 1,
      align: "center",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <LightTooltip placement="top" title="View" arrow disableInteractive>
            <RemoveRedEyeOutlinedIcon
              style={{
                opacity: "0.7",
                marginLeft: "4px",
                color: "#01AEF2",
                width: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                setViewImage(true), setAllImageData(params.row.images);
                setAllRowData(params.row);
              }}
            ></RemoveRedEyeOutlinedIcon>
          </LightTooltip>

          <LightTooltip placement="top" title="Edit" arrow disableInteractive>
            <PencilIcon1>
              <Image
                style={{ cursor: "pointer", marginLeft: 4, marginRight: 5 }}
                src={"/assets/EditPencil.svg"}
                layout="fill"
                alt="editImage"
                onClick={() => {
                  setActive(params.row.type);
                  setEditData(params.row);
                  setToggleDrawer(true);
                }}
              />
            </PencilIcon1>
          </LightTooltip>
          <LightTooltip placement="top" title="Delete" arrow disableInteractive>
            <DeleteOutlineOutlinedIcon
              onClick={() => {
                const cert = allCertificate.find(
                  (item) => item.id === params?.id
                );
                setDeleteConfirmation({
                  status: true,
                  id: params?.id,
                  name: cert?.name || "Unknown",
                  type: cert?.type || "Unknown",
                });
              }}
              style={{ ...iconStyle, color: "#D7282F" }}
            />
          </LightTooltip>
        </>
      ),
    },
  ];

  const handleSearchSubmit = (e) => {
    const filterData = allCertificateClone.filter((item) => {
      const matchesType =
        certificateType != "all"
          ? item.type.toLowerCase() === certificateType.toLowerCase()
          : true;
      const matchesName = searchString
        ? item.name &&
          item.name.toLowerCase().includes(searchString.toLowerCase())
        : true;
      return matchesType && matchesName;
    });
    setAllCertificate(filterData);
    setLocalLoader(false);
  };

  const [deleteConfirmMulti, setDeleteConfirmMulti] = useState(false);

  return (
    <>
      {viewImage && (
        <PopoverSlider
          open={viewImage}
          handleClose={() => setViewImage(false)}
          activedata={{ images: allImageData }}
          rowData={rowData}
        />
      )}

      {deleteConfirmMulti && (
        <DeleteDialog
          open={deleteConfirmMulti}
          handleClose={() => setDeleteConfirmMulti(false)}
          text={`certificate`}
          onClickAction={() => deleteCertificateList(deleteID)}
        />
      )}

      {deleteConfirmation?.status && (
        <DeleteDialog
          open={deleteConfirmation?.status}
          handleClose={() => setDeleteConfirmation({ status: false, id: "" })}
          text={`<strong>${deleteConfirmation.type}'s</strong>  <strong>${deleteConfirmation.name}</strong> certificate`}
          // text={`<strong>${deleteConfirmation.name}</strong> certificate <br> under <strong>${deleteConfirmation.type}</strong> certificate`}
          onClickAction={() => deleteCertificateList(deleteConfirmation?.id)}
        />
      )}

      <Grid container spacing={2} className="company_detail_certificate">
        <Grid item xs={12}>
          <OuterContainer>
            <HeaderContainer style={{ padding: "0 0 10px 0" }}>
              <DeleteSelectedOuterBox>
                <HeaderTextContainer sx={{ flex: "none" }}>
                  Certificates
                </HeaderTextContainer>
                <DeleteSelectedInnerBox>
                  {deleteID.length > 0 && (
                    <Box>
                      <DeleteSelectedText>
                        Certificate Selected{" "}
                        {deleteID?.length > 0 && `(${deleteID.length})`}
                      </DeleteSelectedText>
                    </Box>
                  )}
                  {deleteID.length > 0 && (
                    <DeleteSelectedDivider></DeleteSelectedDivider>
                  )}
                  {deleteID.length > 0 && (
                    <Box>
                      <DeleteSelectedRedText
                        onClick={() => {
                          setDeleteConfirmMulti(true);
                        }}
                      >
                        Delete Selected
                        <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                      </DeleteSelectedRedText>
                    </Box>
                  )}
                </DeleteSelectedInnerBox>
              </DeleteSelectedOuterBox>
            </HeaderContainer>
            {alertState && (
              <Box sx={{ margin: "0px 0 10px 0" }}>
                <Alert
                  sx={{
                    backgroundColor: "#fff1f2",
                    color: "#d7282f",
                    "@media screen and (max-width:900px)": {
                      fontSize: "11px",
                      margin: "6px 0 0 0",
                    },
                    "@media screen and (max-width:480px)": {
                      padding: "0px 6px",
                    },
                    ".MuiAlert-icon": {
                      color: "#d7282f",
                      fontSize: "20px",
                      padding: "6px 0 7px 0",
                    },
                    "& .MuiAlert-message": {
                      fontSize: "13px",
                    },
                    "& .MuiAlert-action": {
                      padding: "1px 0 0 0",
                    },
                  }}
                  severity="info"
                  onClose={() => setAlertState(false)}
                >
                  {showCase}
                </Alert>
              </Box>
            )}
            <Divider variant="middle" style={{ margin: 0 }} />
            <AddAccountContainer className="addaccountcontainer">
              <form
                className={companydetail.certificatelist}
                style={{
                  display: "flex",
                  flex: 1,
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <AccountFieldContainer value={{ flex: 0.2 }}>
                  {allCertificate.length > 0 && (
                    <TextField
                      label={getAccount !== "" ? "" : "Certificate Type"}
                      style={{ width: "100%" }}
                      id="outlined-select-social"
                      variant="outlined"
                      select
                      name={"certificateType"}
                      size="small"
                      value={certificateType}
                      onChange={(e) => setCertificateType(e.target.value)}
                      InputLabelProps={{
                        style: {},
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "4px",
                          },
                        },
                      }}
                    >
                      {certificateTypes.map((option, index) => (
                        <MenuItem key={index} value={option.toLowerCase()}>
                          {FirstletterCapital(option)}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </AccountFieldContainer>
                <AccountFieldContainer value={{ flex: 0.5 }}>
                  {allCertificate.length > 0 && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      name={"searchString"}
                      size="small"
                      value={searchString}
                      label="Certification Name"
                      placeholder="Please Enter a Certification Name"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setSearchString(
                          inputValue === "" ? "" : inputValue.trimStart()
                        );
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          paddingRight: "40px",
                          color: "rgba(0, 0, 0, 0.5)",
                          "& fieldset": {
                            borderRadius: "4px",
                          },
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "rgba(0, 0, 0, 0.4)",
                        },
                        "& .MuiInputBase-root": {
                          color: "#231F20",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    ></TextField>
                  )}
                  <CertificateNumBtn>
                    {allCertificate.length > 0 && (
                      <Redoutlinebtn
                        onClick={(e) => {
                          setLocalLoader(true);
                          handleSearchSubmit(e);
                        }}
                        sx={{
                          marginLeft: "10px",
                          borderRadius: "4px",
                          padding: "0 25px",
                          height: "37px",
                          "@media screen and (max-width:480px)": {
                            border: "none",
                          },
                        }}
                      >
                        {localLoading ? (
                          <ThreeDots
                            height="37 !important"
                            width="40"
                            radius="9"
                            color="#D7282F"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Search"
                        )}

                        <SearchOutlinedIcon
                          sx={{
                            fontSize: "18px",
                            margin: "2px 0 0 4px",
                          }}
                        />
                      </Redoutlinebtn>
                    )}
                  </CertificateNumBtn>
                </AccountFieldContainer>
                {getAccount && (
                  <CertificateNumBtn
                    sx={{
                      "@media screen and (max-width:900px)": {
                        display: "none",
                      },
                    }}
                  >
                    <Redoutlinebtn
                      onClick={(e) => {
                        getCertificateList();
                        setGetAccount("");

                        setCertificateType("");
                        setSearchString("");
                      }}
                      sx={{
                        marginLeft: "10px",
                        "@media screen and (max-width:900px)": {
                          marginLeft: "0px",
                        },
                        borderRadius: "4px",
                        height: "37px",
                      }}
                    >
                      {clearLoading ? (
                        <ThreeDots
                          height="37 !important"
                          width="40"
                          radius="9"
                          color="#D7282F"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      ) : (
                        "Clear All"
                      )}
                    </Redoutlinebtn>
                  </CertificateNumBtn>
                )}
              </form>
              <AccountFieldContainer
                value={{ flex: 0.3 }}
                sx={{
                  "@media screen and (max-width:900px)": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    margin: "-12px 0 0 0",
                  },
                }}
              >
                <Box>
                  {getAccount && (
                    <CertificateNumBtn
                      sx={{
                        "@media screen and (max-width:900px)": {
                          display: "block",
                        },
                        display: "none",
                        "& .MuiButtonBase-root": {
                          "@media screen and (max-width: 480px)": {
                            fontSize: "13px",
                            margin: "0 0 0 16px",
                            position: "relative",
                            "& .MuiSvgIcon-root": {
                              fontSize: "25px !important",
                            },
                          },
                        },
                      }}
                    >
                      <Redoutlinebtn
                        onClick={(e) => {
                          setGetAccount("");
                          setCertificateType("");
                          setSearchString("");
                          getCertificateList();
                          handleSearchSubmit(e);
                        }}
                        sx={{
                          marginLeft: "10px",
                          "@media screen and (max-width:900px)": {
                            marginLeft: "0px",
                          },
                          borderRadius: "4px",
                          height: "37px",
                        }}
                      >
                        {localLoading ? (
                          <ThreeDots
                            height="37 !important"
                            width="40"
                            radius="9"
                            color="#D7282F"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Clear All"
                        )}
                      </Redoutlinebtn>
                    </CertificateNumBtn>
                  )}
                </Box>
                <TextFieldButtonContainer
                  value={"flex-end"}
                  sx={{
                    "@media (max-width:320px)": {
                      display: "flex",
                    },
                  }}
                >
                  <Redoutlinebtn
                    sx={{
                      height: "37px",
                      "@media screen and (max-width: 768px)": {
                        minWidth: "57px",
                        marginBottom: "0px",
                      },
                    }}
                    type="submit"
                    height={"38px"}
                    width={"160px"}
                    borderRadius="4px"
                    onClick={() => {
                      setEditData({});
                      setActive(null);
                      setToggleDrawer(true);
                    }}
                  >
                    Add Certificates
                    <AddCircleOutlineIcon sx={{ marginLeft: 1, height: 24 }} />
                  </Redoutlinebtn>
                </TextFieldButtonContainer>
              </AccountFieldContainer>
            </AddAccountContainer>
            <Box sx={{ width: "100%" }}>
              {localLoading || loader ? (
                <>
                  {List.map((v, i) => (
                    <CertificateSkeleton key={i} />
                  ))}
                </>
              ) : allCertificate.length == 0 && !loader ? (
                <Box
                  sx={{ height: 300, width: "100%" }}
                  className={companydetail.nodata}
                >
                  <EmptyPage
                    text={"certificate"}
                    onClickHandler={() => setToggleDrawer(true)}
                    logo="/assets/legal-contract.svg"
                  />
                </Box>
              ) : (
                <DataGridPro
                  className={companydetail.certificatedatagrid}
                  style={{
                    border: "5px",
                    borderRadius: "10px",
                    borderColor: "transparent",
                  }}
                  localeText={{
                    columnMenuShowColumns: "Manage Columns",
                  }}
                  rows={allCertificate}
                  columns={columns}
                  pagination
                  pageSize={5}
                  rowHeight={46}
                  autoHeight
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  sx={DataGridStyle}
                  experimentalFeatures={{ newEditingApi: true }}
                  onSelectionModelChange={(newSelectionModel) => {
                    if (newSelectionModel?.length > 0) {
                      setDeleteConfirmMulti(true);
                    }
                    setDeleteID(newSelectionModel);
                    setDeleteConfirmMulti(false);
                  }}
                  components={{
                    NoRowsOverlay: () => (
                      <>
                        {localLoading ? (
                          <>
                            {List.map((v, i) => (
                              <CertificateSkeleton key={i} />
                            ))}
                          </>
                        ) : (
                          "null"
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
          </OuterContainer>
        </Grid>
        {open && (
          <div>
            <SwipeableDrawerStyle
              className="certificateinner"
              anchor={"right"}
              open={toggleDrawer}
              onClose={() => {}}
              onOpen={() => setToggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawerStyle>
          </div>
        )}
      </Grid>
    </>
  );
};
export default AllCertificateData;

import React, { use, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  SwipeableDrawer,
  TextField,
  IconButton,
  FormGroup,
  FormControlLabel,
  Typography,
  Avatar,
  CardContent,
  styled,
} from "@mui/material";
import {
  BoxFlex,
  BoxSeller,
  BoxSellerList,
  CardBoxContent,
  CardInnerCode,
  ColorNox,
  CrossButton,
  DrawerContainer,
  DrawerHeader,
  DrawerInfoCard,
  DrawerNotesSection,
  DrawerProfileInfo,
  DrawerWidthContainer,
  FeedbackBox,
  FeedbackInfo,
  FontContainer,
  GridTableContainer,
  LabelTtext,
  SearchWithCraete,
  SelectedAction,
  SellerSearchCommon,
  SSAAvtarInfo,
  SSAPersonalInfo,
  swipebarStyling,
} from "./styles";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license-pro";
import ProjectForm1 from "./Form";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteDialog from "../common/DeleteAlert/DeleteDialog";
import { toast } from "react-toastify";
import EmptyPage from "../common/EmptyPage";
import Image from "next/image";
import { ProfileHeader } from "../common/profileheader";
import sellersubaccount from "./style.module.css";
import AddIcon from "@mui/icons-material/Add";
import SkeletonForContactList from "../ContactList/ContactListSkeleton";
import { useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { DeleteAccount, fetchSubsellerLists } from "@/hooks/sellerSubaccount";
import { LightTooltip } from "../common/Tooltip/tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { SearchandButton } from "../Roles/style";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  LargeTextContainer,
  SmallTextContainer,
} from "@/components/common/NoDataFound/style";
import { apiClient, GetCurrentPlan } from "../common/common";
import { DataGridStyle } from "../common/commonStyle";
import Dashboard from "pages/dashboard";
import { fetchRolesData } from "@/hooks/UseProductListContext";
import { useRouter } from "next/router";
import PlanDialogSellerSubAccount from "../Roles/PlanDialogSellerSubAccount";
import { CustomSwitch3 } from "../subDomain/Subdomainstyle";
import { Android12Switch } from "../subDomain/ManageBanner/BannerOptions";
import Swal from "sweetalert2";
import PlanLimitDialog from "../Roles/PlanLimitDialog";
import { BASE_URL, LOCAL_PUBLIC_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Flag } from "../common/countryFlag";
const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 22,
  padding: 0,
  margin: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...theme.applyStyles("dark", {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const SellerContactTable = () => {
  LicenseInfo.setLicenseKey(
    "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
  );
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deleteConfirmation1, setDeleteConfirmation1] =
    useState<boolean>(false);
  const [editValues, setEditValue] = useState<any>({});
  const [user_id, setUserID] = useState<any>("");
  const [deleteID, setDeleteID] = useState<any>([]);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState([]);
  const { sellerList, deleteResponse, loader } = useSelector(
    (state: any) => state.subseller
  );
  const { role } = useSelector((state: any) => state.userData);
  const List = [1, 2, 3, 4, 5];
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [openModal, setOpen] = React.useState(false);
  const [openLimitModal, setLimitOpen] = React.useState(false);
  const [planLoading, setPlanLoading] = React.useState(false);
  useEffect(() => {
    dispatch(fetchSubsellerLists());
    dispatch(fetchRolesData());
  }, []);
  const [featureList, setFeatureList] = useState<any>([]);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { rolesData } = useSelector((state: any) => state.productList);
  useEffect(() => {
    GetCurrentPlan(setFeatureList);
  }, []);

  const [profileImage, setProfileImage] = useState<any>("");
  const handleSwitchChange = async (row) => {
    const newStatus = row.status === "active" ? "inactive" : "active";
    let formData = new FormData();
    formData.append("name", `${row?.name}`);
    formData.append("email", row?.email);
    formData.append("status", newStatus);
    formData.append("password", row?.id ? "******" : "");
    formData.append("account_type", row?.account_type);
    formData.append("address", row?.address);
    formData.append("gender", row?.gender);
    formData.append("postal_code", row?.postal_code);
    formData.append("job_function", row?.job_function);
    formData.append("job_role", row?.job_role);
    formData.append("phone_code", row?.phone_code);
    formData.append("phone", row?.phone);
    formData.append("role", "testrole");
    formData.append("mobile_country_code", row?.mobile_country_code);
    const parent_name = JSON.parse(localStorage.getItem("userData"))?.name;
    formData.append("parent_name", parent_name);
    if (row?.password)
      formData.append(
        "password",
        row?.password == "******" ? "" : row?.password
      );
    formData.append("user_id", row?.id);
    if (typeof profileImage !== "string")
      formData.append("image", profileImage);
    let response: any = await apiClient(
      `sub_account/update`,
      "post",
      {
        body: formData,
      },
      true
    );

    if (response.status === 200) {
      dispatch(fetchSubsellerLists());
      fetchRolesData1();
      FetchPlanDetail();
    } else {
    }
  };
  // useEffect(()=>{
  //   fetchRolesData1()
  // },[])

  const [planData, setPlan] = useState("");
  const columnData: any = [
    {
      field: "id",
      headerName: "S.No",
      flex: 0.5,
      minwidth: 400,
      renderCell: (params) => {
        const rowIndex = params.api.getRowIndex(params.id) + 1;
        return <>{rowIndex}</>;
      },
    },
    {
      field: "Name",
      headerName: "Name",
      // flex: 1,
      minwidth: 400,
      width: 150,
      renderCell: (params) => {
        const userId = params.row.id; // Assuming the row has an `id` field

        const handleClick = () => {
          handleRightDrawerToggle(true);
          fetchRolesData2(userId);
          fetchFeedBackList();
        };

        return (
          <Box component="div" display="flex" alignItems="center" gap={1}>
            <Image
              height={30}
              width={30}
              src={
                params.row.avatar_original[0]?.source
                  ? params.row.avatar_original[0]?.source
                  : `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
              }
              alt="avatar-image"
              style={{ borderRadius: "50%" }}
            />
            <Typography onClick={handleClick} style={{ cursor: "pointer" }}>
              {`${params.row.name} ${params?.row?.last_name ?? ""}`}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "accountType",
      headerName: "Account Type",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return <>{params.row.account_type || "N/A"}</>;
      },
    },
    {
      field: "supervisor",
      headerName: "Supervisor",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return <>{params.row.parent_name || "N/A"}</>;
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        return <>{params.row.job_role || "N/A"}</>;
      },
    },
    {
      field: "customers",
      headerName: "Customers",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return <>{params.row.customers || "N/A"}</>;
      },
    },
    {
      field: "inquiries",
      headerName: "Inquiries",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return <>{params.row.inquiries || "N/A"}</>;
      },
    },
    {
      field: "onDisplay",
      headerName: "On Display Products",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return <>{"N/A"}</>;
      },
    },
    {
      field: "offDisplay",
      headerName: "Off Display Products",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return <>{"N/A"}</>;
      },
    },

    {
      field: "active",
      headerName: "Status",
      flex: 1,
      minWidth: 200,

      renderCell: (params) => {
        return (
          <>
            <CustomSwitch3>
              <FormGroup>
                <FormControlLabel
                  sx={{
                    "&.MuiFormControlLabel-root": {
                      marginRight: 0,
                    },
                  }}
                  control={
                    <LightTooltip
                      title={params.row.status !== "active" ? "Off" : "On"}
                      arrow
                      placement="top"
                      disableInteractive
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -14],
                              },
                            },
                          ],
                        },
                      }}
                    >
                      <Android12Switch
                        checked={params.row.status === "active"}
                        onChange={() => handleSwitchChange(params.row)}
                      />
                    </LightTooltip>
                  }
                  label=""
                />
              </FormGroup>
            </CustomSwitch3>
          </>
        );
      },
    },
    {
      field: "edit permission",
      headerName: "Edit Permission",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              disableRipple
              onClick={(e) => {
                router.push(`roles/${params.id}`);
              }}
              sx={{
                color: "#d7282f",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                "&:hover": { background: "inherit" },
              }}
            >
              <img
                src="/assets/EditPencil.svg"
                alt=""
                height={14}
                width={14}
                style={{ margin: "0 12px 0 0" }}
              />
              Edit
            </Button>
          </>
        );
      },
    },
    {
      filed: "action",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <Box>
            {role === "seller" && (
              //  ||
              //   (role === "subuser" &&
              //     getPermission("Sub Accounts", "Edit")))
              //     && (
              <LightTooltip
                title="Edit"
                arrow
                placement="top"
                disableInteractive
              >
                <ModeEditOutlineOutlinedIcon
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#D7282F",
                  }}
                  onClick={() => {
                    setToggleDrawer(true);
                    setEditValue(params.row);
                  }}
                />
              </LightTooltip>
            )}
            {role === "seller" && (
              // ||
              //   (role === "subuser" &&
              //     getPermission("Sub Accounts", "Delete"))) && (
              <LightTooltip
                title="Delete"
                arrow
                placement="top"
                disableInteractive
              >
                <DeleteOutlinedIcon
                  style={{
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#d7282f",
                  }}
                  onClick={() => {
                    setDeleteConfirmation(true);
                    setUserID([params.id]);
                  }}
                />
              </LightTooltip>
            )}
            {/* <SwitchAction>
              <Switch {...label} defaultChecked />
            </SwitchAction> */}
          </Box>
        );
      },
    },
  ];
  const [bannerList, setBannerListData] = useState([]);

  useEffect(() => {
    fetchRolesData1();
  }, []);

  const fetchRolesData1 = async () => {
    const response = await fetch(`${BASE_URL}/roles/permissions/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const res = await response.json();
    if (res.length == 0) {
      setBannerListData([]);
      return;
    }
    setBannerListData(res);
  };
  const DeleteAccounts = async () => {
    await dispatch(DeleteAccount(user_id));
    setUserID("");
    setDeleteConfirmation(false);
    setDeleteID([]);
    dispatch(fetchSubsellerLists());
    toast.success("Account deleted successfully");
    dispatch(fetchRolesData());
    await fetchRolesData1();
  };
  useEffect(() => {
    if (sellerList) {
      const filterData = sellerList?.filter((row) => {
        const searchTerm = searchData?.toLowerCase().trim();
        return (
          row.name?.toLowerCase().includes(searchTerm) ||
          row.email?.toLowerCase().includes(searchTerm) ||
          (row.phone &&
            `+${row.phone_code} ${row.phone}`
              .toLowerCase()
              .includes(searchTerm))
        );
      });
      setFilterData(filterData);
    }
  }, [searchData, sellerList]);

  useEffect(() => {
    if (sellerList) {
      setFilterData(sellerList);
    }
  }, [sellerList]);
  const handleSearchChange = (event) => {
    setSearchData(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLimitClose = () => {
    setLimitOpen(false);
  };
  const onClickAction = () => {
    setPlanLoading(true);
    router.push(`/plancards`);
  };
  useEffect(() => {
    FetchPlanDetail();
  }, []);
  const FetchPlanDetail = async () => {
    let response = await apiClient("users/current_plan", "get");
    if (response.status === 200) {
      setPlan(response?.data?.name);
    }
  };
  const [flyListData, setFlyListData] = useState([]);

  const fetchRolesData2 = async (userId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/sub_account/user_list_data?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      if (response.status === 200) {
        const res = await response.json();
        setFlyListData(res);

        setToggleRightDrawer(true);
      } else {
        setFlyListData([]);
        setToggleRightDrawer(false);
      }
    } catch (error) {
      console.error("Error fetching roles data:", error);
      setFlyListData([]);
      setToggleRightDrawer(false);
    }
  };
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedBackList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sub_account/feedback/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
      });
      if (response.status === 200) {
        const res = await response.json();

        setFeedbackList(res?.data);
      } else {
        setFeedbackList([]);
        setToggleRightDrawer(false);
      }
    } catch (error) {
      console.error("Error fetching roles data:", error);
      setFeedbackList([]);
      setToggleRightDrawer(false);
    }
  };

  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFeedback = async () => {
    const userId = flyListData?.[0]?.parent_id;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE_URL}/sub_account/feedback/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: JSON.stringify({
          user_id: userId,
          feedback: feedback,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        console.log("Feedback submitted successfully:", res);
        setFeedback("");
        fetchFeedBackList();
      } else {
        console.error("Failed to submit feedback. Status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const [loading, setLoading] = React.useState(false);
  const [feedBackDelete, setFeedBackDelete] = useState([]);
  const handleDeleteFeedback = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/sub_account/feedback/delete/${feedBackDelete}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message);
        fetchFeedBackList();
        setDeleteConfirmation1(false);
      } else {
        console.error("Failed to delete lead");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  /******* Detail drawer ******/
  const [toggleRightDrawer, setToggleRightDrawer] = useState<boolean>(false);
  const [toggleLeftDrawer, setToggleLeftDrawer] = useState<boolean>(false);
  const handleRightDrawerToggle = (open: boolean) => () => {
    setToggleRightDrawer(open);
  };

  const RightDrawerContent = (
    <>
      <DrawerWidthContainer>
        <CrossButton
          variant="contained"
          onClick={handleRightDrawerToggle(false)}
        >
          <CloseRoundedIcon />
        </CrossButton>
        <DrawerContainer>
          {/* Header Section */}
          <DrawerHeader>
            {flyListData?.map((item) => {
              const image = item?.avatar_original[0]?.source;
              return (
                <DrawerProfileInfo>
                  <Avatar
                    alt={item?.name}
                    src={image}
                    sx={{ width: 60, height: 60 }}
                  />
                  <SSAAvtarInfo>
                    <Typography variant="h6">{item?.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item?.account_type}
                    </Typography>
                  </SSAAvtarInfo>
                </DrawerProfileInfo>
              );
            })}
          </DrawerHeader>
          <Box>
            <Grid container spacing={2}>
              {flyListData?.map((details) => {
                return (
                  <Grid item xs={12} sm={12} md={6}>
                    <SSAPersonalInfo>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3}>
                          <LabelTtext variant="body1">Phone No:</LabelTtext>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                          {/* <Typography variant="body2">+91 4561287943</Typography> */}
                          <Typography
                            sx={{
                              "& img": {
                                width: "16px",
                                marginRight: "0",
                              },
                            }}
                          >
                            {" "}
                            {details?.phone ? (
                              <>
                                {details?.mobile_country_code ? (
                                  <span className="phoneflag">
                                    <Flag
                                      countryCode={details?.mobile_country_code}
                                    />{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {details?.phone_code ? (
                                  <>+{details?.phone_code} </>
                                ) : (
                                  ""
                                )}
                                {details?.phone}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </SSAPersonalInfo>
                    <SSAPersonalInfo>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={3}>
                          <LabelTtext variant="body1">Email:</LabelTtext>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                          <Typography variant="body2">
                            {details?.email || "N/A"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </SSAPersonalInfo>

                    <SSAPersonalInfo>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3}>
                          <LabelTtext variant="body1">Status:</LabelTtext>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <IOSSwitch sx={{ m: 1 }} defaultChecked />
                              }
                              label={
                                details?.status
                                  ? details.status.charAt(0).toUpperCase() +
                                    details.status.slice(1)
                                  : ""
                              }
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </SSAPersonalInfo>
                  </Grid>
                );
              })}
              {flyListData?.map((item) => {
                const deletedRow = item?.created_at;
                const date = new Date(deletedRow);
                const formattedDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });

                const formattedPermissions =
                  item?.store_permissions?.user_permission?.[0];

                const formatKey = (key) => {
                  return key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase());
                };

                let formattedKeyList = "";

                if (
                  formattedPermissions &&
                  typeof formattedPermissions === "object"
                ) {
                  const permissionKeys = Object.keys(formattedPermissions);
                  formattedKeyList = permissionKeys
                    .map((key) => formatKey(key))
                    .join(", ");
                } else {
                  console.log("Permissions data is not in expected format");
                }

                return (
                  <Grid item xs={12} sm={12} md={6}>
                    <SSAPersonalInfo>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3}>
                          <LabelTtext variant="body1">Permissions:</LabelTtext>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                          <Typography variant="body2">
                            {formattedKeyList
                              ? formattedKeyList
                              : "Manage Store, Product..."}
                          </Typography>
                        </Grid>
                      </Grid>
                    </SSAPersonalInfo>
                    <SSAPersonalInfo>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={3}>
                          <LabelTtext variant="body1">Last Login:</LabelTtext>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                          <Typography variant="body2">
                            {/* 28-Jan-2025 | 12:30 PM */}
                            {formattedDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </SSAPersonalInfo>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Performance and Assigned Resources */}
          <Box className="ScrolldrawerBox">
            <CardBoxContent>
              {flyListData?.map((product) => {
                const assignProduct = product?.performance_overview;
                const assignResource = product?.assigned_resources;
                const performanceMetrics = product?.performance_metrics;
                const activityOverview = product?.activity_overview;
                const lastLogin = product?.activity_overview?.last_login;
                const formattedDate = lastLogin
                  ? new Date(lastLogin).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                  : "N/A";
                const updateDate = new Date(
                  product?.activity_overview?.last_product_updated
                );
                const formattedUpdateDate = updateDate.toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                );
                return (
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6}>
                      <DrawerInfoCard>
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            Performance Overview
                          </Typography>
                          <CardInnerCode>
                            <BoxFlex>
                              <Typography variant="body1">
                                {" "}
                                <i className="icon-product-img"></i>Products
                                Assigned
                              </Typography>
                              <ColorNox>
                                {assignProduct?.product_assigned || "N/A"}
                              </ColorNox>
                            </BoxFlex>
                            <BoxFlex>
                              <Typography variant="body1">
                                <i className="icon-currency"></i>Revenue
                                Generated
                              </Typography>
                              <Typography variant="body2">
                                {assignProduct?.revenue_generated != ""
                                  ? assignProduct.revenue_generated.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "USD",
                                      }
                                    )
                                  : "N/A"}
                              </Typography>
                            </BoxFlex>
                          </CardInnerCode>
                        </CardContent>
                      </DrawerInfoCard>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <DrawerInfoCard>
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            Assigned Resources
                          </Typography>
                          <CardInnerCode>
                            <BoxFlex>
                              <Typography variant="body1">
                                {" "}
                                <i className="icon-product-img"></i>Products
                                Categories
                              </Typography>
                              <Typography variant="body2">
                                {assignResource?.product_categories || "N/A"}{" "}
                              </Typography>
                            </BoxFlex>
                            <BoxFlex>
                              <Typography variant="body1">
                                <img src="/assets/images/subseller-country.svg" />
                                Country / Territories
                              </Typography>
                              <Typography variant="body2">
                                {assignResource?.country || "N/A"}
                              </Typography>
                            </BoxFlex>
                          </CardInnerCode>
                        </CardContent>
                      </DrawerInfoCard>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <DrawerInfoCard>
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            Performance Metrics
                          </Typography>
                          <CardInnerCode>
                            <BoxFlex>
                              <Typography variant="body1">
                                {" "}
                                <img src="/assets/images/subseller-conversion.svg"></img>
                                Conversion Rate
                              </Typography>
                              <ColorNox>
                                {performanceMetrics?.conversion_rate || "N/A"}
                              </ColorNox>
                            </BoxFlex>
                            <BoxFlex>
                              <Typography variant="body1">
                                <i className="icon-speed-browse-history"></i>
                                Response Time
                              </Typography>
                              <Typography variant="body2">
                                {performanceMetrics?.response_time || "N/A"}
                              </Typography>
                            </BoxFlex>
                            <BoxFlex>
                              <Typography variant="body1">
                                <i className="icon-speed-browse-history"></i>
                                Pending Products
                              </Typography>
                              <Typography variant="body2">
                                {performanceMetrics?.pending_products || "N/A"}
                              </Typography>
                            </BoxFlex>
                          </CardInnerCode>
                        </CardContent>
                      </DrawerInfoCard>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                      <DrawerInfoCard>
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            Activity Overview
                          </Typography>
                          <CardInnerCode>
                            <BoxFlex>
                              <Typography variant="body1">
                                {" "}
                                <img src="/assets/images/rivet-icons_undo.svg"></img>
                                Last Action
                              </Typography>
                              <Typography variant="body2">
                                {" "}
                                {activityOverview?.last_action || "N/A"}
                              </Typography>
                            </BoxFlex>
                            <BoxFlex>
                              <Typography variant="body1">
                                <img src="/assets/images/subseller-lastlogin.svg"></img>
                                Last Login
                              </Typography>
                              <Typography variant="body2">
                                {formattedDate || "N/A"}
                              </Typography>
                            </BoxFlex>
                            <BoxFlex>
                              <Typography variant="body1">
                                <img src="/assets/images/subseller-lastproduct.svg"></img>
                                Last Product Updated
                              </Typography>
                              <Typography variant="body2">
                                {formattedUpdateDate || "N/A"}
                              </Typography>
                            </BoxFlex>
                          </CardInnerCode>
                        </CardContent>
                      </DrawerInfoCard>
                    </Grid>
                  </Grid>
                );
              })}
            </CardBoxContent>

            {/* Feedback/Notes Section */}
            <DrawerNotesSection>
              <Typography variant="subtitle1" gutterBottom>
                <span>Feedback/Notes </span>(Provided by Main Seller)
              </Typography>
              {feedbackList?.map((item, index) => {
                return (
                  <FeedbackInfo key={index}>
                    <Typography variant="body2">
                      {index + 1}. {item?.feedback || "N/A"}
                      <DeleteOutlineOutlinedIcon
                        sx={{ ml: 1, cursor: "pointer" }}
                        onClick={() => {
                          setDeleteConfirmation1(true);
                          setFeedBackDelete([item.id]);
                        }}
                      />
                    </Typography>
                  </FeedbackInfo>
                );
              })}

              <FeedbackBox>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  size="small"
                  fullWidth
                  rows={2}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Leave feedback or notes for sub-seller..."
                />
                <Button
                  variant="contained"
                  onClick={submitFeedback}
                  disabled={isSubmitting || !feedback.trim()}
                >
                  {isSubmitting ? "Add" : "Add"}
                </Button>
              </FeedbackBox>
            </DrawerNotesSection>
          </Box>
        </DrawerContainer>
      </DrawerWidthContainer>
    </>
  );
  return (
    <>
      <>
        <PlanDialogSellerSubAccount
          open={openModal}
          handleClose={handleClose}
          onClickAction={onClickAction}
          loading={planLoading}
          features={featureList.find((v) => v.id == 8)?.name}
          role={role}
        />
        <PlanLimitDialog
          open={openLimitModal}
          handleClose={handleLimitClose}
          onClickAction={onClickAction}
          loading={planLoading}
          features={featureList.find((v) => v.id == 8)?.name}
          role={role}
        />
      </>
      {role == "buyer" ? (
        <Box className="full_page companydetail_page">
          <Grid container>
            <Grid item xs={12}>
              <ProfileHeader text={""} />
              <Dashboard />
              {/* <AccessDenied /> */}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div className="full_page">
          {deleteConfirmation && (
            <DeleteDialog
              open={deleteConfirmation}
              handleClose={setDeleteConfirmation}
              text="account"
              onClickAction={DeleteAccounts}
            />
          )}
          {deleteConfirmation1 && (
        <DeleteDialog
          open={deleteConfirmation1}
          handleClose={setDeleteConfirmation1}
          text={"Feedback/Notes"}
          onClickAction={handleDeleteFeedback}
        />
      )}
          {toggleDrawer && (
            <SwipeableDrawer
              anchor={"right"}
              open={toggleDrawer}
              onClose={() => setToggleDrawer(true)}
              onOpen={() => setToggleDrawer(false)}
              sx={swipebarStyling}
            >
              <ProjectForm1
                editValues={editValues}
                toggleDrawer={setToggleDrawer}
                setEditValue={setEditValue}
              />
            </SwipeableDrawer>
          )}
          <Grid container>
            <Grid item xs={12} sx={{}}>
              <ProfileHeader text={"Seller Sub Accounts"} />
            </Grid>
          </Grid>
          <GridTableContainer container>
            <Grid item xl={12} lg={12}>
              <Paper>
                <Box
                  p={2}
                  sx={{
                    borderRadius: "6px",
                    background: "#FFFFFF",
                    "@media screen and (max-width: 600px)": {
                      p: 1,
                    },
                  }}
                >
                  <BoxSeller component="div">
                    <BoxSellerList component="div">
                      <Box>
                        <FontContainer
                          fontSize="16px"
                          className={sellersubaccount.boxcontainer}
                        >
                          All Seller Sub Account List
                        </FontContainer>
                      </Box>

                      <SelectedAction>
                        {deleteID.length > 0 && (
                          <>
                            <Divider orientation="vertical" />
                            <FontContainer fontSize="14px" fontWeight={300}>
                              {`Seller Selected (${deleteID.length})`}
                            </FontContainer>
                            <Divider orientation="vertical" />
                          </>
                        )}
                        {deleteID.length > 0 && role === "seller" && (
                          <FontContainer
                            fontSize="14px"
                            fontWeight={300}
                            color="#D7282F"
                            style={{ cursor: "pointer", display: "flex" }}
                            onClick={() => {
                              setDeleteConfirmation(true);
                              setUserID(deleteID);
                            }}
                          >
                            Delete Selected{" "}
                            <DeleteOutlinedIcon sx={{ fontSize: "20px" }} />
                          </FontContainer>
                        )}
                      </SelectedAction>
                    </BoxSellerList>
                    <SearchWithCraete>
                      <SearchandButton>
                        <SellerSearchCommon>
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
                        </SellerSearchCommon>
                      </SearchandButton>

                      <Box>
                        {role === "seller" && (
                          <FontContainer
                            className={sellersubaccount.delete_selected}
                            fontSize="14px"
                            fontWeight={300}
                            color="#D7282F"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              if (
                                Array.isArray(bannerList) &&
                                bannerList.length > 0
                              ) {
                                // If bannerList is a non-empty array
                                if (planData === "Free") {
                                  setOpen(true); // Open the relevant popup or action for Free plan
                                } else {
                                  e.stopPropagation(); // Stop event propagation
                                  setToggleDrawer(true); // Toggle drawer
                                  setEditValue([]); // Clear the edit value
                                }
                              } else {
                                // If bannerList is either empty or undefined
                                setLimitOpen(true); // Show the limit dialog or popup
                              }
                            }}
                          >
                            <AddIcon
                              style={{ margin: "1px 3px", fontSize: "20px" }}
                            />
                            Create New Seller Sub Account
                          </FontContainer>
                        )}
                      </Box>
                    </SearchWithCraete>
                  </BoxSeller>
                  <Box
                    sx={{
                      height: 500,
                      width: "100%",
                    }}
                  >
                    {loader ? (
                      <>
                        {sellerList?.map((v, i) => (
                          <SkeletonForContactList key={i} />
                        ))}
                      </>
                    ) : sellerList?.length === 0 ? (
                      <EmptyPage
                        text={"Seller Sub Accounts"}
                        logo={"/assets/images/no-subseller.svg"}
                        onClickHandler={(e) => {
                          if (rolesData?.length > 0) {
                            if (planData === "Free") {
                              setOpen(true);
                            } else {
                              e?.stopPropagation();
                              setToggleDrawer(true);
                              setEditValue([]);
                            }
                          } else {
                            setLimitOpen(true);
                          }
                        }}
                        actiontext={true}
                      />
                    ) : filterData?.length > 0 ? (
                      <DataGridPro
                        localeText={{
                          columnMenuShowColumns: "Manage Columns",
                        }}
                        pagination
                        sx={DataGridStyle}
                        rows={filterData}
                        columns={columnData}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        hideFooterSelectedRowCount={true}
                        onSelectionModelChange={(newSelectionModel) =>
                          setDeleteID(newSelectionModel)
                        }
                      />
                    ) : filterData?.length === 0 ? (
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
                          <LargeTextContainer>
                            No result found
                          </LargeTextContainer>
                          <SmallTextContainer>
                            We couldn&apos;t found what you searched for <br />
                            Try searching again
                          </SmallTextContainer>
                        </div>
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </GridTableContainer>
          <div>
            <SwipeableDrawer
              anchor="right"
              open={toggleRightDrawer}
              onClose={handleRightDrawerToggle(false)}
              onOpen={handleRightDrawerToggle(true)}
              sx={{
                "& .MuiDrawer-paper": {
                  background: "#fff",
                  overflow: "visible",
                  "@media (max-width:1200px)": {
                    width: "92%",
                  },
                },
              }}
            >
              {RightDrawerContent}
            </SwipeableDrawer>
          </div>
        </div>
      )}
    </>
  );
};
export default SellerContactTable;

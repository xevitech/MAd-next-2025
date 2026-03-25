import {
  Grid,
  Box,
  Typography,
  Stack,
  TextField,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Divider } from "@mui/material";
import { ProfileHeader } from "../common/profileheader";
import subdomaincss from "./style.module.css";
import { PencilIcon1 } from "../CompanySettings/CompanyDetail/style";
import Image from "next/image";
import { GetCurrentPlan, apiClient, getPermission } from "../common/common";
import * as Yup from "yup";
import SubdomainSkeleton from "./Skeleton";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LicenseInfo } from "@mui/x-license-pro";
import { useRouter } from "next/router";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
LicenseInfo.setLicenseKey(
  "e25aea50a43f724c2a50c717a29c3f54Tz01MDc2NixFPTE2OTQ2OTY3MTk4MjUsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <BoxSubDomaincontent>
          <Typography>{children}</Typography>
        </BoxSubDomaincontent>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

import { DataGridProProps } from "@mui/x-data-grid-pro";
import BannerSpace from "./ManageBanner/BannerSpace";
import { Android12Switch } from "./ManageBanner/BannerOptions";
import {
  BoxSubDomaincontent,
  CompanyDetailbtn,
  CustomSwitch2,
} from "./Subdomainstyle";
import { BannerList } from "@/hooks/sellerSubaccount";
import { useAppDispatch } from "redux/store";
import Head from "next/head";
import ManageMenu from "./ManageBanner/ManageMenu";
import { LightTooltip } from "../common/Tooltip/tooltip";
import Toggleskeleton from "./Toggleskeleton";
import PlanAlertDialog from "../common/DeleteAlert/PlanAlert";
import { useSelector } from "react-redux";
import SeoSettings from "./ManageBanner/SeoSettings";

const getTreeDataPath: DataGridProProps["getTreeDataPath"] = (row) => row.name;
const SubDomain = () => {
  const router = useRouter();
  const [edit, setEdit] = useState<boolean>(true);
  const [editIndex, setEditIndex] = useState<any>("domainName");
  const [domaindata, setdomaindata] = useState<any>([]);
  const [menuData, setMenuData] = useState<any>([]);
  const [compname, setname] = useState<any>();
  const [isexist, setisexist] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>();
  const [load, setLoad] = useState<boolean>(false);
  const [domainValue, setDomainValue] = useState("");
  const [customMessage, setCustomMessage] = useState(false);
  const [openModal, setOpen] = React.useState(false);
  const [planLoading, setPlanLoading] = React.useState(false);
  const[errorMessage,setErrorMessage]=useState('')
  const dispatch = useAppDispatch();
  const validation = Yup.object().shape({
    domain: Yup.string().required("Please enter Domain name"),
  });
  const [isFocused, setIsFocused] = useState(false);
  const inputRef: any = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [featureList, setFeatureList] = useState<any>([]);
  const { role } = useSelector((state: any) => state.userData);
  const { subSellerList } = useSelector((state: any) => state.userData);
  const permissions =
    subSellerList && subSellerList.length > 0 ? subSellerList[0] : null;
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const [planData, setPlan] = useState("");
  const [viewType, setDataViewType] = useState("");
  useEffect(() => {
    dispatch(BannerList());
    getHeaderData();
    FetchPlanDetail();
  }, []);

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
          name: ele?.name,
          type: ele?.type,
          parents: ele?.parents,
        });
      });

      setMenuData(reOrderData);
      return response;
    }
  }
  const NavigateHandler = (route: any) => {
    router.push(`${route}`);
  };
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      domain: domaindata?.domain,
    },
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      submitData(values);
    },
  });

  const validation1 = Yup.object().shape({
    name: Yup.string().required("Please enter Company Name"),
  });

  let formik1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: domaindata?.company_name,
    },
    validationSchema: validation1,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      UpdateCompanyName(values);
    },
  });

  const fetchSubdomain = async () => {
    let response = await apiClient("sub_domain/list", "get", {});
    if (response.status === 200) setdomaindata(response.data);
    setLoader(false);
  };
  const handleSave = () => {
    setIsEditing(false);
    formik.setFieldValue("domain", domaindata?.domain);
  };
  const UpdateCompanyName = async (value) => {
    const { name } = value;
    let formData = new FormData();
    formData.append("name", name);
    let response = await apiClient(
      "company_profile/updateProfile",
      "post",
      {
        body: formData,
      },
      true
    );

    if (response.status === 200) {
      setname(response.data);
      toast.success("Company name updated");
      setIsFocused(false);
      fetchSubdomain();
    }
    if (response.status == false) {
      toast.error("Try again with new name");
    }
    setEditIndex("1");
    setLoader(false);
  };
  const ValidateField = (field: any) => {
    if (formik.errors[field]) return true;
    else return false;
  };
  const FetchPlanDetail = async () => {
    let response = await apiClient("users/current_plan", "get");
    if (response.status === 200) {
      setPlan(response?.data?.name);
    }
  };
  const styles: any = {
    helper: {
      position: "absolute",
      bottom: "-20px",
      margin: 0,
    },
  };

  const submitData = async (value) => {
    let status = featureList.find((v) => v.id == 8)?.value ?? false;
    if (status == "no") {
      setOpen(true);
      return;
    }
    if (
      inputRef?.current?.value == undefined ||
      inputRef?.current?.value == ""
    ) {
      formik?.setFieldError("domain", "please enter domain name");
      return;
    }
    setLoading(true);
    let formData = new FormData();
    formData.append("domain", domainValue);
    formData.append(
      "slug_status",
      domaindata?.slug_status === true ? "1" : "0"
    );
    setDomainValue(domainValue);
    let response = await apiClient(
      `sub_domain/verify`,
      "post",
      {
        body: formData,
      },
      true
    );

    if (response.status == false) {
      setCustomMessage(true);
      setErrorMessage(response?.message)
    }
    if (response.status === 200) {
      setLoading(false);
      setErrorMessage('')
      setCustomMessage(false);
      setIsEditing(false);
      setisexist(response.is_exists);
      if (response.is_exists === false) {
        fetchSubdomain();
      }
    }
    setLoading(false);
  };

  const List = [1];

  const [value, setValue] = React.useState(0);

  const List2 = [1, 2, 3, 4, 5, 6];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [switchChecked, setSwitchChecked] = useState(
    domaindata?.slug_status == 1 ? true : false
  );
  useEffect(() => {
    const { errors, values, setFieldError } = formik1;
    setSwitchChecked(domaindata?.slug_status == 1 ? true : false);
    if (errors?.name && values.name) {
      setFieldError("name", "");
    }
  }, [formik1]);

  const handleFocused: any = (e) => {
    formik.setFieldValue("domain", domaindata?.domain);
    inputRef?.current?.focus();
  };

  useEffect(() => {
    if (domaindata?.domain !== "") {
      handleFocused();
    }
  }, [domaindata]);
  useEffect(() => {
    setSwitchChecked(domaindata?.slug_status == 1 ? true : false);
    GetCurrentPlan(setFeatureList);
  }, []);

  const ToggleOff = async (value) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("slug_status", value === false ? "1" : "0");
    setDomainValue(domainValue);
    let response = await apiClient(
      `sub_domain/onOfSlugStatus`,
      "post",
      {
        body: formData,
      },
      true
    );

    if (response.status == false) {
      setCustomMessage(true);
    }
    if (response.status === 200) {
      setLoading(false);
      setCustomMessage(false);
      setIsEditing(false);
      setisexist(response.is_exists);
      if (response.is_exists === false) {
        fetchSubdomain();
      }

      router.push("subdomain");
    }
    setLoading(false);
  };

  const handleSwitchChange1 = (value) => {
    let status = featureList.find((v) => v.id == 8)?.value ?? false;
    if (status == "no") {
      setOpen(true);
      return;
    }
    if (!domaindata?.domain) {
      setSwitchChecked(false);
      toast.error("Please add mini site/store name");
      return;
    } else if (planData === "Free") {
      setSwitchChecked(false);
      toast.error("You cannot change this setting in the Free plan.");
      return;
    } else {
      ToggleOff(value);
      setSwitchChecked(!switchChecked);
    }
  };

  const { query } = useRouter();

  useEffect(() => {
    if (Object.keys(query).includes("store-name")) {
      inputRef?.current?.focus();
      setEditIndex("domainName");
      setEdit(true);
    } else {
      setLoader(true);
      fetchSubdomain();
      getHeaderData();
      dispatch(BannerList());
    }
  }, [query, inputRef]);

  const handleClose = () => {
    setOpen(false);
  };

  const onClickAction = () => {
    setPlanLoading(true);
    router.push(`/plancards`);
  };
  const userAccountType = localStorage.getItem("userAccountType");
  return (
    <>
      <Head>
        <title>Store Setting | Merchant AD</title>
      </Head>

      <PlanAlertDialog
        open={openModal}
        handleClose={handleClose}
        onClickAction={onClickAction}
        loading={planLoading}
        features={featureList.find((v) => v.id == 8)?.name}
        role={role}
      />

      <div className="full_page" style={{ marginBottom: "20px" }}>
        <Grid container xs={12}>
          <ProfileHeader text={"Storefront Settings"} />
        </Grid>

        <Box
          sx={{
            width: "100% !important",
            "@media screen and (max-width:767px)": {
              margin: "0px !important",
            },
          }}
          className={subdomaincss.outerdiv}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: 1,
              borderColor: "divider",
              "@media screen and (max-width:900px)": {
                display: "block",
                margin: "0px 0px 0px 10px",
              },
            }}
          >
            <Box className={subdomaincss.tabsrow} sx={{}}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .Mui-selected": {
                    color: "#D7282F !important",
                  },
                  "& .MuiTab-textColorPrimary": {
                    opacity: 1,
                    color: "#231F20",
                    textTransform: "capitalize",
                  },
                  "& .MuiButtonBase-root-MuiTab-root.Mui-selected": {
                    color: "#D7282F !important",
                  },
                  "& .MuiTabs-indicator": { backgroundColor: "#D7282F" },
                }}
              >
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.manage_store?.view == true)) && (
                  <Tab label="Manage Subdomain" {...a11yProps(0)} />
                )}
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.manage_menu?.view == true)) && (
                  <Tab label="Manage Menu" {...a11yProps(1)} />
                )}
                {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.manage_banner?.view == true)) && (
                  <Tab label="Manage Banner" {...a11yProps(2)} />
                )}

                {(role == "seller" ||
                  (role == "subuser" &&
                    getPermission("Seo Settings", "View"))) && (
                  <Tab label="Seo Settings" {...a11yProps(2)} />
                )}
              </Tabs>
            </Box>
            <Box
              sx={{
                paddingRight: "24px",
                display: "flex",
                alignItems: "center",
                "@media screen and (max-width:767px)": {
                  display: "block",
                },
              }}
            >
              {role == "seller" && (
                <CompanyDetailbtn
                  onClick={(e) =>
                    NavigateHandler(
                      "/companySettings/companyDetails?tab=company"
                    )
                  }
                >
                  go to company details
                </CompanyDetailbtn>
              )}
            </Box>
          </Box>
          {(role == "seller" ||
                  (role == "subuser" &&
                    permissions?.manage_store?.view == true)) && (<TabPanel value={value} index={0}>
            <div
              className={subdomaincss.SellerMain}
              style={{ backgroundColor: "#F6F8FB" }}
            >
              <Grid container spacing={0}>
                <Divider sx={{ mb: 1 }} />
                <Grid
                  sx={{ p: 3, "@media screen and (max-width:600px)": { p: 2 } }}
                  className={subdomaincss.FirstBox}
                  item
                  xs={12}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography className={subdomaincss.MainSubHeading}>
                      Sub Domain Settings
                    </Typography>

                    {role == "seller" && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {loader ? (
                          <Toggleskeleton />
                        ) : (
                          <CustomSwitch2>
                            <FormGroup>
                              <FormControlLabel
                                sx={{
                                  "&.MuiFormControlLabel-root": {
                                    marginRight: 0,
                                  },
                                }}
                                control={
                                  <Android12Switch
                                    defaultChecked={
                                      domaindata?.slug_status == 1
                                        ? true
                                        : false
                                    }
                                    checked={switchChecked}
                                    onChange={() =>
                                      handleSwitchChange1(switchChecked)
                                    }
                                  />
                                }
                                label=""
                              />
                            </FormGroup>
                          </CustomSwitch2>
                        )}
                        <LightTooltip
                          placement="bottom-end"
                          title="You can hide or show your store."
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                fontSize: "12px",
                                width: "150px",
                                opacity: 1,
                                "& .MuiTooltip-arrow": { fontSize: "21px" },
                              },
                            },
                          }}
                        >
                          <ContactSupportIcon />
                        </LightTooltip>
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ mt: 2, mb: 2 }} />
                  {loader ? (
                    <>
                      {List.map((v, i) => (
                        <SubdomainSkeleton key={i} />
                      ))}
                    </>
                  ) : (
                    <>
                      <form onSubmit={formik.handleSubmit}>
                        {edit && editIndex === "domainName" ? (
                          <>
                            <Stack className={subdomaincss.FirstSubline}>
                              <Box
                                className={`${subdomaincss.InnerItems} ${subdomaincss.ParaAlign}`}
                                sx={{ position: "relative" }}
                              >
                                {role == "seller" && (
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      right: "16px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {!isEditing ? (
                                      <Box
                                        onClick={handleEditClick}
                                        sx={{
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src="/assets/EditPencil.svg"
                                          alt=""
                                          style={{
                                            height: "13px",
                                            width: "13px",
                                          }}
                                        />
                                        {domaindata?.domain == null ? (
                                          <Box
                                            component={"span"}
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#d7282f",
                                              marginLeft: "6px",
                                            }}
                                          >
                                            Add mini store
                                          </Box>
                                        ) : (
                                          <Box
                                            component={"span"}
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#d7282f",
                                              marginLeft: "6px",
                                            }}
                                          >
                                            Edit
                                          </Box>
                                        )}
                                      </Box>
                                    ) : (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <Box
                                          onClick={() => handleSave()}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <CloseOutlinedIcon
                                            sx={{
                                              fontSize: "20px",
                                              color: "#d7282f",
                                            }}
                                          />{" "}
                                          <Box
                                            component={"span"}
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#d7282f",
                                            }}
                                          >
                                            Cancel
                                          </Box>
                                        </Box>
                                        <Box
                                          sx={{
                                            height: "21px",
                                            backgroundColor:
                                              " rgb(210, 210, 210)",
                                            width: "1px",
                                          }}
                                        ></Box>
                                        <Box
                                          onClick={submitData}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                          }}
                                        >
                                          <SaveOutlinedIcon
                                            sx={{
                                              fontSize: "20px",
                                              color: "#231f20",
                                            }}
                                          />

                                          <Box
                                            component={"span"}
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#231f20",
                                            }}
                                          >
                                            Save
                                          </Box>
                                        </Box>
                                      </Box>
                                    )}
                                  </Box>
                                )}
                                <Typography
                                  sx={{ pr: 4 }}
                                  className={subdomaincss.fieldname}
                                >
                                  Mini Site/Store
                                </Typography>
                                <Box className={subdomaincss.InnerSection}>
                                  <Typography
                                    sx={{ mb: 2 }}
                                    className={subdomaincss.subText}
                                  >
                                    {" "}
                                    Your public username is the same as your
                                    timeline address:
                                  </Typography>
                                  <Typography
                                    sx={{
                                      cursor: "pointer",
                                      transition: "all ease .3s",
                                      "&:hover": {
                                        color: "#d7282f",
                                        transition: "all ease .3s",
                                      },
                                    }}
                                    className={subdomaincss.dimainsubText}
                                    onClick={() => {
                                      domaindata?.domain &&
                                        window.open(
                                          `/mini-site/${domaindata?.domain}/home`,
                                          "_blank"
                                        );
                                    }}
                                  >
                                    <b>{domaindata?.domain}.</b>merchantad.com
                                  </Typography>

                                  {isEditing ? (
                                    <Box
                                      className={subdomaincss.InputUsers}
                                      style={{ marginTop: 1, marginBottom: 1 }}
                                    >
                                      <span className={subdomaincss.UserName}>
                                        Store Name
                                      </span>
                                      <span
                                        className={subdomaincss.InputDomain}
                                      >
                                        <TextField
                                          sx={{
                                            width: 400,
                                            "@media screen and (max-width:767px)":
                                              {
                                                width: "100%",
                                              },
                                          }}
                                          name="domain"
                                          inputRef={inputRef}
                                          {...formik.getFieldProps("domain")}
                                          error={
                                            formik?.errors?.domain
                                              ? true
                                              : false
                                          }
                                          helperText={`${
                                            formik.errors.domain
                                              ? formik.errors.domain
                                              : ""
                                          }`}
                                          FormHelperTextProps={{
                                            style: styles.helper,
                                          }}
                                          onChange={(e) => {
                                            setDomainValue(e?.target?.value);
                                            setCustomMessage(false);
                                            formik.setFieldValue(
                                              "domain",
                                              e.target.value
                                                .replace(/\s+/g, "")
                                                ?.toLowerCase()
                                            );
                                            if (!e?.target?.value) {
                                              formik.setFieldError(
                                                "domain",
                                                "Please enter domain name"
                                              );
                                            } else {
                                              formik.setFieldError(
                                                "domain",
                                                ""
                                              );
                                            }
                                          }}
                                        />
                                      </span>

                                      {customMessage && (
                                        <span
                                          style={{
                                            color: "#d32f2f",
                                            fontSize: "12px",
                                            padding: "0 0 0 10px",
                                          }}
                                        >
                                          {/* User name already taken. Please try
                                          different user name. */}
                                             {errorMessage}
                                        </span>
                                      )}
                                      <span className={subdomaincss.UserAvai}>
                                        <img
                                          src="/assets/InputGreenTick.svg"
                                          alt=""
                                        />
                                        {isexist === true
                                          ? "Username is available"
                                          : ""}
                                      </span>
                                    </Box>
                                  ) : (
                                    ""
                                  )}

                                  <Divider sx={{ mt: 1.5, mb: 1.5 }} />
                                </Box>
                              </Box>
                            </Stack>
                          </>
                        ) : (
                          <>
                            <Stack className={subdomaincss.FirstSubline}>
                              <Box className={subdomaincss.ParaAlign}>
                                <Typography
                                  sx={{ pr: 5 }}
                                  className={subdomaincss.fieldname}
                                >
                                  Mini Site/Store
                                </Typography>
                                <Typography
                                  className={subdomaincss.subText}
                                  sx={{ cursor: "pointer" }}
                                  onClick={() =>
                                    router.push(
                                      `/mini-site/${domaindata?.domain}/home`
                                    )
                                  }
                                >
                                  https://{domaindata?.domain}.merchantad.com
                                </Typography>
                              </Box>
                              <PencilIcon1>
                                <Image
                                  style={{
                                    fontSize: "18px",
                                    cursor: "pointer",
                                  }}
                                  src={"/assets/EditPencil.svg"}
                                  width="14"
                                  height="14"
                                  alt="editImage"
                                  onClick={() => {
                                    setEdit(true), setEditIndex("domainName");
                                    setCustomMessage(false);
                                  }}
                                />
                              </PencilIcon1>
                            </Stack>
                          </>
                        )}
                      </form>
                      <Divider sx={{ mt: 2, mb: 2 }} />
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          </TabPanel>)}
          <TabPanel value={value} index={ userAccountType === "Sale Assistant" || userAccountType === "Sale Representative"  ? 0 : 1 }>
            <ManageMenu />
          </TabPanel>
          <TabPanel value={value} index={userAccountType === "Sale Assistant" ||  userAccountType === "Sale Representative"  ? 1 : 2 }>
            <Box sx={{ backgroundColor: "#ffff", p: 0 }}>
              {/* {BannerList.length > 0 ? <SliderListing /> : <BannerSpace />} */}
              {/* <SliderListing /> */}
              <BannerSpace />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <SeoSettings />
          </TabPanel>
        </Box>
      </div>
    </>
  );
};
export default SubDomain;

import React, { useEffect, useRef, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import sellersubaccount from "./style.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Stack,
  Divider,
  CardActions,
  Badge,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  createTheme,
  Grid,
  createFilterOptions,
} from "@mui/material";
import {
  Blackoutlinebtn,
  Redoutlinebtn,
} from "../common/buttons/ButtonsVariations";
import {
  AbsoluteBox,
  AbsoluteErrorBox,
  AbsoluteInnerBox,
  AcconyTypeWrapper,
  BorderRow,
  CardFlapover,
  FontContainer,
  MyCardContent,
  NameIconBox,
  SellerFormLabel,
  SubSellerRowItem,
} from "./styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/styles";
import { apiClient, PasswordMessage, passwordRules } from "../common/common";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/store";
import { getGeoLocation } from "@/hooks/geolocation";
import { fetchSubsellerLists } from "@/hooks/sellerSubaccount";
import dynamic from "next/dynamic";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ImageCropper from "../common/ImageCropper";
import { LightTooltip } from "../common/Tooltip/tooltip";
import { fetchRolesData } from "@/hooks/UseProductListContext";
import { useRouter } from "next/router";
import { SelectChangeEvent } from "@mui/material/Select";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { BASE_URL, LOCAL_PUBLIC_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CheckBoxOuter = styled(Box)(({ theme }) => ({
  border: `1px solid #ddd`,
  padding: "8px",
  margin: "8px 0",
  alignItems: "self-start",
  cursor: "pointer",
  display: "flex",
  "& h6": {
    color: "#231F20",
    fontSize: "14px",
  },
}));

const RadioBox = ({ checked, onChange, label, description }) => (
  <CheckBoxOuter onClick={onChange}>
    <Radio checked={checked} onChange={onChange} />
    <Box ml={1}>
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  </CheckBoxOuter>
);
const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d7282f",
        },
      },
    },
  },
});
const MobileInputCommon = dynamic(
  async () => import("@/components/common/PhoneInput"),
  {
    ssr: false,
  }
);
function ProjectForm1({ toggleDrawer, editValues, setEditValue }) {
  let isEdit = Object.values(editValues).length > 0 ? true : false;
  const [profileImage, setProfileImage] = useState<any>("");
  const [mobile, setMobile] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { defaultCode } = useSelector((state: any) => state.geoLocation);
  const [validate, setValidation] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [planLoading, setPlanLoading] = React.useState(false);
  const [openModal, setOpen] = React.useState(false);
  const [featureList, setFeatureList] = useState<any>([]);
  const [roles, setRoles] = useState([]);
  const { rolesData } = useSelector((state: any) => state.productList);
  const [value, setValue] = React.useState<FilmOptionType | null>(null);
  interface FilmOptionType {
    inputValue?: string;
    title: string;
    year?: number;
  }

  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films: readonly FilmOptionType[] = [
    { title: "Chief Executive Officer (CEO)" },
    { title: "President" },
    { title: "Chief Operating Officer (COO)" },
    { title: "Chief Financial Officer (CFO)" },
    { title: "Chief Marketing Officer (CMO)" },
    { title: "Chief Information Officer (CIO)" },
    { title: "Chief Technology Officer (CTO)" },
    { title: "Human Resources Director" },
    { title: "Operations Manager" },
    { title: "General Manager" },
    { title: "Vice President" },
    { title: "Director" },
    { title: "Assistant Vice President" },
    { title: "Supervisor" },
    { title: "Team Leader" },
  ];

  // Now you can use top100Films
  const filter = createFilterOptions<FilmOptionType>();
  const [filmOptions, setFilmOptions] = React.useState<FilmOptionType[]>([
    ...top100Films,
  ]);

  const [activeStep, setActiveStep] = useState<number>(0);

  const router: any = useRouter();
  const SmallAvatar = styled(Avatar)({
    width: 22,
    height: 22,
  });
  useEffect(() => {
    if (isEdit) {
      setMobile(`${editValues.phone}`);
      setProfileImage(editValues.avatar_original);
    }
  }, [isEdit, editValues]);

  const passwordValidation = isEdit
    ? Yup.string()
        .matches(passwordRules, { message: PasswordMessage })
        .min(8, PasswordMessage)
    : Yup.string()
        .required("Please enter password")
        .matches(passwordRules, { message: PasswordMessage })
        .min(8, PasswordMessage);

  const validation = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Please enter name")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "name can only contain alphanumeric characters"
      ),
    email: Yup.string().email("Invalid email").required("Please enter email"),
    password:
      activeStep === 0 ? passwordValidation : Yup.string().notRequired(),
    postal_code: Yup.string().required("Please enter postal code"),
    phone: Yup.string()
      .required("Please enter mobile number")
      .test(
        "isValidPhoneNumber",
        "Please enter phone number",
        (values) => validate
      ),
    gender: Yup.string().required("Please select atleast one option"),
    account_type: Yup.string().required("Please select one account type"),
    job_role: Yup.string().required("Please select/enter job title"),
    job_function: Yup.string().required("Please enter department"),
    address: Yup.string().required("Please enter address"),
    // state: Yup.string()
    //   .required("Please select region/state/province")
    //   .nullable()
    //   .trim(),
  });

  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editValues?.name ?? "",
      email: editValues?.email ?? "",
      gender: editValues?.gender ?? "",
      account_type: editValues?.account_type ?? "",
      postal_code: editValues?.postal_code ?? "",
      address: editValues?.address ?? "",
      role:
        editValues?.role_id && editValues?.role !== null
          ? editValues?.role_id
          : "",
      status: editValues?.status == undefined ? "active" : editValues?.status,
      job_role: editValues?.job_role ?? "",
      job_function: editValues?.job_function ?? "",
      password: editValues?.password ?? "",

      phone_code: editValues?.phone_code ?? "",
      phone: editValues?.phone ?? "",
      mobile_country_code: editValues?.mobile_country_code ?? "",
    },
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      CreateAccount(values);
    },
  });

  const ValidateField = (field: any) => {
    if (formik.errors[field] && formik.touched[field]) return true;
    else return false;
  };

  const CreateAccount = async (value) => {
    const feature = featureList.find((v) => v.id === 13);
    const isStatusTrue = feature?.status ?? false;
    const isJobRoleTrue = feature?.job_role ?? false;
    const checkStatus = isStatusTrue && isJobRoleTrue;

    if (!checkStatus) {
      setOpen(true);
    }

    setLoading(true);
    const {
      name,
      email,
      status,
      account_type,
      address,
      gender,
      postal_code,
      job_function,
      job_role,
      password,
      phone_code,
      phone,
      mobile_country_code,
    } = value;
    let formData = new FormData();
    formData.append("name", `${name}`);
    formData.append("email", email);
    formData.append("status", status);
    formData.append("password", password);
    formData.append("account_type", account_type);
    formData.append("address", address);
    formData.append("gender", gender);
    formData.append("postal_code", postal_code);
    formData.append("job_function", job_function);
    formData.append("job_role", job_role);
    formData.append("phone_code", phone_code);
    formData.append("phone", phone);
    formData.append("mobile_country_code", mobile_country_code);
    const parent_name = JSON.parse(localStorage.getItem("userData"))?.name;
    formData.append("parent_name", parent_name);
    if (isEdit) formData.append("user_id", editValues?.id);
    if (typeof profileImage !== "string")
      formData.append("image", profileImage);
    let endPoints = isEdit ? "update" : "create";
    let response = await apiClient(
      `sub_account/${endPoints}`,
      "post",
      {
        body: formData,
      },
      true
    );
    if (response.status == false) {
      response.message.find((item) => {
        if (item == "The phone has already been taken.") {
          formik.setFieldError("phone", "Phone number already exists");
        } else {
          formik.setFieldError("email", "Email already exists");
        }
      });
    }
    if (response.status === 200) {
      toast.success(`Success! The invitation has been sent to ${name}`);
      toggleDrawer(false);
      dispatch(fetchSubsellerLists());
      fetchRolesData1();
      FetchPlanDetail();
      if (isEdit) setEditValue({});
    }
    setLoading(false);
  };
  const FetchPlanDetail = async () => {
    let response = await apiClient("users/current_plan", "get");
    if (response.status === 200) {
      // setPlan(response?.data?.name);
    }
  };

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
  };
  useEffect(() => {
    if (!formik.values.phone) {
      dispatch(getGeoLocation());
      formik.setFieldValue("phone", defaultCode);
    }
    dispatch(fetchRolesData());
  }, []);

  const uploadInput = useRef<HTMLInputElement>();
  const onClickHandler = () => uploadInput?.current?.click();

  useEffect(() => {
    rolesData?.length > 0 &&
      setRoles(rolesData?.filter((ele) => ele?.status == 0));
  }, [rolesData]);

  const onChangeHandle = (e) => {
    let fileSize = e.target.files[0]?.size;
    if (fileSize <= 2000000) {
      setProfileImage(e.target.files[0]);
    } else {
      toast.error("Image size must be less than 2MB");
    }
  };

  const setMobileNumber = (phone, mobile_code, country_code, isValid) => {
    formik.setFieldValue("phone_code", mobile_code);
    if (phone) formik.setFieldValue("phone", phone);
    formik.setFieldValue("mobile_country_code", country_code);
    formik.setFieldError("phone", "");
    setValidation(isValid);
  };

  <SmallAvatar
    alt="Remy Sharp"
    src="assets/SubSellerUpload.svg"
    onClick={onClickHandler}
    style={{ cursor: "pointer" }}
  />;
  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "";
  };

  const roleName = getRoleName(formik.values.role);
  const onClickAction = () => {
    setPlanLoading(true);
    router.push(`/plancards`);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRoles = () => {
    router.push("/roles/create");
  };

  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [selectedValue, setSelectedValue] = useState(null);
  const [descriptData, setDescriptData] = useState("");
  const [nameData, setNameData] = useState("");
  const [selectedData, setSelectedData] = useState({
    name: "",
    description: "",
  });
  const handleRadioChange = (label, description) => {
    setSelectedValue(label);
    setSelectedData({
      name: label,
      description: description,
    });
    setNameData(label);
    setDescriptData(description);
    formik.setFieldValue("account_type", label);
    formik.setFieldError("account_type", " ");
    setOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const scrollAndFocus = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  };
  const nameInputRef = useRef(null);
  const emailRef = useRef(null);
  const genderInputRef = useRef(null);
  const accountRef = useRef(null);
  const passwordRef = useRef(null);
  const postalRef = useRef(null);
  const addressRef = useRef(null);
  const departmentRef = useRef(null);
  const jobRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef(null);

  const handleSave = () => {
    if (!formik.values.name || formik.errors.name) {
      scrollAndFocus(nameInputRef);
      return;
    }
    if (!formik.values.email || formik.errors.email) {
      scrollAndFocus(emailRef);
      return;
    }
    if (!formik.values.password || formik.errors.password) {
      scrollAndFocus(passwordRef);
      return;
    }
    if (!formik.values.address || formik.errors.address) {
      scrollAndFocus(addressRef);
      return;
    }
    if (!formik.values.postal_code || formik.errors.postal_code) {
      scrollAndFocus(postalRef);
      return;
    }
    if (!formik.values.job_function || formik.errors.job_function) {
      scrollAndFocus(departmentRef);
      return;
    }
    if (!formik.values.job_role || formik.values.job_role) {
      scrollAndFocus(jobRef);
      return;
    }

    if (!formik.values.phone || formik.errors.phone) {
      scrollAndFocus(phoneRef);
      return;
    }
  };

  const handleEmailChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("email", removeSpace);
    formik.setFieldTouched("email", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("email", "Email address cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("email", "");
      }, 2000);
    } else {
      formik.setFieldError("email", "");
    }
    if (emailRef.current) {
      emailRef.current.value = removeSpace;
      emailRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handlePasswordChange = (e) => {
    const { value, selectionStart } = e.target;
    const removeSpace = value.replace(/\s/g, "");
    formik.setFieldValue("password", removeSpace);
    formik.setFieldTouched("password", true);
    const cursorPosition = selectionStart - (value.length - removeSpace.length);
    if (value.includes(" ")) {
      formik.setFieldError("password", "Password cannot contain spaces");
      setTimeout(() => {
        formik.setFieldError("password", "");
      }, 2000);
    } else {
      formik.setFieldError("password", "");
    }
    if (passwordRef.current) {
      passwordRef.current.value = removeSpace;
      passwordRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  const handleJobTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = jobRef.current;
    if (!input) return;
    const newValue = input.value;
    const cursorPosition = input.selectionStart || 0;
    const trimmedValue = newValue.trimStart();
    formik.setFieldValue("job_role", trimmedValue);
    if (trimmedValue !== newValue) {
      const cursorAdjustment = newValue.length - trimmedValue.length;
      requestAnimationFrame(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      });
    } else {
      formik.handleChange(e);
      requestAnimationFrame(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="create_selleraccount">
        <CardFlapover
          sx={{
            width: "100% !important",
            height: "100%",
            boxShadow: "none !important",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
            padding={"12px 16px 8px 16px"}
            sx={{
              "& svg": {
                cursor: "pointer",
                "&:hover": {
                  color: "#d7282f",
                },
              },
            }}
          >
            <FontContainer fontSize="17px">
              {isEdit ? "Edit " : "Create"} Seller Sub Account
            </FontContainer>
            <CloseRoundedIcon
              onClick={() => {
                setEditValue({});
                toggleDrawer(false);
              }}
            />
          </Box>
          <Divider />
          <Box sx={{ height: "800px", overflow: "auto" }}>
            <CardHeader
              avatar={
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <ImageCropper
                      type={"profile"}
                      defaultImage={""}
                      onChange={(e) => setProfileImage(e)}
                      icon={
                        <SmallAvatar
                          alt="Remy Sharp"
                          src="assets/SubSellerUpload.svg"
                          onClick={onClickHandler}
                          style={{ cursor: "pointer" }}
                        />
                      }
                    />
                  }
                >
                  <Avatar sx={{ width: 80, height: 80 }} aria-label="recipe">
                    {isEdit ? (
                      <>
                        {profileImage.length == 0 ? (
                          <img
                            height={"100%"}
                            width={"100%"}
                            alt="profile-image"
                            src={
                              profileImage.length == 0
                                ? `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                                : URL.createObjectURL(profileImage)
                            }
                          />
                        ) : (
                          <img
                            height={"100%"}
                            width={"100%"}
                            alt="profile-image"
                            src={
                              profileImage?.length > 0
                                ? profileImage[0]?.source
                                : URL.createObjectURL(profileImage)
                            }
                          />
                        )}
                      </>
                    ) : (
                      <Image
                        style={{ objectFit: "cover" }}
                        height={100}
                        width={100}
                        alt="profile-image"
                        src={
                          !profileImage
                            ? `${LOCAL_PUBLIC_URL}/assets/img/avatar-place.png`
                            : typeof profileImage === "string"
                            ? `${profileImage}`
                            : URL.createObjectURL(profileImage)
                        }
                      />
                    )}
                  </Avatar>
                  <input
                    id="uploadSubSellerImage"
                    type="file"
                    ref={uploadInput}
                    style={{ display: "none" }}
                    onChange={onChangeHandle}
                    accept="image/png, image/jpeg"
                  />
                </Badge>
              }
              titleTypographyProps={{
                fontSize: "21px",
                fontWeight: 700,
                fontFamily: "open sans",
                color: "#231f20",
              }}
              subheaderTypographyProps={{
                fontSize: "14px",
                fontWeight: 400,
                fontFamily: "open sans",
              }}
              title={`${
                formik.values.name !== undefined ? formik.values.name : ""
              }`}
              subheader={roleName}
            />
            <MyCardContent>
              <Stack spacing={2.5}>
                <TextField
                  className={sellersubaccount.subseller_field}
                  type="text"
                  variant="outlined"
                  label="Name"
                  sx={{ width: "100%", position: "relative" }}
                  size="small"
                  name="name"
                  inputRef={nameInputRef}
                  {...formik.getFieldProps("name")}
                  error={!!formik.errors.name}
                  onChange={(e) => {
                    const input = e.target;
                    const newValue = input.value;
                    const cursorPosition = input.selectionStart;
                    if (newValue.length > 100) {
                      formik.setFieldError(
                        "name",
                        "Name content is too long. Please limit it to 100 characters."
                      );
                      return;
                    }
                    const trimmedValue = newValue.trimStart();
                    if (trimmedValue !== newValue) {
                      formik.setFieldValue("name", trimmedValue);
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition -
                          (newValue.length - trimmedValue.length);
                      });
                    } else {
                      formik.setFieldValue("name", newValue);
                      formik.handleChange(e);
                      formik.setFieldError("name", "");
                      requestAnimationFrame(() => {
                        input.selectionStart = input.selectionEnd =
                          cursorPosition;
                      });
                    }
                  }}
                  helperText={
                    formik.errors.name && (
                      <AbsoluteErrorBox>
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          style={{
                            width: "8px",
                            height: "8px",
                            marginRight: "4px",
                          }}
                        />
                        <div>{formik.errors.name?.toString() ?? ""}</div>
                      </AbsoluteErrorBox>
                    )
                  }
                />

                <TextField
                  className={sellersubaccount.subseller_field}
                  type="text"
                  variant="outlined"
                  label="Email ID"
                  sx={{ width: "100%", position: "relative" }}
                  size="small"
                  name="email"
                  inputRef={emailRef}
                  {...formik.getFieldProps("email")}
                  error={Boolean(formik.errors.email)}
                  onChange={handleEmailChange}
                  InputProps={{
                    autoComplete: "off",
                  }}
                  helperText={
                    formik.errors.email && (
                      <AbsoluteErrorBox>
                        <img
                          src="/assets/error-outline-red.svg"
                          alt=""
                          style={{
                            width: "8px",
                            height: "8px",
                            marginRight: "4px",
                          }}
                        />
                        <div>{formik.errors.email?.toString() ?? ""}</div>
                      </AbsoluteErrorBox>
                    )
                  }
                />

                <SubSellerRowItem>
                  <BorderRow
                    sx={{
                      border: `${
                        formik.errors.gender
                          ? "1px solid #d7282f !important"
                          : "inherit"
                      }`,
                    }}
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl
                        component="fieldset"
                        fullWidth
                        error={
                          formik.touched.gender && Boolean(formik.errors.gender)
                        }
                      >
                        <SellerFormLabel>Gender</SellerFormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          {...formik.getFieldProps("gender")}
                          value={formik.values.gender}
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldError("gender", "");
                          }}
                          onBlur={formik.handleBlur}
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                        {formik.touched.gender && formik.errors.gender ? (
                          <FormHelperText>
                            <AbsoluteErrorBox
                              sx={{
                                bottom: "-24px !important",
                                left: "-8px !important",
                              }}
                            >
                              <img
                                src="/assets/error-outline-red.svg"
                                alt="Error"
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              {typeof formik.errors.gender === "string"
                                ? formik.errors.gender
                                : String(formik.errors.gender)}
                            </AbsoluteErrorBox>
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  </BorderRow>
                </SubSellerRowItem>
                <SubSellerRowItem>
                  <BorderRow
                    sx={{
                      border: `${
                        formik.touched.account_type &&
                        formik.errors.account_type
                          ? "1px solid #d7282f !important"
                          : "inherit"
                      }`,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-12px",
                        padding: "0px 6px",
                        background: "#fff",
                        display: `${
                          rolesData && !formik.values.account_type
                            ? "none"
                            : "block"
                        }`,
                      }}
                    >
                      <SellerFormLabel
                        sx={{
                          margin: "0 !important",
                          fontSize: "11px !important",
                          color: "rgba(0, 0, 0, 0.5) !important",
                        }}
                      >
                        Account Type
                      </SellerFormLabel>
                    </Box>
                    {isEdit ? (
                      <>
                        <Typography>{formik.values.account_type}</Typography>
                      </>
                    ) : (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={12}>
                          <AcconyTypeWrapper>
                            <Grid container>
                              <Grid item xs={12} position={"relative"}>
                                <NameIconBox onClick={handleToggle}>
                                  <SellerFormLabel
                                    sx={{ margin: "0 !important" }}
                                  >
                                    {rolesData && !formik.values.account_type
                                      ? "Account Type"
                                      : formik.values.account_type ||
                                        selectedData?.name}
                                  </SellerFormLabel>
                                  <KeyboardArrowDownOutlinedIcon />

                                  <AbsoluteBox
                                    sx={{
                                      height: isOpen ? "300px" : "0px",
                                    }}
                                  >
                                    <AbsoluteInnerBox>
                                      {rolesData?.map((data) => (
                                        <RadioBox
                                          key={data.value}
                                          checked={
                                            formik.values.account_type ===
                                            data.name
                                          }
                                          // checked={selectedValue === data.name}
                                          {...formik.getFieldProps(
                                            "account_type"
                                          )}
                                          onChange={(e) => {
                                            handleRadioChange(
                                              data.name,
                                              data.description
                                            );
                                            formik.handleChange(e);
                                            formik.setFieldError(
                                              "account_type",
                                              ""
                                            );
                                          }}
                                          label={data.name}
                                          description={data?.description}
                                        />
                                      ))}
                                    </AbsoluteInnerBox>
                                  </AbsoluteBox>
                                </NameIconBox>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}></Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </AcconyTypeWrapper>
                        </Grid>
                      </>
                    )}

                    {formik.touched.account_type &&
                      formik.errors.account_type && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "-16px",
                            left: "0",
                          }}
                        >
                          <FormHelperText
                            sx={{ display: "flex", alignItems: "center" }}
                          >
                            <>
                              {" "}
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              {formik.errors.account_type &&
                              typeof formik.errors.account_type === "string"
                                ? formik.errors.account_type
                                : ""}
                            </>
                          </FormHelperText>
                        </Box>
                      )}
                  </BorderRow>
                </SubSellerRowItem>
                {
                  <SubSellerRowItem>
                    <TextField
                      className={sellersubaccount.subseller_field}
                      type={showPassword ? "password" : "text"}
                      variant="outlined"
                      label={editValues.id ? "New Password" : "Password"}
                      sx={{ width: "100%", position: "relative" }}
                      value={formik?.values?.password}
                      size="small"
                      name="password"
                      inputRef={passwordRef}
                      {...formik.getFieldProps("password")}
                      error={!!formik.errors.password}
                      onChange={handlePasswordChange}
                      InputProps={{
                        autoComplete: "new-password",
                        endAdornment: (
                          <InputAdornment position="end">
                            {showPassword ? (
                              <LightTooltip
                                title="Show Password"
                                arrow
                                placement="top"
                                disableInteractive
                              >
                                <VisibilityIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    setShowPassword((prev) => !prev)
                                  }
                                />
                              </LightTooltip>
                            ) : (
                              <LightTooltip
                                title="Hide Password"
                                arrow
                                placement="top"
                                disableInteractive
                              >
                                <VisibilityOffIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    setShowPassword((prev) => !prev)
                                  }
                                />
                              </LightTooltip>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      helperText={
                        formik.errors.password && (
                          <AbsoluteErrorBox
                            sx={{
                              position:
                                formik.errors.password ===
                                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
                                  ? "static !important"
                                  : "absolute",
                              margin:
                                formik.errors.password ===
                                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
                                  ? "0 0 10px 0 !important"
                                  : "",
                            }}
                          >
                            <img
                              src="/assets/error-outline-red.svg"
                              alt=""
                              style={{
                                width: "8px",
                                height: "8px",
                                marginRight: "4px",
                              }}
                            />
                            <div>
                              {formik?.errors?.password?.toString() ?? ""}
                            </div>
                          </AbsoluteErrorBox>
                        )
                      }
                    />
                  </SubSellerRowItem>
                }
                <SubSellerRowItem
                  sx={{
                    margin:
                      formik.errors.password ===
                      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
                        ? "-0px 0 0 0 !important"
                        : "",
                  }}
                >
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Address"
                    multiline
                    fullWidth
                    size="small"
                    sx={{ position: "relative" }}
                    maxRows={4}
                    {...formik.getFieldProps("address")}
                    error={!!formik.errors.address}
                    onChange={(e) => {
                      const input = e.target;
                      const newValue = input.value;
                      const cursorPosition = input.selectionStart;
                      const trimmedValue = newValue.trimStart();
                      if (trimmedValue !== newValue) {
                        formik.setFieldValue("address", trimmedValue);
                        requestAnimationFrame(() => {
                          input.selectionStart = input.selectionEnd =
                            cursorPosition -
                            (newValue.length - trimmedValue.length);
                        });
                      } else {
                        formik.setFieldValue("address", newValue);
                        formik.setFieldError("address", "");
                        formik.handleChange(e);
                        requestAnimationFrame(() => {
                          input.selectionStart = input.selectionEnd =
                            cursorPosition;
                        });
                      }
                    }}
                    inputRef={addressRef}
                    helperText={
                      formik.errors.address && (
                        <AbsoluteErrorBox>
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{
                              width: "8px",
                              height: "8px",
                              marginRight: "4px",
                            }}
                          />
                          <div>{formik.errors.address?.toString() ?? ""}</div>
                        </AbsoluteErrorBox>
                      )
                    }
                  />
                </SubSellerRowItem>

                <SubSellerRowItem>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Postal Code"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ position: "relative" }}
                        {...formik.getFieldProps("postal_code")}
                        onChange={(e) => {
                          const value = e.target.value
                            .trimStart()
                            .toUpperCase();

                          if (/^[A-Z0-9]*$/.test(value) && value.length <= 10) {
                            formik.setFieldValue(`postal_code`, value);
                            formik.setFieldError(`postal_code`, "");
                          } else if (value.length > 10) {
                            formik.setFieldError(
                              `postal_code`,
                              "Postal code content is too long. Please limit it to 10 characters."
                            );
                          }
                          formik.setFieldTouched(`postal_code`, true, false);
                        }}
                        inputRef={postalRef}
                        helperText={
                          formik.errors.postal_code && (
                            <AbsoluteErrorBox
                              sx={{
                                position:
                                  formik.errors.postal_code ===
                                  "Postal code content is too long. Please limit it to 10 characters."
                                    ? "static !important"
                                    : "absolute",
                              }}
                            >
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              <div>
                                {formik.errors.postal_code?.toString() ?? ""}
                              </div>
                            </AbsoluteErrorBox>
                          )
                        }
                        error={formik.errors.postal_code ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        id="outlined-basic"
                        label="Department"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ position: "relative" }}
                        {...formik.getFieldProps("job_function")}
                        onChange={(e) => {
                          const input = e.target;
                          const newValue = input.value;
                          const cursorPosition = input.selectionStart;
                          const trimmedValue = newValue.trimStart();
                          if (trimmedValue !== newValue) {
                            formik.setFieldValue("job_function", trimmedValue);
                            requestAnimationFrame(() => {
                              input.selectionStart = input.selectionEnd =
                                cursorPosition -
                                (newValue.length - trimmedValue.length);
                            });
                          } else {
                            formik.setFieldValue("job_function", newValue);
                            formik.setFieldError("job_function", "");
                            formik.handleChange(e);
                            requestAnimationFrame(() => {
                              input.selectionStart = input.selectionEnd =
                                cursorPosition;
                            });
                          }
                        }}
                        inputRef={departmentRef}
                        helperText={
                          formik.errors.job_function && (
                            <AbsoluteErrorBox
                              sx={{
                                position:
                                  formik.errors.job_function ===
                                  "Postal code content is too long. Please limit it to 10 characters."
                                    ? "static !important"
                                    : "absolute",
                              }}
                            >
                              <img
                                src="/assets/error-outline-red.svg"
                                alt=""
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  marginRight: "4px",
                                }}
                              />
                              <div>
                                {formik.errors.job_function?.toString() ?? ""}
                              </div>
                            </AbsoluteErrorBox>
                          )
                        }
                        error={!!formik.errors.job_function}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <LightTooltip
                                arrow
                                placement="top-start"
                                disableInteractive
                                title="Indicate the department you belong to within your company, such as Sales Marketing, Business Development, Product Management, Procurement, Supply Chain Management, Operations, Finance, and Customer Service."
                              >
                                <InfoOutlinedIcon sx={{ fontSize: "18px" }} />
                              </LightTooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </SubSellerRowItem>

                <SubSellerRowItem>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Autocomplete
                        value={formik.values.job_role}
                        {...formik.getFieldProps("job_role")}
                        onChange={(event, newValue) => {
                          if (typeof newValue === "string") {
                            const newFilm = { title: newValue };
                            setValue(newFilm);
                            setFilmOptions((prev) => [...prev, newFilm]);
                            formik.setFieldValue("job_role", newFilm.title);
                            formik.setFieldError("job_role", "");
                          } else if (newValue && newValue.inputValue) {
                            const newFilm = { title: newValue.inputValue };
                            setValue(newFilm);
                            setFilmOptions((prev) => [...prev, newFilm]);
                            formik.setFieldValue("job_role", newFilm.title);
                            formik.setFieldError("job_role", "");
                          } else {
                            setValue(newValue);
                            formik.setFieldValue(
                              "job_role",
                              newValue?.title || ""
                            );
                            formik.setFieldError("job_role", "");
                          }
                        }}
                        popupIcon={
                          <ArrowDropDownIcon
                            sx={{ fontSize: "24px !important" }}
                          />
                        }
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);
                          const { inputValue } = params;

                          const isExisting = options.some(
                            (option) => inputValue === option.title
                          );
                          if (inputValue !== "" && !isExisting) {
                            filtered.push({
                              inputValue,
                              title: `Add "${inputValue}"`,
                            });
                          }

                          return filtered;
                        }}
                        disableClearable={formik.values.job_role ? false : true}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="job_role"
                        options={filmOptions}
                        getOptionLabel={(option) => {
                          if (typeof option === "string") {
                            return option;
                          }
                          if (option.inputValue) {
                            return option.inputValue;
                          }
                          return option.title;
                        }}
                        renderOption={(props, option) => (
                          <li {...props}>{option.title}</li>
                        )}
                        // sx={{ width: 300 }}
                        fullWidth
                        // freeSolo
                        ListboxProps={{
                          sx: {
                            height: "200px",
                            "&::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                              backgroundColor: "#f1f1f1",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "#acabab",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              backgroundColor: "#6d6d6d",
                            },
                          },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Job Title"
                            error={Boolean(formik.errors.job_role)}
                            size="small"
                            onChange={handleJobTitle}
                            inputRef={jobRef}
                            helperText={
                              formik.errors.job_role && (
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#d7282f",
                                  }}
                                >
                                  <img
                                    src="/assets/error-outline-red.svg"
                                    alt=""
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      marginRight: "4px",
                                    }}
                                  />
                                  <div>
                                    {formik.errors.job_role?.toString() ?? ""}
                                  </div>
                                </span>
                              )
                            }
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </SubSellerRowItem>

                <Box
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                      color: "#231f20",
                    },
                  }}
                >
                  <MobileInputCommon
                    showtooltip={true}
                    inputRef={phoneRef}
                    mobileNumber={formik.values.phone}
                    mobileCode={formik.values.phone_code}
                    countryCode={formik.values.mobile_country_code}
                    handleChange={setMobileNumber}
                    placeholder="Mobile Number"
                    error={Boolean(formik.errors.phone)}
                    name="phone"
                    helperText={
                      formik.errors.phone && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#d7282f",
                          }}
                        >
                          <img
                            src="/assets/error-outline-red.svg"
                            alt=""
                            style={{
                              width: "8px",
                              height: "8px",
                              marginRight: "4px",
                            }}
                          />
                          <div>{formik.errors.phone?.toString() ?? ""}</div>
                        </span>
                      )
                    }
                  />
                </Box>

                <FormControl
                  fullWidth
                  size="small"
                  className="seller_phoneinput"
                ></FormControl>
                <FormControl
                  fullWidth
                  size="small"
                  className="seller_phoneinput"
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <InputLabel style={{ marginTop: "25px" }}>Status</InputLabel>
                  <Select
                    style={{ width: "100%", marginTop: "24px" }}
                    name="status"
                    label="Status"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    {...formik.getFieldProps("status")}
                    error={ValidateField("status")}
                  >
                    <MenuItem value={"active"} sx={{ fontSize: "14px" }}>
                      Active
                    </MenuItem>
                    <MenuItem value={"inactive"} sx={{ fontSize: "14px" }}>
                      Inactive
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </MyCardContent>
          </Box>
          <Divider />
          <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
            <Box display="flex" gap={1} style={{ margin: "1rem 0" }}>
              <Blackoutlinebtn
                onClick={() => {
                  setEditValue({});
                  toggleDrawer(false);
                }}
              >
                Cancel
              </Blackoutlinebtn>
              <Redoutlinebtn
                type="submit"
                onSubmit={() => formik.handleSubmit()}
                onClick={handleSave}
              >
                {loading ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    radius="9"
                    color="#d7282f"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    visible={true}
                  />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Redoutlinebtn>
            </Box>
          </CardActions>
        </CardFlapover>
      </form>
    </>
  );
}

export default ProjectForm1;

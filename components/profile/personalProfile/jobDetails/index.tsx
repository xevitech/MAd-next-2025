import React, { useState, useEffect, useRef } from "react";
import {
  OuterContainer,
  ContentInnerContainer,
  ContainerHeader,
  ContainerHeaderText,
  ContainerHeaderDescription,
  FloatingEditIcon,
  PencilIcon,
  LabelContainer,
  CancelLink,
  SaveLink,
} from "@/components/profile/common";
import Image from "next/image";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Popper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import useAppContext from "@/hooks/useAppContext";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { convertUnderscoreToSpaceAndCapitalize } from "@/utils/commonFunctions/other";
import { FieldsBoxCon, SellerJobDetail } from "./styles";
import { FirstletterCapital, apiClient } from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "@/hooks/appReducers";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TimeZone_List } from "../location/List";
import { ThreeDots } from "react-loader-spinner";
import { CustomTextField } from "@/components/common/customTextField";
import { getCompanyProfile } from "@/hooks/company";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import {
  Administrative_Assistant,
  Sales_and_marketing_rules,
  Customer_Service_Role,
  Management_Rules,
  targetcustomersegments,
  ProcurementPriorities,
  PurchasingAuthority,
  IndustryExpertise,
  companytype,
  jobtitles,
} from "@/utils/jobTitle";
import { toast } from "react-toastify";
export const JobDetails = ({
  defaultValues,
  editBasicDetails,
  setEditBasicDetail,
}: any) => {
  const { breakPoints } = useAppContext();
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { role } = useSelector((state: any) => state.userData);

  const languageOptions = [
    {
      label: "English",
      value: "en",
    },

    { label: "Chinese (Traditional)", value: "zh" },
    {
      label: "Spanish",
      value: "es",
    },
    {
      label: "Japanese",
      value: "ja",
    },
    {
      label: "Portuguese (Portugal, Brazil)",
      value: "pt",
    },
    {
      label: "German",
      value: "de",
    },
    {
      label: "Arabic",
      value: "ar",
    },
    {
      label: "French",
      value: "fr",
    },
    {
      label: "Russian",
      value: "ru",
    },
    {
      label: "Korean",
      value: "ko",
    },
    {
      label: "Hindi",
      value: "hi",
    },
    {
      label: "Italian",
      value: "it",
    },
  ];

  useEffect(() => {
    getCompanyProfile();
  }, []);

  const getOptionsBasedOnRadioButton = () => {
    switch (formik1.values.job_function) {
      case "Management Rules":
        return Management_Rules;
      case "Sales and marketing rules":
        return Sales_and_marketing_rules;
      case "Administrative Assistant":
        return Administrative_Assistant;
      case "Customer Service Role":
        return Customer_Service_Role;
      default:
        return [];
    }
  };
  const handleRadioButtonChange = (event) => {
    formik1.setFieldValue("job_function", event.target.value);
    formik1.setFieldValue("job_role", "");
  };
  const validation = Yup.object().shape({
    job_role1: Yup.string().nullable().required("Please select job title"),
    job_function: Yup.string().required("Please enter department"),
    purchasing_authority: Yup.string().required(
      "Please select purchasing authority"
    ),
    procurement_priorities: Yup.string().required(
      "Please select procurement priorities"
    ),
    technical_expertise: Yup.array()
      .min(1, "Please enter technical expertise")
      .required("Please enter technical expertise"),
    industry_knowledge: Yup.array()
      .min(1, "Please enter industry knowledge")
      .required("Please enter industry knowledge"),
    years_of_experience: Yup.string().required(
      "Please enter years of experience"
    ),
    location: Yup.string().required("Please enter location"),
    education: Yup.string().required("Please enter education"),
    language: Yup.array()
      .min(1, "Please select language")
      .required("Please enter language"),
    time_zone1: Yup.string().required("Please select time zone settings"),
    industry_expertise: Yup.string().required(
      "Please select industry expertise"
    ),
  });
  const sellerValidation = Yup.object().shape({
    job_role: Yup.string().when("job_function", {
      is: (val) => val && val !== "Other",
      then: Yup.string().required("Please enter job title"),
      otherwise: Yup.string().nullable(),
    }),
    custom_job_role: Yup.string().when("job_function", {
      is: "Other",
      then: Yup.string().required("Please enter custom job role"),
      otherwise: Yup.string().nullable(),
    }),
    job_function: Yup.string().required("Please select department"),
    target_customer: Yup.string().required(
      "Please select target customer segment"
    ),
    company_type: Yup.string().required("Please select company type"),
    industry_knowledge1: Yup.array().min(1, "Please enter industry knowledge"),
    sales_skills1: Yup.array().min(1, "Please enter sales skills"),
    technical_expertise1: Yup.array().min(
      1,
      "Please enter technical expertise"
    ),
    years_of_experience: Yup.string().required(
      "Please enter years of experience"
    ),
    language: Yup.array()
      .min(1, "Please select language")
      .required("Please enter language"),
    location: Yup.string().required("Please enter location"),
    education: Yup.string().required("Please enter education"),
    time_zone: Yup.string().required("Please select time zone settings"),
    certification: Yup.string().required("Please enter certifications"),
  });
  let formik1: any = useFormik({
    initialValues: {
      job_role: defaultValues?.job_role ?? "",
      custom_job_role: defaultValues?.job_role ?? "",
      job_function: defaultValues?.job_function ?? "Management Rules",
      target_customer: defaultValues?.target_customer ?? "",
      technical_expertise1: defaultValues?.technical_expertise ?? [],
      industry_knowledge1: defaultValues?.industry_knowledge ?? [],
      sales_skills1: defaultValues?.sales_skills ?? [],
      years_of_experience: defaultValues?.years_of_experience ?? "",
      location: defaultValues?.location ?? "",
      language: defaultValues?.language ?? [],
      education: defaultValues?.education ?? "",
      certification: defaultValues?.certification ?? "",
      time_zone: defaultValues?.time_zone ?? "",
      user_type: "seller",
      company_type: defaultValues?.company_type ?? "",
      editMode: editBasicDetails ? editBasicDetails : false,
    },
    enableReinitialize: true,
    validationSchema: sellerValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const {
        job_role,
        job_function,
        target_customer,
        technical_expertise1,
        industry_knowledge1,
        sales_skills1,
        years_of_experience,
        location,
        language,
        education,
        certification,
        time_zone,
        user_type,
        company_type,
      } = values;
      setLoader(true);
      let response = await apiClient("profile/updateProfile", "post", {
        body: {
          job_role,
          job_function,
          target_customer,
          technical_expertise: technical_expertise1.join(","),
          industry_knowledge: industry_knowledge1.join(","),
          sales_skills: sales_skills1.join(","),
          years_of_experience,
          location,
          language,
          education,
          certification,
          time_zone,
          user_type,
          company_type,
        },
      });
      if (response.status == 200) {
        dispatch(profileData(role));
        formik.setFieldValue("editMode", false);
        setEditBasicDetail(false);
      }
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
      setLoader(false);
      toast.success("Job Details saved successfully.");
    },
  });
  let formik: any = useFormik({
    initialValues: {
      job_role1: defaultValues?.job_role ?? "",
      industry_knowledge: defaultValues?.industry_knowledge ?? [],
      job_function: defaultValues?.job_function ?? "",
      purchasing_authority: defaultValues?.purchasing_authority ?? "",
      procurement_priorities: defaultValues?.procurement_priorities ?? "",
      technical_expertise: defaultValues?.technical_expertise ?? [],
      years_of_experience: defaultValues?.years_of_experience ?? "",
      location: defaultValues?.location ?? "",
      language: defaultValues?.language ?? [],
      education: defaultValues?.education ?? "",
      time_zone1: defaultValues?.time_zone ?? "",
      industry_expertise: defaultValues?.industry_expertise ?? "",
      editMode: editBasicDetails ? editBasicDetails : false,
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const {
        job_role1,
        industry_knowledge,
        job_function,
        purchasing_authority,
        procurement_priorities,
        technical_expertise,
        years_of_experience,
        location,
        language,
        education,
        time_zone1,
        industry_expertise,
      } = values;
      setLoader(true);
      let response = await apiClient("profile/updateProfile", "post", {
        body: {
          job_role: job_role1,
          job_function,
          industry_knowledge: industry_knowledge.join(","),
          purchasing_authority,
          procurement_priorities,
          technical_expertise: technical_expertise.join(","),
          years_of_experience,
          location,
          language,
          education,
          time_zone: time_zone1,
          user_type: "buyer",
          industry_expertise,
        },
      });
      if (response.status == 200) {
        dispatch(profileData(role));
        formik.setFieldValue("editMode", false);
        setEditBasicDetail(false);
      }
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
      setLoader(false);
      toast.success("Job Details saved successfully.");
    },
  });

  const { editMode, technical_expertise, industry_knowledge } = formik.values;
  const { technical_expertise1, industry_knowledge1, sales_skills1 } =
    formik1.values;
  const cancelBuyerEditing = () => {
    if (editMode) {
      formik.resetForm();
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
    } else {
      formik.setFieldValue("job_role1", formik?.values.job_role1 ?? "");
      formik.setFieldValue("job_function", formik?.values.job_function ?? "");
      formik.setFieldValue(
        "industry_knowledge",
        formik?.values.industry_knowledge ?? ""
      );
      formik.setFieldValue(
        "purchasing_authority",
        formik?.values.purchasing_authority ?? ""
      );
      formik.setFieldValue(
        "technical_expertise",
        formik?.values.technical_expertise ?? ""
      );
      formik.setFieldValue("sales_skills", formik?.values.sales_skills ?? "");
      formik.setFieldValue(
        "years_of_experience",
        formik?.values.years_of_experience ?? ""
      );
      formik.setFieldValue("location", formik?.values.location ?? "");
      formik.setFieldValue("language", formik?.values.language ?? "");
      formik.setFieldValue("education", formik?.values.education ?? "");
      formik.setFieldValue("certification", formik?.values.certification ?? "");
      formik.setFieldValue("time_zone1", formik?.values.time_zone1 ?? "");
      formik.setFieldValue(
        "industry_expertise",
        formik?.values.industry_expertise ?? ""
      );
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
    }
  };

  const CancelEditing = () => {
    if (editMode) {
      formik1.resetForm();
      formik.setFieldValue("editMode", false);
      setEditBasicDetail(false);
      setIsTechnicalError("");
    } else {
      formik1.setFieldValue("job_role", formik1?.values.job_role ?? "");
      formik1.setFieldValue(
        "target_customer",
        formik1?.values.target_customer ?? ""
      );
      formik1.setFieldValue("company_type", formik1?.values.company_type ?? "");
      formik1.setFieldValue(
        "technical_expertise",
        formik1?.values.technical_expertise ?? ""
      );
      formik1.setFieldValue(
        "industry_knowledge",
        formik1?.values.industry_knowledge ?? ""
      );
      formik1.setFieldValue("sales_skills", formik1?.values.sales_skills ?? "");
      formik1.setFieldValue(
        "years_of_experience",
        formik1?.values.years_of_experience ?? ""
      );
      formik1.setFieldValue("location", formik1?.values.location ?? "");
      formik1.setFieldValue("language", formik1?.values.language ?? "");
      formik1.setFieldValue("education", formik1?.values.education ?? "");
      formik1.setFieldValue(
        "certification",
        formik1?.values.certification ?? ""
      );
      formik1.setFieldValue("time_zone", formik1?.values.time_zone ?? "");
      formik1.setFieldValue("editMode", false);
      setEditBasicDetail(false);
    }
  };

  let sellerTimeZoneValue = formik1.values.time_zone
    ? TimeZone_List?.find((v) => v.tzCode == formik1.values.time_zone) ?? null
    : null;

  const selectedLocationArray =
    Array.isArray(formik.values.location) && formik.values.location.length
      ? formik.values.location
      : [];
  const { profileInfos, user_info } = useSelector(
    (state: any) => state.userData
  );

  const [isTechnicalError, setIsTechnicalError] = useState("");

  useEffect(() => {
    let timer;
    if (isTechnicalError) {
      timer = setTimeout(() => {
        setIsTechnicalError("");
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isTechnicalError]);
  const CustomPopper = (props) => {
    return (
      <Popper
        {...props}
        modifiers={[
          {
            name: "flip",
            enabled: false,
          },
          {
            name: "preventOverflow",
            enabled: false,
          },
        ]}
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
          ...props.style,
        }}
      />
    );
  };

  const scrollAndFocus = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  };
  const jobRef = useRef(null);
  const customerRef = useRef(null);
  const companyRef = useRef(null);
  const expertiseRef = useRef(null);
  const industryRef = useRef(null);
  const salesRef = useRef(null);
  const techInputRef = useRef(null);
  const langInputRef = useRef(null);
  const educationRef = useRef(null);
  const locationRef = useRef(null);
  const certificateRef = useRef(null);
  const timeRef = useRef(null);

  const handleSave = () => {
    formik1.handleSubmit();

    if (!formik1.values.job_role || formik1.errors.job_role) {
      scrollAndFocus(jobRef);
      return;
    }
    if (!formik1.values.target_customer || formik1.errors.target_customer) {
      scrollAndFocus(customerRef);
      return;
    }
    if (!formik1.values.company_type || formik1.errors.company_type) {
      scrollAndFocus(companyRef);
      return;
    }
    if (
      !formik1?.values?.technical_expertise1 ||
      formik1?.errors?.technical_expertise1
    ) {
      scrollAndFocus(expertiseRef);
      return;
    }
    if (
      !formik1?.values?.industry_knowledge1 ||
      formik1?.errors?.industry_knowledge1
    ) {
      scrollAndFocus(industryRef);
      return;
    }
    if (!formik1.values.sales_skills1 || formik1.errors.sales_skills1) {
      scrollAndFocus(salesRef);
      return;
    }
    if (
      !formik1.values.years_of_experience ||
      formik1.errors.years_of_experience
    ) {
      scrollAndFocus(techInputRef);
      return;
    }
    if (!formik1.values.language || formik1.errors.language) {
      scrollAndFocus(langInputRef);
      return;
    }
    if (!formik1.values.education || formik1.errors.education) {
      scrollAndFocus(educationRef);
      return;
    }
    if (!formik1.values.location || formik1.errors.location) {
      scrollAndFocus(locationRef);
      return;
    }
    if (!formik1.values.certification || formik1.errors.certification) {
      scrollAndFocus(certificateRef);
      return;
    }
    if (!formik1.values.time_zone || formik1.errors.time_zone) {
      scrollAndFocus(timeRef);
      return;
    }
  };

  return (
    <>
      {role == "seller" ? (
        <ContentInnerContainer
          breakPoints={breakPoints}
          sx={{ marginBottom: "24px !important" }}
        >
          <ContainerHeader breakPoints={breakPoints}>
            <ContainerHeaderText breakPoints={breakPoints}>
              Job Details
            </ContainerHeaderText>
            <ContainerHeaderDescription>
              Manage Information Related to your Job Details
            </ContainerHeaderDescription>
            {!editMode ? (
              <FloatingEditIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  formik.setFieldValue("editMode", true);
                }}
              >
                <PencilIcon>
                  <Image
                    src={"/assets/EditPencil.svg"}
                    layout="fill"
                    alt="editImage"
                  />
                </PencilIcon>{" "}
                {profileInfos?.jobDetails?.job_role ? "Edit" : "Add"}
              </FloatingEditIcon>
            ) : (
              <FloatingEditIcon breakPoints={breakPoints}>
                <CancelLink
                  onClick={() => {
                    CancelEditing();
                  }}
                >
                  <CloseIcon />
                  <Box
                    sx={{
                      "@media screen and (max-width:320px)": {
                        display: "none",
                      },
                    }}
                  >
                    Cancel
                  </Box>
                </CancelLink>
                <Button type="submit" sx={{ padding: "0px", minWidth: "auto" }}>
                  <SaveLink onClick={handleSave}>
                    {!loader ? (
                      <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                    ) : (
                      ""
                    )}
                    {loader ? (
                      <ThreeDots
                        height="30"
                        width="60"
                        radius="5"
                        color="#d32f2f"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          "@media screen and (max-width:320px)": {
                            display: "none",
                          },
                        }}
                      >
                        Save
                      </Box>
                    )}
                  </SaveLink>
                </Button>
              </FloatingEditIcon>
            )}
          </ContainerHeader>
          <OuterContainer>
            <Grid container spacing={editMode ? 2 : 2}>
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={2}>
                    {editMode ? (
                      <LabelContainer
                        sx={{ alignItems: "start !important" }}
                        breakPoints={breakPoints}
                      >
                        Job Title<span style={{ color: "red" }}>*</span>
                      </LabelContainer>
                    ) : (
                      <LabelContainer
                        sx={{ alignItems: "start !important" }}
                        breakPoints={breakPoints}
                      >
                        Job Title
                      </LabelContainer>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={10}>
                    {!editMode ? (
                      <p style={{ fontSize: "14px" }}>
                        {convertUnderscoreToSpaceAndCapitalize(
                          formik1.values.job_role
                            ? formik1.values.job_role
                            : "N/A"
                        )}
                      </p>
                    ) : (
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <SellerJobDetail>
                          <FormControl>
                            <RadioGroup
                              sx={{ ml: "6px" }}
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              value={formik1.values.job_function}
                              onChange={(e) => {
                                const { value } = e.target;
                                formik1.setFieldValue("job_function", value);
                                formik1.setFieldValue("job_role1", value);
                                handleRadioButtonChange(e);
                              }}
                            >
                              <FormControlLabel
                                value="Management Rules"
                                control={<Radio />}
                                label="Management Rules"
                              />
                              <FormControlLabel
                                value="Sales and marketing rules"
                                control={<Radio />}
                                label="Sales and marketing rules"
                              />
                              <FormControlLabel
                                value="Administrative Assistant"
                                control={<Radio />}
                                label="Administrative Assistant"
                              />
                              <FormControlLabel
                                value="Customer Service Role"
                                control={<Radio />}
                                label="Customer Service Role"
                              />
                              <FormControlLabel
                                value="Other"
                                control={<Radio />}
                                label="Other"
                              />
                            </RadioGroup>
                          </FormControl>
                        </SellerJobDetail>

                        {formik1.values.job_function && (
                          <Stack spacing={2} sx={{ width: "100%" }}>
                            {formik1.values.job_function === "Other" ? (
                              <TextField
                                inputRef={jobRef}
                                size="small"
                                name="job_role"
                                placeholder="Enter Custom Job Role"
                                value={formik1.values.custom_job_role || ""}
                                onChange={(e) => {
                                  formik1.setFieldValue(
                                    "custom_job_role",
                                    e.target.value
                                  );
                                  formik1.setFieldValue(
                                    "job_role",
                                    e.target.value
                                  );
                                }}
                                helperText={formik1.errors.custom_job_role}
                                error={Boolean(formik1.errors.custom_job_role)}
                              />
                            ) : (
                              <Autocomplete
                                size="small"
                                onChange={(e, newValue) => {
                                  formik1.setFieldValue(
                                    "job_role",
                                    newValue?.label || ""
                                  );
                                  formik1.setFieldError("job_role", "");
                                }}
                                className={"combo-box-demo"}
                                value={formik1.values.job_role || ""}
                                id="free-solo-demo"
                                options={getOptionsBasedOnRadioButton()}
                                PopperComponent={CustomPopper}
                                ListboxProps={{
                                  sx: {
                                    maxHeight: 150,
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
                                slotProps={{
                                  popper: {
                                    sx: {
                                      zIndex: 1000,
                                    },
                                  },
                                }}
                                filterOptions={(options, { inputValue }) => {
                                  if (
                                    inputValue.trim() === "" &&
                                    inputValue !== ""
                                  ) {
                                    return [];
                                  }
                                  if (inputValue === "") {
                                    return options;
                                  }
                                  return options.filter((option) =>
                                    option.label
                                      .toLowerCase()
                                      .includes(inputValue.toLowerCase())
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    autoComplete="new-password"
                                    size="small"
                                    inputRef={jobRef}
                                    name="job_role"
                                    placeholder="Select job title"
                                    helperText={formik1.errors.job_role}
                                    error={Boolean(formik1.errors.job_role)}
                                  />
                                )}
                                disableClearable={!formik1.values.job_role}
                              />
                            )}
                          </Stack>
                        )}
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Target Customer Segment
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Target Customer Segment
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {convertUnderscoreToSpaceAndCapitalize(
                            formik1.values.target_customer
                              ? formik1.values.target_customer
                              : "N/A"
                          )}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(e, newValue) => {
                              formik1.setFieldValue(
                                "target_customer",
                                newValue?.label
                              );
                              formik1.setFieldError("target_customer", "");
                            }}
                            placeholder="Select target customer segment"
                            value={formik1.values.target_customer || ""}
                            id="free-solo-demo"
                            options={targetcustomersegments}
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            disableClearable={
                              formik1.values.target_customer ? false : true
                            }
                            filterOptions={(options, { inputValue }) => {
                              if (
                                inputValue.trim() === "" &&
                                inputValue !== ""
                              ) {
                                return [];
                              }
                              if (inputValue === "") {
                                return options;
                              }
                              return options.filter((option) =>
                                option.label
                                  .toLowerCase()
                                  .includes(inputValue.toLowerCase())
                              );
                            }}
                            ListboxProps={{
                              sx: {
                                maxHeight: 150,
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
                              <>
                                <TextField
                                  {...params}
                                  inputRef={customerRef}
                                  autoComplete="new-password"
                                  size="small"
                                  // name="procurementPriority"
                                  name="target_customer"
                                  placeholder="Select target customer segment"
                                  helperText={formik1.errors.target_customer}
                                  error={
                                    formik1.errors.target_customer
                                      ? true
                                      : false
                                  }
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                  }}
                >
                  <Grid container spacing={2} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Company Type<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Company Type
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {convertUnderscoreToSpaceAndCapitalize(
                            formik1.values.company_type
                              ? formik1.values.company_type
                              : "N/A"
                          )}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(e, newValue) => {
                              formik1.setFieldValue(
                                "company_type",
                                newValue?.label
                              );
                              formik1.setFieldError("company_type", "");
                            }}
                            value={formik1.values.company_type || ""}
                            id="free-solo-demo"
                            options={companytype}
                            PopperComponent={CustomPopper}
                            ListboxProps={{
                              sx: {
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
                            disableClearable={
                              formik1.values.company_type ? false : true
                            }
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            filterOptions={(options, { inputValue }) => {
                              if (
                                inputValue.trim() === "" &&
                                inputValue !== ""
                              ) {
                                return [];
                              }
                              if (inputValue === "") {
                                return options;
                              }
                              return options.filter((option) =>
                                option.label
                                  .toLowerCase()
                                  .includes(inputValue.toLowerCase())
                              );
                            }}
                            renderInput={(params) => (
                              <>
                                <TextField
                                  {...params}
                                  autoComplete="new-password"
                                  size="small"
                                  name="company_type"
                                  placeholder="Select company type"
                                  inputRef={companyRef}
                                  helperText={formik1.errors.company_type}
                                  error={
                                    formik1.errors.company_type ? true : false
                                  }
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FieldsBoxCon>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#231f20",
                    }}
                  >
                    Technical and Sales Expertise
                  </Typography>
                </FieldsBoxCon>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} mt={-2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: "100%",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        padding: "1px 0px 16px",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} lg={4}>
                          {editMode ? (
                            <LabelContainer
                              sx={{ display: "block !important" }}
                              breakPoints={breakPoints}
                            >
                              Technical Expertise
                              <span style={{ color: "red" }}>*</span>
                            </LabelContainer>
                          ) : (
                            <LabelContainer breakPoints={breakPoints}>
                              Technical Expertise
                            </LabelContainer>
                          )}
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          {!editMode ? (
                            formik1.values.technical_expertise1.length > 0 ? (
                              <p style={{ fontSize: "14px" }}>
                                {formik1.values.technical_expertise1.map(
                                  (value, index) => (
                                    <span key={index}>
                                      {value}
                                      {/* {index <
                                        formik1.values.technical_expertise1
                                          .length -
                                          1 
                                          // && "N/A"
                                          } */}
                                      {index <
                                        formik1.values.technical_expertise1
                                          .length -
                                          1 && ", "}
                                    </span>
                                  )
                                )}
                              </p>
                            ) : (
                              <p style={{ fontSize: "14px" }}>N/A</p>
                            )
                          ) : (
                            <Stack sx={{ width: "100%" }}>
                              <Autocomplete
                                size="small"
                                sx={{ width: "100%" }}
                                limitTags={2}
                                onChange={(event: any, newValue) => {
                                  newValue = newValue.filter(
                                    (item: string) => item.trim() !== ""
                                  );

                                  if (event?.key == "Backspace") {
                                    let keyword = [...technical_expertise1];
                                    keyword.pop();
                                    formik1.setFieldValue(
                                      "technical_expertise1",
                                      keyword
                                    );
                                  } else {
                                    let keywordValues =
                                      event?.target?.value?.includes(",")
                                        ? [
                                            ...technical_expertise1,
                                            ...event?.target?.value?.split(","),
                                          ]
                                        : newValue;
                                    keywordValues = keywordValues.filter(
                                      (item: string) => item.trim() !== ""
                                    );
                                    formik1.setFieldValue(
                                      "technical_expertise1",
                                      keywordValues
                                    );
                                    formik1.setFieldError(
                                      "technical_expertise1",
                                      ""
                                    );
                                  }
                                }}
                                disableClearable={
                                  formik1.values.technical_expertise1
                                    ? false
                                    : true
                                }
                                multiple
                                id="tags-filled"
                                options={[]}
                                value={technical_expertise1}
                                defaultValue={technical_expertise1}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      size="small"
                                      variant="outlined"
                                      label={option}
                                      {...getTagProps({ index })}
                                      sx={{
                                        backgroundColor:
                                          "rgba(34, 51, 84, 0.1) !important",
                                        "& .MuiChip-deleteIcon": {
                                          color: "#d7282fd9",
                                        },
                                      }}
                                    />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Press enter after each technical expertise"
                                    inputRef={expertiseRef}
                                    name="technical_expertise1"
                                    onChange={(e) => {
                                      if (
                                        technical_expertise1.includes(
                                          e?.target?.value?.trim()
                                        )
                                      ) {
                                        setIsTechnicalError("tech");
                                      } else {
                                        setIsTechnicalError("");
                                      }
                                    }}
                                    error={
                                      isTechnicalError == "tech" ||
                                      formik1?.errors?.technical_expertise1
                                        ? true
                                        : false
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    helperText={
                                      isTechnicalError == "tech"
                                        ? "Duplicate not allowed!"
                                        : formik1?.errors?.technical_expertise1
                                        ? formik1?.errors?.technical_expertise1
                                        : ""
                                    }
                                  />
                                )}
                              />

                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    color: "#4a4a4a",
                                    opacity: ".8",
                                  }}
                                >
                                  Please press the Enter key after typing each
                                  technical expertise.
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: "400",
                                    color: "#717171",
                                  }}
                                >
                                  List technical skills and knowledge related to
                                  specific products, technologies, or
                                  industries. For instance, a power generation
                                  equipment seller might highlight their
                                  expertise in turbines, generators, and control
                                  systems.
                                </Typography>
                              </Box>
                            </Stack>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: "100%",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        padding: "1px 0px 16px",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} lg={4}>
                          {editMode ? (
                            <LabelContainer
                              sx={{ display: "block !important" }}
                              breakPoints={breakPoints}
                            >
                              Industry Knowledge
                              <span style={{ color: "red" }}>*</span>
                            </LabelContainer>
                          ) : (
                            <LabelContainer breakPoints={breakPoints}>
                              Industry Knowledge
                            </LabelContainer>
                          )}
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          {!editMode ? (
                            formik1.values.industry_knowledge1.length > 0 ? (
                              <p style={{ fontSize: "14px" }}>
                                {formik1.values.industry_knowledge1.map(
                                  (value, index) => (
                                    <span key={index}>
                                      {value}
                                      {index <
                                        formik1.values.industry_knowledge1
                                          .length -
                                          1 && ", "}
                                    </span>
                                  )
                                )}
                              </p>
                            ) : (
                              <p style={{ fontSize: "14px" }}>N/A</p>
                            )
                          ) : (
                            <Stack sx={{ width: "100%" }}>
                              <Autocomplete
                                size="small"
                                sx={{ width: "100%" }}
                                limitTags={2}
                                onChange={(event: any, newValue) => {
                                  // Filter out empty spaces
                                  newValue = newValue.filter(
                                    (item: string) => item.trim() !== ""
                                  );

                                  if (event?.key == "Backspace") {
                                    let keyword = [...industry_knowledge1];
                                    keyword.pop();
                                    formik1.setFieldValue(
                                      "industry_knowledge1",
                                      keyword
                                    );
                                  } else {
                                    let keywordValues =
                                      event?.target?.value?.includes(",")
                                        ? [
                                            ...industry_knowledge1,
                                            ...event?.target?.value?.split(","),
                                          ]
                                        : newValue;
                                    keywordValues = keywordValues.filter(
                                      (item: string) => item.trim() !== ""
                                    );
                                    formik1.setFieldValue(
                                      "industry_knowledge1",
                                      keywordValues
                                    );
                                    formik1.setFieldError(
                                      "industry_knowledge1",
                                      ""
                                    );
                                  }
                                }}
                                disableClearable={
                                  formik1.values.industry_knowledge1
                                    ? false
                                    : true
                                }
                                multiple
                                id="tags-filled"
                                options={[]}
                                value={industry_knowledge1}
                                defaultValue={industry_knowledge1}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      size="small"
                                      variant="outlined"
                                      label={option}
                                      {...getTagProps({ index })}
                                      sx={{
                                        backgroundColor:
                                          "rgba(34, 51, 84, 0.1) !important",
                                        "& .MuiChip-deleteIcon": {
                                          color: "#d7282fd9",
                                        },
                                      }}
                                    />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Press enter after each industry knowledge"
                                    inputRef={industryRef}
                                    name="industry_knowledge1"
                                    onChange={(e) => {
                                      if (
                                        industry_knowledge1.includes(
                                          e?.target?.value?.trim()
                                        )
                                      ) {
                                        setIsTechnicalError("industry");
                                      } else {
                                        setIsTechnicalError("");
                                      }
                                    }}
                                    error={
                                      isTechnicalError == "industry" ||
                                      formik1?.errors?.industry_knowledge1
                                        ? true
                                        : false
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    helperText={
                                      isTechnicalError == "industry"
                                        ? "Duplicate not allowed!"
                                        : formik1?.errors?.industry_knowledge1
                                        ? formik1?.errors?.industry_knowledge1
                                        : ""
                                    }
                                  />
                                )}
                              />

                              {/* <Autocomplete
                                size="small"
                                sx={{ width: "100%" }}
                                limitTags={2}
                                onChange={(event: any, newValue) => {
                                  if (event?.key == "Backspace") {
                                    let keyword = [...industry_knowledge1];
                                    keyword?.pop();
                                    formik1.setFieldValue(
                                      "industry_knowledge1",
                                      keyword
                                    );
                                  } else {
                                    let keywordValues =
                                      event?.target?.value?.includes(",")
                                        ? [
                                            ...industry_knowledge1,
                                            ...event?.target?.value?.split(","),
                                          ]
                                        : newValue;
                                    formik1.setFieldValue(
                                      "industry_knowledge1",
                                      newValue
                                    );
                                    formik1.setFieldError(
                                      "industry_knowledge1",
                                      ""
                                    );
                                  }
                                }}
                                disableClearable={
                                  formik1.values.industry_knowledge1
                                    ? false
                                    : true
                                }
                                multiple
                                id="tags-filled"
                                options={[]}
                                value={industry_knowledge1}
                                defaultValue={industry_knowledge1}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      size="small"
                                      variant="outlined"
                                      label={option}
                                      {...getTagProps({ index })}
                                      sx={{
                                        backgroundColor:
                                          "rgba(34, 51, 84, 0.1) !important",
                                        "& .MuiChip-deleteIcon": {
                                          color: "#d7282fd9",
                                        },
                                      }}
                                    />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Press enter after each industry knowledge"
                                    onChange={(e) => {
                                      if (
                                        industry_knowledge1?.includes(
                                          e?.target?.value?.trim()
                                        )
                                      )
                                        setIsTechnicalError("industry");
                                      else {
                                        setIsTechnicalError("");
                                      }
                                    }}
                                    error={
                                      isTechnicalError == "industry" ||
                                      formik1?.errors?.industry_knowledge1
                                        ? true
                                        : false
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    helperText={
                                      isTechnicalError == "industry"
                                        ? "Duplicate not allowed!"
                                        : formik1?.errors?.industry_knowledge1
                                        ? formik1?.errors?.industry_knowledge1
                                        : ""
                                    }
                                  />
                                )}
                              /> */}

                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    color: "#4a4a4a",
                                    opacity: ".8",
                                  }}
                                >
                                  Please press the Enter key after typing each
                                  industry knowledge.
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: "400",
                                    color: "#717171",
                                  }}
                                >
                                  Demonstrate understanding of industry trends,
                                  regulations, and market dynamics. A seller in
                                  the oil and gas industry might showcase their
                                  knowledge of exploration and production
                                  techniques, environmental regulations, and
                                  geopolitical factors.
                                </Typography>
                              </Box>
                            </Stack>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} mt={-2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: "100%",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                        padding: "1px 0px 16px",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} lg={4}>
                          {editMode ? (
                            <LabelContainer
                              sx={{ display: "block !important" }}
                              breakPoints={breakPoints}
                            >
                              Sales Skills
                              <span style={{ color: "red" }}>*</span>
                            </LabelContainer>
                          ) : (
                            <LabelContainer breakPoints={breakPoints}>
                              Sales Skills
                            </LabelContainer>
                          )}
                        </Grid>
                        <Grid item xs={12} lg={8}>
                          {!editMode ? (
                            formik1.values.sales_skills1.length > 0 ? (
                              <p style={{ fontSize: "14px" }}>
                                {formik1.values.sales_skills1.map(
                                  (value, index) => (
                                    <span key={index}>
                                      {value}
                                      {/* {index <
                                        formik1.values.sales_skills1.length -
                                          1 
                                          // && "N/A"
                                          } */}
                                      {index <
                                        formik1.values.sales_skills1.length -
                                          1 && ", "}
                                    </span>
                                  )
                                )}
                              </p>
                            ) : (
                              <p style={{ fontSize: "14px" }}>N/A</p>
                            )
                          ) : (
                            <Stack sx={{ width: "100%" }}>
                              <Autocomplete
                                size="small"
                                sx={{ width: "100%" }}
                                limitTags={2}
                                onChange={(event: any, newValue) => {
                                  // Filter out empty spaces
                                  newValue = newValue.filter(
                                    (item: string) => item.trim() !== ""
                                  );

                                  if (event?.key == "Backspace") {
                                    let keyword = [...sales_skills1];
                                    keyword.pop();
                                    formik1.setFieldValue(
                                      "sales_skills1",
                                      keyword
                                    );
                                  } else {
                                    let keywordValues =
                                      event?.target?.value?.includes(",")
                                        ? [
                                            ...sales_skills1,
                                            ...event?.target?.value?.split(","),
                                          ]
                                        : newValue;
                                    keywordValues = keywordValues.filter(
                                      (item: string) => item.trim() !== ""
                                    );
                                    formik1.setFieldValue(
                                      "sales_skills1",
                                      keywordValues
                                    );
                                    formik1.setFieldError("sales_skills1", "");
                                  }
                                }}
                                disableClearable={
                                  formik1.values.sales_skills1 ? false : true
                                }
                                multiple
                                id="tags-filled"
                                options={[]}
                                value={sales_skills1}
                                defaultValue={sales_skills1}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      size="small"
                                      variant="outlined"
                                      label={option}
                                      {...getTagProps({ index })}
                                      sx={{
                                        backgroundColor:
                                          "rgba(34, 51, 84, 0.1) !important",
                                        "& .MuiChip-deleteIcon": {
                                          color: "#d7282fd9",
                                        },
                                      }}
                                    />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Press enter after each sales skills"
                                    name="sales_skills1"
                                    inputRef={salesRef}
                                    onChange={(e) => {
                                      if (
                                        sales_skills1.includes(
                                          e.target.value.trim()
                                        )
                                      ) {
                                        setIsTechnicalError("sales");
                                      } else {
                                        setIsTechnicalError("");
                                      }
                                    }}
                                    // onKeyDown={(e) => {
                                    //   if (
                                    //     e.key === "Enter" &&
                                    //     e.target.value.trim() === ""
                                    //   ) {
                                    //     e.preventDefault();
                                    //   }
                                    // }}
                                    error={
                                      isTechnicalError == "sales" ||
                                      formik1.errors.sales_skills1
                                        ? true
                                        : false
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    helperText={
                                      isTechnicalError == "sales"
                                        ? "Duplicate not allowed!"
                                        : formik1.errors.sales_skills1
                                        ? formik1.errors.sales_skills1
                                        : ""
                                    }
                                  />
                                )}
                              />

                              {/* <Autocomplete
                                size="small"
                                sx={{ width: "100%" }}
                                limitTags={2}
                                onChange={(event: any, newValue) => {
                                  if (event?.key == "Backspace") {
                                    let keyword = [...sales_skills1];
                                    keyword?.pop();
                                    formik1.setFieldValue(
                                      "sales_skills1",
                                      keyword
                                    );
                                  } else {
                                    let keywordValues =
                                      event?.target?.value?.includes(",")
                                        ? [
                                            ...sales_skills1,
                                            ...event?.target?.value?.split(","),
                                          ]
                                        : newValue;
                                    formik1.setFieldValue(
                                      "sales_skills1",
                                      newValue
                                    );
                                    formik1.setFieldError("sales_skills1", "");
                                  }
                                }}
                                disableClearable={
                                  formik1.values.sales_skills1 ? false : true
                                }
                                multiple
                                id="tags-filled"
                                options={[]}
                                value={sales_skills1}
                                defaultValue={sales_skills1}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                  value.map((option, index) => (
                                    <Chip
                                      size="small"
                                      variant="outlined"
                                      label={option}
                                      {...getTagProps({ index })}
                                      sx={{
                                        backgroundColor:
                                          "rgba(34, 51, 84, 0.1) !important",
                                        "& .MuiChip-deleteIcon": {
                                          color: "#d7282fd9",
                                        },
                                      }}
                                    />
                                  ))
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Press enter after each sales skills"
                                    onChange={(e) => {
                                      if (
                                        sales_skills1?.includes(
                                          e?.target?.value?.trim()
                                        )
                                      )
                                        setIsTechnicalError("sales");
                                      else {
                                        setIsTechnicalError("");
                                      }
                                    }}
                                    error={
                                      isTechnicalError == "sales" ||
                                      formik1?.errors?.sales_skills1
                                        ? true
                                        : false
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    helperText={
                                      isTechnicalError == "sales"
                                        ? "Duplicate not allowed!"
                                        : formik1?.errors?.sales_skills1
                                        ? formik1?.errors?.sales_skills1
                                        : ""
                                    }
                                  />
                                )}
                              /> */}
                              <Box>
                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: "600",
                                    color: "#4a4a4a",
                                    opacity: ".8",
                                  }}
                                >
                                  Please press the Enter key after typing each
                                  sales skills.
                                </Typography>

                                <Typography
                                  sx={{
                                    fontSize: "11px",
                                    fontWeight: "400",
                                    color: "#717171",
                                  }}
                                >
                                  Highlight sales experience, customer
                                  relationship management skills, and lead
                                  conversion capabilities. A sales engineer
                                  might showcase their ability to identify
                                  customer needs, propose technical solutions,
                                  and negotiate deals effectively.
                                </Typography>
                              </Box>
                            </Stack>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FieldsBoxCon>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#231f20",
                        }}
                      >
                        Additional Fields
                      </Typography>
                    </FieldsBoxCon>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "1px 0px 16px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Years of Experience
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Years of Experience
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        <p
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          {formik1.values.years_of_experience
                            ? formik.values.years_of_experience
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <CustomTextField
                            value={formik1.values.years_of_experience}
                            handleChange={(e) => {
                              const input = e.target;
                              const newValue = input.value;
                              const cursorPosition = input.selectionStart;
                              const removeSpace = newValue.replace(/\s/g, "");
                              const re = /^\d{0,3}$/;
                              if (!re.test(removeSpace)) {
                                formik1.setFieldError(
                                  "years_of_experience",
                                  "Maximum limit reached!"
                                );
                                return;
                              }
                              formik1.setFieldValue(
                                "years_of_experience",
                                removeSpace
                              );
                              formik1.setFieldTouched(
                                "years_of_experience",
                                true
                              );
                              if (newValue.includes(" ")) {
                                formik1.setFieldError(
                                  "years_of_experience",
                                  ""
                                );
                                setTimeout(() => {
                                  formik1.setFieldError(
                                    "years_of_experience",
                                    ""
                                  );
                                }, 2000);
                              } else {
                                formik1.setFieldError(
                                  "years_of_experience",
                                  ""
                                );
                              }
                              const cursorPositionAfterTrim =
                                cursorPosition -
                                (newValue.length - removeSpace.length);
                              requestAnimationFrame(() => {
                                input.setSelectionRange(
                                  cursorPositionAfterTrim,
                                  cursorPositionAfterTrim
                                );
                              });
                            }}
                            placeholder={"Enter years of experience"}
                            inputRef={techInputRef}
                            error={!!formik1.errors.years_of_experience}
                            errorText={formik1.errors.years_of_experience}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={12} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer
                          breakPoints={breakPoints}
                          sx={{ alignItems: "flex-start !important" }}
                        >
                          Language<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Language
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {Array.isArray(formik1.values.language)
                            ? formik1?.values?.language
                                ?.map(
                                  (v) =>
                                    languageOptions?.find((i) => i?.value == v)
                                      ?.label
                                )
                                .join(", ")
                            : ""}
                          {formik1?.values?.language?.length == 0 && "N/A"}
                        </p>
                      ) : (
                        <Box
                          sx={{
                            "&.MuiAutocomplete-listbox .MuiAutocomplete-option":
                              {},
                          }}
                        >
                          <Autocomplete
                            value={formik1.values.language.map(
                              (selectedLang) => {
                                return (
                                  languageOptions.find(
                                    (langOption) =>
                                      langOption.value === selectedLang
                                  ) || {}
                                );
                              }
                            )}
                            size="small"
                            multiple
                            id=""
                            options={languageOptions}
                            disableCloseOnSelect
                            ListboxProps={{
                              sx: {
                                maxHeight: 180,
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
                            disableClearable={
                              formik1.values.language ? false : true
                            }
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            getOptionLabel={(option) => option.label}
                            onChange={(e, newValue) => {
                              formik1.setFieldValue(
                                "language",
                                newValue.map((language) => language.value)
                              );
                              formik1.setFieldError("language", undefined);
                            }}
                            PaperComponent={(props) => (
                              <Paper
                                sx={{
                                  "& .MuiAutocomplete-option": {
                                    padding: "0 12px",
                                  },
                                  "& .MuiCheckbox-root": {
                                    padding: "2px 6px",
                                  },
                                }}
                                {...props}
                              />
                            )}
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <FormControlLabel
                                  sx={{ padding: "0px !important" }}
                                  control={
                                    <Checkbox
                                      checked={selected}
                                      sx={{
                                        "&.Mui-checked": {
                                          color: "#d7282f",
                                        },
                                        "& .MuiSvgIcon-root": {
                                          fontSize: "19px",
                                        },
                                      }}
                                    />
                                  }
                                  label={
                                    <Typography
                                      sx={{ fontSize: "13px", color: "#000" }}
                                    >
                                      {option.label}
                                    </Typography>
                                  }
                                />
                              </li>
                            )}
                            style={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select language"
                                error={
                                  formik1.touched.language &&
                                  Boolean(formik1.errors.language) &&
                                  !formik1.values.language.length
                                }
                                helperText={
                                  formik1.touched.language &&
                                  formik1.errors.language
                                }
                                inputRef={langInputRef}
                              />
                            )}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  label={option.label}
                                  {...getTagProps({ index })}
                                  sx={{
                                    backgroundColor:
                                      "rgba(34, 51, 84, 0.1)!important",
                                    "& .MuiChip-deleteIcon": {
                                      fontSize: "16px",
                                      color: "#d7282fd9 !important",
                                      "&:hover": {
                                        color: "rgba(0, 0, 0, 0.26) !important",
                                      },
                                    },
                                  }}
                                />
                              ))
                            }
                          />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Education<span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Education
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik1.values.education
                            ? formik1.values.education
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack sx={{ width: "100%" }}>
                          <CustomTextField
                            value={formik1.values.education}
                            handleChange={(e) => {
                              const input = e.target;
                              const newValue = input.value;
                              const cursorPosition = input.selectionStart;
                              if (newValue.length > 100) {
                                formik1.setFieldError(
                                  "education",
                                  "Education content is too long. Please limit it to 100 characters."
                                );
                                return;
                              }
                              const trimmedValue = newValue.trimStart();
                              if (trimmedValue !== newValue) {
                                formik1.setFieldValue(
                                  "education",
                                  trimmedValue
                                );
                                requestAnimationFrame(() => {
                                  input.selectionStart = input.selectionEnd =
                                    cursorPosition -
                                    (newValue.length - trimmedValue.length);
                                });
                              } else {
                                formik1.setFieldValue("education", newValue);
                                formik1.setFieldError("education", "");
                                requestAnimationFrame(() => {
                                  input.selectionStart = input.selectionEnd =
                                    cursorPosition;
                                });
                              }
                            }}
                            inputRef={educationRef}
                            placeholder={"Enter education"}
                            error={formik1.errors.education ? true : false}
                            errorText={formik1.errors.education}
                          />
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "400",
                                color: "#717171",
                              }}
                            >
                              Please provide information about your educational
                              background, including degrees, institutions, and
                              graduation years.
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Certifications<span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Certifications
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik1.values.certification
                            ? formik1.values.certification
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack sx={{ width: "100%" }}>
                          <CustomTextField
                            value={formik1.values.certification}
                            handleChange={(e) => {
                              const input = e.target;
                              const newValue = input.value;
                              const cursorPosition = input.selectionStart;
                              if (newValue.length > 300) {
                                formik1.setFieldError(
                                  "certification",
                                  "Certifications content is too long. Please limit it to 300 characters."
                                );
                                return;
                              }
                              const trimmedValue = newValue.trimStart();
                              if (trimmedValue !== newValue) {
                                formik1.setFieldValue(
                                  "certification",
                                  trimmedValue
                                );
                                requestAnimationFrame(() => {
                                  input.selectionStart = input.selectionEnd =
                                    cursorPosition -
                                    (newValue.length - trimmedValue.length);
                                });
                              } else {
                                formik1.setFieldValue(
                                  "certification",
                                  newValue
                                );
                                formik1.setFieldError("certification", "");
                                requestAnimationFrame(() => {
                                  input.selectionStart = input.selectionEnd =
                                    cursorPosition;
                                });
                              }
                            }}
                            inputRef={certificateRef}
                            placeholder={"Enter certification"}
                            error={formik1.errors.certification ? true : false}
                            errorText={formik1.errors.certification}
                          />

                          <Box>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "400",
                                color: "#717171",
                              }}
                            >
                              List any relevant sales certifications or
                              qualifications you hold, demonstrating your
                              expertise in the field.
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",

                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Location<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Location
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik1.values.location
                            ? formik1.values.location
                            : "N/A"}
                        </p>
                      ) : (
                        <CustomTextField
                          value={formik1.values.location}
                          handleChange={(e) => {
                            const input = e.target;
                            const newValue = input.value;
                            const cursorPosition = input.selectionStart;
                            if (newValue.length > 100) {
                              formik1.setFieldError(
                                "location",
                                "Location content is too long. Please limit it to 100 characters."
                              );
                              return;
                            }
                            const trimmedValue = newValue.trimStart();
                            if (trimmedValue !== newValue) {
                              const trimmedValue = newValue.trimStart();
                              formik1.setFieldValue("location", trimmedValue);
                              requestAnimationFrame(() => {
                                input.selectionStart = input.selectionEnd =
                                  cursorPosition -
                                  (newValue.length - trimmedValue.length);
                              });
                            } else {
                              formik1.setFieldValue("location", newValue);
                              formik1.setFieldError("location", "");
                              requestAnimationFrame(() => {
                                input.selectionStart = input.selectionEnd =
                                  cursorPosition;
                              });
                            }
                          }}
                          inputRef={locationRef}
                          placeholder={"Enter location"}
                          error={formik1.errors.location ? true : false}
                          errorText={formik1.errors.location}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    padding: "16px 0px",
                    display: "flex",

                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Time Zone Settings
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Time Zone Settings
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik1.values.time_zone
                            ? formik1.values.time_zone
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(event: any, newValue) => {
                              formik1.setFieldValue(
                                "time_zone",
                                newValue?.tzCode
                              );
                              formik1.setFieldError("time_zone", "");
                            }}
                            value={sellerTimeZoneValue}
                            defaultValue={sellerTimeZoneValue}
                            id="free-solo-demo-time-zone"
                            options={TimeZone_List.map((v) => ({
                              label: v.label,
                              name: v.name,
                              tzCode: v.tzCode,
                            }))}
                            ListboxProps={{
                              sx: {
                                maxHeight: 150,
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
                            getOptionLabel={(option: any) => `${option.tzCode}`}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                {option.tzCode}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <>
                                <TextField
                                  size="medium"
                                  placeholder="Select time zone settings"
                                  {...params}
                                  error={
                                    formik1.errors.time_zone ? true : false
                                  }
                                  helperText={formik1.errors.time_zone}
                                  inputRef={timeRef}
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </OuterContainer>
        </ContentInnerContainer>
      ) : (
        <ContentInnerContainer
          breakPoints={breakPoints}
          sx={{ marginBottom: "24px !important" }}
        >
          <ContainerHeader breakPoints={breakPoints}>
            <ContainerHeaderText>Job Details</ContainerHeaderText>
            <ContainerHeaderDescription>
              Manage Information Related to your Job Details
            </ContainerHeaderDescription>
            {!editMode ? (
              <FloatingEditIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  formik.setFieldValue("editMode", true);
                }}
              >
                <PencilIcon>
                  <Image
                    src={"/assets/EditPencil.svg"}
                    layout="fill"
                    alt="editImage"
                  />
                </PencilIcon>{" "}
                {profileInfos?.jobDetails?.job_role ? "Edit" : "Add"}
              </FloatingEditIcon>
            ) : (
              <FloatingEditIcon breakPoints={breakPoints}>
                <CancelLink
                  onClick={() => {
                    cancelBuyerEditing();
                  }}
                >
                  <CloseIcon />
                  <Box
                    sx={{
                      "@media screen and (max-width:320px)": {
                        display: "none",
                      },
                    }}
                  >
                    Cancel
                  </Box>
                </CancelLink>
                <Button type="submit" sx={{ padding: "0px", minWidth: "auto" }}>
                  <SaveLink onClick={formik.handleSubmit}>
                    {!loader ? (
                      <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                    ) : (
                      ""
                    )}
                    {loader ? (
                      <ThreeDots
                        height="30"
                        width="60"
                        radius="5"
                        color="#d32f2f"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                      />
                    ) : (
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          "@media screen and (max-width:320px)": {
                            display: "none",
                          },
                        }}
                      >
                        Save
                      </Box>
                    )}
                  </SaveLink>
                </Button>
              </FloatingEditIcon>
            )}
          </ContainerHeader>
          <OuterContainer>
            <Grid container spacing={editMode ? 2 : 2}>
              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Job Title<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Job Title
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {convertUnderscoreToSpaceAndCapitalize(
                            formik.values.job_role1
                              ? formik.values.job_role1
                              : "N/A"
                          )}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(e, newValue) => {
                              formik.setFieldValue(
                                "job_role1",
                                newValue?.label
                              );
                              formik.setFieldError("job_role1", "");
                            }}
                            ListboxProps={{
                              sx: {
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
                            disableClearable={
                              formik.values.job_role1 ? false : true
                            }
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            filterOptions={(options, { inputValue }) => {
                              if (
                                inputValue.trim() === "" &&
                                inputValue !== ""
                              ) {
                                return [];
                              }
                              if (inputValue === "") {
                                return options;
                              }
                              return options.filter((option) =>
                                option.label
                                  .toLowerCase()
                                  .includes(inputValue.toLowerCase())
                              );
                            }}
                            value={formik.values.job_role1 || ""}
                            id="free-solo-demo"
                            options={jobtitles}
                            placeholder="Select job title"
                            renderInput={(params) => (
                              <>
                                <TextField
                                  {...params}
                                  autoComplete="new-password"
                                  size="small"
                                  name="industryExpertise"
                                  placeholder="Select job title"
                                  helperText={formik.errors.job_role1}
                                  error={formik.errors.job_role1 ? true : false}
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Industry Expertise
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Industry Expertise
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {convertUnderscoreToSpaceAndCapitalize(
                            formik.values.industry_expertise
                              ? formik.values.industry_expertise
                              : "N/A"
                          )}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(e, newValue) => {
                              formik.setFieldValue(
                                "industry_expertise",
                                newValue?.label
                              );
                              formik.setFieldError("industry_expertise", "");
                            }}
                            disableClearable={
                              formik.values.industry_expertise ? false : true
                            }
                            ListboxProps={{
                              sx: {
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
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            filterOptions={(options, { inputValue }) => {
                              if (
                                inputValue.trim() === "" &&
                                inputValue !== ""
                              ) {
                                return [];
                              }
                              if (inputValue === "") {
                                return options;
                              }
                              return options.filter((option) =>
                                option.label
                                  .toLowerCase()
                                  .includes(inputValue.toLowerCase())
                              );
                            }}
                            value={formik.values.industry_expertise || ""}
                            id="free-solo-demo"
                            options={IndustryExpertise}
                            placeholder="Select industry Expertise"
                            renderInput={(params) => (
                              <>
                                <TextField
                                  {...params}
                                  autoComplete="new-password"
                                  size="small"
                                  name="industryExpertise"
                                  placeholder="Select industry Expertise"
                                  helperText={formik.errors.industry_expertise}
                                  error={
                                    formik.errors.industry_expertise
                                      ? true
                                      : false
                                  }
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Department<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Department
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik.values.job_function
                            ? formik.values.job_function
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <CustomTextField
                            placeholder="Enter department"
                            value={formik.values.job_function}
                            handleChange={(e) => {
                              formik.setFieldValue(
                                "job_function",
                                e.target.value
                              ),
                                formik.setFieldError("job_function", "");
                            }}
                            error={formik.errors.job_function ? true : false}
                            errorText={formik.errors.job_function}
                            helperText={
                              formik.touched.job_function &&
                              formik.errors.job_function
                            }
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Purchasing Authority
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Purchasing Authority
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik.values.purchasing_authority
                            ? formik.values.purchasing_authority
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(e, newValue) => {
                              formik.setFieldValue(
                                "purchasing_authority",
                                newValue?.label
                              );
                              formik.setFieldError("purchasing_authority", "");
                            }}
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            disableClearable={
                              formik.values.purchasing_authority ? false : true
                            }
                            value={formik.values.purchasing_authority || ""}
                            id="free-solo-demo"
                            options={PurchasingAuthority}
                            renderInput={(params) => (
                              <>
                                <TextField
                                  {...params}
                                  autoComplete="new-password"
                                  size="small"
                                  name="purchasingAuthority"
                                  placeholder="Select purchasing authority"
                                  helperText={
                                    formik.errors.purchasing_authority
                                  }
                                  error={
                                    formik.errors.purchasing_authority
                                      ? true
                                      : false
                                  }
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={12} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Procurement Priorities
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Procurement Priorities
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik.values.procurement_priorities
                            ? formik.values.procurement_priorities
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            onChange={(e, newValue) => {
                              formik.setFieldValue(
                                "procurement_priorities",
                                newValue?.label
                              );
                              formik.setFieldError(
                                "procurement_priorities",
                                ""
                              );
                            }}
                            disableClearable={
                              formik.values.procurement_priorities
                                ? false
                                : true
                            }
                            slotProps={{
                              popper: {
                                sx: {
                                  zIndex: 1000,
                                },
                              },
                            }}
                            placeholder="Procurement Priorities"
                            value={formik.values.procurement_priorities || ""}
                            id="free-solo-demo"
                            options={ProcurementPriorities}
                            renderInput={(params) => (
                              <>
                                <TextField
                                  {...params}
                                  autoComplete="new-password"
                                  size="small"
                                  name="purchasingAuthority"
                                  placeholder="Select procurement priority"
                                  helperText={
                                    formik.errors.procurement_priorities
                                  }
                                  error={
                                    formik.errors.procurement_priorities
                                      ? true
                                      : false
                                  }
                                />
                              </>
                            )}
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <FieldsBoxCon>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#231f20",
                    }}
                  >
                    Technical and Procurement Expertise
                  </Typography>
                </FieldsBoxCon>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Technical Expertise
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Technical Expertise
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        formik.values.technical_expertise.length > 0 ? (
                          <p style={{ fontSize: "14px" }}>
                            {formik.values.technical_expertise.map(
                              (value, index) => (
                                <span key={index}>
                                  {value}
                                  {index <
                                    formik.values.technical_expertise.length -
                                      1 && ", "}
                                </span>
                              )
                            )}
                          </p>
                        ) : (
                          <p style={{ fontSize: "14px" }}>N/A</p>
                        )
                      ) : (
                        <Stack sx={{ width: "100%" }}>
                          <Autocomplete
                            size="small"
                            sx={{ width: "100%" }}
                            limitTags={2}
                            onChange={(event: any, newValue) => {
                              let value = newValue
                                .map((v) => FirstletterCapital(v?.trim()))
                                ?.filter(Boolean);

                              if (newValue != null) {
                                formik.setFieldValue(
                                  "technical_expertise",
                                  value
                                );
                                formik.setFieldError("technical_expertise", "");
                              }
                            }}
                            disableClearable={
                              formik.values.technical_expertise ? false : true
                            }
                            onKeyDown={(
                              event: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                              const inputValue =
                                event.currentTarget["value"]?.trim();
                              if (inputValue) {
                                if (
                                  event.key === "Enter" &&
                                  !event.defaultPrevented
                                ) {
                                  event.preventDefault();
                                  const inputValue =
                                    event.currentTarget["value"]?.trim();
                                  if (inputValue !== "") {
                                    const updatedValue = [
                                      ...technical_expertise,
                                      inputValue,
                                    ];
                                    formik.setFieldValue(
                                      "technical_expertise",
                                      updatedValue
                                    );
                                    formik.setFieldError(
                                      "technical_expertise",
                                      ""
                                    );
                                  }
                                }
                              }
                            }}
                            multiple
                            id="tags-filled"
                            options={[]}
                            value={technical_expertise}
                            defaultValue={technical_expertise}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  label={option}
                                  {...getTagProps({ index })}
                                  sx={{
                                    backgroundColor:
                                      "rgba(34, 51, 84, 0.1) !important",
                                    "& .MuiChip-deleteIcon": {
                                      color: "#d7282fd9",
                                    },
                                  }}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Press enter after each technical expertise"
                                error={
                                  formik.errors.technical_expertise
                                    ? true
                                    : false
                                }
                                helperText={formik.errors.technical_expertise}
                              />
                            )}
                          />

                          <Box>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#4a4a4a",
                                opacity: ".8",
                              }}
                            >
                              Please press the Enter key after typing each
                              technical expertise.
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "400",
                                color: "#717171",
                              }}
                            >
                              List technical skills and knowledge relevant to
                              specific products, technologies, or industries.
                              For instance, a buyer in the power generation
                              industry might highlight their expertise in
                              electrical systems, renewable energy sources, and
                              energy efficiency technologies.
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Industry Knowledge
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Industry Knowledge
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        formik.values.industry_knowledge.length > 0 ? (
                          <p style={{ fontSize: "14px" }}>
                            {formik.values.industry_knowledge.map(
                              (value, index) => (
                                <span key={index}>
                                  {value}
                                  {index <
                                    formik.values.industry_knowledge.length -
                                      1 && ", "}
                                </span>
                              )
                            )}
                          </p>
                        ) : (
                          <p style={{ fontSize: "14px" }}>N/A</p>
                        )
                      ) : (
                        <>
                          {" "}
                          <Autocomplete
                            size="small"
                            sx={{ width: "100%" }}
                            limitTags={2}
                            onChange={(event: any, newValue) => {
                              // Filter out empty spaces
                              newValue = newValue.filter(
                                (item: string) => item.trim() !== ""
                              );

                              if (event?.key == "Backspace") {
                                let keyword = [...industry_knowledge];
                                keyword.pop();
                                formik.setFieldValue(
                                  "industry_knowledge",
                                  keyword
                                );
                              } else {
                                let keywordValues =
                                  event?.target?.value?.includes(",")
                                    ? [
                                        ...industry_knowledge,
                                        ...event?.target?.value?.split(","),
                                      ]
                                    : newValue;
                                keywordValues = keywordValues.filter(
                                  (item: string) => item.trim() !== ""
                                );
                                formik.setFieldValue(
                                  "industry_knowledge",
                                  keywordValues
                                );
                                formik.setFieldError("industry_knowledge", "");
                              }
                            }}
                            disableClearable={
                              formik.values.industry_knowledge ? false : true
                            }
                            multiple
                            id="tags-filled"
                            options={[]}
                            value={industry_knowledge}
                            defaultValue={industry_knowledge}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  label={option}
                                  {...getTagProps({ index })}
                                  sx={{
                                    backgroundColor:
                                      "rgba(34, 51, 84, 0.1) !important",
                                    "& .MuiChip-deleteIcon": {
                                      color: "#d7282fd9",
                                    },
                                  }}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Press enter after each industry knowledge"
                                onChange={(e) => {
                                  if (
                                    industry_knowledge.includes(
                                      e?.target?.value?.trim()
                                    )
                                  ) {
                                    setIsTechnicalError("industry");
                                  } else {
                                    setIsTechnicalError("");
                                  }
                                }}
                                error={
                                  isTechnicalError == "industry" ||
                                  formik?.errors?.industry_knowledge
                                    ? true
                                    : false
                                }
                                InputLabelProps={{ shrink: true }}
                                helperText={
                                  isTechnicalError == "industry"
                                    ? "Duplicate not allowed!"
                                    : formik?.errors?.industry_knowledge
                                    ? formik?.errors?.industry_knowledge
                                    : ""
                                }
                              />
                            )}
                          />
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#4a4a4a",
                                opacity: ".8",
                              }}
                            >
                              Please press the Enter key after typing each
                              industry knowledge.
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "400",
                                color: "#717171",
                              }}
                            >
                              Demonstrate understanding of industry trends,
                              challenges, and future directions. A buyer in the
                              oil and gas industry might showcase their
                              knowledge of digitalization, automation, and
                              decarbonization initiatives.
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FieldsBoxCon>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#231f20",
                    }}
                  >
                    Additional Fields
                  </Typography>
                </FieldsBoxCon>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer
                          sx={{ display: "block !important" }}
                          breakPoints={breakPoints}
                        >
                          Years of Experience
                          <span style={{ color: "red" }}>*</span>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Years of Experience
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik.values.years_of_experience
                            ? formik.values.years_of_experience
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack spacing={2} sx={{ width: "100%" }}>
                          <CustomTextField
                            value={formik.values.years_of_experience}
                            handleChange={(e) => {
                              const re = /^\d{0,2}$/;

                              if (re.test(e.target.value)) {
                                formik.setFieldValue(
                                  "years_of_experience",
                                  e.target.value
                                );
                                formik.setFieldError("years_of_experience", "");
                              }
                            }}
                            placeholder={"Enter year of experience"}
                            error={
                              formik.errors.years_of_experience ? true : false
                            }
                            errorText={formik.errors.years_of_experience}
                            helperText={
                              formik.touched.years_of_experience &&
                              formik.errors.years_of_experience
                            }
                          />
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                    "@media screen and (max-width:1200px)": {
                      paddingTop: "0px",
                    },
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={4}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Location<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Location
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={8}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik.values.location
                            ? formik.values.location
                            : "N/A"}
                        </p>
                      ) : (
                        <CustomTextField
                          value={formik.values.location}
                          handleChange={(e) => {
                            const newValue = e.target.value;
                            if (newValue.length > 100) {
                              formik.setFieldError(
                                "location",
                                "Location content is too long. Please limit it to 100 characters."
                              );
                              return;
                            } else {
                              if (
                                !newValue.startsWith(" ") ||
                                newValue.trim().length > 0
                              ) {
                                formik.setFieldValue("location", newValue);
                                formik.setFieldError("location", "");
                              }
                            }
                          }}
                          placeholder={"Enter location"}
                          error={formik.errors.location ? true : false}
                          errorText={formik.errors.location}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={12} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Language<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Language
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {Array.isArray(formik.values.language)
                            ? formik?.values?.language
                                ?.map(
                                  (v) =>
                                    languageOptions?.find((i) => i?.value == v)
                                      ?.label
                                )
                                .join(", ")
                            : ""}
                          {formik?.values?.language?.length == 0 && "N/A"}
                        </p>
                      ) : (
                        <Autocomplete
                          value={formik.values.language.map((selectedLang) => {
                            return (
                              languageOptions.find(
                                (langOption) =>
                                  langOption.value === selectedLang
                              ) || {}
                            );
                          })}
                          size="small"
                          multiple
                          id=""
                          options={languageOptions}
                          disableCloseOnSelect
                          disableClearable={
                            formik.values.language ? false : true
                          }
                          placeholder="Select Language"
                          getOptionLabel={(option) => option.label}
                          ListboxProps={{
                            sx: {
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
                          slotProps={{
                            popper: {
                              sx: {
                                zIndex: 1000,
                              },
                            },
                          }}
                          onChange={(e, newValue) => {
                            formik.setFieldValue(
                              "language",
                              newValue.map((language) => language?.value)
                            );
                            formik.setFieldError("language", undefined);
                          }}
                          PaperComponent={(props) => (
                            <Paper
                              sx={{
                                "& .MuiAutocomplete-option": {
                                  padding: "0 12px",
                                },
                                "& .MuiCheckbox-root": {
                                  padding: "6px",
                                },
                              }}
                              {...props}
                            />
                          )}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={selected}
                                    sx={{
                                      "&.Mui-checked": {
                                        color: "#d7282f",
                                      },
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "19px",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  <Typography
                                    sx={{ fontSize: "13px", color: "#000" }}
                                  >
                                    {option.label}
                                  </Typography>
                                }
                              />
                            </li>
                          )}
                          style={{ width: "100%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select language"
                              error={
                                formik.touched.language &&
                                Boolean(formik.errors.language) &&
                                !formik.values.language.length
                              }
                              helperText={
                                formik.touched.language &&
                                formik.errors.language
                              }
                            />
                          )}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                size="small"
                                variant="outlined"
                                label={option.label}
                                {...getTagProps({ index })}
                                sx={{
                                  backgroundColor:
                                    "rgba(34, 51, 84, 0.1)!important",
                                  "& .MuiChip-deleteIcon": {
                                    fontSize: "16px",
                                    color: "#d7282fd9 !important",
                                    "&:hover": {
                                      color: "rgba(0, 0, 0, 0.26) !important",
                                    },
                                  },
                                }}
                              />
                            ))
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={12} mt={-2}>
                <Box
                  sx={{
                    height: "100%",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: "16px 0px",
                    display: "flex",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={2}>
                      {editMode ? (
                        <LabelContainer breakPoints={breakPoints}>
                          Education<div style={{ color: "red" }}>*</div>
                        </LabelContainer>
                      ) : (
                        <LabelContainer breakPoints={breakPoints}>
                          Education
                        </LabelContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      {!editMode ? (
                        <p style={{ fontSize: "14px" }}>
                          {formik.values.education
                            ? formik.values.education
                            : "N/A"}
                        </p>
                      ) : (
                        <Stack sx={{ width: "100%" }}>
                          <CustomTextField
                            value={formik.values.education}
                            handleChange={(e) => {
                              const input = e.target;
                              const newValue = input.value;
                              const cursorPosition = input.selectionStart;
                              if (newValue.length > 100) {
                                formik.setFieldError(
                                  "education",
                                  "Education content is too long. Please limit it to 100 characters."
                                );
                                return;
                              }
                              const trimmedValue = newValue.trimStart();
                              if (trimmedValue !== newValue) {
                                formik.setFieldValue("education", trimmedValue);
                                requestAnimationFrame(() => {
                                  input.selectionStart = input.selectionEnd =
                                    cursorPosition -
                                    (newValue.length - trimmedValue.length);
                                });
                              } else {
                                formik.setFieldValue("education", newValue);
                                formik.setFieldError("education", "");
                                requestAnimationFrame(() => {
                                  input.selectionStart = input.selectionEnd =
                                    cursorPosition;
                                });
                              }
                            }}
                            placeholder={"Enter education"}
                            error={formik.errors.education ? true : false}
                            errorText={formik.errors.education}
                          />
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: "400",
                                color: "#717171",
                              }}
                            >
                              Please provide information about your educational
                              background, including degrees, institutions, and
                              graduation years.
                            </Typography>
                          </Box>
                        </Stack>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Grid container spacing={1} alignItems={"center"}>
                  <Grid item xs={12} lg={4}>
                    {editMode ? (
                      <LabelContainer
                        sx={{ display: "block !important" }}
                        breakPoints={breakPoints}
                      >
                        Time Zone Settings
                        <span style={{ color: "red" }}>*</span>
                      </LabelContainer>
                    ) : (
                      <LabelContainer breakPoints={breakPoints}>
                        Time Zone Settings
                      </LabelContainer>
                    )}
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    {!editMode ? (
                      <p style={{ fontSize: "14px" }}>
                        {formik.values.time_zone1
                          ? formik.values.time_zone1
                          : "N/A"}
                      </p>
                    ) : (
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <Autocomplete
                          size="small"
                          onChange={(event: any, newValue) => {
                            formik.setFieldValue(
                              "time_zone1",
                              newValue?.tzCode
                            );
                            formik.setFieldError("time_zone1", "");
                          }}
                          disableClearable={
                            formik.values.time_zone1 ? false : true
                          }
                          value={TimeZone_List?.find(
                            (v) => v?.tzCode == formik.values.time_zone1
                          )}
                          defaultValue={TimeZone_List.find(
                            (v) => v?.tzCode == formik.values.time_zone1
                          )}
                          popupIcon={<ArrowDropDownIcon />}
                          id="free-solo-demo-time-zone"
                          options={TimeZone_List}
                          getOptionLabel={(option: any) => `${option?.tzCode}`}
                          ListboxProps={{
                            sx: {
                              maxHeight: 200,
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
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              {option.tzCode}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <>
                              <TextField
                                size="medium"
                                placeholder="Select time zone settings"
                                {...params}
                                error={formik.errors.time_zone1 ? true : false}
                                helperText={formik.errors.time_zone1}
                              />
                            </>
                          )}
                        />
                      </Stack>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </OuterContainer>
        </ContentInnerContainer>
      )}
    </>
  );
};

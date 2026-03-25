import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  RadioProps,
  Skeleton,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import useAppContext from "@/hooks/useAppContext";
import { countriesList as countries } from "@/utils/countriesphp";
import { CustomTextField } from "@/components/common/customTextField";
import {
  ContainerHeader,
  ContainerHeaderDescription,
  ContainerHeaderText,
  ContentInnerContainer,
  FloatingEditIcon,
  LabelContainer,
  OuterContainer,
  PencilIcon,
  CancelLink,
  SaveLink,
} from "@/components/profile/common";
import Image from "next/image";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CountrySelect from "@/components/common/countrydropdown/Index";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { AboutDescription, CompanyProfileAAbout } from "../styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  apiClient,
  averageSourceOptions,
  primarySourcingPurpose,
} from "@/components/common/common";
import { FileUpload } from "@/components/common/uploadFile";
import { getCompanyProfile } from "@/hooks/company";
import { useAppDispatch } from "redux/store";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { profileData } from "@/hooks/appReducers";

import BannerImage from "./BannerImage";
import StateSelect from "@/components/common/countrydropdown/states";
import CitiesStates from "@/components/common/CityStateDropdown";

import {
  DescriptionTextContainer,
  FullFieldContainer,
} from "@/components/CompanySettings/CompanyDetail/commonStyles";
export const AdditionalInfo = ({ defaultValues }) => {
  const [descriptionLimit, setDescriptionLimit] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const { role } = useSelector((state: any) => state.userData);
  const [otherPlatforms, setOtherPlatforms] = useState([]);
  const { breakPoints } = useAppContext();
  const [skelton, setSkelton] = useState(false);
  const dispatch = useAppDispatch();
  const { companyDetails } = useSelector((state: any) => state.companyProfile);
  const [isOtherCheckboxChecked, setIsOtherCheckboxChecked] = useState(false);
  const [otherPlatformsError, setOtherPlatformsError] = useState(false);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const validation = Yup.object().shape({
    description: Yup.string().required("Please enter about your company"),
    postal_code: Yup.string().required("Please enter postal code").trim(),
    country_id: Yup.string().required("Please select country").nullable(),
    city: Yup.string().required("Please select city").nullable(),
    op_region_state_province: Yup.string()
      .required("Please select region/state/province")
      .nullable(),
    op_street_address: Yup.string().required("Please enter street address"),
    ...(role == "seller" && {
      minisite_footer_banner: Yup.string().required("Please select an image"),
    }),
    minisite_footer_banner_name: Yup.string().nullable(),
    factory_name: Yup.string().required("Please enter factory name"),
    average_sourcing_frequency: Yup.string().required(
      "Please select average sourcing frequency"
    ),

    primary_sourcing_purpose: Yup.array().min(
      1,
      "Please check at least one primary sourcing purpose"
    ),
  });
  let otherdata;
  useEffect(() => {
    otherdata = formik?.values?.primary_sourcing_purpose.filter(
      (item) => !primarySourcingPurpose?.some((ele) => ele.name === item)
    );
    if (otherdata?.length > 0) {
      setOtherPlatforms(otherdata);
      setIsOtherCheckboxChecked(true);
    } else {
      setOtherPlatforms([]);
      setIsOtherCheckboxChecked(false);
    }
  }, [defaultValues]);

  let formik: any = useFormik({
    initialValues: {
      description: defaultValues?.description ?? "",
      postal_code: defaultValues?.postal_code ?? "",
      country_id: defaultValues?.country_id ?? "",
      city: defaultValues?.city ?? "",
      op_street_address: defaultValues?.op_street_address ?? "",
      op_region_state_province: defaultValues?.op_region_state_province ?? "",
      op_lats: defaultValues?.op_lats ?? "",
      op_longs: defaultValues?.op_longs ?? "",
      address: defaultValues?.address ?? "",
      editMode: false,
      minisite_footer_banner: defaultValues?.minisite_footer_banner ?? "",
      slogan: defaultValues?.slogan ?? "",
      factory_name: defaultValues?.factory_name ?? "",
      minisite_footer_banner_name:
        defaultValues?.minisite_footer_banner_name ?? "",
      average_sourcing_frequency:
        defaultValues?.average_sourcing_frequency ?? "",
      primary_sourcing_purpose:
        defaultValues?.primary_sourcing_purpose?.split(",") ?? [],
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (!values.primary_sourcing_purpose.length) {
        formik.setFieldError(
          "primary_sourcing_purpose",
          "Please select a primary sourcing purpose"
        );
        return;
      } else if (isOtherCheckboxChecked) {
        if (!otherPlatforms.length) {
          formik.setFieldError(
            "primary_sourcing_purpose",
            "Please enter other primary sourcing purpose"
          );
          return;
        }
      } else if (descriptionLimit) {
        formik.setFieldError(
          "description",
          "About your company content is too long. Please limit it to 4000 characters!"
        );
        return;
      } else if (role == "seller" && !minisite_footer_banner) {
        formik.setFieldError("minisite_footer_banner", "Please select image");
        return;
      } else if (
        values.primary_sourcing_purpose.length > 0 &&
        otherPlatforms.length > 0
      ) {
        formik.setFieldError("primary_sourcing_purpose", "");
      }
      setLoader(true);
      const {
        description,
        postal_code,
        country_id,
        city,
        op_street_address,
        op_region_state_province,
        op_lats,
        op_longs,
        address,
        slogan,
        factory_name,
        average_sourcing_frequency,
        primary_sourcing_purpose
      } = values;

      await UploadBanner(values.minisite_footer_banner);

      // const payload = formik?.values?.primary_sourcing_purpose.filter((item) =>
      //   primarySourcingPurpose?.some((ele) => ele.name === item)
      // );
      // let finalPrimarySourcingPurpose = "";
      // if (isOtherCheckboxChecked && otherPlatforms.length) {
      //   finalPrimarySourcingPurpose = otherPlatforms.join(",");
      // } else if (!isOtherCheckboxChecked) {
      //     finalPrimarySourcingPurpose = formik?.values?.primary_sourcing_purpose?.join(","); 
      //   }


      let finalPrimarySourcingPurpose = "";
      if (!isOtherCheckboxChecked) {
        finalPrimarySourcingPurpose = formik?.values?.primary_sourcing_purpose?.join(","); 
      } else if (isOtherCheckboxChecked && otherPlatforms.length) {
        finalPrimarySourcingPurpose = otherPlatforms.join(",");
      }

      let response = await apiClient("company_profile/updateProfile", "post", {
        body: {
          description,
          postal_code,
          country_id,
          city,
          op_street_address,
          op_region_state_province,
          op_lats,
          op_longs,
          address,
          slogan,
          factory_name,
          average_sourcing_frequency,
          primary_sourcing_purpose: finalPrimarySourcingPurpose,
        },
      });
      if (response.status == 200) {
        await dispatch(getCompanyProfile());
        dispatch(profileData());
        formik.setFieldValue("editMode", false);
        let userData = localStorage.userData
          ? JSON.parse(localStorage.userData)
          : null;
        if (userData) {
          localStorage.setItem(
            "userData",
            JSON.stringify({ ...userData, industry })
          );
        }
      } else if (
        response.status == false &&
        response.message ==
          "The factory name already exists. Please choose a different name."
      ) {
        formik.setFieldError("factory_name", response.message);
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (companyDetails) {
        setSkelton(false);
      } else {
        setSkelton(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const UploadBanner = async (minisite_footer_banner) => {
    if (typeof minisite_footer_banner != "string") {
      const formData = new FormData();
      formData.append("minisite_footer_banner", minisite_footer_banner);
      formData.append(
        "minisite_footer_banner_name",
        minisite_footer_banner_name
      );
      const response = await apiClient(
        `company_profile/updateProfile`,
        "post",
        { body: formData },
        true
      );
      return response;
    } else {
      return true;
    }
  };


  const scrollToElement = (id) => {
    const element = document.getElementById("Label");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const returnCountryFromCode = (code) => {
    return countries.find((ele) => ele?.code == code)?.name || "";
  };

  const [isError, setIsError] = useState(false);
  const {
    description,
    industry,
    country_id,
    city,
    editMode,
    op_street_address,
    address,
    slogan,
    minisite_footer_banner,
    factory_name,
    minisite_footer_banner_name,
    average_sourcing_frequency,
    primary_sourcing_purpose,
  } = formik.values;
  const CancelEditing = () => {
    if (editMode) {
      formik.resetForm();
      formik.setFieldValue("editMode", false);
    } else {
      formik.setFieldValue("description", defaultValues?.description ?? "");
      formik.setFieldValue("postal_code", defaultValues?.postal_code ?? "");
      formik.setFieldValue("country_id", defaultValues?.country_id ?? "");
      formik.setFieldValue("city", defaultValues?.city ?? "");
      formik.setFieldValue("address", defaultValues?.address ?? "");
      formik.setFieldValue(
        "op_street_address",
        defaultValues?.op_street_address ?? ""
      );
      formik.setFieldValue(
        "op_region_state_province",
        defaultValues?.op_region_state_province ?? ""
      );
      formik.setFieldValue("op_lats", defaultValues?.op_lats ?? "");
      formik.setFieldValue("op_longs", defaultValues?.op_longs ?? "");
      formik.setFieldValue(
        "minisite_footer_banner",
        defaultValues?.minisite_footer_banner ?? ""
      );
      formik.setFieldValue(
        "minisite_footer_banner_name",
        defaultValues?.minisite_footer_banner_name ?? ""
      );
    }
  };

  const handleOtherCheckboxChange = (e: any) => {

    const { checked } = e.target;
    setIsOtherCheckboxChecked(checked);
    if (!checked) {
      setOtherPlatforms([]);
      return;
    }
    let updatedValues = [...formik.values.primary_sourcing_purpose];
    if (checked) {
      if (!updatedValues.includes("Other")) {
        updatedValues.push("Other");
      }
    } else {
      updatedValues = updatedValues.filter((item) => item !== "Other");
      setOtherPlatforms([]);
    }
    formik.setFieldValue("primary_sourcing_purpose", updatedValues);
  };

  const handleInputChange = (e) => {
    formik.setFieldError("primary_sourcing_purpose", "");
    const newValue = e.target.value;
    if (
      otherPlatforms.includes(newValue) ||
      primarySourcingPurpose.some(
        (item) => item.name.toLowerCase() === newValue.toLowerCase()
      )
    ) {
      setIsError(true);
      setOtherPlatformsError(false);
    } else {
      setIsError(false);
      setOtherPlatformsError(false);
    }
  };
  const textFieldRef = useRef(null);
  const descriptionRef = useRef(null);
  const postalCodeRef = useRef(null);
  const bannerRef = useRef(null);
  const factoryRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetAddRef = useRef(null);
  const firstCheckboxRef = useRef(null);
  const firstRadioRef = useRef(null);

  const scrollAndFocus = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  };

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#d7282f",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#d7282f",
    },
  });



  const BpRadio = React.forwardRef((props, ref) => {
    return (
      <Radio
        sx={{ padding: "4px 6px 4px 9px" }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
        inputRef={ref}
      />
    );
  });

  const handleSave = () => {
    formik.handleSubmit();

    if (!formik.values.description || formik.errors.description) {
      scrollAndFocus(descriptionRef);
      return;
    }
    if (
      !formik.values.minisite_footer_banner ||
      formik.errors.minisite_footer_banner
    ) {
      scrollAndFocus(bannerRef);
      return;
    }
    if (!formik.values.factory_name || formik.errors.factory_name) {
      scrollAndFocus(factoryRef);
      return;
    }
    if (!formik.values.country_id || formik.errors.country_id) {
      scrollAndFocus(countryRef);
      return;
    }
    if (
      !formik.values.op_region_state_province ||
      formik.errors.op_region_state_province
    ) {
      scrollAndFocus(stateRef);
      return;
    }
    if (!formik.values.city || formik.errors.city) {
      scrollAndFocus(cityRef);
      return;
    }
    if (!formik.values.op_street_address || formik.errors.op_street_address) {
      scrollAndFocus(streetAddRef);
      return;
    }
    if (!formik.values.postal_code || formik.errors.postal_code) {
      scrollAndFocus(postalCodeRef);
      return;
    }
    if (
      !formik.values.primary_sourcing_purpose ||
      formik.errors.primary_sourcing_purpose
    ) {
      scrollAndFocus(firstCheckboxRef);
    }
    if (otherPlatforms.length === 0 || isError) {
      textFieldRef.current?.focus();
      return;
    }
    if (
      !formik.values.average_sourcing_frequency ||
      formik.errors.average_sourcing_frequency
    ) {
      scrollAndFocus(firstRadioRef);
      return;
    }
  };

  return (
    <>
      <ContentInnerContainer breakPoints={breakPoints}>
        <ContainerHeader>
          <ContainerHeaderText breakPoints={breakPoints}>
            Additional Information
          </ContainerHeaderText>
          <ContainerHeaderDescription breakPoints={breakPoints} id="Label">
            Manage Information related to your company content and address
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
              {companyDetails?.company_operational_address?.country_id
                ? "Edit"
                : "Add"}
            </FloatingEditIcon>
          ) : (
            <FloatingEditIcon
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <CancelLink
                onClick={() => {
                  if (!loader) CancelEditing();
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
              <SaveLink>
                <Button
                  onClick={handleSave}
                  sx={{ padding: "0px", minWidth: "auto" }}
                  disabled={loader}
                >
                  {loader ? (
                    <ThreeDots
                      height="18"
                      width="40"
                      radius="9"
                      color="#D7282F"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    <>
                      <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                      <Box
                        sx={{
                          "@media screen and (max-width:320px)": {
                            display: "none",
                          },
                        }}
                      >
                        Save
                      </Box>
                    </>
                  )}
                </Button>
              </SaveLink>
            </FloatingEditIcon>
          )}
        </ContainerHeader>
        <OuterContainer>
          <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            {role == "buyer" ? (
              ""
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                {editMode ? (
                  <LabelContainer>Slogan</LabelContainer>
                ) : (
                  <LabelContainer>Slogan</LabelContainer>
                )}
              </Grid>
            )}

            {role == "buyer" ? (
              <></>
            ) : (
              <>
                {" "}
                {!editMode ? (
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    sx={{ fontSize: "14px" }}
                  >
                    {skelton ? (
                      <Skeleton animation="wave" variant="text" width={"30%"} />
                    ) : (
                      <p>
                        {" "}
                        {formik.values.slogan ? formik.values.slogan : "N/A"}
                      </p>
                    )}
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    sx={{ fontSize: "14px" }}
                  >
                    <CustomTextField
                      value={slogan}
                      handleChange={(e) => {
                        const newValue = e.target.value.trimStart();

                        navigator.clipboard
                          .writeText(newValue)
                          .then(() => {
                            formik.setFieldValue(
                              "slogan",
                              newValue.slice(0, 50)
                            );
                          })
                          .catch((error) => {});

                        if (newValue.length <= 50) {
                          formik.setFieldValue("slogan", newValue);
                          formik.setFieldError("slogan", "");
                        } else {
                          formik.setFieldError(
                            "slogan",
                            "Slogan content is too long. Please limit it to 50 characters"
                          );
                        }
                      }}
                      autoFocus={true}
                      placeholder={"Enter slogan"}
                      error={formik.errors.slogan ? true : false}
                      errorText={formik.errors.slogan}
                    />
                  </Grid>
                )}
              </>
            )}

            {role == "buyer" ? (
              ""
            ) : (
              <Grid item xs={12}>
                <hr className="hair-line" />
              </Grid>
            )}

            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer
                  style={{
                    display: "block",
                    height: "100%",
                  }}
                >
                  About your Company
                  <span style={{ color: "#d7282f" }}>*</span>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer
                  style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  About your Company
                </LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CompanyProfileAAbout>
                  <p
                    style={{
                      lineHeight: "160.9%",
                      alignItems: "center",

                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    {viewMore ? (
                      <>
                        {description.length > 0 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: description.replaceAll(/\n/g, "<br />"),
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {skelton ? (
                          <>
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={"50%"}
                            />
                          </>
                        ) : description?.length > 0 ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                description.length > 195
                                  ? description?.slice(0, 195) + "..."
                                  : description?.slice(0, 195),
                            }}
                          ></p>
                        ) : (
                          "N/A"
                        )}
                      </>
                    )}
                    {skelton ? (
                      ""
                    ) : (
                      <AboutDescription
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewMore((prev) => !prev);
                          if (viewMore) {
                            scrollToElement("Label");
                          }
                        }}
                      >
                        <span>
                          {" "}
                          {description?.length > 195 &&
                            (viewMore ? "View less!" : "View more!")}
                        </span>
                      </AboutDescription>
                    )}
                  </p>
                </CompanyProfileAAbout>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <Box>
                  {/* <TextField fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={6}
                    defaultValue="Default Value"
                    value={formik.values.description}
                    name="description"
                    placeholder="Enter about your company"
                    onChange={(e) => {
                      let newValue = e.target.value;
                      newValue = newValue.trimStart();

                      if (newValue.length > 4000) {
                        formik.setFieldError(
                          "description",
                          "About your company content is too long. Please limit it to 4000 characters"
                        );
                      } else if (newValue === "") {
                        formik.setFieldError("description", "");
                        formik.setFieldValue("description", newValue);
                      } else {
                        formik.setFieldError("description", "");
                        formik.setFieldValue("description", newValue);
                      }
                    }}
                  /> */}
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={6}
                    defaultValue="Default Value"
                    value={formik.values.description}
                    name="description"
                    placeholder="Enter about your company"
                    inputRef={descriptionRef}
                    error={Boolean(formik.errors.description)}
                    helperText={formik.errors.description}
                    onChange={(e) => {
                      let newValue = e.target.value.trimStart();

                      if (newValue.length > 4000) {
                        formik.setFieldError(
                          "description",
                          "About your company content is too long. Please limit it to 4000 characters"
                        );
                        newValue = newValue.slice(0, 4000);
                        formik.setFieldValue("description", newValue);
                      } else {
                        formik.setFieldError("description", "");
                        formik.setFieldValue("description", newValue);
                      }
                    }}
                  />

                  {/* <TextareaAutosize
                    style={{
                      width: "100%",
                      minHeight: "60px",
                      maxHeight: 200,
                      overflowY: "scroll",
                      borderRadius: "6px",
                      fontFamily: "Open Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#000",
                      lineHeight: "23px",
                      padding: "8px",
                      outline: "none",
                      // resize: "none",
                      borderColor: formik?.errors.description ? "#d7282f" : "",
                    }}
                    value={formik.values.description}
                    name="description"
                    onChange={(e) => {
                      let newValue = e.target.value;
                      newValue = newValue.trimStart();

                      if (newValue.length > 4000) {
                        formik.setFieldError(
                          "description",
                          "About your company content is too long. Please limit it to 4000 characters"
                        );
                      } else if (newValue === "") {
                        formik.setFieldError("description", "");
                        formik.setFieldValue("description", newValue);
                      } else {
                        formik.setFieldError("description", "");
                        formik.setFieldValue("description", newValue);
                      }
                    }}
                    placeholder="Enter about your company"
                  /> */}
                </Box>
                {/* {formik.errors.description && (
                  <FormHelperText>{formik.errors.description}</FormHelperText>
                )} */}

                <div
                  style={{
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160.9%",
                    display: "flex",
                    alignItems: "center",
                    color: "#848487",
                    paddingTop: "8px",
                    flexDirection: "column",
                  }}
                >
                  <FullFieldContainer>
                    <DescriptionTextContainer>
                      Maximum characters:{" "}
                      {`${Number(formik.values.description.length)}/4000`}
                    </DescriptionTextContainer>
                  </FullFieldContainer>
                  Please briefly describe your company’s advantages. E.g. “We
                  have twenty years experience of product design.”
                </div>
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                {role == "seller" ? (
                  <LabelContainer
                    style={{
                      display: "flex",
                      height: "100%",
                      paddingTop: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    Banner
                    <div style={{ color: "#d7282f" }}>*</div>
                  </LabelContainer>
                ) : (
                  ""
                )}
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                {role == "seller" ? (
                  <LabelContainer
                    style={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    Banner
                  </LabelContainer>
                ) : (
                  ""
                )}
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <Box sx={{ padding: "0px 0 0 0" }}>
                  {skelton ? (
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      height={"26px"}
                      width={"128px"}
                    />
                  ) : role === "seller" ? (
                    minisite_footer_banner ? (
                      <FileUpload
                        mode={"view"}
                        files={[
                          {
                            source: minisite_footer_banner,
                            file_original_name:
                              formik?.values?.minisite_footer_banner_name,
                            id: "banner_image",
                          },
                        ]}
                      />
                    ) : (
                      "N/A"
                    )
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <BannerImage
                  formik={formik}
                  role={role}
                  editMode={editMode}
                  inputRef={bannerRef}
                />
                {role == "seller"
                  ? formik.errors.minisite_footer_banner && (
                      <FormHelperText>
                        {formik.errors.minisite_footer_banner}
                      </FormHelperText>
                    )
                  : ""}
              </Grid>
            )}
            {role === "seller" && (
              <Grid item xs={12}>
                <hr className="hair-line" />
              </Grid>
            )}
          </Grid>
        </OuterContainer>
        <ContainerHeader
          className="companyopratonal"
          style={{
            marginTop: "10px",
            borderBottom: "0",
          }}
        >
          <ContainerHeaderText>Company Operational Address</ContainerHeaderText>
        </ContainerHeader>
        <OuterContainer>
          <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              {editMode ? (
                <LabelContainer>
                  Factory Name<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              ) : (
                <LabelContainer>Factory Name</LabelContainer>
              )}
            </Grid>
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                {skelton ? (
                  <Skeleton animation="wave" variant="text" width={"36%"} />
                ) : (
                  <p>
                    {formik.values.factory_name
                      ? formik.values.factory_name
                      : "N/A"}
                  </p>
                )}
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CustomTextField
                  value={factory_name}
                  inputRef={factoryRef}
                  handleChange={(e) => {
                    const newValue = e.target.value.trimStart();

                    if (newValue.length <= 50) {
                      formik.setFieldValue("factory_name", newValue);
                      formik.setFieldError("factory_name", "");
                    } else {
                      formik.setFieldError(
                        "factory_name",
                        "Factory name content is too long. Please limit it to 50 characters"
                      );
                    }
                  }}
                  placeholder={"Enter factory name"}
                  error={formik.errors.factory_name ? true : false}
                  errorText={formik.errors.factory_name}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>
                  Country<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>Country</LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              country_id !== "0" && country_id !== "" ? (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  sx={{ fontSize: "14px" }}
                >
                  <>
                    {skelton ? (
                      <Skeleton animation="wave" variant="text" width={"22%"} />
                    ) : (
                      <>
                        <img
                          style={{ marginRight: "5px" }}
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${country_id?.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${country_id?.toLowerCase()}.png 2x`}
                          alt="flag"
                        />
                        {returnCountryFromCode(country_id)}
                      </>
                    )}
                  </>
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  xl={8}
                  sx={{ fontSize: "14px" }}
                >
                  {skelton ? (
                    <Skeleton animation="wave" variant="text" width={"18%"} />
                  ) : (
                    <p style={{ fontSize: "14px" }}>N/A</p>
                  )}{" "}
                </Grid>
              )
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CountrySelect
                  country={formik.values.country_id}
                  inputRef={countryRef}
                  setCountry={(value) => {
                    formik.setFieldValue("country_id", value);
                    formik.setFieldValue("op_region_state_province", null);
                    formik.setFieldValue("city", null);
                    formik.setFieldValue("lats", "");
                    formik.setFieldValue("longs", "");
                    formik.setFieldError("country_id", "");
                  }}
                  disableClearable={formik.values.country_id ? false : true}
                  error={
                    formik.touched.country_id &&
                    Boolean(formik.errors.country_id)
                  }
                  errorText={
                    formik.touched.country_id && formik.errors.country_id
                  }
                  autoComplete="off"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer sx={{ wordBreak: "break-all" }}>
                  Region/State/Province
                  <div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer sx={{ wordBreak: "break-all" }}>
                  Region/State/Province
                </LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                {skelton ? (
                  <Skeleton animation="wave" variant="text" width={"29%"} />
                ) : (
                  <p>
                    {formik.values.op_region_state_province
                      ? formik.values.op_region_state_province
                      : "N/A"}
                  </p>
                )}
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <StateSelect
                  country={formik.values.country_id}
                  value={formik.values.op_region_state_province}
                  inputRef={stateRef}
                  disableClearable={
                    formik.values.op_region_state_province ? false : true
                  }
                  setStateData={(value) => {
                    formik.setFieldValue("op_region_state_province", value);
                    formik.setFieldValue("city", null);
                    formik.setFieldError("op_region_state_province", "");
                  }}
                  error={
                    formik.touched.op_region_state_province &&
                    Boolean(formik.errors.op_region_state_province)
                  }
                  errorText={
                    formik.touched.op_region_state_province &&
                    formik.errors.op_region_state_province
                  }
                  autoComplete="off"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>
                  City<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>City</LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                {skelton ? (
                  <Skeleton animation="wave" variant="text" width={"26%"} />
                ) : (
                  <p>{city === "" ? "N/A" : city == "0" ? "" : city}</p>
                )}
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CitiesStates
                  country={country_id}
                  inputRef={cityRef}
                  city={formik.values.city}
                  state={formik.values.op_region_state_province}
                  setCity={(value) => {
                    formik.setFieldValue("city", value);
                    formik.setFieldError("city", "");
                  }}
                  disableClearable={formik.values.city ? false : true}
                  errors={formik.touched.city && Boolean(formik.errors.city)}
                  errorText={formik.touched.city && formik.errors.city}
                  setLocation={(value) => {
                    // formik.setFieldValue("op_lats", value?.latitude);
                    // formik.setFieldValue("op_longs", value?.longitude);
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              {editMode ? (
                <LabelContainer>
                  Street Address<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              ) : (
                <LabelContainer>Street Address</LabelContainer>
              )}
            </Grid>
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                {skelton ? (
                  <Skeleton animation="wave" variant="text" width={"40%"} />
                ) : (
                  <p>
                    {formik.values.op_street_address
                      ? formik.values.op_street_address
                      : "N/A"}
                  </p>
                )}
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CustomTextField
                  value={op_street_address}
                  inputRef={streetAddRef}
                  handleChange={(e) => {
                    const newValue = e.target.value.trimStart();
                    const input = e.target;
                    const selectionStart = input.selectionStart;
                    const selectionEnd = input.selectionEnd;
                    if (newValue.length <= 100) {
                      formik.setFieldValue("op_street_address", newValue);
                      formik.setFieldError("op_street_address", "");
                    } else {
                      formik.setFieldError(
                        "op_street_address",
                        "Street address content is too long. Please limit it to 100 characters"
                      );
                    }

                    navigator.clipboard
                      .writeText(newValue)
                      .then(() => {
                        // formik.setFieldValue(
                        //   "op_street_address",
                        //   newValue.slice(0, 100)
                        // );
                      })
                      .catch((error) => {});
                    input.setSelectionRange(selectionStart, selectionEnd);
                  }}
                  placeholder={"Enter street address"}
                  error={formik.errors.op_street_address ? true : false}
                  errorText={formik.errors.op_street_address}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>
                  Postal Code<div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>Postal Code</LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <p>
                  {skelton ? (
                    <Skeleton animation="wave" variant="text" width={"16%"} />
                  ) : formik.values.postal_code ? (
                    formik.values.postal_code
                  ) : (
                    "N/A"
                  )}
                </p>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CustomTextField
                  placeholder="Enter postal code"
                  name="postal_code"
                  autoComplete="off"
                  value={formik.values.postal_code}
                  inputRef={postalCodeRef}
                  handleChange={(e) => {
                    const input = e.target;
                    let newValue = input.value;
                    const cursorPosition = input.selectionStart;
                    const leadingSpaceRemoved = newValue.replace(/^\s+/g, "");
                    const sanitizedValue = leadingSpaceRemoved
                      .replace(
                        /[^a-zA-Z0-9!@#$%^&*()_+\-=[\]{}|;:'",.\/<>?]/g,
                        ""
                      )
                      .toUpperCase();

                    if (sanitizedValue.length > 10) {
                      formik.setFieldError(
                        "postal_code",
                        "Postal code content is too long. Please limit it to 10 characters"
                      );
                      return;
                    }
                    const cursorPositionAfterTrim =
                      cursorPosition -
                      (newValue.length - sanitizedValue.length);
                    formik.setFieldValue("postal_code", sanitizedValue);
                    formik.setFieldError("postal_code", "");
                    requestAnimationFrame(() => {
                      input.setSelectionRange(
                        cursorPositionAfterTrim,
                        cursorPositionAfterTrim
                      );
                    });
                  }}
                  error={Boolean(formik.errors.postal_code)}
                  errorText={formik.errors.postal_code}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Additional Address Detail</LabelContainer>
            </Grid>

            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <p>
                  {skelton ? (
                    <Skeleton animation="wave" variant="text" width={"35%"} />
                  ) : formik.values.address ? (
                    formik.values.address
                  ) : (
                    "N/A"
                  )}
                </p>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <CustomTextField
                  value={address}
                  handleChange={(e) => {
                    const newValue = e.target.value.trimStart();

                    navigator.clipboard
                      .writeText(newValue)
                      .then(() => {
                        formik.setFieldValue("address", newValue.slice(0, 100));
                      })
                      .catch((error) => {});

                    if (newValue.length <= 100) {
                      formik.setFieldValue("address", newValue);
                      formik.setFieldError("address", "");
                    } else {
                      formik.setFieldError(
                        "address",
                        "Addition address details content is too long. Please limit it to 100 characters"
                      );
                    }
                  }}
                  placeholder={"Enter address"}
                  error={formik.errors.address ? true : false}
                  errorText={formik.errors.address}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>Geolocation Coordinates</LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>Geolocation Coordinates</LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <p>
                  {skelton ? (
                    <Skeleton animation="wave" variant="text" width={"30%"} />
                  ) : (
                    formik.values.op_lats !== 0 &&
                    formik.values.op_longs !== 0 && (
                      <>
                        {formik.values.op_lats ? formik.values.op_lats : ""}
                        {formik.values.op_lats && formik.values.op_lats
                          ? " , "
                          : ""}
                        {formik.values.op_longs ? formik.values.op_longs : ""}
                      </>
                    )
                  )}
                </p>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      placeholder="Latitude"
                      fullWidth
                      autoComplete="off"
                      value={formik.values.op_lats}
                      name={"geo_location"}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const validNumber = /^[+-]?\d*\.?\d*$/;
                        const sanitizedValue = inputValue.replace(
                          /[^0-9.+-]/g,
                          ""
                        );
                        if (
                          validNumber.test(sanitizedValue) ||
                          sanitizedValue === ""
                        ) {
                          formik.setFieldValue("op_lats", sanitizedValue);
                        }
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.errors.op_lats ? true : false}
                      helperText={
                        formik.errors.op_lats ? formik.errors.op_lats : ""
                      }
                    />
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        placeholder="Longitude"
                        fullWidth
                        autoComplete="off"
                        name={"geo_location"}
                        value={formik.values.op_longs}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const validNumber = /^[+-]?\d*\.?\d*$/;
                          const sanitizedValue = inputValue.replace(
                            /[^0-9.+-]/g,
                            ""
                          );
                          if (
                            validNumber.test(sanitizedValue) ||
                            sanitizedValue === ""
                          ) {
                            formik.setFieldValue("op_longs", sanitizedValue);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors.op_longs ? true : false}
                        helperText={
                          formik.errors.op_longs ? formik.errors.op_longs : ""
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer sx={{ alignItems: "start" }}>
                  Primary Sourcing Purpose
                  <div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>Primary Sourcing Purpose</LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <p>
                  {skelton ? (
                    <Skeleton animation="wave" variant="text" width={"30%"} />
                  ) : (
                    <>
                      {formik?.values?.primary_sourcing_purpose &&
                      formik?.values?.primary_sourcing_purpose.length > 0
                        ? formik?.values?.primary_sourcing_purpose?.join(" , ")
                        : "N/A"}
                    </>
                  )}
                </p>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {primarySourcingPurpose.map((value, index) => (
                      <Box
                        key={value.id}
                        display="flex"
                        alignItems="center"
                        flexWrap={"wrap"}
                      >
                        <FormControlLabel
                          className="profile_business"
                          sx={{
                            color: "#231F20",
                            fontSize: "14px",
                            lineHeight: "23px",
                            marginLeft: 0,
                            marginRight: "5px",
                            "@media screen and (max-width:600px)": {
                              fontSize: "13px",
                            },
                            "&.MuiFormControlLabel-root": {
                              alignItems: "start",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={primary_sourcing_purpose?.includes(
                                value.id
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  formik.setFieldValue(
                                    "primary_sourcing_purpose",
                                    [...primary_sourcing_purpose, value.id]
                                  );
                                } else {
                                  formik.setFieldValue(
                                    "primary_sourcing_purpose",
                                    primary_sourcing_purpose.filter(
                                      (v) => v != value.id
                                    )
                                  );
                                }
                                formik.setFieldError(
                                  "primary_sourcing_purpose",
                                  ""
                                );
                              }}
                              style={{
                                paddingRight: 4,
                                paddingLeft: 0,
                                paddingTop: "0",
                              }}
                              sx={{
                                "&.Mui-checked": {
                                  color: "#d7282f",
                                },
                                "& .MuiSvgIcon-root": {
                                  fontSize: "19px",
                                },
                              }}
                              inputRef={index === 0 ? firstCheckboxRef : null}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#231f20",
                                lineHeight: "1.3",
                                "@media screen and (max-width:480px)": {
                                  fontSize: "13px",
                                },
                              }}
                            >
                              {value.name}
                            </Typography>
                          }
                        />
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        "& .MuiFormControlLabel-root": {
                          marginLeft: "auto",
                          lineHeight: "1.3",
                          alignItems: "start",
                        },
                      }}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              style={{
                                paddingRight: 4,
                                paddingLeft: 0,
                                paddingTop: "0",
                              }}
                              sx={{
                                // padding: "4px 4px 4px 9px",
                                "&.Mui-checked": {
                                  color: "#d7282f",
                                },
                                "& .MuiSvgIcon-root": {
                                  fontSize: "19px",
                                },
                              }}
                              checked={isOtherCheckboxChecked}
                              onChange={handleOtherCheckboxChange}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#231f20",
                                fontWeight: "400",
                                width: "39px",
                                "@media screen and (max-width:600px)": {
                                  fontSize: "13px",
                                },
                              }}
                            >
                              Other
                            </Typography>
                          }
                        />
                      </FormGroup>
                      {isOtherCheckboxChecked && (
                        <Box
                          sx={{
                            ".MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                              paddingTop:
                                otherPlatforms.length > 0 ? "4.57px" : "",
                              paddingBottom:
                                otherPlatforms.length > 0 ? "4.57px" : "",
                            },
                          }}
                        >
                          <Autocomplete
                            size="small"
                            multiple
                            id="tags-filled"
                            options={[]}
                            freeSolo
                            value={otherPlatforms}
                            onChange={(event, newValue) => {
                              setOtherPlatforms(newValue);
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={index}
                                  size="small"
                                  label={option}
                                  {...getTagProps({ index })}
                                  sx={{
                                    backgroundColor:
                                      "rgba(34, 51, 84, 0.1) !important",
                                    "& .MuiChip-deleteIcon": {
                                      color: "#d7282fd9",
                                    },
                                  }}
                                  onDelete={() => {
                                    setOtherPlatforms(
                                      otherPlatforms.filter(
                                        (item) => item != option
                                      )
                                    );
                                  }}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Press Enter to add a value"
                                inputRef={textFieldRef}
                                onChange={handleInputChange}
                                error={isError || otherPlatformsError}
                                helperText={isError && "Duplicate not allowed!"}
                                onKeyDown={(event) => {
                                  if (
                                    event.key === "Backspace" &&
                                    !(event.target as HTMLInputElement).value
                                  ) {
                                    setOtherPlatforms((prevPlatforms) =>
                                      prevPlatforms.slice(0, -1)
                                    );
                                  }
                                  if (event.key === "Enter") {
                                    event.preventDefault();
                                    const value = (
                                      event.target as HTMLInputElement
                                    ).value;
                                    if (value) {
                                      const isDuplicate = otherPlatforms.some(
                                        (platform) => platform === value
                                      );
                                      setIsError(isDuplicate);
                                    } else {
                                      setIsError(false);
                                    }
                                  }
                                }}
                              />
                            )}
                          />
                          <Typography
                            sx={{
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "#4a4a4a",
                              opacity: ".8",
                            }}
                          >
                            Please press the Enter key after typing each primary
                            sourcing purpose.
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {formik.errors.primary_sourcing_purpose && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WarningAmberOutlinedIcon
                          style={{
                            fontSize: "9px",
                            margin: "0px 4px 0 0",
                            color: "#d7282f",
                          }}
                        />
                        <Typography
                          sx={{ fontSize: "10px", color: "#d7282f !important" }}
                        >
                          {formik.errors.primary_sourcing_purpose}
                        </Typography>
                      </Box>
                    )}
                    {otherPlatformsError && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WarningAmberOutlinedIcon
                          style={{
                            fontSize: "9px",
                            margin: "0px 4px 0 0",
                            color: "#d7282f",
                          }}
                        />
                        <Typography
                          sx={{ fontSize: "10px", color: "#d7282f !important" }}
                        >
                          {"Please enter a value for other primary sourcing"}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <hr className="hair-line" />
            </Grid>
            {editMode ? (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer sx={{ alignItems: "start" }}>
                  Average Sourcing Frequency
                  <div style={{ color: "#d7282f" }}>*</div>
                </LabelContainer>
              </Grid>
            ) : (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <LabelContainer>Average Sourcing Frequency</LabelContainer>
              </Grid>
            )}
            {!editMode ? (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <p>
                  {skelton ? (
                    <Skeleton animation="wave" variant="text" width={"30%"} />
                  ) : (
                    formik.values.average_sourcing_frequency !== 0 &&
                    formik.values.average_sourcing_frequency !== 0 && (
                      <>
                        {formik.values.average_sourcing_frequency
                          ? formik.values.average_sourcing_frequency
                              .charAt(0)
                              .toUpperCase() +
                            formik?.values?.average_sourcing_frequency.slice(1)
                          : "N/A"}
                      </>
                    )
                  )}
                </p>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                xl={8}
                sx={{ fontSize: "14px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                      value={formik.values.average_sourcing_frequency}
                      onChange={(e) => {
                        if (e?.target?.value) {
                          formik.setFieldError(
                            "average_sourcing_frequency",
                            ""
                          );
                          formik.setFieldValue(
                            "average_sourcing_frequency",
                            e.target.value
                          );
                        }
                      }}
                      aria-labelledby="demo-customized-radios"
                    >
                      {averageSourceOptions.map((option, index) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={
                            <BpRadio ref={index === 0 ? firstRadioRef : null} />
                          }
                          label={
                            <Typography
                              sx={{
                                fontSize: { xs: "13px", sm: "14px" },
                                color: "#231f20",
                                fontWeight: "400",
                              }}
                            >
                              {option.label}
                            </Typography>
                          }
                        />
                      ))}
                    </RadioGroup>

                    {formik.errors.average_sourcing_frequency && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WarningAmberOutlinedIcon
                          style={{
                            fontSize: "9px",
                            margin: "0px 4px 0 0",
                            color: "#d7282f",
                          }}
                        />
                        <Typography
                          sx={{ fontSize: "10px", color: "#d7282f !important" }}
                        >
                          {formik.errors.average_sourcing_frequency}
                        </Typography>
                      </Box>
                    )}
                  </FormControl>
                </Box>
              </Grid>
            )}
          </Grid>
        </OuterContainer>
      </ContentInnerContainer>
    </>
  );
};

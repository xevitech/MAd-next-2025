import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CustomTextField } from "@/components/common/customTextField";
import useAppContext from "@/hooks/useAppContext";
import { countriesList as countries } from "@/utils/countriesphp";
import * as Yup from "yup";
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
import { CustomDropdown } from "@/components/common/customDropdown";
import { ManufacturingYears } from "@/utils/AddProductPageSelectDropdownsData";
import CountrySelect from "@/components/common/countrydropdown/Index";
import { FileUpload } from "@/components/common/uploadFile";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { objectsEqual } from "@/utils/commonFunctions/other";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "@/hooks/appReducers";
import { getCompanyProfile } from "@/hooks/company";
import StateSelect from "@/components/common/countrydropdown/states";
import CitiesStates from "@/components/common/CityStateDropdown";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  apiClient,
  imageFileMessage,
  registeredCapital,
  registrationDocumentFileMessage,
} from "@/components/common/common";
import { AddIcon, RemoveIcon } from "@/components/CRM/View/style";

export const CompanyRegistration = (props: any) => {
  const {
    mode,
    changeMode,
    toggleMode,
    updateProfile,
    defaultValues,
    resetModes,
  } = props;
  const { companyDetails } = useSelector((state: any) => state.companyProfile);

  const [loader, setLoader] = useState<boolean>(false);
  const [skelton, setSkelton] = useState(false);
  const { breakPoints, setCompleteScreenLoader } = useAppContext();
  const [deleteCertificate, setDeleteCertificate] = useState<any>([]);
  const [commercialInfoCurrencies, setCommercialInfoCurrencies] = useState([]);
  const returnCountryFromCode = (code) => {
    return countries.find((ele) => ele?.code == code)?.name || "";
  };
  useEffect(() => {
    getCurrency();
    dispatch(getCompanyProfile());
  }, [getCompanyProfile]);
  const getCurrency = async () => {
    try {
      let response = await apiClient("currency", "get");
      setCommercialInfoCurrencies(response?.data);
      return response;
    } catch (error) {}
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setSkelton(true);
  }, []);

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

  const validation = Yup.object().shape({
    year: Yup.string().required("Please select year company registered"),
    countryId: Yup.string().required("Please select country").nullable(),
    regNumber: Yup.string()
      .trim()
      .required("Please enter registration no.")
      .trim(),
    legalOwner: Yup.string()
      .max(100, "legal owner name cannot exceed 100 characters")
      .required("Please enter legal owner")
      .trim(),
    postalCode: Yup.string()
      .min(5, "Postal code must be between 5 and 10 characters long.")
      .max(10, "Postal code must be between 5 and 10 characters long.")
      .trim()
      .required("Please enter postal code")
      .trim(),
    city: Yup.string().required("Please select city").nullable().trim(),
    reg_street_address: Yup.string()
      .required("Please enter street address")
      .trim(),
    official_company_name: Yup.string()
      .max(100, "offical company name cannot exceed 100 characters")
      .required("Please enter offical company name")
      .trim()
      .nullable(),
    registered_capital: Yup.string()
      .max(8, "registered capital cannot exceed 8 characters")
      .required("Please enter value")
      .trim()
      .nullable(),
    reg_region_state_province: Yup.string()
      .required("Please select region/state/province")
      .nullable()
      .trim(),
    reg_currency: Yup.string()
      .required("Please select currency")
      .nullable()
      .trim(),
  });

  let formik: any = useFormik({
    initialValues: {
      year:
        defaultValues?.registration_year == "0"
          ? ""
          : defaultValues?.registration_year,
      countryId:
        defaultValues?.registration_country_id == "0"
          ? ""
          : defaultValues?.registration_country_id,
      regNumber:
        defaultValues?.registration_number == "0"
          ? ""
          : defaultValues?.registration_number,
      legalOwner:
        defaultValues?.legal_owner == "0"
          ? ""
          : defaultValues?.legal_owner ?? "",
      postalCode:
        defaultValues?.registration_postalcode == "0"
          ? ""
          : defaultValues?.registration_postalcode,
      city:
        defaultValues?.registration_city == "0"
          ? ""
          : defaultValues?.registration_city,
      fax: companyDetails?.contact_profile?.fax
        ? companyDetails?.contact_profile?.fax
        : "",
      reg_street_address: defaultValues?.reg_street_address
        ? defaultValues?.reg_street_address
        : "",
      reg_region_state_province: defaultValues?.reg_region_state_province
        ? defaultValues.reg_region_state_province
        : "",
      reg_additional_address: defaultValues?.reg_additional_address
        ? defaultValues?.reg_additional_address
        : "",
      ...(defaultValues?.reg_additional_address1 && {
        reg_additional_address1: defaultValues?.reg_additional_address1,
      }),
      ...(defaultValues?.reg_additional_address2 && {
        reg_additional_address2: defaultValues?.reg_additional_address2,
      }),
      reg_longs: defaultValues?.reg_longs ? defaultValues?.reg_longs : "",
      reg_lats: defaultValues?.reg_lats ? defaultValues?.reg_lats : "",
      official_company_name: defaultValues?.official_company_name
        ? defaultValues?.official_company_name
        : "",
      registered_capital: defaultValues?.registered_capital
        ? defaultValues?.registered_capital
        : "",
      certificateFiles: defaultValues?.certification_file ?? [],
      reg_currency: defaultValues?.reg_currency
        ? defaultValues?.reg_currency
        : "",
      editMode: false,
    },

    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const {
        year,
        countryId,
        regNumber,
        postalCode,
        city,
        legalOwner,
        reg_street_address,
        reg_region_state_province,
        reg_additional_address,
        reg_longs,
        reg_lats,
        registered_capital,
        reg_currency,
      } = values;

      formik.setFieldError("reg_additional_address1", "");
      formik.setFieldError("reg_additional_address2", "");
      // if (addressFields[0] && !values.reg_additional_address1) {
      //   formik.setFieldError(
      //     "reg_additional_address1",
      //     "Please enter additional address"
      //   );
      //   return;
      // }

      // if (addressFields[1] && !values.reg_additional_address2) {
      //   formik.setFieldError(
      //     "reg_additional_address2",
      //     "Please enter additional address"
      //   );
      //   return;
      // }

      // if (addressFields[2] && !values.reg_additional_address3) {
      //   formik.setFieldError(
      //     "reg_additional_address3",
      //     ""
      //   );
      //   return;
      // }
      if (
        formik.errors.reg_additional_address1 ||
        formik.errors.reg_additional_address2
      ) {
        return;
      }
      const updatePayload = {
        registration_year: year,
        registration_number: regNumber,
        legal_owner: legalOwner ? legalOwner : "",
        registration_city: city,
        registration_postalcode: postalCode,
        registration_country_id: countryId,
        fax: fax,
        reg_street_address: reg_street_address,
        reg_region_state_province: reg_region_state_province,
        reg_additional_address: reg_additional_address,
        reg_additional_address1: reg_additional_address1
          ? reg_additional_address1
          : "",
        reg_additional_address2: reg_additional_address2
          ? reg_additional_address2
          : "",
        reg_longs: reg_longs,
        reg_lats: reg_lats,
        official_company_name: official_company_name,
        registered_capital: registered_capital,
        certificateFiles: certificateFiles,
        reg_currency: reg_currency,
      };
      await handleEditSave(updatePayload);
    },
  });
  const {
    year,
    countryId,
    regNumber,
    legalOwner,
    postalCode,
    city,
    fax,
    certificateFiles,
    reg_lats,
    reg_longs,
    reg_region_state_province,
    reg_street_address,
    reg_additional_address,
    official_company_name,
    registered_capital,
    reg_currency,
    reg_additional_address1,
    reg_additional_address2,
  } = formik.values;
  function getSymbolByName(name) {
    const symbolMatch = name.match(/\(([^)]+)\)$/);
    return symbolMatch ? symbolMatch[1] : "";
  }

  const uploadFiles = async () => {
    const formData = new FormData();
    if (certificateFiles?.length > 0) {
      for (let i = 0; i < certificateFiles?.length; i++) {
        if (certificateFiles[i]?.name) {
          formData.append("certification_file[]", certificateFiles[i]);
        }
      }
    }
    if (deleteCertificate?.length > 0)
      formData.append(
        "certification_file_delete_ids",
        deleteCertificate?.join(",")
      );
    setLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/company_profile/updateProfile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      if (response.status == 200) {
        dispatch(profileData());
        dispatch(getCompanyProfile());
        formik.setFieldValue("certificateFiles", []);
        setDeleteCertificate([]);
        setLoader(false);
        toggleMode(mode, changeMode, resetModes);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const [addressFields, setAddressFields] = useState([false, false, false]);
  const handleAddField = (index) => {
    const fieldName =
      index === 0 ? "reg_additional_address1" :
     index === 1 ? "reg_additional_address2" :"reg_additional_address3"; 

    formik.setFieldValue(fieldName, '');
    setAddressFields((prev) =>
      prev.map((field, i) => (i === index ? true : field))
    );
  };

  useEffect(() => {
    const address1 = formik.values.hasOwnProperty("reg_additional_address1");
    const address2 = formik.values.hasOwnProperty("reg_additional_address2");
    const hasAddress3 = formik.values.hasOwnProperty("reg_additional_address3");

    setAddressFields([address1, address2, hasAddress3]);

    if (addressFields[0] && !address1) {
      formik.setFieldError("reg_additional_address1", "");
    } else {
      formik.setFieldError("reg_additional_address1", "");
    }

    if (addressFields[1] && !address2) {
      formik.setFieldError("reg_additional_address2", "");
    } else {
      formik.setFieldError("reg_additional_address2", "");
    }
  }, [formik.values]);

  const handleRemoveField = (index) => {
    const fieldName =
    index === 0 ? "reg_additional_address1" : "reg_additional_address2";

      const updatedValues = Object.keys(formik.values)
        .filter((key) => key !== fieldName)
        .reduce((obj, key) => {
          obj[key] = formik.values[key];
          return obj;
        }, {});
      formik.setValues(updatedValues);
    const newAddressFields = [...addressFields];
    newAddressFields[index] = false;
    setAddressFields(newAddressFields);
    // formik.setFieldValue(`reg_additional_address${index + 1}`, "");
  };

  useEffect(() => {
    const errorFields = Object.keys(formik.errors);

    const addressFields = errorFields.filter((field) =>
      field.startsWith("reg_additional_address")
    );

    if (addressFields.length > 0) {
      const timer = setTimeout(() => {
        addressFields.forEach((field) => {
          formik.setFieldError(field, "");
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [formik.errors]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "year") {
      formik.setFieldValue("year", value);
      formik.setFieldError("year", "");
    } else if (name === "registered_capital") {
      if (value.length > 8) {
        formik.setFieldError(
          "registered_capital",
          "Registered capital content is too long. Please limit it to 8 digits."
        );
      } else if (/^\d*\.?\d*$/.test(value)) {
        formik.setFieldValue("registered_capital", value);
        formik.setFieldError("registered_capital", "");
      } else {
        formik.setFieldError(
          "registered_capital",
          "Registered capital must contain only numeric digits."
        );
      }
    } else if (name === "registration") {
      if (value.length > 50) {
        formik.setFieldError("regNumber", registeredCapital);
      } else {
        const value = e.target.value
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .toUpperCase();
        const input = e.target;

        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;

        formik.setFieldValue("regNumber", value);
        formik.setFieldError("regNumber", "");
        setTimeout(() => {
          input.setSelectionRange(selectionStart, selectionEnd);
        }, 0);
      }
    } else if (name === "official_company_name") {
      const newValue = e.target.value;
      if (newValue.length <= 100) {
        formik.setFieldValue("official_company_name", value);
        formik.setFieldError("official_company_name", "");
      } else {
        if (/^[a-zA-Z0-9 .,&'()@#*-]+$/.test(value) || value === "") {
          formik.setFieldError(
            "official_company_name",
            "Official company name content is too long. Please limit it to 100 characters"
          );
        }
      }
    } else if (name === "legalOwner") {
      if (value.length > 100) {
        formik.setFieldError(
          "legalOwner",
          "Legal Owner content is too long. Please limit it to 100 characters"
        );
      } else {
        if (/^[a-zA-Z ]+$/.test(value) || value === "")
          formik.setFieldValue("legalOwner", value);
        formik.setFieldError("legalOwner", "");
      }
    } else if (name === "city") {
      formik.setFieldValue("city", value);
      formik.setFieldError("city", "");
    } else if (name === "postalCode") {
      let value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "").toUpperCase();
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
      formik.setFieldValue("postalCode", value);
      formik.setFieldError("postalCode", "");
    } else if (name == "reg_street_address") {
      if (value.length > 150) {
        formik.setFieldError("reg_street_address", "Limit Exceeded");
      } else {
        formik.setFieldValue("reg_street_address", value);
        formik.setFieldError("reg_street_address", "");
      }
    } else if (name.toUpperCase() == "postalCode") {
      formik.setFieldValue("postalCode", value);
      formik.setFieldError("postalCode", "");
    } else if (name == "reg_region_state_province") {
      formik.setFieldValue("reg_region_state_province", value);
      formik.setFieldError("reg_region_state_province", "");
    } else if (name == "reg_additional_address") {
      if (value.length > 150) {
        formik.setFieldError("reg_additional_address", "Limit Exceeded");
      } else {
        formik.setFieldValue("reg_additional_address", value);
        formik.setFieldError("reg_additional_address", "");
      }
    } else if (name === "reg_longs") {
      const sanitizedValue = value.replace(/[^0-9.]/g, "");
      formik.setFieldValue("reg_longs", sanitizedValue);
      formik.setFieldError("reg_longs", "");
    } else if (name == "reg_lats") {
      const sanitizedValue = value.replace(/[^0-9.]/g, "");
      formik.setFieldValue("reg_lats", sanitizedValue);
      formik.setFieldError("reg_lats", "");
    }
  };

  const noChangeInState = () => {
    if (
      year == defaultValues?.registration_year &&
      city == defaultValues?.registration_city &&
      countryId == defaultValues?.registration_country_id &&
      regNumber == defaultValues?.registration_number &&
      legalOwner == defaultValues?.legal_owner &&
      postalCode == defaultValues?.registration_postalcode &&
      fax == companyDetails?.contact_profile?.fax &&
      reg_additional_address == defaultValues?.reg_additional_address &&
      reg_region_state_province == defaultValues?.reg_region_state_province &&
      reg_lats == defaultValues?.reg_lats &&
      reg_longs == defaultValues?.reg_longs &&
      reg_street_address == defaultValues?.reg_street_address &&
      official_company_name == defaultValues?.reg_additional_address &&
      registered_capital == defaultValues?.registered_capital &&
      reg_currency == defaultValues?.reg_currency &&
      objectsEqual(certificateFiles, defaultValues?.certification_file)
    ) {
      dispatch(getCompanyProfile());
      return true;
    } else return false;
  };

  const handleuploadOtherFile = (values) => {
    if (
      values.length > 3 ||
      (formik.values.certificateFiles &&
        formik.values.certificateFiles.length > 3)
    ) {
      toast.error("Limit to 3 files: PDF, image, or DOC");
    } else {
      formik.setFieldValue("certificateFiles", values);
      formik.setFieldError("certificateFiles", "");
    }
  };

  const handleFaxNumber = (e) => {
    formik.setFieldError("fax", "");
    const re = /^[0-9+\-/()]+$/;
    const newValue = e.target.value;
    if (newValue === "" || re.test(newValue)) {
      if (newValue.length <= 14) {
        formik.setFieldError("fax", "");
        formik.setFieldValue("fax", newValue);
      }
    } else {
      formik.setFieldError("fax", "only numeric digits required");
    }
  };

  const handleEditSave = async (updatePayload) => {
    if (noChangeInState()) {
      toggleMode(mode, changeMode, resetModes);
      getCompanyProfile();
    } else {
      await uploadFiles();
      await updateProfile(updatePayload);
      toggleMode(mode, changeMode, resetModes);
    }
  };

  const handleCancel = () => {
    toggleMode(mode, changeMode, resetModes);
    formik.setFieldValue("fax", companyDetails?.contact_profile?.fax);
    formik.setFieldValue("year", defaultValues?.registration_year);
    formik.setFieldValue("countryId", defaultValues?.registration_country_id);
    formik.setFieldValue("regNumber", defaultValues?.registration_number);
    formik.setFieldValue("legalOwner", defaultValues?.legal_owner ?? "");
    formik.setFieldValue("city", defaultValues?.registration_city);
    formik.setFieldValue("postalCode", defaultValues?.registration_postalcode);
    formik.setFieldValue("certificateFiles", defaultValues?.certification_file);

    formik.setFieldValue("reg_currency", defaultValues?.reg_currency);
    formik.setFieldValue(
      "registered_capital",
      defaultValues?.registered_capital
    );
    formik.setFieldValue(
      "reg_street_address",
      defaultValues?.reg_street_address
    );
    formik.setFieldValue(
      "reg_additional_address",
      defaultValues?.reg_additional_address
    );
    formik.setFieldValue(
      "reg_additional_address1",
      defaultValues?.reg_additional_address1
    );
    formik.setFieldValue(
      "reg_additional_address2",
      defaultValues?.reg_additional_address2
    );
    formik.setFieldValue(
      "official_company_name",
      defaultValues?.official_company_name
    );
    formik.setFieldError("reg_street_address", "");
    formik.setFieldError("official_company_name", "");
    formik.setFieldError("postalCode", "");
    formik.setFieldError("reg_additional_address", "");
    formik.setFieldError("reg_additional_address1", "");
    formik.setFieldError("reg_additional_address2", "");
    formik.setFieldError("registered_capital", "");
    formik.setFieldError("legalOwner", "");
    formik.setFieldError("regNumber", "");
    formik.setFieldError("countryId", "");
    formik.setFieldError("reg_region_state_province", "");
    formik.setFieldError("city", "");
    formik.setFieldError("reg_currency", "");
  };
  const companyNameRef = useRef(null);
  const ragisteredRef = useRef(null);
  const ragisteredTextRef = useRef(null);
  const companyYearRef = useRef(null);
  const ragistrationNoRef = useRef(null);
  const legalOwnerRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const streetAddRef = useRef(null);
  const postalCodeRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if(!formik.values.official_company_name || formik.errors.official_company_name) {
      companyNameRef.current?.focus();
      return;
    }
    if(!formik.values.reg_currency || formik.errors.reg_currency) {
      ragisteredRef?.current?.focus();
      return;
    }
    if(!formik.values.registered_capital || formik.errors.registered_capital) {
      ragisteredTextRef?.current?.focus();
      return;
    }
    if(!formik.values.year || formik.errors.year) {
      companyYearRef?.current?.focus();
      return;
    }
    if(!formik.values.regNumber || formik.errors.regNumber) {
      ragistrationNoRef?.current?.focus();
      return;
    }
    if(!formik.values.legalOwner || formik.errors.legalOwner) {
      legalOwnerRef?.current?.focus();
      return;
    }
    if(!formik.values.countryId || formik.errors.countryId) {
      countryRef?.current?.focus();
      return;
    }
    if(!formik.values.reg_region_state_province || formik.errors.reg_region_state_province) {
      stateRef?.current?.focus();
      return;
    }
    if(!formik.values.city || formik.errors.city) {
      cityRef?.current?.focus();
      return;
    }
    if(!formik.values.reg_street_address || formik.errors.reg_street_address) {
      streetAddRef?.current?.focus();
      return;
    }
    if(!formik.values.postalCode || formik.errors.postalCode) {
      postalCodeRef?.current?.focus();
      return;
    }
  }
  return (
    <ContentInnerContainer breakPoints={breakPoints}>
      <ContainerHeader>
        <ContainerHeaderText breakPoints={breakPoints}>
          Company Registration
        </ContainerHeaderText>
        <ContainerHeaderDescription breakPoints={breakPoints}>
          Manage information related to your Company Registration
        </ContainerHeaderDescription>

        {mode == "view" ? (
          <FloatingEditIcon
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              toggleMode(mode, changeMode, resetModes);
            }}
          >
            <PencilIcon>
              <Image
                src={"/assets/EditPencil.svg"}
                layout="fill"
                alt="editImage"
              />
            </PencilIcon>{" "}
            {companyDetails?.basic_information?.registration_year
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
                handleCancel();
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
              <Button type="submit" sx={{ padding: "0px", minWidth: "auto" }}>
                <SaveLink onClick={handleSave}>
                  <SaveOutlinedIcon sx={{ marginLeft: "10px" }} />
                  <Box
                    sx={{
                      "@media screen and (max-width:320px)": {
                        display: "none",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    Save
                  </Box>
                </SaveLink>
              </Button>
            )}
          </FloatingEditIcon>
        )}
      </ContainerHeader>
      <OuterContainer>
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Official Company Name
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer
                breakPoints={breakPoints}
                sx={{ display: "block" }}
              >
                Official Company Name<span style={{ color: "#d7282f" }}>*</span>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  <Skeleton animation="wave" variant="text" width={"18%"} />
                ) : (
                  <>
                    {formik.values.official_company_name &&
                    formik.values.official_company_name.length > 0
                      ? formik?.values?.official_company_name
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
              <CustomTextField
                value={official_company_name}
                inputRef={companyNameRef}
                handleChange={handleChange}
                placeholder="Enter official company name"
                name="official_company_name"
                errorText={formik.errors.official_company_name}
                error={formik.errors.official_company_name ? true : false}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Registered Capital
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Registered Capital<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  <Skeleton animation="wave" variant="text" width={"18%"} />
                ) : (
                  <>
                    {reg_currency ? getSymbolByName(reg_currency) : "N/A"}{" "}
                    {registered_capital ? registered_capital : ""}
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
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomDropdown
                  inputRef={ragisteredRef}
                    name="revenue"
                    registaredcurrency={formik.errors.reg_currency}
                    options={commercialInfoCurrencies.map((currency) => ({
                      label: `${currency.code}`,
                      value: `${currency.name} (${currency.symbol})`,
                    }))}
                    placeholder="Select currency"
                    value={reg_currency}
                    handleChange={(e) => {
                      formik.setFieldValue("reg_currency", e.target.value);
                      formik.setFieldError("reg_currency", "");
                    }}
                  />

                  {formik.errors.reg_currency && (
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
                        {formik.errors.reg_currency}
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <CustomTextField
                  inputRef={ragisteredTextRef}
                    registered={"companyregistration"}
                    value={registered_capital}
                    handleChange={handleChange}
                    placeholder="Enter value"
                    name="registered_capital"
                    errorText={formik.errors.registered_capital}
                    error={formik.errors.registered_capital ? true : false}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Year Company Registered</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer style={{ display: "block" }}>
                Year Company Registered
                <span style={{ color: "#d7282f" }}>*</span>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  <Skeleton animation="wave" variant="text" width={"24%"} />
                ) : year === "" ? (
                  "N/A"
                ) : year == "0" ? (
                  "`"
                ) : (
                  year
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
              sx={{ fontSize: "14px", ".erroricon": { display: "none" } }}
            >
              <CustomDropdown
                name="year"
                value={year}
                inputRef={companyYearRef}
                options={ManufacturingYears}
                placeholder="Select year company registered"
                handleChange={handleChange}
                error={formik.errors.year ? true : false}
                errorText={formik.errors.year}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Registration No.
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Registration No.<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  <Skeleton animation="wave" variant="text" width={"18%"} />
                ) : regNumber === "" ? (
                  "N/A"
                ) : regNumber === "0" ? (
                  ""
                ) : (
                  regNumber
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
                value={regNumber}
                inputRef={ragistrationNoRef}
                handleChange={handleChange}
                placeholder="Enter Registration No."
                name="registration"
                errorText={formik.errors.regNumber}
                error={formik.errors.regNumber ? true : false}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Legal Owner
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Legal Owner<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  <Skeleton animation="wave" variant="text" width={"29%"} />
                ) : legalOwner === "" ? (
                  "N/A"
                ) : legalOwner == "0" ? (
                  ""
                ) : (
                  legalOwner
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
              inputRef={legalOwnerRef}
                value={legalOwner}
                handleChange={handleChange}
                placeholder="Enter Legal Owner"
                name="legalOwner"
                errorText={formik.errors.legalOwner}
                error={formik.errors.legalOwner ? true : false}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <span
              style={{
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "19px",
                display: "flex",
                alignItems: "center",
                padding: " 0px",
                marginBottom: "24px",
                color: "#231f20",
                marginTop: "10px",
              }}
            >
              Location of Registration
            </span>
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Country</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Country<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
            countryId ? (
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
                        src={`https://flagcdn.com/w20/${countryId.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${countryId.toLowerCase()}.png 2x`}
                        alt="flag"
                      />
                      <span>{returnCountryFromCode(countryId)} </span>
                    </>
                  )}
                </>
              </Grid>
            ) : (
              ""
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
              inputRef={countryRef}
                mode={mode ? "edit" : "view"}
                country={formik.values.countryId}
                setCountry={(value) => {
                  formik.setFieldValue("countryId", value);
                  formik.setFieldValue("reg_region_state_province", "");
                  formik.setFieldError("countryId", "");
                  formik.setFieldValue("city", "");
                }}
                disableClearable={formik.values.countryId ? false : true}
                error={
                  formik.touched.countryId && Boolean(formik.errors.countryId)
                }
                errorText={formik.touched.countryId && formik.errors.countryId}
                autoComplete="off"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer sx={{ wordBreak: "break-all" }}>
                Region/State/Province
              </LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer
                breakPoints={breakPoints}
                sx={{ wordBreak: "break-all" }}
              >
                Region/State/Province<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
            countryId ? (
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
                  <p>
                    {skelton ? (
                      <Skeleton animation="wave" variant="text" width={"29%"} />
                    ) : reg_region_state_province === "" ? (
                      "N/A"
                    ) : reg_region_state_province == "0" ? (
                      ""
                    ) : (
                      reg_region_state_province
                    )}
                  </p>
                </>
              </Grid>
            ) : (
              ""
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
              <StateSelect
              inputRef={stateRef}
                mode={mode ? "edit" : "view"}
                country={formik.values.countryId}
                value={formik.values.reg_region_state_province}
                setStateData={(value) => {
                  formik.setFieldValue("reg_region_state_province", value);
                  formik.setFieldValue("city", null);
                  formik.setFieldError("reg_region_state_province", "");
                }}
                disableClearable={
                  formik.values.reg_region_state_province ? false : true
                }
                error={
                  formik.touched.reg_region_state_province &&
                  Boolean(formik.errors.reg_region_state_province)
                }
                errorText={
                  formik.touched.reg_region_state_province &&
                  formik.errors.reg_region_state_province
                }
                autoComplete="off"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>City</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>
                City<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  <Skeleton animation="wave" variant="text" width={"26%"} />
                ) : city === "" ? (
                  "N/A"
                ) : city == "0" ? (
                  ""
                ) : (
                  city
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
              <CitiesStates
              inputRef={cityRef}
                country={countryId}
                city={formik.values.city}
                state={formik.values.reg_region_state_province}
                setCity={(value) => {
                  formik.setFieldValue("city", value);
                  formik.setFieldError("city", "");
                }}
                disableClearable={formik.values.city ? false : true}
                errors={formik.touched.city && Boolean(formik.errors.city)}
                errorText={formik.touched.city && formik.errors.city}
                setLocation={(value) => {
                //   formik.setFieldValue("reg_lats", value?.latitude);
                  // formik.setFieldValue("reg_longs", value?.longitude);
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Street Address</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer breakPoints={breakPoints}>
                Street Address<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
            countryId ? (
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
                  <p>
                    {skelton ? (
                      <Skeleton animation="wave" variant="text" width={"40%"} />
                    ) : reg_street_address === "" ? (
                      "N/A"
                    ) : reg_street_address == "0" ? (
                      ""
                    ) : (
                      reg_street_address
                    )}
                  </p>
                </>
              </Grid>
            ) : (
              ""
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
              <CustomTextField
              inputRef={streetAddRef}
                value={reg_street_address}
                handleChange={(e) => {
                  const newValue = e.target.value;
                  const input = e.target;
                  const selectionStart = input.selectionStart;
                  const selectionEnd = input.selectionEnd;

                  if (newValue.length <= 100) {
                    formik.setFieldValue("reg_street_address", newValue);
                    formik.setFieldError("reg_street_address", "");
                  } else {
                    formik.setFieldError(
                      "reg_street_address",
                      "Street Address content is too long. Please limit it to 100 characters"
                    );
                  }

                  input.setSelectionRange(selectionStart, selectionEnd);
                }}
                placeholder="Enter Street Address"
                name="reg_street_address"
                errorText={formik.errors.reg_street_address}
                error={formik.errors.reg_street_address ? true : false}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Postal Code</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>
                Postal Code<div style={{ color: "#d7282f" }}>*</div>
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                ) : postalCode === "" ? (
                  "N/A"
                ) : postalCode == "0" ? (
                  ""
                ) : (
                  postalCode
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
              inputRef={postalCodeRef}
                placeholder="Enter Postal code"
                name="postalCode"
                autoComplete="off"
                value={formik.values.postalCode}
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
                      "postalCode",
                      "Postal code content is too long. Please limit it to 10 characters"
                    );
                    return;
                  }
                  const cursorPositionAfterTrim =
                    cursorPosition - (newValue.length - sanitizedValue.length);
                  formik.setFieldValue("postalCode", sanitizedValue);
                  formik.setFieldError("postalCode", "");
                  requestAnimationFrame(() => {
                    input.setSelectionRange(
                      cursorPositionAfterTrim,
                      cursorPositionAfterTrim
                    );
                  });
                }}
                error={formik.errors.postalCode ? true : false}
                errorText={formik.errors.postalCode}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Additional Address Detail</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer
                sx={{ alignItems: addressFields[0] ? "start" : "" }}
              >
                Additional Address Detail
              </LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                ) : reg_additional_address ? (
                  <>
                    {reg_additional_address}
                    {reg_additional_address1 && (
                      <>
                        <br />
                        <Divider sx={{ margin: "4px 0 !important" }} />
                        {reg_additional_address1}
                      </>
                    )}
                    {reg_additional_address2 && (
                      <>
                        <br />
                        <Divider sx={{ margin: "4px 0 !important" }} />
                        {reg_additional_address2}
                      </>
                    )}
                  </>
                ) : (
                  "N/A"
                )}
              </p>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={8} md={8} lg={8} xl={8} sx={{}}>
                <Grid container spacing={1} alignItems={"start"}>
                  <Grid item xs={10}>
                    <CustomTextField
                      value={reg_additional_address}
                      handleChange={(e) => {
                        const newValue = e.target.value;

                        if (newValue.length <= 100) {
                          formik.setFieldValue(
                            "reg_additional_address",
                            newValue
                          );
                          formik.setFieldError("reg_additional_address", "");
                        } else {
                          formik.setFieldError(
                            "reg_additional_address",
                            "Additional address details content is too long. Please limit it to 100 characters"
                          );
                        }
                      }}
                      placeholder="Enter Additional address"
                      name="reg_additional_address"
                      errorText={formik.errors.reg_additional_address}
                      error={
                        formik.errors.reg_additional_address ? true : false
                      }
                    />
                  </Grid>
                  <Grid item xs={2} sx={{}}>
                    {addressFields[0] === false && (
                      <Box
                        sx={{ marginTop: "6px" }}
                        onClick={() => handleAddField(0)}
                      >
                        <AddIcon style={{}} />
                      </Box>
                    )}
                  </Grid>

                  {addressFields.map(
                    (fieldVisible, index) =>
                      fieldVisible && (
                        <React.Fragment key={index}>
                          <Grid item xs={10}>
                            <CustomTextField
                              value={
                                formik.values[
                                  `reg_additional_address${index + 1}`
                                ]
                              }
                              handleChange={(e) => {
                                const newValue = e.target.value;

                                if (newValue.length <= 100) {
                                  formik.setFieldValue(
                                    `reg_additional_address${index + 1}`,
                                    newValue
                                  );
                                  formik.setFieldError(
                                    `reg_additional_address${index + 1}`,
                                    ""
                                  );
                                } else {
                                  formik.setFieldError(
                                    `reg_additional_address${index + 1}`,
                                    "Additional address details content is too long. Please limit it to 100 characters"
                                  );
                                }
                              }}
                              placeholder={`Enter Additional address ${
                                index + 1
                              }`}
                              name={`reg_additional_address${index + 1}`}
                              errorText={
                                formik.errors[
                                  `reg_additional_address${index + 1}`
                                ]
                              }
                              error={Boolean(
                                formik.errors[
                                  `reg_additional_address${index + 1}`
                                ]
                              )}
                            />
                          </Grid>
                          <Grid item xs={2} sx={{ marginTop: "6px",}}>
                            {index === 0 ? (
                              <>
                                {!addressFields[1] && (
                                  <AddIcon
                                    onClick={() => {
                                      if (!addressFields[1]) {
                                        handleAddField(1);
                                      }
                                    }}
                                  />
                                )}
                                <RemoveIcon
                                  onClick={() => handleRemoveField(0)}
                                />
                              </>
                            ) : (
                              <>
                                {index < 1 && !addressFields[index + 1] && (
                                  <AddIcon
                                    onClick={() => {
                                      if (
                                        index < 2 &&
                                        !addressFields[index + 1]
                                      ) {
                                        handleAddField(index + 1);
                                      }
                                    }}
                                  />
                                )}
                                <RemoveIcon
                                  onClick={() => handleRemoveField(index)}
                                />
                              </>
                            )}
                          </Grid>
                        </React.Fragment>
                      )
                  )}
                </Grid>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Geolocation Coordinates</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Geolocation Coordinates</LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                  formik.values.reg_longs !== 0 &&
                  formik.values.reg_lats !== 0 && (
                    // <>
                    //   {formik.values.reg_longs
                    //     ? formik.values.reg_longs
                    //     : "N/A"}{" "}
                    //   {" , "}
                    //   {formik.values.reg_lats ? formik.values.reg_lats : ""}
                    // </>
                    <>
                    {formik.values.reg_longs ? formik.values.reg_longs : ""}
                    {formik.values.reg_longs && formik.values.reg_lats ? " , " : ""}
                    {formik.values.reg_lats ? formik.values.reg_lats : ""}
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
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  placeholder="Longitude"
                  fullWidth
                  autoComplete="off"
                  name="geo_location"
                  value={formik.values.reg_longs}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                  const validNumber = /^[+-]?\d*\.?\d*$/; 
                  const sanitizedValue = inputValue.replace(/[^0-9.+-]/g, "");
                  if (validNumber.test(sanitizedValue) || sanitizedValue === "") {
                  formik.setFieldValue("reg_longs", sanitizedValue);
                }
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.reg_longs && Boolean(formik.errors.reg_longs)
                  }
                  helperText={
                    formik.touched.reg_longs && formik.errors.reg_longs
                  }
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  placeholder="Latitude"
                  fullWidth
                  autoComplete="off"
                  name="geo_location"
                  value={formik.values.reg_lats}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                  const validNumber = /^[+-]?\d*\.?\d*$/; 
                  const sanitizedValue = inputValue.replace(/[^0-9.+-]/g, "");
                  if (validNumber.test(sanitizedValue) || sanitizedValue === "") {
                  formik.setFieldValue("reg_lats", sanitizedValue);
                }
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.reg_lats && Boolean(formik.errors.reg_lats)
                  }
                  helperText={formik.touched.reg_lats && formik.errors.reg_lats}
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          {mode == "view" ? (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Fax</LabelContainer>
            </Grid>
          ) : (
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <LabelContainer>Fax</LabelContainer>
            </Grid>
          )}{" "}
          {mode == "view" ? (
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
                <p>{fax == null || fax == "" ? "N/A" : fax}</p>
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
                name="Enter Fax No."
                value={fax}
                handleChange={handleFaxNumber}
                errorText={""}  
                error={false}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <hr className="hair-line" />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
            <LabelContainer>Other Registration Documents</LabelContainer>
          </Grid>{" "}
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
              <Skeleton
                animation="wave"
                variant="rounded"
                height={"28px"}
                width={"128px"}
              />
            ) : (
              <>
                <FileUpload
                  name="CompanyName"
                  mode={mode}
                  value={certificateFiles}
                  files={certificateFiles}
                  error={(error) =>
                    formik.setFieldError("certificateFiles", error)
                  }
                  removedFile={(array) => setDeleteCertificate(array)}
                  updateFiles={handleuploadOtherFile}
                />
                {mode == "view" ? (
                  ""
                ) : (
                  <Grid item xs={12} style={{ paddingTop: "10px" }}>
                    <LabelContainer sx={{ fontSize: "12px" }}>
                      {registrationDocumentFileMessage}
                    </LabelContainer>
                  </Grid>
                )}
              </>
            )}
            <p style={{ color: "#d32f2f", fontSize: "11px" }}></p>
            <p>{mode == "view" && certificateFiles?.length == 0 && "N/A"}</p>
            <p style={{ color: "#d32f2f", fontSize: "11px" }}>
              {formik.errors.certificateFiles}
            </p>
          </Grid>
        </Grid>
      </OuterContainer>
    </ContentInnerContainer>
  );
};

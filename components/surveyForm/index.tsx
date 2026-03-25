import React, { useEffect, useState } from "react";
import { surveyPage } from "@/utils/constantImages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import {
  SliderStyle,
  SurveyCheckboxBox,
  SurveyCheckboxStyle,
  SurveyContentBox,
  SurveyFormBox,
  SurveyHeading,
  SurveyHeadingBox,
  SurveyInnerBox,
  SurveyInnerList,
  SurveyInnerListData,
  SurveyList,
  SurveyListHeading,
  SurveyListInnerHeading,
  SurveyListInnerText,
  SurveyLogoBox,
  SurveyOrderedList,
  SurveyOuterBox,
  SurveyProgressBox,
  SurveyRadioButton,
  SurveySubmitButton,
  SurveySubmitButtonBox,
  SurveyTextField,
  SurveyTextFieldBox,
} from "./SurveryStyle";
import { apiClient } from "../common/common";
import { toast } from "react-toastify";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { DataGridStyle } from "../common/commonStyle";
import MobileInputCommon from "../common/PhoneInput";

const SurveyForm = () => {
  const phoneRef = React.useRef(null);
  const [loader, setLoader] = useState(true); // State for loader visibility
  const [phoneKey, setPhoneKey] = useState(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoader(false);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const [progress, setProgress] = useState(0);
  const [filledFields, setFilledFields] = useState(new Set());
  useEffect(() => {
    const filledCount = filledFields.size;
    const newProgress = Math.min(filledCount * (100 / 22), 100);
    setProgress(newProgress);
  }, [filledFields]);

  const initialValuesForSurvey = {
    company_name: "",
    full_name: "",
    email: "",
    phone: "",
    company_type: "",
    r_n_d: "",
    certification: [],
    mobile_code: "",
    country_code: "",
    certifications_other: "",
    production_capacity: "",
    warehouse_volume: "",
    industry: [],
    industry_focus_other: "",
    no_of_employees: "",
    annual_revanue: "",
    comments: "",
    seeking_partnerships: "",
    hear_about: "",
    platform_usability: 0,
    quality_of_supplier_information: 0,
    product_range: 0,
    communication: 0,
    live_chat: 0,
    transaction: 0,
    customer_support: 0,
  };
  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name is required"),
    full_name: Yup.string()
      .required("Company name is required")
      .matches(/^[\s\S]*$/, "name cannot contain only spaces"),
    mobile_code: Yup.string(),
    country_code: Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]*$/, "Phone number must contain only digits")
      .required("Phone number is required"), // Allows any number of digits, or an empty string
    company_type: Yup.string().required("Company type is required"),
    company_type_other: Yup.string().notRequired(), // Make this optional
    industry: Yup.array()
      .min(1, "At least one industry must be selected")
      .required("At least one industry must be selected"),
    industry_focus_other: Yup.string(),
    no_of_employees: Yup.string(),
    certification: Yup.array().min(1, "At least one certification is required"),
    certifications_other: Yup.string(),
    annual_revanue: Yup.string(),
    r_n_d: Yup.string(),
    production_capacity: Yup.string(),
    warehouse_volume: Yup.string(),
    seeking_partnerships: Yup.string().required(
      "Please indicate if you are seeking partnerships"
    ),
    hear_about: Yup.string().required(
      "Please let us know how you heard about us"
    ),
    comments: Yup.string(),
    platform_usability: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate platform usability"),
    quality_of_supplier_information: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate the quality of supplier information"),
    product_range: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate the product range"),
    communication: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate communication"),
    live_chat: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate the live chat service"),
    transaction: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate your transaction experience"),
    customer_support: Yup.number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .required("Please rate the customer support"),
  });
  const handleFieldChange = (fieldName, e, setFieldValue) => {
    let value;

    // Check if e is defined and has a target
    if (Array.isArray(e)) {
      value = e; // If it's an array, assign directly
    } else if (e && e.target) {
      value = e.target.value; // Get the input value from the event
    } else {
      return; // Exit if e is neither a valid event nor an array
    }

    // Update the field value
    setFieldValue(fieldName, value);
    console.log("filedValue", value);
    // Update filled fields tracking
    setFilledFields((prev) => {
      const newFilledFields = new Set(prev);
      if (Array.isArray(value)) {
        // Check if value is an array
        if (value.length > 0) {
          // Check if the array is not empty
          newFilledFields.add(fieldName); // Add field to filled fields
        } else {
          newFilledFields.delete(fieldName); // Remove field if empty
        }
      } else if (typeof value === "string" && value.trim()) {
        // For string values
        newFilledFields.add(fieldName); // Add field to filled fields
      } else {
        newFilledFields.delete(fieldName); // Remove field if empty or just whitespace
      }
      return newFilledFields;
    });
  };

  const handleSubmit = async (
    values,
    { setFieldValue, setSubmitting, resetForm }
  ) => {
    console.log("form", values);
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, v]: [string, any]) =>
        formData.append(key, v)
      );

      const response = await apiClient(
        "survey/list",
        "POST",
        {
          body: formData,
        },
        true
      );
      toast.success("Form submitted successfully!");
      resetForm();
      setPhoneKey((prevKey) => prevKey + 1);
      phoneRef.current.value = "";
      setTimeout(() => {
        resetForm();
        setFilledFields(new Set());
      }, 100); // Adjust delay if needed
    } catch (error) {
      toast.error("Failed to submit form.");
    }
  };
  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <>
      {loader ? (
        <div>
          {/* <img src="/assets/Loader/Power-Logo-Loader.gif" height="100%" /> */}
        </div>
      ) : (
        <SurveyOuterBox>
          <SurveyInnerBox>
            <SurveyLogoBox>
              <img src={surveyPage?.logo} alt="logo" />
            </SurveyLogoBox>
            <SurveyHeadingBox>
              <SurveyHeading>
                Platform for Energy, Power Generation, Oil & Gas, Water
                Management Industries
              </SurveyHeading>
            </SurveyHeadingBox>
            <SurveyContentBox>
              <SurveyProgressBox>
                <Box sx={{ width: "100%" }}>
                  <LinearProgressWithLabel
                    value={progress}
                    className="progressBarStyle"
                    sx={{}}
                  />
                </Box>
              </SurveyProgressBox>
              <Formik
                initialValues={initialValuesForSurvey}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false} // Disable validation on blur
                validateOnChange={false} // Disable validation on change
              >
                {({ handleChange, errors, touched, setFieldValue }) => (
                  <Form>
                    <SurveyFormBox>
                      <SurveyOrderedList>
                        <SurveyList>
                          <SurveyListHeading>
                            Company Name
                            <span style={{ color: "#d7282f" }}> * </span>:{" "}
                          </SurveyListHeading>
                          <SurveyTextFieldBox>
                            <Field name="company_name">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.company_name &&
                                    form.submitCount > 0
                                  } // Error shows after submit
                                  fullWidth
                                >
                                  <SurveyTextField
                                    {...field}
                                    variant="outlined"
                                    placeholder="Full Name"
                                    onChange={(e) => {
                                      // Update field value
                                      const value = e.target.value;

                                      // Allow spaces
                                      handleFieldChange(
                                        "company_name",
                                        e,
                                        form.setFieldValue
                                      );
                                      if (e.target.value.trim()) {
                                        form.setFieldError(field.name, "");
                                      }
                                    }}
                                    onBlur={() => {
                                      if (!field.value.trim()) {
                                      }
                                    }}
                                    error={
                                      !!form.errors.company_name &&
                                      form.submitCount > 0
                                    }
                                  />
                                  {form.submitCount > 0 &&
                                    form.errors.company_name && (
                                      <FormHelperText error>
                                        {form.errors.company_name}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>

                        <SurveyList>
                          <SurveyListHeading>
                            Contact Information
                            <span style={{ color: "#d7282f" }}> * </span>:
                          </SurveyListHeading>
                          <SurveyTextFieldBox>
                            <Field name="full_name">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.full_name &&
                                    form.submitCount > 0
                                  }
                                  fullWidth
                                >
                                  <SurveyTextField
                                    {...field}
                                    variant="outlined"
                                    placeholder="Full Name"
                                    onChange={(e) => {
                                      handleFieldChange(
                                        "full_name",
                                        e,
                                        form.setFieldValue
                                      );
                                      if (e.target.value) {
                                        form.setFieldError(field.name, ""); // Clear error if there's input
                                      }
                                    }}
                                    onBlur={() => {
                                      if (!field.value) {
                                      }
                                    }}
                                    error={
                                      !!form.errors.full_name &&
                                      form.submitCount > 0
                                    } // Set error state
                                  />
                                  {form.submitCount > 0 &&
                                    form.errors.full_name && (
                                      <FormHelperText error>
                                        {form.errors.full_name}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>

                          <SurveyTextFieldBox>
                            <Field name="email">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.email && form.submitCount > 0
                                  }
                                  fullWidth
                                >
                                  <SurveyTextField
                                    {...field}
                                    variant="outlined"
                                    placeholder="Email"
                                    onChange={(e) => {
                                      handleFieldChange(
                                        "email",
                                        e,
                                        form.setFieldValue
                                      );
                                      if (e.target.value) {
                                        form.setFieldError(field.name, "");
                                      }
                                    }}
                                    onBlur={() => {
                                      if (!field.value) {
                                      }
                                    }}
                                    error={
                                      !!form.errors.email &&
                                      form.submitCount > 0
                                    }
                                  />
                                  {form.submitCount > 0 &&
                                    form.errors.email && (
                                      <FormHelperText error>
                                        {form.errors.email}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>

                          <SurveyTextFieldBox>
                            <Field name="phone">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.phone && form.submitCount > 0
                                  }
                                  sx={{
                                    width: "60%",
                                    borderRadius: "4px",
                                    "& .MuiFormControl-root": {
                                      backgroundColor: "#fff",
                                      border:
                                        form.errors.phone &&
                                        form.submitCount > 0
                                          ? "1px solid #d7282f"
                                          : "1px solid transparent",
                                      borderRadius: "4px",
                                      "&:hover": {
                                        border:
                                          form.errors.phone &&
                                          form.submitCount > 0
                                            ? "1px solid #d7282f"
                                            : "1px solid #000 !important",
                                      },
                                    },
                                  }}
                                >
                                  <MobileInputCommon
                                    key={phoneKey}
                                    survey
                                    handleChange={(
                                      phone,
                                      mobile_code,
                                      country_code,
                                      isValid
                                    ) => {
                                      handleFieldChange(
                                        "phone",
                                        { target: { value: phone } },
                                        form.setFieldValue
                                      );
                                      form.setFieldValue(
                                        "mobile_code",
                                        mobile_code
                                      );
                                      form.setFieldValue(
                                        "country_code",
                                        country_code
                                      );
                                      if (phone) {
                                        form.setFieldError(field.name, "");
                                      }
                                      if (!isValid && !phone) {
                                        form.setFieldError(
                                          field.name,
                                          "Invalid phone number"
                                        );
                                      }
                                    }}
                                    mobileNumber={field.value}
                                    mobileCode={form.values.mobile_code}
                                    countryCode={form.values.country_code}
                                    placeholder="phone"
                                    inputRef={phoneRef}
                                    sx={{
                                      width: "60%",
                                    }}
                                  />
                                  {form.submitCount > 0 &&
                                    form.errors.phone && (
                                      <FormHelperText error>
                                        {form.errors.phone}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>
                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              Company Type
                              <span style={{ color: "#d7282f" }}> * </span>:
                            </SurveyListHeading>
                            <Field name="company_type">
                              {({ field, form }) => (
                                <FormControl
                                  fullWidth
                                  error={
                                    !!form.errors.company_type &&
                                    form.submitCount > 0
                                  }
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="company-type-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      const selectedValue = event.target.value;
                                      form.setFieldValue(
                                        field.name,
                                        selectedValue
                                      );
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        form.setFieldValue
                                      );
                                      form.setFieldTouched(field.name, true);
                                      form.setFieldError(field.name, ""); // Clear error when an option is selected
                                    }}
                                  >
                                    {[
                                      "Manufacturer",
                                      "Trading Company",
                                      "EPC Contractor",
                                      "Wholesaler",
                                      "Retailer",
                                      "Service Provider",
                                      "Individual",
                                      "Other",
                                    ].map((type) => (
                                      <FormControlLabel
                                        key={type}
                                        value={type}
                                        control={<SurveyRadioButton />}
                                        label={type}
                                        className="labelstyle"
                                        sx={{
                                          color:
                                            field.value === type
                                              ? "#d7282f"
                                              : "default",
                                        }}
                                      />
                                    ))}
                                  </RadioGroup>

                                  {form.submitCount > 0 &&
                                    form.errors.company_type && (
                                      <FormHelperText>
                                        {form.errors.company_type}
                                      </FormHelperText>
                                    )}
                                  {field.value === "Other" && (
                                    <SurveyTextFieldBox>
                                      <SurveyTextField
                                        id="otherIndustry"
                                        name="company_type_other"
                                        variant="outlined"
                                        placeholder="Other Company Type"
                                        error={
                                          form.submitCount > 0 &&
                                          !!form.errors.company_type_other
                                        }
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          form.setFieldValue(
                                            "company_type_other",
                                            value
                                          );
                                          if (value.trim()) {
                                            form.setFieldError(
                                              "company_type_other",
                                              ""
                                            );
                                          } else {
                                            form.setFieldError(
                                              "company_type_other",
                                              ""
                                            );
                                          }
                                        }}
                                      />
                                    </SurveyTextFieldBox>
                                  )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>

                        <SurveyList>
                          <SurveyListHeading>
                            Industry Focus
                            <span style={{ color: "#d7282f" }}> * </span>:{" "}
                          </SurveyListHeading>

                          <Field name="industry">
                            {({ field, form }) => {
                              const industries = [
                                "Energy",
                                "Power Generation",
                                "Oil & Gas",
                                "Water Management",
                                "Other", // Added "Other" option
                              ];

                              const handleCheckboxChange = (value) => {
                                const newValue = field.value.includes(value)
                                  ? field.value.filter((v) => v !== value)
                                  : [...field.value, value];

                                form.setFieldValue("industry", newValue);

                                if (
                                  newValue.length > 0 ||
                                  form.values.industry_focus_other
                                ) {
                                  form.setFieldError("industry", "");
                                } else {
                                  form.setFieldError(
                                    "industry",
                                    'Error: Please select an industry or fill in the "Other Industry" field.'
                                  );
                                }

                                if (
                                  newValue.length > 0 ||
                                  form.values.industry_focus_other
                                ) {
                                  setFilledFields((prev) =>
                                    new Set(prev).add("industry")
                                  );
                                } else {
                                  setFilledFields((prev) => {
                                    const newFilledFields = new Set(prev);
                                    newFilledFields.delete("industry");
                                    return newFilledFields;
                                  });
                                }
                              };

                              return (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!(
                                      form.errors.industry &&
                                      (form.submitCount > 0 ||
                                        form.touched.industry)
                                    )
                                  }
                                  sx={{ width: "100%" }}
                                >
                                  <FormGroup>
                                    {industries.map((industry) => (
                                      <FormControlLabel
                                        key={industry}
                                        control={
                                          <Field
                                            type="checkbox"
                                            name="industry"
                                            value={industry}
                                            as={SurveyCheckboxStyle}
                                            onChange={() =>
                                              handleCheckboxChange(industry)
                                            }
                                          />
                                        }
                                        label={industry}
                                        sx={{
                                          color: field.value.includes(industry)
                                            ? "#d7282f"
                                            : "default",
                                        }}
                                        className="labelstyle"
                                      />
                                    ))}
                                  </FormGroup>

                                  {field.value.includes("Other") && (
                                    <SurveyTextFieldBox>
                                      <SurveyTextField
                                        id="otherIndustry"
                                        name="industry_focus_other"
                                        variant="outlined"
                                        placeholder="Other Industry Focus"
                                        fullWidth
                                        error={
                                          !!(
                                            form.errors.industry_focus_other &&
                                            form.submitCount > 0
                                          )
                                        } // Show error if applicable
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          form.setFieldValue(
                                            "industry_focus_other",
                                            value
                                          );
                                        }}
                                      />
                                    </SurveyTextFieldBox>
                                  )}
                                  {form.submitCount > 0 &&
                                    form.errors.industry && (
                                      <FormHelperText error>
                                        {form.errors.industry}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              );
                            }}
                          </Field>
                        </SurveyList>
                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              Annual Revenue (USD):
                            </SurveyListHeading>

                            <Field name="annual_revanue">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.annual_revanue &&
                                    form.submitCount > 0
                                  }
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="annual-revenue-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      form.setFieldValue(
                                        field.name,
                                        event.target.value
                                      );
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        form.setFieldValue
                                      );
                                      form.setFieldTouched(field.name, false); // Reset touched state
                                      form.setFieldError(field.name, ""); // Clear error
                                    }}
                                  >
                                    <FormControlLabel
                                      value="<500000$"
                                      control={<SurveyRadioButton />}
                                      label="<500,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "<500000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="500000$ - 1000000$"
                                      control={<SurveyRadioButton />}
                                      label="500,000$ - 1,000,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "500000$ - 1000000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="1000000$ - 5000000$"
                                      control={<SurveyRadioButton />}
                                      label="1,000,000$ - 5,000,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "1000000$ - 5000000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="5000000$ - 10000000$"
                                      control={<SurveyRadioButton />}
                                      label="5,000,000$ - 10,000,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "5000000$ - 10000000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                  </RadioGroup>
                                  {form.submitCount > 0 &&
                                    form.errors.annual_revanue && (
                                      <FormHelperText>
                                        {form.errors.annual_revanue}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>
                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              Number of Employees:
                            </SurveyListHeading>

                            <Field name="no_of_employees">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    form.submitCount > 0 &&
                                    !!form.errors.no_of_employees
                                  }
                                  sx={{ width: "100%" }}
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="number-of-employees-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      form.setFieldValue(
                                        field.name,
                                        event.target.value
                                      );
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        form.setFieldValue
                                      ); // Handle field change
                                      form.setFieldTouched(field.name, false); // Reset touched state
                                      form.setFieldError(field.name, ""); // Clear error
                                    }}
                                    className="labelstyle"
                                  >
                                    <FormControlLabel
                                      value="1-10"
                                      control={<SurveyRadioButton />}
                                      label="1-10"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "1-10"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="11-50"
                                      control={<SurveyRadioButton />}
                                      label="11-50"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "11-50"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="51-100"
                                      control={<SurveyRadioButton />}
                                      label="51-100"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "51-100"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="101-500"
                                      control={<SurveyRadioButton />}
                                      label="101-500"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "101-500"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                  </RadioGroup>
                                  {form.submitCount > 0 &&
                                    form.errors.no_of_employees && (
                                      <FormHelperText>
                                        {form.errors.no_of_employees}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>

                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              R&D Spending (USD) (Optional):
                            </SurveyListHeading>

                            <Field name="r_n_d">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    form.touched.r_n_d && !!form.errors.r_n_d
                                  }
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="r-and-d-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      form.setFieldValue(
                                        field.name,
                                        event.target.value
                                      );
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        setFieldValue
                                      );
                                    }}
                                    className="labelstyle"
                                  >
                                    <FormControlLabel
                                      value="<50,000$"
                                      control={<SurveyRadioButton />}
                                      label="<50,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "<50,000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="50,000-100,000$"
                                      control={<SurveyRadioButton />}
                                      label="50,000$ - 100,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "50,000-100,000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="100,000-500,000$"
                                      control={<SurveyRadioButton />}
                                      label="100,000$ - 500,000$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "100,000-500,000$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="500,000$ - 1 million$"
                                      control={<SurveyRadioButton />}
                                      label="500,000$ - 1 million$"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "500,000$ - 1 million$"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                  </RadioGroup>
                                  {form.touched.r_n_d && form.errors.r_n_d && (
                                    <FormHelperText>
                                      {form.errors.r_n_d}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>
                        <SurveyList>
                          <SurveyListHeading>
                            Certifications Held
                            <span style={{ color: "#d7282f" }}> * </span>:{" "}
                          </SurveyListHeading>

                          <Field name="certification">
                            {({ field, form }) => {
                              const certifications = [
                                "ISO 9001",
                                "ISO 14001",
                                "OHSAS 18001",
                                "API Specification Q1",
                                "CE Marking",
                                "ASME Certification",
                                "Other",
                              ];

                              const handleCheckboxChange = (value) => {
                                const newValue = field.value.includes(value)
                                  ? field.value.filter((v) => v !== value)
                                  : [...field.value, value];

                                form.setFieldValue("certification", newValue);
                                if (
                                  newValue.length > 0 ||
                                  form.values.certifications_other
                                ) {
                                  form.setFieldError("certification", "");
                                } else {
                                  form.setFieldError(
                                    "certification",
                                    'Error: Please select a certification or fill in the "Other Certification" field.'
                                  );
                                }
                                if (
                                  newValue.length > 0 ||
                                  form.values.certifications_other
                                ) {
                                  setFilledFields((prev) =>
                                    new Set(prev).add("certification")
                                  );
                                } else {
                                  setFilledFields((prev) => {
                                    const newFilledFields = new Set(prev);
                                    newFilledFields.delete("certification");
                                    return newFilledFields;
                                  });
                                }
                              };

                              return (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!(
                                      form.errors.certification &&
                                      (form.submitCount > 0 ||
                                        form.touched.certification)
                                    )
                                  }
                                  sx={{ width: "100%" }}
                                >
                                  <FormGroup>
                                    {certifications.map((certification) => (
                                      <FormControlLabel
                                        key={certification}
                                        control={
                                          <Field
                                            type="checkbox"
                                            name="certification"
                                            value={certification}
                                            as={SurveyCheckboxStyle}
                                            onChange={() =>
                                              handleCheckboxChange(
                                                certification
                                              )
                                            }
                                          />
                                        }
                                        label={certification}
                                        sx={{
                                          color: field.value.includes(
                                            certification
                                          )
                                            ? "#d7282f"
                                            : "default",
                                        }}
                                        className="labelstyle"
                                      />
                                    ))}
                                  </FormGroup>
                                  {field.value.includes("Other") && (
                                    <SurveyTextFieldBox>
                                      <SurveyTextField
                                        id="otherCertification"
                                        name="certifications_other"
                                        variant="outlined"
                                        placeholder="Other Certification"
                                        fullWidth
                                        error={
                                          !!(
                                            form.errors.certifications_other &&
                                            form.submitCount > 0
                                          )
                                        } // Show error if applicable
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          form.setFieldValue(
                                            "certifications_other",
                                            value
                                          );
                                          if (value || field.value.length > 0) {
                                            form.setFieldError(
                                              "certification",
                                              ""
                                            );
                                            setFilledFields((prev) =>
                                              new Set(prev).add("certification")
                                            );
                                          } else {
                                            if (
                                              !value &&
                                              field.value.length === 0
                                            ) {
                                              form.setFieldError(
                                                "certification",
                                                'Error: Please select a certification or fill in the "Other Certification" field.'
                                              );
                                              setFilledFields((prev) => {
                                                const newFilledFields = new Set(
                                                  prev
                                                );
                                                newFilledFields.delete(
                                                  "certifications_other"
                                                );
                                                return newFilledFields;
                                              });
                                            }
                                          }
                                        }}
                                      />
                                    </SurveyTextFieldBox>
                                  )}
                                  {form.submitCount > 0 &&
                                    form.errors.certification && (
                                      <FormHelperText error>
                                        {form.errors.certification}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              );
                            }}
                          </Field>
                        </SurveyList>

                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              Production Capacity:
                            </SurveyListHeading>

                            <Field name="production_capacity">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    form.touched.production_capacity &&
                                    !!form.errors.production_capacity
                                  }
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="production-capacity-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      form.setFieldValue(
                                        field.name,
                                        event.target.value
                                      );
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        setFieldValue
                                      );
                                    }}
                                    className="labelstyle"
                                  >
                                    <FormControlLabel
                                      value="<1,000 units per year"
                                      control={<SurveyRadioButton />}
                                      label="<1,000 units per year"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value ===
                                          "<1,000 units per year"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="1,000-10,000 units per year"
                                      control={<SurveyRadioButton />}
                                      label="1,000-10,000 units per year"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value ===
                                          "1,000-10,000 units per year"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="10,000-50,000 units per year"
                                      control={<SurveyRadioButton />}
                                      label="10,000-50,000 units per year"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value ===
                                          "10,000-50,000 units per year"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="50,000-100,000 units per year"
                                      control={<SurveyRadioButton />}
                                      label="50,000-100,000 units per year"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value ===
                                          "50,000-100,000 units per year"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                  </RadioGroup>
                                  {form.touched.production_capacity &&
                                    form.errors.production_capacity && (
                                      <FormHelperText>
                                        {form.errors.production_capacity}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>
                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              Warehouse Volume:
                            </SurveyListHeading>

                            <Field name="warehouse_volume">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    form.touched.warehouse_volume &&
                                    !!form.errors.warehouse_volume
                                  }
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="warehouse-volume-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      form.setFieldValue(
                                        field.name,
                                        event.target.value
                                      );
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        setFieldValue
                                      );
                                    }}
                                    className="labelstyle"
                                  >
                                    <FormControlLabel
                                      value="<1,000 m³"
                                      control={<SurveyRadioButton />}
                                      label="<1,000 m³"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "<1,000 m³"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="1,000-5,000 m³"
                                      control={<SurveyRadioButton />}
                                      label="1,000-5,000 m³"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "1,000-5,000 m³"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="5,000-10,000 m³"
                                      control={<SurveyRadioButton />}
                                      label="5,000-10,000 m³"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "5,000-10,000 m³"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="10,000-20,000 m³"
                                      control={<SurveyRadioButton />}
                                      label="10,000-20,000 m³"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "10,000-20,000 m³"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                  </RadioGroup>
                                  {form.touched.warehouse_volume &&
                                    form.errors.warehouse_volume && (
                                      <FormHelperText>
                                        {form.errors.warehouse_volume}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>
                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              Are you currently seeking partnerships or
                              suppliers?{" "}
                              <span style={{ color: "#d7282f" }}> * </span>
                            </SurveyListHeading>

                            <Field name="seeking_partnerships">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.seeking_partnerships &&
                                    form.submitCount > 0
                                  }
                                >
                                  <RadioGroup
                                    {...field}
                                    aria-labelledby="seeking-partnerships-group-label"
                                    value={field.value}
                                    onChange={(event) => {
                                      field.onChange(event); // This updates Formik's internal state
                                      handleFieldChange(
                                        field.name,
                                        event,
                                        form.setFieldValue
                                      ); // Custom handler if needed
                                      form.setFieldTouched(field.name, true); // Mark the field as touched
                                      if (form.errors.seeking_partnerships) {
                                        form.setFieldError(field.name, ""); // Clear error on interaction
                                      }
                                    }}
                                    className="labelstyle"
                                  >
                                    <FormControlLabel
                                      value="Yes"
                                      control={<SurveyRadioButton />}
                                      label="Yes"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "Yes"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                    <FormControlLabel
                                      value="No"
                                      control={<SurveyRadioButton />}
                                      label="No"
                                      className="labelstyle"
                                      sx={{
                                        color:
                                          field.value === "No"
                                            ? "#d7282f"
                                            : "default",
                                      }}
                                    />
                                  </RadioGroup>
                                  {form.submitCount > 0 &&
                                    form.errors.seeking_partnerships && (
                                      <FormHelperText>
                                        {form.errors.seeking_partnerships}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>

                        <SurveyList>
                          <SurveyTextFieldBox>
                            <SurveyListHeading>
                              How did you hear about PowerCozmo?{" "}
                              <span style={{ color: "#d7282f" }}> * </span>
                            </SurveyListHeading>
                            <SurveyTextFieldBox>
                              <Field name="hear_about">
                                {({ field, form, meta }) => {
                                  let isFocused = false; // Local variable to manage focus state

                                  return (
                                    <FormControl
                                      fullWidth
                                      error={
                                        form.submitCount > 0 && !!meta.error
                                      } // Show error after submission
                                    >
                                      <SurveyTextField
                                        {...field}
                                        variant="outlined"
                                        placeholder="Trade show, Social media"
                                        fullWidth
                                        className="textfieldstyle"
                                        error={
                                          form.submitCount > 0 && !!meta.error
                                        } // Use submitCount for error display
                                        onFocus={() => (isFocused = true)} // Set focus state to true on focus
                                        onBlur={() => {
                                          isFocused = false; // Set focus state to false on blur
                                          form.setFieldTouched(
                                            field.name,
                                            true
                                          ); // Mark field as touched
                                        }}
                                        onChange={(e) => {
                                          const value = e.target.value; // Get the value from the event
                                          handleFieldChange(
                                            field.name,
                                            e,
                                            form.setFieldValue
                                          ); // Ensure Formik manages the state
                                          form.setFieldError(field.name, ""); // Clear error on change
                                          form.setFieldValue(field.name, value); // Update Formik value to allow spaces
                                        }}
                                      />
                                      {form.submitCount > 0 && meta.error && (
                                        <FormHelperText error>
                                          {meta.error}
                                        </FormHelperText>
                                      )}
                                    </FormControl>
                                  );
                                }}
                              </Field>
                            </SurveyTextFieldBox>
                          </SurveyTextFieldBox>
                        </SurveyList>

                        <SurveyList>
                          <SurveyListHeading>
                            Rate the Following Aspects on a Scale of 1 (Poor) to
                            5 (Excellent):
                          </SurveyListHeading>
                          <SurveyTextFieldBox>
                            <SurveyInnerList type="a">
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Platform Usability:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  How easy is it to navigate and use
                                  PowerCozmo's platform?
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="platform_usability">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors.platform_usability &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {
                                            if (!field.value) {
                                            }
                                          }}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors.platform_usability && (
                                            <FormHelperText>
                                              {form.errors.platform_usability}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Quality of Supplier Information:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  How would you rate the quality and depth of
                                  supplier information available?
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="quality_of_supplier_information">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors
                                            .quality_of_supplier_information &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {
                                            if (!field.value) {
                                            }
                                          }}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors
                                            .quality_of_supplier_information && (
                                            <FormHelperText>
                                              {
                                                form.errors
                                                  .quality_of_supplier_information
                                              }
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Product Range and Categories:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  How satisfied are you with the range of
                                  products and categories on PowerCozmo?
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="product_range">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors.product_range &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {}}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors.product_range && (
                                            <FormHelperText>
                                              {form.errors.product_range}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Communication with Suppliers or Buyers:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  Rate the ease of communication with suppliers
                                  or buyers through the platform.
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="communication">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors.communication &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {}}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors.communication && (
                                            <FormHelperText>
                                              {form.errors.communication}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Live Chat Feature:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  How would you rate your experience with
                                  PowerCozmo’s live chat feature?
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="live_chat">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors.live_chat &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {}}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors.live_chat && (
                                            <FormHelperText>
                                              {form.errors.live_chat}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Transaction Process:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  How smooth and efficient is the transaction
                                  process on PowerCozmo?
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="transaction">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors.transaction &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {}}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors.transaction && (
                                            <FormHelperText>
                                              {form.errors.transaction}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                              <SurveyInnerListData>
                                <SurveyListInnerHeading>
                                  Customer Support:
                                </SurveyListInnerHeading>
                                <SurveyListInnerText>
                                  How would you rate the quality of customer
                                  support?
                                </SurveyListInnerText>
                                <Box>
                                  <Field name="customer_support">
                                    {({ field, form }) => (
                                      <FormControl
                                        fullWidth
                                        error={
                                          !!form.errors.customer_support &&
                                          form.submitCount > 0
                                        }
                                      >
                                        <Rating
                                          className="RatingStyle"
                                          name={field.name}
                                          value={field.value || 0}
                                          onChange={(event, newValue) => {
                                            form.setFieldValue(
                                              field.name,
                                              newValue
                                            );
                                            handleFieldChange(
                                              field.name,
                                              event,
                                              form.setFieldValue
                                            );
                                            if (newValue) {
                                              form.setFieldError(
                                                field.name,
                                                ""
                                              );
                                            }
                                          }}
                                          onBlur={() => {}}
                                        />
                                        {form.submitCount > 0 &&
                                          form.errors.customer_support && (
                                            <FormHelperText>
                                              {form.errors.customer_support}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    )}
                                  </Field>
                                </Box>
                              </SurveyInnerListData>
                            </SurveyInnerList>
                          </SurveyTextFieldBox>
                        </SurveyList>
                        <SurveyList>
                          <SurveyListHeading>
                            Comments or Suggestions:
                          </SurveyListHeading>
                          <SurveyTextFieldBox>
                            <Field name="comments">
                              {({ field, form }) => (
                                <FormControl
                                  component="fieldset"
                                  error={
                                    !!form.errors.comments &&
                                    form.submitCount > 0
                                  }
                                  fullWidth
                                >
                                  <SurveyTextField
                                    {...field}
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Comment"
                                    multiline
                                    maxRows={4}
                                    rows={8}
                                    sx={{
                                      width: "60%",
                                      padding: "0",
                                      backgroundColor: "#fff",
                                      "& .MuiOutlinedInput-root": {
                                        padding: "12px",
                                      },
                                      "@media screen and (max-width:900px)": {
                                        width: "100%",
                                      },
                                    }}
                                    onChange={(e) => {
                                      handleFieldChange(
                                        "comments",
                                        e,
                                        form.setFieldValue
                                      );
                                      if (e.target.value.trim()) {
                                        form.setFieldError(field.name, "");
                                      }
                                    }}
                                    onBlur={() => {
                                      if (!field.value.trim()) {
                                      }
                                    }}
                                    error={
                                      !!form.errors.comments &&
                                      form.submitCount > 0
                                    }
                                  />
                                  {form.submitCount > 0 &&
                                    form.errors.comments && (
                                      <FormHelperText error>
                                        {form.errors.comments}
                                      </FormHelperText>
                                    )}
                                </FormControl>
                              )}
                            </Field>
                          </SurveyTextFieldBox>
                        </SurveyList>
                      </SurveyOrderedList>

                      <SurveySubmitButtonBox>
                        <SurveySubmitButton type="submit">
                          Submit
                        </SurveySubmitButton>
                      </SurveySubmitButtonBox>
                    </SurveyFormBox>
                  </Form>
                )}
              </Formik>
            </SurveyContentBox>
          </SurveyInnerBox>
        </SurveyOuterBox>
      )}
    </>
  );
};

export default SurveyForm;

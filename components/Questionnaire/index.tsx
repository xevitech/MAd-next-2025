import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  AvtarImg,
  QuestionarryInfoLeft,
  FillAnswerArea,
  InfoContent,
  InfoContentInner,
  MyQNameField,
  MyQNameValue,
  MyQueryBox,
  QuestionarryInfoRight,
  QFilledInfoItem,
  QuestionWeb,
  QuestionnaireContent,
  QuestionnaireFormInner,
  QuestionnaireFormOuter,
  ReviewSubmit,
  WebFormControl,
  ListRowwUp,
  QuestionarryInfo,
  PersonalInfoPart,
  HeadingTop,
  InfoContentInner2,
  QuwstionnaryNoDataFound,
  QuwstionnaryNoDataInner,
  QRedButton,
} from "./styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import QuestionnaireSkeleton from "../CRM/Skeletons/QuestionnaireSkeleton";
import { apiClient } from "../common/common";
import { useRouter } from "next/router";
import CountrySelect from "../common/countrydropdown/Index";
import { countries } from "@/utils/countries";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { CustomDateTimePicker } from "@/components/common/datePicker/CustomDateTimePicker";
import { CustomDatePicker } from "@/components/common/datePicker";
function QuestionnaireForm() {
  const [loader, setLoader] = React.useState(false);
  const [formData, setFormData] = useState([]);
  const [profileData, setProfileData] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [submitForm, setSubmitForm] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const router = useRouter();
  const fetchQuesten = async () => {
    setLoader(true);
    let response = await apiClient(
      `questionnaire/single_lead_form_detail?unique_id=${router?.query?.id?.[0]}&type_id=${router?.query?.id?.[1]}&crm_user_form_unique_id=${router?.query?.id?.[2]}`,
      "get"
    );
    if (response.status == true || response.status == 200) {
      setLoader(false);
      setFormData(response?.data?.survey_field);
      setProfileData(response?.data?.profile_info);
    } else {
      setLoader(false);
      setFormData([]);
      setProfileData([]);
    }
  };

  const handleRadioChange = (e, formIndex) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    const newData = [...formData];
    setFormData((prevData) =>
      prevData.map((item) => {
        if (item.id === newData[formIndex].id) {
          return {
            ...item,
            value: newValue,
          };
        }
        return item;
      })
    );
  };

  const handleCountry = async (country, formIndex) => {
    const newData = [...formData];
    setFormData((prevData) =>
      prevData.map((item) => {
        if (item.id === newData[formIndex].id) {
          return {
            ...item,
            value: country,
          };
        }
        return item;
      })
    );
  };

  const handleDateTime = async (dateTime, formIndex) => {
    const newData = [...formData];
    setFormData((prevData) =>
      prevData.map((item) => {
        if (item.id === newData[formIndex].id) {
          return {
            ...item,
            value: dateTime,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    router?.query?.id && fetchQuesten();
  }, [router]);

  const handleSubmit = async () => {
    const blankValue = formData?.map((ele) => {
      if (ele?.value == null || ele?.value == "") {
        return true;
      } else {
        return false;
      }
    });

    if (blankValue.includes(true)) {
      setSubmitForm(true);
    } else {
      setFormLoader(true);
      setSubmitForm(false);
      let payloads = {
        crm_user_form_unique_id: formData?.[0]?.crm_user_form_unique_id,
        type_id: formData?.[0]?.type_id,
        unique_id: formData?.[0]?.unique_id,
        form_input_value: formData?.map((ele) => {
          return {
            id: ele?.crm_save_form_id,
            section_form_id: ele?.id,
            form_input_list_id: ele?.form_input_list_id,
            value: ele?.value,
            unique: ele?.unique,
          };
        }),
      };

      let response = await apiClient(`questionnaire/save_input_form`, "post", {
        body: payloads,
      });
      if (response.status == true || response.status == 200) {
        setFormLoader(false);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "custom-btn cancel-button",
            cancelButton: "custom-btn remove-btn",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "Successfully!",
            text: "Thank you for your time! We wanted to inform you that we have incorporated the latest changes into the inquiry/enquiry.",
            icon: "success",
          })
          .then(function () {
            router.push(`/`);
          });
      }
    }
  };

  return (
    <QuestionnaireFormOuter className="fixed-header">
      <QuestionnaireFormInner>
        <QuestionnaireContent>
          {loader ? (
            <QuestionnaireSkeleton />
          ) : (
            <>
              {formData?.length > 0 && (
                <PersonalInfoPart>
                  <HeadingTop variant="h6">Product Questionnaire </HeadingTop>
                  <Typography variant="body2" className="subdescription">
                    Thank you for your interest in our products! To assist you
                    better, please take a moment to provide us with some
                    information about your requirements. Your feedback will help
                    us tailor our offerings to meet your specific needs.
                  </Typography>
                  <InfoContentInner>
                    <ListRowwUp>
                      <Grid
                        container
                        spacing={2}
                        style={{ display: "flex", alignItems: "streatch" }}
                      >
                        <Grid item xs={12} sm={4} md={4}>
                          <QuestionarryInfoLeft>
                            <QuestionarryInfo>
                              <AvtarImg style={{ textAlign: "center" }}>
                                <img
                                  alt={profileData?.First_Name}
                                  src={
                                    profileData?.profile_image
                                      ? profileData?.profile_image
                                      : profileData?.First_Name
                                  }
                                />
                              </AvtarImg>
                              <Typography className="Qname">
                                {profileData?.First_Name}{" "}
                                {profileData?.Last_Name}
                              </Typography>
                              <Typography className="designation">
                                {profileData?.job_function}{" "}
                                {profileData?.job_function && "at"}{" "}
                                {profileData?.Account}
                              </Typography>
                            </QuestionarryInfo>
                          </QuestionarryInfoLeft>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                          <QuestionarryInfoRight>
                            <QFilledInfoItem>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameField>Name</MyQNameField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameValue>
                                    {profileData?.First_Name}{" "}
                                    {profileData?.Last_Name}
                                  </MyQNameValue>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  {" "}
                                  <Divider />
                                </Grid>
                              </Grid>
                            </QFilledInfoItem>
                            <QFilledInfoItem>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameField>Email</MyQNameField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameValue>
                                    {profileData?.mail
                                      ? profileData?.mail
                                      : profileData?.Email}
                                  </MyQNameValue>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  {" "}
                                  <Divider />
                                </Grid>
                              </Grid>
                            </QFilledInfoItem>
                            <QFilledInfoItem>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameField>Phone</MyQNameField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameValue>
                                    {profileData?.["Mobile_No."]?.includes("+")
                                      ? profileData?.["Mobile_No."]
                                      : "+ " + profileData?.["Mobile_No."]}
                                  </MyQNameValue>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  {" "}
                                  <Divider />
                                </Grid>
                              </Grid>
                            </QFilledInfoItem>
                            <QFilledInfoItem>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameField>Address</MyQNameField>
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                  <MyQNameValue>
                                    {profileData?.Street} {profileData?.City}{" "}
                                    {profileData?.State} {profileData?.Country}{" "}
                                    {profileData?.Zip_Code}
                                  </MyQNameValue>
                                </Grid>
                              </Grid>
                            </QFilledInfoItem>
                          </QuestionarryInfoRight>
                        </Grid>
                      </Grid>
                    </ListRowwUp>
                  </InfoContentInner>
                </PersonalInfoPart>
              )}

              <InfoContent>
                <InfoContentInner2>
                  {formData?.length > 0 ? (
                    formData?.map((inputs, formIndex) => {
                      return (
                        <>
                          {inputs?.field_type == "select" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              {inputs?.value == "" || inputs?.value == null ? (
                                <HelpCenterOutlinedIcon className="iconques" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-success icondone"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="10"
                                  >
                                    <circle
                                      className="success-circle-outline"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <circle
                                      className="success-circle-fill"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <polyline
                                      className="success-tick"
                                      points="17,8.5 9.5,15.5 7,13"
                                    />
                                  </g>
                                </svg>
                              )}

                              <QuestionWeb variant="h6">
                                {inputs?.name == "Budget"
                                  ? `What is your ${inputs?.label?.toLowerCase()} for this project?`
                                  : `Please select your ${inputs?.label?.toLowerCase()}?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputs?.value}
                                    size="small"
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => {
                                      const newData = [...formData];
                                      setFormData((prevData) =>
                                        prevData.map((item) => {
                                          if (
                                            item.id === newData[formIndex].id
                                          ) {
                                            return {
                                              ...item,
                                              value: e.target.value,
                                            };
                                          }
                                          return item;
                                        })
                                      );
                                    }}
                                    IconComponent={
                                      KeyboardArrowDownOutlinedIcon
                                    }
                                  >
                                    {inputs?.option_list?.map(
                                      (element, index) => (
                                        <MenuItem value={element} key={index}>
                                          {element}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                  <FormHelperText>
                                    {submitForm &&
                                      inputs?.value == null &&
                                      `Please select ${inputs?.label?.toLowerCase()}`}
                                  </FormHelperText>
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "checkbox" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              {inputs?.value == "" || inputs?.value == null ? (
                                <HelpCenterOutlinedIcon className="iconques" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-success icondone"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="10"
                                  >
                                    <circle
                                      className="success-circle-outline"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <circle
                                      className="success-circle-fill"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <polyline
                                      className="success-tick"
                                      points="17,8.5 9.5,15.5 7,13"
                                    />
                                  </g>
                                </svg>
                              )}
                              <QuestionWeb variant="h6">
                                {`Would you like to enable ${inputs?.label?.toLowerCase()} service for receiving messages?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl
                                  fullWidth
                                  className="myradiobutton"
                                >
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={selectedValue === "1"}
                                          onChange={(e) => {
                                            handleRadioChange(e, formIndex);
                                          }}
                                          value="1"
                                        />
                                      }
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={selectedValue === "0"}
                                          onChange={(e) => {
                                            handleRadioChange(e, formIndex);
                                          }}
                                          value="0"
                                        />
                                      }
                                      label="No"
                                    />
                                    <FormHelperText>
                                      {submitForm &&
                                        inputs?.value == null &&
                                        `Please select ${inputs?.label?.toLowerCase()}`}
                                    </FormHelperText>
                                  </FormGroup>
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "textarea" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              {inputs?.value == "" || inputs?.value == null ? (
                                <HelpCenterOutlinedIcon className="iconques" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-success icondone"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="10"
                                  >
                                    <circle
                                      className="success-circle-outline"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <circle
                                      className="success-circle-fill"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <polyline
                                      className="success-tick"
                                      points="17,8.5 9.5,15.5 7,13"
                                    />
                                  </g>
                                </svg>
                              )}
                              <QuestionWeb variant="h6">
                                {`Please provide a ${inputs?.label?.toLowerCase()} of your specific needs or requirements`}
                                ?
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    placeholder="Enter description in detail"
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      submitForm &&
                                      inputs?.value == null &&
                                      `Please select ${inputs?.label?.toLowerCase()}`
                                    }
                                    onChange={(e) => {
                                      const newData = [...formData];
                                      setFormData((prevData) =>
                                        prevData.map((item) => {
                                          if (
                                            item.id === newData[formIndex].id
                                          ) {
                                            return {
                                              ...item,
                                              value: e.target.value,
                                            };
                                          }
                                          return item;
                                        })
                                      );
                                    }}
                                  />
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "country" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              <HelpCenterOutlinedIcon
                                className={
                                  inputs?.value == "" || inputs?.value == null
                                    ? "iconques"
                                    : "icondone"
                                }
                              />
                              <QuestionWeb variant="h6">
                                {`Select your ${inputs?.label?.toLowerCase()} from the list below?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <CountrySelect
                                    size="small"
                                    country={inputs?.value ? inputs?.value : ""}
                                    setCountry={(value) => {
                                      const country = countries.find(
                                        (item) => item?.code == value
                                      )?.name;
                                      handleCountry(country, formIndex);
                                    }}
                                    type="crm"
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                  />
                                  <FormHelperText>
                                    {submitForm &&
                                      inputs?.value == null &&
                                      `Please select ${inputs?.label?.toLowerCase()}`}
                                  </FormHelperText>
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "integer" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              {inputs?.value == "" || inputs?.value == null ? (
                                <HelpCenterOutlinedIcon className="iconques" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-success icondone"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="10"
                                  >
                                    <circle
                                      className="success-circle-outline"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <circle
                                      className="success-circle-fill"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <polyline
                                      className="success-tick"
                                      points="17,8.5 9.5,15.5 7,13"
                                    />
                                  </g>
                                </svg>
                              )}
                              <QuestionWeb variant="h6">
                                {`Please enter your ${inputs?.label?.toLowerCase()} or area code?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label=""
                                    value={inputs?.value}
                                    variant="outlined"
                                    placeholder="160101"
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      submitForm &&
                                      inputs?.value == null &&
                                      `Please enter ${inputs?.label?.toLowerCase()} eg.(160 101)  `
                                    }
                                    onChange={(e) => {
                                      const numericRegex = /^[0-9]*$/;
                                      if (
                                        numericRegex.test(e.target.value) ===
                                        true
                                      ) {
                                        const newData = [...formData];
                                        setFormData((prevData) =>
                                          prevData.map((item) => {
                                            if (
                                              item.id === newData[formIndex].id
                                            ) {
                                              return {
                                                ...item,
                                                value: e.target.value,
                                              };
                                            }
                                            return item;
                                          })
                                        );
                                      }
                                    }}
                                  />
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "float" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              {inputs?.value == "" || inputs?.value == null ? (
                                <HelpCenterOutlinedIcon className="iconques" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-success icondone"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="10"
                                  >
                                    <circle
                                      className="success-circle-outline"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <circle
                                      className="success-circle-fill"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <polyline
                                      className="success-tick"
                                      points="17,8.5 9.5,15.5 7,13"
                                    />
                                  </g>
                                </svg>
                              )}
                              <QuestionWeb variant="h6">
                                {inputs?.name == "Annual_Revenue"
                                  ? `Please describe your ${inputs?.label?.toLowerCase()}, including any relevant details about your financial performance?`
                                  : `Please describe your ${inputs?.label?.toLowerCase()}?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label=""
                                    variant="outlined"
                                    placeholder="9999"
                                    value={inputs?.value}
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      submitForm &&
                                      inputs?.value == null &&
                                      `Please enter ${inputs?.label?.toLowerCase()} eg.($9999)  `
                                    }
                                    onChange={(e) => {
                                      const numericRegex = /^[0-9]*$/;
                                      if (numericRegex.test(e.target.value)) {
                                        console.log(".........");
                                        const newData = [...formData];
                                        setFormData((prevData) =>
                                          prevData.map((item) => {
                                            if (
                                              item.id === newData[formIndex].id
                                            ) {
                                              return {
                                                ...item,
                                                value: e.target.value,
                                              };
                                            }
                                            return item;
                                          })
                                        );
                                      }
                                    }}
                                  />
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "date" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              <HelpCenterOutlinedIcon
                                className={
                                  inputs?.value == "" || inputs?.value == null
                                    ? "iconques"
                                    : "icondone"
                                }
                              />
                              <QuestionWeb variant="h6">
                                {`Please select ${inputs?.label?.toLowerCase()}`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <CustomDatePicker
                                    label={""}
                                    value={""}
                                    size="small"
                                    type="crm"
                                    handleChange={({ target }) => {
                                      handleDateTime(target.value, formIndex);
                                    }}
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      submitForm &&
                                      inputs?.value == null &&
                                      `Please select ${inputs?.label?.toLowerCase()}`
                                    }
                                  />
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : inputs?.field_type == "timestamp" ? (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              <HelpCenterOutlinedIcon
                                className={
                                  inputs?.value == "" || inputs?.value == null
                                    ? "iconques"
                                    : "icondone"
                                }
                              />
                              <QuestionWeb variant="h6">
                                {`Please select ${inputs?.label?.toLowerCase()}?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <CustomDateTimePicker
                                    label={""}
                                    value={""}
                                    size="small"
                                    handleChange={({ target }) => {
                                      handleDateTime(target.value, formIndex);
                                    }}
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      submitForm &&
                                      inputs?.value == null &&
                                      `Please select ${inputs?.label?.toLowerCase()}`
                                    }
                                  />
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          ) : (
                            <MyQueryBox
                              className={
                                inputs?.value == "" || inputs?.value == null
                                  ? ""
                                  : "sucessbox"
                              }
                            >
                              {inputs?.value == "" || inputs?.value == null ? (
                                <HelpCenterOutlinedIcon className="iconques" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="svg-success icondone"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-miterlimit="10"
                                  >
                                    <circle
                                      className="success-circle-outline"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <circle
                                      className="success-circle-fill"
                                      cx="12"
                                      cy="12"
                                      r="11.5"
                                    />
                                    <polyline
                                      className="success-tick"
                                      points="17,8.5 9.5,15.5 7,13"
                                    />
                                  </g>
                                </svg>
                              )}
                              <QuestionWeb variant="h6">
                                {`What is your ${inputs?.label?.toLowerCase()}?`}
                              </QuestionWeb>
                              <FillAnswerArea>
                                <WebFormControl fullWidth>
                                  <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label=""
                                    value={inputs?.value}
                                    variant="outlined"
                                    error={
                                      submitForm && inputs?.value == null
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      submitForm &&
                                      inputs?.value == null &&
                                      `Please enter ${inputs?.label?.toLowerCase()}`
                                    }
                                    onChange={(e) => {
                                      const newData = [...formData];
                                      setFormData((prevData) =>
                                        prevData.map((item) => {
                                          if (
                                            item.id === newData[formIndex].id
                                          ) {
                                            return {
                                              ...item,
                                              value: e.target.value,
                                            };
                                          }
                                          return item;
                                        })
                                      );
                                    }}
                                  />
                                </WebFormControl>
                              </FillAnswerArea>
                            </MyQueryBox>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <>
                      <PersonalInfoPart>
                        <QuwstionnaryNoDataFound>
                          <HeadingTop variant="h6">
                            Product Questionnaire{" "}
                          </HeadingTop>
                          <Typography
                            variant="body2"
                            className="subdescription"
                          >
                            Thank you for your interest in our products! To
                            assist you better, please take a moment to provide
                            us with some information about your requirements.
                            Your feedback will help us tailor our offerings to
                            meet your specific needs.
                          </Typography>

                          <QuwstionnaryNoDataInner>
                            <img src="/assets/images/crm/task-image.svg" />
                            <Typography>No data found!</Typography>
                            <QRedButton variant="contained">Go Back</QRedButton>
                          </QuwstionnaryNoDataInner>
                        </QuwstionnaryNoDataFound>
                      </PersonalInfoPart>
                    </>
                  )}

                  {formData?.length > 0 && (
                    <ReviewSubmit>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        {formLoader ? (
                          <ThreeDots
                            height="18"
                            width="40"
                            radius="9"
                            color="white"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            visible={true}
                          />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </ReviewSubmit>
                  )}
                </InfoContentInner2>
              </InfoContent>
            </>
          )}
        </QuestionnaireContent>
      </QuestionnaireFormInner>
    </QuestionnaireFormOuter>
  );
}
export default QuestionnaireForm;

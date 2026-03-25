import React, { useContext, useEffect, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import * as Yup from "yup";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainer,
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditBrowseIcon,
  EditBrowseText,
  EditModeBoxContainer,
  EditSaveIcons,
  EditUpImagesStack,
  FooterDiv,
  Radiomain,
  SavebtnBox,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SubHeadingPage,
  TypographyTitle,
} from "../../style";

import { getCompanyProfile } from "@/hooks/company";
import { apiClient, imageTypeMessage } from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import HelperText from "../../../Common/helperText";
import { isArray } from "lodash";
import { ThreeDots } from "react-loader-spinner";
import { MyAppContext } from "@/contextApi/appContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CommonQaQCBlock({ type }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [showData, setShowData] = useState(true);
  const dispatch = useDispatch();
  const [qualityAssurance, setQualityAssurence] = useState<any>({});
  const [Files, setFiles] = useState<any>([]);
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );

  let wholesalers_qaqc,
    retailer_qaqc,
    distributor_qaqc,
    manufacture_qaqc,
    reseller_qaqc,
    other_qaqc;

  if (companyDetails?.qaqc_rnd) {
    ({
      wholesalers_qaqc,
      retailer_qaqc,
      distributor_qaqc,
      manufacture_qaqc,
      reseller_qaqc,
      other_qaqc,
    } = companyDetails.qaqc_rnd);
  }
  let imageData;
  if (type == "wholesalar") {
    imageData = wholesalers_qaqc ? wholesalers_qaqc : null;
  } else if (type == "distributor") {
    imageData = distributor_qaqc ? distributor_qaqc : null;
  } else if (type == "retailer") {
    imageData = retailer_qaqc ? retailer_qaqc : null;
  } else if (type == "reseller") {
    imageData = reseller_qaqc ? reseller_qaqc : null;
  } else if (type == "other") {
    imageData = other_qaqc ? other_qaqc : null;
  }
  const [image, setImage] = useState(JSON.parse(imageData));
  useEffect(() => {
    getQuailtyAssuranceDetails();
    setSelectedValue("no");
    setImage(testingImageUrl);
  }, []);

  const [selectedValue, setSelectedValue] = useState(
    qualityAssurance?.qa_enable ?? "no"
  );

  const getQuailtyAssuranceDetails = async () => {
    let response = await apiClient("company_profile/QAQC/view", "get");
    if (response.status === 200) {
      const { data } = response;
      setQualityAssurence(data);
    }
  };

  const validation = Yup.object().shape({
    testing_certificate: Yup.array()
      .nullable()
      .min(1, "Please upload at least one image")
      .max(3, "Please upload a maximum of 3 images")
      .required("Please upload an image")
      .test("fileFormat", imageTypeMessage, (value) => {
        if (value) {
          return value.every((url) => url.match(/\.(jpeg|jpg|png)$/));
        }
        return true;
      }),
    first_pass_yield: Yup.number()
      .typeError("Enter a valid number")
      .required("Please enter first pass yield rate")
      .min(0, "Value must be greater than or equal to 0")
      .max(100, "maximum 100% required"),

    certificate_level_quality: Yup.string()
      .required("Please enter level of quality head")
      .max(
        100,
        "Certificate level of quality head content is too long Please limit it to 100 characters"
      ),
    inspecting_parties: Yup.string()
      .required("Please enter inspecting parties")
      .max(
        100,
        "inspecting parties content is too long. Please limit it to 100 characters"
      ),
  });

  let testingImageUrl = "";
  if (type == "distributor") {
    try {
      if (distributor_qaqc) {
        const distributor_image = JSON.parse(distributor_qaqc);
        testingImageUrl =
          distributor_image?.Distributor.values.testing_certificate;
      }
    } catch (error) {}
  } else if (type == "retailer") {
    try {
      const retailer_image = JSON.parse(distributor_qaqc);
      testingImageUrl = retailer_image?.Retailer.values.testing_certificate;
    } catch (error) {}
  } else if (type == "wholesalar") {
    try {
      if (wholesalers_qaqc) {
        const wholesaler_image = JSON.parse(wholesalers_qaqc);
        testingImageUrl = wholesaler_image?.Wholesalers.testing_certificate;
      }
    } catch (error) {}
  } else if (type == "reseller") {
    try {
      const reseller_image = JSON.parse(reseller_qaqc);
      testingImageUrl = reseller_image?.Reseller.values.testing_certificate;
    } catch (error) {}
  } else if (type == "other") {
    try {
      const other_image = JSON.parse(other_qaqc);
      testingImageUrl = other_image?.Other.values.testing_certificate;
    } catch (error) {}
  }
  const [loader, setLoader] = useState(false);
  const handleSaveImage = async (files: File[]) => {
    let formData = new FormData();

    files.forEach((file) => {
      formData.append("company_photos[]", file);
    });

    try {
      setCompleteScreenLoader(true);
      let response = await apiClient(
        "company_profile/file_upload_qaqc_rnd",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status) {
        setCompleteScreenLoader(false);
        let responseData = response.data.split(",");
        let existingUrlsArray = image
          ? image.split(",").map((url) => url.trim())
          : [];
        const totalImagesCount = existingUrlsArray.length + responseData.length;
        if (totalImagesCount > 3) {
          formik.setFieldError(
            "testing_certificate",
            "You can only upload up to 3 images."
          );
          return;
        }
        const newUrlsArray = [...existingUrlsArray, ...responseData];
        setImage(newUrlsArray.join(","));
        formik.setFieldValue("testing_certificate", newUrlsArray);

        setQualityAssurence(newUrlsArray);
      }
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const removeFileDynamic = (index) => {
    const urls = image.split(",").map((url) => url.trim());
    urls.splice(index, 1);
    setImage(urls.join(", "));
    formik.setFieldValue("testing_certificate", urls);
  };

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const acceptedFileTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 2 * 1024 * 1024;

    const filteredFiles = files.filter((file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        formik.setFieldError(
          "testing_certificate",
          "Only JPG and PNG formats are accepted."
        );
        return false;
      }
      if (file.size > maxFileSize) {
        formik.setFieldError(
          "testing_certificate",
          "File size must be less than 2MB."
        );
        return false;
      }
      return true;
    });

    if (filteredFiles.length === 0) {
      return;
    }

    const totalFiles = Files.length + filteredFiles.length;

    if (totalFiles > 3) {
      formik.setFieldError(
        "testing_certificate",
        "You can only upload up to 3 images."
      );
      return;
    } else {
      const updatedFiles = [...Files, ...filteredFiles];
      formik.setFieldError("testing_certificate", "");
      handleSaveImage(updatedFiles);
    }
  };
  let testing_certificate,
    inspecting_parties,
    first_pass_yield,
    certificate_level_quality,
    no_of_staff;

  if (type == "other") {
    try {
      const other_list = JSON.parse(other_qaqc);
      inspecting_parties = other_list.Other.values.inspecting_parties;
      first_pass_yield = other_list.Other.values.first_pass_yield;
      certificate_level_quality =
        other_list.Other.values.certificate_level_quality;
    } catch (error) {}
  } else if (type == "reseller") {
    try {
      const reseller_list = JSON.parse(reseller_qaqc);
      inspecting_parties = reseller_list.Reseller.values.inspecting_parties;
      first_pass_yield = reseller_list.Reseller.values.first_pass_yield;
      certificate_level_quality =
        reseller_list.Reseller.values.certificate_level_quality;
    } catch (error) {}
  } else if (type == "wholesalar") {
    try {
      const wholeseller_list = JSON.parse(wholesalers_qaqc);
      inspecting_parties = wholeseller_list.Wholesalers.inspecting_parties;
      first_pass_yield = wholeseller_list.Wholesalers.first_pass_yield;
      certificate_level_quality =
        wholeseller_list.Wholesalers.certificate_level_quality;
    } catch (error) {}
  } else if (type == "retailer") {
    try {
      const retailer_list = JSON.parse(retailer_qaqc);
      inspecting_parties = retailer_list.Retailer.values.inspecting_parties;
      first_pass_yield = retailer_list.Retailer.values.first_pass_yield;
      certificate_level_quality =
        retailer_list.Retailer.values.certificate_level_quality;
    } catch (error) {}
  } else if (type == "distributor") {
    try {
      const distributor_list = JSON.parse(distributor_qaqc);
      inspecting_parties =
        distributor_list.Distributor.values.inspecting_parties;
      first_pass_yield = distributor_list.Distributor.values.first_pass_yield;
      certificate_level_quality =
        distributor_list.Distributor.values.certificate_level_quality;
    } catch (error) {}
  }

  const removeFile = (indexToRemove) => {
    const updatedFiles = Files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    formik.setFieldValue("testing_certificate", testing_certificate);
    formik.setFieldValue("inspecting_parties", inspecting_parties);
    formik.setFieldValue("first_pass_yield", first_pass_yield);
    formik.setFieldError("testing_certificate", "");
    formik.setFieldError("inspecting_parties", "");
    formik.setFieldError("certificate_level_quality", "");
    formik.setFieldError("first_pass_yield", "");
  }, []);

  const handleCancel = () => {
    setSelectedValue("no");
    formik.setFieldValue("testing_certificate", testing_certificate);
    formik.setFieldValue("inspecting_parties", inspecting_parties);
    formik.setFieldValue("first_pass_yield", first_pass_yield);
    formik.setFieldError("testing_certificate", "");
    formik.setFieldError("inspecting_parties", "");
    formik.setFieldError("certificate_level_quality", "");
    formik.setFieldError("first_pass_yield", "");

    setEditMode(false);
  };

  let urlArray = (testingImageUrl || "").split(",").map((url) => url.trim());
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      testing_certificate: urlArray || "",
      inspecting_parties: inspecting_parties,
      first_pass_yield: first_pass_yield,
      certificate_level_quality: certificate_level_quality,
    },

    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoader(true);
      values.testing_certificate = image;

      const wholesalar_payload = {
        shop_id: companyDetails.basic_information.shop_id,
        wholesalers_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Wholesalers"]: { ...values, testing_certificate: image },
        },
      };
      const reseller_payload = {
        shop_id: companyDetails.basic_information.shop_id,
        reseller_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Reseller"]: { values, testing_certificate: image },
        },
      };
      const retailer_payload = {
        shop_id: companyDetails.basic_information.shop_id,
        retailer_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Retailer"]: { values, testing_certificate: image },
        },
      };
      const other = {
        shop_id: companyDetails.basic_information.shop_id,
        other_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Other"]: { values, testing_certificate: image },
        },
      };
      const distributor_payload = {
        shop_id: companyDetails.basic_information.shop_id,
        distributor_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Distributor"]: { values, testing_certificate: image },
        },
      };

      let payload_data;
      if (type == "wholesalar") {
        payload_data = wholesalar_payload;
      } else if (type == "reseller") {
        payload_data = reseller_payload;
      } else if (type == "retailer") {
        payload_data = retailer_payload;
      } else if (type == "other") {
        payload_data = other;
      } else if (type == "distributor") {
        payload_data = distributor_payload;
      }

      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "POST",
        {
          body: payload_data,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setLoader(false);
        setSelectedValue("no");

        setEditMode(false);
        getQuailtyAssuranceDetails();
        dispatch(getCompanyProfile());
      }
      setLoader(false);
    },
  });

  useEffect(() => {}, [image]);
  const { values, handleSubmit, handleChange, errors, setFieldError } = formik;

  return (
    <>
      <CompanyFacilityInnContainerQAQCnRND
        sx={{
          boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
          padding: editMode ? "16px" : "",
        }}
      >
        <Box
          sx={{
            border: "1px solid #e2e2e2",
            borderRadius: "5px",
            padding: "16px 10px 0px 15px",
            gap: "18px",
          }}
        >
          <SubHeadingPage className="qaqcandrndHeading">
            <TypographyTitle>QA/QC Department</TypographyTitle>
            <ButtonModeHere>
              {!editMode && (
                <Box
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: "400",
                    },
                  }}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={selectedValue}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="yes"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: "19px",
                              },
                              "&.Mui-checked": {
                                color: "#d7282f",
                              },
                            }}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: "19px",
                              },
                              "&.Mui-checked": {
                                color: "#d7282f",
                              },
                            }}
                          />
                        }
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
            </ButtonModeHere>
          </SubHeadingPage>
          <CompanyFacilityData>
            <form onSubmit={() => handleSubmit()}>
              {editMode ? (
                <EditModeBoxContainer sx={{ marginBottom: "20PX" }}>
                  {showData && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DataRowHere className="editview">
                          <Grid container spacing={1} alignItems={"center"}>
                            <Grid item xs={12} sm={12} md={4} lg={2}>
                              <DataRowTitle>
                                <Typography>
                                  Testing Certificates
                                  <AstricksMark> *</AstricksMark>
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <Box
                                sx={{
                                  padding: "4px 6px",
                                  border: errors?.testing_certificate
                                    ? "1px solid #d7282f"
                                    : "1px solid #bdbdbd",
                                  width: "100%",
                                  borderRadius: "4px",
                                  "&:hover": {
                                    border: errors?.testing_certificate
                                      ? "1px solid #d7282f"
                                      : "1px solid #424242",
                                  },
                                }}
                              >
                                <DataRowValue>
                                  <EditUpImagesStack>
                                    <EditBrowseIcon>
                                      <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={
                                          <img
                                            src="/assets/images/crm/browsefile_icon.svg"
                                            alt="Edit"
                                            width={35}
                                            height={30}
                                          />
                                        }
                                      >
                                        <EditBrowseIcon>
                                          <EditBrowseText>
                                            Upload an Image
                                          </EditBrowseText>
                                        </EditBrowseIcon>
                                        <VisuallyHiddenInput
                                          type="file"
                                          accept={"image/*"}
                                          multiple
                                          onChange={(e) => {
                                            addFiles(e);
                                            e.target.value = null;
                                          }}
                                        />
                                      </Button>
                                    </EditBrowseIcon>

                                    <SelectedEditSection>
                                      {Files &&
                                      isArray(Files) &&
                                      Files.length > 0 ? (
                                        Files.map((ele, index) => (
                                          <SelectedEditImg key={index}>
                                            <img
                                              src={URL.createObjectURL(ele)}
                                              alt=""
                                              height="24px"
                                            />
                                            <CancelRoundedIcon
                                              onClick={() => removeFile(index)}
                                            />
                                            <Typography className="imagename">
                                              {ele.file_original_name ||
                                                ele.name}
                                            </Typography>
                                          </SelectedEditImg>
                                        ))
                                      ) : (
                                        <Typography></Typography>
                                      )}

                                      {image &&
                                        image.split(",").map((url, index) => (
                                          <SelectedEditImg key={index}>
                                            <img
                                              src={url.trim()}
                                              alt=""
                                              height="24px"
                                            />
                                            <CancelRoundedIcon
                                              onClick={() => {
                                                removeFileDynamic(index);
                                              }}
                                            />
                                          </SelectedEditImg>
                                        ))}
                                    </SelectedEditSection>
                                  </EditUpImagesStack>
                                </DataRowValue>
                                {errors?.testing_certificate && (
                                  <HelperText
                                    errorText={errors.testing_certificate}
                                  />
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      Inspecting Parties
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <TextField
                                      style={{
                                        width: "100%",
                                      }}
                                      variant="outlined"
                                      size="small"
                                      name="inspecting_parties"
                                      placeholder="Enter inspecting parties"
                                      type="text"
                                      onChange={(e) => {
                                        if (e?.target?.value.length > 100) {
                                          setFieldError(
                                            "inspecting_parties",
                                            "Inspecting parties content is too long. Please limit it to 100 characters"
                                          );
                                        } else {
                                          setFieldError(
                                            "inspecting_parties",
                                            ""
                                          ),
                                            handleChange(e);
                                        }
                                      }}
                                      helperText={`${
                                        errors?.inspecting_parties ?? ""
                                      }`}
                                      error={
                                        errors?.inspecting_parties
                                          ? true
                                          : false
                                      }
                                      value={values.inspecting_parties}
                                    />
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      First Pass Yield (%)
                                      <AstricksMark>
                                        {" "}
                                        *
                                        <HelpOutlineOutlinedIcon />
                                      </AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <TextField
                                      style={{ width: "100%" }}
                                      variant="outlined"
                                      size="small"
                                      name="first_pass_yield"
                                      placeholder="Enter First Pass Yield"
                                      type="text"
                                      value={values.first_pass_yield}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        const numbersOnly = /^\d{0,3}$/;

                                        if (inputValue.match(numbersOnly)) {
                                          if (inputValue.length > 0) {
                                            setFieldError(
                                              "first_pass_yield",
                                              ""
                                            );
                                          }

                                          handleChange(e);

                                          const intValue = parseInt(
                                            inputValue,
                                            10
                                          );

                                          if (!isNaN(intValue)) {
                                            if (
                                              intValue < 1 ||
                                              intValue > 100
                                            ) {
                                              setFieldError(
                                                "first_pass_yield",
                                                "Range is 1 to 100 required"
                                              );
                                            } else {
                                              setFieldError(
                                                "first_pass_yield",
                                                ""
                                              );
                                            }
                                          }
                                        }
                                      }}
                                      helperText={`${
                                        errors?.first_pass_yield ?? ""
                                      }`}
                                      error={!!errors?.first_pass_yield}
                                    />
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      Certification Level of Quality Head
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <TextField
                                      style={{
                                        width: "100%",
                                        paddingTop: "4px",
                                        paddingBottom: "4px",
                                      }}
                                      variant="outlined"
                                      size="small"
                                      name="certificate_level_quality"
                                      placeholder="Type Certification Level of Quality Head"
                                      type="text"
                                      value={values.certificate_level_quality}
                                      onChange={(e) => {
                                        if (e?.target?.value.length > 100) {
                                          setFieldError(
                                            "certificate_level_quality",
                                            "Certificate level of quality head content is too long. Please limit it to 100 characters"
                                          );
                                        } else {
                                          setFieldError(
                                            "certificate_level_quality",
                                            ""
                                          ),
                                            handleChange(e);
                                        }
                                      }}
                                      helperText={`${
                                        errors?.certificate_level_quality ?? ""
                                      }`}
                                      error={
                                        errors?.certificate_level_quality
                                          ? true
                                          : false
                                      }
                                    />
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  {showData && (
                    <>
                      <FooterDiv>
                        <Divider variant="middle" />
                      </FooterDiv>
                      <Radiomain>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <SavebtnBox sx={{}}>
                              {editMode && (
                                <EditSaveIcons>
                                  <CancelTextWithIcon
                                    onClick={() => handleCancel()}
                                    className="cancelwithicon"
                                  >
                                    <CloseIcon />
                                    <Typography>Cancel</Typography>
                                  </CancelTextWithIcon>
                                  <SaveTextWithIcon
                                    className="savewithicon"
                                    onClick={() => handleSubmit()}
                                  >
                                    {loader ? (
                                      <ThreeDots
                                        height="40"
                                        width="40"
                                        radius="9"
                                        color="#D7282F"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        visible={true}
                                      />
                                    ) : (
                                      <>
                                        <SaveOutlinedIcon />
                                        <Typography variant="body1">
                                          Save
                                        </Typography>
                                      </>
                                    )}
                                  </SaveTextWithIcon>
                                </EditSaveIcons>
                              )}
                            </SavebtnBox>
                          </Grid>
                        </Grid>
                      </Radiomain>
                    </>
                  )}
                </EditModeBoxContainer>
              ) : (
                <Box></Box>
              )}
            </form>
          </CompanyFacilityData>
        </Box>
      </CompanyFacilityInnContainerQAQCnRND>
    </>
  );
}

import React, { useEffect, useState } from "react";
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
import {
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditBrowseIcon,
  EditBrowseText,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  EditUpImagesStack,
  SavebtnBox,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SubHeadingPage,
  TypographyTitle,
} from "../../style";

import { getCompanyProfile } from "@/hooks/company";
import {
  apiClient,
  convertSize,
  imageSize,
  imageSizeMessage,
  imageType,
  imageTypeMessage,
  VisuallyHiddenInput,
} from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import HelperText from "../../../Common/helperText";
import { isArray } from "lodash";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function DistributorQaqc() {
  const [image, setImage] = useState("");
  const handleRadioChange = (event) => {
    if (event.target.value === "yes") {
      setShowData(true);
    } else {
      setShowData(false);
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [showData, setShowData] = useState(true);
  const dispatch = useDispatch();
  const [qualityAssurance, setQualityAssurence] = useState<any>({});
  const [Files, setFiles] = useState<any>([]);

  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getQuailtyAssuranceDetails();
  }, []);

  const removeFile = (id: number, index: number) => {
    if (id) {
      setFiles((prev: any) => {
        let file = prev.filter((element: any) => element?.id !== id);
        return file;
      });
      formik.setFieldValue("testing_certificate", Files);
      formik.setFieldError("testing_certificate", "");
    } else {
      setFiles((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
      formik.setFieldValue("testing_certificate", Files);
      formik.setFieldError("testing_certificate", "");
    }
  };

  const getQuailtyAssuranceDetails = async () => {
    let response = await apiClient("company_profile/QAQC/view", "get");
    if (response.status === 200) {
      setLoading(false);
      const { data } = response;
      setQualityAssurence(data);
    }
  };
  const validation = Yup.object().shape({
    testing_certificate: Yup.array()
      .min(1, "Please upload at least one image")
      .max(3, "Please upload maximum 3 images")
      .required("Please upload a image")
      .test("fileFormat", imageTypeMessage, (value) => {
        if (value) {
          return value.every((file) => imageType.includes(file.type));
        }
        return true;
      })
      .test("fileSize", imageSizeMessage, (value) => {
        if (value) {
          return value.every(
            (file) => convertSize(file.size, "MB") <= imageSize
          );
        }
        return true;
      }),
    first_pass_yield: Yup.number()
      .typeError("Enter a valid number")
      .required("Please enter first pass yield rate")
      .min(0, "Value must be greater than or equal to 0")
      .max(100, "maximum 100% required"),

    certificate_level_quality: Yup.string()
      .required("Please enter certification level of quality head")
      .max(
        100,
        "Certificate level of quality head content is too long. Please limit it to 100 characters"
      ),
    inspecting_parties: Yup.string()
      .required("Please enter inspecting parties")
      .max(
        100,
        "inspecting parties content is too long. Please limit it to 100 characters"
      ),
  });
  const handleSaveImage = async (files: File[]) => {
    let formData = new FormData();

    files.forEach((file) => {
      formData.append("company_photos[]", file);
    });

    try {
      let response = await apiClient(
        "company_profile/file_upload_qaqc_rnd",
        "post",
        {
          body: formData,
        },
        true
      );

      if (response.status) {
        setImage(response?.data);
        setQualityAssurence(response.data);
        setLoading(false);
      }
    } catch (error) {}
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
      setFiles(updatedFiles);
      formik.setFieldValue("testing_certificate", updatedFiles);
      formik.setFieldError("testing_certificate", "");
      handleSaveImage(updatedFiles);
    }
  };

  const data = companyDetails?.qaqc_rnd?.distributor_qaqc;
  let testing_certificate,
    inspecting_parties,
    first_pass_yield,
    certificate_level_quality;
  image;
  try {
    const distributorQaqc = data;
    const distributorData = JSON.parse(distributorQaqc);
    inspecting_parties = distributorData.Distributor.values.inspecting_parties;
    first_pass_yield = distributorData.Distributor.values.first_pass_yield;
    certificate_level_quality =
      distributorData.Distributor.values.certificate_level_quality;
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
  }

  const handleCancel = () => {
    formik.setFieldValue("testing_certificate", testing_certificate);
    formik.setFieldValue("inspecting_parties", inspecting_parties);
    formik.setFieldValue(
      "certificate_level_quality",
      certificate_level_quality
    );
    formik.setFieldValue("first_pass_yield", first_pass_yield);

    formik.setFieldError("testing_certificate", "");
    formik.setFieldError("inspecting_parties", "");
    formik.setFieldError("certificate_level_quality", "");
    formik.setFieldError("first_pass_yield", "");
    setEditMode(false);
  };
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      testing_certificate: [],
      inspecting_parties: inspecting_parties,
      first_pass_yield: first_pass_yield,
      certificate_level_quality: certificate_level_quality,
    },

    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const payload = {
        shop_id: companyDetails.basic_information.shop_id,
        distributor_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Distributor"]: { values, image: image },
        },
      };
      setLoading(true);
      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "POST",
        {
          body: payload,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        setEditMode(false);
        getQuailtyAssuranceDetails();
        dispatch(getCompanyProfile());
      }
      setLoading(false);
    },
  });
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
            padding: "16px 10px 5px 18px",
            gap: "18px",
          }}
        >
          <SubHeadingPage
            className={
              !editMode && !inspecting_parties ? "qaqcandrndHeading" : ""
            }
          >
            <TypographyTitle>QA/QC Department</TypographyTitle>
            <Box>
              {showData && (
                <>
                  <SavebtnBox sx={{ position: "unset", padding: "0px" }}>
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
                          <SaveOutlinedIcon />
                          <Typography variant="body1">Save</Typography>
                        </SaveTextWithIcon>
                      </EditSaveIcons>
                    )}
                  </SavebtnBox>
                </>
              )}
            </Box>
            <ButtonModeHere>
              {!editMode && (
                <EditSaveIcons1 onClick={() => setEditMode(true)}>
                  <img src={"/assets/EditPencil.svg"} alt="editImage" />
                  <Typography>Edit</Typography>
                </EditSaveIcons1>
              )}
              {editMode && (
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
                      value={showData ? "yes" : "no"}
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
                                        sx={{
                                          "&:hover": { boxShadow: "none" },
                                        }}
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
                                      {image && image.split(", ").length > 0 ? (
                                        <>
                                          {image
                                            .split(", ")
                                            .map((imgSrc, index) => (
                                              <SelectedEditImg key={index}>
                                                <img
                                                  src={imgSrc}
                                                  alt=""
                                                  height="24px"
                                                />
                                              </SelectedEditImg>
                                            ))}
                                        </>
                                      ) : null}

                                      {Files &&
                                      isArray(Files) &&
                                      Files.length > 0
                                        ? Files.map((ele, index) => (
                                            <SelectedEditImg key={index}>
                                              <img
                                                src={URL.createObjectURL(ele)}
                                                alt=""
                                                height="24px"
                                              />
                                              <CancelRoundedIcon
                                                onClick={() =>
                                                  removeFile(ele.id, index)
                                                }
                                              />
                                              <Typography className="imagename">
                                                {ele.file_original_name ||
                                                  ele.name}
                                              </Typography>
                                            </SelectedEditImg>
                                          ))
                                        : null}
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

                                        const numbersOnly =
                                          /^\d{0,3}(\.\d{0,3})?$/;

                                        if (inputValue.match(numbersOnly)) {
                                          if (inputValue.length > 0) {
                                            setFieldError(
                                              "first_pass_yield",
                                              ""
                                            );
                                          }
                                          handleChange(e);

                                          const floatValue =
                                            parseFloat(inputValue);

                                          if (!isNaN(floatValue)) {
                                            if (
                                              floatValue < 1 ||
                                              floatValue > 100
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

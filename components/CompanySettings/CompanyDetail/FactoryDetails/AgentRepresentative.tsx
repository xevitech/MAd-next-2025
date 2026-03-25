import React, { useContext, useEffect, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { getCompanyProfile } from "@/hooks/company";
import {
  apiClient,
  FirstletterCapital,
  formatFileName,
  VisuallyHiddenInput,
} from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { isArray } from "lodash";
import { ThreeDots } from "react-loader-spinner";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { MyAppContext } from "@/contextApi/appContext";
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
  QaqcandRndSeparation,
  SavebtnBox,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SubHeadingPage,
  TypographyTitle,
  UpImageName,
  UploadImageCol,
  UploadImagesRow,
} from "./style";
import HelperText from "../Common/helperText";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import QaQcSkelton from "./wholesalar/wholesalarwarehouse/QaQcSkelton";
export default function AgentRepresentative({}) {
  const [editMode, setEditMode] = useState(false);
  const [showData, setShowData] = useState(true);
  const dispatch = useDispatch();
  const [qualityAssurance, setQualityAssurence] = useState<any>({});
  const [Files, setFiles] = useState<any>([]);
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const agent_respresent_qaqc =
    companyDetails?.qaqc_rnd?.agent_respresent_qaqc || null;

  useEffect(() => {
    getQuailtyAssuranceDetails();
    setSelectedValue("no");
  }, []);

  const [selectedValue, setSelectedValue] = useState(
    qualityAssurance?.qa_enable ?? "no"
  );
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
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
      .required("Please upload an image"),
    first_pass_yield: Yup.string()
      .required("Please enter the first pass yield rate")
      .matches(/^(0|[1-9]\d{0,7})(\.\d{0,3})?$/, "Invalid input format"),
    certificate_level_quality: Yup.string()
      .required("Please enter certification level of quality head")
      .max(
        100,
        "Certificate level of quality head content is too long. Please limit it to 100 characters"
      ),
    inspecting_parties: Yup.array()
      .of(
        Yup.string()
          .required("Please enter inspecting parties")
          .max(
            100,
            "Inspecting party content is too long. Please limit it to 100 characters"
          )
      )
      .min(1, "Please enter inspecting parties")
      .max(10, "You can add only 10 inspecting parties"),
    no_of_staff: Yup.string()
      .required("Please enter No. of QA staff")
      .max(
        8,
        "No. of QA staff content is too long. Please limit it to 8 characters"
      ),
  });

  let testingImageUrl = "";
  try {
    const agent_image = JSON.parse(agent_respresent_qaqc);
    testingImageUrl = agent_image?.Agent.values?.testing_certificate;
  } catch (error) {}
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

        let responseData = response.data.map((item) => ({
          file_original_name: item.file_original_name,
          source: item.source,
        }));

        let existingImagesArray = formik?.values?.testing_certificate
          ? formik?.values?.testing_certificate
          : [];

        const totalImagesCount =
          existingImagesArray.length + responseData.length;
        if (totalImagesCount > 3) {
          formik.setFieldError(
            "testing_certificate",
            "You can only upload up to 3 images."
          );
          return;
        }

        const newImagesArray = [...existingImagesArray, ...responseData];
        formik.setFieldValue("testing_certificate", newImagesArray);

        setQualityAssurence(newImagesArray);
      }
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const removeFileDynamic = (index) => {
    const updatedImages = [...formik?.values?.testing_certificate];
    updatedImages.splice(index, 1);
    formik.setFieldValue("testing_certificate", updatedImages);
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

  try {
    const agent_list = JSON.parse(agent_respresent_qaqc);
    inspecting_parties = agent_list.Agent.values.inspecting_parties;
    first_pass_yield = agent_list.Agent.values.first_pass_yield;
    certificate_level_quality =
      agent_list.Agent.values.certificate_level_quality;
    no_of_staff = agent_list.Agent.values.no_of_staff;
  } catch (error) {}

  const removeFile = (indexToRemove) => {
    const updatedFiles = Files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const handleCancel = () => {
    setSelectedValue("no");
    const isImageAvailable = testingImageUrl ? testingImageUrl : [];
    formik.setFieldValue("testing_certificate", isImageAvailable ?? []);
    formik.setFieldValue(
      "inspecting_parties",
      inspecting_parties ? inspecting_parties : ""
    );

    formik.setFieldValue(
      "certificate_level_quality",
      certificate_level_quality ? certificate_level_quality : ""
    );
    formik.setFieldValue(
      "first_pass_yield",
      first_pass_yield ? first_pass_yield : ""
    );
    formik.setFieldValue("no_of_staff", no_of_staff ? no_of_staff : "");
    formik.setFieldError("certificate_level_quality", "");
    formik.setFieldError("inspecting_parties", []);
    formik.setFieldError("first_pass_yield", "");
    formik.setFieldError("testing_certificate", "");
    formik.setFieldError("no_of_staff", "");

    setEditMode(false);
  };

  let formik: any = useFormik({
    initialValues: {
      testing_certificate: agent_respresent_qaqc
        ? JSON.parse(agent_respresent_qaqc)?.Agent?.values?.testing_certificate
        : [], //set the initial data fron backend
      inspecting_parties: inspecting_parties ? inspecting_parties : [],
      first_pass_yield: first_pass_yield ? first_pass_yield : "",
      certificate_level_quality: certificate_level_quality
        ? certificate_level_quality
        : "",
      no_of_staff: no_of_staff ? no_of_staff : "",
    },
    enableReinitialize: true,
    validationSchema: validation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      if (!values.testing_certificate) {
        formik.setFieldValue("testing_certificate", "Please upload image");
        return;
      }
      const vitalityIndex = values.first_pass_yield;
      const floatValue = parseFloat(vitalityIndex);
      if (isNaN(floatValue) || floatValue < 1 || floatValue > 100) {
        formik.setFieldTouched("first_pass_yield", true);
        formik.setFieldError(
          "first_pass_yield",
          "First pass yield must be between 1 and 100."
        );
        return;
      }
      setLoader(true);
      const agent_payload = {
        shop_id: companyDetails.basic_information.shop_id,
        agent_respresent_qaqc: {
          Show: editMode ? "yes" : "no",
          ["Agent"]: {
            values,
            testing_certificate: values.testing_certificate,
          },
        },
      };
      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "POST",
        {
          body: agent_payload,
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

  useEffect(() => {}, [formik.values]);
  const { values, handleSubmit, handleChange, errors, setFieldError } = formik;
  return (
    <>
      <CompanyFacilityInnContainerQAQCnRND
        sx={{
          boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
          padding: editMode ? "16px" : "",
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
                        onClick={() => {
                          formik.handleSubmit();
                        }}
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
                            <Typography variant="body1">Save</Typography>
                          </>
                        )}
                      </SaveTextWithIcon>
                    </EditSaveIcons>
                  )}
                </SavebtnBox>
              </>
            )}
          </Box>

          {inspecting_parties && !editMode ? (
            <EditSaveIcons1 onClick={() => setEditMode(true)}>
              <img src="/assets/EditPencil.svg" alt="editImage" />
              <Typography>Edit</Typography>
            </EditSaveIcons1>
          ) : (
            <>
              {!editMode && (
                <ButtonModeHere>
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
                </ButtonModeHere>
              )}
            </>
          )}
        </SubHeadingPage>
        <CompanyFacilityData>
          <form onSubmit={handleSubmit}>
            {editMode ? (
              <EditModeBoxContainer sx={{ marginBottom: "20PX" }}>
                {showData && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <DataRowHere className="editview">
                        <Grid container spacing={1} alignItems={"center"}>
                          <Grid item xs={12} sm={12} md={2} lg={2}>
                            <DataRowTitle>
                              <Typography>
                                Testing Certificates
                                <AstricksMark> *</AstricksMark>
                              </Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={10} lg={10}>
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
                                            {ele.file_original_name || ele.name}
                                          </Typography>
                                        </SelectedEditImg>
                                      ))
                                    ) : (
                                      <Typography></Typography>
                                    )}

                                    {formik.values?.testing_certificate
                                      ?.length > 0 &&
                                      formik.values?.testing_certificate?.map(
                                        (item, index) => (
                                          <SelectedEditImg key={index}>
                                            <img
                                              src={item.source}
                                              alt={item.file_original_name}
                                              height="24px"
                                            />
                                            <CancelRoundedIcon
                                              onClick={() =>
                                                removeFileDynamic(index)
                                              }
                                            />
                                            <Typography className="imagename">
                                              {formatFileName(
                                                item.file_original_name,
                                                5
                                              )}
                                            </Typography>
                                          </SelectedEditImg>
                                        )
                                      )}
                                  </SelectedEditSection>
                                </EditUpImagesStack>
                              </DataRowValue>
                            </Box>
                            {errors?.testing_certificate && (
                              <HelperText
                                errorText={errors.testing_certificate}
                              />
                            )}
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
                                  <Autocomplete
                                    size="small"
                                    sx={{ width: "100%" }}
                                    onChange={(event: any, newValue) => {
                                      let value = newValue
                                        .map((v) => FirstletterCapital(v))
                                        .filter((v) => v.trim() !== "");
                                      if (value.length > 10) {
                                        formik.setFieldError(
                                          "inspecting_parties",
                                          "You can add only 10 inspecting parties"
                                        );
                                        return;
                                      } else {
                                        formik.setFieldError(
                                          "inspecting_parties",
                                          ""
                                        );
                                      }

                                      formik.setFieldValue(
                                        "inspecting_parties",
                                        value
                                      );
                                    }}
                                    onKeyDown={(
                                      event: React.KeyboardEvent<HTMLInputElement>
                                    ) => {
                                      const inputValue =
                                        event.currentTarget.value?.trim();
                                      if (event.key === "Enter") {
                                        event.preventDefault();
                                        if (inputValue && inputValue !== "") {
                                          const updatedValue = [
                                            ...inspecting_parties,
                                            FirstletterCapital(inputValue),
                                          ].filter((v) => v.trim() !== "");
                                          if (updatedValue.length > 10) {
                                            formik.setFieldError(
                                              "inspecting_parties",
                                              "You can add only 10 inspecting parties"
                                            );
                                          } else {
                                            formik.setFieldValue(
                                              "inspecting_parties",
                                              updatedValue
                                            );
                                            formik.setFieldError(
                                              "inspecting_parties",
                                              ""
                                            );
                                          }
                                        }
                                      }
                                    }}
                                    multiple
                                    id="tags-filled"
                                    options={[]}
                                    value={formik.values.inspecting_parties}
                                    defaultValue={
                                      formik.values.inspecting_parties
                                    }
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                      value?.map((option, index) => (
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
                                        placeholder="Type the inspecting parties and press enter"
                                        onChange={(e) => {}}
                                        error={Boolean(
                                          formik.errors.inspecting_parties
                                        )}
                                        InputLabelProps={{ shrink: true }}
                                        helperText={`${
                                          formik.errors.inspecting_parties ?? ""
                                        }`}
                                      />
                                    )}
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
                                    First Pass Yield (in %)
                                    <AstricksMark>
                                      {" "}
                                      *
                                      <LightTooltip
                                        arrow
                                        disableInteractive
                                        placement="top"
                                        title="The percentage of products that pass quality inspections without any rework or corrections during the first round of production. A high first pass yield indicates efficient processes and low defect rates."
                                      >
                                        <HelpOutlineOutlinedIcon />
                                      </LightTooltip>
                                    </AstricksMark>
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
                                    name="first_pass_yield"
                                    placeholder="Enter First Pass Yield"
                                    type="text"
                                    value={values.first_pass_yield}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      const numbersOnly =
                                        /^(100(\.0{0,3})?|[1-9]?\d(\.\d{0,3})?)$/;

                                      if (inputValue === "") {
                                        formik.setFieldValue(
                                          "first_pass_yield",
                                          inputValue
                                        );
                                        formik.setFieldError(
                                          "first_pass_yield",
                                          "Please enter first pass yield "
                                        );
                                      } else if (inputValue.length > 6) {
                                        formik.setFieldError(
                                          "first_pass_yield",
                                          "Max. characters limit reached"
                                        );
                                      } else if (numbersOnly.test(inputValue)) {
                                        formik.setFieldValue(
                                          "first_pass_yield",
                                          inputValue
                                        );
                                        formik.setFieldError(
                                          "first_pass_yield",
                                          ""
                                        );

                                        const floatValue =
                                          parseFloat(inputValue);

                                        if (
                                          floatValue < 1 ||
                                          floatValue > 100
                                        ) {
                                          formik.setFieldError(
                                            "first_pass_yield",
                                            "Range is 1 to 100 required"
                                          );
                                        }
                                      } else {
                                        formik.setFieldError(
                                          "first_pass_yield",
                                          "Range is 1 to 100 required"
                                        );
                                      }
                                    }}
                                    helperText={`${
                                      errors?.first_pass_yield ?? ""
                                    }`}
                                    error={Boolean(errors?.first_pass_yield)}
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
                                      const input = e.target;
                                      const newValue = input.value;
                                      const cursorPosition =
                                        input.selectionStart;
                                      if (newValue.length > 100) {
                                        formik.setFieldError(
                                          "certificate_level_quality",
                                          "Certificate level of quality head content is too long. Please limit it to 100 characters."
                                        );
                                        return;
                                      }
                                      const trimmedValue = newValue.trimStart();
                                      if (trimmedValue !== newValue) {
                                        formik.setFieldValue(
                                          "certificate_level_quality",
                                          trimmedValue
                                        );
                                        requestAnimationFrame(() => {
                                          input.selectionStart =
                                            input.selectionEnd =
                                              cursorPosition -
                                              (newValue.length -
                                                trimmedValue.length);
                                        });
                                      } else {
                                        formik.setFieldValue(
                                          "certificate_level_quality",
                                          newValue
                                        );
                                        formik.setFieldError(
                                          "certificate_level_quality",
                                          ""
                                        );
                                        requestAnimationFrame(() => {
                                          input.selectionStart =
                                            input.selectionEnd = cursorPosition;
                                        });
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

                        <Grid item xs={12} sm={12} md={6}>
                          <DataRowHere className="editview">
                            <Grid container spacing={1} alignItems={"center"}>
                              <Grid item xs={12} sm={12} md={4}>
                                <DataRowTitle>
                                  <Typography>
                                    No. Of QA Staff
                                    <AstricksMark>
                                      {" "}
                                      *
                                      <LightTooltip
                                        arrow
                                        disableInteractive
                                        placement="top"
                                        title="Provide the total number of QA staff assigned to the project."
                                      >
                                        <HelpOutlineOutlinedIcon />
                                      </LightTooltip>
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
                                    name="no_of_staff"
                                    placeholder="Enter Number of QA Staff"
                                    type="text"
                                    value={values.no_of_staff}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      const numbersOnly = /^\d{0,8}$/;
                                      if (numbersOnly.test(inputValue)) {
                                        setFieldError("no_of_staff", "");
                                        handleChange(e);
                                      } else if (inputValue.length > 8) {
                                        setFieldError(
                                          "no_of_staff",
                                          "No. Of QA Staff limit exceeded maximum limit is 8 characters"
                                        );
                                      }
                                    }}
                                    helperText={`${errors?.no_of_staff ?? ""}`}
                                    error={!!errors?.no_of_staff}
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
              <Box>
                {inspecting_parties && (
                  <QaqcandRndSeparation>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <DataRowHere>
                          <Grid container spacing={1} alignItems={"center"}>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={4}
                              lg={2}
                              className=""
                            >
                              <DataRowTitle>
                                <Typography>Testing Certificates</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={8}
                              lg={9}
                              className=""
                            >
                              <DataRowValue>
                                <UploadImagesRow>
                                  {formik?.values?.testing_certificate.length >
                                    0 &&
                                    formik?.values?.testing_certificate?.map(
                                      (item, index) => (
                                        <UploadImageCol key={index}>
                                          <img
                                            src={item?.source}
                                            alt=""
                                            height="24px"
                                          />
                                          <UpImageName>
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              title={item.file_original_name}
                                              placement="top"
                                            >
                                              <Typography
                                                className="imagenname"
                                                sx={{
                                                  position: "relative",
                                                  padding: "0 8px 0 0",
                                                  "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    right: "0px",
                                                    borderLeft:
                                                      "1px solid #d2d2d2",
                                                    height: "17px",
                                                    top: "3px",
                                                  },
                                                }}
                                              >
                                                {formatFileName(
                                                  item.file_original_name,
                                                  10
                                                )}
                                              </Typography>
                                            </LightTooltip>
                                          </UpImageName>
                                          <VisibilityOutlinedIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={() =>
                                              window.open(
                                                item?.source,
                                                "_blank"
                                              )
                                            }
                                          />
                                        </UploadImageCol>
                                      )
                                    )}
                                </UploadImagesRow>
                              </DataRowValue>
                            </Grid>
                          </Grid>
                        </DataRowHere>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>Inspecting Parties</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <Typography>
                                      {inspecting_parties && inspecting_parties}
                                    </Typography>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>First Pass Yield</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <Typography>
                                      {formik?.values?.first_pass_yield !==
                                        undefined &&
                                        `${formik.values.first_pass_yield} %`}
                                    </Typography>
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
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      {" "}
                                      Certification Level of Quality Head
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <Typography>
                                      {certificate_level_quality}
                                    </Typography>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>No. of QA Staff</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <Typography>
                                      {no_of_staff && no_of_staff}
                                    </Typography>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </QaqcandRndSeparation>
                )}
              </Box>
            )}
          </form>
        </CompanyFacilityData>
      </CompanyFacilityInnContainerQAQCnRND>
    </>
  );
}

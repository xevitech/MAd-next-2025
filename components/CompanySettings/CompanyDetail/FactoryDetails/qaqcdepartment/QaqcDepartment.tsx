import React, { useEffect, useRef, useState } from "react";
import {
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  QaqcandRndSeparation,
  SavebtnBox,
  SaveTextWithIcon,
  SubHeadingPage,
  TypographyTitle,
} from "../style";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { ToggleButtonContainer } from "../../commonStyles";
import { BtnFilled } from "@/components/common/buttons/ButtonsVariations";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { apiClient, FirstletterCapital } from "@/components/common/common";
import { getCompanyProfile } from "@/hooks/company";
import { useDispatch, useSelector } from "react-redux";
import SelectableAndEditableField from "@/components/common/SelectDropDownwithInput";
import { ThreeDots } from "react-loader-spinner";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
export default function QaqcDepartment({
  listData,
  departmentData,
  handlCallBackFunction,
}) {
  const [editMode, setEditMode] = useState(false);
  const [showData, setShowData] = useState(true);
  const dispatch = useDispatch();
  const [qualityAssurance, setQualityAssurence] = useState<any>({});
  const [selectedValue, setSelectedValue] = useState(
    qualityAssurance?.qa_enable ?? "no"
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getQuailtyAssuranceDetails();
  }, []);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const manufactureData = companyDetails?.qaqc_rnd?.manufacture_qaqc;
  const [isOtherProductsError, setIsOtherProductsError] = useState(false);
  let testing_facility,
    first_pass_yield,
    certificate_level_quality,
    scrap_rate_in,
    inspecting_parties,
    overall_yield,
    supplier_defect_rate_in,
    qa_enable;

  if (manufactureData) {
    try {
      const parsedData = JSON.parse(manufactureData);
      const departmentData = parsedData?.Department?.[0]?.values;
      if (departmentData) {
        testing_facility = departmentData.testing_facility;
        first_pass_yield = departmentData.first_pass_yield;
        certificate_level_quality = departmentData.certificate_level_quality;
        scrap_rate_in = departmentData.scrap_rate_in;
        inspecting_parties = departmentData.inspecting_parties;
        overall_yield = departmentData.overall_yield;
        supplier_defect_rate_in = departmentData.supplier_defect_rate_in;
        qa_enable = departmentData.qa_enable;
      }
    } catch (error) {}
  }

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  const handleCancel = () => {
    setEditMode(false);
    setSelectedValue("no");
    getQuailtyAssuranceDetails();
    formik.setFieldValue(
      "first_pass_yield",
      first_pass_yield !== "" ? first_pass_yield : ""
    );
    formik.setFieldValue("testing_facility", testing_facility ?? "");
    formik.setFieldValue("scrap_rate_in", scrap_rate_in ?? "");
    formik.setFieldValue("inspecting_parties", inspecting_parties ?? []);
    formik.setFieldValue(
      "certificate_level_quality",
      certificate_level_quality ?? ""
    );
    formik.setFieldValue("overall_yield", overall_yield ?? "");
    formik.setFieldValue(
      "supplier_defect_rate_in",
      supplier_defect_rate_in ?? ""
    );
    formik.setFieldValue("qa_enable", qa_enable ?? "");
    formik.setFieldError("qa_enable", "");
    formik.setFieldError("first_pass_yield", "");
    formik.setFieldError("testing_facility", "");
    formik.setFieldError("scrap_rate_in", "");
    formik.setFieldError("inspecting_parties", "");
    formik.setFieldError("certificate_level_quality", "");
    formik.setFieldError("overall_yield", "");
    formik.setFieldError("supplier_defect_rate_in", "");
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
    testing_facility: Yup.string().required("Please select testing facility"),
    first_pass_yield: Yup.number()
      .typeError("Enter a valid number")
      .required("Please enter first pass yield rate")
      .min(0, "Value must be greater than or equal to 0")
      .max(100, "maximum 100% required"),
    scrap_rate_in: Yup.number()
      .typeError("Enter a valid number")
      .required("Please enter scrap rate")
      .min(0, "Value must be greater than or equal to 0")
      .max(100, "maximum 100% required"),
    inspecting_parties: Yup.array()
      .min(1, "Please enter inspecting parties")
      .max(10, "You can add only 10 inspecting parties")
      .required("Please enter inspecting parties"),
    overall_yield: Yup.number()
      .typeError("Enter a valid number")
      .required("Please enter overall yield")
      .min(0, "Value must be greater than or equal to 0")
      .max(100, "maximum 100% required"),
    supplier_defect_rate_in: Yup.number()
      .typeError("Enter a valid number")
      .required("Please enter supplier defect rate")
      .min(0, "Value must be greater than or equal to 0")
      .max(100, "maximum 100% required"),
    certificate_level_quality: Yup.string()
      .required("Please enter certificate level of quality head")
      .max(
        100,
        "Certificate level of quality head content is too long. Please limit it to 100 characters"
      ),
  });
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      testing_facility: testing_facility ?? "In-house",
      first_pass_yield: first_pass_yield ?? "",
      certificate_level_quality: certificate_level_quality ?? "",
      scrap_rate_in: scrap_rate_in ?? "",
      inspecting_parties: inspecting_parties ?? [],
      overall_yield: overall_yield ?? "",
      supplier_defect_rate_in: supplier_defect_rate_in ?? "",
      qa_enable: selectedValue,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validation,

    onSubmit: async (values) => {
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        manufacture_qaqc: {
          Department: [
            {
              Show: editMode ? "yes" : "no",
              values,
            },
          ],
          QualityTestEquipment: departmentData?.QualityTestEquipment,
          QualityControlProcess: departmentData?.QualityControlProcess,
        },
      };
      setLoading(true);
      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "POST",
        {
          body: combinedPayload,
        }
      );
      if (response.status === 200 || response.status === 201) {
        setSelectedValue("no");
        setLoading(false);
        setEditMode(false);
        getQuailtyAssuranceDetails();
        dispatch(getCompanyProfile());
      }
      handlCallBackFunction();
      setLoading(false);
    },
  });
  const {
    setFieldValue,
    values,
    handleSubmit,
    handleChange,
    errors,
    setFieldError,
  } = formik;

  const inspectingPartiesRef = useRef(null);
  const firstPassYieldRef = useRef(null);
  const overallYieldRef = useRef(null);
  const certificationLevelQualityHeadRef = useRef(null);
  const supplierDefectRateRef = useRef(null);
  const scrapRateRef = useRef(null);

  const handleSave = () => {
    formik.handleSubmit();

    if(!formik.values.inspecting_parties || formik.errors.inspecting_parties) {
      inspectingPartiesRef?.current?.focus();
      return;
    }
    if(!formik.values?.first_pass_yield || formik.errors?.first_pass_yield) {
      firstPassYieldRef?.current?.focus();
      return;
    }
    if(!formik.values?.overall_yield || formik.errors?.overall_yield) {
      overallYieldRef?.current?.focus();
      return;
    }
    if(!formik.values.certificate_level_quality || formik.errors.certificate_level_quality) {
      certificationLevelQualityHeadRef?.current?.focus();
      return;
    }
    if(!formik.values.supplier_defect_rate_in || formik.errors.supplier_defect_rate_in) {
      supplierDefectRateRef?.current?.focus();
      return;
    }
    if(!formik.values.scrap_rate_in || formik.errors.scrap_rate_in) {
      scrapRateRef?.current?.focus();
      return;
    }
  }

  return (
    <CompanyFacilityInnContainerQAQCnRND
      sx={{
        boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
        padding: editMode ? "16px" : "",
      }}
    >
      <SubHeadingPage
        className={!editMode && !inspecting_parties ? "qaqcandrndHeading" : ""}
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
                      onClick={handleSave}
                    >
                      {loading ? (
                        <ThreeDots
                          height="36px"
                          width="36px"
                          radius="9"
                          color="#d7282f"
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
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {editMode ? (
            <EditModeBoxContainer>
              {showData && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere className="editview">
                          <Grid container spacing={1} alignItems={"center"}>
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>
                                  Testing Facility
                                  <AstricksMark> *</AstricksMark>
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <Box
                                sx={{
                                  padding: "4px 6px",
                                  border: errors?.testing_facility
                                    ? "1px solid #d7282f"
                                    : "1px solid #bdbdbd",
                                  width: "100%",
                                  borderRadius: "4px",
                                  "&:hover": {
                                    border: errors?.testing_facility
                                      ? "1px solid #d7282f"
                                      : "1px solid #424242",
                                  },
                                }}
                              >
                                <ToggleButtonContainer
                                  style={{
                                    marginBottom: errors?.testing_facility
                                      ? "0px"
                                      : "",
                                  }}
                                >
                                  <BtnFilled
                                    sx={{
                                      minWidth: "50% !important",
                                    }}
                                    classname="inhouse_btn"
                                    borderRadius={"6px"}
                                    height={"25px"}
                                    background={
                                      values.testing_facility === "In-house"
                                        ? "#D7282F"
                                        : "#E8E8E8"
                                    }
                                    colour={
                                      values.testing_facility === "In-house"
                                        ? "white"
                                        : "#231F20"
                                    }
                                    onClick={() => {
                                      setFieldValue(
                                        "testing_facility",
                                        "In-house"
                                      ),
                                        setFieldError("testing_facility", "");
                                    }}
                                  >
                                    In-house
                                  </BtnFilled>
                                  <BtnFilled
                                    sx={{
                                      minWidth: "50% !important",
                                    }}
                                    borderRadius={"6px"}
                                    height={"25px"}
                                    background={
                                      values.testing_facility === "Third Party"
                                        ? "#D7282F"
                                        : "#E8E8E8"
                                    }
                                    colour={
                                      values.testing_facility === "Third Party"
                                        ? "white"
                                        : "#231F20"
                                    }
                                    onClick={() => {
                                      setFieldValue(
                                        "testing_facility",
                                        "Third Party"
                                      ),
                                        setFieldError("testing_facility", "");
                                    }}
                                  >
                                    Third Party
                                  </BtnFilled>
                                </ToggleButtonContainer>
                              </Box>
                              {errors?.testing_facility && (
                                <span
                                  style={{
                                    color: "#d7282f",
                                    fontWeight: 400,
                                    fontSize: "10px",
                                    margin: "2px 0 2px 0",
                                  }}
                                >
                                  <img
                                    src="/assets/error-outline-red.svg"
                                    alt=""
                                    style={{
                                      width: "8px",
                                      height: "8px",
                                      marginRight: "3px",
                                    }}
                                  />
                                  <>
                                    {values.testing_facility === ""
                                      ? errors?.testing_facility
                                      : ""}
                                  </>
                                </span>
                              )}
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
                                  Inspecting Parties{" "}
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
                                      placeholder="Type the inspecting parties and press enter"
                                      inputRef={inspectingPartiesRef}
                                      onChange={(e) => {
                                        const trimmedValue =
                                          e.target.value.trimStart();
                                        if (
                                          formik.values.inspecting_parties.includes(
                                            trimmedValue
                                          )
                                        ) {
                                          setIsOtherProductsError(true);
                                        } else {
                                          setIsOtherProductsError(false);
                                        }
                                      }}
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
                                  First Pass Yield (in %){" "}
                                  <AstricksMark>
                                    *
                                    <LightTooltip
                                      arrow
                                      placement="top"
                                      disableInteractive
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

                                      const floatValue = parseFloat(inputValue);

                                      if (floatValue < 1 || floatValue > 100) {
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
                                  inputRef={firstPassYieldRef}
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
                                  Overall Yield (in %)
                                  <AstricksMark>
                                    *
                                    <LightTooltip
                                      arrow
                                      disableInteractive
                                      placement="top"
                                      title="The total percentage of products that meet quality standards after all stages of production, including rework and corrections. It reflects the efficiency of the production line from start to finish."
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
                                  name="overall_yield"
                                  placeholder="Enter Overall Yield "
                                  type="text"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numbersOnly =
                                      /^(100(\.0{0,3})?|[1-9]?\d(\.\d{0,3})?)$/;

                                    if (inputValue === "") {
                                      formik.setFieldValue(
                                        "overall_yield",
                                        inputValue
                                      );
                                      formik.setFieldError(
                                        "overall_yield",
                                        "Please enter overall yield"
                                      );
                                    } else if (inputValue.length > 6) {
                                      formik.setFieldError(
                                        "overall_yield",
                                        "Max. characters limit reached"
                                      );
                                    } else if (numbersOnly.test(inputValue)) {
                                      formik.setFieldValue(
                                        "overall_yield",
                                        inputValue
                                      );
                                      formik.setFieldError("overall_yield", "");

                                      const floatValue = parseFloat(inputValue);

                                      if (floatValue < 1 || floatValue > 100) {
                                        formik.setFieldError(
                                          "overall_yield",
                                          "Range is 1 to 100 required"
                                        );
                                      }
                                    } else {
                                      formik.setFieldError(
                                        "overall_yield",
                                        "Range is 1 to 100 required"
                                      );
                                    }
                                  }}
                                  helperText={`${errors?.overall_yield ?? ""}`}
                                  error={errors?.overall_yield ? true : false}
                                  value={values.overall_yield}
                                  inputRef={overallYieldRef}
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
                                  <AstricksMark>*</AstricksMark>{" "}
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
                                    const cursorPosition = input.selectionStart;
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
                                  inputRef={certificationLevelQualityHeadRef}
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
                                  Supplier Defect Rate (in %)
                                  <AstricksMark>
                                    *
                                    <LightTooltip
                                      arrow
                                      disableInteractive
                                      placement="top"
                                      title="The percentage of defective products or materials received from suppliers. Monitoring this helps maintain supply chain quality and improves overall product quality."
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
                                  name="supplier_defect_rate_in"
                                  placeholder="Enter supplier defect rate"
                                  type="text"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numbersOnly =
                                      /^(100(\.0{0,3})?|[1-9]?\d(\.\d{0,3})?)$/;

                                    if (inputValue === "") {
                                      formik.setFieldValue(
                                        "supplier_defect_rate_in",
                                        inputValue
                                      );
                                      formik.setFieldError(
                                        "supplier_defect_rate_in",
                                        "Please enter supplier defect rate"
                                      );
                                    } else if (inputValue.length > 6) {
                                      formik.setFieldError(
                                        "supplier_defect_rate_in",
                                        "Max. characters limit reached"
                                      );
                                    } else if (numbersOnly.test(inputValue)) {
                                      formik.setFieldValue(
                                        "supplier_defect_rate_in",
                                        inputValue
                                      );
                                      formik.setFieldError("supplier_defect_rate_in", "");

                                      const floatValue = parseFloat(inputValue);

                                      if (floatValue < 1 || floatValue > 100) {
                                        formik.setFieldError(
                                          "supplier_defect_rate_in",
                                          "Range is 1 to 100 required"
                                        );
                                      }
                                    } else {
                                      formik.setFieldError(
                                        "supplier_defect_rate_in",
                                        "Range is 1 to 100 required"
                                      );
                                    }
                                  }}
                                  helperText={`${errors?.supplier_defect_rate_in ?? ""}`}
                                  error={errors?.supplier_defect_rate_in ? true : false}
                                  value={values.supplier_defect_rate_in}
                                  inputRef={supplierDefectRateRef}
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
                      <Grid item xs={12} sm={12}>
                        <DataRowHere className="editview">
                          <Grid container spacing={1} alignItems={"center"}>
                            <Grid item xs={12} sm={12} md={2}>
                              <DataRowTitle>
                                <Typography>
                                  Scrap Rate (in %){" "}
                                  <AstricksMark>
                                    {" "}
                                    *
                                    <LightTooltip
                                      arrow
                                      disableInteractive
                                      placement="top"
                                      title="The proportion of materials or products discarded during the manufacturing process due to defects or quality issues. A low scrap rate indicates efficient use of materials and effective quality control."
                                    >
                                      <HelpOutlineOutlinedIcon />
                                    </LightTooltip>
                                  </AstricksMark>{" "}
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3.96}>
                              <DataRowValue>
                                <TextField
                                  style={{
                                    width: "100%",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                  }}
                                  variant="outlined"
                                  size="small"
                                  name="scrap_rate_in"
                                  placeholder="Enter Scrap Rate"
                                  type="text"
                                  value={values.scrap_rate_in}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numbersOnly =
                                      /^(100(\.0{0,3})?|[1-9]?\d(\.\d{0,3})?)$/;

                                    if (inputValue === "") {
                                      formik.setFieldValue(
                                        "scrap_rate_in",
                                        inputValue
                                      );
                                      formik.setFieldError(
                                        "scrap_rate_in",
                                        "Please enter scrap rate"
                                      );
                                    } else if (inputValue.length > 6) {
                                      formik.setFieldError(
                                        "scrap_rate_in",
                                        "Max. characters limit reached"
                                      );
                                    } else if (numbersOnly.test(inputValue)) {
                                      formik.setFieldValue(
                                        "scrap_rate_in",
                                        inputValue
                                      );
                                      formik.setFieldError("scrap_rate_in", "");

                                      const floatValue = parseFloat(inputValue);

                                      if (floatValue < 1 || floatValue > 100) {
                                        formik.setFieldError(
                                          "scrap_rate_in",
                                          "Range is 1 to 100 required"
                                        );
                                      }
                                    } else {
                                      formik.setFieldError(
                                        "scrap_rate_in",
                                        "Range is 1 to 100 required"
                                      );
                                    }
                                  }}
                                  helperText={`${errors?.scrap_rate_in ?? ""}`}
                                  error={errors?.scrap_rate_in ? true : false}
                                  inputRef={scrapRateRef}
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
              {testing_facility && (
                <QaqcandRndSeparation>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>Testing Facility</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {testing_facility && testing_facility}
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
                                <Typography>Inspecting Parties</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {inspecting_parties &&
                                  inspecting_parties.length > 1
                                    ? inspecting_parties.join(",")
                                    : inspecting_parties}
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
                                <Typography>First Pass Yield (in %)</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {first_pass_yield && `${first_pass_yield}%`}
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
                                <Typography>Overall Yield (in %)</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {overall_yield && `${overall_yield}%`}
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
                                  Certification Level of Quality Head
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {certificate_level_quality &&
                                    certificate_level_quality}
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
                                <Typography>
                                  Supplier Defect Rate (in %)
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {supplier_defect_rate_in &&
                                    `${supplier_defect_rate_in}%`}
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
                                <Typography>Scrap Rate (in %)</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {scrap_rate_in && `${scrap_rate_in}%`}
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
  );
}

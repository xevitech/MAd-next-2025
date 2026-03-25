import React, { useContext, useEffect, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import {
  apiClient,
  currencyRange,
  currencyRanges,
} from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  AstricksMark,
  ButtonModeHere,
  CompanyFacilityData,
  CompanyFacilityInnContainer,
  CompanyFacilityInnContainerQAQCnRND,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  FooterDiv,
  QaqcandRndSeparation,
  SavebtnBox,
  SaveTextWithIcon,
  StyledSelect,
  SubHeadingPage,
  TypographyTitle,
} from "./CompanyDetail/FactoryDetails/style";
import { CancelTextWithIcon } from "./CompanyDetail/Certificates/style";
import { getCompanyProfile } from "@/hooks/company";
import { ThreeDots } from "react-loader-spinner";

export default function RndSubTypeMainCommon({ type }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  const { commercialInfoCurrencies } = useSelector(
    (state: any) => state.editProduct
  );
  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setFieldTouched(name, false, false);
    setFieldError(name, "");
    setFieldValue(name, value);
  };
  const [editMode, setEditMode] = useState(false);
  const [showData, setShowData] = useState(true);
  const [qualityAssurance, setQualityAssurence] = useState<any>({});
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [isValidForSubmission, setIsValidForSubmission] = useState(true);
  const [selectedValue, setSelectedValue] = useState(
    qualityAssurance?.qa_enable ?? "no"
  );
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getQuailtyAssuranceDetails();
    setSelectedValue("no");
  }, []);
  const dispatch = useDispatch();

  const getQuailtyAssuranceDetails = async () => {
    let response = await apiClient("company_profile/QAQC/view", "get");
    if (response.status === 200) {
      const { data } = response;
      setQualityAssurence(data);
    }
  };
  const [commercialInfo, setCommercialInfo] = useState([]);
  useEffect(() => {
    getCurrency();
  }, []);
  const getCurrency = async () => {
    try {
      let response = await apiClient("currency", "get");
      setCommercialInfo(response?.data);
      return response;
    } catch (error) {}
  };
  function getSymbolByName(name) {
    const currency = commercialInfo?.find((currency) => currency.id === name);
    return currency ? currency.symbol : "";
  }
  useEffect(() => {
    setSelectedValue("no");
    formik.setValues({
      RnD_currency: RnD_currency || "",
      RnD_unit: RnD_unit || "",
      vitality_index: vitality_index || "",
      certification_level: certification_level || "",
      spending_no: spending_no || "",
      patent_production: patent_production || "",
    });
    formik.setFieldError("RnD_currency", "");
    formik.setFieldError("RnD_unit", "");
    formik.setFieldError("vitality_index", "");
    formik.setFieldError("certification_level", "");
    formik.setFieldError("spending_no", "");
    setEditMode(false);
  }, []);
  let RnD_currency,
    vitality_index,
    certification_level,
    spending_no,
    RnD_unit,
    patent_production,
    list,
    rnd_Data;
  const typeMapping = {
    Distributors: "distributor_rnd",
    Retailers: "retailer_rnd",
    Resellers: "reseller_rnd",
    Others: "other_rnd",
    Wholesalers: "wholesalers_rnd",
    Agent: "agent_respresent_rnd",
    Manufacturers: "manufacture_rnd",
  };
  const dataType = type;
  const selectedField = typeMapping[dataType];

  if (selectedField) {
    rnd_Data = companyDetails?.qaqc_rnd?.[selectedField] || null;
    list = rnd_Data ? JSON.parse(rnd_Data) : {};
    RnD_currency = list?.[dataType]?.RnD_currency;
    RnD_unit = list?.[dataType]?.RnD_unit;
    vitality_index = list?.[dataType]?.vitality_index;
    certification_level = list?.[dataType]?.certification_level;
    spending_no = list?.[dataType]?.spending_no;
    patent_production = list?.[dataType]?.patent_production;
  }
  const validation = Yup.object().shape({
    RnD_currency: Yup.string()
      .required("Please select the R&D Currency")
      .nullable(),
    RnD_unit: Yup.string().required("Please select R&D unit"),
    spending_no: Yup.string().required("Please enter R&D Spending"),
    vitality_index: Yup.string()
      .required("Please enter vitality index")
      .matches(
        /^(0|[1-9]\d{0,7})(\.\d{0,3})?$/,
        "Please enter a valid positive number"
      ),
    certification_level: Yup.string().required(
      "Please enter certification Level of R&D head"
    ),
  });
  const agentValidation = Yup.object().shape({
    RnD_currency: Yup.string()
      .required("Please select the R&D Currency")
      .nullable(),
    RnD_unit: Yup.string().required("Please select R&D unit"),
    spending_no: Yup.string().required("Please enter R&D Spending"),
    vitality_index: Yup.string().required("Please enter vitality index"),
    certification_level: Yup.string().required(
      "Please enter certification Level of R&D head"
    ),
    patent_production: Yup.string().required("Please enter patent production"),
  });
  let validate;
  if (type == "Agent") {
    validate = agentValidation;
  } else {
    validate = validation;
  }
  const handleCancel = () => {
    setSelectedValue("no");
    setEditMode(false),
      formik.setFieldValue("RnD_currency", RnD_currency ? RnD_currency : "");
    formik.setFieldValue(
      "vitality_index",
      vitality_index ? vitality_index : ""
    );
    formik.setFieldValue(
      "certification_level",
      certification_level ? certification_level : ""
    );
    formik.setFieldValue("RnD_unit", RnD_unit ? RnD_unit : "");
    formik.setFieldValue(
      "patent_production",
      patent_production ? patent_production : ""
    );
    formik.setFieldValue("spending_no", spending_no ? spending_no : "");
    formik.setFieldError("RnD_currency", "");
    formik.setFieldError("vitality_index", "");
    formik.setFieldError("certification_level", "");
    formik.setFieldError("testing_certificate", "");
    formik.setFieldError("RnD_unit", "");
    formik.setFieldError("spending_no", "");
    formik.setFieldError("patent_production", "");
  };

  let formik: any = useFormik({
    initialValues: {
      RnD_currency: [],
      RnD_unit: "",
      vitality_index: "",
      certification_level: "",
      spending_no: "",
      patent_production: "",
    },
    enableReinitialize: true,
    validationSchema: validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const vitalityIndex = values.vitality_index;
      const floatValue = parseFloat(vitalityIndex);
      if (isNaN(floatValue) || floatValue < 1 || floatValue > 100) {
        formik.setFieldTouched("vitality_index", true);
        formik.setFieldError(
          "vitality_index",
          "Vitality index must be between 1 and 100."
        );
        return;
      }
      let payload;
      setLoader(true);
      const key = typeMapping[type];
      if (key) {
        payload = {
          shop_id: companyDetails.basic_information.shop_id,
          [key]: {
            Show: editMode ? "yes" : "no",
            [type]: { ...values },
          },
        };
      }

      try {
        let response = await apiClient(
          "company_profile/createRndManfctureQaqc",
          "POST",
          { body: payload }
        );

        if (response.status === 200 || response.status === 201) {
          setLoader(false);
          setSelectedValue("no");
          setEditMode(false);
          getQuailtyAssuranceDetails();
          dispatch(getCompanyProfile());
        }
      } catch (error) {
        setLoader(false);
      }
    },
  });

  const {
    values,
    errors,
    setFieldError,
    setFieldValue,
    setFieldTouched,
    touched,
  } = formik;
  const rndCurrencyValue = values?.RnD_currency;

  return (
    <>
      <CompanyFacilityInnContainerQAQCnRND
        sx={{
          boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
          padding: editMode ? "16px" : "",
        }}
      >
        <SubHeadingPage
          className={!editMode && !vitality_index ? "qaqcandrndHeading" : ""}
        >
          <TypographyTitle>R&D Department</TypographyTitle>
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
                      <Typography
                        sx={{
                          "@media screen and (max-width:767px)": {
                            display: "none",
                          },
                        }}
                      >
                        Cancel
                      </Typography>
                    </CancelTextWithIcon>
                    <SaveTextWithIcon
                      className="savewithicon"
                      onClick={() => {
                        formik.handleSubmit();
                      }}
                    >
                      {loader ? (
                        <ThreeDots
                          height="20"
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

          {vitality_index && !editMode ? (
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
          {editMode ? (
            <EditModeBoxContainer>
              {showData && (
                <>
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid
                                container
                                spacing={1}
                                sx={{
                                  alignItems: `${
                                    errors?.RnD_currency ||
                                    errors?.spending_no ||
                                    errors.RnD_unit
                                      ? "baseline"
                                      : "center"
                                  }`,
                                }}
                              >
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      R&D Spending
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={4}
                                  md={2.9}
                                  sx={{
                                    height: "100%",
                                    "@media screen and (max-width:600px)": {
                                      height: "auto",
                                    },
                                  }}
                                  className=""
                                >
                                  <DataRowValue sx={{}}>
                                    <FormControl fullWidth size="small">
                                      <StyledSelect
                                        labelId="rnd-spending-select-label"
                                        id="rnd-spending-select"
                                        name="RnD_currency"
                                        value={formik.values.RnD_currency}
                                        onChange={handleCustomChange}
                                        error={Boolean(
                                          touched?.RnD_currency &&
                                            errors?.RnD_currency
                                        )}
                                        displayEmpty
                                        MenuProps={{
                                          PaperProps: {
                                            sx: {
                                              maxHeight: 130,
                                              "&::-webkit-scrollbar": {
                                                width: "6px",
                                                height: "6px",
                                              },
                                              "&::-webkit-scrollbar-track": {
                                                boxShadow:
                                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                                webkitBoxShadow:
                                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                              },
                                              "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: "#dedede",
                                                borderRadius: "4px",
                                              },
                                            },
                                          },
                                        }}
                                        sx={{
                                          "& .MuiSelect-select": {
                                            opacity:
                                              formik.values.RnD_currency === ""
                                                ? "0.5"
                                                : "1",
                                          },
                                        }}
                                      >
                                        <MenuItem value="" disabled>
                                          Select Currency
                                        </MenuItem>
                                        {commercialInfoCurrencies?.map(
                                          (item: any) => (
                                            <MenuItem
                                              key={item.value}
                                              value={item.value}
                                            >
                                              {item.view}
                                            </MenuItem>
                                          )
                                        )}
                                      </StyledSelect>

                                      {touched?.RnD_currency &&
                                        errors?.RnD_currency && (
                                          <FormHelperText error>
                                            {errors.RnD_currency}
                                          </FormHelperText>
                                        )}
                                    </FormControl>
                                  </DataRowValue>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={4}
                                  md={2.4}
                                  sx={{
                                    height: "100%",
                                    "@media screen and (max-width:600px)": {
                                      height: "auto",
                                    },
                                  }}
                                  className="RndSpending"
                                >
                                  <DataRowValue sx={{}}>
                                    <TextField
                                      id="spending_no"
                                      placeholder="Enter the amount"
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                      name="spending_no"
                                      value={formik.values.spending_no}
                                      error={Boolean(
                                        formik.touched.spending_no &&
                                          formik.errors.spending_no
                                      )}
                                      helperText={
                                        formik.touched.spending_no &&
                                        formik.errors.spending_no
                                      }
                                      onChange={(e) => {
                                        const value =
                                          e.target.value.trimStart();

                                        if (/^\d*$/.test(value)) {
                                          if (value.length <= 8) {
                                            formik.setFieldValue(
                                              `spending_no`,
                                              value
                                            );
                                            formik.setFieldError(
                                              `spending_no`,
                                              ""
                                            );
                                          } else {
                                            formik.setFieldError(
                                              `spending_no`,
                                              "Spending no. value content is too long. Please limit it to 8 digit."
                                            );
                                          }
                                          formik.setFieldTouched(
                                            `spending_no`,
                                            true,
                                            false
                                          );
                                        }
                                      }}
                                    />
                                  </DataRowValue>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  sm={4}
                                  md={2.7}
                                  sx={{
                                    height: "100%",
                                    "@media screen and (max-width:600px)": {
                                      height: "auto",
                                    },
                                  }}
                                  className="RndSpending"
                                >
                                  <DataRowValue sx={{}}>
                                    <FormControl fullWidth size="small">
                                      <StyledSelect
                                        labelId={"rnd-spending-select-label"}
                                        id={"rnd-spending-select"}
                                        name={`RnD_unit`}
                                        placeholder="Please select amount unit"
                                        value={formik.values?.RnD_unit}
                                        error={Boolean(
                                          touched?.RnD_unit && errors?.RnD_unit
                                        )}
                                        onChange={handleCustomChange}
                                        displayEmpty
                                        MenuProps={{
                                          PaperProps: {
                                            sx: {
                                              maxHeight: 130,
                                              "&::-webkit-scrollbar": {
                                                width: "6px",
                                                height: "6px",
                                              },
                                              "&::-webkit-scrollbar-track": {
                                                boxShadow:
                                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                                webkitBoxShadow:
                                                  "inset 0 0 6px rgba(0,0,0,0.00)",
                                              },
                                              "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: "#dedede",
                                                borderRadius: "4px",
                                              },
                                            },
                                          },
                                        }}
                                        sx={{
                                          "& .MuiFormHelperText-root::before": {
                                            display: `${
                                              errors?.RnD_unit
                                                ? "inline-block"
                                                : "none"
                                            }`,
                                          },
                                          "& .MuiSelect-select": {
                                            opacity:
                                              formik.values.RnD_currency === ""
                                                ? "0.5"
                                                : "1",
                                          },
                                        }}
                                      >
                                        <MenuItem value="" disabled>
                                          Please select R&D unit
                                        </MenuItem>
                                        {currencyRange?.map((item) => (
                                          <MenuItem value={item}>
                                            {item}
                                          </MenuItem>
                                        ))}
                                      </StyledSelect>

                                      {touched.RnD_unit && errors.RnD_unit && (
                                        <FormHelperText error>
                                          {errors.RnD_unit}
                                        </FormHelperText>
                                      )}
                                    </FormControl>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid
                                container
                                spacing={1}
                                sx={{
                                  alignItems: "baseline",
                                }}
                              >
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      Vitality Index (in %){" "}
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue width={"100%"}>
                                    <DataRowValue width={"100%"}>
                                      <TextField
                                        style={{
                                          width: "100%",
                                        }}
                                        variant="outlined"
                                        size="small"
                                        name="vitality_index"
                                        placeholder="Enter vitality index "
                                        type="text"
                                        onChange={(e) => {
                                          const inputValue = e.target.value;
                                          const numbersOnly =
                                            /^(100(\.0{0,3})?|[1-9]?\d(\.\d{0,3})?)$/;

                                          if (inputValue === "") {
                                            formik.setFieldValue(
                                              "vitality_index",
                                              inputValue
                                            );
                                            formik.setFieldError(
                                              "vitality_index",
                                              "Please enter overall yield"
                                            );
                                          } else if (inputValue.length > 6) {
                                            formik.setFieldError(
                                              "vitality_index",
                                              "Max. characters limit reached"
                                            );
                                          } else if (
                                            numbersOnly.test(inputValue)
                                          ) {
                                            formik.setFieldValue(
                                              "vitality_index",
                                              inputValue
                                            );
                                            formik.setFieldError(
                                              "vitality_index",
                                              ""
                                            );

                                            const floatValue =
                                              parseFloat(inputValue);

                                            if (
                                              floatValue < 1 ||
                                              floatValue > 100
                                            ) {
                                              formik.setFieldError(
                                                "vitality_index",
                                                "Range is 1 to 100 required"
                                              );
                                            }
                                          } else {
                                            formik.setFieldError(
                                              "vitality_index",
                                              "Range is 1 to 100 required"
                                            );
                                          }
                                        }}
                                        helperText={`${
                                          errors?.vitality_index ?? ""
                                        }`}
                                        error={
                                          errors?.vitality_index ? true : false
                                        }
                                        value={values.vitality_index}
                                      />
                                    </DataRowValue>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <>
                            {type == "Agent" && (
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems={"baseline"}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Patent Production
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="patent-production"
                                          style={{
                                            width: "100%",
                                            paddingTop: "4px",
                                            paddingBottom: "4px",
                                          }}
                                          variant="outlined"
                                          size="small"
                                          name="patent_production"
                                          placeholder="Enter patent production"
                                          type="text"
                                          value={values?.patent_production}
                                          onChange={(e) => {
                                            const input = e.target;
                                            const newValue = input.value;
                                            const cursorPosition =
                                              input.selectionStart;
                                            if (newValue.length > 100) {
                                              formik.setFieldError(
                                                "patent_production",
                                                "Patent Production content is too long. Please limit it to 100."
                                              );
                                              return;
                                            }
                                            const trimmedValue =
                                              newValue.trimStart();
                                            if (trimmedValue !== newValue) {
                                              formik.setFieldValue(
                                                "patent_production",
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
                                                "patent_production",
                                                newValue
                                              );
                                              formik.setFieldError(
                                                "patent_production",
                                                ""
                                              );
                                              requestAnimationFrame(() => {
                                                input.selectionStart =
                                                  input.selectionEnd =
                                                    cursorPosition;
                                              });
                                            }
                                          }}
                                          sx={{
                                            "& .MuiFormHelperText-root::before":
                                              {
                                                display: `${
                                                  errors?.patent_production
                                                    ? "inline-block"
                                                    : "none"
                                                }`,
                                              },
                                          }}
                                          helperText={`${
                                            errors?.patent_production ?? ""
                                          }`}
                                          error={
                                            errors?.patent_production
                                              ? true
                                              : false
                                          }
                                        />
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                            )}
                          </>

                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid
                                container
                                spacing={1}
                                sx={{
                                  alignItems: "baseline",
                                }}
                              >
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      Certification Level of R&D Head
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <TextField
                                      id="certification-level"
                                      style={{
                                        width: "100%",
                                        paddingTop: "4px",
                                        paddingBottom: "4px",
                                      }}
                                      variant="outlined"
                                      size="small"
                                      name="certification_level"
                                      placeholder="Enter certification level of R&D Head"
                                      type="text"
                                      value={values.certification_level}
                                      onChange={(e) => {
                                        const input = e.target;
                                        const newValue = input.value;
                                        const cursorPosition =
                                          input.selectionStart;
                                        if (newValue.length > 100) {
                                          formik.setFieldError(
                                            "certification_level",
                                            "Certification Level of R&D Head Limit exceeded. You can enter up to 100 characters."
                                          );
                                          return;
                                        }
                                        const trimmedValue =
                                          newValue.trimStart();
                                        if (trimmedValue !== newValue) {
                                          formik.setFieldValue(
                                            "certification_level",
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
                                            "certification_level",
                                            newValue
                                          );
                                          formik.setFieldError(
                                            "certification_level",
                                            ""
                                          );
                                          requestAnimationFrame(() => {
                                            input.selectionStart =
                                              input.selectionEnd =
                                                cursorPosition;
                                          });
                                        }
                                      }}
                                      sx={{
                                        "& .MuiFormHelperText-root::before": {
                                          display: `${
                                            errors?.certification_level
                                              ? "inline-block"
                                              : "none"
                                          }`,
                                        },
                                      }}
                                      helperText={`${
                                        errors?.certification_level ?? ""
                                      }`}
                                      error={
                                        errors?.certification_level
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
                    <FooterDiv>
                      <Divider variant="middle" />
                    </FooterDiv>
                  </>
                </>
              )}
            </EditModeBoxContainer>
          ) : (
            <Box>
              {vitality_index && (
                 <QaqcandRndSeparation>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>R&D Spending</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {formik.values.RnD_currency
                                    ? getSymbolByName(
                                        formik.values.RnD_currency
                                      )
                                    : ""}
                                  {formik?.values?.spending_no &&
                                    formik?.values?.spending_no}{" "}
                                  {formik?.values?.RnD_unit &&
                                    formik?.values?.RnD_unit}
                                </Typography>

                                <Typography></Typography>
                                <Typography></Typography>
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
                                <Typography>Vitality Index</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {formik?.values?.vitality_index !==
                                    undefined &&
                                    `${formik.values.vitality_index} %`}
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
                      {type == "Agent" && (
                        <Grid item xs={12} sm={12} md={6}>
                          <DataRowHere>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={4}>
                                <DataRowTitle>
                                  <Typography>Patent production</Typography>
                                </DataRowTitle>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8}>
                                <DataRowValue>
                                  <Typography>
                                    {patent_production && patent_production}
                                  </Typography>
                                </DataRowValue>
                              </Grid>
                            </Grid>
                          </DataRowHere>
                        </Grid>
                      )}
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>
                                  Certification Level of R&D Head
                                </Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {formik?.values?.certification_level &&
                                    formik?.values?.certification_level}
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
        </CompanyFacilityData>
      </CompanyFacilityInnContainerQAQCnRND>
    </>
  );
}

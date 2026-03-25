import React, { useState } from "react";
import {
  AstricksMark,
  ButtonModeHere,
  CancelTextWithIcon,
  CompanyFacilityData,
  CompanyFacilityInnContainer,
  DataRowHere,
  DataRowTitle,
  DataRowValue,
  EditModeBoxContainer,
  EditSaveIcons,
  EditSaveIcons1,
  FooterDiv,
  PlushIcon,
  PlushIconBox,
  Radiomain,
  SavebtnBox,
  SaveTextWithIcon,
  SubHeadingPage,
  TypographyTitle,
} from "../FactoryDetails/style";
import {
  Box,
  Button,
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
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { apiClient } from "@/components/common/common";
import RndProcess from "./RndProcess";

const OthersRnD = ({ editMode, setEditMode, data }) => {
  const [showData, setShowData] = useState(false);
  const { commercialInfoCurrencies } = useSelector(
    (state: any) => state.editProduct
  );
  const currencyRanges = [
    "Less than 1 Million",
    "1 Million - 10 Million",
    "10 Million - 50 Million",
    "50 Million - 100 Million",
    "100 Million - 500 Million",
    "500 Million - 1 Billion",
    "Above 1 Billion",
  ];
  const { companyDetails, businessType }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const getTypeKey = (businessTypeName) => {
    switch (businessTypeName) {
      case "Distributors":
        return "distributor_rnd";
      case "Wholesalers":
        return "wholesalers_rnd";
      case "Agents and Representative":
        return "agent_represent_rnd";
      case "Others":
        return "other_rnd";
      case "Resellers":
        return "reseller_rnd";
      default:
        return "other_rnd";
    }
  };
  const validationSchema = Yup.object().shape({
    storeDetails: Yup.array().of(
      Yup.object().shape({
        // RnD_spending: Yup.string().required('R&D Spending is required'),
        RnD_currency: Yup.string().required("R&D Currency is required"),
        RnD_unit: Yup.string().required("R&D Currency range is required"),
        vitality_index: Yup.string().required("Vitality Index is required"),
        patent_production: Yup.string().when([], {
          is: () => businessType?.name === "Manufacturers",
          then: () => Yup.string().required("Patent Production is required"),
          otherwise: () => Yup.string().nullable(),
        }),
        certification_level: Yup.string().required(
          "Certification Level is required"
        ),
      })
    ),
  });

  let formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      storeDetails: [
        {
          // RnD_spending: data[0]?.RnD_spending ?? "",
          RnD_currency: data[0]?.RnD_currency ?? "",
          RnD_unit: data[0]?.RnD_unit ?? "",
          id: 1,
          vitality_index: data[0]?.vitality_index ?? "",
          patent_production: data[0]?.patent_production ?? "",
          certification_level: data[0]?.patent_production ?? "",
        },
      ],
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      let storeDetails = values?.storeDetails.map((detail) => {
        if (businessType?.name !== "Manufacture") {
          delete detail.patent_production;
        }
        return detail;
      });
      let response = await apiClient(
        "company_profile/createRndManfctureQaqc",
        "post",
        {
          body: {
            shop_id: companyDetails.basic_information.shop_id,
            manufacture_rnd: {
              Show: editMode ? "yes" : "no",
              [businessType?.name]: {
                "R&D Department": JSON.stringify(storeDetails),
              },
            },
          },
        }
      );
      if (response.status == 200 || response.status == true) {
        setEditMode(false);
      }
    },
  });

  const processvValidationSchema = Yup.object().shape({
    process_details: Yup.array().of(
      Yup.object().shape({
        process_name: Yup.string().required("please enter process name"),
        process_image: Yup.array()
          .min(1, "Please upload at least one image")
          .max(3, "Maximum 3 images required")
          .required("please upload process images"),
        process_description: Yup.string().required(
          "please enter process description"
        ),
      })
    ),
  });

  let process_formik: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      process_details: [
        {
          process_name: "",
          process_image: [],
          process_description: "",
          id: 1,
        },
      ],
    },
    validationSchema: processvValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const type = getTypeKey(businessType?.name);
      // const payload = {
      //   shop_id: companyDetails.basic_information.shop_id,
      //   manufacture_rnd: {
      //     Show: editMode ? "yes" : "no",
      //     [type]: {
      //       "R&D Department": values?.storeDetails,
      //     },
      //   },
      // };
      // console.log(payload, "payload");
    },
  });

  const {
    setFieldValue,
    values,
    handleSubmit,
    errors,
    setFieldError,
    setFieldTouched,
    touched,
  } = formik;

  const addMoreBlock = () => {
    setFieldValue("storeDetails", [
      ...values.storeDetails,
      {
        RnD_spending: "",
        RnD_currency: "",
        RnD_unit: "",
        id: values.storeDetails.length + 1,
        vitality_index: "",
        patent_production: "",
        certification_level: "",
      },
    ]);
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setFieldTouched(name, false, false);
    setFieldError(name, "");
    setFieldValue(name, value);
  };

  const handleRadioChange = (event) => {
    if (event.target.value === "yes") {
      setShowData(true);
    } else {
      setShowData(false);
    }
  };

  const removeBlock = (id) => {
    setFieldValue(
      "storeDetails",
      values?.storeDetails?.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <CompanyFacilityInnContainer
        sx={{
          boxShadow: editMode ? "0px 2px 2px 0px #9FA2BF52" : "",
          padding: editMode ? "16px" : "",
        }}
      >
        <SubHeadingPage>
          <TypographyTitle>R&D Department </TypographyTitle>
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
          {editMode ? (
            <EditModeBoxContainer>
              {showData && (
                <>
                  {/* {values.storeDetails.map((detail, index) => ( */}
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      R&D Spending{" "}
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                  <DataRowValue>
                                    <FormControl fullWidth size="small">
                                      <Select
                                        labelId={"rnd-spending-select-label"}
                                        id={"rnd-spending-select"}
                                        name={"RnD_currency"}
                                        value={formik.values.RnD_currency}
                                        onChange={handleCustomChange}
                                        error={Boolean(
                                          touched?.RnD_currency &&
                                            errors?.RnD_currency
                                        )}
                                        displayEmpty
                                      >
                                        {commercialInfoCurrencies?.map(
                                          (item) => (
                                            <MenuItem value={item?.view}>
                                              {item?.view}
                                            </MenuItem>
                                          )
                                        )}
                                      </Select>
                                      {touched?.RnD_currency &&
                                        errors?.RnD_currency && (
                                          <FormHelperText error>
                                            {errors.RnD_currency}
                                          </FormHelperText>
                                        )}
                                    </FormControl>
                                  </DataRowValue>
                                </Grid>
                                {/* <Grid item xs={12} sm={4} md={2}>
                                <DataRowValue>
                                  <TextField
                                    id={`outlined-basic-${index}`}
                                    placeholder="Enter equipment name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    name={`storeDetails[${index}].RnD_spending`}
                                    value={detail.RnD_spending}
                                    error={Boolean(touched.storeDetails?.[index]?.RnD_spending && errors.storeDetails?.[index]?.RnD_spending)}
                                    helperText={touched.storeDetails?.[index]?.RnD_spending && errors.storeDetails?.[index]?.RnD_spending}
                                    onChange={(e)=>{
                                      const inputValue = e.target.value;
                                      if (/^\d*$/.test(inputValue)) {
                                        handleCustomChange(e);
                                      }}}
                                  />
                                </DataRowValue>
                              </Grid> */}
                                <Grid item xs={12} sm={4} md={3}>
                                  <DataRowValue>
                                    <FormControl fullWidth size="small">
                                      <Select
                                        labelId={"rnd-spending-select-label"}
                                        id={"rnd-spending-select"}
                                        name={`RnD_unit`}
                                        // value={RnD_unit}
                                        error={Boolean(
                                          touched?.RnD_unit && errors?.RnD_unit
                                        )}
                                        onChange={handleCustomChange}
                                        displayEmpty
                                      >
                                        {currencyRanges?.map((item) => (
                                          <MenuItem value={item}>
                                            {item}
                                          </MenuItem>
                                        ))}
                                      </Select>
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
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      Vitality Index{" "}
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    {/* <TextField
                                      id={`vitality-index-${index}`}
                                      placeholder="Enter vitality index"
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                      name={`storeDetails[${index}].vitality_index`}
                                      value={detail.vitality_index}
                                      error={Boolean(
                                        touched.storeDetails?.[index]
                                          ?.vitality_index &&
                                          errors.storeDetails?.[index]
                                            ?.vitality_index
                                      )}
                                      helperText={
                                        touched.storeDetails?.[index]
                                          ?.vitality_index &&
                                        errors.storeDetails?.[index]
                                          ?.vitality_index
                                      }
                                      onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (/^\d*$/.test(inputValue)) {
                                          handleCustomChange(e);
                                        }
                                      }}
                                    /> */}
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          {businessType?.name === "Manufacturers" && (
                            <Grid item xs={12} sm={12} md={6}>
                              <DataRowHere className="editview">
                                <Grid container spacing={1} alignItems="center">
                                  <Grid item xs={12} sm={12} md={4}>
                                    <DataRowTitle>
                                      <Typography>
                                        Patent Production{" "}
                                        <AstricksMark> *</AstricksMark>
                                      </Typography>
                                    </DataRowTitle>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={8}>
                                    <DataRowValue>
                                      <TextField
                                        id={`patent-production`}
                                        placeholder="Enter patent production"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        name={"patent_production"}
                                        value={values.patent_production}
                                        error={Boolean(
                                          touched.patent_production &&
                                            errors?.patent_production
                                        )}
                                        helperText={
                                          touched?.patent_production &&
                                          errors?.patent_production
                                        }
                                        onChange={handleCustomChange}
                                      />
                                    </DataRowValue>
                                  </Grid>
                                </Grid>
                              </DataRowHere>
                            </Grid>
                          )}
                          <Grid item xs={12} sm={12} md={6}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={12} md={4}>
                                  <DataRowTitle>
                                    <Typography>
                                      Certification Level of R&D Head{" "}
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                  <DataRowValue>
                                    <TextField
                                      id={`certification-level`}
                                      placeholder="Enter certification level of R&D head"
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                      name={`certification_level`}
                                      value={values.certification_level}
                                      error={Boolean(
                                        touched.certification_level &&
                                          errors?.certification_level
                                      )}
                                      helperText={
                                        touched?.certification_level &&
                                        errors?.certification_level
                                      }
                                      onChange={handleCustomChange}
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
                    <Radiomain>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <SavebtnBox>
                            {editMode && (
                              <EditSaveIcons>
                                <CancelTextWithIcon
                                  onClick={() => {
                                    setEditMode(false), formik.resetForm();
                                  }}
                                  className="cancelwithicon"
                                >
                                  <CloseIcon />
                                  <Typography>Cancel</Typography>
                                </CancelTextWithIcon>
                                <SaveTextWithIcon
                                  className="savewithicon"
                                  onClick={handleSubmit}
                                >
                                  <SaveOutlinedIcon />
                                  <Typography variant="body1">Save</Typography>
                                </SaveTextWithIcon>
                              </EditSaveIcons>
                            )}
                          </SavebtnBox>
                          <PlushIconBox></PlushIconBox>
                        </Grid>
                      </Grid>
                    </Radiomain>
                  </>
                  {/* ))} */}
                </>
              )}
            </EditModeBoxContainer>
          ) : (
            <Box>
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
                                {formik?.values?.storeDetails[0]?.RnD_currency
                                  ? formik?.values?.storeDetails[0]?.RnD_currency?.match(
                                      /\(([^)]+)\)/
                                    )?.[1]
                                  : "NA"}
                              </Typography>
                              <Typography>
                                {formik?.values?.storeDetails[0]?.RnD_unit
                                  ? formik?.values?.storeDetails[0]?.RnD_unit
                                  : "NA"}
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
                              <Typography>Vitality Index</Typography>
                            </DataRowTitle>
                          </Grid>
                          <Grid item xs={12} sm={12} md={8}>
                            <DataRowValue>
                              <Typography>
                                {formik?.values?.storeDetails[0]?.vitality_index
                                  ? formik?.values?.storeDetails[0]
                                      ?.vitality_index
                                  : "NA"}
                              </Typography>
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}></Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {businessType?.name === "Manufacturers" && (
                      <Grid item xs={12} sm={12} md={6}>
                        <DataRowHere>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} md={4}>
                              <DataRowTitle>
                                <Typography>Patent Production</Typography>
                              </DataRowTitle>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                              <DataRowValue>
                                <Typography>
                                  {formik?.values?.storeDetails[0]
                                    ?.patent_production
                                    ? formik?.values?.storeDetails[0]
                                        ?.patent_production
                                    : "NA"}
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
                                {formik?.values?.storeDetails[0]
                                  ?.certification_level
                                  ? formik?.values?.storeDetails[0]
                                      ?.certification_level
                                  : "NA"}
                              </Typography>
                            </DataRowValue>
                          </Grid>
                        </Grid>
                      </DataRowHere>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </CompanyFacilityData>
      </CompanyFacilityInnContainer>
    </>
  );
};

export default OthersRnD;

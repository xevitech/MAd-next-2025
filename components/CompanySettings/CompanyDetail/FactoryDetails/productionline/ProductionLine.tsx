import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Grid,
  Divider,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";

import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box } from "@/components/dashboard/style";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThreeDots } from "react-loader-spinner";

import { apiClient, currencyRange } from "@/components/common/common";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
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
  PlushIcon,
  PlushIconBox,
  SaveTextWithIcon,
  Separation,
  SeparationSkeleton,
  SwitchButtons,
  ToggleBox,
  TypographyTitle,
  ViewMorLess,
} from "../style";
import ProductLineSkeleton from "../CompanyfacilitySkeleton/ProductLineSkeleton";
const initialFormValues = {
  productionLine: "",
  noofSuperviser: "",
  noofoperators: "",
  noofQaStaff: "",
};

const RetailerStore = ({ type, handlCallBackFunction, list }): any => {
  let factoryData;
  let warehouseData;
  let storeData;
  let annualData;
  let productionProcessData;
  let productionLineData;
  let productionEquipemenData;

  const fetchedData = list?.[type];
  if (fetchedData) {
    const parsedData = JSON.parse(fetchedData);
    factoryData = parsedData?.factory ?? "";
    warehouseData = parsedData?.warehouse ?? "";
    storeData = parsedData?.store ?? "";
    annualData = parsedData?.annual_production_capacity ?? "";
    productionProcessData = parsedData?.production_process ?? "";
    productionLineData = parsedData?.production_line ?? "";
    productionEquipemenData = parsedData?.production_equipment ?? "";
  }

  const [formBlocks, setFormBlocks] = useState([initialFormValues]);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const [loader, setLoader] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  const [data, setData] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const getCompanyData = async () => {
    try {
      setLoader(true);
      let response = await fetch(
        `${BASE_URL}/company_profile/view/company-Faclities`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      const resp = await response.json();
      const fetchedData = resp?.data?.[type];
      if (fetchedData) {
        const parsedData = JSON.parse(fetchedData);
        if (
          Array.isArray(parsedData?.production_line) &&
          parsedData.production_line.length > 0
        ) {
          parsedData.production_line.forEach((storeEntry) => {
            if (
              Array.isArray(storeEntry.production_data) &&
              storeEntry.production_data.length > 0
            ) {
              setData(storeEntry.production_data);
              setFormBlocks(storeEntry.production_data);
              setEnabled(storeEntry?.selected_value === "yes");
            }
          });
        }
      }
      setLoader(false);
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    getCompanyData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      const cleanedData = data.filter((formBlock) => {
        return Object.values(formBlock).some(
          (value) => value !== null && value !== "" && value !== undefined
        );
      });

      formik.setValues({ forms: cleanedData });
    }
  }, [data]);

  const handleViewLess = () => {
    setVisibleCount((prevCount) => (prevCount > 5 ? prevCount - 5 : 5));
  };
  const handleRemove = (index) => {
    if (index !== 0) {
      const formList = formik.values.forms;
      const res = formList.filter((form, i) => {
        return i !== index;
      });

      formik.setFieldValue("forms", res);
    }
  };
  const formik: any = useFormik({
    initialValues: {
      forms: data?.length > 0 ? data : formBlocks,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      forms: Yup.array().of(
        Yup.object().shape({
          productionLine: Yup.string().required(
            "Please enter production line name"
          ),
          noofSuperviser: Yup.string().required(
            "Please enter no. of supervisor."
          ),
          noofoperators: Yup.string().required("Please enter no. of operator."),
          noofQaStaff: Yup.string().required(
            "Please enter no. of Qa/QC staff."
          ),
        })
      ),
    }),
    onSubmit: async (values) => {
      setLoader(true);
      const value = values?.forms;
      const production_data = value.map(({ formBlocks, ...rest }) => rest);
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          production_line: [
            {
              selected_value: enabled ? "yes" : "no",
              production_data,
            },
          ],
          factory: factoryData,
          warehouse: warehouseData,
          annual_production_capacity: annualData,
          production_process: productionProcessData,
          production_equipment: productionEquipemenData,
          store: storeData,
        },
      };
      let response = await apiClient(
        "company_profile/company-Faclities",
        "POST",
        { body: combinedPayload }
      );
      if (response.status === 200 || response.status === 201) {
        setSelectedValue("no");
        setEditMode(false);
        getCompanyData();
        handlCallBackFunction();
      }
    },
  });

  const handleSaveClick = () => {
    const touchedArray = formik.values.forms.map(() => ({
      productionLine: true,
      noofSuperviser: true,
      noofoperators: true,
      noofQaStaff: true,
    }));

    formik.setTouched({
      forms: touchedArray,
    });

    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      }
    });
  };
  const [editMode, setEditMode] = useState(false);
  const addFormBlock = () => {
    setFormBlocks((prevFormBlocks) => [...prevFormBlocks, initialFormValues]);
    const addForm = formik.values.forms;
    addForm.push(initialFormValues);
  };

  const [selectedValue, setSelectedValue] = useState("no");
  const handleCancel = () => {
    setSelectedValue("no");
    setEditMode(false);

    formik.resetForm({
      values: {
        ...formik.values,
        forms: data,
      },
    });

    const formikValue = data;
    const storedDataLength = data?.length;

    const slicedValue = [
      formikValue[0],
      ...formikValue?.slice(1, storedDataLength),
    ];
    formik.setFieldValue("forms", slicedValue);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value == "yes") {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  const handleToggleChange = (event) => {
    const newValue = event.target.checked;
    setEnabled(newValue);
    if (!editMode) {
      const value = formik.values?.forms;
      const production_data = value.map(({ formBlocks, ...rest }) => rest);
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          production_line: [
            {
              selected_value: newValue ? "yes" : "no",
              production_data,
            },
          ],
          factory: factoryData,
          warehouse: warehouseData,
          annual_production_capacity: annualData,
          production_process: productionProcessData,
          production_equipment: productionEquipemenData,
          store: storeData,
        },
      };
      toggleChange(combinedPayload);
    }
  };
  const toggleChange = async (combinedPayload) => {
    try {
      let response = await apiClient(
        "company_profile/company-Faclities",
        "POST",
        {
          body: combinedPayload,
        }
      );

      if (response.status === 200 || response.status === 201) {
        getCompanyData();
        handlCallBackFunction();
      }
    } catch (error) {}
  };
  return (
    <CompanyFacilityInnContainerQAQCnRND
      sx={{
        boxShadow: editMode ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "",
        padding: editMode ? "16px" : "0px 0 16px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: editMode ? "0px 0 0px 0" : "16px 16px 0px 16px",
          "@media screen and (max-width:767px)": { padding: "0px" },
        }}
      >
        <TypographyTitle className="toggleBoxstyle">
          Production Line
          <ToggleBox>
            <LightTooltip
              arrow
              disableInteractive
              placement="top"
              title={
                enabled
                  ? "Hide content on minisite"
                  : "Show content on minisite"
              }
            >
              {editMode ? (
                <SwitchButtons
                  checked={enabled}
                  onChange={handleToggleChange}
                />
              ) : (
                data.length > 0 && (
                  <SwitchButtons
                    checked={enabled}
                    onChange={handleToggleChange}
                  />
                )
              )}
            </LightTooltip>
          </ToggleBox>
        </TypographyTitle>
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
              onClick={() => handleSaveClick()}
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
        {data?.length > 0 && !editMode ? (
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
                    padding: "0px",
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
      </Box>
      <form onSubmit={() => formik.handleSubmit()}>
        {formik?.values?.forms &&
          formik?.values?.forms?.map((form, index) => (
            <Box
              sx={{
                padding: editMode ? "16px 0 0 0 !important" : "0",
                marginTop: index === 0 ? "" : "10px",
              }}
            >
              {editMode && (
                <CompanyFacilityData>
                  {editMode && (
                    <EditModeBoxContainer className="">
                      <form onSubmit={() => formik.onSubmit()}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                alignItems:
                                  (formik.touched.forms?.[index]
                                    ?.productionLine &&
                                    formik.errors.forms?.[index]
                                      ?.productionLine) ||
                                  (formik.touched.forms?.[index]
                                    ?.noofSuperviser &&
                                    formik.errors.forms?.[index]
                                      ?.noofSuperviser)
                                    ? "baseline"
                                    : "center",
                              }}
                            >
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    sx={{
                                      alignItems:
                                        formik.touched.forms?.[index]
                                          ?.productionLine &&
                                        formik.errors.forms?.[index]
                                          ?.productionLine
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Production Line Name
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Enter production line name"
                                          fullWidth
                                          name={`forms[${index}].productionLine`}
                                          value={
                                            formik.values.forms[index]
                                              ?.productionLine
                                          }
                                          onChange={(e) => {
                                            const inputValue =
                                              e.target.value.trimStart();

                                            if (inputValue.length <= 100) {
                                              formik.setFieldValue(
                                                `forms[${index}].productionLine`,
                                                inputValue
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].productionLine`,
                                                ""
                                              );
                                            } else {
                                              formik.setFieldError(
                                                `forms[${index}].productionLine`,
                                                "Production line name content is too long. Please limit it to 100 character."
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].productionLine`,
                                              true,
                                              false
                                            );
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].productionLine`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.productionLine &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.productionLine
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.productionLine &&
                                            formik.errors.forms?.[index]
                                              ?.productionLine
                                          }
                                        />
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
                                      alignItems:
                                        formik.touched.forms?.[index]
                                          ?.noofSuperviser &&
                                        formik.errors.forms?.[index]
                                          ?.noofSuperviser
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          No. of Supervisor
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Enter No. of supervisor"
                                          fullWidth
                                          name={`forms[${index}].noofSuperviser`}
                                          value={
                                            formik.values.forms[index]
                                              ?.noofSuperviser
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(
                                              /[a-zA-Z]/g,
                                              ""
                                            );
                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                            if (regex.test(value)) {
                                              if (value.length <= 8) {
                                                formik.setFieldValue(
                                                  `forms[${index}].noofSuperviser`,
                                                  value
                                                );
                                                formik.setFieldError(
                                                  `forms[${index}].noofSuperviser`,
                                                  ""
                                                );
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].noofSuperviser`,
                                                  "Supervisor no. value content is too long. Please limit it to 8 digit."
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].noofSuperviser`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noofSuperviser`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noofSuperviser &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noofSuperviser
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.noofSuperviser &&
                                            formik.errors.forms?.[index]
                                              ?.noofSuperviser
                                          }
                                        />
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                alignItems:
                                  (formik.touched.forms?.[index]
                                    ?.noofoperators &&
                                    formik.errors.forms?.[index]
                                      ?.noofoperators) ||
                                  (formik.touched.forms?.[index]?.noofQaStaff &&
                                    formik.errors.forms?.[index]?.noofQaStaff)
                                    ? "baseline"
                                    : "center",
                              }}
                            >
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    sx={{
                                      alignItems:
                                        formik.touched.forms?.[index]
                                          ?.noofoperators &&
                                        formik.errors.forms?.[index]
                                          ?.noofoperators
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          No. of Operator
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Enter No. of operator"
                                          fullWidth
                                          name={`forms[${index}].noofoperators`}
                                          value={
                                            formik.values.forms[index]
                                              ?.noofoperators
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(
                                              /[a-zA-Z]/g,
                                              ""
                                            );
                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                            if (regex.test(value)) {
                                              if (value.length <= 8) {
                                                formik.setFieldValue(
                                                  `forms[${index}].noofoperators`,
                                                  value
                                                );
                                                formik.setFieldError(
                                                  `forms[${index}].noofoperators`,
                                                  ""
                                                );
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].noofoperators`,
                                                  "No. of operator value content is too long. Please limit it to 8 digit."
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].noofoperators`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noofoperators`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noofoperators &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noofoperators
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.noofoperators &&
                                            formik.errors.forms?.[index]
                                              ?.noofoperators
                                          }
                                        />
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
                                      alignItems:
                                        formik.touched.forms?.[index]
                                          ?.noofQaStaff &&
                                        formik.errors.forms?.[index]
                                          ?.noofQaStaff
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={4} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          No. of QA/QC staff
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Enter No. of QA/QC Staff"
                                          fullWidth
                                          name={`forms[${index}].noofQaStaff`}
                                          value={
                                            formik.values.forms[index]
                                              ?.noofQaStaff
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(
                                              /[a-zA-Z]/g,
                                              ""
                                            );
                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                            if (regex.test(value)) {
                                              if (value.length <= 8) {
                                                formik.setFieldValue(
                                                  `forms[${index}].noofQaStaff`,
                                                  value
                                                );
                                                formik.setFieldError(
                                                  `forms[${index}].noofQaStaff`,
                                                  ""
                                                );
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].noofQaStaff`,
                                                  "No. of QA/QC staff value content is too long. Please limit it to 8 digit."
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].noofQaStaff`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noofQaStaff`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noofQaStaff &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noofQaStaff
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.noofQaStaff &&
                                            formik.errors.forms?.[index]
                                              ?.noofQaStaff
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

                        {index > 0 && (
                          <Box
                            sx={{
                              padding: "0px",
                              margin: "12px 0 0 0",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <LightTooltip
                              title="Remove Store"
                              arrow
                              placement="left"
                            >
                              <Box
                                sx={{
                                  padding: "0px",
                                  textAlign: "center",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "50%",
                                  background: "#d7282f",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => handleRemove(index)}
                                className=""
                              >
                                {" "}
                                <RemoveIcon
                                  sx={{ fontSize: "20px", color: "#fff" }}
                                />
                              </Box>
                            </LightTooltip>
                          </Box>
                        )}
                      </form>
                    </EditModeBoxContainer>
                  )}
                  <Divider
                    variant="middle"
                    sx={{ marginTop: "20px !important" }}
                  />
                </CompanyFacilityData>
              )}
            </Box>
          ))}
      </form>
      <form>
        {formik?.values?.forms &&
          formik?.values?.forms.slice(0, visibleCount).map((form, index) => (
            <Box sx={{ padding: "0px" }} key={index}>
              {!editMode && (
                <>
                  {loader ? (
                    <SeparationSkeleton className="spacing">
                      <ProductLineSkeleton></ProductLineSkeleton>
                    </SeparationSkeleton>
                  ) : (
                    data?.length > 0 && (
                      <Separation className="spacing">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Production Line Name
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.productionLine}
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
                                          No. of Supervisor
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noofSuperviser}
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
                                        <Typography>No. Of Operator</Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noofoperators}
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
                                          No. Of QA/QC Staff
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noofQaStaff}
                                        </Typography>
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Separation>
                    )
                  )}
                </>
              )}
            </Box>
          ))}

        {!editMode && formik?.values?.forms?.length > 5 && (
          <ViewMorLess sx={{}}>
            {visibleCount < formik?.values?.forms?.length ? (
              <text onClick={handleViewMore}>View More</text>
            ) : (
              <text onClick={handleViewLess}>View Less</text>
            )}
          </ViewMorLess>
        )}
      </form>
      {editMode && (
        <PlushIconBox>
          <LightTooltip
            title="Add Another Store Details"
            arrow
            placement="left"
          >
            <PlushIcon onClick={addFormBlock}>
              <AddOutlinedIcon />
            </PlushIcon>
          </LightTooltip>
        </PlushIconBox>
      )}
    </CompanyFacilityInnContainerQAQCnRND>
  );
};

export default RetailerStore;

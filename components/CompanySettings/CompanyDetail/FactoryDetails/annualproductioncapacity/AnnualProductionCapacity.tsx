import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import {
  TextField,
  Grid,
  Divider,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
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
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  apiClient,
  currencyRange,
  volumeList,
} from "@/components/common/common";
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
  SelectPlaceholder,
  Separation,
  SeparationSkeleton,
  SuperScript,
  SwitchButtons,
  ToggleBox,
  TypographyTitle,
  ViewMorLess,
} from "../style";
import QaQcSkelton from "../wholesalar/wholesalarwarehouse/QaQcSkelton";
import AnnualProductionCapacitySkeleton from "../CompanyfacilitySkeleton/AnnualProductionCapacitySkeleton";

const initialFormValues = {
  productName: "",
  noUnitProductedValue: "",
  noUnitProductedValueList: "",
  noUnitProductedValueYear: "",
  noUnitProductedValueYearList: "",
};

const AnnualProductionCapacity = ({
  type,
  handlCallBackFunction,
  listData,
}): any => {
  let factoryData;
  let warehouseData;
  let storeData;
  let annualData;
  let productionProcessData;
  let productionLineData;
  let productionEquipemenData;

  const fetchedData = listData?.[type];
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
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState([]);
  const [buttonLoader, setButtonLoader] = useState(false);

  const getCompanyData = async () => {
    setLoader(true);
    try {
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
          Array.isArray(parsedData?.annual_production_capacity) &&
          parsedData.annual_production_capacity.length > 0
        ) {
          parsedData.annual_production_capacity.forEach((storeEntry) => {
            if (
              Array.isArray(storeEntry.annualData) &&
              storeEntry.annualData.length > 0
            ) {
              setData(storeEntry.annualData);
              setFormBlocks(storeEntry.annualData);
              setEnabled(storeEntry?.selected_value === "yes");
            }
          });
        }
      }
      setLoader(false);
    } catch (error) {}
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
          productName: Yup.string().required("Please enter product name"),
          noUnitProductedValue: Yup.string().required(
            "Please enter no. of unit produced value"
          ),
          noUnitProductedValueList: Yup.string().required(
            "Please select no. of unit produced unit"
          ),
          noUnitProductedValueYear: Yup.string().required(
            "Please enter no. of unit produced year value"
          ),
          noUnitProductedValueYearList: Yup.string().required(
            "Please select no. of unit produced year"
          ),
        })
      ),
    }),
    onSubmit: async (values) => {
      setButtonLoader(true);
      const value = values?.forms;
      const annualData = value.map(({ formBlocks, ...rest }) => rest);
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          annual_production_capacity: [
            {
              selected_value: enabled ? "yes" : "no",
              annualData,
            },
          ],
          store: storeData,
          warehouse: warehouseData,
          production_process: productionProcessData,
          production_line: productionLineData,
          production_equipment: productionEquipemenData,
          factory: factoryData,
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
        setButtonLoader(false);
      }
    },
  });

  const handleSaveClick = () => {
    const touchedArray = formik.values.forms.map(() => ({
      productName: true,
      noUnitProductedValue: true,
      noUnitProductedValueList: true,
      noUnitProductedValueYear: true,
      noUnitProductedValueYearList: true,
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
      const annualData = value.map(({ formBlocks, ...rest }) => rest);
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          annual_production_capacity: [
            {
              selected_value: newValue ? "yes" : "no",
              annualData,
            },
          ],
          store: storeData,
          warehouse: warehouseData,
          production_process: productionProcessData,
          production_line: productionLineData,
          production_equipment: productionEquipemenData,
          factory: factoryData,
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
    } catch (error) {
      console.error("API error:", error);
    }
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
          // paddingBottom: "16px",
        }}
      >
        <TypographyTitle className="toggleBoxstyle">
          Annual Production Capacity
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
              {buttonLoader ? (
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
                padding: editMode ? "16px 0 0 0 !important" : "0px",
                marginTop: index === 0 ? "" : "10px",
              }}
            >
              {editMode && (
                <CompanyFacilityData>
                  {editMode && (
                    <EditModeBoxContainer>
                      <form onSubmit={() => formik.onSubmit()}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>
                                      Product Name
                                      <AstricksMark>
                                        {" "}
                                        *{" "}
                                        <LightTooltip
                                          arrow
                                          disableInteractive
                                          placement="top"
                                          title="Enter the name of the main product your factory manufactures."
                                        >
                                          <HelpOutlineOutlinedIcon />
                                        </LightTooltip>
                                      </AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <TextField
                                      id="outlined-basic"
                                      variant="outlined"
                                      size="small"
                                      placeholder="Enter product name"
                                      fullWidth
                                      name={`forms[${index}].productName`}
                                      value={
                                        formik.values.forms[index]?.productName
                                      }
                                      onChange={(e) => {
                                        const inputValue =
                                          e.target.value.trimStart();

                                        if (inputValue.length <= 100) {
                                          formik.setFieldValue(
                                            `forms[${index}].productName`,
                                            inputValue
                                          );
                                          formik.setFieldError(
                                            `forms[${index}].productName`,
                                            ""
                                          );
                                        } else {
                                          formik.setFieldError(
                                            `forms[${index}].productName`,
                                            "Product name content is too long. Please limit it to 100 character."
                                          );
                                        }
                                        formik.setFieldTouched(
                                          `forms[${index}].productName`,
                                          true,
                                          false
                                        );
                                      }}
                                      onBlur={(e) => {
                                        formik.handleBlur(e);
                                        formik.setFieldError(
                                          `forms[${index}].productName`,
                                          ""
                                        );
                                      }}
                                      error={
                                        formik.touched.forms?.[index]
                                          ?.productName &&
                                        Boolean(
                                          formik.errors.forms?.[index]
                                            ?.productName
                                        )
                                      }
                                      helperText={
                                        formik.touched.forms?.[index]
                                          ?.productName &&
                                        formik.errors.forms?.[index]
                                          ?.productName
                                      }
                                    />
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                alignItems:
                                  (formik.touched.forms?.[index]
                                    ?.noUnitProductedValue &&
                                    formik.errors.forms?.[index]
                                      ?.noUnitProductedValue) ||
                                  (formik.touched.forms?.[index]
                                    ?.noUnitProductedValueList &&
                                    formik.errors.forms?.[index]
                                      ?.noUnitProductedValueList) ||
                                  (formik.touched.forms?.[index]
                                    ?.noUnitProductedValueYearList &&
                                    formik.errors.forms?.[index]
                                      ?.noUnitProductedValueYearList)
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
                                        (formik.touched.forms?.[index]
                                          ?.noUnitProductedValue &&
                                          formik.errors.forms?.[index]
                                            ?.noUnitProductedValue) ||
                                        (formik.touched.forms?.[index]
                                          ?.noUnitProductedValueList &&
                                          formik.errors.forms?.[index]
                                            ?.noUnitProductedValueList)
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          No. of Unit Produced
                                          <AstricksMark>
                                            {" "}
                                            *{" "}
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Specify the total number of units produced in the last year for the selected product."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter value"
                                          variant="outlined"
                                          size="small"
                                          name={`forms[${index}].noUnitProductedValue`}
                                          value={
                                            formik.values.forms[index]
                                              ?.noUnitProductedValue
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(
                                              /[a-zA-Z]/g,
                                              ""
                                            );
                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                            if (regex.test(value)) {
                                              if (value.length <= 3) {
                                                formik.setFieldValue(
                                                  `forms[${index}].noUnitProductedValue`,
                                                  value
                                                );
                                                formik.setFieldError(
                                                  `forms[${index}].noUnitProductedValue`,
                                                  ""
                                                );
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].noUnitProductedValue`,
                                                  "No. of unit produced value content is too long. Please limit it to 3 digit."
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].noUnitProductedValue`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noUnitProductedValue`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noUnitProductedValue &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noUnitProductedValue
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.noUnitProductedValue &&
                                            formik.errors.forms?.[index]
                                              ?.noUnitProductedValue
                                          }
                                          fullWidth
                                          inputProps={{
                                            pattern: "[0-9]*",
                                            inputMode: "numeric",
                                          }}
                                        />
                                      </DataRowValue>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                      <DataRowValue>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noUnitProductedValueList &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noUnitProductedValueList
                                            )
                                          }
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noUnitProductedValueList`,
                                              ""
                                            );
                                          }}
                                        >
                                          <Select
                                            labelId={`airport-select-label-${index}`}
                                            id={`demo-simple-select-${index}`}
                                            value={
                                              formik.values.forms[index]
                                                ?.noUnitProductedValueList || ""
                                            }
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `forms[${index}].noUnitProductedValueList`,
                                                e.target.value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].noUnitProductedValueList`,
                                                ""
                                              );
                                            }}
                                            displayEmpty
                                            renderValue={(selected) =>
                                              selected !== "" ? (
                                                selected
                                              ) : (
                                                <SelectPlaceholder>
                                                  Unit (1x)
                                                </SelectPlaceholder>
                                              )
                                            }
                                          >
                                            {currencyRange.length > 0 ? (
                                              currencyRange.map((item) => (
                                                <MenuItem
                                                  key={item}
                                                  value={item}
                                                >
                                                  {item}
                                                </MenuItem>
                                              ))
                                            ) : (
                                              <MenuItem disabled></MenuItem>
                                            )}
                                          </Select>

                                          {formik.touched.forms?.[index]
                                            ?.noUnitProductedValueList &&
                                            formik.errors.forms?.[index]
                                              ?.noUnitProductedValueList && (
                                              <FormHelperText>
                                                {
                                                  formik.errors.forms[index]
                                                    ?.noUnitProductedValueList
                                                }
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
                                      alignItems:
                                        (formik.touched.forms?.[index]
                                          ?.noUnitProductedValueYear &&
                                          formik.errors.forms?.[index]
                                            ?.noUnitProductedValueYear) ||
                                        (formik.touched.forms?.[index]
                                          ?.noUnitProductedValueYearList &&
                                          formik.errors.forms?.[index]
                                            ?.noUnitProductedValueYearList)
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          No. of Unit Produced (Last Year){" "}
                                          <AstricksMark>*</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter value"
                                          variant="outlined"
                                          size="small"
                                          name={`forms[${index}].noUnitProductedValueYear`}
                                          value={
                                            formik.values.forms[index]
                                              ?.noUnitProductedValueYear
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(
                                              /[a-zA-Z]/g,
                                              ""
                                            );
                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                            if (regex.test(value)) {
                                              if (value.length <= 3) {
                                                formik.setFieldValue(
                                                  `forms[${index}].noUnitProductedValueYear`,
                                                  value
                                                );
                                                formik.setFieldError(
                                                  `forms[${index}].noUnitProductedValueYear`,
                                                  ""
                                                );
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].noUnitProductedValueYear`,
                                                  "No. of unit produced year value content is too long. Please limit it to 3 digit."
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].noUnitProductedValueYear`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noUnitProductedValueYear`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noUnitProductedValueYear &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noUnitProductedValueYear
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.noUnitProductedValueYear &&
                                            formik.errors.forms?.[index]
                                              ?.noUnitProductedValueYear
                                          }
                                          fullWidth
                                          inputProps={{
                                            pattern: "[0-9]*",
                                            inputMode: "numeric",
                                          }}
                                        />
                                      </DataRowValue>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                      <DataRowValue>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noUnitProductedValueYearList &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noUnitProductedValueYearList
                                            )
                                          }
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noUnitProductedValueYearList`,
                                              ""
                                            );
                                          }}
                                        >
                                          <Select
                                            labelId={`airport-select-label-${index}`}
                                            id={`demo-simple-select-${index}`}
                                            value={
                                              formik.values.forms[index]
                                                ?.noUnitProductedValueYearList ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `forms[${index}].noUnitProductedValueYearList`,
                                                e.target.value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].noUnitProductedValueYearList`,
                                                ""
                                              );
                                            }}
                                            displayEmpty
                                            renderValue={(selected) =>
                                              selected !== "" ? (
                                                selected
                                              ) : (
                                                <SelectPlaceholder>
                                                  Unit (1x)
                                                </SelectPlaceholder>
                                              )
                                            }
                                          >
                                            {currencyRange.length > 0 ? (
                                              currencyRange.map((item) => (
                                                <MenuItem
                                                  key={item}
                                                  value={item}
                                                >
                                                  {item}
                                                </MenuItem>
                                              ))
                                            ) : (
                                              <MenuItem disabled></MenuItem>
                                            )}
                                          </Select>

                                          {formik.touched.forms?.[index]
                                            ?.noUnitProductedValueYearList &&
                                            formik.errors.forms?.[index]
                                              ?.noUnitProductedValueYearList && (
                                              <FormHelperText>
                                                {
                                                  formik.errors.forms[index]
                                                    ?.noUnitProductedValueYearList
                                                }
                                              </FormHelperText>
                                            )}
                                        </FormControl>
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
                      <AnnualProductionCapacitySkeleton></AnnualProductionCapacitySkeleton>
                    </SeparationSkeleton>
                  ) : (
                    data?.length > 0 && (
                      <Separation className="spacing">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>Product Name</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <Typography>{form?.productName}</Typography>
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
                                        <Typography>
                                          No. of Unit Produced
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noUnitProductedValue}{" "}
                                          {form?.noUnitProductedValueList}
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
                                          No. of Unit Produced (Last Year)
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noUnitProductedValueYear}{" "}
                                          {form?.noUnitProductedValueYearList}
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

export default AnnualProductionCapacity;

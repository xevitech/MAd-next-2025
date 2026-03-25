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

import { apiClient, volumeList } from "@/components/common/common";
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
  SwitchButtons,
  ToggleBox,
  TypographyTitle,
  ViewMorLess,
} from "../style";
import QaQcSkelton from "../wholesalar/wholesalarwarehouse/QaQcSkelton";
import ProductionEquipmentSkeleton from "../CompanyfacilitySkeleton/ProductionEquipmentSkeleton";
const initialFormValues = {
  equipmentName: "",
  equipmentVolume: "",
  noofproducts: "",
};

const ProductionEquipment = ({ type, handlCallBackFunction, list }): any => {
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
  const [buttonLoader, setButtonLoader] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState([]);
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
          Array.isArray(parsedData?.production_equipment) &&
          parsedData.production_equipment.length > 0
        ) {
          parsedData.production_equipment.forEach((storeEntry) => {
            if (
              Array.isArray(storeEntry.productionEquipment) &&
              storeEntry.productionEquipment.length > 0
            ) {
              setData(storeEntry.productionEquipment);
              setFormBlocks(storeEntry.productionEquipment);
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
          equipmentName: Yup.string().required("Please enter equipment name"),
          noofproducts: Yup.string().required("Please enter no. of products"),
          equipmentVolume: Yup.string().required(
            "Please select equipment volume"
          ),
        })
      ),
    }),
    onSubmit: async (values) => {
      setButtonLoader(true);
      const value = values?.forms;
      const productionEquipment = value.map(({ formBlocks, ...rest }) => rest);
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          production_equipment: [
            {
              selected_value: enabled ? "yes" : "no",
              productionEquipment,
            },
          ],
          factory: factoryData,
          warehouse: warehouseData,
          annual_production_capacity: annualData,
          production_process: productionProcessData,
          production_line: productionLineData,
          store: storeData,
        },
      };
      let response = await apiClient(
        "company_profile/company-Faclities",
        "POST",
        { body: combinedPayload }
      );
      if (response.status === 200 || response.status === 201) {
        setButtonLoader(false);
        setSelectedValue("no");
        setEditMode(false);
        getCompanyData();
        handlCallBackFunction();
      }
    },
  });

  const handleSaveClick = () => {
    const touchedArray = formik.values.forms.map(() => ({
      equipmentName: true,
      equipmentVolume: true,
      noofproducts: true,
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
  const [selectedCountry, setSelectedCountry] = useState("");
  const handleToggleChange = (event) => {
    const newValue = event.target.checked;
    setEnabled(newValue);

    if (!editMode) {
      const value = formik.values?.forms;
      const productionEquipment = value.map(({ formBlocks, ...rest }) => rest);
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          production_equipment: [
            {
              selected_value: newValue ? "yes" : "no",
              productionEquipment,
            },
          ],
          factory: factoryData,
          warehouse: warehouseData,
          annual_production_capacity: annualData,
          production_process: productionProcessData,
          production_line: productionLineData,
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
          Production Equipment
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
                    <EditModeBoxContainer className="">
                      <form onSubmit={() => formik.onSubmit()}>
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            padding:
                              index > 0 ? "19px 0 0 0 !important" : "0px",
                          }}
                        >
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={2}
                              sx={{
                                alignItems:
                                  (formik.touched.forms?.[index]
                                    ?.equipmentName &&
                                    formik.errors.forms?.[index]
                                      ?.equipmentName) ||
                                  (formik.touched.forms?.[index]
                                    ?.equipmentVolume &&
                                    formik.errors.forms?.[index]
                                      ?.equipmentVolume)
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
                                          ?.equipmentName &&
                                        formik.errors.forms?.[index]
                                          ?.equipmentName
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Equipment Name{" "}
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
                                          placeholder="Enter equipment name"
                                          fullWidth
                                          name={`forms[${index}].equipmentName`}
                                          value={
                                            formik.values.forms[index]
                                              ?.equipmentName || ""
                                          }
                                          onChange={(e) => {
                                            const inputValue =
                                              e.target.value.trimStart();
                                            formik.setFieldError(
                                              `forms[${index}].equipmentName`,
                                              ""
                                            );

                                            if (inputValue === "") {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentName`,
                                                ""
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].equipmentName`,
                                                ""
                                              );
                                              return;
                                            }

                                            if (inputValue.length <= 100) {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentName`,
                                                inputValue
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].equipmentName`,
                                                ""
                                              );
                                            } else {
                                              formik.setFieldError(
                                                `forms[${index}].equipmentName`,
                                                "Equipment name character limit exceeded. Maximum allowed is 100."
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].equipmentName`,
                                              true,
                                              false
                                            );
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].equipmentName`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.equipmentName &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.equipmentName
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.equipmentName &&
                                            formik.errors.forms?.[index]
                                              ?.equipmentName
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
                                          ?.equipmentVolume &&
                                        formik.errors.forms?.[index]
                                          ?.equipmentVolume
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Equipment Volume
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.equipmentVolume &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.equipmentVolume
                                            )
                                          }
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].equipmentVolume`,
                                              ""
                                            );
                                          }}
                                        >
                                          <Select
                                            labelId={`airport-select-label-${index}`}
                                            id={`demo-simple-select-${index}`}
                                            value={
                                              formik.values.forms[index]
                                                ?.equipmentVolume || ""
                                            }
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `forms[${index}].equipmentVolume`,
                                                e.target.value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].equipmentVolume`,
                                                ""
                                              );
                                            }}
                                            displayEmpty
                                            renderValue={(selected) =>
                                              selected !== "" ? (
                                                selected
                                              ) : (
                                                <SelectPlaceholder>
                                                  Select equipment volume
                                                </SelectPlaceholder>
                                              )
                                            }
                                          >
                                            {volumeList.length > 0
                                              ? volumeList.map((item) => (
                                                  <MenuItem
                                                    key={item}
                                                    value={item}
                                                  >
                                                    {item}
                                                  </MenuItem>
                                                ))
                                              : ""}
                                          </Select>

                                          {formik.touched.forms?.[index]
                                            ?.equipmentVolume &&
                                            formik.errors.forms?.[index]
                                              ?.equipmentVolume && (
                                              <FormHelperText>
                                                {
                                                  formik.errors.forms[index]
                                                    ?.equipmentVolume
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
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          No. Of Products
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter no. of products"
                                          variant="outlined"
                                          size="small"
                                          name={`forms[${index}].noofproducts`}
                                          value={
                                            formik.values.forms[index]
                                              ?.noofproducts
                                          }
                                          onChange={(e) => {
                                            let value =
                                              e.target.value.trimStart();

                                            const numericValue = value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );

                                            formik.setFieldError(
                                              `forms[${index}].noofproducts`,
                                              ""
                                            );

                                            if (numericValue.length > 4) {
                                              formik.setFieldError(
                                                `forms[${index}].noofproducts`,
                                                "No. of products limit exceeded. Maximum allowed is 4 digit."
                                              );
                                            } else {
                                              formik.setFieldValue(
                                                `forms[${index}].noofproducts`,
                                                numericValue
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].noofproducts`,
                                              true,
                                              false
                                            );
                                          }}
                                          onPaste={(e) => {
                                            const pastedData = e.clipboardData
                                              .getData("Text")
                                              .trim();

                                            if (!/^\d+$/.test(pastedData)) {
                                              e.preventDefault();
                                              formik.setFieldError(
                                                `forms[${index}].noofproducts`,
                                                "Only numeric values are allowed."
                                              );
                                            } else {
                                              const numericValue =
                                                pastedData.replace(
                                                  /[^0-9]/g,
                                                  ""
                                                );
                                              formik.setFieldError(
                                                `forms[${index}].noofproducts`,
                                                ""
                                              );

                                              if (numericValue.length > 4) {
                                                formik.setFieldError(
                                                  `forms[${index}].noofproducts`,
                                                  "No. of products limit exceeded. Maximum allowed is 4 digit."
                                                );
                                              } else {
                                                formik.setFieldValue(
                                                  `forms[${index}].noofproducts`,
                                                  numericValue
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].noofproducts`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].noofproducts`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.noofproducts &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.noofproducts
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.noofproducts &&
                                            formik.errors.forms?.[index]
                                              ?.noofproducts
                                          }
                                          fullWidth
                                          inputProps={{
                                            pattern: "[0-9]*",
                                          }}
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
                    <SeparationSkeleton className="spacing1">
                      <ProductionEquipmentSkeleton></ProductionEquipmentSkeleton>
                    </SeparationSkeleton>
                  ) : (
                    data?.length > 0 && (
                      <Separation className="spacing1">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>Equipment Name</Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.equipmentName}
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
                                          Equipment Volume
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.equipmentVolume}
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
                                        <Typography>No. of Products</Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noofproducts}
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

export default ProductionEquipment;

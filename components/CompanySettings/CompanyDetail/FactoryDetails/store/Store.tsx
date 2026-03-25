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
import { useDispatch, useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import { ThreeDots } from "react-loader-spinner";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import CountrySelect from "@/components/common/countrydropdown/Index";
import StateSelect from "@/components/common/countrydropdown/states";
import CitiesStates from "@/components/common/CityStateDropdown";
import {
  apiClient,
  currencyRange,
  getCountryNameByCode,
  unitRange,
} from "@/components/common/common";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import AddIcon from "@mui/icons-material/Add";
import {
  AddRemoveBTN,
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
import StoreSkeleton from "../CompanyfacilitySkeleton/StoreSkeleton";
import { Flag } from "@/components/common/countryFlag";
import CompanyFacilitiesDropdown from "@/components/common/countrydropdown/CompanyFacilitiesDropdown";
const initialFormValues = {
  storeName: "",
  country: "",
  postalCode: "",
  regions: "",
  city: "",
  longitude: "",
  // latitutde: "",
  annualStoreValue: "",
  annualStorUnit: "",
  streetAddress: "",
  nearSeaport: "",
  nearAirport: "",
  // additionalAddress: "",
};

const RetailerStore = ({ type, handlCallBackFunction, listData }): any => {
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
  const [buttonLoader, setButtonLoader] = useState(false);
  const [indexValue, setIndexValue] = useState("");
  const [seaPorts, setSeaPorts] = useState([]);
  const [airport, setAirPort] = useState([]);
  const [data, setData] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [isSeaportsAvailable, setIsSeaportsAvailable] = useState(false);
  const [isAirportsAvailable, setIsAirportsAvailable] = useState(false);
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
        if (Array.isArray(parsedData?.store) && parsedData.store.length > 0) {
          parsedData.store.forEach((storeEntry) => {
            if (
              Array.isArray(storeEntry.facility_data) &&
              storeEntry.facility_data.length > 0
            ) {
              setData(storeEntry.facility_data);
              setFormBlocks(storeEntry.facility_data);
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

  const FetchSeaPortList = async (country_code = "") => {
    try {
      let response = await apiClient(
        `ports/getPorts?type=sea_ports&country=${country_code}&per_page=500`,
        "get"
      );
      if (response.status === 200) {
        setSeaPorts(response.data);
        setIsSeaportsAvailable(response?.data?.length > 0);
      }
    } catch (error) {}
  };
  const FetchAirPortList = async (country_code = "") => {
    let response = await apiClient(
      `ports/getPorts?search&type=air_ports&country=${country_code}&per_page=500`,
      "get"
    );
    if (response.status === 200) {
      setAirPort(response.data);
      setIsAirportsAvailable(response?.data?.length > 0);
    }
  };

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
          storeName: Yup.string().required("Please enter store name"),
          regions: Yup.string().required("Please select region/state/province"),
          city: Yup.string().required("Please select city"),
          country: Yup.string().required("Please select country").nullable(),
          postalCode: Yup.string().required("Please enter postal code"),
          annualStoreValue: Yup.string().required("Please enter value"),
          streetAddress: Yup.string().required("Please enter address"),
          nearSeaport: isSeaportsAvailable
            ? Yup.string().required("Please select nearby seaport")
            : Yup.string().nullable(),
          nearAirport: isAirportsAvailable
            ? Yup.string().required("Please select nearby airport")
            : Yup.string().nullable(),
          annualStorUnit: Yup.string().required("Please select unit"),
        })
      ),
    }),
    onSubmit: async (values) => {
      setButtonLoader(true);
      const value = values?.forms;
      const facility_data = value.map(
        ({ formBlocks, additionalAddresses, ...rest }) => ({
          ...rest,
          additionalAddresses:
            additionalAddresses?.filter(
              (address) => address !== null && address.trim() !== ""
            ) || [],
        })
      );
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          store: [
            {
              selected_value: enabled ? "yes" : "no",
              facility_data,
            },
          ],
          factory: factoryData,
          warehouse: warehouseData,
          annual_production_capacity: annualData,
          production_process: productionProcessData,
          production_line: productionLineData,
          production_equipment: productionEquipemenData,
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
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    // const selectedCountry = formik.values.forms[indexValue]?.country;
    if (selectedCountry) {
      FetchSeaPortList(selectedCountry)
        .then((response: any) => {
          setSeaPorts(response.data);
        })
        .catch((error) => {});
    }
  }, [selectedCountry]);
  useEffect(() => {
    // const selectedCountry = formik.values.forms[indexValue]?.country;
    if (selectedCountry) {
      FetchAirPortList(selectedCountry)
        .then((response: any) => {
          setAirPort(response.data);
        })
        .catch((error) => {});
    }
  }, [selectedCountry]);

  const handleSaveClick = () => {
    const touchedArray = formik.values.forms.map(() => ({
      storeName: true,
      country: true,
      postalCode: true,
      annualStoreValue: true,
      annualStorUnit: true,
      streetAddress: true,
      nearSeaport: true,
      nearAirport: true,
      regions: true,
      city: true,
      // additionalAddress: true,
      // latitutde: true,
      longitude: true,
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
  // const [selectedCountry, setSelectedCountry] = useState("");
  // useEffect(() => {
  //   if (selectedCountry) {
  //     FetchSeaPortList();
  //     FetchAirPortList();
  //   }
  // }, []);
  const handleToggleChange = (event) => {
    const newValue = event.target.checked;
    setEnabled(newValue);

    if (!editMode) {
      const value = formik.values?.forms;
      const facility_data = value.map(
        ({ formBlocks, additionalAddresses, ...rest }) => ({
          ...rest,
          additionalAddresses:
            additionalAddresses?.filter(
              (address) => address !== null && address.trim() !== ""
            ) || [],
        })
      );
      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          store: [
            {
              selected_value: newValue ? "yes" : "no",
              facility_data,
            },
          ],
          factory: factoryData,
          warehouse: warehouseData,
          annual_production_capacity: annualData,
          production_process: productionProcessData,
          production_line: productionLineData,
          production_equipment: productionEquipemenData,
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
          Store
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
                padding: editMode ? "16px 0 0 0 !important" : 0,
                marginTop: index === 0 ? "" : "10px",
              }}
            >
              {editMode && (
                <CompanyFacilityData>
                  {editMode && (
                    <EditModeBoxContainer className="sharat">
                      <form onSubmit={() => formik.onSubmit()}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DataRowHere className="editview">
                              <Grid container spacing={1} alignItems={"center"}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>
                                      Store Name
                                      <AstricksMark> *</AstricksMark>
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <TextField
                                      id="outlined-basic"
                                      variant="outlined"
                                      size="small"
                                      placeholder="Enter store name"
                                      fullWidth
                                      name={`forms[${index}].storeName`}
                                      value={
                                        formik.values.forms[index]?.storeName
                                      }
                                      onChange={(e) => {
                                        const inputValue =
                                          e.target.value.trimStart();

                                        if (inputValue.length <= 100) {
                                          formik.setFieldValue(
                                            `forms[${index}].storeName`,
                                            inputValue
                                          );
                                          formik.setFieldError(
                                            `forms[${index}].storeName`,
                                            ""
                                          );
                                        } else {
                                          formik.setFieldError(
                                            `forms[${index}].storeName`,
                                            "Store name content is too long. Please limit it to 100 character."
                                          );
                                        }
                                        formik.setFieldTouched(
                                          `forms[${index}].storeName`,
                                          true,
                                          false
                                        );
                                      }}
                                      onBlur={(e) => {
                                        formik.handleBlur(e);
                                        formik.setFieldError(
                                          `forms[${index}].storeName`,
                                          ""
                                        );
                                      }}
                                      error={
                                        formik.touched.forms?.[index]
                                          ?.storeName &&
                                        Boolean(
                                          formik.errors.forms?.[index]
                                            ?.storeName
                                        )
                                      }
                                      helperText={
                                        formik.touched.forms?.[index]
                                          ?.storeName &&
                                        formik.errors.forms?.[index]?.storeName
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
                                  (formik.touched.forms?.[index]?.country &&
                                    formik.errors.forms?.[index]?.country) ||
                                  (formik.touched.forms?.[index]?.postalCode &&
                                    formik.errors.forms?.[index]?.postalCode)
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
                                          ?.country &&
                                        formik.errors.forms?.[index]?.country
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Country
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <FormControl fullWidth size="small">
                                          <CompanyFacilitiesDropdown
                                            country={
                                              formik.values.forms[index]
                                                ?.country
                                            }
                                            setCountry={(value) => {
                                              formik.setFieldValue(
                                                `forms[${index}].country`,
                                                value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].country`,
                                                ""
                                              );
                                              formik.setFieldTouched(
                                                `forms[${index}].country`,
                                                false
                                              );
                                              formik.setFieldValue(
                                                `forms[${index}].nearAirport`,
                                                ""
                                              );
                                              formik.setFieldValue(
                                                `forms[${index}].nearSeaport`,
                                                ""
                                              );

                                              formik.setFieldValue(
                                                `forms[${index}].regions`,
                                                ""
                                              );

                                              formik.setFieldValue(
                                                `forms[${index}].city`,
                                                ""
                                              );

                                              setIndexValue(index);
                                            }}
                                            setSelectedCountry={
                                              setSelectedCountry
                                            }
                                            disableClearable={
                                              !formik.values.forms?.[index]
                                                ?.country
                                            }
                                            error={
                                              formik.touched.forms?.[index]
                                                ?.country &&
                                              Boolean(
                                                formik.errors.forms?.[index]
                                                  ?.country
                                              )
                                            }
                                            errorText={
                                              formik.touched.forms?.[index]
                                                ?.country &&
                                              formik.errors.forms?.[index]
                                                ?.country
                                            }
                                            onBlurOverride={() => {
                                              formik.setFieldError(
                                                `forms[${index}].country`,
                                                ""
                                              );
                                            }}
                                            autoComplete="off"
                                          />
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
                                        formik.touched.forms?.[index]
                                          ?.postalCode &&
                                        formik.errors.forms?.[index]?.postalCode
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Postal Code{" "}
                                          <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter postal code"
                                          variant="outlined"
                                          size="small"
                                          fullWidth
                                          name={`forms[${index}].postalCode`}
                                          value={
                                            formik.values.forms[index]
                                              ?.postalCode
                                          }
                                          onChange={(e) => {
                                            const value = e.target.value
                                              .trimStart()
                                              .toUpperCase();

                                            if (
                                              /^[A-Z0-9]*$/.test(value) &&
                                              value.length <= 10
                                            ) {
                                              formik.setFieldValue(
                                                `forms[${index}].postalCode`,
                                                value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].postalCode`,
                                                ""
                                              );
                                            } else if (value.length > 10) {
                                              formik.setFieldError(
                                                `forms[${index}].postalCode`,
                                                "Postal code content is too long. Please limit it to 10 characters."
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].postalCode`,
                                              true,
                                              false
                                            );
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].postalCode`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.postalCode &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.postalCode
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.postalCode &&
                                            formik.errors.forms?.[index]
                                              ?.postalCode
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
                                  (formik.touched.forms?.[index]?.regions &&
                                    formik.errors.forms?.[index]?.regions) ||
                                  (formik.touched.forms?.[index]?.city &&
                                    formik.errors.forms?.[index]?.city)
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
                                          ?.regions &&
                                        formik.errors.forms?.[index]?.regions
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Region / State / Province
                                          <AstricksMark>
                                            {" "}
                                            *
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Select the region, state, or province where your store is located from the dropdown list."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <FormControl fullWidth size="small">
                                          <StateSelect
                                            country={
                                              formik.values.forms[index]
                                                ?.country
                                            }
                                            value={
                                              formik.values.forms[index]
                                                ?.regions
                                            }
                                            setStateData={(value) => {
                                              formik.setFieldValue(
                                                `forms[${index}].regions`,
                                                value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].regions`,
                                                ""
                                              );
                                            }}
                                            disableClearable={
                                              formik.values.form?.[index]
                                                ?.regions
                                                ? false
                                                : true
                                            }
                                            error={
                                              formik.touched.forms?.[index]
                                                ?.regions &&
                                              Boolean(
                                                formik.errors.forms?.[index]
                                                  ?.regions
                                              )
                                            }
                                            errorText={
                                              formik.touched.forms?.[index]
                                                ?.regions &&
                                              formik.errors.forms?.[index]
                                                ?.regions
                                            }
                                            onBlurOverride={() => {
                                              formik.setFieldError(
                                                `forms[${index}].regions`,
                                                ""
                                              );
                                            }}
                                            autoComplete="off"
                                          />
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
                                        formik.touched.forms?.[index]?.city &&
                                        formik.errors.forms?.[index]?.city
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          City <AstricksMark> *</AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <FormControl fullWidth size="small">
                                          <CitiesStates
                                            country={
                                              formik.values.forms[index]
                                                ?.country
                                            }
                                            city={
                                              formik.values.forms[index]?.city
                                            }
                                            state={
                                              formik.values.forms[index]
                                                ?.regions
                                            }
                                            setCity={(value) => {
                                              formik.setFieldValue(
                                                `forms[${index}].city`,
                                                value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].city`,
                                                ""
                                              );
                                            }}
                                            disableClearable={
                                              formik.values.forms?.[index]?.city
                                                ? false
                                                : true
                                            }
                                            errors={
                                              formik.touched.forms?.[index]
                                                ?.city &&
                                              Boolean(
                                                formik.errors.forms?.[index]
                                                  ?.city
                                              )
                                            }
                                            errorText={
                                              formik.touched.forms?.[index]
                                                ?.city &&
                                              formik.errors.forms?.[index]?.city
                                            }
                                            onBlurOverride={() => {
                                              formik.setFieldError(
                                                `forms[${index}].city`,
                                                ""
                                              );
                                            }}
                                            setLocation={(value) => {}}
                                          />
                                        </FormControl>
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
                                    ?.annualStoreValue &&
                                    formik.errors.forms?.[index]
                                      ?.annualStoreValue) ||
                                  (formik.touched.forms?.[index]
                                    ?.annualStorUnit &&
                                    formik.errors.forms?.[index]
                                      ?.annualStorUnit)
                                    ? "baseline"
                                    : "center",
                              }}
                            >
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems={"center"}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Geolocation Coordinates
                                          <AstricksMark>
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Enter the latitude and longitude coordinates of your store for accurate mapping."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Latitude"
                                          fullWidth
                                          name={`forms[${index}].latitude`}
                                          value={
                                            formik.values.forms[index]?.latitude
                                          }
                                          onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const validNumber =
                                              /^[+-]?\d*\.?\d*$/;
                                            const sanitizedValue =
                                              inputValue.replace(
                                                /[^0-9.+-]/g,
                                                ""
                                              );
                                            if (
                                              validNumber.test(
                                                sanitizedValue
                                              ) ||
                                              sanitizedValue === ""
                                            ) {
                                              formik.setFieldValue(
                                                `forms[${index}].latitude`,
                                                sanitizedValue
                                              );
                                            }
                                          }}
                                          onBlur={formik.handleBlur}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.latitude &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.latitude
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.latitude &&
                                            formik.errors.forms?.[index]
                                              ?.latitude
                                          }
                                        />
                                      </DataRowValue>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          variant="outlined"
                                          size="small"
                                          placeholder="Longitude"
                                          fullWidth
                                          name={`forms[${index}].longitude`}
                                          value={
                                            formik.values.forms[index]
                                              ?.longitude
                                          }
                                          onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const validNumber =
                                              /^[+-]?\d*\.?\d*$/;
                                            const sanitizedValue =
                                              inputValue.replace(
                                                /[^0-9.+-]/g,
                                                ""
                                              );
                                            if (
                                              validNumber.test(
                                                sanitizedValue
                                              ) ||
                                              sanitizedValue === ""
                                            ) {
                                              formik.setFieldValue(
                                                `forms[${index}].longitude`,
                                                sanitizedValue
                                              );
                                            }
                                          }}
                                          onBlur={formik.handleBlur}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.longitude &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.longitude
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.longitude &&
                                            formik.errors.forms?.[index]
                                              ?.longitude
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
                                        (formik.touched.forms?.[index]
                                          ?.annualStoreValue &&
                                          formik.errors.forms?.[index]
                                            ?.annualStoreValue) ||
                                        (formik.touched.forms?.[index]
                                          ?.annualStorUnit &&
                                          formik.errors.forms?.[index]
                                            ?.annualStorUnit)
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Annual Stored Unit
                                          <AstricksMark>
                                            {" "}
                                            *
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Specify the total number of units stored in your store over the last year."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                      <DataRowValue>
                                        <TextField
                                          id="outlined-basic"
                                          placeholder="Enter value"
                                          variant="outlined"
                                          size="small"
                                          name={`forms[${index}].annualStoreValue`}
                                          value={
                                            formik.values.forms[index]
                                              ?.annualStoreValue
                                          }
                                          onChange={(e) => {
                                            let value = e.target.value;
                                            value = value.replace(
                                              /[a-zA-Z]/g,
                                              ""
                                            );
                                            const regex = /^[0-9]*\.?[0-9]*$/;
                                            if (regex.test(value)) {
                                              if (value.length <= 10) {
                                                formik.setFieldValue(
                                                  `forms[${index}].annualStoreValue`,
                                                  value
                                                );
                                                formik.setFieldError(
                                                  `forms[${index}].annualStoreValue`,
                                                  ""
                                                );
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].annualStoreValue`,
                                                  "Annual value content is too long. Please limit it to 10 digits."
                                                );
                                              }
                                              formik.setFieldTouched(
                                                `forms[${index}].annualStoreValue`,
                                                true,
                                                false
                                              );
                                            }
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].annualStoreValue`,
                                              ""
                                            );
                                          }}
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.annualStoreValue &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.annualStoreValue
                                            )
                                          }
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.annualStoreValue &&
                                            formik.errors.forms?.[index]
                                              ?.annualStoreValue
                                          }
                                          fullWidth
                                          inputProps={{
                                            pattern: "[0-9]*",
                                            inputMode: "numeric",
                                          }}
                                        />
                                      </DataRowValue>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4}>
                                      <DataRowValue>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            formik.touched.forms?.[index]
                                              ?.annualStorUnit &&
                                            Boolean(
                                              formik.errors.forms?.[index]
                                                ?.annualStorUnit
                                            )
                                          }
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].annualStorUnit`,
                                              ""
                                            );
                                          }}
                                        >
                                          <Select
                                            labelId={`airport-select-label-${index}`}
                                            id={`demo-simple-select-${index}`}
                                            value={
                                              formik.values.forms[index]
                                                ?.annualStorUnit || ""
                                            }
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `forms[${index}].annualStorUnit`,
                                                e.target.value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].annualStorUnit`,
                                                ""
                                              );
                                            }}
                                            displayEmpty
                                            renderValue={(selected) =>
                                              selected !== "" ? (
                                                selected
                                              ) : (
                                                <SelectPlaceholder>
                                                  Select unit
                                                </SelectPlaceholder>
                                              )
                                            }
                                            MenuProps={{
                                              PaperProps: {
                                                sx: {
                                                  maxHeight: 200,
                                                  "&::-webkit-scrollbar": {
                                                    width: "6px",
                                                  },
                                                  "&::-webkit-scrollbar-track":
                                                    {
                                                      backgroundColor:
                                                        "#f1f1f1",
                                                    },
                                                  "&::-webkit-scrollbar-thumb":
                                                    {
                                                      backgroundColor:
                                                        "#acabab",
                                                    },
                                                  "&::-webkit-scrollbar-thumb:hover":
                                                    {
                                                      backgroundColor:
                                                        "#6d6d6d",
                                                    },
                                                },
                                              },
                                            }}
                                          >
                                            {unitRange.length > 0 ? (
                                              unitRange.map((item) => (
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
                                            ?.annualStorUnit &&
                                            formik.errors.forms?.[index]
                                              ?.annualStorUnit && (
                                              <FormHelperText>
                                                {
                                                  formik.errors.forms[index]
                                                    ?.annualStorUnit
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
                            <Grid container spacing={2} alignItems={"center"}>
                              <Grid item xs={12} sm={12} md={12}>
                                <DataRowHere className="editview">
                                  <Grid
                                    container
                                    spacing={1}
                                    alignItems="center"
                                  >
                                    <Grid item xs={12} sm={12} md={2}>
                                      <DataRowTitle>
                                        <Typography>
                                          Street Address
                                          <AstricksMark>
                                            {" "}
                                            *
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Enter the complete street address of your store, including building number and street name."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowValue>
                                        <TextField
                                          variant="outlined"
                                          size="small"
                                          placeholder="Enter address"
                                          fullWidth
                                          name={`forms[${index}].streetAddress`}
                                          value={
                                            formik.values.forms[index]
                                              ?.streetAddress || ""
                                          }
                                          onChange={(e) => {
                                            const inputValue =
                                              e.target.value.trimStart();
                                            if (inputValue.length <= 100) {
                                              formik.setFieldValue(
                                                `forms[${index}].streetAddress`,
                                                inputValue
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].streetAddress`,
                                                ""
                                              );
                                            } else {
                                              formik.setFieldError(
                                                `forms[${index}].streetAddress`,
                                                "Street/address content is too long. Please limit it to 100 characters."
                                              );
                                            }
                                            formik.setFieldTouched(
                                              `forms[${index}].streetAddress`,
                                              true,
                                              false
                                            );
                                          }}
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].streetAddress`,
                                              ""
                                            );
                                          }}
                                          error={Boolean(
                                            formik.touched.forms?.[index]
                                              ?.streetAddress &&
                                              formik.errors.forms?.[index]
                                                ?.streetAddress
                                          )}
                                          helperText={
                                            formik.touched.forms?.[index]
                                              ?.streetAddress &&
                                            formik.errors.forms?.[index]
                                              ?.streetAddress
                                          }
                                        />
                                      </DataRowValue>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                      <AddRemoveBTN
                                        color="primary"
                                        disabled={
                                          formik.values.forms[index]
                                            ?.additionalAddresses?.length > 0
                                        }
                                        onClick={() => {
                                          const updatedAddresses =
                                            formik.values.forms[index]
                                              ?.additionalAddresses || [];
                                          formik.setFieldValue(
                                            `forms[${index}].additionalAddresses`,
                                            [...updatedAddresses, ""]
                                          );
                                        }}
                                        startIcon={<AddIcon />}
                                      >
                                        Add Additional Address
                                      </AddRemoveBTN>
                                    </Grid>

                                    {formik.values.forms[
                                      index
                                    ]?.additionalAddresses?.map(
                                      (address, idx) => (
                                        <Grid
                                          container
                                          key={idx}
                                          spacing={1}
                                          alignItems="center"
                                          mt={1}
                                          ml={0.001}
                                        >
                                          <Grid item xs={12} sm={12} md={2}>
                                            <DataRowTitle>
                                              <Typography>{`Additional Address ${
                                                idx + 1
                                              }`}</Typography>
                                            </DataRowTitle>
                                          </Grid>

                                          <Grid item xs={12} sm={12} md={4}>
                                            <TextField
                                              variant="outlined"
                                              size="small"
                                              placeholder={`Enter additional address ${
                                                idx + 1
                                              }`}
                                              fullWidth
                                              name={`forms[${index}].additionalAddresses[${idx}]`}
                                              value={
                                                formik.values.forms[index]
                                                  ?.additionalAddresses[idx] ||
                                                ""
                                              }
                                              onChange={(e) => {
                                                const newValue =
                                                  e.target.value.trimStart();
                                                if (newValue.length <= 100) {
                                                  const updatedAddresses = [
                                                    ...formik.values.forms[
                                                      index
                                                    ].additionalAddresses,
                                                  ];
                                                  updatedAddresses[idx] =
                                                    newValue;
                                                  formik.setFieldValue(
                                                    `forms[${index}].additionalAddresses`,
                                                    updatedAddresses
                                                  );
                                                  formik.setFieldError(
                                                    `forms[${index}].additionalAddresses[${idx}]`,
                                                    ""
                                                  );
                                                } else {
                                                  formik.setFieldError(
                                                    `forms[${index}].additionalAddresses[${idx}]`,
                                                    "Additional address content is too long. Please limit it to 100 characters."
                                                  );
                                                }
                                                formik.setFieldTouched(
                                                  `forms[${index}].additionalAddresses[${idx}]`,
                                                  true,
                                                  false
                                                );
                                              }}
                                              onBlur={(e) => {
                                                formik.handleBlur(e);
                                                formik.setFieldError(
                                                  `forms[${index}].additionalAddresses`,
                                                  ""
                                                );
                                              }}
                                              error={Boolean(
                                                formik.touched.forms?.[index]
                                                  ?.additionalAddresses?.[
                                                  idx
                                                ] &&
                                                  formik.errors.forms?.[index]
                                                    ?.additionalAddresses?.[idx]
                                              )}
                                              helperText={
                                                formik.touched.forms?.[index]
                                                  ?.additionalAddresses?.[
                                                  idx
                                                ] &&
                                                formik.errors.forms?.[index]
                                                  ?.additionalAddresses?.[idx]
                                              }
                                            />
                                          </Grid>

                                          <Grid item xs={12} sm={12} md={3}>
                                            <AddRemoveBTN
                                              startIcon={<RemoveIcon />}
                                              onClick={() => {
                                                const updatedAddresses =
                                                  formik.values.forms[
                                                    index
                                                  ].additionalAddresses.filter(
                                                    (_, i) => i !== idx
                                                  );
                                                formik.setFieldValue(
                                                  `forms[${index}].additionalAddresses`,
                                                  updatedAddresses
                                                );
                                              }}
                                            >
                                              Remove Additional Address
                                            </AddRemoveBTN>
                                          </Grid>

                                          {idx ===
                                            formik.values.forms[index]
                                              .additionalAddresses.length -
                                              1 &&
                                            formik.values.forms[index]
                                              .additionalAddresses.length <
                                              3 && (
                                              <Grid item xs={12} sm={12} md={3}>
                                                <AddRemoveBTN
                                                  color="primary"
                                                  onClick={() => {
                                                    const updatedAddresses = [
                                                      ...formik.values.forms[
                                                        index
                                                      ].additionalAddresses,
                                                      "",
                                                    ];
                                                    formik.setFieldValue(
                                                      `forms[${index}].additionalAddresses`,
                                                      updatedAddresses
                                                    );
                                                  }}
                                                  startIcon={<AddIcon />}
                                                >
                                                  Add Additional Address
                                                </AddRemoveBTN>
                                              </Grid>
                                            )}
                                        </Grid>
                                      )
                                    )}
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
                                  (formik.touched.forms?.[index]?.nearAirport &&
                                    formik.errors.forms?.[index]
                                      ?.nearAirport) ||
                                  (formik.touched.forms?.[index]?.nearSeaport &&
                                    formik.errors.forms?.[index]?.nearSeaport)
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
                                          ?.nearSeaport &&
                                        formik.errors.forms?.[index]
                                          ?.nearSeaport
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Nearby Seaport
                                          <AstricksMark>
                                            {" "}
                                            <span
                                              className={
                                                seaPorts && seaPorts.length > 0
                                                  ? "madatory"
                                                  : "notmadatory"
                                              }
                                            >
                                              *
                                            </span>
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Select the nearest seaport to your store from the dropdown list for shipping purposes."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            isSeaportsAvailable
                                              ? formik.touched.forms?.[index]
                                                  ?.nearSeaport &&
                                                Boolean(
                                                  formik.errors.forms?.[index]
                                                    ?.nearSeaport
                                                )
                                              : null
                                          }
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].nearSeaport`,
                                              ""
                                            );
                                          }}
                                        >
                                          <Select
                                            labelId={`seaport-select-label-${index}`}
                                            id={`demo-simple-select-seaport-${index}`}
                                            value={
                                              formik.values.forms[index]
                                                ?.nearSeaport || ""
                                            }
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `forms[${index}].nearSeaport`,
                                                e.target.value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].nearSeaport`,
                                                ""
                                              );
                                            }}
                                            displayEmpty
                                            renderValue={(selected) =>
                                              selected !== "" ? (
                                                selected
                                              ) : (
                                                <SelectPlaceholder>
                                                  Select nearby seaport
                                                </SelectPlaceholder>
                                              )
                                            }
                                            MenuProps={{
                                              PaperProps: {
                                                sx: {
                                                  maxHeight: 140,
                                                  "&::-webkit-scrollbar": {
                                                    width: "6px",
                                                  },
                                                  "&::-webkit-scrollbar-track":
                                                    {
                                                      backgroundColor:
                                                        "#f1f1f1",
                                                    },
                                                  "&::-webkit-scrollbar-thumb":
                                                    {
                                                      backgroundColor:
                                                        "#acabab",
                                                    },
                                                  "&::-webkit-scrollbar-thumb:hover":
                                                    {
                                                      backgroundColor:
                                                        "#6d6d6d",
                                                    },
                                                },
                                              },
                                            }}
                                          >
                                            {selectedCountry &&
                                            isSeaportsAvailable ? (
                                              seaPorts.map((port) => (
                                                <MenuItem
                                                  key={port.id}
                                                  value={port.name}
                                                >
                                                  {port.name}
                                                </MenuItem>
                                              ))
                                            ) : (
                                              <MenuItem disabled>
                                                No Seaports Available
                                              </MenuItem>
                                            )}
                                          </Select>

                                          {isSeaportsAvailable &&
                                            formik.touched.forms?.[index]
                                              ?.nearSeaport &&
                                            formik.errors.forms?.[index]
                                              ?.nearSeaport && (
                                              <FormHelperText>
                                                {
                                                  formik.errors.forms[index]
                                                    ?.nearSeaport
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
                                        formik.touched.forms?.[index]
                                          ?.nearAirport &&
                                        formik.errors.forms?.[index]
                                          ?.nearAirport
                                          ? "baseline"
                                          : "center",
                                    }}
                                  >
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Nearby Airport
                                          <AstricksMark>
                                            {" "}
                                            <span
                                              className={
                                                seaPorts && seaPorts.length > 0
                                                  ? "madatory"
                                                  : "notmadatory"
                                              }
                                            >
                                              *
                                            </span>
                                            <LightTooltip
                                              arrow
                                              disableInteractive
                                              placement="top"
                                              title="Select the nearest airport to your store from the dropdown list for logistics and transportation."
                                            >
                                              <HelpOutlineOutlinedIcon />
                                            </LightTooltip>
                                          </AstricksMark>
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <FormControl
                                          fullWidth
                                          size="small"
                                          error={
                                            isAirportsAvailable
                                              ? formik.touched.forms?.[index]
                                                  ?.nearAirport &&
                                                Boolean(
                                                  formik.errors.forms?.[index]
                                                    ?.nearAirport
                                                )
                                              : null
                                          }
                                          onBlur={(e) => {
                                            formik.handleBlur(e);
                                            formik.setFieldError(
                                              `forms[${index}].nearAirport`,
                                              ""
                                            );
                                          }}
                                        >
                                          <Select
                                            labelId={`airport-select-label-${index}`}
                                            id={`demo-simple-select-${index}`}
                                            value={
                                              formik.values.forms[index]
                                                ?.nearAirport || ""
                                            }
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `forms[${index}].nearAirport`,
                                                e.target.value
                                              );
                                              formik.setFieldError(
                                                `forms[${index}].nearAirport`,
                                                ""
                                              );
                                            }}
                                            displayEmpty
                                            renderValue={(selected) =>
                                              selected !== "" ? (
                                                selected
                                              ) : (
                                                <SelectPlaceholder>
                                                  Select nearby airport
                                                </SelectPlaceholder>
                                              )
                                            }
                                            MenuProps={{
                                              PaperProps: {
                                                sx: {
                                                  maxHeight: 140,
                                                  "&::-webkit-scrollbar": {
                                                    width: "6px",
                                                  },
                                                  "&::-webkit-scrollbar-track":
                                                    {
                                                      backgroundColor:
                                                        "#f1f1f1",
                                                    },
                                                  "&::-webkit-scrollbar-thumb":
                                                    {
                                                      backgroundColor:
                                                        "#acabab",
                                                    },
                                                  "&::-webkit-scrollbar-thumb:hover":
                                                    {
                                                      backgroundColor:
                                                        "#6d6d6d",
                                                    },
                                                },
                                              },
                                            }}
                                          >
                                            {selectedCountry &&
                                            isAirportsAvailable ? (
                                              airport.map((port) => (
                                                <MenuItem
                                                  key={port.id}
                                                  value={port.name}
                                                >
                                                  {port.name}
                                                </MenuItem>
                                              ))
                                            ) : (
                                              <MenuItem disabled>
                                                No Airports Available
                                              </MenuItem>
                                            )}
                                          </Select>

                                          {isAirportsAvailable &&
                                            formik.touched.forms?.[index]
                                              ?.nearAirport &&
                                            formik.errors.forms?.[index]
                                              ?.nearAirport && (
                                              <FormHelperText>
                                                {
                                                  formik.errors.forms[index]
                                                    ?.nearAirport
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
                    <SeparationSkeleton className="spacing1">
                      <StoreSkeleton></StoreSkeleton>
                    </SeparationSkeleton>
                  ) : (
                    data?.length > 0 && (
                      <Separation className="spacing">
                        <Box sx={{ padding: "0px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <DataRowHere>
                                <Grid container spacing={1}>
                                  <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <DataRowTitle>
                                      <Typography>Store Name</Typography>
                                    </DataRowTitle>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={10} lg={10}>
                                    <DataRowValue>
                                      <Typography>{form?.storeName}</Typography>
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
                                          <Typography>Country</Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form.country ? (
                                              <Flag
                                                countryCode={form.country}
                                              />
                                            ) : (
                                              "N/A"
                                            )}{" "}
                                            {getCountryNameByCode(form.country)}
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
                                          <Typography>Postal Code</Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.postalCode}
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
                                            Region / State / Province
                                          </Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.regions}
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
                                          <Typography>City</Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>{form?.city}</Typography>
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
                                            Geolocation Coordinates
                                          </Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={4} md={4}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.latitude && form?.longitude
                                              ? `${form.latitude}, ${form.longitude}`
                                              : form?.latitude
                                              ? form.latitude
                                              : form?.longitude
                                              ? form.longitude
                                              : "N/A"}
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
                                            Annual Stored Unit
                                          </Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.annualStoreValue}{" "}
                                            {form?.annualStorUnit}
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
                                <Grid item xs={12}>
                                  <DataRowHere>
                                    <Grid container spacing={1}>
                                      <Grid item xs={12} sm={12} md={2}>
                                        <DataRowTitle>
                                          <Typography>
                                            Street Address
                                          </Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.streetAddress}
                                          </Typography>
                                        </DataRowValue>
                                      </Grid>
                                    </Grid>
                                  </DataRowHere>
                                </Grid>
                              </Grid>
                            </Grid>
                            {form?.additionalAddresses &&
                            form.additionalAddresses.length > 0 &&
                            form.additionalAddresses.some((address) =>
                              address?.trim()
                            ) ? (
                              <Grid item xs={12}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <DataRowHere>
                                      <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={2}>
                                          <DataRowTitle>
                                            <Typography>
                                              Additional Address
                                            </Typography>
                                          </DataRowTitle>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                          <DataRowValue>
                                            <Typography
                                              sx={{ width: "100%", gap: "4px" }}
                                            >
                                              {form.additionalAddresses &&
                                              form.additionalAddresses.length >
                                                0
                                                ? form.additionalAddresses.map(
                                                    (address, idx) => (
                                                      <Typography
                                                        sx={{
                                                          "@media screen and (max-width:900px)":
                                                            {
                                                              borderBottom:
                                                                idx !==
                                                                form
                                                                  .additionalAddresses
                                                                  .length -
                                                                  1
                                                                  ? "1px solid rgba(0, 0, 0, 0.12)"
                                                                  : "none",
                                                              padding:
                                                                idx !==
                                                                form
                                                                  .additionalAddresses
                                                                  .length -
                                                                  1
                                                                  ? "6px 0px"
                                                                  : "none",
                                                            },
                                                        }}
                                                      >
                                                        {address ? address : ""}
                                                      </Typography>
                                                    )
                                                  )
                                                : "N/A"}
                                            </Typography>
                                          </DataRowValue>
                                        </Grid>
                                      </Grid>
                                    </DataRowHere>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ) : null}
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6}>
                                  <DataRowHere>
                                    <Grid container spacing={1}>
                                      <Grid item xs={12} sm={12} md={4}>
                                        <DataRowTitle>
                                          <Typography>
                                            Nearby Seaport
                                          </Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.nearSeaport
                                              ? form?.nearSeaport
                                              : "N/A"}
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
                                            Nearby Airport
                                          </Typography>
                                        </DataRowTitle>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={8}>
                                        <DataRowValue>
                                          <Typography>
                                            {form?.nearAirport
                                              ? form?.nearAirport
                                              : "N/A"}
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

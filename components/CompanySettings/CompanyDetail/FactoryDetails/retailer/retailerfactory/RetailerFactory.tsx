import React, { useContext, useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
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
import {
  AdditionAddress,
  AddRemoveBTN,
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
  PlushIcon,
  PlushIconBox,
  SaveTextWithIcon,
  SelectedEditImg,
  SelectedEditSection,
  SelectPlaceholder,
  Separation,
  SeparationSkeleton,
  SwitchButtons,
  ToggleBox,
  TypographyTitle,
  UpImageName,
  UploadImageCol,
  UploadImagesRow,
  ViewMorLess,
} from "../../style";
import CountrySelect from "@/components/common/countrydropdown/Index";
import StateSelect from "@/components/common/countrydropdown/states";
import CitiesStates from "@/components/common/CityStateDropdown";
import {
  apiClient,
  currencyRange,
  factorySizeOptions,
  formatFileName,
  getCountryNameByCode,
  imageFormat,
  unitRange,
  VisuallyHiddenInput,
} from "@/components/common/common";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import {
  productionCapacity,
  transactionAmount,
  years,
} from "@/utils/AddProductPageSelectDropdownsData";
import HelperText from "../../../Common/helperText";
import { MyAppContext } from "@/contextApi/appContext";
import AddIcon from "@mui/icons-material/Add";
import QaQcSkelton from "../../wholesalar/wholesalarwarehouse/QaQcSkelton";
import FactorySkeleton from "../../CompanyfacilitySkeleton/FactorySkeleton";
import { countries } from "@/utils/countries";
import { Flag } from "@/components/common/countryFlag";
import CompanyFacilitiesDropdown from "@/components/common/countrydropdown/CompanyFacilitiesDropdown";

const initialFormValues = {
  factoryName: "",
  factorySize: "",
  yearOfAffilation: "",
  noOfProductionLine: "",
  factoryImage: "",
  country: "",
  regions: "",
  city: "",
  streetAddress: "",
  postalCode: "",
  // additionalAddress: "",
  longitude: "",
  // latitutde: "",
  nearSeaport: "",
  nearAirport: "",
  noOfQaStaff: "",
  noofRNdStaff: "",
  totalTransectionAmount: "",
  production_capacity: "",
  annualOutput: "",
  annualStoreValue: "",
  annualStorUnit: "",
};

const RetailerFactory = ({ type, handlCallBackFunction, listData }): any => {
  let warehouseData;
  let storeData;
  const fetchedData = listData?.[type];
  if (fetchedData) {
    const parsedData = JSON.parse(fetchedData);
    warehouseData = parsedData?.warehouse ?? "";
    storeData = parsedData?.store ?? "";
  }

  const [formBlocks, setFormBlocks] = useState([initialFormValues]);
  const { companyDetails }: any = useSelector(
    (state: any) => state.companyProfile
  );
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [loader, setLoader] = useState(false);
  const [skeltonLoader, setSkeletonLoader] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  const [imagesByIndex, setImagesByIndex] = useState<{
    [key: number]: string[];
  }>({});
  const removeFile = (indexToRemove: number, index: number) => {
    const formValues = formik.values.forms;
    const updatedValues = formValues.map((form, fieldIndex) => {
      if (fieldIndex === index) {
        return {
          ...form,
          factoryImage: form.factoryImage.filter(
            (_, fileIndex) => fileIndex !== indexToRemove
          ),
        };
      }
      return form;
    });

    formik.setFieldValue("forms", updatedValues);
  };
  const [imageIndex, setImagesIndex] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [seaPorts, setSeaPorts] = useState([]);
  const [airport, setAirPort] = useState([]);
  const [data, setData] = useState([]);
  const [filesByIndex, setFilesByIndex] = React.useState<{
    [key: number]: File[];
  }>({});

  const [enabled, setEnabled] = useState(false);
  const getCompanyData = async () => {
    try {
      setSkeletonLoader(true);
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
          Array.isArray(parsedData?.factory) &&
          parsedData.factory.length > 0
        ) {
          parsedData.factory.forEach((storeEntry) => {
            if (
              Array.isArray(storeEntry.factoryData) &&
              storeEntry.factoryData.length > 0
            ) {
              setData(storeEntry.factoryData);
              setFormBlocks(storeEntry.factoryData);
              setEnabled(storeEntry?.selected_value === "yes");
            }
          });
        }
      }
      setSkeletonLoader(false);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      formik.setValues({ forms: data });
    }
  }, [data]);
  const [isSeaportsAvailable, setIsSeaportsAvailable] = useState(false);
  const FetchSeaPortList = async (country_code = "") => {
    try {
      let response = await apiClient(
        `ports/getPorts?type=sea_ports&country=${country_code}&per_page=500`,
        "get"
      );
      if (response.status === 200) {
        setSeaPorts(response.data);
        setIsSeaportsAvailable(response.data.length > 0);
      }
    } catch (error) {}
  };
  const [isAirportsAvailable, setIsAirportsAvailable] = useState(false);
  const FetchAirPortList = async (country_code = "") => {
    let response = await apiClient(
      `ports/getPorts?search&type=air_ports&country=${country_code}&per_page=500`,
      "get"
    );
    if (response.status === 200) {
      setAirPort(response.data);
      setIsAirportsAvailable(response.data.length > 0);
    }
  };
  const addFiles = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e?.target?.files || []);
    const acceptedFileTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 2 * 1024 * 1024;
    formik.setFieldError(`forms[${index}].factoryImage`, "");

    const filteredFiles = files.filter((file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        formik.setFieldError(
          `forms[${index}].factoryImage`,
          "Only JPG and PNG formats are accepted."
        );
        setTimeout(() => {
          formik.setFieldError(`forms[${index}].factoryImage`, "");
        }, 2000);
        return false;
      }
      if (file.size > maxFileSize) {
        formik.setFieldError(
          `forms[${index}].factoryImage`,
          "File size must be less than 2MB."
        );
        setTimeout(() => {
          formik.setFieldError(`forms[${index}].factoryImage`, "");
        }, 2000);
        return false;
      }
      return true;
    });

    if (filteredFiles.length === 0) {
      e.target.value = null;
      return;
    }

    const existingFiles = filesByIndex[index] || [];
    const updatedFiles = [...existingFiles, ...filteredFiles];

    if (updatedFiles.length > 3) {
      formik.setFieldError(
        `forms[${index}].factoryImage`,
        "You can only upload up to 3 images."
      );
      setTimeout(() => {
        formik.setFieldError(`forms[${index}].factoryImage`, "");
      }, 2000);
      e.target.value = null;
      return;
    }

    handleSaveImage(index, updatedFiles);

    e.target.value = null;
  };
  const removeFileDynamic = (index: number, imgIndex: number) => {
    const updatedImages = [...imagesByIndex[index]];
    updatedImages.splice(imgIndex, 1);

    setImagesByIndex((prev) => ({
      ...prev,
      [index]: updatedImages,
    }));
    formik.setFieldValue(`forms[${index}].factoryImage`, updatedImages);
  };
  const handleSaveImage = async (index: number, files: File[]) => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("company_photos[]", file);
    });

    try {
      setCompleteScreenLoader(true);
      const response = await apiClient(
        "company_profile/file_upload_qaqc_rnd",
        "post",
        { body: formData },
        true
      );

      if (response.status) {
        setCompleteScreenLoader(false);
        const responseData = response.data;
        const existingUrlsArray =
          formik.values.forms[index]?.factoryImage || [];
        const newUrlsArray = [...existingUrlsArray, ...responseData];

        if (newUrlsArray.length > 3) {
          formik.setFieldError(
            `forms[${index}].factoryImage`,
            "You can only upload up to 3 images."
          );
          setTimeout(() => {
            formik.setFieldError(`forms[${index}].factoryImage`, "");
          }, 2000);
          return;
        }

        const updatedValues = formik.values.forms.map((form, i) => {
          if (i === index) {
            return {
              ...form,
              factoryImage: newUrlsArray,
            };
          }
          return form;
        });

        formik.setFieldValue("forms", updatedValues);
      }
    } catch (error) {
      setCompleteScreenLoader(false);
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
      forms:
        data?.length > 0
          ? data?.map((item) => ({
              ...item,

              // factoryImage: item?.factoryImage?.flatMap((item) => item) || [],
              factoryImage: Array.isArray(item.factoryImage)
                ? item.factoryImage.flatMap((img) => img)
                : [],
            }))
          : [{ formBlocks }],
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      forms: Yup.array().of(
        Yup.object().shape({
          factoryName: Yup.string().required("Please enter factory name"),
          factorySize: Yup.string().required("Please select factory size"),
          yearOfAffilation: Yup.string().required(
            "Please enter years of affiliation"
          ),
          country: Yup.string().required("Please select country").nullable(),
          postalCode: Yup.string().required("Please enter postal code"),
          regions: Yup.string().required("Please select region/state/province"),
          factoryImage: Yup.array()
            .nullable()
            .min(1, "Please upload at least one image")
            .max(3, "Please upload a maximum of 3 images")
            .required("Please upload an image"),

          city: Yup.string().required("Please select city"),
          streetAddress: Yup.string().required("Please enter address"),
          nearSeaport: isSeaportsAvailable
            ? Yup.string().required("Please select nearby seaport")
            : Yup.string().nullable(),
          nearAirport: isAirportsAvailable
            ? Yup.string().required("Please select nearby airport")
            : Yup.string().nullable(),
          noofRNdStaff: Yup.string().required("Please enter no. of R&D Staff"),
          noOfQaStaff: Yup.string().required("Please enter no. of Qa Staff"),
          production_capacity: Yup.string().required(
            "Please select production capacity"
          ),
          annualStoreValue: Yup.string().required("Please enter value"),
          totalTransectionAmount: Yup.string().required(
            "Please select total transaction amount"
          ),
          annualStorUnit: Yup.string().required("Please select unit"),
        })
      ),
    }),
    onSubmit: async (values) => {
      setLoader(true);
      const value = values?.forms;
      const factoryData = value.map(
        ({ formBlocks, additionalAddresses, ...rest }, index) => ({
          ...rest,
          factoryImage: value[index]?.factoryImage || [],
          additionalAddresses:
            additionalAddresses?.filter(
              (address) => address !== null && address.trim() !== ""
            ) || [],
        })
      );

      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          factory: [
            {
              selected_value: enabled ? "yes" : "no",
              factoryData,
            },
          ],
          store: storeData,
          warehouse: warehouseData,
        },
      };
      let response = await apiClient(
        "company_profile/company-Faclities",
        "POST",
        { body: combinedPayload }
      );
      if (response.status === 200 || response.status === 201) {
        setLoader(false);
        setSelectedValue("no");
        setEditMode(false);
        getCompanyData();
        handlCallBackFunction();
      }

      setLoader(false);
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

  const handleSaveClick = async () => {
    const touchedArray = formik.values.forms.map(() => ({
      factoryName: true,
      country: true,
      factorySize: true,
      postalCode: true,
      yearOfAffilation: true,
      annualStoreValue: true,
      annualStorUnit: true,
      streetAddress: true,
      nearSeaport: true,
      nearAirport: true,
      regions: true,
      city: true,
      noOfQaStaff: true,
      noofRNdStaff: true,
      production_capacity: true,
      totalTransectionAmount: true,
    }));

    formik.setTouched({
      forms: touchedArray,
    });

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    } else {
    }
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
      const currentValues = formik.values.forms;
      const factoryData = currentValues.map(
        ({ formBlocks, additionalAddresses, ...rest }, index) => ({
          ...rest,

          factoryImage: currentValues[index]?.factoryImage || [],
          additionalAddresses:
            additionalAddresses?.filter(
              (address) => address !== null && address.trim() !== ""
            ) || [],
        })
      );

      // const currentValues = formik.values.forms;
      // const factoryData = currentValues.map(({ formBlocks, additionalAddresses, ...rest }, index) => ({
      //   ...rest,
      //   testing_certificate: currentValues[index]?.testing_certificate || [],
      //   additionalAddresses:
      //     additionalAddresses?.filter(address => address !== null && address.trim() !== "") || [],
      // }));

      const combinedPayload = {
        shop_id: companyDetails.basic_information.shop_id,
        [type]: {
          factory: [
            {
              selected_value: newValue ? "yes" : "no",
              factoryData,
            },
          ],
          store: storeData,
          warehouse: warehouseData,
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
          padding: editMode ? "0px 0 8px 0" : "16px 16px 0px 16px",
          "@media screen and (max-width:767px)": { padding: "0px" },
        }}
      >
        <TypographyTitle className="toggleBoxstyle">
          Factory
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
                padding: editMode ? "16px 0 0 0 !important" : 0,
                marginTop: index === 0 ? "" : "10px",
              }}
            >
              {editMode && (
                <CompanyFacilityData>
                  {editMode && (
                    <EditModeBoxContainer>
                      <EditModeBoxContainer>
                        <form onSubmit={() => formik.onSubmit()}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <DataRowHere className="editview">
                                <Grid
                                  container
                                  spacing={1}
                                  alignItems={"center"}
                                >
                                  <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <DataRowTitle>
                                      <Typography>
                                        Factory Name{" "}
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
                                        placeholder="Enter factory name"
                                        fullWidth
                                        name={`forms[${index}].factoryName`}
                                        value={
                                          formik.values.forms[index]
                                            ?.factoryName
                                        }
                                        onChange={(e) => {
                                          const inputValue =
                                            e.target.value.trimStart();

                                          if (inputValue.length <= 100) {
                                            formik.setFieldValue(
                                              `forms[${index}].factoryName`,
                                              inputValue
                                            );
                                            formik.setFieldError(
                                              `forms[${index}].factoryName`,
                                              ""
                                            );
                                          } else {
                                            formik.setFieldError(
                                              `forms[${index}].factoryName`,
                                              "Factory name content is too long. Please limit it to 100 character."
                                            );
                                            formik.setFieldTouched(
                                              `forms[${index}].factoryName`,
                                              true,
                                              false
                                            );
                                          }
                                        }}
                                        onBlur={(e) => {
                                          formik.handleBlur(e);
                                          formik.setFieldError(
                                            `forms[${index}].factoryName`,
                                            ""
                                          );
                                        }}
                                        error={
                                          formik.touched.forms?.[index]
                                            ?.factoryName &&
                                          Boolean(
                                            formik.errors.forms?.[index]
                                              ?.factoryName
                                          )
                                        }
                                        helperText={
                                          formik.touched.forms?.[index]
                                            ?.factoryName &&
                                          formik.errors.forms?.[index]
                                            ?.factoryName
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
                                      ?.factorySize &&
                                      formik.errors.forms?.[index]
                                        ?.factorySize) ||
                                    (formik.touched.forms?.[index]
                                      ?.yearOfAffilation &&
                                      formik.errors.forms?.[index]
                                        ?.yearOfAffilation)
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
                                            ?.factorySize &&
                                          formik.errors.forms?.[index]
                                            ?.factorySize
                                            ? "baseline"
                                            : "center",
                                      }}
                                    >
                                      <Grid item xs={12} sm={12} md={4}>
                                        <DataRowTitle>
                                          <Typography>
                                            Factory Size{" "}
                                            <AstricksMark>
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top-start"
                                                title="Select the range that best describes the total size of your factory, including production areas."
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
                                            <FormControl
                                              fullWidth
                                              size="small"
                                              error={
                                                formik.touched.forms?.[index]
                                                  ?.factorySize &&
                                                Boolean(
                                                  formik.errors.forms?.[index]
                                                    ?.factorySize
                                                )
                                              }
                                              onBlur={(e) => {
                                                formik.handleBlur(e);
                                                formik.setFieldError(
                                                  `forms[${index}].factorySize`,
                                                  ""
                                                );
                                              }}
                                            >
                                              <Select
                                                labelId={`airport-select-label-${index}`}
                                                id={`demo-simple-select-${index}`}
                                                value={
                                                  formik.values.forms[index]
                                                    ?.factorySize || ""
                                                }
                                                onChange={(e) => {
                                                  formik.setFieldValue(
                                                    `forms[${index}].factorySize`,
                                                    e.target.value
                                                  );
                                                  formik.setFieldError(
                                                    `forms[${index}].factorySize`,
                                                    ""
                                                  );
                                                }}
                                                displayEmpty
                                                renderValue={(selected) =>
                                                  selected !== "" ? (
                                                    selected
                                                  ) : (
                                                    <SelectPlaceholder>
                                                      Select factory size
                                                    </SelectPlaceholder>
                                                  )
                                                }
                                              >
                                                {factorySizeOptions.length > 0
                                                  ? factorySizeOptions.map(
                                                      (item) => (
                                                        <MenuItem
                                                          key={item}
                                                          value={item}
                                                        >
                                                          {item}
                                                        </MenuItem>
                                                      )
                                                    )
                                                  : ""}
                                              </Select>

                                              {formik.touched.forms?.[index]
                                                ?.factorySize &&
                                                formik.errors.forms?.[index]
                                                  ?.factorySize && (
                                                  <FormHelperText>
                                                    {
                                                      formik.errors.forms[index]
                                                        ?.factorySize
                                                    }
                                                  </FormHelperText>
                                                )}
                                            </FormControl>
                                          </FormControl>
                                        </DataRowValue>
                                      </Grid>
                                    </Grid>
                                  </DataRowHere>
                                </Grid>

                                <>
                                  <Grid item xs={12} sm={12} md={6}>
                                    <DataRowHere className="editview">
                                      <Grid
                                        container
                                        spacing={1}
                                        sx={{
                                          alignItems:
                                            formik.touched.forms?.[index]
                                              ?.yearOfAffilation &&
                                            formik.errors.forms?.[index]
                                              ?.yearOfAffilation
                                              ? "baseline"
                                              : "center",
                                        }}
                                      >
                                        <Grid item xs={12} sm={12} md={4}>
                                          <DataRowTitle>
                                            <Typography>
                                              Years of Affiliation{" "}
                                              <AstricksMark>
                                                *
                                                <LightTooltip
                                                  arrow
                                                  disableInteractive
                                                  placement="top"
                                                  title="Enter the number of years your Factory has been affiliated with industry organizations, trade associations, or any other relevant entities."
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
                                                formik.touched.forms?.[index]
                                                  ?.yearOfAffilation &&
                                                Boolean(
                                                  formik.errors.forms?.[index]
                                                    ?.yearOfAffilation
                                                )
                                              }
                                            >
                                              <TextField
                                                placeholder="Enter years of affiliation "
                                                id={`year-of-affiliation-${index}`}
                                                value={
                                                  formik.values.forms[index]
                                                    ?.yearOfAffilation || ""
                                                }
                                                onChange={(e) => {
                                                  const value = e.target.value;
                                                  const regex =
                                                    /^[0-9]*\.?[0-9]*$/;
                                                  if (regex.test(value)) {
                                                    if (value.length <= 4) {
                                                      formik.setFieldValue(
                                                        `forms[${index}].yearOfAffilation`,
                                                        e.target.value
                                                      );
                                                      formik.setFieldError(
                                                        `forms[${index}].yearOfAffilation`,
                                                        ""
                                                      );
                                                    } else {
                                                      formik.setFieldError(
                                                        `forms[${index}].yearOfAffilation`,
                                                        "Year Of Affilation is too long. Please limit it to 4 digit."
                                                      );
                                                    }
                                                    formik.setFieldTouched(
                                                      `forms[${index}].yearOfAffilation`,
                                                      true,
                                                      false
                                                    );
                                                  }
                                                }}
                                                onBlur={(e) => {
                                                  formik.handleBlur(e);
                                                  formik.setFieldError(
                                                    `forms[${index}].yearOfAffilation`,
                                                    ""
                                                  );
                                                }}
                                                error={
                                                  formik.touched.forms?.[index]
                                                    ?.yearOfAffilation &&
                                                  Boolean(
                                                    formik.errors.forms?.[index]
                                                      ?.yearOfAffilation
                                                  )
                                                }
                                                helperText={
                                                  formik.touched.forms?.[index]
                                                    ?.yearOfAffilation &&
                                                  formik.errors.forms?.[index]
                                                    ?.yearOfAffilation
                                                    ? formik.errors.forms[index]
                                                        ?.yearOfAffilation
                                                    : ""
                                                }
                                                fullWidth
                                                size="small"
                                              />
                                            </FormControl>
                                          </DataRowValue>
                                        </Grid>
                                      </Grid>
                                    </DataRowHere>
                                  </Grid>
                                </>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <DataRowHere className="editview">
                                <Grid
                                  container
                                  spacing={1}
                                  alignItems={"center"}
                                >
                                  <Grid item xs={12} sm={12} md={2} lg={2}>
                                    <DataRowTitle>
                                      <Typography>
                                        Factory Images
                                        <AstricksMark> *</AstricksMark>
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: "10px !important",
                                          color: "#231f20",
                                          opacity: "1",
                                        }}
                                      >
                                        {imageFormat}
                                      </Typography>
                                    </DataRowTitle>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={10} lg={10}>
                                    <Box
                                      sx={{
                                        padding: "4px 6px",
                                        border: formik.errors.forms?.[index]
                                          ?.factoryImage
                                          ? "1px solid #d7282f"
                                          : "1px solid #bdbdbd",
                                        width: "100%",
                                        borderRadius: "4px",
                                        "&:hover": {
                                          border: formik.errors.forms?.[index]
                                            ?.factoryImage
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
                                                "&:hover": {
                                                  boxShadow: "none",
                                                },
                                              }}
                                              component="label"
                                              variant="contained"
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
                                                  addFiles(index, e);
                                                  e.target.value = null;
                                                  setImagesIndex(index);
                                                }}
                                              />
                                            </Button>
                                          </EditBrowseIcon>

                                          <SelectedEditSection>
                                            {form?.factoryImage?.length > 0 ? (
                                              form?.factoryImage?.map(
                                                (file, fileIndex) => (
                                                  <SelectedEditImg
                                                    key={fileIndex}
                                                  >
                                                    <img
                                                      src={file?.source}
                                                      alt=""
                                                      height="24px"
                                                      style={{
                                                        objectFit: "contain",
                                                      }}
                                                    />
                                                    <CancelRoundedIcon
                                                      onClick={() =>
                                                        removeFile(
                                                          fileIndex,
                                                          index
                                                        )
                                                      }
                                                    />
                                                    <Typography className="imagename">
                                                      {formatFileName(
                                                        file.file_original_name ||
                                                          file.name,
                                                        5
                                                      )}
                                                    </Typography>
                                                  </SelectedEditImg>
                                                )
                                              )
                                            ) : (
                                              <Typography></Typography>
                                            )}

                                            {Array.isArray(
                                              imagesByIndex[index]
                                            ) &&
                                              imagesByIndex[index].map(
                                                (item: any, imgIndex) => (
                                                  <SelectedEditImg
                                                    key={imgIndex}
                                                  >
                                                    <img
                                                      src={item.source}
                                                      alt={
                                                        item.file_original_name
                                                      }
                                                      height="24px"
                                                    />
                                                    <CancelRoundedIcon
                                                      onClick={() =>
                                                        removeFileDynamic(
                                                          index,
                                                          imgIndex
                                                        )
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
                                    {formik.errors.forms?.[index]
                                      ?.factoryImage && (
                                      <HelperText
                                        errorText={
                                          formik.errors.forms[index]
                                            .factoryImage
                                        }
                                      />
                                    )}
                                  </Grid>

                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                  ></Grid>
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
                                    (formik.touched.forms?.[index]
                                      ?.postalCode &&
                                      formik.errors.forms?.[index]?.postalCode)
                                      ? "baseline"
                                      : "center",
                                }}
                              >
                                {/*  */}
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
                                            Country{" "}
                                            <AstricksMark>*</AstricksMark>
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
                                          formik.errors.forms?.[index]
                                            ?.postalCode
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
                                                .toUpperCase()
                                                .trimStart();

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
                                              } else {
                                                formik.setFieldError(
                                                  `forms[${index}].postalCode`,
                                                  "Postal code content is too long. Please limit it to 10 characters."
                                                );
                                                formik.setFieldTouched(
                                                  `forms[${index}].postalCode`,
                                                  true,
                                                  false
                                                );
                                              }
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
                                            Region / State / Province{" "}
                                            <AstricksMark>
                                              {" "}
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top"
                                                title="Select the region, state, or province where your factory is located from the dropdown list."
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
                                            <FormControl fullWidth size="small">
                                              <CitiesStates
                                                country={
                                                  formik.values.forms[index]
                                                    ?.country
                                                }
                                                city={
                                                  formik.values.forms[index]
                                                    ?.city
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
                                                  formik.values.forms?.[index]
                                                    ?.city
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
                                                  formik.errors.forms?.[index]
                                                    ?.city
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
                                          </FormControl>
                                        </DataRowValue>
                                      </Grid>
                                    </Grid>
                                  </DataRowHere>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid item xs={12}>
                                <Grid
                                  container
                                  spacing={2}
                                  alignItems={"center"}
                                >
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
                                              Street Address{" "}
                                              <AstricksMark>
                                                {" "}
                                                *
                                                <LightTooltip
                                                  arrow
                                                  disableInteractive
                                                  placement="top"
                                                  title="Enter the complete street address of your factory, including building number and street name."
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
                                                ?.additionalAddresses?.length >
                                              0
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
                                                      ?.additionalAddresses[
                                                      idx
                                                    ] || ""
                                                  }
                                                  onChange={(e) => {
                                                    const newValue =
                                                      e.target.value.trimStart();
                                                    if (
                                                      newValue.length <= 100
                                                    ) {
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
                                                      `forms[${index}].additionalAddresses[${idx}]`,
                                                      ""
                                                    );
                                                  }}
                                                  error={Boolean(
                                                    formik.touched.forms?.[
                                                      index
                                                    ]?.additionalAddresses?.[
                                                      idx
                                                    ] &&
                                                      formik.errors.forms?.[
                                                        index
                                                      ]?.additionalAddresses?.[
                                                        idx
                                                      ]
                                                  )}
                                                  helperText={
                                                    formik.touched.forms?.[
                                                      index
                                                    ]?.additionalAddresses?.[
                                                      idx
                                                    ] &&
                                                    formik.errors.forms?.[index]
                                                      ?.additionalAddresses?.[
                                                      idx
                                                    ]
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
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    sm={12}
                                                    md={3}
                                                  >
                                                    <AddRemoveBTN
                                                      color="primary"
                                                      onClick={() => {
                                                        const updatedAddresses =
                                                        [
                                                            ...formik.values
                                                              .forms[index]
                                                              .additionalAddresses,
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
                            </Grid>

                            <Grid item xs={12}>
                              <Grid container spacing={2}>
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
                                            Geolocation Coordinates{" "}
                                            <AstricksMark>
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top"
                                                title="Enter the latitude and longitude coordinates of your factory for accurate mapping."
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
                                            variant="outlined"
                                            size="small"
                                            placeholder="Latitude"
                                            fullWidth
                                            name={`forms[${index}].latitude`}
                                            value={
                                              formik.values.forms[index]
                                                ?.latitude
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
                                      <Grid item xs={12} sm={6} md={4}>
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
                              </Grid>
                            </Grid>

                            <Grid item xs={12}>
                              <Grid
                                container
                                spacing={2}
                                sx={{
                                  alignItems:
                                    (formik.touched.forms?.[index]
                                      ?.nearSeaport &&
                                      formik.errors.forms?.[index]
                                        ?.nearSeaport) ||
                                    (formik.touched.forms?.[index]
                                      ?.nearAirport &&
                                      formik.errors.forms?.[index]?.nearAirport)
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
                                                  seaPorts &&
                                                  seaPorts.length > 0
                                                    ? "madatory"
                                                    : "notmadatory"
                                                }
                                              >
                                                *
                                              </span>
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top-start"
                                                title="Select the nearest seaport to your factory or warehouse from the dropdown list for shipping purposes."
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
                                                  airport && airport.length > 0
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
                                                title="Select the nearest airport to your factory or warehouse from the dropdown list for logistics and transportation."
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
                            <Grid item xs={12}>
                              <Grid
                                container
                                spacing={2}
                                sx={{
                                  alignItems:
                                    (formik.touched.forms?.[index]
                                      ?.noofRNdStaff &&
                                      formik.errors.forms?.[index]
                                        ?.noofRNdStaff) ||
                                    (formik.touched.forms?.[index]
                                      ?.noOfQaStaff &&
                                      formik.errors.forms?.[index]?.noOfQaStaff)
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
                                            ?.noofRNdStaff &&
                                          formik.errors.forms?.[index]
                                            ?.noofRNdStaff
                                            ? "baseline"
                                            : "center",
                                      }}
                                    >
                                      <Grid item xs={12} sm={12} md={4}>
                                        <DataRowTitle>
                                          <Typography>
                                            No. of R&D Staff{" "}
                                            <AstricksMark>
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top-start"
                                                title="Choose the range that represents the total number of staff in your Research & Development (R&D) department."
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
                                            id="outlined-basic"
                                            placeholder="Enter No. of R&D Staff"
                                            variant="outlined"
                                            size="small"
                                            name={`forms[${index}].noofRNdStaff`}
                                            value={
                                              formik.values.forms[index]
                                                ?.noofRNdStaff
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
                                                    `forms[${index}].noofRNdStaff`,
                                                    value
                                                  );
                                                  formik.setFieldError(
                                                    `forms[${index}].noofRNdStaff`,
                                                    ""
                                                  );
                                                } else {
                                                  formik.setFieldError(
                                                    `forms[${index}].noofRNdStaff`,
                                                    "No. of R&D Staff value content is too long. Please limit it to 8 digit."
                                                  );
                                                  formik.setFieldTouched(
                                                    `forms[${index}].noofRNdStaff`,
                                                    true,
                                                    false
                                                  );
                                                }
                                              }
                                            }}
                                            onBlur={(e) => {
                                              formik.handleBlur(e);
                                              formik.setFieldError(
                                                `forms[${index}].noofRNdStaff`,
                                                ""
                                              );
                                            }}
                                            error={
                                              formik.touched.forms?.[index]
                                                ?.noofRNdStaff &&
                                              Boolean(
                                                formik.errors.forms?.[index]
                                                  ?.noofRNdStaff
                                              )
                                            }
                                            helperText={
                                              formik.touched.forms?.[index]
                                                ?.noofRNdStaff &&
                                              formik.errors.forms?.[index]
                                                ?.noofRNdStaff
                                            }
                                            fullWidth
                                            inputProps={{
                                              pattern: "[0-9]*",
                                              inputMode: "numeric",
                                            }}
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
                                            ?.noOfQaStaff &&
                                          formik.errors.forms?.[index]
                                            ?.noOfQaStaff
                                            ? "baseline"
                                            : "center",
                                      }}
                                    >
                                      <Grid item xs={12} sm={12} md={4}>
                                        <DataRowTitle>
                                          <Typography>
                                            No. of QA Staff{" "}
                                            <AstricksMark>
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top-start"
                                                title="Choose the range that represents the total number of staff dedicated to Quality Assurance (QA) in your factory."
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
                                            <TextField
                                              id="outlined-basic"
                                              placeholder="Enter No. of QA Staff"
                                              variant="outlined"
                                              size="small"
                                              name={`forms[${index}].noOfQaStaff`}
                                              value={
                                                formik.values.forms[index]
                                                  ?.noOfQaStaff
                                              }
                                              onChange={(e) => {
                                                let value = e.target.value;
                                                value = value.replace(
                                                  /[a-zA-Z]/g,
                                                  ""
                                                );
                                                const regex =
                                                  /^[0-9]*\.?[0-9]*$/;
                                                if (regex.test(value)) {
                                                  if (value.length <= 8) {
                                                    formik.setFieldValue(
                                                      `forms[${index}].noOfQaStaff`,
                                                      value
                                                    );
                                                    formik.setFieldError(
                                                      `forms[${index}].noOfQaStaff`,
                                                      ""
                                                    );
                                                  } else {
                                                    formik.setFieldError(
                                                      `forms[${index}].noOfQaStaff`,
                                                      "No. of Qa Staff value content is too long. Please limit it to 8 digit."
                                                    );
                                                    formik.setFieldTouched(
                                                      `forms[${index}].noOfQaStaff`,
                                                      true,
                                                      false
                                                    );
                                                  }
                                                }
                                              }}
                                              onBlur={(e) => {
                                                formik.handleBlur(e);
                                                formik.setFieldError(
                                                  `forms[${index}].noOfQaStaff`,
                                                  ""
                                                );
                                              }}
                                              error={
                                                formik.touched.forms?.[index]
                                                  ?.noOfQaStaff &&
                                                Boolean(
                                                  formik.errors.forms?.[index]
                                                    ?.noOfQaStaff
                                                )
                                              }
                                              helperText={
                                                formik.touched.forms?.[index]
                                                  ?.noOfQaStaff &&
                                                formik.errors.forms?.[index]
                                                  ?.noOfQaStaff
                                              }
                                              fullWidth
                                              inputProps={{
                                                pattern: "[0-9]*",
                                                inputMode: "numeric",
                                              }}
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
                                      ?.totalTransectionAmount &&
                                      formik.errors.forms?.[index]
                                        ?.totalTransectionAmount) ||
                                    (formik.touched.forms?.[index]
                                      ?.production_capacity &&
                                      formik.errors.forms?.[index]
                                        ?.production_capacity)
                                      ? "flex-start"
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
                                            ?.totalTransectionAmount &&
                                          formik.errors.forms?.[index]
                                            ?.totalTransectionAmount
                                            ? "baseline"
                                            : "center",
                                      }}
                                    >
                                      <Grid item xs={12} sm={12} md={4}>
                                        <DataRowTitle>
                                          <Typography>
                                            Total transaction amount (In USD-$)
                                            with the factory (previous Year)
                                            <AstricksMark>
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top"
                                                title="Enter the total monetary value of all transactions made with your factory over the last year. Include all sales and production-related transactions."
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
                                            <DataRowValue>
                                              <FormControl
                                                fullWidth
                                                size="small"
                                              >
                                                <FormControl
                                                  fullWidth
                                                  size="small"
                                                  error={
                                                    formik.touched.forms?.[
                                                      index
                                                    ]?.totalTransectionAmount &&
                                                    Boolean(
                                                      formik.errors.forms?.[
                                                        index
                                                      ]?.totalTransectionAmount
                                                    )
                                                  }
                                                  onBlur={(e) => {
                                                    formik.handleBlur(e);
                                                    formik.setFieldError(
                                                      `forms[${index}].totalTransectionAmount`,
                                                      ""
                                                    );
                                                  }}
                                                >
                                                  <Select
                                                    labelId={`airport-select-label-${index}`}
                                                    id={`demo-simple-select-${index}`}
                                                    value={
                                                      formik.values.forms[index]
                                                        ?.totalTransectionAmount ||
                                                      ""
                                                    }
                                                    onChange={(e) => {
                                                      formik.setFieldValue(
                                                        `forms[${index}].totalTransectionAmount`,
                                                        e.target.value
                                                      );
                                                      formik.setFieldError(
                                                        `forms[${index}].totalTransectionAmount`,
                                                        ""
                                                      );
                                                    }}
                                                    displayEmpty
                                                    renderValue={(selected) =>
                                                      selected !== "" ? (
                                                        selected
                                                      ) : (
                                                        <SelectPlaceholder>
                                                          Select total
                                                          transaction amount
                                                        </SelectPlaceholder>
                                                      )
                                                    }
                                                  >
                                                    {transactionAmount.length >
                                                    0
                                                      ? transactionAmount.map(
                                                          (item) => (
                                                            <MenuItem
                                                              key={item}
                                                              value={item}
                                                            >
                                                              {item}
                                                            </MenuItem>
                                                          )
                                                        )
                                                      : ""}
                                                  </Select>

                                                  {formik.touched.forms?.[index]
                                                    ?.totalTransectionAmount &&
                                                    formik.errors.forms?.[index]
                                                      ?.totalTransectionAmount && (
                                                      <FormHelperText>
                                                        {
                                                          formik.errors.forms[
                                                            index
                                                          ]
                                                            ?.totalTransectionAmount
                                                        }
                                                      </FormHelperText>
                                                    )}
                                                </FormControl>
                                              </FormControl>
                                            </DataRowValue>
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
                                            ?.production_capacity &&
                                          formik.errors.forms?.[index]
                                            ?.production_capacity
                                            ? "baseline"
                                            : "center",
                                      }}
                                    >
                                      <Grid item xs={12} sm={12} md={4}>
                                        <DataRowTitle>
                                          <Typography>
                                            Production Capacity{" "}
                                            <AstricksMark>
                                              {" "}
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top"
                                                title="Select the maximum production capacity of your factory, representing the total volume your factory can produce in a given period."
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
                                            <DataRowValue>
                                              <FormControl
                                                fullWidth
                                                size="small"
                                              >
                                                <FormControl
                                                  fullWidth
                                                  size="small"
                                                  error={
                                                    formik.touched.forms?.[
                                                      index
                                                    ]?.production_capacity &&
                                                    Boolean(
                                                      formik.errors.forms?.[
                                                        index
                                                      ]?.production_capacity
                                                    )
                                                  }
                                                  onBlur={(e) => {
                                                    formik.handleBlur(e);
                                                    formik.setFieldError(
                                                      `forms[${index}].production_capacity`,
                                                      ""
                                                    );
                                                  }}
                                                >
                                                  <Select
                                                    labelId={`airport-select-label-${index}`}
                                                    id={`demo-simple-select-${index}`}
                                                    value={
                                                      formik.values.forms[index]
                                                        ?.production_capacity ||
                                                      ""
                                                    }
                                                    onChange={(e) => {
                                                      formik.setFieldValue(
                                                        `forms[${index}].production_capacity`,
                                                        e.target.value
                                                      );
                                                      formik.setFieldError(
                                                        `forms[${index}].production_capacity`,
                                                        ""
                                                      );
                                                    }}
                                                    displayEmpty
                                                    renderValue={(selected) =>
                                                      selected !== "" ? (
                                                        selected
                                                      ) : (
                                                        <SelectPlaceholder>
                                                          {" "}
                                                          Select production
                                                          capacity
                                                        </SelectPlaceholder>
                                                      )
                                                    }
                                                  >
                                                    {productionCapacity.length >
                                                    0
                                                      ? productionCapacity.map(
                                                          (item) => (
                                                            <MenuItem
                                                              key={item}
                                                              value={item}
                                                            >
                                                              {item}
                                                            </MenuItem>
                                                          )
                                                        )
                                                      : ""}
                                                  </Select>

                                                  {formik.touched.forms?.[index]
                                                    ?.production_capacity &&
                                                    formik.errors.forms?.[index]
                                                      ?.production_capacity && (
                                                      <FormHelperText>
                                                        {
                                                          formik.errors.forms[
                                                            index
                                                          ]?.production_capacity
                                                        }
                                                      </FormHelperText>
                                                    )}
                                                </FormControl>
                                              </FormControl>
                                            </DataRowValue>
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
                                      ?.annualStoreValue &&
                                      formik.errors.forms?.[index]
                                        ?.annualStoreValue)
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
                                            Annual Output Unit{" "}
                                            <AstricksMark>
                                              *
                                              <LightTooltip
                                                arrow
                                                disableInteractive
                                                placement="top"
                                                title="Specify the total output produced by your factory over the past year, including the unit of measurement (e.g., pieces, tons, liters)."
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
                                                  formik.setFieldTouched(
                                                    `forms[${index}].annualStoreValue`,
                                                    true,
                                                    false
                                                  );
                                                }
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
                                      <Grid item xs={12} sm={6} md={4}>
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
                                              {unitRange.length > 0
                                                ? unitRange.map((item) => (
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
                  {skeltonLoader ? (
                    <SeparationSkeleton className="spacing4">
                      <FactorySkeleton></FactorySkeleton>
                    </SeparationSkeleton>
                  ) : (
                    data?.length > 0 && (
                      <Separation className="spacing1">
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>Factory Name</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <Typography>{form?.factoryName}</Typography>
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
                                        <Typography>Factory Size</Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.factorySize}
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
                                          Years of Affiliation
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.yearOfAffilation}
                                        </Typography>
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <DataRowHere>
                              <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>Factory Images</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={10} lg={10}>
                                  <DataRowValue>
                                    <UploadImagesRow>
                                      {form?.factoryImage?.length > 0 &&
                                        form?.factoryImage.map(
                                          (item, certIndex) => (
                                            <UploadImageCol key={certIndex}>
                                              <img
                                                src={item?.source}
                                                alt=""
                                                height="24px"
                                                // width="30px"
                                              />
                                              <UpImageName>
                                                <LightTooltip
                                                  arrow
                                                  disableInteractive
                                                  title={
                                                    item.file_original_name
                                                  }
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
                                        <Typography>
                                          No. of R&D Staff
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.noofRNdStaff}
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
                                          {form?.noOfQaStaff}
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
                                        <Typography>Country</Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form.country ? (
                                            <Flag countryCode={form.country} />
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
                                          {form?.postalCode}{" "}
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
                                        <Typography>{form?.regions}</Typography>
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
                                        <Typography>{form?.city} </Typography>
                                      </DataRowValue>
                                    </Grid>
                                  </Grid>
                                </DataRowHere>
                              </Grid>
                            </Grid>
                          </Grid>
                          {/* <Grid item xs={12}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2}>
                                  <DataRowTitle>
                                    <Typography>
                                      Region / State / Province
                                    </Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={9}>
                                  <DataRowValue>
                                    <Typography>{form?.regions}</Typography>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid> */}
                          <Grid item xs={12}>
                            <DataRowHere>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                  <DataRowTitle>
                                    <Typography>Street Address</Typography>
                                  </DataRowTitle>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={9}>
                                  <DataRowValue>
                                    <Typography>
                                      {form?.streetAddress}
                                    </Typography>
                                  </DataRowValue>
                                </Grid>
                              </Grid>
                            </DataRowHere>
                          </Grid>
                          {form?.additionalAddresses &&
                          form.additionalAddresses.length > 0 &&
                          form.additionalAddresses.some((address) =>
                            address?.trim()
                          ) ? (
                            <Grid item xs={12}>
                              <DataRowHere>
                                <Grid container spacing={1}>
                                  <>
                                    <Grid item xs={12} sm={12} md={2} lg={2}>
                                      <DataRowTitle>
                                        <Typography>
                                          Additional Address
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8} lg={10}>
                                      <DataRowValue>
                                        <Typography sx={{ width: "100%" }}>
                                          {form?.additionalAddresses &&
                                            form?.additionalAddresses.length >
                                              0 &&
                                            form.additionalAddresses.map(
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
                                            )}
                                        </Typography>
                                      </DataRowValue>
                                    </Grid>
                                  </>
                                </Grid>
                              </DataRowHere>
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
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>Nearby Seaport</Typography>
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
                                        <Typography>Nearby Airport</Typography>
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

                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={12} md={6}>
                                <DataRowHere>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={4}>
                                      <DataRowTitle>
                                        <Typography>
                                          Total transaction amount (In USD-$)
                                          with the factory (previous Year)
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.totalTransectionAmount}
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
                                          Production Capacity
                                        </Typography>
                                      </DataRowTitle>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={8}>
                                      <DataRowValue>
                                        <Typography>
                                          {form?.production_capacity}
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
                                          Annual Output Unit
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

export default RetailerFactory;

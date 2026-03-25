import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import {
  apiClient,
  textLimitErrorMessage,
  textLimit,
  getProductId,
  productScoreValues,
  configProductScoreValues,
  FirstletterCapital,
} from "@/components/common/common";
import poststyle from "components/products/editProduct/style.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { setCategoryMetaData } from "@/hooks/CategoryReducer";
import { useAppDispatch } from "redux/store";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import useErrorTimeout from "@/hooks/useErrorTimeout";
///// Attributes design /////
import {
  Grid,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import dayjs from "dayjs";
import {
  AttributeDatepicker,
  AttributeListInn,
  AttributeListSection,
  AttributesAplication,
  AttributeToggle,
  AttributLabel,
  ForMiddleSpace,
  SectionOperatingVoltage,
  UnitText,
} from "../productInformation/activePassive/styles";
import {
  AttributesWrapper,
  ContentDescriptionHeader,
} from "../productInformation/activePassive/passive/styles";
import { EditAttributePlaceholder } from "./EditAttributePlaceholder";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCustomSpecReduxState } from "@/hooks/ProductReducers";

export const PassiveInformationPlaceholder = ({
  setCommercialBlock,
  HandlePercentage,
  setCompletedFields,
  setAccordianValue,
  category_lists,
  setPublished,
  FetchProductDetail,
  // productDetail,
  setProductDetail,
}) => {
  const ButtonCol = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "14px",
  });

  const { productDetail } = useSelector((state: any) => state.editProduct);

  const [specificationList, setSpecificationList] = useState<any>([]);
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");
  const [inputFieldError, setInputFieldError] = useState<{
    lengthError: boolean;
    errorText: string;
    isEmptyError: boolean;
  }>({
    lengthError: false,
    errorText: "",
    isEmptyError: false,
  });

  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const product_type = productDetail?.product_type;
  const productId: string = getProductId();
  const [customSpec, setCustomSpec] = useState<any>([]);

  const [customSpecError, setCustomSpecError] = useState<any>({
    error: false,
    erroeMsg: "",
  });

  useEffect(() => {
    if (customSpec?.length === 0 || choice_options?.length === 0) {
      setCompletedFields((prev) => ({ ...prev, specification: false }));
    } else {
      setCompletedFields((prev) => ({ ...prev, specification: true }));
    }
    setCommercialBlock({ disable: false, expanded: true });
  }, []);
  useEffect(() => {
    // const updatedProductDetail = [...productDetail, custom_specification_json : []]
  }, [customSpec]);
  const validation = Yup.object().shape({});

  useErrorTimeout(error, setError, 5000);
  const checkMandatoryFields = (customSpec) => {
    if (customSpec?.length == 0) {
      return [];
    }
    const emptyFields = customSpec?.filter((item) => {
      if (item?.mandatory_field?.toLowerCase() === "yes") {
        if (
          item.value === null ||
          item.value === undefined ||
          item.value === ""
        ) {
          return true;
        }
      }
      return false;
    });

    return emptyFields;
  };

  useEffect(() => {
    if (inputFieldError?.lengthError || inputFieldError?.isEmptyError) {
      const timeOutRef = setTimeout(() => {
        setInputFieldError((prev) => ({
          lengthError: false,
          isEmptyError: false,
          errorText: "",
        }));
      }, 5000);

      return () => clearTimeout(timeOutRef);
    }
  }, [inputFieldError]);

  const specificationFormik = useFormik({
    validationSchema: validation,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {choice_options: productDetail?.choice_options
      ? JSON.parse(productDetail?.choice_options)
      : [], },
    onSubmit: async (values) => {
      setPublished("");
      const { choice_options } = values;
      let formData = new FormData();
      formData.append(
        "choice_options",
        JSON.stringify(
          choice_options
            .filter((element) => element?.selected === true)
            .map((element) => ({
              attribute_id: element?.attribute_id,
              values: element?.values,
              name: element.name,
              options: element?.options ? element?.options : [],
            }))
        )
      );
      const trimmedValue = customSpec?.map((item) => {
        if (typeof item?.value == "string") {
          return { ...item, value: item?.value.trim() };
        }
        return item;
      });
      formData.append(
        "custom_specification_json",
        JSON.stringify(trimmedValue ?? [])
      );
      formData.append("id", productId);
      formData.append("published", "0");
      formData.append("last_update", "Technical Specification");
      setButtonLoader(true);

      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response.status == 200) {
        setProductDetail((prev) => ({
          ...prev,
          choice_options: response.data[0].choice_options,
        }));

        const hasEmptyFields = choice_options
          .filter((element) => element?.selected === true)
          .some(
            (element) =>
              !element?.attribute_id || !element?.values || !element?.name
          );

        if (customSpec?.length === 0 || choice_options?.length === 0) {
          setCompletedFields((prev) => ({ ...prev, specification: false }));
        } else {
          setCompletedFields((prev) => ({ ...prev, specification: true }));
        }
        setCommercialBlock({ disable: false, expanded: true });
        setAccordianValue("commercial");
        await FetchProductDetail();
      }
      setButtonLoader(false);
    },
  });

  const { choice_options } = specificationFormik.values;

  useEffect(() => {
    FetchSpecificationList();
  }, [category_lists]);

  const addNewAttribute = async () => {
    const isExist = choice_options.find(
      (option) =>
        option?.name.trim().toLowerCase() ==
        newAttributeValue.trim().toLocaleLowerCase()
    );
    if (isExist) {
      setError(true);
      setNewAttributeValue("");
      return;
    }

    if (!newAttributeValue) {
      setInputFieldError((prev) => ({
        ...prev,
        isEmptyError: true,
        errorText: "Please enter specification.",
      }));
      return;
    }
    setLocalLoading(true);
    const formData = new FormData();
    let category_id =
      category_lists?.length >= 2
        ? category_lists[1].id
        : category_lists?.find((v) => v.level === 1 || v.parent_id === 0)?.id ??
          0;
    formData.append("category_id", category_id);
    formData.append("name", newAttributeValue);
    formData.append("parent", "");
    formData.append("product_id", productId);
    const response = await apiClient(
      `attributes/create`,
      "POST",
      { body: formData },
      true
    );
    if (response.status === 200) {
      FetchSpecificationList("new");
      setNewAttributeValue("");
    }
    setLocalLoading(false);
    let errorTimeout;
    if (!response.status) {
      // setError(true);
      setNewAttributeValue("");
      setSpecificationList((prev) => {
        let specifications = [...prev];
        let index = specifications?.findIndex(
          (specification) =>
            specification?.name?.toLowerCase() ===
            newAttributeValue?.toLowerCase()
        );
        if (index !== -1) specifications[index].selected = true;
        return specifications;
      });

      const matchingSpecification = specificationList?.find(
        (specification) =>
          specification?.name?.toLowerCase() ===
          newAttributeValue?.toLowerCase()
      );
      if (matchingSpecification) {
        const isSpecificationExistInChoice = choice_options?.some(
          (option) =>
            (option?.attribute_id ? option?.attribute_id : option?.id) ===
            matchingSpecification?.id
        );
        if (!isSpecificationExistInChoice) {
          let newValue = {
            ...matchingSpecification,
            selected: true,
            attribute_id: matchingSpecification?.id,
          };
          specificationFormik.setFieldValue("choice_options", [
            ...choice_options,
            newValue,
          ]);
        }
      }
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    }
  };
  const sortArray = (arr: any, key: string) =>
    arr.sort((a: any, b: any) => a[key] - b[key]);
  const dispatch = useAppDispatch();

  const FetchSpecificationList = async (type = "old") => {
    let category_id = category_lists.map((ele) => ele?.id);
    if (category_id?.length > 0) {
      let formData = new FormData();
      formData.append("category_id", category_id?.join(","));
      let response = await apiClient(
        "product/suggested/by_category ",
        "post",
        {
          body: formData,
        },
        true
      );
      dispatch(setCategoryMetaData(response?.meta));
      if (response.status === 200) {
        if (response.specification.length === 0) {
          setSpecificationList([]);
          specificationFormik.setFieldValue("choice_options", []);
          setProductDetail((prev) => ({ ...prev, choice_options: "" }));
          return;
        }

        const { choice_options, user_id } = productDetail;

        const options =
          type === "new"
            ? sortArray(
                specificationFormik.values.choice_options,
                "attribute_id"
              )
            : choice_options
            ? sortArray(JSON.parse(choice_options), "attribute_id")
            : [];
        let choice_id = options.map((v) => v.attribute_id);
        let specifications = sortArray(response.specification, "id").map(
          (value, index) => {
            if (choice_id.includes(value.id)) {
              return { ...value, selected: true };
            } else {
              return { ...value, selected: false };
            }
          }
        );
        if (type === "new") {
          let { name, id, user_id } = specifications[specifications.length - 1];
          let newOptions = [
            ...options,
            {
              name,
              attribute_id: id,
              values: "",
              selected: true,
              user_id: user_id,
            },
          ];
          specificationFormik.setFieldValue(
            "choice_options",
            newOptions.map((v) => ({ ...v, selected: true }))
          );
          setSpecificationList((prev) => [
            ...prev,
            { name, id, selected: true, user_id: user_id },
          ]);
        } else {
          specificationFormik.setFieldValue(
            "choice_options",
            options.map((v) => ({ ...v, selected: true, user_id: user_id }))
          );
          if (options.length > 0) {
            setCommercialBlock({ disable: false, expanded: true });
            setCompletedFields((prev) => ({ ...prev, specification: true }));
            setIsMount(true);
          }
          setSpecificationList(specifications);
        }
      }
    }
  };

  const fetchSpecificationsTerms = async (id) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("parent", id);
    let response = await apiClient(
      "product/specifications_terms",
      "post",
      {
        body: formData,
      },
      true
    );
    const { data = [] } = response || {};
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      let category_id = category_lists.map((ele) => ele?.id);

      const response = await fetch(
        `${BASE_URL}/product/calculator/cattegoryAttributeList?category_id=${category_id?.join(
          ","
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );
      if (response?.ok) {
        const parsedResponse = await response.json();
        setCustomSpec(parsedResponse?.data);
        dispatch(setCustomSpecReduxState(parsedResponse?.data))
      }
    };

    if (productDetail?.custom_specification_json) {
      const parsedConfigSpec = JSON.parse(
        productDetail?.custom_specification_json
      );
      setCustomSpec(parsedConfigSpec);
      dispatch(setCustomSpecReduxState(parsedConfigSpec))
    } else {
      fetchData();
    }
  }, [category_lists, productDetail]);
  const addNewChoice = async (id, name, add, userId?: number) => {
    if (id === undefined) return;

    const index = choice_options.findIndex((v) => v.attribute_id === id);

    if (!add) {
      if (index !== -1) {
        const updatedChoices = choice_options.filter((_, i) => i !== index);
        specificationFormik.setFieldValue("choice_options", updatedChoices);
      }
    } else {
      try {
        const specificationTerms = await fetchSpecificationsTerms(id);
        const newValue = {
          attribute_id: id,
          name,
          values: "",
          selected: true,
          user_id: userId,
          options: specificationTerms || [],
        };

        setLoading(false);
        specificationFormik.setFieldValue("choice_options", [
          ...choice_options,
          newValue,
        ]);
      } catch (error) {
        throw new Error(error || "Something went Wrong.");
      }
    }
  };

  const editChoiceAndUpdateSpecList = (id: number, name: string) => {
    if (id == null) return;

    const choiceIndex = choice_options.findIndex((v) => v.attribute_id === id);

    if (choiceIndex !== -1) {
      const updatedChoices = choice_options.map((choice) =>
        choice.attribute_id === id ? { ...choice, name } : choice
      );

      specificationFormik.setFieldValue("choice_options", updatedChoices);

      setSpecificationList((prev) =>
        prev.map((specification) =>
          specification.id === id ? { ...specification, name } : specification
        )
      );
    }
  };
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const DeleteAttribute = async (id) => {
    let attribute = [...choice_options];

    let index = choice_options.findIndex((v) => v.attribute_id === id);
    if (index !== -1) {
      setFormikError(index, "delete");
      attribute.splice(index, 1);
    }
    setSpecificationList((prev) => {
      let specfs = [...prev];
      let specfsIndex = specfs.findIndex((v) => v.id === id);

      if (specfsIndex !== -1) {
        specfs[specfsIndex].selected = false;
      }

      return specfs;
    });

    const formData = new FormData();
    formData.append("id", id);
    formData.append("product_id", productId);
    try {
      const response = await fetch(`${BASE_URL}/attributes/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      if (response?.ok) {
        specificationFormik.setFieldValue("choice_options", attribute);
        toast.success("Attribute deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting attribute");
    }
  };

  const onChangeHandler = (id, value) => {
    let totalValues = [...choice_options];
    let index = totalValues.findIndex((v) => v.attribute_id == id);
    totalValues[index].values = value.trim();
    specificationFormik.setFieldValue("choice_options", totalValues);
  };

  const newSpecificationHandler = (e) => {
    const { value } = e?.target;
    if (error) setError(false);
    if (value?.length <= 100) {
      setNewAttributeValue(value);
    }
  };

  useEffect(() => {
    if (choice_options.length <= 0 && isMount) {
      setCompletedFields((prev) => ({ ...prev, specification: false }));
      setIsMount(false);
    }
  }, [choice_options, isMount]);

  useEffect(() => {
    if (product_type === "simple") {
      const { specificationsList } =
        productScoreValues?.productFeaturesAndCharacteristics
          ?.simple_product_type;

      if (customSpec?.length > 0 && choice_options?.length > 0) {
        const hasEmptyFields = checkMandatoryFields(customSpec);
        HandlePercentage(
          "product_features_simple_specification",
          choice_options?.length > 0 && hasEmptyFields.length == 0
            ? specificationsList
            : 0
        );
      } else if (customSpec?.length == 0 && choice_options?.length > 0) {
        HandlePercentage(
          "product_features_simple_specification",
          choice_options?.length > 0 ? specificationsList : 0
        );
      }
    } else if (product_type === "configured") {
      const { specifications } =
        configProductScoreValues?.productFeaturesAndCharacteristics
          ?.config_product_type;

      if (customSpec?.length > 0 && choice_options?.length > 0) {
        const hasEmptyFields = checkMandatoryFields(customSpec);
        HandlePercentage(
          "config_product_features_specification",
          choice_options?.length > 0 && hasEmptyFields.length == 0
            ? 4.282655246
            : 0
        );
      } else if (customSpec?.length == 0 && choice_options?.length > 0) {
        HandlePercentage(
          "config_product_features_specification",
          choice_options?.length > 0 ? 4.282655246 : 0
        );
      }
    }
  }, [choice_options, customSpec]);

  const setFormikError = (index, type = "edit") => {
    const { errors, setFieldError } = specificationFormik;

    if (Object.keys(errors).length === 0 || !errors.choice_options) return;

    try {
      const choiceErrors: any = Array.isArray(errors.choice_options)
        ? [...errors.choice_options]
        : [];

      if (!choiceErrors[index] || typeof choiceErrors[index] !== "object")
        return;

      if (type === "delete") {
        choiceErrors.splice(index, 1);
      } else {
        choiceErrors[index].values = "";
      }

      setFieldError("choice_options", choiceErrors);
    } catch (err) {
      throw new Error(err.message || "Something went wrong.");
    }
  };

  // const handleSpecChange = (id, field, value) => {
  //   setCustomSpec((prevState) => {
  //     const updatedSpec = { ...prevState };

  //     if (updatedSpec.id === id) {
  //       switch (updatedSpec.type) {
  //         case "Text Field":
  //           updatedSpec[field] = value;
  //           break;

  //         case "Yes/No":
  //           updatedSpec[field] = value;
  //           break;

  //         case "Date and Time":
  //           updatedSpec[field] = value;
  //           break;

  //         case "Multi-selection":
  //           if (updatedSpec.value?.includes(value)) {
  //             updatedSpec[field] = updatedSpec?.value.filter(
  //               (val) => val !== value
  //             );
  //           } else {
  //             updatedSpec[field] = [...(updatedSpec?.value || []), value];
  //           }
  //           break;

  //         case "dropdown":
  //           updatedSpec[field] = value;
  //           break;

  //         case "Radio Button":
  //           updatedSpec[field] = value;
  //           break;

  //         default:
  //           break;
  //       }
  //     }

  //     return updatedSpec;
  //   });
  // };
  const handleSpecChange = (id, field, value) => {
    setCustomSpec((prevState) => {
      const updatedSpec = prevState.map((item) => {
        if (item.id === id) {
          switch (item.type) {
            case "Text Field":
            case "Yes/No":
            case "Date and Time":
            case "dropdown":
            case "Radio Button":
              return { ...item, [field]: value };

            case "Multi-selection":
              const updatedValues = item.value?.includes(value)
                ? item.value.filter((val) => val !== value)
                : [...(item.value || []), value];
              return { ...item, [field]: updatedValues };

            default:
              return item;
          }
        }
        return item;
      });
      dispatch(setCustomSpecReduxState(updatedSpec))
      return updatedSpec;
    });
  };

  return (
    <>
      {customSpec?.length > 0 && (
        <ContentDescriptionHeader>
          <Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Specifications List
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                color: "rgba(0, 0, 0, 0.87)",
              }}
            >
              Create your own custom specifications or choose from our suggested
              options for this category. Ensure clarity and consistency by using
              precise wording and proper capitalization.
            </Typography>
          </Box>
          {/* Start Attributes List New design */}
          <AttributeListSection>
            <AttributeListInn>
              <form>
                {customSpec?.length > 0 &&
                  customSpec?.map((item, index) => {
                    let filteredOptions = [];
                    if (item?.type == "dropdown") {
                      filteredOptions = JSON.parse(item?.options).filter(
                        (option) => {
                          return option != null;
                        }
                      );
                    }
                    return (
                      <>
                        <Grid container spacing={1}>
                          {/*** for text field design    */}
                          {item?.type == "Text Field" && (
                            <Grid item xs={12} sm={12} md={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2.5}>
                                  {/* <AttributLabel>Rated Voltage</AttributLabel> */}
                                  <AttributLabel>{item?.title}</AttributLabel>
                                </Grid>
                                <Grid item xs={10} sm={10} md={4} lg={4}>
                                  <ForMiddleSpace>
                                    <TextField
                                      fullWidth
                                      type="text"
                                      variant="outlined"
                                      size="small"
                                      value={item?.value || ""}
                                      onChange={(e) => {
                                        setCustomSpecError({
                                          error: false,
                                          errorMsg: "",
                                        });
                                        let inputValue = e.target.value;
                                        const { min_range, max_range } = item;
                                        if (
                                          min_range &&
                                          inputValue?.length < min_range
                                        ) {
                                          setCustomSpecError({
                                            error: true,
                                            errorMsg: `please enter more than ${min_range} charater.`,
                                          });
                                          return;
                                        }

                                        if (
                                          max_range &&
                                          inputValue?.length > max_range
                                        ) {
                                          setCustomSpecError({
                                            error: true,
                                            errorMsg: `Maximum character limit exceeded.`,
                                          });
                                          return;
                                        }
                                        // if (
                                        //   item?.validations &&
                                        //   item?.validations.toLowerCase() ===
                                        //     "alphabet"
                                        // ) {
                                        //   if (!/^[A-Za-z]*$/.test(inputValue)) {
                                        //     setCustomSpecError({
                                        //       error: true,
                                        //       errorMsg:
                                        //         "Only alphabets are allowed.",
                                        //     });
                                        //     return;
                                        //   }
                                        // }

                                        if (
                                          item?.validations &&
                                          item?.validations.toLowerCase() ===
                                            "integer"
                                        ) {
                                          if (
                                            inputValue === "" ||
                                            /^\d+$/.test(inputValue)
                                          ) {
                                            setCustomSpecError({
                                              error: false,
                                              errorMsg: "",
                                            });
                                          } else {
                                            setCustomSpecError({
                                              error: true,
                                              errorMsg:
                                                "Only integer values are allowed.",
                                            });
                                            return;
                                          }
                                        } else if (
                                          item?.validations &&
                                          item?.validations.toLowerCase() ===
                                            "decimal"
                                        ) {
                                          if (!/^\d*\.?\d*$/.test(inputValue)) {
                                            setCustomSpecError({
                                              error: true,
                                              errorMsg:
                                                "Please enter a valid decimal number.",
                                            });
                                            return;
                                          }
                                        } else if (
                                          item?.validations &&
                                          item?.validations.toLowerCase() ===
                                            "numeric"
                                        ) {
                                          if (!/^\d*\.?\d*$/.test(inputValue)) {
                                            setCustomSpecError({
                                              error: true,
                                              errorMsg:
                                                "Please enter a valid numeric value.",
                                            });
                                            return;
                                          }
                                        } else if (
                                          item?.validations &&
                                          item?.validations.toLowerCase() ===
                                            "string"
                                        ) {
                                        } else {
                                        }
                                        handleSpecChange(
                                          item.id,
                                          "value",
                                          inputValue
                                        );
                                      }}
                                    />
                                  </ForMiddleSpace>
                                </Grid>
                                <Grid item xs={2} sm={2} md={4} lg={3}>
                                  <UnitText>
                                    {item?.unit_name &&
                                      FirstletterCapital(item?.unit_name)}
                                  </UnitText>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/** text field design end here */}

                          {/** for date design */}
                          {item?.type == "Date and Time" && (
                            <Grid item xs={12} sm={12} md={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2.5}>
                                  <AttributLabel>{item?.title}</AttributLabel>
                                </Grid>
                                <Grid item xs={12} sm={10} md={4} lg={4}>
                                  <AttributeDatepicker>
                                    <ForMiddleSpace>
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DatePicker
                                          slotProps={{
                                            textField: { size: "small" },
                                          }}
                                          minDate={
                                            item?.date_validation &&
                                            item?.date_validation ===
                                              "Future Date"
                                              ? dayjs()
                                              : null
                                          }
                                          maxDate={
                                            item?.date_validation &&
                                            item?.date_validation ===
                                              "Past Date"
                                              ? dayjs()
                                              : null
                                          }
                                          value={
                                            item?.value
                                              ? dayjs(item.value)
                                              : null
                                          }
                                          onChange={
                                            (newValue) => {
                                              setCustomSpecError({
                                                error: false,
                                                errorMsg: "",
                                              });
                                              handleSpecChange(
                                                item.id,
                                                "value",
                                                newValue
                                              );
                                            } // Use customSpecList.id
                                          }
                                        />
                                      </LocalizationProvider>
                                    </ForMiddleSpace>
                                  </AttributeDatepicker>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/** date design ends here */}

                          {/** yes/no toggle design */}
                          {item?.type == "Yes/No" && (
                            <Grid item xs={12} sm={12} md={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2.5}>
                                  <AttributLabel>{item?.title}</AttributLabel>
                                </Grid>
                                <Grid item xs={12} sm={10} md={4} lg={4}>
                                  <AttributeToggle>
                                    <ForMiddleSpace>
                                      <ToggleButtonGroup
                                        color="primary"
                                        size="small"
                                        value={item?.value || ""}
                                        exclusive
                                        onChange={(e, newValue) => {
                                          setCustomSpecError({
                                            error: false,
                                            errorMsg: "",
                                          });
                                          handleSpecChange(
                                            item.id,
                                            "value",
                                            newValue
                                          );
                                        }}
                                        aria-label="Platform"
                                      >
                                        {["yes", "no"]?.map((option, index) => {
                                          return (
                                            <ToggleButton
                                              key={index}
                                              value={option}
                                            >
                                              {option}
                                            </ToggleButton>
                                          );
                                        })}
                                      </ToggleButtonGroup>
                                    </ForMiddleSpace>
                                  </AttributeToggle>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/**yes/no design ends here */}

                          {/**multiselection design starts here */}
                          {item?.type == "Multi-selection" && (
                            <Grid item xs={12} sm={12} md={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2.5}>
                                  <AttributLabel>{item?.title}</AttributLabel>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={9.5}>
                                  <ForMiddleSpace>
                                    <AttributesAplication>
                                      {JSON.parse(item?.options)?.map(
                                        (option, idx) => {
                                          const label = option || "";
                                          if (!label) return null;
                                          return (
                                            <span key={idx}>
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    checked={
                                                      item?.value?.some(
                                                        (item, index) => {
                                                          return (
                                                            item === option
                                                          );
                                                        }
                                                      ) || false
                                                    }
                                                    onChange={(e) => {
                                                      const validCheckValue = [
                                                        ...(item?.value || []),
                                                      ];
                                                      const {
                                                        max_range,
                                                        min_range,
                                                      } = item;
                                                      const option =
                                                        e.target.value;
                                                      const isChecked =
                                                        e.target.checked;

                                                      if (isChecked) {
                                                        validCheckValue.push(
                                                          option
                                                        );
                                                      } else {
                                                        const index =
                                                          validCheckValue.indexOf(
                                                            option
                                                          );
                                                        if (index > -1) {
                                                          validCheckValue.splice(
                                                            index,
                                                            1
                                                          );
                                                        }
                                                      }

                                                      if (
                                                        min_range &&
                                                        validCheckValue.length <
                                                          min_range
                                                      ) {
                                                        setCustomSpecError({
                                                          error: true,
                                                          errorMsg: `Please select at least ${min_range} values.`,
                                                        });
                                                      } else if (
                                                        max_range &&
                                                        validCheckValue.length >
                                                          max_range
                                                      ) {
                                                        setCustomSpecError({
                                                          error: true,
                                                          errorMsg: `Only ${max_range} selections are allowed.`,
                                                        });
                                                      } else {
                                                        setCustomSpecError({
                                                          error: false,
                                                          errorMsg: "",
                                                        });
                                                      }

                                                      handleSpecChange(
                                                        item.id,
                                                        "value",
                                                        option
                                                      );
                                                    }}
                                                    name={option}
                                                  />
                                                }
                                                label={
                                                  <>
                                                    {option}{" "}
                                                    {item?.unit_name &&
                                                      FirstletterCapital(
                                                        item?.unit_name
                                                      )}
                                                  </>
                                                }
                                                value={option}
                                              />
                                            </span>
                                          );
                                        }
                                      )}
                                    </AttributesAplication>
                                  </ForMiddleSpace>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/** multiselection design ends here*/}

                          {/* dropdown design starts here */}
                          {item?.type == "dropdown" && (
                            <Grid item xs={12} sm={12} md={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2.5}>
                                  <AttributLabel>{item?.title}</AttributLabel>
                                </Grid>
                                <Grid item xs={12} sm={10} md={4} lg={4}>
                                  <ForMiddleSpace>
                                    <FormControl fullWidth size="small">
                                      <Select
                                        // defaultValue="Choose value"
                                        placeholder="Please select value"
                                        value={item?.value || ""}
                                        displayEmpty
                                        onChange={(e) => {
                                          setCustomSpecError({
                                            error: false,
                                            errorMsg: "",
                                          });
                                          handleSpecChange(
                                            item.id,
                                            "value",
                                            e.target.value
                                          );
                                        }}
                                      >
                                        <MenuItem value="" disabled>
                                          Please select value
                                        </MenuItem>
                                        {filteredOptions?.map(
                                          (option, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={option}
                                              >
                                                {option}
                                              </MenuItem>
                                            );
                                          }
                                        )}
                                      </Select>
                                    </FormControl>
                                  </ForMiddleSpace>
                                </Grid>
                                <Grid item xs={2} sm={2} md={4} lg={3}>
                                  <Box sx={{ margin: "6px 0 0 0 " }}>
                                    {item?.unit_name &&
                                      FirstletterCapital(item?.unit_name)}
                                  </Box>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/* dropdown design ends here */}

                          {/* radio button design starts here */}
                          {item?.type == "Radio Button" && (
                            <Grid item xs={12} sm={10} md={12}>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={2.5}>
                                  <AttributLabel>{item?.title}</AttributLabel>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={4}>
                                  <ForMiddleSpace>
                                    <SectionOperatingVoltage>
                                      <FormControl component="fieldset">
                                        <RadioGroup
                                          row
                                          value={item?.value || ""}
                                          onChange={(e) => {
                                            setCustomSpecError({
                                              error: false,
                                              errorMsg: "",
                                            });
                                            handleSpecChange(
                                              item.id,
                                              "value",
                                              e.target.value
                                            );
                                          }}
                                        >
                                          {JSON.parse(item?.options)?.map(
                                            (option, index) => {
                                              return (
                                                <FormControlLabel
                                                  key={index}
                                                  value={option}
                                                  control={<Radio />}
                                                  label={option}
                                                />
                                              );
                                            }
                                          )}
                                        </RadioGroup>
                                      </FormControl>
                                    </SectionOperatingVoltage>
                                  </ForMiddleSpace>
                                </Grid>
                              </Grid>
                            </Grid>
                          )}
                          {/* radio button design ends here */}
                        </Grid>
                      </>
                    );
                  })}
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={2.5}
                    sx={{
                      "@media screen and (max-width:900px)": {
                        display: "none",
                      },
                    }}
                  ></Grid>
                  <Grid item xs={12} sm={12} md={8} lg={9}>
                    {customSpecError?.error && (
                      <CommonErrorMessage message={customSpecError?.errorMsg} />
                    )}
                  </Grid>
                </Grid>
              </form>
            </AttributeListInn>
          </AttributeListSection>
        </ContentDescriptionHeader>
      )}
      <form
        onSubmit={specificationFormik.handleSubmit}
        style={{ width: "100%" }}
      >
        <AttributesWrapper sx={{ width: "100%" }}>
          <Box sx={{ clear: "both" }}></Box>
          <Box
            sx={{ /*borderTop: "1px solid #dddddd",*/ margin: "0px 0 0 0 " }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // padding: "12px 0 0 0",
                margin: "0px 0 0 0",
              }}
            >
              <Box sx={{ width: "350px" }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#231f20",
                    margin: "0 0 10px 0",
                  }}
                >
                  Add More Specification
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="specifications"
                  value={newAttributeValue}
                  label={
                    <>
                      Specification{" "}
                      <LightTooltip
                        arrow
                        title="Define Product Attributes, Features, Characteristics or Parameters"
                        disableInteractive
                        placement="top-start"
                      >
                        <Box component="span" sx={{ padding: "0 0 0 10px" }}>
                          <img src="/assets/helpIcon.svg" alt="" />
                        </Box>
                      </LightTooltip>
                    </>
                  }
                  style={{}}
                  // required
                  inputProps={{
                    autoComplete: "off",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoFocus
                  sx={{
                    display: "block",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#000",
                      },
                    },
                    "& .MuiInputBase-root": {},
                  }}
                  disabled={localLoading}
                  placeholder="Add New Specification"
                  onChange={(e) => {
                    if (e?.target?.value.length > textLimit) {
                      setInputFieldError((prev) => ({
                        ...prev,
                        lengthError: true,
                        errorText: textLimitErrorMessage,
                      }));
                      return;
                    }
                    newSpecificationHandler(e);

                    setInputFieldError((prev) => ({
                      ...prev,
                      lengthError: false,
                      errorText: "",
                    }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      e.preventDefault();
                      addNewAttribute();
                    }
                  }}
                />

                {(inputFieldError?.lengthError ||
                  inputFieldError?.isEmptyError) && (
                  <CommonErrorMessage message={inputFieldError?.errorText} />
                )}

                {error && !customSpec.length && (
                  <CommonErrorMessage
                    message={
                      " Please enter a unique value for the specification."
                    }
                  />
                )}
              </Box>
              <Box sx={{ margin: "50px 0 0" }}>
                {localLoading && (
                  <CircularProgress
                    style={{
                      color: "#DD484E",
                      width: "22px",
                      height: "22px",
                      marginLeft: "8px",
                    }}
                  ></CircularProgress>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#4a4a4a",
                opacity: ".8",
              }}
            >
              Please press the Enter key after typing each specification.
            </Typography>
          </Box>
          <Box sx={{ clear: "both" }}></Box>
        </AttributesWrapper>

        <div className={poststyle.specific_list}>
          {choice_options.length > 0 &&
            choice_options
              ?.filter((element) => element?.selected)
              .map((element, index) => {
                return (
                  <>
                    <EditAttributePlaceholder
                      key={index}
                      formik={specificationFormik}
                      index={index}
                      DeleteAttribute={DeleteAttribute}
                      data={element}
                      editChoice={editChoiceAndUpdateSpecList}
                      specifcationTerm={element?.options || []}
                      handleAttributeValueChange={(id, value) => {
                        setFormikError(index);
                        onChangeHandler(id, value);
                      }}
                    />
                  </>
                );
              })}
        </div>
        <ButtonCol>
          <Button
            color="error"
            variant="outlined"
            size="small"
            style={{
              textTransform: "none",
              minWidth: "90px",
              height: "30.75px",
            }}
            type="submit"
          >
            {buttonLoader ? (
              <ThreeDots
                height="14"
                width="107"
                radius="5"
                color="#d32f2f"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            ) : (
              " Save & Continue"
            )}
            <ArrowForwardIosIcon
              style={{ fontSize: "15px", marginLeft: "4px" }}
            ></ArrowForwardIosIcon>
          </Button>
        </ButtonCol>
      </form>
    </>
  );
};

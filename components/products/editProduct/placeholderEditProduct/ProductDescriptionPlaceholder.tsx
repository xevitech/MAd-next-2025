import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useEffect, useRef, useState } from "react";
import { EditableTextField } from "@/components/products/common/editableTextField";
import poststyle from "../style.module.css";
import useAppContext from "@/hooks/useAppContext";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import KeywordRatingPage from "../productDescription/KeywordRating";

// import {
// AttributeCheckChipBox,
// AttributeRedCheck,
// ProductAppUseTitle,
// ProductContentContainer,
// ProductDesApplicationAndUseCases,
// ProductDescriptionInput,
// ProductDescriptionInputFull,
// ProductSelctionDropdown,
// AttributeTooltipBox,
// } from "";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { EditableTextField } from '@/components/common/editableTextField';
// import useProductContext from "@/hooks/useProductContext";
import { FileUpload } from "@/components/common/uploadFile";
import ClearIcon from "@mui/icons-material/Clear";

import {
  apiClient,
  configProductScoreValues,
  fileTypeMessage,
  fileTypesAllowed,
  getProductId,
  getUniqueListBy,
  productScoreValues,
} from "@/components/common/common";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import AddMetaKeyboard from "../rightStaticContent/addMetaKeyboard/AddMetaKeyboard";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { TextFieldHelperText } from "../styles";
import SelectableAndEditableField from "@/components/common/SelectDropDownwithInput";
import { CustomTextField } from "@/components/common/customTextField";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { BASE_URL, EDITOR_API_KEY } from "@/utils/staticValues";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { setCategoryMetaData } from "@/hooks/CategoryReducer";
import { useAppDispatch } from "redux/store";
import { ButtonCol } from "../productCategories/styles";
import EditProductFormik from "@/hooks/useEditProductFormik";
import Auth from "@/auth/Auth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  CheckBoxOutlineBlank,
  CheckBox,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";

import { toast } from "react-toastify";
import {
  ProductContentContainer,
  AttributeCheckChipBox,
  AttributeRedCheck,
  ProductAppUseTitle,
  ProductDesApplicationAndUseCases,
  ProductDescriptionInput,
  ProductDescriptionInputFull,
  ProductSelctionDropdown,
  AttributeTooltipBox,
} from "../productDescription/styles";
import { ManualKeywordChip } from "../productDescription/KeywordRating/style";
import { FileUploadProductDescriptionPlaceholder } from "./FileUploadProductDescriptionPlaceholder";
////// product Use new design Files ////
// Icons for the checkbox
const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;
interface FilmOption {
  title: string;
  year?: number; // Make year optional
}

const top100Films: FilmOption[] = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  // Add more predefined options...
];
export const ProductDescriptionPlaceholder = ({
  setInformationBlock,
  HandlePercentage,
  setCompletedFields,
  setAccordianValue,
  // productDetail,
  // productDetail,
  setPublished,
  category_lists,
  setProductDetail,
  // selectedKeywords,
  // setSelectedKeywords,
  // suggestedKeywords,
  // setSuggestedKeywords,
  // fetchKeywords,
  productApplicationOptions,
  setProductApplicationOptions,
  productUseCaseOptions,
  setProductUseCaseOptions,
  fetchProductApplicationAndCasesList,
  FetchProductDetail,
  percentage,
  accordionValue = "",
}) => {
  // const { preTitle, productName, aboutProduct, formik } = useProductContext();
  const { formik } = EditProductFormik();
  const { meta_data } = useSelector((state: any) => state.categoryDetail);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [descriptionLimit, setDescriptionLimit] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [descriptionDetail, setDescriptionDetail] = useState<any>(null);
  const [docError, setDocError] = useState({
    error: false,
    errorMsg: "",
  });
  const { productDetail } = useSelector((state: any) => state.editProduct);

  // const [productApplicationOptions, setProductApplicationOptions] =
  //   useState<any>([]);
  // const [productUseCaseOptions, setProductUseCaseOptions] = useState<any>([]);
  const productId: string = getProductId();
  const { breakPoints } = useAppContext();
  const [isDisabledProd, setIsDisabledProd] = useState(false);
  const [isDisabledCase, setIsDisabledCase] = useState(false);
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const SignupSchema = Yup.object().shape({
    pre_title_name: Yup.string().max(100, "Max Characters Limit Reached!"),
    name: Yup.string()
      .required("Please enter product title")
      .max(180, "Max Characters Limit Reached!"),
    description: Yup.string().required("Please enter product description"),

    product_applications: Yup.array()
      .min(1, "Please select or enter atleast one Product application")
      .required("Please select or enter atleast one Product application"),
    product_use_cases: Yup.array()
      .min(1, "Please select or enter atleast one Product Use Case")
      .required("Please select or enter atleast one Product Use Case"),
    stock_keeping_unit: Yup.string().required(
      "Please enter Stock Keeping Unit(SKU)"
    ),
    target_industry: Yup.string().required("Please select Target Industry."),
    selectedKeywords: Yup.array()
      .min(
        1,
        "Please Select or enter altleast one Keyword related to your product"
      )
      .required(
        "Please Select or enter altleast one Keyword related to your product"
      ),
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (productDetail.meta_keyword == null) dispatch(setCategoryMetaData(""));
  }, []);

  //changes here
  // useEffect(() => {
  //   if (Object.keys(productDetail).length > 0 && !descriptionDetail) {
  //     setDescriptionDetail(productDetail);
  //   }
  // }, [productDetail, category_lists]);

  const descriptionFormik: any = useFormik({
    validationSchema: SignupSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      pre_title_name: productDetail?.pre_title_name
        ? productDetail?.pre_title_name
        : "",
      name: productDetail?.name ? productDetail?.name : "",
      description: productDetail?.description ?? "",
      upload_files: productDetail?.upload_files ?? [],
      meta_keyword: productDetail?.meta_keyword
        ? getUniqueListBy([
            ...productDetail?.meta_keyword?.split(",").filter((v) => v),
            ...meta_data?.split(",").filter((v) => v),
          ])
        : getUniqueListBy([...meta_data?.split(",").filter((v) => v)]),
      target_industry: productDetail?.target_industry ?? "",
      stock_keeping_unit: productDetail?.stock_keeping_unit ?? "",
      product_applications:
        productDetail?.product_applications?.length > 0
          ? productDetail?.product_applications
          : [],
      product_use_cases:
        productDetail?.product_use_cases?.length > 0
          ? productDetail?.product_use_cases
          : [],
      selectedKeywords: [],
    },
    onSubmit: async (values) => {
      setPublished("");
      const {
        name,
        pre_title_name,
        description,
        meta_keyword,
        target_industry,
        stock_keeping_unit,
        product_applications,
        product_use_cases,
        upload_files,
      }: any = values;

      if (descriptionLimit) {
        descriptionFormik.setFieldError(
          "description",
          "Max Characters Limit Reached!"
        );
        return;
      }
      setButtonLoader(true);
      const uploadedFilesData = await UploadFiles(
        descriptionFormik?.values?.upload_files
      );
      descriptionFormik.setFieldValue(
        "upload_files",
        uploadedFilesData?.files?.length > 0
          ? uploadedFilesData?.files
          : descriptionFormik?.values?.upload_files
      );
      let formData = new FormData();
      formData.append("id", productId);
      formData.append("percentage", percentageValue);
      formData.append("last_update", "Product Description");
      formData.append("name", name.trim() || "");
      formData.append("pre_title_name", pre_title_name.trim() || "");
      descriptionFormik.setFieldValue("pre_title_name", pre_title_name.trim());
      descriptionFormik.setFieldValue("name", name.trim());
      formData.append(
        "description",
        descriptionFormik.values.description
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ") || ""
      );
      formData.append("published", "0");
      formData.append("target_industry", target_industry);
      formData.append("stock_keeping_unit", stock_keeping_unit);
      if (product_applications?.length > 0) {
        const ids = product_applications.map((item) => item?.id);
        formData.append("product_applications", ids?.join(","));
      }
      if (product_use_cases?.length > 0) {
        const ids = product_use_cases.map((item) => item?.id);
        formData.append("product_use_cases", ids?.join(","));
      }
      formData.append("meta_keyword", meta_keyword);

      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true,
        true
      );
      if (response?.status == 200) {
        await FetchProductDetail();
        setDocError({
          error: false,
          errorMsg: "",
        });
        await fetchKeywords();
        setInformationBlock({ disable: false, expanded: true });
        setAccordianValue("information");
        setCompletedFields((prev) => ({ ...prev, description: true }));
      } else if (response?.status == 422) {
        descriptionFormik.setFieldError("stock_keeping_unit", response?.error);
      }

      setButtonLoader(false);
    },
  });

  // useEffect(() => {
  //   if (
  //     descriptionFormik?.values?.upload_files.length == 0 &&
  //     (productDetail?.upload_files?.length == 0 ||
  //       productDetail?.upload_files == null)
  //   ) {
  //     setCompletedFields((prev) => ({ ...prev, description: false }));
  //   } else if (
  //     descriptionFormik?.values?.upload_files.length > 0 &&
  //     productDetail?.upload_files?.length > 0
  //   ) {
  //     setCompletedFields((prev) => ({ ...prev, description: true }));
  //   }
  // }, [descriptionFormik?.values?.upload_files, productDetail]);

  const UploadFiles = async (upload_files) => {
    let formData = new FormData();
    if (Array.isArray(upload_files)) {
      let files = upload_files?.filter((v) => !v.id);
      if (files.length > 0) {
        formData.append("product_id", productId);
        formData.append("remove_all", "false");

        for (let i = 0; i < files.length; i++) {
          if (files[i]?.id) {
            continue;
          }
          formData.append("files[]", files[i]);
        }
        let response = await apiClient(
          "product/datasheets/upload",
          "post",
          { body: formData },
          true
        );

        return response;
      }
    }
  };

  const { pre_title_name, name, description, upload_files, meta_keyword } =
    descriptionFormik.values;

  // useEffect(() => {
  //   if (
  //     (productDetail?.name === "" || productDetail?.description?.length <= 0) &&
  //     isMount
  //   ) {
  //     setCompletedFields((prev) => ({ ...prev, description: false }));
  //     setIsMount(false);
  //   }
  // }, [productDetail, isMount]);

  useEffect(() => {
    const {
      name,
      description,
      meta_keyword,
      product_use_cases,
      stock_keeping_unit,
      target_industry,
      product_applications,
    } = productDetail;
    if (
      name &&
      description &&
      !isMount &&
      product_use_cases?.length > 0 &&
      product_applications?.length > 0 &&
      target_industry &&
      stock_keeping_unit &&
      descriptionFormik?.values?.selectedKeywords?.length > 0
    ) {
      setInformationBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, description: true }));
      setIsMount(true);
    }
  }, [productDetail, descriptionFormik?.values?.selectedKeywords]);

  const { availability } = formik.values;
  const product_type = productDetail?.product_type;
  const {
    product_applications,
    product_use_cases,
    target_industry,
    stock_keeping_unit,
    selectedKeywords,
  } = descriptionFormik?.values;
  useEffect(() => {
    if (product_type === "simple") {
      const {
        title,
        subtitle,
        aboutThisProduct,
        productKeyword,
        uploadDatasheet,
        targetIndustry,
        SKU,
        productApplication,
        productUseCases,
      } = productScoreValues?.productDescription;

      HandlePercentage("product_description_title", name ? 0 : 0);
      // if (availability === "by_order") {
      HandlePercentage("product_description_subtitle", pre_title_name ? 1 : 0);
      HandlePercentage(
        "product_description_about",
        description ? 1.795332136 : 0
      );
      HandlePercentage(
        "product_description_product_application",
        product_applications?.length > 0 ? 2.795332136 : 0
      );
      HandlePercentage(
        "product_description_product_use_cases",
        product_use_cases?.length > 0 ? 2.795332136 : 0
      );
      HandlePercentage(
        "product_description_keywords",
        selectedKeywords?.length > 0 ? 1.795332136 : 0
      );
      HandlePercentage(
        "product_description_upload_files",
        upload_files?.length > 0 ? 1.795332136 : 0
      );
      HandlePercentage(
        "product_description_target_industuries",
        target_industry ? 1.795332136 : 0
      );
      HandlePercentage(
        "product_description_sku",
        stock_keeping_unit ? 1.795332136 : 0
      );
      // } else {
      // HandlePercentage("product_description_description", description ? 3 : 0);
      // HandlePercentage("upload_files", upload_files.length > 0 ? 7 : 0);
      // }
      // } else {
      // if (availability === "by_order") {
      // HandlePercentage("product_description_name", name ? 10 : 0);
      // HandlePercentage("description", description ? 5 : 0);
      // HandlePercentage("upload_files", upload_files.length > 0 ? 16 : 0);
      // }
      // if (availability === "in_stock") {
      // HandlePercentage("product_description_name", name ? 10 : 0);
      // HandlePercentage("product_description_description", description ? 4 : 0);
      // HandlePercentage(
      //   "product_description_upload_files",
      //   upload_files.length > 0 ? 17 : 0
      // );
      // }
    } else if (product_type == "configured") {
      const {
        title,
        subtitle,
        aboutThisProduct,
        productKeyword,
        uploadDatasheet,
        targetIndustry,
        SKU,
        productApplication,
        productUseCases,
      } = configProductScoreValues?.productDescription;

      HandlePercentage("config_product_description_title", name ? title : 0);
      // if (availability === "by_order") {
      HandlePercentage(
        "config_product_description_subtitle",
        pre_title_name ? subtitle : 0
      );
      HandlePercentage(
        "config_product_description_about",
        description ? aboutThisProduct : 0
      );
      HandlePercentage(
        "config_product_description_product_application",
        product_applications?.length > 0 ? productApplication : 0
      );
      HandlePercentage(
        "config_product_description_product_use_cases",
        product_use_cases?.length > 0 ? productUseCases : 0
      );
      HandlePercentage(
        "config_product_description_keywords",
        selectedKeywords?.length > 0 ? productKeyword : 0
      );
      HandlePercentage(
        "config_product_description_upload_files",
        upload_files?.length > 0 ? uploadDatasheet : 0
      );
      HandlePercentage(
        "config_product_description_target_industuries",
        target_industry ? targetIndustry : 0
      );
      HandlePercentage(
        "config_product_description_sku",
        stock_keeping_unit ? SKU : 0
      );
    }
  }, [
    pre_title_name,
    name,
    description,
    upload_files,
    product_type,
    product_use_cases,
    product_applications,
    selectedKeywords,
    target_industry,
    stock_keeping_unit,
  ]);

  const editoRef = useRef();
  const industrytarget = [
    "Utilities",
    "Industrial Manufacturing Facilities",
    "Oil and Gas Companies",
    "Engineering Firms",
    "Water Treatment Plants",
    "Construction Companies",
    "Government Agencies",
    "Institutional Facilities",
    "Commercial Buildings",
    "Residential Complexes",
  ];

  const product_id = getProductId();

  const handleManualInputAPI = async (value, type) => {
    const formData = new FormData();
    formData.append("id", product_id);
    if (type == "product_applications") {
      formData.append("name", value);
      const response = await fetch(
        `${BASE_URL}/product-application/add-product-application`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${Auth?.token()}`,
          },
          body: formData,
        }
      );
      if (response?.ok) {
        const responseData = await response.json();
        if (responseData?.errors) {
          toast?.error(responseData?.errors?.name[0]);
          return null;
        } else {
          return responseData?.data;
        }
      }
    }

    if (type == "product_use_cases") {
      formData.append("name", value);
      const response = await fetch(
        `${BASE_URL}/product-application/add-product-use-case`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${Auth?.token()}`,
          },
          body: formData,
        }
      );
      if (response?.ok) {
        const responseData = await response.json();
        if (responseData?.errors) {
          toast?.error(responseData?.errors?.name[0]);
          return null;
        } else {
          return responseData?.data;
        }
      }
    }
  };

  const handleRating = async (value, rating, type) => {
    const formData = new FormData();
    formData.append("product_id", product_id);
    if (type == "product_applications") {
      formData.append("product_application_id", value?.id);
      formData.append("rating", rating);
      const response = await fetch(
        `${BASE_URL}/product-application/productApplicationRating`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${Auth?.token()}`,
          },
          body: formData,
        }
      );
      if (response?.ok) {
        const responseData = await response.json();
        if (responseData?.errors) {
          toast?.error(responseData?.errors?.name[0]);
          return null;
        } else {
          let product_applicationsClone = [...product_applications];
          const updatedApplicationState = product_applicationsClone.map(
            (application) => {
              if (application?.id == value?.id) {
                return { ...application, rating: rating };
              }
              return application;
            }
          );

          descriptionFormik.setFieldValue(
            "product_applications",
            updatedApplicationState
          );

          return responseData?.data;
        }
      }
    }

    if (type == "product_use_cases") {
      formData.append("product_usecase_id", value?.id);
      formData.append("rating", rating);
      const response = await fetch(
        `${BASE_URL}/product-application/productUseCaseRating`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${Auth?.token()}`,
          },
          body: formData,
        }
      );
      if (response?.ok) {
        const responseData = await response.json();
        if (responseData?.errors) {
          toast?.error(responseData?.errors?.name[0]);
          return null;
        } else {
          let product_useCasesClone = [...product_use_cases];
          const updatedUseCaseState = product_useCasesClone.map((useCase) => {
            if (useCase?.id == value?.id) {
              return { ...useCase, rating: rating };
            }
            return useCase;
          });

          descriptionFormik.setFieldValue(
            "product_use_cases",
            updatedUseCaseState
          );
          return responseData?.data;
        }
      }
    }
  };

  useEffect(() => {
    fetchProductApplicationAndCasesList();
  }, [JSON.stringify(category_lists)]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClear = () => {
    descriptionFormik.setFieldValue("target_industry", "");
    descriptionFormik.setFieldError("target_industry", "");
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customChip, setCustomChip] = useState("");

  const handleToggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  function getRating(option) {
    // Replace this logic with your actual rating logic
    return Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5
  }
  // const getChipTextColor = (rating: number): string => {
  //   switch (rating) {
  //     case 1:
  //       return "#d7282f"; // Red
  //     case 2:
  //       return "#FFA700"; // Orange
  //     case 3:
  //       return "#F2E803"; // Yellow
  //     case 4:
  //       return "#92E203"; // Light Green
  //     case 5:
  //       return "#2CBA00"; // Green
  //     default:
  //       return "inherit"; // Default text color
  //   }
  // };
  const getChipTextColor = (rating: number) => {
    if (rating >= 0.1 && rating <= 1) return "#d7282f";
    if (rating >= 1.1 && rating <= 2) return "#FFA700";
    if (rating >= 2.1 && rating <= 3) return "#F2E803";
    if (rating >= 3.1 && rating <= 4) return "#92E203";
    if (rating >= 4.1 && rating <= 5) return "#2CBA00";
    return "black"; // Default color if no rating matches
  };
  const capitalizeWords = (str) => {
    let charLimit = 50;

    if (window.innerWidth >= 280 && window.innerWidth <= 320) {
      charLimit = 12;
    } else if (window.innerWidth >= 320 && window.innerWidth <= 480) {
      charLimit = 21;
    }

    let formattedStr = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formattedStr.length > charLimit
      ? formattedStr.slice(0, charLimit) + "..."
      : formattedStr;
  };

  const handleKeyDownUseCases: any = async (event: any) => {
    const inputElement = event.target as HTMLInputElement;
    if (event.key !== "Enter") return;

    event.preventDefault();
    const inputValue = inputElement.value.trim();
    const trimmedValue = inputValue?.trim();
    if (!trimmedValue) return;

    const isPredefined = productUseCaseOptions.some(
      (option) => option.name.toLowerCase() === trimmedValue.toLowerCase()
    );
    const isExist = descriptionFormik.values.product_use_cases.some(
      (option) => option.name.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isExist) {
      toast.error("Product Use Case already exists");
      return;
    }

    if (!isPredefined) {
      try {
        setIsDisabledCase(true);
        const response = await handleManualInputAPI(
          trimmedValue,
          "product_use_cases"
        );
        if (response) {
          const { id, name, rating = 0 } = response;
          descriptionFormik.setFieldValue("product_use_cases", [
            ...descriptionFormik.values.product_use_cases,
            { id, name, rating },
          ]);
        }
      } catch (error) {
        toast.error("Failed to add Product Use Case. Please try again.");
      } finally {
        setIsDisabledCase(false);
      }
    }
  };

  const handleKeyDownApplications: any = async (event: any) => {
    const inputElement = event.target as HTMLInputElement;
    if (event.key !== "Enter") return;

    event.preventDefault();
    const inputValue = inputElement.value.trim();
    const trimmedValue = inputValue?.trim();
    if (!trimmedValue) return;

    const isPredefined = productApplicationOptions.some(
      (option) => option.name.toLowerCase() === trimmedValue.toLowerCase()
    );
    const isExist = descriptionFormik.values.product_applications.some(
      (option) => option.name.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (isExist) {
      toast.error("Product Application already exists");
      return;
    }

    if (!isPredefined) {
      try {
        setIsDisabledProd(true);
        const response = await handleManualInputAPI(
          trimmedValue,
          "product_applications"
        );
        if (response) {
          const { id, name, rating = 0 } = response;
          descriptionFormik.setFieldValue("product_applications", [
            ...descriptionFormik.values.product_applications,
            { id, name, rating },
          ]);
        }
      } catch (error) {
        toast.error("Failed to add product application. Please try again.");
      } finally {
        setIsDisabledProd(false);
      }
    }
  };

  const getUniqueByName = (data) => {
    const map = new Map();
    return data.filter((item) => {
      if (!map.has(item.name)) {
        map.set(item.name, true);
        return true;
      }
      return false;
    });
  };

  const fetchKeywords = async () => {
    if (category_lists?.lenght == 0) {
      return;
    }
    let category_id = category_lists?.map((ele) => ele?.id);
    if (category_id?.length == 0) {
      return;
    }
    const response = await fetch(
      `${BASE_URL}/keywords/keyword-list?product_id=${product_id}&category_id=${category_id?.join(
        ","
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Auth.token()}`,
        },
        // body:JSON.stringify({product_id: product_id}),
      }
    );
    if (response?.ok) {
      const responseData = await response.json();
      // setSuggestedKeywords(responseData?.data?.suggested_keywords);
      // const suggestedKeywords = getUniqueByName(responseData?.data?.suggested_keywords);
      // setSuggestedKeywords(suggestedKeywords);
      // setSelectedKeywords(responseData?.data?.product_keywords);
      descriptionFormik.setFieldValue(
        "selectedKeywords",
        responseData?.data?.product_keywords
      );
      descriptionFormik?.setFieldError("selectedKeywords", "");
      try {
        localStorage.setItem(
          "product_keyword",
          JSON.stringify(responseData?.data?.product_keywords)
        );
      } catch (error) {
        console.error("something went wrong", error);
      }
    }
  };

  useEffect(() => {
    const updateKeywords = () => {
      const storedKeywords = localStorage.getItem("product_keyword");
      descriptionFormik.setFieldValue(
        "selectedKeywords",
        storedKeywords ? JSON.parse(storedKeywords) : []
      );
    };

    updateKeywords();

    window.addEventListener("storage", updateKeywords);
    return () => window.removeEventListener("storage", updateKeywords);
  }, []);

  useEffect(() => {
    // if (accordionValue == "description") {
    fetchKeywords();
    // }
  }, []);

    useEffect(() => {
      if (accordionValue == "description") {
        fetchKeywords();
      }
    }, [accordionValue]);

  return (
    <form
      onSubmit={(e) => {
        const errors = {
          docError: {
            error: false,
            errorMsg: "",
          },
        };
        setDocError(errors.docError);
        descriptionFormik.handleSubmit(e);
      }}
    >
      <ProductContentContainer className={poststyle.product_des}>
        <ProductDescriptionInput
          breakPoints={breakPoints}
          sx={{ margin: "-8px 0 0 0" }}
        >
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              {/* <TextFieldHelperText
                sx={{
                  "@media screen and (max-width:1600px)": {
                    margin: "0 0 5px",
                  },
                }}
              >
                Unique and descriptive name for your product
              </TextFieldHelperText> */}
              <FormControl
                sx={{ width: "100%" }}
                className={poststyle.input_box}
              >
                <TextField
                  style={{ width: "100%" }}
                  size={"small"}
                  value={descriptionFormik.values.name}
                  name={name}
                  error={descriptionFormik?.errors?.name ? true : false}
                  helperText={descriptionFormik?.errors?.name}
                  onChange={(e) => {
                    if (e.target.value.length > 180) {
                      descriptionFormik.setFieldError(
                        "name",
                        "Max Characters Limit Reached!"
                      );
                      return;
                    } else {
                      descriptionFormik.setFieldValue("name", e.target.value);
                      descriptionFormik.setFieldError("name", "");
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <LightTooltip
                          placement={"top"}
                          title={
                            "Including accurate post title increases the appearance count in respective buyer’s searches"
                          }
                          arrow
                        >
                          <InfoOutlinedIcon
                            style={{
                              color: "rgb(80, 183, 108)",
                              fontSize: "16px",
                              margin: "0 0 0 12px",
                            }}
                          />
                        </LightTooltip>
                      </InputAdornment>
                    ),
                  }}
                  placeholder={"Enter Product Name"}
                  fullWidth
                  label={
                    <div>
                      <span
                        style={{
                          paddingRight: "5px",
                          fontWeight: 600,
                          letterSpacing: "0.4px",
                          color: "#1C1C1C",

                          fontFamily: "open sans",
                        }}
                      >
                        {"Product Title"}
                      </span>

                      <LightTooltip placement={"top"} title="Required!" arrow>
                        <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                          *
                        </span>
                      </LightTooltip>
                      <LightTooltip
                        placement={"right"}
                        title={
                          "Use relevant keywords and highlight key features. Aim for clarity and avoid misleading titles."
                        }
                        arrow
                      >
                        {
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "16px",
                              height: "16px",
                            }}
                          >
                            <Image
                              src={"/assets/helpIcon.svg"}
                              layout="fill"
                              alt="image"
                            />{" "}
                          </span>
                        }
                      </LightTooltip>
                    </div>
                  }
                  InputLabelProps={{ shrink: true }}
                />
                <TextFieldHelperText>
                  Maximum character: {descriptionFormik.values.name.length}/
                  {180}{" "}
                </TextFieldHelperText>
              </FormControl>
            </Grid>
            <Grid item xl={6} lg={6} md={6} xs={12}>
              {/* <TextFieldHelperText
                sx={{
                  "@media screen and (max-width:1600px)": {
                    margin: "0 0 5px",
                    lineHeight: "normal",
                  },
                }}
              >
                Create More Room Below the Primary Title to Utilize as a
                Subtitle or Capture Buyer's Interest
              </TextFieldHelperText> */}
              <FormControl
                sx={{ width: "100%" }}
                className={poststyle.input_box}
              >
                <EditableTextField
                  required={false}
                  upperCharacterLimit={100}
                  showCharactersCount={true}
                  name="pre_title_name"
                  placeholder="Enter subtitle"
                  label="Subtitle"
                  size="small"
                  labelToolTipText={
                    "Give your content an extra boost by using this field content as a subheading or a creative marketing content that draws attention."
                  }
                  value={descriptionFormik.values.pre_title_name}
                  formik={descriptionFormik}
                ></EditableTextField>
              </FormControl>
            </Grid>
          </Grid>
        </ProductDescriptionInput>

        <ProductDescriptionInputFull breakPoints={breakPoints}>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <FormControl
                sx={{ width: "100%" }}
                className={poststyle.input_box}
              >
                <Box
                  sx={{
                    border: `1px solid ${
                      descriptionFormik?.errors?.description
                        ? "#d7282f"
                        : "rgba(0, 0, 0, 0.22)"
                    }`,
                    borderRadius: "4px",
                    padding: "10px 0px",
                    position: "relative",
                    "&:hover": {
                      border: `1px solid ${
                        descriptionFormik?.errors?.description
                          ? "#d7282f"
                          : "rgba(0, 0, 0, 1)"
                      }`,
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    maxRows={5}
                    minRows={5}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        padding: "0px 14px !important",
                      },
                      "& .MuiOutlinedInput-notchedOutline": { border: "0" },
                    }}
                    value={descriptionFormik.values.description}
                    onBlur={(e) => {
                      descriptionFormik.setFieldValue(
                        "description",
                        descriptionFormik.values.description.trim()
                      );
                    }}
                    onChange={(e) => {
                      if (e.target?.value?.length > 999) {
                        descriptionFormik.setFieldError(
                          "description",
                          "Max Characters Limit Reached!"
                        );
                        return;
                      }
                      descriptionFormik.setFieldError("description", "");
                      descriptionFormik.setFieldValue(
                        "description",
                        e.target.value
                      );
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      left: "10px",
                      background: "#fff",
                      padding: "0px 8px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "2px" }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "rgb(28, 28, 28)",
                          fontWeight: "600",
                        }}
                      >
                        About this product{" "}
                        <LightTooltip placement={"top"} title="Required!" arrow>
                          <span
                            style={{ color: "#D7282F", paddingRight: "5px" }}
                          >
                            *
                          </span>
                        </LightTooltip>
                        <LightTooltip
                          placement={"top"}
                          title={`Briefly Describe your product's unique selling points, specifications, and how it addresses buyer needs.`}
                          arrow
                        >
                          <span
                            style={{
                              display: "inline-block",
                              position: "relative",
                              width: "16px",
                              height: "16px",
                            }}
                          >
                            <Image
                              src={"/assets/helpIcon.svg"}
                              alt="image"
                              width={12}
                              height={12}
                            />{" "}
                          </span>
                        </LightTooltip>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {descriptionFormik?.errors?.description && (
                  <p
                    style={{
                      fontSize: "10px",
                      color: "#d7282f",
                      margin: "2px 0px",
                    }}
                  >
                    <span>
                      <img
                        src="/assets/error-outline-red.svg"
                        alt=""
                        height={"8px"}
                        width={"8px"}
                        style={{ marginRight: "4px" }}
                      />
                    </span>
                    {descriptionFormik.errors.description}
                  </p>
                )}
                <TextFieldHelperText>
                  Maximum character{" "}
                  {descriptionFormik.values.description.length}/{999}{" "}
                </TextFieldHelperText>
              </FormControl>
            </Grid>

            {/**** Start Product Use cases section ****/}
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <ProductDesApplicationAndUseCases>
                <ProductAppUseTitle>
                  Add Product Application /Select From Suggestion{" "}
                  <LightTooltip placement={"top"} title="Required!" arrow>
                    <span className="redStar">*</span>
                  </LightTooltip>
                  <LightTooltip
                    title="Select the primary purpose or context for using your product from the dropdown menu. You can choose from predefined applications, and the more applications you add, the greater visibility your product will have. Give priority to the most important applications and use cases by assigning them a higher ranking (5 for the most relevant, 1 for less relevant)."
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "16px",
                        height: "16px",
                        marginLeft: "8px",
                      }}
                    >
                      <Image
                        src={"/assets/helpIcon.svg"}
                        layout="fill"
                        alt="image"
                      />{" "}
                    </span>
                  </LightTooltip>
                </ProductAppUseTitle>

                <ProductSelctionDropdown>
                  <Box>
                    <Autocomplete
                      fullWidth
                      size="small"
                      multiple
                      options={productApplicationOptions?.map(
                        (item) => item?.name
                      )}
                      value={descriptionFormik.values.product_applications.map(
                        (item) => item?.name
                      )}
                      onChange={(event: any, value: any) => {
                        descriptionFormik?.setFieldError(
                          "product_applications",
                          ""
                        );
                        if (event.key == "Backspace") {
                          let keyword = [
                            ...descriptionFormik?.values?.product_applications,
                          ];
                          keyword.pop();
                          descriptionFormik.setFieldValue(
                            "product_applications",
                            keyword
                          );
                          return;
                        }
                        const selectedValues = productApplicationOptions.filter(
                          (v) => {
                            return value.includes(v?.name);
                          }
                        );

                        const existingApplications =
                          descriptionFormik?.values?.product_applications || [];
                        const newSelectedValues = selectedValues.filter(
                          (selected) =>
                            !existingApplications.some(
                              (app) => app.name === selected.name
                            )
                        );

                        if (newSelectedValues.length > 0) {
                          descriptionFormik.setFieldValue(
                            "product_applications",
                            [...existingApplications, ...newSelectedValues]
                          );
                        }
                      }}
                      // onKeyDown={async (event: any) => {
                      //   const inputElement = event.target as HTMLInputElement;
                      //   descriptionFormik?.setFieldError(
                      //     "product_applications",
                      //     ""
                      //   );

                      //   if (event.key !== "Enter") {
                      //     return;
                      //   }

                      //   event.preventDefault();
                      //   const inputValue = inputElement.value.trim();

                      //   descriptionFormik?.setFieldError(
                      //     "product_applications",
                      //     ""
                      //   );

                      //   if (!inputValue) return;

                      //   const isPredefined = productApplicationOptions.some(
                      //     (option) => option.name.toLowerCase() === inputValue.toLowerCase()
                      //   );
                      //   const isExist =
                      //     descriptionFormik.values.product_applications.some(
                      //       (option) => option.name.toLowerCase() === inputValue.toLowerCase()
                      //     );

                      //   if (isExist) {
                      //     // descriptionFormik?.setFieldError(
                      //     //   "product_applications",
                      //     //   "Data already exists"
                      //     // );
                      //     toast.error("Product Application already exists");

                      //     return;
                      //   }

                      //   if (!isPredefined) {
                      //     try {
                      //       setIsDisabledProd(true);
                      //       const response = await handleManualInputAPI(
                      //         inputValue,
                      //         "product_applications"
                      //       );
                      //       if (response) {
                      //         const { id, name, rating = 0 } = response;
                      //         const updatedValues = [
                      //           ...descriptionFormik.values
                      //             .product_applications,
                      //           { id, name, rating },
                      //         ];
                      //         descriptionFormik.setFieldValue(
                      //           "product_applications",
                      //           updatedValues
                      //         );
                      //         inputElement.value = "";
                      //       }
                      //     } catch (error) {
                      //       throw new Error(error ?? "Something went wrong");
                      //     } finally {
                      //       setIsDisabledProd(false);
                      //     }
                      //   }
                      // }}
                      onKeyDown={handleKeyDownApplications}
                      disabled={isDisabledProd}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // {...(formik?.getFieldProps(name) ?? null)}
                          variant="outlined"
                          placeholder="Type and press Enter to add"
                          // onKeyDown={(e) => {
                          //   if (e.key === 'Enter') {
                          //     handleAddChip();
                          //     e.preventDefault();
                          //   }
                          // }}
                          // value={customChip}
                          // onChange={(e) => setCustomChip(e.target.value)}
                          error={
                            descriptionFormik?.errors?.product_applications
                              ? true
                              : false
                          }
                          InputLabelProps={{ shrink: true }}
                          helperText={
                            descriptionFormik?.errors?.product_applications
                              ? descriptionFormik?.errors?.product_applications
                              : ""
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            },
                            "& .MuiAutocomplete-input": {
                              padding: "0px 4px !important",
                            },
                          }}
                        />
                      )}
                      renderOption={(props, option, { selected }) => (
                        <ListItem
                          {...props}
                          onClick={() => {
                            // handleToggleOption(option);
                            descriptionFormik?.setFieldError(
                              "product_applications",
                              ""
                            );
                            const existingApplications =
                              descriptionFormik?.values?.product_applications ||
                              [];
                            const isExisting = existingApplications.some(
                              (application) => application.name === option
                            );

                            let updatedApplications;

                            if (isExisting) {
                              updatedApplications = existingApplications.filter(
                                (application) => application.name !== option
                              );
                            } else {
                              const newSelectedValue =
                                productApplicationOptions.find(
                                  (application) => application.name === option
                                );
                              updatedApplications = [
                                ...existingApplications,
                                { ...newSelectedValue, rating: 0 },
                              ];
                            }

                            descriptionFormik.setFieldValue(
                              "product_applications",
                              updatedApplications
                            );
                          }}
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                            },
                            "& svg": {
                              fontSize: "18px",
                            },
                          }}
                        >
                          <Checkbox
                            checked={selected}
                            onChange={() => handleToggleOption(option)}
                            style={{
                              marginRight: 4,
                              padding: 4,
                              color: selected ? "#d7282f" : "",
                            }}
                          />
                          <ListItemText primary={option} />
                        </ListItem>
                      )}
                      renderTags={(value, getTagProps) => {
                        return (
                          <>
                            {value.map((option, index) => {
                              const currentApplication =
                                product_applications.find(
                                  (application) => application.name == option
                                );
                              return (
                                <LightTooltip
                                  key={index}
                                  title={
                                    <AttributeTooltipBox>
                                      <StarRoundedIcon
                                        className={`${
                                          currentApplication?.rating == 1 ||
                                          currentApplication?.rating > 1
                                            ? "redstar opacityONE"
                                            : "redstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentApplication,
                                            1,
                                            "product_applications"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentApplication?.rating == 2 ||
                                          currentApplication?.rating > 2
                                            ? "orangestar opacityONE"
                                            : "orangestar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentApplication,
                                            2,
                                            "product_applications"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentApplication?.rating == 3 ||
                                          currentApplication?.rating > 3
                                            ? "yellowstar opacityONE"
                                            : "yellowstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentApplication,
                                            3,
                                            "product_applications"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentApplication?.rating == 4 ||
                                          currentApplication?.rating > 4
                                            ? "lightgreenstar opacityONE"
                                            : "lightgreenstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentApplication,
                                            4,
                                            "product_applications"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentApplication?.rating == 5 ||
                                          currentApplication?.rating > 5
                                            ? "greenstar opacityONE"
                                            : "greenstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentApplication,
                                            5,
                                            "product_applications"
                                          );
                                        }}
                                      />
                                    </AttributeTooltipBox>
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <AttributeCheckChipBox>
                                    <AttributeRedCheck>
                                      <Image
                                        width={22}
                                        height={24}
                                        src={"/assets/selectedAttribute.svg"}
                                        alt="img"
                                      />
                                    </AttributeRedCheck>
                                    <ManualKeywordChip
                                      label={
                                        <>
                                          {capitalizeWords(option)}{" "}
                                          <span
                                            style={{
                                              color: getChipTextColor(
                                                currentApplication?.rating || 0
                                              ),
                                            }}
                                          >
                                            (
                                            {currentApplication?.rating ||
                                              currentApplication?.score ||
                                              0}
                                            )
                                          </span>
                                        </>
                                      }
                                      {...getTagProps({ index })}
                                      onDelete={(e) => {
                                        const value =
                                          descriptionFormik?.values?.product_applications.filter(
                                            (v: any) => v?.name != option
                                          );
                                        descriptionFormik.setFieldValue(
                                          "product_applications",
                                          value
                                        );
                                      }}
                                    />
                                  </AttributeCheckChipBox>
                                </LightTooltip>
                              );
                            })}
                            {isDisabledProd && (
                              <>
                                <CircularProgress
                                  sx={{
                                    color: "#d7282f",
                                    "&.MuiCircularProgress-root": {
                                      height: "20px !important",
                                      width: "20px !important",
                                    },
                                  }}
                                />
                              </>
                            )}
                          </>
                        );
                      }}
                    />
                  </Box>
                </ProductSelctionDropdown>
              </ProductDesApplicationAndUseCases>
            </Grid>
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <ProductDesApplicationAndUseCases>
                <ProductAppUseTitle>
                  Add Product Use Cases /Select From Suggestion
                  <LightTooltip placement={"top"} title="Required!" arrow>
                    <span className="redStar">*</span>
                  </LightTooltip>
                  <LightTooltip
                    title="Choose the specific situations or scenarios where your product excels by selecting from the dropdown menu. You can also enhance your product visibility by adding additional use cases. The more diverse the applications and use cases, the better your product will be showcased.  Give priority to the most important applications and use cases by assigning them a higher ranking (5 for the most relevant, 1 for less relevant)."
                    arrow
                    placement="top"
                    disableInteractive
                  >
                    <span
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: "16px",
                        height: "16px",
                        marginLeft: "8px",
                      }}
                    >
                      <Image
                        src={"/assets/helpIcon.svg"}
                        layout="fill"
                        alt="image"
                      />{" "}
                    </span>
                  </LightTooltip>
                </ProductAppUseTitle>

                <ProductSelctionDropdown>
                  <Box>
                    <Autocomplete
                      fullWidth
                      size="small"
                      multiple
                      options={productUseCaseOptions?.map((item) => item?.name)}
                      value={descriptionFormik.values.product_use_cases.map(
                        (item) => item?.name
                      )}
                      onChange={(event: any, value: any) => {
                        // Update Formik with selected predefined options (id and name)
                        descriptionFormik?.setFieldError(
                          "product_use_cases",
                          ""
                        );
                        if (event.key == "Backspace") {
                          let keyword = [
                            ...descriptionFormik?.values?.product_use_cases,
                          ];
                          keyword.pop();
                          descriptionFormik.setFieldValue(
                            "product_use_cases",
                            keyword
                          );
                          return;
                        }
                        const selectedValues = productUseCaseOptions.filter(
                          (v) => {
                            return value.includes(v?.name);
                          }
                        );

                        // Filter out the values that are already present in the form
                        const existingApplications =
                          descriptionFormik?.values?.product_use_cases || [];
                        const newSelectedValues = selectedValues.filter(
                          (selected) =>
                            !existingApplications.some(
                              (app) => app.name === selected.name
                            )
                        );

                        if (newSelectedValues.length > 0) {
                          descriptionFormik.setFieldValue("product_use_cases", [
                            ...existingApplications,
                            ...newSelectedValues,
                          ]);
                        }
                      }}
                      // onKeyDown={async (event: any) => {
                      //   const inputElement = event.target as HTMLInputElement;
                      //   descriptionFormik?.setFieldError(
                      //     "product_use_cases",
                      //     ""
                      //   );
                      //   if (event.key !== "Enter") {
                      //     return;
                      //   }
                      //   event.preventDefault();

                      //   const inputValue = inputElement.value.trim();

                      //   descriptionFormik?.setFieldError(
                      //     "product_use_cases",
                      //     ""
                      //   );

                      //   if (!inputValue) return;

                      //   const isPredefined = productUseCaseOptions.some(
                      //     (option) => option.name.toLowerCase() === inputValue.toLowerCase()
                      //   );
                      //   const isExist =
                      //     descriptionFormik.values.product_use_cases.some(
                      //       (option) => option.name.toLowerCase() === inputValue.toLowerCase()
                      //     );

                      //    if (isExist) {
                      //                             // descriptionFormik?.setFieldError(
                      //                             //   "product_use_cases",
                      //                             //   "Data already exists"
                      //                             // );
                      //                             toast.error("Product Use Case already exists");
                      //                             return;
                      //                           }

                      //   if (!isPredefined) {
                      //     try {
                      //       setIsDisabledCase(true);
                      //       const response = await handleManualInputAPI(
                      //         inputValue,
                      //         "product_use_cases"
                      //       );
                      //       if (response) {
                      //         const { id, name, rating = 0 } = response;
                      //         const updatedValues = [
                      //           ...descriptionFormik.values.product_use_cases,
                      //           { id, name, rating },
                      //         ];
                      //         descriptionFormik.setFieldValue(
                      //           "product_use_cases",
                      //           updatedValues
                      //         );
                      //         inputElement.value = "";
                      //       }
                      //     } catch (error) {
                      //       throw new Error(error ?? "Something went wrong");
                      //     } finally {
                      //       setIsDisabledCase(false);
                      //     }
                      //   }
                      // }}
                      onKeyDown={handleKeyDownUseCases}
                      disabled={isDisabledCase}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Type and press Enter to add"
                          error={
                            descriptionFormik?.errors?.product_use_cases
                              ? true
                              : false
                          }
                          helperText={
                            descriptionFormik?.errors?.product_use_cases
                              ? descriptionFormik?.errors?.product_use_cases
                              : ""
                          }
                          sx={{
                            "& .MuiInputBase-root": {
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            },
                            "& .MuiAutocomplete-input": {
                              padding: "0px 4px !important",
                            },
                          }}
                        />
                      )}
                      renderOption={(props, option, { selected }) => (
                        <ListItem
                          {...props}
                          onClick={() => {
                            descriptionFormik?.setFieldError(
                              "product_use_cases",
                              ""
                            );
                            const existingUseCases =
                              descriptionFormik?.values?.product_use_cases ||
                              [];
                            const isExisting = existingUseCases.some(
                              (application) => application.name === option
                            );

                            let updatedUseCases;

                            if (isExisting) {
                              updatedUseCases = existingUseCases.filter(
                                (application) => application.name !== option
                              );
                            } else {
                              const newSelectedValue =
                                productUseCaseOptions.find(
                                  (useCase) => useCase.name === option
                                );
                              updatedUseCases = [
                                ...existingUseCases,
                                { ...newSelectedValue, rating: 0 },
                              ];
                            }

                            descriptionFormik.setFieldValue(
                              "product_use_cases",
                              updatedUseCases
                            );
                          }}
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                            },
                            "& svg": {
                              fontSize: "18px",
                            },
                          }}
                        >
                          <Checkbox
                            checked={selected}
                            onChange={() => handleToggleOption(option)}
                            style={{
                              marginRight: 4,
                              padding: 4,
                              color: selected ? "#d7282f" : "",
                            }}
                          />
                          <ListItemText primary={option} />
                        </ListItem>
                      )}
                      renderTags={(value, getTagProps) => {
                        return (
                          <>
                            {value.map((option, index) => {
                              const currentUseCase = product_use_cases.find(
                                (application) => application.name == option
                              );
                              return (
                                <LightTooltip
                                  key={index}
                                  title={
                                    <AttributeTooltipBox>
                                      <StarRoundedIcon
                                        className={`${
                                          currentUseCase?.rating == 1 ||
                                          currentUseCase?.rating > 1
                                            ? "redstar opacityONE"
                                            : "redstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentUseCase,
                                            1,
                                            "product_use_cases"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentUseCase?.rating == 2 ||
                                          currentUseCase?.rating > 2
                                            ? "orangestar opacityONE"
                                            : "orangestar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentUseCase,
                                            2,
                                            "product_use_cases"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentUseCase?.rating == 3 ||
                                          currentUseCase?.rating > 3
                                            ? "yellowstar opacityONE"
                                            : "yellowstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentUseCase,
                                            3,
                                            "product_use_cases"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentUseCase?.rating == 4 ||
                                          currentUseCase?.rating > 4
                                            ? "lightgreenstar opacityONE"
                                            : "lightgreenstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentUseCase,
                                            4,
                                            "product_use_cases"
                                          );
                                        }}
                                      />
                                      <StarRoundedIcon
                                        className={`${
                                          currentUseCase?.rating == 5 ||
                                          currentUseCase?.rating > 5
                                            ? "greenstar opacityONE"
                                            : "greenstar"
                                        }`}
                                        onClick={() => {
                                          handleRating(
                                            currentUseCase,
                                            5,
                                            "product_use_cases"
                                          );
                                        }}
                                      />
                                    </AttributeTooltipBox>
                                  }
                                  arrow
                                  placement="top"
                                >
                                  <AttributeCheckChipBox>
                                    <AttributeRedCheck>
                                      <Image
                                        width={22}
                                        height={24}
                                        src={"/assets/selectedAttribute.svg"}
                                        alt="img"
                                      />
                                    </AttributeRedCheck>
                                    <ManualKeywordChip
                                      label={
                                        <>
                                          {capitalizeWords(option)}{" "}
                                          <span
                                            style={{
                                              color: getChipTextColor(
                                                currentUseCase?.rating || 0
                                              ),
                                            }}
                                          >
                                            (
                                            {currentUseCase?.rating ||
                                              currentUseCase?.score ||
                                              0}
                                            )
                                          </span>
                                        </>
                                      }
                                      {...getTagProps({ index })}
                                      onDelete={(e) => {
                                        const value =
                                          descriptionFormik?.values?.product_use_cases.filter(
                                            (v: any) => v?.name != option
                                          );
                                        descriptionFormik.setFieldValue(
                                          "product_use_cases",
                                          value
                                        );
                                      }}
                                    />
                                  </AttributeCheckChipBox>
                                </LightTooltip>
                              );
                            })}

                            {isDisabledCase && (
                              <>
                                <CircularProgress
                                  sx={{
                                    color: "#d7282f",
                                    "&.MuiCircularProgress-root": {
                                      height: "20px !important",
                                      width: "20px !important",
                                    },
                                  }}
                                />
                              </>
                            )}
                          </>
                        );
                      }}
                    />
                  </Box>
                </ProductSelctionDropdown>
              </ProductDesApplicationAndUseCases>
            </Grid>

            {/**** End Start Product Use cases section ****/}

            {/**** Start Rating section ****/}
            <Grid item xs={12} lg={12} md={12}>
              <KeywordRatingPage
                formik={descriptionFormik}
                // fetchKeywords={fetchKeywords}
                category_lists={category_lists}
                // selectedKeywords={selectedKeywords}
                // setSelectedKeywords={setSelectedKeywords}
                // suggestedKeywords={suggestedKeywords}
                // setSuggestedKeywords={setSuggestedKeywords}
              />
            </Grid>
            {/**** End Rating section ****/}

            <Grid item xl={12} lg={12} md={12} xs={12}>
              <FormControl
                sx={{ width: "100%" }}
                className={poststyle.input_box}
              >
                <FileUploadProductDescriptionPlaceholder
                  updateFile={(value) => {
                    descriptionFormik.setFieldError("upload_files", "");
                    const errors = {
                      docError: {
                        error: false,
                        errorMsg: "",
                      },
                    };
                    setDocError(errors.docError);

                    if (value.length > 3) {
                      errors.docError = {
                        error: true,
                        errorMsg:
                          "The maximum number of documents allowed is 3.",
                      };

                      setDocError(errors.docError);
                      return;
                    } else {
                      for (let item of value) {
                        if (!item?.type) {
                          continue;
                        }
                        if (!fileTypesAllowed.includes(item?.type)) {
                          errors.docError = {
                            error: true,
                            errorMsg: fileTypeMessage,
                          };
                          setDocError(errors.docError);
                          return;
                        }
                      }
                    }

                    descriptionFormik.setFieldValue("upload_files", value);

                    descriptionFormik.setFieldError("upload_files", "");
                  }}
                  removeFile={(value) => {}}
                  file={descriptionFormik.values.upload_files}
                />
                {/* {descriptionFormik?.errors?.upload_files && (
                  <FormHelperText>
                    {"Please upload datasheet, drawing, catalog etc"}
                  </FormHelperText>
                )} */}
                {docError?.error && (
                  <FormHelperText>{docError?.errorMsg}</FormHelperText>
                )}
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#231f20",
                    fontWeight: "400",
                    "@media screen and (max-width:600px)": {
                      fontSize: "12px",
                    },
                  }}
                >
                  Upload files in PDF, Excel or Doc format.
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", color: "#000" }}
              >
                Target Industry{" "}
                <LightTooltip placement={"top"} title="Required!" arrow>
                  <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                    *
                  </span>
                </LightTooltip>
                <LightTooltip
                  title='The "Target Industry" is the specific market you aim to reach when selling your product on the Merchant AD platform. This is the industry where your product will be most useful and valuable to potential buyers.'
                  arrow
                  placement="right"
                  disableInteractive
                >
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      width: "16px",
                      height: "16px",
                      marginLeft: "8px",
                    }}
                  >
                    <Image
                      src={"/assets/helpIcon.svg"}
                      layout="fill"
                      alt="image"
                    />{" "}
                  </span>
                </LightTooltip>
              </Typography>
              <Box sx={{ margin: "12px 0 0 0", width: "100%" }}>
                <Autocomplete
                  freeSolo
                  fullWidth
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={industrytarget}
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  onOpen={() => setIsOpen(true)}
                  value={descriptionFormik.values.target_industry}
                  onChange={(event, newValue) => {
                    descriptionFormik.setFieldError("target_industry", "");
                    descriptionFormik.setFieldValue(
                      "target_industry",
                      newValue
                    );
                  }}
                  slotProps={{
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          margin: "0px",
                        },
                      },
                    },
                  }}
                  ListboxProps={{
                    sx: {
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#acabab",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#6d6d6d",
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          paddingRight: "9px !important",
                        },
                      }}
                      {...params}
                      placeholder="Select Target Industry"
                      error={Boolean(descriptionFormik.errors?.target_industry)}
                      helperText={
                        descriptionFormik.errors?.target_industry || ""
                      }
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            {descriptionFormik.values.target_industry && (
                              <IconButton onClick={handleClear} edge="end">
                                <ClearIcon
                                  sx={{ color: "grey", fontSize: "18px" }}
                                />
                              </IconButton>
                            )}
                            <IconButton
                              onClick={handleToggleDropdown}
                              edge="end"
                            >
                              <ArrowDropDownIcon
                                sx={{
                                  transform: isOpen
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "600", color: "#000" }}
              >
                Stock Keeping Unit (SKU){" "}
                <LightTooltip placement={"top"} title="Required!" arrow>
                  <span style={{ color: "#D7282F", paddingRight: "5px" }}>
                    *
                  </span>
                </LightTooltip>
                <LightTooltip
                  title="Enter your internal SKU used for inventory management. This helps track and identify the product within your system."
                  arrow
                  placement="top"
                  disableInteractive
                >
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      width: "16px",
                      height: "16px",
                      marginLeft: "8px",
                    }}
                  >
                    <Image
                      src={"/assets/helpIcon.svg"}
                      layout="fill"
                      alt="image"
                    />{" "}
                  </span>
                </LightTooltip>
              </Typography>
              <Box sx={{ margin: "12px 0 0 0", width: "100%" }}>
                <CustomTextField
                  placeholder="Stock Keeping Unit"
                  value={descriptionFormik.values.stock_keeping_unit}
                  handleChange={(e) => {
                    const inputValue = e.target.value;
                    descriptionFormik.setFieldError("stock_keeping_unit", "");
                    const cleanedValue = inputValue.replace(
                      /[^a-zA-Z0-9]/g,
                      ""
                    );
                    if (cleanedValue?.length > 30) {
                      descriptionFormik.setFieldError(
                        "stock_keeping_unit",
                        "Max Characters Limit Reached!"
                      );
                      return;
                    }
                    descriptionFormik.setFieldValue(
                      "stock_keeping_unit",
                      cleanedValue
                    );
                  }}
                  errorText={
                    descriptionFormik?.errors?.stock_keeping_unit
                      ? descriptionFormik?.errors?.stock_keeping_unit
                      : ""
                  }
                  error={
                    descriptionFormik?.errors?.stock_keeping_unit ? true : false
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </ProductDescriptionInputFull>
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
      </ProductContentContainer>
    </form>
  );
};

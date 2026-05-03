import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { FixedPricing } from "./fixed";
import { QuantityBasedPricing } from "./quantityBased";
// import useProductContext from "@/hooks/useProductContext";
import { EditableTextField } from "@/components/products/common/editableTextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
const ToggleButtonGroup = dynamic(
  () => import("@mui/material/ToggleButtonGroup"),
  {
    ssr: false,
  }
);
import Image from "next/image";
import {
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
  useStyles,
  OriginCase,
  CustomToggleBtn,
  CommercialInfoTabSection,
  TabOuterBox,
  CustomTabs,
  CustomizationBox,
  CustomizatioOptions,
  RadioButtonGroup,
  TextfieldUnitsBox,
  InputLabelText,
  CustOptionRow,
  SelectPricingTBox,
  NoSectionSelectBox,
  NoSelectBoxInn,
  StyledRadio,
  ToggleButtonBox,
  EmptyDivSpace,
  WheatherShowBox,
} from "./styles";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomAutocompelete from "../../common/autoCompelete";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  FirstletterCapital,
  apiClient,
  configProductScoreValues,
  convertToDays,
  formatNumericValue,
  getProductId,
  productScoreValues,
} from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import _debounce from "lodash/debounce";
import ConfigurationProduct from "./ConfigurationProduct";
import Case1 from "./Case1";
import Case2 from "./Case2";
import Case3 from "./Case3";
import NewSection from "./NewSection";
import { useSelector } from "react-redux";
import { CountriesWithCitiesObject } from "@/utils/countriesWithCitiesList";
import PaymentMethods from "./PaymentMethods";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { ButtonCol } from "../productCategories/styles";
import Swal from "sweetalert2";
import EditProductFormik from "@/hooks/useEditProductFormik";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import { shippedInVariablesForByOrder } from "@/utils/AddProductPageSelectDropdownsData";
import CommonPopUpDesc from "./CommonPopUpDesc";
export const CommercialInformation = ({
  setImagesBlock,
  HandlePercentage,
  setCompletedFields,
  setAccordianValue,
  productDetail,
  setPublished,
  FetchProductDetail,
  percentage,
  accordionValue,
}: any) => {
  const { formik, shippedInVariables } = EditProductFormik();

  const { commercialInfoUnits, territoryData, modifiedCountriesList } =
    useSelector((state: any) => state.editProduct);

  const [isChecked, setChecked] = useState(false);
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [primaryCountry, setPrimaryCountry] = useState<any>({});
  const [alignment, setAlignment] = React.useState("");
  const [multipleCountries, setMultipleCountries] = useState<any>([
    { country_code: "" },
  ]);
  const [multiplePlaceOrigin, setMultiplePlaceOrigin] = useState<any>([1]);
  const [multiplePlaceOriginTerritories, setMultiplePlaceOriginTerritories] =
    useState<any>([1]);
  const [multiplePlaceOfOrigin, setMultiplePlaceOfOrigin] = useState<any>([
    { country_code: "" },
  ]);
  const [multiplePrimaryCountries, setMultiplePrimaryCountries] = useState<any>(
    [1]
  );
  const [multipleOtherComponents, setMultipleOtherComponents] = useState<any>([
    1,
  ]);
  const [showHideCountry, setShowHideCountry] = useState<number>(1);
  const [showHideTerritory, setShowHideTerritory] = useState<number>(1);
  const [selectedOrigin, setSelectedOrigin] = useState("country");
  const [commercialUnitList, setCommercialUnitList] = useState<any>([]);
  const [otherCountriesList, setOtherCountriesList] = useState<any>([]);
  const [isOrderquanity, setIsOrderQuantity] = useState<any>(false);
  const [radioValue, setRadioValue] = useState<any>("");
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [multiplePrimaryComponents, setMultiplePrimaryComponents] =
    useState<any>([1]);
  const [selectedTerritories, setSelectedTerritories] = useState<any>([]);
  const [citiesList, setCitiesList] = useState<any>([]);
  const [otherCitiesList, setOtherCitiesList] = useState<any>([]);
  const [priceType, setPriceType] = useState<string>("");
  const { classes } = useStyles();
  // const { availability } = formik.values;
  const { availability } = productDetail;
  const product_type = productDetail?.product_type;
  const { defaultCountryCode } = useSelector((state: any) => state.header);
  const savedData = productDetail ? productDetail?.caseData : null;
  useEffect(() => {
    setPriceType(productDetail?.price_type ?? "");
  }, [productDetail?.price_type]);
  const productId = getProductId();
  const [alignmentError, setAlignmentError] = useState<boolean>(false);
  const [openPopupForPricing, setOpenPopupForPricing] = useState(false);
  const [openPopupForCases, setOpenPopupForCases] = useState(false);
  let countryLabels = [
    `Made in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(", ")}</strong>.`,
    `Manufactured in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(", ")}</strong> for global Distribution.`,
    `This product is proudly made in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(", ")}</strong>.`,
    `This product is manufactured in <strong>${selectedCountries
      ?.filter((v) => v)
      .map((v) => modifiedCountriesList.find((item) => item.value == v)?.view)
      .join(
        ", "
      )}</strong>, in some cases, be manufactured in alternative locations due to supply chain factors.`,
  ];
  let territoryLabels = [
    `Made in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(", ")}</strong>`,
    `Manufactured in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(", ")}</strong> for global Distribution.`,
    `This product is proudly made in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(", ")}</strong>`,
    `This product is manufactured in <strong>${selectedTerritories
      ?.filter((v) => v)
      .map((v) => territoryData.find((item) => item.value == v)?.view)
      .join(
        ", "
      )}</strong>, in some cases, be manufactured in alternative locations due to supply chain factors.`,
  ];

  useEffect(() => {
    (async () => {
      let response = await apiClient("unit", "get");
      setCommercialUnitList(
        response.data.map((v) => ({
          view: FirstletterCapital(v.name),
          value: v.id,
        }))
      );
    })();
  }, []);
  useEffect(() => {
    if (productDetail?.case_type) setAlignment(productDetail?.case_type);
  }, [productDetail?.case_type]);
  const Validation = () => {
    if (product_type === "simple") {
      if (availability === "in_stock") {
        return Yup.object().shape({
          payment_methods: Yup.string()
            .required("Please select payment method")
            .test(
              "max-methods",
              "You can only select 6 payment methods",
              (value) => {
                if (!value) return true;
                const methods = value.split(",").map((method) => method.trim());
                return methods.length <= 7;
              }
            )
            .test(
              "min-methods",
              "Please select at least 1 payment method",
              (value) => {
                if (!value) return false;
                const methods = value.split(",").map((method) => method.trim());
                return methods.length >= 1;
              }
            ),

          case_type: Yup.string().required(
            "Please select place of origin case"
          ),

          caseOneData:
            alignment == "case_1"
              ? Yup.object().shape({
                  value: Yup
                    .array
                    ()
                    .min(1, "Please select Country")
                    .required("Please select Country"),
                })
              : Yup.object().notRequired(),
         
          caseTwoData:
            alignment == "case_2"
              ? Yup.object().shape({
                  other_source: Yup
                    .array
                    ()
                    .min(1, "Please select Country"),
                  primary_country: Yup.object(),
             
                })
              : Yup.object().notRequired(),
          caseThreeData:
            alignment == "case_3"
              ? Yup.array().of(
                  Yup.object().shape({
                    origin: Yup.string().required(
                      "Please select Country/Territory"
                    ),
                    made_in: Yup.string().required("Please select Country"),
                  })
                )
              : Yup.array().notRequired(),
          price_term: Yup.string()
            .required("Please select shipping incoterm term")
            .nullable(),
          order_quantity:
            priceType === "quantity"
              ? Yup.array().of(
                  Yup.object().shape({
                    min: Yup.string().required("Please enter minimum value"),
                    price: Yup.string().required("Please enter price"),
                  })
                )
              : Yup.array().notRequired(),
          current_stock:
            priceType === "fixed"
              ? Yup.string().required("Please enter current stock")
              : Yup.string().notRequired(),
          quantity_available:
            priceType === "fixed"
              ? Yup.string().required("Please enter quantity available")
              : Yup.string().notRequired(),

          unit_price:
            priceType === "fixed"
              ? Yup.string().required("Please enter price")
              : Yup.string().notRequired(),
          qty_unit:
            priceType === "quantity"
              ? Yup.string().required("Please select unit")
              : Yup.string().notRequired(),
          unit:
            priceType === "fixed"
              ? Yup.string().required("Please select unit")
              : Yup.string().notRequired(),
          dispatch_in: Yup.string().required("Please enter value"),
          dispatch_day: Yup.string().required("Please select period"),
          delivery_time_value: Yup.string().required("Please enter value"),
          delivery_time_period: Yup.string().required("Please select period"),
         
          existence_place: Yup.string().required("Please select country"),
          existence_cities: Yup.string().required("Please select city"),

          sea_: Yup.array()
            .when("seaportList", {
              is: (seaportList) => seaportList && seaportList.length > 0,
              then: Yup.array()
                .min(1, "Please select seaport of loading")
                .max(3, "Only three seaports allowed")
                .required("Please select seaport of loading"),
            })
            .nullable(),

          port_: Yup.array()
            .when("airportList", {
              is: (airportList) => airportList && airportList.length > 0,
              then: Yup.array()
                .min(1, "Please select airport of loading")
                .max(3, "Only three airports allowed")
                .required("Please select airport of loading"),
            })
            .nullable(),
          minimum_order: Yup.string().required(
            "Please enter minimum order quantity"
          ),
         
        });
      }
      if (availability === "by_order") {
        return Yup.object().shape({
          payment_methods: Yup.string()
            .required("Please select payment method")
            .test(
              "max-methods",
              "You can only select 6 payment methods",
              (value) => {
                if (!value) return true;
                const methods = value.split(",").map((method) => method.trim());
                return methods.length <= 7;
              }
            )
            .test(
              "min-methods",
              "Please select at least 1 payment method",
              (value) => {
                if (!value) return false;
                const methods = value.split(",").map((method) => method.trim());
                return methods.length >= 1;
              }
            ),
          case_type: Yup.string().required(
            "Please select place of origin case"
          ),
          caseOneData:
            alignment == "case_1"
              ? Yup.object().shape({
                  value: Yup
                    .array
                    ()
                    .min(1, "Please select Country")
                    .required("Please select Country"),
                })
              : Yup.object().notRequired(),
          caseTwoData:
            alignment == "case_2"
              ? Yup.object().shape({
                  other_source: Yup
                    .array
                    ()
                    .min(1, "Please select Country"),
                  primary_country: Yup.object(),
                 
                })
              : Yup.object().notRequired(),
          caseThreeData:
            alignment == "case_3"
              ? Yup.array().of(
                  Yup.object().shape({
                    origin: Yup.string().required(
                      "Please select Country/Territory"
                    ),
                    made_in: Yup.string().required("Please select Country"),
                  })
                )
              : Yup.array().notRequired(),
          in_house_production: Yup.string().required("Please enter value"),
          production_unit: Yup.string().required(
            "Please select production unit"
          ),
          in_house_production_days: Yup.string().required(
            "Please select period"
          ),
          delivery_time: Yup.string().required("Please enter delivery time"),
          delivery_select: Yup.string().required("Please select period"),
          country_origins: Yup.string().required("Please select country"),
          country_origin_cities: Yup.string().required("Please select city"),

          
          price_term: Yup.string()
            .required("Please select product condition")
            .nullable(),
          quantity_available:
            priceType === "fixed"
              ? Yup.string().required("Please enter quantity available")
              : availability === "in_stock" && priceType === "quantity"
              ? Yup.string().required("Please enter quantity available")
              : Yup.string().notRequired(),
          unit_price:
            priceType === "fixed"
              ? Yup.string().required("Please enter price")
              : Yup.string().notRequired(),
          qty_unit:
            priceType === "quantity"
              ? Yup.string().required("Please select unit")
              : Yup.string().notRequired(),
          unit:
            priceType === "fixed"
              ? Yup.string().required("Please select unit")
              : Yup.string().notRequired(),
          order_quantity:
            priceType === "quantity"
              ? Yup.array().of(
                  Yup.object().shape({
                    min: Yup.string().required("Please enter minimum value"),
                    price: Yup.string().required("Please enter price"),
                  })
                )
              : Yup.array().notRequired(),
          sea_: Yup.array()
            .when("seaportList", {
              is: (seaportList) => seaportList && seaportList.length > 0,
              then: Yup.array()
                .min(1, "Please select seaport of loading")
                .max(3, "Only three seaports allowed")
                .required("Please select seaport of loading"),
            })
            .nullable(),
          port_: Yup.array()
            .when("airportList", {
              is: (airportList) => airportList && airportList.length > 0,
              then: Yup.array()
                .min(1, "Please select airport of loading")
                .max(3, "Only three airports allowed")
                .required("Please select airport of loading"),
            })
            .nullable(),
        });
      }
    } else {
      if (availability === "in_stock") {
        return Yup.object().shape({
          case_type: Yup.string().required(
            "Please select place of origin case"
          ),
          caseOneData:
            alignment == "case_1"
              ? Yup.object().shape({
                  value: Yup
                    .array
                    ()
                    .min(1, "Please select Country"),
                })
              : Yup.object().notRequired(),
          caseTwoData:
            alignment == "case_2"
              ? Yup.object().shape({
                  other_source: Yup
                    .array
                    ()
                    .min(1, "Please select Country"),
                  primary_country: Yup.object(),
                
                })
              : Yup.object().notRequired(),
          caseThreeData:
            alignment == "case_3"
              ? Yup.array().of(
                  Yup.object().shape({
                    origin: Yup.string().required(
                      "Please select Country/Territory"
                    ),
                    made_in: Yup.string().required("Please select Country"),
                  })
                )
              : Yup.array().notRequired(),
          dispatch_in: Yup.string().required("Please enter value"),
          dispatch_day: Yup.string().required("Please select period"),
          delivery_time_value: Yup.string().required("Please enter value"),
          delivery_time_period: Yup.string().required("Please select period"),
          payment_methods: Yup.string(),
          
          existence_place: Yup.string().required(
            "Please select existence place"
          ),
          price_term: Yup.string()
            .required("Please select shipping incoterm term")
            .nullable(),
          sea_: Yup.array()
            .when("seaportList", {
              is: (seaportList) => seaportList && seaportList.length > 0,
              then: Yup.array()
                .min(1, "Please select seaport of loading")
                .max(3, "Only three seaports allowed")
                .required("Please select seaport of loading"),
            })
            .nullable(),
          port_: Yup.array()
            .when("airportList", {
              is: (airportList) => airportList && airportList.length > 0,
              then: Yup.array()
                .min(1, "Please select airport of loading")
                .max(3, "Only three airports allowed")
                .required("Please select airport of loading"),
            })
            .nullable(),
          quantity_available: Yup.string().notRequired(),
        });
      } else {
        return Yup.object().shape({
          payment_methods: Yup.string().required(
            "Please select payment method"
          ),
          case_type: Yup.string().required(
            "Please select place of origin case"
          ),
          caseOneData:
            alignment == "case_1"
              ? Yup.object().shape({
                  value: Yup
                    .array
                    ()
                    .min(1, "Please select Country")
                    .required("Please select Country"),
                })
              : Yup.object().notRequired(),
          caseTwoData:
            alignment == "case_2"
              ? Yup.object().shape({
                  other_source: Yup
                    .array
                    ()
                    .min(1, "Please select Country"),
                  primary_country: Yup.object(),
                 
                })
              : Yup.object().notRequired(),
          caseThreeData:
            alignment == "case_3"
              ? Yup.array().of(
                  Yup.object().shape({
                    origin: Yup.string().required(
                      "Please select Country/Territory"
                    ),
                    made_in: Yup.string().required("Please select Country"),
                  })
                )
              : Yup.array().notRequired(),
       
          in_house_production: Yup.string().required("Please enter value"),
          in_house_production_days: Yup.string().required(
            "Please select period"
          ),
          production_unit: Yup.string().required(
            "Please select production unit"
          ),
          price_term: Yup.string()
            .required("Please select price term")
            .nullable(),
          country_origins: Yup.string().required("Please select country"),

          delivery_time: Yup.string().required("Please enter delivery time"),
          delivery_select: Yup.string().required("Please select period"),
          sea_: Yup.array()
            .when("seaportList", {
              is: (seaportList) => seaportList && seaportList.length > 0,
              then: Yup.array()
                .min(1, "Please select seaport of loading")
                .max(3, "Only three seaports allowed")
                .required("Please select seaport of loading"),
            })
            .nullable(),
          port_: Yup.array()
            .when("airportList", {
              is: (airportList) => airportList && airportList.length > 0,
              then: Yup.array()
                .min(1, "Please select airport of loading")
                .max(3, "Maximum three airports allowed")
                .required("Please select airport of loading"),
            })
            .nullable(),
          quantity_available: Yup.string().notRequired(),
        });
      }
    }
    if (product_type === "simple") {
      if (availability === "in_stock") {
        const schema = Yup.object().shape({
          price_term: Yup.string()
            .required("Please select shipping incoterm term")
            .nullable(),
          order_quantity:
            priceType === "quantity"
              ? Yup.array().of(
                  Yup.object().shape({
                    min: Yup.string().required("Please enter minimum value"),
                    price: Yup.string().required("Please enter price"),
                  })
                )
              : Yup.array().notRequired(),
        });
      }
    } else {
    }
  };

  //********************************************************************************/

  const validates = (values) => {
    if (product_type === "simple") {
      if (
        values.price_term == "" ||
        values?.currency_id == "" ||
        values?.payment_methods?.length == 0 ||
        (priceType === "quantity" && values?.qty_unit == "") ||
        (priceType === "fixed" && values?.unit == "") ||
        (priceType === "fixed" && values?.unit_price == "") ||
        (priceType === "fixed" && values?.quantity_available == "")
      ) {
        toast.error("Please select above fields");
      }
    }
  };
  let percentageValueCal: number = percentage
    .map((v) => v.value)
    .reduce((a, b) => a + b);

  const percentageValue: any = Math.round(percentageValueCal);
  const isUnique = (arrToTest) => {
    if (arrToTest) {
      return arrToTest.length !== new Set(arrToTest).size;
    }
  };

  const commercialFormik: any = useFormik({
    validationSchema: Validation(),
    validate: validates,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      quote_button_type: productDetail?.quote_button_type
        ? productDetail?.quote_button_type
        : "quote",
      case_type: productDetail?.case_type ?? "",
      payment_methods: productDetail?.payment_methods ?? "",
      existence_cities: productDetail?.existence_cities ?? "",
      country_origin_cities: productDetail?.country_origin_cities ?? "",
      quantity_available: productDetail?.quantity_available ?? "",
      product_type: productDetail?.product_type ?? "",
      price_type: productDetail?.price_type ?? "",
      in_house_production_days: productDetail?.in_house_production_days ?? "",
      delivery_select: productDetail?.delivery_select ?? "",
      delivery_time: productDetail?.delivery_time ?? "",
      in_house_production: productDetail?.in_house_production ?? "",
      tertiary_id: productDetail?.tertiary_id
        ? `${`${productDetail?.tertiary_id}`?.split(",").map((v) => `${v}`)}`
        : [],
      sea_:
        (productDetail?.sea_
          ? productDetail?.sea_.includes(",")
            ? productDetail?.sea_.split(",")
            : [productDetail?.sea_]
          : []) ?? [],

      port_:
        (productDetail?.port_
          ? productDetail?.port_.includes(",")
            ? productDetail?.port_.split(",")
            : [productDetail?.port_]
          : []) ?? [],
     
      country_origin_id: productDetail?.country_origin_id ?? [],
      existence_place: productDetail?.existence_place ?? "",
      hide_country: productDetail?.hide_country ?? 1,
      hide_territory: productDetail?.hide_territory ?? 1,
      price_term:
        (productDetail?.price_term ? productDetail?.price_term : "") ?? "",
      current_stock: productDetail?.current_stock ?? "",
      unit: productDetail?.unit ?? "",
      unit_price: productDetail?.unit_price ?? "",
      currency_id: productDetail?.currency_id
        ? productDetail?.currency_id
        : JSON.parse(localStorage.getItem("productCurrency")) ?? 1,
      dispatch_in: productDetail?.dispatch_in ?? "",
      dispatch_day: productDetail?.dispatch_day ?? "",
      qty_unit: productDetail?.qty_unit ?? "",
      hide_price: productDetail?.hide_price ?? 1,
      negotiable_price: productDetail?.negotiable_price ?? 1,
      quantity_status: productDetail?.quantity_status ?? 1,
      production_unit: productDetail?.production_unit ?? "",
      hide_price_condition: productDetail?.hide_price_condition ?? 1,
      seaportList: [],
      airportList: [],
      order_quantity: productDetail?.quantity_based_list ?? [
        {
          min: "",
          price: "",
          id: 1,
        },
      ],
      country_origins: productDetail?.country_origins ?? "",
      caseOneData:
        productDetail?.case_type == "case_1"
          ? JSON.parse(productDetail.caseData)
          : {},
      caseTwoData:
        productDetail?.case_type == "case_2"
          ? JSON.parse(productDetail.caseData)
          : {},
      caseThreeData:
        productDetail?.case_type == "case_3"
          ? JSON.parse(productDetail.caseData)
          : {},
      restrictions: {},
      delivery_time_value: productDetail?.delivery_time_value ?? "",
      delivery_time_period: productDetail?.delivery_time_period ?? "",
      selectedCaseCountry: [],
      minimum_order: productDetail?.minimum_order ?? "",
      // selctedCountry:productDetail.caseData!==null?  JSON.parse((productDetail.caseData?.country ?? Data?.value?.split(",")));
    },
    onSubmit: async (values) => {
      const regex = /^\d+$/;
      let newQty =
        commercialFormik.values.price_type == "fixed"
          ? commercialFormik.values.unit
          : commercialFormik.values.qty_unit;
      const checkUnit = commercialUnitList?.find(
        (ele) => ele?.value == newQty
      )?.value;

      if (
        checkUnit !== undefined &&
        !regex.test(checkUnit) &&
        product_type !== "configured"
      ) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "custom-btn cancel-button",
            cancelButton: "custom-btn remove-btn",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({
          title: "Error in unit saving!",
          text: "To add a new unit, click on the 'Add Unit' button.",
          icon: "error",
          showCancelButton: false,
          reverseButtons: true,
        });
        return;
      }
      setPublished("");

      const {
        price_type,
        in_house_production_days,
        delivery_select,
        delivery_time,
        in_house_production,
        tertiary_id,
        sea_,
        port_,
        country_origin_id,
        existence_place,
        hide_country,
        hide_territory,
        price_term,
        current_stock,
        unit,
        unit_price,
        currency_id,
        dispatch_in,
        dispatch_day,
        qty_unit,
        country_origins,
        hide_price,
        negotiable_price,
        quantity_status,
        caseOneData,
        caseTwoData,
        caseThreeData,
        restrictions,
        quantity_available,
        existence_cities,
        country_origin_cities,
        payment_methods,
        delivery_time_value,
        delivery_time_period,
        hide_price_condition,
        quote_button_type,
      }: any = values;

      let formData = new FormData();
      setButtonLoader(true);

      if (product_type === "simple") {
        formData.append("price_type", price_type);
        formData.append("published", "0");
        if (availability === "in_stock") {
          formData.append(
            "country_origin_id",
            country_origin_id?.map((v) => v.country_code)?.toString() || ""
          );
          formData.append("country_origins", "");
          formData.append("country_origin_cities", "");
          formData.append("existence_cities", existence_cities);
          formData.append("existence_place", existence_place);
          formData.append("dispatch_in", dispatch_in);
          formData.append("dispatch_day", dispatch_day);
          formData.append("delivery_time_value", delivery_time_value);
          formData.append("delivery_time_period", delivery_time_period);

          if (price_type === "fixed") {
            formData.append("current_stock", current_stock);
          }
        }

        if (price_type === "quantity") {
          formData.append("published", "0");
          // QuantityBasedApi();
          formData.append("price_term", price_term);
          formData.append("quantity_status", quantity_status);
          if (quantity_status == 0) {
            formData.append("hide_price_condition", hide_price_condition);
            formData.append("hide_price", "0");
          }
          formData.append("qty_unit", qty_unit);
          formData.append("currency_id", currency_id);
          formData.append("quantity_available", "");
        }

        if (price_type === "fixed") {
          formData.append("published", "0");
          formData.append("hide_price", hide_price);
          formData.append("quantity_available", quantity_available);
          if (hide_price == 0) {
            formData.append("hide_price_condition", hide_price_condition);
          }
          formData.append("price_term", price_term);
          formData.append("unit_price", unit_price);
          formData.append("currency_id", currency_id);
          formData.append("unit", unit);
        }
        if (availability === "by_order") {
          formData.append("published", "0");
          formData.append("existence_place", existence_place);
          formData.append("existence_cities", existence_cities);
          formData.append("in_house_production", in_house_production);
          formData.append("production_unit", production_unit);
          formData.append("in_house_production_days", in_house_production_days);
          formData.append("delivery_time", delivery_time);
          formData.append("delivery_select", delivery_select);
          formData.append(
            "tertiary_id",
            tertiary_id?.map((v) => v.country_code)?.toString() || ""
          );
          formData.append("country_origins", country_origins);
          formData.append("country_origin_cities", country_origin_cities);
          formData.append("existence_place", "");
          formData.append("existence_cities", "");
          formData.append("delivery_time_value", "");
          formData.append("delivery_time_period", "");
        }
      } else {
        if (availability === "in_stock") {
          formData.append("published", "0");
          formData.append("price_term", price_term);
          formData.append("currency_id", currency_id);
          formData.append("dispatch_in", dispatch_in);
          formData.append("dispatch_day", dispatch_day);
          formData.append(
            "country_origin_id",
            country_origin_id?.map((v) => v.country_code)?.toString() || ""
          );

          formData.append("existence_place", existence_place);
          formData.append("existence_cities", existence_cities);
          formData.append("country_origins", "");
          formData.append("country_origin_cities", "");
          formData.append("delivery_time_value", delivery_time_value);
          formData.append("delivery_time_period", delivery_time_period);
        } else {
          formData.append("published", "0");
          formData.append("price_term", price_term);
          formData.append("currency_id", currency_id);
          formData.append("in_house_production", in_house_production);
          formData.append("in_house_production_days", in_house_production_days);
          formData.append("delivery_time", delivery_time);
          formData.append("delivery_select", delivery_select);
          formData.append(
            "tertiary_id",
            tertiary_id?.map((v) => v.country_code)?.toString() || ""
          );
          formData.append("existence_place", "");
          formData.append("existence_cities", "");
          formData.append("delivery_time_value", "");
          formData.append("delivery_time_period", "");
          formData.append("country_origins", country_origins);
          formData.append("country_origin_cities", country_origin_cities);
          formData.append("delivery_select", delivery_select);
        }
      }
      formData.append("production_unit", production_unit);
      formData.append("last_update", "Commercial Information");
      formData.append("sea_", sea_?.join(",") || "");
      formData.append("port_", port_?.join(",") || "");
      formData.append("hide_country", hide_country || "");
      formData.append("hide_territory", hide_territory || "");
      formData.append("id", productId || "");
      formData.append("availability", availability);
      formData.append("published", "0");
      formData.append("negotiable_price", negotiable_price);
      formData.append("case_type", alignment);
      if (Object.keys(restrictions).length > 0) {
        formData.append("restrictions", JSON.stringify(restrictions));
      }
      // formData.append("payment_methods", payment_methods.replace(/^,+/, ""));

      if (alignment == "case_1") {
        formData.append(
          "caseData",
          JSON.stringify({
            ...caseOneData,
            value: caseOneData.value.filter((v) => v).join(","),
          })
        );
        formData.append("published", "0");
      }
      if (
        alignment == "case_2" &&
        caseTwoData.other_source &&
        caseTwoData.primary_country
      ) {
        formData.append(
          "caseData",
          JSON.stringify({
            ...caseTwoData,
            other_source: caseTwoData.other_source.filter((v) => v),
            primary_country: caseTwoData.primary_country,
            // .filter((v) => v)
            // .join(","),
          })
        );
        formData.append("published", "0");
      }
      if (alignment == "case_3") {
        formData.append("caseData", JSON.stringify(caseThreeData));
      }
      formData.append("published", "0");

      formData.append("quote_button_type", quote_button_type);

      if (formData.get("case_type") == "case_1") {
        if (isUnique(caseOneData.country)) {
          setButtonLoader(false);
          return false;
        }
      }
      if (formData.get("case_type") == "case_2") {
        if (isUnique(caseTwoData.other_source)) {
          setButtonLoader(false);
          return false;
        }
      }

      if (formData.get("case_type") == "case_3") {
        if (isUnique(caseThreeData?.map((v) => v?.made_in))) {
          setButtonLoader(false);
          return false;
        }
      }
      let response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );
      if (response.status == 200) {
        setAccordianValue("image");
        setImagesBlock({ disable: false, expanded: true });
        setCompletedFields((prev) => ({ ...prev, commercial: true }));
        if (alignment != "") {
          await FetchProductDetail();
        }
      }

      setButtonLoader(false);
    },
  });

  const {
    negotiable_price,
    price_type,
    in_house_production_days,
    delivery_select,
    delivery_time,
    in_house_production,
    tertiary_id,
    sea_,
    port_,
    country_origin_id,
    existence_place,
    hide_country,
    hide_territory,
    price_term,
    current_stock,
    unit,
    unit_price,
    currency_id,
    dispatch_in,
    dispatch_day,
    qty_unit,
    country_origins,
    order_quantity,
    quantity_status,
    production_unit,
    hide_price,
    delivery_time_value,
    delivery_time_period,
    case_type,
    payment_methods,
  } = commercialFormik.values;

  useEffect(() => {
    const {
      country_origins,
      country_origin_id,
      existence_place,
      tertiary_id,
      availability,
    } = productDetail;

    let countrylist = country_origins?.split(",") ?? [];
    let countryOriginsList = country_origin_id
      ? `${country_origin_id}`?.split(",") ?? []
      : [];
    let territoryOriginsList = tertiary_id
      ? `${tertiary_id}`?.split(",") ?? []
      : [];

    if (country_origins || existence_place) {
      FetchSeaPortList("", country_origins ? country_origins : existence_place);
      FetchAirPortList("", country_origins ? country_origins : existence_place);
    }

    if (countrylist?.length > 0) {
      setMultipleCountries(countrylist.map((v) => ({ country_code: v })));
    }

    if (availability == "in_stock" && country_origin_id) {
      setMultiplePlaceOfOrigin(
        countryOriginsList.map((v) => ({ country_code: v }))
      );
    }
    if (availability == "by_order" && tertiary_id) {
      setMultiplePlaceOfOrigin(
        territoryOriginsList.map((v) => ({ country_code: v }))
      );
    }
  }, [productDetail, availability]);

  useEffect(() => {
    if (savedData && productDetail?.case_type == "case_2") {
      let Data = JSON.parse(savedData);

      setPrimaryCountry(Data?.primary_country);
      setSelectedCountries([]);
      setMultiplePlaceOrigin([1]);
      if (Data?.primary_country) {
        setPrimaryCountry(Data?.primary_country);
      }

      if (Data?.other_source && otherCountriesList.length == 0) {
        setOtherCountriesList(Data?.other_source);
        setMultiplePrimaryComponents(Data?.other_source);
      }
    }
    if (savedData && productDetail?.case_type == "case_1") {
      let Data = JSON.parse(savedData);
      if (selectedCountries?.length == 0 && Data?.selection == "country") {
        let countries = Data?.value?.split(",");
        let territories = modifiedCountriesList
          .filter((c) => Data?.value?.split(",").find((v) => v == c.value))
          .map((v) => v.region);
        setMultiplePlaceOriginTerritories(Data?.territory ?? territories);
        setMultiplePlaceOrigin(Data?.country ?? countries);
        setSelectedCountries(Data?.country ?? countries);
      }
      if (selectedTerritories?.length == 0 && Data?.selection == "territory") {
        setSelectedCountries(Data?.country);
        setMultiplePlaceOrigin(Data?.country);
        setMultiplePlaceOriginTerritories(
          Data?.territory ?? Data?.value?.split(",")
        );
      }
    }
  }, [productDetail?.case_type, isOrderquanity, currency_id, case_type]);

  useEffect(() => {
    if (selectedOrigin == "country" && selectedCountries?.length > 0) {
      commercialFormik.setFieldValue("caseOneData", {
        ...commercialFormik?.values?.caseOneData,
        value: selectedCountries,
        country: selectedCountries,
        territory: selectedTerritories,
        selection: selectedOrigin,
        label: showHideCountry == 1 ? countryLabels[+radioValue] : "",
        labelValue: showHideCountry == 1 ? radioValue : "",
        show_countries: showHideCountry,
        show_territory: showHideTerritory,
      });
    }
    if (selectedOrigin == "territory" && selectedTerritories?.length > 0) {
      commercialFormik.setFieldValue("caseOneData", {
        ...commercialFormik?.values?.caseOneData,
        value: selectedTerritories,
        selection: selectedOrigin,
        label: showHideTerritory == 1 ? territoryLabels[+radioValue] : "",
        labelValue: showHideTerritory == 1 ? radioValue : "",
        show_countries: showHideCountry,
        show_territory: showHideTerritory,
        country: selectedCountries,
        territory: selectedTerritories,
      });
    }
    return;
  }, [
    selectedOrigin,
    sea_,
    radioValue,
    port_,
    selectedCountries,
    selectedTerritories,
    showHideTerritory,
    showHideCountry,
    savedData,
    multiplePlaceOrigin,
    isOrderquanity,
    currency_id,
    case_type,
  ]);

  useEffect(() => {
    if (availability == "by_order") {
      commercialFormik.setFieldValue("tertiary_id", multiplePlaceOfOrigin);
      commercialFormik.setFieldValue("country_origin_id", []);
    } else {
      commercialFormik.setFieldValue(
        "country_origin_id",
        multiplePlaceOfOrigin
      );
      commercialFormik.setFieldValue("tertiary_id", []);
    }
  }, [multiplePlaceOfOrigin, availability]);
  useEffect(() => {
    if (
      productDetail?.sea_?.split(",").length > 0 &&
      commercialFormik?.values?.seaportList.length == 0
    ) {
      commercialFormik.setFieldValue(
        "seaportList",
        productDetail?.sea_?.split(",").map((v) => ({ value: v, view: v }))
      );
    }
    if (
      productDetail?.port_?.split(",").length > 0 &&
      commercialFormik?.values?.airportList.length == 0
    ) {
      commercialFormik.setFieldValue(
        "airportList",
        productDetail?.port_?.split(",").map((v) => ({ value: v, view: v }))
      );
    }
  }, [productDetail]);

  const validateArrayOfObjects = (data) => {
    if (Array.isArray(data) && data?.length == 0) {
      return true;
    }
    for (const [index, item] of data.entries()) {
      for (const [key, value] of Object.entries(item)) {
        if (value === "") {
          return true;
        }
      }
    }
    return false;
  };

  //function for checking the validation for quantity based's Minitmum order data before hitting the API
  const checkValidationForQuantityBased = () => {
    let isValidated = false;
    if (price_type == "") {
      isValidated = true;
    }
    if (price_type === "quantity") {
      const {
        order_quantity,
        currency_id,
        qty_unit,
        price_term,
        quantity_available,
        minimum_order,
      } = commercialFormik.values;
      if (availability == "in_stock") {
        if (quantity_available == "") {
          commercialFormik.setFieldTouched("quantity_available", true);
          commercialFormik.setFieldError(
            "quantity_available",
            "Please enter value"
          );
          isValidated = true;
        }
      }
      if (minimum_order == "") {
        commercialFormik.setFieldTouched("minimum_order", true);
        commercialFormik.setFieldError("minimum_order", "Please enter value");
        isValidated = true;
      }
      if (qty_unit == "") {
        commercialFormik.setFieldError("qty_unit", "Please select value");
        isValidated = true;
      }
      if (price_term == "" || price_term == null) {
        commercialFormik.setFieldError("price_term", "Please select value");
        isValidated = true;
      }

      if (validateArrayOfObjects(order_quantity)) {
        commercialFormik.setFieldError("order_quantity", "Please enter value");
        isValidated = true;
      }
    }
    if (price_type === "fixed") {
      const {
        quantity_available,
        unit_price,
        price_term,
        currency_id,
        unit,
        minimum_order,
      } = commercialFormik.values;
      if (availability == "in_stock") {
        if (quantity_available == "") {
          commercialFormik.setFieldTouched("quantity_available", true);
          commercialFormik.setFieldError(
            "quantity_available",
            "Please enter value"
          );
          isValidated = true;
        }
      }
      if (minimum_order == "") {
        commercialFormik.setFieldTouched("minimum_order", true);
        commercialFormik.setFieldError("minimum_order", "Please enter value");
        isValidated = true;
      }
      if (unit == "") {
        commercialFormik.setFieldError("unit", "Please select value");
        isValidated = true;
      }

      if (unit_price === "") {
        commercialFormik.setFieldTouched("unit_price", true);
        commercialFormik.setFieldError("unit_price", "Please enter value");
        isValidated = true;
      }

      if (price_term == "" || price_term == null) {
        commercialFormik.setFieldError("price_term", "Please select value");
        isValidated = true;
      }
    }

    return isValidated;
  };

  const updatePricingTab = async () => {
    const {
      hide_price_condition,
      quantity_available,
      hide_price,
      negotiable_price,
      minimum_order,
    } = commercialFormik.values;
    setPublished("");
    const formData = new FormData();
    formData.append("id", productId || "");
    if (product_type === "simple") {
      formData.append("published", "0");
      formData.append("price_type", price_type);
      formData.append("minimum_order", minimum_order);
      if (price_type === "quantity") {
        // QuantityBasedApi();
        formData.append("price_term", price_term);
        if (availability == "in_stock") {
          formData.append("quantity_available", quantity_available);
        }
        formData.append("quantity_status", quantity_status);
        if (quantity_status == 0) {
          formData.append("hide_price", hide_price);
          formData.append("hide_price_condition", hide_price_condition);
        }
        if (quantity_status == 1) {
          formData.append("hide_price_condition", hide_price_condition);
          formData.append("hide_price", hide_price);
        }
        formData.append("qty_unit", qty_unit);
        formData.append("currency_id", currency_id);
      }
      if (price_type === "fixed") {
        formData.append("hide_price", hide_price);
        formData.append("negotiable_price", negotiable_price);
        if (availability == "in_stock") {
          formData.append("quantity_available", quantity_available);
        }
        if (hide_price == 0) {
          formData.append("hide_price_condition", hide_price_condition);
        }
        formData.append("price_term", price_term);
        const updatedPrice = formatNumericValue(unit_price);
        formData.append("unit_price", updatedPrice);
        formData.append("currency_id", currency_id);
        formData.append("unit", unit);
      }
      const response = await apiClient(
        "product/view/single/update",
        "post",
        { body: formData },
        true
      );

      if (response.status == 200) {
        FetchProductDetail();
      }
    }
  };
  let maxQty;
  let minQty;
  const order = commercialFormik.values.order_quantity;
  const updatedOrderQuantity = order.map((item) => {
    return { ...item, price: formatNumericValue(item?.price) };
  });
  for (let i = 0; i < updatedOrderQuantity.length; i++) {
    minQty = updatedOrderQuantity[i].min;
    //  maxQty;
  }
  const QuantityBasedApi = async () => {
    const { order_quantity } = commercialFormik.values;
    const updatedOrderQuantity = order_quantity.map((item) => {
      return { ...item, price: formatNumericValue(item?.price) };
    });
    let formData = new FormData();

    formData.append("product_id", productId);
    for (let i = 0; i < updatedOrderQuantity.length; i++) {
      const minQty = updatedOrderQuantity[i].min;
      let maxQty;

      if (i === updatedOrderQuantity.length - 1) {
        // For the last item, set maxQty to "≥ minQty" to indicate no upper limit
        maxQty = `≥ ${minQty}`;

        // Append the min, max, and price values to formData for the last item
        formData.append("min[]", minQty);
        formData.append("max[]", "more");
        formData.append("price[]", updatedOrderQuantity[i].price);

        // Log to verify output for the last item

        // Exit the loop after processing the last item
        break;
      } else {
        // For all other items, set maxQty based on the next item's min
        maxQty = `${updatedOrderQuantity[i + 1].min - 1}`;

        // Append the min, max, and price values to formData for other items
        formData.append("min[]", minQty?.toString());
        formData.append("max[]", maxQty);
        formData.append("price[]", updatedOrderQuantity[i].price);
      }
    }

    let response = await apiClient(
      "product/quantitybase/create",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      FetchProductDetail();
      return response;
    }
  };

  function isValidOtherSources(data) {
    return data.some((item) => {
      // Check if componentName is empty
      const isComponentNameEmpty = item.componentName == "";

      // Check if sourcedCountry is empty
      const isSourcedCountryEmpty = item.sourcedCountry.length === 0;

      // Return true if either componentName is empty or sourcedCountry is empty
      return isComponentNameEmpty || isSourcedCountryEmpty;
    });
  }

  //function to validate the formik and set the error in formik to display
  const checkValidationForPlaceOfOrigin = () => {
    //checking for if the type is selected for not
    if (alignment == "") {
      setAlignmentError(true);
      return true;
    }
    setAlignmentError(false);
    //check validation for case1 data
    if (alignment == "case_1") {
      const { country, labelValue } = commercialFormik?.values?.caseOneData;
      if (country) {
        if (country.length == 0) {
          commercialFormik.setFieldError("caseOneData", "Please select value");
          return true;
        }
      }

      if (
        labelValue == "" &&
        (showHideCountry == 1 || showHideTerritory == 1)
      ) {
        commercialFormik.setFieldError("caseOneData", "Please select value");
        return true;
      }
    }

    //check validation for case2 data
    if (alignment == "case_2") {
      const { labelValue, other_source, primary_country } =
        commercialFormik?.values?.caseTwoData;

      if (primary_country == undefined || primary_country == null) {
        commercialFormik.setFieldError("caseTwoData", "Please select value");
        return true;
      }

      if (isValidOtherSources(other_source)) {
        commercialFormik.setFieldError("caseTwoData", "Please select value");
        return true;
      }

      if (labelValue == "") {
        commercialFormik.setFieldError("caseTwoData", "Please select value");
        return true;
      }
    }

    //check validation for case3 data
    if (alignment == "case_3") {
      const { caseThreeData } = commercialFormik?.values;

      const checkForValues = caseThreeData.filter(
        (item) =>
          item?.origin == "" ||
          item?.origin == null ||
          item?.made_in == "" ||
          item?.made_in == null
      );
      if (checkForValues.length > 0 || caseThreeData?.lenght == 0) {
        commercialFormik.setFieldError("caseThreeData", "Please select value");
        return true;
      }
    }
    return false;
  };
  const updatePlaceOfOrigin = async () => {
    const formData = new FormData();
    setPublished("");
    formData.append("published", "0");
    formData.append("case_type", alignment);
    formData.append("id", productId || "");
    formData.append("percentage", percentageValue);
    const { caseOneData, caseTwoData, caseThreeData } =
      commercialFormik?.values;

    //save case1 data in formData
    if (alignment == "case_1") {
      formData.append(
        "caseData",
        JSON.stringify({
          ...caseOneData,
          value: caseOneData?.value?.length
            ? caseOneData?.value.filter((v) => v).join(",")
            : "",
        })
      );
    }

    //save case2 data in formData
    if (
      alignment == "case_2" &&
      caseTwoData.other_source &&
      caseTwoData.primary_country
    ) {
      formData.append(
        "caseData",
        JSON.stringify({
          ...caseTwoData,
          other_source: caseTwoData.other_source.filter((v) => v),
          primary_country: caseTwoData.primary_country,
        })
      );
    }

    //save case3 data in fordata
    if (alignment == "case_3") {
      const stringifiedData = caseThreeData.map((item) => ({
        ...item,
        origin: JSON.stringify(item.origin),
        made_in: JSON.stringify(item.made_in),
      }));
      formData.append("caseData", JSON.stringify(stringifiedData));
    }

    //api call after the the validation check in onClick function with formData.
    const response = await apiClient(
      "product/view/single/update",
      "post",
      { body: formData },
      true
    );

    if (response.status == 200) {
      if (alignment != "") {
        FetchProductDetail();
      }
    }
  };

  //function to Validate the shipping options data for making API
  const checkValidationsForShippingOptions = () => {
    const {
      country_origin_cities,
      existence_cities,
      in_house_production,
      production_unit,
      in_house_production_days,
      delivery_time,
      delivery_select,
      country_origins,
      dispatch_in,
      dispatch_day,
      delivery_time_value,
      delivery_time_period,
      existence_place,
      sea_,
      port_,
      product_type,
      seaportList,
    } = commercialFormik?.values;

    let isError = false;

    if (delivery_time_value && dispatch_in) {
      const deliveryTime = convertToDays(
        delivery_time_value,
        delivery_time_period
      );
      const preparationTime = convertToDays(dispatch_in, dispatch_day);

      if (deliveryTime <= preparationTime) {
        commercialFormik.setFieldTouched("delivery_time_value", true);
        commercialFormik.setFieldTouched("delivery_time_period", true);
        commercialFormik.setFieldError(
          "delivery_time_value",
          "Please enter a value greater than the order preparation time."
        );
        commercialFormik.setFieldError(
          "delivery_time_period",
          "Please select a value greater than the order preparation time."
        );
        isError = true;
      }
    }    

    const requiredFields = {
      by_order: [
        {
          field: in_house_production,
          name: "in_house_production",
          isSelect: false,
        },
        { field: production_unit, name: "production_unit", isSelect: true },
        {
          field: in_house_production_days,
          name: "in_house_production_days",
          isSelect: true,
        },
        { field: delivery_time, name: "delivery_time", isSelect: false },
        { field: delivery_select, name: "delivery_select", isSelect: true },
        { field: country_origins, name: "country_origins", isSelect: true },
        {
          field: country_origin_cities,
          name: "country_origin_cities",
          isSelect: true,
        },
      ],
      in_stock: [
        { field: dispatch_in, name: "dispatch_in", isSelect: false },
        { field: dispatch_day, name: "dispatch_day", isSelect: true },
        {
          field: delivery_time_value,
          name: "delivery_time_value",
          isSelect: false,
        },
        {
          field: delivery_time_period,
          name: "delivery_time_period",
          isSelect: true,
        },
        { field: existence_place, name: "existence_place", isSelect: true },
        { field: existence_cities, name: "existence_cities", isSelect: true },
      ],
      common: [
        { field: port_, name: "port_", isSelect: true },
      ],
    };
    if (Array.isArray(seaportList) && seaportList.length > 0) {
      requiredFields.common.push({ field: sea_, name: "sea_", isSelect: true });
    }

    const checkFields = (fields) => {
      let error = false;
      for (let { field, name, isSelect } of fields) {
        if (
          (Array.isArray(field) && field.length === 0) ||
          (!Array.isArray(field) && !field)
        ) {
          if (isSelect) {
            commercialFormik.setFieldTouched(name, true);
            commercialFormik.setFieldError(name, "Please select value");
          } else {
            commercialFormik.setFieldTouched(name, true);
            commercialFormik.setFieldError(name, "Please enter value");
          }
          error = true;
        }
      }
      return error;
    };

    if (product_type === "simple") {
      if (availability === "by_order" && checkFields(requiredFields.by_order))
        isError = true;
      if (availability === "in_stock" && checkFields(requiredFields.in_stock))
        isError = true;
      if (checkFields(requiredFields.common)) isError = true;
    } else {
      if (availability === "by_order" && checkFields(requiredFields.by_order))
        isError = true;
      if (checkFields(requiredFields.common)) isError = true;
    }

    return isError;
  };

  //function to Make the API call for updating the data for shipping options
  const updateShippingOptions = async () => {
    const formData = new FormData();
    setPublished("");
    const { existence_cities, country_origin_cities } =
      commercialFormik?.values;
    formData.append("id", productId || "");
    formData.append("percentage", percentageValue);

    if (product_type === "simple") {
      if (availability === "in_stock") {
        formData.append(
          "country_origin_id",
          country_origin_id?.map((v) => v.country_code)?.toString() || ""
        );
        formData.append("published", "0");
        formData.append("production_unit", "");
        formData.append("in_house_production", "");
        formData.append("in_house_production_days", "");
        formData.append("delivery_time", "");
        formData.append("delivery_select", "");
        formData.append("country_origins", "");
        formData.append("country_origin_cities", "");
        formData.append("existence_cities", existence_cities);
        formData.append("existence_place", existence_place);
        formData.append("dispatch_in", dispatch_in);
        formData.append("dispatch_day", dispatch_day);
        formData.append("delivery_time_value", delivery_time_value);
        formData.append("delivery_time_period", delivery_time_period);

        if (price_type === "fixed") {
          formData.append("current_stock", current_stock);
        }
      }

      if (availability === "by_order") {
        formData.append("existence_place", "");
        formData.append("existence_cities", "");
        formData.append("in_house_production", in_house_production);
        formData.append("production_unit", production_unit);
        formData.append("in_house_production_days", in_house_production_days);
        formData.append("delivery_time", delivery_time);
        formData.append("delivery_time_value", "");
        formData.append("delivery_select", delivery_select);
        formData.append(
          "tertiary_id",
          tertiary_id?.map((v) => v.country_code)?.toString() || ""
        );
        formData.append("dispatch_in", "");
        formData.append("country_origins", country_origins);
        formData.append("country_origin_cities", country_origin_cities);
        formData.append("existence_place", "");
        formData.append("existence_cities", "");
        formData.append("delivery_time_value", "");
        formData.append("delivery_time_period", "");
        formData.append("dispatch_day", "");
      }
    } else {
      formData.append("existence_place", existence_place);
      formData.append("existence_cities", existence_cities);
      formData.append("in_house_production", in_house_production);
      formData.append("production_unit", production_unit);
      formData.append("in_house_production_days", in_house_production_days);
      formData.append("delivery_time", delivery_time);
      formData.append("delivery_select", delivery_select);
      formData.append(
        "tertiary_id",
        tertiary_id?.map((v) => v.country_code)?.toString() || ""
      );
      formData.append("country_origins", country_origins);
      formData.append("country_origin_cities", country_origin_cities);
      formData.append("existence_place", "");
      formData.append("existence_cities", "");
      formData.append("delivery_time_value", "");
      formData.append("delivery_time_period", "");
    }

    formData.append("sea_", sea_?.join(",") || "");
    formData.append("port_", port_?.join(",") || "");

    const response = await apiClient(
      "product/view/single/update",
      "post",
      { body: formData },
      true
    );

    if (response.status == 200) {
      FetchProductDetail();
    }
  };
  const [orderOptions, setOrderOptions] = useState<any>(
    order_quantity.length > 1 ? order_quantity : ""
  );
  useEffect(() => {
    const { quantity_based_list } = productDetail;
    if (quantity_based_list?.length > 0) {
      let list = quantity_based_list.map((v) => ({
        min: v.min_qty,
        price: v.price,
        id: v.id,
      }));
      setOrderOptions(list);
      formik.setFieldValue("order_quantity", list);
    }
  }, [productDetail]);
  const handleSave = () => {
    if (availability === "in_stock") {
      if (product_type == "configured" && price_type === "") {
      }
      if (product_type == "simple" && price_type === "") {
        commercialFormik.setFieldError(
          "price_type",
          "Please select price type"
        );
        toast.error("Please select price type");
        commercialFormik.setFieldTouched("price_type", true);
        return;
      }
      if (price_type === "fixed") {
        if (!quantity_available || !unit || !unit_price || !price_term) {
          toast.error("Please fill all pricing options fields");
          return;
        }
      }
      if (price_type === "quantity") {
        const allMinQtyHasData = order_quantity.every(
          (item) =>
            item.min_qty !== null &&
            item.min_qty !== undefined &&
            item.min_qty != ""
        );

        if (!quantity_available) {
          toast.error("Please fill in the quantity available field.");
          return;
        } else if (!qty_unit) {
          toast.error("Please fill in the quantity unit field.");
          return;
        } else if (!price_term) {
          toast.error("Please select a price term.");
          return;
        }
      }

      if (alignment == "") {
        toast.error("Please select case type");
        return;
      }
      if (alignment == "case_1") {
        if (!caseOneData?.country?.length) {
          toast.error("Please select country for case one");
          return;
        }
        if (
          !caseOneData?.label &&
          (showHideCountry == 1 || showHideTerritory == 1)
        ) {
          toast.error("Please select value for label case one");
          return;
        }
      }

      if (alignment == "case_2") {
        if (
          !caseTwoData?.primary_country ||
          !caseTwoData?.primary_country?.value ||
          !caseTwoData?.primary_country?.view
        ) {
          toast.error("Please select primary country for case 2");
          return;
        }
        if (!caseTwoData?.other_source[0]?.sourcedCountry.length) {
          toast.error("Please select source for country case two");
          return;
        }
        if (!caseTwoData?.labelValue) {
          toast.error("Please select label for country case two");
          return;
        }
        if (!caseTwoData?.other_source[0]?.componentName) {
          toast.error("Please enter component name for case two");
          return;
        }
      }

      if (checkValidationsForShippingOptions()) {
        toast.error("Please fill in all the shipping options");
        return;
      }
    } else if (availability === "by_order") {
      if (price_type == "") {
        commercialFormik.setFieldError(
          "price_type",
          "Please select price type"
        );
        toast.error("Please select price type");
        commercialFormik.setFieldTouched("price_type", true);
        return;
      }
      if (price_type === "fixed") {
        if (!unit || !unit_price || !price_term) {
          toast.error("Please fill all pricing options fields");
          return;
        }
      }
      if (price_type === "quantity") {
        if (!qty_unit || !price_term) {
          toast.error("Please fill all quantity based fields");
          return;
        }
        const allMinQtyHasData = commercialFormik.values.order_quantity.every(
          (item) =>
            item.min_qty !== null &&
            item.min_qty !== undefined &&
            item.min_qty != ""
        );
        if (!allMinQtyHasData) {
          toast.error("Please enter minimum quantity value for quantity based");
          return;
        }
      }
      if (price_type === "quantity" && !order_quantity && !order_quantity) {
        toast.error("Please enter Minimum order quantity range");
        return;
      }

      if (alignment == "") {
        toast.error("Please select case type");
        return;
      }
      if (alignment == "case_1") {
        if (!caseOneData?.country?.length) {
          toast.error("Please select country for case one");
          return;
        }
        if (!caseOneData?.label) {
          toast.error("Please select value for label case one");
          return;
        }
      }
      if (alignment == "case_2") {
        if (!caseTwoData?.label) {
          toast.error("Please select label for country case two");
          return;
        }
        if (!caseTwoData?.other_source?.length) {
          toast.error("Please select source for country case two");
          return;
        }
        if (!caseTwoData?.primary_country) {
          toast.error("Please select primary country for country two");
          return;
        }
      }

      if (checkValidationsForShippingOptions()) {
        toast.error("Please fill in all the shipping options");
        return;
      }
    }

    validateAndUpdateRestrictions();
  };
  const handleConfigSave = () => {
    if (availability === "by_order") {
      if (alignment == "") {
        toast.error("Please select case type");
        return;
      }
      if (alignment == "case_1") {
        if (!caseOneData?.country?.length) {
          toast.error("Please select country for case one");
          return;
        }
        if (!caseOneData?.label) {
          toast.error("Please select value for label case one");
          return;
        }
      }
      if (alignment == "case_2") {
        if (!caseTwoData?.label) {
          toast.error("Please select label for country case two");
          return;
        }
        if (!caseTwoData?.other_source?.length) {
          toast.error("Please select source for country case two");
          return;
        }
        if (!caseTwoData?.primary_country) {
          toast.error("Please select primary country for country two");
          return;
        }
      }

      if (checkValidationsForShippingOptions()) {
        toast.error("Please fill in all the shipping options");
        return;
      }

      if (price_type === "quantity" && !order_quantity && !order_quantity) {
        toast.error("Please enter Minimum order quantity range");
        return;
      }

      if (alignment == "") {
        toast.error("Please select case type");
        return;
      }
      if (alignment == "case_1") {
        if (!caseOneData?.country?.length) {
          toast.error("Please select country for case one");
          return;
        }
        if (!caseOneData?.label) {
          toast.error("Please select value for label case one");
          return;
        }
      }
      if (alignment == "case_2") {
        if (!caseTwoData?.other_source?.length) {
          toast.error("Please select country for case two");
          return;
        }
        if (!caseTwoData?.label) {
          toast.error("Please select label for country case two");
          return;
        }
        if (!caseTwoData?.other_source?.length) {
          toast.error("Please select source for country case two");
          return;
        }
        if (!caseTwoData?.primary_country) {
          toast.error("Please select primary country for country two");
          return;
        }
      }

      if (checkValidationsForShippingOptions()) {
        toast.error("Please fill in all the shipping options");
        return;
      }
    }

    validateAndUpdateRestrictions();
  };

  const [availableRest, setAvailabelRest] = useState(false);
  const [availableManuf, setAvailabelManuf] = useState(false);

  const validateAndUpdateRestrictions = async () => {
    const { restrictions, quote_button_type } = commercialFormik?.values;
    let hasError = false;
    if (restrictions?.available_restrictions_status) {
      if (restrictions?.available_restrictions_country == "") {
        setAvailabelRest(true);
        hasError = true;
      }
    }
    if (restrictions?.manufacturing_restrictions_status) {
      if (restrictions?.manufacturing_restrictions_country == "") {
        setAvailabelManuf(true);
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }
    setButtonLoader(false);
    setPublished("");
    setImagesBlock({ disable: false, expanded: true });
    setCompletedFields((prev) => ({ ...prev, commercial: true }));
    //add data in formData
    const formData = new FormData();
    formData.append("id", productId || "");
    formData.append("quote_button_type", quote_button_type);
    if (Object.keys(restrictions).length > 0) {
      formData.append("restrictions", JSON.stringify(restrictions));
      formData.append("percentage", percentageValue);
    }
    //API call to update the data
    setButtonLoader(true);
    const response = await apiClient(
      "product/view/single/update",
      "post",
      { body: formData },
      true
    );

    //if status of response from APi comes as 200 move to next accordian not the next tab because nect tab is on hold at the moment.
    if (response.status == 200) {
      setAccordianValue("image");
      const fomikFields = ["restrictions", "quote_button_type"];
      setErrorEmpty(fomikFields, true);
      setImagesBlock({ disable: false, expanded: true });
      setCompletedFields((prev) => ({ ...prev, commercial: true }));
      if (alignment != "") {
        FetchProductDetail();
      }
      setButtonLoader(false);
    }
    // handleNextTabChange("6");
  };

  //for paymentMethod tab
  useEffect(() => {
    if (product_type === "simple") {
      const { paymentMethods } = productScoreValues?.commercialInformation;
      
    } else if (product_type === "configured") {
      const { paymentMethods } =
        configProductScoreValues?.commercialInformation;
      HandlePercentage(
        "config_commercial_payment_method",
        payment_methods ? 17.13062099 : 0
      );
    }
  }, [payment_methods]);

  //for country of origin
  const { caseOneData, caseTwoData, caseThreeData } = commercialFormik?.values;
  useEffect(() => {
    if (product_type === "simple") {
      if (alignment == "case_1") {
        //clearing case2 score data
        HandlePercentage("COO_case2_country", 0);
        HandlePercentage("COO_case2_component", 0);
        HandlePercentage("COO_case2_other_source", 0);
        //---end here---------------

        //clearing case3 data for score
        HandlePercentage("COO_case3_forOrdersFrom", 0);

        HandlePercentage("COO_case3_productMadeIn", 0);
        //----------end here---------------------
        const { country } =
          productScoreValues?.commercialInformation?.placeOfOrigin
            ?.productFromSpecificCountriesOfOrigin;

        HandlePercentage(
          "COO_case1_country",
          caseOneData?.country?.length > 0 ? country : 0
        );
      }
      if (alignment == "case_2") {
        //clearing case1 data for score
        HandlePercentage("COO_case1_country", 0);
        //--------------end here---------------------

        //clearing case3 data for score
        HandlePercentage("COO_case3_forOrdersFrom", 0);

        HandlePercentage("COO_case3_productMadeIn", 0);
        //----------end here---------------------
        const { primary_country, other_source } = caseTwoData;
        const { country, component, sourcedFrom } =
          productScoreValues?.commercialInformation?.placeOfOrigin
            ?.productComponentsManufacturedInDifferentCountries;

        HandlePercentage(
          "COO_case2_country",
          primary_country?.value ? country : 0
        );

        HandlePercentage(
          "COO_case2_component",
          other_source?.length > 0 && other_source[0] ? component : 0
        );

        HandlePercentage(
          "COO_case2_other_source",
          other_source?.length > 0 &&
            other_source[0]?.sourcedCountry?.length > 0
            ? sourcedFrom
            : 0
        );
      }
      if (alignment == "case_3") {
        //clearing case1 data for score
        HandlePercentage("COO_case1_country", 0);
        //--------------end here---------------------

        //clearing case2 score data
        HandlePercentage("COO_case2_country", 0);
        HandlePercentage("COO_case2_component", 0);
        HandlePercentage("COO_case2_other_source", 0);
        //---end here---------------
        const { forOrdersFrom, productMadeIn } =
          productScoreValues?.commercialInformation?.placeOfOrigin
            ?.regionalOriginLabelling;
        HandlePercentage(
          "COO_case3_forOrdersFrom",
          caseThreeData[0]?.origin ? forOrdersFrom : 0
        );

        HandlePercentage(
          "COO_case3_productMadeIn",
          caseThreeData[0]?.made_in ? productMadeIn : 0
        );
      }
    } else if (product_type === "configured") {
      if (alignment == "case_1") {
        //clearing case2 score data
        HandlePercentage("config_COO_case2", 0);
       
        HandlePercentage("config_COO_case3", 0);

       
        //----------end here---------------------
        const { country } =
          configProductScoreValues?.commercialInformation?.placeOfOrigin
            ?.productFromSpecificCountriesOfOrigin;

        HandlePercentage(
          "config_COO_case1_country",
          caseOneData?.country?.length > 0 ? 2.141327623 : 0
        );
      }
      if (alignment == "case_2") {
        //clearing case1 data for score
        HandlePercentage("config_COO_case1_country", 0);
        //--------------end here---------------------

        //clearing case3 data for score
        HandlePercentage("config_COO_case3", 0);

        // HandlePercentage("config_COO_case3_productMadeIn", 0);
        //----------end here---------------------
        const { primary_country, other_source } = caseTwoData;
        const { country, component, sourcedFrom } =
          configProductScoreValues?.commercialInformation?.placeOfOrigin
            ?.productComponentsManufacturedInDifferentCountries;

        if (
          primary_country?.value &&
          other_source?.length > 0 &&
          other_source?.length > 0
        ) {
          HandlePercentage("config_COO_case2", 2.141327623);
        }

       
      }
      if (alignment == "case_3") {
        //clearing case1 data for score
        HandlePercentage("config_COO_case1_country", 0);
        //--------------end here---------------------

        //clearing case2 score data
        HandlePercentage("config_COO_case2", 0);
      
        //---end here---------------
        const { forOrdersFrom, productMadeIn } =
          configProductScoreValues?.commercialInformation?.placeOfOrigin
            ?.regionalOriginLabelling;

        if (caseThreeData[0]?.origin && caseThreeData[0]?.made_in) {
          HandlePercentage(
            "config_COO_case3",
            caseThreeData[0]?.origin ? 2.141327623 : 0
          );
        }
       
      }
    }
  }, [caseOneData, caseTwoData, caseThreeData, alignment]);

  //for pricing tab
  const { quantity_available } = commercialFormik?.values;
  useEffect(() => {
    const {
      quantityAvailable,
      measurementUnit,
      price,
      currency,
      shippingIncoterms,
    } = productScoreValues?.commercialInformation?.pricing?.fixedPricing;
    if (product_type === "simple") {
      if (availability === "in_stock") {
        //fixed pricing score
        if (price_type == "fixed") {
          //clearing quantity values
          HandlePercentage("commrecial_quantity_quantity_available", 0);
          HandlePercentage("commrecial_quantity_unit", 0);
          HandlePercentage("commrecial_quantity_currency", 0);
          HandlePercentage("commrecial_quantity_shipping_incoterm", 0);
          HandlePercentage("commrecial_quantity_MOQ", 0);
          HandlePercentage("commrecial_quantity_price_per_unit", 0);
          //------------------------end here -------------
          HandlePercentage(
            "commrecial_fixed_quantity_available",
            quantity_available !== "" &&
              quantity_available != "0" &&
              quantity_available != "00" &&
              quantity_available != "000"
              ? quantityAvailable
              : 0
          );
          HandlePercentage("commrecial_fixed_unit", unit ? measurementUnit : 0);
          HandlePercentage("commrecial_fixed_price", unit_price ? price : 0);
          HandlePercentage(
            "commrecial_fixed_currency",
            currency_id ? currency : 0
          );
          HandlePercentage(
            "commrecial_fixed_shipping_incoterm",
            price_term ? shippingIncoterms : 0
          );
        }

        //quantity based scring
        if (price_type === "quantity") {
          //clearing in_stock score
          HandlePercentage("commrecial_fixed_quantity_available", 0);
          HandlePercentage("commrecial_fixed_unit", 0);
          HandlePercentage("commrecial_fixed_price", 0);
          HandlePercentage("commrecial_fixed_currency", 0);
          HandlePercentage("commrecial_fixed_shipping_incoterm", 0);
          //-----------ends here---------------

          const {
            quantityAvailable,
            unit: measurementUnit,
            currency,
            MOQ,
            pricePerUnit,
            shippingIncoterms,
          } = productScoreValues?.commercialInformation?.pricing
            ?.quantityBasedPricing;

          HandlePercentage("commrecial_quantity_quantity_available", 4);
          HandlePercentage("commrecial_quantity_unit", 0);
          HandlePercentage(
            "commrecial_quantity_currency",
            currency_id ? currency : 0
          );
          HandlePercentage("commrecial_quantity_shipping_incoterm", 4);

          HandlePercentage("commrecial_quantity_MOQ", 8);

          HandlePercentage("commrecial_quantity_price_per_unit", 4);
        }
      } else {
        if (availability === "by_order") {
          //fixed pricing score
          if (price_type == "fixed") {
            //clearing quantity values
            HandlePercentage("commrecial_quantity_quantity_available", 0);
            HandlePercentage("commrecial_quantity_unit", 0);
            HandlePercentage("commrecial_quantity_currency", 0);
            HandlePercentage("commrecial_quantity_shipping_incoterm", 0);
            HandlePercentage("commrecial_quantity_MOQ", 0);
            HandlePercentage("commrecial_quantity_price_per_unit", 0);
            //------------------------end here -------------
            HandlePercentage(
              "commrecial_fixed_quantity_available",
              quantity_available !== "" &&
                quantity_available != "0" &&
                quantity_available != "00" &&
                quantity_available != "000"
                ? quantityAvailable
                : 0
            );
            HandlePercentage(
              "commrecial_fixed_unit",
              unit ? measurementUnit : 0
            );
            HandlePercentage("commrecial_fixed_price", unit_price ? 8 : 0);
            HandlePercentage(
              "commrecial_fixed_currency",
              currency_id ? currency : 0
            );
            HandlePercentage(
              "commrecial_fixed_shipping_incoterm",
              price_term ? shippingIncoterms : 0
            );
          }

          //quantity based scring
          if (price_type === "quantity") {
            //clearing in_stock score
            HandlePercentage("commrecial_fixed_quantity_available", 0);
            HandlePercentage("commrecial_fixed_unit", 0);
            HandlePercentage("commrecial_fixed_price", 0);
            HandlePercentage("commrecial_fixed_currency", 0);
            HandlePercentage("commrecial_fixed_shipping_incoterm", 0);
            //-----------ends here---------------

            const {
              quantityAvailable,
              unit: measurementUnit,
              currency,
              MOQ,
              pricePerUnit,
              shippingIncoterms,
            } = productScoreValues?.commercialInformation?.pricing
              ?.quantityBasedPricing;

            HandlePercentage("commrecial_quantity_quantity_available", 4);
            HandlePercentage("commrecial_quantity_unit", 0);
            HandlePercentage(
              "commrecial_quantity_currency",
              currency_id ? currency : 0
            );
            HandlePercentage("commrecial_quantity_shipping_incoterm", 4);

            HandlePercentage("commrecial_quantity_MOQ", 8);

            HandlePercentage("commrecial_quantity_price_per_unit", 4);
          }
        }
      }
     
    }
  }, [
    quantity_available,
    unit,
    price_term,
    unit_price,
    currency_id,
    order_quantity,
    price_type,
    qty_unit,
  ]);

  //for shipping options tab
  useEffect(() => {
    const {
      country_origin_cities,
      existence_cities,
      in_house_production,
      production_unit,
      in_house_production_days,
      delivery_time,
      delivery_select,
      country_origins,
      dispatch_in,
      dispatch_day,
      delivery_time_value,
      delivery_time_period,
      existence_place,
      sea_,
      port_,
      product_type,
    } = commercialFormik?.values;

    if (product_type == "simple") {
      const {
        orderPreparationTime,
        deliveryTimePeriod,
        currentExistencePlace: {
          country,
          city,
          nearbySeaports,
          nearbyAirports,
        },
      } = productScoreValues?.commercialInformation?.shippingOptions;
      if (availability == "in_stock") {
        //clearing score data for instock shipping options
        HandlePercentage("shipping_quantity_order_preparation_time", 0);
        HandlePercentage("shipping_quantity_deliver_time_period", 0);

        HandlePercentage("shipping_quantity_country", 0);
        HandlePercentage("shipping_quantity_city", 0);
        //------------end here--------------------
        HandlePercentage(
          "shipping_stock_order_preparation_time",
          dispatch_in && dispatch_day ? orderPreparationTime : 0
        );
        HandlePercentage(
          "shipping_stock_deliver_time_period",
          delivery_time_value && delivery_time_period ? deliveryTimePeriod : 0
        );

        HandlePercentage(
          "shipping_stock_country",
          existence_place ? country : 0
        );
        HandlePercentage("shipping_stock_city", existence_cities ? city : 0);
      }
      if (availability == "by_order") {
        //clearing score data for instock shipping options
        HandlePercentage("shipping_stock_order_preparation_time", 0);
        HandlePercentage("shipping_stock_deliver_time_period", 0);
        HandlePercentage("shipping_stock_country", 0);
        HandlePercentage("shipping_stock_city", 0);

        //-------end here---------------

        HandlePercentage(
          "shipping_quantity_order_preparation_time",
          in_house_production && in_house_production_days
            ? orderPreparationTime
            : 0
        );
        HandlePercentage(
          "shipping_quantity_deliver_time_period",
          delivery_time && delivery_select ? deliveryTimePeriod : 0
        );

        HandlePercentage(
          "shipping_quantity_country",
          country_origins ? country : 0
        );
        HandlePercentage(
          "shipping_quantity_city",
          country_origin_cities ? city : 0
        );
      }

      //common
      HandlePercentage(
        "shipping_stock_sea",
        sea_?.length > 0 ? nearbySeaports : 0
      );
      HandlePercentage(
        "shipping_stock_port",
        port_?.length > 0 ? nearbyAirports : 0
      );
    } else if (product_type === "configured") {
      const {
        productionCapacity,
        deliveryTimePeriod,
        pickupLocation: { country, city, nearbySeaports, nearbyAirports },
      } = configProductScoreValues?.commercialInformation?.shippingOptions;
      // if (availability == "by_order") {
      HandlePercentage(
        "config_shipping_quantity_production",
        in_house_production && in_house_production_days ? 2.141327623 : 0
      );
      HandlePercentage(
        "config_shipping_quantity_deliver_time_period",
        delivery_time && delivery_select ? 2.141327623 : 0
      );

      HandlePercentage(
        "config_shipping_quantity_country",
        country_origins ? 1.070663812 : 0
      );
      HandlePercentage(
        "config_shipping_quantity_city",
        country_origin_cities ? 1.070663812 : 0
      );
      //common
      HandlePercentage(
        "config_shipping_stock_sea",
        sea_?.length > 0 ? 1.070663812 : 0
      );
      HandlePercentage(
        "config_shipping_stock_port",
        port_?.length > 0 ? 1.070663812 : 0
      );
      // }
    }
  }, [
    availability,
    dispatch_in,
    dispatch_day,
    delivery_time_value,
    delivery_time_period,
    existence_place,
    commercialFormik?.values?.existence_cities,
    in_house_production,
    in_house_production_days,
    delivery_time,
    delivery_select,
    country_origins,
    commercialFormik?.values?.country_origin_cities,
    sea_,
    port_,
  ]);

  //for product availabillity
  useEffect(() => {
    const { restrictions } = commercialFormik?.values;
    

    if (
      productDetail?.manufacturing_restrictions_country &&
      productDetail?.available_restrictions_country &&
      productDetail?.available_restrictions_availibility &&
      productDetail?.manufacturing_restrictions_availibility
    ) {
      if (productDetail?.product_type == "simple") {
        const { productAvailabilityOrManufacturingRestrictions } =
          productScoreValues?.commercialInformation;
        HandlePercentage(
          "product_availability_manufacture_restriction",
          productAvailabilityOrManufacturingRestrictions
        );
      } else if (productDetail?.product_type === "configured") {
       
        HandlePercentage(
          "config_product_availability_manufacture_restriction",
          1.070663812
        );
      }
    }
  }, [productDetail]);
  useEffect(() => {
    if (!isMount) setIsMount(true);
    const {
      in_house_production_days,
      delivery_select,
      delivery_time,
      in_house_production,
      tertiary_id,
      country_origin_id,
      existence_place,
      price_term,
      current_stock,
      unit_price,
      currency_id,
      dispatch_in,
      dispatch_day,
      country_origins,
      quantity_based_list,
      product_type,
      price_type,
    } = productDetail;
    // if (price_type) setPriceType(price_type);
    if (product_type === "simple") {
      if (availability === "in_stock") {
        if (price_type) {
          if (price_type === "quantity") {
            if (
              price_term !== "" &&
              currency_id !== "" &&
              quantity_based_list?.length > 0 &&
              dispatch_in !== "" &&
              dispatch_day !== "" &&
              // country_origin_id?.length > 0 &&
              existence_place !== "" &&
              !isMount
            ) {
              setImagesBlock({ disable: false, expanded: true });
              setCompletedFields((prev) => ({ ...prev, commercial: true }));
              setIsMount(true);
            }
          }
          if (price_type === "fixed") {
            if (
              price_term !== "" &&
              currency_id !== "" &&
              current_stock !== "" &&
              dispatch_in !== "" &&
              dispatch_day !== "" &&
              unit_price !== "" &&
              // country_origin_id?.length > 0 &&
              existence_place !== "" &&
              !isMount
            ) {
              setImagesBlock({ disable: false, expanded: true });
              setCompletedFields((prev) => ({ ...prev, commercial: true }));
              setIsMount(true);
            }
          }
        }
      }
      if (availability === "by_order") {
        if (price_type) {
          if (price_type === "quantity") {
            if (
              price_term !== "" &&
              currency_id !== "" &&
              quantity_based_list?.length > 0 &&
              in_house_production !== "" &&
              in_house_production_days !== "" &&
              delivery_time !== "" &&
              delivery_select !== "" &&
              // tertiary_id?.length > 0 &&
              country_origins !== "" &&
              !isMount
            ) {
              setImagesBlock({ disable: false, expanded: true });
              setCompletedFields((prev) => ({ ...prev, commercial: true }));
              setIsMount(true);
            }
          }
          if (price_type === "fixed") {
            if (
              price_term !== "" &&
              currency_id !== "" &&
              unit_price !== "" &&
              in_house_production !== "" &&
              in_house_production_days !== "" &&
              delivery_time !== "" &&
              delivery_select !== "" &&
              // tertiary_id?.length > 0 &&
              country_origins !== "" &&
              !isMount
            ) {
              setImagesBlock({ disable: false, expanded: true });
              setCompletedFields((prev) => ({ ...prev, commercial: true }));
              setIsMount(true);
            }
          }
        }
      }
    }
    if (product_type !== "simple") {
     
      if (availability === "by_order") {
        if (
          in_house_production !== "" &&
          in_house_production_days !== "" &&
          price_term !== "" &&
          delivery_time !== "" &&
          delivery_select !== "" &&
          country_origins !== "" &&
          !isMount
        ) {
          setImagesBlock({ disable: false, expanded: true });
          setCompletedFields((prev) => ({ ...prev, commercial: true }));
          setIsMount(true);
        }
      }
    }
  }, [productDetail, availability, priceType]);

  useEffect(() => {
    if (
      (!productDetail?.sea_ || productDetail?.sea_?.split(",").length == 0) &&
      commercialFormik?.values?.seaportList.length == 0
    ) {
      const { availability, country_origins, existence_place } = productDetail;
      let countryCode =
        availability == "by_order" ? country_origins : existence_place;
      if (countryCode) {
        FetchSeaPortList("", countryCode ? countryCode : "");
      }
    }
    if (
      (!productDetail?.port_ || productDetail?.port_?.split(",").length == 0) &&
      commercialFormik?.values?.airportList.length == 0
    ) {
      const { availability, country_origins, existence_place } = productDetail;
      let countryCode =
        availability == "by_order" ? country_origins : existence_place;
      if (countryCode) {
        FetchAirPortList("", countryCode ? countryCode : "");
      }
    }
    if (productDetail.existence_place !== "") {
      const defaultCity = CountriesWithCitiesObject?.[
        modifiedCountriesList?.find(
          (v) => v?.value == productDetail.existence_place
        )?.view
      ]?.map((v) => ({ value: v, view: v }));
      const uniqueSelectedCity = Array.from(
        new Map(defaultCity?.map((item) => [item.value, item])).values()
      );
      setCitiesList(uniqueSelectedCity);
    }
    if (productDetail.country_origins !== "") {
      const defaultCity = CountriesWithCitiesObject?.[
        modifiedCountriesList?.find(
          (v) => v?.value == productDetail.country_origins
        )?.view
      ]?.map((v) => ({ value: v, view: v }));

      const uniqueSelectedCity = Array.from(
        new Map(defaultCity?.map((item) => [item.value, item])).values()
      );
      setOtherCitiesList(uniqueSelectedCity);
    }
  }, [productDetail]);

  useEffect(() => {
    if (product_type === "simple") {
      if (availability === "in_stock") {
        if (priceType === "quantity") {
          if (
            (price_term === "" ||
              currency_id === "" ||
              order_quantity?.length <= 0 ||
              dispatch_in === "" ||
              dispatch_day === "" ||
              existence_place === "") &&
            isMount
          ) {
            setImagesBlock({ disable: true, expanded: false });
            setCompletedFields((prev) => ({ ...prev, commercial: false }));
            setIsMount(false);
          }
        }
        if (priceType === "fixed") {
          if (
            (price_term === "" ||
              currency_id === "" ||
              current_stock === "" ||
              dispatch_in === "" ||
              dispatch_day === "" ||
              unit_price === "" ||
              // country_origin_id.length <= 0 ||
              existence_place === "") &&
            isMount
          ) {
            setImagesBlock({ disable: true, expanded: false });
            setCompletedFields((prev) => ({ ...prev, commercial: false }));
            setIsMount(false);
          }
        }
      }
      if (availability === "by_order") {
        if (priceType === "quantity") {
          if (
            (price_term === "" ||
              currency_id === "" ||
              order_quantity?.length <= 0 ||
              in_house_production === "" ||
              in_house_production_days === "" ||
              delivery_time === "" ||
              delivery_select === "" ||
              country_origins?.length <= 0) &&
            isMount
          ) {
            setImagesBlock({ disable: true, expanded: false });
            setCompletedFields((prev) => ({ ...prev, commercial: false }));
            setIsMount(false);
          }
        }
        if (priceType === "fixed") {
          if (
            (price_term === "" ||
              currency_id === "" ||
              unit_price === "" ||
              in_house_production === "" ||
              in_house_production_days === "" ||
              delivery_time === "" ||
              delivery_select === "" ||
              country_origins?.length <= 0) &&
            isMount
          ) {
            setImagesBlock({ disable: true, expanded: false });
            setCompletedFields((prev) => ({ ...prev, commercial: false }));
            setIsMount(false);
          }
        }
      }
    } else {
      if (availability === "in_stock") {
        if (
          (dispatch_in === "" ||
            dispatch_day === "" ||
            existence_place === "" ||
            price_term === "") &&
          isMount
        ) {
          setImagesBlock({ disable: true, expanded: false });
          setCompletedFields((prev) => ({ ...prev, commercial: false }));
          setIsMount(false);
        }
      } else {
        if (
          (in_house_production === "" ||
            in_house_production_days === "" ||
            delivery_time === "" ||
            delivery_select === "" ||
            country_origins?.length <= 0) &&
          isMount
        ) {
          setImagesBlock({ disable: true, expanded: false });
          setCompletedFields((prev) => ({ ...prev, commercial: false }));
          setIsMount(false);
        }
      }
    }
  }, [commercialFormik, isMount, availability, priceType]);

  const FetchSeaPortList = async (value = "", country_code = "") => {
    let response = await apiClient(
      `ports/getPorts?search=${value}&type=sea_ports&country=${country_code}&per_page=500`,
      "get"
    );
    if (response.status === 200) {
      commercialFormik.setFieldValue(
        "seaportList",
        response.data.map((v) => ({ view: v.name, value: v.name }))
      );
    }
  };
  const FetchAirPortList = async (value = "", country_code = "") => {
    let response = await apiClient(
      `ports/getPorts?search=${value}&type=air_ports&country=${country_code}&per_page=500`,
      "get"
    );

    if (response.status === 200) {
      commercialFormik.setFieldValue(
        "airportList",
        response.data.map((v) => ({ view: v.name, value: v.name }))
      );
    }
  };

  useEffect(() => {
    const formikFields = [
      "dispatch_in",
      "dispatch_day",
      "delivery_time_value",
      "delivery_time_period",
      "existence_place",
      "existence_cities",
      "in_house_production",
      "production_unit",
      "in_house_production_days",
      "delivery_time",
      "delivery_select",
      "port_",
      "sea_",
      "country_origins",
      "country_origin_cities",
    ];
    setErrorEmpty(formikFields, true);
  }, [availability]);

  const fetchSeaPort = React.useRef(
    _debounce(async (value, country_code) => {
      if (value) {
        FetchSeaPortList(value, country_code);
      }
    }, 100)
  ).current;

  const fetchAirPort = React.useRef(
    _debounce(async (value, country_code) => {
      if (value) {
        FetchAirPortList(value, country_code);
      }
    }, 100)
  ).current;

  let unitList = commercialUnitList.map((v) => ({
    view: FirstletterCapital(v.view),
    value: v.value,
  }));

  /**** Start Commercial Info Tab styling ****/
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setButtonLoader(false);
    setValue(newValue);
  };

  const [available, setAvailable] = React.useState("1");
  const handleRadioChange = (event: React.SyntheticEvent, newValue: string) => {
    setAvailable(newValue);
  };
  /**** End Commercial Info Tab styling ****/

  const handleNextTabChange = (nextTabValue) => {
    setValue(nextTabValue);
  };

  const setErrorEmpty = (name = [], isFormik = false) => {
    if (isFormik) {
      name?.forEach((item) => {
        if (name) {
          commercialFormik.setFieldError(item, "");
        }
      });
      return;
    }
  };

  const handleSavePricingTab = async () => {
    setOpenPopupForPricing(false);
    setButtonLoader(false);
    if (price_type == "quantity") {
      await QuantityBasedApi();
    }
    setButtonLoader(true);
    const formikFields = [
      "quantity_available",
      "qty_unit",
      "currency_id",
      "price_term",
      "order_quantity",
      "unit",
      "unit_price",
      "minimum_order",
    ];
    setErrorEmpty(formikFields, true);
    await updatePricingTab();
    handleNextTabChange("3");
    setButtonLoader(false);
  };

  const handleSaveCountryOfOrigin = async () => {
    setOpenPopupForCases(false);
    setButtonLoader(false);
    setButtonLoader(true);
    const formikFields = ["caseOneData", "caseTwoData", "caseThreeData"];
    setErrorEmpty(formikFields, true);
    await updatePlaceOfOrigin();
    setButtonLoader(false);
    handleNextTabChange("4");
  };

  useEffect(() => {
    if (
      !productDetail?.existence_place &&
      !productDetail?.existence_cities &&
      availability == "in_stock"
    ) {
      commercialFormik?.setFieldValue("sea_", []);
      commercialFormik?.setFieldValue("port_", []);
    } else if (
      !productDetail?.country_origins &&
      !productDetail?.country_origin_cities &&
      availability == "by_order"
    ) {
      commercialFormik?.setFieldValue("sea_", []);
      commercialFormik?.setFieldValue("port_", []);
    }
  }, [
    productDetail?.country_origins,
    productDetail?.country_origin_cities,
    productDetail?.existence_plac,
    productDetail?.existence_cities,
    availability,
    commercialFormik?.values?.country_origins,
    commercialFormik?.values?.country_origin_cities,
    commercialFormik?.values?.existence_plac,
    commercialFormik?.values?.existence_cities,
  ]);

  return (
    <>
      {openPopupForPricing && (
        <CommonPopUpDesc
          open={openPopupForPricing}
          handleClose={setOpenPopupForPricing}
          text={
            price_type == "quantity" ? (
              <>
                Pricing will be saved as information filled in{" "}
                <b> Quantity Based Pricing </b>
              </>
            ) : price_type == "fixed" ? (
              <>
                Pricing will be saved as information filled in{" "}
                <b> Fixed Pricing </b>
              </>
            ) : (
              ""
            )
          }
          onClickAction={handleSavePricingTab}
        />
      )}

      {openPopupForCases && (
        <CommonPopUpDesc
          open={openPopupForCases}
          handleClose={setOpenPopupForCases}
          text={
            alignment === "case_1" ? (
              <>
                <b>Country of Origin</b> will be saved as information filled in
                case 1
              </>
            ) : alignment === "case_2" ? (
              <>
                <b>Country of Origin</b> will be saved as information filled in
                case 2
              </>
            ) : alignment === "case_3" ? (
              <>
                <b>Country of Origin</b> will be saved as information filled in
                case 3
              </>
            ) : (
              ""
            )
          }
          onClickAction={handleSaveCountryOfOrigin}
        />
      )}
      {/**** Start Commercial Information Tab design *****/}
      <CommercialInfoTabSection>
        <TabContext value={value}>
          <TabOuterBox>
            <CustomTabs
              TabIndicatorProps={{
                style: { transition: "none" },
              }}
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              <Tab disableRipple label="Payment Methods" value="1" />
              {product_type === "simple" && (
                <Tab disableRipple label="Pricing" value="2" />
              )}
              <Tab disableRipple label="Country of Origin" value="3" />
              <Tab disableRipple label="Shipping Options" value="4" />
              <Tab
                disableRipple
                label="Product availability/restrictions "
                value="5"
              />
              <Tab disableRipple label="Customizations" value="6" />
            </CustomTabs>
            {/* </CustomTabList> */}
          </TabOuterBox>
          <TabPanel value={value === "1" && value}>
            <PaymentMethods
              setCompletedFields={setCompletedFields}
              percentage={percentage}
              FetchProductDetail={FetchProductDetail}
              productDetail={productDetail}
              formik={commercialFormik}
              setTabValue={setValue}
              setPublished={setPublished}
              setErrorEmpty={setErrorEmpty}
            />
          </TabPanel>
          <TabPanel value={value == "2" && value}>
            {product_type === "simple" && (
              <>
                <SelectPricingTBox>
                  <div style={{ display: "flex" }}>
                    <ToggleButtonGroup
                      value={price_type}
                      onChange={(e: any) => {
                        const formikFields = [
                          "quantity_available",
                          "qty_unit",
                          "currency_id",
                          "price_term",
                          "order_quantity",
                          "unit",
                          "unit_price",
                        ];
                        setErrorEmpty(formikFields, true);
                        setPriceType(e.target.value);
                        commercialFormik.setFieldValue(
                          "price_type",
                          e.target.value
                        );
                      }}
                      exclusive
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: "16px",
                        paddingBottom: "16px",
                        "@media screen and (max-width:480px)": {
                          flexDirection: "column",
                        },
                      }}
                    >
                      <ToggleButton
                        style={{ textTransform: "none" }}
                        value="fixed"
                        selected={price_type == "fixed"}
                        className={
                          price_type === "fixed"
                            ? "pricingTypeCustomToggleButtonSelected"
                            : "pricingTypeCustomToggleButton"
                        }
                      >
                        Fixed Pricing{" "}
                        {price_type === "fixed" && (
                          <span
                            style={{
                              display: "inline-flex",
                              position: "relative",
                              width: "16px",
                              height: "12px",
                              marginLeft: "8px",
                            }}
                          >
                            <Image
                              src={"/assets/smallTick.svg"}
                              alt="img"
                              width={10}
                              height={10}
                            />
                          </span>
                        )}
                      </ToggleButton>
                      <LightTooltip
                        disableInteractive
                        arrow
                        title="Offer incentives for bulk orders to attract larger buyers."
                        placement="top"
                      >
                        <ToggleButton
                          style={{ textTransform: "none" }}
                          className={
                            price_type == "quantity"
                              ? "pricingTypeCustomToggleButtonSelected"
                              : "pricingTypeCustomToggleButton"
                          }
                          selected={price_type == "quantity"}
                          value="quantity"
                          sx={{
                            "@media screen and (max-width:320px)": {},
                          }}
                        >
                          Quantity Based Pricing{" "}
                          {price_type === "quantity" && (
                            <span
                              style={{
                                display: "inline-flex",
                                position: "relative",
                                width: "16px",
                                height: "12px",
                                marginLeft: "8px",
                              }}
                            >
                              <Image
                                src={"/assets/smallTick.svg"}
                                alt="img"
                                width={10}
                                height={10}
                              />
                            </span>
                          )}
                        </ToggleButton>
                      </LightTooltip>
                    </ToggleButtonGroup>
                  </div>
                </SelectPricingTBox>
                {price_type == "" && (
                  <NoSectionSelectBox>
                    <NoSelectBoxInn>
                      <img src="/assets/images/no-pricing-img.svg" alt="" />
                      <Typography variant="h2">No Pricing selected</Typography>
                      <Typography variant="body1">
                        You have not selected any pricing type
                      </Typography>
                    </NoSelectBoxInn>
                  </NoSectionSelectBox>
                )}
              </>
            )}

            {price_type === "quantity" && (
              <QuantityBasedPricing
                accordionValue={accordionValue}
                formik={commercialFormik}
                availability={availability}
                product_type={product_type}
                productDetail={productDetail}
                commercialUnitList={commercialUnitList}
                setCommercialUnitList={setCommercialUnitList}
                setIsOrderQuantity={setIsOrderQuantity}
              />
            )}

            {price_type === "fixed" && (
              <FixedPricing
                accordionValue={accordionValue}
                productDetail={productDetail}
                formik={commercialFormik}
                availability={availability}
                commercialUnitList={commercialUnitList}
                setCommercialUnitList={setCommercialUnitList}
                HandlePercentage={HandlePercentage}
              />
            )}
            {product_type !== "simple" && (
              <ConfigurationProduct
                formik={commercialFormik}
                availability={availability}
              />
            )}

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
                onClick={async () => {
                  if (price_type == "") {
                    commercialFormik.setFieldError(
                      "price_type",
                      "Please select price type"
                    );
                    toast.error("Please select atleast one price type");
                    commercialFormik.setFieldTouched("price_type", true);
                    return;
                  }
                  if (
                    checkValidationForQuantityBased() ||
                    commercialFormik?.errors?.order_quantity
                  ) {
                    return;
                  }
                  if (
                    commercialFormik?.values?.unit_price <= 0 &&
                    price_type == "fixed"
                  ) {
                    toast.error("Price should not be 0 or less than 0.");
                    return;
                  }
                  let isZero = false;
                  if (price_type == "quantity" && order_quantity?.length > 0) {
                    const { order_quantity } = commercialFormik?.values;
                    order_quantity.forEach((item) => {
                      if (item.price <= 0) {
                        toast.error("Price should not be 0 or less than 0.");
                        isZero = true;
                      }
                    });
                  }
                  if (isZero) {
                    return;
                  }
                  setOpenPopupForPricing(true);
                  commercialFormik.setFieldError("price_type", "");
                }}
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
                  "Next"
                )}
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                ></ArrowForwardIosIcon>
              </Button>
            </ButtonCol>
          </TabPanel>
          <TabPanel value="3">
            <Box
              sx={{
                border: "1px solid rgb(221, 221, 221)",
                padding: "16px",
                margin: "0px 0px 0px 0px",
                borderRadius: "6px",
                position: "relative",
                "@media screen and (max-width:767px)": {
                  margin: "0",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-12px",
                  backgroundColor: "#fff",
                  margin: "0px 12px",
                  padding: "0px 6px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    "@media screen and (max-width:320px)": { fontSize: "12px" },
                  }}
                >
                  {/* Place of Origin */}
                  Country of Origin
                  <LightTooltip
                    arrow
                    title="Required"
                    disableInteractive
                    placement="top"
                  >
                    <span style={{ color: "#d7282f", padding: "0 3px" }}>
                      *
                    </span>
                  </LightTooltip>
                  <span>
                    <LightTooltip
                      placement={"top"}
                      title="Specify the country where your product was manufactured. This information
                      can be relevant for import/export regulations and buyer preferences."
                      arrow
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          display: "inline-block",
                          position: "relative",
                        }}
                      >
                        <Image
                          alt="help-img"
                          src={"/assets/helpIcon.svg"}
                          layout="fill"
                        />{" "}
                      </div>
                    </LightTooltip>
                  </span>
                </Typography>
              </Box>
              <Box sx={{ paddingBottom: "8px" }}>
                <Typography
                  sx={{ fontSize: "13px", color: "#414141", fontWeight: "500" }}
                >
                  Specify the origin of the product by selecting one of the
                  available cases.
                </Typography>
              </Box>
              <Grid container>
                <Grid item xs={12}>
                  <EmptyDivSpace></EmptyDivSpace>
                  <OriginCase>
                    <ToggleButtonBox>
                      <CustomToggleBtn
                        value={alignment}
                        exclusive
                        onChange={(e, value) => {
                          commercialFormik.setFieldValue("caseOneData", {});
                          commercialFormik.setFieldValue("caseTwoData", {});
                          commercialFormik.setFieldValue("caseThreeData", []);
                          setPrimaryCountry({});
                          commercialFormik.setFieldError("case_type", "");
                          if (value) {
                            setAlignment(value);
                            commercialFormik.setFieldValue("case_type", value);
                            commercialFormik.setFieldError("caseOneData", "");
                            commercialFormik.setFieldError("caseTwoData", "");
                            commercialFormik.setFieldError("caseThreeData", "");
                          }
                        }}
                        aria-label="Platform"
                        sx={{
                          marginBottom: "5px",
                          "& .MuiToggleButton-root": {
                            border: `${
                              commercialFormik?.errors?.case_type !== "" &&
                              commercialFormik?.errors?.case_type != undefined
                                ? "1px solid #d7282f !important"
                                : "1px solid #979797 !important"
                            }`,
                            color: `${
                              commercialFormik?.errors?.case_type !== "" &&
                              commercialFormik?.errors?.case_type != undefined
                                ? "#d7282f"
                                : "#000000"
                            }`,
                          },
                        }}
                      >
                        <ToggleButton value="case_1" className="CaseOne">
                          <i className="icon-approved"></i>Product from Specific
                          Countries of Origin
                        </ToggleButton>
                        <ToggleButton value="case_2" className="CaseTwo">
                          <i className="icon-approved"></i>Product Components
                          Manufactured in Different Countries
                        </ToggleButton>
                        <ToggleButton value="case_3" className="CaseThree">
                          <i className="icon-approved"></i>Regional Origin
                          Labeling
                        </ToggleButton>
                      </CustomToggleBtn>
                    </ToggleButtonBox>
                    {alignment === "" && (
                      <NoSectionSelectBox>
                        <NoSelectBoxInn>
                          <i className="icons icon-globe"></i>
                          <Typography variant="h2">No case selected</Typography>
                          <Typography variant="body1">
                            You haven't selected any case yet
                          </Typography>
                        </NoSelectBoxInn>
                      </NoSectionSelectBox>
                    )}

                    {alignment == "case_1" && (
                      <Case1
                        formik={commercialFormik}
                        setIsOrderQuantity={setIsOrderQuantity}
                        setShowHideTerritory={setShowHideTerritory}
                        showHideCountry={showHideCountry}
                        setShowHideCountry={setShowHideCountry}
                        showHideTerritory={showHideTerritory}
                        productDetail={productDetail}
                        setAlignment={setAlignment}
                        alignment={alignment}
                        selectedCountries={selectedCountries}
                        selectedTerritories={selectedTerritories}
                        setSelectedCountries={setSelectedCountries}
                        setSelectedTerritories={setSelectedTerritories}
                        multiplePlaceOrigin={multiplePlaceOrigin}
                        radioValue={radioValue}
                        setRadioValue={setRadioValue}
                        setMultiplePlaceOrigin={setMultiplePlaceOrigin}
                        setMultiplePlaceOriginTerritories={
                          setMultiplePlaceOriginTerritories
                        }
                        multiplePlaceOriginTerritories={
                          multiplePlaceOriginTerritories
                        }
                        selectedOrigin={selectedOrigin}
                        setSelectedOrigin={setSelectedOrigin}
                      />
                    )}
                    {alignment == "case_2" && (
                      <Case2
                        formik={commercialFormik}
                        isOrderquanity={isOrderquanity}
                        setIsOrderQuantity={setIsOrderQuantity}
                        primaryCountry={primaryCountry}
                        case_type={case_type}
                        productDetail={productDetail}
                        otherCountriesList={otherCountriesList}
                        setMultiplePrimaryComponents={
                          setMultiplePrimaryComponents
                        }
                        setOtherCountriesList={setOtherCountriesList}
                        multiplePrimaryComponents={multiplePrimaryComponents}
                        setPrimaryCountry={setPrimaryCountry}
                        multiplePrimaryCountries={multiplePrimaryCountries}
                        setMultiplePrimaryCountries={
                          setMultiplePrimaryCountries
                        }
                      />
                    )}
                    {alignment == "case_3" && (
                      <Case3
                        formik={commercialFormik}
                        productDetail={productDetail}
                      />
                    )}
                  </OriginCase>
                  {commercialFormik?.touched?.case_type &&
                    !!commercialFormik?.errors?.case_type && (
                      <FormHelperText
                        error={
                          commercialFormik?.touched?.case_type &&
                          !!commercialFormik?.errors?.case_type
                        }
                        style={{ marginTop: "8px" }}
                      >
                        {commercialFormik?.errors?.case_type === ""
                          ? "Please select case type if case_type is empty"
                          : commercialFormik?.errors?.case_type}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
            </Box>
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
                onClick={async () => {
                  if (checkValidationForPlaceOfOrigin()) {
                    if (alignment == "") {
                      toast.error("Please select case type");
                    }
                    return;
                  }
                  setOpenPopupForCases(true);
                }}
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
                  "Next"
                )}
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                ></ArrowForwardIosIcon>
              </Button>
            </ButtonCol>
          </TabPanel>
          <TabPanel value="4">
            <Box
              sx={{
                border: "1px solid rgb(221, 221, 221)",
                padding: "16px",
                borderRadius: "6px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-12px",
                  backgroundColor: "#fff",
                  margin: "0px 8px",
                  padding: "0px 6px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    display: "flex",
                    gap: "5px",
                    "@media screen and (max-width:320px)": { fontSize: "12px" },
                  }}
                >
                  Shipping Options
                  <span>
                    <LightTooltip
                      placement={"top"}
                      title="Additional details such as carriers, estimated costs, and delivery time frames can be listed in a separate tab within the Description section. For sellers providing international shipping, it is essential to outline the available options and any associated fees"
                      arrow
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          display: "inline-block",
                          position: "relative",
                        }}
                      >
                        <Image
                          alt="help-img"
                          src={"/assets/helpIcon.svg"}
                          layout="fill"
                        />{" "}
                      </div>
                    </LightTooltip>
                  </span>
                </Typography>
              </Box>
              {availability === "by_order" && (
                <>
                  <ContentDescription
                    style={{
                      paddingTop: "16px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid rgb(187, 187, 187)",
                      display: "flex",
                      marginTop: "0px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xl={6} lg={12} md={12} xs={12}>
                        <ContentDescriptionHeader>
                          Production Capacity
                          <span>
                            <LightTooltip
                              disableInteractive
                              placement={"top"}
                              title="Required!"
                              arrow
                            >
                              <span
                                style={{
                                  color: "#D7282F",
                                  paddingRight: "3px",
                                  paddingLeft: "3px",
                                }}
                              >
                                *
                              </span>
                            </LightTooltip>
                          </span>
                          <span>
                            <LightTooltip
                              disableInteractive
                              placement={"top"}
                              title="Enter your production capacity for bulk orders, or indicate your ability to fulfil large orders and meet buyer demand."
                              arrow
                            >
                              <div
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                <Image
                                  alt="help-img"
                                  src={"/assets/helpIcon.svg"}
                                  width={12}
                                  height={12}
                                />{" "}
                              </div>
                            </LightTooltip>
                          </span>
                        </ContentDescriptionHeader>
                        <ContentDescriptionText
                          style={{ marginBottom: "20px" }}
                        >
                          Daily/Weekly/Monthly production capacity of the listed
                          product.
                        </ContentDescriptionText>

                        <Grid container spacing={2}>
                          <Grid item xl={4} lg={4} md={4} xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                              <EditableTextField
                                placeholder="Enter Number"
                                required={true}
                                numberOnly={true}
                                label="Value"
                                name="in_house_production"
                                value={in_house_production}
                                formik={commercialFormik}
                                size="small"
                              ></EditableTextField>
                            </FormControl>
                          </Grid>
                          <Grid item xl={4} lg={4} md={4} xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                              <CustomAutocompelete
                                labelToolTipText="Ensure consistency with industry standards and buyer expectations."
                                placeholder="Measurement Unit"
                                required={true}
                                formik={commercialFormik}
                                label="Measurement Unit"
                                size="small"
                                name="production_unit"
                                options={unitList}
                                handleChange={(value: any) => {
                                  commercialFormik.setFieldError(
                                    "production_unit",
                                    ""
                                  );
                                  commercialFormik.setFieldValue(
                                    "production_unit",
                                    value
                                  );
                                }}
                                initialValue={unitList?.find(
                                  (v) => v.value == `${production_unit}`
                                )}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xl={4} lg={4} md={4} xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                              <CustomAutocompelete
                                placeholder="Period"
                                required={true}
                                formik={commercialFormik}
                                label="Period"
                                size="small"
                                name="in_house_production_days"
                                options={shippedInVariablesForByOrder}
                                value={in_house_production_days}
                                handleChange={(value: any) => {
                                  commercialFormik.setFieldError(
                                    "in_house_production_days",
                                    ""
                                  );
                                  commercialFormik.setFieldValue(
                                    "in_house_production_days",
                                    value
                                  );
                                }}
                                initialValue={shippedInVariablesForByOrder?.find(
                                  (v) =>
                                    v.value == `${in_house_production_days}`
                                )}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xl={6} lg={12} md={12} xs={12}>
                        <ContentDescriptionHeader>
                          Delivery Time Period
                          <span>
                            <LightTooltip
                              disableInteractive
                              placement={"top"}
                              title="Required!"
                              arrow
                            >
                              <span
                                style={{
                                  color: "#D7282F",
                                  paddingRight: "3px",
                                  paddingLeft: "3px",
                                }}
                              >
                                *
                              </span>
                            </LightTooltip>
                          </span>
                          <span>
                            <LightTooltip
                              disableInteractive
                              placement={"top"}
                              title="Provide a realistic and accurate time frame."
                              arrow
                            >
                              <div
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  display: "inline-block",

                                  position: "relative",
                                }}
                              >
                                <Image
                                  alt="help-img"
                                  src={"/assets/helpIcon.svg"}
                                  width={10}
                                  height={10}
                                />{" "}
                              </div>
                            </LightTooltip>
                          </span>
                        </ContentDescriptionHeader>
                        <ContentDescriptionText
                          style={{ marginBottom: "20px" }}
                        >
                          Days/Weeks/Months in which the manufactured product
                          could be delivered.
                        </ContentDescriptionText>
                        <Grid container spacing={2}>
                          <Grid item xl={6} lg={6} md={6} xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                              <EditableTextField
                                required={true}
                                numberOnly={true}
                                placeholder="Enter Number"
                                classes={{ root: classes.customTextField }}
                                fullWidth
                                label="Ship in"
                                InputLabelProps={{ shrink: true }}
                                value={delivery_time}
                                name="delivery_time"
                                formik={commercialFormik}
                                size="small"
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xl={6} lg={6} md={6} xs={12}>
                            <FormControl sx={{ width: "100%" }}>
                              <CustomAutocompelete
                                placeholder="Period"
                                required={true}
                                formik={commercialFormik}
                                label="Period"
                                options={shippedInVariables}
                                name="delivery_select"
                                size="small"
                                value={delivery_select}
                                handleChange={(value) => {
                                  commercialFormik.setFieldError(
                                    "delivery_select",
                                    ""
                                  );
                                  commercialFormik.setFieldValue(
                                    "delivery_select",
                                    value
                                  );
                                }}
                                initialValue={shippedInVariables?.find(
                                  (v) => v.value == `${delivery_select}`
                                )}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ContentDescription>
                </>
              )}
              {availability == "in_stock" && (
                <>
                  <ContentDescription
                    style={{
                      paddingTop: "8px",
                      paddingBottom: "16px",
                      borderBottom: "1px solid rgb(187, 187, 187)",
                      margin: "0px 0 0 0",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box sx={{ height: "100%" }}>
                          <Box>
                            <ContentDescriptionHeader>
                              Order Preparation Time
                              <span>
                                <LightTooltip
                                  placement={"top"}
                                  title="Required!"
                                  arrow
                                >
                                  <span
                                    style={{
                                      color: "#D7282F",
                                      paddingRight: "3px",
                                      paddingLeft: "3px",
                                      // fontFamily:"open sans"
                                    }}
                                  >
                                    *
                                  </span>
                                </LightTooltip>
                              </span>
                              <span>
                                <LightTooltip
                                  placement={"top"}
                                  title="Inventory/Warehouse products are dispatched usually in <7 days."
                                  arrow
                                >
                                  <div
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      display: "inline-block",
                                      position: "relative",
                                    }}
                                  >
                                    <Image
                                      alt="help-img"
                                      src={"/assets/helpIcon.svg"}
                                      layout="fill"
                                    />{" "}
                                  </div>
                                </LightTooltip>
                              </span>
                            </ContentDescriptionHeader>
                            <ContentDescriptionText
                              style={{ marginBottom: "10px" }}
                            >
                              Duration in which the product can be dispatched to
                              the nearby seaports/airports.
                            </ContentDescriptionText>
                          </Box>
                          <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                              <FormControl sx={{ width: "100%" }}>
                                <EditableTextField
                                  placeholder="Enter Number"
                                  numberOnly={true}
                                  handleRemoveError={() => {
                                    commercialFormik?.setFieldError(
                                      "delivery_time_value",
                                      ""
                                    );
                                    commercialFormik?.setFieldError(
                                      "delivery_time_period",
                                      ""
                                    );
                                  }}
                                  label="Value"
                                  name="dispatch_in"
                                  required={true}
                                  size="small"
                                  value={dispatch_in}
                                  formik={commercialFormik}
                                ></EditableTextField>
                              </FormControl>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                              <FormControl sx={{ width: "100%" }}>
                                <CustomAutocompelete
                                  placeholder="Period"
                                  required={true}
                                  formik={commercialFormik}
                                  label="Period"
                                  options={shippedInVariables}
                                  name="dispatch_day"
                                  size="small"
                                  handleRemoveError={() => {
                                    commercialFormik?.setFieldError(
                                      "delivery_time_value",
                                      ""
                                    );
                                    commercialFormik?.setFieldError(
                                      "delivery_time_period",
                                      ""
                                    );
                                  }}
                                  value={dispatch_day}
                                  handleChange={(value) => {
                                    commercialFormik.setFieldValue(
                                      "dispatch_day",
                                      value
                                    );
                                    commercialFormik.setFieldError(
                                      "dispatch_day",
                                      ""
                                    );
                                  }}
                                  initialValue={shippedInVariables?.find(
                                    (v) => v.value == `${dispatch_day}`
                                  )}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                          <Box>
                            <p
                              style={{
                                fontWeight: 400,
                                fontSize: "12px",
                                lineHeight: "24px",
                                letterSpacing: "0.09px",
                                color: "#414141",
                              }}
                            >
                              Generally {"<7"} days for products in warehouse or
                              inventory
                            </p>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Box sx={{ height: "100%" }}>
                          <Box>
                            <ContentDescriptionHeader>
                              Delivery Time Period
                              <span>
                                <LightTooltip
                                  placement={"top"}
                                  title="Required!"
                                  arrow
                                >
                                  <span
                                    style={{
                                      color: "#D7282F",
                                      paddingRight: "3px",
                                      paddingLeft: "3px",
                                    }}
                                  >
                                    *
                                  </span>
                                </LightTooltip>
                              </span>
                              <span>
                                <LightTooltip
                                  placement={"top"}
                                  title="Provide realistic and accurate time frame."
                                  arrow
                                >
                                  <div
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      display: "inline-block",
                                      position: "relative",
                                    }}
                                  >
                                    <Image
                                      alt="help-img"
                                      src={"/assets/helpIcon.svg"}
                                      layout="fill"
                                    />{" "}
                                  </div>
                                </LightTooltip>
                              </span>
                            </ContentDescriptionHeader>
                            <ContentDescriptionText
                              sx={{
                                marginBottom: "10px",
                                "@media only screen and (min-width:900px) and (max-width:1290px)":
                                  { minHeight: "34px" },
                              }}
                            >
                              Expected time frame for delivery after order
                              confirmation
                            </ContentDescriptionText>
                          </Box>
                          <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                              <FormControl sx={{ width: "100%" }}>
                                <EditableTextField
                                  placeholder="Enter Number"
                                  numberOnly={true}
                                  label="Value"
                                  name="delivery_time_value"
                                  required={true}
                                  size="small"
                                  value={
                                    commercialFormik.values.delivery_time_value
                                  }
                                  formik={commercialFormik}
                                ></EditableTextField>
                              </FormControl>
                            </Grid>
                            <Grid item xl={6} lg={6} md={6} xs={12}>
                              <FormControl sx={{ width: "100%" }}>
                                <CustomAutocompelete
                                  placeholder="Period"
                                  required={true}
                                  formik={commercialFormik}
                                  label="Period"
                                  options={shippedInVariables}
                                  name="delivery_time_period"
                                  size="small"
                                  value={
                                    commercialFormik.values.delivery_time_period
                                  }
                                  handleChange={(value) => {
                                    commercialFormik.setFieldValue(
                                      "delivery_time_period",
                                      value
                                    );
                                    commercialFormik.setFieldError(
                                      "delivery_time_period",
                                      ""
                                    );
                                  }}
                                  initialValue={shippedInVariables?.find(
                                    (v) =>
                                      v.value ==
                                      `${commercialFormik.values.delivery_time_period}`
                                  )}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </ContentDescription>
                </>
              )}
              <Grid container pt={"0px"} spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      {/* In-stock */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          width: "100%",
                          flexDirection: "column",
                        }}
                      >
                        {availability === "in_stock" && (
                          <>
                            <ContentDescriptionHeader
                              sx={{
                                paddingTop: "12px",
                                fontSize: "14px !important",
                              }}
                            >
                              Current Existence Place
                              <span>
                                <LightTooltip
                                  disableInteractive
                                  placement={"top"}
                                  title="Required!"
                                  arrow
                                >
                                  <span
                                    style={{
                                      color: "#D7282F",
                                      paddingRight: "3px",
                                      paddingLeft: "3px",
                                    }}
                                  >
                                    *
                                  </span>
                                </LightTooltip>
                              </span>
                              <span>
                                <LightTooltip
                                  disableInteractive
                                  placement={"top"}
                                  title="Indicate the physical location where your product is currently stored and ready for shipment. This helps buyers estimate shipping costs and delivery times."
                                  arrow
                                >
                                  <div
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                  >
                                    <Image
                                      alt="help-img"
                                      src={"/assets/helpIcon.svg"}
                                      width={12}
                                      height={12}
                                    />{" "}
                                  </div>
                                </LightTooltip>
                              </span>
                            </ContentDescriptionHeader>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "10px",
                                  color: "#4a4a4a",
                                  fontWeight: "400",
                                }}
                              >
                                Specify the warehouse location, including city
                                and country.
                              </Typography>
                            </Box>
                          </>
                        )}
                      </div>
                    </Grid>
                    {availability === "in_stock" && (
                      <>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <CustomAutocompelete
                              placeholder="Country"
                              required={true}
                              formik={commercialFormik}
                              label="Country"
                              name="existence_place"
                              options={[...modifiedCountriesList]}
                              value={existence_place}
                              size="small"
                              handleChange={(value) => {
                                commercialFormik.setFieldError(
                                  "existence_place",
                                  ""
                                );
                                FetchSeaPortList("", value);
                                FetchAirPortList("", value);
                                commercialFormik.setFieldValue(
                                  "existence_place",
                                  value
                                );
                                commercialFormik.setFieldValue(
                                  "existence_cities",
                                  ""
                                );
                                const selectedCity =
                                  CountriesWithCitiesObject?.[
                                    modifiedCountriesList?.find(
                                      (v) => v?.value == value
                                    )?.view
                                  ]
                                    ?.sort()
                                    ?.map((v) => ({ value: v, view: v }));
                                const uniqueSelectedCity = Array.from(
                                  new Map(
                                    selectedCity?.map((item) => [
                                      item.value,
                                      item,
                                    ])
                                  ).values()
                                );

                                setCitiesList(uniqueSelectedCity);
                                commercialFormik.setFieldValue("sea_", []);
                                commercialFormik.setFieldValue("port_", []);
                              }}
                              initialValue={[
                                ...territoryData,
                                ...modifiedCountriesList,
                              ].find((v) => v.value == existence_place)}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <CustomAutocompelete
                              placeholder="City"
                              required={true}
                              formik={commercialFormik}
                              label="City"
                              name="existence_cities"
                              options={citiesList || []}
                              size="small"
                              handleChange={(value) => {
                                commercialFormik.setFieldError(
                                  "existence_cities",
                                  ""
                                );
                                commercialFormik.setFieldValue(
                                  "existence_cities",
                                  value
                                );
                              }}
                              initialValue={citiesList?.find(
                                (v) =>
                                  v.value ==
                                  commercialFormik.values.existence_cities
                                    .charAt(0)
                                    .toUpperCase() +
                                    commercialFormik.values.existence_cities.substring(
                                      1
                                    )
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </>
                    )}

                    {availability === "by_order" && (
                      <>
                        <Grid item xs={12} mt={-2}>
                          <Box
                            sx={{
                              paddingTop: "12px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#000",
                              }}
                            >
                              Pick-up Destination
                              <span>
                                <LightTooltip
                                  disableInteractive
                                  placement={"top"}
                                  title="Required!"
                                  arrow
                                >
                                  <span
                                    style={{
                                      color: "#D7282F",
                                      paddingRight: "3px",
                                      paddingLeft: "3px",
                                    }}
                                  >
                                    *
                                  </span>
                                </LightTooltip>
                              </span>
                              <span>
                                <LightTooltip
                                  disableInteractive
                                  placement={"top"}
                                  title="Indicate the physical location where your product is currently stored and ready for shipment. This helps buyers estimate shipping costs and delivery times."
                                  arrow
                                >
                                  <div
                                    style={{
                                      width: "14px",
                                      height: "14px",
                                      position: "relative",
                                      display: "inline-block",
                                    }}
                                  >
                                    <Image
                                      alt="help-img"
                                      src={"/assets/helpIcon.svg"}
                                      width={12}
                                      height={12}
                                    />{" "}
                                  </div>
                                </LightTooltip>
                              </span>
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                color: "#4a4a4a",
                                fontWeight: "400",
                              }}
                            >
                              Indicate the pick-up location, including city and
                              country
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          display="flex"
                          alignItems="center"
                          gap={1}
                          style={{ position: "relative" }}
                        >
                          <FormControl
                            sx={{
                              width: "100%",
                            }}
                          >
                            <CustomAutocompelete
                              placeholder="Country"
                              required={true}
                              formik={commercialFormik}
                              label="Country"
                              name="country_origins"
                              options={[...modifiedCountriesList]}
                              size="small"
                              value={country_origins}
                              handleChange={(value) => {
                                commercialFormik.setFieldError(
                                  "country_origins",
                                  ""
                                );
                                FetchSeaPortList("", value);
                                FetchAirPortList("", value);
                                commercialFormik.setFieldValue(
                                  "country_origins",
                                  value
                                );
                                commercialFormik.setFieldValue(
                                  "country_origin_cities",
                                  ""
                                );
                                const selectedCity =
                                  CountriesWithCitiesObject?.[
                                    modifiedCountriesList?.find(
                                      (v) => v?.value == value
                                    )?.view
                                  ]
                                    ?.sort()
                                    ?.map((v) => ({ value: v, view: v }));

                                const uniqueSelectedCity = Array.from(
                                  new Map(
                                    selectedCity?.map((item) => [
                                      item.value,
                                      item,
                                    ])
                                  ).values()
                                );

                                setOtherCitiesList(uniqueSelectedCity);
                                commercialFormik.setFieldValue("sea_", []);
                                commercialFormik.setFieldValue("port_", []);
                              }}
                              initialValue={[
                                ...territoryData,
                                ...modifiedCountriesList,
                              ].find((v) => v.value == country_origins)}
                            />
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={12}
                          xs={12}
                          display="flex"
                          alignItems="center"
                          gap={1}
                          style={{ position: "relative" }}
                        >
                          <FormControl
                            sx={{
                              width: "100%",
                            }}
                          >
                            <CustomAutocompelete
                              placeholder="City"
                              required={true}
                              formik={commercialFormik}
                              label="City"
                              name="country_origin_cities"
                              options={otherCitiesList || []}
                              size="small"
                              handleChange={(value) => {
                                commercialFormik.setFieldError(
                                  "country_origin_cities",
                                  ""
                                );
                                commercialFormik.setFieldValue(
                                  "country_origin_cities",
                                  value
                                );
                              }}
                              initialValue={otherCitiesList?.find(
                                (v) =>
                                  v.value ==
                                  commercialFormik.values.country_origin_cities
                                    .charAt(0)
                                    .toUpperCase() +
                                    commercialFormik.values.country_origin_cities.substring(
                                      1
                                    )
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  style={{ position: "relative" }}
                >
                  <Box sx={{ width: "100%", height: "100%" }}>
                    <FormControl sx={{ width: "100%", marginTop: "16px" }}>
                      <Autocomplete
                        slotProps={{
                          popper: {
                            sx: {
                              zIndex: 10,
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
                        onInputChange={(e: any) => {
                          if (
                            commercialFormik?.values?.seportList?.length > 0
                          ) {
                            if (e?.target?.value) {
                              fetchSeaPort(
                                e?.target?.value,
                                availability == "by_order"
                                  ? country_origins
                                  : existence_place
                              );
                            }
                          } else {
                            const airArray = Array.isArray(e?.target?.value)
                              ? e?.target?.value
                              : e?.target?.value
                              ? [e?.target?.value]
                              : [];
                          }
                        }}
                        size="small"
                        multiple
                        limitTags={2}
                        id=""
                        options={
                          commercialFormik?.values?.seaportList?.length > 0
                            ? commercialFormik?.values?.seaportList?.map(
                                (v) => v.view
                              )
                            : []
                        }
                        freeSolo={false}
                        getOptionLabel={(option) => option}
                        defaultValue={commercialFormik?.values?.sea_}
                        value={commercialFormik?.values?.sea_}
                        onChange={(e, value) => {
                          const airArray = Array.isArray(value)
                            ? value
                            : value
                            ? [value]
                            : [];

                          if (airArray.length > 3) {
                            commercialFormik.setFieldError(
                              "sea_",
                              "Only three seaports allowed"
                            );
                            setTimeout(() => {
                              commercialFormik.setFieldError("sea_", "");
                            }, 2000);
                          } else {
                            commercialFormik.setFieldError("sea_", "");
                            commercialFormik.setFieldValue("sea_", airArray);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            label={
                              <div>
                                <span
                                  style={{
                                    paddingRight: "4px",
                                    fontWeight: 600,
                                    letterSpacing: "0.4px",
                                    color: "#1C1C1C",
                                    fontFamily: "open sans",
                                  }}
                                >
                                  {"Nearby Seaports"}
                                </span>

                                {commercialFormik?.values?.seaportList?.length >
                                  0 && (
                                  <LightTooltip
                                    disableInteractive
                                    placement={"top"}
                                    title="Required!"
                                    arrow
                                  >
                                    <span
                                      style={{
                                        color: "#D7282F",
                                        paddingRight: "3px",
                                      }}
                                    >
                                      *
                                    </span>
                                  </LightTooltip>
                                )}
                                {
                                  <LightTooltip
                                    disableInteractive
                                    placement={"top"}
                                    title={
                                      "Specify the nearby seaports for potential maritime shipping options."
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
                                }
                              </div>
                            }
                            placeholder="Seaports"
                            error={
                              commercialFormik?.errors?.sea_ ? true : false
                            }
                            helperText={`${
                              commercialFormik?.errors?.sea_ ?? ""
                            }`}
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </Grid>

                <Grid
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  style={{ position: "relative" }}
                >
                  <Box sx={{ height: "100%", width: "100%" }}>
                    <FormControl sx={{ width: "100%", marginTop: "16px" }}>
                      <Autocomplete
                        slotProps={{
                          popper: {
                            sx: {
                              zIndex: 10,
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
                        limitTags={2}
                        onInputChange={(e: any) => {
                          if (e?.target?.value) {
                            fetchAirPort(
                              e?.target?.value,
                              availability == "by_order"
                                ? country_origins
                                : existence_place
                            );
                          }
                        }}
                        size="small"
                        multiple
                        id=""
                        options={
                          commercialFormik?.values?.airportList?.length > 0
                            ? commercialFormik?.values?.airportList?.map(
                                (v) => v.view
                              )
                            : []
                        }
                        freeSolo={false}
                        getOptionLabel={(option) => option}
                        defaultValue={commercialFormik?.values?.port_}
                        value={commercialFormik?.values?.port_}
                        onChange={(e, value) => {
                          const airArray = Array.isArray(value)
                            ? value
                            : value
                            ? [value]
                            : [];
                          if (airArray.length > 3) {
                            commercialFormik.setFieldError(
                              "port_",
                              "Only three airports allowed"
                            );
                            setTimeout(() => {
                              commercialFormik.setFieldError("port_", "");
                            }, 2000);
                          } else {
                            commercialFormik.setFieldError("port_", "");
                            commercialFormik.setFieldValue("port_", airArray);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
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
                                  {"Nearby Airports"}
                                </span>

                                {commercialFormik?.values?.airportList?.length >
                                  0 && (
                                  <LightTooltip
                                    disableInteractive
                                    placement={"top"}
                                    title="Required!"
                                    arrow
                                  >
                                    <span
                                      style={{
                                        color: "#D7282F",
                                        paddingRight: "3px",
                                      }}
                                    >
                                      *
                                    </span>
                                  </LightTooltip>
                                )}
                                {
                                  <LightTooltip
                                    disableInteractive
                                    placement={"top"}
                                    title={
                                      "Specify the nearby airports for potential airfreight options."
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
                                }
                              </div>
                            }
                            placeholder="Airports"
                            error={
                              commercialFormik?.errors?.port_ ? true : false
                            }
                            helperText={`${
                              commercialFormik?.errors?.port_ ?? ""
                            }`}
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </Box>
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
                onClick={async () => {
                  setButtonLoader(false);
                  if (checkValidationsForShippingOptions()) {
                    return;
                  }
                  const formikFields = [
                    "dispatch_in",
                    "dispatch_day",
                    "delivery_time_value",
                    "delivery_time_period",
                    "existence_place",
                    "existence_cities",
                    "in_house_production",
                    "production_unit",
                    "in_house_production_days",
                    "delivery_time",
                    "delivery_select",
                  ];
                  setErrorEmpty(formikFields, true);
                  setButtonLoader(true);
                  await updateShippingOptions();
                  setButtonLoader(false);
                  handleNextTabChange("5");
                }}
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
                  "Next"
                )}
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                ></ArrowForwardIosIcon>
              </Button>
            </ButtonCol>
          </TabPanel>
          <TabPanel value="5">
            <NewSection
              formik={commercialFormik}
              productDetail={productDetail}
              availableRest={availableRest}
              setAvailabelRest={setAvailabelRest}
              availableManuf={availableManuf}
              setAvailabelManuf={setAvailabelManuf}
            />
            <Box
              sx={{
                border: "1px solid #dddddd",
                padding: "16px",
                borderRadius: "6px",
                margin: "24px 0px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  margin: "0px 8px",
                  padding: "0px 6px",
                  position: "absolute",
                  top: "-12px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#000",
                    "@media screen and (max-width:320px)": { fontSize: "12px" },
                  }}
                >
                  Choose whether to display
                </Typography>
              </Box>
              <Stack
                sx={{
                  fontSize: "14px",
                  color: "#000",
                  fontWeight: "600",
                  "& .sellTxt": {
                    padding: "0 4px",
                    fontWeight: "600",
                  },
                  "& .MuiButtonBase-root": {
                    "&.Mui-checked": {
                      color: "#d7282f",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: "20px",
                    },
                  },
                }}
              >
                <WheatherShowBox>
                  <span>
                    <StyledRadio
                      sx={{
                        "& .MuiButtonBase-root-MuiCheckbox-root": {
                          padding: "0px",
                        },
                        padding: "0px 4px 0 0",
                      }}
                      checked={
                        commercialFormik.values.quote_button_type === "quote"
                      }
                      onChange={(e, value: any) =>
                        commercialFormik.setFieldValue(
                          "quote_button_type",
                          "quote"
                        )
                      }
                      value="quote"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <strong style={{ marginRight: "8px" }}>
                      Get a Quote
                    </strong>{" "}
                  </span>
                  <Box
                    sx={{
                      "@media screen and (max-width:767px)": {
                        display: "none",
                      },
                    }}
                  >
                    or
                  </Box>
                  <span>
                    <StyledRadio
                      sx={{
                        "& .MuiButtonBase-root-MuiCheckbox-root": {
                          padding: "0px 0 0 0",
                        },
                        padding: "0px 4px 0 4px",
                      }}
                      checked={
                        commercialFormik.values.quote_button_type === "contact"
                      }
                      onChange={(e, value: any) =>
                        commercialFormik.setFieldValue(
                          "quote_button_type",
                          "contact"
                        )
                      }
                      value="contact"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "B" }}
                    />
                    <strong style={{ marginRight: "8px" }}>
                      Contact Us Now
                    </strong>{" "}
                    {`on your Product Detail Page (PDP).`}
                  </span>
                </WheatherShowBox>
              </Stack>
            </Box>
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
                onClick={() => {
                  if (product_type == "configured") {
                    handleConfigSave();
                  } else {
                    handleSave();
                  }
                }}
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
                  "Next"
                )}
                <ArrowForwardIosIcon
                  style={{ fontSize: "15px", marginLeft: "4px" }}
                ></ArrowForwardIosIcon>
              </Button>
            </ButtonCol>
          </TabPanel>
          <TabPanel value="6">
            <CustomizationBox>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={2}>
                  <Typography variant="h3">Customizations</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={10}>
                  <RadioButtonGroup>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={available}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Available "
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Not available"
                        />
                      </RadioGroup>
                    </FormControl>
                  </RadioButtonGroup>
                </Grid>
              </Grid>
              <CustomizatioOptions>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={2}>
                    <Typography variant="h3">Customization Options</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Grid container spacing={2}>
                      <Grid item xs={3} sm={3} md={3}>
                        <Typography variant="h3">Select</Typography>
                      </Grid>
                      <Grid item xs={9} sm={9} md={9}>
                        <Typography variant="h3" className="qutLabelHere">
                          Quantity
                        </Typography>
                      </Grid>
                    </Grid>
                    <CustOptionRow>
                      <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <InputLabelText>
                            <Typography variant="body2">
                              Customized Logo/label
                            </Typography>
                          </InputLabelText>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <TextfieldUnitsBox>
                            <TextField
                              id="outlined-basic"
                              size="small"
                              placeholder="Enter Quantity"
                              variant="outlined"
                            />
                            <span>
                              <Typography>Units </Typography>
                              <DeleteOutlineIcon />
                            </span>
                          </TextfieldUnitsBox>
                        </Grid>
                      </Grid>
                    </CustOptionRow>
                    <CustOptionRow>
                      <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <InputLabelText>
                            <Typography variant="body2">
                              Custom Design
                            </Typography>
                          </InputLabelText>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <TextfieldUnitsBox>
                            <TextField
                              id="outlined-basic"
                              size="small"
                              placeholder="Enter Quantity"
                              variant="outlined"
                            />
                            <span>
                              <Typography>Units </Typography>
                              <DeleteOutlineIcon />
                            </span>
                          </TextfieldUnitsBox>
                        </Grid>
                      </Grid>
                    </CustOptionRow>
                    <CustOptionRow>
                      <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <InputLabelText>
                            <Typography variant="body2">
                              Customized Packaging
                            </Typography>
                          </InputLabelText>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <TextfieldUnitsBox>
                            <TextField
                              id="outlined-basic"
                              size="small"
                              placeholder="Enter Quantity"
                              variant="outlined"
                            />
                            <span>
                              <Typography>Units </Typography>
                              <DeleteOutlineIcon />
                            </span>
                          </TextfieldUnitsBox>
                        </Grid>
                      </Grid>
                    </CustOptionRow>
                    <CustOptionRow>
                      <Grid container spacing={{ xs: 1, md: 2 }}>
                        <Grid item xs={12} sm={3} md={3}>
                          <InputLabelText>
                            <Typography variant="body2">
                              Graphic Customization
                            </Typography>
                          </InputLabelText>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9}>
                          <TextfieldUnitsBox>
                            <TextField
                              id="outlined-basic"
                              size="small"
                              placeholder="Enter Quantity"
                              variant="outlined"
                            />
                            <span>
                              <Typography>Units </Typography>
                              <DeleteOutlineIcon />
                            </span>
                          </TextfieldUnitsBox>
                        </Grid>
                      </Grid>
                    </CustOptionRow>
                    <Grid item xs={12}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<AddIcon />}
                      >
                        Add More
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomizatioOptions>
            </CustomizationBox>
          </TabPanel>
        </TabContext>
        {value == "6" && (
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
              onClick={() => {
                handleSave(), commercialFormik.submitForm;
              }}
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
        )}
      </CommercialInfoTabSection>
      {/**** End Commercial Information Tab design *****/}
    </>
  );
};

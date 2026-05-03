import React, { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { EditableTextField } from "@/components/products/common/editableTextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast, ToastContainer } from "react-toastify";
const ToggleButtonGroup = dynamic(
  () => import("@mui/material/ToggleButtonGroup"),
  {
    ssr: false,
  }
);
import Image from "next/image";

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tabs,
  TextField,
  Typography,
  styled,
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
  paymentMethods,
  productScoreValues,
} from "@/components/common/common";
import { ThreeDots } from "react-loader-spinner";
import _debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { CountriesWithCitiesObject } from "@/utils/countriesWithCitiesList";
import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { ButtonCol } from "../productCategories/styles";
import Swal from "sweetalert2";
import EditProductFormik from "@/hooks/useEditProductFormik";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import CommonErrorMessage from "@/components/common/CommonErrorMessage";
import { shippedInVariablesForByOrder } from "@/utils/AddProductPageSelectDropdownsData";
import { useStyles } from "../styles";
import CommonPopUpDescPlaceholder from "./CommonPopUpDescPlaceholder";
import {
  CommercialInfoTabSection,
  ContentDescription,
  ContentDescriptionHeader,
  ContentDescriptionText,
  CustomizationBox,
  CustomizatioOptions,
  CustomTabs,
  CustomToggleBtn,
  CustOptionRow,
  EmptyDivSpace,
  InputLabelText,
  NoSectionSelectBox,
  NoSelectBoxInn,
  OriginCase,
  RadioButtonGroup,
  SelectPricingTBox,
  StyledRadio,
  TabOuterBox,
  TextfieldUnitsBox,
  ToggleButtonBox,
  WheatherShowBox,
} from "../commercialInformation/styles";
import { QuantityBasedPricing } from "../commercialInformation/quantityBased";
import ConfigurationProduct from "../commercialInformation/ConfigurationProduct";
import NewSection from "../commercialInformation/NewSection";
import PaymentMethodsPlaceholder from "./PaymentMethodsPlaceholder";
import { FixedPricingPlaceholder } from "./FixedPricingPlaceholder";
import Case1Placeholder from "./Case1Placeholder";
import Case2Placeholder from "./Case2Placeholder";
import Case3Placeholder from "./Case3Placeholder";
import { QuantityBasedPricingPlaceholder } from "./QuantityBasedPricingPlaceholder";

export const CommercialInformationPlaceholder = ({
  setImagesBlock,
  HandlePercentage,
  setCompletedFields,
  setAccordianValue,
  productDetail,
  setPublished,
  FetchProductDetail,
  percentage,
  accordionValue
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
  const { availability } = productDetail;
  const product_type = productDetail?.product_type;
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
                    // Yup.string().required("Please select Country")
                    ()
                    .min(1, "Please select Country")
                    .required("Please select Country"),
                })
              : Yup.object().notRequired(),
          // selectedCaseCountry: Yup.array().of(
          //   Yup.string().test('unique', 'Country already exists', function (value) {
          //     const existingCountries = this.parent.selectedCaseCountry.filter(
          //       (country) => country === value
          //     );
          //     return existingCountries.length <= 1;
          //   })
          // ),
          caseTwoData:
            alignment == "case_2"
              ? Yup.object().shape({
                  other_source: Yup
                    .array
                    // Yup.string().required("Please select Country")
                    ()
                    .min(1, "Please select Country"),
                  // .required("Please select Country"),
                  primary_country: Yup.object(),
                  // Yup
                  //   .array
                  //   // Yup.string().required("Please select Country")
                  //   ()
                  //   .min(1, "Please select Country")
                  //   .required("Please select Country"),
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
          // currency_id: Yup.string().required("Please select currency"),
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
          // country_origin_id: Yup.array().of(
          //   Yup.object().shape({
          //     country_code: Yup.string().required("Please select origin"),
          //   })
          // ),
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
          // port_: Yup.array()
          //   .min(1, "Please select airport of loading")
          //   .required("Please select airport of loading"),
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
                    // Yup.string().required("Please select Country")
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
                    // Yup.string().required("Please select Country")
                    ()
                    .min(1, "Please select Country"),
                  // .required("Please select Country"),
                  primary_country: Yup.object(),
                  // Yup.string().required("Please select Country")
                  // ()
                  // .min(1, "Please select Country")
                  // .required("Please select Country"),
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

          // tertiary_id: Yup.array().of(
          //   Yup.object().shape({
          //     country_code: Yup.string().required("Please select territory"),
          //   })
          // ),
          price_term: Yup.string()
            .required("Please select product condition")
            .nullable(),
          currency_id: Yup.string().required("Please select currency"),
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
                    // max: Yup.string().required("Please enter maximum value"),
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
                    // Yup.string().required("Please select Country")
                    ()
                    .min(1, "Please select Country"),
                  // .required("Please select Country"),
                })
              : Yup.object().notRequired(),
          caseTwoData:
            alignment == "case_2"
              ? Yup.object().shape({
                  other_source: Yup
                    .array
                    // Yup.string().required("Please select Country")
                    ()
                    .min(1, "Please select Country"),
                  // .required("Please select Country"),
                  primary_country: Yup.object(),
                  // .min(1, "Please select Country")
                  // .required("Please select Country"),
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
          // .required(
          //   "Please select payment method"
          // ),
          // country_origin_id: Yup.array().of(
          //   Yup.object().shape({
          //     country_code: Yup.string().required("Please select origin"),
          //   })
          // ),
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
                    // Yup.string().required("Please select Country")
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
                    // Yup.string().required("Please select Country")
                    ()
                    .min(1, "Please select Country"),
                  // .required("Please select Country"),
                  primary_country: Yup.object(),
                  //   Yup.string().required("Please select Country")
                  // )
                  //   .min(1, "Please select Country")
                  //   .required("Please select Country"),
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
          // tertiary_id: Yup.array().of(
          //   Yup.object().shape({
          //     country_code: Yup.string().required("Please select territory"),
          //   })
          // ),
          currency_id: Yup.string().required("Please select currency"),
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
          currency_id: Yup.string().required("Please select currency"),
          order_quantity:
            priceType === "quantity"
              ? Yup.array().of(
                  Yup.object().shape({
                    // max: Yup.string().required("Please enter maximum value"),
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
        values.price_term == '' ||
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

  const [unavailable, setUnAvailable] = useState(
    productDetail?.price_unavailable_type
      ? productDetail?.price_unavailable_type
      : ""
  );
  const handleRadioChangeUnavailable = (event) => {
    const { value } = event.target;
    setUnAvailable(value);
    commercialFormik.setFieldValue("availability_status", value);
  };

  const country_id = productDetail?.country_origin_id?.country_code === "";

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
        (productDetail?.price_term
          ? productDetail?.price_term
          : '') ?? '',
      current_stock: productDetail?.current_stock ?? "",
      unit: productDetail?.unit ?? "",
      unit_price: productDetail?.unit_price ?? "",
      currency_id: productDetail?.currency_id ? productDetail?.currency_id : JSON.parse(localStorage.getItem("productCurrency")) ?? 1,
      dispatch_in: productDetail?.dispatch_in ?? "",
      dispatch_day: productDetail?.dispatch_day ?? "",
      qty_unit: productDetail?.qty_unit ?? "4",
      hide_price: productDetail?.hide_price ?? 1,
      negotiable_price: productDetail?.negotiable_price ?? 1,
      quantity_status: productDetail?.quantity_status ?? 1,
      production_unit: productDetail?.production_unit ?? "",
      hide_price_condition: productDetail?.hide_price_condition ?? 1,
      seaportList: [],
      airportList: [],
      order_quantity: [
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
      price_unavailable_type: productDetail?.price_unavailable_type ?? "",
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
      } = values;

      let formData = new FormData();
      setButtonLoader(true);

      // Check for required values and handle the case when any of them is empty
      const requiredFields = [
        price_type,
        delivery_select,
        delivery_time,
        in_house_production_days,
        country_origin_id,
        existence_place,
        unit_price,
        currency_id,
        dispatch_in,
        dispatch_day,
        qty_unit,
        country_origins,
        negotiable_price,
        quantity_available,
        caseOneData,
        caseTwoData,
        caseThreeData,
        quote_button_type,
      ];
      if (product_type === "simple") {
        formData.append("price_type", price_type);
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
            formData.append("price_type", price_type);
          }
        }

        if (price_type === "quantity") {
          formData.append("price_term", price_term);
          formData.append("price_type", price_type);
          formData.append("quantity_status", quantity_status);

          if (quantity_status == 0) {
            formData.append("hide_price_condition", hide_price_condition);
            formData.append("hide_price", "0");
            formData.append("price_type", price_type);
          }
          formData.append("qty_unit", qty_unit);
          formData.append("currency_id", currency_id);
          formData.append("quantity_available", "");
          formData.append("price_type", price_type);
        }
        if (price_type === "fixed") {
          formData.append("hide_price", hide_price);
          formData.append("quantity_available", quantity_available);
          formData.append("price_type", price_type);
          if (hide_price == 0) {
            formData.append("hide_price_condition", hide_price_condition);
          }
          formData.append("price_term", price_term);
          formData.append("unit_price", unit_price);
          formData.append("currency_id", currency_id);
          formData.append("unit", unit);
        }
        if (availability === "by_order") {
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
      formData.append("price_type", price_type);
      formData.append("case_type", alignment);
      if (Object.keys(restrictions).length > 0) {
        formData.append("restrictions", JSON.stringify(restrictions));
      }

      if (alignment == "case_1") {
        formData.append(
          "caseData",
          JSON.stringify({
            ...caseOneData,
            value: caseOneData.value.filter((v) => v).join(","),
          })
        );
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
          })
        );
      }
      if (alignment == "case_3") {
        formData.append("caseData", JSON.stringify(caseThreeData));
      }
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
        setCompletedFields((prev) => ({ ...prev, commercial: true }));
      }

      if (alignment != "") {
        FetchProductDetail();
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
    if (productDetail?.payment_methods && productDetail?.caseData) {
      setCompletedFields((prev) => ({ ...prev, commercial: true }));
    }
  }, [productDetail]);
  useEffect(() => {
    if (savedData && productDetail?.case_type == "case_2") {
      let Data = JSON.parse(savedData);
      setPrimaryCountry(Data?.primary_country);
      setSelectedCountries([]);
      setMultiplePlaceOrigin([1]);
      if (Data?.primary_country) {
        setPrimaryCountry(Data?.primary_country);
        // setMultiplePrimaryCountries(Data?.primary_country);
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
    formData.append("published", "0");
    if (product_type === "simple") {
      if (product_type == "price_unavailable") {
        formData.append("price_unavailable_type", available);
        formData.append("id", productId || "");
        formData.append("price_type", "price_unavailable");

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
    }
    if (product_type === "simple") {
      formData.append("minimum_order", minimum_order);
      if (price_type === "price_unavailable") {
        formData.append("price_type", price_type);
        formData.append("price_unavailable_type", unavailable);
      }
      if (price_type === "quantity") {
        // QuantityBasedApi();
        formData.append("price_term", price_term);
        formData.append("price_type", price_type);
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
        formData.append("price_type", price_type);
        if (availability == "in_stock") {
          formData.append("quantity_available", quantity_available);
        }
        if (hide_price == 0) {
          formData.append("hide_price_condition", hide_price_condition);
        }
        formData.append("price_term", price_term);
        if(unit_price){
          const updatedPrice = formatNumericValue(unit_price);
          formData.append("unit_price", updatedPrice);
        }else{
          formData.append("unit_price", unit_price);
        }
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
        formData.append("price_type", price_type);

        // Log to verify output for the last item

        // Exit the loop after processing the last item
        break;
      } else {
        // For all other items, set maxQty based on the next item's min
        maxQty = `${updatedOrderQuantity[i + 1].min - 1}`;

        // Append the min, max, and price values to formData for other items
        formData.append("min[]", minQty.toString());
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
  const { labelValue, other_source, primary_country } =
    commercialFormik?.values?.caseTwoData;

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
        (item) => (item?.origin == "" || item?.origin == null) || (item?.made_in == "" || item?.made_in == null)
      );
      if (checkForValues.length > 0 || caseThreeData?.lenght == 0) {
        commercialFormik.setFieldError("caseThreeData", "Please select value");
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    if (
      alignment == "case_1" &&
      productDetail?.payment_methods &&
      caseOneData?.country
    ) {
      setImagesBlock({ disable: false, expanded: true });
    } else if (
      alignment == "case_2" &&
      productDetail?.payment_methods &&
      caseTwoData?.country
    ) {
      setImagesBlock({ disable: false, expanded: true });
    } else if (
      alignment == "case_3" &&
      productDetail?.payment_methods &&
      caseThreeData?.country
    ) {
      setImagesBlock({ disable: false, expanded: true });
    } else {
      // setImagesBlock({ disable: true, expanded: true });
    }
  }, [productDetail]);
  const updatePlaceOfOrigin = async () => {
    const formData = new FormData();
    setPublished("");
    formData.append("case_type", alignment);
    formData.append("published", "0");
    formData.append("id", productId || "");
    const { caseOneData, caseTwoData, caseThreeData } =
      commercialFormik?.values;

    //save case1 data in formData
    if (alignment == "case_1") {
      formData.append(
        "caseData",
        JSON.stringify({
          ...caseOneData,
          value: caseOneData?.value.length
            ? caseOneData?.value?.filter((v) => v).join(",")
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

    // if (in_house_production && delivery_time) {
    //   const deliveryTime = convertToDays(delivery_time, delivery_select);
    //   const preparationTime = convertToDays(
    //     in_house_production,
    //     in_house_production_days
    //   );
    //   if (deliveryTime <= preparationTime) {
    //     commercialFormik.setFieldTouched("delivery_time", true);
    //     commercialFormik.setFieldTouched("delivery_select", true);
    //     commercialFormik.setFieldError(
    //       "delivery_time",
    //       "Please enter maximum value than order preparation time."
    //     );
    //     commercialFormik.setFieldError(
    //       "delivery_select",
    //       "Please select maximum value than order preparation time."
    //     );
    //     isError = true;
    //   }
    // }

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
        // { field: sea_, name: "sea_", isSelect: true },
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
        formData.append("existence_place", '');
        formData.append("existence_cities", '');
        formData.append("in_house_production", in_house_production);
        formData.append("production_unit", production_unit);
        formData.append("in_house_production_days", in_house_production_days);
        formData.append("delivery_time", delivery_time);
        formData.append("delivery_time_value", '');
        formData.append("delivery_select", delivery_select);
        formData.append("published", "0");
        formData.append(
          "tertiary_id",
          tertiary_id?.map((v) => v.country_code)?.toString() || ""
        );
        formData.append("dispatch_in", '');
        formData.append("country_origins", country_origins);
        formData.append("country_origin_cities", country_origin_cities);
        formData.append("existence_place", "");
        formData.append("existence_cities", "");
        formData.append("delivery_time_value", "");
        formData.append("delivery_time_period", "");
        formData.append("dispatch_day", "");
      }
    } else {
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

  const [availableRest, setAvailabelRest] = useState(false);
  const [availableManuf, setAvailabelManuf] = useState(false);

  const validateAndUpdateRestrictions = async () => {
    const { restrictions, quote_button_type } = commercialFormik?.values;
    let hasError = false
    if(restrictions?.available_restrictions_status){
      if(restrictions?.available_restrictions_country == ''){
        setAvailabelRest(true);
        hasError = true;
      }
    }
    if(restrictions?.manufacturing_restrictions_status){
      if(restrictions?.manufacturing_restrictions_country == ''){
        setAvailabelManuf(true);
        hasError = true;
      }
    }

    if(hasError){
      return;
    }
    setButtonLoader(false);
    setPublished("");
    const formData = new FormData();
    formData.append("id", productId || "");
    formData.append("published", "0");
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

    if (response.status == 200) {
      setAccordianValue("image");
      const fomikFields = ["restrictions", "quote_button_type"];
      setErrorEmpty(fomikFields, true);

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
      // HandlePercentage(
      //   "commercial_payment_method",
      //   payment_methods ? paymentMethods : 0
      // );
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
        // HandlePercentage("config_COO_case2_component", 0);
        // HandlePercentage("config_COO_case2_other_source", 0);
        //---end here---------------

        //clearing case3 data for score
        HandlePercentage("config_COO_case3", 0);

        // HandlePercentage("config_COO_case3_productMadeIn", 0);
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

        // HandlePercentage(
        //   "config_COO_case2_country",
        //   primary_country?.value ? 2.05338809 : 0
        // );

        // HandlePercentage(
        //   "config_COO_case2_component",
        //   other_source?.length > 0 && other_source[0] ? 2.05338809 : 0
        // );

        // HandlePercentage(
        //   "config_COO_case2_other_source",
        //   other_source?.length > 0 &&
        //     other_source[0]?.sourcedCountry?.length > 0
        //     ? 2.05338809
        //     : 0
        // );
      }
      if (alignment == "case_3") {
        //clearing case1 data for score
        HandlePercentage("config_COO_case1_country", 0);
        //--------------end here---------------------

        //clearing case2 score data
        HandlePercentage("config_COO_case2", 0);
        // HandlePercentage("config_COO_case2_component", 0);
        // HandlePercentage("config_COO_case2_other_source", 0);
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
        // HandlePercentage(
        //   "config_COO_case3_forOrdersFrom",
        //   caseThreeData[0]?.origin ? 2.096436059 : 0
        // );

        // HandlePercentage(
        //   "config_COO_case3_productMadeIn",
        //   caseThreeData[0]?.made_in ? 2.096436059 : 0
        // );
      }
    }
  }, [caseOneData, caseTwoData, caseThreeData, alignment]);
  const handleSave = () => {
    // if (availability === "in_stock") {
    if (alignment === "") {
      toast.error("Please select Country of origin");
      return;
    }
    if (alignment === "case_1") {
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
      // if (caseOneData?.labelValue === "") {
      //   toast.error("Please select label value for case one");
      //   return;
      // }
    }
    if (alignment === "case_2") {
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
    if (alignment === "case_3") {
      const { caseThreeData } = commercialFormik?.values;
      const checkForValues = caseThreeData.filter(
        (item) => !item?.origin || !item?.made_in
      );

      if (checkForValues.length > 0) {
        toast.error("Please provide values for all items case three ");
        // commercialFormik.setFieldError("caseThreeData", "Please provide values for all items");
        return;
      }
    }
    validateAndUpdateRestrictions();
    // }
  };

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
        // else
        // {
        //   if (availability === "by") {
        //     //fixed pricing score
        //     if (price_type == "fixed") {
        //       //clearing quantity values
        //       HandlePercentage("commrecial_quantity_quantity_available", 0);
        //       HandlePercentage("commrecial_quantity_unit", 0);
        //       HandlePercentage("commrecial_quantity_currency", 0);
        //       HandlePercentage("commrecial_quantity_shipping_incoterm", 0);
        //       HandlePercentage("commrecial_quantity_MOQ", 0);
        //       HandlePercentage("commrecial_quantity_price_per_unit", 0);
        //       //------------------------end here -------------
        //       HandlePercentage(
        //         "commrecial_fixed_quantity_available",
        //         quantity_available !== "" &&
        //           quantity_available != "0" &&
        //           quantity_available != "00" &&
        //           quantity_available != "000"
        //           ? quantityAvailable
        //           : 0
        //       );
        //       HandlePercentage("commrecial_fixed_unit", unit ? measurementUnit : 0);
        //       HandlePercentage("commrecial_fixed_price", unit_price ? price : 0);
        //       HandlePercentage(
        //         "commrecial_fixed_currency",
        //         currency_id ? currency : 0
        //       );
        //       HandlePercentage(
        //         "commrecial_fixed_shipping_incoterm",
        //         price_term.length > 0 ? shippingIncoterms : 0
        //       );
        //     }
  
        //     //quantity based scring
        //     if (price_type === "quantity") {
        //       //clearing in_stock score
        //       HandlePercentage("commrecial_fixed_quantity_available", 0);
        //       HandlePercentage("commrecial_fixed_unit", 0);
        //       HandlePercentage("commrecial_fixed_price", 0);
        //       HandlePercentage("commrecial_fixed_currency", 0);
        //       HandlePercentage("commrecial_fixed_shipping_incoterm", 0);
        //       //-----------ends here---------------
  
        //       const {
        //         quantityAvailable,
        //         unit: measurementUnit,
        //         currency,
        //         MOQ,
        //         pricePerUnit,
        //         shippingIncoterms,
        //       } = productScoreValues?.commercialInformation?.pricing
        //         ?.quantityBasedPricing;
  
        //       HandlePercentage("commrecial_quantity_quantity_available", 4);
        //       HandlePercentage("commrecial_quantity_unit", 0);
        //       HandlePercentage(
        //         "commrecial_quantity_currency",
        //         currency_id ? currency : 0
        //       );
        //       HandlePercentage("commrecial_quantity_shipping_incoterm", 4);
  
        //       HandlePercentage("commrecial_quantity_MOQ", 8);
  
        //       HandlePercentage("commrecial_quantity_price_per_unit", 4);
        //     }
        //   }
        // }
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
    // if (product_type == "simple") {
    //   const { productAvailabilityOrManufacturingRestrictions } =
    //     productScoreValues?.commercialInformation;
    //   HandlePercentage(
    //     "product_availability_manufacture_restriction",
    //     restrictions?.available_restrictions_country &&
    //       restrictions?.manufacturing_restrictions_country
    //       ? productAvailabilityOrManufacturingRestrictions
    //       : 0
    //   );
    // } else if (product_type === "configured") {
    //   const { productAvailabilityOrManufacturingRestrictions } =
    //     configProductScoreValues?.commercialInformation;
    //   HandlePercentage(
    //     "config_product_availability_manufacture_restriction",
    //     restrictions?.available_restrictions_country &&
    //       restrictions?.manufacturing_restrictions_country
    //       ? 1.070663812
    //       : 0
    //   );
    // }

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
        // const { productAvailabilityOrManufacturingRestrictions } =
        //   configProductScoreValues?.commercialInformation;
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
    // if (product_type === "simple") {
    //   if (availability === "in_stock") {
    //     if (price_type) {
    //       if (price_type === "quantity") {
    //         if (
    //           price_term !== "" &&
    //           country_origins !== "" &&
    //           // quantity_based_list?.length > 0 &&
    //           // dispatch_in !== "" &&
    //           // dispatch_day !== "" &&
    //           // // country_origin_id?.length > 0 &&
    //           // existence_place !== "" &&
    //           !isMount
    //         ) {
    //           setImagesBlock({ disable: false, expanded: true });
    //           setIsMount(true);
    //         }
    //       }
    //       if (price_type === "fixed") {
    //         if (
    //           price_term !== "" &&
    //           country_origins !== "" &&
    //           // current_stock !== "" &&
    //           // dispatch_in !== "" &&
    //           // dispatch_day !== "" &&
    //           // unit_price !== "" &&
    //           // // country_origin_id?.length > 0 &&
    //           // existence_place !== "" &&
    //           !isMount
    //         ) {
    //           setImagesBlock({ disable: false, expanded: true });
    //           setIsMount(true);
    //         }
    //       }
    //     }
    //   }
    //   if (availability === "by_order") {
    //     if (price_type) {
    //       if (price_type === "quantity") {
    //         if (
    //           price_term !== "" &&
    //           country_origins !== "" &&
    //           // quantity_based_list?.length > 0 &&
    //           // in_house_production !== "" &&
    //           // in_house_production_days !== "" &&
    //           // delivery_time !== "" &&
    //           // delivery_select !== "" &&
    //           // // tertiary_id?.length > 0 &&
    //           // country_origins !== "" &&
    //           !isMount
    //         ) {
    //           setImagesBlock({ disable: false, expanded: true });
    //           setIsMount(true);
    //         }
    //       }
    //       if (price_type === "fixed") {
    //         if (
    //           price_term !== "" &&
    //           country_origins !== "" &&
    //           // unit_price !== "" &&
    //           // in_house_production !== "" &&
    //           // in_house_production_days !== "" &&
    //           // delivery_time !== "" &&
    //           // delivery_select !== "" &&
    //           // // tertiary_id?.length > 0 &&
    //           // country_origins !== "" &&
    //           !isMount
    //         ) {
    //           setImagesBlock({ disable: false, expanded: true });
    //           setIsMount(true);
    //         }
    //       }
    //     }
    //   }
    // }

    // if (product_type !== "simple") {
    //   if (availability === "by_order") {
    //     if (
    //       // tertiary_id?.length > 0 &&
    //       // in_house_production !== "" &&
    //       // in_house_production_days !== "" &&
    //       price_term !== "" &&
    //       // delivery_time !== "" &&
    //       // delivery_select !== "" &&
    //       country_origins !== "" &&
    //       !isMount
    //     ) {
    //       setImagesBlock({ disable: false, expanded: true });
    //       setIsMount(true);
    //     }
    //   }
    // }
  }, [productDetail, availability, priceType]);

  useEffect(() => {
    if (
      (!productDetail?.sea_ || productDetail?.sea_?.split(",").length == 0) &&
      commercialFormik?.values?.seaportList.length == 0
    ) {
      const { availability, country_origins, existence_place } = productDetail;
      let countryCode =
        availability == "by_order" ? country_origins : existence_place;
      // FetchSeaPortList("", countryCode ? countryCode : defaultCountryCode);
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
      // FetchAirPortList("", countryCode ? countryCode : defaultCountryCode);
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
      setCitiesList(defaultCity);
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

  // useEffect(() => {
  //   if (product_type === "simple") {
  //     if (availability === "in_stock") {
  //       if (priceType === "quantity") {
  //         if (
  //           (price_term === "" ) &&
  //             // currency_id === "" ||
  //             // order_quantity?.length <= 0 ||
  //             // dispatch_in === "" ||
  //             // dispatch_day === "" ||
  //             // country_origin_id.length <= 0 ||
  //             // existence_place === "") &&
  //           isMount
  //         ) {
  //           setImagesBlock({ disable: true, expanded: false });
  //           setIsMount(false);
  //         }
  //       }
  //       if (priceType === "fixed") {
  //         if (
  //           (price_term === ""
  //             // currency_id === "" ||
  //             // current_stock === "" ||
  //             // dispatch_in === "" ||
  //             // dispatch_day === "" ||
  //             // unit_price === "" ||
  //             // country_origin_id.length <= 0
  //             // existence_place === ""
  //           ) &&
  //           isMount
  //         ) {
  //           setImagesBlock({ disable: true, expanded: false });
  //           setIsMount(false);
  //         }
  //       }
  //     }
  //     if (availability === "by_order") {
  //       if (priceType === "quantity") {
  //         if (
  //           (price_term === "" ||
  //             // currency_id === "" ||
  //             // order_quantity?.length <= 0 ||
  //             // in_house_production === "" ||
  //             // in_house_production_days === "" ||
  //             // delivery_time === "" ||
  //             // delivery_select === "" ||
  //             // tertiary_id.length <= 0 ||
  //             country_origins?.length <= 0
  //           ) &&
  //           isMount
  //         ) {
  //           setImagesBlock({ disable: true, expanded: false });
  //           setIsMount(false);
  //         }
  //       }
  //       if (priceType === "fixed") {
  //         if (
  //           (price_term === ""
  //             // currency_id === "" ||
  //             // unit_price === "" ||
  //             // in_house_production === "" ||
  //             // in_house_production_days === "" ||
  //             // delivery_time === "" ||
  //             // delivery_select === "" ||
  //             // tertiary_id.length <= 0 ||
  //             // country_origins?.length <= 0
  //           ) &&
  //           isMount
  //         ) {
  //           setImagesBlock({ disable: true, expanded: false });
  //           setIsMount(false);
  //         }
  //       }
  //     }
  //   } else {
  //     if (availability === "in_stock") {
  //       if (
  //         (
  //           // dispatch_in === "" ||
  //           // dispatch_day === "" ||
  //           // // country_origin_id.length <= 0 ||
  //           // existence_place === "" ||
  //           price_term === "") &&
  //         isMount
  //       ) {
  //         setImagesBlock({ disable: true, expanded: false });
  //         setIsMount(false);
  //       }
  //     } else {
  //       if (
  //         // (tertiary_id.length <= 0 ||
  //         (
  //           // in_house_production === "" ||
  //           // in_house_production_days === "" ||
  //           price_term === ""
  //           // delivery_time === "" ||
  //           // delivery_select === "" ||
  //           // country_origins?.length <= 0
  //         ) &&
  //         isMount
  //       ) {
  //         setImagesBlock({ disable: true, expanded: false });
  //         setIsMount(false);
  //       }
  //     }
  //   }
  // }, [commercialFormik, isMount, availability, priceType]);

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
      // setSeaportList(
      //   response.data.map((v) => ({ view: v.name, value: v.name }))
      // );
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
      // setAirportList(
      //   response.data.map((v) => ({ view: v.name, value: v.name }))
      // );
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
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setButtonLoader(false);
    setValue(newValue);
    setLoading(false);
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
    setButtonLoader(false);
    if (price_type == "price_unavailable") {
      await updatePricingTab();
    }
    if (commercialFormik?.values?.unit_price) {
      if (commercialFormik?.values?.unit == "") {
        commercialFormik.setFieldError("unit", "Please enter value");
        return;
      }
    } else if (commercialFormik?.values?.unit) {
      if (commercialFormik?.values?.unit_price == "") {
        commercialFormik.setFieldError("unit_price", "Please enter value");
        return;
      }
    }
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

  // useEffect(() => {
  //   if (existence_place == "") {
  //     commercialFormik?.setFieldValue("sea_", []);
  //     commercialFormik?.setFieldValue("port_", []);
  //   }
  // }, [existence_place]);

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
        <CommonPopUpDescPlaceholder
          open={openPopupForPricing}
          handleClose={setOpenPopupForPricing}
          // text={
          //   price_type == "quantity"
          //     ? "Pricing will be saved as information filled in Quantity Based Pricing"
          //     : price_type == "fixed"
          //     ? "Pricing will be saved as information filled in Fixed Pricing"
          //     : ""
          // }
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
        <CommonPopUpDescPlaceholder
          open={openPopupForCases}
          handleClose={setOpenPopupForCases}
          // text={
          //   alignment == "case_1"
          //     ? "Country of Origin will be saved as information filled in Product from specific Countries Of origin"
          //     : alignment == "case_2"
          //     ? "Country of Origin will be saved as information filled in Product Components Manufactured in Different Countries."
          //     : alignment == "case_3"
          //     ? "Country of Origin will be saved as information filled in Reagional Origin Labeling"
          //     : ""
          // }
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
            {/* <CustomTabList onChange={handleChange} aria-label="lab API tabs example"> */}
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
            <PaymentMethodsPlaceholder
              setCompletedFields={setCompletedFields}
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

                      {/* New ToggleButton for "Price Unavailable" */}
                      <LightTooltip
                        disableInteractive
                        arrow
                        title="Offer incentives for bulk orders to attract larger buyers."
                        placement="top"
                      >
                        <ToggleButton
                          style={{ textTransform: "none" }}
                          className={
                            price_type === "price_unavailable"
                              ? "pricingTypeCustomToggleButtonSelected"
                              : "pricingTypeCustomToggleButton"
                          }
                          selected={price_type === "price_unavailable"}
                          value="price_unavailable"
                          sx={{
                            "@media screen and (max-width:320px)": {},
                          }}
                        >
                          Price Unavailable{" "}
                          {price_type === "price_unavailable" && (
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
                                src="/assets/smallTick.svg"
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
              <QuantityBasedPricingPlaceholder
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
              <FixedPricingPlaceholder
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
            {/* {((quantity_status == 0 && price_type === "quantity") ||
              (price_type === "fixed" && hide_price == 0)) && (
              <HidePriceOptions formik={commercialFormik} />
            )} */}
            {price_type === "price_unavailable" && (
              <NoSectionSelectBox className="priceUnavailable">
                <CustomizationBox>
                  <Grid container spacing={2}>
                    <RadioButtonGroup>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-labelledby="pricing-status"
                          name="pricing-status"
                          value={unavailable}
                          onChange={handleRadioChangeUnavailable}
                        >
                          <FormControlLabel
                            value="Coming Soon"
                            control={<Radio />}
                            label="Coming Soon"
                          />
                          <FormControlLabel
                            value="Price Unavailable"
                            control={<Radio />}
                            label="Price Unavailable"
                          />
                          <FormControlLabel
                            value="Pre Order"
                            control={<Radio />}
                            label="Pre Order"
                          />
                          <FormControlLabel
                            value="Contact for Pricing"
                            control={<Radio />}
                            label="Contact for Pricing"
                          />
                        </RadioGroup>
                      </FormControl>
                    </RadioButtonGroup>
                  </Grid>
                </CustomizationBox>
              </NoSectionSelectBox>
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
                  if (commercialFormik?.values?.hide_price == 0) {
                    if (price_type == "fixed") {
                      let hasError = false;
                      if (commercialFormik?.values?.unit == "") {
                        hasError = true;
                        commercialFormik.setFieldError(
                          "unit",
                          "Please select value."
                        );
                      }
                      if (commercialFormik?.values?.unit_price == "") {
                        hasError = true;
                        commercialFormik?.setFieldTouched("unit_price", true);
                        commercialFormik.setFieldError(
                          "unit_price",
                          "Please enter value."
                        );
                      }
                      if (hasError) {
                        return;
                      }
                    } else if (price_type == "quantity") {
                      let hasError = false;
                      const { order_quantity } = commercialFormik?.values;
                      order_quantity.forEach((item) => {
                        if (item.price == "" || item?.min == "") {
                          commercialFormik?.setFieldError(
                            "order_quantity",
                            "Please enter value"
                          );
                          hasError = true;
                          return;
                        }
                      });
                      if (hasError) {
                        return;
                      }
                    }
                  }
                  if (
                    commercialFormik?.values?.unit_price &&
                    commercialFormik?.values?.unit_price <= 0 &&
                    price_type == "fixed"
                  ) {
                    toast.error("Price should not be 0 or less than 0.");
                    return;
                  }
                  let isZero = false;
                  const { order_quantity } = commercialFormik?.values;
                  if (price_type == "quantity" && order_quantity?.length > 0) {
                    order_quantity.forEach((item) => {
                      if (item.price <= 0 && item.price) {
                        toast.error("Price should not be 0 or less than 0.");
                        isZero = true;
                      }
                    });
                  }
                  if (isZero) {
                    return;
                  }
                  handleSavePricingTab();
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
                  "Next "
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
                margin: "24px 0px 0px 0px",
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
                        // error={commercialFormik?.errors?.case_type!==""||commercialFormik?.errors?.case_type!==undefined ?true:false}
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
                            // HandlePercentage("place_of_origin", 5);
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
                      <NoSectionSelectBox className="placeholder">
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
                      <Case1Placeholder
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
                      <Case2Placeholder
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
                        // multipleOtherComponents={multipleOtherComponents}
                        // setMultipleOtherComponents={setMultipleOtherComponents}
                      />
                    )}
                    {alignment == "case_3" && (
                      <Case3Placeholder
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
            {/* {alignmentError && alignment == "" && (
              <CommonErrorMessage message="Please select case type" />
            )} */}
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
                  } else {
                    setOpenPopupForCases(true);
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
                          Production Capacity{" "}
                          {/* <span>
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
                          </span> */}
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
                                // required={true}
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
                                // required={true}
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
                                // required={true}
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
                          Delivery Time Period{" "}
                          {/* <span>
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
                          </span> */}
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
                                // required={true}
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
                                // required={true}
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
                                  ></span>
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
                                  // required={true}
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
                                  // required={true}
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
                                  ></span>
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
                                  // required={true}
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
                                  // required={true}
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
                                // borderTop: "1px solid rgb(187, 187, 187)",
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
                                  ></span>
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
                        {/* By-order */}
                        {/* <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        justifyContent: "flex-end",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      {availability === "by_order" &&
                        multipleCountries.length < 5 && (
                          <>
                            <Typography
                              component="p"
                              onClick={() =>
                                setMultipleCountries((prev) => [
                                  ...prev,
                                  { country_code: "" },
                                ])
                              }
                              style={{
                                cursor: "pointer",
                                color: "#D7282F",
                                fontSize: "13px",
                                marginRight: "auto",
                              }}
                            >
                              + Add Another Country
                            </Typography>
                            <Tooltip
                              placement={"top"}
                              title={`Sourcing from multiple manufacturing facilities? Add those countries too`}
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
                            </Tooltip>
                          </>
                        )}

                      <ToggleButtonGroup
                        className={classes.toggleBtn}
                        color="primary"
                        value={+hide_country}
                        size="small"
                        exclusive
                        aria-label="Platform"
                        style={{ height: "30px" }}
                      >
                        <ToggleButton
                          value={1}
                          onClick={(e) =>
                            commercialFormik.setFieldValue("hide_country", 1)
                          }
                        >
                          Show
                        </ToggleButton>
                        <ToggleButton
                          value={0}
                          onClick={(e) =>
                            commercialFormik.setFieldValue("hide_country", 0)
                          }
                        >
                          Hide
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div> */}
                      </div>
                    </Grid>
                    {availability === "in_stock" && (
                      <>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                          <FormControl sx={{ width: "100%" }}>
                            <CustomAutocompelete
                              placeholder="Country"
                              // required={true}
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

                                setCitiesList(selectedCity);
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
                              // required={true}
                              formik={commercialFormik}
                              label="City"
                              name="existence_cities"
                              options={citiesList || []}
                              // options={
                              //   CountriesWithCitiesObject?.[
                              //     modifiedCountriesList?.find(
                              //       (v) => v?.value == existence_place
                              //     )?.view
                              //   ]
                              //     ?.sort()
                              //     ?.map((v) => ({ value: v, view: v })) ?? []
                              // }
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
                              // initialValue={{
                              //   view: commercialFormik.values.existence_cities.charAt(0).toUpperCase() + commercialFormik.values.existence_cities.substring(1),
                              //   value:commercialFormik.values.existence_cities.charAt(0).toUpperCase() + commercialFormik.values.existence_cities.substring(1),
                              // }}
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
                              // borderTop: "1px solid #dddddd",
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
                                  ></span>
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
                              // required={true}
                              formik={commercialFormik}
                              label="Country"
                              name="country_origins"
                              options={[...modifiedCountriesList]}
                              size="small"
                              // handleChange={(value) => {
                              //   commercialFormik.setFieldError(
                              //     "country_origins",
                              //     ""
                              //   );
                              //   FetchSeaPortList("", value);
                              //   FetchAirPortList("", value);
                              //   commercialFormik.setFieldValue(
                              //     "country_origins",
                              //     value
                              //   );
                              //   commercialFormik.setFieldValue(
                              //     "country_origin_cities",
                              //     ""
                              //   );
                              //   commercialFormik.setFieldValue("sea_", []);
                              //   commercialFormik.setFieldValue("port_", []);
                              // }}
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
                              // required={true}
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
                      {/* <Autocomplete
                        onInputChange={(e: any) => {
                          if (
                            commercialFormik?.values?.seaportList?.length > 0
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
                            const seaArray = Array.isArray(e.target.value)
                              ? e.target.value
                              : e.target.value
                              ? [e.target.value]
                              : [];
                            commercialFormik.setFieldValue("sea_", seaArray);
                            commercialFormik.setFieldError("sea_", "");
                          }
                        }}
                        size="small"
                        multiple
                        id="tags-outlined"
                        value={commercialFormik?.values?.sea_}
                        options={
                          commercialFormik?.values?.seaportList?.length > 0
                            ? commercialFormik?.values?.seaportList?.map(
                                (v) => v.view
                              )
                            : []
                        }
                        freeSolo={
                          commercialFormik?.values?.seaportList?.length > 0
                            ? false
                            : true
                        }
                        getOptionLabel={(option) => option}
                        defaultValue={commercialFormik?.values?.sea_}
                        onChange={(e, value) => {
                          const seaArray = Array.isArray(value)
                            ? value
                            : value
                            ? [value]
                            : [];
                          commercialFormik.setFieldValue("sea_", seaArray);
                          commercialFormik.setFieldError("sea_", "");
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputLabelProps={{ shrink: true }}
                            placeholder="Seaports"
                            error={
                              commercialFormik?.errors?.sea_ ? true : false
                            }
                            helperText={`${
                              commercialFormik?.errors?.sea_
                                ? commercialFormik?.errors?.sea_
                                : ""
                            }`}
                            label={
                              <div>
                                <span
                                  style={{
                                    paddingRight: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.4px",
                                    color: "#1C1C1C",
                                    fontFamily: "open sans",
                                  }}
                                >
                                  {"Nearest Sea Port"}
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
                                        paddingRight: "5px",
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
                                      "Specify the nearest seaport for potential maritime shipping options."
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
                          />
                        )}
                      /> */}

                      {/* <Autocomplete
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
                        // options={commercialFormik?.values?.airportList.map((v) => v.view)}
                        options={
                          commercialFormik?.values?.seaportList?.length > 0
                            ? commercialFormik?.values?.seaportList?.map(
                                (v) => v.view
                              )
                            : []
                        }
                      
                        freeSolo={false}
                        getOptionLabel={(option) => option}
                        defaultValue={
                          Array.isArray(commercialFormik?.values?.sea_)
                            ? commercialFormik?.values?.sea_
                            : [""]
                        }
                        value={
                          Array.isArray(commercialFormik?.values?.sea_)
                            ? commercialFormik?.values?.sea_
                            : [""]
                        }
                        // value={commercialFormik?.values?.sea_}
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
                          // commercialFormik.setFieldValue("sea_", airArray);
                          // commercialFormik.setFieldError("sea_", "");
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
                                    ></span>
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
                      /> */}
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

                      {/* <Box>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#4a4a4a",
                            opacity: ".8",
                          }}
                        >
                          Please press the Enter key after typing each nearby
                          seaports.
                        </Typography>
                      </Box> */}
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
                          // if (
                          //   commercialFormik?.values?.airportList?.length > 0
                          // ) {

                          if (e?.target?.value) {
                            fetchAirPort(
                              e?.target?.value,
                              availability == "by_order"
                                ? country_origins
                                : existence_place
                            );
                          }

                          // } else {
                          //   const airArray = Array.isArray(e?.target?.value)
                          //     ? e?.target?.value
                          //     : e?.target?.value
                          //       ? [e?.target?.value]
                          //       : [];
                          //   // commercialFormik.setFieldValue("port_", airArray);
                          // }
                        }}
                        size="small"
                        multiple
                        id=""
                        // options={commercialFormik?.values?.airportList.map((v) => v.view)}
                        options={
                          commercialFormik?.values?.airportList?.length > 0
                            ? commercialFormik?.values?.airportList?.map(
                                (v) => v.view
                              )
                            : []
                        }
                        freeSolo={false}
                        // freeSolo={
                        //   commercialFormik?.values?.airportList?.length > 0
                        //     ? false
                        //     : true
                        // }
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
                            // commercialFormik.setFieldValue("port_",);
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
                      {/* <Box>
                        <Typography
                          sx={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#4a4a4a",
                            opacity: ".8",
                          }}
                        >
                          Please press the Enter key after typing each nearby
                          airports.
                        </Typography>
                      </Box> */}
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
                  // if (checkValidationsForShippingOptions()) {
                  //   return;
                  // }
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
                  handleSave();
                  // commercialFormik.submitForm;
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
                "Save & Continue"
              )}
              <ArrowForwardIosIcon
                style={{ fontSize: "15px", marginLeft: "4px" }}
              ></ArrowForwardIosIcon>
            </Button>
          </ButtonCol>
        )}
      </CommercialInfoTabSection>
    </>
  );
};

import React, { useState, createContext, useEffect } from "react";
import { TerritoryList, countriesList } from "@/utils/countriesphp";
import { ManufacturingYears } from "@/utils/AddProductPageSelectDropdownsData";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import useAppContext from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import { shippedInVariables } from "@/utils/AddProductPageSelectDropdownsData";
import { postValidityOptions } from "@/utils/AddProductPageSelectDropdownsData";
import { isObject, useFormik } from "formik";
import * as Yup from "yup";
import router, { useRouter } from "next/router";
import { apiClient } from "@/components/common/common";
import { useDispatch, useSelector } from "react-redux";
import { setBrandsData } from "@/hooks/ProductReducers";
export const ProductContext = createContext<any>(null);

export const ProductContextProvider = ({ children }: any) => {
  const { query }: any = useRouter();
  const productId: string = query.Id;
  const [newAttributeValue, setNewAttributeValue] = useState("");
  const { setCompleteScreenLoader } = useAppContext();
  const [productDetail, setProductDetail] = useState<any>([]);
  const [percentage, setPercentage] = useState<any>([
    { title: "empty", value: 0 },
  ]);
  const [territoryData, setTerritoryData] = useState<any>([]);
  const {  brandsData } = useSelector(
    (state: any) => state.editProduct
  );
  const [commercialInfoUnits, setCommercialInfoUnits] = useState<any>([]);
  const [showByOrderAddBrand, setShowByOrderAddBrand] =
    useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [commercialInfoCurrencies, setCommercialInfoCurrencies] = useState<any>(
    []
  );
  const [showInStockAddBrand, setShowInstockAddBrand] = useState(false);
  const [commercialInfoPaymentTerms, setCommercialInfoPaymentTerms] =
    useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [addSpecificationLoader, setAddSpecificationLoader] =
    useState<boolean>(false);
  const [productAvailability, setProductAvailability] =
    useState<string>("in_stock");
  const [pricingType, setPricingType] = useState("quantity");
  const [removeLevelLoader, setRemoveLevelLoader] = useState(0);
  const [removeLevelLoaderGroup, setRemoveLevelLoaderGroup] = useState(0);
  const [renameGroupLoader, setRenameGroupLoader] = useState(0);
  const [finalGroupCalculation, setFinalGroupCalculation] = useState(false);

  const Validation = () => {
    return Yup.object().shape({
      pre_title_name: Yup.string().max(
        50,
        "pre title must be of 50 characters"
      ),

      name: Yup.string()
        .required("Please enter name")
        .max(100, "name must be of 100 characters"),

      choice_options: Yup.array()
        .min(1, "No Attributes Added, Please add new attributes")
        .required("No Attributes Added, Please add new attributes")
        .of(
          Yup.object().shape({
            values: Yup.string().required("Please enter values"),
          })
        ),

      description: Yup.string()
        .required("Please enter description")
        .max(999, "Description must be of 999 characters"),
      // .min(300, "Description must be of 300 characters "),
      model_number: Yup.string().max(
        30,
        "model number must be of 30 characters"
      ),
      sea_: Yup.string().required("Please enter nearest seaport"),

      port_: Yup.string().required("Please enter nearest Airport"),
      // : Yup.string().notRequired(),
      validity:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select product validity")
          : Yup.string().notRequired(),

      manufacturer_year:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select Manufacturing year")
          : Yup.string().notRequired(),

      brand_id: Yup.string().required("Please select product brand"),
      // : Yup.string().notRequired(),
      condition:
        productAvailability !== "by_order"
          ? Yup.string().required("Please select price term hhkhkhkk")
          : Yup.string().notRequired(),

      order_quantity:
        pricingType === "quantity"
          ? Yup.array().of(
              Yup.object().shape({
                max: Yup.string().required("Please enter maximum value"),
                min: Yup.string().required("Please enter minimum value"),
                per_unit: Yup.string().required("Please enter per unit price"),
              })
            )
          : Yup.array().notRequired(),

      tertiary_id:
        productAvailability === "by_order"
          ? Yup.string().required("Please select territory")
          : Yup.string().notRequired(),

      country_origins:
        productAvailability === "by_order"
          ? Yup.array().of(
              Yup.object().shape({
                country_code: Yup.string().required("Please select country"),
              })
            )
          : Yup.array().notRequired(),

      in_house_production_days:
        productAvailability === "by_order"
          ? Yup.string().required("Please enter production capacity")
          : Yup.string().notRequired(),

      in_house_production:
        productAvailability === "by_order"
          ? Yup.string().required("Please select production capacity")
          : Yup.string().notRequired(),

      delivery_time:
        productAvailability === "by_order"
          ? Yup.string().required("Please enter delivery days")
          : Yup.string().notRequired(),

      delivery_select:
        productAvailability === "by_order"
          ? Yup.string().required("Please select delivery period")
          : Yup.string().notRequired(),

      current_stock:
        pricingType === "fixed" && productAvailability === "in_stock"
          ? Yup.string().required("Please enter Current stock")
          : Yup.string().notRequired(),

      unit:
        pricingType === "fixed" && productAvailability === "in_stock"
          ? Yup.string().required("Please select unit")
          : Yup.string().notRequired(),

      qty_unit:
        pricingType === "quantity"
          ? Yup.string().required("Please select unit")
          : Yup.string().notRequired(),

      dispatch_in:
        productAvailability === "in_stock"
          ? Yup.string().required("Please enter dispatch days")
          : Yup.string().notRequired(),

      dispatch_day:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select dispatch period")
          : Yup.string().notRequired(),

      price_term: Yup.string().required("Please select Paymeny Terms"),

      qty_currency:
        pricingType === "quantity"
          ? Yup.string().required("Please select Currency")
          : Yup.string().notRequired(),

      currency_id:
        pricingType === "fixed"
          ? Yup.string().required("Please select Currency")
          : Yup.string().notRequired(),

      unit_price:
        pricingType === "fixed"
          ? Yup.string().required("Please enter price")
          : Yup.string().notRequired(),

      existence_place:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select Existence place")
          : Yup.string().notRequired(),

      country_origin_id:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select Origin")
          : Yup.string().notRequired(),
      category_lists: Yup.array()
        .min(1, "Please select at least one Category")
        .required("Please select at least one Category"),
      // photos: Yup.array()
      //   .min(1, "Please Upload Product Images")
      //   .required("Please Upload Product Images"),
    });
  };

  let formik = useFormik({
    validationSchema: Validation(),
    enableReinitialize: true,
    initialValues: {
      // category_validation: false,
      // category_lists: productDetail?.category_lists
      //   ? productDetail?.category_lists.map((v, i) => ({ ...v, level: i + 1 }))
      //   : [],
      availability: productDetail?.availability ?? "in_stock",
      product_type: productDetail?.product_type ?? "",
      // pre_title_name: productDetail?.pre_title_name ?? "",
      name: productDetail?.name ?? "",
      // description: productDetail?.description ?? "",
      // upload_files: productDetail?.upload_files ?? [],
      // deleted_files: [],
      // validity: productDetail?.validity ?? "",
      // brand_id: productDetail?.brand_id ?? "",
      // manufacturer_year: productDetail?.manufacturer_year ?? "",
      // model_number: productDetail?.model_number ?? "",
      // by_order: productDetail?.by_order ?? "",
      // condition: productDetail?.condition ?? "",
      // price_type: productDetail?.price_type ?? "quantity",
      // price_term: productDetail?.price_term ?? "",
      // dispatch_in: productDetail?.dispatch_in ?? "",
      // dispatch_day: productDetail?.dispatch_day ?? "",
      // qty_unit: productDetail?.qty_unit ?? "",
      // qty_currency:
      //   productDetail?.qty_currency ?? productDetail?.currency_id ?? "",
      // meta_keyword: productDetail?.meta_keyword ?? "",
      // current_stock: productDetail?.current_stock ?? "",
      // unit: productDetail?.unit ?? "",
      // unit_price: productDetail?.unit_price ?? "",
      // currency_id: productDetail?.currency_id ?? "",
      // in_house_production_days: productDetail?.in_house_production_days ?? "",
      // in_house_production: productDetail?.in_house_production ?? "",
      // delivery_time: productDetail?.delivery_time ?? "",
      // delivery_select: productDetail?.delivery_select ?? "",
      // choice_options: [],
      // order_quantity: [
      //   {
      //     min: "",
      //     max: "",
      //     per_unit: "",
      //     id: 1,
      //     product_id: "",
      //   },
      // ],
      // tertiary_id: productDetail?.tertiary_id
      //   ? `${productDetail?.tertiary_id}t`
      //   : "",
      // country_origins: [],
      // hide_country: productDetail?.hide_country ?? 1,
      // hide_territory: productDetail?.hide_territory ?? 1,
      // country_origin_id: productDetail?.country_origin_id ?? "",
      // existence_place: productDetail?.existence_place ?? "",
      // sea_: productDetail?.sea_ ?? "",
      // port_: productDetail?.port_ ?? "",
      // tabs: [{ value: 1, content: "", type: "custom", title: "" }],
      // photos: productDetail?.photos ?? [],
    },
    onSubmit: async () => {
      // handleProductUpdate(1);
    },
  });

  // function to focus on errors
  const getFirstErrorKey = (object, keys = []) => {
    const firstErrorKey = Object.keys(object)[0];
    if (isObject(object[firstErrorKey])) {
      return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
    }
    return [...keys, firstErrorKey].join(".");
  };

  // useEffect(() => {
  //   if (!formik.isValid && formik.submitCount !== 0 && formik.isSubmitting) {
  //     const firstErrorKey = getFirstErrorKey(formik.errors);
  //     if (global.window.document.getElementsByName(firstErrorKey).length) {
  //       global.window.document.getElementsByName(firstErrorKey)[0].focus();
  //     }
  //   }
  // }, [formik.submitCount, formik.isValid, formik.errors, formik.isSubmitting]);
  // end

  // const handleProductUpdate = async (type) => {
  //   const {
  //     name,
  //     country_origin_id,
  //     existence_place,
  //     pre_title_name,
  //     product_type,
  //     description,
  //     availability,
  //     price_type,
  //     validity,
  //     manufacturer_year,
  //     model_number,
  //     condition,
  //     dispatch_in,
  //     dispatch_day,
  //     choice_options,
  //     sea_,
  //     port_,
  //     unit,
  //     unit_price,
  //     currency_id,
  //     brand_id,
  //     tertiary_id,
  //     country_origins,
  //     hide_country,
  //     hide_territory,
  //     price_term,
  //     qty_unit,
  //     qty_currency,
  //     in_house_production,
  //     in_house_production_days,
  //     delivery_time,
  //     delivery_select,
  //     current_stock,
  //     category_lists,
  //   }: any = formik.values;

  //   const formData = new FormData();
  //   setLoader(true);
  //   await UploadFiles();

  //   formData.append("published", type || "");
  //   formData.append("name", name || "");
  //   formData.append("pre_title_name", pre_title_name || "");
  //   formData.append("product_type", product_type || "");
  //   formData.append("description", description || "");
  //   formData.append("availability", availability || "");
  //   formData.append("id", productId);
  //   if (product_type === "simple") {
  //     formData.append("price_type", price_type || "");
  //   }
  //   if (availability == "in_stock") {
  //     formData.append("validity", validity || "");
  //     formData.append("manufacturer_year", manufacturer_year || "");
  //     formData.append("model_number", model_number || "");
  //     formData.append("condition", condition || "");
  //     formData.append("dispatch_in", dispatch_in || "");
  //     formData.append("dispatch_day", dispatch_day || "");
  //     formData.append("brand_id", brand_id || "");
  //     formData.append("hide_country", hide_country || "");
  //     formData.append("hide_territory", hide_territory || "");

  //     if (price_type === "quantity") {
  //       QuantityBasedApi();
  //       formData.append("qty_unit", qty_unit || "");
  //       formData.append("qty_currency", qty_currency || "");
  //     }
  //     if (price_type === "fixed") {
  //       formData.append("current_stock", current_stock || "");
  //       formData.append("unit", unit || "");
  //       formData.append("unit_price", unit_price || "");
  //       formData.append("currency_id", currency_id || "");
  //     }
  //     formData.append("price_term", price_term || "");
  //     formData.append("existence_place", existence_place || "");
  //     formData.append("country_origin_id", country_origin_id || "");
  //   }

  //   if (availability == "by_order") {
  //     if (price_type === "quantity") {
  //       QuantityBasedApi();
  //       formData.append("qty_unit", qty_unit || "");
  //       formData.append("qty_currency", qty_currency || "");
  //     }
  //     if (price_term === "fixed") {
  //       formData.append("unit_price", unit_price || "");
  //       formData.append("currency_id", currency_id || "");
  //     }
  //     formData.append("brand_id", brand_id || "");
  //     formData.append("price_term", price_term || "");
  //     formData.append("tertiary_id", tertiary_id || "");
  //     formData.append(
  //       "country_origins",
  //       country_origins?.map((v) => v.country_code)?.toString() || ""
  //     );
  //     formData.append("hide_country", hide_country || "");
  //     formData.append("hide_territory", hide_territory || "");
  //     formData.append("in_house_production", in_house_production || "");
  //     formData.append(
  //       "in_house_production_days",
  //       in_house_production_days || ""
  //     );
  //     formData.append("delivery_time", delivery_time || "");
  //     formData.append("delivery_select", delivery_select || "");
  //   }
  //   formData.append("sea_", sea_ || "");
  //   formData.append("port_", port_ || "");
  //   formData.append(
  //     "choice_options",
  //     JSON.stringify(
  //       choice_options
  //         .filter((element) => element?.selected === true)
  //         .map((element) => ({
  //           attribute_id: element?.attribute_id,
  //           values: element?.values,
  //           name: element.name,
  //         }))
  //     )
  //   );
  //   formData.append("category_id", category_lists?.[0]?.id ?? "");
  //   formData.append(
  //     "category_lists",
  //     category_lists?.map((element) => element?.id).join(",")
  //   );
  //   /********************************Pending*********************************************/

  //   try {
  //     const response = await fetch(`${BASE_URL}/product/view/single/update`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${Auth.token()}`,
  //       },
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     if (data?.status) {
  //       toast.success(data?.message);
  //     } else {
  //       toast.error(data?.message);
  //     }
  //     // fetchProductDetails();
  //     setLoader(false);
  //   } catch (error) {
  //     setLoader(false);
  //   }
  // };

  /******************************Navdeep******************************************/
  const [localLoading, setLocalLoading] = useState(false);
  const [threedotLoading, setThreeDotLoading] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<any>();

  //  suggested Specifications or meta

  const [suggestedSpecifications, setSuggestedSpecifications] = useState<any>();

  // ------------categories ---------->

  const [categoriesState, setCategoriesState] = useState<any>([]);
  const [cloneCategoryList, setCloneCategoryList] = useState<any>([]);
  const [cloneCategoriesState, setCloneCategoriesState] = useState<any>([]);
  const [isCategoryClicked, setIsCategoryClicked] = useState(true);
  const [responseType, setResponseType] = useState("success");
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState();
  const [pendingAllCategory, setPendingAllCategory] = useState([]);
  const [pendingCategory, setPendingCategory] = useState([]);
  const [productType, setProductType] = useState();
  const [productCondition, setProductCondition] = useState<string>("Brand New");
  const [informationType, setInformationType] = useState("passive");
  const [attributesData, setAttributesData] = useState<any>();
  const [quantityBasedUnit, setQuantityBasedUnit] = useState("");
  const [fixedPriceBasedUnit, setFixedPriceBasedUnit] = useState("");
  const [inStockDispatchPeriod, setInStockDispatchPeriod] = useState("");
  const [uploadedProductImage, setUploadProductImage] = useState<any>([]);
  const [uploadedparams, setUploadedParams] = useState<boolean>(false);
  const [deletedPhotoId, setDeletedPhotoId] = useState<any>([]);
  const [autoCompleteValue, setAutoCompleteValue] = useState<any>([]);
  const [modifiedCountriesList, _] = useState(
    countriesList.map((element) => ({
      value: element?.code,
      view: element?.name,
      type: "Country",
      region: `${element.region}t`,
    }))
  );
  //-----------------Active Information State  ------------>

  const [passiveSpecification, setPassiveSpecification] = useState({
    name: "",
    value: "",
    postFix: "",
    postFixValue: "",
  });
  const [showUnitsSelection, setShowUnitsSelection] = useState(true);
  const [specValue, setSpecValue] = useState("");
  const [passiveSpecList, setPassiveSpecList] = useState<any>([]);
  const [specificationsList, setSpecificationsList] = useState<any>([]);
  const [showAuxComp, setShowAuxComp] = useState(false);
  const [termImagesArray, setTermImagesArray] = useState<any>([]);
  const [termPreviewImagesArray, setTermPreviewImagesArray] = useState<any>([]);
  const [matrixItems, setMatrixItems] = useState<any>([]);

  /********************************Quantity Based**************************************/

  //---------setting default values in form---------->
  const setInitialValues = (data) => {
    setProductAvailability(data?.availability);
    setProductType(data?.product_type);
    if (
      data?.product_type === "simple" ||
      data?.product_type === "configured"
    ) {
      const parsedChoiceOptionsArray = JSON.parse(data?.choice_options);
      const attributesIdArray = JSON.parse(data?.choice_options)?.map(
        (element) => element?.attribute_id
      );

      setAttributesData((prev) =>
        prev?.map((element) => {
          if (attributesIdArray?.includes(element?.id)) {
            const indexReq = attributesIdArray.indexOf(element?.id);

            return {
              ...element,
              selected: true,
              value: parsedChoiceOptionsArray[indexReq]?.values,
            };
          } else {
            return element;
          }
        })
      );
    }
    setPricingType((prev) => data?.price_type || "quantity");
  };

  //-------api for adding attribute---------------->
  const addAttribute = async () => {
    const formData = new FormData();
    formData.append("name", newAttributeValue);
    setLocalLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/attributes/passive/create`, {
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data?.status) {
        setLocalLoading(false);
        // getPassiveAttributes();
        setAttributesData((prev) => [
          ...prev,
          { ...data?.data, selected: false },
        ]);

        setNewAttributeValue("");
      } else {
        toast.error(data?.message?.[0]);
        setLocalLoading(false);
      }
    } catch (error) {
      setLocalLoading(false);
    }
  };

  const getUnits = async () => {
    try {
      const response = await fetch(`${BASE_URL}/unit`);
      const data = await response.json();
      setCommercialInfoUnits(
        data.data.map((element) => ({
          value: element?.id,
          view: element?.name,
        }))
      );
    } catch (error) {}
  };

  // const getPriceTerms = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/price_terms`);
  //     const data = await response.json();

  //     setCommercialInfoPaymentTerms(
  //       data.data.map((element) => ({
  //         value: element?.id,
  //         view: element?.name,
  //       }))
  //     );
  //   } catch (error) {}
  // };
  // const getCurrency = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/currency`);
  //     const data = await response.json();
  //     setCommercialInfoCurrencies(
  //       data.data.map((element) => ({
  //         value: element?.id,
  //         view: element?.name + " (" + element?.symbol + ")",
  //       }))
  //     );
  //   } catch (error) {}
  // };
const dispatch = useDispatch();
  const getBrands = async () => {
    try {
      const response = await fetch(`${BASE_URL}/brands/list?per_page=300`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
      });

      const data = await response.json();
      const requiredDataFormat = data.data.map((element) => ({
        view: element?.name,
        value: element?.id,
      }));
      dispatch(setBrandsData(requiredDataFormat));
    } catch (error) {}
  };

  const getPassiveAttributes = async () => {
    const response = await fetch(`${BASE_URL}/attributes/passive/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
      },
    });

    const data = await response.json();
    setAttributesData(data.data);
  };

  const getTerritory = async () => {
    setTerritoryData(
      TerritoryList.map((element) => ({
        value: element?.id + "t",
        view: element?.name,
        type: "Territory",
      }))
    );
  };

  //---- Fetching productDetails Based on Product id ----------->

  const fetchProductDetails = async (id = productId, setCategories = null) => {
    if (!id) return;
    try {
      setProductDetail({});

      // setCompleteScreenLoader(true);
      const formData = new FormData();
      formData.append("id", id);
      const response = await fetch(`${BASE_URL}/product/view/single/list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data?.data.length > 0) {
        const getImageData = data?.data?.[0]?.photos;
        setProductDetail(data?.data?.[0]);
        setUploadProductImage(getImageData);
        setProductDetails((prev) => data?.data[0]);
        setInitialValues(data?.data?.[0]);
        setSelectedCategories(data?.data[0]?.category_lists);
        setCompleteScreenLoader(false);
      } else {
        router.push("/products/List");
      }
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  //--------Updating Product ------------------------->

  useEffect(() => {
    if (!productId) return;
    Promise.all([
      // getUnits(),
      // getPriceTerms(),
      // getCurrency(),
      getTerritory(),
      // getBrands(),
      getPassiveAttributes(),
    ]).then(() => {
      setCompleteScreenLoader(false);
    });
  }, [productId]);

  /********************************************Calculator*************************************************************************/
  const [specsData, setSpecsData] = useState<any>({});
  const [pendingSpecs, setPendingSpecs] = useState<any>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<any>([]);

  const getSpecsList = async () => {
    const formData = new FormData();
    formData.append("product_id", productId);
    // setCompleteScreenLoader(true);
    let response = await apiClient(
      "product/levels/pending",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      const { pending, selected } = response;
      let pendingList =
        pending?.map((element) => ({ ...element, selected: false })) ?? [];
      let selectedList =
        selected?.map((element) => ({ ...element, selected: false })) ?? [];
      setSpecsData(response);
      setPendingSpecs(pendingList);
      setSelectedSpecs(selectedList);
    }
    setCompleteScreenLoader(false);
  };

  const saveGroupName = async (groupName, groupId) => {
    setRenameGroupLoader(groupId);
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("name", groupName);
    formData.append("group_id", groupId);
    // setCompleteScreenLoader(true);
    let response = await apiClient(
      "product/group/rename",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      await getSpecsList();
      setRenameGroupLoader(0);
    }
  };

  const changeSelection = (id, type) => {
    if (type == "pending") {
      setPendingSpecs((prev) =>
        prev.map((element) => {
          if (element?.id == id) {
            return { ...element, selected: !element?.selected };
          } else {
            return element;
          }
        })
      );
    } else if (type === "selected") {
      setSelectedSpecs((prev) =>
        prev.map((element) => {
          if (element?.id == id) {
            return { ...element, selected: !element?.selected };
          } else {
            return element;
          }
        })
      );
    }
  };

  const createLevels = async (group_id) => {
    // Three Cases  case-1 --> Multiple select from pending , and none section in selected i.e first time coming,here we disabled the further working of section.
    // case -1

    if (
      pendingSpecs?.filter((ele) => ele?.selected)?.length > 1 &&
      selectedSpecs?.length == 0
    ) {
      // toast.error("Action Not Allowed");
      // return;
    }

    const pendingSpecsSelectedArray = pendingSpecs
      ?.filter((element) => element?.selected)
      .map((element) => element?.id);

    const selectedSpecsSelectedArray = selectedSpecs
      ?.filter((element) => element?.selected)
      .map((element) => element?.id);

    if (pendingSpecsSelectedArray.length == 0) {
      return;
    }

    setAddSpecificationLoader(true);
    const formData = new FormData();
    formData.append("product_id", productId);
    if (group_id != "") {
      formData.append("group", "OLD");
      formData.append("group_id", group_id);
    }
    formData.append(
      "attributes",
      pendingSpecs
        ?.filter((element) => element?.selected)
        .map((element) => element?.id)
        .join(",")
    );
    formData.append(
      "parent_level",
      selectedSpecs
        ?.filter((element) => element?.selected)
        .map((element) => element?.id)
        .join(",")
    );

    try {
      const response = await apiClient(
        "product/levels/create",
        "post",
        { body: formData },
        true
      );
      await getSpecsList();
      await listMatrix();
      setAddSpecificationLoader(false);
    } catch (error) {
      setAddSpecificationLoader(false);
    }
  };

  const addGroup = async (type) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("group", type);
    setCompleteScreenLoader(true);
    try {
      const response = await fetch(`${BASE_URL}/product/levels/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      setCompleteScreenLoader(false);
      getSpecsList();
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const removeLevelOrGroup = async (id, isgroup = false, groupId, type) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("id", id);
    if (isgroup) {
      formData.append("group_id", groupId);
    }
    if (type == "group") {
      setRemoveLevelLoaderGroup(groupId);
    } else {
      setRemoveLevelLoader(id);
    }

    try {
      const response = await fetch(`${BASE_URL}/product/levels/remove`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      setRemoveLevelLoader(0);
      setRemoveLevelLoaderGroup(0);
      await getSpecsList();
      await listMatrix();
    } catch (error) {
      setRemoveLevelLoader(0);
      setRemoveLevelLoaderGroup(0);
    }
  };

  const listMatrix = async (per_page = "200", page = "1") => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("per_page", per_page);
    // formData.append("page", page);
    // setCompleteScreenLoader(true);
    try {
      const response = await fetch(`${BASE_URL}/product/matrix/list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      setCompleteScreenLoader(false);
      const data = await response.json();
      // toast.success(data?.message);
      setMatrixItems(data?.data);
      return data;
    } catch (error) {
      console.error(error);
      setCompleteScreenLoader(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        percentage,
        setPercentage,
        cloneCategoryList,
        setCloneCategoryList,
        fetchProductDetails,
        productDetail,
        setProductDetail,
        formik,
        brandsData,
        selectedCategories,
        setSelectedCategories,
        commercialInfoUnits,
        commercialInfoCurrencies,
        commercialInfoPaymentTerms,
        loader,
        productId,
        productDetails,
        setProductDetails,
        categoriesState,
        setCategoriesState,
        isCategoryClicked,
        setIsCategoryClicked,
        responseType,
        setResponseType,
        open,
        setOpen,
        responseMessage,
        setResponseMessage,
        pendingCategory,
        setPendingCategory,
        pendingAllCategory,
        setPendingAllCategory,
        cloneCategoriesState,
        setCloneCategoriesState,
        shippedInVariables,
        postValidityOptions,
        productType,
        setProductType,
        setCommercialInfoPaymentTerms,
        setCommercialInfoUnits,
        quantityBasedUnit,
        setQuantityBasedUnit,
        fixedPriceBasedUnit,
        setFixedPriceBasedUnit,
        productAvailability,
        setProductAvailability,
        productCondition,
        setProductCondition,
        informationType,
        setInformationType,
        attributesData,
        setAttributesData,
        inStockDispatchPeriod,
        setInStockDispatchPeriod,
        pricingType,
        setPricingType,
        territoryData,
        setTerritoryData,
        modifiedCountriesList,
        passiveSpecification,
        setPassiveSpecification,
        addAttribute,
        getBrands,
        ManufacturingYears,
        specificationsList,
        setSpecificationsList,
        showUnitsSelection,
        setShowUnitsSelection,
        specValue,
        setSpecValue,
        passiveSpecList,
        setPassiveSpecList,
        showAuxComp,
        setShowAuxComp,
        termImagesArray,
        setTermImagesArray,
        termPreviewImagesArray,
        setTermPreviewImagesArray,

        uploadedProductImage,
        setUploadProductImage,
        setDeletedPhotoId,
        deletedPhotoId,
        setUploadedParams,
        uploadedparams,
        autoCompleteValue,
        setAutoCompleteValue,
        threedotLoading,
        setThreeDotLoading,
        localLoading,
        setLocalLoading,
        suggestedSpecifications,
        setSuggestedSpecifications,
        matrixItems,
        setMatrixItems,
        getSpecsList,
        pendingSpecs,
        specsData,
        selectedSpecs,
        changeSelection,
        createLevels,
        listMatrix,
        removeLevelOrGroup,
        addSpecificationLoader,
        setAddSpecificationLoader,
        setRemoveLevelLoader,
        removeLevelLoader,
        finalGroupCalculation,
        setFinalGroupCalculation,
        showInStockAddBrand,
        setShowInstockAddBrand,
        showByOrderAddBrand,
        setShowByOrderAddBrand,
        addGroup,
        saveGroupName,
        renameGroupLoader,
        setRenameGroupLoader,
        removeLevelLoaderGroup,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

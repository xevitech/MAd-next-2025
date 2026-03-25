import { useState } from "react";
import { isObject, useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { apiClient } from "@/components/common/common";
import {
  setAttributesData,
  setBrandsData,
  setCompleteScreenLoader,
  setPricingType,
  setProductAvailability,
  setProductDetail,
  setProductDetails,
  setProductType,
  setSelectedCategories,
  setShowByOrderAddBrand,
  setShowInstockAddBrand,
  setUploadProductImage,
} from "./ProductReducers";
import Swal from "sweetalert2";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
// import { setBrandsData } from "./UseProductListContext";
import { useAppDispatch } from "redux/store";
import router, { useRouter } from "next/router";
import { shippedInVariables } from "@/utils/AddProductPageSelectDropdownsData";

export default function EditProductFormik() {
  const [commercialInfoFixedPricingPrice, setCommercialInfoFixedPricingPrice] =
    useState<any>();

  const { productAvailability, pricingType, productDetail } = useSelector(
    (state: any) => state.editProduct
  );

  const dispatch = useAppDispatch();

  const query: any = useRouter();
  const productId: any = query.query.Id;

  const validation = () => {
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
        .required("Please enter description ")
        .max(999, "Description must be of 999 characters"),
      model_number: Yup.string().max(
        30,
        "model number must be of 30 characters"
      ),
      sea_: Yup.string().required("Please enter nearest seaport"),
      port_: Yup.string().required("Please enter nearest Airport"),
      validity:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select product validity")
          : Yup.string().notRequired(),

      manufacturer_year:
        productAvailability === "in_stock"
          ? Yup.string().required("Please select Manufacturing year")
          : Yup.string().notRequired(),
      brand_id: Yup.string().required("Please select product brand"),
      condition:
        productAvailability !== "by_order"
          ? Yup.string().required("Please select price term")
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
    });
  };

  const formik = useFormik({
    validationSchema: validation(),
    enableReinitialize: true,
    initialValues: {
      availability: productDetail?.availability ?? "in_stock",
      product_type: productDetail?.product_type ?? "",
      name: productDetail?.name ?? "",
    },
    onSubmit: async () => {},
  });

  const getBrands = async () => {
    try {
      const { category_lists } = productDetail;
      // let category_id = category_lists?.map((ele) => ele?.id);
      // if (category_id.length == 0) {
      //   return;
      // }
      const response = await fetch(
        `${BASE_URL}/brands/list?per_page=300`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
        }
      );

      const data = await response.json();
      const requiredDataFormat = data.data.map((element) => ({
        view: element?.name,
        value: element?.id,
      }));
      dispatch(setBrandsData(requiredDataFormat));
    } catch (error) {}
  };

  const AddByOrderBrand = async (
    setLoading = null,
    customBrand,
    setError = null,
    setErrorText = null,
    addCategories = false,
    categoryList = ""
  ) => {
    const formData = new FormData();
    if (addCategories) {
      formData.append("categories", categoryList);
    }
    formData.append("name", customBrand);
    if (setLoading) setLoading(true);
    let response = await apiClient(
      "brands/create",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      getBrands();
      dispatch(setShowByOrderAddBrand(false));
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons.fire({
        title: "Success",
        text: "Brand successfully added. You will receive a notification after admin approval.",
        icon: "success",
        showCancelButton: false,
        reverseButtons: true,
      });
    } else {
      if (response.message) {
        setError(true);
        setErrorText("The name has already been taken.");
      }
    }
    setLoading(false);
  };
  const AddInStockBrand1 = async (
    customBrand,
    setLoading = null,
    setError = null,
    setErrorText = null,
    addCategories = false,
    categoryList = ""
  ) => {
    const formData = new FormData();
    if (addCategories) {
      formData.append("categories", categoryList);
    }
    formData.append("name", customBrand);
    setLoading(true);
    let response = await apiClient(
      "brands/createBrandbyCategory",
      "post",
      { body: formData },
      true
    );

    if (response.status === 200) {
      getBrands();
      dispatch(setShowInstockAddBrand(false));
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "Success",
        text: "Brand successfully added. You will receive a notification after admin approval.",
        icon: "success",
        showCancelButton: false,
        reverseButtons: true,
      });
    } else {
      if (response.message) {
        setError(true);
        setErrorText("The name has already been taken.");
      }
    }
    setLoading(false);
  };
  const AddInStockBrand = async (
    customBrand,
    setLoading = null,
    setError = null,
    setErrorText = null,
    addCategories = false,
    categoryList = ""
  ) => {
    const formData = new FormData();
    if (addCategories) {
      formData.append("categories", categoryList);
    }
    formData.append("name", customBrand);
    setLoading(true);
    let response = await apiClient(
      "brands/create",
      "post",
      { body: formData },
      true
    );

    if (response.status === 200) {
      getBrands();
      dispatch(setShowInstockAddBrand(false));
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "custom-btn cancel-button",
          cancelButton: "custom-btn remove-btn",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: "Success",
        text: "Brand successfully added. You will receive a notification after admin approval.",
        icon: "success",
        showCancelButton: false,
        reverseButtons: true,
      });
    } else {
      if (response.message) {
        setError(true);
        setErrorText("The name has already been taken.");
      }
    }
    setLoading(false);
  };

  const setInitialValues = (data) => {
    dispatch(setProductAvailability(data?.availability));
    dispatch(setProductType(data?.product_type));
    if (
      data?.product_type === "simple" ||
      data?.product_type === "configured"
    ) {
      const parsedChoiceOptionsArray = JSON.parse(data?.choice_options);
      const attributesIdArray = JSON.parse(data?.choice_options)?.map(
        (element) => element?.attribute_id
      );

      dispatch(
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
        )
      );
    }
    dispatch(setPricingType((prev) => data?.price_type || "quantity"));
  };

  const fetchProductDetails = async (id = productId, setCategories = null) => {
    if (!id) return;
    try {
      dispatch(setProductDetail({}));

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
        dispatch(setProductDetail(data?.data?.[0]));
        dispatch(setUploadProductImage(getImageData));
        dispatch(setProductDetails((prev) => data?.data[0]));
        setInitialValues(data?.data?.[0]);
        dispatch(setSelectedCategories(data?.data[0]?.category_lists));
        dispatch(setCompleteScreenLoader(false));
      } else {
        router.push("/products/List");
      }
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const handleCommercialInfoFixedPricingPrice = (e) => {
    let value = e.target.value;
    value = e.target.value.replace(/[^0-9]/g, "");
    setCommercialInfoFixedPricingPrice(value);
  };

  return {
    formik,
    getBrands,
    AddByOrderBrand,
    AddInStockBrand,
    fetchProductDetails,
    handleCommercialInfoFixedPricingPrice,
    productId,
    AddInStockBrand1,
    shippedInVariables,
  };
}

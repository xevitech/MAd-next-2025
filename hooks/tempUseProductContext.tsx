import { useContext, useState } from "react";
import { ProductContext } from "@/contextApi/productContext";
import { MyAppContext } from "@/contextApi/appContext";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiClient } from "@/components/common/common";
import { setCategoryMetaData, setMetaKeywords } from "./CategoryReducer";
import { useAppDispatch } from "redux/store";
import Swal from "sweetalert2";
import { getSpecificationsList } from "./CalculatorReducer";

export default function useProductContext() {
  const {
    pendingCategory,
    setPendingCategory,
    pendingAllCategory,
    setPendingAllCategory,
    setCloneCategoriesState,
    cloneCategoriesState,
    setCategoriesState,
    categoriesState,
    isCategoryClicked,
    setIsCategoryClicked,
    responseType,
    setResponseType,
    open,
    setOpen,
    responseMessage,
    setResponseMessage,
    setSelectedCategories,
    setAboutProduct,
    setProductName,
    setPreTitle,
    setProductDatasheet,
    setProductAvailability,
    setInStockNewBrandValue,
    setByOrderNewBrandValue,
    inStockNewBrandValue,
    byOrderNewBrandValue,
    setShowInstockAddBrand,
    getBrands,
    setShowByOrderAddBrand,
    setInStockPostValidity,
    setInStockBrand,
    setByOrderBrand,
    setCommercialInfoFixedPricingPrice,
    setCommercialInfoFixedPricingCurrency,
    setCommercialInfoFixedPricingUnits,
    setCommercialInfoFixedPricingOrderQuantity,
    setCommercialInfoFixedPricingPaymentTerms,
    setByOrderCountry,
    setByOrderTerritoryId,
    setSeaPortOfLoading,
    setAirPortOfLoading,
    setQuantityBasedOrderPricing,
    setCommercialInfoLeadDeliveryValue,
    setCommercialInfoLeadDeliveryPeriod,
    setCommercialInfoInHouseProdValue,
    setCommercialInfoInHouseProdPeriod,
    setQuantityBasedUnit,
    setCommercialInfoPaymentTerm,
    setInStockExistenceCountryOrTerritory,
    setInStockExistenceSelectedCountryOrTerritoriesId,
    setInStockOriginCountryOrTerritory,
    setInStockOriginSelectedCountryOrTerritoriesId,
    setDispatchedInValue,
    setInStockDispatchPeriod,
    setQuantityBasedCurrency,
    setDeliveryTime,
    setInstockManufacturingYear,
    setNewAttributeValue,
    setInStockModleNumber,
    setPricingType,
    setAttributesData,
    setInformationType,
    setProductCondition,
    productId: id,
    passiveSpecification,
    setPassiveSpecification,
    setSpecificationsList,
    specValue,
    setSpecValue,
    specificationsList,
    termImagesArray,
    setTermImagesArray,
    setTermPreviewImagesArray,
    productId,
    setPassiveSpecList,
    uploadedProductImage,
    setUploadProductImage,
    setDeletedPhotoId,
    setUploadedParams,
    autoCompleteValue,
    setAutoCompleteValue,
    productName,
    productType,
    productAvailability,
    setThreeDotLoading,
    threedotLoading,
    suggestedSpecifications,
    setSuggestedSpecifications,
    selectedCategories,
    setLocalLoading,
    setMatrixItems,
    getSpecsList,
    pendingSpecs,
    specsData,
    selectedSpecs,
    changeSelection,
    listMatrix,
    addSpecificationLoader,
    setAddSpecificationLoader,
    finalGroupCalculation,
    setFinalGroupCalculation,
    cloneCategoryList,
    setCloneCategoryList,
  } = useContext(ProductContext);
  const { setCompleteScreenLoader } = useContext(MyAppContext);
  const [specificationsLoader, setSpecificationsLoader] = useState(false);
  const [deleteFirstSpecsLoader, setDeleteFirstSpecsLoader] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [addNewTermLoader, setAddNewTermLoader] = useState(false);
  const [deleteTermLoader, setDeleteTermLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    status: false,
    id: "",
  });

  const [meta_data, setMetaData] = useState<any>("");

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const deleteCategoryData = async (id) => {
    const payload = {
      id: id,
    };

    const response = await fetch(`${BASE_URL}/category/delete`, {
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setOpen(true);
    getPendingCategoriesList();
    getCategoriesList(0, 0);
    if (data.status) {
      setDeleteConfirmation({ status: false, id: "" });

      setResponseType("success");
      setResponseMessage(data.message);
    } else {
      setResponseType("error");
      setResponseMessage(data.message);
      setCompleteScreenLoader(false);
      return;
    }
  };

  const handleCreateCategory = async (id, name, level) => {
    const payload = {
      parent_id: id,
      name,
      user_id: `${Auth?.userData()?.id}`,
    };
    try {
      setCompleteScreenLoader(true);
      const response = await fetch(`${BASE_URL}/category/create`, {
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setOpen(true);
      getPendingCategoriesList();
      if (data.status) {
        setResponseType("success");
        setResponseMessage(data.message);
      } else {
        setResponseType("error");
        setResponseMessage(data.message);
        setCompleteScreenLoader(false);
        return;
      }
      setCompleteScreenLoader(false);
      let list = cloneCategoriesState.map((element) => {
        if (element?.level === level) {
          return {
            ...element,
            data: [
              { name: name, id: data.data, selected: true },
              ...element?.data,
            ],
            AddCategoryString: "",
          };
        } else return element;
      });

      setCategoriesState([...list, { level: level + 1, data: [] }]);
      setCloneCategoriesState((prev) =>
        prev.map((v) => {
          if (v.level === level) {
            return {
              ...v,
              data: [...v.data, { name: name, id: data.data, selected: true }],
            };
          } else {
            return v;
          }
        })
      );
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const handleAddCategoryInputChange = (e, level) => {
    const value = e.target.value;
    if (value !== "") {
      const { data } = cloneCategoriesState[level - 1];
      setCategoriesState((prev) => {
        prev[level].data = data.filter((val) => {
          return val.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        return prev;
      });
    } else {
      let { data } = cloneCategoriesState.find((v) => v.level === level);
      setCategoriesState((prev) => {
        prev[level].data = data;
        return prev;
      });
    }
    setCategoriesState((prev) =>
      prev.map((element) => {
        if (element?.level == level) {
          return {
            ...element,
            ["AddCategoryString"]: value,
          };
        } else {
          return element;
        }
      })
    );
  };

  const handleCategoryClick = (elementId, level, addSelectedCategory) => {
    setIsCategoryClicked(false);
    let updatedList = categoriesState.map((element) => {
      if (element?.level == level) {
        return {
          ...element,
          data: element.data.map((elem) => {
            if (elem?.id == elementId) {
              if (addSelectedCategory) {
                return { ...elem, selected: true };
              } else {
                return { ...elem, selected: false };
              }
            } else return { ...elem, selected: false };
          }),
        };
      } else {
        return element;
      }
    });

    setCategoriesState(updatedList);
    setCloneCategoriesState((prev) => {
      let cloneList = [...prev].map((element) => {
        if (element?.level == level) {
          return {
            ...element,
            data: element.data.map((elem) => {
              if (elem?.id == elementId) {
                return { ...elem, selected: addSelectedCategory };
              } else return { ...elem, selected: false };
            }),
          };
        } else {
          return element;
        }
      });
      return cloneList;
    });

    if (addSelectedCategory && level === 0) {
    }

    if (!addSelectedCategory && level >= 0) {
      setCategoriesState((prev) => prev.filter((v) => v.level <= level));
      setCloneCategoriesState((prev) => prev.filter((v) => v.level <= level));
    }
  };

  const filterPendingCategroy = (events) => {
    if (events.target.value.length < 0) return;
    var filterData = pendingAllCategory.filter((element) =>
      element.name.toLowerCase().includes(events.target.value.toLowerCase())
    );

    if (filterData.length !== 0) setPendingCategory(filterData);
  };

  const getPendingCategoriesList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/category/pending_approval`, {
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const responseJson = await response.json();
      setPendingCategory(responseJson.data);
      setPendingAllCategory(responseJson.data);
    } catch (error) {}
  };

  const getCategoriesList = async (parentId = 0, level) => {
    const payload = {
      parent: parentId,
      user_id: Auth?.userData()?.id,
    };
    try {
      setCompleteScreenLoader(true);
      const response = await fetch(`${BASE_URL}/category/list`, {
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setCompleteScreenLoader(false);
      if (parentId === 0) {
        let categoryList = [
          {
            level: 0,
            parentId: parentId,
            data: [
              ...data?.data?.map((element) => ({
                ...element,
                selected: false,
              })),
            ],

            AddCategoryString: "",
          },
        ];
        setCategoriesState(categoryList);
        setCloneCategoryList(categoryList);
      }

      if (parentId !== 0) {
        setCloneCategoriesState((prev) =>
          prev.filter((element) => element?.level <= level)
        );
        setCategoriesState((prev) => {
          let filterList = prev.filter((element) => element?.level <= level);
          return filterList;
        });
        setCloneCategoriesState((prev) => [
          ...prev,
          { level: level + 1, data: data.data },
        ]);

        setCategoriesState((prev) => {
          let categorlist = [
            ...prev,
            {
              level: prev[prev.length - 1]?.level + 1,
              parentId,
              data: [
                ...data?.data?.map((element) => ({
                  ...element,
                  selected: false,
                })),
              ],
            },
          ];
          return categorlist;
        });
      }
    } catch (error) {}
  };

  const handleProductDescriptionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "aboutProduct") {
      setAboutProduct((prev) => ({
        ...prev,
        value: value,
        characterCount: value?.length,
      }));
    } else if (name == "productName") {
      setProductName((prev) => ({
        ...prev,
        value: value,
        characterCount: value?.length,
      }));
    } else if (name == "preTitle") {
      setPreTitle((prev) => ({
        ...prev,
        value: value,
        characterCount: value?.length,
      }));
    }
  };

  const removeProductDatasheet = () => {
    setProductDatasheet((prev) => null);
  };

  const updateProductDatasheet = (e) => {
    setProductDatasheet(e.target.files[0]);
  };

  const handleProductAvailabilityChange = (e, value) => {
    if (value) {
      setProductAvailability(value.toString());
    }
  };

  const handleInStockBrandChange = (e) => {
    setInStockNewBrandValue(e.target.value);
  };

  const handleByOrderBrandChange = (e) => {
    setByOrderNewBrandValue(e.target.value);
  };

  const AddInStockBrand = async (
    customBrand,
    setLoading = null,
    setError = null,
    setErrorText = null
  ) => {
    const formData = new FormData();
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
      setShowInstockAddBrand(false);
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
      // const swalWithBootstrapButtons = Swal.mixin({
      //   customClass: {
      //     confirmButton: "custom-btn cancel-button",
      //     cancelButton: "custom-btn remove-btn",
      //   },
      //   buttonsStyling: false,
      // });
      // swalWithBootstrapButtons.fire({
      //   title: "Error",
      //   text: response.message,
      //   icon: "error",
      //   showCancelButton: false,
      //   reverseButtons: true,
      // });
    }
    setLoading(false);
  };

  const AddByOrderBrand = async (
    setLoading = null,
    customBrand,
    setError = null,
    setErrorText = null
  ) => {
    const formData = new FormData();
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
      setShowByOrderAddBrand(false);
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
      // const swalWithBootstrapButtons = Swal.mixin({
      //   customClass: {
      //     confirmButton: "custom-btn cancel-button",
      //     cancelButton: "custom-btn remove-btn",
      //   },
      //   buttonsStyling: false,
      // });
      // swalWithBootstrapButtons.fire({
      //   title: "Error",
      //   text: "Brand already exist",
      //   icon: "error",
      //   showCancelButton: false,
      //   reverseButtons: true,
      // });

      if (response.message) {
        setError(true);
        setErrorText(response.message);
      }
    }
    setLoading(false);
  };

  const handleCommercialInfoFixedPricingPrice = (e) => {
    let value = e.target.value;
    value = e.target.value.replace(/[^0-9]/g, "");
    setCommercialInfoFixedPricingPrice(value);
  };

  const handleCommercialInfoFixedPriceCurrency = (e) => {
    setCommercialInfoFixedPricingCurrency(e?.target?.value ?? e);
  };

  const handleCommercialInfoFixedPricingUnits = (e) => {
    setCommercialInfoFixedPricingUnits(e?.target?.value ?? e);
  };

  const handleCommercialInfoFixedPricingOrderQuantity = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    setCommercialInfoFixedPricingOrderQuantity(value);
  };

  const handleCommercialInfoFixedPricingPaymentTerms = (e) => {
    setCommercialInfoFixedPricingPaymentTerms(e.target.value);
  };

  const handleByOrderCountry = (e) => {
    setByOrderCountry(e?.target?.value ?? e);
  };

  const handleByOrderTerritory = (e) => {
    setByOrderTerritoryId(e?.target?.value ?? e);
  };
  const handleSeaPortChange = (e) => {
    setSeaPortOfLoading(e.target.value);
  };

  const handleAirportChange = (e) => {
    setAirPortOfLoading(e.target.value);
  };

  const handleQuantityBasedOrderPricing = (e, id) => {
    let value = e.target.value;
    value = e.target.value.replace(/[^0-9]/g, "");

    const name = e.target.name;
    const Id = id;

    setQuantityBasedOrderPricing((prev) =>
      prev.map((element) => {
        if (element?.id == Id) {
          return {
            ...element,
            [name]: value,
          };
        } else {
          return element;
        }
      })
    );
  };
  const handleUpdateKeymeta = async () => {
    const data = autoCompleteValue.join(",");
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("tags", data);
    formData.append("name", productName);
    formData.append("product_type", productType);
    formData.append("availability", productAvailability);
    if (autoCompleteValue.length > 0) {
      setThreeDotLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/product/view/single/update`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        });

        const responseData = await response.json();
        if (responseData.status) {
          toast.success(responseData.message, {
            position: "top-center",
          });
          setThreeDotLoading(false);
        } else {
          toast.error(responseData.message, {
            position: "top-center",
          });
        }
      } catch (e) {}
    }
  };

  const handleCommercialInfoLeadDeliveryValue = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setCommercialInfoLeadDeliveryValue(value);
  };

  const handleCommercialInfoLeadDeliveryPeriod = (e) => {
    setCommercialInfoLeadDeliveryPeriod(e?.target?.value ?? e);
  };

  const handleCommercialInfoProdValueChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setCommercialInfoInHouseProdValue(value);
  };

  const handleCommericianInfoProdPeriodChange = (e) => {
    setCommercialInfoInHouseProdPeriod(e?.target?.value ?? e);
  };

  const handleQuantityBasedUnit = (e) => {
    setQuantityBasedUnit(e.target.value);
  };

  const handleCommercialInfoPaymentTermsChange = (e) => {
    setCommercialInfoPaymentTerm(e?.target?.value ?? e);
  };

  const handleExistenceCountriesChange = (e) => {
    let value = e.target.value;
    if (value[value?.length - 1] == "t") {
      setInStockExistenceCountryOrTerritory("Territory");
    } else {
      setInStockExistenceCountryOrTerritory("Country");
    }

    setInStockExistenceSelectedCountryOrTerritoriesId(value);
  };

  const handleCountryOrTerritory = (e) => {
    let value = e.target.value;
    if (value[value?.length - 1] == "t") {
      setInStockOriginCountryOrTerritory("Territory");
    } else {
      setInStockOriginCountryOrTerritory("Country");
    }

    setInStockOriginSelectedCountryOrTerritoriesId(value);
  };

  const handleDispatchedInValue = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setDispatchedInValue(value);
  };

  const selectDurationVariable = (e) => {
    setInStockDispatchPeriod(e?.target?.value ?? e);
  };

  const handleQuantityBasedCurrency = (e) => {
    const value = e?.target?.value ?? e;
    setQuantityBasedCurrency(value);
  };

  const handleDeliveryTime = (e) => {
    const value = e.target.value;
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");

    setDeliveryTime(onlyNums);
  };

  //--------In Stock Post Validity---------
  const handlePostValidity = (e) => {
    const value = e?.target?.value ?? e;
    setInStockPostValidity(value);
  };

  //-----In Stock Manufacturer Brand-------------

  const handleManufacturerBrandByOrder = (e) => {
    setByOrderBrand(e?.target?.value ?? e);
  };

  const handleManufacturerBrandInStock = (e) => {
    setInStockBrand(e?.target?.value ?? e);
  };

  //---------Instock Manufacturing Year---------
  const handleManufacturingYear = (e) =>
    setInstockManufacturingYear(e?.target?.value ?? e);

  //-------Instock Modle Number--------
  const handleInStockModelNumberChange = (e) => {
    const value = e.target.value;
    setInStockModleNumber(value);
  };

  const handleNewAttributeValueChange = (e) => {
    const value = e.target.value;

    setNewAttributeValue(value);
  };

  const handlePricingChange = (e, value) => {
    if (!value) return;
    setPricingType(value);
  };

  const addMoreSection = (index = null) => {
    if (index) {
      setQuantityBasedOrderPricing((prev) => {
        let list = [...prev];
        list.splice(index, 1);
        return list;
      });
      return;
    }
    setQuantityBasedOrderPricing((prev): any => [
      ...prev,
      {
        min: "",
        max: "",
        per_unit: "",
        id: prev.length + 1,
        product_id: "",
      },
    ]);
  };

  const handleAttributeChange = (id) => {
    setAttributesData((prev) =>
      prev.map((element) => {
        if (element?.id == id) {
          return { ...element, selected: !element?.selected };
        } else {
          return element;
        }
      })
    );
  };

  const handleAttributeValueChange = (id, value) => {
    setAttributesData((prev) =>
      prev.map((element) => {
        if (element?.id === id) {
          return { ...element, value: value };
        } else {
          return element;
        }
      })
    );
  };

  const handleInformationTypeChange = (e, value) => {
    if (value) {
      setInformationType(value);
    }
  };

  const handleProductCondition = (e) => {
    if (e.target.value) setProductCondition(e.target.value);
  };

  const addPassiveSpecification = async () => {
    if (!passiveSpecification?.name) {
      toast.error("Please enter specification");
      return;
    } else if (!passiveSpecification?.value) {
      toast.error("Please enter constant value");
      return;
    } else if (!passiveSpecification?.postFix) {
      toast.error("Please enter post fix");
      return;
    } else {
      setAddSpecificationLoader(true);
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append("constant_name", passiveSpecification?.name);
      formData.append("constant_value", passiveSpecification?.value);
      formData.append(
        "constant_type",
        passiveSpecification?.postFix === "Unit" ? "Unit" : "Currency"
      );
      if (passiveSpecification?.postFix === "Unit") {
        formData.append("constant_unit", passiveSpecification?.postFixValue);
      }
      try {
        const response = await fetch(`${BASE_URL}/product/create/constants`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        });

        const data = await response.json();
        setPassiveSpecification({
          name: "",
          value: "",
          postFix: "",
          postFixValue: "",
        });
        await fetchConstantsList();
        setAddSpecificationLoader(false);
      } catch (error) {
        setAddSpecificationLoader(false);
      }
    }
  };

  const handlePassiveSpecificationChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "value") {
      if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
        setPassiveSpecification((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setPassiveSpecification((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchConstantsList = async () => {
    const formData = new FormData();
    formData.append("product_id", id);
    try {
      const response = await fetch(`${BASE_URL}/product/constants_list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      setCompleteScreenLoader(false);
      setPassiveSpecList(data?.message);
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const handleDeleteSpec = async (productId, specId) => {
    const formData = new FormData();
    formData.append("id", specId);
    formData.append("product_id", productId);
    setDeleteFirstSpecsLoader(specId);
    try {
      const response = await fetch(`${BASE_URL}/product/delete/constants`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();

      await fetchConstantsList();
      setDeleteFirstSpecsLoader("");
    } catch (error) {
      setDeleteFirstSpecsLoader("");
    }
  };

  const handleSpecChange = (e) => {
    setSpecValue(e.target.value);
  };

  const getSpecificationsList = async (specEdited = false, specId = "") => {
    const formData = new FormData();
    formData.append("product_id", id);
    try {
      const response = await fetch(`${BASE_URL}/product/specifications_list`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!specEdited) {
        setSpecificationsList(
          data?.message.map((element, index) => ({
            ...element,
            children: element?.parentboth,
            productId: element?.product_id,
            expanded: index == 0 ? true : false,
            unit: element?.unit,
          }))
        );
      } else {
        setSpecificationsList(
          data?.message.map((element, index) => {
            if (element?.id == specId) {
              return {
                ...element,
                children: element?.parentboth,
                productId: element?.product_id,
                expanded: true,
                unit: element?.unit,
              };
            } else {
              return {
                ...element,
                children: element?.parentboth,
                productId: element?.product_id,
                expanded: false,
                unit: element?.unit,
              };
            }
          })
        );
      }

      setCompleteScreenLoader(false);
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const addCustomSpec = async () => {
    if (!specValue) return;
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("name", specValue);
    setLocalLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/product/create/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      setSpecValue("");
      await getSpecificationsList();
      await getSpecsList();
      setLocalLoading(false);
    } catch (error) {
      setCompleteScreenLoader(false);
      setLocalLoading(false);
    }
  };

  const deleteSpec = async (specId) => {
    if (!id) return;
    const formData = new FormData();
    formData.append("id", specId);
    formData.append("product_id", id);

    setDeleteLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/product/delete/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      await getSpecificationsList();
      setDeleteLoader(false);
      await getSpecsList();
      await listMatrix();
    } catch (error) {
      setDeleteLoader(false);
    }
  };

  const showExpandedView = (specId) => {
    setSpecificationsList((prev) =>
      prev.map((element) => {
        if (element?.id !== specId) {
          return {
            ...element,
            expanded: false,
          };
        } else {
          return { ...element, expanded: !element?.expanded };
        }
      })
    );
  };

  const addTermUnderSpec = async (specId, termValue) => {
    if (!termValue) {
      toast.error("Please enter options/terms");
      return;
    }
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("name", termValue.replaceAll(" ", "_"));
    formData.append("parent", specId);
    formData.append("type", "active");

    setAddNewTermLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/product/create/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      // dispatch(getSpecificationsList({ specEdited: true, id: specId }));
      await getSpecificationsList(true, specId);
      setAddNewTermLoader(false);
    } catch (error) {
      setAddNewTermLoader(false);
    }
  };

  const deleteTermOfSpec = async (specId, termId) => {
    const formData = new FormData();

    formData.append("id", termId);
    formData.append("parent", specId);
    formData.append("product_id", id);

    try {
      setDeleteTermLoader(true);

      const response = await fetch(
        `${BASE_URL}/product/delete/specifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      await getSpecificationsList(true, specId);
      setDeleteTermLoader(false);
      await listMatrix();
    } catch (error) {
      setDeleteTermLoader(false);
    }
  };

  const checkTerms = async (AccordianHandle = null) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append(
      "term_ids",

      specificationsList
        ?.map((element) => element?.children)
        .filter((element) => element?.length > 0)
        .flat()
        .filter((element) => element?.type == "active")
        .map((element) => element?.id)
        .join(",")
    );
    setUpdateLoader(true);
    try {
      const response = await fetch(
        `${BASE_URL}/product/specifications/terms/checked`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Auth.token()}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      await listMatrix();
      if (AccordianHandle) AccordianHandle();
      setUpdateLoader(false);
    } catch (error) {
      setUpdateLoader(false);
    }
  };

  // update Images fo terms

  const updateImagesOfTerms = (func) => {};

  // function for selecting all the terms of specification
  const selectAllTermsOfspec = async (specId) => {};

  // function for selecting particular term of spec

  const selectTermOfSpec = async (specId, termId) => {
    setSpecificationsList((prev) =>
      prev.map((element) => {
        if (element?.id == specId) {
          return {
            ...element,
            children: element?.children.map((element) => {
              if (element?.id == termId) {
                return {
                  ...element,
                  type: element?.type == "passive" ? "active" : "passive",
                };
              } else {
                return element;
              }
            }),
          };
        } else {
          return element;
        }
      })
    );
  };

  const deleteUploadedImage = async (id: any) => {
    setDeletedPhotoId((ids: any) => [...ids, id]);
    setUploadedParams(true);
    const deleted = uploadedProductImage.filter((item: any) => item.id !== id);
    setUploadProductImage(deleted);
  };

  const removeImageSpecTerm = (name) => {
    setTermPreviewImagesArray((prev) =>
      prev.filter((element) => element?.name != name)
    );
    setTermImagesArray((prev) =>
      prev.filter((element) => element?.name != name)
    );
  };

  const dispatch = useAppDispatch();

  const getSuggestedSpecificationsOrMeta = async (catId) => {
    const formData = new FormData();

    if (!catId) {
      return;
    }

    formData.append("category_id", catId);

    const response = await apiClient(
      "product/suggested/by_category",
      "post",
      {
        body: formData,
      },
      true
    );
    dispatch(setCategoryMetaData(response?.meta));
    dispatch(setMetaKeywords(response?.meta_keywords));
    const namesArray = specificationsList.map((element) => element?.name);
    setSuggestedSpecifications(
      response.specification.map((element) => {
        if (namesArray.includes(element?.name)) {
          return { ...element, selected: true };
        } else {
          return { ...element, selected: false };
        }
      })
    );
    return response.data;
  };

  const toggleSelectedSpec = (id) => {
    setSuggestedSpecifications((prev) =>
      prev?.map((ele) => {
        if (ele?.id == id) {
          return { ...ele, selected: !ele?.selected };
        } else {
          return ele;
        }
      })
    );
  };

  const submitGetSpecifications = async () => {
    const formData = new FormData();
    const idString = suggestedSpecifications
      ?.filter((ele) => ele?.selected)
      .map((ele) => ele?.id)
      .join(",");
    formData.append("ids", idString);
    formData.append("product_id", productId);
    setSpecificationsLoader(true);
    let response = await apiClient(
      "product/get_specifications/submit",
      "post",
      { body: formData },
      true
    );
    if (response.status === 200) {
      await getSpecificationsList();
      await getSpecsList();
    } else {
      toast.error("please select specification");
    }
    setSpecificationsLoader(false);
  };

  const updateSpecUnit = async (specId, newUnit) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("id", specId);
    formData.append("unit", newUnit);

    try {
      const response = await apiClient(
        "product/update/specifications",
        "post",
        { body: formData },
        true
      );

      setSpecificationsList((prev) =>
        prev?.map((element) => {
          if (element?.id == specId) {
            return { ...element, unit: newUnit };
          } else return element;
        })
      );
    } catch (error) {}
  };

  // matrix realted functions

  const deleteMatrixItem = async (matrixId) => {
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("matrix_id", matrixId);

    setCompleteScreenLoader(true);

    try {
      const response = await fetch(`${BASE_URL}/product/matrix/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      setCompleteScreenLoader(false);
      await listMatrix();
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  const updateMatrix = async (matrixId, price, image, removeImage) => {
    if (!price && !image) return;

    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("matrix_id", matrixId);
    if (price) formData.append("price", price);
    if (!removeImage) {
      formData.append("image", image);
      formData.append("remove_image", "false");
    } else if (removeImage) {
      formData.append("remove_image", "true");
    }

    // setCompleteScreenLoader(true);
    try {
      const response = await fetch(`${BASE_URL}/product/matrix/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
        body: formData,
      });

      const data = await response.json();
      setCompleteScreenLoader(false);

      return data;
    } catch (error) {
      setCompleteScreenLoader(false);
    }
  };

  return {
    ...useContext(ProductContext),
    meta_data,
    deleteMatrixItem,
    listMatrix,
    deleteConfirmation,
    setDeleteConfirmation,
    updateMatrix,
    handleCreateCategory,
    handleCloseSnack,
    deleteCategoryData,
    handleAddCategoryInputChange,
    handleCategoryClick,
    getCategoriesList,
    filterPendingCategroy,
    getPendingCategoriesList,
    handleProductDescriptionChange,
    removeProductDatasheet,
    updateProductDatasheet,
    handleProductAvailabilityChange,
    handleProductCondition,
    handleInformationTypeChange,
    handleAttributeValueChange,
    handleAttributeChange,
    addMoreSection,
    handlePricingChange,
    handleNewAttributeValueChange,
    handleInStockModelNumberChange,
    handleManufacturingYear,
    handleManufacturerBrandInStock,
    handleManufacturerBrandByOrder,
    handlePostValidity,
    handleDeliveryTime,
    handleQuantityBasedCurrency,
    selectDurationVariable,
    handleDispatchedInValue,
    handleCountryOrTerritory,
    handleExistenceCountriesChange,
    handleCommercialInfoPaymentTermsChange,
    handleQuantityBasedUnit,
    handleCommericianInfoProdPeriodChange,
    handleCommercialInfoProdValueChange,
    handleCommercialInfoLeadDeliveryPeriod,
    handleCommercialInfoLeadDeliveryValue,
    handleQuantityBasedOrderPricing,
    handleAirportChange,
    handleSeaPortChange,
    handleByOrderTerritory,
    handleByOrderCountry,
    handleCommercialInfoFixedPricingPaymentTerms,
    handleCommercialInfoFixedPricingOrderQuantity,
    handleCommercialInfoFixedPricingUnits,
    handleCommercialInfoFixedPriceCurrency,
    handleCommercialInfoFixedPricingPrice,
    AddByOrderBrand,
    AddInStockBrand,
    handleByOrderBrandChange,
    handleInStockBrandChange,
    addPassiveSpecification,
    handlePassiveSpecificationChange,
    handleDeleteSpec,
    fetchConstantsList,
    getSpecificationsList,
    handleSpecChange,
    addCustomSpec,
    selectTermOfSpec,
    selectAllTermsOfspec,
    checkTerms,
    deleteTermOfSpec,
    addTermUnderSpec,
    showExpandedView,
    deleteSpec,
    handleUpdateKeymeta,
    deleteUploadedImage,
    removeImageSpecTerm,
    getSuggestedSpecificationsOrMeta,
    toggleSelectedSpec,
    submitGetSpecifications,
    updateSpecUnit,
    specificationsLoader,
    setSpecificationsLoader,
    getSpecsList,
    pendingSpecs,
    specsData,
    selectedSpecs,
    changeSelection,
    addSpecificationLoader,
    deleteFirstSpecsLoader,
    deleteLoader,
    addNewTermLoader,
    deleteTermLoader,
    updateLoader,
    finalGroupCalculation,
    setFinalGroupCalculation,
  };
}

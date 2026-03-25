import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TerritoryList, countriesList } from "@/utils/countriesphp";
import { editProductInterface } from "@/hooks/Interface";
import { apiClient } from "@/components/common/common";


const initialState = {
  newAttributeValue: "",
  productDetail: [],
  percentage: [{ title: "empty", value: 0 }],
  territoryData: TerritoryList.map((element) => ({
    value: element?.code,
    view: element?.name,
    type: "Territory",
    region: `${element.value}`,
  })),
  brandsData: [],
  commercialInfoUnits: [],
  showByOrderAddBrand: false,
  selectedCategories: [],
  commercialInfoCurrencies: [],
  showInStockAddBrand: false,
  commercialInfoPaymentTerms: [],
  loader: false,
  addSpecificationLoader: false,
  productAvailability: "in_stock",
  pricingType: "quantity",
  removeLevelLoader: 0,
  removeLevelLoaderGroup: 0,
  renameGroupLoader: 0,
  finalGroupCalculation: false,
  localLoading: false,
  threedotLoading: false,
  productDetails: "",
  suggestedSpecifications: "",
  categoriesState: [],
  cloneCategoryList: [],
  cloneCategoriesState: [],
  isCategoryClicked: true,
  responseType: "success",
  open: false,
  responseMessage: "",
  pendingAllCategory: [],
  pendingCategory: [],
  productType: "",
  productCondition: "Brand New",
  informationType: "passive",
  attributesData: "",
  quantityBasedUnit: "",
  fixedPriceBasedUnit: "",
  inStockDispatchPeriod: "",
  uploadedProductImage: [],
  uploadedparams: false,
  deletedPhotoId: [],
  autoCompleteValue: [],
  modifiedCountriesList: countriesList.map((element) => ({
    value: element?.code,
    view: element?.name,
    type: "Country",
    region: `${element.region}t`,
  })),
  passiveSpecification: {
    name: "",
    value: "",
    postFix: "",
    postFixValue: "",
  },
  showUnitsSelection: true,
  specValue: "",
  passiveSpecList: [],
  specificationsList: [],
  showAuxComp: false,
  termImagesArray: [],
  termPreviewImagesArray: [],
  matrixItems: [],
  specsData: {},
  pendingSpecs: [],
  selectedSpecs: [],
  completeScreenLoader: false,
  customSpecReduxState:[]
} as editProductInterface ;


export const getCurrencyList :any = createAsyncThunk("currency_List", async (_, thunkAPI) => {
  try {
    let response = await apiClient("currency", "get");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getPriceTerms = createAsyncThunk("Price_terms", async (_, thunkAPI) => {
  try {
    const response =  await apiClient("front/price_terms/list?type=price_term", "get");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getUnitsTerms = createAsyncThunk("Units_list", async (_, thunkAPI) => {
  try {
    const response =  await apiClient("unit", "get");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getTerritory: any = createAsyncThunk(
  "editProductReducer/getTerritory",
  async (payload: any, { dispatch, getState }) => {
    dispatch(
      setTerritoryData(
        TerritoryList.map((element) => ({
          value: element?.id + "t",
          view: element?.name,
          type: "Territory",
        }))
      )
    );
  }
);

export const editProductReducer = createSlice({
  name: "editProductReducer",
  initialState,
  reducers: {
    setNewAttributeValue: (state, action) => {
      state.newAttributeValue = action.payload;
    },
    setProductDetail: (state, action) => {
      state.productDetail = action.payload;
    },
    setPercentage: (state, action) => {
      state.percentage = action.payload;
    },
    setTerritoryData: (state, action) => {
      state.territoryData = action.payload;
    },
    setBrandsData: (state, action) => {
      state.brandsData = action.payload;
    },
    setCommercialInfoUnits: (state, action) => {
      state.commercialInfoUnits = action.payload;
    },
    setShowByOrderAddBrand: (state, action) => {
      state.showByOrderAddBrand = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
    setCommercialInfoCurrencies: (state, action) => {
      state.commercialInfoCurrencies = action.payload;
    },
    setShowInstockAddBrand: (state, action) => {
      state.showInStockAddBrand = action.payload;
    },
    setCommercialInfoPaymentTerms: (state, action) => {
      state.commercialInfoPaymentTerms = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setAddSpecificationLoader: (state, action) => {
      state.addSpecificationLoader = action.payload;
    },
    setProductAvailability: (state, action) => {
      state.productAvailability = action.payload;
    },
    setPricingType: (state, action) => {
      state.pricingType = action.payload;
    },
    setRemoveLevelLoader: (state, action) => {
      state.removeLevelLoader = action.payload;
    },
    setRemoveLevelLoaderGroup: (state, action) => {
      state.removeLevelLoaderGroup = action.payload;
    },
    setRenameGroupLoader: (state, action) => {
      state.renameGroupLoader = action.payload;
    },
    setFinalGroupCalculation: (state, action) => {
      state.finalGroupCalculation = action.payload;
    },
    setLocalLoading: (state, action) => {
      state.localLoading = action.payload;
    },
    setThreedotLoading: (state, action) => {
      state.threedotLoading = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setSuggestedSpecifications: (state, action) => {
      state.suggestedSpecifications = action.payload;
    },
    setCategoriesState: (state, action) => {
      state.categoriesState = action.payload;
    },
    setCloneCategoryList: (state, action) => {
      state.cloneCategoryList = action.payload;
    },
    setCloneCategoriesState: (state, action) => {
      state.cloneCategoriesState = action.payload;
    },
    setIsCategoryClicked: (state, action) => {
      state.isCategoryClicked = action.payload;
    },
    setResponseType: (state, action) => {
      state.responseType = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setResponseMessage: (state, action) => {
      state.responseMessage = action.payload;
    },
    setPendingAllCategory: (state, action) => {
      state.pendingAllCategory = action.payload;
    },
    setPendingCategory: (state, action) => {
      state.pendingCategory = action.payload;
    },
    setProductType: (state, action) => {
      state.productType = action.payload;
    },
    setProductCondition: (state, action) => {
      state.productCondition = action.payload;
    },
    setInformationType: (state, action) => {
      state.informationType = action.payload;
    },
    setAttributesData: (state, action) => {
      state.attributesData = action.payload;
    },
    setQuantityBasedUnit: (state, action) => {
      state.quantityBasedUnit = action.payload;
    },
    setFixedPriceBasedUnit: (state, action) => {
      state.fixedPriceBasedUnit = action.payload;
    },
    setInStockDispatchPeriod: (state, action) => {
      state.inStockDispatchPeriod = action.payload;
    },
    setUploadProductImage: (state, action) => {
      state.uploadedProductImage = action.payload;
    },
    setUploadedparams: (state, action) => {
      state.uploadedparams = action.payload;
    },
    setDeletedPhotoId: (state, action) => {
      state.deletedPhotoId = action.payload;
    },
    setAutoCompleteValue: (state, action) => {
      state.autoCompleteValue = action.payload;
    },
    setModifiedCountriesList: (state, action) => {
      state.modifiedCountriesList = action.payload;
    },
    setPassiveSpecification: (state, action) => {
      state.passiveSpecification = action.payload;
    },
    setShowUnitsSelection: (state, action) => {
      state.showUnitsSelection = action.payload;
    },
    setSpecValue: (state, action) => {
      state.specValue = action.payload;
    },
    setPassiveSpecList: (state, action) => {
      state.passiveSpecList = action.payload;
    },
    setSpecificationsList: (state, action) => {
      state.specificationsList = action.payload;
    },
    setShowAuxComp: (state, action) => {
      state.showAuxComp = action.payload;
    },
    setTermImagesArray: (state, action) => {
      state.termImagesArray = action.payload;
    },
    setTermPreviewImagesArray: (state, action) => {
      state.termPreviewImagesArray = action.payload;
    },
    setMatrixItems: (state, action) => {
      state.matrixItems = action.payload;
    },
    setSpecsData: (state, action) => {
      state.specsData = action.payload;
    },
    setPendingSpecs: (state, action) => {
      state.pendingSpecs = action.payload;
    },
    setSelectedSpecs: (state, action) => {
      state.selectedSpecs = action.payload;
    },
    
    setCompleteScreenLoader: (state, action) => {
      state.completeScreenLoader = action.payload;
    },
    setCustomSpecReduxState: (state, action) => {
      state.customSpecReduxState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrencyList.pending, (state, action) => {
    });
    builder.addCase(getCurrencyList.fulfilled, (state, action) => {
      state.commercialInfoCurrencies = action.payload?.data.map((element) => ({
        value: element?.id,
        view: element?.name + " (" + element?.symbol + ")",
      }));
    });
    builder.addCase(getPriceTerms.pending, (state, action) => {
    });
    builder.addCase(getPriceTerms.fulfilled, (state, action) => {
      state.commercialInfoPaymentTerms = action.payload?.data.map((element) => ({
        value: element?.id,
        view: element?.name,
      }));
    });
    // builder.addCase(getCurrencyList.fulfilled, (state, action) => {
    //   state.commercialInfoCurrencies = action.payload?.data.map((element) => ({
    //     value: element?.id,
    //     view: element?.name + " (" + element?.symbol + ")",
    //   }));
    // });
    builder.addCase(getUnitsTerms.pending, (state, action) => {
    });
    builder.addCase(getUnitsTerms.fulfilled, (state, action) => {
    state.commercialInfoUnits=action.payload?.data.map((element) => ({
      value: element?.id,
      view: element?.name,
    }))
    });
  }
});

export const {
  setNewAttributeValue,
  setProductDetail,
  setPercentage,
  setTerritoryData,
  setBrandsData,
  setCommercialInfoUnits,
  setShowByOrderAddBrand,
  setSelectedCategories,
  setCommercialInfoCurrencies,
  setShowInstockAddBrand,
  setCommercialInfoPaymentTerms,
  setLoader,
  setAddSpecificationLoader,
  setProductAvailability,
  setPricingType,
  setRemoveLevelLoader,
  setRemoveLevelLoaderGroup,
  setRenameGroupLoader,
  setFinalGroupCalculation,
  setLocalLoading,
  setThreedotLoading,
  setProductDetails,
  setSuggestedSpecifications,
  setCategoriesState,
  setCloneCategoryList,
  setCloneCategoriesState,
  setIsCategoryClicked,
  setResponseType,
  setOpen,
  setResponseMessage,
  setPendingAllCategory,
  setPendingCategory,
  setProductType,
  setProductCondition,
  setInformationType,
  setAttributesData,
  setQuantityBasedUnit,
  setFixedPriceBasedUnit,
  setInStockDispatchPeriod,
  setUploadProductImage,
  setUploadedparams,
  setDeletedPhotoId,
  setAutoCompleteValue,
  setModifiedCountriesList,
  setPassiveSpecification,
  setShowUnitsSelection,
  setSpecValue,
  setPassiveSpecList,
  setSpecificationsList,
  setShowAuxComp,
  setTermImagesArray,
  setTermPreviewImagesArray,
  setMatrixItems,
  setSpecsData,
  setPendingSpecs,
  setSelectedSpecs,
  setCompleteScreenLoader,
  setCustomSpecReduxState
} = editProductReducer.actions;
export default editProductReducer.reducer;

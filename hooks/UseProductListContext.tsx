import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { ProductListing } from "./Interface";
import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import { Pending } from "@mui/icons-material";

export const initialState: ProductListing = {
  sliderValue: [500, 50000],
  minPrice: 0,
  maxPrice: 0,
  keywordData: "",
  KeyName: "",
  Territory: [],
  Countries: [],
  filtersData: [],
  brandsData: [],
  rolesData: [],
  editRoleId: "",
  catalogData: [],
  categoryData: [],
  productsList: [],
  productKeywords: [],
  relatedLikedProducts: [],
  mostSearchesProducts: [],
  bigPostList: [],
  memberIds: [],
  brandIds: [],
  filtersDataIds: [],
  categoryIds: [],
  manufacturerYear: [],
  priceTypeIds: [],
  businessIds: [],
  annualIds: [],
  conditionIds: [],
  availabilityIds: [],
  singleProductDetail: [],
  viewType: 0,
  resetToggle: false,
  singleProductId: false,
  completeScreenLoader: false,
  getLatestPopup: false,
  emptyData: false,
  localLoader: false,
  loader: false,
  totalProduct: 1,
  manufacturersSuppliers: "",
  pageNumber: 1,
  lastPage: 0,
  countrysData: [],
  filterCategory: {
    categories: true,
    price_range: true,
    brand: true,
    business_type: true,
    annual_revenue: true,
    condition: true,
    price_type: true,
    product_availability: true,
    manufacturer_year: true,
    member_type: true,
    search_by_country: true,
    plan_type: true,
  },
  searchProudct: "",
  searchCategory: "",
};
// export const manufactureProductFilterList=createAsyncThunk("manufactureFilterList", async ({rejectWithValue})=>{
//   return{}
// });

export const fetchSingleProductDetails = createAsyncThunk(
  "Single Product Response",
  async (id: any) => {
    return {};
  }
);

export const fetchAllFiltersDetail = createAsyncThunk(
  "Product List Filters  brand included Detail",
  async () => {
    let response = await apiClient("front/filters", "get");
    return response;
  }
);

export const fetchAllProductsList = createAsyncThunk(
  "All Product List",
  async () => {
    let userid = JSON.parse(localStorage.getItem("userData"))?.id;
    const currency = localStorage.getItem("currency") ?? 1;
    var body = {
      per_page: "10",
      page: 1,
      seller_id: "",
      user_id: userid ? userid : "",
      currency: currency,
    };
    if (window.location.search == "") {
      let response = await apiClient("front/product/list", "post", { body });
      return response;
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "More Products",
  async (payload, { getState }) => {
    const state: RootState = getState();

    return {};
  }
);

export const handleProductFilter: any = createAsyncThunk(
  "More Products Filter",
  async (payload, { getState, dispatch }, value = null) => {
    return {};
  }
);

export const fetchCatelogue = createAsyncThunk("fetchCatelogue", async () => {
  let response = await apiClient("product/catalog", "GET");
  return response;
});

export const deleteCatalog = createAsyncThunk(
  "deleteCatalog",
  async (payloads: any) => {
    let response = await apiClient(
      "product/catalog/" + payloads,
      "POST",

      {
        body: {
          _method: "DELETE",
        },
      }
    );
    return response;
  }
);

export const fetchRolesData: any = createAsyncThunk(
  "rolesFetchData",
  async () => {
    const response = await fetch(`${BASE_URL}/roles/permissions/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });

    const res = await response.json();
    console.log("res-------", res);
    return res;
  }
);

export const deleteRoles: any = createAsyncThunk(
  "rolesFetchDeleteData",
  async (id: any) => {
    const response = await apiClient(`roles/permissions/delete/${id}`, "POST");
    return response.data;
  }
);

const UseProductListContext = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setTerritory: (state, action) => {
      state.Territory = action.payload;
    },
    setProductList: (state, action) => {
      state.productsList = action.payload;
    },
    setProductKeywords: (state, action) => {
      state.productKeywords = action.payload;
    },
    setRelatedLikedProducts: (state, action) => {
      state.relatedLikedProducts = action.payload;
    },
    setMostSearchesProducts: (state, action) => {
      state.mostSearchesProducts = action.payload;
    },
    resetAllFilters: (state) => {
      state.filterCategory = initialState.filterCategory;
    },
    resetToggleHandler: (state, action) => {
      state.resetToggle = action.payload;
    },
    setCountrysData: (state, action) => {
      state.countrysData = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = { ...state.filterCategory, ...action.payload };
    },
    setSearchProudct: (state, action) => {
      state.searchProudct = action?.payload;
    },
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
    setGetLatestPopup: (state, action) => {
      state.getLatestPopup = action.payload;
    },
    setKeywordName: (state, action) => {
      state.KeyName = action.payload;
    },
    setAnnualIds: (state, action) => {
      state.annualIds = action.payload;
    },
    setBrandIds: (state, action) => {
      state.brandIds = action.payload;
    },
    setSingleProductId: (state, action) => {
      state.singleProductId = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setCategoryIds: (state, action) => {
      state.categoryIds = action.payload;
    },
    setBrandsData: (state, action) => {
      state.brandsData = action.payload;
    },
    setAvailabilityIds: (state, action) => {
      state.availabilityIds = action.payload;
    },
    setPriceTypeIds: (state, action) => {
      state.priceTypeIds = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setKeywordData: (state, action) => {
      state.keywordData = action.payload;
    },
    setManufacturerYear: (state, action) => {
      state.manufacturerYear = action.payload;
    },
    setConditionIds: (state, action) => {
      state.conditionIds = action.payload;
    },
    setEmptyData: (state, action) => {
      state.emptyData = action.payload;
    },
    setBusinessIds: (state, action) => {
      state.businessIds = action.payload;
    },
    setFiltersDataIds: (state, action) => {
      state.filtersDataIds = action.payload;
    },
    setSingleProduct: (state, action) => {
      state.singleProductDetail = action.payload;
    },
    setBigPostList: (state, action) => {
      state.bigPostList = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setTotalProduct: (state, action) => {
      state.totalProduct = action.payload;
    },
    setManufacturersSuppliers: (state, action) => {
      state.manufacturersSuppliers = action.payload;
    },
    setSliderValue: (state, action) => {
      state.sliderValue = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setEditRole: (state, action) => {
      state.editRoleId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFiltersDetail.pending, (state) => {
      state.completeScreenLoader = true;
    });
    builder.addCase(fetchAllFiltersDetail.fulfilled, (state, action) => {
      state.filtersData = action.payload;
      state.brandsData = action.payload.brand;

      state.completeScreenLoader = false;
    });
    builder.addCase(fetchAllFiltersDetail.rejected, (state) => {
      state.completeScreenLoader = false;
    });

    builder.addCase(fetchAllProductsList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchAllProductsList.fulfilled, (state, action: any) => {
      state.productsList = action.payload?.data;
      state.bigPostList = action.payload?.big_post;
      state.pageNumber = action?.payload?.currentPage;
      state.totalProduct = action?.payload?.total;
      state.manufacturersSuppliers = action?.payload?.manufacturers_suppliers;
      state.lastPage = action?.payload?.lastPage;
      state.productKeywords = action?.payload?.keywords;
      state.relatedLikedProducts = action?.payload?.related_liked_products;
      state.mostSearchesProducts = action?.payload?.most_searches_products;
      state.loader = false;
    });
    builder.addCase(fetchCatelogue.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(fetchCatelogue.fulfilled, (state, action) => {
      state.loader = false;
      state.catalogData =
        action.payload?.data?.length > 0 ? action.payload?.data : [];
    });
    builder.addCase(fetchCatelogue.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteCatalog.rejected, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteCatalog.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(deleteCatalog.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchMoreProducts.pending, (state) => {
      state.localLoader = true;
    });
    builder.addCase(fetchMoreProducts.fulfilled, (state, action) => {
      state.localLoader = false;
    });
    builder.addCase(fetchMoreProducts.rejected, (state, action) => {
      state.localLoader = false;
    });
    builder.addCase(fetchRolesData.rejected, (state, action) => {
      state.loader = false;
    });
    builder.addCase(fetchRolesData.fulfilled, (state, action) => {
      state.loader = false;
      state.rolesData = action.payload?.length > 0 ? action.payload : [];
    });
    builder.addCase(fetchRolesData.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(deleteRoles.rejected, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteRoles.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(deleteRoles.pending, (state) => {
      state.loader = true;
    });
  },
});

// extrareducers:{
//   [showUser.pending]:(state,action)=>{
//     state.loading=true;
//   }},
//   [showUser.fulfilled]:(state,action)=>{
//     state.loading=false
//     state.users.push(action.payload);}
//   }

export const {
  setBigPostList,
  setPageNumber,
  setTotalProduct,
  setManufacturersSuppliers,
  setProductList,
  setProductKeywords,
  setRelatedLikedProducts,
  setMostSearchesProducts,
  setFilterCategory,
  resetAllFilters,
  setSearchProudct,
  setViewType,
  setAnnualIds,
  setSingleProductId,
  setGetLatestPopup,
  setCategoryIds,
  setLoader,
  setBrandIds,
  setBrandsData,
  setAvailabilityIds,
  setPriceTypeIds,
  setMaxPrice,
  setMinPrice,
  setManufacturerYear,
  setConditionIds,
  setEmptyData,
  setBusinessIds,
  setCountrysData,
  setFiltersDataIds,
  setSingleProduct,
  setSliderValue,
  resetToggleHandler,
  setLastPage,
  setTerritory,
  setKeywordData,
  setKeywordName,
  setEditRole,
} = UseProductListContext.actions;
export default UseProductListContext;

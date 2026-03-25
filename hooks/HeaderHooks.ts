import { apiClient } from "@/components/common/common";
import { BASE_URL } from "@/utils/staticValues";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const HeaderList: any = createAsyncThunk("My wishList", async () => {
  let pagePromise = new Promise(async (resolve, reject) => {
    let res: any = await fetch(`${BASE_URL}/website_menu/getMenus_items/3`);
    let response = await res.json();
    if (response.status) {
      return resolve(response.data);
    } else {
      return resolve([]);
    }
  });
  let categoryPromise = new Promise(async (resolve, reject) => {
    let response = await apiClient("categoryList", "post", {
      body: { parent: 0, user_id: "", with_product: 1 },
    });
    if (response.status === 200) {
      return resolve(response.data);
    } else {
      return reject(false);
    }
  });
  let promise = await Promise.all([pagePromise, categoryPromise]).then(
    (value) => value
  );
  return { pages: promise[0], list: promise[1] };
});

const getGeoLocation = createAsyncThunk("geo_location", async () => {
  const response = await fetch("https://geolocation-db.com/json/");
  const data = await response.json();
  setDefaultCountryCode(data.country_code);
  localStorage.setItem("countryCode", data.country_code);
  return data;
});

const HeaderCategoryList = createSlice({
  name: "header",
  initialState: {
    pageList: [],
    loader: false,
    categoryList: [],
    unit: [],
    categoryMetaData: {},
    subCategoryMetaData: [],
    togglenavbar: false,
    defaultCountryCode: "",
    wishListData: [],
  },
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setCategoryMetaData: (state, action) => {
      state.categoryMetaData = action.payload;
    },
    setSubCategoryMetaData: (state, action) => {
      state.subCategoryMetaData = action.payload;
    },
    setToggleNavbar: (state, action) => {
      state.togglenavbar = action.payload;
    },
    setDefaultCountryCode: (state, action) => {
      state.defaultCountryCode = action.payload;
    },
    setWishListData: (state, action) => {
      state.wishListData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HeaderList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(HeaderList.fulfilled, (state, action) => {
      state.pageList = action.payload.pages;
      state.categoryList = action.payload.list;
      state.loader = false;
    });
    builder.addCase(HeaderList.rejected, (state) => {
      state.loader = false;
    });
  },
});
export const {
  setUnit,
  setCategoryMetaData,
  setSubCategoryMetaData,
  setToggleNavbar,
  setDefaultCountryCode,
  setWishListData,
} = HeaderCategoryList.actions;
export default HeaderCategoryList;

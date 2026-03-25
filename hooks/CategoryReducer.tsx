import Auth from "@/auth/Auth";
import SubCategoryList from "@/components/category/SubCategoryList";
import { apiClient } from "@/components/common/common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  detail: { loader: true, data: {}, status: true },
  categoryList: [],
  categoryDetail: [],
  subCategoryDetail: [],
  meta_data: "",
  breadCrumbsData: [],
  addNewParent: "",
  metaKeywords: [],
  subCategory: [],
  allCategories: [],
};

export const getCategoryData: any = createAsyncThunk(
  "get Categaory",
  async (payload) => {
    let response = await apiClient(`categoryList`, "post", {
      body: {
        parent: 0,
        user_id: Auth?.userData()?.id,
      },
    });
    false;
    return response;
  }
);

export const CategoryDetailReducer: any = createSlice({
  name: "categoryDetail",
  initialState,
  reducers: {
    AddProductDetail: (state: any, action: any) => {
      const { payload }: any = action;
      return {
        ...state,
        detail: {
          data: payload.data,
          status: payload.status,
          loader: payload.loader,
        },
      };
    },
    setCategoryList: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, categoryList: payload };
    },
    setNewParent: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, addNewParent: payload };
    },
    setCategoryDetail: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, categoryDetail: payload };
    },
    setSubCategoryDetail: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, subCategoryDetail: payload };
    },
    setCategoryMetaData: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, meta_data: payload };
    },
    setMultispecData :(state: any, action: any) => {
      
    },
    setBreadCrumbsData: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, breadCrumbsData: payload };
    },
    setMetaKeywords: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, metaKeywords: payload };
    },
    setSubCategory: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, subCategory: payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryData.pending, (state, action) => {});
    builder.addCase(getCategoryData.rejected, (state, action) => {});
    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      state.allCategories = action.payload?.data;
    });
  },
});
export const {
  setCategoryList,
  setCategoryDetail,
  setSubCategoryDetail,
  setCategoryMetaData,
  setMultispecData,
  setNewParent,
  setBreadCrumbsData,
  setMetaKeywords,
  setSubCategory,
} = CategoryDetailReducer.actions;
export default CategoryDetailReducer;

import { createSlice } from "@reduxjs/toolkit";
import { productDetails } from "./Interface";
import { HYDRATE } from "next-redux-wrapper";

const initialState: productDetails = {
  detail: { loader: true, data: {}, status: true },
  country: [],
  unit: [],
  productConfig: [],
  selectedProductOptions: [],
  openQuoteModal: false,
  toggleConfigure: false,
  toggleSidebar: false,
};

export const ProdutDetailReducer: any = createSlice({
  name: "productDetail",
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
    AddCountryList: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, country: payload };
    },
    AddUnitList: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, unit: payload };
    },
    setProductConfig: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, productConfig: payload };
    },
    setSelectedProductOptions: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, selectedProductOptions: payload };
    },
    setQuoteModal: (state: any, action: any) => {
      const { payload }: any = action;
      return { ...state, openQuoteModal: payload };
    },
    setToggleConfigure: (state: any, action: any) => {
      const { payload }: any = action;
      state.toggleConfigure = payload;
    },
    setToggleSidebar: (state: any, action: any) => {
      state.toggleSidebar = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.detail = action.payload.productDetail.detail;
    },
  },
});
export const {
  AddProductDetail,
  AddCountryList,
  AddUnitList,
  setProductConfig,
  setSelectedProductOptions,
  setQuoteModal,
  setToggleConfigure,
  setToggleSidebar,
} = ProdutDetailReducer.actions;
export default ProdutDetailReducer;

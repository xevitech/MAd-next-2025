import { apiClient } from "@/components/common/common";
import { createSlice } from "@reduxjs/toolkit";

const QuoteDetailReducer = createSlice({
  name: "header",
  initialState: {
    quotedetails: {},
    submitquotedata: {},
    relatedProductData: [],
    relatedProductSpecs: [],
    TotalAndUnitPrice: { mainProduct: [], relatedSimpleProductPrice: [] },
    productQuantity: 1,
    unitList: [],
    category_lists: [],
  },
  reducers: {
    setQuoteDetails: (state, action) => {
      state.quotedetails = action.payload;
    },
    setSubmitQuoteData: (state, action) => {
      state.relatedProductData = action.payload;
    },
    setRelatedProductSpecs: (state, action) => {
      state.relatedProductSpecs = action.payload;
    },
    setTotalAndUnitPrice: (state, action) => {
      state.TotalAndUnitPrice = action.payload;
    },
    setProductQuantity: (state, action) => {
      state.productQuantity = action.payload;
    },
    setUnitList: (state, action) => {
      state.unitList = action.payload;
    },
    setMultispecData: (state, action) => {
      state.category_lists = action.payload;
    },
  },
});
export const {
  setQuoteDetails,
  setSubmitQuoteData,
  setRelatedProductSpecs,
  setTotalAndUnitPrice,
  setProductQuantity,
  setUnitList,
  setMultispecData,
} = QuoteDetailReducer.actions;
export default QuoteDetailReducer;

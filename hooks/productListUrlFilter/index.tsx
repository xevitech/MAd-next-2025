import { createSlice } from "@reduxjs/toolkit";

export interface productListUrlFilter {
  availabilities: any[];
  brand: any;
  business: any[];
  category: any;
  revenue: any[];
  range: any;
  condition : any[];
  manufacturer: any[];
  priceTypes: any[];
}

const productListUrlFilter = createSlice({
  name: "UrlFilter",
  initialState: {
    availabilities: [],
    brand: "",
    business: [],
    priceTypes: [],
    manufacturer: [],
    condition: [],
    range: "",
    revenue: [],
    category: "",
  } as productListUrlFilter,
  reducers: {
    setAvailability: (state, action) => {
      state.availabilities = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setBusiness: (state, action) => {
      state.business = action.payload;
    },
    setPriceType: (state, action) => {
      state.priceTypes = action.payload;
    },
    setManufacturer: (state, action) => {
      state.manufacturer = action.payload;
    },
    setCondition: (state, action) => {
      state.condition = action.payload;
    },
    setRange: (state, action) => {
      state.range = action.payload;
    },
    setRevenue: (state, action) => {
      state.revenue = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const {
  setCategory,
  setAvailability,
  setBrand,
  setBusiness,
  setCondition,
  setManufacturer,
  setPriceType,
  setRange,
  setRevenue,
} = productListUrlFilter.actions;
export default productListUrlFilter;

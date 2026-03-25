import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdsList } from "./Interface";
import moment from "moment";

export const fetchAllAds: any = createAsyncThunk(
  "All Ads",
  async (type: any) => {
    var body = {
      ad_type: type ? type : "simple",
    };
    let response = await apiClient("ads/getlist", "post", { body });
    return response;
  }
);

export const fetchAllProducts: any = createAsyncThunk(
  "Ads Product",
  async (type: any) => {
    var body = {
      per_page: "100",
    };
    let response = await apiClient("product/list", "get", { body });
    response.data.forEach((item, index) => {
      item.serialNo = index + 1;
    });
    return response;
  }
);

export const createAds: any = createAsyncThunk(
  "Add New Ads",
  async (payloads: any) => {
    var body = {
      ad_type: payloads.ad_type,
      title_1: payloads.title_1,
      title_2: payloads.title_2,
      title_3: payloads.title_3,
      product_ids: payloads.product_id.join(),
      start_date: moment(payloads.start_date).format("YYYY-MM-DD HH:mm:ss"),
      end_date: moment(payloads.end_date).format("YYYY-MM-DD HH:mm:ss"),
    };
    let response = await apiClient("ads/create", "post", { body });
    return response;
  }
);

export const updateAds: any = createAsyncThunk(
  "Update Ads",
  async (payloads: any) => {
    var body = {
      id: payloads.id,
      ad_type: payloads.ad_type,
      title_1: payloads.title_1,
      title_2: payloads.title_2,
      title_3: payloads.title_3,
      product_ids: payloads.product_id.join(),
      start_date: moment(payloads.start_date).format("YYYY-MM-DD HH:mm:ss"),
      end_date: moment(payloads.end_date).format("YYYY-MM-DD HH:mm:ss"),
    };
    let response = await apiClient("ads/update", "POST", { body });
    return response;
  }
);

export const deleteAds: any = createAsyncThunk(
  "Delete Ads",
  async (adsId: any) => {
    let response = await apiClient("ads/delete/" + adsId, "GET");

    return response;
  }
);

export const fetchAdsDetail: any = createAsyncThunk(
  "Get Ads Detail",
  async (adsId: any) => {
    let response = await apiClient(`ads/getdetails/${adsId}`, "GET");
    return response;
  }
);

const UseAds = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    products: [],
    createAdd: [],
    updateAdd: [],
    AdsDetail: [],
    loader: true,
    productLoader: true,
    createLoader: false,
    detailsLoader: false,
    adsId: null,
    title_1: "",
  } as AdsList,
  reducers: {
    setAdsId: (state, action) => {
      state.adsId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllAds.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchAllAds.fulfilled, (state, action) => {
      state.ads = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchAllAds.rejected, (state) => {
      state.loader = false;
    });
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.productLoader = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productLoader = false;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.productLoader = false;
    });
    builder.addCase(createAds.pending, (state) => {
      state.createLoader = true;
    });
    builder.addCase(createAds.fulfilled, (state, action) => {
      state.createAdd = action.payload;
      state.createLoader = false;
    });
    builder.addCase(updateAds.rejected, (state) => {
      state.createLoader = false;
    });
    builder.addCase(updateAds.pending, (state) => {
      state.createLoader = true;
    });
    builder.addCase(updateAds.fulfilled, (state, action) => {
      state.updateAdd = action.payload;
      state.createLoader = false;
    });
    builder.addCase(createAds.rejected, (state) => {
      state.createLoader = false;
    });
    builder.addCase(fetchAdsDetail.pending, (state) => {
      state.detailsLoader = true;
    });
    builder.addCase(fetchAdsDetail.fulfilled, (state, action) => {
      state.AdsDetail = action.payload;
      state.title_1 = action.payload?.data?.title_1;
      state.detailsLoader = false;
    });
    builder.addCase(fetchAdsDetail.rejected, (state) => {
      state.detailsLoader = false;
    });
  },
});
export const { setAdsId } = UseAds.actions;
export default UseAds;

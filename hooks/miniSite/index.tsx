import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { miniSite } from "../Interface";
import { useRouter } from "next/router";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";
import { State } from "grapesjs";
const initialState = {
  detailPopOver: null,
  userID: "",
  miniSiteID: "",
  reviewData: null,
  reviewloader: true,
  certificateloading: true,
  headerloading: true,
  productData: [],
  territoryData: [],
  contextloading: true,
  userinfo: null,
  errormessage: null,
  sortedData: [],
  certificatesData: null,
  faqData: null,
  headerData: null,
  selctedcategory: "",
  selctedsorting: "",
  factorydetails: null,
  servicelist: null,
  loader: true,
  loading: true,
  allProducts: null,
  searchname: "",
  pageNumber: 1,
  newsdata: null,
  activeData: null,
  rndDetail: {},
  categoryList: [],
  searchCategory: "",
  anchorEll: null,
  newList: "ASC",
  minisiteUserID: "",
  contactChatData: "",
  authenticate: true,
  userCategory: [],
} as miniSite;

export const fetchReviewData: any = createAsyncThunk(
  "MiniSite Review Data",
  async (payload: any) => {
    let response = await apiClient("front/mini-site/list-reviews?type=Review", "post", {
      body: {
        shop_id: payload,
        user_id: JSON.parse(localStorage.getItem("userData"))?.id,
      },
    });
    return response;
  }
);

export const handleClosePopUp = (item: any) => {};
const useMiniSiteContext = createSlice({
  name: "miniSite",
  initialState: {
    allReview: [],
    updateFeedback: [],
  },
  reducers: {
    setUpdateFeedback: (state: any, action) => {
      state.updateFeedback = action.payload;
    },
    sortProduct: (state: any, action) => {
      const newArr = state.productData?.data?.sort((a, b) =>
        a.product_name > b.product_name
          ? 1
          : b.product_name > a.product_name
          ? -1
          : 0
      );
      state.productData = { ...state.productData, data: newArr };
    },
    setSearchCategory: (state: any, action) => {
      state.searchCategory = action.payload;
    },
    setSearchName: (state: any, action) => {
      state.searchname = action.payload;
    },
    setCloseAnchorEl: (state: any, action) => {
      state.anchorEll = action.payload;
    },
    setSortOrder: (state: any, action) => {
      state.newList = action.payload;
    },
    setMinisiteID: (state: any, action) => {
      state.miniSiteID = action.payload;
    },
    setContactChat: (state: any, action) => {
      state.contactChatData = action.payload;
    },
    setuserID: (state: any, action) => {
      state.userID = action.payload;
    },
    UpdateContactStatus: (state: any, action) => {
      state.userInfo.basic_information.check_user = action.payload;
    },
    setDetailPopOver: (state: any, action) => {
      state.detailPopOver = action.payload;
    },
    setHeaderData: (state: any, action) => {
      state.headerData = action.payload;
      state.userInfo = action.payload;
      state.headerLoading = false;
    },
    setReviewData: (state: any, action) => {
      state.headerData = action.payload;
      state.userInfo = action.payload;
    },
    setTerritoryData: (state: any, action) => {
      state.territoryData = action.payload;
    },
    setMinisiteUserId: (state: any, action) => {
      state.minisiteUserID = action.payload;
    },
    setAuthenticate: (state: any, action) => {
      state.authenticate = action.payload;
    },
    setUserCategory: (state: any, action) => {
      state.userCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviewData.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchReviewData.fulfilled, (state, action) => {
      state.allReview = action.payload;
    });
    builder.addCase(fetchReviewData.rejected, (state) => {
      state.loader = false;
    });
  },
});

export const {
  setSearchCategory,
  setSearchName,
  sortProduct,
  setCloseAnchorEl,
  setSortOrder,
  setMinisiteID,
  setuserID,
  UpdateContactStatus,
  setDetailPopOver,
  setHeaderData,
  setTerritoryData,
  setMinisiteUserId,
  setAuthenticate,
  setContactChat,
  setUserCategory,
  setUpdateFeedback,
} = useMiniSiteContext.actions;
export default useMiniSiteContext;

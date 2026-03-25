import { crmApiClient } from "@/utils/apiClient/crmApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  threadType: "",
  leadSource: "",
  currentThreadData: [],
  threadType1Data: [],
  threadType2Data: [],
  threadType3Data: [],
  activitiesData: [],
  filesData: [],
  emailData: [],
  productDetails: {},
  contactDetails: {},
  loading: true,
  error: null,
  leadId: "",
  detailsTab: "",
  activityViewType: "",
  threadName: "",
  saveLoader: false,
  isThreadDataNull: false,
  threadList: [],
  filterData:[],
  statusList: [],
};

export const fetchStatusList: any = createAsyncThunk(
  "Fetch Status List",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    try {
      let response = await crmApiClient(`lead/group-classification`, "get");
      dispatch(setStatusList(response?.data));
    } catch (error) {
      throw new Error("Failed to fetch thread data");
    }
  }
);

export const leadStatusChange: any = createAsyncThunk(
  "Lead Status Change",
  async (payloads: any, { getState, dispatch }) => {
    let response = await crmApiClient(`lead/lead-status-update`, "post", {
      body: {lead_id: payloads?.lead_id, status_id: payloads?.status_id},
    });
    dispatch(fetchData(payloads?.thread_id));
    return response;
  }
);

export const fetchThreadList: any = createAsyncThunk(
  "Thread Data",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    try {
       let response = await crmApiClient(
            `thread/index?sort_by=${payloads}`,
            "get"
          );
          dispatch(setThreadList(response?.data))
          dispatch(setFilterDataKeys(response?.filter));
          return response;
    } catch (error) {
      
      throw new Error("Failed to fetch thread data");
    }
  }
);
export const fetchData: any = createAsyncThunk(
  "Fetch Data",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    // dispatch(setSaveLoader(true));
    try {
      const response = await crmApiClient(`thread/list/${payloads}`, "get");
      if (response?.status == 200) {
        if(!response?.type || response?.leads?.length == 0){
          dispatch(setIsThreadDataNull(true));
          dispatch(setSaveLoader(false));
          return;
        }
        dispatch(setIsThreadDataNull(false));
        dispatch(setThreadType(response?.type));
        dispatch(setLeadSource(response?.lead_source));
        dispatch(setContactDetails(response?.contact_details));
        dispatch(setThreadName(response?.thread_name));
        if (response?.type === "type_1") {
          dispatch(setProductDetails(response?.product_details));
          dispatch(setThreadType1Data(response?.leads));
        } else if (response?.type === "type_2") {
          dispatch(setThreadType2Data(response?.leads));
        } else if (response?.type === "type_3") {
          dispatch(setThreadType3Data(response?.leads));
        }
      }
      // dispatch(setSaveLoader(false));
    } catch (error) {
      // dispatch(setSaveLoader(false));
      throw new Error("Failed to fetch thread data");
    }
  }
);

export const fetchInitialData: any = createAsyncThunk(
  "Fetch initial Data",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    dispatch(setSaveLoader(true));
    try {
      const response = await crmApiClient(`thread/list/${payloads}`, "get");
      if (response?.status == 200) {
        if(!response?.type || response?.leads?.length == 0){
          dispatch(setIsThreadDataNull(true));
          dispatch(setSaveLoader(false));
          return;
        }
        dispatch(setIsThreadDataNull(false));
        dispatch(setThreadType(response?.type));
        dispatch(setLeadSource(response?.lead_source));
        dispatch(setContactDetails(response?.contact_details));
        dispatch(setThreadName(response?.thread_name));
        if (response?.type === "type_1") {
          dispatch(setProductDetails(response?.product_details));
          dispatch(setThreadType1Data(response?.leads));

          dispatch(setLeadId(response?.leads[0]?.lead_id));
        } else if (response?.type === "type_2") {
          dispatch(setThreadType2Data(response?.leads));
          dispatch(setLeadId(response?.leads[0]?.lead_id));
        } else if (response?.type === "type_3") {
          dispatch(setThreadType3Data(response?.leads));
          dispatch(setLeadId(response?.leads[0]?.lead_id));
        }
      }
      dispatch(setSaveLoader(false));
    } catch (error) {
      dispatch(setSaveLoader(false));
      throw new Error("Failed to fetch thread data");
    }
  }
);

export const ThreadReducer = createSlice({
  name: "Thread",
  initialState,
  reducers: {
    setThreadType: (state, action) => {
      state.threadType = action.payload;
    },
    setThreadType1Data: (state, action) => {
      state.threadType1Data = action.payload;
    },
    setThreadType2Data: (state, action) => {
      state.threadType2Data = action.payload;
    },
    setThreadType3Data: (state, action) => {
      state.threadType3Data = action.payload;
    },
    setActivitiesData: (state, action) => {
      state.activitiesData = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setContactDetails: (state, action) => {
      state.contactDetails = action.payload;
    },
    setLeadSource: (state, action) => {
      state.leadSource = action.payload;
    },
    setDetailActiveTab: (state, action) => {
      state.detailsTab = action.payload;
    },
    setActivityViewType: (state, action) => {
      state.activityViewType = action.payload;
    },
    setLeadId: (state, action) => {
      state.leadId = action.payload;
    },
    setThreadName: (state, action) => {
      state.threadName = action.payload;
    },
    setSaveLoader: (state, action) => {
      state.saveLoader = action.payload;
    },
    setIsThreadDataNull:(state, action) =>{
      state.isThreadDataNull = action.payload;
    },
    setThreadList:(state, action) =>{
      state.threadList = action.payload;
    },
      setFilterDataKeys:(state, action) =>{
      state.filterData = action.payload;
    },
    setStatusList:(state, action) =>{
      state.statusList = action.payload;
    }
  },
});

export const {
  setThreadType,
  setThreadType1Data,
  setThreadType2Data,
  setThreadType3Data,
  setActivitiesData,
  setProductDetails,
  setContactDetails,
  setLeadSource,
  setDetailActiveTab,
  setActivityViewType,
  setLeadId,
  setThreadName,
  setSaveLoader,
  setIsThreadDataNull,
  setThreadList,
  setFilterDataKeys,
  setStatusList
} = ThreadReducer.actions;

export default ThreadReducer;

import { crmApiClient } from "@/utils/apiClient/crmApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  automationData: [],
  condition_options: [],
  loading: true,
  error: null,
  automationListsData: [],
};

export const getAutomationData: any = createAsyncThunk(
  "Fetch Automation Data",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await crmApiClient(
        `automation/show/${payloads?.id}`,
        "get"
      );
      const {
        data: { automation, condition_option = [] },
      } = response;
      dispatch(setAutomationCoditionOptions(condition_option));
      return automation;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch automation data"
      ); // Pass error to the slice
    }
  }
);
export const fetchAutomationLists: any = createAsyncThunk(
  "Fetch Automation Data Lists",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    try {
      const response = await crmApiClient(`automation/index`, "get");
      dispatch(setAutomationList(response?.data));
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch automation data"
      ); // Pass error to the slice
    }
  }
);

export const AutomationReducer = createSlice({
  name: "Automation",
  initialState,
  reducers: {
    setAutomationDatas: (state, action) => {
      state.automationData = action.payload;
    },
    updateAutomationData: (state, action) => {
      state.automationData = action.payload;
    },
    setAutomationCoditionOptions: (state, action) => {
      state.condition_options = action.payload;
    },
    setAutomationList: (state, action) => {
      state.automationListsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending: While the request is in progress
      .addCase(getAutomationData.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset the error when starting to load new data
      })
      // Fulfilled: When the request is successful
      .addCase(getAutomationData.fulfilled, (state, action) => {
        state.loading = false;
        state.automationData = action.payload; // Set the automation data from the payload
      })
      // Rejected: When the request fails
      .addCase(getAutomationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred"; // Set the error message
      });
  },
});

export const {
  setAutomationDatas,
  updateAutomationData,
  setAutomationCoditionOptions,
  setAutomationList,
} = AutomationReducer.actions;

export default AutomationReducer;

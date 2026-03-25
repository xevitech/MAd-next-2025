import { crmApiClient } from "@/utils/apiClient/crmApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const stringifyEvaluationData = (data: any): any => {
  const result: any = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = { ...data[key] };

      if (Array.isArray(item.evaluation_data)) {
        item.evaluation_data = JSON.stringify(item.evaluation_data);
      }

      result[key] = item;
    }
  }

  return result;
};

export const parseEvaluationData = (data: any): any => {
  const result: any = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = { ...data[key] };

      if (typeof item.evaluation_data === "string") {
        try {
          item.evaluation_data = JSON.parse(item.evaluation_data);
        } catch (error) {
          console.error(`Invalid JSON in evaluation_data for key: ${key}`);
          item.evaluation_data = [];
        }
      }

      result[key] = item;
    }
  }

  return result;
};

const initialState = {
  saveLoader: false,
  leadContactInformation: {},
  leadCompanyInformation: {},
  leadBant: {},
  fitWithProduct: {},
  buyerEngagement: {},
  buyerInteraction: {},
  buyerEngagementWithPlatform: {},
  buyerIntAction: {},
  stats: {},
  fetchLoader: false,
};

export const fetchLeadScoringData: any = createAsyncThunk(
  "Fetch lead scoring Data",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    dispatch(setFetchLoader(true));
    try {
      const response = await crmApiClient(`score/criteria/list`, "get");
      if (response?.status == 200) {
        dispatch(
          setLeadContactInfo(
            parseEvaluationData(response?.data?.lead_contact_info) ?? {}
          )
        );
        dispatch(
          setLeadCompanyInfo(
            parseEvaluationData(response?.data?.lead_company_info) ?? {}
          )
        );
        dispatch(
          setLeadBant(parseEvaluationData(response?.data?.lead_bant) ?? {})
        );
        dispatch(
          setFitWithProduct(
            parseEvaluationData(response?.data?.fit_with_product) ?? {}
          )
        );
        dispatch(
          setBuyerEngagement(
            parseEvaluationData(response?.data?.buyer_engagement) ?? {}
          )
        );
        dispatch(
          setBuyerInteraction(
            parseEvaluationData(response?.data?.buyer_interaction) ?? {}
          )
        );
        dispatch(
          setBuyerEngagementWithPlatform(
            parseEvaluationData(
              response?.data?.buyer_engagement_with_platform
            ) ?? {}
          )
        );
        dispatch(setStats(response?.stats ?? {}));
        dispatch(
          setBuyerIntActions(
            parseEvaluationData(response?.data?.buyer_Int_actions) ?? {}
          )
        );
      }
      dispatch(setFetchLoader(false));
    } catch (error) {
      dispatch(setFetchLoader(false));
      throw new Error("Failed to fetch thread data");
    }
  }
);

export const saveLeadScoreData: any = createAsyncThunk(
  "Save lead scoring Data",
  async (payloads: any, { getState, dispatch, rejectWithValue }) => {
    dispatch(setSaveLoader(true));
    try {
      const state: any = getState();
      const updatedPayload = {
        lead_contact_info: stringifyEvaluationData(
          state.leadScoring.leadContactInformation
        ),
        lead_company_info: stringifyEvaluationData(
          state.leadScoring.leadCompanyInformation
        ),
        lead_bant: stringifyEvaluationData(state.leadScoring.leadBant),
        fit_with_product: stringifyEvaluationData(
          state.leadScoring.fitWithProduct
        ),
        buyer_engagement: stringifyEvaluationData(
          state.leadScoring.buyerEngagement
        ),
        buyer_interaction: stringifyEvaluationData(
          state.leadScoring.buyerInteraction
        ),
        buyer_engagement_with_platform: stringifyEvaluationData(
          state.leadScoring.buyerEngagementWithPlatform
        ),
        buyer_Int_actions: stringifyEvaluationData(
          state.leadScoring.buyerIntAction
        ),
      };

      const response = await crmApiClient(`score/criteria/store`, "post", {
        body: updatedPayload,
      });
      if (response?.status == 200) {
        toast.success("Lead scoring saved successfully.");
      }
      dispatch(setSaveLoader(false));
    } catch (error) {
      dispatch(setSaveLoader(false));
      throw new Error("Failed to fetch thread data");
    }
  }
);

export const leadScoringSlice = createSlice({
  name: "Lead Scoring",
  initialState,
  reducers: {
    setSaveLoader: (state, action) => {
      state.saveLoader = action.payload;
    },
    setFetchLoader: (state, action) => {
      state.fetchLoader = action.payload;
    },
    setLeadContactInfo: (state, action) => {
      state.leadContactInformation = action.payload;
    },
    setLeadCompanyInfo: (state, action) => {
      state.leadCompanyInformation = action.payload;
    },
    setLeadBant: (state, action) => {
      state.leadBant = action.payload;
    },
    setFitWithProduct: (state, action) => {
      state.fitWithProduct = action.payload;
    },
    setBuyerEngagement: (state, action) => {
      state.buyerEngagement = action.payload;
    },
    setBuyerInteraction: (state, action) => {
      state.buyerInteraction = action.payload;
    },
    setBuyerEngagementWithPlatform: (state, action) => {
      state.buyerEngagementWithPlatform = action.payload;
    },
    setBuyerIntActions: (state, action) => {
      state.buyerIntAction = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
  },
});

export const {
  setSaveLoader,
  setFetchLoader,
  setLeadContactInfo,
  setLeadCompanyInfo,
  setLeadBant,
  setFitWithProduct,
  setBuyerEngagement,
  setBuyerEngagementWithPlatform,
  setBuyerInteraction,
  setBuyerIntActions,
  setStats,
} = leadScoringSlice.actions;

export default leadScoringSlice;

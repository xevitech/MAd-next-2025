import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { log } from "console";
import { socialMediaData } from "./Interface";

const initialState: socialMediaData = {
  socialMediaLists: [],
  addAccounts: false,
  deleteId: 0,
  deleteConfirmation: false,
  skeletonLoader: false,
  deleted: [],
  prevProfileLink: "",
};

export const submitSocialData: any = createAsyncThunk(
  "Social_Media_account",
  async (payload) => {
    let response = await apiClient(`profile/submit/social`, "post", {
      body: {
        social_data: [payload],
      },
    });

    return response;
  }
);
export const getSocialData: any = createAsyncThunk(
  "Social_Media_List",
  async (payload) => {
    let response = await apiClient(`profile/list/social`, "post", {
      body: { type: payload },
    });
    console.log("getresponse");
    return response;
  }
);

export const deleteSocialData: any = createAsyncThunk(
  "Delete_Social_Media_List",
  async (payload, { getState }) => {
    const state: any = getState();

    const payloads = {
      social_data: state.SocialMedia.socialMediaLists,
      delete_ids: state.SocialMedia.deleteId,
    };
    let response = await apiClient(`profile/submit/social`, "post", {
      body: payloads,
    });
    return response;
  }
);

export const editSocialAccount: any = createAsyncThunk(
  "edit_social_list",
  async (payload) => {
    return payload;
  }
);

export const SaveEditedSocialData: any = createAsyncThunk(
  "save_social_account",
  async (payload) => {
    let response = await apiClient(`profile/submit/social`, "post", {
      body: payload,
    });
    if (response.status == 200) {
      getSocialData();
    }
  }
);

const socialMediaReducer = createSlice({
  name: "SocialMedia",
  initialState,
  reducers: {
    setCompleteScreenLoader: (state, action) => {},
    setSkeletonLoader: (state, action) => {
      state.skeletonLoader = action.payload;
    },
    setSocialAccountList: (state, action) => {
      state.socialMediaLists = [...state.socialMediaLists, action.payload];
    },
    setDeleteConfirmation: (state, action) => {
      state.deleteConfirmation = action.payload;
    },
    setDeletedId: (state, action) => {
      state.deleteId = action.payload;
    },
    getDeletedIndex: (state, action) => {
      const deletedData = [...state.socialMediaLists];
      deletedData.splice(action.payload, 1);
      state.socialMediaLists = deletedData;
    },
    setprevProfileLink: (state, action) => {
      state.prevProfileLink = action.payload;
    },
    setCancelEdit: (state, action) => {
      let list = [...state.socialMediaLists];
      list[action.payload].profile_link = state.prevProfileLink;
      state.socialMediaLists = list;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSocialData.pending, (state) => {});
    builder.addCase(submitSocialData.rejected, (state) => {});
    builder.addCase(submitSocialData.fulfilled, (state, action) => {
      state.skeletonLoader = false;
    });
    builder.addCase(getSocialData.fulfilled, (state, action) => {
      state.socialMediaLists = action.payload?.data;
      state.skeletonLoader = false;
    });
    builder.addCase(getSocialData.pending, (state, action) => {});
    builder.addCase(getSocialData.rejected, (state, action) => {});
    builder.addCase(deleteSocialData.pending, (state, action) => {});
    builder.addCase(deleteSocialData.rejected, (state, action) => {
      console.log(action, "action of delete");
    });
    builder.addCase(deleteSocialData.fulfilled, (state, action) => {
      state.deleteConfirmation = false;
      getSocialData();
    });

    builder.addCase(editSocialAccount.fulfilled, (state, action) => {
      const value = action.payload[0];
      const index = action.payload[1];
      let list = [...state.socialMediaLists];
      if (action.payload[2] == "WhatsApp") {
        list[index].profile_link = value;
        state.socialMediaLists = list;
      } else {
        list[index].profile_link = value;
        state.socialMediaLists = list;
      }
    });
    builder.addCase(SaveEditedSocialData.fulfilled, (state, action) => {
      state.skeletonLoader = false;
    });
  },
});
export const {
  setSocialAccountList,
  setDeleteConfirmation,
  setDeletedId,
  getDeletedIndex,
  setSkeletonLoader,
  setprevProfileLink,
  setCancelEdit,
} = socialMediaReducer.actions;
export default socialMediaReducer;

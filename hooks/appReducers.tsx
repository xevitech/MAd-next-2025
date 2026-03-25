import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "./Interface";

const initialState: UserData = {
  user_info: {},
  qty: "",
  mobile_country_code: "",
  socailLoader:false,
  social_type: "",
  loginviaSocial: false,
  completeScreenLoader: false,
  userprofileImage: "",
  userName: "",
  id: "",
  verifieduser: "",
  email_id:"",
  mobileverified: "not-found",
  userDetails: "",
  userToken: "",
  userEmail: "",
  memberid: "",
  memberJoined: "",
  planBanner: "",
  pendingFields: [],
  role: "",
  parent_user: null,
  emailVerified: false,
  weChatId: "",
  skypeId: "",
  mobileNumber: "",
  mobileCode: "",
  whatsAppId: "",
  default_role: "",
  deleteAccount: false,
  showRegisterationModal: false,
  showVerifyMobileModal: false,
  showEditMobileModal: false,
  showConfirmEmailModal: false,
  showEditEmailModal: false,
  profileSocialAccount:false,
  profileCompletionPercent: false,
  profilePercentage: "",
  emailId: "",
  followers: [],
  userType: "",
  subSellerList:[],
  ipAddress: "",
  unfollowId: "",
  trackedData: [],
  openLogoutModal: false,
  welcomeModalSocial: false,
  loader: false,
  dashboardSkeleton: false,
  addListingLoader: false,
  userAvailibility: "",
  timeofPop: "",
  profileInfos: {
    basicDetails: {
      fullName: "",
      accountType: "",
      countryId: "",
      city: "",
      postalCode: "",
      gender: "",
      state: "",
      address: "",
      lats: "",
      longs: "",
      avatar_original: "",
      street_address: "",
      email_id:""
    },
    jobDetails: {
      department: "",
      designation: "",
      mainLanguages: [],
      otherLanguages: [],
      time_zone: "",
      procurement_priorities: "",
      purchasing_authority: "",
      technical_expertise: "",
      years_of_experience: "",
      job_function: "",
      job_role: "",
      industry_knowledge: "",
      education: "",
      location: "",
      language: "",
      industry_expertise: "",
      target_customer: "",
      company_type: "",
      sales_skills: "",
      certification: "",
      total_quotation: "",
      total_orders: "",
      avg_time_spend_lead: "",
      wishlist_count: "",
      total_contacts: "",
      total_leads: "",
      lead_oppportunity_conversion_rate: "",
      avg_page_view_per_lead: "",
      weekly_lead_oppportunity_conversion_rate: "",
      weekly_avg_time_spend_lead: "",
      weekly_total_leads: "",
      weekly_total_contacts: "",
      weekly_avg_page_view_per_lead: "",
      weekly_total_quotation: "",
      weekly_wishlist_count: "",
      lead_to_customer_conversion_rate: "",
      lead_to_opportunity_deal_conversion_rate: "",
      total_products: "",
      total_brands: "",
      total_categories: "",
      total_rfq: "",
      email_id:""
    },
    social_accounts: "",
    plan_status: "",
   
  },
};
export const verifyMobileNo: any = createAsyncThunk(
  "verify_mobile_no.",
  async () => {
    let response = await apiClient("/profile/verify/mobile", "post", {});
  }
);

export const profileData: any = createAsyncThunk(
  "Fetch_Profile_Data",
  async (params: any = null) => {
    let userType = localStorage?.userData
      ? JSON.parse(localStorage?.userData)
      : null;
    let response;
    if (userType?.type == "seller") {
      response = await apiClient("profile/view", "post", {
        body: { user_type: "seller" },
      });
    } else if(userType?.type == "subuser"){
      response = await apiClient("profile/view", "post", {
        body: { user_type: "subuser" },
      });
    }else {
      response = await apiClient("profile/view", "get");
    }
    // localStorage.setItem('subAccountRoles',JSON.stringify(response.data.role_permissions))
    var avtar_data = JSON.parse(localStorage.getItem("userData"));
    avtar_data["avatar_original"] = response.data.avatar_original;
    const addedOnlineStatus = { ...avtar_data, online: response?.data?.online };
    localStorage.setItem("userData", JSON.stringify(addedOnlineStatus));
    return response;
  }
);

export const fetchIPAddress = createAsyncThunk(
  "Fetch_IP_address",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      localStorage.setItem("ipAddress", response.data.ip);
      return response.data.ip;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk("Logout_User", async (_, thunkAPI) => {
  try {
    let response = await apiClient("auth/logout", "get");
    if (response.status == 200 || response.status == true) {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.href = "/user/signin";
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getFollowersList: any = createAsyncThunk(
  "Get_Follower_Data",
  async (payload: any) => {}
);

export const loadMoreFollowers: any = createAsyncThunk(
  "loadMore_Follower_Data",
  async (payload: any) => {}
);

export const removeFollowers: any = createAsyncThunk(
  "remove_Follower",
  async (payload: any) => {
    let response = await apiClient(
      `front/delete/follower_list/${payload}`,
      "post"
    );
    if (response.status == 200) {
      getFollowersList();
    }
    return response;
  }
);

export const UpdateprofileData: any = createAsyncThunk(
  "Update_Profile_Data",
  async (payload, { getState }, ...arg) => {
    const state = getState();
    let response = await apiClient("profile/updateProfile", "patch", {
      body: payload,
    });
    return response;
  }
);
export const UpdateJobProfileData: any = createAsyncThunk(
  "Update_job_Profile_Data",
  async (payload, { getState }, ...arg) => {
    const state = getState();
    let response = await apiClient("profile/updateProfile", "patch", {
      body: payload,
    });
    if (response.status) {
      profileData();
    }
    return response;
  }
);

const appReducer = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setCompleteScreenLoading: (state, action) => {
      state.completeScreenLoader = action.payload;
    },
    setPersonalProfileImage: (state, action) => {
      state.userprofileImage = action.payload;
    },
    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },
    setAddListingLoader: (state, action) => {
      state.addListingLoader = action.payload;
    },
    setUnfollower: (state, action) => {
      state.unfollowId = action.payload;
    },
    setShowVerifyMobileModal: (state, action) => {
      state.showVerifyMobileModal = action.payload;
    },
    setShowEditMobileModal: (state, action) => {
      state.showEditMobileModal = action.payload;
    },
    setShowConfirmEmailModal: (state, action) => {
      state.showConfirmEmailModal = action.payload;
    },
    setShowEditEmailModal: (state, action) => {
      state.showEditEmailModal = action.payload;
    },
    setdeleteAccount: (state, action) => {
      state.deleteAccount = action.payload;
    },
    setSocialLoader: (state, action) => {
      state.socailLoader = action.payload;
    },
    setBasicDetail: (state, actions) => {
      state.profileInfos.basicDetails = actions.payload;
    },
    setSelectedQuantity: (state, actions) => {
      state.qty = actions.payload;
    },
    setLoginViaSocial: (state, actions) => {
      state.loginviaSocial = actions.payload;
    },
    setWelcomeSocial: (state, actions) => {
      state.welcomeModalSocial = actions.payload;
    },
    setTimeofPop: (state, actions) => {
      state.timeofPop = actions.payload;
    },
    setRemoveFollower: (state, actions) => {
      state.followers = actions.payload;
    },
    setRegistrationModal: (state, actions) => {
      state.showRegisterationModal = actions.payload;
    },
    setpercent: (state, actions) => {
      state.profilePercentage = actions.payload;
    },
    setUserType: (state, actions) => {
      state.userType = actions.payload;
    },
    setSellerSubList:(state, actions) => {
      state.subSellerList = actions.payload;
    },
    setTrackedData: (state, actions) => {
      state.trackedData = actions.payload;
    },
    setOpenLogoutModal: (state, actions) => {
      state.openLogoutModal = actions.payload;
    },
    setUserBasicInfo: (state, actions) => {
      state.user_info = actions.payload;
    },
    setUserAvailibility: (state, actions) => {
      state.userAvailibility = actions.payload;
    },
    setSocialAccounts: (state, actions) => {
      state.profileInfos.social_accounts = actions.payload;
    },
    setPlanDetails: (state, actions) => {
      state.profileInfos.plan_status = actions.payload;
    },
    setSocialAccountFocused: (state, actions) =>{
      state.profileSocialAccount =  actions.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(profileData.pending, (state) => {
      state.completeScreenLoader = true;
      state.profileCompletionPercent = true;
      state.dashboardSkeleton = true;
      state.openLogoutModal = false;
    });
    builder.addCase(profileData.fulfilled, (state, action) => {
      state.dashboardSkeleton = false;
      state.memberJoined = action.payload.data?.created_at;
      state.planBanner = action.payload.data?.plan_status?.icon;
      state.userprofileImage = action.payload.data?.avatar_original;
      state.userName = action.payload.data?.full_name;
      state.userEmail = action.payload.data?.email_id;
      state.id = action.payload.data?.id;
      state.mobileverified = action.payload?.data?.mobile_verified;
      state.verifieduser = action.payload?.data?.role;
      state.email_id=action.payload?.data?.email_id;
      state.social_type = action.payload?.data?.social_type;
      state.role = action.payload?.data?.role;
      state.memberid = action.payload?.data?.member_id;
      state.emailVerified = action.payload?.data?.email_verified;
      state.pendingFields = action.payload?.data?.pending_fields;
      state.default_role = action.payload?.data?.default_role;
      state.profileCompletionPercent = action.payload?.data?.complete_profile;
      state.profilePercentage = action.payload?.data?.complete_profile;
      state.profileInfos.basicDetails.avatar_original =
        action.payload?.data?.avatar_original;
      state.profileInfos.basicDetails.fullName =
        action.payload?.data?.full_name;
      state.profileInfos.basicDetails.accountType = action.payload?.data?.role;
      state.profileInfos.basicDetails.countryId = action.payload?.data?.country;
      state.profileInfos.basicDetails.city = action.payload?.data?.city;
      state.profileInfos.basicDetails.postalCode =
        action.payload?.data?.postal_code;
      state.profileInfos.basicDetails.gender = action.payload?.data?.gender;
      state.profileInfos.plan_status = action.payload?.data?.plan_status;
      // state.profileInfos.email_id=action.payload?.data?.email_id
      state.completeScreenLoader = false;
      state.mobileCode =
        action.payload?.data?.mobile_code !== null
          ? action.payload?.data?.mobile_code.includes("+")
            ? action.payload.data?.mobile_code
            : `+${action.payload.data?.mobile_code}`
          : "";
      state.mobile_country_code =
        action.payload?.data?.mobile_country_code ?? "";
      state.mobileNumber = action.payload?.data?.mobile;

      if (
        action.payload?.data?.mobile == "" ||
        action.payload?.data?.mobile == null
      ) {
        state.timeofPop = 90000;
      } else {
        state.timeofPop = "";
      }

      state.profileInfos.jobDetails.department =
        action.payload?.data?.department;
      state.profileInfos.jobDetails.designation =
        action.payload?.data?.designation;
      state.profileInfos.jobDetails.mainLanguages =
        action.payload?.data?.main_language_1;
      state.profileInfos.jobDetails.otherLanguages =
        action.payload?.data?.language;
      state.profileInfos.jobDetails.time_zone = action.payload?.data?.time_zone;
      state.profileInfos.jobDetails.procurement_priorities =
        action.payload?.data?.procurement_priorities;
      state.profileInfos.jobDetails.purchasing_authority =
        action.payload?.data?.purchasing_authority;
      state.profileInfos.jobDetails.technical_expertise =
        action.payload?.data?.technical_expertise;
      state.profileInfos.jobDetails.years_of_experience =
        action.payload?.data?.years_of_experience;
      state.profileInfos.jobDetails.job_function =
        action.payload?.data?.job_function;
      state.profileInfos.jobDetails.job_role = action.payload?.data?.job_role;
      state.profileInfos.jobDetails.industry_knowledge =
        action.payload?.data?.industry_knowledge;
      state.profileInfos.jobDetails.education = action.payload?.data?.education;
      state.profileInfos.jobDetails.location = action.payload?.data?.location;
      state.profileInfos.jobDetails.language = action.payload?.data?.language;
      state.profileInfos.jobDetails.target_customer =
        action.payload?.data?.target_customer;
      state.profileInfos.jobDetails.industry_expertise =
        action.payload?.data?.industry_expertise;
      state.profileInfos.jobDetails.company_type =
        action.payload?.data?.company_type;
      state.profileInfos.jobDetails.sales_skills =
        action.payload?.data?.sales_skills;
      state.profileInfos.jobDetails.certification =
        action.payload?.data?.certification;

      state.profileInfos.jobDetails.total_quotation =
        action.payload?.data?.total_quotation;
      state.profileInfos.jobDetails.total_orders =
        action.payload?.data?.total_orders;
      state.profileInfos.jobDetails.avg_time_spend_lead =
        action.payload?.data?.avg_time_spend_lead;
      state.profileInfos.jobDetails.wishlist_count =
        action.payload?.data?.wishlist_count;
      state.profileInfos.jobDetails.total_contacts =
        action.payload?.data?.total_contacts;
      state.profileInfos.jobDetails.total_leads =
        action.payload?.data?.total_leads;

      state.profileInfos.jobDetails.lead_oppportunity_conversion_rate =
        action.payload?.data?.lead_oppportunity_conversion_rate;

      state.profileInfos.jobDetails.avg_page_view_per_lead =
        action.payload?.data?.avg_page_view_per_lead;

      state.profileInfos.jobDetails.weekly_lead_oppportunity_conversion_rate =
        action.payload?.data?.weekly_lead_oppportunity_conversion_rate;
      state.profileInfos.jobDetails.weekly_avg_time_spend_lead =
        action.payload?.data?.weekly_avg_time_spend_lead;
      state.profileInfos.jobDetails.weekly_total_leads =
        action.payload?.data?.weekly_total_leads;
      state.profileInfos.jobDetails.weekly_total_contacts =
        action.payload?.data?.weekly_total_contacts;
      state.profileInfos.jobDetails.weekly_avg_page_view_per_lead =
        action.payload?.data?.weekly_avg_page_view_per_lead;
      state.profileInfos.jobDetails.weekly_total_quotation =
        action.payload?.data?.weekly_total_quotation;
      state.profileInfos.jobDetails.weekly_wishlist_count =
        action.payload?.data?.weekly_wishlist_count;

      state.profileInfos.jobDetails.total_products =
        action.payload?.data?.total_products;

      state.profileInfos.jobDetails.total_brands =
        action.payload?.data?.total_brands;

      state.profileInfos.jobDetails.total_categories =
        action.payload?.data?.total_categories;

      state.profileInfos.jobDetails.total_rfq = action.payload?.data?.total_rfq;

      state.profileInfos.jobDetails.lead_to_customer_conversion_rate =
        action.payload?.data?.lead_to_customer_conversion_rate;
      state.profileInfos.jobDetails.lead_to_opportunity_deal_conversion_rate =
        action.payload?.data?.lead_to_opportunity_deal_conversion_rate;
      state.profileInfos.basicDetails.state = action.payload?.data?.state;
      state.profileInfos.basicDetails.lats = action.payload?.data?.lats;
      state.profileInfos.basicDetails.longs = action.payload?.data?.longs;
      state.profileInfos.basicDetails.address = action.payload?.data?.address;
      state.profileInfos.basicDetails.street_address =
        action.payload?.data?.street_address;

      state.openLogoutModal = false;
    });

    builder.addCase(profileData.rejected, (state, action) => {
      state.completeScreenLoader = false;
      state.profileCompletionPercent = false;
      state.dashboardSkeleton = false;
      state.openLogoutModal = false;
    });
    builder.addCase(fetchIPAddress.fulfilled, (state, action) => {
      state.ipAddress = action.payload;
    });
    builder.addCase(fetchIPAddress.rejected, (state, action) => {
      // state.completeScreenLoader = false;
      // state.profileCompletionPercent = false;
    });

    builder.addCase(UpdateprofileData.pending, (state) => {
      state.completeScreenLoader = true;
      state.profileCompletionPercent = true;
    });
    builder.addCase(UpdateprofileData.fulfilled, (state, action) => {
      if (state.profileInfos.basicDetails) {
        state.profileInfos.basicDetails.fullName = action.payload?.data?.name;
        state.profileInfos.basicDetails.accountType =
          action.payload?.data?.user_type;
        state.profileInfos.basicDetails.countryId =
          action.payload?.data?.country;
        state.profileInfos.basicDetails.city = action.payload?.data?.city;
        state.profileInfos.basicDetails.postalCode =
          action.payload?.data?.postal_code;
        state.profileInfos.basicDetails.gender = action.payload?.data?.gender;
        state.userName = action.payload?.data?.name;
        state.verifieduser = action.payload?.data?.user_type;
        state.email_id=action.payload?.data?.email_id
      }
      state.completeScreenLoader = false;
    });
    builder.addCase(UpdateJobProfileData.pending, (state, action) => {
      state.completeScreenLoader = true;
    });
    builder.addCase(UpdateJobProfileData.fulfilled, (state, action) => {
      state.completeScreenLoader = false;
      state.profileInfos.jobDetails.department =
        action.payload?.data?.job_function;
      state.profileInfos.jobDetails.designation =
        action.payload?.data?.job_role;
      state.profileInfos.jobDetails.mainLanguages =
        action.payload?.data?.main_language_1?.split(",");
      state.profileInfos.jobDetails.otherLanguages =
        action.payload?.data?.languag?.split(",");
    });
    builder.addCase(verifyMobileNo.fulfilled, (state, action) => {
      state.completeScreenLoader = false;
    });
    builder.addCase(getFollowersList.pending, (state, action) => {
      // state.followers=action.payload?.data;
    });
    builder.addCase(getFollowersList.fulfilled, (state, action) => {
      state.followers = action.payload?.data;
    });
    builder.addCase(loadMoreFollowers.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(loadMoreFollowers.fulfilled, (state, action) => {
      state.followers = [...state.followers, ...action.payload?.data];
      state.loader = true;
    });
    builder.addCase(removeFollowers.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(removeFollowers.fulfilled, (state, action) => {
      state.loader = false;
    });
    builder.addCase(logOut.pending, (state, action) => {
      // state.openLogoutModal=true;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      // state.openLogoutModal=false
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      localStorage.removeItem("Token");
      localStorage.removeItem("userData");
      localStorage.removeItem("userData1");
      state.openLogoutModal = false;
    });
  },
});
export const {
  setCompleteScreenLoading,
  setPersonalProfileImage,
  setUnfollower,
  setBasicDetail,
  setLoginViaSocial,
  setTimeofPop,
  setRemoveFollower,
  setpercent,
  setEmailVerified,
  setUserType,
  setSellerSubList,
  setUserBasicInfo,
  setTrackedData,
  setSelectedQuantity,
  setAddListingLoader,
  setOpenLogoutModal,
  setShowVerifyMobileModal,
  setShowEditMobileModal,
  setUserAvailibility,
  setWelcomeSocial,
  setdeleteAccount,
  setSocialAccounts,
  setRegistrationModal,
  setPlanDetails,
  setSocialLoader,
  setSocialAccountFocused,
  setShowConfirmEmailModal,
  setShowEditEmailModal
} = appReducer.actions;
export default appReducer;

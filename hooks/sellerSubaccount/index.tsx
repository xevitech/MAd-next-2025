import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/components/common/common";
import { subSellerList } from "../Interface";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/staticValues";
import Auth from "@/auth/Auth";

export const fetchSubsellerLists: any = createAsyncThunk(
  "Subseller List fetch",
  async () => {
    const response = await fetch(`${BASE_URL}/sub_account/list`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token()}`,
      },
    });

    const res = await response.json();
    return res;
  }
);

export const DeleteAccount = createAsyncThunk(
  "subseller account deleted",
  async (user_id: any) => {
    const users = user_id.join(",");
    let response = await apiClient("sub_account/delete", "post", {
      body: {
        user_id: users,
      },
    });
    return response;
  }
);

export const BannerList: any = createAsyncThunk("banner_list", async () => {
  let response = await apiClient("users/banner_setting/list", "get");
  setBannerListData(response?.data);
  return response;
});
 
  let toastDisplayed = false;
export const BannerSetting: any = createAsyncThunk(
  "banner_settings",
  async (bannerImage: any, { getState }: any) => {
    if (bannerImage.data.length > 0) {
      const state = getState();

      const formData = new FormData();

      state?.subseller?.bannerFiles.forEach((file: any) => {
        return formData.append("images[]", file);
      });
      formData?.append(
        "default_banner",
        state.subseller.defaultBanner == true ? "on" : "off"
      );
      formData?.append(
        "active_banner",
        state.subseller.activateBanner == true ? "on" : "off"
      );
      formData?.append(
        "swap_banner",
        state.subseller.swipe == true ? "on" : "off"
      );
      formData?.append(
        "indicator_banner",
        state.subseller.indicators == true ? "on" : "off"
      );
      formData?.append(
        "navigation_button",
        state.subseller.navButtonVisible == true ? "on" : "off"
      );
      formData?.append(
        "nav_button_visible",
        state.subseller.cycleNavigation == true ? "on" : "off"
      );
      formData?.append(
        "full_height_hover",
        state.subseller.fullHeightHover == true ? "on" : "off"
      );
      formData?.append("page", state.subseller.bannerPage);
      formData?.append("background_color", state.subseller.background_color);
      formData?.append("alt_tag", "");

      if (bannerImage.isActive) {
        if (toastDisplayed) return;
        toastDisplayed = true;
        let response = await apiClient(
          "users/banner_setting",
          "post",
          {
            body: formData,
          },
          true
        );
        if (response.status == 200 || response.status == true) {
          BannerList();
          toast.success("Banner data saved successfully");
        }
        else {
          toastDisplayed = false;
          // toast.error(response.message);
        }
        return response;
      }
    }
  }
);

export const BannerSetting_Update: any = createAsyncThunk(
  "banner_update",
  async (bannerImage: any, { getState }: any) => {
    // if (bannerImage.length > 0) {
    const state = getState();
    const formData = new FormData();
    bannerImage.forEach((v: any) => {
      formData.append("images[]", v);
    });
    formData?.append(
      "default_banner",
      state.subseller.defaultBanner == true ? "on" : "off"
    );
    formData?.append(
      "active_banner",
      state.subseller.activateBanner == true ? "on" : "off"
    );
    formData?.append(
      "swap_banner",
      state.subseller.swipe == true ? "on" : "off"
    );
    formData?.append(
      "indicator_banner",
      state.subseller.indicators == true ? "on" : "off"
    );

    formData?.append(
      "navigation_button",
      state.subseller.navButtonVisible == true ? "on" : "off"
    );
    formData?.append(
      "nav_button_visible",
      state.subseller.cycleNavigation == true ? "on" : "off"
    );
    formData?.append(
      "full_height_hover",
      state.subseller.fullHeightHover == true ? "on" : "off"
    );
    formData?.append("page", state.subseller.activeEditPage);
    formData?.append("background_color", state.subseller.background_color);
    formData?.append("alt_tag", "");
    formData?.append("_method", "patch");

    let response = await apiClient(
      "users/banner_setting/update/" + state.subseller.Id,
      "post",
      {
        body: formData,
      },
      true
    );

    if (response.status == 200 || response.status == true) {
      toast.success("Banner data updated successfully");
      // BannerList();
      // setNewBannerSlider(false);
    }
    return response;
  }
  // }
);

const useSubSeller = createSlice({
  name: "subseller",
  initialState: {
    Id: 0,
    sellerList: [],
    loader: true,
    deleteResponse: "",
    bannerImage: [],
    bannerFiles: [],
    cycleNavigation: false,
    navButtonVisible: false,
    navButtonInVisible: false,
    indicators: false,
    activateBanner: false,
    fullHeightHover: false,
    defaultBanner: false,
    swipe: false,
    threeDotLoader: false,
    status: "",
    banner: "",
    bannerPage: "",
    background_color: "",
    banner_list: "",
    page: "",
    bannerData: [],
    BannerList: "",
    addBanner: false,
    bannarImagePreview: [],
    newBannerSlider: false,
    activeEditPage: "",
    activeEditPageIndex: 0,
    activeEditPageData: [],
    bannerMode: "create",
    isBannerPageSelected: false,
    rolesData:[]
  } as subSellerList,

  reducers: {
    setBannerImages: (state, action) => {
      if (state.bannerImage?.length > 0) {
        if (action.payload?.delete == 1) {
          state.bannerImage = action.payload?.data;
        } else {
          state.bannerImage = [state.bannerImage, ...action.payload].flat();
        }
      } else {
        state.bannerImage = action.payload;
      }
    },
    setIsBannerPageSelected: (state, action) => {
      state.isBannerPageSelected = action.payload;
    },
    setBannerMode: (state, action) => {
      state.bannerMode = action.payload;
    },
    setActiveEditPageData: (state, action) => {
      state.activeEditPageData = action.payload;
    },
    setActiveEditPage: (state, action) => {
      state.activeEditPage = action.payload;
    },
    setActiveEditPageIndex: (state, action) => {
      state.activeEditPageIndex = action.payload;
    },
    setNewBannerSlider: (state, action) => {
      state.newBannerSlider = action.payload;
    },
    setBannarImagePreview: (state, action) => {
      state.bannarImagePreview = action.payload;
    },
    setCycleNav: (state, action) => {
      state.cycleNavigation = action.payload;
    },
    setbannerFiles: (state, action) => {
      if (action.payload?.change == true) {
        state.bannerFiles = action.payload?.data;
      } else {
        state.bannerFiles = [state.bannerFiles, ...action.payload].flat();
      }
    },
    setButtonVisible: (state, action) => {
      state.navButtonVisible = action.payload;
    },
    setButtonInvisible: (state, action) => {
      state.navButtonInVisible = action.payload;
    },
    setIndicators: (state, action) => {
      state.indicators = action.payload;
    },
    setSwipe: (state, action) => {
      state.swipe = action.payload;
    },
    setActivateBanner: (state, action) => {
      state.activateBanner = action.payload;
    },
    setDefaultBanner: (state, action) => {
      state.defaultBanner = action.payload;
    },
    setFullHeightHover: (state, action) => {
      state.fullHeightHover = action.payload;
    },
    setId: (state, action) => {
      state.Id = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setAddNewBanner: (state, action) => {
      state.addBanner = action.payload;
    },
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
    setBannerPage: (state, action) => {
      state.bannerPage = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.background_color = action.payload;
    },
    setBannerListData: (state, action) => {
      state.banner_list = action.payload;
    },
    setData:(state, action) => {
      state.rolesData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubsellerLists.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(fetchSubsellerLists.fulfilled, (state, action) => {
      state.sellerList = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchSubsellerLists.rejected, (state) => {
      state.loader = false;
    });

    builder.addCase(DeleteAccount.fulfilled, (state, action) => {
      state.deleteResponse = action.payload;
    });
    builder.addCase(BannerSetting.pending, (state, action) => {
      state.threeDotLoader = true;
    });
    builder.addCase(BannerSetting.fulfilled, (state, action) => {
      state.threeDotLoader = false;
    });
    builder.addCase(BannerList.pending, (state, action) => {
      state.threeDotLoader = true;
    });
    builder.addCase(BannerList.rejected, (state, action) => {});

    builder.addCase(BannerList.fulfilled, (state, action) => {
      state.threeDotLoader = false;
      // state.Id = action.payload.id;
      // state.bannerImage = action.payload.data[0]?.images;
      state.page = action.payload.data[0]?.page;
      state.bannerData = action.payload.data;
      state.swipe = action.payload.data[0]?.swap_banner == "off" ? false : true;
      state.indicators =
        action.payload.data[0]?.indicator_banner == "off" ? false : true;
      state.cycleNavigation =
        action.payload.data[0]?.nav_button_visible == "off" ? false : true;
      state.navButtonVisible =
        action.payload.data[0]?.navigation_button == "off" ? false : true;
      state.fullHeightHover =
        action.payload.data[0]?.full_height_hover == "off" ? false : true;
      state.activateBanner =
        action.payload.data[0]?.active_banner == "off" ? false : true;
      state.defaultBanner =
        action.payload.data[0]?.default_banner == "on" ? true : false;
      state.status = action.status;
      state.banner = action.payload.data[0]?.Banner;
    });
    builder.addCase(BannerSetting_Update.rejected, (state, action) => {
      state.threeDotLoader = false;
    });
    builder.addCase(BannerSetting_Update.pending, (state, action) => {
      state.threeDotLoader = true;
    });
    builder.addCase(BannerSetting_Update.fulfilled, (state, action) => {
      state.threeDotLoader = false;
    });
  },
});

export const {
  setBannerImages,
  setIndicators,
  setButtonInvisible,
  setCycleNav,
  setButtonVisible,
  setSwipe,
  setActivateBanner,
  setDefaultBanner,
  setFullHeightHover,
  setId,
  setStatus,
  setBanner,
  setBannerPage,
  setBackgroundColor,
  setBannerListData,
  setAddNewBanner,
  setbannerFiles,
  setBannarImagePreview,
  setNewBannerSlider,
  setActiveEditPage,
  setActiveEditPageIndex,
  setActiveEditPageData,
  setBannerMode,
  setIsBannerPageSelected,
  setData
} = useSubSeller.actions;

export default useSubSeller;

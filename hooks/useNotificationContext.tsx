import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notificationList } from "./Interface";

export const handleReadNotification = createAsyncThunk(
  "Handling My Notifications ",
  async (id: any, { dispatch }) => {
    const payload = {
      id: id,
    };
    const response = await fetch(`${BASE_URL}/front/update_status`, {
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (response.status === 200) {
      dispatch(getNotificationList(["", 0, 10]));
    }
  }
);
export const loadMoreData = createAsyncThunk(
  "My Notifications Load More",
  async (payload: any) => {
    const datas = { data: {} };
    return datas.data;
  }
);

export const getNotificationList = createAsyncThunk(
  "My Notifications",
  async (payload: any) => {
    return {};
  }
);

const useNotificationContext = createSlice({
  name: "notification",
  initialState: {
    notificationlistItem: [],
    loadData: false,
    ids: "",
    showSkeleton: false,
    listItem: [],
    counting: {
      all: 0,
      enquiries: 0,
      orderInvoices: 0,
      product: 0,
    },
  } as notificationList,
  reducers: {
    setListItem: (state, action) => {
      state.listItem = action.payload;
    },
    setLoadData: (state, action) => {
      state.loadData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationList.pending, (state) => {
      state.showSkeleton = true;
    });
    builder.addCase(getNotificationList.rejected, (state) => {
      state.showSkeleton = false;
    });

    builder.addCase(loadMoreData.fulfilled, (state, action: any): any => {
      state.showSkeleton = false;

      state.ids = action.payload?.list.map((item: any) => item.id);
      state.loadData = true;
      state.counting = {
        all: action.payload?.all,
        enquiries: action.payload?.enquiries,
        orderInvoices: 0,
        product: action.payload?.product,
      };
      state.notificationlistItem = [
        ...state.notificationlistItem,
        ...action.payload?.list,
      ];
    });
    builder.addCase(loadMoreData.rejected, (state) => {
      state.showSkeleton = false;
    });
    builder.addCase(handleReadNotification.fulfilled, (state) => {
      console.log("done");
    });
  },
});
export const { setListItem, setLoadData } = useNotificationContext.actions;
export default useNotificationContext;

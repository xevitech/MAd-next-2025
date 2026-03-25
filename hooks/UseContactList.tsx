
import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ContactList } from "./Interface";

export const fetchAllContacts: any = createAsyncThunk(
  "My Contact",
  async (type: any) => {
    console.log(type, "fetchAllContacts ");
    var body = {
      tab_type: type == 0 ? 0 : type,
      per_page: 15,
    };
    let response = await apiClient("front/contact_list", "post", { body });
    response.data.forEach((item, index) => {
      item.serialNo = index + 1;
    });

    return response;
  }
);

export const fetchContactDetails = createAsyncThunk(
  "My Contact Details",
  async (status: any, { getState, dispatch }) => {
    console.log(status, "fetchContactDetails payload");

    const state: any = getState();
    if (status === 2) {
      var body = {
        id: state.contact.contactId,
        status: 1,
      };
    } else {
      var body = {
        id: state.contact.contactId,
        status: 2,
      };
    }
    let response = await apiClient("front/update_contact_list", "post", {
      body,
    });
    if (response.status == 200) {
      dispatch(fetchAllContacts());
    }
    return response;
  }
);

const UseContactList = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    loader: true,
    pageLoader: true,
    contactId: null,
  } as ContactList,
  reducers: {
    setContactId: (state, action) => {
      state.contactId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllContacts.pending, (state) => {
      state.pageLoader = true;
      state.loader = true;
    });
    builder.addCase(fetchAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;

      state.pageLoader = false;
      state.loader = false;
    });
    builder.addCase(fetchAllContacts.rejected, (state) => {
      state.pageLoader = false;
      state.loader = false;
    });

    builder.addCase(fetchContactDetails.pending, (state) => {
      state.pageLoader = true;
      state.loader = true;
    });
    builder.addCase(fetchContactDetails.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.pageLoader = false;
      state.loader = false;
    });
    builder.addCase(fetchContactDetails.rejected, (state) => {
      state.pageLoader = false;
      state.loader = false;
    });
  },
});
export const { setContactId } = UseContactList.actions;
export default UseContactList;

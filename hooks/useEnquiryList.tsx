import { apiClient } from "@/components/common/common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { enquiryList } from "./Interface";

export const enquiries = createAsyncThunk("My Enquiry", async () => {
  let response = await apiClient("enquiry/index?type=sent","get");
  response.data.data.forEach((item,index)=>{
    item.serialNo=index+1;
})
  return response.data.data;
});


const UseEnquiryList = createSlice({
  name: "enquiry",
  initialState: { enquiry: null, loader: true, pageLoader: true } as enquiryList,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(enquiries.pending, (state) => {
      state.pageLoader = true;
      state.loader=true
    });
    builder.addCase(enquiries.fulfilled, (state, action) => {
      state.enquiry = action.payload;
      state.pageLoader = false;
      state.loader=false

    });
    builder.addCase(enquiries.rejected, (state) => {
      state.pageLoader = false;
      state.loader=false
    });
  },
});

export default UseEnquiryList;
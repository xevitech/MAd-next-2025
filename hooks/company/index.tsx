import Auth from "@/auth/Auth";
import { BASE_URL } from "@/utils/staticValues";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { companyProfile } from "../Interface";
export const getCompanyProfile: any = createAsyncThunk(
  "My Company Profile",
  async () => {
    let response = await fetch(`${BASE_URL}/company_profile/view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Auth.token()}`,
      },
    });
    const data = await response.json();
    return data;
  }
);
export const getCompanyFacilities: any = createAsyncThunk(
  "Company Facilities",
  async () => {
    let response = await fetch(
      `${BASE_URL}/company_profile/view/company-Faclities`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Auth.token()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);
const companyProfileState = createSlice({
  name: "companyProfile",
  initialState: {
    companyDetails: {},
    loader: true,
    pageLoader: true,
    businessType: "",
    businessTabData: "",
  } as companyProfile,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyProfile.pending, (state) => {});
    builder.addCase(getCompanyProfile.fulfilled, (state, action) => {
      state.companyDetails = action.payload;
      state.businessType =
        action.payload?.business_type?.length > 0
          ? action.payload?.business_type?.find((item) => item?.toggle == "1")
          : "";
      const getRnd = action.payload?.qaqc_rnd
        ? JSON.parse(action.payload?.qaqc_rnd?.manufacture_rnd)
        : "";
      if (getRnd?.["Agents and Representative"]) {
        const getAgent =
          getRnd?.["Agents and Representative"]?.["R&D Department"];
        state.businessTabData = getAgent ? JSON.parse(getAgent) : "";
      } else if (getRnd?.["Wholesalers"]) {
        const getWholeSaler = getRnd?.["Wholesalers"]?.["R&D Department"];
        state.businessTabData = getWholeSaler ? JSON.parse(getWholeSaler) : "";
      } else if (getRnd?.["Others"]) {
        state.businessTabData = "other_rnd";
      } else if (getRnd?.["Resellers"]) {
        state.businessTabData = "reseller_rnd";
      } else {
        state.businessTabData = "other_rnd";
      }
    });
    builder.addCase(getCompanyProfile.rejected, (state) => {});
  },
});

export default companyProfileState;

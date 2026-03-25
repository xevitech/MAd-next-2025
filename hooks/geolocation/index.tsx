import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { geoLocation } from "../Interface";
import { apiClient } from "@/components/common/common";
export const getGeoLocation = createAsyncThunk("Get Geolocation", async () => {
  const response = await fetch("https://geolocation-db.com/json/");
  const data = response.json();
  return data;
});

export const getAllListOfCities: any = createAsyncThunk(
  "Get List of all cities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `cities?state=${payloads?.state}&country=${
        state?.geoLocation?.countryCode
          ? state?.geoLocation?.countryCode
          : payloads?.country
      }`,
      "get"
    );
    return response;
  }
);

export const getAllListOfMailingCities: any = createAsyncThunk(
  "Get List of all mailing cities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `cities?state=${payloads?.state}&country=${
        state?.geoLocation?.mailingCountryCode
          ? state?.geoLocation?.mailingCountryCode
          : payloads?.country
      }`,
      "get"
    );
    return response;
  }
);

export const getAllListOfBillingCities: any = createAsyncThunk(
  "Get List of all billing cities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `cities?state=${payloads?.state}&country=${
        state?.geoLocation?.billingCountryCode
          ? state?.geoLocation?.billingCountryCode
          : payloads?.country
      }`,
      "get"
    );
    return response;
  }
);

export const getAllListOfOtherCities: any = createAsyncThunk(
  "Get List of all other cities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `cities?state=${payloads?.state}&country=${
        state?.geoLocation?.otherCountryCode
          ? state?.geoLocation?.otherCountryCode
          : payloads?.country
      }`,
      "get"
    );
    return response;
  }
);

export const getAllListOfShippingCities: any = createAsyncThunk(
  "Get List of all shipping cities",
  async (payloads: any, { getState }) => {
    const state: any = getState();
    let response = await apiClient(
      `cities?state=${payloads?.state}&country=${
        state?.geoLocation?.shippingCountryCode
          ? state?.geoLocation?.shippingCountryCode
          : payloads?.country
      }`,
      "get"
    );
    return response;
  }
);

const geoLocationState = createSlice({
  name: "geoLocation",
  initialState: {
    defaultCode: "",
    countryCode: "",
    allCities: [],
    allMailingCities: [],
    allOtherCities: [],
    allBillingCities: [],
    allShippingCities: [],
    selectedCity: "",
    mailingCountryCode: "",
    otherCountryCode: "",
    billingCountryCode: "",
    shippingCountryCode: "",
  } as geoLocation,
  reducers: {
    setDefaultCode: (state, action) => {
      state.defaultCode = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setMailingCountryCode: (state, action) => {
      state.mailingCountryCode = action.payload;
    },
    setOtherCountryCode: (state, action) => {
      state.otherCountryCode = action.payload;
    },
    setBillingCountryCode: (state, action) => {
      state.billingCountryCode = action.payload;
    },
    setShippingCountryCode: (state, action) => {
      state.shippingCountryCode = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGeoLocation.fulfilled, (state, action: any) => {
      state.defaultCode = action.payload?.country_code;
      state.country = action.payload?.country_name;
      state.countryCode = action.payload?.country_code;
      state.otherCountryCode = action.payload?.country_code;
      state.mailingCountryCode = action.payload?.country_code;
      state.billingCountryCode = action.payload?.country_code;
      state.shippingCountryCode = action.payload?.country_code;
    });
    builder.addCase(getAllListOfCities.fulfilled, (state, action: any) => {
      state.allCities = action.payload?.data;
    });
    builder.addCase(
      getAllListOfMailingCities.fulfilled,
      (state, action: any) => {
        state.allMailingCities = action.payload?.data;
      }
    );
    builder.addCase(getAllListOfOtherCities.fulfilled, (state, action: any) => {
      state.allOtherCities = action.payload?.data;
    });
    builder.addCase(
      getAllListOfBillingCities.fulfilled,
      (state, action: any) => {
        state.allBillingCities = action.payload?.data;
      }
    );
    builder.addCase(
      getAllListOfShippingCities.fulfilled,
      (state, action: any) => {
        state.allShippingCities = action.payload?.data;
      }
    );
  },
});
export const {
  setDefaultCode,
  setCountryCode,
  setSelectedCity,
  setMailingCountryCode,
  setOtherCountryCode,
  setBillingCountryCode,
  setShippingCountryCode,
} = geoLocationState.actions;
export default geoLocationState;

import { createSlice } from "@reduxjs/toolkit";

const PortsList = createSlice({
  name: "header",
  initialState: { seaportList: [], loader: false, airportList: [] },
  reducers: {
    FetchPortList: (state: any, action: any) => {
      const { payload } = action;
      let airportList = payload.airport.map((v) => ({
        value: v.name,
        view: v.name,
      }));
      let seaportList = payload.seaport.map((v) => ({
        value: v.Name,
        view: v.Name,
      }));
      return { ...state, seaportList, airportList };
    },
  },
});
export const { FetchPortList } = PortsList.actions;
export default PortsList;

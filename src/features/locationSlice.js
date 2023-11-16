import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationList: []
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocationList: (state, action) => {
      const data = action.payload;
      state.locationList = data;
    }
  }
});

export const setLocationList = locationSlice.actions.setLocationList;
export const locationListArray = state => state.location.locationList;

export default locationSlice.reducer;

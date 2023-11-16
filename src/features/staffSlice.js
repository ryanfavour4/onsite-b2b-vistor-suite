import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffList: []
};

const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    setStaffList: (state, action) => {
      const data = action.payload;
      state.staffList = data;
    }
  }
});

export const setStaffList = staffSlice.actions.setStaffList;
export const staffListArray = (state) => state.staffs.staffList;

export default staffSlice.reducer;

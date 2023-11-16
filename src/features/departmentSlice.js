import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departmentList: [],
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setDepartmentList: (state, action) => {
      const data = action.payload;
      state.departmentList = data;
    },
  },
});

export const setDepartmentList = departmentSlice.actions.setDepartmentList;
export const departmentListArray = (state) => state.department.departmentList;

export default departmentSlice.reducer;

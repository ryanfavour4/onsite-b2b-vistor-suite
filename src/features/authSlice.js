import { createSlice } from "@reduxjs/toolkit";
import { setAxiosToken } from "../axios";

const initialState = {
  userData: null,
  staffInviteOnlyMode: undefined,
  companyInviteOnlyMode: undefined,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { userData, staffInviteOnlyMode, companyInviteOnlyMode } =
        action.payload;
      // console.log(action);
      state.userData = userData;
      state.staffInviteOnlyMode = staffInviteOnlyMode;
      state.companyInviteOnlyMode = companyInviteOnlyMode;
      localStorage.removeItem("auth");
      localStorage.setItem(
        "auth",
        JSON.stringify({
          userData,
        })
      );
      setAxiosToken(userData?.token);
    },
    changeStaffInviteOnlyMode: (state, action) => {
      // console.log(action.payload, "action.payload");
      state.staffInviteOnlyMode = action.payload;
    },
    changeCompanyInviteOnlyMode: (state, action) => {
      // console.log(action.payload, "action.payload");
      state.companyInviteOnlyMode = action.payload;
    },
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("auth");
      setAxiosToken(null);
    },
  },
});

export const {
  authenticate,
  logout,
  changeStaffInviteOnlyMode,
  changeCompanyInviteOnlyMode,
} = auth.actions;
export default auth.reducer;

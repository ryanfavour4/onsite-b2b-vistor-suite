import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptionList: []
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    setSubscriptionList: (state, action) => {
      const data = action.payload;
      state.subscriptionList = data;
    }
  }
});

export const setSubscriptionList = subscriptionSlice.actions.setSubscriptionList;
export const subscriptionListArray = (state) => state.subscriptions.subscriptionList;

export default subscriptionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positionList: []
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPositionList: (state, action) => {
      const data = action.payload;
      state.positionList = data;
    }
  }
});

export const setPositionList = positionSlice.actions.setPositionList;
export const positionListArray = (state) => state.position.positionList;

export default positionSlice.reducer;

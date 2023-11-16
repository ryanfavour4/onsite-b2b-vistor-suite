import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import settingsReducer from "../features/settingsSlice";
import profileReducer from "../features/profileSlice";
import subscriptionReducer from "../features/subscriptionSlice";
import staffReducer from "../features/staffSlice";
import departmentReducer from "../features/departmentSlice";
import positionReducer from "../features/positionSlice";
import locationReducer from "../features/locationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    profile: profileReducer,
    subscriptions: subscriptionReducer,
    staffs: staffReducer,
    department: departmentReducer,
    position: positionReducer,
    location: locationReducer
  }
});

export default store;

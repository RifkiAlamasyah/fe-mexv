import { configureStore } from "@reduxjs/toolkit";
import utilityReducer from "./slices/utilitySlice";

const store = configureStore({
  reducer: {
    utility: utilityReducer,
    // slice lain misalnya user: userReducer, dll
  },
});

export default store;

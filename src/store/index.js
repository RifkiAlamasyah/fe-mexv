import { configureStore } from "@reduxjs/toolkit";
import utilityReducer from "./slices/utilitySlice";
import productReducer from "./slices/productSlice"

const store = configureStore({
  reducer: {
    utility: utilityReducer,
    product :productReducer
    // slice lain misalnya user: userReducer, dll
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import utilityReducer from "./slices/utilitySlice";
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    utility: utilityReducer,
    product :productReducer,
    cart: cartReducer,
    // slice lain misalnya user: userReducer, dll
  },
});

export default store;

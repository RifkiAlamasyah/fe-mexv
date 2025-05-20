// store/slices/utilitySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flashMessage: {
    title : "",
    subTitle : "",
    type : "",
  },
  isLoading: false,
};

const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setFlashMessage: (state, action) => {
      state.flashMessage = action.payload;
    },
    clearFlashMessage: (state) => {
      state.flashMessage = { title: "", subTitle :"",  type: "" };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setFlashMessage,
  clearFlashMessage,
  setLoading,
} = utilitySlice.actions;

export default utilitySlice.reducer;

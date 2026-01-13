import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    { page = 1, search = {} } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);

      if (search.name) params.append("nama_product", search.name);
      if (search.code) params.append("kode_product", search.code);

      const { data } = await api.get(`/api/products?${params.toString()}`);

      if (data.rc !== "00") throw new Error("Fetch failed");

      return {
        products: data.data,
        pagination: data.pagination,
        page,
        search,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    pagination: { currentPage: 1, totalPages: 1 },
    page: 1,
    search: {},          // 🔥 simpan search global
    loading: false,
    error: null,
  },
  reducers: {
    resetSearch(state) {
      state.search = {};
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.page = action.payload.page;
        state.search = action.payload.search;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSearch } = productSlice.actions;
export default productSlice.reducer;

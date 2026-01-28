import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ===============================
   ASYNC THUNK
================================ */

// GET CART (optional, kalau mau load dari DB)
export const getCart = createAsyncThunk(
  "api/get-cart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("api/get-cart");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// SAVE CART (payload dikirim dari Cart.jsx)
export const saveCart = createAsyncThunk(   
  "api/save-cart",
  async (payload, { rejectWithValue }) => {
    try {
         // ⏳ simulasi loading 5 detik
      const res = await api.post("api/save-cart", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ===============================
   INITIAL STATE
================================ */

const initialState = {
  cart: null,
  items: [],
  loading: false,
  error: null
};

/* ===============================
   SLICE
================================ */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const exist = state.items.find(
        (item) => item.kode_product === product.kode_product
      );

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push(
          { 
            ...product, 
            quantity: 1,
            warna :"",
            size :""
          }
        );
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.kode_product !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const { kode_product, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.kode_product === kode_product
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.cart = null;
    },
    updateWarna: (state, action) => {
      const { kode_product, warna } = action.payload;
      const item = state.items.find(
        (i) => i.kode_product === kode_product
      );
      if (item) item.warna = warna;
    },
    updateSize: (state, action) => {
      console.log(action)
      const { kode_product, size } = action.payload;
      const item = state.items.find(
        (i) => i.kode_product === kode_product
      );
      if (item) item.size = size;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.items = action.payload.items || [];
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE CART
      .addCase(saveCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateWarna,
  updateSize,
} = cartSlice.actions;

export default cartSlice.reducer;

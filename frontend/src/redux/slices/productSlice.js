import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../../services/productService";

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, productData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, productData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/remove",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProductState(state) {
      state.product = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.products = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // fetchProductById
      .addCase(fetchProductById.pending, (s) => { s.loading = true; s.error = null; s.product = null; })
      .addCase(fetchProductById.fulfilled, (s, a) => { s.loading = false; s.product = a.payload; })
      .addCase(fetchProductById.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // createNewProduct
      .addCase(createNewProduct.pending, (s) => { s.loading = true; s.error = null; s.success = false; })
      .addCase(createNewProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products.unshift(a.payload);
        s.success = true;
      })
      .addCase(createNewProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // editProduct
      .addCase(editProduct.pending, (s) => { s.loading = true; s.error = null; s.success = false; })
      .addCase(editProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products = s.products.map(p => p._id === a.payload._id ? a.payload : p);
        s.success = true;
      })
      .addCase(editProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload; })

      // removeProduct
      .addCase(removeProduct.pending, (s) => { s.loading = true; s.error = null; s.success = false; })
      .addCase(removeProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products = s.products.filter(p => p._id !== a.meta.arg);
        s.success = true;
      })
      .addCase(removeProduct.rejected, (s, a) => { s.loading = false; s.error = a.payload; });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;

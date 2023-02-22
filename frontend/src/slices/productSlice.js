import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  products: [],
  product: {},
  loading: true,
  error: [],
  page: null,
  pages: null,
}

export const getProducts = createAsyncThunk("products/getProducts", async (keyword = "", thunkAPI) => {
  try {
    const { data } = await axios.get(`/api/products${keyword}`)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const getProduct = createAsyncThunk("products/getProduct", async (id, thunkAPI) => {
  try {
    const { data } = await axios.get("/api/products/" + id)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.page = action.payload.page
        state.pages = action.payload.pages
        state.error = []
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
        state.error = []
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

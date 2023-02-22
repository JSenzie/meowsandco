import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  loading: false,
  error: [],
  success: false,
  order: {},
  orders: [],
}

export const orderCreate = createAsyncThunk("order/orderCreate", async (order, thunkAPI) => {
  try {
    const {
      userLogin: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post("/api/orders/add/", order, config)

    return data
  } catch (error) {
    console.log("ok")
    localStorage.setItem("itemsNotAvailable", "true")
    console.log(localStorage.getItem("itemsNotAvailable"))
    return thunkAPI.rejectWithValue(error)
  }
})

export const orderDetails = createAsyncThunk("order/orderDetails", async (id, thunkAPI) => {
  try {
    const {
      userLogin: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}/`, config)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const orderList = createAsyncThunk("order/orderList", async (args, thunkAPI) => {
  try {
    const {
      userLogin: { userInfo },
    } = thunkAPI.getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myOrders/`, config)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = {}
      state.success = false
      state.error = []
    },
    clearPayment(state) {
      state.success = false
    },
    orderListReset(state) {
      state.orders = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCreate.pending, (state) => {
        state.loading = true
      })
      .addCase(orderCreate.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = []
        state.order = action.payload
      })
      .addCase(orderCreate.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload
      })
      .addCase(orderDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload
        state.error = []
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(orderList.pending, (state) => {
        state.loading = true
      })
      .addCase(orderList.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(orderList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearOrder, clearPayment, orderPayReset, orderListReset } = orderSlice.actions
